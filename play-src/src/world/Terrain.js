// ABOUTME: Builds the procedural toy-island terrain used by /play.
// ABOUTME: Replaces the old authored island GLB while keeping a stable visible driving floor.
import * as THREE from 'three';
import { districtFootprints, ISLAND_RADIUS, terrainBrushes } from './worldData.js';
import { getIslandCoastPoints, makeIslandBandGeometry, makeIslandGeometry, makePatchGeometry, WATER_Y } from './WorldMaterials.js';

export class Terrain {
  constructor(world) {
    this.world = world;
    this.authoredIslandLoaded = false;
  }

  build() {
    this.addBeachBase();
    this.addGrassPlateau();
    this.addTerrainBrushes();
    this.addDistrictGrounding();
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
