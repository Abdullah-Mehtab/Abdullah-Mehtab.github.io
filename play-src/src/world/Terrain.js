// ABOUTME: Builds the procedural toy-island terrain used by /play.
// ABOUTME: Replaces the old authored island GLB while keeping a stable visible driving floor.
import * as THREE from 'three';
import { districtFootprints, ISLAND_RADIUS, terrainBrushes } from './worldData.js';
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
    this.surfaceDetailStats = { districts: 0, seams: 0, pavers: 0, accents: 0 };
  }

  build() {
    this.addBeachBase();
    this.addGrassPlateau();
    this.addTerrainBrushes();
    this.addDistrictGrounding();
    this.addDistrictSurfaceDetails();
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
      makeIslandBandGeometry(ISLAND_RADIUS, 1.025, 1.075, 156),
      this.world.materials.cliff
    );
    cliff.name = 'ToyIslandLowCliffEdge';
    cliff.position.y = WATER_Y + 0.42;
    cliff.receiveShadow = true;
    this.world.scene.add(cliff);
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
