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

    this.createShallowShelf();
    this.createShoreFoam();
  }

  createShallowShelf() {
    const shelf = new THREE.Mesh(
      makeRingGeometry(ISLAND_RADIUS * 0.998, ISLAND_RADIUS * 1.2, 260, 4.2),
      this.world.materials.shoreWash
    );
    shelf.name = 'MedievalIslandShallowWaterShelf';
    shelf.position.y = WATER_Y + 0.075;
    shelf.renderOrder = -3;
    this.world.scene.add(shelf);
    this.waterMeshes.push(shelf);
  }

  createShoreFoam() {
    const rings = [
      { inner: 1.01, outer: 1.022, opacity: 0.2, wobble: 1.2, speed: 0.006 },
      { inner: 1.027, outer: 1.041, opacity: 0.14, wobble: 2.0, speed: -0.004 },
      { inner: 1.049, outer: 1.066, opacity: 0.08, wobble: 2.8, speed: 0.003 }
    ];

    for (let i = 0; i < rings.length; i += 1) {
      const ring = rings[i];
      const material = this.world.materials.foam.clone();
      material.opacity = ring.opacity;
      const mesh = new THREE.Mesh(
        makeRingGeometry(ISLAND_RADIUS * ring.inner, ISLAND_RADIUS * ring.outer, 240, ring.wobble),
        material
      );
      mesh.name = `MedievalIslandShoreFoam_${i}`;
      mesh.position.y = WATER_Y + 0.054 + i * 0.005;
      mesh.userData.foamSpeed = ring.speed;
      mesh.renderOrder = -4 + i;
      this.world.scene.add(mesh);
      this.waterMeshes.push(mesh);
    }
  }

  update(dt, elapsed) {
    if (this.world.materials.water.uniforms?.time) {
      this.world.materials.water.uniforms.time.value = elapsed;
    }
    for (const material of [this.world.materials.shoreWash, this.world.materials.wetSandBlend]) {
      if (material?.uniforms?.time) material.uniforms.time.value = elapsed;
    }
    for (const mesh of this.waterMeshes) {
      if (mesh.name.includes('Foam')) {
        mesh.rotation.z += dt * (mesh.userData.foamSpeed || 0.004);
        const base = mesh.name.endsWith('_0') ? 0.18 : mesh.name.endsWith('_1') ? 0.12 : 0.07;
        mesh.material.opacity = base + Math.sin(elapsed * 0.7 + mesh.position.y * 80) * 0.035;
      }
    }
  }
}
