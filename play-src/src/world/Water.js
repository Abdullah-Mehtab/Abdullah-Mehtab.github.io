// ABOUTME: Builds stylized ocean, shallow shelf, and animated coast foam for /play.
// ABOUTME: Uses the same irregular island outline as the terrain so water no longer reads as a circle.
import * as THREE from 'three';
import { ISLAND_RADIUS, WORLD_HALF_SIZE } from './worldData.js';
import { getIslandCoastPoints, makeIslandBandGeometry, pseudoRandom, WATER_Y } from './WorldMaterials.js';

const SPLASH_LIMITS = { low: 12, medium: 24, high: 40 };
const BOBBING_LIMITS = { low: 5, medium: 10, high: 16 };
const WAKE_LIMITS = { low: 10, medium: 26, high: 42 };
const GLINT_LIMITS = { low: 0, medium: 20, high: 34 };
const WAVE_LANE_LIMITS = { low: 16, medium: 32, high: 52 };
const SHORE_FLECK_LIMITS = { low: 24, medium: 72, high: 112 };
const SHORE_WAKE_RADIUS = ISLAND_RADIUS * 0.94;
const WATER_DRAG_RADIUS = ISLAND_RADIUS * 1.012;
const WATER_RESPAWN_RADIUS = ISLAND_RADIUS * 1.04;

export class Water {
  constructor(world) {
    this.world = world;
    this.waterMeshes = [];
    this.foamMeshes = [];
    this.bobbingProps = [];
    this.surfaceGlints = [];
    this.waveLanes = [];
    this.shoreFlecks = [];
    this.splashes = [];
    this.wakes = [];
    this.maxSplashes = SPLASH_LIMITS.medium;
    this.maxBobbingProps = BOBBING_LIMITS.medium;
    this.maxWakes = WAKE_LIMITS.medium;
    this.maxGlints = GLINT_LIMITS.medium;
    this.maxWaveLanes = WAVE_LANE_LIMITS.medium;
    this.maxShoreFlecks = SHORE_FLECK_LIMITS.medium;
    this.lastSplashAt = -Infinity;
    this.lastSplashAudioAt = -Infinity;
    this.lastWakeAt = -Infinity;
    this.splashesSpawned = 0;
    this.wakesSpawned = 0;
    this.splashCursor = 0;
    this.submergeTime = 0;
    this.wakeCursor = 0;
    this.splashDummy = new THREE.Object3D();
    this.wakeDummy = new THREE.Object3D();
    this.glintDummy = new THREE.Object3D();
    this.waveLaneDummy = new THREE.Object3D();
    this.shoreFleckDummy = new THREE.Object3D();
    this.splashGeometry = new THREE.SphereGeometry(0.18, 8, 5);
    this.splashMaterial = new THREE.MeshBasicMaterial({
      color: 0xeafff7,
      transparent: true,
      opacity: 0.42,
      depthWrite: false
    });
    this.wakeGeometry = new THREE.RingGeometry(0.58, 1.0, 28);
    this.wakeGeometry.rotateX(-Math.PI / 2);
    this.wakeMaterial = new THREE.MeshBasicMaterial({
      color: 0xeafff7,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
  }

  build() {
    const ocean = new THREE.Mesh(new THREE.PlaneGeometry(WORLD_HALF_SIZE * 5.5, WORLD_HALF_SIZE * 5.5, 80, 80), this.world.materials.water);
    ocean.name = 'ToyIslandOcean';
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = WATER_Y;
    ocean.renderOrder = -5;
    this.world.scene.add(ocean);
    this.waterMeshes.push(ocean);

    this.createShallowShelf();
    this.createShoreFoam();
    this.createShoreFlecks();
    this.createSurfaceGlints();
    this.createWaveLanes();
    this.createBobbingProps();
    this.createSplashPool();
    this.createWakePool();
    this.applyQuality();
  }

  createShallowShelf() {
    const shelf = new THREE.Mesh(
      makeIslandBandGeometry(ISLAND_RADIUS, 1.0, 1.22, 156),
      this.world.materials.shoreWash
    );
    shelf.name = 'ToyIslandShallowShelf';
    shelf.position.y = WATER_Y + 0.08;
    shelf.renderOrder = -3;
    this.world.scene.add(shelf);
    this.waterMeshes.push(shelf);
  }

  createShoreFoam() {
    const rings = [
      { inner: 1.01, outer: 1.024, opacity: 0.22, speed: 0.006 },
      { inner: 1.035, outer: 1.052, opacity: 0.14, speed: -0.004 },
      { inner: 1.065, outer: 1.084, opacity: 0.08, speed: 0.003 }
    ];

    for (let i = 0; i < rings.length; i += 1) {
      const ring = rings[i];
      const material = this.world.materials.foam.clone();
      material.opacity = ring.opacity;
      const mesh = new THREE.Mesh(
        makeIslandBandGeometry(ISLAND_RADIUS, ring.inner, ring.outer, 156),
        material
      );
      mesh.name = `ToyIslandFoam_${i}`;
      mesh.position.y = WATER_Y + 0.06 + i * 0.006;
      mesh.userData.foamSpeed = ring.speed;
      mesh.renderOrder = -4 + i;
      this.world.scene.add(mesh);
      this.waterMeshes.push(mesh);
      this.foamMeshes.push(mesh);
    }
  }

  createShoreFlecks() {
    const capacity = SHORE_FLECK_LIMITS.high;
    const coastPoints = getIslandCoastPoints(ISLAND_RADIUS, 1.014, 180);
    const geometry = new THREE.PlaneGeometry(1, 1);
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0xf4fff8,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    this.shoreFleckMesh = new THREE.InstancedMesh(geometry, material, capacity);
    this.shoreFleckMesh.name = 'ToyIslandShoreline_Foam_Flecks';
    this.shoreFleckMesh.frustumCulled = false;
    this.shoreFleckMesh.renderOrder = -1;
    this.world.scene.add(this.shoreFleckMesh);

    for (let i = 0; i < capacity; i += 1) {
      const angle = (i / capacity) * Math.PI * 2 + (pseudoRandom(i * 2.41) - 0.5) * 0.06;
      const [x, z] = pointOnCoast(coastPoints, angle, 1.0 + pseudoRandom(i * 3.17) * 0.026);
      this.shoreFlecks.push({
        x,
        z,
        rotation: angle + Math.PI * 0.5 + (pseudoRandom(i * 5.43) - 0.5) * 0.48,
        width: 1.8 + pseudoRandom(i * 7.77) * 4.2,
        depth: 0.08 + pseudoRandom(i * 9.19) * 0.18,
        phase: i * 0.39,
        speed: 0.46 + pseudoRandom(i * 11.61) * 0.32,
        drift: 0.24 + pseudoRandom(i * 13.83) * 0.44
      });
    }
    this.writeShoreFlecks(0);
  }

  createSurfaceGlints() {
    const capacity = GLINT_LIMITS.high;
    const geometry = new THREE.PlaneGeometry(1, 1);
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0xdffbff,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    this.glintMesh = new THREE.InstancedMesh(geometry, material, capacity);
    this.glintMesh.name = 'ToyIslandOceanGlint_Strips';
    this.glintMesh.frustumCulled = false;
    this.glintMesh.renderOrder = -2;
    this.world.scene.add(this.glintMesh);

    for (let i = 0; i < capacity; i += 1) {
      const angle = (i / capacity) * Math.PI * 2 + (i % 5) * 0.07;
      const radius = ISLAND_RADIUS * (1.15 + (i % 7) * 0.085);
      this.surfaceGlints.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        rotation: angle + Math.PI * 0.5 + ((i % 3) - 1) * 0.16,
        width: 16 + (i % 6) * 5.8,
        depth: 0.18 + (i % 4) * 0.08,
        phase: i * 0.63,
        speed: 0.32 + (i % 5) * 0.035
      });
    }
    this.writeSurfaceGlints(0);
  }

  createWaveLanes() {
    const capacity = WAVE_LANE_LIMITS.high;
    const geometry = new THREE.PlaneGeometry(1, 1);
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0xe8fff7,
      transparent: true,
      opacity: 0.105,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    this.waveLaneMesh = new THREE.InstancedMesh(geometry, material, capacity);
    this.waveLaneMesh.name = 'ToyIslandOcean_Wave_Lanes';
    this.waveLaneMesh.frustumCulled = false;
    this.waveLaneMesh.renderOrder = -2;
    this.world.scene.add(this.waveLaneMesh);

    for (let i = 0; i < capacity; i += 1) {
      const angle = (i / capacity) * Math.PI * 2 + (pseudoRandom(i * 2.13) - 0.5) * 0.22;
      const radius = ISLAND_RADIUS * (1.1 + pseudoRandom(i * 3.79) * 1.12);
      this.waveLanes.push({
        angle,
        radius,
        rotation: angle + Math.PI * 0.5 + (pseudoRandom(i * 5.11) - 0.5) * 0.34,
        width: 18 + pseudoRandom(i * 7.71) * 46,
        depth: 0.1 + pseudoRandom(i * 11.17) * 0.22,
        phase: i * 0.47,
        speed: 0.18 + pseudoRandom(i * 13.37) * 0.16,
        drift: 0.9 + pseudoRandom(i * 17.23) * 2.1
      });
    }
    this.writeWaveLanes(0);
  }

  createBobbingProps() {
    const coastPoints = getIslandCoastPoints(ISLAND_RADIUS, 1.055, 156);
    const specs = [
      { template: 'EnvPolishShoreBuoy', angle: -2.76, scale: 0.84, offset: 1.02, phase: 0.1 },
      { template: 'EnvPolishWaveMarker', angle: -2.33, scale: 1.05, offset: 1.1, phase: 0.7 },
      { template: 'EnvPolishDockFloat', angle: -1.86, scale: 1.0, offset: 1.08, phase: 1.3 },
      { template: 'EnvPolishShoreBuoy', angle: -1.42, scale: 0.9, offset: 1.06, phase: 2.0 },
      { template: 'EnvPolishWaveMarker', angle: -1.04, scale: 0.92, offset: 1.04, phase: 2.6 },
      { template: 'EnvPolishShoreBuoy', angle: -0.62, scale: 0.82, offset: 1.08, phase: 3.1 },
      { template: 'EnvPolishDockFloat', angle: -0.18, scale: 0.94, offset: 1.07, phase: 3.7 },
      { template: 'EnvPolishShoreBuoy', angle: 0.28, scale: 0.84, offset: 1.03, phase: 4.2 },
      { template: 'EnvPolishWaveMarker', angle: 0.74, scale: 1.06, offset: 1.09, phase: 4.9 },
      { template: 'EnvPolishShoreBuoy', angle: 1.08, scale: 0.88, offset: 1.06, phase: 5.4 },
      { template: 'EnvPolishDockFloat', angle: 1.44, scale: 0.98, offset: 1.08, phase: 6.0 },
      { template: 'EnvPolishShoreBuoy', angle: 1.86, scale: 0.86, offset: 1.05, phase: 6.6 },
      { template: 'EnvPolishWaveMarker', angle: 2.22, scale: 0.96, offset: 1.08, phase: 7.1 },
      { template: 'EnvPolishShoreBuoy', angle: 2.62, scale: 0.82, offset: 1.04, phase: 7.8 },
      { template: 'EnvPolishDockFloat', angle: 3.02, scale: 1.04, offset: 1.08, phase: 8.3 },
      { template: 'EnvPolishShoreBuoy', angle: 3.44, scale: 0.84, offset: 1.05, phase: 8.9 }
    ];

    for (let i = 0; i < specs.length; i += 1) {
      const spec = specs[i];
      const prop = this.world.cloneEnvironmentAsset(spec.template);
      if (!prop) continue;
      const [x, z] = pointOnCoast(coastPoints, spec.angle, spec.offset);
      prop.name = `Shoreline_${spec.template}_${i}`;
      prop.position.set(x, WATER_Y + 0.2, z);
      prop.rotation.y = -spec.angle + Math.PI * 0.5;
      prop.rotation.z = Math.sin(spec.phase) * 0.035;
      prop.scale.setScalar(spec.scale);
      prop.traverse((object) => {
        if (object.isMesh) {
          object.castShadow = false;
          object.receiveShadow = false;
        }
      });
      this.world.scene.add(prop);
      this.bobbingProps.push({
        group: prop,
        baseY: WATER_Y + 0.12 + (i % 3) * 0.035,
        phase: spec.phase,
        amplitude: 0.08 + (i % 4) * 0.018,
        speed: 0.82 + (i % 5) * 0.11,
        roll: 0.018 + (i % 3) * 0.009
      });
    }
  }

  createWakePool() {
    const capacity = WAKE_LIMITS.high;
    this.wakeMesh = new THREE.InstancedMesh(this.wakeGeometry, this.wakeMaterial, capacity);
    this.wakeMesh.name = 'WaterWheelWake_Rings';
    this.wakeMesh.frustumCulled = false;
    this.wakeMesh.renderOrder = -1;
    this.wakes = Array.from({ length: capacity }, () => ({
      active: false,
      life: 0,
      maxLife: 1,
      position: new THREE.Vector3(),
      rotationY: 0,
      baseScale: 1,
      stretch: 1
    }));
    for (let index = 0; index < capacity; index += 1) {
      this.hideWakeInstance(index);
    }
    this.wakeMesh.instanceMatrix.needsUpdate = true;
    this.world.scene.add(this.wakeMesh);
  }

  createSplashPool() {
    const capacity = SPLASH_LIMITS.high;
    this.splashMesh = new THREE.InstancedMesh(this.splashGeometry, this.splashMaterial, capacity);
    this.splashMesh.name = 'WaterWheelSplash_Instanced';
    this.splashMesh.frustumCulled = false;
    this.splashMesh.renderOrder = 2;
    this.splashMesh.visible = false;
    this.splashMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.splashes = Array.from({ length: capacity }, () => ({
      active: false,
      life: 0,
      maxLife: 1,
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      baseScale: 1,
      rotationY: 0
    }));
    for (let index = 0; index < capacity; index += 1) {
      this.hideSplashInstance(index);
    }
    this.splashMesh.instanceMatrix.needsUpdate = true;
    this.world.scene.add(this.splashMesh);
  }

  applyQuality() {
    const profile = this.world.getQualityProfile();
    const waterQuality = profile.water || 'medium';
    this.maxSplashes = SPLASH_LIMITS[waterQuality] ?? SPLASH_LIMITS.medium;
    this.maxBobbingProps = BOBBING_LIMITS[waterQuality] ?? BOBBING_LIMITS.medium;
    this.maxWakes = WAKE_LIMITS[waterQuality] ?? WAKE_LIMITS.medium;
    this.maxGlints = GLINT_LIMITS[waterQuality] ?? GLINT_LIMITS.medium;
    this.maxWaveLanes = WAVE_LANE_LIMITS[waterQuality] ?? WAVE_LANE_LIMITS.medium;
    this.maxShoreFlecks = SHORE_FLECK_LIMITS[waterQuality] ?? SHORE_FLECK_LIMITS.medium;
    this.foamMeshes.forEach((mesh, index) => {
      mesh.visible = waterQuality === 'high' || (waterQuality === 'medium' && index < 2) || index === 0;
    });
    if (this.glintMesh) {
      this.glintMesh.count = this.maxGlints;
      this.glintMesh.visible = this.maxGlints > 0;
      this.glintMesh.instanceMatrix.needsUpdate = true;
    }
    if (this.waveLaneMesh) {
      this.waveLaneMesh.count = this.maxWaveLanes;
      this.waveLaneMesh.visible = this.maxWaveLanes > 0;
      this.waveLaneMesh.instanceMatrix.needsUpdate = true;
    }
    if (this.shoreFleckMesh) {
      this.shoreFleckMesh.count = this.maxShoreFlecks;
      this.shoreFleckMesh.visible = this.maxShoreFlecks > 0;
      this.shoreFleckMesh.instanceMatrix.needsUpdate = true;
    }
    this.bobbingProps.forEach((item, index) => {
      item.group.visible = index < this.maxBobbingProps;
    });
    this.trimSplashPool();
    this.trimWakePool();
  }

  update(dt, elapsed, vehiclePosition, vehicle) {
    if (this.world.materials.water.uniforms?.time) {
      this.world.materials.water.uniforms.time.value = elapsed;
    }
    for (const material of [this.world.materials.shoreWash, this.world.materials.wetSandBlend]) {
      if (material?.uniforms?.time) material.uniforms.time.value = elapsed;
    }
    for (const mesh of this.waterMeshes) {
      if (mesh.name.includes('Foam')) {
        mesh.rotation.z += dt * (mesh.userData.foamSpeed || 0.004);
        const base = mesh.name.endsWith('_0') ? 0.2 : mesh.name.endsWith('_1') ? 0.12 : 0.07;
        mesh.material.opacity = base + Math.sin(elapsed * 0.7 + mesh.position.y * 80) * 0.035;
      }
    }
    this.updateSurfaceGlints(elapsed);
    this.updateWaveLanes(elapsed);
    this.updateShoreFlecks(elapsed);
    this.updateBobbingProps(elapsed);
    this.updateVehicleWaterInteraction(dt, elapsed, vehiclePosition, vehicle);
    this.updateSplashes(dt);
    this.updateWakes(dt);
  }

  updateBobbingProps(elapsed) {
    for (const item of this.bobbingProps) {
      if (!item.group.visible) continue;
      const wave = Math.sin(elapsed * item.speed + item.phase);
      const side = Math.cos(elapsed * item.speed * 0.72 + item.phase);
      item.group.position.y = item.baseY + wave * item.amplitude;
      item.group.rotation.x = side * item.roll;
      item.group.rotation.z = wave * item.roll;
    }
  }

  updateSurfaceGlints(elapsed) {
    if (!this.glintMesh || this.maxGlints <= 0) return;
    this.writeSurfaceGlints(elapsed);
    this.glintMesh.material.opacity = 0.13 + Math.sin(elapsed * 0.34) * 0.035;
  }

  updateWaveLanes(elapsed) {
    if (!this.waveLaneMesh) return;
    this.writeWaveLanes(elapsed);
    this.waveLaneMesh.material.opacity = 0.085 + Math.sin(elapsed * 0.22) * 0.018;
  }

  updateShoreFlecks(elapsed) {
    if (!this.shoreFleckMesh) return;
    this.writeShoreFlecks(elapsed);
    this.shoreFleckMesh.material.opacity = 0.14 + Math.sin(elapsed * 0.58) * 0.035;
  }

  writeSurfaceGlints(elapsed) {
    if (!this.glintMesh) return;
    const visible = Math.min(this.maxGlints, this.surfaceGlints.length);
    for (let i = 0; i < visible; i += 1) {
      const glint = this.surfaceGlints[i];
      const shimmer = Math.sin(elapsed * glint.speed + glint.phase);
      this.glintDummy.position.set(glint.x + shimmer * 1.1, WATER_Y + 0.045 + i * 0.0002, glint.z);
      this.glintDummy.rotation.set(0, glint.rotation + shimmer * 0.015, 0);
      this.glintDummy.scale.set(glint.width * (0.88 + shimmer * 0.08), 1, glint.depth);
      this.glintDummy.updateMatrix();
      this.glintMesh.setMatrixAt(i, this.glintDummy.matrix);
    }
    for (let i = visible; i < this.surfaceGlints.length; i += 1) {
      this.glintDummy.position.set(0, -1000, 0);
      this.glintDummy.scale.set(0, 0, 0);
      this.glintDummy.updateMatrix();
      this.glintMesh.setMatrixAt(i, this.glintDummy.matrix);
    }
    this.glintMesh.count = visible;
    this.glintMesh.instanceMatrix.needsUpdate = true;
  }

  writeWaveLanes(elapsed) {
    if (!this.waveLaneMesh) return;
    const visible = Math.min(this.maxWaveLanes, this.waveLanes.length);
    for (let i = 0; i < visible; i += 1) {
      const lane = this.waveLanes[i];
      const pulse = Math.sin(elapsed * lane.speed + lane.phase);
      const sweep = Math.cos(elapsed * lane.speed * 0.72 + lane.phase);
      const radius = lane.radius + pulse * lane.drift;
      this.waveLaneDummy.position.set(Math.cos(lane.angle) * radius, WATER_Y + 0.052 + i * 0.00015, Math.sin(lane.angle) * radius);
      this.waveLaneDummy.rotation.set(0, lane.rotation + sweep * 0.018, 0);
      this.waveLaneDummy.scale.set(lane.width * (0.86 + pulse * 0.07), 1, lane.depth * (0.9 + sweep * 0.08));
      this.waveLaneDummy.updateMatrix();
      this.waveLaneMesh.setMatrixAt(i, this.waveLaneDummy.matrix);
    }
    for (let i = visible; i < this.waveLanes.length; i += 1) {
      this.waveLaneDummy.position.set(0, -1000, 0);
      this.waveLaneDummy.scale.set(0, 0, 0);
      this.waveLaneDummy.updateMatrix();
      this.waveLaneMesh.setMatrixAt(i, this.waveLaneDummy.matrix);
    }
    this.waveLaneMesh.count = visible;
    this.waveLaneMesh.instanceMatrix.needsUpdate = true;
  }

  writeShoreFlecks(elapsed) {
    if (!this.shoreFleckMesh) return;
    const visible = Math.min(this.maxShoreFlecks, this.shoreFlecks.length);
    for (let i = 0; i < visible; i += 1) {
      const fleck = this.shoreFlecks[i];
      const pulse = Math.sin(elapsed * fleck.speed + fleck.phase);
      const slide = Math.cos(elapsed * fleck.speed * 0.7 + fleck.phase) * fleck.drift;
      this.shoreFleckDummy.position.set(
        fleck.x + Math.cos(fleck.rotation) * slide,
        WATER_Y + 0.082 + i * 0.00004,
        fleck.z - Math.sin(fleck.rotation) * slide
      );
      this.shoreFleckDummy.rotation.set(0, fleck.rotation + pulse * 0.025, 0);
      this.shoreFleckDummy.scale.set(fleck.width * (0.82 + pulse * 0.12), 1, fleck.depth * (0.9 + pulse * 0.1));
      this.shoreFleckDummy.updateMatrix();
      this.shoreFleckMesh.setMatrixAt(i, this.shoreFleckDummy.matrix);
    }
    for (let i = visible; i < this.shoreFlecks.length; i += 1) {
      this.shoreFleckDummy.position.set(0, -1000, 0);
      this.shoreFleckDummy.scale.set(0, 0, 0);
      this.shoreFleckDummy.updateMatrix();
      this.shoreFleckMesh.setMatrixAt(i, this.shoreFleckDummy.matrix);
    }
    this.shoreFleckMesh.count = visible;
    this.shoreFleckMesh.instanceMatrix.needsUpdate = true;
  }

  updateVehicleWaterInteraction(dt, elapsed, vehiclePosition, vehicle) {
    if (!vehiclePosition || !vehicle?.body) return;

    const distance = Math.hypot(vehiclePosition.x, vehiclePosition.z);
    const speed = Math.abs(vehicle.speed || 0);
    const nearShore = distance > SHORE_WAKE_RADIUS;
    const inWater = distance > WATER_DRAG_RADIUS || vehiclePosition.y < WATER_Y + 0.24;
    const currentSurface = this.world.surfaceState || {};
    this.world.surfaceState = {
      label: inWater ? 'water' : nearShore && currentSurface.label !== 'road' ? 'shore' : currentSurface.label || 'land',
      inWater,
      nearShore: nearShore || currentSurface.nearShore || false,
      onRoad: currentSurface.onRoad || false
    };

    if ((nearShore || inWater) && speed > 7 && elapsed - this.lastSplashAt > 0.08) {
      this.spawnSplashBurst(vehicle, inWater, elapsed);
    }
    if ((nearShore || inWater) && speed > 4.5 && elapsed - this.lastWakeAt > 0.12) {
      this.spawnWheelWake(vehicle, inWater, elapsed);
    }

    if (inWater) {
      const damp = Math.pow(0.82, Math.min(2, dt * 60));
      const angularDamp = Math.pow(0.88, Math.min(2, dt * 60));
      const velocity = vehicle.body.linvel();
      const angular = vehicle.body.angvel();
      vehicle.body.setLinvel({
        x: velocity.x * damp,
        y: Math.min(velocity.y, 1.2),
        z: velocity.z * damp
      }, true);
      vehicle.body.setAngvel({
        x: angular.x * angularDamp,
        y: angular.y * angularDamp,
        z: angular.z * angularDamp
      }, true);
    }

    if (distance > WATER_RESPAWN_RADIUS || vehiclePosition.y < WATER_Y - 1.2) {
      this.submergeTime += dt;
    } else {
      this.submergeTime = Math.max(0, this.submergeTime - dt * 2.5);
    }

    if (this.submergeTime > 0.9) {
      const pose = this.world.getRespawnPose('landing');
      vehicle.respawn(pose.position, pose.heading);
      vehicle.audio?.impact?.(0.65);
      vehicle.audio?.sweep?.(260, 110, 0.18, 0.025);
      this.submergeTime = 0;
    }
  }

  spawnSplashBurst(vehicle, inWater, elapsed) {
    this.lastSplashAt = elapsed;
    const intensity = inWater ? 1.0 : 0.62;
    for (const side of [-0.92, 0.92]) {
      const local = new THREE.Vector3(side, -0.35, 1.25);
      const position = local.applyQuaternion(vehicle.group.quaternion).add(vehicle.group.position);
      position.y = WATER_Y + 0.25 + Math.random() * 0.14;
      this.writeSplash({
        position,
        baseScale: 0.7 + Math.random() * 0.55 * intensity,
        rotationY: Math.random() * Math.PI * 2,
        life: 0.48 + Math.random() * 0.2,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 1.7,
          0.8 + Math.random() * 1.25,
          (Math.random() - 0.5) * 1.7
        )
      });
    }
    if (elapsed - this.lastSplashAudioAt > 0.36) {
      vehicle.audio?.sweep?.(180, 430, 0.12, 0.018);
      this.lastSplashAudioAt = elapsed;
    }
  }

  spawnWheelWake(vehicle, inWater, elapsed) {
    this.lastWakeAt = elapsed;
    const velocity = vehicle.body.linvel();
    const speed = Math.hypot(velocity.x, velocity.z);
    const heading = speed > 0.4 ? Math.atan2(velocity.x, velocity.z) : vehicle.heading;
    const offsets = [-0.82, 0.82];
    for (const side of offsets) {
      const local = new THREE.Vector3(side, -0.42, -1.15);
      const position = local.applyQuaternion(vehicle.group.quaternion).add(vehicle.group.position);
      if (!inWater) {
        const radial = Math.hypot(position.x, position.z) || 1;
        const waterline = ISLAND_RADIUS * 1.002;
        const scale = waterline / radial;
        position.x *= scale;
        position.z *= scale;
      }
      position.y = WATER_Y + 0.16;
      this.writeWake({
        position,
        rotationY: heading,
        baseScale: inWater ? 0.9 : 0.7,
        stretch: THREE.MathUtils.clamp(1.1 + speed * 0.025, 1.1, 2.4),
        life: inWater ? 1.12 : 0.86
      });
    }
  }

  writeSplash({ position, baseScale, rotationY, life, velocity }) {
    if (!this.splashMesh || !this.splashes.length) return;
    if (this.getActiveSplashCount() >= this.maxSplashes) {
      this.hideOldestSplash();
    }
    const index = this.splashCursor;
    this.splashCursor = (this.splashCursor + 1) % this.splashes.length;
    const item = this.splashes[index];
    this.splashMesh.visible = true;
    item.active = true;
    item.life = life;
    item.maxLife = life;
    item.position.copy(position);
    item.velocity.copy(velocity);
    item.baseScale = baseScale;
    item.rotationY = rotationY;
    this.splashesSpawned += 1;
    this.writeSplashMatrix(index, item);
    this.splashMesh.instanceMatrix.needsUpdate = true;
  }

  writeWake({ position, rotationY, baseScale, stretch, life }) {
    const activeCount = this.wakes.filter((item) => item.active).length;
    if (activeCount >= this.maxWakes) {
      this.hideOldestWake();
    }
    const index = this.wakeCursor;
    this.wakeCursor = (this.wakeCursor + 1) % this.wakes.length;
    const item = this.wakes[index];
    item.active = true;
    item.life = life;
    item.maxLife = life;
    item.position.copy(position);
    item.rotationY = rotationY;
    item.baseScale = baseScale;
    item.stretch = stretch;
    this.wakesSpawned += 1;
    this.writeWakeMatrix(index, item);
    this.wakeMesh.instanceMatrix.needsUpdate = true;
  }

  writeSplashMatrix(index, item) {
    const progress = 1 - item.life / item.maxLife;
    const fade = THREE.MathUtils.clamp(item.life / item.maxLife, 0.001, 1);
    const scale = item.baseScale * (0.78 + progress * 1.35) * Math.sqrt(fade);
    this.splashDummy.position.copy(item.position);
    this.splashDummy.rotation.set(0, item.rotationY + progress * 0.3, 0);
    this.splashDummy.scale.set(scale, scale * (0.7 + progress * 0.45), scale);
    this.splashDummy.updateMatrix();
    this.splashMesh.setMatrixAt(index, this.splashDummy.matrix);
  }

  updateWakes(dt) {
    if (!this.wakeMesh) return;
    let activeCount = 0;
    for (let index = 0; index < this.wakes.length; index += 1) {
      const item = this.wakes[index];
      if (!item.active) continue;
      item.life -= dt;
      if (item.life <= 0 || activeCount >= this.maxWakes) {
        this.hideWakeInstance(index);
        item.active = false;
        continue;
      }
      item.position.y = WATER_Y + 0.15 + Math.sin(item.life * 9.0 + index) * 0.006;
      this.writeWakeMatrix(index, item);
      activeCount += 1;
    }
    this.wakeMesh.instanceMatrix.needsUpdate = true;
  }

  writeWakeMatrix(index, item) {
    const progress = 1 - item.life / item.maxLife;
    const scale = item.baseScale * (1 + progress * 2.2);
    const flatten = Math.max(0.001, 1 - progress * 0.5);
    this.wakeDummy.position.copy(item.position);
    this.wakeDummy.rotation.set(0, item.rotationY, 0);
    this.wakeDummy.scale.set(scale * item.stretch, flatten, scale);
    this.wakeDummy.updateMatrix();
    this.wakeMesh.setMatrixAt(index, this.wakeDummy.matrix);
  }

  hideOldestWake() {
    let oldest = -1;
    let lowestLife = Infinity;
    for (let index = 0; index < this.wakes.length; index += 1) {
      const item = this.wakes[index];
      if (item.active && item.life < lowestLife) {
        oldest = index;
        lowestLife = item.life;
      }
    }
    if (oldest >= 0) {
      this.wakes[oldest].active = false;
      this.hideWakeInstance(oldest);
    }
  }

  hideOldestSplash() {
    let oldest = -1;
    let lowestLife = Infinity;
    for (let index = 0; index < this.splashes.length; index += 1) {
      const item = this.splashes[index];
      if (item.active && item.life < lowestLife) {
        oldest = index;
        lowestLife = item.life;
      }
    }
    if (oldest >= 0) {
      this.splashes[oldest].active = false;
      this.hideSplashInstance(oldest);
    }
  }

  trimSplashPool() {
    let activeCount = 0;
    for (let index = 0; index < this.splashes.length; index += 1) {
      const item = this.splashes[index];
      if (!item.active) continue;
      if (activeCount >= this.maxSplashes) {
        item.active = false;
        this.hideSplashInstance(index);
      } else {
        activeCount += 1;
      }
    }
    if (this.splashMesh) {
      this.splashMesh.visible = activeCount > 0;
      this.splashMesh.instanceMatrix.needsUpdate = true;
    }
  }

  hideSplashInstance(index) {
    if (!this.splashMesh) return;
    this.splashDummy.position.set(0, -1000, 0);
    this.splashDummy.rotation.set(0, 0, 0);
    this.splashDummy.scale.set(0, 0, 0);
    this.splashDummy.updateMatrix();
    this.splashMesh.setMatrixAt(index, this.splashDummy.matrix);
  }

  trimWakePool() {
    let activeCount = 0;
    for (let index = 0; index < this.wakes.length; index += 1) {
      const item = this.wakes[index];
      if (!item.active) continue;
      if (activeCount >= this.maxWakes) {
        item.active = false;
        this.hideWakeInstance(index);
      } else {
        activeCount += 1;
      }
    }
    if (this.wakeMesh) this.wakeMesh.instanceMatrix.needsUpdate = true;
  }

  hideWakeInstance(index) {
    if (!this.wakeMesh) return;
    this.wakeDummy.position.set(0, -1000, 0);
    this.wakeDummy.rotation.set(0, 0, 0);
    this.wakeDummy.scale.set(0, 0, 0);
    this.wakeDummy.updateMatrix();
    this.wakeMesh.setMatrixAt(index, this.wakeDummy.matrix);
  }

  updateSplashes(dt) {
    if (!this.splashMesh) return;
    let activeCount = 0;
    for (let i = 0; i < this.splashes.length; i += 1) {
      const splash = this.splashes[i];
      if (!splash.active) continue;
      splash.life -= dt;
      if (splash.life <= 0 || activeCount >= this.maxSplashes) {
        this.removeSplash(i);
        continue;
      }
      splash.velocity.y -= dt * 2.1;
      splash.position.addScaledVector(splash.velocity, dt);
      this.writeSplashMatrix(i, splash);
      activeCount += 1;
    }
    this.splashMesh.visible = activeCount > 0;
    this.splashMesh.instanceMatrix.needsUpdate = true;
  }

  removeSplash(index) {
    const splash = this.splashes[index];
    if (!splash) return;
    splash.active = false;
    this.hideSplashInstance(index);
  }

  getActiveSplashCount() {
    return this.splashes.filter((item) => item.active).length;
  }

  getStats() {
    const activeSplashes = this.getActiveSplashCount();
    return {
      splashes: activeSplashes,
      activeSplashes,
      maxSplashes: this.maxSplashes,
      splashesSpawned: this.splashesSpawned,
      splashCapacity: this.splashes.length,
      splashMesh: Boolean(this.splashMesh),
      wakesSpawned: this.wakesSpawned,
      activeWakes: this.wakes.filter((item) => item.active).length,
      maxWakes: this.maxWakes,
      wakeCapacity: this.wakes.length,
      wakeMesh: Boolean(this.wakeMesh),
      foamRings: this.foamMeshes.length,
      visibleFoamRings: this.foamMeshes.filter((mesh) => mesh.visible).length,
      surfaceGlints: this.surfaceGlints.length,
      visibleSurfaceGlints: this.glintMesh?.count || 0,
      waveLanes: this.waveLanes.length,
      visibleWaveLanes: this.waveLaneMesh?.count || 0,
      shoreFlecks: this.shoreFlecks.length,
      visibleShoreFlecks: this.shoreFleckMesh?.count || 0,
      bobbingProps: this.bobbingProps.length,
      visibleBobbingProps: this.bobbingProps.filter((item) => item.group.visible).length
    };
  }
}

function pointOnCoast(points, angle, offset = 1) {
  const normalized = (angle + Math.PI * 2) % (Math.PI * 2);
  const index = Math.round((normalized / (Math.PI * 2)) * points.length) % points.length;
  const [x, z] = points[index];
  return [x * offset, z * offset];
}
