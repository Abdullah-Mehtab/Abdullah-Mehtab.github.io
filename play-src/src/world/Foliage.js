import * as THREE from 'three';
import { ISLAND_RADIUS, scenicPropZones } from './worldData.js';
import { pseudoRandom, QUALITY_PROFILES } from './WorldMaterials.js';

export class Foliage {
  constructor(world) {
    this.world = world;
    this.trees = [];
    this.grassTufts = [];
    this.leafCloud = null;
    this.fireflies = null;
  }

  build() {
    this.placeTrees();
    this.placeGrass();
    this.createFallingLeaves();
    this.createFireflies();
    this.applyQuality();
  }

  applyQuality() {
    const profile = this.world.getQualityProfile();
    for (let i = 0; i < this.trees.length; i += 1) this.trees[i].visible = i < profile.trees;
    for (let i = 0; i < this.grassTufts.length; i += 1) this.grassTufts[i].mesh.visible = i < profile.grassTufts;
    this.leafCloud?.geometry.setDrawRange(0, profile.leaves);
    this.fireflies?.geometry.setDrawRange(0, profile.fireflies);
  }

  placeTrees() {
    const maxTrees = QUALITY_PROFILES.high.trees;
    const perZone = Math.ceil(maxTrees / scenicPropZones.length);
    let placed = 0;
    for (let zoneIndex = 0; zoneIndex < scenicPropZones.length && placed < maxTrees; zoneIndex += 1) {
      const zone = scenicPropZones[zoneIndex];
      const target = Math.min(maxTrees - placed, perZone + (zone.kind === 'grove' ? 4 : zone.kind === 'meadow' ? -2 : 0));
      let zonePlaced = 0;
      for (let attempt = 0; attempt < 360 && zonePlaced < target; attempt += 1) {
        const seed = zoneIndex * 1000 + attempt;
        const x = zone.center[0] + (pseudoRandom(seed * 7.13) - 0.5) * zone.size[0];
        const z = zone.center[1] + (pseudoRandom(seed * 9.41) - 0.5) * zone.size[1];
        const radius = Math.hypot(x, z);
        if (radius > ISLAND_RADIUS * 0.86 || radius < 18) continue;
        if (!this.world.isClearForProp(x, z, 4.6)) continue;

        const templateName = pickTreeTemplate(zone, seed);
        const tree = this.world.cloneEnvironmentAsset(templateName) || this.createFallbackTree();
        tree.position.set(x, 0.04, z);
        tree.rotation.y = pseudoRandom(seed * 13.3) * Math.PI * 2;
        const scale = 0.82 + pseudoRandom(seed * 17.1) * 0.55;
        tree.scale.setScalar(scale);
        this.world.scene.add(tree);
        this.world.decor.push({ type: 'tree', mesh: tree });
        this.trees.push(tree);
        this.addTreeCollider(x, z, scale);
        placed += 1;
        zonePlaced += 1;
      }
    }
  }

  placeGrass() {
    const template = this.world.cloneEnvironmentAsset('EnvGrassTuft');
    const fallbackGeometry = new THREE.ConeGeometry(0.12, 1, 5);
    for (let i = 0; i < QUALITY_PROFILES.high.grassTufts; i += 1) {
      const r = Math.sqrt(pseudoRandom(i * 8.1)) * ISLAND_RADIUS * 0.78;
      const a = pseudoRandom(i * 5.3) * Math.PI * 2;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (!this.world.isClearForProp(x, z, 1.3)) continue;

      const tuft = template ? template.clone(true) : new THREE.Mesh(fallbackGeometry, this.world.materials.crop);
      tuft.position.set(x, 0.05, z);
      tuft.rotation.y = pseudoRandom(i * 19.4) * Math.PI * 2;
      const scale = 0.45 + pseudoRandom(i * 22.9) * 0.78;
      tuft.scale.set(scale, scale, scale);
      this.world.scene.add(tuft);
      this.grassTufts.push({
        mesh: tuft,
        baseRotationY: tuft.rotation.y,
        baseScale: scale,
        x,
        z
      });
    }
  }

  createFallingLeaves() {
    const count = QUALITY_PROFILES.high.leaves;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const phases = [];
    for (let i = 0; i < count; i += 1) {
      const r = Math.sqrt(pseudoRandom(i * 1.7)) * ISLAND_RADIUS * 0.78;
      const a = pseudoRandom(i * 2.3) * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = 4 + pseudoRandom(i * 3.1) * 18;
      positions[i * 3 + 2] = Math.sin(a) * r;
      phases.push(pseudoRandom(i * 4.4) * Math.PI * 2);
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = this.world.materials.leaf;
    const points = new THREE.Points(geometry, material);
    points.name = 'MedievalIslandFallingLeaves';
    this.world.scene.add(points);
    this.leafCloud = { mesh: points, geometry, phases };
  }

  createFireflies() {
    const count = QUALITY_PROFILES.high.fireflies;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const phases = [];
    for (let i = 0; i < count; i += 1) {
      const r = Math.sqrt(pseudoRandom(i * 4.9)) * ISLAND_RADIUS * 0.62;
      const a = pseudoRandom(i * 6.1) * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = 1.1 + pseudoRandom(i * 7.2) * 3.2;
      positions[i * 3 + 2] = Math.sin(a) * r;
      phases.push(pseudoRandom(i * 8.3) * Math.PI * 2);
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(geometry, this.world.materials.firefly);
    points.name = 'MedievalIslandFireflies';
    this.world.scene.add(points);
    this.fireflies = { mesh: points, geometry, phases };
  }

  update(dt, elapsed, vehiclePosition) {
    this.updateLeaves(dt, elapsed);
    this.updateGrass(vehiclePosition, elapsed);
    if (this.fireflies) {
      const pos = this.fireflies.geometry.attributes.position;
      for (let i = 0; i < pos.count; i += 1) {
        const phase = this.fireflies.phases[i];
        pos.setY(i, pos.getY(i) + Math.sin(elapsed * 1.4 + phase) * 0.0025);
      }
      pos.needsUpdate = true;
      this.fireflies.mesh.material.opacity = 0.5 + Math.sin(elapsed * 1.6) * 0.18;
    }
  }

  updateLeaves(dt, elapsed) {
    if (!this.leafCloud) return;
    const positions = this.leafCloud.geometry.attributes.position;
    const profile = this.world.getQualityProfile();
    const limit = Math.min(profile.leaves, positions.count);
    for (let i = 0; i < limit; i += 1) {
      const phase = this.leafCloud.phases[i];
      positions.setX(i, positions.getX(i) + Math.sin(elapsed * 0.8 + phase) * dt * 0.4);
      positions.setY(i, positions.getY(i) - dt * (0.55 + pseudoRandom(i * 3.6) * 0.55));
      positions.setZ(i, positions.getZ(i) + Math.cos(elapsed * 0.7 + phase) * dt * 0.35);
      if (positions.getY(i) < 0.35) positions.setY(i, 8 + pseudoRandom(i * 5.2) * 14);
    }
    positions.needsUpdate = true;
  }

  updateGrass(vehiclePosition, elapsed) {
    if (!vehiclePosition) return;
    const profile = this.world.getQualityProfile();
    const limit = Math.min(profile.grassTufts, this.grassTufts.length);
    for (let i = 0; i < limit; i += 1) {
      const item = this.grassTufts[i];
      const dx = vehiclePosition.x - item.x;
      const dz = vehiclePosition.z - item.z;
      const distance = Math.hypot(dx, dz);
      const push = Math.max(0, 1 - distance / 5);
      const wind = Math.sin(elapsed * 1.5 + item.x * 0.07 + item.z * 0.04) * 0.08;
      item.mesh.rotation.z = wind + push * 0.34;
      item.mesh.scale.y = item.baseScale * (1 - push * 0.28 + Math.sin(elapsed * 1.2 + i) * 0.02);
    }
  }

  createFallbackTree() {
    const group = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.38, 3, 8), this.world.materials.wood);
    trunk.position.y = 1.5;
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), this.world.materials.crop);
    crown.position.y = 3.35;
    group.add(trunk, crown);
    return group;
  }

  addTreeCollider(x, z, scale) {
    const halfHeight = 0.82 * scale;
    const radius = 0.2 * scale;
    this.world.physics.createFixedCylinder([x, halfHeight, z], halfHeight, radius, {
      friction: 0.88,
      restitution: 0.01
    });
  }
}

function pickTreeTemplate(zone, seed) {
  const n = pseudoRandom(seed * 11.31);
  if (zone.kind === 'coast') return n > 0.35 ? 'EnvCypressTree' : 'EnvBlossomTree';
  if (zone.kind === 'meadow') return n > 0.58 ? 'EnvBlossomTree' : 'EnvOakTree';
  if (zone.kind === 'farm') return n > 0.42 ? 'EnvBlossomTree' : 'EnvOakTree';
  return n > 0.22 ? 'EnvBlossomTree' : 'EnvOakTree';
}
