// ABOUTME: Orchestrates terrain, roads, landmarks, interactions, and world updates for /play.
// ABOUTME: Preserves portfolio zone contracts while allowing the island layout to be rebuilt.
import * as THREE from 'three';
import {
  ISLAND_RADIUS,
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
import { createWorldMaterials, QUALITY_ORDER, QUALITY_PROFILES, WATER_Y } from './WorldMaterials.js';

const SURFACES = {
  road: { id: 'road', label: 'road', forwardGrip: 1, sideGrip: 1, engineFactor: 1, topSpeedFactor: 1, drag: 1, dustColor: 0x6f6250, skidColor: 0x161410, skidMarks: true },
  grass: { id: 'grass', label: 'grass', forwardGrip: 0.86, sideGrip: 0.72, engineFactor: 0.92, topSpeedFactor: 0.86, drag: 0.988, dustColor: 0x6e8c42, skidColor: 0x26381d, skidMarks: false },
  sand: { id: 'sand', label: 'sand', forwardGrip: 0.72, sideGrip: 0.56, engineFactor: 0.76, topSpeedFactor: 0.68, drag: 0.965, dustColor: 0xd2a56f, skidColor: 0x8d6338, skidMarks: false },
  shore: { id: 'shore', label: 'shore', forwardGrip: 0.68, sideGrip: 0.48, engineFactor: 0.7, topSpeedFactor: 0.58, drag: 0.948, dustColor: 0x9bd6cf, skidColor: 0x6fa1a0, skidMarks: false },
  water: { id: 'water', label: 'water', forwardGrip: 0.38, sideGrip: 0.28, engineFactor: 0.42, topSpeedFactor: 0.36, drag: 1, dustColor: 0xb8fff0, skidColor: 0x7edbd4, skidMarks: false }
};

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
    this.surfaceState = { label: 'land', inWater: false, nearShore: false };
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
    if (QUALITY_PROFILES[saved]) return saved;
    return prefersLightLandscape() ? 'low' : 'medium';
  }

  getQualityProfile() {
    return QUALITY_PROFILES[this.landscapeQuality] || QUALITY_PROFILES.medium;
  }

  setLandscapeQuality(quality) {
    if (!QUALITY_PROFILES[quality]) return this.landscapeQuality;
    this.landscapeQuality = quality;
    localStorage.setItem('portfolio-drive-landscape-quality', quality);
    this.water?.applyQuality?.();
    this.foliage?.applyQuality();
    this.setPieces?.applyQuality();
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
      [-62, 0, 68],
      [28, 0, 96],
      [96, 0, -18],
      [-84, 0, -54],
      [18, 0, -112],
      [120, 0, 58],
      [-24, 0, 34]
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
      return { position: new THREE.Vector3(4, 1.45, 26), heading: 0 };
    }
    if (zone.id === 'landing') {
      return { position: zone.position.clone().add(new THREE.Vector3(4, 1.08, -16)), heading: 0.15 };
    }
    if (zone.id === 'drift') {
      return { position: zone.position.clone().add(new THREE.Vector3(-18, 1.08, -30)), heading: 0.18 };
    }
    const distance = zone.id === 'education' ? 18 : zone.id === 'security' ? 15 : 10;
    const offset = new THREE.Vector3(Math.sin(zone.rotation || 0) * -distance, 1.08, Math.cos(zone.rotation || 0) * -distance);
    return {
      position: zone.position.clone().add(offset),
      heading: zone.rotation || 0
    };
  }

  getRespawnPosition(zoneId = 'landing') {
    return this.getRespawnPose(zoneId).position;
  }

  getSurfaceInfo(position) {
    if (!position) return SURFACES.road;
    const distance = Math.hypot(position.x, position.z);
    const inWater = distance > ISLAND_RADIUS * 1.012 || position.y < WATER_Y + 0.24;
    const onRoad = this.roads?.isNear(position.x, position.z, 0.9);
    let surface = SURFACES.grass;
    if (inWater) {
      surface = SURFACES.water;
    } else if (onRoad) {
      surface = SURFACES.road;
    } else if (distance > ISLAND_RADIUS * 0.965) {
      surface = SURFACES.shore;
    } else if (distance > ISLAND_RADIUS * 0.88) {
      surface = SURFACES.sand;
    }
    this.surfaceState = {
      label: surface.label,
      inWater: surface.id === 'water',
      nearShore: surface.id === 'shore' || surface.id === 'sand',
      onRoad
    };
    return surface;
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

  update(dt, elapsed, vehiclePosition, vehicle) {
    this.water.update(dt, elapsed, vehiclePosition, vehicle);
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

function prefersLightLandscape() {
  const narrow = window.innerWidth <= 760;
  const coarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches === true;
  const touch = navigator.maxTouchPoints > 1;
  return narrow || coarsePointer || touch;
}
