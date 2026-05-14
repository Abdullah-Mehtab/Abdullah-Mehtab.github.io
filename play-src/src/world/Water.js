import * as THREE from 'three';
import { ISLAND_RADIUS, WORLD_HALF_SIZE } from './worldData.js';
import { makeRingGeometry, WATER_Y } from './WorldMaterials.js';

export class Water {
  constructor(world) {
    this.world = world;
    this.waterMeshes = [];
  }

  build() {
    const ocean = new THREE.Mesh(new THREE.PlaneGeometry(WORLD_HALF_SIZE * 5.5, WORLD_HALF_SIZE * 5.5, 96, 96), this.world.materials.water);
    ocean.name = 'MedievalIslandOcean';
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = WATER_Y;
    ocean.renderOrder = -5;
    this.world.scene.add(ocean);
    this.waterMeshes.push(ocean);

    const shallow = new THREE.Mesh(
      makeRingGeometry(ISLAND_RADIUS * 0.96, ISLAND_RADIUS * 1.22, 180, 5.2),
      this.world.materials.shallow
    );
    shallow.name = 'MedievalIslandShallowWater';
    shallow.position.y = WATER_Y + 0.045;
    this.world.scene.add(shallow);
    this.waterMeshes.push(shallow);

    const foam = new THREE.Mesh(
      makeRingGeometry(ISLAND_RADIUS * 0.99, ISLAND_RADIUS * 1.035, 180, 3.6),
      this.world.materials.foam
    );
    foam.name = 'MedievalIslandShoreFoam';
    foam.position.y = WATER_Y + 0.08;
    this.world.scene.add(foam);
    this.waterMeshes.push(foam);
  }

  update(dt, elapsed) {
    if (this.world.materials.water.uniforms?.time) {
      this.world.materials.water.uniforms.time.value = elapsed;
    }
    for (const mesh of this.waterMeshes) {
      if (mesh.name.includes('Foam')) {
        mesh.rotation.z += dt * 0.008;
        mesh.material.opacity = 0.34 + Math.sin(elapsed * 0.7) * 0.08;
      }
    }
  }
}
