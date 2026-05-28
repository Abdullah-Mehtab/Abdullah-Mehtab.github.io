// ABOUTME: Builds performant instanced vegetation for the drive world.
// ABOUTME: Keeps scenery readable without adding physical blockers or thousands of meshes.
import * as THREE from 'three';
import { ISLAND_RADIUS, scenicPropZones } from './worldData.js';
import { pseudoRandom, QUALITY_PROFILES } from './WorldMaterials.js';

const TREE_VARIANTS = ['oak', 'blossom', 'cypress'];

export class Foliage {
  constructor(world) {
    this.world = world;
    this.treeEntries = [];
    this.grassEntries = [];
    this.treeMeshes = {};
    this.grassMesh = null;
    this.leafCloud = null;
    this.fireflies = null;
    this.dummy = new THREE.Object3D();
  }

  build() {
    this.prepareTreeEntries();
    this.prepareGrassEntries();
    this.createTreeInstances();
    this.createGrassInstances();
    this.createFallingLeaves();
    this.createFireflies();
    this.applyQuality();
  }

  applyQuality() {
    const profile = this.world.getQualityProfile();
    this.writeTreeInstances(profile.trees);
    this.writeGrassInstances(profile.grassTufts);
    this.leafCloud?.geometry.setDrawRange(0, profile.leaves);
    this.fireflies?.geometry.setDrawRange(0, profile.fireflies);
  }

  prepareTreeEntries() {
    const maxTrees = QUALITY_PROFILES.high.trees;
    const perZone = Math.ceil(maxTrees / scenicPropZones.length);
    for (let zoneIndex = 0; zoneIndex < scenicPropZones.length && this.treeEntries.length < maxTrees; zoneIndex += 1) {
      const zone = scenicPropZones[zoneIndex];
      const target = Math.min(
        maxTrees - this.treeEntries.length,
        perZone + (zone.kind === 'campus' ? 6 : zone.kind === 'security' ? 5 : zone.kind === 'grove' ? 3 : 0)
      );
      let zonePlaced = 0;
      for (let attempt = 0; attempt < 180 && zonePlaced < target; attempt += 1) {
        const seed = zoneIndex * 1000 + attempt;
        const x = zone.center[0] + (pseudoRandom(seed * 7.13) - 0.5) * zone.size[0];
        const z = zone.center[1] + (pseudoRandom(seed * 9.41) - 0.5) * zone.size[1];
        const radius = Math.hypot(x, z);
        if (radius > ISLAND_RADIUS * 0.88 || radius < 18) continue;
        if (!this.world.isClearForProp(x, z, 3.4)) continue;
        this.treeEntries.push({
          x,
          z,
          rotation: pseudoRandom(seed * 13.3) * Math.PI * 2,
          scale: 0.8 + pseudoRandom(seed * 17.1) * 0.58,
          variant: pickTreeVariant(zone, seed)
        });
        zonePlaced += 1;
      }
    }
  }

  prepareGrassEntries() {
    const maxGrass = QUALITY_PROFILES.high.grassTufts;
    for (let i = 0; i < maxGrass * 4 && this.grassEntries.length < maxGrass; i += 1) {
      const r = Math.sqrt(pseudoRandom(i * 8.1)) * ISLAND_RADIUS * 0.78;
      const a = pseudoRandom(i * 5.3) * Math.PI * 2;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (!this.world.isClearForProp(x, z, 1.1)) continue;
      this.grassEntries.push({
        x,
        z,
        rotation: pseudoRandom(i * 19.4) * Math.PI * 2,
        scale: 0.55 + pseudoRandom(i * 22.9) * 0.9
      });
    }
  }

  createTreeInstances() {
    const maxTrees = QUALITY_PROFILES.high.trees;
    const trunkGeometry = new THREE.CylinderGeometry(0.22, 0.34, 2.8, 7);
    const oakGeometry = new THREE.IcosahedronGeometry(1.35, 1);
    const blossomGeometry = new THREE.IcosahedronGeometry(1.46, 1);
    const cypressGeometry = new THREE.ConeGeometry(1.08, 3.2, 7);

    this.treeMeshes.trunk = new THREE.InstancedMesh(trunkGeometry, this.world.materials.wood, maxTrees);
    this.treeMeshes.oak = new THREE.InstancedMesh(oakGeometry, new THREE.MeshStandardMaterial({ color: 0x5f8f42, roughness: 0.88 }), maxTrees);
    this.treeMeshes.blossom = new THREE.InstancedMesh(blossomGeometry, new THREE.MeshStandardMaterial({ color: 0xf0b5bd, roughness: 0.82 }), maxTrees);
    this.treeMeshes.cypress = new THREE.InstancedMesh(cypressGeometry, new THREE.MeshStandardMaterial({ color: 0x2d6944, roughness: 0.9 }), maxTrees);

    for (const [name, mesh] of Object.entries(this.treeMeshes)) {
      mesh.name = `FOLIAGE_${name}_instances`;
      mesh.castShadow = false;
      mesh.receiveShadow = name === 'trunk';
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      this.world.scene.add(mesh);
      this.world.decor.push({ type: 'foliageInstances', mesh });
    }
  }

  createGrassInstances() {
    const geometry = new THREE.ConeGeometry(0.08, 0.7, 4);
    const material = new THREE.MeshStandardMaterial({ color: 0x86a94c, roughness: 0.92, metalness: 0 });
    this.grassMesh = new THREE.InstancedMesh(geometry, material, QUALITY_PROFILES.high.grassTufts);
    this.grassMesh.name = 'FOLIAGE_grass_instances';
    this.grassMesh.castShadow = false;
    this.grassMesh.receiveShadow = false;
    this.grassMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.world.scene.add(this.grassMesh);
    this.world.decor.push({ type: 'grassInstances', mesh: this.grassMesh });
  }

  writeTreeInstances(limit) {
    const counts = { trunk: 0, oak: 0, blossom: 0, cypress: 0 };
    const visible = Math.min(limit, this.treeEntries.length);
    for (let i = 0; i < visible; i += 1) {
      const entry = this.treeEntries[i];
      this.writeTrunk(entry, counts.trunk++);
      this.writeCrown(entry, counts[entry.variant]++, entry.variant);
    }
    for (const name of ['trunk', ...TREE_VARIANTS]) {
      this.treeMeshes[name].count = counts[name];
      this.treeMeshes[name].instanceMatrix.needsUpdate = true;
    }
  }

  writeTrunk(entry, index) {
    this.dummy.position.set(entry.x, 1.32 * entry.scale, entry.z);
    this.dummy.rotation.set(0, entry.rotation, 0);
    this.dummy.scale.set(entry.scale * 0.78, entry.scale * 0.96, entry.scale * 0.78);
    this.dummy.updateMatrix();
    this.treeMeshes.trunk.setMatrixAt(index, this.dummy.matrix);
  }

  writeCrown(entry, index, variant) {
    this.dummy.position.set(entry.x, variant === 'cypress' ? 3.0 * entry.scale : 3.08 * entry.scale, entry.z);
    this.dummy.rotation.set(0, entry.rotation, 0);
    if (variant === 'cypress') {
      this.dummy.scale.set(entry.scale * 0.95, entry.scale * 1.05, entry.scale * 0.95);
    } else {
      this.dummy.scale.set(entry.scale * 1.16, entry.scale * 0.92, entry.scale * 1.16);
    }
    this.dummy.updateMatrix();
    this.treeMeshes[variant].setMatrixAt(index, this.dummy.matrix);
  }

  writeGrassInstances(limit) {
    const visible = Math.min(limit, this.grassEntries.length);
    for (let i = 0; i < visible; i += 1) {
      const entry = this.grassEntries[i];
      this.dummy.position.set(entry.x, 0.34 * entry.scale, entry.z);
      this.dummy.rotation.set(0, entry.rotation, 0);
      this.dummy.scale.set(entry.scale, entry.scale, entry.scale);
      this.dummy.updateMatrix();
      this.grassMesh.setMatrixAt(i, this.dummy.matrix);
    }
    this.grassMesh.count = visible;
    this.grassMesh.instanceMatrix.needsUpdate = true;
  }

  createFallingLeaves() {
    const count = QUALITY_PROFILES.high.leaves;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const phases = [];
    for (let i = 0; i < count; i += 1) {
      const r = Math.sqrt(pseudoRandom(i * 1.7)) * ISLAND_RADIUS * 0.72;
      const a = pseudoRandom(i * 2.3) * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = 4 + pseudoRandom(i * 3.1) * 14;
      positions[i * 3 + 2] = Math.sin(a) * r;
      phases.push(pseudoRandom(i * 4.4) * Math.PI * 2);
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(geometry, this.world.materials.leaf);
    points.name = 'FOLIAGE_falling_leaves';
    this.world.scene.add(points);
    this.leafCloud = { mesh: points, geometry, phases };
  }

  createFireflies() {
    const count = QUALITY_PROFILES.high.fireflies;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const phases = [];
    for (let i = 0; i < count; i += 1) {
      const r = Math.sqrt(pseudoRandom(i * 4.9)) * ISLAND_RADIUS * 0.56;
      const a = pseudoRandom(i * 6.1) * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = 1.1 + pseudoRandom(i * 7.2) * 3.2;
      positions[i * 3 + 2] = Math.sin(a) * r;
      phases.push(pseudoRandom(i * 8.3) * Math.PI * 2);
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(geometry, this.world.materials.firefly);
    points.name = 'FOLIAGE_fireflies';
    this.world.scene.add(points);
    this.fireflies = { mesh: points, geometry, phases };
  }

  update(dt, elapsed) {
    this.updateLeaves(dt);
    if (this.fireflies) {
      const pos = this.fireflies.geometry.attributes.position;
      const profile = this.world.getQualityProfile();
      const limit = Math.min(profile.fireflies, pos.count);
      for (let i = 0; i < limit; i += 1) {
        const phase = this.fireflies.phases[i];
        pos.setY(i, pos.getY(i) + Math.sin(elapsed * 1.4 + phase) * 0.002);
      }
      pos.needsUpdate = true;
      this.fireflies.mesh.material.opacity = 0.5 + Math.sin(elapsed * 1.6) * 0.18;
    }
  }

  updateLeaves(dt) {
    if (!this.leafCloud) return;
    const positions = this.leafCloud.geometry.attributes.position;
    const profile = this.world.getQualityProfile();
    const limit = Math.min(profile.leaves, positions.count);
    for (let i = 0; i < limit; i += 1) {
      const phase = this.leafCloud.phases[i];
      positions.setX(i, positions.getX(i) + Math.sin(phase) * dt * 0.18);
      positions.setY(i, positions.getY(i) - dt * (0.42 + pseudoRandom(i * 3.6) * 0.36));
      if (positions.getY(i) < 0.35) positions.setY(i, 7 + pseudoRandom(i * 5.2) * 10);
    }
    positions.needsUpdate = true;
  }
}

function pickTreeVariant(zone, seed) {
  const n = pseudoRandom(seed * 11.31);
  if (zone.kind === 'security' || zone.kind === 'coast') return n > 0.34 ? 'cypress' : 'oak';
  if (zone.kind === 'campus' || zone.kind === 'grove') return n > 0.2 ? 'blossom' : 'oak';
  return n > 0.3 ? 'oak' : 'blossom';
}
