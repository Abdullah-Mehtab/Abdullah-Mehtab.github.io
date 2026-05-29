// ABOUTME: Builds authored landmark staging and dense portfolio world set pieces.
// ABOUTME: Keeps protected assets intact while adding roadsides, signs, lights, and interaction scenery.
import * as THREE from 'three';
import { worldZones } from './worldData.js';
import { mergeStaticMeshesInGroup } from './StaticBatching.js';

const Y = 0.16;

export class SetPieces {
  constructor(world) {
    this.world = world;
    this.animated = [];
    this.securityScanObjects = [];
    this.securityScanMaterials = [];
    this.lifeDummy = new THREE.Object3D();
    this.ambienceDummy = new THREE.Object3D();
    this.lifeInstanceMeshes = [];
    this.lifeInstanceDirty = new Set();
    this.signAtlas = null;
    this.districtAmbience = {
      mesh: null,
      entries: [],
      visible: 0
    };
    this.lifeItems = {
      zonePulses: [],
      windBanners: [],
      whisperBeacons: [],
      terminalPulses: []
    };
    this.lifeStats = {
      zonePulses: 0,
      windBanners: 0,
      whisperBeacons: 0,
      terminalPulses: 0,
      districtMotes: 0,
      visibleZonePulses: 0,
      visibleWindBanners: 0,
      visibleWhisperBeacons: 0,
      visibleTerminalPulses: 0,
      visibleDistrictMotes: 0,
      visibleTotal: 0,
      motionSamples: 0
    };
    this.approachStats = {
      clusters: 0,
      signs: 0,
      lamps: 0,
      authoredAssets: 0,
      roadMarks: 0
    };
    this.gatewayStats = {
      gateways: 0,
      lanterns: 0,
      authoredAssets: 0,
      guideStrips: 0
    };
    this.districtStoryStats = {
      authoredAssets: 0,
      crateStacks: 0,
      terminalBanks: 0,
      archiveSteps: 0,
      todoStacks: 0
    };
  }

  build() {
    this.createStartDiorama();
    this.createEducationPlaza();
    this.createSecurityLab();
    this.createDistrictDressing();
    this.createApproachDressing();
    this.createDistrictGateways();
    this.createRouteGuidance();
    this.createLivingSignals();
    this.createDistrictAmbience();
    this.applyQuality();
  }

  update(dt, elapsed) {
    for (const item of this.animated) {
      if (item.instanceMesh) {
        this.writeLifeInstance(item, elapsed);
        this.lifeInstanceDirty.add(item.instanceMesh);
        continue;
      }
      if (item.active === false) continue;
      if (item.kind === 'ring') {
        item.mesh.rotation.z += dt * item.speed;
        item.mesh.material.opacity = item.baseOpacity + Math.sin(elapsed * item.pulse + item.phase) * item.opacityRange;
      } else if (item.kind === 'float') {
        item.mesh.position.y = item.baseY + Math.sin(elapsed * item.speed + item.phase) * item.range;
        item.mesh.rotation.y += dt * item.rotationSpeed;
      } else if (item.kind === 'light') {
        item.light.intensity = item.base + Math.sin(elapsed * item.speed + item.phase) * item.range;
      } else if (item.kind === 'pulse') {
        const pulse = item.baseScale + Math.sin(elapsed * item.speed + item.phase) * item.range;
        item.mesh.scale.setScalar(pulse);
        item.mesh.rotation.z += dt * item.rotationSpeed;
        item.mesh.material.opacity = item.baseOpacity + Math.sin(elapsed * item.speed + item.phase) * item.opacityRange;
        this.lifeStats.motionSamples += 1;
      } else if (item.kind === 'banner') {
        item.mesh.rotation.z = Math.sin(elapsed * item.speed + item.phase) * item.range;
        item.mesh.scale.x = item.baseScale + Math.sin(elapsed * item.speed * 1.31 + item.phase) * 0.08;
        this.lifeStats.motionSamples += 1;
      } else if (item.kind === 'beacon') {
        item.mesh.position.y = item.baseY + Math.sin(elapsed * item.speed + item.phase) * item.range;
        item.mesh.rotation.y += dt * item.rotationSpeed;
        item.mesh.material.opacity = item.baseOpacity + Math.sin(elapsed * item.speed + item.phase) * item.opacityRange;
        this.lifeStats.motionSamples += 1;
      }
    }
    for (const mesh of this.lifeInstanceDirty) mesh.instanceMatrix.needsUpdate = true;
    this.lifeInstanceDirty.clear();
    this.updateDistrictAmbience(elapsed);

    const scan = this.world.securityScan;
    const activePulse = scan.active ? 1 : scan.complete ? 0.55 : 0;
    for (const material of this.securityScanMaterials) {
      material.opacity = 0.32 + activePulse * 0.42 + Math.sin(elapsed * 8) * activePulse * 0.12;
    }
    for (const light of this.securityScanObjects) {
      if (light.isLight) {
        light.intensity = light.userData.baseIntensity + activePulse * light.userData.boost + Math.sin(elapsed * 12) * activePulse * 0.55;
      } else if (light.material) {
        light.material.opacity = 0.48 + activePulse * 0.34;
        light.scale.setScalar(1 + activePulse * 0.24);
      }
    }
  }

  applyQuality() {
    const limits = this.world.getQualityProfile().lifeSignals || {};
    this.applyLifeLimit('zonePulses', limits.zonePulses);
    this.applyLifeLimit('windBanners', limits.windBanners);
    this.applyLifeLimit('whisperBeacons', limits.whisperBeacons);
    this.applyLifeLimit('terminalPulses', limits.terminalPulses);
    this.applyDistrictAmbienceLimit(limits.districtMotes);
    this.lifeStats.visibleTotal =
      this.lifeStats.visibleZonePulses +
      this.lifeStats.visibleWindBanners +
      this.lifeStats.visibleWhisperBeacons +
      this.lifeStats.visibleTerminalPulses +
      this.lifeStats.visibleDistrictMotes;
  }

  applyLifeLimit(category, limit) {
    const items = this.lifeItems[category];
    const visibleLimit = Math.min(items.length, Number.isFinite(limit) ? limit : items.length);
    let visible = 0;
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      const active = index < visibleLimit;
      item.entry.active = active;
      if (item.root) item.root.visible = active;
      if (item.entry.instanceMesh) {
        this.writeLifeInstance(item.entry, 0);
        item.entry.instanceMesh.instanceMatrix.needsUpdate = true;
      }
      if (active) visible += 1;
    }
    const statName = `visible${category[0].toUpperCase()}${category.slice(1)}`;
    this.lifeStats[statName] = visible;
  }

  getLifeStats() {
    return { ...this.lifeStats };
  }

  getApproachStats() {
    return { ...this.approachStats };
  }

  getGatewayStats() {
    return { ...this.gatewayStats };
  }

  getDistrictStoryStats() {
    return { ...this.districtStoryStats };
  }

  createStartDiorama() {
    const zone = findZone('landing');
    const group = new THREE.Group();
    group.name = 'SETPIECE_Start_Diorama';

    this.groundRect(group, zone.position[0] + 2, zone.position[2] - 4, 27, 18, this.world.materials.plazaRoad, 0.118, 'StartLaunchPad');
    this.box(group, zone.position[0] + 2, 0.18, zone.position[2] - 12.9, 24, 0.04, 0.36, this.world.materials.glowBlue, 0, 'StartPadFrontGlow');
    this.box(group, zone.position[0] - 11.4, 0.18, zone.position[2] - 4, 0.36, 0.04, 15, this.world.materials.glow, 0, 'StartPadLeftGlow');

    const pavers = [
      [-7.5, -9.5, 3.2, 1.5, -0.48],
      [-3.2, -11.2, 3.1, 1.5, -0.22],
      [1.3, -11.8, 3.0, 1.5, 0.04],
      [5.8, -10.8, 3.4, 1.5, 0.26],
      [9.1, -7.8, 3.5, 1.5, 0.6],
      [-10.8, 1.8, 2.7, 1.2, 1.1],
      [11.2, 4.5, 2.9, 1.2, -0.9]
    ];
    for (const [dx, dz, sx, sz, rot] of pavers) {
      this.box(group, zone.position[0] + dx, 0.13, zone.position[2] + dz, sx, 0.08, sz, this.world.materials.paleStone, rot, 'StartPaver');
    }

    this.addLamp(group, zone.position[0] - 11.4, zone.position[2] - 10.5, 0xffc36a, 3.1, 'StartLampLeft');
    this.addLamp(group, zone.position[0] + 14.2, zone.position[2] - 9.4, 0x7cffb2, 3.0, 'StartLampRight');
    this.addLamp(group, zone.position[0] - 8.5, zone.position[2] + 7.4, 0x68d8ff, 2.8, 'StartLampRear');

    this.addSign(group, 'CLICK TO DRIVE', 'Portfolio Drive', zone.position[0] + 14.4, zone.position[2] + 5.8, -0.88, 0x7cffb2, 3.4, 'StartClickSign');
    this.addSign(group, 'FCCU', 'Education Grove', zone.position[0] - 20.5, zone.position[2] + 14.0, 0.74, 0x9ccfff, 2.6, 'StartFccSign');
    this.addSign(group, 'SECURITY', 'Scanner Route', zone.position[0] - 24.0, zone.position[2] - 12.0, 1.12, 0x68d8ff, 2.6, 'StartSecuritySign');

    this.addBench(group, zone.position[0] - 11.8, zone.position[2] + 4.5, 0.42, 0.92);
    this.addBench(group, zone.position[0] + 8.4, zone.position[2] + 11.2, -0.72, 0.88);
    this.addPolishAsset(group, 'EnvPolishInfoKiosk', zone.position[0] + 13.0, zone.position[2] - 2.2, -0.72, 0.82);
    this.addPolishAsset(group, 'EnvPolishSignalTotem', zone.position[0] - 13.2, zone.position[2] - 8.6, 0.22, 0.92);
    this.addPolishAsset(group, 'EnvPolishBenchPlanter', zone.position[0] - 5.2, zone.position[2] + 10.8, 0.18, 0.8);
    this.addPlanterCluster(group, zone.position[0] - 15.2, zone.position[2] - 0.4, 0x7cffb2);
    this.addPlanterCluster(group, zone.position[0] + 16.2, zone.position[2] + 0.8, 0x68d8ff);
    this.checkerStripe(group, zone.position[0] + 2, zone.position[2] - 13.8, 24, 0);
    this.campusArch(group, zone.position[0] - 15.8, zone.position[2] - 12.8, -0.18);

    for (let i = 0; i < 7; i += 1) {
      const x = zone.position[0] - 7 + i * 4.2;
      const z = zone.position[2] - 18 - Math.sin(i * 0.8) * 1.4;
      this.arrowMarker(group, x, z, -0.1 + i * 0.04, i % 2 ? 0x68d8ff : 0x7cffb2, 'StartRouteArrow');
    }

    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_start' });
    this.world.scene.add(group);
  }

  createEducationPlaza() {
    const zone = findZone('education');
    const group = new THREE.Group();
    group.name = 'SETPIECE_FCC_Education_Grove';

    this.groundRect(group, zone.position[0], zone.position[2] - 8.6, 35, 18, this.world.materials.plazaRoad, 0.12, 'FCCFrontQuad');
    this.groundRect(group, zone.position[0], zone.position[2] + 12.2, 30, 11, this.world.materials.paleStone, 0.118, 'FCCRearWalk');
    this.addSign(group, 'FCCU S BLOCK', 'Forman Christian College', zone.position[0] - 18.5, zone.position[2] - 16.2, 0.2, 0x9ccfff, 3.7, 'FCCIdentitySign');

    for (const dx of [-18, -7, 7, 18]) {
      this.addLamp(group, zone.position[0] + dx, zone.position[2] - 19, 0x9ccfff, 3.2, 'FCCFrontLamp');
    }
    for (const [x, z, rot] of [
      [zone.position[0] - 23, zone.position[2] - 9, 0.84],
      [zone.position[0] - 14, zone.position[2] + 21, -0.62],
      [zone.position[0] + 14, zone.position[2] - 12, -0.38],
      [zone.position[0] + 25, zone.position[2] + 14, 0.48]
    ]) {
      this.addBench(group, x, z, rot, 0.96);
    }

    for (const [x, z] of [
      [zone.position[0] - 27, zone.position[2] - 14],
      [zone.position[0] - 22, zone.position[2] + 15],
      [zone.position[0] + 25, zone.position[2] - 12],
      [zone.position[0] + 22, zone.position[2] + 16],
      [zone.position[0] - 2, zone.position[2] + 27]
    ]) {
      this.addPlanterCluster(group, x, z, 0x9ccfff);
    }

    this.addPolishAsset(group, 'EnvPolishInfoKiosk', zone.position[0] + 20.4, zone.position[2] - 16.5, -0.34, 0.82);
    this.addPolishAsset(group, 'EnvPolishBenchPlanter', zone.position[0] - 20.8, zone.position[2] + 5.2, 0.64, 0.9);
    this.addPolishAsset(group, 'EnvPolishBenchPlanter', zone.position[0] + 20.2, zone.position[2] + 6.4, -0.62, 0.9);
    this.campusArch(group, zone.position[0] - 15.5, zone.position[2] - 18.8, 0.08);
    this.hedgeLine(group, zone.position[0] - 23, zone.position[2] - 20, 45, 0);
    this.hedgeLine(group, zone.position[0] + 23, zone.position[2] - 20, 45, 0);
    for (const dx of [-9, 0, 9]) {
      this.flagPole(group, zone.position[0] + dx, zone.position[2] - 23.5, 0x9ccfff);
    }
    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_fcc' });
    this.world.scene.add(group);
  }

  createSecurityLab() {
    const zone = findZone('security');
    const group = new THREE.Group();
    group.name = 'SETPIECE_Security_Lab';

    this.groundRect(group, zone.position[0], zone.position[2], 32, 28, this.world.materials.securityRoad, 0.13, 'SecurityScannerPad');
    this.box(group, zone.position[0], 0.18, zone.position[2] - 14.2, 26, 0.04, 0.32, this.world.materials.glowBlue, 0, 'SecurityPadFrontTrace');
    this.box(group, zone.position[0] - 16.2, 0.18, zone.position[2], 0.32, 0.04, 24, this.world.materials.glowBlue, 0, 'SecurityPadLeftTrace');
    this.box(group, zone.position[0] + 16.2, 0.18, zone.position[2], 0.32, 0.04, 24, this.world.materials.glowPink, 0, 'SecurityPadRightTrace');

    this.securityGate(group, zone.position[0] - 2.8, zone.position[2] - 11.2, 0.18);
    this.addPolishAsset(group, 'EnvPolishSecurityScanner', zone.position[0] + 4.8, zone.position[2] + 3.0, -0.28, 0.92);
    this.addPolishAsset(group, 'EnvPolishTerminalPillar', zone.position[0] - 12.2, zone.position[2] + 9.5, 0.34, 1.05);
    this.addPolishAsset(group, 'EnvPolishSignalTotem', zone.position[0] + 13.8, zone.position[2] + 8.2, -0.44, 1.05);
    this.addSign(group, 'SECURITY SCAN', 'Authorized Assessments', zone.position[0] + 12.8, zone.position[2] - 11.8, -0.55, 0x68d8ff, 3.0, 'SecurityScanSign');

    for (const [x, z, rot] of [
      [-140, -48, 0.4],
      [-136, -31, 1.2],
      [-114, -56, -0.18],
      [-108, -35, -0.72]
    ]) {
      this.serverRack(group, x, z, rot);
    }

    this.cable(group, [-139, 0.3, -49], [-132, 0.25, -44], [-124, 0.32, -45], 0x10191f);
    this.cable(group, [-111, 0.3, -56], [-122, 0.25, -50], [-130, 0.32, -55], 0x10191f);
    this.cable(group, [-136, 0.3, -31], [-128, 0.26, -36], [-119, 0.3, -34], 0x10191f);

    for (const [x, z, color] of [
      [-143, -25, 0x68d8ff],
      [-103, -42, 0xff6d8d],
      [-116, -64, 0x7cffb2],
      [-145, -58, 0x68d8ff]
    ]) {
      const beacon = this.beacon(group, x, z, color);
      this.securityScanObjects.push(beacon);
    }

    for (let i = 0; i < 8; i += 1) {
      const packet = new THREE.Mesh(new THREE.OctahedronGeometry(0.52, 0), this.world.materials.glowBlue.clone());
      packet.name = 'SecurityPacketShard';
      packet.position.set(zone.position[0] - 12 + i * 3.4, 1.2 + (i % 3) * 0.2, zone.position[2] + 8 + Math.sin(i) * 2.2);
      group.add(packet);
      this.animated.push({ kind: 'float', mesh: packet, baseY: packet.position.y, speed: 1.2, phase: i * 0.7, range: 0.34, rotationSpeed: 1.1 + i * 0.05 });
    }

    mergeStaticMeshesInGroup(group, {
      namePrefix: 'SETPIECE_security',
      shouldSkip: (object) => object.name === 'SecurityPacketShard' || object.name === 'SetPieceBeaconGlow'
    });
    this.world.scene.add(group);
  }

  createDistrictDressing() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_District_Dressing';
    const projects = findZone('projects');
    this.addSign(group, 'PROJECTS', 'Build Yard', projects.position[0] - 12, projects.position[2] + 13, -0.35, 0xffcc66, 2.7, 'ProjectsFoundrySign');
    this.addLamp(group, projects.position[0] + 10, projects.position[2] + 12, 0xff9b6d, 3.0, 'FoundryLampA');
    this.addLamp(group, projects.position[0] - 16, projects.position[2] - 7, 0xffcc66, 2.7, 'FoundryLampB');
    this.addPolishAsset(group, 'EnvPolishProjectForge', projects.position[0] + 4.6, projects.position[2] + 1.8, -0.52, 1.04);
    this.addPolishAsset(group, 'EnvPolishInfoKiosk', projects.position[0] - 8.4, projects.position[2] - 8.8, 0.34, 0.78);
    this.addPolishAsset(group, 'EnvPolishRoadBarrier', projects.position[0] + 14.2, projects.position[2] + 1.2, -0.46, 0.82);
    for (const [x, z, rotation, scale] of [
      [projects.position[0] + 9.0, projects.position[2] - 4.6, 0.34, 0.82],
      [projects.position[0] - 4.2, projects.position[2] + 8.4, -0.18, 0.74],
      [projects.position[0] + 3.0, projects.position[2] + 11.2, 0.56, 0.68]
    ]) {
      this.addDistrictStoryAsset(group, 'EnvPolishBuildCrateStack', x, z, rotation, scale, 'crateStacks');
    }

    const cv = findZone('cv');
    this.addSign(group, 'CV VAULT', 'Documents', cv.position[0] - 10, cv.position[2] - 12, 0.25, 0xe6f3ff, 2.5, 'CvVaultSign');
    this.addLamp(group, cv.position[0] + 8, cv.position[2] + 9, 0xe6f3ff, 2.8, 'CvLamp');
    this.addPolishAsset(group, 'EnvPolishCvVault', cv.position[0] - 0.4, cv.position[2] + 1.2, 0.12, 1.05);
    this.addPolishAsset(group, 'EnvPolishTerminalPillar', cv.position[0] + 8.8, cv.position[2] - 3.6, -0.22, 0.88);
    this.groundRect(group, cv.position[0], cv.position[2], 13, 9, this.world.materials.plazaRoad, 0.13, 'CvVaultDocumentPad');
    this.box(group, cv.position[0], 0.19, cv.position[2] - 4.8, 10.6, 0.04, 0.28, this.world.materials.glowBlue, 0, 'CvVaultFrontTrace');

    const contact = findZone('contact');
    this.addSign(group, 'CONTACT', 'Harbor Signal', contact.position[0] - 8, contact.position[2] + 15, -0.65, 0x78b7ff, 2.5, 'HarborSign');
    this.addPolishAsset(group, 'EnvPolishHarborSignal', contact.position[0] + 1.6, contact.position[2] + 3.8, -0.32, 1.18);
    this.addPolishAsset(group, 'EnvPolishPalm', contact.position[0] - 13.2, contact.position[2] + 5.8, 0.28, 1.08);
    this.addPolishAsset(group, 'EnvPolishPalm', contact.position[0] + 13.4, contact.position[2] + 2.2, -0.18, 0.98);
    for (const [x, z] of [
      [contact.position[0], contact.position[2] + 2],
      [contact.position[0] + 7, contact.position[2] + 11],
      [contact.position[0] - 9, contact.position[2] + 8]
    ]) {
      this.beacon(group, x, z, 0x78b7ff);
    }

    const stunt = findZone('drift');
    this.addSign(group, 'STUNT', 'Boost Yard', stunt.position[0] - 9, stunt.position[2] + 16, -0.55, 0xff9b6d, 2.6, 'StuntSign');
    this.addPolishAsset(group, 'EnvPolishCircuitGate', stunt.position[0] + 5.2, stunt.position[2] + 8.8, -0.18, 0.86);
    this.groundRect(group, stunt.position[0], stunt.position[2], 25, 17, this.world.materials.stuntRamp, 0.12, 'StuntYardRunoffPad');
    this.box(group, stunt.position[0], 0.18, stunt.position[2] + 9.2, 20, 0.04, 0.28, this.world.materials.warmGlow, 0, 'StuntYardStartTrace');
    this.addPolishAsset(group, 'EnvPolishRoadBarrier', stunt.position[0] - 12.6, stunt.position[2] - 6.2, 0.42, 0.9);
    this.addPolishAsset(group, 'EnvPolishRoadBarrier', stunt.position[0] + 12.2, stunt.position[2] - 5.8, -0.36, 0.9);

    const data = findZone('data-pier');
    this.addSign(group, 'DATA', 'Visitor Trail', data.position[0] - 8, data.position[2] - 13, 0.75, 0x79ffc5, 2.5, 'DataPierSign');
    this.addPolishAsset(group, 'EnvPolishInfoKiosk', data.position[0] + 9.8, data.position[2] - 5.4, 0.72, 0.72);
    for (let i = 0; i < 7; i += 1) {
      this.box(group, data.position[0] + i * 1.6 - 4.8, 0.26, data.position[2] + 2.6, 1.3, 0.14, 7.2, this.world.materials.wood, 0.1, 'DataPierPlank');
    }
    this.addLamp(group, data.position[0] - 7, data.position[2] + 7, 0x79ffc5, 2.6, 'DataPierLampA');
    this.addLamp(group, data.position[0] + 7, data.position[2] + 7, 0x79ffc5, 2.6, 'DataPierLampB');

    const sentinel = findZone('sentinel');
    this.addSign(group, 'SENTINEL', 'Cyber Ridge', sentinel.position[0] - 12, sentinel.position[2] - 12, 0.22, 0xff6d8d, 2.7, 'SentinelRidgeSign');
    this.addPolishAsset(group, 'EnvPolishSkillsArray', sentinel.position[0] - 4.4, sentinel.position[2] + 2.8, -0.12, 0.78);
    this.addPolishAsset(group, 'EnvPolishSignalTotem', sentinel.position[0] + 2.4, sentinel.position[2] + 11.8, -0.18, 1.05);
    this.antennaCluster(group, sentinel.position[0] + 10, sentinel.position[2] - 4, 0xff6d8d);
    this.antennaCluster(group, sentinel.position[0] - 8, sentinel.position[2] + 8, 0x68d8ff);

    const skills = findZone('skills');
    this.addSign(group, 'STACK', 'Skills Terminal', skills.position[0] - 11, skills.position[2] + 10, -0.62, 0x92ffea, 2.4, 'SkillsTerminalSign');
    this.addPolishAsset(group, 'EnvPolishSkillsArray', skills.position[0] - 0.6, skills.position[2] - 1.4, -0.62, 1.02);
    this.addPolishAsset(group, 'EnvPolishTerminalPillar', skills.position[0] + 10.8, skills.position[2] + 5.6, -0.62, 0.9);
    for (const [x, z, rotation, scale] of [
      [skills.position[0] - 4.8, skills.position[2] - 7.6, -0.2, 0.74],
      [skills.position[0] + 5.2, skills.position[2] - 8.0, -0.12, 0.7]
    ]) {
      this.addDistrictStoryAsset(group, 'EnvPolishTerminalBank', x, z, rotation, scale, 'terminalBanks');
    }

    const awards = findZone('awards');
    this.addSign(group, 'AWARDS', 'Archive Steps', awards.position[0] - 9, awards.position[2] + 8, -0.2, 0xffdf8a, 2.3, 'AwardsSign');
    this.addPolishAsset(group, 'EnvPolishAwardsMonument', awards.position[0] + 0.2, awards.position[2] + 1.4, -0.18, 1.05);
    this.addPolishAsset(group, 'EnvPolishBenchPlanter', awards.position[0] + 7.5, awards.position[2] + 6.2, -0.34, 0.78);
    this.addDistrictStoryAsset(group, 'EnvPolishArchiveStepCluster', awards.position[0] - 1.2, awards.position[2] - 3.1, 0.02, 0.9, 'archiveSteps');

    const todo = findZone('todo');
    this.addSign(group, 'TODO', 'Build Queue', todo.position[0] - 8, todo.position[2] - 7, 0.68, 0xb6a0ff, 2.2, 'TodoSign');
    this.addPolishAsset(group, 'EnvPolishTodoBoard', todo.position[0] + 0.6, todo.position[2] + 1.0, 0.34, 1.02);
    this.addPolishAsset(group, 'EnvPolishInfoKiosk', todo.position[0] + 6.8, todo.position[2] - 5.2, -0.24, 0.72);
    this.addDistrictStoryAsset(group, 'EnvPolishTodoCardStack', todo.position[0] - 1.4, todo.position[2] + 6.2, 0.1, 0.86, 'todoStacks');

    const career = findZone('career');
    this.addSign(group, 'CAREER', 'Signal Office', career.position[0] - 10, career.position[2] + 9, -0.35, 0xb6a0ff, 2.4, 'CareerSign');
    this.addPolishAsset(group, 'EnvPolishCareerOffice', career.position[0] + 1.2, career.position[2] + 0.8, -0.24, 1.08);
    this.box(group, career.position[0] + 7, 0.22, career.position[2] - 6, 9, 0.16, 5.5, this.world.materials.plazaRoad, 0.12, 'CareerOfficeDeck');
    this.flagPole(group, career.position[0] + 13, career.position[2] - 6, 0xb6a0ff);
    this.addPolishAsset(group, 'EnvPolishSignalTotem', career.position[0] + 1.4, career.position[2] - 10.8, -0.18, 0.88);

    const circuit = findZone('circuit');
    this.addSign(group, 'CIRCUIT', 'Checkpoint Run', circuit.position[0] - 10, circuit.position[2] - 10, 0.4, 0xff9b6d, 2.4, 'CircuitSign');
    this.addPolishAsset(group, 'EnvPolishCircuitGate', circuit.position[0] + 1.0, circuit.position[2] + 7.4, -0.22, 1.04);
    this.checkerStripe(group, circuit.position[0] + 1, circuit.position[2] + 8, 18, -0.22);
    this.addPolishAsset(group, 'EnvPolishRoadBarrier', circuit.position[0] - 7.8, circuit.position[2] + 3.6, 0.44, 0.84);

    const behind = findZone('behind');
    this.addSign(group, 'BEHIND', 'Process Yard', behind.position[0] - 10, behind.position[2] + 8, -0.2, 0x8fd3ff, 2.3, 'BehindSign');
    this.addPolishAsset(group, 'EnvPolishBuildWorkbench', behind.position[0] + 0.6, behind.position[2] - 1.2, 0.08, 1.08);
    this.addPolishAsset(group, 'EnvPolishTerminalPillar', behind.position[0] + 8.4, behind.position[2] + 3.6, 0.3, 0.82);
    for (const [dx, dz, rotation, scale] of [[-6, -5, 0.22, 0.86], [1, -7, -0.12, 0.72], [7, -3, 0.42, 0.76]]) {
      this.addDistrictStoryAsset(group, 'EnvPolishBuildCrateStack', behind.position[0] + dx, behind.position[2] + dz, rotation, scale, 'crateStacks');
    }

    const potato = findZone('potato');
    this.addSign(group, 'FARM', 'Potato Counter', potato.position[0] - 11, potato.position[2] + 9, 0.32, 0xc79b56, 2.3, 'PotatoFarmSign');
    this.addPolishAsset(group, 'EnvPolishFarmIrrigator', potato.position[0] + 4.4, potato.position[2] - 1.8, 0.18, 1.04);
    this.addPolishAsset(group, 'EnvPolishBenchPlanter', potato.position[0] - 8.6, potato.position[2] + 1.4, 0.22, 0.78);

    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_district' });
    this.world.scene.add(group);
  }

  createApproachDressing() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_Approach_Dressing';
    const clusters = [
      { title: 'FCCU', subtitle: 'Campus Route', x: -47, z: 51, rotation: -0.54, color: 0x9ccfff, side: -1, asset: 'EnvPolishBenchPlanter' },
      { title: 'S BLOCK', subtitle: 'Education Grove', x: -60, z: 74, rotation: -0.42, color: 0x9ccfff, side: 1, asset: 'EnvPolishInfoKiosk' },
      { title: 'SECURITY', subtitle: 'Scan Run', x: -28, z: 5, rotation: -0.95, color: 0x68d8ff, side: 1, asset: 'EnvPolishSignalTotem' },
      { title: 'FIREWALL', subtitle: 'Gate Ahead', x: -74, z: -22, rotation: -0.72, color: 0x68d8ff, side: -1, asset: 'EnvPolishRoadBarrier' },
      { title: 'CV', subtitle: 'Document Run', x: 20, z: -10, rotation: 2.7, color: 0xe6f3ff, side: -1, asset: 'EnvPolishTerminalPillar' },
      { title: 'STUNT', subtitle: 'Boost Yard', x: 62, z: -78, rotation: 2.46, color: 0xff9b6d, side: 1, asset: 'EnvPolishRoadBarrier' },
      { title: 'PROJECTS', subtitle: 'Build Yard', x: 44, z: 37, rotation: 1.84, color: 0xffcc66, side: -1, asset: 'EnvPolishInfoKiosk' },
      { title: 'HARBOR', subtitle: 'Signal Pier', x: 94, z: 51, rotation: 1.02, color: 0x78b7ff, side: 1, asset: 'EnvPolishPalm' },
      { title: 'DATA', subtitle: 'Visitor Trail', x: -122, z: 47, rotation: -1.1, color: 0x79ffc5, side: -1, asset: 'EnvPolishInfoKiosk' },
      { title: 'RIDGE', subtitle: 'Sentinel Climb', x: -17, z: 64, rotation: 0.65, color: 0xff6d8d, side: 1, asset: 'EnvPolishSignalTotem' },
      { title: 'STACK', subtitle: 'Skills Trail', x: -82, z: -74, rotation: -2.2, color: 0x92ffea, side: -1, asset: 'EnvPolishTerminalPillar' },
      { title: 'FARM', subtitle: 'Potato Track', x: -28, z: -126, rotation: -1.82, color: 0xc79b56, side: 1, asset: 'EnvPolishBenchPlanter' }
    ];
    clusters.forEach((cluster, index) => this.addApproachCluster(group, cluster, index));
    mergeStaticMeshesInGroup(group, {
      namePrefix: 'SETPIECE_approach',
      shouldSkip: (object) => object.name.startsWith('ApproachBeaconGlow')
    });
    group.userData.approachStats = { ...this.approachStats };
    this.world.scene.add(group);
  }

  createDistrictGateways() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_District_Gateways';
    const gateways = [
      { x: 36, z: 33, rotation: 1.34, color: 0xffcc66, width: 11.5 },
      { x: -55, z: 61, rotation: -0.5, color: 0x9ccfff, width: 10.5 },
      { x: -82, z: -25, rotation: -2.17, color: 0x68d8ff, width: 10.8 },
      { x: 27, z: -27, rotation: 2.68, color: 0xe6f3ff, width: 10.5 },
      { x: 94, z: -95, rotation: 1.5, color: 0xff9b6d, width: 11.2 },
      { x: -42, z: -123, rotation: -1.82, color: 0xc79b56, width: 10.2 },
      { x: 24, z: 104, rotation: 0.9, color: 0xff6d8d, width: 10.2 },
      { x: 80, z: -5, rotation: 2.4, color: 0xb6a0ff, width: 10.2 },
      { x: 105, z: 61, rotation: 1.0, color: 0x78b7ff, width: 10.0 },
      { x: -126, z: 47, rotation: -1.05, color: 0x79ffc5, width: 9.4 },
      { x: 22, z: -59, rotation: -2.53, color: 0xa8a6ff, width: 10.2 },
      { x: -26, z: 70, rotation: 0.17, color: 0xffdf8a, width: 9.6 }
    ];

    gateways.forEach((spec, index) => this.addDistrictGateway(group, spec, index));
    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_gateway' });
    group.userData.gatewayStats = { ...this.gatewayStats };
    this.world.scene.add(group);
  }

  addDistrictGateway(group, spec, index) {
    const forwardX = Math.sin(spec.rotation);
    const forwardZ = Math.cos(spec.rotation);
    const rightX = Math.cos(spec.rotation);
    const rightZ = -Math.sin(spec.rotation);
    if (this.addPolishAsset(group, 'EnvPolishDistrictGateway', spec.x, spec.z, spec.rotation, 0.86)) {
      this.gatewayStats.gateways += 1;
      this.gatewayStats.authoredAssets += 1;
    }
    for (const side of [-1, 1]) {
      const x = spec.x + rightX * side * (spec.width * 0.5);
      const z = spec.z + rightZ * side * (spec.width * 0.5);
      if (this.addPolishAsset(group, 'EnvPolishRouteLantern', x - forwardX * 2.2, z - forwardZ * 2.2, spec.rotation + side * 0.18, 0.72)) {
        this.gatewayStats.lanterns += 1;
        this.gatewayStats.authoredAssets += 1;
      }
    }
    const stripMaterial = new THREE.MeshBasicMaterial({ color: spec.color, transparent: true, opacity: 0.46, depthWrite: false });
    for (let i = -2; i <= 2; i += 1) {
      const marker = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.035, 1.42), stripMaterial);
      marker.name = `GatewayGuideStrip_${index}`;
      marker.position.set(spec.x + forwardX * i * 1.35, 0.225, spec.z + forwardZ * i * 1.35);
      marker.rotation.y = spec.rotation;
      group.add(marker);
      this.gatewayStats.guideStrips += 1;
    }
  }

  addApproachCluster(group, spec, index) {
    const side = spec.side || 1;
    const forwardX = Math.sin(spec.rotation);
    const forwardZ = Math.cos(spec.rotation);
    const rightX = Math.cos(spec.rotation);
    const rightZ = -Math.sin(spec.rotation);
    const lateral = (spec.lateral || 5.6) * side;
    const baseX = spec.x + rightX * lateral;
    const baseZ = spec.z + rightZ * lateral;
    const faceRoad = spec.rotation + (side > 0 ? -0.42 : 0.42);

    this.addSign(group, spec.title, spec.subtitle, baseX + forwardX * 1.4, baseZ + forwardZ * 1.4, faceRoad, spec.color, 1.8, `ApproachSign_${index}`);
    this.approachStats.signs += 1;
    this.addLamp(group, baseX - forwardX * 2.4, baseZ - forwardZ * 2.4, spec.color, 2.45, `ApproachLamp_${index}`);
    this.approachStats.lamps += 1;
    if (this.addPolishAsset(group, spec.asset, baseX - forwardX * 0.6 - rightX * side * 1.2, baseZ - forwardZ * 0.6 - rightZ * side * 1.2, faceRoad, 0.64)) {
      this.approachStats.authoredAssets += 1;
    }
    if (this.addPolishAsset(group, 'EnvPolishRoadBarrier', spec.x + rightX * side * 3.6, spec.z + rightZ * side * 3.6, spec.rotation + Math.PI * 0.5, 0.52)) {
      this.approachStats.authoredAssets += 1;
    }
    for (let i = -1; i <= 1; i += 1) {
      const markX = spec.x + forwardX * i * 3.2 + rightX * side * 2.6;
      const markZ = spec.z + forwardZ * i * 3.2 + rightZ * side * 2.6;
      this.box(group, markX, 0.205, markZ, 0.26, 0.035, 1.9, this.world.materials.paleStone, spec.rotation, 'ApproachRoadTick');
      this.approachStats.roadMarks += 1;
    }
    this.approachStats.clusters += 1;
  }

  createRouteGuidance() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_Route_Guidance';
    const guides = [
      [-28, 36, 0.24, 0x9ccfff],
      [-54, 58, 0.42, 0x9ccfff],
      [-64, 86, 0.68, 0x9ccfff],
      [-28, 6, -0.76, 0x68d8ff],
      [-72, -20, -0.56, 0x68d8ff],
      [-104, -54, -0.3, 0x68d8ff],
      [22, -20, 0.2, 0xe6f3ff],
      [76, -92, 1.2, 0xff9b6d],
      [84, 50, 0.95, 0x78b7ff],
      [-132, 54, 0.8, 0x79ffc5]
    ];
    for (const [x, z, rot, color] of guides) {
      this.arrowMarker(group, x, z, rot, color, 'RouteArrow');
    }
    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_route' });
    this.world.scene.add(group);
  }

  createLivingSignals() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_Living_Signals';
    const zones = worldZones;

    this.createZonePulseInstances(group, zones);

    const bannerSpecs = [
      [-24, 28, 0.18, 0x7cffb2],
      [-52, 54, 0.52, 0x9ccfff],
      [-86, -28, -0.48, 0x68d8ff],
      [18, -18, 0.34, 0xe6f3ff],
      [58, -78, -0.72, 0xff9b6d],
      [102, 50, 0.86, 0x78b7ff],
      [-112, 54, 0.68, 0x79ffc5],
      [-42, -116, -0.2, 0xc79b56],
      [26, 96, 0.18, 0xff6d8d],
      [78, 18, -0.62, 0xb6a0ff]
    ];
    bannerSpecs.forEach(([x, z, rotation, color], index) => this.addWindBanner(group, x, z, rotation, color, index));

    const whisperSpecs = [
      [-40, 42, 0x9ccfff],
      [-68, 78, 0x9ccfff],
      [-36, 2, 0x68d8ff],
      [-92, -42, 0x68d8ff],
      [22, -34, 0xe6f3ff],
      [78, -92, 0xff9b6d],
      [84, 48, 0xffcc66],
      [116, 60, 0x78b7ff],
      [-126, 58, 0x79ffc5],
      [-28, -94, 0xa8a6ff]
    ];
    this.createWhisperBeaconInstances(group, whisperSpecs);

    const terminalSpecs = [
      [-94, -66, 0x68d8ff],
      [62, 56, 0xffcc66],
      [-62, -84, 0x92ffea],
      [8, -58, 0xe6f3ff],
      [-18, -96, 0xa8a6ff],
      [128, 56, 0x78b7ff]
    ];
    this.createTerminalPulseInstances(group, terminalSpecs);

    this.world.scene.add(group);
  }

  createDistrictAmbience() {
    const zones = worldZones;
    const mesh = new THREE.InstancedMesh(
      new THREE.OctahedronGeometry(0.34, 0),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: true,
        transparent: true,
        opacity: 0.74,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      }),
      zones.length * 4
    );
    mesh.name = 'Life_DistrictAmbience_Motes';
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.districtAmbience.mesh = mesh;
    this.lifeInstanceMeshes.push(mesh);

    for (let layer = 0; layer < 4; layer += 1) {
      zones.forEach((zone, zoneIndex) => {
        const index = this.districtAmbience.entries.length;
        const radius = zone.radius * (0.62 + layer * 0.19);
        const phase = zoneIndex * 0.73 + layer * 1.37;
        const baseAngle = phase + layer * 0.48;
        const entry = {
          index,
          centerX: zone.position[0],
          centerZ: zone.position[2],
          radius,
          baseAngle,
          baseY: 1.05 + layer * 0.28 + (zoneIndex % 3) * 0.08,
          speed: 0.22 + layer * 0.045 + (zoneIndex % 4) * 0.012,
          bob: 0.18 + layer * 0.035,
          phase,
          scale: 0.72 + layer * 0.11
        };
        mesh.setColorAt(index, new THREE.Color(zone.color));
        this.districtAmbience.entries.push(entry);
        this.writeDistrictAmbience(entry, 0);
      });
    }
    this.lifeStats.districtMotes = this.districtAmbience.entries.length;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
    this.world.scene.add(mesh);
  }

  applyDistrictAmbienceLimit(limit) {
    const mesh = this.districtAmbience.mesh;
    if (!mesh) return;
    const visible = Math.min(this.districtAmbience.entries.length, Number.isFinite(limit) ? limit : this.districtAmbience.entries.length);
    this.districtAmbience.visible = visible;
    mesh.count = visible;
    this.lifeStats.visibleDistrictMotes = visible;
    this.updateDistrictAmbience(0);
  }

  updateDistrictAmbience(elapsed) {
    const mesh = this.districtAmbience.mesh;
    if (!mesh) return;
    for (let index = 0; index < this.districtAmbience.visible; index += 1) {
      this.writeDistrictAmbience(this.districtAmbience.entries[index], elapsed);
    }
    mesh.instanceMatrix.needsUpdate = true;
    this.lifeStats.motionSamples += this.districtAmbience.visible;
  }

  createZonePulseInstances(group, zones) {
    const geometry = new THREE.RingGeometry(0.965, 1, 4);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.13,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.InstancedMesh(geometry, material, zones.length);
    mesh.name = 'Life_ZonePulse_instances';
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    group.add(mesh);
    this.lifeInstanceMeshes.push(mesh);

    for (const zone of zones) {
      const index = this.lifeStats.zonePulses;
      mesh.setColorAt(index, new THREE.Color(zone.color));
      const proxy = new THREE.Object3D();
      proxy.name = `Life_ZonePulse_${zone.id}`;
      proxy.position.set(zone.position[0], 0.245, zone.position[2]);
      proxy.rotation.x = -Math.PI / 2;
      proxy.rotation.z = Math.PI / 4;
      group.add(proxy);
      const entry = {
        kind: 'pulse',
        instanceKind: 'zonePulse',
        instanceMesh: mesh,
        instanceIndex: index,
        proxy,
        position: proxy.position.clone(),
        scale: zone.radius + 2.05,
        baseScale: 1,
        baseRotation: Math.PI / 4,
        range: 0.055,
        speed: 0.9 + (index % 5) * 0.08,
        phase: index * 0.73,
        rotationSpeed: 0.18
      };
      this.writeLifeInstance(entry, 0);
      this.animated.push(entry);
      this.lifeItems.zonePulses.push({ root: proxy, entry });
      this.lifeStats.zonePulses += 1;
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
  }

  createWhisperBeaconInstances(group, specs) {
    const geometry = new THREE.OctahedronGeometry(0.42, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.62,
      depthWrite: false
    });
    const mesh = new THREE.InstancedMesh(geometry, material, specs.length);
    mesh.name = 'Life_WhisperBeacon_instances';
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    group.add(mesh);
    this.lifeInstanceMeshes.push(mesh);

    specs.forEach(([x, z, color], index) => {
      mesh.setColorAt(index, new THREE.Color(color));
      const proxy = new THREE.Object3D();
      proxy.name = `Life_WhisperBeacon_${index}`;
      proxy.position.set(x, 1.45 + (index % 3) * 0.12, z);
      group.add(proxy);
      const entry = {
        kind: 'beacon',
        instanceKind: 'beacon',
        instanceMesh: mesh,
        instanceIndex: index,
        proxy,
        position: proxy.position.clone(),
        baseY: proxy.position.y,
        scale: 1,
        range: 0.34,
        speed: 1.2 + index * 0.05,
        phase: index * 0.7,
        rotationSpeed: 0.7 + index * 0.03
      };
      this.writeLifeInstance(entry, 0);
      this.animated.push(entry);
      this.lifeItems.whisperBeacons.push({ root: proxy, entry });
      this.lifeStats.whisperBeacons += 1;
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
  }

  createTerminalPulseInstances(group, specs) {
    const geometry = new THREE.RingGeometry(1.1, 1.34, 5);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.InstancedMesh(geometry, material, specs.length);
    mesh.name = 'Life_TerminalPulse_instances';
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    group.add(mesh);
    this.lifeInstanceMeshes.push(mesh);

    specs.forEach(([x, z, color], index) => {
      mesh.setColorAt(index, new THREE.Color(color));
      const proxy = new THREE.Object3D();
      proxy.name = `Life_TerminalPulse_${index}`;
      proxy.position.set(x, 1.15 + (index % 2) * 0.18, z);
      proxy.rotation.x = -Math.PI / 2;
      group.add(proxy);
      const entry = {
        kind: 'pulse',
        instanceKind: 'terminalPulse',
        instanceMesh: mesh,
        instanceIndex: index,
        proxy,
        position: proxy.position.clone(),
        scale: 1,
        baseScale: 1,
        baseRotation: 0,
        range: 0.18,
        speed: 1.35 + index * 0.11,
        phase: index * 0.44,
        rotationSpeed: 0.65
      };
      this.writeLifeInstance(entry, 0);
      this.animated.push(entry);
      this.lifeItems.terminalPulses.push({ root: proxy, entry });
      this.lifeStats.terminalPulses += 1;
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
  }

  writeLifeInstance(entry, elapsed) {
    if (entry.active === false) {
      this.lifeDummy.position.set(0, -1000, 0);
      this.lifeDummy.rotation.set(0, 0, 0);
      this.lifeDummy.scale.setScalar(0.001);
      if (entry.proxy) entry.proxy.visible = false;
    } else if (entry.instanceKind === 'beacon') {
      const y = entry.baseY + Math.sin(elapsed * entry.speed + entry.phase) * entry.range;
      this.lifeDummy.position.set(entry.position.x, y, entry.position.z);
      this.lifeDummy.rotation.set(0, elapsed * entry.rotationSpeed + entry.phase, 0);
      this.lifeDummy.scale.setScalar(entry.scale);
      if (entry.proxy) {
        entry.proxy.visible = true;
        entry.proxy.position.copy(this.lifeDummy.position);
        entry.proxy.rotation.copy(this.lifeDummy.rotation);
      }
      this.lifeStats.motionSamples += 1;
    } else {
      const pulse = entry.baseScale + Math.sin(elapsed * entry.speed + entry.phase) * entry.range;
      const scale = entry.scale * pulse;
      const rotationZ = entry.baseRotation + elapsed * entry.rotationSpeed;
      this.lifeDummy.position.copy(entry.position);
      this.lifeDummy.rotation.set(-Math.PI / 2, 0, rotationZ);
      this.lifeDummy.scale.set(scale, scale, scale);
      if (entry.proxy) {
        entry.proxy.visible = true;
        entry.proxy.position.copy(entry.position);
        entry.proxy.rotation.copy(this.lifeDummy.rotation);
        entry.proxy.scale.setScalar(pulse);
      }
      this.lifeStats.motionSamples += 1;
    }
    this.lifeDummy.updateMatrix();
    entry.instanceMesh.setMatrixAt(entry.instanceIndex, this.lifeDummy.matrix);
  }

  writeDistrictAmbience(entry, elapsed) {
    const angle = entry.baseAngle + elapsed * entry.speed;
    const drift = Math.sin(elapsed * (entry.speed * 1.8) + entry.phase) * 0.34;
    const x = entry.centerX + Math.cos(angle) * entry.radius + Math.cos(angle * 1.7) * drift;
    const z = entry.centerZ + Math.sin(angle) * entry.radius + Math.sin(angle * 1.3) * drift;
    const y = entry.baseY + Math.sin(elapsed * 1.05 + entry.phase) * entry.bob;
    const pulse = entry.scale * (0.86 + Math.sin(elapsed * 1.45 + entry.phase) * 0.14);
    this.ambienceDummy.position.set(x, y, z);
    this.ambienceDummy.rotation.set(elapsed * 0.42 + entry.phase, elapsed * 0.68 + entry.phase, elapsed * 0.31);
    this.ambienceDummy.scale.setScalar(pulse);
    this.ambienceDummy.updateMatrix();
    this.districtAmbience.mesh.setMatrixAt(entry.index, this.ambienceDummy.matrix);
  }

  groundRect(group, x, z, width, depth, material, y, name) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, 0.05, depth), material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  box(group, x, y, z, sx, sy, sz, material, rotation = 0, name = 'SetPieceBox') {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotation;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  cylinder(group, x, y, z, radius, height, material, sides = 16, name = 'SetPieceCylinder') {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, sides), material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  addLamp(group, x, z, color, height, name) {
    const lamp = new THREE.Group();
    lamp.name = name;
    this.cylinder(lamp, 0, height / 2, 0, 0.08, height, this.world.materials.darkWood, 8, `${name}_Post`);
    this.box(lamp, 0.34, height - 0.08, 0, 0.82, 0.08, 0.08, this.world.materials.darkWood, 0, `${name}_Arm`);
    const glowMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 8), glowMaterial);
    glow.name = `${name}_Glow`;
    glow.position.set(0.78, height - 0.34, 0);
    lamp.add(glow);
    lamp.position.set(x, 0.16, z);
    lamp.rotation.y = Math.sin(x * 0.2 + z * 0.1) * 0.35;
    group.add(lamp);
  }

  addSign(group, title, subtitle, x, z, rotation, color, scale, name) {
    const sign = new THREE.Group();
    sign.name = name;
    this.cylinder(sign, -1.12 * scale, 1.0, 0, 0.06, 2.0, this.world.materials.darkWood, 8, `${name}_PostLeft`);
    this.cylinder(sign, 1.12 * scale, 1.0, 0, 0.06, 2.0, this.world.materials.darkWood, 8, `${name}_PostRight`);
    const { material, rect } = this.allocateSignPanel(title, subtitle, color);
    const geometry = createSignBoardGeometry(2.65 * scale, 1.1 * scale, rect);
    const front = new THREE.Mesh(geometry, material);
    front.name = `${name}_BoardFront`;
    front.position.y = 1.9;
    front.position.z = 0.025;
    const back = new THREE.Mesh(geometry, material);
    back.name = `${name}_BoardBack`;
    back.position.y = 1.9;
    back.position.z = -0.025;
    back.rotation.y = Math.PI;
    sign.add(front, back);
    sign.position.set(x, 0.16, z);
    sign.rotation.y = rotation;
    group.add(sign);
  }

  allocateSignPanel(title, subtitle, color) {
    if (!this.signAtlas) this.signAtlas = createSignAtlas();
    const atlas = this.signAtlas;
    const index = atlas.cursor;
    atlas.cursor += 1;
    const column = index % atlas.columns;
    const row = Math.floor(index / atlas.columns);
    if (row >= atlas.rows) {
      throw new Error('Sign atlas capacity exceeded');
    }
    const x = column * atlas.tileWidth;
    const y = row * atlas.tileHeight;
    drawSignPanel(atlas.context, x, y + 18, title, subtitle, color);
    atlas.texture.needsUpdate = true;
    return {
      material: atlas.material,
      rect: {
        u0: x / atlas.canvas.width,
        u1: (x + atlas.tileWidth) / atlas.canvas.width,
        v0: 1 - (y + atlas.tileHeight) / atlas.canvas.height,
        v1: 1 - y / atlas.canvas.height
      }
    };
  }

  addBench(group, x, z, rotation, scale) {
    const bench = this.world.cloneEnvironmentAsset('EnvBench') || this.createBenchFallback();
    bench.name = 'SetPieceBench';
    bench.position.set(x, 0.18, z);
    bench.rotation.y = rotation;
    bench.scale.setScalar(scale);
    group.add(bench);
  }

  addPolishAsset(group, assetName, x, z, rotation, scale) {
    const asset = this.world.cloneEnvironmentAsset(assetName);
    if (!asset) return false;
    asset.name = `SetPiece_${assetName}`;
    asset.position.set(x, 0.16, z);
    asset.rotation.y = rotation;
    asset.scale.setScalar(scale);
    group.add(asset);
    return true;
  }

  addDistrictStoryAsset(group, assetName, x, z, rotation, scale, statName) {
    const placed = this.addPolishAsset(group, assetName, x, z, rotation, scale);
    if (!placed) return false;
    this.districtStoryStats.authoredAssets += 1;
    this.districtStoryStats[statName] = (this.districtStoryStats[statName] || 0) + 1;
    return true;
  }

  checkerStripe(group, x, z, width, rotation) {
    const tileWidth = 1.45;
    const count = Math.floor(width / tileWidth);
    for (let i = 0; i < count; i += 1) {
      const material = i % 2 === 0 ? this.world.materials.paleStone : this.world.materials.cable;
      this.box(group, x - width / 2 + i * tileWidth + tileWidth / 2, 0.215, z, tileWidth, 0.035, 1.4, material, rotation, 'CheckerStartTile');
    }
  }

  hedgeLine(group, x, z, length, rotation) {
    const count = Math.max(3, Math.floor(length / 4));
    for (let i = 0; i < count; i += 1) {
      const offset = -length / 2 + i * 4 + 2;
      const localX = Math.cos(rotation) * offset;
      const localZ = Math.sin(rotation) * offset;
      this.box(group, x + localX, 0.55, z + localZ, 3.4, 0.72, 0.68, this.world.materials.meadowDark, rotation, 'CampusHedge');
    }
  }

  flagPole(group, x, z, color) {
    this.cylinder(group, x, 1.75, z, 0.055, 3.5, this.world.materials.cable, 8, 'FlagPole');
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.88 });
    this.box(group, x + 0.55, 2.85, z, 1.05, 0.56, 0.035, material, 0, 'FlagBanner');
  }

  addWindBanner(group, x, z, rotation, color, index) {
    const banner = new THREE.Group();
    banner.name = `Life_WindBannerGroup_${index}`;
    this.cylinder(banner, 0, 1.25, 0, 0.045, 2.5, this.world.materials.darkWood, 7, `Life_WindBanner_${index}_Post`);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.72, side: THREE.DoubleSide });
    const cloth = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 0.56, 1, 1), material);
    cloth.name = `Life_WindBanner_${index}`;
    cloth.position.set(0.57, 2.1, 0);
    banner.add(cloth);
    banner.position.set(x, 0.15, z);
    banner.rotation.y = rotation;
    group.add(banner);
    const entry = {
      kind: 'banner',
      mesh: cloth,
      baseScale: 1,
      range: 0.16,
      speed: 1.1 + index * 0.07,
      phase: index * 0.61
    };
    this.animated.push(entry);
    this.lifeItems.windBanners.push({ root: banner, entry });
    this.lifeStats.windBanners += 1;
  }

  antennaCluster(group, x, z, color) {
    const glow = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.78 });
    for (let i = 0; i < 3; i += 1) {
      const dx = i * 1.4 - 1.4;
      this.cylinder(group, x + dx, 1.75 + i * 0.25, z, 0.08, 3.5 + i * 0.5, this.world.materials.cable, 8, 'AntennaMast');
      this.box(group, x + dx, 3.0 + i * 0.45, z + 0.22, 1.4, 0.08, 0.08, glow, 0, 'AntennaGlowBar');
    }
  }

  createBenchFallback() {
    const group = new THREE.Group();
    this.box(group, 0, 0.55, 0, 2.1, 0.18, 0.48, this.world.materials.wood, 0, 'BenchSeat');
    this.box(group, 0, 0.98, -0.22, 2.1, 0.22, 0.22, this.world.materials.wood, 0, 'BenchBack');
    return group;
  }

  addPlanterCluster(group, x, z, color) {
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.04 });
    this.box(group, x, 0.22, z, 3.2, 0.34, 1.25, this.world.materials.paleStone, 0.14, 'PlanterStone');
    for (let i = 0; i < 5; i += 1) {
      const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.9 + i * 0.05, 5), material);
      tuft.name = 'PlanterGrass';
      tuft.position.set(x - 1.1 + i * 0.55, 0.78, z + Math.sin(i) * 0.32);
      tuft.rotation.y = i * 0.9;
      group.add(tuft);
    }
  }

  arrowMarker(group, x, z, rotation, color, name) {
    const marker = new THREE.Group();
    marker.name = name;
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.66, depthWrite: false });
    const stem = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.035, 2.6), mat);
    const head = new THREE.Mesh(new THREE.ConeGeometry(0.72, 1.32, 3), mat);
    stem.position.z = -0.34;
    head.position.z = 1.08;
    head.rotation.x = Math.PI / 2;
    marker.add(stem, head);
    marker.position.set(x, 0.22, z);
    marker.rotation.y = rotation;
    group.add(marker);
  }

  campusArch(group, x, z, rotation) {
    const arch = new THREE.Group();
    arch.name = 'FCCCampusArch';
    this.cylinder(arch, -2.4, 1.55, 0, 0.18, 3.1, this.world.materials.campusBrick, 10, 'FCCArchLeft');
    this.cylinder(arch, 2.4, 1.55, 0, 0.18, 3.1, this.world.materials.campusBrick, 10, 'FCCArchRight');
    this.box(arch, 0, 3.08, 0, 5.3, 0.42, 0.42, this.world.materials.campusBrick, 0, 'FCCArchTop');
    this.box(arch, 0, 2.62, -0.06, 2.8, 0.12, 0.12, this.world.materials.paleStone, 0, 'FCCArchLintel');
    arch.position.set(x, 0.14, z);
    arch.rotation.y = rotation;
    group.add(arch);
  }

  securityGate(group, x, z, rotation) {
    const gate = new THREE.Group();
    gate.name = 'SecurityScannerGate';
    this.box(gate, -3.2, 2.1, 0, 0.38, 4.2, 0.48, this.world.materials.cable, 0, 'ScannerLeftPillar');
    this.box(gate, 3.2, 2.1, 0, 0.38, 4.2, 0.48, this.world.materials.cable, 0, 'ScannerRightPillar');
    this.box(gate, 0, 4.2, 0, 6.8, 0.34, 0.52, this.world.materials.cable, 0, 'ScannerTopBeam');

    const beamMaterial = this.world.materials.glowBlue.clone();
    beamMaterial.opacity = 0.24;
    this.securityScanMaterials.push(beamMaterial);
    for (let i = 0; i < 5; i += 1) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(0.06, 3.3, 0.08), beamMaterial);
      beam.name = 'ScannerLightCurtain';
      beam.position.set(-2.0 + i, 2.2, 0.04);
      gate.add(beam);
    }

    gate.position.set(x, 0.16, z);
    gate.rotation.y = rotation;
    group.add(gate);
  }

  serverRack(group, x, z, rotation) {
    const rack = new THREE.Group();
    rack.name = 'SecurityServerRack';
    this.box(rack, 0, 1.25, 0, 1.2, 2.5, 0.75, this.world.materials.cable, 0, 'ServerBody');
    for (let i = 0; i < 5; i += 1) {
      this.box(rack, 0, 0.42 + i * 0.38, -0.39, 0.88, 0.08, 0.04, this.world.materials.screen, 0, 'ServerGlowLine');
    }
    rack.position.set(x, 0.16, z);
    rack.rotation.y = rotation;
    group.add(rack);
  }

  cable(group, a, b, c, color) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...a),
      new THREE.Vector3(...b),
      new THREE.Vector3(...c)
    ]);
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 18, 0.055, 8, false),
      new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.08 })
    );
    mesh.name = 'SecurityGroundCable';
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  beacon(group, x, z, color) {
    const beacon = new THREE.Group();
    beacon.name = 'SetPieceBeacon';
    this.cylinder(beacon, 0, 0.62, 0, 0.16, 1.24, this.world.materials.cable, 10, 'BeaconPost');
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.34, 12, 8), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.88 }));
    glow.name = 'SetPieceBeaconGlow';
    glow.position.y = 1.34;
    beacon.add(glow);
    beacon.position.set(x, 0.16, z);
    group.add(beacon);
    return glow;
  }
}

function findZone(id) {
  const zone = worldZones.find((item) => item.id === id);
  return zone || { position: [0, 0, 0], radius: 10 };
}

function createSignAtlas() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return {
    canvas,
    context: canvas.getContext('2d'),
    texture,
    material: new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide
    }),
    tileWidth: 512,
    tileHeight: 256,
    columns: 4,
    rows: 8,
    cursor: 0
  };
}

function drawSignPanel(ctx, x, y, title, subtitle, color) {
  ctx.clearRect(x, y - 18, 512, 256);
  ctx.fillStyle = 'rgba(4, 11, 18, 0.86)';
  roundRect(ctx, x + 18, y + 18, 476, 184, 18);
  ctx.fill();
  ctx.strokeStyle = new THREE.Color(color).getStyle();
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = '#f4fbff';
  ctx.font = '900 44px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(title, x + 256, y + 94);
  ctx.fillStyle = new THREE.Color(color).getStyle();
  ctx.font = '700 24px Arial';
  ctx.fillText(subtitle, x + 256, y + 142);
  ctx.beginPath();
  ctx.moveTo(x + 224, y + 166);
  ctx.lineTo(x + 288, y + 166);
  ctx.lineTo(x + 256, y + 190);
  ctx.closePath();
  ctx.fill();
}

function createSignBoardGeometry(width, height, rect) {
  const geometry = new THREE.PlaneGeometry(width, height);
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i += 1) {
    const u = uv.getX(i);
    const v = uv.getY(i);
    uv.setXY(
      i,
      rect.u0 + (rect.u1 - rect.u0) * u,
      rect.v0 + (rect.v1 - rect.v0) * v
    );
  }
  uv.needsUpdate = true;
  return geometry;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}
