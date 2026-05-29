// ABOUTME: Builds performant instanced vegetation for the drive world.
// ABOUTME: Keeps scenery readable without adding physical blockers or thousands of meshes.
import * as THREE from 'three';
import { ISLAND_RADIUS, scenicPropZones } from './worldData.js';
import { pseudoRandom, QUALITY_PROFILES } from './WorldMaterials.js';

const TREE_VARIANTS = ['oak', 'blossom', 'cypress'];
const FLOWER_VARIANTS = ['pink', 'blue', 'gold'];
const TREE_CROWN_COLORS = {
  oak: [0x628f43, 0x78a94e, 0x456f3a, 0x8ca85a],
  blossom: [0xf0b5bd, 0xffc4ad, 0xd99ac4, 0xffd4c4],
  cypress: [0x2d6944, 0x1f5739, 0x3d7a4c, 0x194a35]
};
const TRUNK_COLORS = [0x7d4928, 0x8f5a31, 0x6c3d24, 0xa46a39];
const GRASS_COLORS = [0x83a84b, 0x9ab95c, 0x5f9041, 0xb2b960, 0x6fa34e];
const UNDERSTORY_COLORS = [0x8bb95d, 0x4f8543, 0xd0bf63, 0x6fc0a2, 0xf1b7bf];
const FLOWER_COLORS = {
  pink: [0xf2a4b4, 0xffc0c8, 0xd994be],
  blue: [0x80d8ff, 0x9cf1ff, 0x62bddc],
  gold: [0xffd36d, 0xffef99, 0xf0a95e]
};

export class Foliage {
  constructor(world) {
    this.world = world;
    this.treeEntries = [];
    this.grassEntries = [];
    this.understoryEntries = [];
    this.treeMeshes = {};
    this.grassMesh = null;
    this.understoryMesh = null;
    this.flowerMeshes = {};
    this.leafCloud = null;
    this.fireflies = null;
    this.dummy = new THREE.Object3D();
    this.color = new THREE.Color();
    this.windFrame = 0;
    this.particleFrame = 0;
    this.windSamples = { grassUpdates: 0, treeUpdates: 0, windCadence: 2, particleCadence: 1 };
  }

  build() {
    this.prepareTreeEntries();
    this.prepareGrassEntries();
    this.prepareUnderstoryEntries();
    this.createTreeInstances();
    this.createGrassInstances();
    this.createUnderstoryInstances();
    this.createFlowerInstances();
    this.createFallingLeaves();
    this.createFireflies();
    this.applyQuality();
  }

  applyQuality() {
    const profile = this.world.getQualityProfile();
    this.writeTreeInstances(profile.trees);
    this.writeGrassInstances(profile.grassTufts);
    this.writeUnderstoryInstances(profile.understory);
    this.writeFlowerInstances(Math.floor(profile.grassTufts * 0.42));
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
        if (this.isNearExistingTree(x, z, zone.kind === 'grove' ? 4.8 : 5.6)) continue;
        this.treeEntries.push({
          x,
          z,
          rotation: pseudoRandom(seed * 13.3) * Math.PI * 2,
          scale: 0.8 + pseudoRandom(seed * 17.1) * 0.58,
          variant: pickTreeVariant(zone, seed),
          tone: Math.floor(pseudoRandom(seed * 21.9) * 4),
          lean: pseudoRandom(seed * 25.7) - 0.5
        });
        zonePlaced += 1;
      }
    }
  }

  isNearExistingTree(x, z, spacing) {
    return this.treeEntries.some((entry) => Math.hypot(entry.x - x, entry.z - z) < spacing);
  }

  prepareGrassEntries() {
    const maxGrass = QUALITY_PROFILES.high.grassTufts;
    const clusteredTarget = Math.floor(maxGrass * 0.68);
    for (let zoneIndex = 0; zoneIndex < scenicPropZones.length && this.grassEntries.length < clusteredTarget; zoneIndex += 1) {
      const zone = scenicPropZones[zoneIndex];
      const target = Math.ceil(clusteredTarget / scenicPropZones.length) + (zone.kind === 'campus' || zone.kind === 'garden' ? 10 : 0);
      let placed = 0;
      for (let attempt = 0; attempt < 280 && placed < target && this.grassEntries.length < clusteredTarget; attempt += 1) {
        const seed = zoneIndex * 1600 + attempt;
        const x = zone.center[0] + (pseudoRandom(seed * 7.9) - 0.5) * zone.size[0] * 1.18;
        const z = zone.center[1] + (pseudoRandom(seed * 8.7) - 0.5) * zone.size[1] * 1.18;
        if (this.addGrassEntry(x, z, seed, zone.kind)) placed += 1;
      }
    }

    for (let i = 0; i < maxGrass * 5 && this.grassEntries.length < maxGrass; i += 1) {
      const r = Math.sqrt(pseudoRandom(i * 8.1)) * ISLAND_RADIUS * 0.78;
      const a = pseudoRandom(i * 5.3) * Math.PI * 2;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      this.addGrassEntry(x, z, i, 'meadow');
    }
  }

  addGrassEntry(x, z, seed, kind) {
    if (!this.world.isClearForProp(x, z, 1.1)) return false;
    this.grassEntries.push({
      x,
      z,
      rotation: pseudoRandom(seed * 19.4) * Math.PI * 2,
      scale: 0.55 + pseudoRandom(seed * 22.9) * 0.9,
      tone: Math.floor(pseudoRandom(seed * 27.2) * GRASS_COLORS.length),
      flowerTone: Math.floor(pseudoRandom(seed * 31.6) * 3),
      kind
    });
    return true;
  }

  prepareUnderstoryEntries() {
    const maxUnderstory = QUALITY_PROFILES.high.understory;
    for (let i = 0; i < maxUnderstory * 3 && this.understoryEntries.length < maxUnderstory; i += 1) {
      const source = this.treeEntries[i % this.treeEntries.length] || this.grassEntries[i % this.grassEntries.length];
      if (!source) return;
      const seed = i + 71;
      const radius = 1.8 + pseudoRandom(seed * 3.6) * 4.8;
      const angle = pseudoRandom(seed * 5.1) * Math.PI * 2;
      const x = source.x + Math.cos(angle) * radius;
      const z = source.z + Math.sin(angle) * radius;
      if (!this.world.isClearForProp(x, z, 0.55)) continue;
      this.understoryEntries.push({
        x,
        z,
        rotation: angle + pseudoRandom(seed * 7.4) * 0.9,
        width: 1.4 + pseudoRandom(seed * 11.2) * 3.2,
        depth: 0.42 + pseudoRandom(seed * 13.5) * 1.25,
        tone: Math.floor(pseudoRandom(seed * 17.3) * UNDERSTORY_COLORS.length)
      });
    }
  }

  createTreeInstances() {
    const maxTrees = QUALITY_PROFILES.high.trees;
    const trunkGeometry = new THREE.CylinderGeometry(0.22, 0.34, 2.8, 7);
    const oakGeometry = new THREE.IcosahedronGeometry(1.35, 1);
    const blossomGeometry = new THREE.IcosahedronGeometry(1.46, 1);
    const cypressGeometry = new THREE.ConeGeometry(1.08, 3.2, 7);

    const trunkMaterial = this.world.materials.wood.clone();
    this.treeMeshes.trunk = new THREE.InstancedMesh(trunkGeometry, trunkMaterial, maxTrees);
    this.treeMeshes.oak = new THREE.InstancedMesh(oakGeometry, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.88 }), maxTrees);
    this.treeMeshes.blossom = new THREE.InstancedMesh(blossomGeometry, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82 }), maxTrees);
    this.treeMeshes.cypress = new THREE.InstancedMesh(cypressGeometry, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }), maxTrees);

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
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.92, metalness: 0 });
    this.grassMesh = new THREE.InstancedMesh(geometry, material, QUALITY_PROFILES.high.grassTufts);
    this.grassMesh.name = 'FOLIAGE_grass_instances';
    this.grassMesh.castShadow = false;
    this.grassMesh.receiveShadow = false;
    this.grassMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.world.scene.add(this.grassMesh);
    this.world.decor.push({ type: 'grassInstances', mesh: this.grassMesh });
  }

  createUnderstoryInstances() {
    const geometry = new THREE.CircleGeometry(1, 10);
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -32,
      polygonOffsetUnits: -32
    });
    this.understoryMesh = new THREE.InstancedMesh(geometry, material, QUALITY_PROFILES.high.understory);
    this.understoryMesh.name = 'FOLIAGE_understory_patches';
    this.understoryMesh.castShadow = false;
    this.understoryMesh.receiveShadow = false;
    this.understoryMesh.renderOrder = 8;
    this.world.scene.add(this.understoryMesh);
    this.world.decor.push({ type: 'understoryInstances', mesh: this.understoryMesh });
  }

  createFlowerInstances() {
    const count = Math.floor(QUALITY_PROFILES.high.grassTufts * 0.42);
    const stemGeometry = new THREE.ConeGeometry(0.045, 0.42, 4);
    const bloomGeometry = new THREE.IcosahedronGeometry(0.12, 0);
    this.flowerMeshes.stem = new THREE.InstancedMesh(stemGeometry, new THREE.MeshStandardMaterial({ color: 0x4f8d45, roughness: 0.92 }), count);
    this.flowerMeshes.pink = new THREE.InstancedMesh(bloomGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff }), count);
    this.flowerMeshes.blue = new THREE.InstancedMesh(bloomGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff }), count);
    this.flowerMeshes.gold = new THREE.InstancedMesh(bloomGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff }), count);
    for (const [name, mesh] of Object.entries(this.flowerMeshes)) {
      mesh.name = `FOLIAGE_flower_${name}_instances`;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      this.world.scene.add(mesh);
      this.world.decor.push({ type: 'flowerInstances', mesh });
    }
  }

  writeTreeInstances(limit, elapsed = 0) {
    const counts = { trunk: 0, oak: 0, blossom: 0, cypress: 0 };
    const visible = Math.min(limit, this.treeEntries.length);
    for (let i = 0; i < visible; i += 1) {
      const entry = this.treeEntries[i];
      this.writeTrunk(entry, counts.trunk++, elapsed);
      this.writeCrown(entry, counts[entry.variant]++, entry.variant, elapsed);
    }
    for (const name of ['trunk', ...TREE_VARIANTS]) {
      this.treeMeshes[name].count = counts[name];
      this.treeMeshes[name].instanceMatrix.needsUpdate = true;
      if (this.treeMeshes[name].instanceColor) this.treeMeshes[name].instanceColor.needsUpdate = true;
    }
  }

  writeTrunk(entry, index, elapsed = 0) {
    const sway = Math.sin(elapsed * 0.9 + entry.x * 0.035 + entry.z * 0.02) * 0.018 + entry.lean * 0.012;
    this.dummy.position.set(entry.x, 1.32 * entry.scale, entry.z);
    this.dummy.rotation.set(sway, entry.rotation, sway * 0.65);
    this.dummy.scale.set(entry.scale * 0.78, entry.scale * 0.96, entry.scale * 0.78);
    this.dummy.updateMatrix();
    this.treeMeshes.trunk.setMatrixAt(index, this.dummy.matrix);
    this.treeMeshes.trunk.setColorAt(index, this.color.setHex(TRUNK_COLORS[entry.tone % TRUNK_COLORS.length]));
  }

  writeCrown(entry, index, variant, elapsed = 0) {
    const sway = Math.sin(elapsed * 1.1 + entry.x * 0.04 + entry.z * 0.03) * 0.05;
    this.dummy.position.set(entry.x, variant === 'cypress' ? 3.0 * entry.scale : 3.08 * entry.scale, entry.z);
    this.dummy.rotation.set(sway * 0.42, entry.rotation + sway * 0.18, sway);
    if (variant === 'cypress') {
      this.dummy.scale.set(entry.scale * 0.95, entry.scale * 1.05, entry.scale * 0.95);
    } else {
      this.dummy.scale.set(entry.scale * 1.16, entry.scale * 0.92, entry.scale * 1.16);
    }
    this.dummy.updateMatrix();
    this.treeMeshes[variant].setMatrixAt(index, this.dummy.matrix);
    const palette = TREE_CROWN_COLORS[variant];
    this.treeMeshes[variant].setColorAt(index, this.color.setHex(palette[entry.tone % palette.length]));
  }

  writeGrassInstances(limit, elapsed = 0) {
    const visible = Math.min(limit, this.grassEntries.length);
    for (let i = 0; i < visible; i += 1) {
      const entry = this.grassEntries[i];
      const sway = Math.sin(elapsed * 1.7 + entry.x * 0.11 + entry.z * 0.07) * 0.16;
      this.dummy.position.set(entry.x, 0.34 * entry.scale, entry.z);
      this.dummy.rotation.set(sway * 0.32, entry.rotation, sway);
      this.dummy.scale.set(entry.scale, entry.scale, entry.scale);
      this.dummy.updateMatrix();
      this.grassMesh.setMatrixAt(i, this.dummy.matrix);
      this.grassMesh.setColorAt(i, this.color.setHex(GRASS_COLORS[entry.tone % GRASS_COLORS.length]));
    }
    this.grassMesh.count = visible;
    this.grassMesh.instanceMatrix.needsUpdate = true;
    if (this.grassMesh.instanceColor) this.grassMesh.instanceColor.needsUpdate = true;
  }

  writeUnderstoryInstances(limit) {
    const visible = Math.min(limit || 0, this.understoryEntries.length);
    for (let i = 0; i < visible; i += 1) {
      const entry = this.understoryEntries[i];
      this.dummy.position.set(entry.x, 0.112 + i * 0.00003, entry.z);
      this.dummy.rotation.set(0, entry.rotation, 0);
      this.dummy.scale.set(entry.width, 1, entry.depth);
      this.dummy.updateMatrix();
      this.understoryMesh.setMatrixAt(i, this.dummy.matrix);
      this.understoryMesh.setColorAt(i, this.color.setHex(UNDERSTORY_COLORS[entry.tone % UNDERSTORY_COLORS.length]));
    }
    this.understoryMesh.count = visible;
    this.understoryMesh.instanceMatrix.needsUpdate = true;
    if (this.understoryMesh.instanceColor) this.understoryMesh.instanceColor.needsUpdate = true;
  }

  writeFlowerInstances(limit) {
    const visible = Math.min(limit, this.grassEntries.length);
    let stem = 0;
    const counts = { pink: 0, blue: 0, gold: 0 };
    for (let i = 0; i < visible; i += 1) {
      if (i % 3 === 0) continue;
      const entry = this.grassEntries[i];
      const height = 0.4 * entry.scale;
      this.dummy.position.set(entry.x, height * 0.5, entry.z);
      this.dummy.rotation.set(0, entry.rotation, 0);
      this.dummy.scale.set(entry.scale * 0.82, entry.scale, entry.scale * 0.82);
      this.dummy.updateMatrix();
      this.flowerMeshes.stem.setMatrixAt(stem++, this.dummy.matrix);

      const variant = FLOWER_VARIANTS[(i + entry.flowerTone) % FLOWER_VARIANTS.length];
      const bloomMesh = this.flowerMeshes[variant];
      const index = counts[variant]++;
      this.dummy.position.set(entry.x, height + 0.18, entry.z);
      this.dummy.rotation.set(0, entry.rotation, 0);
      this.dummy.scale.set(entry.scale, entry.scale, entry.scale);
      this.dummy.updateMatrix();
      bloomMesh.setMatrixAt(index, this.dummy.matrix);
      const colors = FLOWER_COLORS[variant];
      bloomMesh.setColorAt(index, this.color.setHex(colors[entry.flowerTone % colors.length]));
    }
    this.flowerMeshes.stem.count = stem;
    for (const variant of FLOWER_VARIANTS) this.flowerMeshes[variant].count = counts[variant];
    for (const mesh of Object.values(this.flowerMeshes)) {
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
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
    const profile = this.world.getQualityProfile();
    this.updateWind(elapsed);
    this.particleFrame = (this.particleFrame + 1) % (profile.particleCadence || 1);
    if (this.particleFrame === 0) this.updateLeaves(dt * (profile.particleCadence || 1));
    if (this.fireflies) {
      if (this.particleFrame !== 0) return;
      const pos = this.fireflies.geometry.attributes.position;
      const limit = Math.min(profile.fireflies, pos.count);
      for (let i = 0; i < limit; i += 1) {
        const phase = this.fireflies.phases[i];
        pos.setY(i, pos.getY(i) + Math.sin(elapsed * 1.4 + phase) * 0.002 * (profile.particleCadence || 1));
      }
      pos.needsUpdate = true;
      this.fireflies.mesh.material.opacity = 0.5 + Math.sin(elapsed * 1.6) * 0.18;
    }
  }

  updateWind(elapsed) {
    const profile = this.world.getQualityProfile();
    const cadence = profile.windCadence || 2;
    this.windSamples.windCadence = cadence;
    this.windSamples.particleCadence = profile.particleCadence || 1;
    this.windFrame = (this.windFrame + 1) % cadence;
    if (this.windFrame !== 0) return;
    this.writeTreeInstances(profile.trees, elapsed);
    this.writeGrassInstances(profile.grassTufts, elapsed);
    this.windSamples.treeUpdates += 1;
    this.windSamples.grassUpdates += 1;
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

  getStats() {
    const visibleTrees = TREE_VARIANTS.reduce((sum, variant) => sum + (this.treeMeshes[variant]?.count || 0), 0);
    const visibleBlooms = FLOWER_VARIANTS.reduce((sum, variant) => sum + (this.flowerMeshes[variant]?.count || 0), 0);
    return {
      treeEntries: this.treeEntries.length,
      grassEntries: this.grassEntries.length,
      understoryEntries: this.understoryEntries.length,
      visibleTrees,
      visibleGrass: this.grassMesh?.count || 0,
      visibleUnderstory: this.understoryMesh?.count || 0,
      visibleBlooms,
      treeColorVariants: Object.values(TREE_CROWN_COLORS).reduce((sum, colors) => sum + colors.length, 0),
      grassColorVariants: GRASS_COLORS.length,
      flowerColorVariants: Object.values(FLOWER_COLORS).reduce((sum, colors) => sum + colors.length, 0)
    };
  }
}

function pickTreeVariant(zone, seed) {
  const n = pseudoRandom(seed * 11.31);
  if (zone.kind === 'security' || zone.kind === 'coast') return n > 0.34 ? 'cypress' : 'oak';
  if (zone.kind === 'campus' || zone.kind === 'grove') return n > 0.2 ? 'blossom' : 'oak';
  return n > 0.3 ? 'oak' : 'blossom';
}
