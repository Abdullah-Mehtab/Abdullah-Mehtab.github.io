// ABOUTME: Runs a browser verification pass for the /play GitHub Pages build.
// ABOUTME: Captures screenshots, gameplay probes, renderer metrics, and console failures.
import { createServer } from 'node:http';
import { existsSync, readFile, statSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import puppeteer from 'puppeteer-core';
import {
  circuitCheckpoints,
  districtFootprints,
  ISLAND_RADIUS,
  roadPaths,
  routeThresholds,
  SECURITY_SCAN_OFFSET,
  SECURITY_SCAN_ROTATION,
  worldZones,
  zonePresentation
} from '../play-src/src/world/worldData.js';

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
  'EnvPolishProjectGantry',
  'EnvPolishProjectDisplayRack',
  'EnvPolishProjectPartsCart',
  'EnvPolishProjectCableReel',
  'EnvPolishCampusFountain',
  'EnvPolishCampusNoticeBoard',
  'EnvPolishCampusWalkwayPavilion',
  'EnvPolishCampusStudyBench',
  'EnvPolishCvVault',
  'EnvPolishCvArchiveSpine',
  'EnvPolishSkillsArray',
  'EnvPolishCareerOffice',
  'EnvPolishAwardsMonument',
  'EnvPolishTodoBoard',
  'EnvPolishDocumentArcade',
  'EnvPolishTerminalCanopy',
  'EnvPolishQueueMarquee',
  'EnvPolishProcessCrane',
  'EnvPolishCircuitGate',
  'EnvPolishBuildWorkbench',
  'EnvPolishFarmIrrigator',
  'EnvPolishHarborSignal',
  'EnvPolishDistrictGateway',
  'EnvPolishRouteLantern',
  'EnvPolishBuildCrateStack',
  'EnvPolishTerminalBank',
  'EnvPolishArchiveStepCluster',
  'EnvPolishTodoCardStack',
  'EnvPolishYardEdgeTrim',
  'EnvPolishYardSurfaceMarks',
  'EnvPolishWorkshopProcessRail',
  'EnvPolishSignalSpire',
  'EnvPolishWorkshopCanopy',
  'EnvPolishGardenArch',
  'EnvPolishRouteSplitterIsland',
  'EnvPolishPlazaEdgeKit',
  'EnvPolishChevronBollardRun',
  'EnvPolishRouteStoryMarker',
  'EnvPolishRouteVistaKit'
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
    localStorage.setItem('portfolio-drive-disable-analytics', '1');
  });

  const startedAt = Date.now();
  await page.goto(`${baseUrl}/play/?debugDrive=1`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await waitForReady(page);
  const loadMs = Date.now() - startedAt;
  await screenshot(page, '01-title.png');
  const titleUi = await sampleTitleUi(page);

  await page.evaluate(() => window.__portfolioDrive.start());
  await delay(700);
  await screenshot(page, '02-start-driving.png');
  await stageRoadJunctionView(page, [-56, 18, -20], [-68, 0.25, -12]);
  await screenshot(page, 'road-junction-security.png');
  await stageRoadJunctionView(page, [-42, 18, -88], [-52, 0.25, -98]);
  await screenshot(page, 'road-junction-dirt.png');

  const gameplay = await exerciseGameplay(page);
  const vehicleLights = await sampleVehicleLights(page);
  await screenshot(page, '03-driving-stress.png');
  const drivingStressMetrics = await sampleRenderSnapshot(page);
  const water = await exerciseWater(page, ISLAND_RADIUS);
  const waterView = await stageWaterInteractionView(page, ISLAND_RADIUS);
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
  const surfaceStressMetrics = await sampleRenderSnapshot(page);
  const securityScan = await exerciseSecurityScan(page);
  const routeReplay = await exerciseRouteReplay(page, routeReplaySegments);
  const forwardDriveProbe = await exerciseForwardDriveProbe(page, routeReplaySegments);
  const circuitPreview = await previewCircuit(page);
  await screenshot(page, '06-circuit-target.png');
  const circuit = await finishCircuit(page, circuitPreview);
  const worldLife = await sampleWorldLife(page);
  await showWhisperForScreenshot(page);
  await screenshot(page, '07-world-whisper.png');
  await page.evaluate(() => window.__portfolioDrive.game.ui.updateWhisper(null));

  for (const zone of worldZones) {
    await page.evaluate((zoneId) => {
      const game = window.__portfolioDrive.game;
      const zoneEntry = game.world.zones.find((item) => item.id === zoneId);
      window.__portfolioDrive.respawn(zoneId);
      if (zoneEntry) game.focusZone(zoneEntry);
    }, zone.id);
    await delay(650);
    await screenshot(page, `zone-${slug(zone.id)}.png`);
  }
  await page.evaluate(() => window.__portfolioDrive.game.clearFocus());

  const collectiblePreviewAvailable = await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const shard = game.world.collectibles[0];
    if (!shard) return false;
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
    return true;
  });
  if (collectiblePreviewAvailable) {
    await delay(350);
    await screenshot(page, 'collectible-data-shard.png');
    await page.evaluate(() => {
      const game = window.__portfolioDrive.game;
      game.camera.fov = game.cameraRig.baseFov;
      game.camera.updateProjectionMatrix();
      game.clearFocus();
    });
  }
  const panelUi = await exercisePanelUi(page);

  await page.click('#map-button');
  await delay(350);
  await screenshot(page, 'map.png');
  const mapUi = await sampleOverlayUi(page);
  await page.click('#map-close');

  await page.click('#menu-button');
  await delay(350);
  await screenshot(page, 'menu.png');
  const menuUi = await sampleOverlayUi(page);
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

  const activeSnapshots = { driving: drivingStressMetrics, surfaceFeedback: surfaceStressMetrics };
  const metrics = await collectRuntimeMetrics(page, loadMs, gameplay, water, surfaces, surfaceFeedback, routeReplay, circuit, worldLife, activeSnapshots);
  const highQuality = await captureHighQuality(browser);
  const highDpiDesktop = await captureHighDpiDesktop(browser);
  const mobile = await captureMobile(browser);
  const mobileSavedPreference = await captureMobileSavedPreference(browser);
  const result = {
    baseUrl,
    outputDir,
    consoleMessages,
    pageErrors,
    glbAssets: getGlbAssetSizes(),
    roadTopology: sampleRoadTopology(),
    highQuality,
    highDpiDesktop,
    mobile,
    mobileSavedPreference,
    titleUi,
    panelUi,
    overlayUi: { map: mapUi, menu: menuUi },
    collectibles,
    securityScan,
    forwardDriveProbe,
    vehicleLights,
    waterView,
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

async function sampleVehicleLights(page) {
  return page.evaluate(async () => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;
    const input = game.input;
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
    const stats = () => game.vehicle.getLightStats?.() || game.vehicle.getEffectStats?.().lights || {};

    window.__portfolioDrive.respawn('landing');
    clearInput();
    await delay(160);
    const base = stats();

    input.actions.brake = true;
    game.vehicle.updateVehicleLights(input, { boost: false, wheelie: false, burnout: false });
    const brake = stats();

    clearInput();
    input.actions.backward = true;
    game.vehicle.controller.localSpeed = -1.2;
    game.vehicle.updateVehicleLights(input, { boost: false, wheelie: false, burnout: false });
    const reverse = stats();

    clearInput();
    game.vehicle.updateVehicleLights(input, { boost: true, wheelie: false, burnout: false });
    const boost = stats();

    clearInput();
    game.vehicle.updateVehicleLights(input, { boost: false, wheelie: false, burnout: false });

    return {
      base,
      brake,
      reverse,
      boost,
      headlightsReady: (base.visibleHeadlightLenses || 0) >= 2 && (base.visibleHeadlightPools || 0) >= 2,
      brakeReady: (brake.visibleBrakeLenses || 0) >= 2 && (brake.brakeGlowScale || 0) >= 1,
      reverseReady: (reverse.visibleReverseLenses || 0) >= 2 && (reverse.reverseGlowScale || 0) >= 1,
      boostReady: (boost.visibleBoostLenses || 0) >= 2 && (boost.boostGlowScale || 0) >= 1
    };
  });
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
    let foamStreakSeen = false;
    for (let i = 0; i < 14; i += 1) {
      await delay(80);
      surfaceSeen = surfaceSeen || game.world.surfaceState?.inWater === true;
      const stats = waterStats();
      splashSeen = splashSeen || (stats.activeSplashes || stats.splashes || 0) > 0;
      wakeSeen = wakeSeen || stats.activeWakes > 0 || stats.wakesSpawned > (wakeBefore.wakesSpawned || 0);
      foamStreakSeen = foamStreakSeen || stats.activeFoamStreaks > 0 || stats.foamStreaksSpawned > (wakeBefore.foamStreaksSpawned || 0);
    }
    const afterSpeed = horizontalSpeed();

    game.vehicle.respawn({ x: radius * 1.044, y: 0.7, z: 0 }, Math.PI * 0.5);
    for (let i = 0; i < 18; i += 1) {
      await delay(80);
    }
    const afterRespawn = game.vehicle.position;
    const respawnDistance = Math.hypot(afterRespawn.x, afterRespawn.z);
    const landingPose = game.world.getRespawnPose('landing');
    const landingRespawnDistance = afterRespawn.distanceTo(landingPose.position);
    const submergedRespawned = landingRespawnDistance < 8;

    game.vehicle.respawn({ x: radius * 0.972, y: 1.08, z: 0 }, 0);
    game.vehicle.body.setLinvel({ x: 0, y: 0, z: 12 }, true);
    for (let i = 0; i < 8; i += 1) {
      await delay(80);
      const stats = waterStats();
      wakeSeen = wakeSeen || stats.activeWakes > 0 || stats.wakesSpawned > (wakeBefore.wakesSpawned || 0);
      foamStreakSeen = foamStreakSeen || stats.activeFoamStreaks > 0 || stats.foamStreaksSpawned > (wakeBefore.foamStreaksSpawned || 0);
    }

    const wakeAfter = waterStats();
    const target = game.vehicle.position.clone();
    const lookAt = target.clone();
    lookAt.y += 0.7;
    const cameraPosition = target.clone();
    cameraPosition.x += 8.8;
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
      foamStreakSeen,
      beforeSpeed: Number(beforeSpeed.toFixed(2)),
      afterSpeed: Number(afterSpeed.toFixed(2)),
      dragReduced: afterSpeed < beforeSpeed * 0.82,
      submergeRespawned: submergedRespawned,
      finalDistance: Number(respawnDistance.toFixed(2)),
      landingRespawnDistance: Number(landingRespawnDistance.toFixed(2)),
      splashCount: wakeAfter.activeSplashes || wakeAfter.splashes || 0,
      wakeSpawnedDelta: (wakeAfter.wakesSpawned || 0) - (wakeBefore.wakesSpawned || 0),
      activeWakes: wakeAfter.activeWakes || 0,
      foamStreakSpawnedDelta: (wakeAfter.foamStreaksSpawned || 0) - (wakeBefore.foamStreaksSpawned || 0),
      activeFoamStreaks: wakeAfter.activeFoamStreaks || 0,
      stats: wakeAfter
    };
  }, islandRadius);
}

async function stageWaterInteractionView(page, islandRadius) {
  return page.evaluate(async (radius) => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;
    const input = game.input;
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
    clearInput();
    const statsBefore = game.world.water?.getStats?.() || {};
    game.vehicle.respawn({ x: radius * 0.972, y: 1.08, z: -8 }, 0);
    game.vehicle.body.setLinvel({ x: 0, y: 0, z: 14 }, true);
    for (let i = 0; i < 8; i += 1) {
      await delay(80);
    }
    const statsAfter = game.world.water?.getStats?.() || {};
    const target = game.vehicle.position.clone();
    const lookAt = target.clone();
    lookAt.y += 0.65;
    const cameraPosition = target.clone();
    lookAt.x += 2.2;
    cameraPosition.x -= 7.2;
    cameraPosition.y += 4.0;
    cameraPosition.z -= 7.0;
    game.cameraRig.setCinematic(cameraPosition, lookAt);
    game.cameraRig.smoothedTarget.copy(lookAt);
    game.camera.position.copy(cameraPosition);
    game.camera.fov = 40;
    game.camera.updateProjectionMatrix();
    game.camera.lookAt(lookAt);

    return {
      surface: game.world.surfaceState?.label || null,
      activeSplashes: statsAfter.activeSplashes || 0,
      activeWakes: statsAfter.activeWakes || 0,
      activeFoamStreaks: statsAfter.activeFoamStreaks || 0,
      splashDelta: (statsAfter.splashesSpawned || 0) - (statsBefore.splashesSpawned || 0),
      wakeDelta: (statsAfter.wakesSpawned || 0) - (statsBefore.wakesSpawned || 0),
      foamStreakDelta: (statsAfter.foamStreaksSpawned || 0) - (statsBefore.foamStreaksSpawned || 0)
    };
  }, islandRadius);
}

async function sampleSurfaces(page, islandRadius) {
  return page.evaluate(({ radius, paths }) => {
    const game = window.__portfolioDrive.game;
    const sampleSurface = (x, z) => {
      const surface = game.world.getSurfaceInfo({ x, y: 1.08, z });
      return {
        id: surface.id,
        label: surface.label,
        roadId: surface.roadId || null,
        roadHierarchy: surface.roadHierarchy || null,
        audioId: surface.audioId || surface.id,
        effectId: surface.effectId || surface.id,
        forwardGrip: Number((surface.forwardGrip ?? 0).toFixed(2)),
        sideGrip: Number((surface.sideGrip ?? 0).toFixed(2)),
        topSpeedFactor: Number((surface.topSpeedFactor ?? 0).toFixed(2)),
        drag: Number((surface.drag ?? 1).toFixed(3)),
        skidMarks: surface.skidMarks !== false
      };
    };
    const midpointFor = (hierarchy) => {
      const path = paths.find((item) => item.hierarchy === hierarchy) || paths[0];
      if (!path || !Array.isArray(path.points) || path.points.length < 2) return [0, 0];
      const segmentIndex = Math.max(0, Math.min(path.points.length - 2, Math.floor((path.points.length - 1) / 2)));
      const a = path.points[segmentIndex];
      const b = path.points[segmentIndex + 1];
      return [(a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5];
    };
    const sample = (x, z) => sampleSurface(x, z).id;
    const grassCandidates = [[32, 0], [-18, 112], [42, 8], [-22, -28], [106, 18]];
    const grass = grassCandidates.map(([x, z]) => sample(x, z)).find((id) => id === 'grass') || null;
    const road = midpointFor('avenue');
    const plaza = midpointFor('plaza');
    const security = midpointFor('security');
    const stunt = midpointFor('stunt');
    const dirt = midpointFor('dirt');
    const bridge = midpointFor('bridge');
    return {
      road: sample(...road),
      grass,
      sand: sample(radius * 0.91, 0),
      shore: sample(radius * 0.985, 0),
      water: sample(radius * 1.025, 0),
      roadProfiles: {
        avenue: sampleSurface(...road),
        plaza: sampleSurface(...plaza),
        security: sampleSurface(...security),
        stunt: sampleSurface(...stunt),
        dirt: sampleSurface(...dirt),
        bridge: sampleSurface(...bridge)
      }
    };
  }, { radius: islandRadius, paths: roadPaths });
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
    const dragDeltas = Object.fromEntries(softTargets.map((id) => [id, countDelta('surfaceDrag', id)]));

    return {
      samples,
      targets: Object.fromEntries(samples.map((sample) => [sample.target, sample.seenTargetSurface && sample.grounded && sample.distance > 2])),
      trailDeltas,
      smokeDeltas,
      dragDeltas,
      lastSurfaceDrag: after.lastSurfaceDrag || null,
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
        start: { x: Number(start.x.toFixed(2)), z: Number(start.z.toFixed(2)) },
        before: { x: Number(before.x.toFixed(2)), z: Number(before.z.toFixed(2)) },
        final: { x: Number(final.x.toFixed(2)), z: Number(final.z.toFixed(2)) },
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

async function stageRoadJunctionView(page, camera, target) {
  await page.evaluate(({ camera, target }) => {
    const game = window.__portfolioDrive.game;
    const cameraPosition = game.camera.position.clone();
    const lookAt = game.camera.position.clone();
    cameraPosition.set(camera[0], camera[1], camera[2]);
    lookAt.set(target[0], target[1], target[2]);
    game.ui.closePanel?.();
    game.ui.closeMap?.();
    game.ui.closeMenu?.();
    game.cameraRig.setCinematic(cameraPosition, lookAt);
    game.cameraRig.smoothedTarget.copy(lookAt);
    game.camera.position.copy(cameraPosition);
    game.camera.fov = 42;
    game.camera.updateProjectionMatrix();
    game.camera.lookAt(lookAt);
  }, { camera, target });
  await delay(260);
}

async function exerciseForwardDriveProbe(page, segments) {
  return page.evaluate(async (probeSegments) => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;
    const input = game.input;
    const samples = [];
    const haltEvents = [];

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
      for (let i = 0; i < 54; i += 1) {
        if ((game.vehicle.controller?.groundedWheels || 0) >= 2) return true;
        await delay(35);
      }
      return false;
    };

    for (const segment of probeSegments) {
      clearInput();
      const offset = Math.min(10, Math.max(4, segment.length * 0.24));
      const heading = segment.rotation;
      const start = {
        x: segment.cx - Math.sin(heading) * offset,
        y: 1.12,
        z: segment.cz - Math.cos(heading) * offset
      };
      game.vehicle.respawn(start, heading);
      await delay(120);
      const grounded = await waitForGrounded();
      const startPosition = game.vehicle.position.clone();
      const startSurface = game.world.getSurfaceInfo(startPosition).id;
      input.actions.forward = true;

      let previous = null;
      let maxSpeed = 0;
      let minSpeedAfterLaunch = Infinity;
      let maxDrop = 0;
      const segmentHalts = [];
      const frames = [];
      for (let i = 0; i < 28; i += 1) {
        await delay(50);
        const position = game.vehicle.position.clone();
        const velocity = game.vehicle.body.linvel();
        const speed = Math.hypot(velocity.x, velocity.z);
        const surface = game.world.getSurfaceInfo(position).id;
        const frame = {
          t: i * 50,
          x: Number(position.x.toFixed(2)),
          z: Number(position.z.toFixed(2)),
          speed: Number(speed.toFixed(2)),
          surface,
          groundedWheels: game.vehicle.controller?.groundedWheels || 0
        };
        frames.push(frame);
        maxSpeed = Math.max(maxSpeed, speed);
        if (maxSpeed > 5.5) minSpeedAfterLaunch = Math.min(minSpeedAfterLaunch, speed);
        if (previous) {
          const drop = previous.speed - speed;
          maxDrop = Math.max(maxDrop, drop);
          if (
            i > 5 &&
            maxSpeed > 6.5 &&
            previous.speed > 5.5 &&
            speed < Math.max(1.8, previous.speed * 0.36) &&
            drop > 5.2
          ) {
            const halt = {
              id: segment.id,
              index: segment.index,
              t: frame.t,
              x: frame.x,
              z: frame.z,
              previousSpeed: Number(previous.speed.toFixed(2)),
              speed: frame.speed,
              drop: Number(drop.toFixed(2)),
              surface,
              groundedWheels: frame.groundedWheels
            };
            segmentHalts.push(halt);
            haltEvents.push(halt);
          }
        }
        previous = { speed };
      }
      input.actions.forward = false;

      const finalPosition = game.vehicle.position.clone();
      samples.push({
        id: segment.id,
        index: segment.index,
        grounded,
        startSurface,
        finalSurface: game.world.getSurfaceInfo(finalPosition).id,
        start: { x: Number(startPosition.x.toFixed(2)), z: Number(startPosition.z.toFixed(2)) },
        final: { x: Number(finalPosition.x.toFixed(2)), z: Number(finalPosition.z.toFixed(2)) },
        distance: Number(startPosition.distanceTo(finalPosition).toFixed(2)),
        maxSpeed: Number(maxSpeed.toFixed(2)),
        minSpeedAfterLaunch: Number((Number.isFinite(minSpeedAfterLaunch) ? minSpeedAfterLaunch : 0).toFixed(2)),
        maxDrop: Number(maxDrop.toFixed(2)),
        halts: segmentHalts,
        frames: frames.filter((_, index) => index % 4 === 0)
      });
      await delay(80);
    }

    clearInput();
    window.__portfolioDrive.respawn('landing');
    return {
      total: samples.length,
      halts: haltEvents.length,
      events: haltEvents.slice(0, 8),
      minDistance: Number(Math.min(...samples.map((sample) => sample.distance)).toFixed(2)),
      maxDrop: Number(Math.max(...samples.map((sample) => sample.maxDrop)).toFixed(2)),
      samples
    };
  }, segments);
}

async function exerciseSecurityScan(page) {
  await page.evaluate(({ offset, rotation }) => {
    const game = window.__portfolioDrive.game;
    const zone = game.world.zones.find((item) => item.id === 'security');
    const scanner = zone.position.clone();
    scanner.x += offset[0];
    scanner.z += offset[1];
    scanner.y = 0.3;
    const cameraPosition = scanner.clone();
    cameraPosition.x += 20;
    cameraPosition.y += 9;
    cameraPosition.z += 22;
    const lookAt = scanner.clone();
    lookAt.y += 1.35;
    game.ui.closePanel?.();
    game.ui.closeMap?.();
    game.ui.closeMenu?.();
    game.startDriving();
    game.vehicle.respawn({ x: scanner.x + Math.cos(rotation) * -1.8, y: 1.08, z: scanner.z - Math.sin(rotation) * -1.8 }, rotation);
    game.vehicle.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    game.vehicle.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    game.cameraRig.setCinematic(cameraPosition, lookAt, 42);
    game.cameraRig.smoothedTarget.copy(lookAt);
    game.camera.position.copy(cameraPosition);
    game.camera.lookAt(lookAt);
    game.camera.fov = 42;
    game.camera.updateProjectionMatrix();
    game.world.securityScan.active = false;
    game.world.securityScan.complete = false;
    game.achievements.unlocked.delete('security_scan');
    game.achievements.save?.();
    game.runSecurityScan(zone);
  }, { offset: SECURITY_SCAN_OFFSET, rotation: SECURITY_SCAN_ROTATION });
  await delay(560);
  const active = await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    return {
      active: game.world.securityScan.active,
      complete: game.world.securityScan.complete,
      stats: game.world.setPieces?.getSecurityScanStats?.() || {}
    };
  });
  await screenshot(page, 'security-scan-active.png');
  await delay(980);
  const complete = await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const sample = {
      active: game.world.securityScan.active,
      complete: game.world.securityScan.complete,
      panelVisible: Boolean(document.getElementById('panel') && !document.getElementById('panel').hidden),
      achievementUnlocked: game.achievements.unlocked.has('security_scan'),
      stats: game.world.setPieces?.getSecurityScanStats?.() || {}
    };
    game.ui.closePanel?.();
    document.getElementById('notifications')?.replaceChildren();
    game.cameraRig.clearCinematic();
    return sample;
  });
  return { active, complete };
}

async function previewCircuit(page) {
  return page.evaluate(async () => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;
    game.ui.closePanel?.();
    game.ui.closeMap?.();
    game.ui.closeMenu?.();
    game.achievements.unlocked.delete('circuit_finish');
    game.achievements.save?.();
    game.startDriving();
    game.startCircuit();
    const target = game.world.checkpoints[1].clone();
    game.vehicle.respawn({ x: target.x - 13, y: 1.08, z: target.z - 8 }, 0.82);
    const cameraPosition = target.clone();
    cameraPosition.x -= 14;
    cameraPosition.y += 8;
    cameraPosition.z -= 18;
    const lookAt = target.clone();
    lookAt.y += 1.7;
    game.cameraRig.setCinematic(cameraPosition, lookAt, 42);
    game.cameraRig.smoothedTarget.copy(lookAt);
    game.camera.position.copy(cameraPosition);
    game.camera.fov = 42;
    game.camera.updateProjectionMatrix();
    game.camera.lookAt(lookAt);
    await delay(300);
    const stats = game.world.stuntPark?.getStats?.() || {};
    const ui = game.ui?.getCircuitStats?.() || {};
    return {
      targetCount: game.world.checkpoints.length - 1,
      active: game.world.circuit.active,
      activeTarget: game.world.circuit.checkpoint + 1,
      markerActiveTarget: stats.activeCircuitTarget || 0,
      ui,
      ringInstances: game.scene.getObjectByName('STUNT_Circuit_Target_Rings')?.count || 0,
      arrowInstances: game.scene.getObjectByName('STUNT_Circuit_Target_Arrows')?.count || 0,
      gates: stats.circuitCheckpointGates || 0
    };
  });
}

async function finishCircuit(page, preview) {
  return page.evaluate(async (previewStats) => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;
    const beforeFinished = game.world.circuit.finishedCount || 0;
    const targetCount = game.world.checkpoints.length - 1;
    const checkpointSamples = [];

    for (let targetIndex = 1; targetIndex <= targetCount; targetIndex += 1) {
      const target = game.world.checkpoints[targetIndex];
      const previous = game.world.checkpoints[Math.max(0, targetIndex - 1)];
      const heading = Math.atan2(target.x - previous.x, target.z - previous.z);
      game.vehicle.respawn({ x: target.x, y: 1.08, z: target.z }, heading);
      await delay(140);
      checkpointSamples.push({
        targetIndex,
        active: game.world.circuit.active,
        checkpoint: game.world.circuit.checkpoint,
        events: game.world.circuit.checkpointEvents
      });
    }

    await delay(220);
    const stats = game.world.stuntPark?.getStats?.() || {};
    const finishedCount = game.world.circuit.finishedCount || 0;
    const lastLap = game.world.circuit.lastLap || 0;
    const best = game.world.circuit.best || 0;
    const uiAfterFinish = game.ui?.getCircuitStats?.() || {};
    game.clearFocus();
    window.__portfolioDrive.respawn('landing');
    return {
      preview: previewStats,
      targetCount,
      checkpointSamples,
      checkpointEvents: game.world.circuit.checkpointEvents || 0,
      finished: finishedCount > beforeFinished,
      finishedCountDelta: finishedCount - beforeFinished,
      activeAfterFinish: game.world.circuit.active,
      lastLap: Number(lastLap.toFixed(2)),
      best: Number(best.toFixed(2)),
      achievementUnlocked: game.achievements.unlocked.has('circuit_finish'),
      uiAfterFinish,
      stats,
      ringInstances: game.scene.getObjectByName('STUNT_Circuit_Target_Rings')?.count || 0,
      arrowInstances: game.scene.getObjectByName('STUNT_Circuit_Target_Arrows')?.count || 0
    };
  }, preview);
}

async function showWhisperForScreenshot(page) {
  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    document.getElementById('notifications')?.replaceChildren();
    if (game.world.circuit) game.world.circuit.summaryUntil = 0;
    const whispers = game.world.setPieces?.getWhisperEntries?.() || [];
    const sample = whispers.find((item) => item.active) || whispers[0];
    if (!sample) return;
    game.vehicle.respawn({
      x: sample.position.x,
      y: 1.08,
      z: sample.position.z
    }, 0);
  });
  await delay(180);
}

async function sampleWorldLife(page) {
  return page.evaluate(async () => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;
    const scene = game.scene;
    const lifeStats = () => game.world.setPieces?.getLifeStats?.() || { ...(game.world.setPieces?.lifeStats || {}) };
    const grass = scene.getObjectByName('FOLIAGE_grass_instances');
    const districtMotes = scene.getObjectByName('Life_DistrictAmbience_Motes');
    const districtSignals = scene.getObjectByName('Life_DistrictSignal_instances');
    const pulseMesh = scene.getObjectByName('Life_ZonePulse_instances');
    const banners = findVisibleObjects(/^Life_WindBanner_\d+$/);
    const beacons = findVisibleObjects(/^Life_WhisperBeacon_\d+$/);
    const pulse = scene.getObjectByName('Life_ZonePulse_landing');
    const before = {
      grass: matrixSlice(grass),
      districtMote: matrixSlice(districtMotes),
      districtSignal: matrixSlice(districtSignals),
      bannerRotations: banners.map((banner) => banner.rotation.z),
      pulseRotation: pulse?.rotation?.z ?? null,
      beaconYs: beacons.map((beacon) => beacon.position.y),
      motionSamples: lifeStats().motionSamples || 0
    };
    await delay(720);
    const after = {
      grass: matrixSlice(grass),
      districtMote: matrixSlice(districtMotes),
      districtSignal: matrixSlice(districtSignals),
      bannerRotations: banners.map((banner) => banner.rotation.z),
      pulseRotation: pulse?.rotation?.z ?? null,
      beaconYs: beacons.map((beacon) => beacon.position.y),
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
    const whispers = game.world.setPieces?.getWhisperEntries?.() || [];
    const whisperSample = whispers.find((item) => item.active) || whispers[0] || null;
    let whisperUi = {
      total: whispers.length,
      visible: false,
      text: '',
      key: null,
      width: 0,
      height: 0,
      nearestMatched: false
    };
    if (whisperSample) {
      game.vehicle.respawn({
        x: whisperSample.position.x,
        y: 1.08,
        z: whisperSample.position.z
      }, 0);
      await delay(120);
      const nearest = game.world.nearestWhisper(game.vehicle.position);
      game.ui.updateWhisper(nearest);
      await delay(60);
      whisperUi = {
        total: whispers.length,
        nearestMatched: nearest?.message === whisperSample.message,
        ...(game.ui.getWhisperStats?.() || {})
      };
    }

    return {
      counts: mediumStats,
      presentation: {
        zonePulseOpacity: Number((pulseMesh?.material?.opacity || 0).toFixed(3)),
        maxZonePulseScale: Number((pulseMesh?.userData?.maxZonePulseScale || 0).toFixed(2))
      },
      foliageWind: restoredWind,
      whisperUi,
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
        beacon: arrayMaxDelta(before.beaconYs, after.beaconYs)
      },
      grassAnimated: matrixDelta(before.grass, after.grass) > 0.0001,
      districtMoteAnimated: matrixDelta(before.districtMote, after.districtMote) > 0.0001,
      districtSignalAnimated: matrixDelta(before.districtSignal, after.districtSignal) > 0.0001,
      bannerAnimated: arrayMaxDelta(before.bannerRotations, after.bannerRotations) > 0.005,
      pulseAnimated: numericDelta(before.pulseRotation, after.pulseRotation) > 0.005,
      beaconAnimated: arrayMaxDelta(before.beaconYs, after.beaconYs) > 0.005,
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
        (stats.visibleDistrictMotes || 0) +
        (stats.visibleDistrictSignals || 0)
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

async function sampleOverlayUi(page) {
  return page.evaluate(() => window.__portfolioDrive.game.ui?.getOverlayStats?.() || {});
}

async function sampleTitleUi(page) {
  return page.evaluate(() => {
    const title = document.getElementById('title-screen');
    const card = title?.querySelector('.title-card');
    const actions = card?.querySelectorAll('.title-actions a, .title-actions button') || [];
    const rect = card?.getBoundingClientRect?.();
    const titleRect = title?.getBoundingClientRect?.();
    const area = rect && titleRect ? rect.width * rect.height : 0;
    const screenArea = titleRect ? titleRect.width * titleRect.height : 1;
    return {
      visible: Boolean(title && !title.hidden),
      cardWidth: Math.round(rect?.width || 0),
      cardHeight: Math.round(rect?.height || 0),
      cardAreaRatio: Number((area / screenArea).toFixed(4)),
      actionCount: actions.length,
      titleText: card?.querySelector('h1')?.textContent || '',
      copyLength: card?.querySelector('p')?.textContent?.length || 0
    };
  });
}

async function sampleRenderSnapshot(page) {
  return page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const render = game.renderer.info.render;
    return {
      calls: render.calls,
      triangles: render.triangles,
      sceneObjects: countVisibleScene(game.scene),
      renderProfile: profileVisibleScene(game.scene),
      vehicleFx: game.vehicle.getEffectStats?.() || {},
      waterStats: game.world.water?.getStats?.() || {},
      roadSurfaceDetails: game.world.roads?.getDetailStats?.() || {},
      securityLab: game.world.setPieces?.getSecurityLabStats?.() || {},
      polishMaterials: game.world.setPieces?.getPolishMaterialStats?.() || {},
      setPieceVisibility: game.world.setPieces?.getDistrictVisibilityStats?.() || {},
      broadSetPieceVisibility: game.world.setPieces?.getBroadVisibilityStats?.() || {},
      meadowComposition: game.world.setPieces?.getMeadowCompositionStats?.() || {},
      fieldBackdrops: game.world.setPieces?.getFieldBackdropStats?.() || {},
      launchField: game.world.setPieces?.getLaunchFieldStats?.() || {},
      innerMeadow: game.world.setPieces?.getInnerMeadowStats?.() || {}
    };

    function countVisibleScene(root) {
      const counts = {
        meshes: 0,
        instancedMeshes: 0,
        lights: 0,
        visibleObjects: 0
      };
      root.traverse((object) => {
        if (!isEffectivelyVisible(object)) return;
        counts.visibleObjects += 1;
        if (object.isMesh) counts.meshes += 1;
        if (object.isInstancedMesh) counts.instancedMeshes += 1;
        if (object.isLight) counts.lights += 1;
      });
      return counts;
    }

    function profileVisibleScene(root) {
      const buckets = new Map();
      root.traverse((object) => {
        if (!object.isMesh || !isEffectivelyVisible(object)) return;
        const bucketName = getRenderBucketName(object, root);
        if (!buckets.has(bucketName)) {
          buckets.set(bucketName, { name: bucketName, meshes: 0, materials: 0, triangles: 0 });
        }
        const bucket = buckets.get(bucketName);
        bucket.meshes += 1;
        bucket.materials += Array.isArray(object.material) ? object.material.length : 1;
        bucket.triangles += estimateTriangles(object);
      });
      return [...buckets.values()]
        .map((bucket) => ({ ...bucket, triangles: Math.round(bucket.triangles) }))
        .sort((a, b) => b.materials - a.materials)
        .slice(0, 10);
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
  });
}

async function collectRuntimeMetrics(page, loadMs, gameplay, water, surfaces, surfaceFeedback, routeReplay, circuit, worldLife, activeSnapshots) {
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
    const materialPalette = sampleMaterialPalette(game.world.materials || {});
    return {
      ready: window.__portfolioDrive.ready(),
      canvasSample: window.__portfolioDrive.sampleCanvas(),
      goalGate: game.world.goalGate || null,
      blockout: game.world.getBlockoutStats?.() || {},
      verticalSlice: game.world.setPieces?.getVerticalSliceStats?.() || {},
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
        markerOpacity: Number((game.scene.getObjectByName('ROAD_Guidance_Chevrons')?.material?.opacity || 0).toFixed(3)),
        edgeFeathers: game.world.roads?.roadGroup?.userData?.edgeFeatherCount || 0,
        laneEdges: game.world.roads?.roadGroup?.userData?.laneEdgeLineCount || 0
      },
      staticBatching: sampleStaticBatching(game.scene),
      materialPalette,
      lighting: game.getLightingStats?.() || {},
      foliage: game.world.foliage?.getStats?.() || {},
      mapStats: game.ui?.getMapStats?.() || {},
      atmosphere: game.world.atmosphere?.getStats?.() || {},
      roadJunctions: {
        blendPatches: game.world.roads?.roadGroup?.userData?.junctionPatchCount || 0,
        circularPointCaps: game.world.roads?.roadGroup?.userData?.circularPointCaps || 0,
        foundationTrimmedEndpoints: game.world.roads?.roadGroup?.userData?.foundationTrimmedEndpoints || 0,
        foundationTaperedEndpoints: game.world.roads?.roadGroup?.userData?.foundationTaperedEndpoints || 0,
        foundationFusedLayers: game.world.roads?.roadGroup?.userData?.foundationFusedLayers || 0,
        foundationGeometryLayers: game.world.roads?.roadGroup?.userData?.foundationGeometryLayers || 0,
        foundationFullWidthPaths: game.world.roads?.roadGroup?.userData?.foundationFullWidthPaths || 0,
        foundationRoadPolishMarks: game.world.roads?.roadGroup?.userData?.foundationRoadPolishMarks || 0,
        foundationThroughRoadPriority: game.world.roads?.roadGroup?.userData?.foundationThroughRoadPriority || 0,
        foundationTexturePixelsPerUnit: game.world.roads?.roadGroup?.userData?.foundationTexturePixelsPerUnit || 0,
        foundationMinRoadY: game.world.roads?.roadGroup?.userData?.foundationMinRoadY || 0,
        foundationMaxRoadY: game.world.roads?.roadGroup?.userData?.foundationMaxRoadY || 0,
        foundationRoadHeightAboveCollider: game.world.roads?.roadGroup?.userData?.foundationRoadHeightAboveCollider || 0
      },
      roadSurfaceDetails: game.world.roads?.getDetailStats?.() || {},
      districtGround: game.world.terrain?.getDistrictGroundStats?.() || {},
      surfaceDetails: game.world.terrain?.surfaceDetailStats || {},
      meadowDetails: game.world.terrain?.getMeadowDetailStats?.() || {},
      fieldMotifs: game.world.terrain?.getFieldMotifStats?.() || {},
      roadsideFrames: game.world.terrain?.getRoadsideFrameStats?.() || {},
      terrainRelief: game.world.terrain?.getReliefStats?.() || {},
      shoreline: game.world.terrain?.getShorelineStats?.() || {},
      setPieceQuality: game.world.setPieces?.getQualityStats?.() || {},
      startDiorama: game.world.setPieces?.getStartDioramaStats?.() || {},
      polishMaterials: game.world.setPieces?.getPolishMaterialStats?.() || {},
      districtVisibility: game.world.setPieces?.getDistrictVisibilityStats?.() || {},
      broadSetPieceVisibility: game.world.setPieces?.getBroadVisibilityStats?.() || {},
      approachDressing: game.world.setPieces?.getApproachStats?.() || {},
      districtGateways: game.world.setPieces?.getGatewayStats?.() || {},
      routeComposition: game.world.setPieces?.getRouteCompositionStats?.() || {},
      securityLab: game.world.setPieces?.getSecurityLabStats?.() || {},
      gate3rPlacement: game.world.setPieces?.getGate3RPlacementStats?.() || {},
      meadowComposition: game.world.setPieces?.getMeadowCompositionStats?.() || {},
      fieldBackdrops: game.world.setPieces?.getFieldBackdropStats?.() || {},
      launchField: game.world.setPieces?.getLaunchFieldStats?.() || {},
      innerMeadow: game.world.setPieces?.getInnerMeadowStats?.() || {},
      southCorridor: game.world.setPieces?.getSouthCorridorStats?.() || {},
      districtStory: game.world.setPieces?.getDistrictStoryStats?.() || {},
      districtComposition: game.world.setPieces?.getDistrictCompositionStats?.() || {},
      surfacePanels: game.world.setPieces?.getSurfacePanelStats?.() || {},
      circuitStart: game.world.setPieces?.getCircuitStartStats?.() || {},
      harbor: game.world.setPieces?.getHarborStats?.() || {},
      dataPier: game.world.setPieces?.getDataPierStats?.() || {},
      careerOffice: game.world.setPieces?.getCareerOfficeStats?.() || {},
      todoYard: game.world.setPieces?.getTodoYardStats?.() || {},
      skillsTerminal: game.world.setPieces?.getSkillsTerminalStats?.() || {},
      projectsYard: game.world.setPieces?.getProjectsYardStats?.() || {},
      behindBuild: game.world.setPieces?.getBehindBuildStats?.() || {},
      props: game.world.props?.getStats?.() || {},
      stuntPark: game.world.stuntPark?.getStats?.() || {},
      potatoFarm: game.world.potatoFarm?.getStats?.() || {},
      waterStats: game.world.water?.getStats?.() || {},
      zoneLandmarks: game.world.zonesSystem?.getLandmarkStats?.() || {},
      zoneInteractionRings: countVisibleByName(game.scene, /_interaction_ring$/),
      protectedLandmarks,
      vehicleGrounding: sampleVehicleGrounding(game),
      vehicleFx: game.vehicle.getEffectStats?.() || {},
      zonePresentation: sampleZonePresentation(game),
      camera: {
        occlusion: sampleCameraOcclusion(game),
        stats: game.cameraRig?.getDebugStats?.() || {}
      },
      colliderCount: window.__portfolioDrive.colliders().length,
      debugOverlayObjects: game.debugColliderOverlay?.children?.length || 0,
      colliderAudit: auditColliders(window.__portfolioDrive.colliders(), game.scene),
      zoneCount: game.world.zones.length,
      audio: {
        ...(game.audio?.getStats?.() || {}),
        landingEvents: game.vehicle?.landingEvents || 0
      }
    };

    function sampleVehicleGrounding(game) {
      const shadow = game.scene.getObjectByName('VehicleContactShadow');
      shadow?.updateMatrixWorld?.(true);
      const roadMaxY = game.world.roads?.roadGroup?.userData?.foundationMaxRoadY || 0;
      const contactShadowY = shadow ? shadow.matrixWorld.elements[13] : null;
      const vehicleModel = game.vehicle?.modelRoot?.children?.[0] || null;
      const bodyVisualLift = vehicleModel?.userData?.bodyVisualLift ?? null;
      return {
        contactShadowY: contactShadowY === null ? null : Number(contactShadowY.toFixed(5)),
        contactShadowLiftAboveRoad: contactShadowY === null ? null : Number((contactShadowY - roadMaxY).toFixed(5)),
        contactShadowOpacity: Number((shadow?.material?.opacity || 0).toFixed(3)),
        bodyVisualLift: bodyVisualLift === null ? null : Number(bodyVisualLift.toFixed(3))
      };
    }

    function sampleMaterialPalette(materials) {
      const names = ['ground', 'meadowLight', 'meadowDark', 'stoneRoad', 'plazaRoad', 'securityRoad', 'roadShoulder', 'roadCurb', 'stuntRamp', 'dirtRoad', 'sand', 'paleStone', 'warmStone'];
      const palette = {};
      for (const name of names) {
        const material = materials[name];
        const color = material?.color;
        if (!color) continue;
        const hex = color.getHex();
        const r = ((hex >> 16) & 255) / 255;
        const g = ((hex >> 8) & 255) / 255;
        const b = (hex & 255) / 255;
        const luma = r * 0.2126 + g * 0.7152 + b * 0.0722;
        palette[name] = {
          hex: `#${color.getHexString()}`,
          luma: Number(luma.toFixed(3)),
          opacity: Number((material.opacity ?? 1).toFixed(3))
        };
      }
      if (palette.ground && palette.stoneRoad) {
        palette.roadGrassContrast = Number((palette.ground.luma - palette.stoneRoad.luma).toFixed(3));
      }
      return palette;
    }

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

    function sampleStaticBatching(root) {
      const stats = {
        groups: 0,
        batches: 0,
        mergedMeshes: 0,
        prunedEmptyGroups: 0,
        cellGroups: 0,
        cells: 0
      };
      root.traverse((object) => {
        const item = object.userData?.staticBatchStats;
        if (!item) return;
        stats.groups += 1;
        stats.batches += item.batches || 0;
        stats.mergedMeshes += item.mergedMeshes || 0;
        stats.prunedEmptyGroups += item.prunedEmptyGroups || 0;
        if ((item.cells || 0) > 1) stats.cellGroups += 1;
        stats.cells += item.cells || 0;
      });
      return stats;
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
      target.y = 2;
      desired.set(target.x - 28, 7, target.z + 32);
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

    function sampleZonePresentation(game) {
      const samples = game.world.zones.map((zone) => {
        const respawn = game.world.getRespawnPose(zone.id);
        const presentation = game.world.getPresentationPose(zone.id);
        const respawnDistance = respawn.position.distanceTo(zone.position);
        const cameraDistance = presentation.position.distanceTo(presentation.target);
        const targetDistance = presentation.target.distanceTo(zone.position);
        const surface = game.world.getSurfaceInfo(respawn.position).id;
        return {
          id: zone.id,
          surface,
          respawnDistance: Number(respawnDistance.toFixed(2)),
          cameraDistance: Number(cameraDistance.toFixed(2)),
          targetDistance: Number(targetDistance.toFixed(2)),
          heading: Number(respawn.heading.toFixed(2)),
          fov: presentation.fov
        };
      });
      return {
        samples,
        badRespawns: samples.filter((sample) => sample.surface !== 'road'),
        badCameras: samples.filter((sample) => (
          sample.cameraDistance < 9 ||
          sample.cameraDistance > 48 ||
          sample.targetDistance > 16 ||
          !Number.isFinite(sample.fov) ||
          sample.fov < 34 ||
          sample.fov > 50
        ))
      };
    }

    function countVisibleByName(root, pattern) {
      let count = 0;
      root.traverse((object) => {
        if (object.visible && pattern.test(object.name || '')) count += 1;
      });
      return count;
    }
  }, { district: authoredDistrictAssets, stunt: authoredStuntAssets });
  return {
    loadMs,
    gameplay,
    water,
    surfaces,
    surfaceFeedback,
    routeReplay,
    circuit,
    worldLife,
    activeSnapshots,
    ...runtime
  };
}

async function captureHighQuality(browser) {
  return captureHighQualityProbe(browser, {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    screenshotName: 'high-quality-start.png'
  });
}

async function captureHighDpiDesktop(browser) {
  return captureHighQualityProbe(browser, {
    width: 2560,
    height: 1440,
    deviceScaleFactor: 2,
    screenshotName: 'high-dpi-desktop.png'
  });
}

async function captureHighQualityProbe(browser, { width, height, deviceScaleFactor, screenshotName }) {
  const page = await browser.newPage();
  wirePageDiagnostics(page);
  await page.setViewport({ width, height, deviceScaleFactor });
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('portfolio-drive-landscape-quality', 'high');
    localStorage.setItem('portfolio-drive-muted', '1');
    localStorage.setItem('portfolio-drive-disable-analytics', '1');
  });
  await page.goto(`${baseUrl}/play/?debugDrive=1`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await waitForReady(page);
  await page.evaluate(() => window.__portfolioDrive.start());
  await delay(700);
  await page.screenshot({ path: join(outputDir, screenshotName), fullPage: true });
  const sample = await page.evaluate(async () => {
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
    const postRender = {
      calls: game.renderer.info.render.calls,
      triangles: game.renderer.info.render.triangles
    };
    const postprocessingEnabled = game.rendererSystem.postprocessingEnabled;
    game.rendererSystem.postprocessingEnabled = false;
    game.renderer.info.reset();
    game.renderer.render(game.scene, game.camera);
    const sceneRender = {
      calls: game.renderer.info.render.calls,
      triangles: game.renderer.info.render.triangles
    };
    game.rendererSystem.postprocessingEnabled = postprocessingEnabled;
    return {
      ready: window.__portfolioDrive.ready(),
      canvasSample: window.__portfolioDrive.sampleCanvas(),
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      canvasWidth: game.renderer.domElement.width,
      canvasHeight: game.renderer.domElement.height,
      renderPixels: game.renderer.domElement.width * game.renderer.domElement.height,
      quality: game.world.landscapeQuality,
      savedQuality: localStorage.getItem('portfolio-drive-landscape-quality'),
      pixelRatio: game.renderer.getPixelRatio(),
      maxPixelRatio: game.rendererSystem.maxPixelRatio,
      maxRenderPixels: game.rendererSystem.maxRenderPixels,
      postprocessing: game.rendererSystem.postprocessingEnabled,
      shadows: game.renderer.shadowMap.enabled,
      composerAllocated: Boolean(game.rendererSystem.composer),
      bloomAllocated: Boolean(game.rendererSystem.bloom),
      avgFrameMs: Number(avgMs.toFixed(2)),
      p95FrameMs: Number(p95Ms.toFixed(2)),
      fps: Number((1000 / avgMs).toFixed(2)),
      calls: sceneRender.calls,
      triangles: sceneRender.triangles,
      postRenderCalls: postRender.calls,
      postRenderTriangles: postRender.triangles
    };
  });
  await page.close();
  return sample;
}

async function captureMobile(browser) {
  const page = await browser.newPage();
  wirePageDiagnostics(page);
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.evaluateOnNewDocument(() => {
    localStorage.removeItem('portfolio-drive-landscape-quality');
    localStorage.setItem('portfolio-drive-muted', '1');
    localStorage.setItem('portfolio-drive-disable-analytics', '1');
  });
  await page.goto(`${baseUrl}/play/?debugDrive=1`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await waitForReady(page);
  await page.evaluate(() => window.__portfolioDrive.start());
  await delay(700);
  await page.screenshot({ path: join(outputDir, 'mobile-start.png'), fullPage: true });
  const sample = await page.evaluate(async () => {
    const game = window.__portfolioDrive.game;
    game.renderer.info.reset();
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const render = game.renderer.info.render;
    return {
      freshRenderSample: true,
      canvasSample: window.__portfolioDrive.sampleCanvas(),
      quality: game.world.landscapeQuality,
      savedQuality: localStorage.getItem('portfolio-drive-landscape-quality'),
      postprocessing: game.rendererSystem.postprocessingEnabled,
      composerAllocated: Boolean(game.rendererSystem.composer),
      bloomAllocated: Boolean(game.rendererSystem.bloom),
      lifeStats: game.world.setPieces?.getLifeStats?.() || { ...(game.world.setPieces?.lifeStats || {}) },
      securityLab: game.world.setPieces?.getSecurityLabStats?.() || {},
      setPieceQuality: game.world.setPieces?.getQualityStats?.() || {},
      startDiorama: game.world.setPieces?.getStartDioramaStats?.() || {},
      polishMaterials: game.world.setPieces?.getPolishMaterialStats?.() || {},
      districtVisibility: game.world.setPieces?.getDistrictVisibilityStats?.() || {},
      broadSetPieceVisibility: game.world.setPieces?.getBroadVisibilityStats?.() || {},
      meadowComposition: game.world.setPieces?.getMeadowCompositionStats?.() || {},
      fieldBackdrops: game.world.setPieces?.getFieldBackdropStats?.() || {},
      launchField: game.world.setPieces?.getLaunchFieldStats?.() || {},
      innerMeadow: game.world.setPieces?.getInnerMeadowStats?.() || {},
      fieldMotifs: game.world.terrain?.getFieldMotifStats?.() || {},
      roadsideFrames: game.world.terrain?.getRoadsideFrameStats?.() || {},
      districtGround: game.world.terrain?.getDistrictGroundStats?.() || {},
      roadSurfaceDetails: game.world.roads?.getDetailStats?.() || {},
      foliage: game.world.foliage?.getStats?.() || {},
      waterStats: game.world.water?.getStats?.() || {},
      atmosphere: game.world.atmosphere?.getStats?.() || {},
      stuntPark: game.world.stuntPark?.getStats?.() || {},
      potatoFarm: game.world.potatoFarm?.getStats?.() || {},
      uiFrame: sampleMobileUiFrame(),
      vehicleFrame: sampleVehicleFrame(game),
      lighting: game.getLightingStats?.() || {},
      sceneObjects: countVisibleScene(game.scene),
      renderProfile: profileVisibleScene(game.scene),
      frustumSceneObjects: countCameraScene(game.scene, game.camera),
      frustumRenderProfile: profileCameraScene(game.scene, game.camera),
      roadFrustumProfile: profileCameraScene(game.world.roads?.roadGroup, game.camera),
      vehicleFrustumProfile: profileCameraScene(game.scene.getObjectByName('Vehicle'), game.camera),
      calls: render.calls,
      triangles: render.triangles
    };

    function sampleMobileUiFrame() {
      const hud = rectFor('.hud');
      const debug = rectFor('#debug-readout');
      const minimap = rectFor('#minimap');
      const prompt = rectFor('#interaction-prompt');
      const notification = rectFor('#notifications .notification');
      const bottomTops = [minimap, prompt, notification]
        .filter((rect) => rect.visible)
        .map((rect) => rect.top);
      const topOccupied = Math.max(hud.visible ? hud.bottom : 0, debug.visible ? debug.bottom : 0);
      const bottomOccupied = bottomTops.length ? window.innerHeight - Math.min(...bottomTops) : 0;
      return {
        viewportHeight: window.innerHeight,
        hudHeight: hud.height,
        hudBottom: hud.bottom,
        debugHeight: debug.height,
        debugBottom: debug.bottom,
        topOccupied: Math.round(topOccupied),
        bottomOccupied: Math.round(bottomOccupied),
        minimapWidth: minimap.width,
        notificationHeight: notification.height,
        promptVisible: prompt.visible,
        clearHeightRatio: Number(((window.innerHeight - topOccupied - bottomOccupied) / window.innerHeight).toFixed(3))
      };
    }

    function sampleVehicleFrame(game) {
      const point = game.vehicle?.position?.clone?.();
      if (!point) return { ready: false };
      point.y += 1.1;
      point.project(game.camera);
      return {
        ready: true,
        centerX: Number(((point.x + 1) / 2).toFixed(3)),
        centerY: Number(((1 - point.y) / 2).toFixed(3)),
        inFrame: point.x > -1 && point.x < 1 && point.y > -1 && point.y < 1
      };
    }

    function rectFor(selector) {
      const element = document.querySelector(selector);
      if (!element || element.hidden || getComputedStyle(element).display === 'none') {
        return { visible: false, width: 0, height: 0, top: 0, bottom: 0 };
      }
      const rect = element.getBoundingClientRect();
      return {
        visible: true,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom)
      };
    }

    function countVisibleScene(root) {
      const counts = {
        meshes: 0,
        instancedMeshes: 0,
        lights: 0,
        visibleObjects: 0
      };
      root.traverse((object) => {
        if (!isEffectivelyVisible(object)) return;
        counts.visibleObjects += 1;
        if (object.isMesh) counts.meshes += 1;
        if (object.isInstancedMesh) counts.instancedMeshes += 1;
        if (object.isLight) counts.lights += 1;
      });
      return counts;
    }

    function profileVisibleScene(root) {
      const buckets = new Map();
      root.traverse((object) => {
        if (!object.isMesh || !isEffectivelyVisible(object)) return;
        const bucketName = getRenderBucketName(object, root);
        if (!buckets.has(bucketName)) {
          buckets.set(bucketName, { name: bucketName, meshes: 0, materials: 0, triangles: 0 });
        }
        const bucket = buckets.get(bucketName);
        bucket.meshes += 1;
        bucket.materials += Array.isArray(object.material) ? object.material.length : 1;
        bucket.triangles += estimateTriangles(object);
      });
      return [...buckets.values()]
        .map((bucket) => ({ ...bucket, triangles: Math.round(bucket.triangles) }))
        .sort((a, b) => b.materials - a.materials)
        .slice(0, 10);
    }

    function countCameraScene(root, camera) {
      const planes = makeFrustumPlanes(camera);
      const counts = {
        meshes: 0,
        instancedMeshes: 0,
        lights: 0,
        visibleObjects: 0
      };
      root.updateMatrixWorld(true);
      root.traverse((object) => {
        if (!isEffectivelyVisible(object)) return;
        if (object.isLight) {
          counts.visibleObjects += 1;
          counts.lights += 1;
          return;
        }
        if (!object.isMesh || !intersectsFrustum(object, planes)) return;
        counts.visibleObjects += 1;
        counts.meshes += 1;
        if (object.isInstancedMesh) counts.instancedMeshes += 1;
      });
      return counts;
    }

    function profileCameraScene(root, camera) {
      if (!root) return [];
      const planes = makeFrustumPlanes(camera);
      const buckets = new Map();
      root.updateMatrixWorld(true);
      root.traverse((object) => {
        if (!object.isMesh || !isEffectivelyVisible(object) || !intersectsFrustum(object, planes)) return;
        const bucketName = getRenderBucketName(object, root);
        if (!buckets.has(bucketName)) {
          buckets.set(bucketName, { name: bucketName, meshes: 0, materials: 0, triangles: 0 });
        }
        const bucket = buckets.get(bucketName);
        bucket.meshes += 1;
        bucket.materials += Array.isArray(object.material) ? object.material.length : 1;
        bucket.triangles += estimateTriangles(object);
      });
      return [...buckets.values()]
        .map((bucket) => ({ ...bucket, triangles: Math.round(bucket.triangles) }))
        .sort((a, b) => b.materials - a.materials)
        .slice(0, 10);
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

    function makeFrustumPlanes(camera) {
      camera.updateMatrixWorld(true);
      camera.updateProjectionMatrix?.();
      const Matrix4 = camera.projectionMatrix.constructor;
      const matrix = new Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
      const me = matrix.elements;
      return [
        normalizePlane(me[3] - me[0], me[7] - me[4], me[11] - me[8], me[15] - me[12]),
        normalizePlane(me[3] + me[0], me[7] + me[4], me[11] + me[8], me[15] + me[12]),
        normalizePlane(me[3] + me[1], me[7] + me[5], me[11] + me[9], me[15] + me[13]),
        normalizePlane(me[3] - me[1], me[7] - me[5], me[11] - me[9], me[15] - me[13]),
        normalizePlane(me[3] - me[2], me[7] - me[6], me[11] - me[10], me[15] - me[14]),
        normalizePlane(me[3] + me[2], me[7] + me[6], me[11] + me[10], me[15] + me[14])
      ];
    }

    function normalizePlane(x, y, z, constant) {
      const length = Math.hypot(x, y, z) || 1;
      return { x: x / length, y: y / length, z: z / length, constant: constant / length };
    }

    function intersectsFrustum(object, planes) {
      const sphere = getWorldSphere(object);
      for (const plane of planes) {
        const distance = plane.x * sphere.center.x + plane.y * sphere.center.y + plane.z * sphere.center.z + plane.constant;
        if (distance < -sphere.radius) return false;
      }
      return true;
    }

    function getWorldSphere(object) {
      const Vector3 = object.position.constructor;
      let sphere = null;
      if (object.isInstancedMesh && object.computeBoundingSphere) {
        object.computeBoundingSphere();
        sphere = object.boundingSphere;
      }
      if (!sphere) {
        object.geometry?.computeBoundingSphere?.();
        sphere = object.geometry?.boundingSphere;
      }
      const center = sphere?.center?.clone ? sphere.center.clone() : new Vector3();
      center.applyMatrix4(object.matrixWorld);
      const scale = object.getWorldScale(new Vector3());
      return {
        center,
        radius: (sphere?.radius || 0) * Math.max(Math.abs(scale.x), Math.abs(scale.y), Math.abs(scale.z), 1)
      };
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
    localStorage.setItem('portfolio-drive-disable-analytics', '1');
  });
  await page.goto(`${baseUrl}/play/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await waitForReady(page);
  const sample = await page.evaluate(() => {
    const render = window.__portfolioDrive.game.renderer.info.render;
    return {
      ready: window.__portfolioDrive.ready(),
      canvasSample: window.__portfolioDrive.sampleCanvas(),
      quality: window.__portfolioDrive.game.world.landscapeQuality,
      savedQuality: localStorage.getItem('portfolio-drive-landscape-quality'),
      pixelRatio: window.__portfolioDrive.game.renderer.getPixelRatio(),
      maxPixelRatio: window.__portfolioDrive.game.rendererSystem.maxPixelRatio,
      postprocessing: window.__portfolioDrive.game.rendererSystem.postprocessingEnabled,
      composerAllocated: Boolean(window.__portfolioDrive.game.rendererSystem.composer),
      bloomAllocated: Boolean(window.__portfolioDrive.game.rendererSystem.bloom),
      calls: render.calls,
      triangles: render.triangles
    };
  });
  await page.close();
  return sample;
}

function getGlbAssetSizes() {
  const files = [
    'play/game-assets/sabre-turbo.glb',
    'play/game-assets/runtime-props.glb',
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
  if (!result.titleUi?.visible) failures.push('title UI probe failed: title hidden before start');
  if ((result.titleUi?.cardWidth || 0) > 390) failures.push(`title UI probe failed: cardWidth=${result.titleUi?.cardWidth || 0}`);
  if ((result.titleUi?.cardHeight || 0) > 172) failures.push(`title UI probe failed: cardHeight=${result.titleUi?.cardHeight || 0}`);
  if ((result.titleUi?.cardAreaRatio || 1) > 0.055) failures.push(`title UI probe failed: cardAreaRatio=${result.titleUi?.cardAreaRatio || 0}`);
  if ((result.titleUi?.actionCount || 0) !== 3) failures.push(`title UI probe failed: actionCount=${result.titleUi?.actionCount || 0}`);
  if (result.zoneCount !== worldZones.length) failures.push(`zone count mismatch: ${result.zoneCount}/${worldZones.length}`);
  const missingPresentation = worldZones.filter((zone) => !zonePresentation[zone.id]).map((zone) => zone.id);
  if (missingPresentation.length) failures.push(`zone presentation definitions missing: ${missingPresentation.join(', ')}`);
  if ((result.zonePresentation?.samples?.length || 0) !== worldZones.length) {
    failures.push(`zone presentation probe failed: samples=${result.zonePresentation?.samples?.length || 0}/${worldZones.length}`);
  }
  if (result.zonePresentation?.badRespawns?.length) {
    failures.push(`zone presentation probe failed: non-road respawns=${result.zonePresentation.badRespawns.map((sample) => `${sample.id}:${sample.surface}`).join(', ')}`);
  }
  if (result.zonePresentation?.badCameras?.length) {
    failures.push(`zone presentation probe failed: bad cameras=${result.zonePresentation.badCameras.map((sample) => sample.id).join(', ')}`);
  }
  if (result.colliderCount <= 0 || result.debugOverlayObjects <= 0) failures.push('collider debug overlay did not render');
  if (result.colliderAudit?.failures?.length) failures.push(`collider audit failed: ${result.colliderAudit.failures.map((item) => item.name).join(', ')}`);
  if (result.routeReplay?.total !== routeReplaySegments.length) failures.push(`route replay count mismatch: ${result.routeReplay?.total}/${routeReplaySegments.length}`);
  if (result.routeReplay?.failed) failures.push(`route replay failed: ${result.routeReplay.failed}/${result.routeReplay.total}`);
  if (result.forwardDriveProbe?.total !== routeReplaySegments.length) failures.push(`forward drive probe count mismatch: ${result.forwardDriveProbe?.total}/${routeReplaySegments.length}`);
  if ((result.forwardDriveProbe?.halts || 0) !== 0) {
    const events = (result.forwardDriveProbe.events || [])
      .slice(0, 3)
      .map((event) => `${event.id}[${event.index}]@${event.x},${event.z} drop=${event.drop}`)
      .join(', ');
    failures.push(`forward drive probe failed: halts=${result.forwardDriveProbe.halts}${events ? ` (${events})` : ''}`);
  }
  if (result.goalGate === 'gate-3r-vertical-slice') {
    assertGate3RVerticalSliceVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-2r-foundation-replacement') {
    assertGate2RFoundationReplacementVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-2-blockout') {
    assertGate2BlockoutVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-3-vertical-slice') {
    assertGate3VerticalSliceVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.circuit?.targetCount !== circuitCheckpoints.length - 1) failures.push(`circuit probe failed: targetCount=${result.circuit?.targetCount}/${circuitCheckpoints.length - 1}`);
  if (!result.circuit?.preview?.active) failures.push('circuit probe failed: preview inactive');
  if (result.circuit?.preview?.activeTarget !== 1) failures.push(`circuit probe failed: preview target=${result.circuit?.preview?.activeTarget}`);
  if (result.circuit?.preview?.markerActiveTarget !== 1) failures.push(`circuit probe failed: marker target=${result.circuit?.preview?.markerActiveTarget}`);
  if (!result.circuit?.preview?.ui?.visible) failures.push('circuit UI probe failed: preview hidden');
  if (!/Checkpoint 1\/\d+/.test(result.circuit?.preview?.ui?.text || '')) failures.push(`circuit UI probe failed: preview text=${result.circuit?.preview?.ui?.text || ''}`);
  if ((result.circuit?.preview?.ui?.width || 0) > 420) failures.push(`circuit UI probe failed: preview width=${result.circuit?.preview?.ui?.width || 0}`);
  if (!result.circuit?.finished) failures.push('circuit probe failed: finish event');
  if (result.circuit?.activeAfterFinish) failures.push('circuit probe failed: still active after finish');
  if ((result.circuit?.checkpointEvents || 0) < circuitCheckpoints.length - 1) failures.push(`circuit probe failed: checkpointEvents=${result.circuit?.checkpointEvents || 0}`);
  if (!result.circuit?.achievementUnlocked) failures.push('circuit probe failed: circuit_finish achievement');
  if ((result.circuit?.lastLap || 0) <= 0 || (result.circuit?.best || 0) <= 0) failures.push(`circuit probe failed: lap=${result.circuit?.lastLap || 0}, best=${result.circuit?.best || 0}`);
  if (!result.circuit?.uiAfterFinish?.visible) failures.push('circuit UI probe failed: finish summary hidden');
  if (!/Circuit complete/.test(result.circuit?.uiAfterFinish?.text || '')) failures.push(`circuit UI probe failed: finish text=${result.circuit?.uiAfterFinish?.text || ''}`);
  if ((result.circuit?.stats?.checkpointPulseSamples || 0) < 1) failures.push(`circuit feedback probe failed: pulse samples=${result.circuit?.stats?.checkpointPulseSamples || 0}`);
  if ((result.circuit?.stats?.maxCheckpointPulse || 0) <= 0) failures.push(`circuit feedback probe failed: max pulse=${result.circuit?.stats?.maxCheckpointPulse || 0}`);
  if ((result.circuit?.ringInstances || 0) !== circuitCheckpoints.length - 1) failures.push(`circuit probe failed: ring instances=${result.circuit?.ringInstances || 0}`);
  if ((result.circuit?.arrowInstances || 0) !== circuitCheckpoints.length - 1) failures.push(`circuit probe failed: arrow instances=${result.circuit?.arrowInstances || 0}`);
  if (!result.securityScan?.active?.active) failures.push('security scan probe failed: active state not observed');
  if ((result.securityScan?.active?.stats?.packetShards || 0) < 8) failures.push(`security scan probe failed: packet shards=${result.securityScan?.active?.stats?.packetShards || 0}`);
  if ((result.securityScan?.active?.stats?.scanWaves || 0) < 3) failures.push(`security scan probe failed: scan waves=${result.securityScan?.active?.stats?.scanWaves || 0}`);
  if ((result.securityScan?.active?.stats?.visibleScanWaves || 0) < 1) failures.push(`security scan probe failed: visible scan waves=${result.securityScan?.active?.stats?.visibleScanWaves || 0}`);
  if ((result.securityScan?.active?.stats?.packetMotionSamples || 0) < 1) failures.push(`security scan probe failed: packet motion samples=${result.securityScan?.active?.stats?.packetMotionSamples || 0}`);
  if ((result.securityLab?.floorMarks || 0) < 24) failures.push(`security lab probe failed: floorMarks=${result.securityLab?.floorMarks || 0}`);
  if ((result.securityLab?.authoredAssets || 0) < 3) failures.push(`security lab probe failed: authoredAssets=${result.securityLab?.authoredAssets || 0}`);
  if ((result.securityLab?.cableRuns || 0) < 5) failures.push(`security lab probe failed: cableRuns=${result.securityLab?.cableRuns || 0}`);
  if ((result.securityLab?.terminalRails || 0) < 4) failures.push(`security lab probe failed: terminalRails=${result.securityLab?.terminalRails || 0}`);
  if (!result.securityScan?.complete?.complete) failures.push('security scan probe failed: complete state not observed');
  if (!result.securityScan?.complete?.panelVisible) failures.push('security scan probe failed: terminal panel did not open');
  if (!result.securityScan?.complete?.achievementUnlocked) failures.push('security scan probe failed: security_scan achievement');
  if (result.worldLife?.counts?.zonePulses !== worldZones.length) failures.push(`world life probe failed: zone pulses ${result.worldLife?.counts?.zonePulses}/${worldZones.length}`);
  if ((result.worldLife?.presentation?.zonePulseOpacity || 0) > 0.065) {
    failures.push(`world life presentation probe failed: zone pulse opacity=${result.worldLife?.presentation?.zonePulseOpacity}`);
  }
  if ((result.worldLife?.presentation?.maxZonePulseScale || 99) > 6) {
    failures.push(`world life presentation probe failed: max zone pulse scale=${result.worldLife?.presentation?.maxZonePulseScale}`);
  }
  if ((result.worldLife?.counts?.windBanners || 0) < 8) failures.push('world life probe failed: wind banners');
  if ((result.worldLife?.counts?.whisperBeacons || 0) < 8) failures.push('world life probe failed: whisper beacons');
  if ((result.worldLife?.whisperUi?.total || 0) < 8) failures.push(`whisper UI probe failed: total=${result.worldLife?.whisperUi?.total || 0}`);
  if (!result.worldLife?.whisperUi?.nearestMatched) failures.push('whisper UI probe failed: nearest beacon message mismatch');
  if (!result.worldLife?.whisperUi?.visible) failures.push('whisper UI probe failed: overlay did not show');
  if ((result.worldLife?.whisperUi?.text || '').length < 20) failures.push(`whisper UI probe failed: text=${result.worldLife?.whisperUi?.text || ''}`);
  if ((result.worldLife?.whisperUi?.width || 0) > 420) failures.push(`whisper UI probe failed: width=${result.worldLife?.whisperUi?.width || 0}`);
  if ((result.worldLife?.counts?.terminalPulses || 0) < 5) failures.push('world life probe failed: terminal pulses');
  if ((result.worldLife?.counts?.districtMotes || 0) < 64) failures.push(`world life probe failed: district motes ${result.worldLife?.counts?.districtMotes || 0}`);
  if ((result.worldLife?.counts?.visibleDistrictMotes || 0) < 48) failures.push(`world life probe failed: visible district motes ${result.worldLife?.counts?.visibleDistrictMotes || 0}`);
  if ((result.worldLife?.counts?.districtSignals || 0) !== worldZones.length) failures.push(`world life probe failed: district signals ${result.worldLife?.counts?.districtSignals || 0}/${worldZones.length}`);
  if ((result.worldLife?.counts?.visibleDistrictSignals || 0) < 12) failures.push(`world life probe failed: visible district signals ${result.worldLife?.counts?.visibleDistrictSignals || 0}`);
  if (!result.worldLife?.quality?.lowReduced) failures.push('quality probe failed: low world-life tier did not reduce visible signals');
  if (!result.worldLife?.quality?.restoredMatchesMedium) failures.push('quality probe failed: medium world-life tier did not restore');
  if (!result.worldLife?.quality?.lowWindReduced) failures.push('quality probe failed: low foliage wind cadence did not reduce work');
  if ((result.worldLife?.quality?.low?.visibleWindBanners || 0) > 4) failures.push('quality probe failed: low wind banners exceeded budget');
  if ((result.worldLife?.quality?.low?.visibleWhisperBeacons || 0) > 4) failures.push('quality probe failed: low whisper beacons exceeded budget');
  if ((result.worldLife?.quality?.low?.visibleTerminalPulses || 0) > 2) failures.push('quality probe failed: low terminal pulses exceeded budget');
  if ((result.worldLife?.quality?.low?.visibleDistrictMotes || 0) > 16) failures.push('quality probe failed: low district motes exceeded budget');
  if ((result.worldLife?.quality?.low?.visibleDistrictSignals || 0) > 6) failures.push('quality probe failed: low district signals exceeded budget');
  for (const key of ['grassAnimated', 'districtMoteAnimated', 'districtSignalAnimated', 'bannerAnimated', 'pulseAnimated', 'beaconAnimated', 'motionAdvanced']) {
    if (!result.worldLife?.[key]) failures.push(`world life probe failed: ${key}`);
  }
  if (result.calls > 560) failures.push(`desktop draw-call budget exceeded: ${result.calls}`);
  if (result.triangles > 280000) failures.push(`desktop triangle budget exceeded: ${result.triangles}`);
  for (const name of ['driving', 'surfaceFeedback']) {
    const snapshot = result.activeSnapshots?.[name];
    if (!snapshot?.calls) {
      failures.push(`active render snapshot missing: ${name}`);
      continue;
    }
    const triangleBudget = name === 'surfaceFeedback' ? 290000 : 300000;
    if (snapshot.calls > 655) failures.push(`active render snapshot draw-call budget exceeded: ${name}=${snapshot.calls}`);
    if (snapshot.triangles > triangleBudget) failures.push(`active render snapshot triangle budget exceeded: ${name}=${snapshot.triangles}`);
  }
  const drivingVisibility = result.activeSnapshots?.driving?.setPieceVisibility;
  const surfaceVisibility = result.activeSnapshots?.surfaceFeedback?.setPieceVisibility;
  if ((surfaceVisibility?.batches || 0) < 80) failures.push(`district dressing visibility probe failed: batches=${surfaceVisibility?.batches || 0}`);
  if ((drivingVisibility?.hiddenBatches || 0) < 15) {
    failures.push(`district dressing driving cull probe failed: hiddenBatches=${drivingVisibility?.hiddenBatches || 0}`);
  }
  if ((surfaceVisibility?.hiddenBatches || 0) < 60) {
    failures.push(`district dressing surface cull probe failed: hiddenBatches=${surfaceVisibility?.hiddenBatches || 0}`);
  }
  const broadSurfaceVisibility = result.activeSnapshots?.surfaceFeedback?.broadSetPieceVisibility;
  if ((broadSurfaceVisibility?.batches || 0) < 30) failures.push(`broad set-piece visibility probe failed: batches=${broadSurfaceVisibility?.batches || 0}`);
  if ((broadSurfaceVisibility?.hiddenBatches || 0) < 1) failures.push(`broad set-piece visibility probe failed: surface hiddenBatches=${broadSurfaceVisibility?.hiddenBatches || 0}`);
  if (result.activeSnapshots?.surfaceFeedback?.renderProfile?.some((bucket) => bucket.name === 'STUNT_Yard_Dressing')) {
    failures.push('stunt yard cull probe failed: visible during surface feedback snapshot');
  }
  const routeDrivingVisibility = result.activeSnapshots?.driving?.broadSetPieceVisibility?.groups?.routeComposition;
  const routeSurfaceVisibility = broadSurfaceVisibility?.groups?.routeComposition;
  if ((routeDrivingVisibility?.batches || 0) < 80) {
    failures.push(`route composition spatial batching probe failed: driving batches=${routeDrivingVisibility?.batches || 0}`);
  }
  if ((routeDrivingVisibility?.hiddenBatches || 0) < 20) {
    failures.push(`route composition driving cull probe failed: hiddenBatches=${routeDrivingVisibility?.hiddenBatches || 0}`);
  }
  if ((routeSurfaceVisibility?.hiddenBatches || 0) < 40) {
    failures.push(`route composition surface cull probe failed: hiddenBatches=${routeSurfaceVisibility?.hiddenBatches || 0}`);
  }
  if ((result.mobile.districtVisibility?.visibleBatches || 0) > 90) {
    failures.push(`mobile district dressing visibility probe failed: visibleBatches=${result.mobile.districtVisibility?.visibleBatches || 0}`);
  }
  if ((result.mobile.districtVisibility?.hiddenBatches || 0) < 90) {
    failures.push(`mobile district dressing visibility probe failed: hiddenBatches=${result.mobile.districtVisibility?.hiddenBatches || 0}`);
  }
  if ((result.mobile.broadSetPieceVisibility?.hiddenBatches || 0) < 1) {
    failures.push(`mobile broad set-piece visibility probe failed: hiddenBatches=${result.mobile.broadSetPieceVisibility?.hiddenBatches || 0}`);
  }
  if (result.loadMs > 15000) failures.push(`app-ready load time too high: ${result.loadMs}ms`);
  if (result.p95FrameMs > 20) failures.push(`p95 frame time too high: ${result.p95FrameMs}ms`);
  if (result.fps < 60) failures.push(`desktop FPS too low: ${result.fps}`);
  if (!result.highQuality?.ready || (result.highQuality?.canvasSample || 0) <= 0) failures.push('high quality probe failed: canvas did not render');
  if (result.highQuality?.quality !== 'high') failures.push(`high quality probe failed: quality=${result.highQuality?.quality || 'none'}`);
  if (result.highQuality?.savedQuality !== 'high') failures.push(`high quality probe failed: savedQuality=${result.highQuality?.savedQuality || 'none'}`);
  if (!result.highQuality?.postprocessing || !result.highQuality?.shadows) failures.push('high quality probe failed: post/shadow tier inactive');
  if (!result.highQuality?.composerAllocated || !result.highQuality?.bloomAllocated) {
    failures.push('high quality renderer probe failed: post stack was not allocated');
  }
  if ((result.highQuality?.p95FrameMs || Infinity) > 24) failures.push(`high quality p95 frame time too high: ${result.highQuality?.p95FrameMs}ms`);
  if ((result.highQuality?.fps || 0) < 50) failures.push(`high quality FPS too low: ${result.highQuality?.fps}`);
  if ((result.highQuality?.calls || 0) > 700) failures.push(`high quality draw-call budget exceeded: ${result.highQuality?.calls}`);
  if ((result.highQuality?.triangles || 0) > 330000) failures.push(`high quality triangle budget exceeded: ${result.highQuality?.triangles}`);
  if (!result.highDpiDesktop?.ready || (result.highDpiDesktop?.canvasSample || 0) <= 0) failures.push('high-DPI desktop probe failed: canvas did not render');
  if (result.highDpiDesktop?.quality !== 'high') failures.push(`high-DPI desktop probe failed: quality=${result.highDpiDesktop?.quality || 'none'}`);
  if (!result.highDpiDesktop?.postprocessing || !result.highDpiDesktop?.shadows) failures.push('high-DPI desktop probe failed: post/shadow tier inactive');
  if (!result.highDpiDesktop?.composerAllocated || !result.highDpiDesktop?.bloomAllocated) {
    failures.push('high-DPI desktop renderer probe failed: post stack was not allocated');
  }
  if ((result.highDpiDesktop?.renderPixels || Infinity) > 2100000) {
    failures.push(`high-DPI desktop render pixel budget exceeded: ${result.highDpiDesktop?.renderPixels}`);
  }
  if ((result.highDpiDesktop?.pixelRatio || Infinity) > 0.8) {
    failures.push(`high-DPI desktop pixel ratio too high: ${result.highDpiDesktop?.pixelRatio}`);
  }
  if ((result.highDpiDesktop?.p95FrameMs || Infinity) > 24) {
    failures.push(`high-DPI desktop p95 frame time too high: ${result.highDpiDesktop?.p95FrameMs}ms`);
  }
  if (!result.lighting?.sun) failures.push('lighting probe failed: missing sun stats');
  if ((result.lighting?.sun?.position?.[1] || 0) < 30 || (result.lighting?.sun?.position?.[1] || 0) > 45) {
    failures.push(`lighting probe failed: sun height=${result.lighting?.sun?.position?.[1]}`);
  }
  if ((result.lighting?.fog?.near || 0) > 124 || (result.lighting?.fog?.far || 0) > 510) {
    failures.push(`lighting probe failed: fog range=${result.lighting?.fog?.near}/${result.lighting?.fog?.far}`);
  }
  if ((result.lighting?.toneMappingExposure || 0) > 1.08) {
    failures.push(`lighting probe failed: exposure=${result.lighting?.toneMappingExposure}`);
  }
  if ((result.materialPalette?.securityRoad?.luma || 0) < 0.22) {
    failures.push(`material palette probe failed: securityRoad luma=${result.materialPalette?.securityRoad?.luma || 0}`);
  }
  if ((result.materialPalette?.stoneRoad?.luma || 0) < 0.4) {
    failures.push(`material palette probe failed: stoneRoad luma=${result.materialPalette?.stoneRoad?.luma || 0}`);
  }
  if ((result.materialPalette?.roadShoulder?.luma || 0) < 0.49) {
    failures.push(`material palette probe failed: roadShoulder luma=${result.materialPalette?.roadShoulder?.luma || 0}`);
  }
  if ((result.materialPalette?.meadowDark?.luma || 0) < 0.45) {
    failures.push(`material palette probe failed: meadowDark luma=${result.materialPalette?.meadowDark?.luma || 0}`);
  }
  if ((result.materialPalette?.sand?.luma || 0) < 0.62 || (result.materialPalette?.sand?.luma || 0) > 0.78) {
    failures.push(`material palette probe failed: sand luma=${result.materialPalette?.sand?.luma || 0}`);
  }
  if ((result.materialPalette?.paleStone?.luma || 0) < 0.68 || (result.materialPalette?.paleStone?.luma || 0) > 0.86) {
    failures.push(`material palette probe failed: paleStone luma=${result.materialPalette?.paleStone?.luma || 0}`);
  }
  if ((result.materialPalette?.warmStone?.luma || 0) < 0.62 || (result.materialPalette?.warmStone?.luma || 0) > 0.8) {
    failures.push(`material palette probe failed: warmStone luma=${result.materialPalette?.warmStone?.luma || 0}`);
  }
  const roadGrassContrast = result.materialPalette?.roadGrassContrast ?? 0;
  if (roadGrassContrast < 0.16 || roadGrassContrast > 0.29) {
    failures.push(`material palette probe failed: roadGrassContrast=${roadGrassContrast}`);
  }
  const polishPropsBytes = result.glbAssets?.['play/game-assets/polish-props.glb'] || 0;
  if (polishPropsBytes > 2500000) failures.push(`polish props GLB budget exceeded: ${polishPropsBytes}`);
  const runtimePropsBytes = result.glbAssets?.['play/game-assets/runtime-props.glb'] || 0;
  if (runtimePropsBytes > 7600000) failures.push(`runtime props GLB budget exceeded: ${runtimePropsBytes}`);
  if (result.gameplay.movementMeters < 5) failures.push(`drive movement too small: ${result.gameplay.movementMeters}m`);
  for (const key of ['keyboardHandbrake', 'boostSeen', 'jumpSeen', 'landingSeen', 'impactAudioSeen', 'burnoutSeen', 'wheelieSeen', 'handbrakeSeen']) {
    if (!result.gameplay[key]) failures.push(`gameplay probe failed: ${key}`);
  }
  const vehicleFx = result.gameplay.vehicleFx || {};
  if ((vehicleFx.spawnedTrail || 0) < 1) failures.push(`vehicle FX probe failed: trail=${vehicleFx.spawnedTrail || 0}`);
  if ((vehicleFx.spawnedSmoke || 0) < 2) failures.push(`vehicle FX probe failed: smoke=${vehicleFx.spawnedSmoke || 0}`);
  if ((vehicleFx.spawnedBoost || 0) < 1) failures.push(`vehicle FX probe failed: boost=${vehicleFx.spawnedBoost || 0}`);
  if ((vehicleFx.spawnedSkid || 0) < 2) failures.push(`vehicle FX probe failed: skid=${vehicleFx.spawnedSkid || 0}`);
  if (!result.vehicleLights?.headlightsReady) failures.push('vehicle light probe failed: headlights');
  if (!result.vehicleLights?.brakeReady) failures.push('vehicle light probe failed: brake lenses');
  if (!result.vehicleLights?.reverseReady) failures.push('vehicle light probe failed: reverse lenses');
  if (!result.vehicleLights?.boostReady) failures.push('vehicle light probe failed: boost lenses');
  const surfaceFeedback = result.surfaceFeedback || {};
  for (const id of ['grass', 'sand', 'shore']) {
    if (!surfaceFeedback.targets?.[id]) failures.push(`surface feedback probe failed: target ${id}`);
    if ((surfaceFeedback.trailDeltas?.[id] || 0) < 1) failures.push(`surface feedback probe failed: ${id} trail=${surfaceFeedback.trailDeltas?.[id] || 0}`);
    if ((surfaceFeedback.smokeDeltas?.[id] || 0) < 1) failures.push(`surface feedback probe failed: ${id} smoke=${surfaceFeedback.smokeDeltas?.[id] || 0}`);
    if ((surfaceFeedback.dragDeltas?.[id] || 0) < 1) failures.push(`surface drag probe failed: ${id} drag=${surfaceFeedback.dragDeltas?.[id] || 0}`);
  }
  if ((surfaceFeedback.surfaceDustDelta || 0) < 6) failures.push(`surface feedback probe failed: surface dust=${surfaceFeedback.surfaceDustDelta || 0}`);
  if ((surfaceFeedback.lastSurfaceDrag?.damp || 1) >= 1) failures.push(`surface drag probe failed: last damp=${surfaceFeedback.lastSurfaceDrag?.damp}`);
  if (!result.camera?.occlusion?.resolvedCloser) failures.push('camera occlusion probe failed');
  if ((result.camera?.stats?.tests || 0) < 1) failures.push('camera occlusion stats did not record tests');
  const cameraFeel = result.camera?.stats?.feel || {};
  if ((cameraFeel.maxFov || 0) < 60.5) failures.push(`camera feel probe failed: maxFov=${cameraFeel.maxFov || 0}`);
  if ((cameraFeel.maxShake || 0) < 0.18) failures.push(`camera feel probe failed: maxShake=${cameraFeel.maxShake || 0}`);
  if ((cameraFeel.maxSpeedPull || 0) < 1.4) failures.push(`camera feel probe failed: maxSpeedPull=${cameraFeel.maxSpeedPull || 0}`);
  if ((result.audio?.zoneStingersPlayed || 0) < 1) failures.push('audio probe failed: zone stingers');
  if ((result.audio?.landingEvents || 0) < 1) failures.push('audio probe failed: landing event counter');
  if ((result.audio?.boostBurstsPlayed || 0) < 1) failures.push(`audio probe failed: boost bursts=${result.audio?.boostBurstsPlayed || 0}`);
  if ((result.audio?.burnoutsPlayed || 0) < 1) failures.push(`audio probe failed: burnouts=${result.audio?.burnoutsPlayed || 0}`);
  if ((result.audio?.wheeliesPlayed || 0) < 1) failures.push(`audio probe failed: wheelies=${result.audio?.wheeliesPlayed || 0}`);
  if ((result.audio?.tireSquealsPlayed || 0) < 1) failures.push(`audio probe failed: tire squeals=${result.audio?.tireSquealsPlayed || 0}`);
  if ((result.audio?.surfaceRumblesPlayed || 0) < 1) failures.push(`audio probe failed: surface rumbles=${result.audio?.surfaceRumblesPlayed || 0}`);
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
  if (!result.overlayUi?.map?.mapVisible || !result.overlayUi?.map?.mapDashboard || !result.overlayUi?.map?.mapConsole) failures.push('overlay UI probe failed: map console styling not active');
  if (!result.overlayUi?.menu?.menuVisible || !result.overlayUi?.menu?.menuDashboard) failures.push('overlay UI probe failed: menu console styling not active');
  if ((result.overlayUi?.map?.mapCardWidth || 0) > 700) failures.push(`overlay UI probe failed: map card too wide=${result.overlayUi?.map?.mapCardWidth || 0}`);
  if ((result.overlayUi?.menu?.menuCardWidth || 0) > 480) failures.push(`overlay UI probe failed: menu card too wide=${result.overlayUi?.menu?.menuCardWidth || 0}`);
  if ((result.overlayUi?.map?.mapPins || 0) !== worldZones.length) failures.push(`overlay UI probe failed: map pins=${result.overlayUi?.map?.mapPins || 0}/${worldZones.length}`);
  if (!result.water?.surfaceSeen) failures.push('water probe failed: surface state');
  if (!result.water?.splashSeen) failures.push('water probe failed: splash particles');
  if ((result.water?.splashCount || 0) < 2) failures.push(`water splash readability probe failed: active splashes=${result.water?.splashCount || 0}`);
  if ((result.water?.stats?.splashMaterialOpacity || 0) < 0.4) {
    failures.push(`water splash readability probe failed: opacity=${result.water?.stats?.splashMaterialOpacity || 0}`);
  }
  if ((result.water?.stats?.splashProfile?.shoreLife || 0) < 0.78) {
    failures.push(`water splash readability probe failed: shoreLife=${result.water?.stats?.splashProfile?.shoreLife || 0}`);
  }
  if ((result.water?.stats?.splashProfile?.waterLife || 0) < 0.92) {
    failures.push(`water splash readability probe failed: waterLife=${result.water?.stats?.splashProfile?.waterLife || 0}`);
  }
  if (!result.water?.wakeSeen) failures.push('water probe failed: wake rings');
  if ((result.water?.wakeSpawnedDelta || 0) < 6) failures.push(`water probe failed: wake delta=${result.water?.wakeSpawnedDelta || 0}`);
  if ((result.water?.activeWakes || 0) < 4) failures.push(`water probe failed: active wakes=${result.water?.activeWakes || 0}`);
  if (!result.water?.foamStreakSeen) failures.push('water foam streak probe failed: streaks did not spawn');
  if ((result.water?.foamStreakSpawnedDelta || 0) < 6) {
    failures.push(`water foam streak probe failed: delta=${result.water?.foamStreakSpawnedDelta || 0}`);
  }
  if ((result.water?.activeFoamStreaks || 0) < 4) {
    failures.push(`water foam streak probe failed: active=${result.water?.activeFoamStreaks || 0}`);
  }
  if ((result.waterView?.activeFoamStreaks || 0) < 2) {
    failures.push(`water screenshot staging failed: active foam streaks=${result.waterView?.activeFoamStreaks || 0}`);
  }
  if ((result.waterView?.wakeDelta || 0) < 2 || (result.waterView?.foamStreakDelta || 0) < 2) {
    failures.push(`water screenshot staging failed: wakeDelta=${result.waterView?.wakeDelta || 0}, foamDelta=${result.waterView?.foamStreakDelta || 0}`);
  }
  if ((result.water?.stats?.foamStreakMaterialOpacity || 0) < 0.44) {
    failures.push(`water foam streak readability probe failed: opacity=${result.water?.stats?.foamStreakMaterialOpacity || 0}`);
  }
  if ((result.water?.stats?.foamStreakProfile?.waterLife || 0) < 1.25) {
    failures.push(`water foam streak readability probe failed: waterLife=${result.water?.stats?.foamStreakProfile?.waterLife || 0}`);
  }
  if ((result.water?.stats?.wakeMaterialOpacity || 0) < 0.44) {
    failures.push(`water wake readability probe failed: opacity=${result.water?.stats?.wakeMaterialOpacity || 0}`);
  }
  if ((result.water?.stats?.wakeProfile?.waterLife || 0) < 1.5) {
    failures.push(`water wake readability probe failed: waterLife=${result.water?.stats?.wakeProfile?.waterLife || 0}`);
  }
  if ((result.water?.stats?.wakeProfile?.shoreLife || 0) < 1.1) {
    failures.push(`water wake readability probe failed: shoreLife=${result.water?.stats?.wakeProfile?.shoreLife || 0}`);
  }
  if ((result.water?.stats?.wakeProfile?.stretchMax || 0) < 2.65) {
    failures.push(`water wake readability probe failed: stretchMax=${result.water?.stats?.wakeProfile?.stretchMax || 0}`);
  }
  if (!result.water?.dragReduced) failures.push('water probe failed: drag');
  if (!result.water?.submergeRespawned) failures.push('water probe failed: submerge respawn');
  if (!result.waterStats?.splashMesh) failures.push('water splash probe failed: instanced splash mesh missing');
  if ((result.waterStats?.splashCapacity || 0) < (result.waterStats?.maxSplashes || 0)) {
    failures.push(`water splash probe failed: capacity=${result.waterStats?.splashCapacity || 0}, max=${result.waterStats?.maxSplashes || 0}`);
  }
  if ((result.waterStats?.splashRenderCount || 0) > (result.waterStats?.maxSplashes || 0)) {
    failures.push(`water splash render cap failed: count=${result.waterStats?.splashRenderCount || 0}, max=${result.waterStats?.maxSplashes || 0}`);
  }
  if ((result.waterStats?.wakeRenderCount || 0) > (result.waterStats?.maxWakes || 0)) {
    failures.push(`water wake render cap failed: count=${result.waterStats?.wakeRenderCount || 0}, max=${result.waterStats?.maxWakes || 0}`);
  }
  if (!result.waterStats?.foamStreakMesh) failures.push('water foam streak probe failed: instanced mesh missing');
  if ((result.waterStats?.foamStreakCapacity || 0) < (result.waterStats?.maxFoamStreaks || 0)) {
    failures.push(`water foam streak probe failed: capacity=${result.waterStats?.foamStreakCapacity || 0}, max=${result.waterStats?.maxFoamStreaks || 0}`);
  }
  if ((result.waterStats?.foamStreakRenderCount || 0) > (result.waterStats?.maxFoamStreaks || 0)) {
    failures.push(`water foam streak render cap failed: count=${result.waterStats?.foamStreakRenderCount || 0}, max=${result.waterStats?.maxFoamStreaks || 0}`);
  }
  if ((result.waterStats?.splashesSpawned || 0) < 2) failures.push(`water splash probe failed: spawned=${result.waterStats?.splashesSpawned || 0}`);
  if ((result.waterStats?.surfaceGlints || 0) < 30) failures.push(`water detail probe failed: surfaceGlints=${result.waterStats?.surfaceGlints || 0}`);
  if ((result.waterStats?.visibleSurfaceGlints || 0) < 20) failures.push(`water detail probe failed: visibleSurfaceGlints=${result.waterStats?.visibleSurfaceGlints || 0}`);
  if ((result.waterStats?.visibleWaveLanes || 0) < 32) failures.push(`water detail probe failed: visibleWaveLanes=${result.waterStats?.visibleWaveLanes || 0}`);
  if ((result.waterStats?.shoreFlecks || 0) < 112) failures.push(`water shoreline fleck probe failed: shoreFlecks=${result.waterStats?.shoreFlecks || 0}`);
  if ((result.waterStats?.visibleShoreFlecks || 0) < 72) failures.push(`water shoreline fleck probe failed: visibleShoreFlecks=${result.waterStats?.visibleShoreFlecks || 0}`);
  if ((result.waterStats?.shorelineLifeKits || 0) < 10) failures.push(`water authored shoreline probe failed: shorelineLifeKits=${result.waterStats?.shorelineLifeKits || 0}`);
  if ((result.waterStats?.visibleShorelineLifeKits || 0) < 8) failures.push(`water authored shoreline probe failed: visibleShorelineLifeKits=${result.waterStats?.visibleShorelineLifeKits || 0}`);
  if ((result.waterStats?.shorelineTidePools || 0) < 5) failures.push(`water authored shoreline probe failed: shorelineTidePools=${result.waterStats?.shorelineTidePools || 0}`);
  if ((result.waterStats?.shorelineBreakwaters || 0) < 5) failures.push(`water authored shoreline probe failed: shorelineBreakwaters=${result.waterStats?.shorelineBreakwaters || 0}`);
  if ((result.waterStats?.visibleTideGlimmers || 0) < 12) failures.push(`water tide glimmer probe failed: visibleTideGlimmers=${result.waterStats?.visibleTideGlimmers || 0}`);
  if (result.surfaces?.road !== 'road') failures.push(`surface probe failed: road=${result.surfaces?.road}`);
  if (result.surfaces?.grass !== 'grass') failures.push(`surface probe failed: grass=${result.surfaces?.grass}`);
  if (result.surfaces?.sand !== 'sand') failures.push(`surface probe failed: sand=${result.surfaces?.sand}`);
  if (result.surfaces?.shore !== 'shore') failures.push(`surface probe failed: shore=${result.surfaces?.shore}`);
  if (result.surfaces?.water !== 'water') failures.push(`surface probe failed: water=${result.surfaces?.water}`);
  const roadProfiles = result.surfaces?.roadProfiles || {};
  for (const hierarchy of ['avenue', 'plaza', 'security', 'stunt', 'dirt', 'bridge']) {
    const profile = roadProfiles[hierarchy];
    if (profile?.id !== 'road') failures.push(`road surface metadata failed: ${hierarchy} id=${profile?.id}`);
    if (profile?.roadHierarchy !== hierarchy) failures.push(`road surface metadata failed: ${hierarchy} hierarchy=${profile?.roadHierarchy}`);
    if (!profile?.audioId || profile.audioId === 'road' && hierarchy !== 'avenue') {
      failures.push(`road surface metadata failed: ${hierarchy} audioId=${profile?.audioId}`);
    }
  }
  if ((roadProfiles.dirt?.forwardGrip || 1) >= (roadProfiles.avenue?.forwardGrip || 0)) {
    failures.push(`road surface metadata failed: dirt grip ${roadProfiles.dirt?.forwardGrip} >= avenue ${roadProfiles.avenue?.forwardGrip}`);
  }
  if ((roadProfiles.dirt?.drag || 1) >= 1) failures.push(`road surface metadata failed: dirt drag=${roadProfiles.dirt?.drag}`);
  if (roadProfiles.dirt?.skidMarks !== false) failures.push('road surface metadata failed: dirt skid marks should be disabled');
  if ((roadProfiles.stunt?.topSpeedFactor || 0) <= (roadProfiles.plaza?.topSpeedFactor || 0)) {
    failures.push(`road surface metadata failed: stunt speed ${roadProfiles.stunt?.topSpeedFactor} <= plaza ${roadProfiles.plaza?.topSpeedFactor}`);
  }
  if (new Set(Object.values(roadProfiles).map((profile) => profile?.audioId).filter(Boolean)).size < 5) {
    failures.push('road surface metadata failed: road audio ids are not distinct enough');
  }
  if ((result.roadGuidance?.chevrons || 0) < 40) failures.push(`road guidance probe failed: chevrons=${result.roadGuidance?.chevrons || 0}`);
  if ((result.roadGuidance?.reflectorStuds || 0) < 140) failures.push(`road guidance probe failed: reflectorStuds=${result.roadGuidance?.reflectorStuds || 0}`);
  if ((result.roadGuidance?.markerOpacity || 1) > 0.24) failures.push(`road guidance readability probe failed: markerOpacity=${result.roadGuidance?.markerOpacity}`);
  if ((result.roadGuidance?.edgeFeathers || 0) < 24) failures.push(`road guidance probe failed: edgeFeathers=${result.roadGuidance?.edgeFeathers || 0}`);
  if ((result.roadGuidance?.laneEdges || 0) < 20) failures.push(`road guidance probe failed: laneEdges=${result.roadGuidance?.laneEdges || 0}`);
  if (!result.roadTopology?.coastalLoop) failures.push('road topology probe failed: coastal loop missing');
  if ((result.roadTopology?.closedLoops || 0) < 1) failures.push(`road topology probe failed: closedLoops=${result.roadTopology?.closedLoops || 0}`);
  if ((result.roadTopology?.coastalLoopPoints || 0) < 12) failures.push(`road topology probe failed: coastalLoopPoints=${result.roadTopology?.coastalLoopPoints || 0}`);
  if ((result.roadTopology?.sharedJunctions || 0) < 6) failures.push(`road topology probe failed: sharedJunctions=${result.roadTopology?.sharedJunctions || 0}`);
  if ((result.roadTopology?.maxRoadWidth || 99) > 5.6) failures.push(`road corridor probe failed: maxRoadWidth=${result.roadTopology?.maxRoadWidth}`);
  if ((result.roadTopology?.averageRoadWidth || 99) > 4.7) failures.push(`road corridor probe failed: averageRoadWidth=${result.roadTopology?.averageRoadWidth}`);
  if ((result.roadTopology?.maxThresholdWidth || 99) > 16) failures.push(`road corridor probe failed: maxThresholdWidth=${result.roadTopology?.maxThresholdWidth}`);
  if ((result.roadTopology?.averageThresholdWidth || 99) > 14.4) failures.push(`road corridor probe failed: averageThresholdWidth=${result.roadTopology?.averageThresholdWidth}`);
  if ((result.staticBatching?.groups || 0) < 8) failures.push(`static batching probe failed: groups=${result.staticBatching?.groups || 0}`);
  if ((result.staticBatching?.mergedMeshes || 0) <= (result.staticBatching?.batches || 0)) failures.push(`static batching probe failed: merged=${result.staticBatching?.mergedMeshes || 0}, batches=${result.staticBatching?.batches || 0}`);
  if ((result.staticBatching?.prunedEmptyGroups || 0) < 1) failures.push(`static batching probe failed: pruned=${result.staticBatching?.prunedEmptyGroups || 0}`);
  if ((result.staticBatching?.cellGroups || 0) < 1) failures.push(`static batching probe failed: cellGroups=${result.staticBatching?.cellGroups || 0}`);
  if ((result.foliage?.understoryEntries || 0) < 120) failures.push(`foliage probe failed: understoryEntries=${result.foliage?.understoryEntries || 0}`);
  if ((result.foliage?.visibleUnderstory || 0) < 90) failures.push(`foliage probe failed: visibleUnderstory=${result.foliage?.visibleUnderstory || 0}`);
  if ((result.foliage?.visibleTreeShadows || 0) < (result.foliage?.visibleTrees || 0)) {
    failures.push(`foliage probe failed: visibleTreeShadows=${result.foliage?.visibleTreeShadows || 0}/${result.foliage?.visibleTrees || 0}`);
  }
  if ((result.foliage?.treeColorVariants || 0) < 10) failures.push(`foliage probe failed: treeColorVariants=${result.foliage?.treeColorVariants || 0}`);
  if ((result.foliage?.grassColorVariants || 0) < 5) failures.push(`foliage probe failed: grassColorVariants=${result.foliage?.grassColorVariants || 0}`);
  if ((result.foliage?.flowerColorVariants || 0) < 9) failures.push(`foliage probe failed: flowerColorVariants=${result.foliage?.flowerColorVariants || 0}`);
  if ((result.mapStats?.pins || 0) !== worldZones.length) failures.push(`map probe failed: pins=${result.mapStats?.pins || 0}/${worldZones.length}`);
  if ((result.mapStats?.districtLabels || 0) !== districtFootprints.length) failures.push(`map probe failed: districtLabels=${result.mapStats?.districtLabels || 0}/${districtFootprints.length}`);
  if ((result.mapStats?.routeLabels || 0) !== roadPaths.length) failures.push(`map probe failed: routeLabels=${result.mapStats?.routeLabels || 0}/${roadPaths.length}`);
  if ((result.mapStats?.roadUnderlays || 0) !== roadPaths.length) failures.push(`map probe failed: roadUnderlays=${result.mapStats?.roadUnderlays || 0}/${roadPaths.length}`);
  if ((result.mapStats?.roadLines || 0) !== roadPaths.length) failures.push(`map probe failed: roadLines=${result.mapStats?.roadLines || 0}/${roadPaths.length}`);
  if ((result.mapStats?.circuitCheckpoints || 0) !== circuitCheckpoints.length) failures.push(`map probe failed: circuitCheckpoints=${result.mapStats?.circuitCheckpoints || 0}/${circuitCheckpoints.length}`);
  if ((result.mapStats?.legendItems || 0) < 5) failures.push(`map probe failed: legendItems=${result.mapStats?.legendItems || 0}`);
  if (!result.atmosphere?.skyDome) failures.push('atmosphere probe failed: sky dome');
  if (!result.atmosphere?.sunDisk) failures.push('atmosphere probe failed: sun disk');
  if ((result.atmosphere?.sunGlows || 0) < 3) failures.push(`atmosphere probe failed: sunGlows=${result.atmosphere?.sunGlows || 0}`);
  if ((result.atmosphere?.visibleSunGlows || 0) < 3) failures.push(`atmosphere probe failed: visibleSunGlows=${result.atmosphere?.visibleSunGlows || 0}`);
  if ((result.atmosphere?.horizonRibbons || 0) < 3) failures.push(`atmosphere probe failed: horizonRibbons=${result.atmosphere?.horizonRibbons || 0}`);
  if ((result.atmosphere?.visibleHorizonRibbons || 0) < 3) failures.push(`atmosphere probe failed: visibleHorizonRibbons=${result.atmosphere?.visibleHorizonRibbons || 0}`);
  if ((result.atmosphere?.cloudBanks || 0) < 12) failures.push(`atmosphere probe failed: cloudBanks=${result.atmosphere?.cloudBanks || 0}`);
  if ((result.atmosphere?.visibleCloudBanks || 0) < 8) failures.push(`atmosphere probe failed: visibleCloudBanks=${result.atmosphere?.visibleCloudBanks || 0}`);
  if ((result.atmosphere?.visibleSkyWisps || 0) < 8) failures.push(`atmosphere probe failed: visibleSkyWisps=${result.atmosphere?.visibleSkyWisps || 0}`);
  if (!result.atmosphere?.distantIsletTemplate) failures.push('atmosphere probe failed: distant islet template');
  if ((result.atmosphere?.distantIslets || 0) < 20) failures.push(`atmosphere probe failed: distantIslets=${result.atmosphere?.distantIslets || 0}`);
  if ((result.atmosphere?.visibleDistantIslets || 0) < 14) failures.push(`atmosphere probe failed: visibleDistantIslets=${result.atmosphere?.visibleDistantIslets || 0}`);
  if ((result.atmosphere?.visibleClouds || 0) < 9) failures.push(`atmosphere probe failed: visibleClouds=${result.atmosphere?.visibleClouds || 0}`);
  if ((result.atmosphere?.cloudShadowInstances || 0) < (result.atmosphere?.visibleClouds || 0)) failures.push(`atmosphere probe failed: cloudShadowInstances=${result.atmosphere?.cloudShadowInstances || 0}`);
  if ((result.atmosphere?.motionSamples || 0) < 1) failures.push('atmosphere probe failed: motion samples');
  if ((result.roadJunctions?.blendPatches || 0) < 8) failures.push(`road junction probe failed: blendPatches=${result.roadJunctions?.blendPatches || 0}`);
  if ((result.roadJunctions?.circularPointCaps || 0) !== 0) failures.push(`road junction probe failed: circularPointCaps=${result.roadJunctions?.circularPointCaps || 0}`);
  if ((result.roadSurfaceDetails?.wearStrips || 0) < 90) failures.push(`road surface detail probe failed: wearStrips=${result.roadSurfaceDetails?.wearStrips || 0}`);
  if ((result.roadSurfaceDetails?.laneSeams || 0) < 36) failures.push(`road surface detail probe failed: laneSeams=${result.roadSurfaceDetails?.laneSeams || 0}`);
  if ((result.roadSurfaceDetails?.visibleWearStrips || 0) < 90) failures.push(`road surface detail probe failed: visibleWearStrips=${result.roadSurfaceDetails?.visibleWearStrips || 0}`);
  if ((result.roadSurfaceDetails?.visibleLaneSeams || 0) < 36) failures.push(`road surface detail probe failed: visibleLaneSeams=${result.roadSurfaceDetails?.visibleLaneSeams || 0}`);
  if ((result.roadSurfaceDetails?.transitionAprons || 0) < 16) failures.push(`road transition probe failed: transitionAprons=${result.roadSurfaceDetails?.transitionAprons || 0}`);
  if ((result.roadSurfaceDetails?.transitionGuideBars || 0) < 56) failures.push(`road transition probe failed: transitionGuideBars=${result.roadSurfaceDetails?.transitionGuideBars || 0}`);
  if ((result.roadSurfaceDetails?.visibleTransitionMeshes || 0) < 3) failures.push(`road transition probe failed: visibleTransitionMeshes=${result.roadSurfaceDetails?.visibleTransitionMeshes || 0}`);
  if ((result.roadSurfaceDetails?.opacities?.wear || 1) > 0.12) failures.push(`road readability probe failed: wear opacity=${result.roadSurfaceDetails?.opacities?.wear}`);
  if ((result.roadSurfaceDetails?.opacities?.seam || 1) > 0.09) failures.push(`road readability probe failed: seam opacity=${result.roadSurfaceDetails?.opacities?.seam}`);
  if ((result.roadSurfaceDetails?.opacities?.transitionApron || 1) > 0.07) failures.push(`road readability probe failed: transitionApron opacity=${result.roadSurfaceDetails?.opacities?.transitionApron}`);
  if ((result.roadSurfaceDetails?.opacities?.transitionEdge || 1) > 0.1) failures.push(`road readability probe failed: transitionEdge opacity=${result.roadSurfaceDetails?.opacities?.transitionEdge}`);
  if ((result.roadSurfaceDetails?.opacities?.transitionGuide || 1) > 0.15) failures.push(`road readability probe failed: transitionGuide opacity=${result.roadSurfaceDetails?.opacities?.transitionGuide}`);
  if ((result.roadSurfaceDetails?.opacities?.marker || 1) > 0.24) failures.push(`road readability probe failed: marker opacity=${result.roadSurfaceDetails?.opacities?.marker}`);
  if (result.roadSurfaceDetails?.transitionApronPattern !== 'broken-threshold') {
    failures.push(`road readability probe failed: transition apron pattern=${result.roadSurfaceDetails?.transitionApronPattern}`);
  }
  if (!result.roadSurfaceDetails?.transitionApronAlphaMapped) failures.push('road readability probe failed: transition apron alpha map missing');
  if (result.roadSurfaceDetails?.edgeFeatherPattern !== 'broken-verge') {
    failures.push(`road readability probe failed: edge feather pattern=${result.roadSurfaceDetails?.edgeFeatherPattern}`);
  }
  if (!result.roadSurfaceDetails?.edgeFeatherAlphaMapped) failures.push('road readability probe failed: edge feather alpha map missing');
  if ((result.roadSurfaceDetails?.edgeFeatherOpacity || 1) > 0.06) {
    failures.push(`road readability probe failed: edgeFeather opacity=${result.roadSurfaceDetails?.edgeFeatherOpacity}`);
  }
  if ((result.districtGround?.pads || 0) < 13) failures.push(`district ground probe failed: pads=${result.districtGround?.pads || 0}`);
  if ((result.districtGround?.edgeTrims || 0) < (result.districtGround?.pads || 0)) {
    failures.push(`district ground probe failed: edgeTrims=${result.districtGround?.edgeTrims || 0}/${result.districtGround?.pads || 0}`);
  }
  if ((result.districtGround?.averageOutlineVertices || 0) < 18) {
    failures.push(`district ground probe failed: averageOutlineVertices=${result.districtGround?.averageOutlineVertices || 0}`);
  }
  if ((result.districtGround?.batchedMeshes || 0) <= 0 || (result.districtGround?.batchedMeshes || 0) >= (result.districtGround?.pads || 0) + (result.districtGround?.edgeTrims || 0)) {
    failures.push(`district ground batching probe failed: batchedMeshes=${result.districtGround?.batchedMeshes || 0}`);
  }
  if ((result.surfaceDetails?.districts || 0) < 10) failures.push(`surface detail probe failed: districts=${result.surfaceDetails?.districts || 0}`);
  if ((result.surfaceDetails?.seams || 0) < 40) failures.push(`surface detail probe failed: seams=${result.surfaceDetails?.seams || 0}`);
  if ((result.surfaceDetails?.pavers || 0) < 24) failures.push(`surface detail probe failed: pavers=${result.surfaceDetails?.pavers || 0}`);
  if ((result.surfaceDetails?.accents || 0) < 18) failures.push(`surface detail probe failed: accents=${result.surfaceDetails?.accents || 0}`);
  if ((result.surfaceDetails?.breakups || 0) < 28) failures.push(`surface breakup probe failed: breakups=${result.surfaceDetails?.breakups || 0}`);
  if ((result.surfaceDetails?.opacities?.seam || 1) > 0.15) failures.push(`surface tone probe failed: seam opacity=${result.surfaceDetails?.opacities?.seam}`);
  if ((result.surfaceDetails?.opacities?.paver || 1) > 0.08) failures.push(`surface tone probe failed: paver opacity=${result.surfaceDetails?.opacities?.paver}`);
  if ((result.surfaceDetails?.opacities?.accent || 1) > 0.17) failures.push(`surface tone probe failed: accent opacity=${result.surfaceDetails?.opacities?.accent}`);
  if (!result.surfaceDetails?.alphaMapped?.seam) failures.push('surface tone probe failed: seam alpha map missing');
  if (!result.surfaceDetails?.alphaMapped?.paver) failures.push('surface tone probe failed: paver alpha map missing');
  if (!result.surfaceDetails?.alphaMapped?.accent) failures.push('surface tone probe failed: accent alpha map missing');
  if ((result.meadowDetails?.patches || 0) < 36) failures.push(`meadow detail probe failed: patches=${result.meadowDetails?.patches || 0}`);
  if ((result.meadowDetails?.colorVariants || 0) < 20) failures.push(`meadow detail probe failed: colorVariants=${result.meadowDetails?.colorVariants || 0}`);
  if ((result.meadowDetails?.opacity || 1) > 0.06) failures.push(`meadow tone probe failed: opacity=${result.meadowDetails?.opacity}`);
  if (!result.meadowDetails?.alphaMapped) failures.push('meadow tone probe failed: alpha map missing');
  if ((result.fieldMotifs?.clusters || 0) < 20) failures.push(`field motif probe failed: clusters=${result.fieldMotifs?.clusters || 0}`);
  if ((result.fieldMotifs?.berms || 0) < 44) failures.push(`field motif probe failed: berms=${result.fieldMotifs?.berms || 0}`);
  if ((result.fieldMotifs?.ribbons || 0) < 88) failures.push(`field motif probe failed: ribbons=${result.fieldMotifs?.ribbons || 0}`);
  if ((result.fieldMotifs?.visibleTotal || 0) < 132) failures.push(`field motif probe failed: visibleTotal=${result.fieldMotifs?.visibleTotal || 0}`);
  if ((result.fieldMotifs?.bermGeometryTriangles || 0) <= 0) failures.push(`field motif geometry probe failed: bermGeometryTriangles=${result.fieldMotifs?.bermGeometryTriangles || 0}`);
  if ((result.fieldMotifs?.bermGeometryTriangles || 0) > 36) failures.push(`field motif geometry budget failed: bermGeometryTriangles=${result.fieldMotifs?.bermGeometryTriangles || 0}`);
  if ((result.fieldMotifs?.ribbonOpacity || 1) > 0.08) failures.push(`field motif tone probe failed: ribbonOpacity=${result.fieldMotifs?.ribbonOpacity}`);
  if (!result.fieldMotifs?.ribbonAlphaMapped) failures.push('field motif tone probe failed: ribbon alpha map missing');
  if ((result.roadsideFrames?.segments || 0) < 50) failures.push(`roadside frame probe failed: segments=${result.roadsideFrames?.segments || 0}`);
  if ((result.roadsideFrames?.berms || 0) < 90) failures.push(`roadside frame probe failed: berms=${result.roadsideFrames?.berms || 0}`);
  if ((result.roadsideFrames?.ribbons || 0) < 150) failures.push(`roadside frame probe failed: ribbons=${result.roadsideFrames?.ribbons || 0}`);
  if ((result.roadsideFrames?.stoneTabs || 0) < 70) failures.push(`roadside frame probe failed: stoneTabs=${result.roadsideFrames?.stoneTabs || 0}`);
  if ((result.roadsideFrames?.visibleTotal || 0) < 310) failures.push(`roadside frame probe failed: visibleTotal=${result.roadsideFrames?.visibleTotal || 0}`);
  if ((result.roadsideFrames?.ribbonOpacity || 1) > 0.08) failures.push(`roadside frame tone probe failed: ribbonOpacity=${result.roadsideFrames?.ribbonOpacity}`);
  if ((result.roadsideFrames?.stoneTabOpacity || 1) > 0.08) failures.push(`roadside frame tone probe failed: stoneTabOpacity=${result.roadsideFrames?.stoneTabOpacity}`);
  if (!result.roadsideFrames?.ribbonAlphaMapped) failures.push('roadside frame tone probe failed: ribbon alpha map missing');
  if (!result.roadsideFrames?.stoneTabAlphaMapped) failures.push('roadside frame tone probe failed: stone tab alpha map missing');
  if ((result.terrainRelief?.mounds || 0) < 6) failures.push(`terrain relief probe failed: mounds=${result.terrainRelief?.mounds || 0}`);
  if ((result.terrainRelief?.cliffShelves || 0) < 6) failures.push(`terrain relief probe failed: cliffShelves=${result.terrainRelief?.cliffShelves || 0}`);
  if ((result.terrainRelief?.rockOutcrops || 0) < 12) failures.push(`terrain relief probe failed: rockOutcrops=${result.terrainRelief?.rockOutcrops || 0}`);
  if ((result.terrainRelief?.duneRidges || 0) < 6) failures.push(`terrain relief probe failed: duneRidges=${result.terrainRelief?.duneRidges || 0}`);
  if ((result.terrainRelief?.contourBands || 0) < 40) failures.push(`terrain relief probe failed: contourBands=${result.terrainRelief?.contourBands || 0}`);
  if ((result.terrainRelief?.beachRipples || 0) < 44) failures.push(`terrain relief probe failed: beachRipples=${result.terrainRelief?.beachRipples || 0}`);
  if ((result.shoreline?.edgeBands || 0) < 1) failures.push(`shoreline probe failed: edgeBands=${result.shoreline?.edgeBands || 0}`);
  if ((result.shoreline?.foamBreaks || 0) < 36) failures.push(`shoreline probe failed: foamBreaks=${result.shoreline?.foamBreaks || 0}`);
  if ((result.setPieceQuality?.secondaryGroups || 0) < 2) failures.push(`set-piece quality probe failed: secondaryGroups=${result.setPieceQuality?.secondaryGroups || 0}`);
  if ((result.setPieceQuality?.visibleSecondaryGroups || 0) !== (result.setPieceQuality?.secondaryGroups || 0)) {
    failures.push(`set-piece quality probe failed: medium visibleSecondaryGroups=${result.setPieceQuality?.visibleSecondaryGroups || 0}/${result.setPieceQuality?.secondaryGroups || 0}`);
  }
  if ((result.approachDressing?.clusters || 0) < 12) failures.push(`approach dressing probe failed: clusters=${result.approachDressing?.clusters || 0}`);
  if ((result.approachDressing?.signs || 0) < 12) failures.push(`approach dressing probe failed: signs=${result.approachDressing?.signs || 0}`);
  if ((result.approachDressing?.lamps || 0) < 12) failures.push(`approach dressing probe failed: lamps=${result.approachDressing?.lamps || 0}`);
  if ((result.approachDressing?.authoredAssets || 0) < 20) failures.push(`approach dressing probe failed: authoredAssets=${result.approachDressing?.authoredAssets || 0}`);
  if ((result.approachDressing?.roadMarks || 0) < 36) failures.push(`approach dressing probe failed: roadMarks=${result.approachDressing?.roadMarks || 0}`);
  if ((result.districtGateways?.gateways || 0) < 12) failures.push(`district gateway probe failed: gateways=${result.districtGateways?.gateways || 0}`);
  if ((result.districtGateways?.lanterns || 0) < 24) failures.push(`district gateway probe failed: lanterns=${result.districtGateways?.lanterns || 0}`);
  if ((result.districtGateways?.authoredAssets || 0) < 36) failures.push(`district gateway probe failed: authoredAssets=${result.districtGateways?.authoredAssets || 0}`);
  if ((result.districtGateways?.guideStrips || 0) < 60) failures.push(`district gateway probe failed: guideStrips=${result.districtGateways?.guideStrips || 0}`);
  if ((result.routeComposition?.splitterIslands || 0) < 8) failures.push(`route composition probe failed: splitterIslands=${result.routeComposition?.splitterIslands || 0}`);
  if ((result.routeComposition?.plazaEdgeKits || 0) < 12) failures.push(`route composition probe failed: plazaEdgeKits=${result.routeComposition?.plazaEdgeKits || 0}`);
  if ((result.routeComposition?.bollardRuns || 0) < 12) failures.push(`route composition probe failed: bollardRuns=${result.routeComposition?.bollardRuns || 0}`);
  if ((result.routeComposition?.routeStoryMarkers || 0) < 10) failures.push(`route composition probe failed: routeStoryMarkers=${result.routeComposition?.routeStoryMarkers || 0}`);
  if ((result.routeComposition?.vistaKits || 0) < 6) failures.push(`route composition probe failed: vistaKits=${result.routeComposition?.vistaKits || 0}`);
  if ((result.routeComposition?.coastalLoopStaging || 0) < 24) failures.push(`route composition probe failed: coastalLoopStaging=${result.routeComposition?.coastalLoopStaging || 0}`);
  if ((result.routeComposition?.authoredAssets || 0) < 32) failures.push(`route composition probe failed: authoredAssets=${result.routeComposition?.authoredAssets || 0}`);
  if ((result.routeComposition?.guideTiles || 0) < 40) failures.push(`route composition probe failed: guideTiles=${result.routeComposition?.guideTiles || 0}`);
  if ((result.meadowComposition?.pockets || 0) < 5) failures.push(`meadow composition probe failed: pockets=${result.meadowComposition?.pockets || 0}`);
  if ((result.meadowComposition?.patches || 0) < 10) failures.push(`meadow composition probe failed: patches=${result.meadowComposition?.patches || 0}`);
  if ((result.meadowComposition?.authoredAssets || 0) < 18) failures.push(`meadow composition probe failed: authoredAssets=${result.meadowComposition?.authoredAssets || 0}`);
  if ((result.meadowComposition?.guideTiles || 0) < 25) failures.push(`meadow composition probe failed: guideTiles=${result.meadowComposition?.guideTiles || 0}`);
  if ((result.meadowComposition?.lamps || 0) < 10) failures.push(`meadow composition probe failed: lamps=${result.meadowComposition?.lamps || 0}`);
  if ((result.meadowComposition?.stoneRuns || 0) < 20) failures.push(`meadow composition probe failed: stoneRuns=${result.meadowComposition?.stoneRuns || 0}`);
  if ((result.fieldBackdrops?.clusters || 0) < 8) failures.push(`field backdrop probe failed: clusters=${result.fieldBackdrops?.clusters || 0}`);
  if ((result.fieldBackdrops?.patches || 0) < 16) failures.push(`field backdrop probe failed: patches=${result.fieldBackdrops?.patches || 0}`);
  if ((result.fieldBackdrops?.authoredAssets || 0) < 32) failures.push(`field backdrop probe failed: authoredAssets=${result.fieldBackdrops?.authoredAssets || 0}`);
  if ((result.fieldBackdrops?.guideTiles || 0) < 48) failures.push(`field backdrop probe failed: guideTiles=${result.fieldBackdrops?.guideTiles || 0}`);
  if ((result.fieldBackdrops?.lamps || 0) < 16) failures.push(`field backdrop probe failed: lamps=${result.fieldBackdrops?.lamps || 0}`);
  if ((result.fieldBackdrops?.frameRuns || 0) < 80) failures.push(`field backdrop probe failed: frameRuns=${result.fieldBackdrops?.frameRuns || 0}`);
  if ((result.startDiorama?.burnoutScuffs || 0) < 8) failures.push(`start diorama probe failed: burnoutScuffs=${result.startDiorama?.burnoutScuffs || 0}`);
  if ((result.startDiorama?.wheelieWitnessLights || 0) < 8) failures.push(`start diorama probe failed: wheelieWitnessLights=${result.startDiorama?.wheelieWitnessLights || 0}`);
  if ((result.startDiorama?.laneRails || 0) < 4) failures.push(`start diorama probe failed: laneRails=${result.startDiorama?.laneRails || 0}`);
  if ((result.startDiorama?.launchTiles || 0) < 7) failures.push(`start diorama probe failed: launchTiles=${result.startDiorama?.launchTiles || 0}`);
  if ((result.startDiorama?.sightlineGuideMarks || 0) < 12) failures.push(`start diorama probe failed: sightlineGuideMarks=${result.startDiorama?.sightlineGuideMarks || 0}`);
  if ((result.startDiorama?.authoredAssets || 0) < 4) failures.push(`start diorama probe failed: authoredAssets=${result.startDiorama?.authoredAssets || 0}`);
  if ((result.foliage?.startSightline?.trees || 0) > 0) {
    failures.push(`start composition probe failed: sightline trees=${result.foliage?.startSightline?.trees || 0}`);
  }
  if ((result.foliage?.startSightline?.understory || 0) > 0) {
    failures.push(`start composition probe failed: sightline understory=${result.foliage?.startSightline?.understory || 0}`);
  }
  if ((result.launchField?.pockets || 0) < 3) failures.push(`launch field probe failed: pockets=${result.launchField?.pockets || 0}`);
  if ((result.launchField?.patches || 0) < 6) failures.push(`launch field probe failed: patches=${result.launchField?.patches || 0}`);
  if ((result.launchField?.authoredAssets || 0) < 12) failures.push(`launch field probe failed: authoredAssets=${result.launchField?.authoredAssets || 0}`);
  if ((result.launchField?.guideTiles || 0) < 30) failures.push(`launch field probe failed: guideTiles=${result.launchField?.guideTiles || 0}`);
  if ((result.launchField?.lamps || 0) < 6) failures.push(`launch field probe failed: lamps=${result.launchField?.lamps || 0}`);
  if ((result.launchField?.frameRuns || 0) < 24) failures.push(`launch field probe failed: frameRuns=${result.launchField?.frameRuns || 0}`);
  if ((result.innerMeadow?.pockets || 0) < 4) failures.push(`inner meadow probe failed: pockets=${result.innerMeadow?.pockets || 0}`);
  if ((result.innerMeadow?.patches || 0) < 8) failures.push(`inner meadow probe failed: patches=${result.innerMeadow?.patches || 0}`);
  if ((result.innerMeadow?.authoredAssets || 0) < 16) failures.push(`inner meadow probe failed: authoredAssets=${result.innerMeadow?.authoredAssets || 0}`);
  if ((result.innerMeadow?.guideTiles || 0) < 40) failures.push(`inner meadow probe failed: guideTiles=${result.innerMeadow?.guideTiles || 0}`);
  if ((result.innerMeadow?.lamps || 0) < 8) failures.push(`inner meadow probe failed: lamps=${result.innerMeadow?.lamps || 0}`);
  if ((result.innerMeadow?.frameRuns || 0) < 32) failures.push(`inner meadow probe failed: frameRuns=${result.innerMeadow?.frameRuns || 0}`);
  if ((result.southCorridor?.clusters || 0) < 3) failures.push(`south corridor probe failed: clusters=${result.southCorridor?.clusters || 0}`);
  if ((result.southCorridor?.patches || 0) < 6) failures.push(`south corridor probe failed: patches=${result.southCorridor?.patches || 0}`);
  if ((result.southCorridor?.authoredAssets || 0) < 12) failures.push(`south corridor probe failed: authoredAssets=${result.southCorridor?.authoredAssets || 0}`);
  if ((result.southCorridor?.guideTiles || 0) < 30) failures.push(`south corridor probe failed: guideTiles=${result.southCorridor?.guideTiles || 0}`);
  if ((result.southCorridor?.lamps || 0) < 6) failures.push(`south corridor probe failed: lamps=${result.southCorridor?.lamps || 0}`);
  if ((result.southCorridor?.railRuns || 0) < 3) failures.push(`south corridor probe failed: railRuns=${result.southCorridor?.railRuns || 0}`);
  if ((result.districtStory?.authoredAssets || 0) < 10) failures.push(`district story probe failed: authoredAssets=${result.districtStory?.authoredAssets || 0}`);
  if ((result.districtStory?.crateStacks || 0) < 6) failures.push(`district story probe failed: crateStacks=${result.districtStory?.crateStacks || 0}`);
  if ((result.districtStory?.terminalBanks || 0) < 2) failures.push(`district story probe failed: terminalBanks=${result.districtStory?.terminalBanks || 0}`);
  if ((result.districtStory?.archiveSteps || 0) < 1) failures.push(`district story probe failed: archiveSteps=${result.districtStory?.archiveSteps || 0}`);
  if ((result.districtStory?.todoStacks || 0) < 1) failures.push(`district story probe failed: todoStacks=${result.districtStory?.todoStacks || 0}`);
  if ((result.districtStory?.documentPages || 0) < 12) failures.push(`district story probe failed: documentPages=${result.districtStory?.documentPages || 0}`);
  if ((result.districtStory?.documentStreams || 0) < 1) failures.push(`district story probe failed: documentStreams=${result.districtStory?.documentStreams || 0}`);
  if ((result.districtComposition?.pads || 0) < 15) failures.push(`district composition probe failed: pads=${result.districtComposition?.pads || 0}`);
  if ((result.districtComposition?.pathMarks || 0) < 70) failures.push(`district composition probe failed: pathMarks=${result.districtComposition?.pathMarks || 0}`);
  if ((result.districtComposition?.lamps || 0) < 13) failures.push(`district composition probe failed: lamps=${result.districtComposition?.lamps || 0}`);
  if ((result.districtComposition?.planters || 0) < 3) failures.push(`district composition probe failed: planters=${result.districtComposition?.planters || 0}`);
  if ((result.districtComposition?.authoredAssets || 0) < 148) failures.push(`district composition probe failed: authoredAssets=${result.districtComposition?.authoredAssets || 0}`);
  if ((result.districtComposition?.edgeTrims || 0) < 80) failures.push(`district composition probe failed: edgeTrims=${result.districtComposition?.edgeTrims || 0}`);
  if ((result.districtComposition?.surfaceMarks || 0) < 13) failures.push(`district composition probe failed: surfaceMarks=${result.districtComposition?.surfaceMarks || 0}`);
  if ((result.districtComposition?.rails || 0) < 6) failures.push(`district composition probe failed: rails=${result.districtComposition?.rails || 0}`);
  if ((result.districtComposition?.silhouetteAnchors || 0) < 11) failures.push(`district composition probe failed: silhouetteAnchors=${result.districtComposition?.silhouetteAnchors || 0}`);
  if ((result.districtComposition?.careerConnectors || 0) < 7) failures.push(`district composition probe failed: careerConnectors=${result.districtComposition?.careerConnectors || 0}`);
  if ((result.districtComposition?.farmRows || 0) < 8) failures.push(`district composition probe failed: farmRows=${result.districtComposition?.farmRows || 0}`);
  if ((result.districtComposition?.farmFences || 0) < 12) failures.push(`district composition probe failed: farmFences=${result.districtComposition?.farmFences || 0}`);
  if ((result.potatoFarm?.authoredAssets || 0) < 5) failures.push(`potato counter probe failed: authoredAssets=${result.potatoFarm?.authoredAssets || 0}`);
  if ((result.potatoFarm?.counterPanels || 0) < 11) failures.push(`potato counter probe failed: counterPanels=${result.potatoFarm?.counterPanels || 0}`);
  if ((result.potatoFarm?.summonEffects || 0) < 7) failures.push(`potato counter probe failed: summonEffects=${result.potatoFarm?.summonEffects || 0}`);
  if ((result.districtComposition?.skillsTerminalNodes || 0) < 17) failures.push(`district composition probe failed: skillsTerminalNodes=${result.districtComposition?.skillsTerminalNodes || 0}`);
  if ((result.districtComposition?.awardsArchiveNodes || 0) < 22) failures.push(`district composition probe failed: awardsArchiveNodes=${result.districtComposition?.awardsArchiveNodes || 0}`);
  if ((result.districtComposition?.dataPierNodes || 0) < 34) failures.push(`district composition probe failed: dataPierNodes=${result.districtComposition?.dataPierNodes || 0}`);
  if ((result.districtComposition?.careerOfficeNodes || 0) < 24) failures.push(`district composition probe failed: careerOfficeNodes=${result.districtComposition?.careerOfficeNodes || 0}`);
  if ((result.districtComposition?.todoYardNodes || 0) < 35) failures.push(`district composition probe failed: todoYardNodes=${result.districtComposition?.todoYardNodes || 0}`);
  if ((result.surfacePanels?.hardscapePanels || 0) < 20) failures.push(`surface panel probe failed: hardscapePanels=${result.surfacePanels?.hardscapePanels || 0}`);
  if ((result.surfacePanels?.chippedPanels || 0) !== (result.surfacePanels?.hardscapePanels || 0)) {
    failures.push(`surface panel probe failed: chippedPanels=${result.surfacePanels?.chippedPanels || 0}/${result.surfacePanels?.hardscapePanels || 0}`);
  }
  if ((result.surfacePanels?.seamStrips || 0) < 96) failures.push(`surface panel probe failed: seamStrips=${result.surfacePanels?.seamStrips || 0}`);
  if ((result.circuitStart?.pads || 0) < 2) failures.push(`circuit start probe failed: pads=${result.circuitStart?.pads || 0}`);
  if ((result.circuitStart?.gridMarks || 0) < 18) failures.push(`circuit start probe failed: gridMarks=${result.circuitStart?.gridMarks || 0}`);
  if ((result.circuitStart?.authoredAssets || 0) < 10) failures.push(`circuit start probe failed: authoredAssets=${result.circuitStart?.authoredAssets || 0}`);
  if ((result.circuitStart?.checkpointGates || 0) < 1) failures.push(`circuit start probe failed: checkpointGates=${result.circuitStart?.checkpointGates || 0}`);
  if ((result.circuitStart?.scoreTowers || 0) < 2) failures.push(`circuit start probe failed: scoreTowers=${result.circuitStart?.scoreTowers || 0}`);
  if ((result.circuitStart?.arrowFences || 0) < 2) failures.push(`circuit start probe failed: arrowFences=${result.circuitStart?.arrowFences || 0}`);
  if ((result.circuitStart?.laneLights || 0) < 6) failures.push(`circuit start probe failed: laneLights=${result.circuitStart?.laneLights || 0}`);
  if ((result.harbor?.pads || 0) < 2) failures.push(`harbor probe failed: pads=${result.harbor?.pads || 0}`);
  if ((result.harbor?.maxPadArea || 999) > 320) failures.push(`harbor pad scale probe failed: maxPadArea=${result.harbor?.maxPadArea}`);
  if ((result.harbor?.pathMarks || 0) < 16) failures.push(`harbor probe failed: pathMarks=${result.harbor?.pathMarks || 0}`);
  if ((result.harbor?.authoredAssets || 0) < 12) failures.push(`harbor probe failed: authoredAssets=${result.harbor?.authoredAssets || 0}`);
  if ((result.harbor?.piers || 0) < 3) failures.push(`harbor probe failed: piers=${result.harbor?.piers || 0}`);
  if ((result.harbor?.cargoStacks || 0) < 3) failures.push(`harbor probe failed: cargoStacks=${result.harbor?.cargoStacks || 0}`);
  if ((result.harbor?.shadeStructures || 0) < 1) failures.push(`harbor probe failed: shadeStructures=${result.harbor?.shadeStructures || 0}`);
  if ((result.harbor?.lamps || 0) < 4) failures.push(`harbor probe failed: lamps=${result.harbor?.lamps || 0}`);
  if ((result.harbor?.beacons || 0) < 3) failures.push(`harbor probe failed: beacons=${result.harbor?.beacons || 0}`);
  if ((result.harbor?.signalBeams || 0) < 3) failures.push(`harbor probe failed: signalBeams=${result.harbor?.signalBeams || 0}`);
  if ((result.harbor?.signalRings || 0) < 1) failures.push(`harbor probe failed: signalRings=${result.harbor?.signalRings || 0}`);
  if ((result.dataPier?.pads || 0) < 3) failures.push(`data pier probe failed: pads=${result.dataPier?.pads || 0}`);
  if ((result.dataPier?.pathMarks || 0) < 8) failures.push(`data pier probe failed: pathMarks=${result.dataPier?.pathMarks || 0}`);
  if ((result.dataPier?.authoredAssets || 0) < 12) failures.push(`data pier probe failed: authoredAssets=${result.dataPier?.authoredAssets || 0}`);
  if ((result.dataPier?.piers || 0) < 2) failures.push(`data pier probe failed: piers=${result.dataPier?.piers || 0}`);
  if ((result.dataPier?.cargoStacks || 0) < 2) failures.push(`data pier probe failed: cargoStacks=${result.dataPier?.cargoStacks || 0}`);
  if ((result.dataPier?.lamps || 0) < 4) failures.push(`data pier probe failed: lamps=${result.dataPier?.lamps || 0}`);
  if ((result.dataPier?.beacons || 0) < 3) failures.push(`data pier probe failed: beacons=${result.dataPier?.beacons || 0}`);
  if ((result.dataPier?.deckRails || 0) < 12) failures.push(`data pier probe failed: deckRails=${result.dataPier?.deckRails || 0}`);
  if ((result.careerOffice?.pads || 0) < 2) failures.push(`career office probe failed: pads=${result.careerOffice?.pads || 0}`);
  if ((result.careerOffice?.pathMarks || 0) < 8) failures.push(`career office probe failed: pathMarks=${result.careerOffice?.pathMarks || 0}`);
  if ((result.careerOffice?.authoredAssets || 0) < 5) failures.push(`career office probe failed: authoredAssets=${result.careerOffice?.authoredAssets || 0}`);
  if ((result.careerOffice?.lamps || 0) < 3) failures.push(`career office probe failed: lamps=${result.careerOffice?.lamps || 0}`);
  if ((result.careerOffice?.facadePanels || 0) < 6) failures.push(`career office probe failed: facadePanels=${result.careerOffice?.facadePanels || 0}`);
  if ((result.careerOffice?.signalFrames || 0) < 3) failures.push(`career office probe failed: signalFrames=${result.careerOffice?.signalFrames || 0}`);
  if ((result.todoYard?.pads || 0) < 2) failures.push(`todo yard probe failed: pads=${result.todoYard?.pads || 0}`);
  if ((result.todoYard?.pathMarks || 0) < 8) failures.push(`todo yard probe failed: pathMarks=${result.todoYard?.pathMarks || 0}`);
  if ((result.todoYard?.authoredAssets || 0) < 4) failures.push(`todo yard probe failed: authoredAssets=${result.todoYard?.authoredAssets || 0}`);
  if ((result.todoYard?.lamps || 0) < 3) failures.push(`todo yard probe failed: lamps=${result.todoYard?.lamps || 0}`);
  if ((result.todoYard?.queueRails || 0) < 12) failures.push(`todo yard probe failed: queueRails=${result.todoYard?.queueRails || 0}`);
  if ((result.todoYard?.taskCards || 0) < 6) failures.push(`todo yard probe failed: taskCards=${result.todoYard?.taskCards || 0}`);
  if ((result.todoYard?.queuePips || 0) < 12) failures.push(`todo yard probe failed: queuePips=${result.todoYard?.queuePips || 0}`);
  if ((result.todoYard?.floatingTasks || 0) < 8) failures.push(`todo yard probe failed: floatingTasks=${result.todoYard?.floatingTasks || 0}`);
  if ((result.todoYard?.reviewRings || 0) < 1) failures.push(`todo yard probe failed: reviewRings=${result.todoYard?.reviewRings || 0}`);
  if ((result.skillsTerminal?.signalNodes || 0) < 12) failures.push(`skills terminal probe failed: signalNodes=${result.skillsTerminal?.signalNodes || 0}`);
  if ((result.skillsTerminal?.codeCards || 0) < 8) failures.push(`skills terminal probe failed: codeCards=${result.skillsTerminal?.codeCards || 0}`);
  if ((result.skillsTerminal?.syncRings || 0) < 1) failures.push(`skills terminal probe failed: syncRings=${result.skillsTerminal?.syncRings || 0}`);
  if ((result.skillsTerminal?.signalRibbons || 0) < 4) failures.push(`skills terminal probe failed: signalRibbons=${result.skillsTerminal?.signalRibbons || 0}`);
  if ((result.projectsYard?.forgeSparks || 0) < 18) failures.push(`projects yard probe failed: forgeSparks=${result.projectsYard?.forgeSparks || 0}`);
  if ((result.projectsYard?.buildCards || 0) < 7) failures.push(`projects yard probe failed: buildCards=${result.projectsYard?.buildCards || 0}`);
  if ((result.projectsYard?.assemblyRings || 0) < 1) failures.push(`projects yard probe failed: assemblyRings=${result.projectsYard?.assemblyRings || 0}`);
  if ((result.behindBuild?.processPackets || 0) < 10) failures.push(`behind build probe failed: processPackets=${result.behindBuild?.processPackets || 0}`);
  if ((result.behindBuild?.hologramPanels || 0) < 6) failures.push(`behind build probe failed: hologramPanels=${result.behindBuild?.hologramPanels || 0}`);
  if ((result.behindBuild?.prototypeRings || 0) < 1) failures.push(`behind build probe failed: prototypeRings=${result.behindBuild?.prototypeRings || 0}`);
  if ((result.props?.roadLanterns || 0) < 8) failures.push(`props probe failed: roadLanterns=${result.props?.roadLanterns || 0}`);
  if ((result.props?.authoredLanterns || 0) !== (result.props?.roadLanterns || 0)) failures.push(`props probe failed: authoredLanterns=${result.props?.authoredLanterns || 0}/${result.props?.roadLanterns || 0}`);
  if ((result.props?.fallbackLanterns || 0) !== 0) failures.push(`props probe failed: fallbackLanterns=${result.props?.fallbackLanterns || 0}`);
  if ((result.props?.authoredProps || 0) < 12) failures.push(`props probe failed: authoredProps=${result.props?.authoredProps || 0}`);
  if ((result.props?.fallbackProps || 0) !== 0) failures.push(`props probe failed: fallbackProps=${result.props?.fallbackProps || 0}`);
  if ((result.props?.shoreRocks || 0) < 16) failures.push(`props probe failed: shoreRocks=${result.props?.shoreRocks || 0}`);
  if ((result.props?.authoredShoreRocks || 0) !== (result.props?.shoreRocks || 0)) failures.push(`props probe failed: authoredShoreRocks=${result.props?.authoredShoreRocks || 0}/${result.props?.shoreRocks || 0}`);
  if ((result.props?.fallbackShoreRocks || 0) !== 0) failures.push(`props probe failed: fallbackShoreRocks=${result.props?.fallbackShoreRocks || 0}`);
  if ((result.props?.beachGrass || 0) < 5) failures.push(`props probe failed: beachGrass=${result.props?.beachGrass || 0}`);
  if ((result.props?.authoredBeachGrass || 0) !== (result.props?.beachGrass || 0)) failures.push(`props probe failed: authoredBeachGrass=${result.props?.authoredBeachGrass || 0}/${result.props?.beachGrass || 0}`);
  if ((result.props?.fallbackBeachGrass || 0) !== 0) failures.push(`props probe failed: fallbackBeachGrass=${result.props?.fallbackBeachGrass || 0}`);
  if ((result.stuntPark?.ramps || 0) < 3) failures.push(`stunt park probe failed: ramps=${result.stuntPark?.ramps || 0}`);
  if ((result.stuntPark?.boostPads || 0) < 3) failures.push(`stunt park probe failed: boostPads=${result.stuntPark?.boostPads || 0}`);
  if ((result.stuntPark?.cones || 0) < 12) failures.push(`stunt park probe failed: cones=${result.stuntPark?.cones || 0}`);
  if ((result.stuntPark?.tireStacks || 0) < 5) failures.push(`stunt park probe failed: tireStacks=${result.stuntPark?.tireStacks || 0}`);
  if ((result.stuntPark?.landingMarkers || 0) < 6) failures.push(`stunt park probe failed: landingMarkers=${result.stuntPark?.landingMarkers || 0}`);
  if ((result.stuntPark?.authoredAssets || 0) < 7) failures.push(`stunt park probe failed: authoredAssets=${result.stuntPark?.authoredAssets || 0}`);
  if ((result.stuntPark?.infieldIslands || 0) < 4) failures.push(`stunt park probe failed: infieldIslands=${result.stuntPark?.infieldIslands || 0}`);
  if ((result.stuntPark?.runoffShoulders || 0) < 4) failures.push(`stunt park probe failed: runoffShoulders=${result.stuntPark?.runoffShoulders || 0}`);
  if ((result.stuntPark?.laneChevrons || 0) < 18) failures.push(`stunt park probe failed: laneChevrons=${result.stuntPark?.laneChevrons || 0}`);
  if ((result.stuntPark?.trackScuffs || 0) < 30) failures.push(`stunt park probe failed: trackScuffs=${result.stuntPark?.trackScuffs || 0}`);
  if ((result.stuntPark?.circuitTrackSegments || 0) !== circuitCheckpoints.length - 1) failures.push(`stunt park probe failed: circuitTrackSegments=${result.stuntPark?.circuitTrackSegments || 0}`);
  if ((result.stuntPark?.circuitTrackCurbs || 0) < (circuitCheckpoints.length - 1) * 2) failures.push(`stunt park probe failed: circuitTrackCurbs=${result.stuntPark?.circuitTrackCurbs || 0}`);
  if ((result.stuntPark?.circuitApexMarkers || 0) < circuitCheckpoints.length - 2) failures.push(`stunt park probe failed: circuitApexMarkers=${result.stuntPark?.circuitApexMarkers || 0}`);
  if ((result.stuntPark?.gates || 0) < 2) failures.push(`stunt park probe failed: gates=${result.stuntPark?.gates || 0}`);
  if ((result.stuntPark?.circuitCheckpointGates || 0) < circuitCheckpoints.length - 2) failures.push(`stunt park probe failed: circuitCheckpointGates=${result.stuntPark?.circuitCheckpointGates || 0}`);
  if ((result.stuntPark?.circuitTargetRings || 0) !== circuitCheckpoints.length - 1) failures.push(`stunt park probe failed: circuitTargetRings=${result.stuntPark?.circuitTargetRings || 0}`);
  if ((result.stuntPark?.circuitTargetArrows || 0) !== circuitCheckpoints.length - 1) failures.push(`stunt park probe failed: circuitTargetArrows=${result.stuntPark?.circuitTargetArrows || 0}`);
  if ((result.stuntPark?.circuitMotionSamples || 0) < circuitCheckpoints.length - 1) failures.push(`stunt park probe failed: circuitMotionSamples=${result.stuntPark?.circuitMotionSamples || 0}`);
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
  if ((result.zoneLandmarks?.protected || 0) !== 1) failures.push(`zone landmark probe failed: protected=${result.zoneLandmarks?.protected || 0}`);
  if ((result.zoneLandmarks?.composedExternally || 0) < worldZones.length - 1) {
    failures.push(`zone landmark probe failed: composedExternally=${result.zoneLandmarks?.composedExternally || 0}`);
  }
  if ((result.zoneLandmarks?.fallback || 0) !== 0) failures.push(`zone landmark probe failed: fallback=${result.zoneLandmarks?.fallback || 0}`);
  const missingAuthored = (result.authoredDistrictAssets || []).filter((asset) => !asset.template || !asset.placed);
  if (missingAuthored.length) failures.push(`authored district assets missing: ${missingAuthored.map((asset) => asset.name).join(', ')}`);
  const missingStunt = (result.authoredStuntAssets || []).filter((asset) => !asset.template || !asset.placed);
  if (missingStunt.length) failures.push(`authored stunt assets missing: ${missingStunt.map((asset) => asset.name).join(', ')}`);
  if (!result.mobile.ready || result.mobile.canvasSample <= 0) failures.push('mobile canvas did not render');
  if (result.mobile.freshRenderSample !== true) failures.push('mobile fresh render sample missing');
  if (result.mobile.quality !== 'low') failures.push(`mobile quality tier mismatch: ${result.mobile.quality}`);
  if (result.mobile.savedQuality !== null) failures.push(`mobile default quality should not write saved preference: ${result.mobile.savedQuality}`);
  if (result.mobile.postprocessing || result.mobile.composerAllocated || result.mobile.bloomAllocated) {
    failures.push('mobile renderer probe failed: post stack allocated while low quality is active');
  }
  if (result.mobile.triangles > 180000) failures.push(`mobile triangle budget exceeded: ${result.mobile.triangles}`);
  if ((result.mobile.uiFrame?.topOccupied || Infinity) > 66) {
    failures.push(`mobile HUD frame too tall: topOccupied=${result.mobile.uiFrame?.topOccupied || 0}`);
  }
  if ((result.mobile.uiFrame?.hudHeight || Infinity) > 36) {
    failures.push(`mobile HUD frame too tall: hudHeight=${result.mobile.uiFrame?.hudHeight || 0}`);
  }
  if ((result.mobile.uiFrame?.debugHeight || Infinity) > 24) {
    failures.push(`mobile debug frame too tall: debugHeight=${result.mobile.uiFrame?.debugHeight || 0}`);
  }
  if ((result.mobile.uiFrame?.minimapWidth || Infinity) > 112) {
    failures.push(`mobile minimap frame too wide: minimapWidth=${result.mobile.uiFrame?.minimapWidth || 0}`);
  }
  if ((result.mobile.setPieceQuality?.secondaryGroups || 0) < 2) failures.push(`mobile set-piece quality probe failed: secondaryGroups=${result.mobile.setPieceQuality?.secondaryGroups || 0}`);
  if ((result.mobile.setPieceQuality?.visibleSecondaryGroups || 0) !== 0) {
    failures.push(`mobile set-piece quality probe failed: visibleSecondaryGroups=${result.mobile.setPieceQuality?.visibleSecondaryGroups || 0}`);
  }
  if ((result.mobile.fieldMotifs?.visibleTotal || 0) !== 0) {
    failures.push(`mobile field motif quality probe failed: visibleTotal=${result.mobile.fieldMotifs?.visibleTotal || 0}`);
  }
  if ((result.mobile.roadsideFrames?.visibleTotal || 0) !== 0) {
    failures.push(`mobile roadside frame quality probe failed: visibleTotal=${result.mobile.roadsideFrames?.visibleTotal || 0}`);
  }
  if ((result.mobile.broadSetPieceVisibility?.groups?.fieldBackdrops?.visibleBatches || 0) !== 0) {
    failures.push(`mobile field backdrop quality probe failed: visibleBatches=${result.mobile.broadSetPieceVisibility?.groups?.fieldBackdrops?.visibleBatches || 0}`);
  }
  if ((result.mobile.broadSetPieceVisibility?.groups?.launchField?.visibleBatches || 0) !== 0) {
    failures.push(`mobile launch field quality probe failed: visibleBatches=${result.mobile.broadSetPieceVisibility?.groups?.launchField?.visibleBatches || 0}`);
  }
  if ((result.mobile.broadSetPieceVisibility?.groups?.innerMeadow?.visibleBatches || 0) !== 0) {
    failures.push(`mobile inner meadow quality probe failed: visibleBatches=${result.mobile.broadSetPieceVisibility?.groups?.innerMeadow?.visibleBatches || 0}`);
  }
  if (!Array.isArray(result.mobile.renderProfile) || result.mobile.renderProfile.length < 5) {
    failures.push('mobile render profile missing');
  }
  if (!Array.isArray(result.mobile.frustumRenderProfile) || result.mobile.frustumRenderProfile.length < 5) {
    failures.push('mobile frustum render profile missing');
  }
  if (!Array.isArray(result.mobile.roadFrustumProfile) || result.mobile.roadFrustumProfile.length < 3) {
    failures.push('mobile road frustum profile missing');
  }
  if (!Array.isArray(result.mobile.vehicleFrustumProfile) || result.mobile.vehicleFrustumProfile.length < 3) {
    failures.push('mobile vehicle frustum profile missing');
  }
  if (result.mobile.stuntPark?.yardDressingVisible !== false) {
    failures.push(`mobile stunt yard cull probe failed: yardDressingVisible=${result.mobile.stuntPark?.yardDressingVisible}`);
  }
  if (result.mobile.renderProfile?.some((bucket) => bucket.name === 'STUNT_Yard_Dressing')) {
    failures.push('mobile stunt yard cull probe failed: STUNT_Yard_Dressing remained in render profile');
  }
  if (result.mobile.potatoFarm?.visible !== false) {
    failures.push(`mobile potato farm cull probe failed: visible=${result.mobile.potatoFarm?.visible}`);
  }
  if (result.mobile.renderProfile?.some((bucket) => bucket.name === 'ZONE_potato_counter_pocket')) {
    failures.push('mobile potato farm cull probe failed: ZONE_potato_counter_pocket remained in render profile');
  }
  if ((result.mobile.waterStats?.visibleShoreFlecks || 0) > 24) {
    failures.push(`mobile water quality probe failed: visibleShoreFlecks=${result.mobile.waterStats?.visibleShoreFlecks || 0}`);
  }
  if ((result.mobile.waterStats?.visibleShorelineLifeKits || 0) !== 0) {
    failures.push(`mobile water quality probe failed: visibleShorelineLifeKits=${result.mobile.waterStats?.visibleShorelineLifeKits || 0}`);
  }
  if ((result.mobile.waterStats?.visibleTideGlimmers || 0) !== 0) {
    failures.push(`mobile water quality probe failed: visibleTideGlimmers=${result.mobile.waterStats?.visibleTideGlimmers || 0}`);
  }
  if ((result.mobile.waterStats?.visibleSurfaceGlints || 0) !== 0) {
    failures.push(`mobile water quality probe failed: visibleSurfaceGlints=${result.mobile.waterStats?.visibleSurfaceGlints || 0}`);
  }
  if ((result.mobile.roadSurfaceDetails?.visibleDetailMeshes || 0) !== 0) {
    failures.push(`mobile road detail quality probe failed: visibleDetailMeshes=${result.mobile.roadSurfaceDetails?.visibleDetailMeshes || 0}`);
  }
  if ((result.mobile.roadSurfaceDetails?.hiddenLowTierRoadBatches || 0) < 12) {
    failures.push(`mobile road layer quality probe failed: hiddenLowTierRoadBatches=${result.mobile.roadSurfaceDetails?.hiddenLowTierRoadBatches || 0}`);
  }
  if ((result.mobile.roadSurfaceDetails?.visibleLowTierRoadBatches || 0) !== 0) {
    failures.push(`mobile road layer quality probe failed: visibleLowTierRoadBatches=${result.mobile.roadSurfaceDetails?.visibleLowTierRoadBatches || 0}`);
  }
  if ((result.mobile.roadSurfaceDetails?.visibleReflectorStuds || 0) !== 0) {
    failures.push(`mobile road marker quality probe failed: visibleReflectorStuds=${result.mobile.roadSurfaceDetails?.visibleReflectorStuds || 0}`);
  }
  if ((result.mobile.foliage?.visibleTreeShadows || 0) !== 0) {
    failures.push(`mobile foliage quality probe failed: visibleTreeShadows=${result.mobile.foliage?.visibleTreeShadows || 0}`);
  }
  if (result.mobile.calls > 205) failures.push(`mobile draw-call budget exceeded: ${result.mobile.calls}`);
  if ((result.mobile.lighting?.sun?.position?.[1] || 0) < 30 || (result.mobile.lighting?.sun?.position?.[1] || 0) > 45) {
    failures.push(`mobile lighting probe failed: sun height=${result.mobile.lighting?.sun?.position?.[1]}`);
  }
  if ((result.mobile.atmosphere?.visibleClouds || 0) > 5) failures.push(`mobile atmosphere probe failed: visibleClouds=${result.mobile.atmosphere?.visibleClouds || 0}`);
  if ((result.mobile.atmosphere?.visibleSunGlows || 0) > 1) failures.push(`mobile atmosphere probe failed: visibleSunGlows=${result.mobile.atmosphere?.visibleSunGlows || 0}`);
  if ((result.mobile.atmosphere?.visibleHorizonRibbons || 0) > 1) failures.push(`mobile atmosphere probe failed: visibleHorizonRibbons=${result.mobile.atmosphere?.visibleHorizonRibbons || 0}`);
  if ((result.mobile.atmosphere?.visibleCloudBanks || 0) > 4) failures.push(`mobile atmosphere probe failed: visibleCloudBanks=${result.mobile.atmosphere?.visibleCloudBanks || 0}`);
  if ((result.mobile.atmosphere?.visibleSkyWisps || 0) > 4) failures.push(`mobile atmosphere probe failed: visibleSkyWisps=${result.mobile.atmosphere?.visibleSkyWisps || 0}`);
  if ((result.mobile.atmosphere?.visibleDistantIslets || 0) > 8) failures.push(`mobile atmosphere probe failed: visibleDistantIslets=${result.mobile.atmosphere?.visibleDistantIslets || 0}`);
  if ((result.mobile.lifeStats?.visibleTotal || 0) >= (result.worldLife?.quality?.medium?.visibleTotal || Infinity)) {
    failures.push('mobile quality probe failed: visible life signals were not reduced');
  }
  if (!result.mobileSavedPreference.ready || result.mobileSavedPreference.canvasSample <= 0) failures.push('mobile saved-preference canvas did not render');
  if (result.mobileSavedPreference.quality !== 'low') {
    failures.push(`mobile saved-preference quality mismatch: ${result.mobileSavedPreference.quality}`);
  }
  if (result.mobileSavedPreference.savedQuality !== 'high') {
    failures.push(`mobile saved-preference storage mismatch: ${result.mobileSavedPreference.savedQuality}`);
  }
  if (result.mobileSavedPreference.postprocessing || result.mobileSavedPreference.composerAllocated || result.mobileSavedPreference.bloomAllocated) {
    failures.push('mobile saved-preference renderer probe failed: post stack allocated while normalized to low quality');
  }
  if ((result.mobileSavedPreference.calls || 0) > 205) {
    failures.push(`mobile saved-preference draw-call budget exceeded: ${result.mobileSavedPreference.calls}`);
  }
  if ((result.mobileSavedPreference.maxPixelRatio || 0) > 1.2) {
    failures.push(`mobile saved-preference pixel ratio too high: ${result.mobileSavedPreference.maxPixelRatio}`);
  }
  if (failures.length) {
    throw new Error(`Play verification failed: ${failures.join('; ')}`);
  }
}

function assertGate2RFoundationReplacementVerification(result, failures) {
  const blockout = result.blockout || {};
  const blockoutSetPieces = blockout.setPieces || {};
  if (result.goalGate !== 'gate-2r-foundation-replacement') {
    failures.push(`Gate 2R probe failed: goalGate=${result.goalGate || 'none'}`);
  }
  if (!blockout.enabled) failures.push('Gate 2R probe failed: foundation blockout mode inactive');
  if (blockout.densePropsBuilt) failures.push('Gate 2R probe failed: dense prop system was built');
  if (blockout.denseFoliageBuilt) failures.push('Gate 2R probe failed: dense foliage system was built');
  if (blockout.potatoPocketBuilt) failures.push('Gate 2R probe failed: final potato pocket was built');
  if ((blockoutSetPieces.zonePads || 0) !== 0) {
    failures.push(`Gate 2R scaffold failed: rejected zone pads still built=${blockoutSetPieces.zonePads || 0}`);
  }
  if ((blockoutSetPieces.zoneMarkers || 0) !== 0) {
    failures.push(`Gate 2R scaffold failed: rejected zone markers still built=${blockoutSetPieces.zoneMarkers || 0}`);
  }
  if ((blockoutSetPieces.zoneLabels || 0) !== 0) {
    failures.push(`Gate 2R scaffold failed: rejected zone labels still built=${blockoutSetPieces.zoneLabels || 0}`);
  }
  if ((blockoutSetPieces.foundationAnchors || 0) !== 0) {
    failures.push(`Gate 2R scaffold failed: foundation anchors still built=${blockoutSetPieces.foundationAnchors || 0}`);
  }
  if ((blockoutSetPieces.foundationLabels || 0) !== 0) {
    failures.push(`Gate 2R scaffold failed: foundationLabels still built=${blockoutSetPieces.foundationLabels || 0}`);
  }
  if ((blockoutSetPieces.securityGate || 0) < 1) failures.push('Gate 2R security foundation failed: scanner gate missing');
  if ((blockoutSetPieces.securityPacketShards || 0) !== 0) {
    failures.push(`Gate 2R security foundation failed: packet shards still built=${blockoutSetPieces.securityPacketShards || 0}`);
  }
  if ((blockoutSetPieces.securityScanWaves || 0) !== 0) {
    failures.push(`Gate 2R security foundation failed: scan waves still built=${blockoutSetPieces.securityScanWaves || 0}`);
  }
  if ((result.districtGround?.pads || 0) !== 0) {
    failures.push(`Gate 2R terrain failed: rejected district pads still built=${result.districtGround?.pads || 0}`);
  }
  if ((result.districtGround?.edgeTrims || 0) !== 0) {
    failures.push(`Gate 2R terrain failed: rejected district edge trims still built=${result.districtGround?.edgeTrims || 0}`);
  }
  if ((result.surfaceDetails?.districts || 0) !== 0) failures.push(`Gate 2R terrain failed: final surface details built=${result.surfaceDetails?.districts || 0}`);
  if ((result.meadowDetails?.patches || 0) !== 0) failures.push(`Gate 2R terrain failed: meadow detail patches built=${result.meadowDetails?.patches || 0}`);
  if ((result.fieldMotifs?.clusters || 0) !== 0) failures.push(`Gate 2R terrain failed: field motif clusters built=${result.fieldMotifs?.clusters || 0}`);
  if ((result.roadSurfaceDetails?.wearStrips || 0) !== 0) failures.push(`Gate 2R roads failed: wear strips built=${result.roadSurfaceDetails?.wearStrips || 0}`);
  if ((result.roadSurfaceDetails?.laneSeams || 0) !== 0) failures.push(`Gate 2R roads failed: lane seams built=${result.roadSurfaceDetails?.laneSeams || 0}`);
  if ((result.roadSurfaceDetails?.transitionAprons || 0) !== 0) failures.push(`Gate 2R roads failed: transition aprons built=${result.roadSurfaceDetails?.transitionAprons || 0}`);
  if ((result.roadSurfaceDetails?.transitionGuideBars || 0) !== 0) failures.push(`Gate 2R roads failed: transition guide bars built=${result.roadSurfaceDetails?.transitionGuideBars || 0}`);
  if ((result.roadJunctions?.blendPatches || 0) !== 0) failures.push(`Gate 2R roads failed: visible junction slabs=${result.roadJunctions?.blendPatches || 0}`);
  if ((result.roadJunctions?.foundationFusedLayers || 0) !== 0) failures.push(`Gate 2R roads failed: fused foundation texture layers=${result.roadJunctions?.foundationFusedLayers || 0}`);
  if ((result.roadJunctions?.foundationGeometryLayers || 0) !== (result.roadTopology?.paths || 0)) failures.push(`Gate 2R roads failed: geometry road layers=${result.roadJunctions?.foundationGeometryLayers || 0}/${result.roadTopology?.paths || 0}`);
  if ((result.roadJunctions?.foundationTexturePixelsPerUnit || 0) !== 0) failures.push(`Gate 2R roads failed: foundation texture pixels/unit=${result.roadJunctions?.foundationTexturePixelsPerUnit || 0}`);
  if ((result.roadJunctions?.foundationRoadHeightAboveCollider || 99) > 0.03) failures.push(`Gate 2R roads failed: road visual height above collider=${result.roadJunctions?.foundationRoadHeightAboveCollider}`);
  if (!Number.isFinite(result.vehicleGrounding?.contactShadowLiftAboveRoad) || Math.abs(result.vehicleGrounding.contactShadowLiftAboveRoad) > 0.045) {
    failures.push(`Gate 2R vehicle grounding failed: contact shadow lift=${result.vehicleGrounding?.contactShadowLiftAboveRoad}`);
  }
  if ((result.vehicleFx?.lights?.visibleHeadlightPools || 0) !== 0) {
    failures.push(`Gate 2R vehicle grounding failed: idle headlight pools visible=${result.vehicleFx?.lights?.visibleHeadlightPools || 0}`);
  }
  if (!Number.isFinite(result.vehicleGrounding?.bodyVisualLift) || result.vehicleGrounding.bodyVisualLift < 0.05 || result.vehicleGrounding.bodyVisualLift > 0.12) {
    failures.push(`Gate 2R vehicle grounding failed: body visual lift=${result.vehicleGrounding?.bodyVisualLift}`);
  }
  if ((result.roadJunctions?.foundationFullWidthPaths || 0) !== (result.roadTopology?.paths || 0)) failures.push(`Gate 2R roads failed: full-width paths=${result.roadJunctions?.foundationFullWidthPaths || 0}/${result.roadTopology?.paths || 0}`);
  if ((result.roadJunctions?.foundationRoadPolishMarks || 0) < ((result.roadTopology?.paths || 0) * 2)) failures.push(`Gate 2R roads failed: polish marks=${result.roadJunctions?.foundationRoadPolishMarks || 0}`);
  if ((result.roadJunctions?.foundationThroughRoadPriority || 0) < 2) failures.push(`Gate 2R roads failed: through-road priority=${result.roadJunctions?.foundationThroughRoadPriority || 0}`);
  if ((result.roadJunctions?.foundationTrimmedEndpoints || 0) !== 0) failures.push(`Gate 2R roads failed: trimmed endpoints=${result.roadJunctions?.foundationTrimmedEndpoints || 0}`);
  if ((result.roadJunctions?.foundationTaperedEndpoints || 0) !== 0) failures.push(`Gate 2R roads failed: tapered endpoints=${result.roadJunctions?.foundationTaperedEndpoints || 0}`);
  if ((result.roadGuidance?.chevrons || 0) !== 0) failures.push(`Gate 2R roads failed: final chevrons built=${result.roadGuidance?.chevrons || 0}`);
  if ((result.roadGuidance?.reflectorStuds || 0) !== 0) failures.push(`Gate 2R roads failed: reflector studs built=${result.roadGuidance?.reflectorStuds || 0}`);
  if (!result.roadTopology?.coastalLoop) failures.push('Gate 2R road topology failed: coastal loop missing');
  if ((result.roadTopology?.closedLoops || 0) < 1) failures.push(`Gate 2R road topology failed: closedLoops=${result.roadTopology?.closedLoops || 0}`);
  if ((result.roadTopology?.paths || 0) !== roadPaths.length) failures.push(`Gate 2R road topology failed: paths=${result.roadTopology?.paths || 0}/${roadPaths.length}`);
  if ((result.roadTopology?.nonJunctionCrossings || 0) !== 0) failures.push(`Gate 2R road topology failed: nonJunctionCrossings=${result.roadTopology?.nonJunctionCrossings || 0}`);
  if ((result.roadTopology?.paths || 0) > 6) failures.push(`Gate 2R road topology failed: too many route families=${result.roadTopology?.paths || 0}`);
  if ((result.roadTopology?.sharedJunctions || 0) < 4) failures.push(`Gate 2R road topology failed: sharedJunctions=${result.roadTopology?.sharedJunctions || 0}`);
  if ((result.roadTopology?.sharedJunctions || 0) > 8) failures.push(`Gate 2R road topology failed: too many shared junctions=${result.roadTopology?.sharedJunctions || 0}`);
  if ((result.roadTopology?.maxRoadWidth || 99) > 5.2) failures.push(`Gate 2R road width failed: maxRoadWidth=${result.roadTopology?.maxRoadWidth}`);
  if ((result.surfacePanels?.hardscapePanels || 0) !== 0) failures.push(`Gate 2R scaffold failed: hardscape panels still built=${result.surfacePanels?.hardscapePanels || 0}`);
  if ((result.stuntPark?.ramps || 0) !== 0) failures.push(`Gate 2R stunt failed: rejected ramps still built=${result.stuntPark?.ramps || 0}`);
  if ((result.stuntPark?.boostPads || 0) !== 0) failures.push(`Gate 2R stunt failed: rejected boost pads still built=${result.stuntPark?.boostPads || 0}`);
  if ((result.stuntPark?.landingMarkers || 0) !== 0) failures.push(`Gate 2R stunt failed: rejected landing markers still built=${result.stuntPark?.landingMarkers || 0}`);
  if ((result.stuntPark?.circuitTargetRings || 0) !== 0) failures.push(`Gate 2R stunt failed: circuit target rings still built=${result.stuntPark?.circuitTargetRings || 0}`);
  if ((result.stuntPark?.circuitTargetArrows || 0) !== 0) failures.push(`Gate 2R stunt failed: circuit target arrows still built=${result.stuntPark?.circuitTargetArrows || 0}`);
  if ((result.collectibles?.total || 0) !== 0) failures.push(`Gate 2R collectibles failed: data shards still built=${result.collectibles?.total || 0}`);
  if ((result.collectibles?.stats?.visibleShards || 0) !== 0) failures.push(`Gate 2R collectibles failed: visible shards=${result.collectibles?.stats?.visibleShards || 0}`);
  if ((result.securityScan?.active?.stats?.packetShards || 0) !== 0) {
    failures.push(`Gate 2R security scan failed: visible packet system still built=${result.securityScan?.active?.stats?.packetShards || 0}`);
  }
  if ((result.securityScan?.active?.stats?.scanWaves || 0) !== 0) {
    failures.push(`Gate 2R security scan failed: visible scan waves still built=${result.securityScan?.active?.stats?.scanWaves || 0}`);
  }
  if ((result.atmosphere?.distantIslets || 0) !== 0) failures.push(`Gate 2R atmosphere failed: distant islets still built=${result.atmosphere?.distantIslets || 0}`);
  if ((result.atmosphere?.visibleDistantIslets || 0) !== 0) failures.push(`Gate 2R atmosphere failed: visible distant islets=${result.atmosphere?.visibleDistantIslets || 0}`);
  if ((result.gameplay?.vehicleFx?.spawnedSkid || 0) !== 0) failures.push(`Gate 2R vehicle FX failed: skid strips still spawned=${result.gameplay?.vehicleFx?.spawnedSkid || 0}`);
  const colliderSummary = result.colliderAudit?.summary || [];
  if (colliderSummary.some((collider) => collider.name === 'ToyIslandFlatTerrainCollider')) {
    failures.push('Gate 2R physics failed: rejected flat terrain collider still active');
  }
  if (!colliderSummary.some((collider) => collider.name === 'ToyIslandTerrainCollider' && collider.type === 'trimesh')) {
    failures.push('Gate 2R physics failed: visible island terrain collider missing');
  }
  const nonProtectedColliders = colliderSummary.filter((collider) => (
    collider.name !== 'ToyIslandTerrainCollider'
    && collider.name !== 'ZONE_education_protected_landmark_collider'
  ));
  if (nonProtectedColliders.length) {
    failures.push(`Gate 2R physics failed: extra driving colliders=${nonProtectedColliders.map((collider) => collider.name).join(', ')}`);
  }
  if ((result.mapStats?.pins || 0) !== worldZones.length) failures.push(`Gate 2R map failed: pins=${result.mapStats?.pins || 0}/${worldZones.length}`);
  if ((result.mapStats?.districtLabels || 0) !== districtFootprints.length) {
    failures.push(`Gate 2R map failed: districtLabels=${result.mapStats?.districtLabels || 0}/${districtFootprints.length}`);
  }
  if ((result.mapStats?.routeLabels || 0) !== roadPaths.length) failures.push(`Gate 2R map failed: routeLabels=${result.mapStats?.routeLabels || 0}/${roadPaths.length}`);
  if ((result.mapStats?.roadLines || 0) !== roadPaths.length) failures.push(`Gate 2R map failed: roadLines=${result.mapStats?.roadLines || 0}/${roadPaths.length}`);
  if ((result.mapStats?.circuitCheckpoints || 0) !== circuitCheckpoints.length) {
    failures.push(`Gate 2R map failed: circuitCheckpoints=${result.mapStats?.circuitCheckpoints || 0}/${circuitCheckpoints.length}`);
  }
  if ((result.zoneInteractionRings || 0) !== 0) {
    failures.push(`Gate 2R zone markers failed: visible interaction rings=${result.zoneInteractionRings || 0}`);
  }
  if ((result.zoneLandmarks?.protected || 0) !== 1) failures.push(`Gate 2R protected landmark failed: protected=${result.zoneLandmarks?.protected || 0}`);
  if (!result.protectedLandmarks?.near?.exactVisible || !result.protectedLandmarks?.far?.silhouetteVisible) {
    failures.push('Gate 2R protected landmark failed: FCC exact/silhouette probe missing');
  }
  if ((result.gameplay?.movementMeters || 0) < 2) failures.push(`Gate 2R driving failed: movementMeters=${result.gameplay?.movementMeters || 0}`);
  if (!result.gameplay?.boostSeen) failures.push('Gate 2R driving failed: boost not observed');
  if (!result.gameplay?.jumpSeen) failures.push('Gate 2R driving failed: jump not observed');
  if (!result.gameplay?.burnoutSeen) failures.push('Gate 2R driving failed: burnout not observed');
  if (!result.gameplay?.wheelieSeen) failures.push('Gate 2R driving failed: wheelie not observed');
  if (!result.water?.surfaceSeen) failures.push('Gate 2R water failed: water surface state not observed');
  if (!result.water?.dragReduced) failures.push('Gate 2R water failed: water drag not observed');
  if (!result.water?.submergeRespawned) failures.push('Gate 2R water failed: submerge respawn not observed');
  if (result.surfaces?.road !== 'road') failures.push(`Gate 2R surface failed: road=${result.surfaces?.road}`);
  if (result.surfaces?.grass !== 'grass') failures.push(`Gate 2R surface failed: grass=${result.surfaces?.grass}`);
  if (result.surfaces?.sand !== 'sand') failures.push(`Gate 2R surface failed: sand=${result.surfaces?.sand}`);
  if (result.surfaces?.shore !== 'shore') failures.push(`Gate 2R surface failed: shore=${result.surfaces?.shore}`);
  if (result.surfaces?.water !== 'water') failures.push(`Gate 2R surface failed: water=${result.surfaces?.water}`);
  for (const hierarchy of ['avenue', 'plaza', 'security', 'stunt', 'dirt', 'bridge']) {
    const profile = result.surfaces?.roadProfiles?.[hierarchy];
    if (profile?.id !== 'road') failures.push(`Gate 2R road profile failed: ${hierarchy}=${profile?.id || 'missing'}`);
    if (profile?.roadHierarchy !== hierarchy) {
      failures.push(`Gate 2R road profile failed: ${hierarchy} hierarchy=${profile?.roadHierarchy || 'missing'}`);
    }
  }
  if (!result.securityScan?.active?.active) failures.push('Gate 2R security scan failed: active state not observed');
  if (!result.securityScan?.complete?.complete) failures.push('Gate 2R security scan failed: complete state not observed');
  if (!result.securityScan?.complete?.panelVisible) failures.push('Gate 2R security scan failed: panel did not open');
  if (!result.securityScan?.complete?.achievementUnlocked) failures.push('Gate 2R security scan failed: security_scan achievement');
  if (result.circuit?.targetCount !== circuitCheckpoints.length - 1) failures.push(`Gate 2R circuit failed: targetCount=${result.circuit?.targetCount}/${circuitCheckpoints.length - 1}`);
  if (!result.circuit?.preview?.active) failures.push('Gate 2R circuit failed: preview inactive');
  if (!result.circuit?.finished) failures.push('Gate 2R circuit failed: finish event');
  if (!Number.isFinite(result.p95FrameMs) || result.p95FrameMs <= 0 || result.p95FrameMs > 22) {
    failures.push(`Gate 2R metrics failed: p95FrameMs=${result.p95FrameMs}`);
  }
  if (!Number.isFinite(result.calls) || result.calls <= 0 || result.calls > 240) {
    failures.push(`Gate 2R metrics failed: calls=${result.calls}`);
  }
  if (!Number.isFinite(result.triangles) || result.triangles <= 0 || result.triangles > 160000) {
    failures.push(`Gate 2R metrics failed: triangles=${result.triangles}`);
  }
  if (!result.highQuality?.ready || (result.highQuality?.canvasSample || 0) <= 0) failures.push('Gate 2R high quality probe failed: canvas did not render');
  if ((result.highQuality?.calls || 0) > 260) failures.push(`Gate 2R high quality draw-call budget exceeded: ${result.highQuality?.calls || 0}`);
  if ((result.highQuality?.triangles || 0) > 180000) failures.push(`Gate 2R high quality triangle budget exceeded: ${result.highQuality?.triangles || 0}`);
  if (!result.mobile?.ready || (result.mobile?.canvasSample || 0) <= 0) failures.push('Gate 2R mobile probe failed: canvas did not render');
  if ((result.mobile?.calls || 0) > 170) failures.push(`Gate 2R mobile draw-call budget exceeded: ${result.mobile?.calls || 0}`);
  if ((result.mobile?.triangles || 0) > 125000) failures.push(`Gate 2R mobile triangle budget exceeded: ${result.mobile?.triangles || 0}`);
}

function assertGate3RVerticalSliceVerification(result, failures) {
  const blockout = result.blockout || {};
  const blockoutSetPieces = blockout.setPieces || {};
  const slice = result.verticalSlice || blockout.verticalSlice || {};
  const start = slice.start || {};
  const campusRoute = slice.campusRoute || {};
  const fcc = slice.fcc || {};
  const securityRoute = slice.securityRoute || {};
  const security = slice.security || {};
  const placement = result.gate3rPlacement || {};

  if (result.goalGate !== 'gate-3r-vertical-slice') {
    failures.push(`Gate 3R probe failed: goalGate=${result.goalGate || 'none'}`);
  }
  if (!blockout.enabled) failures.push('Gate 3R probe failed: foundation mode inactive');
  if (blockout.densePropsBuilt) failures.push('Gate 3R probe failed: dense prop system was built');
  if (blockout.denseFoliageBuilt) failures.push('Gate 3R probe failed: dense foliage system was built');
  if (blockout.potatoPocketBuilt) failures.push('Gate 3R probe failed: final potato pocket was built');
  if ((blockoutSetPieces.zonePads || 0) !== 0) failures.push(`Gate 3R scaffold failed: rejected zone pads built=${blockoutSetPieces.zonePads || 0}`);
  if ((blockoutSetPieces.zoneMarkers || 0) !== 0) failures.push(`Gate 3R scaffold failed: rejected zone markers built=${blockoutSetPieces.zoneMarkers || 0}`);
  if ((blockoutSetPieces.zoneLabels || 0) !== 0) failures.push(`Gate 3R scaffold failed: rejected zone labels built=${blockoutSetPieces.zoneLabels || 0}`);
  if ((blockoutSetPieces.securityGate || 0) < 1) failures.push('Gate 3R security foundation failed: scanner gate missing');
  if ((blockoutSetPieces.securityPacketShards || 0) !== 0) failures.push(`Gate 3R foundation failed: blockout packet shards built=${blockoutSetPieces.securityPacketShards || 0}`);
  if ((blockoutSetPieces.securityScanWaves || 0) !== 0) failures.push(`Gate 3R foundation failed: blockout scan waves built=${blockoutSetPieces.securityScanWaves || 0}`);

  if ((result.districtGround?.pads || 0) !== 0) failures.push(`Gate 3R terrain failed: rejected district pads built=${result.districtGround?.pads || 0}`);
  if ((result.districtGround?.edgeTrims || 0) !== 0) failures.push(`Gate 3R terrain failed: rejected district edge trims built=${result.districtGround?.edgeTrims || 0}`);
  if ((result.surfaceDetails?.districts || 0) !== 0) failures.push(`Gate 3R terrain failed: final surface details built=${result.surfaceDetails?.districts || 0}`);
  if ((result.meadowDetails?.patches || 0) !== 0) failures.push(`Gate 3R terrain failed: meadow detail patches built=${result.meadowDetails?.patches || 0}`);
  if ((result.fieldMotifs?.clusters || 0) !== 0) failures.push(`Gate 3R terrain failed: field motif clusters built=${result.fieldMotifs?.clusters || 0}`);
  if ((result.roadSurfaceDetails?.wearStrips || 0) !== 0) failures.push(`Gate 3R roads failed: wear strips built=${result.roadSurfaceDetails?.wearStrips || 0}`);
  if ((result.roadSurfaceDetails?.laneSeams || 0) !== 0) failures.push(`Gate 3R roads failed: lane seams built=${result.roadSurfaceDetails?.laneSeams || 0}`);
  if ((result.roadSurfaceDetails?.transitionAprons || 0) !== 0) failures.push(`Gate 3R roads failed: transition aprons built=${result.roadSurfaceDetails?.transitionAprons || 0}`);
  if ((result.roadSurfaceDetails?.transitionGuideBars || 0) !== 0) failures.push(`Gate 3R roads failed: transition guide bars built=${result.roadSurfaceDetails?.transitionGuideBars || 0}`);
  if ((result.roadJunctions?.blendPatches || 0) !== 0) failures.push(`Gate 3R roads failed: visible junction slabs=${result.roadJunctions?.blendPatches || 0}`);
  if ((result.roadJunctions?.foundationFusedLayers || 0) !== 0) failures.push(`Gate 3R roads failed: fused foundation texture layers=${result.roadJunctions?.foundationFusedLayers || 0}`);
  if ((result.roadJunctions?.foundationGeometryLayers || 0) !== (result.roadTopology?.paths || 0)) failures.push(`Gate 3R roads failed: geometry road layers=${result.roadJunctions?.foundationGeometryLayers || 0}/${result.roadTopology?.paths || 0}`);
  if ((result.roadJunctions?.foundationTexturePixelsPerUnit || 0) !== 0) failures.push(`Gate 3R roads failed: foundation texture pixels/unit=${result.roadJunctions?.foundationTexturePixelsPerUnit || 0}`);
  if ((result.roadJunctions?.foundationRoadHeightAboveCollider || 99) > 0.03) failures.push(`Gate 3R roads failed: road visual height above collider=${result.roadJunctions?.foundationRoadHeightAboveCollider}`);
  if (!Number.isFinite(result.vehicleGrounding?.contactShadowLiftAboveRoad) || Math.abs(result.vehicleGrounding.contactShadowLiftAboveRoad) > 0.045) {
    failures.push(`Gate 3R vehicle grounding failed: contact shadow lift=${result.vehicleGrounding?.contactShadowLiftAboveRoad}`);
  }
  if ((result.vehicleFx?.lights?.visibleHeadlightPools || 0) !== 0) {
    failures.push(`Gate 3R vehicle grounding failed: idle headlight pools visible=${result.vehicleFx?.lights?.visibleHeadlightPools || 0}`);
  }
  if (!Number.isFinite(result.vehicleGrounding?.bodyVisualLift) || result.vehicleGrounding.bodyVisualLift < 0.05 || result.vehicleGrounding.bodyVisualLift > 0.12) {
    failures.push(`Gate 3R vehicle grounding failed: body visual lift=${result.vehicleGrounding?.bodyVisualLift}`);
  }
  if ((result.roadJunctions?.foundationFullWidthPaths || 0) !== (result.roadTopology?.paths || 0)) failures.push(`Gate 3R roads failed: full-width paths=${result.roadJunctions?.foundationFullWidthPaths || 0}/${result.roadTopology?.paths || 0}`);
  if ((result.roadJunctions?.foundationRoadPolishMarks || 0) < ((result.roadTopology?.paths || 0) * 2)) failures.push(`Gate 3R roads failed: polish marks=${result.roadJunctions?.foundationRoadPolishMarks || 0}`);
  if ((result.roadJunctions?.foundationThroughRoadPriority || 0) < 2) failures.push(`Gate 3R roads failed: through-road priority=${result.roadJunctions?.foundationThroughRoadPriority || 0}`);
  if ((result.roadJunctions?.foundationTrimmedEndpoints || 0) !== 0) failures.push(`Gate 3R roads failed: trimmed endpoints=${result.roadJunctions?.foundationTrimmedEndpoints || 0}`);
  if ((result.roadJunctions?.foundationTaperedEndpoints || 0) !== 0) failures.push(`Gate 3R roads failed: tapered endpoints=${result.roadJunctions?.foundationTaperedEndpoints || 0}`);
  if ((result.roadGuidance?.chevrons || 0) !== 0) failures.push(`Gate 3R roads failed: final chevrons built=${result.roadGuidance?.chevrons || 0}`);
  if ((result.roadGuidance?.reflectorStuds || 0) !== 0) failures.push(`Gate 3R roads failed: reflector studs built=${result.roadGuidance?.reflectorStuds || 0}`);
  if (!result.roadTopology?.coastalLoop) failures.push('Gate 3R road topology failed: coastal loop missing');
  if ((result.roadTopology?.closedLoops || 0) < 1) failures.push(`Gate 3R road topology failed: closedLoops=${result.roadTopology?.closedLoops || 0}`);
  if ((result.roadTopology?.paths || 0) !== roadPaths.length) failures.push(`Gate 3R road topology failed: paths=${result.roadTopology?.paths || 0}/${roadPaths.length}`);
  if ((result.roadTopology?.nonJunctionCrossings || 0) !== 0) failures.push(`Gate 3R road topology failed: nonJunctionCrossings=${result.roadTopology?.nonJunctionCrossings || 0}`);
  if ((result.roadTopology?.paths || 0) > 6) failures.push(`Gate 3R road topology failed: too many route families=${result.roadTopology?.paths || 0}`);
  if ((result.roadTopology?.sharedJunctions || 0) < 4) failures.push(`Gate 3R road topology failed: sharedJunctions=${result.roadTopology?.sharedJunctions || 0}`);
  if ((result.roadTopology?.sharedJunctions || 0) > 8) failures.push(`Gate 3R road topology failed: too many shared junctions=${result.roadTopology?.sharedJunctions || 0}`);
  if ((result.roadTopology?.maxRoadWidth || 99) > 5.2) failures.push(`Gate 3R road width failed: maxRoadWidth=${result.roadTopology?.maxRoadWidth}`);
  if ((result.surfacePanels?.hardscapePanels || 0) !== 0) failures.push(`Gate 3R scaffold failed: hardscape panels built=${result.surfacePanels?.hardscapePanels || 0}`);
  if ((result.districtComposition?.pads || 0) !== 0) failures.push(`Gate 3R district dressing failed: unrelated pads built=${result.districtComposition?.pads || 0}`);
  if ((result.stuntPark?.ramps || 0) !== 0) failures.push(`Gate 3R stunt failed: rejected ramps built=${result.stuntPark?.ramps || 0}`);
  if ((result.stuntPark?.boostPads || 0) !== 0) failures.push(`Gate 3R stunt failed: rejected boost pads built=${result.stuntPark?.boostPads || 0}`);
  if ((result.stuntPark?.landingMarkers || 0) !== 0) failures.push(`Gate 3R stunt failed: rejected landing markers built=${result.stuntPark?.landingMarkers || 0}`);
  if ((result.stuntPark?.circuitTargetRings || 0) !== 0) failures.push(`Gate 3R stunt failed: circuit target rings built=${result.stuntPark?.circuitTargetRings || 0}`);
  if ((result.stuntPark?.circuitTargetArrows || 0) !== 0) failures.push(`Gate 3R stunt failed: circuit target arrows built=${result.stuntPark?.circuitTargetArrows || 0}`);
  if ((result.collectibles?.total || 0) !== 0) failures.push(`Gate 3R collectibles failed: data shards built=${result.collectibles?.total || 0}`);
  if ((result.collectibles?.stats?.visibleShards || 0) !== 0) failures.push(`Gate 3R collectibles failed: visible shards=${result.collectibles?.stats?.visibleShards || 0}`);
  if ((result.atmosphere?.distantIslets || 0) !== 0) failures.push(`Gate 3R atmosphere failed: distant islets built=${result.atmosphere?.distantIslets || 0}`);
  if ((result.atmosphere?.visibleDistantIslets || 0) !== 0) failures.push(`Gate 3R atmosphere failed: visible distant islets=${result.atmosphere?.visibleDistantIslets || 0}`);
  if ((placement.recorded || 0) < 20) failures.push(`Gate 3R placement audit failed: recorded props=${placement.recorded || 0}`);
  if ((placement.roadIntrusions || 0) !== 0) {
    const intrusions = (placement.entries || [])
      .filter((entry) => entry && entry.pass === false)
      .slice(0, 5)
      .map((entry) => `${entry.name}:${entry.clearance}/${entry.minClearance}`)
      .join(', ');
    failures.push(`Gate 3R placement audit failed: roadIntrusions=${placement.roadIntrusions || 0}${intrusions ? ` (${intrusions})` : ''}`);
  }
  if (!Number.isFinite(placement.minClearance) || placement.minClearance < 2.2) {
    failures.push(`Gate 3R placement audit failed: minClearance=${placement.minClearance}`);
  }
  if ((placement.recordedFootprints || 0) < 5) failures.push(`Gate 3R footprint audit failed: recordedFootprints=${placement.recordedFootprints || 0}`);
  if ((placement.footprintIntrusions || 0) !== 0) {
    const intrusions = (placement.entries || [])
      .filter((entry) => entry && entry.footprint && entry.pass === false)
      .slice(0, 5)
      .map((entry) => `${entry.name}:${entry.clearance}/${entry.minClearance}`)
      .join(', ');
    failures.push(`Gate 3R footprint audit failed: footprintIntrusions=${placement.footprintIntrusions || 0}${intrusions ? ` (${intrusions})` : ''}`);
  }
  if (!Number.isFinite(placement.minFootprintClearance) || placement.minFootprintClearance < 4) {
    failures.push(`Gate 3R footprint audit failed: minFootprintClearance=${placement.minFootprintClearance}`);
  }
  if ((placement.shorelineFootprintIntrusions || 0) !== 0) {
    const intrusions = (placement.entries || [])
      .filter((entry) => entry && entry.footprint && Number.isFinite(entry.grassClearance) && entry.grassClearance < 0)
      .slice(0, 5)
      .map((entry) => `${entry.name}:${entry.grassClearance}`)
      .join(', ');
    failures.push(`Gate 3R footprint audit failed: shorelineFootprintIntrusions=${placement.shorelineFootprintIntrusions || 0}${intrusions ? ` (${intrusions})` : ''}`);
  }
  if (!Number.isFinite(placement.maxFootprintRadius) || placement.maxFootprintRadius > ISLAND_RADIUS * 0.88) {
    failures.push(`Gate 3R footprint audit failed: maxFootprintRadius=${placement.maxFootprintRadius}`);
  }
  if ((placement.byFootprintKind?.['protected-landmark'] || 0) < 1) failures.push('Gate 3R footprint audit failed: protected FCC footprint missing');
  if ((placement.byFootprintKind?.['security-pad'] || 0) < 3) failures.push(`Gate 3R footprint audit failed: security pads=${placement.byFootprintKind?.['security-pad'] || 0}`);
  if ((placement.byFootprintKind?.['fcc-walk'] || 0) < 2) failures.push(`Gate 3R footprint audit failed: FCC walks=${placement.byFootprintKind?.['fcc-walk'] || 0}`);
  if ((placement.byKind?.lamp || 0) < 8) failures.push(`Gate 3R placement audit failed: lamps=${placement.byKind?.lamp || 0}`);
  if ((placement.byKind?.sign || 0) < 6) failures.push(`Gate 3R placement audit failed: signs=${placement.byKind?.sign || 0}`);

  const colliderSummary = result.colliderAudit?.summary || [];
  if (colliderSummary.some((collider) => collider.name === 'ToyIslandFlatTerrainCollider')) {
    failures.push('Gate 3R physics failed: rejected flat terrain collider active');
  }
  if (!colliderSummary.some((collider) => collider.name === 'ToyIslandTerrainCollider' && collider.type === 'trimesh')) {
    failures.push('Gate 3R physics failed: visible island terrain collider missing');
  }
  const nonProtectedColliders = colliderSummary.filter((collider) => (
    collider.name !== 'ToyIslandTerrainCollider'
    && collider.name !== 'ZONE_education_protected_landmark_collider'
  ));
  if (nonProtectedColliders.length) {
    failures.push(`Gate 3R physics failed: extra driving colliders=${nonProtectedColliders.map((collider) => collider.name).join(', ')}`);
  }

  if ((result.mapStats?.pins || 0) !== worldZones.length) failures.push(`Gate 3R map failed: pins=${result.mapStats?.pins || 0}/${worldZones.length}`);
  if ((result.mapStats?.districtLabels || 0) !== districtFootprints.length) failures.push(`Gate 3R map failed: districtLabels=${result.mapStats?.districtLabels || 0}/${districtFootprints.length}`);
  if ((result.mapStats?.routeLabels || 0) !== roadPaths.length) failures.push(`Gate 3R map failed: routeLabels=${result.mapStats?.routeLabels || 0}/${roadPaths.length}`);
  if ((result.mapStats?.roadLines || 0) !== roadPaths.length) failures.push(`Gate 3R map failed: roadLines=${result.mapStats?.roadLines || 0}/${roadPaths.length}`);
  if ((result.mapStats?.circuitCheckpoints || 0) !== circuitCheckpoints.length) failures.push(`Gate 3R map failed: circuitCheckpoints=${result.mapStats?.circuitCheckpoints || 0}/${circuitCheckpoints.length}`);
  if ((result.zoneInteractionRings || 0) !== 0) failures.push(`Gate 3R zone markers failed: visible interaction rings=${result.zoneInteractionRings || 0}`);
  if ((result.zoneLandmarks?.protected || 0) !== 1) failures.push(`Gate 3R protected landmark failed: protected=${result.zoneLandmarks?.protected || 0}`);
  if (!result.protectedLandmarks?.near?.exactVisible || !result.protectedLandmarks?.far?.silhouetteVisible) {
    failures.push('Gate 3R protected landmark failed: FCC exact/silhouette probe missing');
  }

  if ((result.gameplay?.movementMeters || 0) < 2) failures.push(`Gate 3R driving failed: movementMeters=${result.gameplay?.movementMeters || 0}`);
  if (!result.gameplay?.boostSeen) failures.push('Gate 3R driving failed: boost not observed');
  if (!result.gameplay?.jumpSeen) failures.push('Gate 3R driving failed: jump not observed');
  if (!result.gameplay?.burnoutSeen) failures.push('Gate 3R driving failed: burnout not observed');
  if (!result.gameplay?.wheelieSeen) failures.push('Gate 3R driving failed: wheelie not observed');
  if (!result.water?.surfaceSeen) failures.push('Gate 3R water failed: water surface state not observed');
  if (!result.water?.dragReduced) failures.push('Gate 3R water failed: water drag not observed');
  if (!result.water?.submergeRespawned) failures.push('Gate 3R water failed: submerge respawn not observed');
  if (result.surfaces?.road !== 'road') failures.push(`Gate 3R surface failed: road=${result.surfaces?.road}`);
  if (result.surfaces?.grass !== 'grass') failures.push(`Gate 3R surface failed: grass=${result.surfaces?.grass}`);
  if (result.surfaces?.sand !== 'sand') failures.push(`Gate 3R surface failed: sand=${result.surfaces?.sand}`);
  if (result.surfaces?.shore !== 'shore') failures.push(`Gate 3R surface failed: shore=${result.surfaces?.shore}`);
  if (result.surfaces?.water !== 'water') failures.push(`Gate 3R surface failed: water=${result.surfaces?.water}`);
  for (const hierarchy of ['avenue', 'plaza', 'security', 'stunt', 'dirt', 'bridge']) {
    const profile = result.surfaces?.roadProfiles?.[hierarchy];
    if (profile?.id !== 'road') failures.push(`Gate 3R road profile failed: ${hierarchy}=${profile?.id || 'missing'}`);
    if (profile?.roadHierarchy !== hierarchy) failures.push(`Gate 3R road profile failed: ${hierarchy} hierarchy=${profile?.roadHierarchy || 'missing'}`);
  }

  if (!result.securityScan?.active?.active) failures.push('Gate 3R security scan failed: active state not observed');
  if ((result.securityScan?.active?.stats?.packetShards || 0) < 8) failures.push(`Gate 3R security scan failed: packet shards=${result.securityScan?.active?.stats?.packetShards || 0}`);
  if ((result.securityScan?.active?.stats?.scanWaves || 0) < 3) failures.push(`Gate 3R security scan failed: scan waves=${result.securityScan?.active?.stats?.scanWaves || 0}`);
  if ((result.securityScan?.active?.stats?.visibleScanWaves || 0) < 1) failures.push(`Gate 3R security scan failed: visible scan waves=${result.securityScan?.active?.stats?.visibleScanWaves || 0}`);
  if ((result.securityScan?.active?.stats?.packetMotionSamples || 0) < 1) failures.push(`Gate 3R security scan failed: packet motion samples=${result.securityScan?.active?.stats?.packetMotionSamples || 0}`);
  if (!result.securityScan?.complete?.complete) failures.push('Gate 3R security scan failed: complete state not observed');
  if (!result.securityScan?.complete?.panelVisible) failures.push('Gate 3R security scan failed: panel did not open');
  if (!result.securityScan?.complete?.achievementUnlocked) failures.push('Gate 3R security scan failed: security_scan achievement');
  if (result.circuit?.targetCount !== circuitCheckpoints.length - 1) failures.push(`Gate 3R circuit failed: targetCount=${result.circuit?.targetCount}/${circuitCheckpoints.length - 1}`);
  if (!result.circuit?.preview?.active) failures.push('Gate 3R circuit failed: preview inactive');
  if (!result.circuit?.finished) failures.push('Gate 3R circuit failed: finish event');

  if (!slice.enabled) failures.push('Gate 3R vertical slice failed: slice mode inactive');
  if ((slice.staticBatches || 0) < 4) failures.push(`Gate 3R batching failed: staticBatches=${slice.staticBatches || 0}`);
  if ((start.launchPads || 0) !== 0) failures.push(`Gate 3R start failed: rejected launch slab built=${start.launchPads || 0}`);
  if ((start.planters || 0) !== 0) failures.push(`Gate 3R start failed: rejected planters built=${start.planters || 0}`);
  if ((start.launchLights || 0) < 6) failures.push(`Gate 3R start failed: launchLights=${start.launchLights || 0}`);
  if ((start.burnoutScuffs || 0) < 6) failures.push(`Gate 3R start failed: burnoutScuffs=${start.burnoutScuffs || 0}`);
  if ((start.signs || 0) < 2) failures.push(`Gate 3R start failed: signs=${start.signs || 0}`);
  if ((start.lamps || 0) < 2) failures.push(`Gate 3R start failed: lamps=${start.lamps || 0}`);
  if ((campusRoute.routeMarks || 0) !== 0) failures.push(`Gate 3R campus route failed: rejected white route marks built=${campusRoute.routeMarks || 0}`);
  if ((campusRoute.lamps || 0) < 4) failures.push(`Gate 3R campus route failed: lamps=${campusRoute.lamps || 0}`);
  if ((campusRoute.hedges || 0) !== 0) failures.push(`Gate 3R campus route failed: rejected hedges built=${campusRoute.hedges || 0}`);
  if ((campusRoute.flowerBeds || 0) !== 0) failures.push(`Gate 3R campus route failed: rejected flowerBeds built=${campusRoute.flowerBeds || 0}`);
  if ((fcc.plazaPads || 0) < 2) failures.push(`Gate 3R FCC failed: plazaPads=${fcc.plazaPads || 0}`);
  if ((fcc.benches || 0) !== 0) failures.push(`Gate 3R FCC failed: rejected benches built=${fcc.benches || 0}`);
  if ((fcc.hedges || 0) !== 0) failures.push(`Gate 3R FCC failed: rejected hedges built=${fcc.hedges || 0}`);
  if ((fcc.planters || 0) !== 0) failures.push(`Gate 3R FCC failed: rejected planters built=${fcc.planters || 0}`);
  if ((fcc.lamps || 0) < 2) failures.push(`Gate 3R FCC failed: lamps=${fcc.lamps || 0}`);
  if ((fcc.identityFrames || 0) < 2) failures.push(`Gate 3R FCC failed: identityFrames=${fcc.identityFrames || 0}`);
  if ((securityRoute.routeMarks || 0) !== 0) failures.push(`Gate 3R security route failed: rejected white route marks built=${securityRoute.routeMarks || 0}`);
  if ((securityRoute.warningBollards || 0) < 2) failures.push(`Gate 3R security route failed: warningBollards=${securityRoute.warningBollards || 0}`);
  if ((security.floorPads || 0) < 3) failures.push(`Gate 3R security lab failed: floorPads=${security.floorPads || 0}`);
  if ((security.serverBlocks || 0) < 4) failures.push(`Gate 3R security lab failed: serverBlocks=${security.serverBlocks || 0}`);
  if ((security.cables || 0) < 4) failures.push(`Gate 3R security lab failed: cables=${security.cables || 0}`);
  if ((security.beacons || 0) < 4) failures.push(`Gate 3R security lab failed: beacons=${security.beacons || 0}`);
  if ((security.terminalRails || 0) < 4) failures.push(`Gate 3R security lab failed: terminalRails=${security.terminalRails || 0}`);
  if ((security.warningBollards || 0) < 6) failures.push(`Gate 3R security lab failed: warningBollards=${security.warningBollards || 0}`);
  if ((security.lightStrips || 0) < 5) failures.push(`Gate 3R security lab failed: lightStrips=${security.lightStrips || 0}`);

  if (!Number.isFinite(result.p95FrameMs) || result.p95FrameMs <= 0 || result.p95FrameMs > 22) failures.push(`Gate 3R metrics failed: p95FrameMs=${result.p95FrameMs}`);
  if (!Number.isFinite(result.calls) || result.calls <= 0 || result.calls > 280) failures.push(`Gate 3R metrics failed: calls=${result.calls}`);
  if (!Number.isFinite(result.triangles) || result.triangles <= 0 || result.triangles > 190000) failures.push(`Gate 3R metrics failed: triangles=${result.triangles}`);
  if (!result.highQuality?.ready || (result.highQuality?.canvasSample || 0) <= 0) failures.push('Gate 3R high quality probe failed: canvas did not render');
  if ((result.highQuality?.calls || 0) > 300) failures.push(`Gate 3R high quality draw-call budget exceeded: ${result.highQuality?.calls || 0}`);
  if ((result.highQuality?.triangles || 0) > 210000) failures.push(`Gate 3R high quality triangle budget exceeded: ${result.highQuality?.triangles || 0}`);
  if (!result.mobile?.ready || (result.mobile?.canvasSample || 0) <= 0) failures.push('Gate 3R mobile probe failed: canvas did not render');
  if ((result.mobile?.calls || 0) > 185) failures.push(`Gate 3R mobile draw-call budget exceeded: ${result.mobile?.calls || 0}`);
  if ((result.mobile?.triangles || 0) > 135000) failures.push(`Gate 3R mobile triangle budget exceeded: ${result.mobile?.triangles || 0}`);
  if (!result.mobile?.vehicleFrame?.inFrame) failures.push('Gate 3R mobile framing failed: vehicle focus is outside the viewport');
  if ((result.mobile?.vehicleFrame?.centerY || 0) > 0.84) {
    failures.push(`Gate 3R mobile framing failed: vehicle centerY=${result.mobile?.vehicleFrame?.centerY}`);
  }
}

function assertGate2BlockoutVerification(result, failures) {
  const blockout = result.blockout || {};
  const blockoutSetPieces = blockout.setPieces || {};
  const blockoutCompatibleGate = result.goalGate === 'gate-2-blockout' || result.goalGate === 'gate-3-vertical-slice';
  if (!blockoutCompatibleGate) failures.push(`Gate 2 probe failed: goalGate=${result.goalGate || 'none'}`);
  if (!blockout.enabled) failures.push('Gate 2 probe failed: blockout mode inactive');
  if (blockout.densePropsBuilt) failures.push('Gate 2 probe failed: dense prop system was built');
  if (blockout.denseFoliageBuilt) failures.push('Gate 2 probe failed: dense foliage system was built');
  if (blockout.potatoPocketBuilt) failures.push('Gate 2 probe failed: final potato pocket was built');
  if ((blockoutSetPieces.zonePads || 0) !== worldZones.length) {
    failures.push(`Gate 2 scaffold failed: zonePads=${blockoutSetPieces.zonePads || 0}/${worldZones.length}`);
  }
  if ((blockoutSetPieces.zoneMarkers || 0) !== worldZones.length) {
    failures.push(`Gate 2 scaffold failed: zoneMarkers=${blockoutSetPieces.zoneMarkers || 0}/${worldZones.length}`);
  }
  if ((blockoutSetPieces.zoneLabels || 0) !== worldZones.length) {
    failures.push(`Gate 2 scaffold failed: zoneLabels=${blockoutSetPieces.zoneLabels || 0}/${worldZones.length}`);
  }
  if ((blockoutSetPieces.securityGate || 0) < 1) failures.push('Gate 2 security scaffold failed: scanner gate missing');
  if ((blockoutSetPieces.securityPacketShards || 0) < 8) {
    failures.push(`Gate 2 security scaffold failed: packet shards=${blockoutSetPieces.securityPacketShards || 0}`);
  }
  if ((blockoutSetPieces.securityScanWaves || 0) < 3) {
    failures.push(`Gate 2 security scaffold failed: scan waves=${blockoutSetPieces.securityScanWaves || 0}`);
  }
  if ((result.districtGround?.pads || 0) < districtFootprints.length) {
    failures.push(`Gate 2 terrain failed: district pads=${result.districtGround?.pads || 0}/${districtFootprints.length}`);
  }
  if ((result.surfaceDetails?.districts || 0) !== 0) failures.push(`Gate 2 terrain failed: final surface details built=${result.surfaceDetails?.districts || 0}`);
  if ((result.meadowDetails?.patches || 0) !== 0) failures.push(`Gate 2 terrain failed: meadow detail patches built=${result.meadowDetails?.patches || 0}`);
  if ((result.fieldMotifs?.clusters || 0) !== 0) failures.push(`Gate 2 terrain failed: field motif clusters built=${result.fieldMotifs?.clusters || 0}`);
  if ((result.roadSurfaceDetails?.wearStrips || 0) !== 0) failures.push(`Gate 2 roads failed: wear strips built=${result.roadSurfaceDetails?.wearStrips || 0}`);
  if ((result.roadSurfaceDetails?.laneSeams || 0) !== 0) failures.push(`Gate 2 roads failed: lane seams built=${result.roadSurfaceDetails?.laneSeams || 0}`);
  if ((result.roadGuidance?.chevrons || 0) !== 0) failures.push(`Gate 2 roads failed: final chevrons built=${result.roadGuidance?.chevrons || 0}`);
  if ((result.roadGuidance?.reflectorStuds || 0) !== 0) failures.push(`Gate 2 roads failed: reflector studs built=${result.roadGuidance?.reflectorStuds || 0}`);
  if (!result.roadTopology?.coastalLoop) failures.push('Gate 2 road topology failed: coastal loop missing');
  if ((result.roadTopology?.closedLoops || 0) < 1) failures.push(`Gate 2 road topology failed: closedLoops=${result.roadTopology?.closedLoops || 0}`);
  if ((result.roadTopology?.paths || 0) < 12) failures.push(`Gate 2 road topology failed: paths=${result.roadTopology?.paths || 0}`);
  if ((result.roadTopology?.sharedJunctions || 0) < 8) failures.push(`Gate 2 road topology failed: sharedJunctions=${result.roadTopology?.sharedJunctions || 0}`);
  if ((result.roadTopology?.maxRoadWidth || 99) > 5.2) failures.push(`Gate 2 road width failed: maxRoadWidth=${result.roadTopology?.maxRoadWidth}`);
  if ((result.roadTopology?.maxThresholdWidth || 99) > 15.2) failures.push(`Gate 2 threshold width failed: maxThresholdWidth=${result.roadTopology?.maxThresholdWidth}`);
  if ((result.mapStats?.pins || 0) !== worldZones.length) failures.push(`Gate 2 map failed: pins=${result.mapStats?.pins || 0}/${worldZones.length}`);
  if ((result.mapStats?.districtLabels || 0) !== districtFootprints.length) {
    failures.push(`Gate 2 map failed: districtLabels=${result.mapStats?.districtLabels || 0}/${districtFootprints.length}`);
  }
  if ((result.mapStats?.roadLines || 0) !== roadPaths.length) failures.push(`Gate 2 map failed: roadLines=${result.mapStats?.roadLines || 0}/${roadPaths.length}`);
  if ((result.zoneLandmarks?.protected || 0) !== 1) failures.push(`Gate 2 protected landmark failed: protected=${result.zoneLandmarks?.protected || 0}`);
  if (!result.protectedLandmarks?.near?.exactVisible || !result.protectedLandmarks?.far?.silhouetteVisible) {
    failures.push('Gate 2 protected landmark failed: FCC exact/silhouette probe missing');
  }
  if ((result.gameplay?.movementMeters || 0) < 2) failures.push(`Gate 2 driving failed: movementMeters=${result.gameplay?.movementMeters || 0}`);
  if (!result.gameplay?.boostSeen) failures.push('Gate 2 driving failed: boost not observed');
  if (!result.gameplay?.jumpSeen) failures.push('Gate 2 driving failed: jump not observed');
  if (!result.gameplay?.burnoutSeen) failures.push('Gate 2 driving failed: burnout not observed');
  if (!result.gameplay?.wheelieSeen) failures.push('Gate 2 driving failed: wheelie not observed');
  if (!result.water?.surfaceSeen) failures.push('Gate 2 water failed: water surface state not observed');
  if (!result.water?.dragReduced) failures.push('Gate 2 water failed: water drag not observed');
  if (!result.water?.submergeRespawned) failures.push('Gate 2 water failed: submerge respawn not observed');
  if (result.surfaces?.road !== 'road') failures.push(`Gate 2 surface failed: road=${result.surfaces?.road}`);
  if (result.surfaces?.grass !== 'grass') failures.push(`Gate 2 surface failed: grass=${result.surfaces?.grass}`);
  if (result.surfaces?.sand !== 'sand') failures.push(`Gate 2 surface failed: sand=${result.surfaces?.sand}`);
  if (result.surfaces?.shore !== 'shore') failures.push(`Gate 2 surface failed: shore=${result.surfaces?.shore}`);
  if (result.surfaces?.water !== 'water') failures.push(`Gate 2 surface failed: water=${result.surfaces?.water}`);
  if (!result.securityScan?.active?.active) failures.push('Gate 2 security scan failed: active state not observed');
  if ((result.securityScan?.active?.stats?.packetShards || 0) < 8) {
    failures.push(`Gate 2 security scan failed: packet shards=${result.securityScan?.active?.stats?.packetShards || 0}`);
  }
  if ((result.securityScan?.active?.stats?.scanWaves || 0) < 3) {
    failures.push(`Gate 2 security scan failed: scan waves=${result.securityScan?.active?.stats?.scanWaves || 0}`);
  }
  if (!result.securityScan?.complete?.complete) failures.push('Gate 2 security scan failed: complete state not observed');
  if (!result.securityScan?.complete?.panelVisible) failures.push('Gate 2 security scan failed: panel did not open');
  if (!result.securityScan?.complete?.achievementUnlocked) failures.push('Gate 2 security scan failed: security_scan achievement');
  if (result.circuit?.targetCount !== circuitCheckpoints.length - 1) failures.push(`Gate 2 circuit failed: targetCount=${result.circuit?.targetCount}/${circuitCheckpoints.length - 1}`);
  if (!result.circuit?.preview?.active) failures.push('Gate 2 circuit failed: preview inactive');
  if (!result.circuit?.finished) failures.push('Gate 2 circuit failed: finish event');
  if ((result.circuit?.ringInstances || 0) !== circuitCheckpoints.length - 1) {
    failures.push(`Gate 2 circuit failed: ring instances=${result.circuit?.ringInstances || 0}`);
  }
  if ((result.circuit?.arrowInstances || 0) !== circuitCheckpoints.length - 1) {
    failures.push(`Gate 2 circuit failed: arrow instances=${result.circuit?.arrowInstances || 0}`);
  }
  if (!Number.isFinite(result.p95FrameMs) || result.p95FrameMs <= 0) failures.push(`Gate 2 metrics failed: p95FrameMs=${result.p95FrameMs}`);
  if (!Number.isFinite(result.calls) || result.calls <= 0) failures.push(`Gate 2 metrics failed: calls=${result.calls}`);
  if (!Number.isFinite(result.triangles) || result.triangles <= 0) failures.push(`Gate 2 metrics failed: triangles=${result.triangles}`);
  if (!result.highQuality?.ready || (result.highQuality?.canvasSample || 0) <= 0) failures.push('Gate 2 high quality probe failed: canvas did not render');
  if (!result.mobile?.ready || (result.mobile?.canvasSample || 0) <= 0) failures.push('Gate 2 mobile probe failed: canvas did not render');
}

function assertGate3VerticalSliceVerification(result, failures) {
  assertGate2BlockoutVerification(result, failures);
  if (result.goalGate !== 'gate-3-vertical-slice') failures.push(`Gate 3 probe failed: goalGate=${result.goalGate || 'none'}`);
  const slice = result.verticalSlice || result.blockout?.verticalSlice || {};
  const start = slice.start || {};
  const campusRoute = slice.campusRoute || {};
  const fcc = slice.fcc || {};
  const securityRoute = slice.securityRoute || {};
  const security = slice.security || {};
  if (!slice.enabled) failures.push('Gate 3 vertical slice failed: slice mode inactive');
  if ((slice.authoredAssets || 0) < 8) failures.push(`Gate 3 authored assets failed: authoredAssets=${slice.authoredAssets || 0}`);
  if ((slice.staticBatches || 0) < 12) failures.push(`Gate 3 batching failed: staticBatches=${slice.staticBatches || 0}`);
  if ((start.launchPads || 0) < 2) failures.push(`Gate 3 start failed: launchPads=${start.launchPads || 0}`);
  if ((start.launchLights || 0) < 5) failures.push(`Gate 3 start failed: launchLights=${start.launchLights || 0}`);
  if ((start.burnoutScuffs || 0) < 6) failures.push(`Gate 3 start failed: burnoutScuffs=${start.burnoutScuffs || 0}`);
  if ((start.signs || 0) < 2) failures.push(`Gate 3 start failed: signs=${start.signs || 0}`);
  if ((start.lamps || 0) < 3) failures.push(`Gate 3 start failed: lamps=${start.lamps || 0}`);
  if ((campusRoute.routeMarks || 0) < 5) failures.push(`Gate 3 campus route failed: routeMarks=${campusRoute.routeMarks || 0}`);
  if ((campusRoute.lamps || 0) < 4) failures.push(`Gate 3 campus route failed: lamps=${campusRoute.lamps || 0}`);
  if ((campusRoute.hedges || 0) < 5) failures.push(`Gate 3 campus route failed: hedges=${campusRoute.hedges || 0}`);
  if ((campusRoute.arches || 0) < 2) failures.push(`Gate 3 campus route failed: arches=${campusRoute.arches || 0}`);
  if ((fcc.plazaPads || 0) < 4) failures.push(`Gate 3 FCC failed: plazaPads=${fcc.plazaPads || 0}`);
  if ((fcc.benches || 0) < 4) failures.push(`Gate 3 FCC failed: benches=${fcc.benches || 0}`);
  if ((fcc.hedges || 0) < 3) failures.push(`Gate 3 FCC failed: hedges=${fcc.hedges || 0}`);
  if ((fcc.identityFrames || 0) < 2) failures.push(`Gate 3 FCC failed: identityFrames=${fcc.identityFrames || 0}`);
  if ((securityRoute.routeMarks || 0) < 7) failures.push(`Gate 3 security route failed: routeMarks=${securityRoute.routeMarks || 0}`);
  if ((securityRoute.warningBollards || 0) < 7) failures.push(`Gate 3 security route failed: warningBollards=${securityRoute.warningBollards || 0}`);
  if ((security.floorPads || 0) < 3) failures.push(`Gate 3 security lab failed: floorPads=${security.floorPads || 0}`);
  if ((security.serverBlocks || 0) < 6) failures.push(`Gate 3 security lab failed: serverBlocks=${security.serverBlocks || 0}`);
  if ((security.cables || 0) < 4) failures.push(`Gate 3 security lab failed: cables=${security.cables || 0}`);
  if ((security.terminalRails || 0) < 4) failures.push(`Gate 3 security lab failed: terminalRails=${security.terminalRails || 0}`);
  if ((security.warningBollards || 0) < 6) failures.push(`Gate 3 security lab failed: warningBollards=${security.warningBollards || 0}`);
  if ((result.roadSurfaceDetails?.transitionGuideBars || 0) > 0) {
    failures.push(`Gate 3 road clutter failed: transitionGuideBars=${result.roadSurfaceDetails.transitionGuideBars}`);
  }
  if ((result.securityScan?.active?.stats?.visibleScanWaves || 0) < 1) {
    failures.push(`Gate 3 security scan failed: visible scan waves=${result.securityScan?.active?.stats?.visibleScanWaves || 0}`);
  }
  if ((result.calls || 0) > 280) failures.push(`Gate 3 desktop draw-call budget exceeded: ${result.calls}`);
  if ((result.triangles || 0) > 180000) failures.push(`Gate 3 desktop triangle budget exceeded: ${result.triangles}`);
  if ((result.mobile?.calls || 0) > 180) failures.push(`Gate 3 mobile draw-call budget exceeded: ${result.mobile?.calls || 0}`);
  if ((result.highQuality?.calls || 0) > 300) failures.push(`Gate 3 high quality draw-call budget exceeded: ${result.highQuality?.calls || 0}`);
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

function sampleRoadTopology() {
  const coastalLoop = roadPaths.find((path) => path.id === 'coastal-loop');
  const junctionKeys = new Map();
  const roadWidths = roadPaths.map((path) => path.width);
  const thresholdWidths = routeThresholds.map((threshold) => threshold.width);
  for (const path of roadPaths) {
    for (const point of path.points) {
      const key = `${point[0].toFixed(2)}:${point[1].toFixed(2)}`;
      const entry = junctionKeys.get(key) || new Set();
      entry.add(path.id);
      junctionKeys.set(key, entry);
    }
  }
  return {
    paths: roadPaths.length,
    closedLoops: roadPaths.filter((path) => path.closed).length,
    coastalLoop: Boolean(coastalLoop?.closed && coastalLoop.points.length >= 12),
    coastalLoopPoints: coastalLoop?.points.length || 0,
    nonJunctionCrossings: countRoadCrossings(),
    sharedJunctions: [...junctionKeys.values()].filter((paths) => paths.size > 1).length,
    averageRoadWidth: Number((roadWidths.reduce((sum, width) => sum + width, 0) / Math.max(1, roadWidths.length)).toFixed(2)),
    maxRoadWidth: Math.max(...roadWidths),
    averageThresholdWidth: Number((thresholdWidths.reduce((sum, width) => sum + width, 0) / Math.max(1, thresholdWidths.length)).toFixed(2)),
    maxThresholdWidth: Math.max(...thresholdWidths)
  };
}

function countRoadCrossings() {
  const segments = roadPaths.flatMap((path) => rawPathSegments(path));
  let crossings = 0;
  for (let i = 0; i < segments.length; i += 1) {
    for (let j = i + 1; j < segments.length; j += 1) {
      const a = segments[i];
      const b = segments[j];
      if (a.pathId === b.pathId) continue;
      const hit = segmentIntersection2D(a.a, a.b, b.a, b.b);
      if (!hit) continue;
      if (hit.t <= 0.02 || hit.t >= 0.98 || hit.u <= 0.02 || hit.u >= 0.98) continue;
      crossings += 1;
    }
  }
  return crossings;
}

function rawPathSegments(path) {
  const segments = [];
  const limit = path.closed ? path.points.length : path.points.length - 1;
  for (let index = 0; index < limit; index += 1) {
    segments.push({
      pathId: path.id,
      a: path.points[index],
      b: path.points[(index + 1) % path.points.length]
    });
  }
  return segments;
}

function segmentIntersection2D(a, b, c, d) {
  const r = [b[0] - a[0], b[1] - a[1]];
  const s = [d[0] - c[0], d[1] - c[1]];
  const denominator = cross2D(r, s);
  if (Math.abs(denominator) < 0.000001) return null;
  const ca = [c[0] - a[0], c[1] - a[1]];
  const t = cross2D(ca, s) / denominator;
  const u = cross2D(ca, r) / denominator;
  if (t < -0.000001 || t > 1.000001 || u < -0.000001 || u > 1.000001) return null;
  return { t, u };
}

function cross2D(a, b) {
  return a[0] * b[1] - a[1] * b[0];
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
