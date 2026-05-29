// ABOUTME: Runs a browser verification pass for the /play GitHub Pages build.
// ABOUTME: Captures screenshots, gameplay probes, renderer metrics, and console failures.
import { createServer } from 'node:http';
import { existsSync, readFile, statSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import puppeteer from 'puppeteer-core';
import { circuitCheckpoints, districtFootprints, ISLAND_RADIUS, roadPaths, worldZones } from '../play-src/src/world/worldData.js';

const repoRoot = resolve(import.meta.dirname, '..');
const chromePath = findChrome();
const outputDir = resolve(repoRoot, '.codex-tmp', `play-verify-${new Date().toISOString().replace(/[:.]/g, '-')}`);
let serverInstance = null;
const baseUrl = process.env.BASE_URL || await startStaticServer();
const consoleMessages = [];
const pageErrors = [];
const routeReplaySegments = getRouteReplaySegments();
const authoredDistrictAssets = [
  'EnvPolishProjectForge',
  'EnvPolishCvVault',
  'EnvPolishSkillsArray',
  'EnvPolishCareerOffice',
  'EnvPolishAwardsMonument',
  'EnvPolishTodoBoard',
  'EnvPolishCircuitGate',
  'EnvPolishBuildWorkbench',
  'EnvPolishFarmIrrigator',
  'EnvPolishHarborSignal'
];
const authoredStuntAssets = [
  'EnvPolishStuntCheckpoint',
  'EnvPolishStuntScoreTower',
  'EnvPolishStuntArrowFence'
];

await mkdir(outputDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required']
});

try {
  const page = await browser.newPage();
  wirePageDiagnostics(page);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('portfolio-drive-landscape-quality', 'medium');
    localStorage.setItem('portfolio-drive-muted', '1');
  });

  const startedAt = Date.now();
  await page.goto(`${baseUrl}/play/?debugDrive=1`, { waitUntil: 'networkidle0', timeout: 60000 });
  await waitForReady(page);
  const loadMs = Date.now() - startedAt;
  await screenshot(page, '01-title.png');

  await page.evaluate(() => window.__portfolioDrive.start());
  await delay(700);
  await screenshot(page, '02-start-driving.png');

  const gameplay = await exerciseGameplay(page);
  await screenshot(page, '03-driving-stress.png');
  const water = await exerciseWater(page, ISLAND_RADIUS);
  await screenshot(page, '04-water-interaction.png');
  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    game.camera.fov = game.cameraRig.baseFov;
    game.camera.updateProjectionMatrix();
    game.clearFocus();
  });
  const surfaces = await sampleSurfaces(page, ISLAND_RADIUS);
  const surfaceFeedback = await exerciseSurfaceFeedback(page, ISLAND_RADIUS);
  await screenshot(page, '05-surface-feedback.png');
  const routeReplay = await exerciseRouteReplay(page, routeReplaySegments);
  const worldLife = await sampleWorldLife(page);

  for (const zone of worldZones) {
    await page.evaluate((zoneId) => window.__portfolioDrive.respawn(zoneId), zone.id);
    await delay(500);
    await screenshot(page, `zone-${slug(zone.id)}.png`);
  }

  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const shard = game.world.collectibles[0];
    localStorage.removeItem(`portfolio-drive-shard-${shard.index}`);
    shard.collected = false;
    shard.mesh.visible = true;
    game.world.refreshCollectibleVisuals?.(game.ticker.elapsed || 0);
    const target = shard.mesh.position.clone();
    const cameraPosition = target.clone();
    cameraPosition.x += 4.4;
    cameraPosition.y += 3.4;
    cameraPosition.z += 5.4;
    const lookAt = target.clone();
    lookAt.y += 1.2;
    game.vehicle.respawn({ x: shard.mesh.position.x - 4, y: 1.08, z: shard.mesh.position.z - 3 }, 0.78);
    game.cameraRig.setCinematic(cameraPosition, lookAt);
    game.cameraRig.smoothedTarget.copy(lookAt);
    game.camera.position.copy(cameraPosition);
    game.camera.fov = 38;
    game.camera.updateProjectionMatrix();
    game.camera.lookAt(lookAt);
  });
  await delay(350);
  await screenshot(page, 'collectible-data-shard.png');
  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    game.camera.fov = game.cameraRig.baseFov;
    game.camera.updateProjectionMatrix();
    game.clearFocus();
  });
  const panelUi = await exercisePanelUi(page);

  await page.click('#map-button');
  await delay(350);
  await screenshot(page, 'map.png');
  await page.click('#map-close');

  await page.click('#menu-button');
  await delay(350);
  await screenshot(page, 'menu.png');
  await page.click('#menu-close');

  const collectibles = await exerciseCollectibles(page);
  await page.evaluate(() => {
    document.getElementById('notifications')?.replaceChildren();
    window.__portfolioDrive.respawn('landing');
  });
  await delay(150);

  await page.evaluate(() => window.__portfolioDrive.showColliders());
  await delay(300);
  await screenshot(page, 'debug-colliders.png');

  const metrics = await collectRuntimeMetrics(page, loadMs, gameplay, water, surfaces, surfaceFeedback, routeReplay, worldLife);
  const mobile = await captureMobile(browser);
  const mobileSavedPreference = await captureMobileSavedPreference(browser);
  const result = {
    baseUrl,
    outputDir,
    consoleMessages,
    pageErrors,
    glbAssets: getGlbAssetSizes(),
    mobile,
    mobileSavedPreference,
    panelUi,
    collectibles,
    ...metrics
  };

  await writeFile(join(outputDir, 'result.json'), JSON.stringify(result, null, 2));
  assertVerification(result);
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
  if (serverInstance) {
    await new Promise((resolveClose) => serverInstance.close(resolveClose));
  }
}

async function startStaticServer() {
  const mimes = new Map([
    ['.html', 'text/html; charset=utf-8'],
    ['.js', 'text/javascript; charset=utf-8'],
    ['.css', 'text/css; charset=utf-8'],
    ['.json', 'application/json; charset=utf-8'],
    ['.png', 'image/png'],
    ['.jpg', 'image/jpeg'],
    ['.jpeg', 'image/jpeg'],
    ['.svg', 'image/svg+xml'],
    ['.ico', 'image/x-icon'],
    ['.pdf', 'application/pdf'],
    ['.glb', 'model/gltf-binary'],
    ['.wasm', 'application/wasm']
  ]);

  serverInstance = createServer((req, res) => {
    let pathname = new URL(req.url, 'http://127.0.0.1').pathname;
    pathname = decodeURIComponent(pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const file = resolve(repoRoot, pathname.replace(/^\/+/, ''));
    if (!file.startsWith(repoRoot)) {
      res.writeHead(403);
      res.end('forbidden');
      return;
    }
    readFile(file, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end('not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': mimes.get(extname(file).toLowerCase()) || 'application/octet-stream' });
      res.end(data);
    });
  });

  await new Promise((resolveListen) => serverInstance.listen(0, '127.0.0.1', resolveListen));
  const address = serverInstance.address();
  return `http://127.0.0.1:${address.port}`;
}

function wirePageDiagnostics(page) {
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      consoleMessages.push({ type: message.type(), text: message.text() });
    }
  });
  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });
}

async function waitForReady(page) {
  await page.waitForFunction(
    () => window.__portfolioDrive?.ready?.() && window.__portfolioDrive.sampleCanvas() > 0,
    { timeout: 60000 }
  );
}

async function screenshot(page, name) {
  await page.screenshot({ path: join(outputDir, name), fullPage: true });
}

async function exerciseGameplay(page) {
  const keyboardHandbrake = await page.evaluate(async () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyC', bubbles: true, cancelable: true }));
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 80));
    const seen = window.__portfolioDrive.game.input.actions.handbrake === true;
    window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyC', bubbles: true, cancelable: true }));
    return seen;
  });

  return page.evaluate(async (keyboardHandbrakeValue) => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;
    const input = game.input;
    const waitForGrounded = async () => {
      for (let i = 0; i < 90; i += 1) {
        if ((game.vehicle.controller?.groundedWheels || 0) >= 2) return true;
        await delay(50);
      }
      return false;
    };
    const clearInput = () => {
      input.actions.forward = false;
      input.actions.backward = false;
      input.actions.left = false;
      input.actions.right = false;
      input.actions.boost = false;
      input.actions.handbrake = false;
      input.actions.brake = false;
      input.actions.jump = false;
    };
    const start = game.vehicle.position.clone();
    const samples = {
      keyboardHandbrake: keyboardHandbrakeValue,
      boostSeen: false,
      jumpSeen: false,
      burnoutSeen: false,
      wheelieSeen: false,
      handbrakeSeen: false,
      groundedBeforeJump: false,
      groundedBeforeBurnout: false,
      landingSeen: false,
      impactAudioSeen: false
    };

    input.actions.forward = true;
    await delay(1300);
    input.actions.boost = true;
    await delay(500);
    samples.boostSeen = Boolean(game.vehicle.controller.driveState.boost);
    input.actions.boost = false;

    clearInput();
    window.__portfolioDrive.respawn('landing');
    await delay(350);
    samples.groundedBeforeJump = await waitForGrounded();
    const landingEventsBefore = game.vehicle.landingEvents || 0;
    const impactAudioBefore = game.audio?.impactsPlayed || 0;
    const beforeJumpY = game.vehicle.position.y;
    let maxJumpY = beforeJumpY;
    for (let i = 0; i < 6; i += 1) {
      input.pressed.add('jump');
      input.actions.jump = true;
      await delay(50);
      maxJumpY = Math.max(maxJumpY, game.vehicle.position.y);
    }
    input.actions.jump = false;
    for (let i = 0; i < 10; i += 1) {
      await delay(70);
      maxJumpY = Math.max(maxJumpY, game.vehicle.position.y);
    }
    for (let i = 0; i < 45; i += 1) {
      await delay(80);
      maxJumpY = Math.max(maxJumpY, game.vehicle.position.y);
      samples.landingSeen = (game.vehicle.landingEvents || 0) > landingEventsBefore;
      if (samples.landingSeen) break;
    }
    samples.jumpSeen = maxJumpY > beforeJumpY + 0.12;
    samples.jumpDelta = Number((maxJumpY - beforeJumpY).toFixed(2));
    samples.landingIntensity = Number((game.vehicle.lastLandingIntensity || 0).toFixed(2));
    samples.impactAudioSeen = (game.audio?.impactsPlayed || 0) > impactAudioBefore;

    clearInput();
    window.__portfolioDrive.respawn('landing');
    await delay(350);
    samples.groundedBeforeBurnout = await waitForGrounded();
    input.actions.forward = true;
    input.actions.backward = true;
    for (let i = 0; i < 12; i += 1) {
      await delay(80);
      samples.burnoutSeen = samples.burnoutSeen || Boolean(game.vehicle.controller.driveState.burnout);
    }
    input.actions.backward = false;
    for (let i = 0; i < 16; i += 1) {
      await delay(80);
      samples.wheelieSeen = samples.wheelieSeen || Boolean(game.vehicle.controller.driveState.wheelie);
    }
    clearInput();

    game.vehicle.respawn({ x: 0, y: 1.08, z: 24 }, 1.72);
    await delay(250);
    await waitForGrounded();
    samples.handbrakeSurface = game.world.getSurfaceInfo(game.vehicle.position).id;
    game.vehicle.body.setLinvel({ x: 12, y: 0, z: -2 }, true);
    input.actions.handbrake = true;
    await delay(320);
    samples.handbrakeSeen = Boolean(game.vehicle.controller.driveState.handbrake);
    samples.handbrakeSlip = Number(game.vehicle.controller.driveState.slip || 0);
    clearInput();
    samples.vehicleFx = game.vehicle.getEffectStats?.() || {};

    const end = game.vehicle.position.clone();
    return {
      ...samples,
      movementMeters: Number(start.distanceTo(end).toFixed(2)),
      finalSpeed: Number(game.vehicle.speed.toFixed(2)),
      finalY: Number(game.vehicle.position.y.toFixed(2))
    };
  }, keyboardHandbrake);
}

async function exerciseWater(page, islandRadius) {
  return page.evaluate(async (radius) => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;
    const horizontalSpeed = () => {
      const velocity = game.vehicle.body.linvel();
      return Math.hypot(velocity.x, velocity.z);
    };
    const waterStats = () => game.world.water?.getStats?.() || {};
    const wakeBefore = waterStats();

    game.vehicle.respawn({ x: radius * 1.022, y: 1.08, z: 0 }, Math.PI * 0.5);
    game.vehicle.body.setLinvel({ x: 18, y: 0, z: 0 }, true);

    const beforeSpeed = horizontalSpeed();
    let surfaceSeen = false;
    let splashSeen = false;
    let wakeSeen = false;
    for (let i = 0; i < 14; i += 1) {
      await delay(80);
      surfaceSeen = surfaceSeen || game.world.surfaceState?.inWater === true;
      splashSeen = splashSeen || (game.world.water?.splashes?.length || 0) > 0;
      const stats = waterStats();
      wakeSeen = wakeSeen || stats.activeWakes > 0 || stats.wakesSpawned > (wakeBefore.wakesSpawned || 0);
    }
    const afterSpeed = horizontalSpeed();

    game.vehicle.respawn({ x: radius * 1.044, y: 0.7, z: 0 }, Math.PI * 0.5);
    for (let i = 0; i < 18; i += 1) {
      await delay(80);
    }
    const afterRespawn = game.vehicle.position;
    const respawnDistance = Math.hypot(afterRespawn.x, afterRespawn.z);
    const submergedRespawned = respawnDistance < radius * 0.55;

    game.vehicle.respawn({ x: radius * 0.972, y: 1.08, z: 0 }, 0);
    game.vehicle.body.setLinvel({ x: 0, y: 0, z: 12 }, true);
    for (let i = 0; i < 8; i += 1) {
      await delay(80);
      const stats = waterStats();
      wakeSeen = wakeSeen || stats.activeWakes > 0 || stats.wakesSpawned > (wakeBefore.wakesSpawned || 0);
    }
    const wakeAfter = waterStats();
    const target = game.vehicle.position.clone();
    const lookAt = target.clone();
    lookAt.y += 0.7;
    const cameraPosition = target.clone();
    cameraPosition.x -= 7.8;
    cameraPosition.y += 4.6;
    cameraPosition.z -= 8.2;
    game.cameraRig.setCinematic(cameraPosition, lookAt);
    game.cameraRig.smoothedTarget.copy(lookAt);
    game.camera.position.copy(cameraPosition);
    game.camera.fov = 42;
    game.camera.updateProjectionMatrix();
    game.camera.lookAt(lookAt);

    return {
      surfaceSeen,
      splashSeen,
      wakeSeen,
      beforeSpeed: Number(beforeSpeed.toFixed(2)),
      afterSpeed: Number(afterSpeed.toFixed(2)),
      dragReduced: afterSpeed < beforeSpeed * 0.82,
      submergeRespawned: submergedRespawned,
      finalDistance: Number(respawnDistance.toFixed(2)),
      splashCount: game.world.water?.splashes?.length || 0,
      wakeSpawnedDelta: (wakeAfter.wakesSpawned || 0) - (wakeBefore.wakesSpawned || 0),
      activeWakes: wakeAfter.activeWakes || 0,
      stats: wakeAfter
    };
  }, islandRadius);
}

async function sampleSurfaces(page, islandRadius) {
  return page.evaluate((radius) => {
    const game = window.__portfolioDrive.game;
    const sample = (x, z) => game.world.getSurfaceInfo({ x, y: 1.08, z }).id;
    const grassCandidates = [[32, 0], [-18, 112], [42, 8], [-22, -28], [106, 18]];
    const grass = grassCandidates.map(([x, z]) => sample(x, z)).find((id) => id === 'grass') || null;
    return {
      road: sample(0, 24),
      grass,
      sand: sample(radius * 0.91, 0),
      shore: sample(radius * 0.985, 0),
      water: sample(radius * 1.025, 0)
    };
  }, islandRadius);
}

async function exerciseSurfaceFeedback(page, islandRadius) {
  return page.evaluate(async (radius) => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;
    const input = game.input;
    const softTargets = ['grass', 'sand', 'shore'];
    const clearInput = () => {
      input.actions.forward = false;
      input.actions.backward = false;
      input.actions.left = false;
      input.actions.right = false;
      input.actions.boost = false;
      input.actions.handbrake = false;
      input.actions.brake = false;
      input.actions.jump = false;
    };
    const waitForGrounded = async () => {
      for (let i = 0; i < 42; i += 1) {
        if ((game.vehicle.controller?.groundedWheels || 0) >= 2) return true;
        await delay(35);
      }
      return false;
    };
    const stats = () => game.vehicle.getEffectStats?.() || {};
    const before = stats();
    const grassCandidates = [[32, 0], [-18, 112], [42, 8], [-22, -28], [106, 18]];
    const grassPoint = grassCandidates.find(([x, z]) => game.world.getSurfaceInfo({ x, y: 1.08, z }).id === 'grass') || grassCandidates[0];
    const targets = [
      { id: 'grass', x: grassPoint[0], z: grassPoint[1], heading: 0.54 },
      { id: 'sand', x: radius * 0.91, z: 0, heading: -Math.PI / 2 },
      { id: 'shore', x: radius * 0.985, z: 0, heading: -Math.PI / 2 }
    ];
    const samples = [];

    for (const target of targets) {
      clearInput();
      game.vehicle.respawn({ x: target.x, y: 1.08, z: target.z }, target.heading);
      await delay(160);
      const grounded = await waitForGrounded();
      const start = game.vehicle.position.clone();
      const startSurface = game.world.getSurfaceInfo(start).id;
      const direction = { x: Math.sin(target.heading), z: Math.cos(target.heading) };
      game.vehicle.body.setLinvel({ x: direction.x * 15, y: 0, z: direction.z * 15 }, true);
      input.actions.forward = true;
      let seenTargetSurface = startSurface === target.id;
      const seenSurfaces = new Set([startSurface]);
      let peakSpeed = 0;
      for (let i = 0; i < 13; i += 1) {
        await delay(70);
        const surface = game.world.getSurfaceInfo(game.vehicle.position);
        game.vehicle.setSurface(surface);
        seenSurfaces.add(surface.id);
        seenTargetSurface = seenTargetSurface || surface.id === target.id;
        peakSpeed = Math.max(peakSpeed, game.vehicle.speed || 0);
      }
      const end = game.vehicle.position.clone();
      samples.push({
        target: target.id,
        startSurface,
        seenSurfaces: [...seenSurfaces],
        seenTargetSurface,
        grounded,
        distance: Number(start.distanceTo(end).toFixed(2)),
        peakSpeed: Number(peakSpeed.toFixed(2))
      });
    }

    clearInput();
    const after = stats();
    const countDelta = (bucket, id) => (after[bucket]?.[id] || 0) - (before[bucket]?.[id] || 0);
    const trailDeltas = Object.fromEntries(softTargets.map((id) => [id, countDelta('surfaceTrail', id)]));
    const smokeDeltas = Object.fromEntries(softTargets.map((id) => [id, countDelta('surfaceSmoke', id)]));

    return {
      samples,
      targets: Object.fromEntries(samples.map((sample) => [sample.target, sample.seenTargetSurface && sample.grounded && sample.distance > 2])),
      trailDeltas,
      smokeDeltas,
      surfaceDustDelta: (after.surfaceDustSmoke || 0) - (before.surfaceDustSmoke || 0),
      finalStats: after
    };
  }, islandRadius);
}

async function exerciseRouteReplay(page, segments) {
  return page.evaluate(async (replaySegments) => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;
    const input = game.input;
    const failures = [];
    const samples = [];

    const clearInput = () => {
      input.actions.forward = false;
      input.actions.backward = false;
      input.actions.left = false;
      input.actions.right = false;
      input.actions.boost = false;
      input.actions.handbrake = false;
      input.actions.brake = false;
      input.actions.jump = false;
    };

    const waitForGrounded = async () => {
      for (let i = 0; i < 48; i += 1) {
        if ((game.vehicle.controller?.groundedWheels || 0) >= 2) return true;
        await delay(35);
      }
      return false;
    };

    for (const segment of replaySegments) {
      clearInput();
      const offset = Math.min(12, Math.max(4, segment.length * 0.28));
      const heading = segment.rotation;
      const start = {
        x: segment.cx - Math.sin(heading) * offset,
        y: 1.12,
        z: segment.cz - Math.cos(heading) * offset
      };
      game.vehicle.respawn(start, heading);
      await delay(90);
      const grounded = await waitForGrounded();
      const before = game.vehicle.position.clone();
      const startSurface = game.world.getSurfaceInfo(before).id;
      game.vehicle.body.setLinvel({
        x: Math.sin(heading) * 13,
        y: 0,
        z: Math.cos(heading) * 13
      }, true);

      let distance = 0;
      let minY = before.y;
      let groundedFrames = 0;
      let badSurface = null;
      for (let i = 0; i < 11; i += 1) {
        await delay(55);
        const current = game.vehicle.position;
        distance = Math.max(distance, before.distanceTo(current));
        minY = Math.min(minY, current.y);
        if ((game.vehicle.controller?.groundedWheels || 0) >= 2) groundedFrames += 1;
        const surface = game.world.getSurfaceInfo(current).id;
        if (surface === 'water') badSurface = surface;
      }
      const final = game.vehicle.position.clone();
      const finalSurface = game.world.getSurfaceInfo(final).id;
      const pass = grounded && startSurface === 'road' && !badSurface && distance > 2.8 && minY > -0.3 && groundedFrames >= 2;
      const sample = {
        id: segment.id,
        index: segment.index,
        startSurface,
        finalSurface,
        distance: Number(distance.toFixed(2)),
        minY: Number(minY.toFixed(2)),
        grounded,
        groundedFrames,
        pass
      };
      samples.push(sample);
      if (!pass) failures.push(sample);
    }

    clearInput();
    window.__portfolioDrive.respawn('landing');
    return {
      total: replaySegments.length,
      passed: samples.filter((sample) => sample.pass).length,
      failed: failures.length,
      minDistance: Number(Math.min(...samples.map((sample) => sample.distance)).toFixed(2)),
      minY: Number(Math.min(...samples.map((sample) => sample.minY)).toFixed(2)),
      failures
    };
  }, segments);
}

async function sampleWorldLife(page) {
  return page.evaluate(async () => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;
    const scene = game.scene;
    const lifeStats = () => game.world.setPieces?.getLifeStats?.() || { ...(game.world.setPieces?.lifeStats || {}) };
    const grass = scene.getObjectByName('FOLIAGE_grass_instances');
    const districtMotes = scene.getObjectByName('Life_DistrictAmbience_Motes');
    const banners = findVisibleObjects(/^Life_WindBanner_\d+$/);
    const pulse = scene.getObjectByName('Life_ZonePulse_landing');
    const beacon = scene.getObjectByName('Life_WhisperBeacon_0');
    const before = {
      grass: matrixSlice(grass),
      districtMote: matrixSlice(districtMotes),
      bannerRotations: banners.map((banner) => banner.rotation.z),
      pulseRotation: pulse?.rotation?.z ?? null,
      beaconY: beacon?.position?.y ?? null,
      motionSamples: lifeStats().motionSamples || 0
    };
    await delay(720);
    const after = {
      grass: matrixSlice(grass),
      districtMote: matrixSlice(districtMotes),
      bannerRotations: banners.map((banner) => banner.rotation.z),
      pulseRotation: pulse?.rotation?.z ?? null,
      beaconY: beacon?.position?.y ?? null,
      motionSamples: lifeStats().motionSamples || 0
    };

    const mediumStats = lifeStats();
    const mediumWind = { ...(game.world.foliage?.windSamples || {}) };
    game.world.setLandscapeQuality('low');
    await delay(360);
    const lowStats = lifeStats();
    const lowWind = { ...(game.world.foliage?.windSamples || {}) };
    game.world.setLandscapeQuality('medium');
    await delay(360);
    const restoredStats = lifeStats();
    const restoredWind = { ...(game.world.foliage?.windSamples || {}) };

    return {
      counts: mediumStats,
      foliageWind: restoredWind,
      quality: {
        medium: mediumStats,
        low: lowStats,
        restored: restoredStats,
        mediumWind,
        lowWind,
        restoredWind,
        lowReduced: totalVisible(lowStats) < totalVisible(mediumStats),
        restoredMatchesMedium: totalVisible(restoredStats) === totalVisible(mediumStats),
        lowWindReduced: (lowWind.windCadence || 0) > (mediumWind.windCadence || 0)
      },
      deltas: {
        banner: arrayMaxDelta(before.bannerRotations, after.bannerRotations),
        pulse: numericDelta(before.pulseRotation, after.pulseRotation),
        beacon: numericDelta(before.beaconY, after.beaconY)
      },
      grassAnimated: matrixDelta(before.grass, after.grass) > 0.0001,
      districtMoteAnimated: matrixDelta(before.districtMote, after.districtMote) > 0.0001,
      bannerAnimated: arrayMaxDelta(before.bannerRotations, after.bannerRotations) > 0.005,
      pulseAnimated: numericDelta(before.pulseRotation, after.pulseRotation) > 0.005,
      beaconAnimated: numericDelta(before.beaconY, after.beaconY) > 0.005,
      motionAdvanced: after.motionSamples > before.motionSamples
    };

    function matrixSlice(mesh) {
      if (!mesh?.instanceMatrix?.array) return [];
      return Array.from(mesh.instanceMatrix.array.slice(0, 16));
    }

    function matrixDelta(a, b) {
      const length = Math.min(a.length, b.length);
      let total = 0;
      for (let i = 0; i < length; i += 1) total += Math.abs(a[i] - b[i]);
      return total;
    }

    function numericDelta(a, b) {
      if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
      return Math.abs(a - b);
    }

    function arrayMaxDelta(beforeValues, afterValues) {
      const length = Math.min(beforeValues.length, afterValues.length);
      let max = 0;
      for (let index = 0; index < length; index += 1) {
        max = Math.max(max, numericDelta(beforeValues[index], afterValues[index]));
      }
      return max;
    }

    function totalVisible(stats) {
      return (
        (stats.visibleZonePulses || 0) +
        (stats.visibleWindBanners || 0) +
        (stats.visibleWhisperBeacons || 0) +
        (stats.visibleTerminalPulses || 0) +
        (stats.visibleDistrictMotes || 0)
      );
    }

    function findVisibleObjects(pattern) {
      const objects = [];
      scene.traverse((object) => {
        if (!pattern.test(object.name || '') || object.visible === false) return;
        let parent = object.parent;
        while (parent) {
          if (parent.visible === false) return;
          parent = parent.parent;
        }
        objects.push(object);
      });
      return objects;
    }
  });
}

async function exerciseCollectibles(page) {
  return page.evaluate(async () => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;

    game.achievements.unlocked.delete('data_shards');
    game.achievements.save?.();
    for (const item of game.world.collectibles) {
      localStorage.removeItem(`portfolio-drive-shard-${item.index}`);
      item.collected = false;
      item.mesh.visible = true;
    }
    game.world.refreshCollectibleVisuals?.();

    const audioBefore = game.audio?.dataShardsPlayed || 0;
    const collectedPerShard = [];
    for (const item of game.world.collectibles) {
      const before = game.world.getCollectedCount();
      game.vehicle.respawn({ x: item.mesh.position.x, y: 1.08, z: item.mesh.position.z }, 0);
      await delay(90);
      game.collectNearbyDataShards(game.vehicle.position);
      await delay(25);
      collectedPerShard.push(game.world.getCollectedCount() - before);
    }

    const stats = game.world.getCollectibleStats?.() || {};
    return {
      total: game.world.collectibles.length,
      collected: game.world.getCollectedCount(),
      collectedPerShard,
      achievementUnlocked: game.achievements.unlocked.has('data_shards'),
      audioEvents: (game.audio?.dataShardsPlayed || 0) - audioBefore,
      stats
    };
  });
}

async function exercisePanelUi(page) {
  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const zone = game.world.zones.find((item) => item.id === 'security');
    game.ui.openZone(zone, { skipScan: true });
  });
  await delay(350);
  await page.evaluate(() => document.getElementById('notifications')?.replaceChildren());
  await screenshot(page, 'panel-security.png');
  const sample = await page.evaluate(() => {
    const panel = document.getElementById('panel');
    const card = panel?.querySelector('.panel-card');
    const meta = document.getElementById('panel-meta');
    return {
      visible: Boolean(panel && !panel.hidden),
      zoneId: panel?.dataset.zoneId || null,
      mode: panel?.dataset.panelMode || null,
      zoneColor: panel?.style.getPropertyValue('--zone-color') || null,
      metaItems: meta?.querySelectorAll('span').length || 0,
      title: document.getElementById('panel-title')?.textContent || '',
      cardWidth: Math.round(card?.getBoundingClientRect().width || 0)
    };
  });
  await page.click('#panel-close');
  return sample;
}

async function collectRuntimeMetrics(page, loadMs, gameplay, water, surfaces, surfaceFeedback, routeReplay, worldLife) {
  const runtime = await page.evaluate(async (expectedAssets) => {
    const frameDeltas = [];
    await new Promise((resolveFrames) => {
      let previous = performance.now();
      let count = 0;
      function frame(now) {
        frameDeltas.push(now - previous);
        previous = now;
        count += 1;
        if (count >= 180) {
          resolveFrames();
        } else {
          requestAnimationFrame(frame);
        }
      }
      requestAnimationFrame(frame);
    });
    const sorted = [...frameDeltas].sort((a, b) => a - b);
    const avgMs = frameDeltas.reduce((sum, value) => sum + value, 0) / frameDeltas.length;
    const p95Ms = sorted[Math.floor(sorted.length * 0.95)] || 0;
    const game = window.__portfolioDrive.game;
    const protectedLandmarks = sampleProtectedLandmarks(game);
    const info = game.renderer.info.render;
    return {
      ready: window.__portfolioDrive.ready(),
      canvasSample: window.__portfolioDrive.sampleCanvas(),
      avgFrameMs: Number(avgMs.toFixed(2)),
      p95FrameMs: Number(p95Ms.toFixed(2)),
      fps: Number((1000 / avgMs).toFixed(2)),
      calls: info.calls,
      triangles: info.triangles,
      sceneObjects: countSceneObjects(game.scene),
      renderProfile: profileScene(game.scene),
      authoredDistrictAssets: expectedAssets.district.map((name) => ({
        name,
        template: game.environmentAssets?.has?.(name) === true,
        placed: Boolean(game.scene.getObjectByName(`SetPiece_${name}`))
      })),
      authoredStuntAssets: expectedAssets.stunt.map((name) => ({
        name,
        template: game.environmentAssets?.has?.(name) === true,
        placed: Boolean(game.scene.getObjectByName(`STUNT_${name}`))
      })),
      roadGuidance: {
        chevrons: game.scene.getObjectByName('ROAD_Guidance_Chevrons')?.count || 0,
        reflectorStuds: game.scene.getObjectByName('ROAD_Reflector_Studs')?.count || 0,
        edgeFeathers: game.world.roads?.roadGroup?.userData?.edgeFeatherCount || 0
      },
      mapStats: game.ui?.getMapStats?.() || {},
      roadJunctions: {
        blendPatches: game.world.roads?.roadGroup?.userData?.junctionPatchCount || 0,
        circularPointCaps: game.world.roads?.roadGroup?.userData?.circularPointCaps || 0
      },
      surfaceDetails: game.world.terrain?.surfaceDetailStats || {},
      terrainRelief: game.world.terrain?.getReliefStats?.() || {},
      approachDressing: game.world.setPieces?.getApproachStats?.() || {},
      stuntPark: game.world.stuntPark?.getStats?.() || {},
      waterStats: game.world.water?.getStats?.() || {},
      protectedLandmarks,
      vehicleFx: game.vehicle.getEffectStats?.() || {},
      camera: {
        occlusion: sampleCameraOcclusion(game),
        stats: game.cameraRig?.getDebugStats?.() || {}
      },
      colliderCount: window.__portfolioDrive.colliders().length,
      debugOverlayObjects: game.debugColliderOverlay?.children?.length || 0,
      colliderAudit: auditColliders(window.__portfolioDrive.colliders(), game.scene),
      zoneCount: game.world.zones.length,
      audio: {
        zoneStingersPlayed: game.audio?.zoneStingersPlayed || 0,
        dataShardsPlayed: game.audio?.dataShardsPlayed || 0,
        impactsPlayed: game.audio?.impactsPlayed || 0,
        landingEvents: game.vehicle?.landingEvents || 0
      }
    };

    function countSceneObjects(root) {
      let meshes = 0;
      let lights = 0;
      let objects = 0;
      root.traverse((object) => {
        objects += 1;
        if (object.isMesh) meshes += 1;
        if (object.isLight) lights += 1;
      });
      return { objects, meshes, lights };
    }

    function profileScene(root) {
      const buckets = new Map();
      root.traverse((object) => {
        if (!object.isMesh || !isEffectivelyVisible(object)) return;
        const bucketName = getRenderBucketName(object, root);
        const materials = Array.isArray(object.material) ? object.material.length : 1;
        const triangles = estimateTriangles(object);
        if (!buckets.has(bucketName)) {
          buckets.set(bucketName, {
            name: bucketName,
            meshes: 0,
            materials: 0,
            triangles: 0
          });
        }
        const bucket = buckets.get(bucketName);
        bucket.meshes += 1;
        bucket.materials += materials;
        bucket.triangles += triangles;
      });
      return [...buckets.values()]
        .map((bucket) => ({
          ...bucket,
          triangles: Math.round(bucket.triangles)
        }))
        .sort((a, b) => b.materials - a.materials)
        .slice(0, 16);
    }

    function isEffectivelyVisible(object) {
      let current = object;
      while (current) {
        if (current.visible === false) return false;
        current = current.parent;
      }
      return true;
    }

    function getRenderBucketName(object, root) {
      let current = object;
      while (current.parent && current.parent !== root) current = current.parent;
      return current.name || object.name || 'unnamed-root';
    }

    function estimateTriangles(object) {
      const geometry = object.geometry;
      const instanceCount = object.isInstancedMesh ? object.count || 1 : 1;
      const base = geometry?.index
        ? geometry.index.count / 3
        : geometry?.attributes?.position
          ? geometry.attributes.position.count / 3
          : 0;
      return base * instanceCount;
    }

    function auditColliders(colliders, scene) {
      const failures = [];
      const summary = colliders.map((collider) => {
        const genericName = /^Fixed(Box|Cylinder|Ball|Trimesh)$/.test(collider.name || '');
        const visualName = collider.visualName || null;
        const visualExists = collider.sensor || (visualName && Boolean(scene.getObjectByName(visualName)));
        const pass = !genericName && Boolean(visualExists);
        const item = {
          name: collider.name || null,
          type: collider.type,
          sensor: Boolean(collider.sensor),
          visualName,
          visualExists: Boolean(visualExists),
          pass
        };
        if (!pass) failures.push(item);
        return item;
      });
      return { total: summary.length, failures, summary };
    }

    function sampleCameraOcclusion(game) {
      const education = game.world.zones.find((zone) => zone.id === 'education');
      const target = education?.position?.clone?.() || game.vehicle.position.clone();
      const desired = target.clone();
      target.set(-78, 2, 68);
      desired.set(-78, 7, 100);
      return game.cameraRig?.probeOcclusion?.(target, desired) || null;
    }

    function sampleProtectedLandmarks(game) {
      const zones = game.world.zonesSystem;
      if (!zones?.getProtectedLandmarkStats) return {};
      window.__portfolioDrive.respawn('landing');
      zones.update(game.vehicle.position);
      const far = zones.getProtectedLandmarkStats();
      const educationPose = game.world.getRespawnPose('education');
      game.vehicle.respawn(educationPose.position, educationPose.heading);
      zones.update(game.vehicle.position);
      const near = zones.getProtectedLandmarkStats();
      window.__portfolioDrive.respawn('landing');
      zones.update(game.vehicle.position);
      const restored = zones.getProtectedLandmarkStats();
      return {
        far: far.education || null,
        near: near.education || null,
        restored: restored.education || null
      };
    }
  }, { district: authoredDistrictAssets, stunt: authoredStuntAssets });
  return {
    loadMs,
    gameplay,
    water,
    surfaces,
    surfaceFeedback,
    routeReplay,
    worldLife,
    ...runtime
  };
}

async function captureMobile(browser) {
  const page = await browser.newPage();
  wirePageDiagnostics(page);
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.evaluateOnNewDocument(() => {
    localStorage.removeItem('portfolio-drive-landscape-quality');
    localStorage.setItem('portfolio-drive-muted', '1');
  });
  await page.goto(`${baseUrl}/play/?debugDrive=1`, { waitUntil: 'networkidle0', timeout: 60000 });
  await waitForReady(page);
  await page.evaluate(() => window.__portfolioDrive.start());
  await delay(700);
  await page.screenshot({ path: join(outputDir, 'mobile-start.png'), fullPage: true });
  const sample = await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const render = game.renderer.info.render;
    return {
      canvasSample: window.__portfolioDrive.sampleCanvas(),
      quality: game.world.landscapeQuality,
      savedQuality: localStorage.getItem('portfolio-drive-landscape-quality'),
      lifeStats: game.world.setPieces?.getLifeStats?.() || { ...(game.world.setPieces?.lifeStats || {}) },
      calls: render.calls,
      triangles: render.triangles
    };
  });
  await page.close();
  return { ready: true, ...sample };
}

async function captureMobileSavedPreference(browser) {
  const page = await browser.newPage();
  wirePageDiagnostics(page);
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('portfolio-drive-landscape-quality', 'high');
    localStorage.setItem('portfolio-drive-muted', '1');
  });
  await page.goto(`${baseUrl}/play/`, { waitUntil: 'networkidle0', timeout: 60000 });
  await waitForReady(page);
  const sample = await page.evaluate(() => ({
    ready: window.__portfolioDrive.ready(),
    canvasSample: window.__portfolioDrive.sampleCanvas(),
    quality: window.__portfolioDrive.game.world.landscapeQuality,
    savedQuality: localStorage.getItem('portfolio-drive-landscape-quality')
  }));
  await page.close();
  return sample;
}

function getGlbAssetSizes() {
  const files = [
    'play/game-assets/sabre-turbo.glb',
    'play/game-assets/medieval-props.glb',
    'play/game-assets/polish-props.glb',
    'play-src/assets/models/world/island-visual.glb',
    'play-src/assets/models/world/island-physics.glb'
  ];
  return Object.fromEntries(files.map((file) => {
    const path = resolve(repoRoot, file);
    return [file, existsSync(path) ? statSync(path).size : null];
  }));
}

function assertVerification(result) {
  const failures = [];
  if (pageErrors.length) failures.push(`page errors: ${pageErrors.length}`);
  if (consoleMessages.some((message) => message.type === 'error')) failures.push('console errors were emitted');
  if (!result.ready || result.canvasSample <= 0) failures.push('canvas did not render');
  if (result.zoneCount !== worldZones.length) failures.push(`zone count mismatch: ${result.zoneCount}/${worldZones.length}`);
  if (result.colliderCount <= 0 || result.debugOverlayObjects <= 0) failures.push('collider debug overlay did not render');
  if (result.colliderAudit?.failures?.length) failures.push(`collider audit failed: ${result.colliderAudit.failures.map((item) => item.name).join(', ')}`);
  if (result.routeReplay?.total !== routeReplaySegments.length) failures.push(`route replay count mismatch: ${result.routeReplay?.total}/${routeReplaySegments.length}`);
  if (result.routeReplay?.failed) failures.push(`route replay failed: ${result.routeReplay.failed}/${result.routeReplay.total}`);
  if (result.worldLife?.counts?.zonePulses !== worldZones.length) failures.push(`world life probe failed: zone pulses ${result.worldLife?.counts?.zonePulses}/${worldZones.length}`);
  if ((result.worldLife?.counts?.windBanners || 0) < 8) failures.push('world life probe failed: wind banners');
  if ((result.worldLife?.counts?.whisperBeacons || 0) < 8) failures.push('world life probe failed: whisper beacons');
  if ((result.worldLife?.counts?.terminalPulses || 0) < 5) failures.push('world life probe failed: terminal pulses');
  if ((result.worldLife?.counts?.districtMotes || 0) < 64) failures.push(`world life probe failed: district motes ${result.worldLife?.counts?.districtMotes || 0}`);
  if ((result.worldLife?.counts?.visibleDistrictMotes || 0) < 48) failures.push(`world life probe failed: visible district motes ${result.worldLife?.counts?.visibleDistrictMotes || 0}`);
  if (!result.worldLife?.quality?.lowReduced) failures.push('quality probe failed: low world-life tier did not reduce visible signals');
  if (!result.worldLife?.quality?.restoredMatchesMedium) failures.push('quality probe failed: medium world-life tier did not restore');
  if (!result.worldLife?.quality?.lowWindReduced) failures.push('quality probe failed: low foliage wind cadence did not reduce work');
  if ((result.worldLife?.quality?.low?.visibleWindBanners || 0) > 4) failures.push('quality probe failed: low wind banners exceeded budget');
  if ((result.worldLife?.quality?.low?.visibleWhisperBeacons || 0) > 4) failures.push('quality probe failed: low whisper beacons exceeded budget');
  if ((result.worldLife?.quality?.low?.visibleTerminalPulses || 0) > 2) failures.push('quality probe failed: low terminal pulses exceeded budget');
  if ((result.worldLife?.quality?.low?.visibleDistrictMotes || 0) > 16) failures.push('quality probe failed: low district motes exceeded budget');
  for (const key of ['grassAnimated', 'districtMoteAnimated', 'bannerAnimated', 'pulseAnimated', 'beaconAnimated', 'motionAdvanced']) {
    if (!result.worldLife?.[key]) failures.push(`world life probe failed: ${key}`);
  }
  if (result.calls > 560) failures.push(`desktop draw-call budget exceeded: ${result.calls}`);
  if (result.p95FrameMs > 20) failures.push(`p95 frame time too high: ${result.p95FrameMs}ms`);
  if (result.gameplay.movementMeters < 5) failures.push(`drive movement too small: ${result.gameplay.movementMeters}m`);
  for (const key of ['keyboardHandbrake', 'boostSeen', 'jumpSeen', 'landingSeen', 'impactAudioSeen', 'burnoutSeen', 'wheelieSeen', 'handbrakeSeen']) {
    if (!result.gameplay[key]) failures.push(`gameplay probe failed: ${key}`);
  }
  const vehicleFx = result.gameplay.vehicleFx || {};
  if ((vehicleFx.spawnedTrail || 0) < 1) failures.push(`vehicle FX probe failed: trail=${vehicleFx.spawnedTrail || 0}`);
  if ((vehicleFx.spawnedSmoke || 0) < 2) failures.push(`vehicle FX probe failed: smoke=${vehicleFx.spawnedSmoke || 0}`);
  if ((vehicleFx.spawnedBoost || 0) < 1) failures.push(`vehicle FX probe failed: boost=${vehicleFx.spawnedBoost || 0}`);
  if ((vehicleFx.spawnedSkid || 0) < 2) failures.push(`vehicle FX probe failed: skid=${vehicleFx.spawnedSkid || 0}`);
  const surfaceFeedback = result.surfaceFeedback || {};
  for (const id of ['grass', 'sand', 'shore']) {
    if (!surfaceFeedback.targets?.[id]) failures.push(`surface feedback probe failed: target ${id}`);
    if ((surfaceFeedback.trailDeltas?.[id] || 0) < 1) failures.push(`surface feedback probe failed: ${id} trail=${surfaceFeedback.trailDeltas?.[id] || 0}`);
    if ((surfaceFeedback.smokeDeltas?.[id] || 0) < 1) failures.push(`surface feedback probe failed: ${id} smoke=${surfaceFeedback.smokeDeltas?.[id] || 0}`);
  }
  if ((surfaceFeedback.surfaceDustDelta || 0) < 6) failures.push(`surface feedback probe failed: surface dust=${surfaceFeedback.surfaceDustDelta || 0}`);
  if (!result.camera?.occlusion?.resolvedCloser) failures.push('camera occlusion probe failed');
  if ((result.camera?.stats?.tests || 0) < 1) failures.push('camera occlusion stats did not record tests');
  if ((result.audio?.zoneStingersPlayed || 0) < 1) failures.push('audio probe failed: zone stingers');
  if ((result.audio?.landingEvents || 0) < 1) failures.push('audio probe failed: landing event counter');
  if (result.collectibles?.total !== 7) failures.push(`collectible probe failed: total=${result.collectibles?.total}`);
  if (result.collectibles?.collected !== result.collectibles?.total) failures.push(`collectible probe failed: collected=${result.collectibles?.collected}/${result.collectibles?.total}`);
  if (result.collectibles?.collectedPerShard?.some((value) => value < 1)) failures.push(`collectible probe failed: per-shard deltas=${result.collectibles.collectedPerShard.join(',')}`);
  if (!result.collectibles?.achievementUnlocked) failures.push('collectible probe failed: data_shards achievement');
  if ((result.collectibles?.audioEvents || 0) < result.collectibles?.total) failures.push(`collectible probe failed: audio events=${result.collectibles?.audioEvents || 0}`);
  if ((result.collectibles?.stats?.visibleShards || 0) !== 0) failures.push(`collectible probe failed: visible shards=${result.collectibles?.stats?.visibleShards || 0}`);
  if ((result.collectibles?.stats?.ringInstances || 0) !== result.collectibles?.total) failures.push(`collectible probe failed: ring instances=${result.collectibles?.stats?.ringInstances || 0}`);
  if ((result.collectibles?.stats?.beamInstances || 0) !== result.collectibles?.total) failures.push(`collectible probe failed: beam instances=${result.collectibles?.stats?.beamInstances || 0}`);
  if (!result.panelUi?.visible || result.panelUi.zoneId !== 'security') failures.push('panel UI probe failed: security terminal did not open');
  if (result.panelUi?.mode !== 'terminal') failures.push(`panel UI probe failed: mode=${result.panelUi?.mode}`);
  if ((result.panelUi?.metaItems || 0) < 4) failures.push(`panel UI probe failed: meta items=${result.panelUi?.metaItems || 0}`);
  if ((result.panelUi?.cardWidth || 0) > 620) failures.push(`panel UI probe failed: card too wide=${result.panelUi?.cardWidth || 0}`);
  if (!result.water?.surfaceSeen) failures.push('water probe failed: surface state');
  if (!result.water?.splashSeen) failures.push('water probe failed: splash particles');
  if (!result.water?.wakeSeen) failures.push('water probe failed: wake rings');
  if ((result.water?.wakeSpawnedDelta || 0) < 2) failures.push(`water probe failed: wake delta=${result.water?.wakeSpawnedDelta || 0}`);
  if ((result.water?.activeWakes || 0) < 1) failures.push(`water probe failed: active wakes=${result.water?.activeWakes || 0}`);
  if (!result.water?.dragReduced) failures.push('water probe failed: drag');
  if (!result.water?.submergeRespawned) failures.push('water probe failed: submerge respawn');
  if (result.surfaces?.road !== 'road') failures.push(`surface probe failed: road=${result.surfaces?.road}`);
  if (result.surfaces?.grass !== 'grass') failures.push(`surface probe failed: grass=${result.surfaces?.grass}`);
  if (result.surfaces?.sand !== 'sand') failures.push(`surface probe failed: sand=${result.surfaces?.sand}`);
  if (result.surfaces?.shore !== 'shore') failures.push(`surface probe failed: shore=${result.surfaces?.shore}`);
  if (result.surfaces?.water !== 'water') failures.push(`surface probe failed: water=${result.surfaces?.water}`);
  if ((result.roadGuidance?.chevrons || 0) < 40) failures.push(`road guidance probe failed: chevrons=${result.roadGuidance?.chevrons || 0}`);
  if ((result.roadGuidance?.reflectorStuds || 0) < 140) failures.push(`road guidance probe failed: reflectorStuds=${result.roadGuidance?.reflectorStuds || 0}`);
  if ((result.roadGuidance?.edgeFeathers || 0) < 24) failures.push(`road guidance probe failed: edgeFeathers=${result.roadGuidance?.edgeFeathers || 0}`);
  if ((result.mapStats?.pins || 0) !== worldZones.length) failures.push(`map probe failed: pins=${result.mapStats?.pins || 0}/${worldZones.length}`);
  if ((result.mapStats?.districtLabels || 0) !== districtFootprints.length) failures.push(`map probe failed: districtLabels=${result.mapStats?.districtLabels || 0}/${districtFootprints.length}`);
  if ((result.mapStats?.routeLabels || 0) !== roadPaths.length) failures.push(`map probe failed: routeLabels=${result.mapStats?.routeLabels || 0}/${roadPaths.length}`);
  if ((result.mapStats?.roadUnderlays || 0) !== roadPaths.length) failures.push(`map probe failed: roadUnderlays=${result.mapStats?.roadUnderlays || 0}/${roadPaths.length}`);
  if ((result.mapStats?.roadLines || 0) !== roadPaths.length) failures.push(`map probe failed: roadLines=${result.mapStats?.roadLines || 0}/${roadPaths.length}`);
  if ((result.mapStats?.circuitCheckpoints || 0) !== circuitCheckpoints.length) failures.push(`map probe failed: circuitCheckpoints=${result.mapStats?.circuitCheckpoints || 0}/${circuitCheckpoints.length}`);
  if ((result.mapStats?.legendItems || 0) < 5) failures.push(`map probe failed: legendItems=${result.mapStats?.legendItems || 0}`);
  if ((result.roadJunctions?.blendPatches || 0) < 8) failures.push(`road junction probe failed: blendPatches=${result.roadJunctions?.blendPatches || 0}`);
  if ((result.roadJunctions?.circularPointCaps || 0) !== 0) failures.push(`road junction probe failed: circularPointCaps=${result.roadJunctions?.circularPointCaps || 0}`);
  if ((result.surfaceDetails?.districts || 0) < 10) failures.push(`surface detail probe failed: districts=${result.surfaceDetails?.districts || 0}`);
  if ((result.surfaceDetails?.seams || 0) < 40) failures.push(`surface detail probe failed: seams=${result.surfaceDetails?.seams || 0}`);
  if ((result.surfaceDetails?.pavers || 0) < 24) failures.push(`surface detail probe failed: pavers=${result.surfaceDetails?.pavers || 0}`);
  if ((result.surfaceDetails?.accents || 0) < 18) failures.push(`surface detail probe failed: accents=${result.surfaceDetails?.accents || 0}`);
  if ((result.terrainRelief?.mounds || 0) < 6) failures.push(`terrain relief probe failed: mounds=${result.terrainRelief?.mounds || 0}`);
  if ((result.terrainRelief?.cliffShelves || 0) < 6) failures.push(`terrain relief probe failed: cliffShelves=${result.terrainRelief?.cliffShelves || 0}`);
  if ((result.terrainRelief?.rockOutcrops || 0) < 12) failures.push(`terrain relief probe failed: rockOutcrops=${result.terrainRelief?.rockOutcrops || 0}`);
  if ((result.terrainRelief?.duneRidges || 0) < 6) failures.push(`terrain relief probe failed: duneRidges=${result.terrainRelief?.duneRidges || 0}`);
  if ((result.terrainRelief?.contourBands || 0) < 40) failures.push(`terrain relief probe failed: contourBands=${result.terrainRelief?.contourBands || 0}`);
  if ((result.terrainRelief?.beachRipples || 0) < 44) failures.push(`terrain relief probe failed: beachRipples=${result.terrainRelief?.beachRipples || 0}`);
  if ((result.approachDressing?.clusters || 0) < 12) failures.push(`approach dressing probe failed: clusters=${result.approachDressing?.clusters || 0}`);
  if ((result.approachDressing?.signs || 0) < 12) failures.push(`approach dressing probe failed: signs=${result.approachDressing?.signs || 0}`);
  if ((result.approachDressing?.lamps || 0) < 12) failures.push(`approach dressing probe failed: lamps=${result.approachDressing?.lamps || 0}`);
  if ((result.approachDressing?.authoredAssets || 0) < 20) failures.push(`approach dressing probe failed: authoredAssets=${result.approachDressing?.authoredAssets || 0}`);
  if ((result.approachDressing?.roadMarks || 0) < 36) failures.push(`approach dressing probe failed: roadMarks=${result.approachDressing?.roadMarks || 0}`);
  if ((result.stuntPark?.ramps || 0) < 3) failures.push(`stunt park probe failed: ramps=${result.stuntPark?.ramps || 0}`);
  if ((result.stuntPark?.boostPads || 0) < 3) failures.push(`stunt park probe failed: boostPads=${result.stuntPark?.boostPads || 0}`);
  if ((result.stuntPark?.cones || 0) < 12) failures.push(`stunt park probe failed: cones=${result.stuntPark?.cones || 0}`);
  if ((result.stuntPark?.tireStacks || 0) < 5) failures.push(`stunt park probe failed: tireStacks=${result.stuntPark?.tireStacks || 0}`);
  if ((result.stuntPark?.landingMarkers || 0) < 6) failures.push(`stunt park probe failed: landingMarkers=${result.stuntPark?.landingMarkers || 0}`);
  if ((result.stuntPark?.authoredAssets || 0) < 7) failures.push(`stunt park probe failed: authoredAssets=${result.stuntPark?.authoredAssets || 0}`);
  if ((result.stuntPark?.laneChevrons || 0) < 18) failures.push(`stunt park probe failed: laneChevrons=${result.stuntPark?.laneChevrons || 0}`);
  if ((result.stuntPark?.trackScuffs || 0) < 30) failures.push(`stunt park probe failed: trackScuffs=${result.stuntPark?.trackScuffs || 0}`);
  if ((result.stuntPark?.gates || 0) < 2) failures.push(`stunt park probe failed: gates=${result.stuntPark?.gates || 0}`);
  const fccFar = result.protectedLandmarks?.far;
  const fccNear = result.protectedLandmarks?.near;
  const fccRestored = result.protectedLandmarks?.restored;
  if (fccFar?.mode !== 'silhouette' || fccFar?.exactVisible || !fccFar?.silhouetteVisible) {
    failures.push(`protected FCC LOD failed at distance: mode=${fccFar?.mode}`);
  }
  if (fccNear?.mode !== 'exact' || !fccNear?.exactVisible || fccNear?.silhouetteVisible) {
    failures.push(`protected FCC LOD failed near landmark: mode=${fccNear?.mode}`);
  }
  if (fccRestored?.mode !== 'silhouette' || fccRestored?.exactVisible || !fccRestored?.silhouetteVisible) {
    failures.push(`protected FCC LOD failed after restore: mode=${fccRestored?.mode}`);
  }
  if ((fccNear?.exactTriangles || 0) < 100000) failures.push(`protected FCC exact model not preserved: triangles=${fccNear?.exactTriangles || 0}`);
  if ((fccFar?.silhouetteTriangles || Infinity) > 2000) failures.push(`protected FCC silhouette too heavy: triangles=${fccFar?.silhouetteTriangles}`);
  const missingAuthored = (result.authoredDistrictAssets || []).filter((asset) => !asset.template || !asset.placed);
  if (missingAuthored.length) failures.push(`authored district assets missing: ${missingAuthored.map((asset) => asset.name).join(', ')}`);
  const missingStunt = (result.authoredStuntAssets || []).filter((asset) => !asset.template || !asset.placed);
  if (missingStunt.length) failures.push(`authored stunt assets missing: ${missingStunt.map((asset) => asset.name).join(', ')}`);
  if (!result.mobile.ready || result.mobile.canvasSample <= 0) failures.push('mobile canvas did not render');
  if (result.mobile.quality !== 'low') failures.push(`mobile quality tier mismatch: ${result.mobile.quality}`);
  if (result.mobile.savedQuality !== null) failures.push(`mobile default quality should not write saved preference: ${result.mobile.savedQuality}`);
  if (result.mobile.calls > 260) failures.push(`mobile draw-call budget exceeded: ${result.mobile.calls}`);
  if ((result.mobile.lifeStats?.visibleTotal || 0) >= (result.worldLife?.quality?.medium?.visibleTotal || Infinity)) {
    failures.push('mobile quality probe failed: visible life signals were not reduced');
  }
  if (!result.mobileSavedPreference.ready || result.mobileSavedPreference.canvasSample <= 0) failures.push('mobile saved-preference canvas did not render');
  if (result.mobileSavedPreference.quality !== 'high') {
    failures.push(`mobile saved-preference quality mismatch: ${result.mobileSavedPreference.quality}`);
  }
  if (result.mobileSavedPreference.savedQuality !== 'high') {
    failures.push(`mobile saved-preference storage mismatch: ${result.mobileSavedPreference.savedQuality}`);
  }
  if (failures.length) {
    throw new Error(`Play verification failed: ${failures.join('; ')}`);
  }
}

function getRouteReplaySegments() {
  const segments = [];
  for (const path of roadPaths) {
    const limit = path.closed ? path.points.length : path.points.length - 1;
    for (let index = 0; index < limit; index += 1) {
      const a = path.points[index];
      const b = path.points[(index + 1) % path.points.length];
      const dx = b[0] - a[0];
      const dz = b[1] - a[1];
      const length = Math.hypot(dx, dz);
      if (length < 6) continue;
      segments.push({
        id: path.id,
        index,
        cx: (a[0] + b[0]) / 2,
        cz: (a[1] + b[1]) / 2,
        width: path.width,
        length,
        rotation: Math.atan2(dx, dz)
      });
    }
  }
  return segments;
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium'
  ].filter(Boolean);
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error('Chrome/Edge was not found. Set CHROME_PATH to run play verification.');
  }
  return found;
}

function slug(value) {
  return value.replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
}

function delay(ms) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}
