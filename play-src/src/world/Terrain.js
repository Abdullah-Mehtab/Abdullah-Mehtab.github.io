// ABOUTME: Builds the procedural toy-island terrain used by /play.
// ABOUTME: Replaces the old authored island GLB while keeping a stable visible driving floor.
import * as THREE from 'three';
import { districtFootprints, ISLAND_RADIUS, meadowDetailPatches, roadSegments, terrainBrushes } from './worldData.js';
import { getIslandCoastPoints, makeIslandBandGeometry, makeIslandGeometry, makePatchGeometry, pseudoRandom, WATER_Y } from './WorldMaterials.js';

const DISTRICT_DETAIL_STYLES = {
  plaza: { seam: 0xe9d7ad, paver: 0x907f62, accent: 0x7cffb2 },
  campus: { seam: 0xf2dfb2, paver: 0xa98962, accent: 0x9ccfff },
  security: { seam: 0x68d8ff, paver: 0x1e4656, accent: 0xff6d8d },
  workshop: { seam: 0xffcc66, paver: 0x6a5a45, accent: 0xff9b6d },
  tower: { seam: 0xff9db0, paver: 0x7a5d68, accent: 0xff6d8d },
  archive: { seam: 0xffdf8a, paver: 0x9d875a, accent: 0xffffff },
  driving: { seam: 0xff9b6d, paver: 0x6d4a38, accent: 0xf3e7bd },
  trail: { seam: 0xc79b56, paver: 0x5f3d22, accent: 0x92ffea },
  harbor: { seam: 0xf3d19c, paver: 0x8db8b9, accent: 0x78b7ff },
  pier: { seam: 0xd49a55, paver: 0x51311d, accent: 0x79ffc5 }
};

export class Terrain {
  constructor(world) {
    this.world = world;
    this.authoredIslandLoaded = false;
    this.surfaceDetailDummy = new THREE.Object3D();
    this.reliefDummy = new THREE.Object3D();
    this.surfaceDetailStats = { districts: 0, seams: 0, pavers: 0, accents: 0 };
    this.meadowDetailStats = { patches: 0, colorVariants: 0 };
    this.reliefStats = { mounds: 0, cliffShelves: 0, rockOutcrops: 0, duneRidges: 0, contourBands: 0, beachRipples: 0 };
    this.shorelineStats = { edgeBands: 0, foamBreaks: 0 };
  }

  build() {
    this.addBeachBase();
    this.addGrassPlateau();
    this.addTerrainBrushes();
    this.addMeadowDetailPatches();
    this.addDistrictGrounding();
    this.addDistrictSurfaceDetails();
    this.addScenicRelief();
    this.addCoastalEdges();
    this.addPhysicsFloor();
  }

  addBeachBase() {
    const beach = new THREE.Mesh(makeIslandGeometry(ISLAND_RADIUS, 156, 1.02), this.world.materials.sand);
    beach.name = 'ToyIslandBeachBase';
    beach.position.y = 0.025;
    beach.receiveShadow = true;
    this.world.scene.add(beach);

    const wetEdge = new THREE.Mesh(
      makeIslandBandGeometry(ISLAND_RADIUS, 0.985, 1.055, 156),
      this.world.materials.wetSandBlend
    );
    wetEdge.name = 'ToyIslandWetEdge';
    wetEdge.position.y = 0.042;
    wetEdge.renderOrder = 2;
    this.world.scene.add(wetEdge);
  }

  addGrassPlateau() {
    const grass = new THREE.Mesh(makeIslandGeometry(ISLAND_RADIUS, 156, 0.93), this.world.materials.ground);
    grass.name = 'ToyIslandGrassPlateau';
    grass.position.y = 0.062;
    grass.receiveShadow = true;
    this.world.scene.add(grass);
    this.world.decor.push({ type: 'ground', mesh: grass });

    const feather = new THREE.Mesh(
      makeIslandBandGeometry(ISLAND_RADIUS, 0.865, 0.955, 156),
      this.world.materials.grassSandBlend
    );
    feather.name = 'ToyIslandGrassToBeachFeather';
    feather.position.y = 0.078;
    feather.renderOrder = 3;
    this.world.scene.add(feather);
  }

  addDistrictGrounding() {
    const materials = {
      plaza: this.world.materials.plazaRoad,
      campus: this.world.materials.paleStone,
      security: this.world.materials.securityRoad,
      workshop: this.world.materials.stoneRoad,
      tower: this.world.materials.stone,
      archive: this.world.materials.paleStone,
      driving: this.world.materials.stuntRamp,
      trail: this.world.materials.wood,
      harbor: this.world.materials.sand,
      pier: this.world.materials.wood
    };

    districtFootprints.forEach((district, index) => {
      const patch = new THREE.Mesh(
        makePatchGeometry(district.size[0], district.size[1], index + 4),
        materials[district.kind] || this.world.materials.plazaRoad
      );
      patch.name = `ToyIslandDistrictPatch_${district.id}`;
      patch.position.set(district.center[0], 0.075 + index * 0.0008, district.center[1]);
      patch.rotation.y = (index % 3 - 1) * 0.08;
      patch.receiveShadow = true;
      patch.renderOrder = 4 + index;
      this.world.scene.add(patch);
    });
  }

  addTerrainBrushes() {
    terrainBrushes.forEach((brush, index) => {
      const material = this.world.materials[brush.material];
      if (!material) return;
      const patch = new THREE.Mesh(
        makePatchGeometry(brush.size[0], brush.size[1], index + 43),
        material
      );
      patch.name = `ToyIslandTerrainBrush_${brush.id}`;
      patch.position.set(brush.center[0], 0.066 + index * 0.0005, brush.center[1]);
      patch.rotation.y = brush.rotation || 0;
      patch.receiveShadow = false;
      patch.renderOrder = 4 + index;
      this.world.scene.add(patch);
    });
  }

  addMeadowDetailPatches() {
    const specs = meadowDetailPatches.map((patch, index) => ({
      x: patch.center[0],
      y: 0.168 + index * 0.0002,
      z: patch.center[1],
      width: patch.size[0],
      depth: patch.size[1],
      rotation: patch.rotation || 0,
      color: Number.parseInt(patch.color.slice(1), 16)
    }));
    this.addMeadowDetailInstances(specs);
    this.meadowDetailStats = {
      patches: specs.length,
      colorVariants: new Set(meadowDetailPatches.map((patch) => patch.color)).size
    };
  }

  addMeadowDetailInstances(specs) {
    if (!specs.length) return;
    const mesh = new THREE.InstancedMesh(makePatchGeometry(1, 1, 91), this.world.materials.meadowDetail, specs.length);
    mesh.name = 'ToyIslandMeadowDetailPatches';
    mesh.renderOrder = 33;
    mesh.frustumCulled = false;
    const color = new THREE.Color();
    specs.forEach((spec, index) => {
      this.surfaceDetailDummy.position.set(spec.x, spec.y, spec.z);
      this.surfaceDetailDummy.rotation.set(0, spec.rotation, 0);
      this.surfaceDetailDummy.scale.set(spec.width, 1, spec.depth);
      this.surfaceDetailDummy.updateMatrix();
      mesh.setMatrixAt(index, this.surfaceDetailDummy.matrix);
      mesh.setColorAt(index, color.setHex(spec.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    this.world.scene.add(mesh);
  }

  addDistrictSurfaceDetails() {
    const seams = [];
    const pavers = [];
    const accents = [];

    districtFootprints.forEach((district, index) => {
      const rotation = (index % 3 - 1) * 0.08;
      const style = DISTRICT_DETAIL_STYLES[district.kind] || DISTRICT_DETAIL_STYLES.plaza;
      const width = district.size[0];
      const depth = district.size[1];
      const seamColumns = Math.max(2, Math.floor(width / 18));
      const seamRows = Math.max(1, Math.floor(depth / 16));
      const seed = index + 11;

      for (let i = 1; i <= seamColumns; i += 1) {
        const localX = -width * 0.38 + (i / (seamColumns + 1)) * width * 0.76;
        seams.push(createSurfaceDetail(district, localX, 0, 0.22, depth * 0.72, rotation, style.seam));
      }
      for (let i = 1; i <= seamRows; i += 1) {
        const localZ = -depth * 0.36 + (i / (seamRows + 1)) * depth * 0.72;
        seams.push(createSurfaceDetail(district, 0, localZ, width * 0.7, 0.2, rotation, style.seam));
      }

      const paverColumns = Math.max(3, Math.floor(width / 18));
      for (let i = 0; i < paverColumns; i += 1) {
        const side = i % 2 === 0 ? -1 : 1;
        const localX = -width * 0.28 + (i / Math.max(1, paverColumns - 1)) * width * 0.56;
        const localZ = side * depth * (0.18 + pseudoRandom(seed * 17 + i) * 0.14);
        pavers.push(createSurfaceDetail(
          district,
          localX,
          localZ,
          4.6 + pseudoRandom(seed * 23 + i) * 3.2,
          2.1 + pseudoRandom(seed * 29 + i) * 1.6,
          rotation + (pseudoRandom(seed * 31 + i) - 0.5) * 0.28,
          style.paver
        ));
      }

      const accentLength = Math.min(18, Math.max(10, width * 0.24));
      accents.push(createSurfaceDetail(district, -width * 0.32, depth * 0.26, accentLength, 0.34, rotation + 0.42, style.accent));
      accents.push(createSurfaceDetail(district, width * 0.3, -depth * 0.22, accentLength * 0.72, 0.34, rotation - 0.38, style.accent));
    });

    this.addSurfaceDetailInstances('ToyIslandSurface_Seams', seams, this.world.materials.surfaceSeam, 36);
    this.addSurfaceDetailInstances('ToyIslandSurface_Pavers', pavers, this.world.materials.surfacePaver, 35);
    this.addSurfaceDetailInstances('ToyIslandSurface_Accents', accents, this.world.materials.surfaceAccent, 37);
    this.surfaceDetailStats = {
      districts: districtFootprints.length,
      seams: seams.length,
      pavers: pavers.length,
      accents: accents.length
    };
  }

  addScenicRelief() {
    const group = new THREE.Group();
    group.name = 'ToyIslandScenicRelief';
    const mounds = [
      { x: 22, z: 130, width: 72, depth: 15, height: 1.05, rotation: 0.18, material: this.world.materials.meadowLight, seed: 3 },
      { x: -116, z: 106, width: 46, depth: 13, height: 0.82, rotation: -0.42, material: this.world.materials.meadowDark, seed: 9 },
      { x: 116, z: 92, width: 48, depth: 12, height: 0.76, rotation: 0.62, material: this.world.materials.meadowLight, seed: 13 },
      { x: -132, z: -42, width: 42, depth: 14, height: 0.88, rotation: 0.12, material: this.world.materials.meadowDark, seed: 19 },
      { x: 110, z: -128, width: 58, depth: 14, height: 0.9, rotation: -0.48, material: this.world.materials.meadowLight, seed: 23 },
      { x: -44, z: -146, width: 62, depth: 12, height: 0.78, rotation: 0.24, material: this.world.materials.meadowDark, seed: 29 }
    ];
    for (const spec of mounds) {
      const mound = new THREE.Mesh(createMoundGeometry(spec.width, spec.depth, spec.height, spec.seed), spec.material);
      mound.name = 'TerrainRelief_Mound';
      mound.position.set(spec.x, 0.08, spec.z);
      mound.rotation.y = spec.rotation;
      mound.receiveShadow = true;
      group.add(mound);
    }

    const cliffShelves = [
      { x: 146, z: 45, width: 22, depth: 4.5, rotation: 0.9 },
      { x: 126, z: -126, width: 28, depth: 4.2, rotation: -0.42 },
      { x: -150, z: 42, width: 26, depth: 4.6, rotation: -0.95 },
      { x: -112, z: -124, width: 24, depth: 4.4, rotation: 0.54 },
      { x: 4, z: 151, width: 34, depth: 4.8, rotation: 0.08 },
      { x: 66, z: -148, width: 24, depth: 4.0, rotation: -0.22 }
    ];
    for (const spec of cliffShelves) {
      const shelf = new THREE.Mesh(createShelfGeometry(spec.width, spec.depth), this.world.materials.cliff);
      shelf.name = 'TerrainRelief_CliffShelf';
      shelf.position.set(spec.x, 0.32, spec.z);
      shelf.rotation.y = spec.rotation;
      shelf.receiveShadow = true;
      group.add(shelf);
    }

    const duneRidges = [
      { x: 94, z: -141, width: 30, depth: 3.2, rotation: -0.36 },
      { x: -78, z: -145, width: 28, depth: 3.0, rotation: 0.22 },
      { x: -143, z: 4, width: 26, depth: 3.2, rotation: 1.42 },
      { x: 144, z: 18, width: 24, depth: 3.0, rotation: -1.28 },
      { x: 44, z: 144, width: 30, depth: 3.1, rotation: 0.36 },
      { x: -38, z: 145, width: 26, depth: 3.0, rotation: -0.26 }
    ];
    for (const spec of duneRidges) {
      const ridge = new THREE.Mesh(createDuneRidgeGeometry(spec.width, spec.depth), this.world.materials.sand);
      ridge.name = 'TerrainRelief_DuneRidge';
      ridge.position.set(spec.x, 0.18, spec.z);
      ridge.rotation.y = spec.rotation;
      ridge.receiveShadow = true;
      group.add(ridge);
    }

    this.addContourBands(group);
    this.addBeachRipples(group);
    this.addRockOutcrops(group);
    this.world.scene.add(group);
    this.reliefStats = {
      mounds: mounds.length,
      cliffShelves: cliffShelves.length,
      rockOutcrops: group.userData.rockOutcrops || 0,
      duneRidges: duneRidges.length,
      contourBands: group.userData.contourBands || 0,
      beachRipples: group.userData.beachRipples || 0
    };
  }

  addContourBands(group) {
    const specs = [];
    for (let attempt = 0; attempt < 180 && specs.length < 48; attempt += 1) {
      const seed = attempt + 37;
      const radius = (0.2 + pseudoRandom(seed * 3.1) * 0.62) * ISLAND_RADIUS;
      const angle = pseudoRandom(seed * 5.7) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if (Math.hypot(x, z) > ISLAND_RADIUS * 0.82) continue;
      if (isNearRoad(x, z, 9.5)) continue;
      specs.push({
        x,
        z,
        rotation: angle + Math.PI * 0.5 + (pseudoRandom(seed * 11.2) - 0.5) * 0.72,
        width: 0.55 + pseudoRandom(seed * 13.4) * 0.34,
        length: 7.5 + pseudoRandom(seed * 17.9) * 14
      });
    }
    const material = new THREE.MeshBasicMaterial({
      color: 0x1d4b2c,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -34,
      polygonOffsetUnits: -34
    });
    const mesh = this.addFlatDetailInstances('TerrainRelief_ContourBands', specs, material, 0.184);
    group.add(mesh);
    group.userData.contourBands = specs.length;
  }

  addBeachRipples(group) {
    const specs = [];
    for (let i = 0; i < 64; i += 1) {
      const angle = (i / 64) * Math.PI * 2 + pseudoRandom(i * 5.6) * 0.055;
      const radius = ISLAND_RADIUS * (0.89 + pseudoRandom(i * 7.4) * 0.08);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if (isNearRoad(x, z, 7.4)) continue;
      specs.push({
        x,
        z,
        rotation: angle + Math.PI * 0.5,
        width: 0.18 + pseudoRandom(i * 11.1) * 0.16,
        length: 4.2 + pseudoRandom(i * 13.8) * 7.6
      });
    }
    const material = new THREE.MeshBasicMaterial({
      color: 0x946638,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -35,
      polygonOffsetUnits: -35
    });
    const mesh = this.addFlatDetailInstances('TerrainRelief_BeachRipples', specs, material, 0.19);
    group.add(mesh);
    group.userData.beachRipples = specs.length;
  }

  addFlatDetailInstances(name, specs, material, y) {
    const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 0.02, 1), material, specs.length);
    mesh.name = name;
    mesh.renderOrder = 38;
    mesh.frustumCulled = false;
    specs.forEach((spec, index) => {
      this.reliefDummy.position.set(spec.x, y, spec.z);
      this.reliefDummy.rotation.set(0, spec.rotation, 0);
      this.reliefDummy.scale.set(spec.width, 1, spec.length);
      this.reliefDummy.updateMatrix();
      mesh.setMatrixAt(index, this.reliefDummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  addRockOutcrops(group) {
    const specs = [
      [142, 64, 0.9, 0.82],
      [150, 20, -0.2, 0.72],
      [130, -132, 0.4, 0.86],
      [88, -151, -0.5, 0.7],
      [-96, -145, 0.8, 0.76],
      [-145, -62, -0.3, 0.82],
      [-151, 24, 0.5, 0.72],
      [-130, 102, -0.7, 0.8],
      [-18, 150, 0.2, 0.74],
      [54, 148, -0.2, 0.7],
      [121, 121, 0.64, 0.78],
      [-142, 74, -0.55, 0.7]
    ];
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const mesh = new THREE.InstancedMesh(geometry, this.world.materials.cliff, specs.length);
    mesh.name = 'TerrainRelief_RockOutcrops';
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    specs.forEach(([x, z, rotation, scale], index) => {
      this.reliefDummy.position.set(x, 0.72 * scale, z);
      this.reliefDummy.rotation.set(0.18 + index * 0.05, rotation, -0.08 + index * 0.03);
      this.reliefDummy.scale.set(scale * 2.8, scale * 0.92, scale * 1.9);
      this.reliefDummy.updateMatrix();
      mesh.setMatrixAt(index, this.reliefDummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    group.add(mesh);
    group.userData.rockOutcrops = specs.length;
  }

  addSurfaceDetailInstances(name, specs, material, renderOrder) {
    if (!specs.length) return;
    const mesh = new THREE.InstancedMesh(createHorizontalPlaneGeometry(), material, specs.length);
    mesh.name = name;
    mesh.renderOrder = renderOrder;
    mesh.frustumCulled = false;
    const color = new THREE.Color();
    specs.forEach((spec, index) => {
      this.surfaceDetailDummy.position.set(spec.x, spec.y, spec.z);
      this.surfaceDetailDummy.rotation.set(0, spec.rotation, 0);
      this.surfaceDetailDummy.scale.set(spec.width, 1, spec.depth);
      this.surfaceDetailDummy.updateMatrix();
      mesh.setMatrixAt(index, this.surfaceDetailDummy.matrix);
      mesh.setColorAt(index, color.setHex(spec.color));
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    this.world.scene.add(mesh);
  }

  addCoastalEdges() {
    const cliff = new THREE.Mesh(
      makeIslandBandGeometry(ISLAND_RADIUS, 1.025, 1.052, 156),
      this.world.materials.shoreCliff
    );
    cliff.name = 'ToyIslandLowCliffEdge';
    cliff.position.y = WATER_Y + 0.33;
    cliff.receiveShadow = true;
    this.world.scene.add(cliff);
    this.addShorelineFoamBreaks();
    this.shorelineStats.edgeBands = 1;
  }

  addShorelineFoamBreaks() {
    const coastPoints = getIslandCoastPoints(ISLAND_RADIUS, 1.012, 156);
    const specs = [];
    for (let i = 0; i < 72; i += 1) {
      const angle = (i / 72) * Math.PI * 2;
      const pointIndex = Math.round((angle / (Math.PI * 2)) * coastPoints.length) % coastPoints.length;
      const [x, z] = coastPoints[pointIndex];
      if (isNearRoad(x, z, 3.8) && i % 3 !== 0) continue;
      const jitter = pseudoRandom(i * 9.73) - 0.5;
      specs.push({
        x,
        z,
        rotation: angle + Math.PI * 0.5 + jitter * 0.42,
        width: 0.08 + pseudoRandom(i * 13.1) * 0.08,
        length: 1.8 + pseudoRandom(i * 17.7) * 2.2
      });
    }
    const material = this.world.materials.foam.clone();
    material.opacity = 0.22;
    material.polygonOffset = true;
    material.polygonOffsetFactor = -42;
    material.polygonOffsetUnits = -42;
    const mesh = this.addFlatDetailInstances('ToyIslandShorelineFoamBreaks', specs, material, 0.118);
    this.world.scene.add(mesh);
    this.shorelineStats.foamBreaks = specs.length;
  }

  addPhysicsFloor() {
    const { vertices, indices } = makeIslandColliderMesh(ISLAND_RADIUS, 1.01, 112, 0.04, -0.95);

    this.world.physics.createFixedTrimesh([0, 0, 0], vertices, indices, {
      debugName: 'ToyIslandTerrainCollider',
      visualName: 'ToyIslandGrassPlateau',
      friction: 1.08,
      restitution: 0.01
    });
  }

  containsPoint(x, z, margin = 0) {
    return Math.hypot(x, z) <= ISLAND_RADIUS - margin;
  }

  getReliefStats() {
    return { ...this.reliefStats };
  }

  getMeadowDetailStats() {
    return { ...this.meadowDetailStats };
  }

  getShorelineStats() {
    return { ...this.shorelineStats };
  }
}

function makeIslandColliderMesh(radius, scale, segments, topY, bottomY) {
  const points = getIslandCoastPoints(radius, scale, segments);
  const vertices = new Float32Array((2 + points.length * 2) * 3);
  writeVertex(vertices, 0, 0, topY, 0);
  writeVertex(vertices, 1, 0, bottomY, 0);

  for (let i = 0; i < points.length; i += 1) {
    const [x, z] = points[i];
    writeVertex(vertices, 2 + i, x, topY, z);
    writeVertex(vertices, 2 + points.length + i, x, bottomY, z);
  }

  const indices = new Uint32Array(points.length * 12);
  let cursor = 0;
  for (let i = 0; i < points.length; i += 1) {
    const next = (i + 1) % points.length;
    const topCurrent = 2 + i;
    const topNext = 2 + next;
    const bottomCurrent = 2 + points.length + i;
    const bottomNext = 2 + points.length + next;

    indices[cursor++] = 0;
    indices[cursor++] = topNext;
    indices[cursor++] = topCurrent;

    indices[cursor++] = 1;
    indices[cursor++] = bottomCurrent;
    indices[cursor++] = bottomNext;

    indices[cursor++] = topCurrent;
    indices[cursor++] = topNext;
    indices[cursor++] = bottomNext;

    indices[cursor++] = topCurrent;
    indices[cursor++] = bottomNext;
    indices[cursor++] = bottomCurrent;
  }
  return { vertices, indices };
}

function writeVertex(vertices, index, x, y, z) {
  const cursor = index * 3;
  vertices[cursor] = x;
  vertices[cursor + 1] = y;
  vertices[cursor + 2] = z;
}

function createSurfaceDetail(district, localX, localZ, width, depth, rotation, color) {
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  return {
    x: district.center[0] + localX * cos + localZ * sin,
    y: 0.172,
    z: district.center[1] - localX * sin + localZ * cos,
    width,
    depth,
    rotation,
    color
  };
}

function createHorizontalPlaneGeometry() {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
    -0.5, 0, -0.5,
    0.5, 0, -0.5,
    0.5, 0, 0.5,
    -0.5, 0, 0.5
  ]), 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([
    0, 0,
    1, 0,
    1, 1,
    0, 1
  ]), 2));
  geometry.setIndex([0, 2, 1, 0, 3, 2]);
  geometry.computeVertexNormals();
  return geometry;
}

function isNearRoad(x, z, margin) {
  return roadSegments.some(([cx, cz, width, length, rotation]) => {
    const dx = x - cx;
    const dz = z - cz;
    const localX = Math.cos(rotation) * dx - Math.sin(rotation) * dz;
    const localZ = Math.sin(rotation) * dx + Math.cos(rotation) * dz;
    return Math.abs(localX) <= width / 2 + margin && Math.abs(localZ) <= length / 2 + margin;
  });
}

function createMoundGeometry(width, depth, height, seed) {
  const columns = 9;
  const rows = 5;
  const vertices = [];
  const uvs = [];
  const indices = [];
  for (let row = 0; row < rows; row += 1) {
    const v = row / (rows - 1);
    const z = (v - 0.5) * depth;
    for (let column = 0; column < columns; column += 1) {
      const u = column / (columns - 1);
      const x = (u - 0.5) * width;
      const nx = Math.abs(u - 0.5) * 2;
      const nz = Math.abs(v - 0.5) * 2;
      const falloff = Math.max(0, 1 - Math.pow(nx, 2.2)) * Math.max(0, 1 - Math.pow(nz, 1.65));
      const noise = 0.86 + pseudoRandom(seed * 17 + column * 11.3 + row * 7.1) * 0.22;
      vertices.push(x, falloff * height * noise, z);
      uvs.push(u, v);
    }
  }
  for (let row = 0; row < rows - 1; row += 1) {
    for (let column = 0; column < columns - 1; column += 1) {
      const a = row * columns + column;
      const b = a + 1;
      const c = a + columns;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createShelfGeometry(width, depth) {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;
  const vertices = new Float32Array([
    -halfWidth, 0.28, -halfDepth,
    halfWidth, 0.22, -halfDepth,
    halfWidth * 0.92, -0.3, halfDepth,
    -halfWidth * 0.92, -0.24, halfDepth,
    -halfWidth * 0.82, 0.62, -halfDepth * 0.28,
    halfWidth * 0.78, 0.54, -halfDepth * 0.22
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex([
    0, 1, 4,
    1, 5, 4,
    0, 2, 1,
    0, 3, 2,
    3, 4, 5,
    3, 5, 2,
    0, 4, 3,
    1, 2, 5
  ]);
  geometry.computeVertexNormals();
  return geometry;
}

function createDuneRidgeGeometry(width, depth) {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;
  const vertices = new Float32Array([
    -halfWidth, 0, -halfDepth,
    halfWidth, 0, -halfDepth,
    halfWidth, 0, halfDepth,
    -halfWidth, 0, halfDepth,
    0, 0.58, 0
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex([
    0, 1, 4,
    1, 2, 4,
    2, 3, 4,
    3, 0, 4,
    0, 3, 2,
    0, 2, 1
  ]);
  geometry.computeVertexNormals();
  return geometry;
}
