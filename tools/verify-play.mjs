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
  'EnvPolishCareerSoftwareHouse',
  'EnvPolishAwardsMuseumHall',
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
  const vehicleChassisGroundContact = await exerciseVehicleChassisGroundContact(page, routeReplaySegments);
  const vehicleGroundingMotion = await exerciseVehicleGroundingMotion(page);
  const vehicleBodyRoadClipping = await exerciseVehicleBodyRoadClipping(page);
  const stuntPrototype = await exerciseGate4B6RPrototype(page);
  const stuntFull = await exerciseGate4B6RFullPlayground(page);
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
    vehicleChassisGroundContact,
    vehicleGroundingMotion,
    vehicleBodyRoadClipping,
    stuntPrototype,
    stuntFull,
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
    const roadProfiles = {};
    for (const hierarchy of Array.from(new Set(paths.map((path) => path.hierarchy)))) {
      roadProfiles[hierarchy] = sampleSurface(...midpointFor(hierarchy));
    }
    return {
      road: sample(...road),
      grass,
      sand: sample(radius * 0.91, 0),
      shore: sample(radius * 0.985, 0),
      water: sample(radius * 1.025, 0),
      roadProfiles
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

async function exerciseVehicleChassisGroundContact(page, segments) {
  return page.evaluate(async (probeSegments) => {
    const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
    const game = window.__portfolioDrive.game;
    const input = game.input;
    const colliderNames = ['main', 'ballast', 'roof'];
    const shapeNames = {
      0: 'ball',
      1: 'cuboid',
      2: 'capsule',
      3: 'segment',
      4: 'polyline',
      5: 'triangle',
      6: 'trimesh',
      7: 'heightfield'
    };
    const samples = [];
    const contactEvents = [];

    const clearInput = () => {
      input.actions.forward = false;
      input.actions.backward = false;
      input.actions.left = false;
      input.actions.right = false;
      input.actions.boost = false;
      input.actions.handbrake = false;
      input.actions.brake = false;
      input.actions.jump = false;
      input.joystick.x = 0;
      input.joystick.y = 0;
    };

    const waitForGrounded = async () => {
      for (let i = 0; i < 54; i += 1) {
        if ((game.vehicle.controller?.groundedWheels || 0) >= 2) return true;
        await delay(35);
      }
      return false;
    };

    const chassisContactRows = () => {
      const rows = [];
      const body = game.vehicle.body;
      for (let index = 0; index < body.numColliders(); index += 1) {
        const collider = body.collider(index);
        game.physics.world.contactPairsWith(collider, (other) => {
          const parent = other.parent?.();
          if (parent && parent.handle === body.handle) return;
          let solverContacts = 0;
          let minDist = Infinity;
          let maxFriction = 0;
          game.physics.world.contactPair(collider, other, (manifold) => {
            const count = manifold.numSolverContacts?.() || 0;
            solverContacts += count;
            for (let i = 0; i < count; i += 1) {
              minDist = Math.min(minDist, manifold.solverContactDist(i));
              maxFriction = Math.max(maxFriction, manifold.solverContactFriction(i));
            }
          });
          if (solverContacts <= 0) return;
          rows.push({
            colliderIndex: index,
            collider: colliderNames[index] || `collider-${index}`,
            otherShape: shapeNames[other.shapeType?.()] || String(other.shapeType?.()),
            otherFriction: Number(other.friction().toFixed(3)),
            solverContacts,
            minDist: Number(minDist.toFixed(5)),
            maxFriction: Number(maxFriction.toFixed(3))
          });
        });
      }
      return rows;
    };

    const minWheelSuspensionLength = () => {
      const controller = game.vehicle.controller?.controller;
      let minLength = Infinity;
      for (let index = 0; index < 4; index += 1) {
        const length = controller?.wheelSuspensionLength?.(index);
        if (Number.isFinite(length)) minLength = Math.min(minLength, length);
      }
      return Number.isFinite(minLength) ? Number(minLength.toFixed(4)) : null;
    };

    const ballastBottomY = () => {
      const collider = game.vehicle.body.collider(1);
      const half = collider?.halfExtents?.();
      const center = collider?.translation?.();
      if (!half || !center) return null;
      return Number((center.y - half.y).toFixed(4));
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
      await delay(160);
      const grounded = await waitForGrounded();
      input.actions.forward = true;
      input.actions.boost = true;

      let maxSpeed = 0;
      let contactFrames = 0;
      let ballastContactFrames = 0;
      let minBallastBottomY = Infinity;
      let minSuspensionLength = Infinity;
      for (let frame = 0; frame < 36; frame += 1) {
        await delay(40);
        const position = game.vehicle.position.clone();
        const velocity = game.vehicle.body.linvel();
        const speed = Math.hypot(velocity.x, velocity.z);
        const surface = game.world.getSurfaceInfo(position);
        const contacts = chassisContactRows();
        const currentBallastBottomY = ballastBottomY();
        const currentSuspensionLength = minWheelSuspensionLength();

        maxSpeed = Math.max(maxSpeed, speed);
        if (Number.isFinite(currentBallastBottomY)) minBallastBottomY = Math.min(minBallastBottomY, currentBallastBottomY);
        if (Number.isFinite(currentSuspensionLength)) minSuspensionLength = Math.min(minSuspensionLength, currentSuspensionLength);
        if (contacts.length) contactFrames += 1;
        if (contacts.some((contact) => contact.collider === 'ballast')) ballastContactFrames += 1;

        if (frame > 6 && surface.id === 'road' && speed > 8 && contacts.length) {
          contactEvents.push({
            id: segment.id,
            index: segment.index,
            frame,
            x: Number(position.x.toFixed(2)),
            z: Number(position.z.toFixed(2)),
            speed: Number(speed.toFixed(2)),
            groundedWheels: game.vehicle.controller?.groundedWheels || 0,
            minWheelSuspensionLength: currentSuspensionLength,
            ballastBottomY: currentBallastBottomY,
            contacts
          });
        }
      }
      input.actions.forward = false;
      input.actions.boost = false;

      samples.push({
        id: segment.id,
        index: segment.index,
        grounded,
        maxSpeed: Number(maxSpeed.toFixed(2)),
        contactFrames,
        ballastContactFrames,
        minBallastBottomY: Number.isFinite(minBallastBottomY) ? Number(minBallastBottomY.toFixed(4)) : null,
        minWheelSuspensionLength: Number.isFinite(minSuspensionLength) ? Number(minSuspensionLength.toFixed(4)) : null
      });
      await delay(80);
    }

    clearInput();
    window.__portfolioDrive.respawn('landing');
    return {
      total: samples.length,
      events: contactEvents.slice(0, 12),
      eventCount: contactEvents.length,
      contactSegments: samples.filter((sample) => sample.contactFrames > 0).length,
      ballastContactSegments: samples.filter((sample) => sample.ballastContactFrames > 0).length,
      minBallastBottomY: Number(Math.min(...samples.map((sample) => sample.minBallastBottomY ?? Infinity)).toFixed(4)),
      minWheelSuspensionLength: Number(Math.min(...samples.map((sample) => sample.minWheelSuspensionLength ?? Infinity)).toFixed(4)),
      samples
    };
  }, segments);
}

async function exerciseVehicleGroundingMotion(page) {
  const segment = routeReplaySegments.find((item) => item.id === 'coastal-loop' && item.index === 6)
    || routeReplaySegments.find((item) => item.id === 'coastal-loop' && item.length > 64)
    || routeReplaySegments[0];
  await page.evaluate((roadSegment) => {
    const game = window.__portfolioDrive.game;
    game.ui.closePanel?.();
    game.ui.closeMap?.();
    game.ui.closeMenu?.();
    game.startDriving();
    if (!game.__verifyOriginalCameraUpdate) {
      game.__verifyOriginalCameraUpdate = game.cameraRig.update.bind(game.cameraRig);
      game.cameraRig.update = () => {};
    }
    for (const action of ['forward', 'boost', 'backward', 'brake', 'handbrake', 'left', 'right']) {
      game.input.actions[action] = false;
    }
    game.input.joystick.x = 0;
    game.input.joystick.y = 0;
    game.input.pressed?.clear?.();
  }, segment);
  await resetVehicleGroundingProbe(page, segment);
  await delay(1000);
  await stageVehicleSideGroundingView(page);
  const still = await sampleVehicleGroundingMotion(page, 'still');
  await screenshot(page, 'vehicle-grounding-side-still.png');

  await resetVehicleGroundingProbe(page, segment);
  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    game.input.actions.forward = true;
  });
  await delay(1100);
  await stageVehicleSideGroundingView(page);
  const forward = await sampleVehicleGroundingMotion(page, 'forward');
  await screenshot(page, 'vehicle-grounding-side-forward.png');

  await resetVehicleGroundingProbe(page, segment);
  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    game.input.actions.forward = true;
    game.input.actions.boost = true;
  });
  await delay(850);
  await stageVehicleSideGroundingView(page);
  const boost = await sampleVehicleGroundingMotion(page, 'boost');
  await screenshot(page, 'vehicle-grounding-side-boost.png');

  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    for (const action of ['forward', 'boost', 'backward', 'brake', 'handbrake', 'left', 'right']) {
      game.input.actions[action] = false;
    }
    game.input.joystick.x = 0;
    game.input.joystick.y = 0;
    game.input.pressed?.clear?.();
    if (game.__verifyOriginalCameraUpdate) {
      game.cameraRig.update = game.__verifyOriginalCameraUpdate;
      delete game.__verifyOriginalCameraUpdate;
    }
    window.__portfolioDrive.respawn('landing');
  });

  const samples = [still, forward, boost];
  return {
    samples,
    screenshots: [
      'vehicle-grounding-side-still.png',
      'vehicle-grounding-side-forward.png',
      'vehicle-grounding-side-boost.png'
    ],
    minWheelClearanceAboveRoad: Number(Math.min(...samples.map((sample) => sample.wheels.clearanceAboveRoad)).toFixed(4)),
    minWheelDebugClearanceAboveRoad: Number(Math.min(...samples.flatMap((sample) => sample.wheelGrounding.map((wheel) => wheel.clearanceAboveRoad))).toFixed(4)),
    minBodyClearanceAboveRoad: Number(Math.min(...samples.map((sample) => sample.bodyOnly.clearanceAboveRoad)).toFixed(4)),
    maxSpeed: Number(Math.max(...samples.map((sample) => sample.speed)).toFixed(2))
  };
}

async function resetVehicleGroundingProbe(page, segment) {
  await page.evaluate((roadSegment) => {
    const game = window.__portfolioDrive.game;
    for (const action of ['forward', 'boost', 'backward', 'brake', 'handbrake', 'left', 'right']) {
      game.input.actions[action] = false;
    }
    game.input.joystick.x = 0;
    game.input.joystick.y = 0;
    game.input.pressed?.clear?.();
    const offset = Math.max(6, roadSegment.length / 2 - 7);
    const start = {
      x: roadSegment.cx - Math.sin(roadSegment.rotation) * offset,
      y: 1.12,
      z: roadSegment.cz - Math.cos(roadSegment.rotation) * offset
    };
    game.vehicle.respawn(start, roadSegment.rotation);
  }, segment);
  await delay(650);
}

async function stageVehicleSideGroundingView(page) {
  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const position = game.vehicle.position;
    const heading = game.vehicle.heading || 0;
    const sideX = Math.cos(heading);
    const sideZ = -Math.sin(heading);
    const backX = -Math.sin(heading);
    const backZ = -Math.cos(heading);
    const cameraPosition = {
      x: position.x + sideX * 8.2 + backX * 0.8,
      y: position.y + 2.35,
      z: position.z + sideZ * 8.2 + backZ * 0.8
    };
    const lookAt = {
      x: position.x,
      y: position.y + 0.28,
      z: position.z
    };
    game.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    game.camera.lookAt(lookAt.x, lookAt.y, lookAt.z);
    game.camera.fov = 32;
    game.camera.updateProjectionMatrix();
    game.rendererSystem.render();
  });
}

async function sampleVehicleGroundingMotion(page, label) {
  return page.evaluate((sampleLabel) => {
    const game = window.__portfolioDrive.game;
    const roadY = game.world.roads?.roadGroup?.userData?.foundationMaxRoadY || 0;
    const velocity = game.vehicle.body.linvel();
    function matrixWorldY(matrix, x, y, z) {
      const e = matrix.elements;
      return e[1] * x + e[5] * y + e[9] * z + e[13];
    }
    function boundsFor(predicate) {
      let minY = Infinity;
      let maxY = -Infinity;
      let meshes = 0;
      game.vehicle.modelRoot.updateMatrixWorld(true);
      game.vehicle.modelRoot.traverse((object) => {
        if (!object.isMesh || !object.visible || !predicate(object)) return;
        const positions = object.geometry?.attributes?.position;
        if (!positions) return;
        object.updateMatrixWorld(true);
        meshes += 1;
        for (let index = 0; index < positions.count; index += 1) {
          const y = matrixWorldY(object.matrixWorld, positions.getX(index), positions.getY(index), positions.getZ(index));
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      });
      return {
        meshes,
        minY: Number(minY.toFixed(4)),
        maxY: Number(maxY.toFixed(4)),
        clearanceAboveRoad: Number((minY - roadY).toFixed(4))
      };
    }
    const position = game.vehicle.position;
    return {
      label: sampleLabel,
      speed: Number(Math.hypot(velocity.x, velocity.z).toFixed(3)),
      bodyY: Number(position.y.toFixed(4)),
      position: {
        x: Number(position.x.toFixed(2)),
        z: Number(position.z.toFixed(2))
      },
      roadY: Number(roadY.toFixed(4)),
      surface: game.world.getSurfaceInfo(position).id,
      groundedWheels: game.vehicle.controller?.groundedWheels || 0,
      bodyOnly: boundsFor((object) => (
        !object.name.startsWith('WheelSpin')
        && !object.name.startsWith('WheelFront')
        && !/Wheel/i.test(object.name)
      )),
      wheels: boundsFor((object) => (
        object.name.startsWith('WheelSpin')
        || object.name.startsWith('WheelFront')
        || /Wheel/i.test(object.name)
      )),
      wheelGrounding: game.vehicle.getWheelGroundingStats?.() || []
    };
  }, label);
}

async function exerciseVehicleBodyRoadClipping(page) {
  const segment = routeReplaySegments.find((item) => item.id === 'coastal-loop' && item.index === 6)
    || routeReplaySegments.find((item) => item.id === 'coastal-loop' && item.length > 64)
    || routeReplaySegments[0];
  const scenarios = [
    { id: 'idle', steps: [{ ms: 900, actions: {} }] },
    { id: 'driving', steps: [{ ms: 900, actions: { forward: true } }] },
    { id: 'sprinting', steps: [{ ms: 760, actions: { forward: true, boost: true } }] },
    { id: 'braking', steps: [{ ms: 750, actions: { forward: true } }, { ms: 500, actions: { forward: true, brake: true } }] },
    { id: 'burnout', steps: [{ ms: 1150, actions: { forward: true, brake: true } }] },
    { id: 'wheelie', steps: [{ ms: 1150, actions: { forward: true, brake: true } }, { ms: 620, actions: { forward: true } }] }
  ];
  const samples = [];
  const screenshots = [];
  const maskScreenshots = [];

  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    game.ui.closePanel?.();
    game.ui.closeMap?.();
    game.ui.closeMenu?.();
    game.startDriving();
    if (!game.__verifyBodyCameraUpdate) {
      game.__verifyBodyCameraUpdate = game.cameraRig.update.bind(game.cameraRig);
    }
  });

  for (const scenario of scenarios) {
    await resetVehicleBodyRoadProbe(page, segment);
    for (const step of scenario.steps) {
      await setVehicleProbeActions(page, step.actions);
      await delay(step.ms);
    }
    await setVehicleProbeActions(page, {});
    const sample = await sampleVehicleBodyRoadClipping(page, scenario.id, segment);
    await stageVehicleBodyGameplayView(page);
    const gameplayName = `vehicle-body-road-${scenario.id}-gameplay.png`;
    await screenshot(page, gameplayName);
    await stageVehicleBodySideView(page);
    const sideName = `vehicle-body-road-${scenario.id}-side.png`;
    await screenshot(page, sideName);
    const maskEvidence = await captureVehicleBodyRoadMaskSet(page, scenario.id);
    sample.maskEvidence = maskEvidence.summary;
    maskScreenshots.push(...maskEvidence.screenshots);
    samples.push(sample);
    screenshots.push(gameplayName, sideName);
  }

  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    for (const action of ['forward', 'boost', 'backward', 'brake', 'handbrake', 'left', 'right', 'jump']) {
      game.input.actions[action] = false;
    }
    game.input.joystick.x = 0;
    game.input.joystick.y = 0;
    game.input.pressed?.clear?.();
    if (game.__verifyBodyCameraUpdate) {
      game.cameraRig.update = game.__verifyBodyCameraUpdate;
      delete game.__verifyBodyCameraUpdate;
    }
    window.__portfolioDrive.respawn('landing');
  });

  const critical = samples.filter((sample) => ['driving', 'sprinting', 'braking', 'wheelie'].includes(sample.id));
  return {
    segment: {
      id: segment.id,
      index: segment.index,
      width: segment.width,
      length: Number(segment.length.toFixed(2)),
      rotation: Number(segment.rotation.toFixed(4))
    },
    samples,
    screenshots,
    maskScreenshots,
    minCriticalBodyClearance: Number(Math.min(...critical.map((sample) => sample.body.clearanceAboveRoad)).toFixed(4)),
    minCriticalPaintedBodyClearance: Number(Math.min(...critical.map((sample) => sample.paintedBody.clearanceAboveRoad)).toFixed(4)),
    minWheelClearance: Number(Math.min(...samples.map((sample) => sample.wheels.clearanceAboveRoad)).toFixed(4)),
    maxAbsLateralOffset: Number(Math.max(...samples.map((sample) => Math.abs(sample.roadPlacement.lateralOffset))).toFixed(4)),
    maxLowerBodyPixelLossRatio: Number(Math.max(...samples.map((sample) => sample.maskEvidence?.lowerBodyPixelLossRatio || 0)).toFixed(4)),
    maxBodyPixelLossRatio: Number(Math.max(...samples.map((sample) => sample.maskEvidence?.bodyPixelLossRatio || 0)).toFixed(4)),
    rootCauseCandidates: [...new Set(samples.map((sample) => sample.maskEvidence?.rootCause).filter(Boolean))]
  };
}

async function exerciseGate4B6RPrototype(page) {
  const enabled = await page.evaluate(() => window.__portfolioDrive.game.world.goalGate === 'gate-4b6r-physics-prototype');
  if (!enabled) return { enabled: false, screenshots: [] };

  const screenshots = [];
  await resetGate4B6RPrototypeRun(page, 0);
  await stageGate4B6RPrototypeView(page, 'approach');
  await screenshot(page, 'stunt-b6r-approach.png');
  screenshots.push('stunt-b6r-approach.png');

  await advanceGate4B6RPrototypeRun(page, 760, { forward: true });
  await stageGate4B6RPrototypeView(page, 'takeoff');
  await screenshot(page, 'stunt-b6r-takeoff.png');
  screenshots.push('stunt-b6r-takeoff.png');

  await advanceGate4B6RPrototypeRun(page, 620, { forward: true, boost: true });
  await stageGate4B6RPrototypeView(page, 'airtime');
  await screenshot(page, 'stunt-b6r-airtime.png');
  screenshots.push('stunt-b6r-airtime.png');

  await advanceGate4B6RPrototypeRun(page, 940, { forward: true });
  await stageGate4B6RPrototypeView(page, 'landing');
  await screenshot(page, 'stunt-b6r-landing.png');
  screenshots.push('stunt-b6r-landing.png');

  await advanceGate4B6RPrototypeRun(page, 760, { forward: true });
  await stageGate4B6RPrototypeView(page, 'recovery');
  await screenshot(page, 'stunt-b6r-recovery.png');
  screenshots.push('stunt-b6r-recovery.png');

  const route = await finalizeGate4B6RPrototypeRun(page);
  const missRecovery = await exerciseGate4B6RPrototypeMiss(page);
  await stageGate4B6RPrototypeView(page, 'failed-recovery');
  await screenshot(page, 'stunt-b6r-failed-recovery.png');
  screenshots.push('stunt-b6r-failed-recovery.png');

  await page.evaluate(() => window.__portfolioDrive.showColliders());
  await stageGate4B6RPrototypeView(page, 'debug');
  await screenshot(page, 'stunt-b6r-debug-colliders.png');
  screenshots.push('stunt-b6r-debug-colliders.png');

  const colliderEvidence = await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const colliders = window.__portfolioDrive.colliders();
    const rampCollider = colliders.find((collider) => collider.name === 'STUNTB6R_training_ramp_collider');
    const summarize = (collider) => collider ? {
      name: collider.name,
      visualName: collider.visualName || null,
      type: collider.type,
      sensor: Boolean(collider.sensor)
    } : null;
    return {
      rampVisualExists: Boolean(game.scene.getObjectByName('STUNTB6R_training_ramp')),
      rampCollider: summarize(rampCollider),
      allColliders: colliders.map((collider) => ({
        name: collider.name,
        visualName: collider.visualName || null,
        type: collider.type,
        sensor: Boolean(collider.sensor)
      }))
    };
  });

  return {
    enabled: true,
    screenshots,
    route,
    missRecovery,
    colliderEvidence
  };
}

async function resetGate4B6RPrototypeRun(page, lateralOffset) {
  return page.evaluate((offset) => {
    const game = window.__portfolioDrive.game;
    const input = game.input;
    const heading = -0.35;
    const forward = { x: Math.sin(heading), z: Math.cos(heading) };
    const right = { x: Math.cos(heading), z: -Math.sin(heading) };
    const start = { x: 60 + right.x * offset, y: 1.12, z: -96 + right.z * offset };
    const clearInput = () => {
      for (const action of ['forward', 'boost', 'backward', 'brake', 'handbrake', 'left', 'right', 'jump']) {
        input.actions[action] = false;
      }
      input.joystick.x = 0;
      input.joystick.y = 0;
      input.pressed?.clear?.();
    };
    clearInput();
    game.ui.closePanel?.();
    game.ui.closeMap?.();
    game.ui.closeMenu?.();
    game.startDriving();
    game.vehicle.respawn(start, heading);
    game.vehicle.body.setLinvel({ x: forward.x * 4.5, y: 0, z: forward.z * 4.5 }, true);
    game.vehicle.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    game.__verifyStuntPrototype = {
      heading,
      start,
      lateralOffset: offset,
      landingEventsBefore: game.vehicle.landingEvents || 0,
      samples: [],
      haltEvents: [],
      airborneFrames: 0,
      groundedAfterAirFrames: 0,
      recoveredGroundedWheels: 0,
      maxY: game.vehicle.position.y,
      minSpeedAfterLaunch: 999,
      maxSpeed: 0,
      distance: 0
    };
  }, lateralOffset);
}

async function advanceGate4B6RPrototypeRun(page, ms, actions) {
  return page.evaluate(async ({ ms, actions }) => {
    const delay = (timeout) => new Promise((resolveDelay) => setTimeout(resolveDelay, timeout));
    const game = window.__portfolioDrive.game;
    const input = game.input;
    const state = game.__verifyStuntPrototype;
    const clearInput = () => {
      for (const action of ['forward', 'boost', 'backward', 'brake', 'handbrake', 'left', 'right', 'jump']) {
        input.actions[action] = false;
      }
    };
    const sample = (label) => {
      const position = game.vehicle.position.clone();
      const start = state.start;
      const speed = game.vehicle.speed || Math.hypot(game.vehicle.body.linvel().x, game.vehicle.body.linvel().z);
      const groundedWheels = game.vehicle.controller?.groundedWheels || 0;
      const airborne = groundedWheels < 2;
      const distance = Math.hypot(position.x - start.x, position.z - start.z);
      state.maxY = Math.max(state.maxY, position.y);
      state.maxSpeed = Math.max(state.maxSpeed, speed);
      state.distance = Math.max(state.distance, distance);
      if (distance > 9) state.minSpeedAfterLaunch = Math.min(state.minSpeedAfterLaunch, speed);
      if (airborne) state.airborneFrames += 1;
      if (!airborne && state.airborneFrames > 0) {
        state.groundedAfterAirFrames += 1;
        state.recoveredGroundedWheels = Math.max(state.recoveredGroundedWheels || 0, groundedWheels);
      }
      const previous = state.samples[state.samples.length - 1];
      if (actions.forward && previous && distance > 5 && speed < 1.5 && Math.abs(distance - previous.distance) < 0.08) {
        state.haltEvents.push({
          label,
          speed: Number(speed.toFixed(2)),
          distance: Number(distance.toFixed(2)),
          position: { x: Number(position.x.toFixed(2)), z: Number(position.z.toFixed(2)) },
          groundedWheels
        });
      }
      state.samples.push({
        label,
        t: performance.now(),
        x: Number(position.x.toFixed(2)),
        y: Number(position.y.toFixed(2)),
        z: Number(position.z.toFixed(2)),
        speed: Number(speed.toFixed(2)),
        distance: Number(distance.toFixed(2)),
        surface: game.world.getSurfaceInfo(position).id,
        groundedWheels
      });
    };

    clearInput();
    for (const action of Object.keys(actions)) {
      input.actions[action] = Boolean(actions[action]);
    }
    const steps = Math.max(1, Math.ceil(ms / 80));
    for (let index = 0; index < steps; index += 1) {
      await delay(ms / steps);
      sample(`step-${index}`);
    }
    clearInput();
  }, { ms, actions });
}

async function finalizeGate4B6RPrototypeRun(page) {
  return page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const state = game.__verifyStuntPrototype || {};
    const final = game.vehicle.position.clone();
    const maxHeightDelta = (state.maxY || final.y) - (state.start?.y || final.y);
    const landingSeen = (game.vehicle.landingEvents || 0) > (state.landingEventsBefore || 0)
      || (state.airborneFrames || 0) > 0 && (state.groundedAfterAirFrames || 0) > 2;
    return {
      start: {
        x: Number((state.start?.x || 0).toFixed(2)),
        z: Number((state.start?.z || 0).toFixed(2))
      },
      final: {
        x: Number(final.x.toFixed(2)),
        y: Number(final.y.toFixed(2)),
        z: Number(final.z.toFixed(2))
      },
      distance: Number((state.distance || 0).toFixed(2)),
      maxHeightDelta: Number(maxHeightDelta.toFixed(2)),
      maxSpeed: Number((state.maxSpeed || 0).toFixed(2)),
      minSpeedAfterLaunch: Number((state.minSpeedAfterLaunch === 999 ? 0 : state.minSpeedAfterLaunch || 0).toFixed(2)),
      airborneFrames: state.airborneFrames || 0,
      groundedAfterAirFrames: state.groundedAfterAirFrames || 0,
      recoveredGroundedWheels: state.recoveredGroundedWheels || 0,
      landingSeen,
      finalGroundedWheels: game.vehicle.controller?.groundedWheels || 0,
      finalSurface: game.world.getSurfaceInfo(final).id,
      halts: (state.haltEvents || []).length,
      haltEvents: state.haltEvents || [],
      samples: state.samples || []
    };
  });
}

async function exerciseGate4B6RPrototypeMiss(page) {
  await resetGate4B6RPrototypeRun(page, 7.2);
  await advanceGate4B6RPrototypeRun(page, 1900, { forward: true });
  await advanceGate4B6RPrototypeRun(page, 700, { forward: true, brake: true });
  const result = await finalizeGate4B6RPrototypeRun(page);
  return {
    ...result,
    recoverable: result.halts === 0
      && result.finalSurface !== 'water'
      && Math.max(result.finalGroundedWheels || 0, result.recoveredGroundedWheels || 0) >= 2
      && result.distance > 12
  };
}

async function stageGate4B6RPrototypeView(page, mode) {
  await page.evaluate((viewMode) => {
    const game = window.__portfolioDrive.game;
    const heading = -0.35;
    const forward = { x: Math.sin(heading), z: Math.cos(heading) };
    const right = { x: Math.cos(heading), z: -Math.sin(heading) };
    const target = game.vehicle.position.clone();
    const leadByMode = {
      airtime: 2.5,
      landing: 4.5,
      recovery: 5.5,
      'failed-recovery': 5.5
    };
    const lead = leadByMode[viewMode] || 0;
    target.x += forward.x * lead;
    target.z += forward.z * lead;
    target.y += 1.1;
    const cameraPosition = target.clone();
    const moveCamera = (side, ahead, up) => {
      cameraPosition.x += right.x * side + forward.x * ahead;
      cameraPosition.z += right.z * side + forward.z * ahead;
      cameraPosition.y += up;
    };
    if (viewMode === 'debug') {
      target.set(52, 1.2, -72);
      cameraPosition.set(78, 18, -104);
    } else if (viewMode === 'approach') {
      moveCamera(13, -11, 6.6);
    } else if (viewMode === 'takeoff') {
      moveCamera(12, -6, 5.2);
    } else if (viewMode === 'airtime') {
      moveCamera(15, -3, 6.2);
    } else if (viewMode === 'landing') {
      moveCamera(14, 3, 5.4);
    } else {
      moveCamera(14, 7, 6.2);
    }
    game.cameraRig.setCinematic(cameraPosition, target, 42);
    game.cameraRig.smoothedTarget.copy(target);
    game.camera.position.copy(cameraPosition);
    game.camera.fov = 42;
    game.camera.updateProjectionMatrix();
    game.camera.lookAt(target);
    game.rendererSystem.render();
  }, mode);
  await delay(70);
}

async function exerciseGate4B6RFullPlayground(page) {
  const enabled = await page.evaluate(() => window.__portfolioDrive.game.world.goalGate === 'gate-4b6r-full-stunt-playground');
  if (!enabled) return { enabled: false, screenshots: [] };

  const screenshots = [];
  const lineResults = {};
  const lines = gate4B6RFullVerifierLines();
  for (const line of lines) {
    await resetGate4B6RLineRun(page, line, 0);
    await stageGate4B6RLineView(page, line, 'approach');
    await screenshot(page, `stunt-b6r-full-${line.id}-approach.png`);
    screenshots.push(`stunt-b6r-full-${line.id}-approach.png`);

    await advanceGate4B6RLineRun(page, line.approachMs, { forward: true });
    await stageGate4B6RLineView(page, line, 'takeoff');
    await screenshot(page, `stunt-b6r-full-${line.id}-takeoff.png`);
    screenshots.push(`stunt-b6r-full-${line.id}-takeoff.png`);

    await advanceGate4B6RLineRun(page, line.launchMs, { forward: true, boost: line.boost });
    await stageGate4B6RLineView(page, line, 'air');
    await screenshot(page, `stunt-b6r-full-${line.id}-air.png`);
    screenshots.push(`stunt-b6r-full-${line.id}-air.png`);

    await advanceGate4B6RLineRun(page, line.recoveryMs, { forward: true });
    await stageGate4B6RLineView(page, line, 'landing');
    await screenshot(page, `stunt-b6r-full-${line.id}-landing.png`);
    screenshots.push(`stunt-b6r-full-${line.id}-landing.png`);
    lineResults[line.id] = await finalizeGate4B6RLineRun(page);
  }

  const freePlay = await exerciseGate4B6RFreePlay(page);
  await stageGate4B6RFreePlayView(page);
  await screenshot(page, 'stunt-b6r-full-freeplay.png');
  screenshots.push('stunt-b6r-full-freeplay.png');

  const missRecovery = await exerciseGate4B6RFullMiss(page);
  await stageGate4B6RLineView(page, lines.find((line) => line.id === 'risk'), 'miss');
  await screenshot(page, 'stunt-b6r-full-risk-miss-recovery.png');
  screenshots.push('stunt-b6r-full-risk-miss-recovery.png');

  await page.evaluate(() => window.__portfolioDrive.showColliders());
  await stageGate4B6RDebugView(page);
  await screenshot(page, 'stunt-b6r-full-debug-colliders.png');
  screenshots.push('stunt-b6r-full-debug-colliders.png');

  const colliderEvidence = await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const colliders = window.__portfolioDrive.colliders()
      .filter((collider) => collider.name.startsWith('STUNTB6R_'))
      .map((collider) => ({
        name: collider.name,
        visualName: collider.visualName || null,
        type: collider.type,
        sensor: Boolean(collider.sensor),
        visualExists: Boolean(collider.visualName && game.scene.getObjectByName(collider.visualName))
      }));
    return {
      colliders,
      missingVisuals: colliders.filter((collider) => !collider.visualExists).map((collider) => collider.name)
    };
  });

  return {
    enabled: true,
    screenshots,
    lines: lineResults,
    freePlay,
    missRecovery,
    colliderEvidence
  };
}

function gate4B6RFullVerifierLines() {
  return [
    { id: 'beginner', start: { x: 60, y: 1.12, z: -96 }, heading: -0.35, approachMs: 760, launchMs: 620, recoveryMs: 940, boost: true, minDistance: 32, minHeight: 0.3, minAirborne: 2 },
    { id: 'parkour', start: { x: 68, y: 1.12, z: -97 }, heading: -0.48, approachMs: 940, launchMs: 880, recoveryMs: 1320, boost: true, minDistance: 50, minHeight: 0.28, minAirborne: 2 },
    { id: 'precision', start: { x: 78, y: 1.12, z: -98 }, heading: -0.67, approachMs: 840, launchMs: 760, recoveryMs: 1040, boost: false, minDistance: 34, minHeight: 0.24, minAirborne: 1 },
    { id: 'risk', start: { x: 86, y: 1.12, z: -94 }, heading: -0.52, approachMs: 980, launchMs: 940, recoveryMs: 1260, boost: true, minDistance: 52, minHeight: 0.45, minAirborne: 2 }
  ];
}

async function resetGate4B6RLineRun(page, line, lateralOffset) {
  return page.evaluate(({ line, lateralOffset }) => {
    const game = window.__portfolioDrive.game;
    const input = game.input;
    const heading = line.heading;
    const forward = { x: Math.sin(heading), z: Math.cos(heading) };
    const right = { x: Math.cos(heading), z: -Math.sin(heading) };
    const start = {
      x: line.start.x + right.x * lateralOffset,
      y: line.start.y,
      z: line.start.z + right.z * lateralOffset
    };
    for (const action of ['forward', 'boost', 'backward', 'brake', 'handbrake', 'left', 'right', 'jump']) {
      input.actions[action] = false;
    }
    input.joystick.x = 0;
    input.joystick.y = 0;
    input.pressed?.clear?.();
    game.ui.closePanel?.();
    game.ui.closeMap?.();
    game.ui.closeMenu?.();
    game.startDriving();
    game.vehicle.respawn(start, heading);
    game.vehicle.body.setLinvel({ x: forward.x * 5.2, y: 0, z: forward.z * 5.2 }, true);
    game.vehicle.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    game.__verifyStuntLine = {
      id: line.id,
      heading,
      start,
      landingEventsBefore: game.vehicle.landingEvents || 0,
      samples: [],
      haltEvents: [],
      airborneFrames: 0,
      groundedAfterAirFrames: 0,
      recoveredGroundedWheels: 0,
      maxY: game.vehicle.position.y,
      minSpeedAfterLaunch: 999,
      maxSpeed: 0,
      distance: 0
    };
  }, { line, lateralOffset });
}

async function advanceGate4B6RLineRun(page, ms, actions) {
  return page.evaluate(async ({ ms, actions }) => {
    const delay = (timeout) => new Promise((resolveDelay) => setTimeout(resolveDelay, timeout));
    const game = window.__portfolioDrive.game;
    const input = game.input;
    const state = game.__verifyStuntLine;
    const clearInput = () => {
      for (const action of ['forward', 'boost', 'backward', 'brake', 'handbrake', 'left', 'right', 'jump']) {
        input.actions[action] = false;
      }
    };
    const sample = (label) => {
      const position = game.vehicle.position.clone();
      const start = state.start;
      const speed = game.vehicle.speed || Math.hypot(game.vehicle.body.linvel().x, game.vehicle.body.linvel().z);
      const groundedWheels = game.vehicle.controller?.groundedWheels || 0;
      const distance = Math.hypot(position.x - start.x, position.z - start.z);
      const airborne = groundedWheels < 2;
      state.maxY = Math.max(state.maxY, position.y);
      state.maxSpeed = Math.max(state.maxSpeed, speed);
      state.distance = Math.max(state.distance, distance);
      if (distance > 9) state.minSpeedAfterLaunch = Math.min(state.minSpeedAfterLaunch, speed);
      if (airborne) state.airborneFrames += 1;
      if (!airborne && state.airborneFrames > 0) {
        state.groundedAfterAirFrames += 1;
        state.recoveredGroundedWheels = Math.max(state.recoveredGroundedWheels || 0, groundedWheels);
      }
      const previous = state.samples[state.samples.length - 1];
      if (actions.forward && previous && distance > 5 && speed < 1.5 && Math.abs(distance - previous.distance) < 0.08) {
        state.haltEvents.push({
          label,
          speed: Number(speed.toFixed(2)),
          distance: Number(distance.toFixed(2)),
          position: { x: Number(position.x.toFixed(2)), z: Number(position.z.toFixed(2)) },
          groundedWheels
        });
      }
      state.samples.push({
        label,
        t: performance.now(),
        x: Number(position.x.toFixed(2)),
        y: Number(position.y.toFixed(2)),
        z: Number(position.z.toFixed(2)),
        speed: Number(speed.toFixed(2)),
        distance: Number(distance.toFixed(2)),
        surface: game.world.getSurfaceInfo(position).id,
        groundedWheels
      });
    };

    clearInput();
    for (const action of Object.keys(actions)) {
      input.actions[action] = Boolean(actions[action]);
    }
    const steps = Math.max(1, Math.ceil(ms / 80));
    for (let index = 0; index < steps; index += 1) {
      await delay(ms / steps);
      sample(`step-${index}`);
    }
    clearInput();
  }, { ms, actions });
}

async function finalizeGate4B6RLineRun(page) {
  return page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const state = game.__verifyStuntLine || {};
    const final = game.vehicle.position.clone();
    const maxHeightDelta = (state.maxY || final.y) - (state.start?.y || final.y);
    const landingSeen = (game.vehicle.landingEvents || 0) > (state.landingEventsBefore || 0)
      || (state.airborneFrames || 0) > 0 && (state.groundedAfterAirFrames || 0) > 2;
    return {
      start: {
        x: Number((state.start?.x || 0).toFixed(2)),
        z: Number((state.start?.z || 0).toFixed(2))
      },
      final: {
        x: Number(final.x.toFixed(2)),
        y: Number(final.y.toFixed(2)),
        z: Number(final.z.toFixed(2))
      },
      distance: Number((state.distance || 0).toFixed(2)),
      maxHeightDelta: Number(maxHeightDelta.toFixed(2)),
      maxSpeed: Number((state.maxSpeed || 0).toFixed(2)),
      minSpeedAfterLaunch: Number((state.minSpeedAfterLaunch === 999 ? 0 : state.minSpeedAfterLaunch || 0).toFixed(2)),
      airborneFrames: state.airborneFrames || 0,
      groundedAfterAirFrames: state.groundedAfterAirFrames || 0,
      recoveredGroundedWheels: state.recoveredGroundedWheels || 0,
      landingSeen,
      finalGroundedWheels: game.vehicle.controller?.groundedWheels || 0,
      finalSurface: game.world.getSurfaceInfo(final).id,
      halts: (state.haltEvents || []).length,
      haltEvents: state.haltEvents || [],
      samples: state.samples || []
    };
  });
}

async function exerciseGate4B6RFreePlay(page) {
  const line = { id: 'freeplay', start: { x: 78, y: 1.12, z: -66 }, heading: 1.18 };
  await resetGate4B6RLineRun(page, line, 0);
  await advanceGate4B6RLineRun(page, 760, { forward: true });
  await advanceGate4B6RLineRun(page, 600, { forward: true, handbrake: true, left: true });
  const result = await finalizeGate4B6RLineRun(page);
  return {
    ...result,
    playable: result.halts === 0 && result.distance > 12 && result.finalSurface !== 'water'
  };
}

async function exerciseGate4B6RFullMiss(page) {
  const risk = gate4B6RFullVerifierLines().find((line) => line.id === 'risk');
  await resetGate4B6RLineRun(page, risk, 8.5);
  await advanceGate4B6RLineRun(page, 1700, { forward: true });
  await advanceGate4B6RLineRun(page, 720, { forward: true, brake: true });
  const result = await finalizeGate4B6RLineRun(page);
  return {
    ...result,
    recoverable: result.halts === 0
      && result.finalSurface !== 'water'
      && Math.max(result.finalGroundedWheels || 0, result.recoveredGroundedWheels || 0) >= 2
      && result.distance > 16
  };
}

async function stageGate4B6RLineView(page, line, mode) {
  await page.evaluate(({ line, mode }) => {
    const game = window.__portfolioDrive.game;
    const heading = line.heading;
    const forward = { x: Math.sin(heading), z: Math.cos(heading) };
    const right = { x: Math.cos(heading), z: -Math.sin(heading) };
    const target = game.vehicle.position.clone();
    const leadByMode = { air: 3.5, landing: 5.5, miss: 4.5 };
    const lead = leadByMode[mode] || 0;
    target.x += forward.x * lead;
    target.z += forward.z * lead;
    target.y += 1.1;
    const cameraPosition = target.clone();
    const sideByMode = mode === 'approach' ? 14 : mode === 'takeoff' ? 13 : 15;
    const aheadByMode = mode === 'approach' ? -12 : mode === 'takeoff' ? -6 : mode === 'air' ? -2 : 5;
    const upByMode = mode === 'air' ? 6.8 : 5.8;
    cameraPosition.x += right.x * sideByMode + forward.x * aheadByMode;
    cameraPosition.z += right.z * sideByMode + forward.z * aheadByMode;
    cameraPosition.y += upByMode;
    game.cameraRig.setCinematic(cameraPosition, target, 42);
    game.cameraRig.smoothedTarget.copy(target);
    game.camera.position.copy(cameraPosition);
    game.camera.fov = 42;
    game.camera.updateProjectionMatrix();
    game.camera.lookAt(target);
    game.rendererSystem.render();
  }, { line, mode });
  await delay(70);
}

async function stageGate4B6RFreePlayView(page) {
  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const target = game.vehicle.position.clone();
    target.y += 1.2;
    const cameraPosition = target.clone();
    cameraPosition.x -= 13;
    cameraPosition.y += 7;
    cameraPosition.z -= 10;
    game.cameraRig.setCinematic(cameraPosition, target, 44);
    game.cameraRig.smoothedTarget.copy(target);
    game.camera.position.copy(cameraPosition);
    game.camera.fov = 44;
    game.camera.updateProjectionMatrix();
    game.camera.lookAt(target);
    game.rendererSystem.render();
  });
  await delay(70);
}

async function stageGate4B6RDebugView(page) {
  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const target = game.vehicle.position.clone().set(74, 1.2, -70);
    const cameraPosition = game.vehicle.position.clone().set(112, 32, -128);
    game.cameraRig.setCinematic(cameraPosition, target, 50);
    game.cameraRig.smoothedTarget.copy(target);
    game.camera.position.copy(cameraPosition);
    game.camera.fov = 50;
    game.camera.updateProjectionMatrix();
    game.camera.lookAt(target);
    game.rendererSystem.render();
  });
  await delay(70);
}

async function captureVehicleBodyRoadMaskSet(page, scenarioId) {
  const modes = [
    { id: 'car', label: 'car-only' },
    { id: 'road', label: 'road-only' },
    { id: 'road-car', label: 'road-car' },
    { id: 'wheels', label: 'wheels-only' },
    { id: 'terrain-road', label: 'terrain-road' }
  ];
  const metrics = {};
  const screenshots = [];
  const frame = await page.evaluate(captureVehicleBodyRoadFrame);

  for (const mode of modes) {
    await page.evaluate(restoreVehicleBodyRoadFrame, { frame, freezeMotion: true });
    metrics[mode.id] = await page.evaluate(applyVehicleBodyRoadMask, mode.id);
    const name = `vehicle-body-road-${scenarioId}-mask-${mode.label}.png`;
    await screenshot(page, name);
    screenshots.push(name);
    await page.evaluate(restoreVehicleBodyRoadMask);
  }
  await page.evaluate(restoreVehicleBodyRoadFrame, { frame, freezeMotion: false });

  return {
    screenshots,
    summary: summarizeVehicleBodyRoadMasks(metrics)
  };
}

function captureVehicleBodyRoadFrame() {
  const game = window.__portfolioDrive.game;
  const body = game.vehicle.body;
  const translation = body.translation();
  const rotation = body.rotation();
  const linvel = body.linvel();
  const angvel = body.angvel();
  return {
    translation: { x: translation.x, y: translation.y, z: translation.z },
    rotation: { x: rotation.x, y: rotation.y, z: rotation.z, w: rotation.w },
    linvel: { x: linvel.x, y: linvel.y, z: linvel.z },
    angvel: { x: angvel.x, y: angvel.y, z: angvel.z },
    cameraPosition: {
      x: game.camera.position.x,
      y: game.camera.position.y,
      z: game.camera.position.z
    },
    cameraQuaternion: {
      x: game.camera.quaternion.x,
      y: game.camera.quaternion.y,
      z: game.camera.quaternion.z,
      w: game.camera.quaternion.w
    },
    cameraFov: game.camera.fov,
    cameraRigFrozen: Boolean(game.__verifyBodyCameraUpdate)
  };
}

function restoreVehicleBodyRoadFrame({ frame, freezeMotion }) {
  const game = window.__portfolioDrive.game;
  game.vehicle.body.setTranslation(frame.translation, true);
  game.vehicle.body.setRotation(frame.rotation, true);
  game.vehicle.body.setLinvel(freezeMotion ? { x: 0, y: 0, z: 0 } : frame.linvel, true);
  game.vehicle.body.setAngvel(freezeMotion ? { x: 0, y: 0, z: 0 } : frame.angvel, true);
  game.vehicle.syncModel?.();
  game.camera.position.set(frame.cameraPosition.x, frame.cameraPosition.y, frame.cameraPosition.z);
  game.camera.quaternion.set(frame.cameraQuaternion.x, frame.cameraQuaternion.y, frame.cameraQuaternion.z, frame.cameraQuaternion.w);
  game.camera.fov = frame.cameraFov;
  game.camera.updateProjectionMatrix();
  if (frame.cameraRigFrozen) game.cameraRig.update = () => {};
  game.rendererSystem.render();
}

function summarizeVehicleBodyRoadMasks(metrics) {
  const car = metrics.car || {};
  const combined = metrics['road-car'] || {};
  const wheels = metrics.wheels || {};
  const bodyPixels = car.bodyPixels || 0;
  const combinedBodyPixels = combined.bodyPixels || 0;
  const lowerBodyPixels = car.lowerBodyPixels || 0;
  const combinedLowerBodyPixels = combined.lowerBodyPixels || 0;
  const wheelPixels = wheels.wheelPixels || car.wheelPixels || 0;
  const combinedWheelPixels = combined.wheelPixels || 0;
  const bodyPixelLoss = Math.max(0, bodyPixels - combinedBodyPixels);
  const lowerBodyPixelLoss = Math.max(0, lowerBodyPixels - combinedLowerBodyPixels);
  const wheelPixelLoss = Math.max(0, wheelPixels - combinedWheelPixels);
  const bodyPixelLossRatio = bodyPixels > 0 ? bodyPixelLoss / bodyPixels : 0;
  const lowerBodyPixelLossRatio = lowerBodyPixels > 0 ? lowerBodyPixelLoss / lowerBodyPixels : 0;
  const wheelPixelLossRatio = wheelPixels > 0 ? wheelPixelLoss / wheelPixels : 0;
  const roadRenderOcclusion = lowerBodyPixelLossRatio > 0.035 || bodyPixelLossRatio > 0.08;
  const rootCause = roadRenderOcclusion
    ? 'road-render-occlusion'
    : bodyPixels <= 0 || lowerBodyPixels <= 0
      ? 'mask-diagnostic-inconclusive'
      : 'no-road-render-occlusion-detected';

  return {
    rootCause,
    roadRenderOcclusion,
    bodyPixels,
    combinedBodyPixels,
    bodyPixelLoss,
    bodyPixelLossRatio: Number(bodyPixelLossRatio.toFixed(4)),
    lowerBodyPixels,
    combinedLowerBodyPixels,
    lowerBodyPixelLoss,
    lowerBodyPixelLossRatio: Number(lowerBodyPixelLossRatio.toFixed(4)),
    wheelPixels,
    combinedWheelPixels,
    wheelPixelLoss,
    wheelPixelLossRatio: Number(wheelPixelLossRatio.toFixed(4)),
    carBodyBounds: car.bodyBounds || null,
    combinedBodyBounds: combined.bodyBounds || null,
    roadPixels: metrics.road?.roadPixels || 0,
    combinedRoadPixels: combined.roadPixels || 0
  };
}

function applyVehicleBodyRoadMask(mode) {
  const game = window.__portfolioDrive.game;
  const scene = game.scene;
  const renderer = game.renderer;
  const vehicleGroup = game.vehicle.group;
  const roadGroup = game.world.roads?.roadGroup;
  const MeshBasicMaterial = game.world.materials.roadLine.constructor;
  const Color = game.world.materials.roadLine.color.constructor;
  const materialCache = new Map();
  const records = [];
  const postprocessingEnabled = game.rendererSystem.postprocessingEnabled;
  const background = scene.background;
  const toneMappingExposure = renderer.toneMappingExposure;

  function hasAncestor(object, ancestor) {
    if (!ancestor) return false;
    let current = object;
    while (current) {
      if (current === ancestor) return true;
      current = current.parent;
    }
    return false;
  }

  function hasAncestorNamePrefix(object, prefix) {
    let current = object;
    while (current) {
      if ((current.name || '').startsWith(prefix)) return true;
      current = current.parent;
    }
    return false;
  }

  function isRenderable(object) {
    return object.isMesh || object.isInstancedMesh || object.isPoints;
  }

  function isWheelObject(object) {
    return hasAncestorNamePrefix(object, 'WheelSpin') || hasAncestorNamePrefix(object, 'WheelFront') || /Wheel/i.test(object.name || '');
  }

  function maskMaterial(color, source, side = source?.side ?? 0) {
    const depthWrite = source?.depthWrite ?? true;
    const depthTest = source?.depthTest ?? true;
    const polygonOffset = source?.polygonOffset ?? false;
    const polygonOffsetFactor = source?.polygonOffsetFactor ?? 0;
    const polygonOffsetUnits = source?.polygonOffsetUnits ?? 0;
    const key = `${color}:${side}:${depthWrite ? 1 : 0}:${depthTest ? 1 : 0}:${polygonOffset ? 1 : 0}:${polygonOffsetFactor}:${polygonOffsetUnits}`;
    if (materialCache.has(key)) return materialCache.get(key);
    const material = new MeshBasicMaterial({
      color,
      depthTest,
      depthWrite,
      side
    });
    material.polygonOffset = polygonOffset;
    material.polygonOffsetFactor = polygonOffsetFactor;
    material.polygonOffsetUnits = polygonOffsetUnits;
    materialCache.set(key, material);
    return material;
  }

  scene.traverse((object) => {
    if (!isRenderable(object)) return;
    const originalMaterial = Array.isArray(object.material) ? object.material[0] : object.material;
    records.push({
      object,
      visible: object.visible,
      material: object.material,
      renderOrder: object.renderOrder,
      frustumCulled: object.frustumCulled
    });
    const inVehicle = hasAncestor(object, vehicleGroup);
    const inRoad = hasAncestor(object, roadGroup);
    const inTerrain = hasAncestorNamePrefix(object, 'ToyIsland');
    const wheel = inVehicle && isWheelObject(object);
    const body = inVehicle && !wheel;
    const showBody = (mode === 'car' || mode === 'road-car') && body;
    const showWheel = (mode === 'car' || mode === 'road-car' || mode === 'wheels') && wheel;
    const showRoad = (mode === 'road' || mode === 'road-car' || mode === 'terrain-road') && inRoad;
    const showTerrain = mode === 'terrain-road' && inTerrain;
    object.visible = showBody || showWheel || showRoad || showTerrain;
    object.frustumCulled = false;
    if (showBody) object.material = maskMaterial(0xff00ff, originalMaterial);
    if (showWheel) object.material = maskMaterial(0xffff00, originalMaterial);
    if (showRoad) object.material = maskMaterial(0x00ffff, originalMaterial, 2);
    if (showTerrain) object.material = maskMaterial(0x00ff00, originalMaterial, 2);
  });

  game.__vehicleBodyRoadMaskState = {
    records,
    postprocessingEnabled,
    background,
    toneMappingExposure
  };
  game.rendererSystem.postprocessingEnabled = false;
  scene.background = new Color(0x000000);
  renderer.toneMappingExposure = 1;
  renderer.render(scene, game.camera);

  const gl = renderer.getContext();
  const width = renderer.domElement.width;
  const height = renderer.domElement.height;
  const pixels = new Uint8Array(width * height * 4);
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  function samplePixels() {
    const stats = {
      mode,
      width,
      height,
      bodyPixels: 0,
      lowerBodyPixels: 0,
      wheelPixels: 0,
      roadPixels: 0,
      terrainPixels: 0,
      bodyBounds: null,
      wheelBounds: null,
      roadBounds: null
    };
    const bodyBounds = createBounds();
    const wheelBounds = createBounds();
    const roadBounds = createBounds();

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const offset = (y * width + x) * 4;
        const r = pixels[offset];
        const g = pixels[offset + 1];
        const b = pixels[offset + 2];
        if (isBodyPixel(r, g, b)) {
          stats.bodyPixels += 1;
          updateBounds(bodyBounds, x, y);
        } else if (isWheelPixel(r, g, b)) {
          stats.wheelPixels += 1;
          updateBounds(wheelBounds, x, y);
        } else if (isRoadPixel(r, g, b)) {
          stats.roadPixels += 1;
          updateBounds(roadBounds, x, y);
        } else if (isTerrainPixel(r, g, b)) {
          stats.terrainPixels += 1;
        }
      }
    }

    stats.bodyBounds = finalizeBounds(bodyBounds);
    stats.wheelBounds = finalizeBounds(wheelBounds);
    stats.roadBounds = finalizeBounds(roadBounds);
    if (stats.bodyBounds) {
      const lowerLimit = Math.floor((stats.bodyBounds.minY + stats.bodyBounds.maxY) / 2);
      for (let y = stats.bodyBounds.minY; y <= lowerLimit; y += 1) {
        for (let x = stats.bodyBounds.minX; x <= stats.bodyBounds.maxX; x += 1) {
          const offset = (y * width + x) * 4;
          if (isBodyPixel(pixels[offset], pixels[offset + 1], pixels[offset + 2])) {
            stats.lowerBodyPixels += 1;
          }
        }
      }
    }
    return stats;
  }

  function createBounds() {
    return { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  }

  function updateBounds(bounds, x, y) {
    bounds.minX = Math.min(bounds.minX, x);
    bounds.minY = Math.min(bounds.minY, y);
    bounds.maxX = Math.max(bounds.maxX, x);
    bounds.maxY = Math.max(bounds.maxY, y);
  }

  function finalizeBounds(bounds) {
    if (!Number.isFinite(bounds.minX)) return null;
    return bounds;
  }

  function isBodyPixel(r, g, b) {
    return r > 140 && b > 130 && g < 115;
  }

  function isWheelPixel(r, g, b) {
    return r > 140 && g > 120 && b < 120;
  }

  function isRoadPixel(r, g, b) {
    return g > 120 && b > 120 && r < 120;
  }

  function isTerrainPixel(r, g, b) {
    return g > 120 && r < 120 && b < 120;
  }

  return samplePixels();
}

function restoreVehicleBodyRoadMask() {
  const game = window.__portfolioDrive.game;
  const state = game.__vehicleBodyRoadMaskState;
  if (!state) return;
  for (const record of state.records) {
    record.object.visible = record.visible;
    record.object.material = record.material;
    record.object.renderOrder = record.renderOrder;
    record.object.frustumCulled = record.frustumCulled;
  }
  game.rendererSystem.postprocessingEnabled = state.postprocessingEnabled;
  game.scene.background = state.background;
  game.renderer.toneMappingExposure = state.toneMappingExposure;
  delete game.__vehicleBodyRoadMaskState;
  game.rendererSystem.render();
}

async function resetVehicleBodyRoadProbe(page, segment) {
  await page.evaluate((roadSegment) => {
    const game = window.__portfolioDrive.game;
    if (game.__verifyBodyCameraUpdate) game.cameraRig.update = game.__verifyBodyCameraUpdate;
    for (const action of ['forward', 'boost', 'backward', 'brake', 'handbrake', 'left', 'right', 'jump']) {
      game.input.actions[action] = false;
    }
    game.input.joystick.x = 0;
    game.input.joystick.y = 0;
    game.input.pressed?.clear?.();
    const offset = Math.max(6, roadSegment.length / 2 - 10);
    const start = {
      x: roadSegment.cx - Math.sin(roadSegment.rotation) * offset,
      y: 1.12,
      z: roadSegment.cz - Math.cos(roadSegment.rotation) * offset
    };
    game.vehicle.respawn(start, roadSegment.rotation);
    game.vehicle.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    game.vehicle.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
  }, segment);
  await delay(700);
}

async function setVehicleProbeActions(page, actions) {
  await page.evaluate((nextActions) => {
    const game = window.__portfolioDrive.game;
    for (const action of ['forward', 'boost', 'backward', 'brake', 'handbrake', 'left', 'right', 'jump']) {
      game.input.actions[action] = Boolean(nextActions[action]);
    }
  }, actions);
}

async function stageVehicleBodyGameplayView(page) {
  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    if (game.__verifyBodyCameraUpdate) game.cameraRig.update = game.__verifyBodyCameraUpdate;
    game.camera.fov = game.cameraRig.baseFov;
    game.camera.updateProjectionMatrix();
    game.rendererSystem.render();
  });
  await delay(250);
}

async function stageVehicleBodySideView(page) {
  await page.evaluate(() => {
    const game = window.__portfolioDrive.game;
    const position = game.vehicle.position;
    const heading = game.vehicle.heading || 0;
    const sideX = Math.cos(heading);
    const sideZ = -Math.sin(heading);
    game.cameraRig.update = () => {};
    game.camera.position.set(
      position.x + sideX * 14.6,
      position.y + 2.05,
      position.z + sideZ * 14.6
    );
    game.camera.lookAt(position.x, position.y + 0.08, position.z);
    game.camera.fov = 34;
    game.camera.updateProjectionMatrix();
    game.rendererSystem.render();
  });
}

async function sampleVehicleBodyRoadClipping(page, label, segment) {
  return page.evaluate(({ sampleLabel, roadSegment }) => {
    const game = window.__portfolioDrive.game;
    const roadY = game.world.roads?.roadGroup?.userData?.foundationMaxRoadY || 0;
    const velocity = game.vehicle.body.linvel();
    const position = game.vehicle.position;
    const dx = position.x - roadSegment.cx;
    const dz = position.z - roadSegment.cz;
    const lateralOffset = Math.cos(roadSegment.rotation) * dx - Math.sin(roadSegment.rotation) * dz;
    const longitudinalOffset = Math.sin(roadSegment.rotation) * dx + Math.cos(roadSegment.rotation) * dz;

    function matrixWorldY(matrix, x, y, z) {
      const e = matrix.elements;
      return e[1] * x + e[5] * y + e[9] * z + e[13];
    }

    function boundsFor(predicate) {
      let minY = Infinity;
      let maxY = -Infinity;
      let meshes = 0;
      const names = [];
      game.vehicle.modelRoot.updateMatrixWorld(true);
      game.vehicle.modelRoot.traverse((object) => {
        if (!object.isMesh || !object.visible || !predicate(object)) return;
        const positions = object.geometry?.attributes?.position;
        if (!positions) return;
        object.updateMatrixWorld(true);
        meshes += 1;
        if (names.length < 12) names.push(object.name);
        const stride = Math.max(1, Math.floor(positions.count / 240));
        for (let index = 0; index < positions.count; index += stride) {
          const y = matrixWorldY(object.matrixWorld, positions.getX(index), positions.getY(index), positions.getZ(index));
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      });
      return {
        meshes,
        names,
        minY: Number(minY.toFixed(4)),
        maxY: Number(maxY.toFixed(4)),
        clearanceAboveRoad: Number((minY - roadY).toFixed(4))
      };
    }

    const isWheel = (object) => (
      object.name.startsWith('WheelSpin')
      || object.name.startsWith('WheelFront')
      || /Wheel/i.test(object.name)
    );
    const isBody = (object) => !isWheel(object);
    const isPaintedBody = (object) => {
      if (isWheel(object)) return false;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      return materials.some((material) => {
        const color = material?.color;
        return color && color.r > 0.22 && color.g < 0.22 && color.b < 0.18;
      });
    };

    return {
      id: sampleLabel,
      speed: Number(Math.hypot(velocity.x, velocity.z).toFixed(3)),
      position: {
        x: Number(position.x.toFixed(2)),
        y: Number(position.y.toFixed(4)),
        z: Number(position.z.toFixed(2))
      },
      surface: game.world.getSurfaceInfo(position).id,
      roadY: Number(roadY.toFixed(4)),
      groundedWheels: game.vehicle.controller?.groundedWheels || 0,
      driveState: game.vehicle.controller?.driveState || null,
      roadPlacement: {
        lateralOffset: Number(lateralOffset.toFixed(4)),
        longitudinalOffset: Number(longitudinalOffset.toFixed(4)),
        halfWidth: Number((roadSegment.width / 2).toFixed(4))
      },
      body: boundsFor(isBody),
      paintedBody: boundsFor(isPaintedBody),
      wheels: boundsFor(isWheel),
      wheelGrounding: game.vehicle.getWheelGroundingStats?.() || [],
      bodyRideHeight: game.vehicle.getBodyVisualRideHeightStats?.() || null
    };
  }, { sampleLabel: label, roadSegment: segment });
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
      gate4b1: game.world.setPieces?.getGate4B1Stats?.() || {},
      gate4b2: game.world.setPieces?.getGate4B2Stats?.() || {},
      gate4b3: game.world.setPieces?.getGate4B3Stats?.() || {},
      gate4b4: game.world.setPieces?.getGate4B4Stats?.() || {},
      gate4b5: game.world.setPieces?.getGate4B5Stats?.() || {},
      gate4b6: game.world.setPieces?.getGate4B6Stats?.() || {},
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
  if (result.vehicleChassisGroundContact?.total !== routeReplaySegments.length) {
    failures.push(`vehicle chassis contact probe count mismatch: ${result.vehicleChassisGroundContact?.total}/${routeReplaySegments.length}`);
  }
  if ((result.vehicleChassisGroundContact?.eventCount || 0) !== 0) {
    const events = (result.vehicleChassisGroundContact.events || [])
      .slice(0, 3)
      .map((event) => `${event.id}[${event.index}] ${event.contacts.map((contact) => contact.collider).join('+')} bottom=${event.ballastBottomY}`)
      .join(', ');
    failures.push(`vehicle chassis contact probe failed: contacts=${result.vehicleChassisGroundContact.eventCount}${events ? ` (${events})` : ''}`);
  }
  assertVehicleGroundingMotion(result, failures);
  assertVehicleBodyRoadClipping(result, failures);
  if (result.goalGate === 'gate-4b6r-physics-prototype') {
    assertGate4B6RPhysicsPrototypeVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4b6r-full-stunt-playground') {
    assertGate4B6RFullPlaygroundVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4b6-stunt-cove') {
    assertGate4B6StuntCoveVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4br-composition-correction') {
    assertGate4BRCompositionCorrectionVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4c-b1-south-run-replacements') {
    assertGate4CB1SouthRunReplacementVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4c-b2-gallery-side-replacements') {
    assertGate4CB2GallerySideReplacementVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4c-b3-west-service-replacements') {
    assertGate4CB3WestServiceReplacementVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4c-b4-signal-harbor-replacement') {
    assertGate4CB4SignalHarborReplacementVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4c-b5-north-ridge-replacements') {
    assertGate4CB5NorthRidgeReplacementVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4c-b6-todo-planning-studio') {
    assertGate4CB6TodoPlanningStudioVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4d-b1-career-awards-architecture') {
    assertGate4DB1CareerAwardsArchitectureVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4b5-north-ridge') {
    assertGate4B5NorthRidgeVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4b4-east-side') {
    assertGate4B4EastSideVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4b3-data-pier-side') {
    assertGate4B3DataPierSideVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4b2-west-service') {
    assertGate4B2WestServiceVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
  }
  if (result.goalGate === 'gate-4b1-south-run') {
    assertGate4B1SouthRunVerification(result, failures);
    if (failures.length) {
      throw new Error(`Play verification failed: ${failures.join('; ')}`);
    }
    return;
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
  const expectedRoadHierarchies = Array.from(new Set(roadPaths.map((path) => path.hierarchy)));
  for (const hierarchy of expectedRoadHierarchies) {
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
  if (roadProfiles.stunt && (roadProfiles.stunt.topSpeedFactor || 0) <= (roadProfiles.plaza?.topSpeedFactor || 0)) {
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

function assertVehicleGroundingMotion(result, failures) {
  const motion = result.vehicleGroundingMotion;
  if (!motion || !Array.isArray(motion.samples) || motion.samples.length !== 3) {
    failures.push('vehicle grounding motion probe missing');
    return;
  }
  if ((motion.maxSpeed || 0) < 20) failures.push(`vehicle grounding motion probe failed: maxSpeed=${motion.maxSpeed || 0}`);
  if (!Number.isFinite(motion.minWheelClearanceAboveRoad) || motion.minWheelClearanceAboveRoad < 0.008) {
    failures.push(`vehicle grounding motion failed: wheel clearance=${motion.minWheelClearanceAboveRoad}`);
  }
  if (!Number.isFinite(motion.minWheelDebugClearanceAboveRoad) || motion.minWheelDebugClearanceAboveRoad < 0.008) {
    failures.push(`vehicle grounding debug failed: wheel clearance=${motion.minWheelDebugClearanceAboveRoad}`);
  }
  if (!Number.isFinite(motion.minBodyClearanceAboveRoad) || motion.minBodyClearanceAboveRoad < 0.08) {
    failures.push(`vehicle grounding motion failed: body clearance=${motion.minBodyClearanceAboveRoad}`);
  }
  const boostSample = motion.samples.find((sample) => sample.label === 'boost');
  if (!boostSample || (boostSample.speed || 0) < 30) {
    failures.push(`vehicle grounding boost probe failed: speed=${boostSample?.speed || 0}`);
  }
  const badSamples = motion.samples.filter((sample) => (
    (sample.groundedWheels || 0) < 2
    || sample.surface !== 'road'
    || !Number.isFinite(sample.wheels?.clearanceAboveRoad)
    || sample.wheels.clearanceAboveRoad < 0.008
    || !Number.isFinite(sample.bodyOnly?.clearanceAboveRoad)
    || sample.bodyOnly.clearanceAboveRoad < 0.08
  ));
  if (badSamples.length) {
    failures.push(`vehicle grounding samples failed: ${badSamples.map((sample) => sample.label).join(', ')}`);
  }
}

function assertVehicleBodyRoadClipping(result, failures) {
  const probe = result.vehicleBodyRoadClipping;
  const expectedIds = ['idle', 'driving', 'sprinting', 'braking', 'burnout', 'wheelie'];
  if (!probe || !Array.isArray(probe.samples)) {
    failures.push('vehicle body-road clipping probe missing');
    return;
  }
  const ids = new Set(probe.samples.map((sample) => sample.id));
  const missing = expectedIds.filter((id) => !ids.has(id));
  if (missing.length) failures.push(`vehicle body-road clipping probe missing states: ${missing.join(', ')}`);
  if ((probe.screenshots?.length || 0) !== expectedIds.length * 2) {
    failures.push(`vehicle body-road clipping screenshots missing: ${probe.screenshots?.length || 0}/${expectedIds.length * 2}`);
  }
  if ((probe.maskScreenshots?.length || 0) !== expectedIds.length * 5) {
    failures.push(`vehicle body-road clipping mask screenshots missing: ${probe.maskScreenshots?.length || 0}/${expectedIds.length * 5}`);
  }

  const laneFailures = probe.samples.filter((sample) => (
    !Number.isFinite(sample.roadPlacement?.lateralOffset)
    || Math.abs(sample.roadPlacement.lateralOffset) > Math.min(sample.roadPlacement.halfWidth * 0.58, 1.35)
  ));
  if (laneFailures.length) {
    failures.push(`vehicle body-road clipping lane probe failed: ${laneFailures.map((sample) => `${sample.id}=${sample.roadPlacement?.lateralOffset}`).join(', ')}`);
  }

  const criticalIds = new Set(['driving', 'sprinting', 'braking', 'wheelie']);
  const criticalFailures = probe.samples.filter((sample) => (
    criticalIds.has(sample.id)
    && (
      !Number.isFinite(sample.body?.clearanceAboveRoad)
      || sample.body.clearanceAboveRoad < 0.2
      || !Number.isFinite(sample.paintedBody?.clearanceAboveRoad)
      || sample.paintedBody.clearanceAboveRoad < 0.2
    )
  ));
  if (criticalFailures.length) {
    failures.push(`vehicle body-road clipping clearance failed: ${criticalFailures.map((sample) => `${sample.id} body=${sample.body?.clearanceAboveRoad} paint=${sample.paintedBody?.clearanceAboveRoad}`).join(', ')}`);
  }

  const wheelFailures = probe.samples.filter((sample) => (
    !Number.isFinite(sample.wheels?.clearanceAboveRoad)
    || sample.wheels.clearanceAboveRoad < 0.012
    || (sample.groundedWheels || 0) < (sample.id === 'wheelie' ? 2 : 4)
  ));
  if (wheelFailures.length) {
    failures.push(`vehicle body-road wheel probe failed: ${wheelFailures.map((sample) => `${sample.id} wheel=${sample.wheels?.clearanceAboveRoad} grounded=${sample.groundedWheels}`).join(', ')}`);
  }

  if ((probe.minCriticalBodyClearance || 0) < 0.2) {
    failures.push(`vehicle body-road min body clearance failed: ${probe.minCriticalBodyClearance}`);
  }
  if ((probe.minCriticalPaintedBodyClearance || 0) < 0.2) {
    failures.push(`vehicle body-road min painted clearance failed: ${probe.minCriticalPaintedBodyClearance}`);
  }
  const maskFailures = probe.samples.filter((sample) => (
    criticalIds.has(sample.id)
    && (
      sample.maskEvidence?.roadRenderOcclusion
      || (sample.maskEvidence?.lowerBodyPixelLossRatio || 0) > 0.035
      || (sample.maskEvidence?.bodyPixelLossRatio || 0) > 0.08
    )
  ));
  if (maskFailures.length) {
    failures.push(`vehicle body-road mask occlusion failed: ${maskFailures.map((sample) => `${sample.id} lower=${sample.maskEvidence?.lowerBodyPixelLossRatio} body=${sample.maskEvidence?.bodyPixelLossRatio} cause=${sample.maskEvidence?.rootCause}`).join(', ')}`);
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
  const expectedRoadHierarchies = Array.from(new Set(roadPaths.map((path) => path.hierarchy)));
  for (const hierarchy of expectedRoadHierarchies) {
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

function assertGate3RVerticalSliceVerification(result, failures, options = {}) {
  const expectedGoal = options.expectedGoal || 'gate-3r-vertical-slice';
  const allowPrototypeStuntPark = Boolean(options.allowPrototypeStuntPark);
  const allowedExtraColliderPrefixes = options.allowedExtraColliderPrefixes || [];
  const blockout = result.blockout || {};
  const blockoutSetPieces = blockout.setPieces || {};
  const slice = result.verticalSlice || blockout.verticalSlice || {};
  const start = slice.start || {};
  const campusRoute = slice.campusRoute || {};
  const fcc = slice.fcc || {};
  const securityRoute = slice.securityRoute || {};
  const security = slice.security || {};
  const placement = result.gate3rPlacement || {};

  if (result.goalGate !== expectedGoal) {
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
  if (!allowPrototypeStuntPark && (result.stuntPark?.ramps || 0) !== 0) failures.push(`Gate 3R stunt failed: rejected ramps built=${result.stuntPark?.ramps || 0}`);
  if (!allowPrototypeStuntPark && (result.stuntPark?.boostPads || 0) !== 0) failures.push(`Gate 3R stunt failed: rejected boost pads built=${result.stuntPark?.boostPads || 0}`);
  if (!allowPrototypeStuntPark && (result.stuntPark?.landingMarkers || 0) !== 0) failures.push(`Gate 3R stunt failed: rejected landing markers built=${result.stuntPark?.landingMarkers || 0}`);
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
    && !(allowPrototypeStuntPark && collider.name === 'STUNTB6R_training_ramp_collider')
    && !allowedExtraColliderPrefixes.some((prefix) => collider.name.startsWith(prefix))
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
  const expectedRoadHierarchies = Array.from(new Set(roadPaths.map((path) => path.hierarchy)));
  for (const hierarchy of expectedRoadHierarchies) {
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
  if ((start.launchLights || 0) !== 0) failures.push(`Gate 3R start failed: removed launch start bars still built=${start.launchLights || 0}`);
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
  if ((fcc.identityFrames || 0) !== 0) failures.push(`Gate 3R-B FCC failed: rejected frame strips built=${fcc.identityFrames || 0}`);
  if ((securityRoute.routeMarks || 0) !== 0) failures.push(`Gate 3R security route failed: rejected white route marks built=${securityRoute.routeMarks || 0}`);
  if ((securityRoute.warningBollards || 0) < 2) failures.push(`Gate 3R security route failed: warningBollards=${securityRoute.warningBollards || 0}`);
  if ((security.floorPads || 0) < 3) failures.push(`Gate 3R security lab failed: floorPads=${security.floorPads || 0}`);
  if ((security.serverBlocks || 0) < 4) failures.push(`Gate 3R security lab failed: serverBlocks=${security.serverBlocks || 0}`);
  if ((security.cables || 0) !== 2) failures.push(`Gate 3R-B security lab failed: cables=${security.cables || 0}`);
  if ((security.beacons || 0) !== 2) failures.push(`Gate 3R-B security lab failed: beacons=${security.beacons || 0}`);
  if ((security.terminalRails || 0) !== 2) failures.push(`Gate 3R-B security lab failed: terminalRails=${security.terminalRails || 0}`);
  if ((security.warningBollards || 0) !== 4) failures.push(`Gate 3R-B security lab failed: warningBollards=${security.warningBollards || 0}`);
  if ((security.lightStrips || 0) !== 2) failures.push(`Gate 3R-B security lab failed: lightStrips=${security.lightStrips || 0}`);

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

function assertGate4B1SouthRunVerification(result, failures, options = {}) {
  assertGate3RVerticalSliceVerification(result, failures, {
    expectedGoal: options.expectedGoal || 'gate-4b1-south-run',
    allowPrototypeStuntPark: options.allowPrototypeStuntPark,
    allowedExtraColliderPrefixes: options.allowedExtraColliderPrefixes
  });

  if (options.sourceSouthRun) {
    assertGate4CB1SourceSouthRun(result, failures);
    return;
  }

  const southRun = result.gate4b1 || {};
  const cv = southRun.cv || {};
  const behind = southRun.behind || {};
  const placement = result.gate3rPlacement || {};

  if (!southRun.enabled) failures.push('Gate 4-B1 failed: South Run scaffold inactive');
  if ((southRun.staticBatches || 0) < 1) failures.push(`Gate 4-B1 batching failed: staticBatches=${southRun.staticBatches || 0}`);

  if ((cv.pads || 0) !== 1) failures.push(`Gate 4-B1 CV failed: pads=${cv.pads || 0}`);
  if ((cv.vaultPlinths || 0) < 1) failures.push(`Gate 4-B1 CV failed: vaultPlinths=${cv.vaultPlinths || 0}`);
  if ((cv.documentPages || 0) < 6) failures.push(`Gate 4-B1 CV failed: documentPages=${cv.documentPages || 0}`);
  if ((cv.signs || 0) !== 1) failures.push(`Gate 4-B1 CV failed: signs=${cv.signs || 0}`);
  if ((cv.lamps || 0) !== 2) failures.push(`Gate 4-B1 CV failed: lamps=${cv.lamps || 0}`);
  if ((cv.anchors || 0) < 1) failures.push(`Gate 4-B1 CV failed: anchors=${cv.anchors || 0}`);

  if ((behind.pads || 0) !== 1) failures.push(`Gate 4-B1 Behind failed: pads=${behind.pads || 0}`);
  if ((behind.workbenches || 0) < 1) failures.push(`Gate 4-B1 Behind failed: workbenches=${behind.workbenches || 0}`);
  if ((behind.hologramPanels || 0) < 3) failures.push(`Gate 4-B1 Behind failed: hologramPanels=${behind.hologramPanels || 0}`);
  if ((behind.signs || 0) !== 1) failures.push(`Gate 4-B1 Behind failed: signs=${behind.signs || 0}`);
  if ((behind.lamps || 0) !== 2) failures.push(`Gate 4-B1 Behind failed: lamps=${behind.lamps || 0}`);
  if ((behind.anchors || 0) < 1) failures.push(`Gate 4-B1 Behind failed: anchors=${behind.anchors || 0}`);

  if ((placement.byFootprintKind?.['gate4b1-cv-pad'] || 0) !== 1) {
    failures.push(`Gate 4-B1 placement failed: CV pad footprints=${placement.byFootprintKind?.['gate4b1-cv-pad'] || 0}`);
  }
  if ((placement.byFootprintKind?.['gate4b1-behind-pad'] || 0) !== 1) {
    failures.push(`Gate 4-B1 placement failed: Behind pad footprints=${placement.byFootprintKind?.['gate4b1-behind-pad'] || 0}`);
  }
  if ((placement.byKind?.['gate4b1-document'] || 0) < 6) {
    failures.push(`Gate 4-B1 placement failed: CV document placements=${placement.byKind?.['gate4b1-document'] || 0}`);
  }
  if ((placement.byKind?.['gate4b1-hologram'] || 0) < 3) {
    failures.push(`Gate 4-B1 placement failed: Behind hologram placements=${placement.byKind?.['gate4b1-hologram'] || 0}`);
  }
}

function assertGate4B2WestServiceVerification(result, failures, options = {}) {
  assertGate4B1SouthRunVerification(result, failures, {
    expectedGoal: options.expectedGoal || 'gate-4b2-west-service',
    allowPrototypeStuntPark: options.allowPrototypeStuntPark,
    allowedExtraColliderPrefixes: options.allowedExtraColliderPrefixes,
    sourceSouthRun: options.sourceSouthRun
  });

  const westService = result.gate4b2 || {};
  const skills = westService.skills || {};
  const farm = westService.farm || {};
  const placement = result.gate3rPlacement || {};

  if (!westService.enabled) failures.push('Gate 4-B2 failed: West Service scaffold inactive');
  if ((westService.staticBatches || 0) < 1) failures.push(`Gate 4-B2 batching failed: staticBatches=${westService.staticBatches || 0}`);

  if (options.sourceWestService) {
    assertGate4CB3SourceWestService(result, failures);
  } else {
    if ((skills.pads || 0) !== 1) failures.push(`Gate 4-B2 Skills failed: pads=${skills.pads || 0}`);
    if ((skills.terminalSlabs || 0) !== 1) failures.push(`Gate 4-B2 Skills failed: terminalSlabs=${skills.terminalSlabs || 0}`);
    if ((skills.codeNodes || 0) !== 7) failures.push(`Gate 4-B2 Skills failed: codeNodes=${skills.codeNodes || 0}`);
    if ((skills.codeCards || 0) !== 6) failures.push(`Gate 4-B2 Skills failed: codeCards=${skills.codeCards || 0}`);
    if ((skills.syncRings || 0) !== 1) failures.push(`Gate 4-B2 Skills failed: syncRings=${skills.syncRings || 0}`);
    if ((skills.signalRibbons || 0) !== 3) failures.push(`Gate 4-B2 Skills failed: signalRibbons=${skills.signalRibbons || 0}`);
    if ((skills.signs || 0) !== 1) failures.push(`Gate 4-B2 Skills failed: signs=${skills.signs || 0}`);
    if ((skills.lamps || 0) !== 2) failures.push(`Gate 4-B2 Skills failed: lamps=${skills.lamps || 0}`);

    if ((farm.pads || 0) !== 1) failures.push(`Gate 4-B2 Farm failed: pads=${farm.pads || 0}`);
    if ((farm.farmRows || 0) !== 5) failures.push(`Gate 4-B2 Farm failed: farmRows=${farm.farmRows || 0}`);
    if ((farm.fenceSegments || 0) !== 8) failures.push(`Gate 4-B2 Farm failed: fenceSegments=${farm.fenceSegments || 0}`);
    if ((farm.anchors || 0) !== 1) failures.push(`Gate 4-B2 Farm failed: anchors=${farm.anchors || 0}`);
    if ((farm.signs || 0) !== 1) failures.push(`Gate 4-B2 Farm failed: signs=${farm.signs || 0}`);
    if ((farm.lamps || 0) !== 2) failures.push(`Gate 4-B2 Farm failed: lamps=${farm.lamps || 0}`);

    if ((placement.byFootprintKind?.['gate4b2-skills-pad'] || 0) !== 1) {
      failures.push(`Gate 4-B2 placement failed: Skills pad footprints=${placement.byFootprintKind?.['gate4b2-skills-pad'] || 0}`);
    }
    if ((placement.byFootprintKind?.['gate4b2-farm-pad'] || 0) !== 1) {
      failures.push(`Gate 4-B2 placement failed: Farm pad footprints=${placement.byFootprintKind?.['gate4b2-farm-pad'] || 0}`);
    }
    if ((placement.byKind?.['gate4b2-skills-node'] || 0) !== 7) {
      failures.push(`Gate 4-B2 placement failed: Skills node placements=${placement.byKind?.['gate4b2-skills-node'] || 0}`);
    }
    if ((placement.byKind?.['gate4b2-skills-card'] || 0) !== 6) {
      failures.push(`Gate 4-B2 placement failed: Skills card placements=${placement.byKind?.['gate4b2-skills-card'] || 0}`);
    }
    if ((placement.byKind?.['gate4b2-skills-ribbon'] || 0) !== 3) {
      failures.push(`Gate 4-B2 placement failed: Skills ribbon placements=${placement.byKind?.['gate4b2-skills-ribbon'] || 0}`);
    }
    if ((placement.byKind?.['gate4b2-farm-row'] || 0) !== 5) {
      failures.push(`Gate 4-B2 placement failed: Farm row placements=${placement.byKind?.['gate4b2-farm-row'] || 0}`);
    }
    if ((placement.byKind?.['gate4b2-farm-fence'] || 0) !== 8) {
      failures.push(`Gate 4-B2 placement failed: Farm fence placements=${placement.byKind?.['gate4b2-farm-fence'] || 0}`);
    }
  }
  if ((result.blockout?.potatoPocketBuilt || false) !== false) {
    failures.push('Gate 4-B2 failed: old PotatoFarm pocket was enabled');
  }
}

function assertGate4B3DataPierSideVerification(result, failures, options = {}) {
  assertGate4B2WestServiceVerification(result, failures, {
    expectedGoal: options.expectedGoal || 'gate-4b3-data-pier-side',
    allowPrototypeStuntPark: options.allowPrototypeStuntPark,
    allowedExtraColliderPrefixes: options.allowedExtraColliderPrefixes,
    sourceSouthRun: options.sourceSouthRun,
    sourceWestService: options.sourceWestService
  });

  const dataPierSide = result.gate4b3 || {};
  const todo = dataPierSide.todo || {};
  const dataPier = dataPierSide.dataPier || {};
  const placement = result.gate3rPlacement || {};

  if (!dataPierSide.enabled) failures.push('Gate 4-B3 failed: Data Pier Side scaffold inactive');
  if ((dataPierSide.staticBatches || 0) < 1) failures.push(`Gate 4-B3 batching failed: staticBatches=${dataPierSide.staticBatches || 0}`);

  if ((todo.pads || 0) !== 1) failures.push(`Gate 4-B3 Todo failed: pads=${todo.pads || 0}`);
  if ((todo.taskBoards || 0) !== 1) failures.push(`Gate 4-B3 Todo failed: taskBoards=${todo.taskBoards || 0}`);
  if ((todo.queueRails || 0) !== 4) failures.push(`Gate 4-B3 Todo failed: queueRails=${todo.queueRails || 0}`);
  if ((todo.taskCards || 0) !== 7) failures.push(`Gate 4-B3 Todo failed: taskCards=${todo.taskCards || 0}`);
  if ((todo.signs || 0) !== 1) failures.push(`Gate 4-B3 Todo failed: signs=${todo.signs || 0}`);
  if ((todo.lamps || 0) !== 2) failures.push(`Gate 4-B3 Todo failed: lamps=${todo.lamps || 0}`);

  if ((dataPier.rails || 0) !== 4) failures.push(`Gate 4-B3 Data Pier failed: rails=${dataPier.rails || 0}`);
  if ((dataPier.beacons || 0) !== 3) failures.push(`Gate 4-B3 Data Pier failed: beacons=${dataPier.beacons || 0}`);
  if ((dataPier.cargoStacks || 0) !== 2) failures.push(`Gate 4-B3 Data Pier failed: cargoStacks=${dataPier.cargoStacks || 0}`);
  if ((dataPier.signs || 0) !== 1) failures.push(`Gate 4-B3 Data Pier failed: signs=${dataPier.signs || 0}`);
  if ((dataPier.lamps || 0) !== 2) failures.push(`Gate 4-B3 Data Pier failed: lamps=${dataPier.lamps || 0}`);

  if ((placement.byFootprintKind?.['gate4b3-todo-pad'] || 0) !== 1) {
    failures.push(`Gate 4-B3 placement failed: Todo pad footprints=${placement.byFootprintKind?.['gate4b3-todo-pad'] || 0}`);
  }
  if ((placement.byFootprintKind?.['gate4b3-data-pier-pad'] || 0) !== 0) {
    failures.push(`Gate 4-B3 placement failed: unapproved Data Pier pad footprints=${placement.byFootprintKind?.['gate4b3-data-pier-pad'] || 0}`);
  }
  if ((placement.byKind?.['gate4b3-todo-board'] || 0) !== 1) {
    failures.push(`Gate 4-B3 placement failed: Todo board placements=${placement.byKind?.['gate4b3-todo-board'] || 0}`);
  }
  if ((placement.byKind?.['gate4b3-todo-rail'] || 0) !== 4) {
    failures.push(`Gate 4-B3 placement failed: Todo rail placements=${placement.byKind?.['gate4b3-todo-rail'] || 0}`);
  }
  if ((placement.byKind?.['gate4b3-todo-card'] || 0) !== 7) {
    failures.push(`Gate 4-B3 placement failed: Todo card placements=${placement.byKind?.['gate4b3-todo-card'] || 0}`);
  }
  if ((placement.byKind?.['gate4b3-pier-rail'] || 0) !== 4) {
    failures.push(`Gate 4-B3 placement failed: Data Pier rail placements=${placement.byKind?.['gate4b3-pier-rail'] || 0}`);
  }
  if ((placement.byKind?.['gate4b3-pier-beacon'] || 0) !== 3) {
    failures.push(`Gate 4-B3 placement failed: Data Pier beacon placements=${placement.byKind?.['gate4b3-pier-beacon'] || 0}`);
  }
  if ((placement.byKind?.['gate4b3-pier-cargo'] || 0) !== 2) {
    failures.push(`Gate 4-B3 placement failed: Data Pier cargo placements=${placement.byKind?.['gate4b3-pier-cargo'] || 0}`);
  }
  if ((result.dataPier?.pads || 0) !== 0 || (result.todoYard?.pads || 0) !== 0) {
    failures.push('Gate 4-B3 failed: old DataPier/TodoYard systems were enabled');
  }
}

function assertGate4B4EastSideVerification(result, failures, options = {}) {
  assertGate4B3DataPierSideVerification(result, failures, {
    expectedGoal: options.expectedGoal || 'gate-4b4-east-side',
    allowPrototypeStuntPark: options.allowPrototypeStuntPark,
    allowedExtraColliderPrefixes: options.allowedExtraColliderPrefixes
  });

  const eastSide = result.gate4b4 || {};
  const projects = eastSide.projects || {};
  const career = eastSide.career || {};
  const harbor = eastSide.harbor || {};
  const placement = result.gate3rPlacement || {};

  if (!eastSide.enabled) failures.push('Gate 4-B4 failed: East Side scaffold inactive');
  if ((eastSide.staticBatches || 0) < 1) failures.push(`Gate 4-B4 batching failed: staticBatches=${eastSide.staticBatches || 0}`);

  if ((projects.pads || 0) !== 1) failures.push(`Gate 4-B4 Projects failed: pads=${projects.pads || 0}`);
  if ((projects.projectRacks || 0) !== 6) failures.push(`Gate 4-B4 Projects failed: projectRacks=${projects.projectRacks || 0}`);
  if ((projects.assemblyRings || 0) !== 1) failures.push(`Gate 4-B4 Projects failed: assemblyRings=${projects.assemblyRings || 0}`);
  if ((projects.sparkMarkers || 0) !== 6) failures.push(`Gate 4-B4 Projects failed: sparkMarkers=${projects.sparkMarkers || 0}`);
  if ((projects.authoredAssets || 0) !== 1) failures.push(`Gate 4-B4 Projects failed: authoredAssets=${projects.authoredAssets || 0}`);
  if ((projects.signs || 0) !== 1) failures.push(`Gate 4-B4 Projects failed: signs=${projects.signs || 0}`);
  if ((projects.lamps || 0) !== 2) failures.push(`Gate 4-B4 Projects failed: lamps=${projects.lamps || 0}`);

  if ((career.pads || 0) !== 1) failures.push(`Gate 4-B4 Career failed: pads=${career.pads || 0}`);
  if ((career.officeBlocks || 0) !== 1) failures.push(`Gate 4-B4 Career failed: officeBlocks=${career.officeBlocks || 0}`);
  if ((career.facadePanels || 0) !== 6) failures.push(`Gate 4-B4 Career failed: facadePanels=${career.facadePanels || 0}`);
  if ((career.signalFrames || 0) !== 3) failures.push(`Gate 4-B4 Career failed: signalFrames=${career.signalFrames || 0}`);
  if ((career.connectorMarks || 0) !== 5) failures.push(`Gate 4-B4 Career failed: connectorMarks=${career.connectorMarks || 0}`);
  if ((career.signs || 0) !== 1) failures.push(`Gate 4-B4 Career failed: signs=${career.signs || 0}`);
  if ((career.lamps || 0) !== 2) failures.push(`Gate 4-B4 Career failed: lamps=${career.lamps || 0}`);

  if ((harbor.deckPads || 0) !== 1) failures.push(`Gate 4-B4 Harbor failed: deckPads=${harbor.deckPads || 0}`);
  if ((harbor.signalMasts || 0) !== 1) failures.push(`Gate 4-B4 Harbor failed: signalMasts=${harbor.signalMasts || 0}`);
  if ((harbor.contactTerminals || 0) !== 3) failures.push(`Gate 4-B4 Harbor failed: contactTerminals=${harbor.contactTerminals || 0}`);
  if ((harbor.beacons || 0) !== 2) failures.push(`Gate 4-B4 Harbor failed: beacons=${harbor.beacons || 0}`);
  if ((harbor.signs || 0) !== 1) failures.push(`Gate 4-B4 Harbor failed: signs=${harbor.signs || 0}`);
  if ((harbor.lamps || 0) !== 2) failures.push(`Gate 4-B4 Harbor failed: lamps=${harbor.lamps || 0}`);

  if ((placement.byFootprintKind?.['gate4b4-projects-pad'] || 0) !== 1) {
    failures.push(`Gate 4-B4 placement failed: Projects pad footprints=${placement.byFootprintKind?.['gate4b4-projects-pad'] || 0}`);
  }
  if ((placement.byFootprintKind?.['gate4b4-career-pad'] || 0) !== 1) {
    failures.push(`Gate 4-B4 placement failed: Career pad footprints=${placement.byFootprintKind?.['gate4b4-career-pad'] || 0}`);
  }
  if ((placement.byFootprintKind?.['gate4b4-harbor-deck'] || 0) !== 1) {
    failures.push(`Gate 4-B4 placement failed: Harbor deck footprints=${placement.byFootprintKind?.['gate4b4-harbor-deck'] || 0}`);
  }
  if ((placement.byKind?.['gate4b4-projects-assembly'] || 0) !== 1) {
    failures.push(`Gate 4-B4 placement failed: Projects assembly placements=${placement.byKind?.['gate4b4-projects-assembly'] || 0}`);
  }
  if ((placement.byKind?.['gate4b4-project-rack'] || 0) !== 6) {
    failures.push(`Gate 4-B4 placement failed: Projects rack placements=${placement.byKind?.['gate4b4-project-rack'] || 0}`);
  }
  if ((placement.byKind?.['gate4b4-project-spark'] || 0) !== 6) {
    failures.push(`Gate 4-B4 placement failed: Projects spark placements=${placement.byKind?.['gate4b4-project-spark'] || 0}`);
  }
  if ((placement.byKind?.['gate4b4-career-office'] || 0) !== 1) {
    failures.push(`Gate 4-B4 placement failed: Career office placements=${placement.byKind?.['gate4b4-career-office'] || 0}`);
  }
  if ((placement.byKind?.['gate4b4-career-facade'] || 0) !== 6) {
    failures.push(`Gate 4-B4 placement failed: Career facade placements=${placement.byKind?.['gate4b4-career-facade'] || 0}`);
  }
  if ((placement.byKind?.['gate4b4-career-frame'] || 0) !== 3) {
    failures.push(`Gate 4-B4 placement failed: Career frame placements=${placement.byKind?.['gate4b4-career-frame'] || 0}`);
  }
  if ((placement.byKind?.['gate4b4-career-connector'] || 0) !== 5) {
    failures.push(`Gate 4-B4 placement failed: Career connector placements=${placement.byKind?.['gate4b4-career-connector'] || 0}`);
  }
  if ((placement.byKind?.['gate4b4-harbor-mast'] || 0) !== 1) {
    failures.push(`Gate 4-B4 placement failed: Harbor mast placements=${placement.byKind?.['gate4b4-harbor-mast'] || 0}`);
  }
  if ((placement.byKind?.['gate4b4-harbor-terminal'] || 0) !== 3) {
    failures.push(`Gate 4-B4 placement failed: Harbor terminal placements=${placement.byKind?.['gate4b4-harbor-terminal'] || 0}`);
  }
  if ((placement.byKind?.['gate4b4-harbor-beacon'] || 0) !== 2) {
    failures.push(`Gate 4-B4 placement failed: Harbor beacon placements=${placement.byKind?.['gate4b4-harbor-beacon'] || 0}`);
  }
  if ((result.harbor?.pads || 0) !== 0 || (result.careerOffice?.pads || 0) !== 0 || (result.projectsYard?.assemblyRings || 0) !== 0) {
    failures.push('Gate 4-B4 failed: old Projects/Career/Harbor systems were enabled');
  }
}

function assertGate4B5NorthRidgeVerification(result, failures, options = {}) {
  assertGate4B4EastSideVerification(result, failures, {
    expectedGoal: options.expectedGoal || 'gate-4b5-north-ridge',
    allowPrototypeStuntPark: options.allowPrototypeStuntPark,
    allowedExtraColliderPrefixes: options.allowedExtraColliderPrefixes
  });

  const northRidge = result.gate4b5 || {};
  const awards = northRidge.awards || {};
  const sentinel = northRidge.sentinel || {};
  const circuit = northRidge.circuit || {};
  const placement = result.gate3rPlacement || {};

  if (!northRidge.enabled) failures.push('Gate 4-B5 failed: North Ridge scaffold inactive');
  if ((northRidge.staticBatches || 0) < 1) failures.push(`Gate 4-B5 batching failed: staticBatches=${northRidge.staticBatches || 0}`);

  if ((awards.pads || 0) !== 1) failures.push(`Gate 4-B5 Awards failed: pads=${awards.pads || 0}`);
  if ((awards.archiveSteps || 0) !== 3) failures.push(`Gate 4-B5 Awards failed: archiveSteps=${awards.archiveSteps || 0}`);
  if ((awards.trophyPlinths || 0) !== 3) failures.push(`Gate 4-B5 Awards failed: trophyPlinths=${awards.trophyPlinths || 0}`);
  if ((awards.goldAccents || 0) !== 3) failures.push(`Gate 4-B5 Awards failed: goldAccents=${awards.goldAccents || 0}`);
  if ((awards.authoredAssets || 0) !== 1) failures.push(`Gate 4-B5 Awards failed: authoredAssets=${awards.authoredAssets || 0}`);
  if ((awards.signs || 0) !== 1) failures.push(`Gate 4-B5 Awards failed: signs=${awards.signs || 0}`);
  if ((awards.lamps || 0) !== 2) failures.push(`Gate 4-B5 Awards failed: lamps=${awards.lamps || 0}`);

  if ((sentinel.pads || 0) !== 1) failures.push(`Gate 4-B5 Sentinel failed: pads=${sentinel.pads || 0}`);
  if ((sentinel.ridgeTowers || 0) !== 1) failures.push(`Gate 4-B5 Sentinel failed: ridgeTowers=${sentinel.ridgeTowers || 0}`);
  if ((sentinel.signalTotems || 0) !== 1) failures.push(`Gate 4-B5 Sentinel failed: signalTotems=${sentinel.signalTotems || 0}`);
  if ((sentinel.shardPanels || 0) !== 2) failures.push(`Gate 4-B5 Sentinel failed: shardPanels=${sentinel.shardPanels || 0}`);
  if ((sentinel.signs || 0) !== 1) failures.push(`Gate 4-B5 Sentinel failed: signs=${sentinel.signs || 0}`);
  if ((sentinel.lamps || 0) !== 2) failures.push(`Gate 4-B5 Sentinel failed: lamps=${sentinel.lamps || 0}`);

  if ((circuit.pads || 0) !== 1) failures.push(`Gate 4-B5 Circuit failed: pads=${circuit.pads || 0}`);
  if ((circuit.startGates || 0) !== 1) failures.push(`Gate 4-B5 Circuit failed: startGates=${circuit.startGates || 0}`);
  if ((circuit.laneCurbs || 0) !== 2) failures.push(`Gate 4-B5 Circuit failed: laneCurbs=${circuit.laneCurbs || 0}`);
  if ((circuit.signalLights || 0) !== 3) failures.push(`Gate 4-B5 Circuit failed: signalLights=${circuit.signalLights || 0}`);
  if ((circuit.authoredAssets || 0) !== 1) failures.push(`Gate 4-B5 Circuit failed: authoredAssets=${circuit.authoredAssets || 0}`);
  if ((circuit.signs || 0) !== 1) failures.push(`Gate 4-B5 Circuit failed: signs=${circuit.signs || 0}`);
  if ((circuit.lamps || 0) !== 2) failures.push(`Gate 4-B5 Circuit failed: lamps=${circuit.lamps || 0}`);

  if ((placement.byFootprintKind?.['gate4b5-awards-pad'] || 0) !== 1) {
    failures.push(`Gate 4-B5 placement failed: Awards pad footprints=${placement.byFootprintKind?.['gate4b5-awards-pad'] || 0}`);
  }
  if ((placement.byFootprintKind?.['gate4b5-sentinel-pad'] || 0) !== 1) {
    failures.push(`Gate 4-B5 placement failed: Sentinel pad footprints=${placement.byFootprintKind?.['gate4b5-sentinel-pad'] || 0}`);
  }
  if ((placement.byFootprintKind?.['gate4b5-circuit-pad'] || 0) !== 1) {
    failures.push(`Gate 4-B5 placement failed: Circuit pad footprints=${placement.byFootprintKind?.['gate4b5-circuit-pad'] || 0}`);
  }
  if ((placement.byKind?.['gate4b5-awards-step'] || 0) !== 3) {
    failures.push(`Gate 4-B5 placement failed: Awards step placements=${placement.byKind?.['gate4b5-awards-step'] || 0}`);
  }
  if ((placement.byKind?.['gate4b5-awards-plinth'] || 0) !== 3) {
    failures.push(`Gate 4-B5 placement failed: Awards plinth placements=${placement.byKind?.['gate4b5-awards-plinth'] || 0}`);
  }
  if ((placement.byKind?.['gate4b5-awards-accent'] || 0) !== 3) {
    failures.push(`Gate 4-B5 placement failed: Awards accent placements=${placement.byKind?.['gate4b5-awards-accent'] || 0}`);
  }
  if ((placement.byKind?.['gate4b5-awards-monument'] || 0) !== 1) {
    failures.push(`Gate 4-B5 placement failed: Awards monument placements=${placement.byKind?.['gate4b5-awards-monument'] || 0}`);
  }
  if ((placement.byKind?.['gate4b5-sentinel-tower'] || 0) !== 1) {
    failures.push(`Gate 4-B5 placement failed: Sentinel tower placements=${placement.byKind?.['gate4b5-sentinel-tower'] || 0}`);
  }
  if ((placement.byKind?.['gate4b5-sentinel-totem'] || 0) !== 1) {
    failures.push(`Gate 4-B5 placement failed: Sentinel totem placements=${placement.byKind?.['gate4b5-sentinel-totem'] || 0}`);
  }
  if ((placement.byKind?.['gate4b5-sentinel-shard'] || 0) !== 2) {
    failures.push(`Gate 4-B5 placement failed: Sentinel shard placements=${placement.byKind?.['gate4b5-sentinel-shard'] || 0}`);
  }
  if ((placement.byKind?.['gate4b5-circuit-gate'] || 0) !== 1) {
    failures.push(`Gate 4-B5 placement failed: Circuit gate placements=${placement.byKind?.['gate4b5-circuit-gate'] || 0}`);
  }
  if ((placement.byKind?.['gate4b5-circuit-curb'] || 0) !== 2) {
    failures.push(`Gate 4-B5 placement failed: Circuit curb placements=${placement.byKind?.['gate4b5-circuit-curb'] || 0}`);
  }
  if ((placement.byKind?.['gate4b5-circuit-light'] || 0) !== 3) {
    failures.push(`Gate 4-B5 placement failed: Circuit light placements=${placement.byKind?.['gate4b5-circuit-light'] || 0}`);
  }
  if ((result.districtComposition?.awardsArchiveNodes || 0) !== 0 || (result.circuitStart?.pads || 0) !== 0) {
    failures.push('Gate 4-B5 failed: old Awards/Circuit composition systems were enabled');
  }
  if ((result.stuntPark?.ramps || 0) !== 0 || (result.stuntPark?.boostPads || 0) !== 0 || (result.stuntPark?.gates || 0) !== 0) {
    failures.push('Gate 4-B5 failed: old StuntPark physical systems were enabled');
  }
}

function assertGate4BRCompositionCorrectionVerification(result, failures, options = {}) {
  assertGate4B2WestServiceVerification(result, failures, {
    expectedGoal: options.expectedGoal || 'gate-4br-composition-correction',
    allowPrototypeStuntPark: options.allowPrototypeStuntPark,
    allowedExtraColliderPrefixes: options.allowedExtraColliderPrefixes,
    sourceSouthRun: options.sourceSouthRun,
    sourceWestService: options.sourceWestService
  });
  assertStuntCoveDeleted(result, failures);

  const dataPierSide = result.gate4b3 || {};
  const todo = dataPierSide.todo || {};
  const dataPier = dataPierSide.dataPier || {};
  const eastSide = result.gate4b4 || {};
  const projects = eastSide.projects || {};
  const career = eastSide.career || {};
  const harbor = eastSide.harbor || {};
  const northRidge = result.gate4b5 || {};
  const awards = northRidge.awards || {};
  const sentinel = northRidge.sentinel || {};
  const circuit = northRidge.circuit || {};
  const placement = result.gate3rPlacement || {};

  if (!dataPierSide.enabled) failures.push('Gate 4-BR failed: Todo side scaffold inactive');
  if (!eastSide.enabled) failures.push('Gate 4-BR failed: East Side scaffold inactive');
  if (!northRidge.enabled) failures.push('Gate 4-BR failed: North Ridge scaffold inactive');

  if (options.sourceTodo) {
    assertGate4CB6SourceTodoPlanningStudio(result, failures);
  } else {
    if ((todo.pads || 0) !== 1) failures.push(`Gate 4-BR Todo failed: pads=${todo.pads || 0}`);
    if ((todo.taskBoards || 0) !== 1) failures.push(`Gate 4-BR Todo failed: taskBoards=${todo.taskBoards || 0}`);
    if ((todo.queueRails || 0) !== 4) failures.push(`Gate 4-BR Todo failed: queueRails=${todo.queueRails || 0}`);
    if ((todo.taskCards || 0) !== 7) failures.push(`Gate 4-BR Todo failed: taskCards=${todo.taskCards || 0}`);
    if ((todo.signs || 0) !== 0) failures.push(`Gate 4-BR Todo failed: rejected signs=${todo.signs || 0}`);
    if ((todo.lamps || 0) !== 0) failures.push(`Gate 4-BR Todo failed: rejected lamps=${todo.lamps || 0}`);
  }
  if ((dataPier.rails || 0) !== 0) failures.push(`Gate 4-BR Data Pier failed: rejected rails=${dataPier.rails || 0}`);
  if ((dataPier.beacons || 0) !== 0) failures.push(`Gate 4-BR Data Pier failed: rejected beacons=${dataPier.beacons || 0}`);
  if ((dataPier.cargoStacks || 0) !== 0) failures.push(`Gate 4-BR Data Pier failed: rejected cargoStacks=${dataPier.cargoStacks || 0}`);
  if ((dataPier.signs || 0) !== 0) failures.push(`Gate 4-BR Data Pier failed: rejected signs=${dataPier.signs || 0}`);
  if ((dataPier.lamps || 0) !== 0) failures.push(`Gate 4-BR Data Pier failed: rejected lamps=${dataPier.lamps || 0}`);

  if (options.sourceGallerySide) {
    assertGate4CB2SourceGallerySide(result, failures, {
      careerArchitecture: options.careerArchitecture
    });
  } else {
    if ((projects.pads || 0) !== 1) failures.push(`Gate 4-BR Projects failed: pads=${projects.pads || 0}`);
    if ((projects.projectRacks || 0) !== 6) failures.push(`Gate 4-BR Projects failed: projectRacks=${projects.projectRacks || 0}`);
    if ((projects.assemblyRings || 0) !== 1) failures.push(`Gate 4-BR Projects failed: assemblyRings=${projects.assemblyRings || 0}`);
    if ((projects.sparkMarkers || 0) !== 6) failures.push(`Gate 4-BR Projects failed: sparkMarkers=${projects.sparkMarkers || 0}`);
    if ((projects.authoredAssets || 0) !== 1) failures.push(`Gate 4-BR Projects failed: authoredAssets=${projects.authoredAssets || 0}`);
    if ((projects.signs || 0) !== 0) failures.push(`Gate 4-BR Projects failed: rejected signs=${projects.signs || 0}`);
    if ((projects.lamps || 0) !== 0) failures.push(`Gate 4-BR Projects failed: rejected lamps=${projects.lamps || 0}`);

    if ((career.pads || 0) !== 1) failures.push(`Gate 4-BR Career failed: pads=${career.pads || 0}`);
    if ((career.officeBlocks || 0) !== 1) failures.push(`Gate 4-BR Career failed: station blocks=${career.officeBlocks || 0}`);
    if ((career.facadePanels || 0) !== 6) failures.push(`Gate 4-BR Career failed: facadePanels=${career.facadePanels || 0}`);
    if ((career.signalFrames || 0) !== 3) failures.push(`Gate 4-BR Career failed: signalFrames=${career.signalFrames || 0}`);
    if ((career.connectorMarks || 0) !== 0) failures.push(`Gate 4-BR Career failed: rejected connectorMarks=${career.connectorMarks || 0}`);
    if ((career.signs || 0) !== 0) failures.push(`Gate 4-BR Career failed: rejected signs=${career.signs || 0}`);
    if ((career.lamps || 0) !== 0) failures.push(`Gate 4-BR Career failed: rejected lamps=${career.lamps || 0}`);
  }

  if (options.sourceHarbor) {
    assertGate4CB4SourceSignalHarbor(result, failures);
  } else {
    if ((harbor.deckPads || 0) !== 1) failures.push(`Gate 4-BR Harbor failed: deckPads=${harbor.deckPads || 0}`);
    if ((harbor.signalMasts || 0) !== 1) failures.push(`Gate 4-BR Harbor failed: signalMasts=${harbor.signalMasts || 0}`);
    if ((harbor.contactTerminals || 0) !== 3) failures.push(`Gate 4-BR Harbor failed: contactTerminals=${harbor.contactTerminals || 0}`);
    if ((harbor.beacons || 0) !== 2) failures.push(`Gate 4-BR Harbor failed: beacons=${harbor.beacons || 0}`);
    if ((harbor.signs || 0) !== 0) failures.push(`Gate 4-BR Harbor failed: rejected signs=${harbor.signs || 0}`);
    if ((harbor.lamps || 0) !== 0) failures.push(`Gate 4-BR Harbor failed: rejected lamps=${harbor.lamps || 0}`);
  }

  if (options.sourceNorthRidge) {
    assertGate4CB5SourceNorthRidge(result, failures, {
      awardsArchitecture: options.awardsArchitecture
    });
  } else {
    if ((awards.pads || 0) !== 1) failures.push(`Gate 4-BR Awards failed: pads=${awards.pads || 0}`);
    if ((awards.archiveSteps || 0) !== 3) failures.push(`Gate 4-BR Awards failed: archiveSteps=${awards.archiveSteps || 0}`);
    if ((awards.trophyPlinths || 0) !== 3) failures.push(`Gate 4-BR Awards failed: trophyPlinths=${awards.trophyPlinths || 0}`);
    if ((awards.goldAccents || 0) !== 3) failures.push(`Gate 4-BR Awards failed: goldAccents=${awards.goldAccents || 0}`);
    if ((awards.authoredAssets || 0) !== 1) failures.push(`Gate 4-BR Awards failed: authoredAssets=${awards.authoredAssets || 0}`);
    if ((awards.signs || 0) !== 0) failures.push(`Gate 4-BR Awards failed: rejected signs=${awards.signs || 0}`);
    if ((awards.lamps || 0) !== 0) failures.push(`Gate 4-BR Awards failed: rejected lamps=${awards.lamps || 0}`);

    if ((sentinel.pads || 0) !== 1) failures.push(`Gate 4-BR Sentinel failed: pads=${sentinel.pads || 0}`);
    if ((sentinel.ridgeTowers || 0) !== 1) failures.push(`Gate 4-BR Sentinel failed: ridgeTowers=${sentinel.ridgeTowers || 0}`);
    if ((sentinel.signalTotems || 0) !== 1) failures.push(`Gate 4-BR Sentinel failed: signalTotems=${sentinel.signalTotems || 0}`);
    if ((sentinel.shardPanels || 0) !== 2) failures.push(`Gate 4-BR Sentinel failed: shardPanels=${sentinel.shardPanels || 0}`);
    if ((sentinel.signs || 0) !== 0) failures.push(`Gate 4-BR Sentinel failed: rejected signs=${sentinel.signs || 0}`);
    if ((sentinel.lamps || 0) !== 0) failures.push(`Gate 4-BR Sentinel failed: rejected lamps=${sentinel.lamps || 0}`);

    if ((circuit.pads || 0) !== 1) failures.push(`Gate 4-BR Circuit failed: pads=${circuit.pads || 0}`);
    if ((circuit.startGates || 0) !== 1) failures.push(`Gate 4-BR Circuit failed: startGates=${circuit.startGates || 0}`);
    if ((circuit.laneCurbs || 0) !== 2) failures.push(`Gate 4-BR Circuit failed: laneCurbs=${circuit.laneCurbs || 0}`);
    if ((circuit.signalLights || 0) !== 3) failures.push(`Gate 4-BR Circuit failed: signalLights=${circuit.signalLights || 0}`);
    if ((circuit.authoredAssets || 0) !== 1) failures.push(`Gate 4-BR Circuit failed: authoredAssets=${circuit.authoredAssets || 0}`);
    if ((circuit.signs || 0) !== 0) failures.push(`Gate 4-BR Circuit failed: rejected signs=${circuit.signs || 0}`);
    if ((circuit.lamps || 0) !== 0) failures.push(`Gate 4-BR Circuit failed: rejected lamps=${circuit.lamps || 0}`);
  }

  for (const kind of ['gate4b3-pier-rail', 'gate4b3-pier-beacon', 'gate4b3-pier-cargo', 'gate4b4-career-connector']) {
    if ((placement.byKind?.[kind] || 0) !== 0) {
      failures.push(`Gate 4-BR placement failed: rejected ${kind} placements=${placement.byKind?.[kind] || 0}`);
    }
  }
  if ((placement.byFootprintKind?.['gate4b3-data-pier-pad'] || 0) !== 0) {
    failures.push(`Gate 4-BR placement failed: rejected Data Pier pad footprints=${placement.byFootprintKind?.['gate4b3-data-pier-pad'] || 0}`);
  }
  if ((result.dataPier?.pads || 0) !== 0 || (result.todoYard?.pads || 0) !== 0) {
    failures.push('Gate 4-BR failed: old DataPier/TodoYard systems were enabled');
  }
  if ((result.harbor?.pads || 0) !== 0 || (result.careerOffice?.pads || 0) !== 0 || (result.projectsYard?.assemblyRings || 0) !== 0) {
    failures.push('Gate 4-BR failed: old Projects/Career/Harbor systems were enabled');
  }
  if ((result.districtComposition?.awardsArchiveNodes || 0) !== 0 || (result.circuitStart?.pads || 0) !== 0) {
    failures.push('Gate 4-BR failed: old Awards/Circuit composition systems were enabled');
  }
  if (!options.allowPrototypeStuntPark && ((result.stuntPark?.ramps || 0) !== 0 || (result.stuntPark?.boostPads || 0) !== 0 || (result.stuntPark?.gates || 0) !== 0)) {
    failures.push('Gate 4-BR failed: old StuntPark physical systems were enabled');
  }
}

function assertGate4CB1SouthRunReplacementVerification(result, failures) {
  assertGate4BRCompositionCorrectionVerification(result, failures, {
    expectedGoal: 'gate-4c-b1-south-run-replacements',
    sourceSouthRun: true
  });
}

function assertGate4CB2GallerySideReplacementVerification(result, failures) {
  assertGate4BRCompositionCorrectionVerification(result, failures, {
    expectedGoal: 'gate-4c-b2-gallery-side-replacements',
    sourceSouthRun: true,
    sourceGallerySide: true
  });
}

function assertGate4CB3WestServiceReplacementVerification(result, failures) {
  assertGate4BRCompositionCorrectionVerification(result, failures, {
    expectedGoal: 'gate-4c-b3-west-service-replacements',
    sourceSouthRun: true,
    sourceGallerySide: true,
    sourceWestService: true
  });
}

function assertGate4CB4SignalHarborReplacementVerification(result, failures) {
  assertGate4BRCompositionCorrectionVerification(result, failures, {
    expectedGoal: 'gate-4c-b4-signal-harbor-replacement',
    sourceSouthRun: true,
    sourceGallerySide: true,
    sourceWestService: true,
    sourceHarbor: true
  });
}

function assertGate4CB5NorthRidgeReplacementVerification(result, failures) {
  assertGate4BRCompositionCorrectionVerification(result, failures, {
    expectedGoal: 'gate-4c-b5-north-ridge-replacements',
    sourceSouthRun: true,
    sourceGallerySide: true,
    sourceWestService: true,
    sourceHarbor: true,
    sourceNorthRidge: true
  });
}

function assertGate4CB6TodoPlanningStudioVerification(result, failures) {
  assertGate4BRCompositionCorrectionVerification(result, failures, {
    expectedGoal: 'gate-4c-b6-todo-planning-studio',
    sourceSouthRun: true,
    sourceGallerySide: true,
    sourceWestService: true,
    sourceHarbor: true,
    sourceNorthRidge: true,
    sourceTodo: true
  });
}

function assertGate4DB1CareerAwardsArchitectureVerification(result, failures) {
  assertGate4BRCompositionCorrectionVerification(result, failures, {
    expectedGoal: 'gate-4d-b1-career-awards-architecture',
    sourceSouthRun: true,
    sourceGallerySide: true,
    careerArchitecture: true,
    sourceWestService: true,
    sourceHarbor: true,
    sourceNorthRidge: true,
    awardsArchitecture: true,
    sourceTodo: true
  });
}

function assertAuthoredDistrictAsset(result, assetName, label, failures) {
  const asset = (result.authoredDistrictAssets || []).find((entry) => entry.name === assetName);
  if (!asset?.template) failures.push(`${label} failed: ${assetName} template was not loaded`);
  if (!asset?.placed) failures.push(`${label} failed: ${assetName} was not placed in the scene`);
}

function assertGate4DCareerSoftwareHouse(result, failures) {
  const career = result.gate4b4?.career || {};

  assertAuthoredDistrictAsset(result, 'EnvPolishCareerSoftwareHouse', 'Gate 4-D-B1 Career architecture', failures);
  if ((career.pads || 0) !== 1) failures.push(`Gate 4-D-B1 Career failed: pads=${career.pads || 0}`);
  if ((career.sourceAssets || 0) < 1) failures.push(`Gate 4-D-B1 Career failed: sourceAssets=${career.sourceAssets || 0}`);
  if ((career.architectureAssets || 0) !== 1) failures.push(`Gate 4-D-B1 Career failed: architectureAssets=${career.architectureAssets || 0}`);
  if ((career.softwareHouseBuildings || 0) !== 1) failures.push(`Gate 4-D-B1 Career failed: softwareHouseBuildings=${career.softwareHouseBuildings || 0}`);
  if ((career.buildingShells || 0) !== 1) failures.push(`Gate 4-D-B1 Career failed: buildingShells=${career.buildingShells || 0}`);
  if ((career.glassFacades || 0) !== 1) failures.push(`Gate 4-D-B1 Career failed: glassFacades=${career.glassFacades || 0}`);
  if ((career.entranceCanopies || 0) !== 1) failures.push(`Gate 4-D-B1 Career failed: entranceCanopies=${career.entranceCanopies || 0}`);
  if ((career.experienceWalls || 0) !== 1) failures.push(`Gate 4-D-B1 Career failed: experienceWalls=${career.experienceWalls || 0}`);
  if ((career.lobbyGlows || 0) !== 1) failures.push(`Gate 4-D-B1 Career failed: lobbyGlows=${career.lobbyGlows || 0}`);
  if ((career.servicePaths || 0) !== 1) failures.push(`Gate 4-D-B1 Career failed: servicePaths=${career.servicePaths || 0}`);
  if ((career.connectorMarks || 0) !== 0) failures.push(`Gate 4-D-B1 Career failed: rejected connectorMarks=${career.connectorMarks || 0}`);
  if ((career.signs || 0) !== 0) failures.push(`Gate 4-D-B1 Career failed: rejected signs=${career.signs || 0}`);
  if ((career.lamps || 0) !== 0) failures.push(`Gate 4-D-B1 Career failed: rejected lamps=${career.lamps || 0}`);
}

function assertGate4DAwardsMuseumHall(result, failures) {
  const awards = result.gate4b5?.awards || {};

  assertAuthoredDistrictAsset(result, 'EnvPolishAwardsMuseumHall', 'Gate 4-D-B1 Awards architecture', failures);
  if ((awards.pads || 0) !== 1) failures.push(`Gate 4-D-B1 Awards failed: pads=${awards.pads || 0}`);
  if ((awards.sourceAssets || 0) < 1) failures.push(`Gate 4-D-B1 Awards failed: sourceAssets=${awards.sourceAssets || 0}`);
  if ((awards.authoredAssets || 0) < 1) failures.push(`Gate 4-D-B1 Awards failed: authoredAssets=${awards.authoredAssets || 0}`);
  if ((awards.architectureAssets || 0) !== 1) failures.push(`Gate 4-D-B1 Awards failed: architectureAssets=${awards.architectureAssets || 0}`);
  if ((awards.museumHalls || 0) !== 1) failures.push(`Gate 4-D-B1 Awards failed: museumHalls=${awards.museumHalls || 0}`);
  if ((awards.galleryBases || 0) !== 1) failures.push(`Gate 4-D-B1 Awards failed: galleryBases=${awards.galleryBases || 0}`);
  if ((awards.plaqueWalls || 0) !== 1) failures.push(`Gate 4-D-B1 Awards failed: plaqueWalls=${awards.plaqueWalls || 0}`);
  if ((awards.certificateFrames || 0) < 6) failures.push(`Gate 4-D-B1 Awards failed: certificateFrames=${awards.certificateFrames || 0}`);
  if ((awards.ceremonialSteps || 0) < 4) failures.push(`Gate 4-D-B1 Awards failed: ceremonialSteps=${awards.ceremonialSteps || 0}`);
  if ((awards.trophyPlinths || 0) < 3) failures.push(`Gate 4-D-B1 Awards failed: trophyPlinths=${awards.trophyPlinths || 0}`);
  if ((awards.warmAccents || 0) < 3) failures.push(`Gate 4-D-B1 Awards failed: warmAccents=${awards.warmAccents || 0}`);
  if ((awards.signs || 0) !== 0) failures.push(`Gate 4-D-B1 Awards failed: rejected signs=${awards.signs || 0}`);
  if ((awards.lamps || 0) !== 0) failures.push(`Gate 4-D-B1 Awards failed: rejected lamps=${awards.lamps || 0}`);
}

function assertGate4CB1SourceSouthRun(result, failures) {
  const southRun = result.gate4b1 || {};
  const cv = southRun.cv || {};
  const behind = southRun.behind || {};
  const placement = result.gate3rPlacement || {};

  if (!southRun.enabled) failures.push('Gate 4-C-B1 failed: South Run replacement inactive');
  if ((southRun.staticBatches || 0) < 1) failures.push(`Gate 4-C-B1 batching failed: staticBatches=${southRun.staticBatches || 0}`);

  if ((cv.pads || 0) !== 1) failures.push(`Gate 4-C-B1 CV failed: pads=${cv.pads || 0}`);
  if ((cv.sourceAssets || 0) < 4) failures.push(`Gate 4-C-B1 CV failed: sourceAssets=${cv.sourceAssets || 0}`);
  if ((cv.vaultShells || 0) !== 1) failures.push(`Gate 4-C-B1 CV failed: vaultShells=${cv.vaultShells || 0}`);
  if ((cv.vaultDoors || 0) !== 1) failures.push(`Gate 4-C-B1 CV failed: vaultDoors=${cv.vaultDoors || 0}`);
  if ((cv.documentSpines || 0) < 5) failures.push(`Gate 4-C-B1 CV failed: documentSpines=${cv.documentSpines || 0}`);
  if ((cv.accessKiosks || 0) !== 1) failures.push(`Gate 4-C-B1 CV failed: accessKiosks=${cv.accessKiosks || 0}`);
  if ((cv.pdfBeacons || 0) !== 1) failures.push(`Gate 4-C-B1 CV failed: pdfBeacons=${cv.pdfBeacons || 0}`);
  if ((cv.groundInlays || 0) !== 1) failures.push(`Gate 4-C-B1 CV failed: groundInlays=${cv.groundInlays || 0}`);
  if ((cv.signs || 0) !== 0) failures.push(`Gate 4-C-B1 CV failed: rejected signs=${cv.signs || 0}`);
  if ((cv.lamps || 0) !== 0) failures.push(`Gate 4-C-B1 CV failed: rejected lamps=${cv.lamps || 0}`);

  if ((behind.pads || 0) !== 1) failures.push(`Gate 4-C-B1 Behind failed: pads=${behind.pads || 0}`);
  if ((behind.sourceAssets || 0) < 7) failures.push(`Gate 4-C-B1 Behind failed: sourceAssets=${behind.sourceAssets || 0}`);
  if ((behind.garageShells || 0) !== 1) failures.push(`Gate 4-C-B1 Behind failed: garageShells=${behind.garageShells || 0}`);
  if ((behind.workbenches || 0) !== 1) failures.push(`Gate 4-C-B1 Behind failed: workbenches=${behind.workbenches || 0}`);
  if ((behind.toolWalls || 0) !== 3) failures.push(`Gate 4-C-B1 Behind failed: toolWalls=${behind.toolWalls || 0}`);
  if ((behind.pipelinePanels || 0) < 4) failures.push(`Gate 4-C-B1 Behind failed: pipelinePanels=${behind.pipelinePanels || 0}`);
  if ((behind.sourceTotems || 0) !== 1) failures.push(`Gate 4-C-B1 Behind failed: sourceTotems=${behind.sourceTotems || 0}`);
  if ((behind.statusLights || 0) !== 4) failures.push(`Gate 4-C-B1 Behind failed: statusLights=${behind.statusLights || 0}`);
  if ((behind.signs || 0) !== 0) failures.push(`Gate 4-C-B1 Behind failed: rejected signs=${behind.signs || 0}`);
  if ((behind.lamps || 0) !== 0) failures.push(`Gate 4-C-B1 Behind failed: rejected lamps=${behind.lamps || 0}`);

  if ((placement.byFootprintKind?.['gate4c-cv-footprint'] || 0) !== 1) {
    failures.push(`Gate 4-C-B1 placement failed: CV footprints=${placement.byFootprintKind?.['gate4c-cv-footprint'] || 0}`);
  }
  if ((placement.byFootprintKind?.['gate4c-behind-footprint'] || 0) !== 1) {
    failures.push(`Gate 4-C-B1 placement failed: Behind footprints=${placement.byFootprintKind?.['gate4c-behind-footprint'] || 0}`);
  }
  for (const [kind, expected] of [
    ['gate4c-cv-vault-shell', 1],
    ['gate4c-cv-vault-door', 1],
    ['gate4c-cv-document-spine', 5],
    ['gate4c-cv-access-kiosk', 1],
    ['gate4c-cv-pdf-beacon', 1],
    ['gate4c-cv-ground-inlay', 1],
    ['gate4c-behind-garage-shell', 1],
    ['gate4c-behind-workbench', 1],
    ['gate4c-behind-tool-wall', 3],
    ['gate4c-behind-pipeline-panel', 1],
    ['gate4c-behind-source-totem', 1],
    ['gate4c-behind-status-light', 4]
  ]) {
    if ((placement.byKind?.[kind] || 0) !== expected) {
      failures.push(`Gate 4-C-B1 placement failed: ${kind}=${placement.byKind?.[kind] || 0}`);
    }
  }
  for (const kind of ['gate4b1-document', 'gate4b1-hologram', 'gate4b1-vault', 'gate4b1-workbench']) {
    if ((placement.byKind?.[kind] || 0) !== 0) {
      failures.push(`Gate 4-C-B1 placement failed: rejected ${kind}=${placement.byKind?.[kind] || 0}`);
    }
  }
}

function assertGate4CB2SourceGallerySide(result, failures, options = {}) {
  const eastSide = result.gate4b4 || {};
  const projects = eastSide.projects || {};
  const career = eastSide.career || {};
  const placement = result.gate3rPlacement || {};

  if (!eastSide.enabled) failures.push('Gate 4-C-B2 failed: East Side scaffold inactive');
  if ((eastSide.staticBatches || 0) < 1) failures.push(`Gate 4-C-B2 batching failed: staticBatches=${eastSide.staticBatches || 0}`);

  if ((projects.pads || 0) !== 1) failures.push(`Gate 4-C-B2 Projects failed: pads=${projects.pads || 0}`);
  if ((projects.sourceAssets || 0) < 7) failures.push(`Gate 4-C-B2 Projects failed: sourceAssets=${projects.sourceAssets || 0}`);
  if ((projects.authoredAssets || 0) < 7) failures.push(`Gate 4-C-B2 Projects failed: authoredAssets=${projects.authoredAssets || 0}`);
  if ((projects.workshopShells || 0) !== 1) failures.push(`Gate 4-C-B2 Projects failed: workshopShells=${projects.workshopShells || 0}`);
  if ((projects.buildGantries || 0) !== 1) failures.push(`Gate 4-C-B2 Projects failed: buildGantries=${projects.buildGantries || 0}`);
  if ((projects.displayBays || 0) !== 3) failures.push(`Gate 4-C-B2 Projects failed: displayBays=${projects.displayBays || 0}`);
  if ((projects.testBenches || 0) !== 1) failures.push(`Gate 4-C-B2 Projects failed: testBenches=${projects.testBenches || 0}`);
  if ((projects.cableTrays || 0) !== 1) failures.push(`Gate 4-C-B2 Projects failed: cableTrays=${projects.cableTrays || 0}`);
  if ((projects.sparkEmitters || 0) !== 4) failures.push(`Gate 4-C-B2 Projects failed: sparkEmitters=${projects.sparkEmitters || 0}`);
  if ((projects.groundPlates || 0) !== 1) failures.push(`Gate 4-C-B2 Projects failed: groundPlates=${projects.groundPlates || 0}`);
  if ((projects.signs || 0) !== 0) failures.push(`Gate 4-C-B2 Projects failed: rejected signs=${projects.signs || 0}`);
  if ((projects.lamps || 0) !== 0) failures.push(`Gate 4-C-B2 Projects failed: rejected lamps=${projects.lamps || 0}`);

  if (options.careerArchitecture) {
    assertGate4DCareerSoftwareHouse(result, failures);
  } else {
    if ((career.pads || 0) !== 1) failures.push(`Gate 4-C-B2 Career failed: pads=${career.pads || 0}`);
    if ((career.sourceAssets || 0) < 3) failures.push(`Gate 4-C-B2 Career failed: sourceAssets=${career.sourceAssets || 0}`);
    if ((career.buildingShells || 0) !== 1) failures.push(`Gate 4-C-B2 Career failed: buildingShells=${career.buildingShells || 0}`);
    if ((career.glassFacades || 0) !== 1) failures.push(`Gate 4-C-B2 Career failed: glassFacades=${career.glassFacades || 0}`);
    if ((career.entranceCanopies || 0) !== 1) failures.push(`Gate 4-C-B2 Career failed: entranceCanopies=${career.entranceCanopies || 0}`);
    if ((career.experienceWalls || 0) !== 1) failures.push(`Gate 4-C-B2 Career failed: experienceWalls=${career.experienceWalls || 0}`);
    if ((career.lobbyGlows || 0) !== 1) failures.push(`Gate 4-C-B2 Career failed: lobbyGlows=${career.lobbyGlows || 0}`);
    if ((career.servicePaths || 0) !== 1) failures.push(`Gate 4-C-B2 Career failed: servicePaths=${career.servicePaths || 0}`);
    if ((career.connectorMarks || 0) !== 0) failures.push(`Gate 4-C-B2 Career failed: rejected connectorMarks=${career.connectorMarks || 0}`);
    if ((career.signs || 0) !== 0) failures.push(`Gate 4-C-B2 Career failed: rejected signs=${career.signs || 0}`);
    if ((career.lamps || 0) !== 0) failures.push(`Gate 4-C-B2 Career failed: rejected lamps=${career.lamps || 0}`);
  }

  const expectedPlacements = [
    ['gate4c-projects-footprint', 1],
    ['gate4c-projects-workshop-shell', 1],
    ['gate4c-projects-build-gantry', 1],
    ['gate4c-projects-display-bay', 3],
    ['gate4c-projects-test-bench', 1],
    ['gate4c-projects-cable-tray', 1],
    ['gate4c-projects-spark-emitter', 4]
  ];
  if (options.careerArchitecture) {
    expectedPlacements.push(
      ['gate4d-career-footprint', 1],
      ['gate4d-career-software-house', 1],
      ['gate4d-career-entry-axis', 1]
    );
  } else {
    expectedPlacements.push(
    ['gate4c-career-footprint', 1],
    ['gate4c-career-building-shell', 1],
    ['gate4c-career-glass-facade', 1],
    ['gate4c-career-experience-wall', 1],
    ['gate4c-career-entrance-canopy', 1],
    ['gate4c-career-lobby-glow', 1],
    ['gate4c-career-service-path', 1]
    );
  }
  for (const [kind, expected] of expectedPlacements) {
    const source = kind.endsWith('footprint') ? placement.byFootprintKind : placement.byKind;
    if ((source?.[kind] || 0) !== expected) {
      failures.push(`Gate 4-C-B2 placement failed: ${kind}=${source?.[kind] || 0}`);
    }
  }
  const rejectedKinds = ['gate4b4-project-rack', 'gate4b4-project-spark', 'gate4b4-career-office', 'gate4b4-career-facade', 'gate4b4-career-frame', 'gate4b4-career-connector'];
  if (options.careerArchitecture) {
    rejectedKinds.push(
      'gate4c-career-building-shell',
      'gate4c-career-glass-facade',
      'gate4c-career-experience-wall',
      'gate4c-career-entrance-canopy',
      'gate4c-career-lobby-glow',
      'gate4c-career-service-path'
    );
  }
  for (const kind of rejectedKinds) {
    if ((placement.byKind?.[kind] || 0) !== 0) {
      failures.push(`Gate 4-C-B2 placement failed: rejected ${kind}=${placement.byKind?.[kind] || 0}`);
    }
  }
}

function assertGate4CB3SourceWestService(result, failures) {
  const westService = result.gate4b2 || {};
  const skills = westService.skills || {};
  const farm = westService.farm || {};
  const placement = result.gate3rPlacement || {};

  if (!westService.enabled) failures.push('Gate 4-C-B3 failed: West Service replacement inactive');
  if ((westService.staticBatches || 0) < 1) failures.push(`Gate 4-C-B3 batching failed: staticBatches=${westService.staticBatches || 0}`);

  if ((skills.pads || 0) !== 1) failures.push(`Gate 4-C-B3 Skills failed: pads=${skills.pads || 0}`);
  if ((skills.sourceAssets || 0) < 5) failures.push(`Gate 4-C-B3 Skills failed: sourceAssets=${skills.sourceAssets || 0}`);
  if ((skills.dataHallShells || 0) !== 1) failures.push(`Gate 4-C-B3 Skills failed: dataHallShells=${skills.dataHallShells || 0}`);
  if ((skills.commandTerminals || 0) !== 1) failures.push(`Gate 4-C-B3 Skills failed: commandTerminals=${skills.commandTerminals || 0}`);
  if ((skills.frontendRacks || 0) !== 1) failures.push(`Gate 4-C-B3 Skills failed: frontendRacks=${skills.frontendRacks || 0}`);
  if ((skills.backendRacks || 0) !== 1) failures.push(`Gate 4-C-B3 Skills failed: backendRacks=${skills.backendRacks || 0}`);
  if ((skills.securityRacks || 0) !== 1) failures.push(`Gate 4-C-B3 Skills failed: securityRacks=${skills.securityRacks || 0}`);
  if ((skills.statusRings || 0) !== 1) failures.push(`Gate 4-C-B3 Skills failed: statusRings=${skills.statusRings || 0}`);
  if ((skills.cableFloors || 0) !== 3) failures.push(`Gate 4-C-B3 Skills failed: cableFloors=${skills.cableFloors || 0}`);
  if ((skills.signs || 0) !== 0) failures.push(`Gate 4-C-B3 Skills failed: rejected signs=${skills.signs || 0}`);
  if ((skills.lamps || 0) !== 0) failures.push(`Gate 4-C-B3 Skills failed: rejected lamps=${skills.lamps || 0}`);

  if ((farm.pads || 0) !== 1) failures.push(`Gate 4-C-B3 Potato failed: pads=${farm.pads || 0}`);
  if ((farm.sourceAssets || 0) < 1) failures.push(`Gate 4-C-B3 Potato failed: sourceAssets=${farm.sourceAssets || 0}`);
  if ((farm.farmRows || 0) !== 5) failures.push(`Gate 4-C-B3 Potato failed: farmRows=${farm.farmRows || 0}`);
  if ((farm.irrigationRuns || 0) !== 1) failures.push(`Gate 4-C-B3 Potato failed: irrigationRuns=${farm.irrigationRuns || 0}`);
  if ((farm.counterStands || 0) !== 1) failures.push(`Gate 4-C-B3 Potato failed: counterStands=${farm.counterStands || 0}`);
  if ((farm.summonPatches || 0) !== 1) failures.push(`Gate 4-C-B3 Potato failed: summonPatches=${farm.summonPatches || 0}`);
  if ((farm.fenceVisuals || 0) !== 4) failures.push(`Gate 4-C-B3 Potato failed: fenceVisuals=${farm.fenceVisuals || 0}`);
  if ((farm.crates || 0) !== 3) failures.push(`Gate 4-C-B3 Potato failed: crates=${farm.crates || 0}`);
  if ((farm.signs || 0) !== 0) failures.push(`Gate 4-C-B3 Potato failed: rejected signs=${farm.signs || 0}`);
  if ((farm.lamps || 0) !== 0) failures.push(`Gate 4-C-B3 Potato failed: rejected lamps=${farm.lamps || 0}`);

  for (const [kind, expected] of [
    ['gate4c-skills-footprint', 1],
    ['gate4c-skills-data-hall-shell', 1],
    ['gate4c-skills-command-terminal', 1],
    ['gate4c-skills-rack-frontend', 1],
    ['gate4c-skills-rack-backend', 1],
    ['gate4c-skills-rack-security', 1],
    ['gate4c-skills-status-ring', 1],
    ['gate4c-skills-cable-floor', 3],
    ['gate4c-potato-footprint', 1],
    ['gate4c-potato-row', 5],
    ['gate4c-potato-irrigation', 1],
    ['gate4c-potato-counter-stand', 1],
    ['gate4c-potato-summon-patch', 1],
    ['gate4c-potato-fence-visual', 4],
    ['gate4c-potato-crate', 3]
  ]) {
    const source = kind.endsWith('footprint') ? placement.byFootprintKind : placement.byKind;
    if ((source?.[kind] || 0) !== expected) {
      failures.push(`Gate 4-C-B3 placement failed: ${kind}=${source?.[kind] || 0}`);
    }
  }

  for (const kind of [
    'gate4b2-skills-terminal',
    'gate4b2-skills-node',
    'gate4b2-skills-card',
    'gate4b2-skills-ring',
    'gate4b2-skills-ribbon',
    'gate4b2-farm-row',
    'gate4b2-farm-fence',
    'gate4b2-farm-anchor'
  ]) {
    if ((placement.byKind?.[kind] || 0) !== 0) {
      failures.push(`Gate 4-C-B3 placement failed: rejected ${kind}=${placement.byKind?.[kind] || 0}`);
    }
  }
  for (const kind of ['gate4b2-skills-pad', 'gate4b2-farm-pad']) {
    if ((placement.byFootprintKind?.[kind] || 0) !== 0) {
      failures.push(`Gate 4-C-B3 placement failed: rejected ${kind}=${placement.byFootprintKind?.[kind] || 0}`);
    }
  }
}

function assertGate4CB4SourceSignalHarbor(result, failures) {
  const eastSide = result.gate4b4 || {};
  const harbor = eastSide.harbor || {};
  const placement = result.gate3rPlacement || {};

  if (!eastSide.enabled) failures.push('Gate 4-C-B4 failed: East Side scaffold inactive');
  if ((eastSide.staticBatches || 0) < 1) failures.push(`Gate 4-C-B4 batching failed: staticBatches=${eastSide.staticBatches || 0}`);

  if ((harbor.deckPads || 0) !== 1) failures.push(`Gate 4-C-B4 Harbor failed: deckPads=${harbor.deckPads || 0}`);
  if ((harbor.sourceAssets || 0) < 4) failures.push(`Gate 4-C-B4 Harbor failed: sourceAssets=${harbor.sourceAssets || 0}`);
  if ((harbor.deckPlatforms || 0) !== 1) failures.push(`Gate 4-C-B4 Harbor failed: deckPlatforms=${harbor.deckPlatforms || 0}`);
  if ((harbor.deckSeams || 0) !== 5) failures.push(`Gate 4-C-B4 Harbor failed: deckSeams=${harbor.deckSeams || 0}`);
  if ((harbor.deckEdges || 0) !== 4) failures.push(`Gate 4-C-B4 Harbor failed: deckEdges=${harbor.deckEdges || 0}`);
  if ((harbor.signalMasts || 0) !== 1) failures.push(`Gate 4-C-B4 Harbor failed: signalMasts=${harbor.signalMasts || 0}`);
  if ((harbor.relayMasts || 0) !== 1) failures.push(`Gate 4-C-B4 Harbor failed: relayMasts=${harbor.relayMasts || 0}`);
  if ((harbor.contactTerminals || 0) !== 3) failures.push(`Gate 4-C-B4 Harbor failed: contactTerminals=${harbor.contactTerminals || 0}`);
  if ((harbor.githubTerminals || 0) !== 1) failures.push(`Gate 4-C-B4 Harbor failed: githubTerminals=${harbor.githubTerminals || 0}`);
  if ((harbor.linkedinTerminals || 0) !== 1) failures.push(`Gate 4-C-B4 Harbor failed: linkedinTerminals=${harbor.linkedinTerminals || 0}`);
  if ((harbor.emailTerminals || 0) !== 1) failures.push(`Gate 4-C-B4 Harbor failed: emailTerminals=${harbor.emailTerminals || 0}`);
  if ((harbor.beacons || 0) !== 2) failures.push(`Gate 4-C-B4 Harbor failed: beacons=${harbor.beacons || 0}`);
  if ((harbor.beaconPulses || 0) !== 2) failures.push(`Gate 4-C-B4 Harbor failed: beaconPulses=${harbor.beaconPulses || 0}`);
  if ((harbor.signs || 0) !== 0) failures.push(`Gate 4-C-B4 Harbor failed: rejected signs=${harbor.signs || 0}`);
  if ((harbor.lamps || 0) !== 0) failures.push(`Gate 4-C-B4 Harbor failed: rejected lamps=${harbor.lamps || 0}`);

  for (const [kind, expected] of [
    ['gate4c-harbor-footprint', 1],
    ['gate4c-harbor-deck-seam', 5],
    ['gate4c-harbor-deck-edge', 4],
    ['gate4c-harbor-signal-mast', 1],
    ['gate4c-harbor-terminal-github', 1],
    ['gate4c-harbor-terminal-linkedin', 1],
    ['gate4c-harbor-terminal-email', 1],
    ['gate4c-harbor-beacon-pulse', 2]
  ]) {
    const source = kind.endsWith('footprint') ? placement.byFootprintKind : placement.byKind;
    if ((source?.[kind] || 0) !== expected) {
      failures.push(`Gate 4-C-B4 placement failed: ${kind}=${source?.[kind] || 0}`);
    }
  }

  for (const kind of ['gate4b4-harbor-mast', 'gate4b4-harbor-terminal', 'gate4b4-harbor-beacon']) {
    if ((placement.byKind?.[kind] || 0) !== 0) {
      failures.push(`Gate 4-C-B4 placement failed: rejected ${kind}=${placement.byKind?.[kind] || 0}`);
    }
  }
  if ((placement.byFootprintKind?.['gate4b4-harbor-deck'] || 0) !== 0) {
    failures.push(`Gate 4-C-B4 placement failed: rejected gate4b4-harbor-deck=${placement.byFootprintKind?.['gate4b4-harbor-deck'] || 0}`);
  }
}

function assertGate4CB5SourceNorthRidge(result, failures, options = {}) {
  const northRidge = result.gate4b5 || {};
  const awards = northRidge.awards || {};
  const sentinel = northRidge.sentinel || {};
  const circuit = northRidge.circuit || {};
  const placement = result.gate3rPlacement || {};

  if (!northRidge.enabled) failures.push('Gate 4-C-B5 failed: North Ridge scaffold inactive');
  if ((northRidge.staticBatches || 0) < 1) failures.push(`Gate 4-C-B5 batching failed: staticBatches=${northRidge.staticBatches || 0}`);

  if (options.awardsArchitecture) {
    assertGate4DAwardsMuseumHall(result, failures);
  } else {
    if ((awards.pads || 0) !== 1) failures.push(`Gate 4-C-B5 Awards failed: pads=${awards.pads || 0}`);
    if ((awards.sourceAssets || 0) < 1) failures.push(`Gate 4-C-B5 Awards failed: sourceAssets=${awards.sourceAssets || 0}`);
    if ((awards.galleryBases || 0) !== 1) failures.push(`Gate 4-C-B5 Awards failed: galleryBases=${awards.galleryBases || 0}`);
    if ((awards.plaqueWalls || 0) !== 1) failures.push(`Gate 4-C-B5 Awards failed: plaqueWalls=${awards.plaqueWalls || 0}`);
    if ((awards.certificateFrames || 0) !== 3) failures.push(`Gate 4-C-B5 Awards failed: certificateFrames=${awards.certificateFrames || 0}`);
    if ((awards.ceremonialSteps || 0) !== 3) failures.push(`Gate 4-C-B5 Awards failed: ceremonialSteps=${awards.ceremonialSteps || 0}`);
    if ((awards.trophyPlinths || 0) !== 3) failures.push(`Gate 4-C-B5 Awards failed: trophyPlinths=${awards.trophyPlinths || 0}`);
    if ((awards.warmAccents || 0) !== 3) failures.push(`Gate 4-C-B5 Awards failed: warmAccents=${awards.warmAccents || 0}`);
    if ((awards.signs || 0) !== 0) failures.push(`Gate 4-C-B5 Awards failed: rejected signs=${awards.signs || 0}`);
    if ((awards.lamps || 0) !== 0) failures.push(`Gate 4-C-B5 Awards failed: rejected lamps=${awards.lamps || 0}`);
  }

  if ((sentinel.pads || 0) !== 1) failures.push(`Gate 4-C-B5 Sentinel failed: pads=${sentinel.pads || 0}`);
  if ((sentinel.sourceAssets || 0) < 1) failures.push(`Gate 4-C-B5 Sentinel failed: sourceAssets=${sentinel.sourceAssets || 0}`);
  if ((sentinel.groundPlates || 0) !== 1) failures.push(`Gate 4-C-B5 Sentinel failed: groundPlates=${sentinel.groundPlates || 0}`);
  if ((sentinel.towerBases || 0) !== 1) failures.push(`Gate 4-C-B5 Sentinel failed: towerBases=${sentinel.towerBases || 0}`);
  if ((sentinel.scannerCrowns || 0) !== 1) failures.push(`Gate 4-C-B5 Sentinel failed: scannerCrowns=${sentinel.scannerCrowns || 0}`);
  if ((sentinel.alertWalls || 0) !== 1) failures.push(`Gate 4-C-B5 Sentinel failed: alertWalls=${sentinel.alertWalls || 0}`);
  if ((sentinel.packetShardPanels || 0) !== 2) failures.push(`Gate 4-C-B5 Sentinel failed: packetShardPanels=${sentinel.packetShardPanels || 0}`);
  if ((sentinel.signs || 0) !== 0) failures.push(`Gate 4-C-B5 Sentinel failed: rejected signs=${sentinel.signs || 0}`);
  if ((sentinel.lamps || 0) !== 0) failures.push(`Gate 4-C-B5 Sentinel failed: rejected lamps=${sentinel.lamps || 0}`);

  if ((circuit.pads || 0) !== 1) failures.push(`Gate 4-C-B5 Circuit failed: pads=${circuit.pads || 0}`);
  if ((circuit.sourceAssets || 0) < 1) failures.push(`Gate 4-C-B5 Circuit failed: sourceAssets=${circuit.sourceAssets || 0}`);
  if ((circuit.startGantries || 0) !== 1) failures.push(`Gate 4-C-B5 Circuit failed: startGantries=${circuit.startGantries || 0}`);
  if ((circuit.timingBooths || 0) !== 1) failures.push(`Gate 4-C-B5 Circuit failed: timingBooths=${circuit.timingBooths || 0}`);
  if ((circuit.startLights || 0) !== 3) failures.push(`Gate 4-C-B5 Circuit failed: startLights=${circuit.startLights || 0}`);
  if ((circuit.checkpointMarkers || 0) !== 1) failures.push(`Gate 4-C-B5 Circuit failed: checkpointMarkers=${circuit.checkpointMarkers || 0}`);
  if ((circuit.routeArrows || 0) !== 2) failures.push(`Gate 4-C-B5 Circuit failed: routeArrows=${circuit.routeArrows || 0}`);
  if ((circuit.pocketCurbVisuals || 0) !== 2) failures.push(`Gate 4-C-B5 Circuit failed: pocketCurbVisuals=${circuit.pocketCurbVisuals || 0}`);
  if ((circuit.signs || 0) !== 0) failures.push(`Gate 4-C-B5 Circuit failed: rejected signs=${circuit.signs || 0}`);
  if ((circuit.lamps || 0) !== 0) failures.push(`Gate 4-C-B5 Circuit failed: rejected lamps=${circuit.lamps || 0}`);

  const expectedFootprints = [
    ['gate4c-sentinel-footprint', 1],
    ['gate4c-circuit-footprint', 1]
  ];
  expectedFootprints.unshift(options.awardsArchitecture ? ['gate4d-awards-footprint', 1] : ['gate4c-awards-footprint', 1]);
  for (const [kind, expected] of expectedFootprints) {
    if ((placement.byFootprintKind?.[kind] || 0) !== expected) {
      failures.push(`Gate 4-C-B5 footprint failed: ${kind}=${placement.byFootprintKind?.[kind] || 0}`);
    }
  }

  const expectedPlacements = [
    ['gate4c-sentinel-tower-base', 1],
    ['gate4c-sentinel-scanner-crown', 1],
    ['gate4c-sentinel-alert-wall', 1],
    ['gate4c-sentinel-packet-shard-panel', 2],
    ['gate4c-circuit-start-gantry', 1],
    ['gate4c-circuit-timing-booth', 1],
    ['gate4c-circuit-pocket-curb', 2],
    ['gate4c-circuit-start-light', 3],
    ['gate4c-circuit-checkpoint-marker', 1],
    ['gate4c-circuit-route-arrow', 2]
  ];
  if (options.awardsArchitecture) {
    expectedPlacements.unshift(['gate4d-awards-museum-hall', 1]);
  } else {
    expectedPlacements.unshift(
    ['gate4c-awards-ceremonial-step', 3],
    ['gate4c-awards-plaque-wall', 1],
    ['gate4c-awards-certificate-frame', 3],
    ['gate4c-awards-monument', 1],
    ['gate4c-awards-trophy-plinth', 3],
    ['gate4c-awards-warm-accent', 3]
    );
  }
  for (const [kind, expected] of expectedPlacements) {
    if ((placement.byKind?.[kind] || 0) !== expected) {
      failures.push(`Gate 4-C-B5 placement failed: ${kind}=${placement.byKind?.[kind] || 0}`);
    }
  }

  const rejectedKinds = [
    'gate4b5-awards-step',
    'gate4b5-awards-plinth',
    'gate4b5-awards-accent',
    'gate4b5-awards-monument',
    'gate4b5-sentinel-tower',
    'gate4b5-sentinel-totem',
    'gate4b5-sentinel-shard',
    'gate4b5-circuit-gate',
    'gate4b5-circuit-curb',
    'gate4b5-circuit-light'
  ];
  if (options.awardsArchitecture) {
    rejectedKinds.push(
      'gate4c-awards-ceremonial-step',
      'gate4c-awards-plaque-wall',
      'gate4c-awards-certificate-frame',
      'gate4c-awards-monument',
      'gate4c-awards-trophy-plinth',
      'gate4c-awards-warm-accent'
    );
  }
  for (const kind of rejectedKinds) {
    if ((placement.byKind?.[kind] || 0) !== 0) {
      failures.push(`Gate 4-C-B5 placement failed: rejected ${kind}=${placement.byKind?.[kind] || 0}`);
    }
  }

  const rejectedFootprints = ['gate4b5-awards-pad', 'gate4b5-sentinel-pad', 'gate4b5-circuit-pad'];
  if (options.awardsArchitecture) {
    rejectedFootprints.push('gate4c-awards-footprint');
  }
  for (const kind of rejectedFootprints) {
    if ((placement.byFootprintKind?.[kind] || 0) !== 0) {
      failures.push(`Gate 4-C-B5 footprint failed: rejected ${kind}=${placement.byFootprintKind?.[kind] || 0}`);
    }
  }
}

function assertGate4CB6SourceTodoPlanningStudio(result, failures) {
  const dataPierSide = result.gate4b3 || {};
  const todo = dataPierSide.todo || {};
  const dataPier = dataPierSide.dataPier || {};
  const placement = result.gate3rPlacement || {};

  if (!dataPierSide.enabled) failures.push('Gate 4-C-B6 failed: Todo Planning Studio inactive');
  if ((dataPierSide.staticBatches || 0) < 1) failures.push(`Gate 4-C-B6 batching failed: staticBatches=${dataPierSide.staticBatches || 0}`);

  if ((todo.pads || 0) !== 1) failures.push(`Gate 4-C-B6 Todo failed: pads=${todo.pads || 0}`);
  if ((todo.sourceAssets || 0) < 5) failures.push(`Gate 4-C-B6 Todo failed: sourceAssets=${todo.sourceAssets || 0}`);
  if ((todo.boardWalls || 0) !== 1) failures.push(`Gate 4-C-B6 Todo failed: boardWalls=${todo.boardWalls || 0}`);
  if ((todo.studioDesks || 0) !== 1) failures.push(`Gate 4-C-B6 Todo failed: studioDesks=${todo.studioDesks || 0}`);
  if ((todo.reviewLanes || 0) !== 3) failures.push(`Gate 4-C-B6 Todo failed: reviewLanes=${todo.reviewLanes || 0}`);
  if ((todo.taskCrates || 0) !== 1) failures.push(`Gate 4-C-B6 Todo failed: taskCrates=${todo.taskCrates || 0}`);
  if ((todo.statusPips || 0) !== 6) failures.push(`Gate 4-C-B6 Todo failed: statusPips=${todo.statusPips || 0}`);
  if ((todo.containedCardStacks || 0) !== 2) failures.push(`Gate 4-C-B6 Todo failed: containedCardStacks=${todo.containedCardStacks || 0}`);
  if ((todo.groundInlays || 0) !== 3) failures.push(`Gate 4-C-B6 Todo failed: groundInlays=${todo.groundInlays || 0}`);
  if ((todo.taskBoards || 0) !== 1) failures.push(`Gate 4-C-B6 Todo failed: taskBoards=${todo.taskBoards || 0}`);
  if ((todo.queueRails || 0) !== 3) failures.push(`Gate 4-C-B6 Todo failed: review-lane queueRails=${todo.queueRails || 0}`);
  if ((todo.taskCards || 0) !== 8) failures.push(`Gate 4-C-B6 Todo failed: contained taskCards=${todo.taskCards || 0}`);
  if ((todo.signs || 0) !== 0) failures.push(`Gate 4-C-B6 Todo failed: rejected signs=${todo.signs || 0}`);
  if ((todo.lamps || 0) !== 0) failures.push(`Gate 4-C-B6 Todo failed: rejected lamps=${todo.lamps || 0}`);

  for (const [key, value] of Object.entries(dataPier)) {
    if ((value || 0) !== 0) failures.push(`Gate 4-C-B6 Data Pier compatibility failed: physical ${key}=${value || 0}`);
  }

  for (const [kind, expected] of [
    ['gate4c-todo-footprint', 1],
    ['gate4c-todo-board-wall', 1],
    ['gate4c-todo-studio-desk', 1],
    ['gate4c-todo-kanban-cards', 2],
    ['gate4c-todo-task-crate', 1],
    ['gate4c-todo-review-lane', 3],
    ['gate4c-todo-status-pip', 6],
    ['gate4c-todo-ground-inlay', 3]
  ]) {
    const source = kind.endsWith('footprint') ? placement.byFootprintKind : placement.byKind;
    if ((source?.[kind] || 0) !== expected) {
      failures.push(`Gate 4-C-B6 placement failed: ${kind}=${source?.[kind] || 0}`);
    }
  }

  for (const kind of [
    'gate4b3-todo-board',
    'gate4b3-todo-rail',
    'gate4b3-todo-card',
    'gate4b3-pier-rail',
    'gate4b3-pier-beacon',
    'gate4b3-pier-cargo'
  ]) {
    if ((placement.byKind?.[kind] || 0) !== 0) {
      failures.push(`Gate 4-C-B6 placement failed: rejected ${kind}=${placement.byKind?.[kind] || 0}`);
    }
  }

  for (const kind of ['gate4b3-todo-pad', 'gate4b3-data-pier-pad']) {
    if ((placement.byFootprintKind?.[kind] || 0) !== 0) {
      failures.push(`Gate 4-C-B6 footprint failed: rejected ${kind}=${placement.byFootprintKind?.[kind] || 0}`);
    }
  }
}

function assertStuntCoveDeleted(result, failures) {
  if (worldZones.some((zone) => zone.id === 'drift' || zone.districtId === 'stunt-cove')) {
    failures.push('Stunt Cove deletion failed: drift/stunt-cove zone still exists');
  }
  if (districtFootprints.some((district) => district.id === 'stunt-cove')) {
    failures.push('Stunt Cove deletion failed: stunt-cove district still exists');
  }
  if (roadPaths.some((path) => path.id === 'stunt-service' || path.hierarchy === 'stunt')) {
    failures.push('Stunt Cove deletion failed: stunt-service road still exists');
  }
  if ((result.gate4b6?.enabled || false)) {
    failures.push('Stunt Cove deletion failed: Gate 4-B6 scaffold is enabled');
  }
  if ((result.stuntPark?.ramps || 0) !== 0 || (result.stuntPark?.boostPads || 0) !== 0 || (result.stuntPark?.gates || 0) !== 0 || (result.stuntPark?.fullPhysicalColliders || 0) !== 0) {
    failures.push('Stunt Cove deletion failed: stunt park runtime objects or colliders are active');
  }
}

function assertGate4B6StuntCoveVerification(result, failures, options = {}) {
  const expectedGoal = options.expectedGoal || 'gate-4b6-stunt-cove';
  const allowPrototypeStuntPark = Boolean(options.allowPrototypeStuntPark);
  assertGate4BRCompositionCorrectionVerification(result, failures, {
    expectedGoal,
    allowPrototypeStuntPark,
    allowedExtraColliderPrefixes: options.allowedExtraColliderPrefixes
  });

  const stuntCove = result.gate4b6 || {};
  const placement = result.gate3rPlacement || {};
  const placementKinds = placement.byKind || {};
  const footprintKinds = placement.byFootprintKind || {};

  if (!stuntCove.enabled) failures.push('Gate 4-B6 failed: Stunt Cove scaffold inactive');
  if ((stuntCove.pads || 0) !== 1) failures.push(`Gate 4-B6 failed: pads=${stuntCove.pads || 0}`);
  if ((stuntCove.entryGates || 0) !== 1) failures.push(`Gate 4-B6 failed: entryGates=${stuntCove.entryGates || 0}`);
  if ((stuntCove.laneCurbs || 0) !== 4) failures.push(`Gate 4-B6 failed: laneCurbs=${stuntCove.laneCurbs || 0}`);
  if ((stuntCove.slalomCones || 0) !== 8) failures.push(`Gate 4-B6 failed: slalomCones=${stuntCove.slalomCones || 0}`);
  if ((stuntCove.tireStacks || 0) !== 4) failures.push(`Gate 4-B6 failed: tireStacks=${stuntCove.tireStacks || 0}`);
  if ((stuntCove.startLines || 0) !== 3) failures.push(`Gate 4-B6 failed: startLines=${stuntCove.startLines || 0}`);
  if ((stuntCove.landingMarkers || 0) !== 4) failures.push(`Gate 4-B6 failed: landingMarkers=${stuntCove.landingMarkers || 0}`);
  if ((stuntCove.scorePosts || 0) !== 2) failures.push(`Gate 4-B6 failed: scorePosts=${stuntCove.scorePosts || 0}`);
  if ((stuntCove.arrowPanels || 0) !== 2) failures.push(`Gate 4-B6 failed: arrowPanels=${stuntCove.arrowPanels || 0}`);
  if ((stuntCove.trackScuffs || 0) !== 10) failures.push(`Gate 4-B6 failed: trackScuffs=${stuntCove.trackScuffs || 0}`);
  if ((stuntCove.physicalColliders || 0) !== 0) failures.push(`Gate 4-B6 failed: physicalColliders=${stuntCove.physicalColliders || 0}`);
  if ((stuntCove.signs || 0) !== 0 || (stuntCove.lamps || 0) !== 0) {
    failures.push(`Gate 4-B6 failed: rejected signs/lamps signs=${stuntCove.signs || 0} lamps=${stuntCove.lamps || 0}`);
  }

  if ((footprintKinds['gate4b6-stunt-pad'] || 0) !== 1) {
    failures.push(`Gate 4-B6 placement failed: pad footprints=${footprintKinds['gate4b6-stunt-pad'] || 0}`);
  }
  for (const [kind, expected] of [
    ['gate4b6-stunt-gate', 1],
    ['gate4b6-stunt-curb', 4],
    ['gate4b6-stunt-startline', 3],
    ['gate4b6-stunt-cone', 8],
    ['gate4b6-stunt-tire-stack', 4],
    ['gate4b6-stunt-landing-marker', 4],
    ['gate4b6-stunt-score-post', 2],
    ['gate4b6-stunt-arrow-panel', 2],
    ['gate4b6-stunt-scuff', 10]
  ]) {
    if ((placementKinds[kind] || 0) !== expected) {
      failures.push(`Gate 4-B6 placement failed: ${kind}=${placementKinds[kind] || 0}/${expected}`);
    }
  }

  if ((placement.roadIntrusions || 0) !== 0) failures.push(`Gate 4-B6 placement failed: roadIntrusions=${placement.roadIntrusions || 0}`);
  if ((placement.footprintIntrusions || 0) !== 0) failures.push(`Gate 4-B6 placement failed: footprintIntrusions=${placement.footprintIntrusions || 0}`);
  if ((placement.shorelineFootprintIntrusions || 0) !== 0) {
    failures.push(`Gate 4-B6 placement failed: shorelineFootprintIntrusions=${placement.shorelineFootprintIntrusions || 0}`);
  }
  if (!allowPrototypeStuntPark && (result.colliderCount || 0) !== 2) failures.push(`Gate 4-B6 failed: colliderCount=${result.colliderCount || 0}`);
  if (allowPrototypeStuntPark && (result.colliderCount || 0) < 3) failures.push(`Gate 4-B6R failed: colliderCount=${result.colliderCount || 0}`);
  if (!allowPrototypeStuntPark && ((result.stuntPark?.ramps || 0) !== 0 || (result.stuntPark?.boostPads || 0) !== 0 || (result.stuntPark?.gates || 0) !== 0 || (result.stuntPark?.landingMarkers || 0) !== 0)) {
    failures.push('Gate 4-B6 failed: old StuntPark physical systems were enabled');
  }
}

function assertGate4B6RPhysicsPrototypeVerification(result, failures) {
  assertGate4B6StuntCoveVerification(result, failures, {
    expectedGoal: 'gate-4b6r-physics-prototype',
    allowPrototypeStuntPark: true
  });

  const stats = result.stuntPark || {};
  const prototype = result.stuntPrototype || {};
  const route = prototype.route || {};
  const miss = prototype.missRecovery || {};
  const colliderEvidence = prototype.colliderEvidence || {};
  const colliderSummary = result.colliderAudit?.summary || [];
  const rampCollider = colliderSummary.find((collider) => collider.name === 'STUNTB6R_training_ramp_collider');

  if (!stats.prototypeEnabled) failures.push('Gate 4-B6R prototype failed: prototype mode inactive');
  if (stats.prototypeLine !== 'beginner-loop') failures.push(`Gate 4-B6R prototype failed: line=${stats.prototypeLine || 'none'}`);
  if ((stats.prototypeRamps || 0) !== 1 || (stats.ramps || 0) !== 1) {
    failures.push(`Gate 4-B6R prototype failed: ramps=${stats.prototypeRamps || 0}/${stats.ramps || 0}`);
  }
  if ((stats.prototypePhysicalColliders || 0) !== 1) {
    failures.push(`Gate 4-B6R prototype failed: physicalColliders=${stats.prototypePhysicalColliders || 0}`);
  }
  if ((stats.prototypeLandingTargets || 0) < 2) failures.push(`Gate 4-B6R prototype failed: landingTargets=${stats.prototypeLandingTargets || 0}`);
  if ((stats.prototypeRunwayMarks || 0) < 4) failures.push(`Gate 4-B6R prototype failed: runwayMarks=${stats.prototypeRunwayMarks || 0}`);
  if ((stats.prototypeRecoveryGuides || 0) < 3) failures.push(`Gate 4-B6R prototype failed: recoveryGuides=${stats.prototypeRecoveryGuides || 0}`);
  if ((stats.boostPads || 0) !== 0 || (stats.gates || 0) !== 0 || (stats.landingMarkers || 0) !== 0) {
    failures.push('Gate 4-B6R prototype failed: rejected old StuntPark systems were enabled');
  }

  if (!prototype.enabled) failures.push('Gate 4-B6R route failed: prototype probe skipped');
  if ((prototype.screenshots?.length || 0) < 7) {
    failures.push(`Gate 4-B6R route failed: screenshots=${prototype.screenshots?.length || 0}`);
  }
  if (!colliderEvidence.rampVisualExists) failures.push('Gate 4-B6R collider failed: ramp visual missing');
  if (!colliderEvidence.rampCollider) failures.push('Gate 4-B6R collider failed: ramp collider missing from runtime evidence');
  if (!rampCollider || rampCollider.visualName !== 'STUNTB6R_training_ramp' || !rampCollider.visualExists) {
    failures.push('Gate 4-B6R collider failed: named ramp collider has no matching visible mesh');
  }

  if ((route.distance || 0) < 24) failures.push(`Gate 4-B6R route failed: distance=${route.distance || 0}`);
  if ((route.maxSpeed || 0) < 16) failures.push(`Gate 4-B6R route failed: maxSpeed=${route.maxSpeed || 0}`);
  if ((route.maxHeightDelta || 0) < 0.28) failures.push(`Gate 4-B6R route failed: maxHeightDelta=${route.maxHeightDelta || 0}`);
  if ((route.airborneFrames || 0) < 2) failures.push(`Gate 4-B6R route failed: airborneFrames=${route.airborneFrames || 0}`);
  if (!route.landingSeen) failures.push('Gate 4-B6R route failed: landing not observed');
  if (Math.max(route.finalGroundedWheels || 0, route.recoveredGroundedWheels || 0) < 2) {
    failures.push(`Gate 4-B6R route failed: recoveredGroundedWheels=${route.recoveredGroundedWheels || 0}, finalGroundedWheels=${route.finalGroundedWheels || 0}`);
  }
  if (route.finalSurface === 'water') failures.push('Gate 4-B6R route failed: ended in water');
  if ((route.halts || 0) !== 0) failures.push(`Gate 4-B6R route failed: halts=${route.halts || 0}`);
  if (!miss.recoverable) failures.push(`Gate 4-B6R miss recovery failed: recoverable=${miss.recoverable}`);
  if ((miss.halts || 0) !== 0) failures.push(`Gate 4-B6R miss recovery failed: halts=${miss.halts || 0}`);
}

function assertGate4B6RFullPlaygroundVerification(result, failures, options = {}) {
  assertGate4BRCompositionCorrectionVerification(result, failures, {
    expectedGoal: options.expectedGoal || 'gate-4b6r-full-stunt-playground',
    allowPrototypeStuntPark: true,
    allowedExtraColliderPrefixes: ['STUNTB6R_']
  });

  const stats = result.stuntPark || {};
  const full = result.stuntFull || {};
  const requiredLines = gate4B6RFullVerifierLines();
  const lineIds = new Set(stats.fullLineIds || []);
  const colliderEvidence = full.colliderEvidence || {};
  const stuntColliders = colliderEvidence.colliders || [];

  if (!stats.fullEnabled) failures.push('Gate 4-B6R-C failed: full playground mode inactive');
  for (const line of requiredLines) {
    if (!lineIds.has(line.id)) failures.push(`Gate 4-B6R-C failed: missing line id ${line.id}`);
  }
  if ((stats.fullRampCount || 0) < 5 || (stats.ramps || 0) < 5) {
    failures.push(`Gate 4-B6R-C failed: ramps=${stats.fullRampCount || 0}/${stats.ramps || 0}`);
  }
  if ((stats.fullBankedTurns || 0) < 1) failures.push(`Gate 4-B6R-C failed: bankedTurns=${stats.fullBankedTurns || 0}`);
  if ((stats.fullPhysicalColliders || 0) < 6) failures.push(`Gate 4-B6R-C failed: physicalColliders=${stats.fullPhysicalColliders || 0}`);
  if ((stats.fullLandingTargets || 0) < 10) failures.push(`Gate 4-B6R-C failed: landingTargets=${stats.fullLandingTargets || 0}`);
  if ((stats.fullRunwayMarks || 0) < 22) failures.push(`Gate 4-B6R-C failed: runwayMarks=${stats.fullRunwayMarks || 0}`);
  if ((stats.fullRecoveryGuides || 0) < 14) failures.push(`Gate 4-B6R-C failed: recoveryGuides=${stats.fullRecoveryGuides || 0}`);
  if ((stats.fullPrecisionGates || 0) < 10) failures.push(`Gate 4-B6R-C failed: precisionGates=${stats.fullPrecisionGates || 0}`);
  if ((stats.fullRiskMarkers || 0) < 4) failures.push(`Gate 4-B6R-C failed: riskMarkers=${stats.fullRiskMarkers || 0}`);
  if ((stats.fullFreePlayZones || 0) !== 1) failures.push(`Gate 4-B6R-C failed: freePlayZones=${stats.fullFreePlayZones || 0}`);
  if ((stats.boostPads || 0) !== 0 || (stats.gates || 0) !== 0) {
    failures.push('Gate 4-B6R-C failed: rejected old StuntPark boost/gate systems were enabled');
  }
  if ((result.gate4b6?.enabled || false)) {
    failures.push('Gate 4-B6R-C failed: old visual readiness yard is still active');
  }

  if (!full.enabled) failures.push('Gate 4-B6R-C route failed: full playground probe skipped');
  if ((full.screenshots?.length || 0) < 19) failures.push(`Gate 4-B6R-C route failed: screenshots=${full.screenshots?.length || 0}`);
  if (stuntColliders.length !== (stats.fullPhysicalColliders || 0)) {
    failures.push(`Gate 4-B6R-C collider failed: runtime stunt colliders=${stuntColliders.length} stats=${stats.fullPhysicalColliders || 0}`);
  }
  if ((colliderEvidence.missingVisuals || []).length) {
    failures.push(`Gate 4-B6R-C collider failed: missing visuals=${colliderEvidence.missingVisuals.join(', ')}`);
  }

  for (const line of requiredLines) {
    const resultLine = full.lines?.[line.id] || {};
    if ((resultLine.distance || 0) < line.minDistance) {
      failures.push(`Gate 4-B6R-C ${line.id} failed: distance=${resultLine.distance || 0}`);
    }
    if ((resultLine.maxHeightDelta || 0) < line.minHeight) {
      failures.push(`Gate 4-B6R-C ${line.id} failed: maxHeightDelta=${resultLine.maxHeightDelta || 0}`);
    }
    if ((resultLine.airborneFrames || 0) < line.minAirborne) {
      failures.push(`Gate 4-B6R-C ${line.id} failed: airborneFrames=${resultLine.airborneFrames || 0}`);
    }
    if (!resultLine.landingSeen) failures.push(`Gate 4-B6R-C ${line.id} failed: landing not observed`);
    if (Math.max(resultLine.finalGroundedWheels || 0, resultLine.recoveredGroundedWheels || 0) < 2) {
      failures.push(`Gate 4-B6R-C ${line.id} failed: recoveredGroundedWheels=${resultLine.recoveredGroundedWheels || 0}, finalGroundedWheels=${resultLine.finalGroundedWheels || 0}`);
    }
    if (resultLine.finalSurface === 'water') failures.push(`Gate 4-B6R-C ${line.id} failed: ended in water`);
    if ((resultLine.halts || 0) !== 0) failures.push(`Gate 4-B6R-C ${line.id} failed: halts=${resultLine.halts || 0}`);
  }

  if (!full.freePlay?.playable) failures.push('Gate 4-B6R-C freeplay failed: route not playable');
  if ((full.freePlay?.halts || 0) !== 0) failures.push(`Gate 4-B6R-C freeplay failed: halts=${full.freePlay?.halts || 0}`);
  if (!full.missRecovery?.recoverable) failures.push('Gate 4-B6R-C miss recovery failed: risk miss not recoverable');
  if ((full.missRecovery?.halts || 0) !== 0) failures.push(`Gate 4-B6R-C miss recovery failed: halts=${full.missRecovery?.halts || 0}`);
  if ((result.forwardDriveProbe?.halts || 0) !== 0) failures.push(`Gate 4-B6R-C failed: forwardDriveProbe.halts=${result.forwardDriveProbe?.halts || 0}`);
  if ((result.routeReplay?.failed || 0) !== 0) failures.push(`Gate 4-B6R-C failed: routeReplay.failed=${result.routeReplay?.failed || 0}`);
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
