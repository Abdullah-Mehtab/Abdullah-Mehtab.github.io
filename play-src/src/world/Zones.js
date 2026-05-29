// ABOUTME: Creates portfolio interaction zones and their visible landmark anchors.
// ABOUTME: Keeps only explicit protected landmark collision so scenery cannot hide blockers.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { worldZones } from './worldData.js';

export class Zones {
  constructor(world) {
    this.world = world;
    this.protectedLandmarks = [];
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
      new THREE.RingGeometry(1.7, 2.05, 4),
      new THREE.MeshBasicMaterial({
        color: zone.color,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        side: THREE.DoubleSide
      })
    );
    ring.name = `ZONE_${zone.id}_interaction_ring`;
    ring.rotation.x = -Math.PI / 2;
    ring.rotation.z = Math.PI / 4;
    ring.position.y = 0.19;
    group.add(ring);
  }

  addLandmark(group, zone) {
    const protectedAsset = zone.id === 'education' ? this.world.cloneEnvironmentAsset(`EnvLandmark_${zone.shape}`) : null;
    const rawAsset = protectedAsset || this.createFallbackLandmark(zone);
    let asset = this.mergeStaticMeshes(rawAsset, zone.id);
    if (protectedAsset) asset = this.createProtectedLandmarkDisplay(asset, zone);
    asset.name = `VIS_Landmark_${zone.id}`;
    asset.traverse?.((object) => {
      if (object.isMesh) {
        object.castShadow = false;
        object.receiveShadow = true;
      }
    });
    group.add(asset);

    const collider = zone.id === 'education' ? landmarkCollider(zone.shape) : null;
    if (!collider) return;

    if (collider.type === 'cylinder') {
      this.world.physics.createFixedCylinder(
        [zone.position.x, collider.height / 2, zone.position.z],
        collider.height / 2,
        collider.radius,
        {
          debugName: `ZONE_${zone.id}_protected_landmark_collider`,
          visualName: `VIS_Landmark_${zone.id}`,
          friction: 0.85,
          restitution: 0.02
        }
      );
      return;
    }

    this.world.physics.createFixedBox(
      [zone.position.x, collider.size[1] / 2, zone.position.z],
      collider.size,
      {
        debugName: `ZONE_${zone.id}_protected_landmark_collider`,
        visualName: `VIS_Landmark_${zone.id}`,
        rotation: [0, zone.rotation || 0, 0],
        friction: 0.85,
        restitution: 0.02
      }
    );
  }

  update(vehiclePosition) {
    for (const entry of this.protectedLandmarks) {
      const distance = vehiclePosition
        ? Math.hypot(vehiclePosition.x - entry.worldPosition.x, vehiclePosition.z - entry.worldPosition.z)
        : Infinity;
      const showExact = entry.mode === 'exact'
        ? distance < entry.hideDistance
        : distance < entry.showDistance;
      entry.exact.visible = showExact;
      entry.silhouette.visible = !showExact;
      entry.mode = showExact ? 'exact' : 'silhouette';
      entry.distance = Number(distance.toFixed(2));
    }
  }

  getProtectedLandmarkStats() {
    return Object.fromEntries(this.protectedLandmarks.map((entry) => [
      entry.id,
      {
        mode: entry.mode,
        distance: entry.distance,
        exactVisible: entry.exact.visible,
        silhouetteVisible: entry.silhouette.visible,
        exactTriangles: entry.exactTriangles,
        silhouetteTriangles: entry.silhouetteTriangles,
        showDistance: entry.showDistance,
        hideDistance: entry.hideDistance
      }
    ]));
  }

  mergeStaticMeshes(asset, zoneId) {
    asset.updateMatrixWorld(true);
    const byMaterial = new Map();
    const passthrough = [];

    asset.traverse((object) => {
      if (!object.isMesh || !object.geometry || Array.isArray(object.material)) {
        if (object.isMesh) passthrough.push(object.clone());
        return;
      }
      const material = object.material;
      const geometry = object.geometry.clone();
      geometry.applyMatrix4(object.matrixWorld);
      const key = `${materialSignature(material)}:${geometrySignature(geometry)}`;
      if (!byMaterial.has(key)) byMaterial.set(key, { material, geometries: [] });
      byMaterial.get(key).geometries.push(geometry);
    });

    const group = new THREE.Group();
    group.name = `VIS_Landmark_${zoneId}_merged`;
    for (const [index, entry] of Array.from(byMaterial.values()).entries()) {
      const merged = entry.geometries.length === 1 ? entry.geometries[0] : mergeGeometries(entry.geometries, false);
      if (!merged) {
        for (const geometry of entry.geometries) geometry.dispose();
        continue;
      }
      const mesh = new THREE.Mesh(merged, entry.material);
      mesh.name = `FCCStaticMaterial_${index}`;
      mesh.castShadow = false;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
    for (const object of passthrough) group.add(object);
    return group.children.length ? group : asset;
  }

  createProtectedLandmarkDisplay(exact, zone) {
    exact.name = `VIS_Landmark_${zone.id}_exact`;
    const silhouette = this.mergeStaticMeshes(this.createFccSilhouette(), `${zone.id}_silhouette`);
    silhouette.name = `VIS_Landmark_${zone.id}_silhouette`;
    silhouette.visible = true;
    exact.visible = false;

    const group = new THREE.Group();
    group.add(exact, silhouette);
    const entry = {
      id: zone.id,
      exact,
      silhouette,
      worldPosition: zone.position.clone(),
      mode: 'silhouette',
      distance: Infinity,
      showDistance: 58,
      hideDistance: 70,
      exactTriangles: countTriangles(exact),
      silhouetteTriangles: countTriangles(silhouette)
    };
    this.protectedLandmarks.push(entry);
    return group;
  }

  createFccSilhouette() {
    const group = new THREE.Group();
    this.box(group, 0, 4.65, 0, 16.8, 9.3, 8.6, this.world.materials.campusBrick);
    this.box(group, 0, 5.65, 0.1, 4.2, 11.3, 9.2, this.world.materials.campusBrick);
    this.box(group, 0, 10.18, 0.08, 17.4, 0.5, 9.0, this.world.materials.roof);
    this.box(group, 0, 11.65, 0.1, 5.0, 2.3, 9.6, this.world.materials.campusBrick);
    this.box(group, 0, 12.95, 0.1, 5.6, 0.44, 10.0, this.world.materials.roof);
    this.box(group, 0, 2.3, 4.42, 1.45, 3.9, 0.16, this.world.materials.darkWood);
    this.box(group, 0, 4.55, 4.55, 2.1, 0.34, 0.18, this.world.materials.paleStone);

    for (const z of [4.42, -4.42]) {
      for (const x of [-6.2, -3.8, -1.25, 1.25, 3.8, 6.2]) {
        for (const y of [2.0, 3.95, 5.9, 7.85]) {
          this.box(group, x, y, z, 0.82, 1.02, 0.12, this.world.materials.glass);
        }
      }
      for (const x of [-1.25, 1.25]) {
        for (const y of [9.7, 11.25]) {
          this.box(group, x, y, z, 0.82, 0.86, 0.12, this.world.materials.glass);
        }
      }
    }

    for (const x of [-7.4, -4.8, 4.8, 7.4]) {
      this.box(group, x, 10.88, 0.1, 1.25, 1.4, 8.7, this.world.materials.campusBrick);
    }
    return group;
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
    this.box(group, 0, 0.22, 0, 5.8, 0.38, 2.4, this.world.materials.paleStone);
    this.box(group, 0, 1.28, -0.38, 4.2, 1.72, 0.42, this.world.materials.cable);
    this.box(group, 0, 1.32, -0.62, 3.5, 1.12, 0.08, this.world.materials.glow);
    this.box(group, -2.46, 0.92, 0.78, 0.28, 1.4, 0.28, this.world.materials.darkWood);
    this.box(group, 2.46, 0.92, 0.78, 0.28, 1.4, 0.28, this.world.materials.darkWood);
    return group;
  }

  makeKeep(zone) {
    const group = new THREE.Group();
    this.box(group, 0, 0.18, 0, 7.4, 0.36, 5.8, this.world.materials.securityRoad);
    this.box(group, -2.2, 1.85, -0.2, 1.15, 3.7, 1.2, this.world.materials.cable);
    this.box(group, 0, 2.35, -0.2, 1.15, 4.7, 1.2, this.world.materials.cable);
    this.box(group, 2.2, 1.55, -0.2, 1.15, 3.1, 1.2, this.world.materials.cable);
    for (const x of [-2.2, 0, 2.2]) {
      for (let i = 0; i < 4; i += 1) {
        this.box(group, x, 0.85 + i * 0.62, 0.44, 0.72, 0.08, 0.06, this.world.materials.screen);
      }
    }
    this.box(group, 0, 3.05, 1.7, 5.8, 0.22, 0.28, this.world.materials.glowBlue);
    this.box(group, 0, 1.4, 2.35, 4.8, 2.8, 0.18, this.world.materials.glowBlue);
    return group;
  }

  makeFoundry(zone) {
    const group = new THREE.Group();
    this.box(group, 0, 1.35, 0, 6.8, 2.7, 4.8, this.world.materials.darkWood);
    this.box(group, 0, 3.0, 0, 7.4, 0.5, 5.2, this.world.materials.roof, [0.18, 0, 0]);
    this.cylinder(group, 2.3, 3.2, -1.5, 0.45, 4.2, this.world.materials.stone, 12);
    this.box(group, -1.8, 1.4, 1.8, 1.2, 0.18, 0.18, this.world.materials.warmGlow);
    return group;
  }

  makeWatchtower(zone) {
    const group = new THREE.Group();
    this.cylinder(group, 0, 2.8, 0, 1.65, 5.6, this.world.materials.stone, 18);
    this.cylinder(group, 0, 5.7, 0, 2.15, 0.72, this.world.materials.paleStone, 18);
    this.cone(group, 0, 6.65, 0, 2.15, 0, 1.55, this.world.materials.roof, 18);
    this.cylinder(group, 0, 6.25, 0, 0.42, 0.3, this.world.materials.glowPink, 12);
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
    this.cylinder(group, 0, 5.1, 0, 1.1, 0.32, this.world.materials.glowBlue, 18);
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
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  cylinder(group, x, y, z, radius, height, mat, sides = 16, rotation = [0, 0, 0]) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, sides), mat);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  cone(group, x, y, z, radiusBottom, radiusTop, height, mat, sides = 16, rotation = [0, 0, 0]) {
    const mesh = new THREE.Mesh(new THREE.ConeGeometry(radiusBottom, height, sides, 1, false, 0, Math.PI * 2), mat);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }
}

function countTriangles(root) {
  let total = 0;
  root.traverse?.((object) => {
    if (!object.isMesh || !object.geometry) return;
    const geometry = object.geometry;
    const base = geometry.index
      ? geometry.index.count / 3
      : geometry.attributes?.position
        ? geometry.attributes.position.count / 3
        : 0;
    total += base * (object.isInstancedMesh ? object.count || 1 : 1);
  });
  return Math.round(total);
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
      return { type: 'box', size: [7.2, 3.4, 5.6] };
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

function geometrySignature(geometry) {
  const attributes = Object.entries(geometry.attributes)
    .map(([name, attribute]) => `${name}:${attribute.itemSize}:${attribute.normalized ? 1 : 0}:${attribute.array?.constructor?.name || 'array'}`)
    .sort()
    .join('|');
  return `${geometry.index ? 'indexed' : 'plain'}:${attributes}`;
}

function materialSignature(material) {
  return [
    material.type,
    material.color?.getHexString?.() || '',
    material.emissive?.getHexString?.() || '',
    material.emissiveIntensity ?? '',
    material.roughness ?? '',
    material.metalness ?? '',
    material.opacity ?? 1,
    material.transparent ? 1 : 0,
    material.side ?? THREE.FrontSide,
    material.vertexColors ? 1 : 0,
    material.alphaTest ?? 0,
    textureSignature(material.map)
  ].join(':');
}

function textureSignature(texture) {
  if (!texture) return '';
  return texture.source?.uuid || texture.image?.src || texture.uuid;
}
