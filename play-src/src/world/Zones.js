import * as THREE from 'three';
import { worldZones } from './worldData.js';

export class Zones {
  constructor(world) {
    this.world = world;
  }

  build() {
    for (const definition of worldZones) {
      this.createZone(definition);
    }
  }

  createZone(definition) {
    const zone = {
      ...definition,
      position: new THREE.Vector3(definition.position[0], definition.position[1], definition.position[2]),
      visited: false
    };
    this.world.zones.push(zone);

    const group = new THREE.Group();
    group.name = `ZONE_${definition.id}_${definition.name.replace(/\s+/g, '_')}`;
    group.position.copy(zone.position);
    group.rotation.y = definition.rotation || 0;
    this.addInteractionRing(group, zone);
    this.addLandmark(group, zone);
    this.world.scene.add(group);
  }

  addInteractionRing(group, zone) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(zone.radius * 0.94, zone.radius, 48),
      new THREE.MeshBasicMaterial({
        color: zone.color,
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
        side: THREE.DoubleSide
      })
    );
    ring.name = `ZONE_${zone.id}_interaction_ring`;
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.19;
    group.add(ring);
  }

  addLandmark(group, zone) {
    const asset = this.world.cloneEnvironmentAsset(`EnvLandmark_${zone.shape}`) || this.createFallbackLandmark(zone);
    asset.name = `VIS_Landmark_${zone.id}`;
    asset.traverse?.((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    group.add(asset);

    const collider = landmarkCollider(zone.shape);
    if (!collider) return;

    if (collider.type === 'cylinder') {
      this.world.physics.createFixedCylinder(
        [zone.position.x, collider.height / 2, zone.position.z],
        collider.height / 2,
        collider.radius,
        { friction: 0.85, restitution: 0.02 }
      );
      return;
    }

    this.world.physics.createFixedBox(
      [zone.position.x, collider.size[1] / 2, zone.position.z],
      collider.size,
      { rotation: [0, zone.rotation || 0, 0], friction: 0.85, restitution: 0.02 }
    );
  }

  createFallbackLandmark(zone) {
    switch (zone.shape) {
      case 'hub':
        return this.makeCourtyard(zone);
      case 'lab':
        return this.makeKeep(zone);
      case 'foundry':
        return this.makeFoundry(zone);
      case 'tower':
        return this.makeWatchtower(zone);
      case 'office':
        return this.makeGuildHall(zone);
      case 'terminal':
        return this.makeOracle(zone);
      case 'library':
        return this.makeLibrary(zone);
      case 'trophy':
        return this.makeShrine(zone);
      case 'vault':
        return this.makeVault(zone);
      case 'board':
        return this.makeNoticeBoard(zone);
      case 'gate':
        return this.makeCircuitGate(zone);
      case 'post':
        return this.makeLighthouse(zone);
      case 'portal':
        return this.makePortal(zone);
      case 'rampyard':
        return this.makeStuntMarker(zone);
      case 'pier':
        return this.makePier(zone);
      case 'farm':
        return new THREE.Group();
      default:
        return this.makeCourtyard(zone);
    }
  }

  makeCourtyard(zone) {
    const group = new THREE.Group();
    this.cylinder(group, 0, 0.18, 0, 5.6, 0.32, this.world.materials.paleStone, 36);
    this.cylinder(group, 0, 1.1, 0, 2.2, 1.6, this.world.materials.stone, 22);
    this.cone(group, 0, 2.05, 0, 1.25, 0, 1.2, this.world.materials.roof, 22);
    return group;
  }

  makeKeep(zone) {
    const group = new THREE.Group();
    this.box(group, 0, 1.75, 0, 5.8, 3.5, 4.8, this.world.materials.stone);
    this.box(group, 0, 3.75, 0, 6.2, 0.42, 5.2, this.world.materials.paleStone);
    for (const x of [-2.7, 2.7]) for (const z of [-2.2, 2.2]) {
      this.cylinder(group, x, 2.4, z, 0.8, 4.6, this.world.materials.stone, 16);
      this.cone(group, x, 5.05, z, 1.0, 0, 1.4, this.world.materials.roof, 16);
    }
    this.box(group, 0, 1.05, 2.46, 1.25, 1.75, 0.08, this.world.materials.darkWood);
    return group;
  }

  makeFoundry(zone) {
    const group = new THREE.Group();
    this.box(group, 0, 1.35, 0, 6.8, 2.7, 4.8, this.world.materials.darkWood);
    this.box(group, 0, 3.0, 0, 7.4, 0.5, 5.2, this.world.materials.roof, [0.18, 0, 0]);
    this.cylinder(group, 2.3, 3.2, -1.5, 0.45, 4.2, this.world.materials.stone, 12);
    const glow = new THREE.PointLight(0xff7a32, 2.5, 22);
    glow.position.set(-1.8, 1.4, 1.8);
    group.add(glow);
    return group;
  }

  makeWatchtower(zone) {
    const group = new THREE.Group();
    this.cylinder(group, 0, 2.8, 0, 1.65, 5.6, this.world.materials.stone, 18);
    this.cylinder(group, 0, 5.7, 0, 2.15, 0.72, this.world.materials.paleStone, 18);
    this.cone(group, 0, 6.65, 0, 2.15, 0, 1.55, this.world.materials.roof, 18);
    const beacon = new THREE.PointLight(0xff6d8d, 2.3, 36);
    beacon.position.set(0, 6.25, 0);
    group.add(beacon);
    return group;
  }

  makeGuildHall(zone) {
    const group = new THREE.Group();
    this.box(group, 0, 1.6, 0, 7.0, 3.2, 5.4, this.world.materials.paleStone);
    this.box(group, 0, 3.5, 0, 7.7, 0.48, 6.0, this.world.materials.roof, [0.12, 0, 0]);
    for (const x of [-2.4, 0, 2.4]) this.box(group, x, 1.85, 2.75, 0.72, 1.0, 0.08, this.world.materials.glass);
    return group;
  }

  makeOracle(zone) {
    const group = new THREE.Group();
    this.cylinder(group, 0, 0.65, 0, 2.5, 1.3, this.world.materials.stone, 20);
    this.box(group, 0, 2.1, 0, 4.2, 1.8, 0.45, this.world.materials.glow);
    this.cylinder(group, 0, 3.35, 0, 1.2, 0.2, this.world.materials.gold, 24);
    return group;
  }

  makeLibrary(zone) {
    const group = new THREE.Group();
    this.box(group, 0, 1.45, 0, 7.2, 2.9, 5.2, this.world.materials.paleStone);
    for (const x of [-2.8, -1.4, 0, 1.4, 2.8]) this.cylinder(group, x, 1.65, 2.78, 0.18, 3.3, this.world.materials.stone, 10);
    this.cone(group, 0, 3.55, 0, 4.4, 0.8, 1.2, this.world.materials.roof, 4, [0, Math.PI / 4, 0]);
    return group;
  }

  makeShrine(zone) {
    const group = new THREE.Group();
    this.cylinder(group, 0, 0.45, 0, 2.4, 0.9, this.world.materials.paleStone, 24);
    this.cylinder(group, 0, 1.8, 0, 0.72, 2.2, this.world.materials.gold, 20);
    this.cone(group, 0, 3.22, 0, 1.15, 0.28, 0.9, this.world.materials.gold, 20);
    return group;
  }

  makeVault(zone) {
    const group = new THREE.Group();
    this.box(group, 0, 1.25, 0, 5.4, 2.5, 4.0, this.world.materials.stone);
    this.cylinder(group, 0, 1.35, 2.08, 1.1, 0.28, this.world.materials.gold, 24, [Math.PI / 2, 0, 0]);
    this.box(group, 0, 2.85, 0, 5.8, 0.45, 4.4, this.world.materials.roof);
    return group;
  }

  makeNoticeBoard(zone) {
    const group = new THREE.Group();
    this.box(group, -2.3, 1.25, 0, 0.28, 2.5, 0.28, this.world.materials.darkWood);
    this.box(group, 2.3, 1.25, 0, 0.28, 2.5, 0.28, this.world.materials.darkWood);
    this.box(group, 0, 2.05, 0, 5.4, 2.4, 0.28, this.world.materials.wood);
    this.box(group, 0, 3.45, 0, 5.9, 0.35, 0.45, this.world.materials.roof);
    return group;
  }

  makeCircuitGate(zone) {
    const group = new THREE.Group();
    for (const x of [-2.6, 2.6]) this.cylinder(group, x, 2.1, 0, 0.32, 4.2, this.world.materials.stone, 12);
    this.box(group, 0, 4.1, 0, 5.8, 0.5, 0.6, this.world.materials.gold);
    return group;
  }

  makeLighthouse(zone) {
    const group = new THREE.Group();
    this.cylinder(group, 0, 2.4, 0, 1.25, 4.8, this.world.materials.paleStone, 18);
    this.cylinder(group, 0, 5.0, 0, 1.6, 0.7, this.world.materials.glass, 18);
    this.cone(group, 0, 5.8, 0, 1.7, 0, 1.1, this.world.materials.roof, 18);
    const light = new THREE.PointLight(0x78b7ff, 2.2, 44);
    light.position.set(0, 5.1, 0);
    group.add(light);
    return group;
  }

  makePortal(zone) {
    const group = new THREE.Group();
    this.cylinder(group, -1.35, 2.2, 0, 0.28, 4.4, this.world.materials.stone, 12);
    this.cylinder(group, 1.35, 2.2, 0, 0.28, 4.4, this.world.materials.stone, 12);
    this.box(group, 0, 4.2, 0, 3.1, 0.45, 0.6, this.world.materials.stone);
    this.box(group, 0, 2.35, 0.02, 2.1, 2.8, 0.08, this.world.materials.glow);
    return group;
  }

  makeStuntMarker(zone) {
    return new THREE.Group();
  }

  makePier(zone) {
    const group = new THREE.Group();
    this.box(group, 0, 0.35, 0, 7.0, 0.7, 2.3, this.world.materials.wood);
    for (const x of [-2.8, -1.4, 0, 1.4, 2.8]) this.cylinder(group, x, -0.35, 0.85, 0.16, 1.7, this.world.materials.darkWood, 8);
    return group;
  }

  box(group, x, y, z, sx, sy, sz, mat, rotation = [0, 0, 0]) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  cylinder(group, x, y, z, radius, height, mat, sides = 16, rotation = [0, 0, 0]) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, sides), mat);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  cone(group, x, y, z, radiusBottom, radiusTop, height, mat, sides = 16, rotation = [0, 0, 0]) {
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(radiusBottom, height, sides, 1, false, 0, Math.PI * 2), mat);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
}

function landmarkCollider(shape) {
  switch (shape) {
    case 'hub':
      return { type: 'cylinder', radius: 2.45, height: 2.4 };
    case 'tower':
      return { type: 'cylinder', radius: 1.95, height: 7.2 };
    case 'post':
      return { type: 'cylinder', radius: 1.45, height: 6.2 };
    case 'lab':
      return { type: 'box', size: [5.9, 3.6, 4.9] };
    case 'foundry':
      return { type: 'box', size: [6.8, 3.1, 5.0] };
    case 'office':
      return { type: 'box', size: [10.4, 17.2, 9.2] };
    case 'library':
      return { type: 'box', size: [17.2, 12.4, 11.6] };
    case 'terminal':
      return { type: 'box', size: [4.4, 2.2, 1.2] };
    case 'trophy':
      return { type: 'cylinder', radius: 1.35, height: 3.3 };
    case 'vault':
      return { type: 'box', size: [5.4, 2.9, 4.1] };
    case 'board':
      return { type: 'box', size: [5.8, 3.2, 0.42] };
    case 'pier':
      return { type: 'box', size: [7.1, 0.8, 2.4] };
    case 'gate':
    case 'portal':
    case 'farm':
    case 'rampyard':
      return null;
    default:
      return { type: 'box', size: [4.8, 3.0, 4.0] };
  }
}
