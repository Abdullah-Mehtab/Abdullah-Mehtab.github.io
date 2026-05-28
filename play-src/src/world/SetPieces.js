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
  }

  build() {
    this.createStartDiorama();
    this.createEducationPlaza();
    this.createSecurityLab();
    this.createDistrictDressing();
    this.createRouteGuidance();
  }

  update(dt, elapsed) {
    for (const item of this.animated) {
      if (item.kind === 'ring') {
        item.mesh.rotation.z += dt * item.speed;
        item.mesh.material.opacity = item.baseOpacity + Math.sin(elapsed * item.pulse + item.phase) * item.opacityRange;
      } else if (item.kind === 'float') {
        item.mesh.position.y = item.baseY + Math.sin(elapsed * item.speed + item.phase) * item.range;
        item.mesh.rotation.y += dt * item.rotationSpeed;
      } else if (item.kind === 'light') {
        item.light.intensity = item.base + Math.sin(elapsed * item.speed + item.phase) * item.range;
      }
    }

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
    this.addPlanterCluster(group, zone.position[0] - 15.2, zone.position[2] - 0.4, 0x7cffb2);
    this.addPlanterCluster(group, zone.position[0] + 16.2, zone.position[2] + 0.8, 0x68d8ff);

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

    this.campusArch(group, zone.position[0] - 15.5, zone.position[2] - 18.8, 0.08);
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
    for (const [x, z] of [
      [projects.position[0] + 8, projects.position[2] - 4],
      [projects.position[0] + 13, projects.position[2] - 7],
      [projects.position[0] - 4, projects.position[2] + 8],
      [projects.position[0] + 2, projects.position[2] + 11]
    ]) {
      this.box(group, x, 0.6, z, 1.25, 1.1, 1.25, this.world.materials.darkWood, 0.3, 'FoundryCrateStack');
    }

    const cv = findZone('cv');
    this.addSign(group, 'CV VAULT', 'Documents', cv.position[0] - 10, cv.position[2] - 12, 0.25, 0xe6f3ff, 2.5, 'CvVaultSign');
    this.addLamp(group, cv.position[0] + 8, cv.position[2] + 9, 0xe6f3ff, 2.8, 'CvLamp');
    this.groundRect(group, cv.position[0], cv.position[2], 13, 9, this.world.materials.plazaRoad, 0.13, 'CvVaultDocumentPad');
    this.box(group, cv.position[0], 0.19, cv.position[2] - 4.8, 10.6, 0.04, 0.28, this.world.materials.glowBlue, 0, 'CvVaultFrontTrace');

    const contact = findZone('contact');
    this.addSign(group, 'CONTACT', 'Harbor Signal', contact.position[0] - 8, contact.position[2] + 15, -0.65, 0x78b7ff, 2.5, 'HarborSign');
    for (const [x, z] of [
      [contact.position[0], contact.position[2] + 2],
      [contact.position[0] + 7, contact.position[2] + 11],
      [contact.position[0] - 9, contact.position[2] + 8]
    ]) {
      this.beacon(group, x, z, 0x78b7ff);
    }

    const stunt = findZone('drift');
    this.addSign(group, 'STUNT', 'Boost Yard', stunt.position[0] - 9, stunt.position[2] + 16, -0.55, 0xff9b6d, 2.6, 'StuntSign');
    this.groundRect(group, stunt.position[0], stunt.position[2], 25, 17, this.world.materials.stuntRamp, 0.12, 'StuntYardRunoffPad');
    this.box(group, stunt.position[0], 0.18, stunt.position[2] + 9.2, 20, 0.04, 0.28, this.world.materials.warmGlow, 0, 'StuntYardStartTrace');

    const data = findZone('data-pier');
    this.addSign(group, 'DATA', 'Visitor Trail', data.position[0] - 8, data.position[2] - 13, 0.75, 0x79ffc5, 2.5, 'DataPierSign');
    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_district' });
    this.world.scene.add(group);
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
    const texture = makeSignTexture(title, subtitle, color);
    const geometry = new THREE.PlaneGeometry(2.65 * scale, 1.1 * scale);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: THREE.FrontSide });
    const front = new THREE.Mesh(geometry, material);
    front.name = `${name}_BoardFront`;
    front.position.y = 1.9;
    front.position.z = 0.025;
    const back = new THREE.Mesh(geometry, material.clone());
    back.name = `${name}_BoardBack`;
    back.position.y = 1.9;
    back.position.z = -0.025;
    back.rotation.y = Math.PI;
    sign.add(front, back);
    sign.position.set(x, 0.16, z);
    sign.rotation.y = rotation;
    group.add(sign);
  }

  addBench(group, x, z, rotation, scale) {
    const bench = this.world.cloneEnvironmentAsset('EnvBench') || this.createBenchFallback();
    bench.name = 'SetPieceBench';
    bench.position.set(x, 0.18, z);
    bench.rotation.y = rotation;
    bench.scale.setScalar(scale);
    group.add(bench);
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

function makeSignTexture(title, subtitle, color) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 220;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(4, 11, 18, 0.86)';
  roundRect(ctx, 18, 18, 476, 184, 18);
  ctx.fill();
  ctx.strokeStyle = new THREE.Color(color).getStyle();
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = '#f4fbff';
  ctx.font = '900 44px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(title, 256, 94);
  ctx.fillStyle = new THREE.Color(color).getStyle();
  ctx.font = '700 24px Arial';
  ctx.fillText(subtitle, 256, 142);
  ctx.beginPath();
  ctx.moveTo(224, 166);
  ctx.lineTo(288, 166);
  ctx.lineTo(256, 190);
  ctx.closePath();
  ctx.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
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
