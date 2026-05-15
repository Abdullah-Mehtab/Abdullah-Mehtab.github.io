import * as THREE from 'three';
import { ISLAND_RADIUS, scenicPropZones } from './worldData.js';
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
    const templates = ['EnvBarrel', 'EnvCrate', 'EnvBench'];
    let placed = 0;
    const maxProps = Math.floor(this.world.getQualityProfile().props * 0.58);
    for (let attempt = 0; attempt < 1200 && placed < maxProps; attempt += 1) {
      const zone = scenicPropZones[Math.floor(pseudoRandom(attempt * 2.2) * scenicPropZones.length)];
      const x = zone.center[0] + (pseudoRandom(attempt * 4.3) - 0.5) * zone.size[0];
      const z = zone.center[1] + (pseudoRandom(attempt * 8.9) - 0.5) * zone.size[1];
      if (Math.hypot(x, z) > ISLAND_RADIUS * 0.82) continue;
      if (!this.world.isClearForProp(x, z, 2.2)) continue;
      const name = templates[Math.floor(pseudoRandom(attempt * 6.6) * templates.length)];
      const prop = this.world.cloneEnvironmentAsset(name) || this.createFallbackProp(name);
      prop.position.set(x, 0.2, z);
      prop.rotation.y = pseudoRandom(attempt * 9.1) * Math.PI * 2;
      prop.scale.setScalar(0.75 + pseudoRandom(attempt * 12.1) * 0.55);
      this.world.scene.add(prop);
      this.items.push(prop);
      this.addPropCollider(name, x, z, prop.scale.x);
      placed += 1;
    }
  }

  placeShoreRocks() {
    for (let i = 0; i < 44; i += 1) {
      const angle = (i / 44) * Math.PI * 2 + (pseudoRandom(i * 6.4) - 0.5) * 0.18;
      const radius = ISLAND_RADIUS * (0.88 + pseudoRandom(i * 11.2) * 0.1);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if (this.world.roads.isNear(x, z, 5)) continue;
      const rock = this.world.cloneEnvironmentAsset('EnvShoreRock') || this.createRock();
      rock.position.set(x, 0.15, z);
      rock.rotation.y = pseudoRandom(i * 3.7) * Math.PI * 2;
      rock.scale.setScalar(0.75 + pseudoRandom(i * 7.3) * 1.8);
      this.world.scene.add(rock);
      this.items.push(rock);
      this.world.physics.createFixedBox([x, 0.45 * rock.scale.x, z], [1.4 * rock.scale.x, 0.9 * rock.scale.x, 1.0 * rock.scale.x], {
        rotation: [0, rock.rotation.y, 0],
        friction: 0.95,
        restitution: 0.02
      });
    }
  }

  addPropCollider(name, x, z, scale) {
    const size = name.includes('Bench') ? [2.0 * scale, 0.75 * scale, 0.75 * scale] : [1.1 * scale, 1.1 * scale, 1.1 * scale];
    this.world.physics.createFixedBox([x, size[1] / 2, z], size, {
      friction: 0.86,
      restitution: 0.02
    });
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
