import * as THREE from 'three';
import {
  circuitCheckpoints,
  roadSegments,
  worldZones
} from './worldData.js';
import { Atmosphere } from './Atmosphere.js';
import { Foliage } from './Foliage.js';
import { PotatoFarm } from './PotatoFarm.js';
import { Props } from './Props.js';
import { Roads } from './Roads.js';
import { SetPieces } from './SetPieces.js';
import { StuntPark } from './StuntPark.js';
import { Terrain } from './Terrain.js';
import { Water } from './Water.js';
import { Zones } from './Zones.js';
import { createWorldMaterials, QUALITY_ORDER, QUALITY_PROFILES } from './WorldMaterials.js';

export class World {
  constructor({ scene, physics, resumeData, environmentAssets }) {
    this.scene = scene;
    this.physics = physics;
    this.resumeData = resumeData;
    this.environmentAssets = environmentAssets;
    this.materials = createWorldMaterials();
    this.zones = [];
    this.decor = [];
    this.boostPads = [];
    this.ramps = [];
    this.collectibles = [];
    this.potatoes = [];
    this.roadSegments = roadSegments;
    this.checkpoints = circuitCheckpoints.map(([x, y, z]) => new THREE.Vector3(x, y, z));
    this.landscapeQuality = this.readLandscapeQuality();
    this.circuit = {
      active: false,
      startedAt: 0,
      checkpoint: 0,
      best: Number(localStorage.getItem('portfolio-drive-best-lap') || 0)
    };
    this.securityScan = {
      active: false,
      complete: false,
      startedAt: 0
    };

    this.build();
  }

  build() {
    this.terrain = new Terrain(this);
    this.water = new Water(this);
    this.roads = new Roads(this);
    this.zonesSystem = new Zones(this);
    this.stuntPark = new StuntPark(this);
    this.setPieces = new SetPieces(this);
    this.props = new Props(this);
    this.foliage = new Foliage(this);
    this.potatoFarm = new PotatoFarm(this);
    this.atmosphere = new Atmosphere(this);

    this.terrain.build();
    this.water.build();
    this.roads.build();
    this.zonesSystem.build();
    this.stuntPark.build();
    this.setPieces.build();
    this.potatoFarm.build();
    this.props.build();
    this.foliage.build();
    this.createCollectibles();
    this.atmosphere.build();
  }

  cloneEnvironmentAsset(name) {
    return this.environmentAssets?.clone?.(name) || null;
  }

  readLandscapeQuality() {
    const saved = localStorage.getItem('portfolio-drive-landscape-quality');
    return QUALITY_PROFILES[saved] ? saved : 'medium';
  }

  getQualityProfile() {
    return QUALITY_PROFILES[this.landscapeQuality] || QUALITY_PROFILES.medium;
  }

  setLandscapeQuality(quality) {
    if (!QUALITY_PROFILES[quality]) return this.landscapeQuality;
    this.landscapeQuality = quality;
    localStorage.setItem('portfolio-drive-landscape-quality', quality);
    this.foliage?.applyQuality();
    this.atmosphere?.applyQuality?.();
    this.onQualityChange?.(quality);
    return this.landscapeQuality;
  }

  cycleLandscapeQuality() {
    const current = QUALITY_ORDER.indexOf(this.landscapeQuality);
    return this.setLandscapeQuality(QUALITY_ORDER[(current + 1) % QUALITY_ORDER.length]);
  }

  isClearForProp(x, z, radius = 2) {
    if (!this.terrain?.containsPoint(x, z, radius + 6)) return false;
    if (this.roads?.isNear(x, z, radius + 2.8)) return false;
    for (const zone of worldZones) {
      const dx = x - zone.position[0];
      const dz = z - zone.position[2];
      if (Math.hypot(dx, dz) < zone.radius + radius + 5) return false;
    }
    return true;
  }

  createCollectibles() {
    const points = [
      [-88, 0, 68],
      [44, 0, 92],
      [118, 0, -20],
      [-92, 0, -84],
      [18, 0, -116],
      [124, 0, 58],
      [-18, 0, 34]
    ];
    for (let i = 0; i < points.length; i += 1) {
      const mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(1.15, 0),
        new THREE.MeshStandardMaterial({ color: 0x79ffc5, emissive: 0x0d6d4f, roughness: 0.24, metalness: 0.12 })
      );
      mesh.name = `Collectible_DataShard_${i}`;
      mesh.position.set(points[i][0], 2.2, points[i][2]);
      this.scene.add(mesh);
      this.collectibles.push({ mesh, collected: localStorage.getItem(`portfolio-drive-shard-${i}`) === '1', index: i });
      mesh.visible = !this.collectibles[i].collected;
    }
  }

  checkBoostPad(position) {
    return this.boostPads.find((pad) => position.distanceTo(pad.position) < 4.2) || null;
  }

  checkRampAir(position, yVelocity) {
    if (yVelocity < 3.2) return false;
    for (const ramp of this.ramps) {
      const near = position.distanceTo(ramp.position) < ramp.radius;
      if (near && !ramp.triggered) {
        ramp.triggered = true;
        window.setTimeout(() => { ramp.triggered = false; }, 1000);
        return true;
      }
    }
    return false;
  }

  checkCollectibles(position) {
    const collected = [];
    for (const item of this.collectibles) {
      if (item.collected || position.distanceTo(item.mesh.position) > 3.4) continue;
      item.collected = true;
      item.mesh.visible = false;
      localStorage.setItem(`portfolio-drive-shard-${item.index}`, '1');
      collected.push(item);
    }
    return collected;
  }

  getCollectedCount() {
    return this.collectibles.filter((item) => item.collected).length;
  }

  setPotatoCount(count) {
    this.potatoFarm?.setPotatoCount(count);
  }

  spawnPotato() {
    return this.potatoFarm?.spawnPotato();
  }

  nearestZone(position) {
    let best = null;
    for (const zone of this.zones) {
      const distance = position.distanceTo(zone.position);
      if (distance <= zone.radius + 4 && (!best || distance < best.distance)) {
        best = { zone, distance };
      }
    }
    return best;
  }

  getRespawnPose(zoneId = 'landing') {
    const zone = this.zones.find((item) => item.id === zoneId) || this.zones.find((item) => item.id === 'landing');
    if (!zone) {
      return { position: new THREE.Vector3(10, 1.45, 27), heading: 0 };
    }
    if (zone.id === 'landing') {
      return { position: new THREE.Vector3(10, 1.08, 27), heading: 0.15 };
    }
    const distance = zone.id === 'education' ? 13.6 : zone.id === 'security' ? 13.2 : 9;
    const offset = new THREE.Vector3(Math.sin(zone.rotation || 0) * -distance, 1.08, Math.cos(zone.rotation || 0) * -distance);
    return {
      position: zone.position.clone().add(offset),
      heading: zone.rotation || 0
    };
  }

  getRespawnPosition(zoneId = 'landing') {
    return this.getRespawnPose(zoneId).position;
  }

  startCircuit(now) {
    this.circuit.active = true;
    this.circuit.startedAt = now;
    this.circuit.checkpoint = 0;
  }

  startSecurityScan(now) {
    if (this.securityScan.active) return false;
    this.securityScan.active = true;
    this.securityScan.startedAt = now;
    return true;
  }

  completeSecurityScan() {
    this.securityScan.active = false;
    this.securityScan.complete = true;
  }

  updateCircuit(position, now) {
    if (!this.circuit.active) return null;
    const target = this.checkpoints[this.circuit.checkpoint + 1];
    if (!target || position.distanceTo(target) > 10) return null;

    this.circuit.checkpoint += 1;
    if (this.circuit.checkpoint >= this.checkpoints.length - 1) {
      const lap = now - this.circuit.startedAt;
      this.circuit.active = false;
      this.circuit.checkpoint = 0;
      if (!this.circuit.best || lap < this.circuit.best) {
        this.circuit.best = lap;
        localStorage.setItem('portfolio-drive-best-lap', String(lap));
      }
      return { finished: true, lap };
    }
    return { checkpoint: this.circuit.checkpoint };
  }

  update(dt, elapsed, vehiclePosition) {
    this.water.update(dt, elapsed);
    this.foliage.update(dt, elapsed, vehiclePosition);
    this.potatoFarm.update(dt);
    this.setPieces.update(dt, elapsed);
    this.atmosphere.update(dt, elapsed);
    for (const item of this.collectibles) {
      if (!item.collected) {
        item.mesh.rotation.y += dt * 1.1;
        item.mesh.position.y = 2.2 + Math.sin(elapsed * 1.6 + item.index) * 0.28;
      }
    }
  }
}
