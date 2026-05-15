import * as THREE from 'three';
import { ISLAND_RADIUS, WORLD_HALF_SIZE } from './worldData.js';
import { makeIslandGeometry, makeRingGeometry, WATER_Y } from './WorldMaterials.js';

export class Terrain {
  constructor(world) {
    this.world = world;
    this.authoredIslandLoaded = false;
  }

  build() {
    this.authoredIslandLoaded = this.addAuthoredIsland();
    if (!this.authoredIslandLoaded) {
      this.addFallbackGround();
      this.addBeachAndCliffs();
    }
    this.addPhysicsFloor();
  }

  addAuthoredIsland() {
    const visual = this.world.environmentAssets?.cloneScene?.('islandVisual');
    if (!visual) return false;
    visual.name = 'MedievalIslandVisual';
    visual.traverse((object) => {
      if (/^(SPAWN_|ZONE_|WATER_)/.test(object.name)) {
        object.visible = false;
        return;
      }
      if (object.isMesh) {
        object.geometry?.computeVertexNormals?.();
        if (object.name.includes('IslandTerrain')) object.material = this.world.materials.ground;
        else if (object.name.includes('Beach')) object.material = this.world.materials.sand;
        else if (object.name.includes('Cliff')) object.material = this.world.materials.cliff;
        object.receiveShadow = true;
        object.castShadow = false;
      }
    });
    this.world.scene.add(visual);
    this.world.decor.push({ type: 'authoredIsland', mesh: visual });
    this.addInteriorGrassCap();
    this.addCleanShoreBand();
    return true;
  }

  addInteriorGrassCap() {
    const cap = new THREE.Mesh(new THREE.CircleGeometry(ISLAND_RADIUS * 1.025, 260), this.world.materials.ground);
    cap.name = 'MedievalIslandInteriorGrassCap';
    cap.rotation.x = -Math.PI / 2;
    cap.position.y = 0.066;
    cap.receiveShadow = true;
    this.world.scene.add(cap);
    this.world.decor.push({ type: 'grassCap', mesh: cap });
  }

  addCleanShoreBand() {
    const shore = new THREE.Mesh(
      makeRingGeometry(ISLAND_RADIUS * 0.94, ISLAND_RADIUS * 1.045, 220, 1.8),
      this.world.materials.sand
    );
    shore.name = 'MedievalIslandCleanBeachBand';
    shore.position.y = 0.074;
    shore.receiveShadow = true;
    this.world.scene.add(shore);
    this.world.decor.push({ type: 'shoreBand', mesh: shore });
  }

  addFallbackGround() {
    const geometry = makeIslandGeometry(ISLAND_RADIUS, 180);
    const ground = new THREE.Mesh(geometry, this.world.materials.ground);
    ground.name = 'FallbackMedievalIslandGrass';
    ground.receiveShadow = true;
    ground.position.y = 0;
    this.world.scene.add(ground);
    this.world.decor.push({ type: 'ground', mesh: ground });
  }

  addBeachAndCliffs() {
    const beach = new THREE.Mesh(
      makeRingGeometry(ISLAND_RADIUS * 0.92, ISLAND_RADIUS * 1.01, 180, 2.4),
      this.world.materials.sand
    );
    beach.name = 'MedievalIslandBeachBlend';
    beach.position.y = 0.028;
    beach.receiveShadow = true;
    this.world.scene.add(beach);

    const cliff = new THREE.Mesh(
      makeRingGeometry(ISLAND_RADIUS * 0.985, ISLAND_RADIUS * 1.06, 160, 2.8),
      this.world.materials.cliff
    );
    cliff.name = 'MedievalIslandCliffEdge';
    cliff.position.y = WATER_Y + 0.12;
    cliff.receiveShadow = true;
    this.world.scene.add(cliff);

    this.world.decor.push({ type: 'beach', mesh: beach }, { type: 'cliff', mesh: cliff });
  }

  addPhysicsFloor() {
    this.world.physics.createFixedBox([0, -0.47, 0], [WORLD_HALF_SIZE * 2.1, 1, WORLD_HALF_SIZE * 2.1], {
      friction: 1.08,
      restitution: 0.01
    });
  }

  containsPoint(x, z, margin = 0) {
    return Math.hypot(x, z) <= ISLAND_RADIUS - margin;
  }
}
