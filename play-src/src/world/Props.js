import * as THREE from 'three';
import { ISLAND_RADIUS } from './worldData.js';
import { pseudoRandom } from './WorldMaterials.js';

export class Props {
  constructor(world) {
    this.world = world;
    this.items = [];
  }

  build() {
    this.placeRoadLanterns();
    this.placeScenicProps();
    this.placeShoreRocks();
  }

  placeRoadLanterns() {
    let placed = 0;
    for (const segment of this.world.roadSegments) {
      if (placed >= this.world.getQualityProfile().props * 0.32) break;
      const [cx, cz, width, length, rotation] = segment;
      if (length < 18) continue;
      const stepCount = Math.max(1, Math.floor(length / 28));
      for (let i = 0; i < stepCount && placed < 24; i += 1) {
        const t = (i + 0.5) / stepCount - 0.5;
        const side = pseudoRandom(placed * 4.1) > 0.5 ? 1 : -1;
        const x = cx + Math.sin(rotation) * length * t + Math.cos(rotation) * (width * 0.92) * side;
        const z = cz + Math.cos(rotation) * length * t - Math.sin(rotation) * (width * 0.92) * side;
        if (!this.world.terrain.containsPoint(x, z, 12)) continue;
        const lamp = this.world.cloneEnvironmentAsset('EnvMedievalLantern') || this.createLantern();
        lamp.position.set(x, 0.2, z);
        lamp.rotation.y = rotation + Math.PI * (side > 0 ? 0.5 : -0.5);
        this.world.scene.add(lamp);
        this.items.push(lamp);
        placed += 1;
      }
    }
  }

  placeScenicProps() {
    const placements = [
      // Courtyard seating, placed like a small public square instead of random clutter.
      ['EnvBench', -8, 48, -0.35, 0.92],
      ['EnvBench', 34, 55, 0.42, 0.92],
      ['EnvBench', 42, 34, 2.86, 0.88],
      ['EnvBench', -34, 40, -0.2, 0.86],

      // Education grove: benches face the library approach and stay outside the driving line.
      ['EnvBench', -133, 69, 0.98, 0.9],
      ['EnvBench', -121, 50, 0.36, 0.86],
      ['EnvBench', -86, 96, -0.8, 0.86],

      // Harbor / foundry / farm storage groups.
      ['EnvCrate', 116, 82, 0.2, 0.92],
      ['EnvBarrel', 120, 88, -0.2, 0.86],
      ['EnvCrate', 78, 57, 0.38, 0.88],
      ['EnvBarrel', 84, 51, -0.4, 0.82],
      ['EnvCrate', 54, 82, 0.12, 0.82],
      ['EnvBarrel', 56, 89, -0.34, 0.78],

      // Small rest points near the outer loop.
      ['EnvBench', -138, -12, 1.34, 0.86],
      ['EnvBench', -111, -88, 0.7, 0.86],
      ['EnvBench', 104, -34, -0.85, 0.86],
      ['EnvBench', -20, -102, 0.18, 0.84],

      // Pier data props.
      ['EnvCrate', -145, 34, 0.34, 0.84],
      ['EnvBarrel', -135, 39, -0.22, 0.8]
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
      const rock = this.world.cloneEnvironmentAsset('EnvShoreRock') || this.createRock();
      rock.position.set(x, 0.08, z);
      rock.rotation.y = pseudoRandom(i * 3.7) * Math.PI * 2;
      rock.scale.setScalar(0.72 + pseudoRandom(i * 7.3) * 1.25);
      this.world.scene.add(rock);
      this.groundObject(rock, 0.03);
      this.items.push(rock);
      this.world.physics.createFixedBall([x, 0.34 * rock.scale.x, z], 0.42 * rock.scale.x, {
        friction: 0.95,
        restitution: 0.01
      });
    }
  }

  addPlacedProp({ name, x, z, rotation, scale }) {
    if (name.includes('Bench')) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(2.85 * scale, 0.035, 1.1 * scale), this.world.materials.paleStone);
      pad.name = 'PROP_BenchStonePad';
      pad.position.set(x, 0.085, z);
      pad.rotation.y = rotation;
      pad.receiveShadow = true;
      this.world.scene.add(pad);
      this.items.push(pad);
    }
    const prop = this.world.cloneEnvironmentAsset(name) || this.createFallbackProp(name);
    prop.position.set(x, 0.12, z);
    prop.rotation.y = rotation;
    prop.scale.setScalar(scale);
    this.world.scene.add(prop);
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
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), this.world.materials.glow);
    glow.position.set(0.82, 2.75, 0);
    const light = new THREE.PointLight(0xffc36a, 1.6, 18, 2.2);
    light.position.copy(glow.position);
    group.add(post, arm, glow, light);
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
