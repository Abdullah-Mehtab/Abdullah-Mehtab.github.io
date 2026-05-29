// ABOUTME: Places lightweight non-colliding props around roads, districts, and shorelines.
// ABOUTME: Keeps decoration procedural so optional GLB props cannot create hidden blockers.
import * as THREE from 'three';
import { ISLAND_RADIUS, worldZones } from './worldData.js';
import { pseudoRandom } from './WorldMaterials.js';
import { mergeStaticMeshesInGroup } from './StaticBatching.js';

export class Props {
  constructor(world) {
    this.world = world;
    this.group = new THREE.Group();
    this.group.name = 'PROP_Static_Decor';
    this.items = [];
  }

  build() {
    this.world.scene.add(this.group);
    this.placeRoadLanterns();
    this.placeScenicProps();
    this.placeShoreRocks();
    mergeStaticMeshesInGroup(this.group, { namePrefix: 'PROP_batch' });
    this.items = [...this.group.children];
  }

  placeRoadLanterns() {
    let placed = 0;
    const lanternLimit = Math.floor(this.world.getQualityProfile().props * 0.28);
    for (const segment of this.world.roadSegments) {
      if (placed >= lanternLimit) break;
      const [cx, cz, width, length, rotation] = segment;
      if (length < 18) continue;
      const stepCount = Math.max(1, Math.floor(length / 22));
      for (let i = 0; i < stepCount && placed < lanternLimit; i += 1) {
        const t = (i + 0.5) / stepCount - 0.5;
        const side = pseudoRandom(placed * 4.1) > 0.5 ? 1 : -1;
        const x = cx + Math.sin(rotation) * length * t + Math.cos(rotation) * (width * 0.92) * side;
        const z = cz + Math.cos(rotation) * length * t - Math.sin(rotation) * (width * 0.92) * side;
        if (!this.world.terrain.containsPoint(x, z, 12)) continue;
        const lamp = this.createLantern();
        lamp.position.set(x, 0.2, z);
        lamp.rotation.y = rotation + Math.PI * (side > 0 ? 0.5 : -0.5);
        this.group.add(lamp);
        this.items.push(lamp);
        placed += 1;
      }
    }
  }

  placeScenicProps() {
    const zone = (id) => worldZones.find((item) => item.id === id)?.position || [0, 0, 0];
    const landing = zone('landing');
    const education = zone('education');
    const security = zone('security');
    const projects = zone('projects');
    const contact = zone('contact');
    const cv = zone('cv');
    const drift = zone('drift');
    const data = zone('data-pier');
    const potato = zone('potato');
    const placements = [
      ['EnvBench', landing[0] - 16, landing[2] + 7, -0.35, 0.92],
      ['EnvBench', landing[0] + 18, landing[2] + 10, 0.42, 0.92],
      ['EnvCrate', landing[0] + 10, landing[2] - 13, 0.4, 0.82],
      ['EnvBarrel', landing[0] - 20, landing[2] - 8, -0.6, 0.78],

      ['EnvBench', education[0] - 24, education[2] - 4, 0.98, 0.9],
      ['EnvBench', education[0] + 20, education[2] - 16, 0.36, 0.86],
      ['EnvBench', education[0] + 16, education[2] + 20, -0.8, 0.86],
      ['EnvCrate', education[0] - 29, education[2] + 12, 0.2, 0.78],
      ['EnvBarrel', education[0] + 27, education[2] + 18, -0.2, 0.78],

      ['EnvCrate', security[0] - 18, security[2] + 2, 0.2, 0.9],
      ['EnvCrate', security[0] + 14, security[2] - 7, -0.4, 0.86],
      ['EnvBarrel', security[0] - 10, security[2] - 16, 0.32, 0.8],
      ['EnvBarrel', security[0] + 22, security[2] + 10, -0.18, 0.8],

      ['EnvCrate', projects[0] + 16, projects[2] - 10, 0.38, 0.88],
      ['EnvBarrel', projects[0] + 22, projects[2] - 4, -0.4, 0.82],
      ['EnvCrate', projects[0] - 18, projects[2] + 12, 0.12, 0.82],
      ['EnvBarrel', projects[0] - 13, projects[2] + 18, -0.34, 0.78],

      ['EnvCrate', contact[0] - 12, contact[2] + 20, 0.2, 0.92],
      ['EnvBarrel', contact[0] - 5, contact[2] + 25, -0.2, 0.86],
      ['EnvBench', contact[0] - 19, contact[2] - 8, -0.85, 0.86],

      ['EnvBench', cv[0] - 16, cv[2] + 10, 0.18, 0.84],
      ['EnvCrate', drift[0] - 20, drift[2] + 14, 0.34, 0.84],
      ['EnvBarrel', drift[0] + 18, drift[2] - 8, -0.22, 0.8],
      ['EnvCrate', data[0] - 10, data[2] + 8, 0.34, 0.84],
      ['EnvBarrel', data[0] + 4, data[2] - 10, -0.22, 0.8],
      ['EnvCrate', potato[0] + 16, potato[2] + 6, 0.34, 0.84],
      ['EnvBarrel', potato[0] - 15, potato[2] + 8, -0.22, 0.8]
    ];

    for (const [name, x, z, rotation, scale] of placements) {
      if (!this.world.isClearForProp(x, z, name.includes('Bench') ? 2.1 : 1.5)) continue;
      this.addPlacedProp({ name, x, z, rotation, scale });
    }
  }

  placeShoreRocks() {
    const count = this.world.landscapeQuality === 'low' ? 22 : this.world.landscapeQuality === 'medium' ? 30 : 38;
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + (pseudoRandom(i * 6.4) - 0.5) * 0.18;
      const radius = ISLAND_RADIUS * (0.88 + pseudoRandom(i * 11.2) * 0.1);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if (this.world.roads.isNear(x, z, 6.5)) continue;
      const rock = this.createRock();
      rock.position.set(x, 0, z);
      rock.rotation.y = pseudoRandom(i * 3.7) * Math.PI * 2;
      rock.scale.setScalar(0.72 + pseudoRandom(i * 7.3) * 1.25);
      this.group.add(rock);
      this.groundObject(rock, -0.045);
      this.items.push(rock);
    }
  }

  addPlacedProp({ name, x, z, rotation, scale }) {
    if (name.includes('Bench')) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(2.85 * scale, 0.035, 1.1 * scale), this.world.materials.paleStone);
      pad.name = 'PROP_BenchStonePad';
      pad.position.set(x, 0.085, z);
      pad.rotation.y = rotation;
      pad.receiveShadow = true;
      this.group.add(pad);
      this.items.push(pad);
    }
    const prop = this.createFallbackProp(name);
    prop.position.set(x, 0.12, z);
    prop.rotation.y = rotation;
    prop.scale.setScalar(scale);
    this.group.add(prop);
    this.groundObject(prop, 0.035);
    this.items.push(prop);
  }

  groundObject(object, targetY = 0.04) {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    if (Number.isFinite(box.min.y)) {
      object.position.y += targetY - box.min.y;
    }
  }

  createLantern() {
    const group = new THREE.Group();
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 3.2, 8), this.world.materials.darkWood);
    post.position.y = 1.6;
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.08), this.world.materials.darkWood);
    arm.position.set(0.34, 3.0, 0);
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6), this.world.materials.warmGlow);
    glow.position.set(0.82, 2.75, 0);
    post.castShadow = false;
    arm.castShadow = false;
    glow.castShadow = false;
    group.add(post, arm, glow);
    return group;
  }

  createFallbackProp(name) {
    if (name.includes('Barrel')) {
      return new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 1.05, 10), this.world.materials.wood);
    }
    if (name.includes('Crate')) {
      return new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.world.materials.darkWood);
    }
    if (name.includes('Bench')) {
      const group = new THREE.Group();
      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.18, 0.45), this.world.materials.wood);
      seat.position.y = 0.55;
      group.add(seat);
      return group;
    }
    return this.createRock();
  }

  createRock() {
    return new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 1), this.world.materials.stone);
  }
}
