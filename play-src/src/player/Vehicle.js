// ABOUTME: Loads and animates the protected Sabre Turbo-style car for /play.
// ABOUTME: Adds lights, smoke, skid marks, surface feedback, respawn, and muscle-car tricks.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VehicleController } from '../physics/VehicleController.js';
import { ISLAND_RADIUS, WORLD_HALF_SIZE } from '../world/worldData.js';
import { mergeStaticMeshesInGroup } from '../world/StaticBatching.js';
import sabreTurboModelUrl from '../../assets/models/vehicles/sabre-turbo.glb?url';

const START = new THREE.Vector3(10, 1.08, 27);
const VISUAL_Y_OFFSET = -0.88;
const DEFAULT_SURFACE = { id: 'road', drag: 1, dustColor: 0x6f6250, skidColor: 0x161410, skidMarks: true };
const SURFACE_IDS = ['road', 'grass', 'sand', 'shore', 'water'];
const SOFT_SURFACES = new Set(['grass', 'sand', 'shore']);

export class Vehicle {
  constructor({ scene, physics, achievements, audio }) {
    this.scene = scene;
    this.physics = physics;
    this.achievements = achievements;
    this.audio = audio;
    this.RAPIER = physics.RAPIER;
    this.group = new THREE.Group();
    this.group.name = 'Vehicle';
    this.modelRoot = new THREE.Group();
    this.modelRoot.position.y = VISUAL_Y_OFFSET;
    this.group.add(this.modelRoot);
    this.wheels = [];
    this.frontWheels = [];
    this.speed = 0;
    this.airTime = 0;
    this.lastBoostPad = null;
    this.distanceAccumulator = 0;
    this.lastPosition = START.clone();
    this.visualRumbleTime = 0;
    this.surface = DEFAULT_SURFACE;
    this.airborneTime = 0;
    this.wasAirborne = false;
    this.lastAirborneVerticalSpeed = 0;
    this.landingEvents = 0;
    this.lastLandingAt = -Infinity;
    this.lastLandingIntensity = 0;
    this.surfaceDustAccumulator = 0;
    this.handbrakeAudioCooldown = 0;
    this.surfaceAudioCooldown = 0;
    this.lastAudioState = {
      boost: false,
      burnout: false,
      wheelie: false,
      handbrake: false,
      surface: DEFAULT_SURFACE.id
    };
    this.surfaceTrailDustCounter = makeSurfaceCounter();
    this.effectDummy = new THREE.Object3D();
    this.effectColor = new THREE.Color();
    this.effectPools = {};
    this.effectTotals = {
      trail: 0,
      smoke: 0,
      boost: 0,
      skid: 0,
      landingDust: 0,
      burnoutSmoke: 0,
      wheelieSmoke: 0,
      surfaceDustSmoke: 0,
      surfaceTrail: makeSurfaceCounter(),
      surfaceSmoke: makeSurfaceCounter(),
      surfaceSkid: makeSurfaceCounter()
    };
    this.trailGeometry = new THREE.SphereGeometry(0.08, 8, 5);
    this.smokeGeometry = new THREE.SphereGeometry(0.16, 10, 6);
    this.skidGeometry = new THREE.BoxGeometry(0.26, 0.012, 2.2);
    this.boostGeometry = new THREE.ConeGeometry(0.18, 0.9, 8);
    this.createBody();
    this.createContactShadow();
    this.createLights();
    this.createEffectPools();
    this.loadVehicleModel();
    this.scene.add(this.group);
    this.respawn();
  }

  setSurface(surface) {
    this.surface = surface ? { ...DEFAULT_SURFACE, ...surface } : DEFAULT_SURFACE;
    this.controller?.setSurface(this.surface);
  }

  createBody() {
    const bodyDesc = this.RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(START.x, START.y, START.z)
      .setCanSleep(false)
      .setLinearDamping(0.34)
      .setAngularDamping(1.85);
    this.body = this.physics.world.createRigidBody(bodyDesc);
    const main = this.RAPIER.ColliderDesc
      .cuboid(1.12, 0.25, 2.42)
      .setDensity(1.42)
      .setFriction(1.0)
      .setRestitution(0.01);
    main.setTranslation(0, -0.2, -0.02);
    this.physics.world.createCollider(main, this.body);
    const ballast = this.RAPIER.ColliderDesc
      .cuboid(0.96, 0.16, 1.78)
      .setDensity(3.35)
      .setFriction(1.05)
      .setRestitution(0);
    ballast.setTranslation(0, -0.58, -0.12);
    this.physics.world.createCollider(ballast, this.body);
    const roof = this.RAPIER.ColliderDesc
      .cuboid(0.64, 0.18, 0.62)
      .setDensity(0.12)
      .setFriction(0.72)
      .setRestitution(0.02);
    roof.setTranslation(0, 0.3, -0.1);
    this.physics.world.createCollider(roof, this.body);
    this.body.setAdditionalMassProperties(
      6.4,
      { x: 0, y: -0.66, z: -0.14 },
      { x: 5.0, y: 4.6, z: 5.9 },
      { x: 0, y: 0, z: 0, w: 1 },
      true
    );
    this.controller = new VehicleController({ physics: this.physics, body: this.body });
  }

  createContactShadow() {
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.9, 28),
      new THREE.MeshBasicMaterial({ color: 0x070b0c, transparent: true, opacity: 0.28, depthWrite: false })
    );
    shadow.name = 'VehicleContactShadow';
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, -0.82, -0.15);
    shadow.scale.set(0.82, 1.55, 1);
    shadow.renderOrder = 5;
    this.group.add(shadow);
  }

  createLights() {
    this.brakeLights = [];
    this.reverseLights = [];
    this.boostLights = [];
    for (const x of [-0.62, 0.62]) {
      const light = new THREE.SpotLight(0xfff0c4, 4.8, 26, Math.PI / 10, 0.45, 1.6);
      light.position.set(x, 0.78 + VISUAL_Y_OFFSET, 2.86);
      light.target.position.set(x, 0.32 + VISUAL_Y_OFFSET, 10);
      this.group.add(light, light.target);
    }
    for (const x of [-0.64, 0.64]) {
      const brake = new THREE.PointLight(0xff2b20, 0.35, 7, 2);
      brake.position.set(x, 0.58 + VISUAL_Y_OFFSET, -2.62);
      const reverse = new THREE.PointLight(0xdff7ff, 0.0, 5, 2);
      reverse.position.set(x * 0.72, 0.5 + VISUAL_Y_OFFSET, -2.66);
      const boost = new THREE.PointLight(0xff8c3a, 0.0, 10, 2);
      boost.position.set(x * 0.55, 0.3 + VISUAL_Y_OFFSET, -2.9);
      this.brakeLights.push(brake);
      this.reverseLights.push(reverse);
      this.boostLights.push(boost);
      this.group.add(brake, reverse, boost);
    }
  }

  createEffectPools() {
    this.effectPools = {
      trail: this.createEffectPool({
        name: 'VehicleFX_TrailParticles',
        geometry: this.trailGeometry,
        capacity: 96,
        opacity: 0.2,
        depthWrite: false
      }),
      smoke: this.createEffectPool({
        name: 'VehicleFX_SmokeParticles',
        geometry: this.smokeGeometry,
        capacity: 120,
        opacity: 0.26,
        depthWrite: false
      }),
      boost: this.createEffectPool({
        name: 'VehicleFX_BoostFlames',
        geometry: this.boostGeometry,
        capacity: 48,
        opacity: 0.52,
        depthWrite: false
      }),
      skid: this.createEffectPool({
        name: 'VehicleFX_SkidMarks',
        geometry: this.skidGeometry,
        capacity: 96,
        opacity: 0.22,
        depthWrite: false
      })
    };
  }

  createEffectPool({ name, geometry, capacity, opacity, depthWrite }) {
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity,
      depthWrite
    });
    const mesh = new THREE.InstancedMesh(geometry, material, capacity);
    mesh.name = name;
    mesh.frustumCulled = false;
    mesh.renderOrder = 9;
    const items = Array.from({ length: capacity }, () => ({
      active: false,
      life: 0,
      maxLife: 1,
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      quaternion: new THREE.Quaternion(),
      scale: 1,
      stretch: new THREE.Vector3(1, 1, 1),
      growth: 0,
      gravity: 0,
      fadeScale: true
    }));
    for (let index = 0; index < capacity; index += 1) {
      this.hideEffectInstance(mesh, index);
      mesh.setColorAt(index, this.effectColor.setHex(0xffffff));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    this.scene.add(mesh);
    return { mesh, items, cursor: 0, activeCount: 0 };
  }

  loadVehicleModel() {
    const loader = new GLTFLoader();
    loader.load(
      sabreTurboModelUrl,
      (gltf) => this.installVehicleModel(gltf.scene),
      undefined,
      (error) => {
        console.error('Vehicle model failed to load', error);
        this.createFallbackModel();
      }
    );
  }

  installVehicleModel(model) {
    this.modelRoot.clear();
    model.name = 'VehicleModel_SabreTurboGLB';
    const materialCache = new Map();
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = false;
        object.material = prepareVehicleMaterial(object.material, materialCache, object.name);
        if (object.material?.transparent) object.renderOrder = 7;
      }
    });
    mergeStaticMeshesInGroup(model, {
      namePrefix: 'VehicleBody_batch',
      shouldSkip: shouldKeepVehicleMeshSeparate
    });
    model.traverse((object) => {
      if (object.isMesh && object.name.startsWith('VehicleBody_batch')) {
        object.castShadow = true;
        object.receiveShadow = false;
      }
    });
    this.modelRoot.add(model);
    this.wheels = [];
    this.frontWheels = [];
    model.traverse((object) => {
      if (object.name.startsWith('WheelSpin')) {
        this.wheels.push(object);
      }
      if (object.name.startsWith('WheelFront')) {
        this.frontWheels.push(object);
      }
    });
  }

  createFallbackModel() {
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.72, 5.0),
      new THREE.MeshStandardMaterial({ color: 0x9d3c16, roughness: 0.38, metalness: 0.35 })
    );
    body.position.y = 0.45;
    body.castShadow = true;
    body.receiveShadow = true;
    this.modelRoot.add(body);
  }

  update(input, dt) {
    const translation = this.body.translation();
    const distanceFromCenter = Math.hypot(translation.x, translation.z);
    if (
      translation.y < -12 ||
      distanceFromCenter > ISLAND_RADIUS + 8 ||
      Math.abs(translation.x) > WORLD_HALF_SIZE + 18 ||
      Math.abs(translation.z) > WORLD_HALF_SIZE + 18
    ) {
      this.respawn();
      return;
    }

    const state = this.controller.update(input, dt);
    const surface = this.surface || DEFAULT_SURFACE;
    this.speed = this.controller.speed;
    this.updateLandingFeedback(dt, surface);
    this.updateDrivingAudio(state, surface, dt);
    if (state.boost && this.controller.speed > 3) this.achievements.unlock('boost');
    if (input.consume('jump')) {
      if (this.controller.jump()) {
        this.achievements.unlock('jump');
        this.audio.click(760);
      } else if (this.controller.flipRecovery()) {
        this.audio.click(480);
      }
    }
    if (input.consume('honk')) {
      this.audio.click(320);
      this.body.applyImpulse({ x: 0, y: 1.8 * this.body.mass(), z: 0 }, true);
    }
    if (input.consume('respawn')) this.respawn();

    this.applySurfaceDrag(surface, dt);
    this.trackDistance();
    this.syncModel();
    this.updateVehicleLights(input, state);
    this.updateVisualRumble(dt);
    this.updateWheelVisuals(dt);
    this.updateTrails(dt);
    if (state.burnout) this.spawnRearSmoke(true, surface);
    if (state.wheelie && this.controller.speed > 4) this.spawnRearSmoke(false, surface);
    if (state.boost && this.controller.speed > 8) this.spawnBoostFlame();
    if (state.handbrake && this.controller.speed > 6) this.spawnSkidMark(surface);
    if (this.controller.speed > 10 || (state.handbrake && this.controller.speed > 4)) this.spawnTrail(state.boost, state.handbrake, surface);
    this.updateSurfaceDust(dt, surface);
  }

  postPhysics() {
    this.syncModel();
    this.updateVisualRumble(0);
  }

  idleDampen() {
    const v = this.body.linvel();
    this.body.setLinvel({ x: v.x * 0.94, y: v.y, z: v.z * 0.94 }, true);
    this.syncModel();
  }

  trackDistance() {
    const pos = this.position;
    const distance = pos.distanceTo(this.lastPosition);
    if (distance < 6) {
      this.distanceAccumulator += distance;
      this.achievements.addDistance(distance);
    }
    this.lastPosition.copy(pos);
  }

  applySurfaceDrag(surface, dt) {
    if (!surface || surface.drag >= 1 || this.controller.groundedWheels < 2) return;
    const damp = Math.pow(surface.drag, Math.min(2, dt * 60));
    const velocity = this.body.linvel();
    this.body.setLinvel({ x: velocity.x * damp, y: velocity.y, z: velocity.z * damp }, true);
  }

  updateSurfaceDust(dt, surface) {
    const minSpeed = surface?.id === 'shore' ? 5.5 : 8;
    if (!surface || !SOFT_SURFACES.has(surface.id) || this.controller.groundedWheels < 1 || this.controller.speed < minSpeed) {
      this.surfaceDustAccumulator = Math.min(this.surfaceDustAccumulator, 0.5);
      return;
    }

    const surfaceRate = surface.id === 'shore' ? 1.45 : surface.id === 'sand' ? 1.15 : 1;
    this.surfaceDustAccumulator += dt * THREE.MathUtils.clamp(this.controller.speed / 8, 0.85, 3.6) * surfaceRate;
    while (this.surfaceDustAccumulator >= 1) {
      this.surfaceDustAccumulator -= 1;
      this.spawnRearSmoke(false, surface, 0.64, 'surface');
    }
  }

  updateDrivingAudio(state, surface, dt) {
    if (!this.audio) return;

    this.handbrakeAudioCooldown = Math.max(0, this.handbrakeAudioCooldown - dt);
    this.surfaceAudioCooldown = Math.max(0, this.surfaceAudioCooldown - dt);
    const currentSurface = normalizeSurface(surface);
    const speed = this.controller.speed || 0;
    const slip = state.slip || 0;

    if (state.boost && !this.lastAudioState.boost && speed > 3) {
      this.audio.boostBurst?.(THREE.MathUtils.clamp(speed / 42, 0.55, 1.35));
    }

    if (state.burnout && !this.lastAudioState.burnout) {
      this.audio.burnout?.(THREE.MathUtils.clamp(0.75 + (state.burnoutCharge || 0) * 0.5, 0.75, 1.4));
    }

    if ((state.wheelieLaunch || state.wheelie) && !this.lastAudioState.wheelie) {
      this.audio.wheelie?.(THREE.MathUtils.clamp(0.85 + speed / 58, 0.85, 1.35));
    }

    if (state.handbrake && speed > 6 && (!this.lastAudioState.handbrake || this.handbrakeAudioCooldown <= 0)) {
      this.audio.tireSqueal?.(THREE.MathUtils.clamp(Math.max(slip, speed / 26), 0.45, 1.25));
      this.handbrakeAudioCooldown = 0.38;
    }

    if (
      currentSurface.id !== this.lastAudioState.surface &&
      speed > 4.5 &&
      this.controller.groundedWheels > 0 &&
      this.surfaceAudioCooldown <= 0
    ) {
      this.audio.surfaceRumble?.(currentSurface.id, speed);
      this.surfaceAudioCooldown = currentSurface.id === 'water' || currentSurface.id === 'shore' ? 0.34 : 0.24;
    }

    this.lastAudioState.boost = Boolean(state.boost);
    this.lastAudioState.burnout = Boolean(state.burnout);
    this.lastAudioState.wheelie = Boolean(state.wheelieLaunch || state.wheelie);
    this.lastAudioState.handbrake = Boolean(state.handbrake);
    this.lastAudioState.surface = currentSurface.id;
  }

  updateLandingFeedback(dt, surface) {
    const grounded = this.controller.groundedWheels >= 2;
    const velocity = this.body.linvel();
    if (!grounded) {
      this.airborneTime += dt;
      this.wasAirborne = true;
      this.lastAirborneVerticalSpeed = velocity.y;
      return;
    }

    if (this.wasAirborne && this.airborneTime > 0.08) {
      const dropSpeed = Math.abs(Math.min(0, this.lastAirborneVerticalSpeed));
      const intensity = THREE.MathUtils.clamp(this.airborneTime * 1.7 + dropSpeed * 0.14 + this.speed * 0.004, 0.22, 1.35);
      this.landingEvents += 1;
      this.lastLandingAt = performance.now() * 0.001;
      this.lastLandingIntensity = intensity;
      this.spawnLandingDust(intensity, surface);
      this.audio?.impact?.(intensity);
    }

    this.airborneTime = 0;
    this.wasAirborne = false;
    this.lastAirborneVerticalSpeed = velocity.y;
  }

  syncModel() {
    const translation = this.body.translation();
    const rotation = this.body.rotation();
    this.group.position.set(translation.x, translation.y, translation.z);
    this.group.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
  }

  updateVisualRumble(dt) {
    this.visualRumbleTime += dt * (1 + Math.min(3.2, this.speed * 0.035));
    const state = this.controller?.driveState || {};
    const surfaceRumble = ['grass', 'sand', 'shore'].includes(this.surface?.id) && this.controller.groundedWheels > 1
      ? Math.min(0.006, this.speed * 0.00018)
      : 0;
    const rumble = state.burnout
      ? 0.022
      : state.wheelie
        ? 0.012
        : Math.min(0.008, this.speed * 0.00012);
    const idle = this.speed < 1 ? 0.003 : 0;
    const amount = rumble + idle + surfaceRumble;
    const landingAge = performance.now() * 0.001 - this.lastLandingAt;
    const landingRumble = landingAge < 0.28
      ? (1 - landingAge / 0.28) * this.lastLandingIntensity * 0.012
      : 0;
    const totalAmount = amount + landingRumble;
    this.modelRoot.position.set(
      0,
      VISUAL_Y_OFFSET + Math.sin(this.visualRumbleTime * 35) * totalAmount,
      0
    );
    this.modelRoot.rotation.set(
      Math.sin(this.visualRumbleTime * 22) * totalAmount * 0.18,
      0,
      Math.sin(this.visualRumbleTime * 29) * totalAmount * 0.12
    );
  }

  updateWheelVisuals(dt) {
    for (const wheel of this.wheels) {
      wheel.rotation.x += this.controller.speed * dt * 4.2;
    }
    for (const pivot of this.frontWheels) {
      pivot.rotation.y = this.controller.steering;
    }
  }

  updateVehicleLights(input, state) {
    const braking = input.actions.brake || input.actions.handbrake || (input.actions.backward && this.controller.localSpeed > 1);
    const reversing = input.actions.backward && this.controller.localSpeed < -0.5;
    for (const light of this.brakeLights) {
      light.intensity = braking ? 2.2 : state.burnout ? 1.1 : 0.35;
      light.distance = braking ? 10 : 6;
    }
    for (const light of this.reverseLights) {
      light.intensity = reversing ? 1.4 : 0;
    }
    for (const light of this.boostLights) {
      light.intensity = state.boost ? 2.4 : state.wheelie ? 0.8 : 0;
    }
  }

  spawnTrail(boosting, drifting = false, surface = this.surface) {
    const currentSurface = normalizeSurface(surface);
    const rear = new THREE.Vector3(0, 0.2, -2.6).applyQuaternion(this.group.quaternion).add(this.group.position);
    const spawned = this.spawnEffect('trail', {
      position: new THREE.Vector3(
        rear.x + (Math.random() - 0.5) * 0.7,
        Math.max(0.25, rear.y),
        rear.z + (Math.random() - 0.5) * 0.7
      ),
      velocity: new THREE.Vector3((Math.random() - 0.5) * 0.28, 0.16 + Math.random() * 0.18, (Math.random() - 0.5) * 0.28),
      quaternion: this.group.quaternion,
      scale: boosting ? 1.42 : drifting ? 1.18 : 0.94,
      stretch: boosting ? [1.2, 1.2, 1.8] : [1, 1, 1],
      growth: boosting ? 1.2 : 0.9,
      life: boosting ? 0.46 : drifting ? 0.38 : 0.28,
      color: boosting ? 0xff9a4c : drifting ? (currentSurface.skidColor ?? 0xcfd4cf) : (currentSurface.dustColor ?? 0x6f6250)
    });
    if (spawned) {
      this.recordSurfaceEffect('surfaceTrail', currentSurface);
      this.emitSurfaceTrailMist(currentSurface, boosting, drifting);
    }
  }

  emitSurfaceTrailMist(surface, boosting, drifting) {
    if (boosting || drifting || !SOFT_SURFACES.has(surface.id)) return;
    this.surfaceTrailDustCounter[surface.id] = (this.surfaceTrailDustCounter[surface.id] || 0) + 1;
    const cadence = surface.id === 'shore' ? 6 : surface.id === 'sand' ? 10 : 14;
    if (this.surfaceTrailDustCounter[surface.id] % cadence === 0) {
      this.spawnRearSmoke(false, surface, surface.id === 'shore' ? 0.52 : 0.48, 'surface');
    }
  }

  spawnRearSmoke(burnout = false, surface = this.surface, intensity = 1, source = burnout ? 'burnout' : 'wheelie') {
    const currentSurface = normalizeSurface(surface);
    const smokeColor = burnout
      ? mixHex(currentSurface.dustColor ?? 0xded8cb, 0xded8cb, 0.58)
      : mixHex(currentSurface.dustColor ?? 0xc9c2b5, 0xc9c2b5, 0.42);
    const rearOffsets = [-0.88, 0.88];
    for (const side of rearOffsets) {
      const local = new THREE.Vector3(side, -0.42, -1.78);
      const position = local.applyQuaternion(this.group.quaternion).add(this.group.position);
      const spawned = this.spawnEffect('smoke', {
        position: new THREE.Vector3(
          position.x + (Math.random() - 0.5) * 0.36,
          Math.max(0.2, position.y),
          position.z + (Math.random() - 0.5) * 0.36
        ),
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.38, 0.22 + Math.random() * 0.22, (Math.random() - 0.5) * 0.38),
        quaternion: this.group.quaternion,
        scale: (burnout ? 1.25 : 0.92) * intensity,
        stretch: [1, 1, 1],
        growth: burnout ? 1.75 : 1.25,
        gravity: 0.18,
        life: (burnout ? 0.72 : 0.42) * THREE.MathUtils.lerp(0.82, 1, intensity),
        color: smokeColor
      });
      if (spawned) {
        this.recordSurfaceEffect('surfaceSmoke', currentSurface);
        if (burnout || source === 'burnout') {
          this.effectTotals.burnoutSmoke += 1;
        } else if (source === 'surface') {
          this.effectTotals.surfaceDustSmoke += 1;
        } else {
          this.effectTotals.wheelieSmoke += 1;
        }
      }
    }
  }

  spawnBoostFlame() {
    for (const side of [-0.48, 0.48]) {
      const local = new THREE.Vector3(side, -0.35, -2.74);
      const position = local.applyQuaternion(this.group.quaternion).add(this.group.position);
      const quaternion = this.group.quaternion.clone();
      quaternion.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2));
      this.spawnEffect('boost', {
        position,
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.12, 0.06, (Math.random() - 0.5) * 0.12),
        quaternion,
        scale: 1.0,
        stretch: [1, 1.28, 1],
        growth: 2.3,
        life: 0.18,
        color: 0xff9a4c
      });
    }
  }

  spawnLandingDust(intensity, surface = this.surface) {
    const currentSurface = normalizeSurface(surface);
    const count = Math.min(8, Math.max(3, Math.round(3 + intensity * 4)));
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.25;
      const radius = 0.55 + Math.random() * 1.2;
      const spawned = this.spawnEffect('smoke', {
        position: new THREE.Vector3(
          this.group.position.x + Math.cos(angle) * radius,
          Math.max(0.22, this.group.position.y - 0.72),
          this.group.position.z + Math.sin(angle) * radius
        ),
        velocity: new THREE.Vector3(
          Math.cos(angle) * (0.34 + intensity * 0.24),
          0.18 + Math.random() * 0.22,
          Math.sin(angle) * (0.34 + intensity * 0.24)
        ),
        quaternion: this.group.quaternion,
        scale: 0.8 + intensity * 0.45 + Math.random() * 0.35,
        stretch: [1, 0.75, 1],
        growth: 1.1,
        gravity: 0.12,
        life: 0.34 + intensity * 0.16,
        color: currentSurface.dustColor ?? 0xd4c8b6
      });
      if (spawned) {
        this.effectTotals.landingDust += 1;
        this.recordSurfaceEffect('surfaceSmoke', currentSurface);
      }
    }
  }

  spawnSkidMark(surface = this.surface) {
    const currentSurface = normalizeSurface(surface);
    if (currentSurface.skidMarks === false) return;
    for (const side of [-0.82, 0.82]) {
      const local = new THREE.Vector3(side, -0.84, -1.56);
      const position = local.applyQuaternion(this.group.quaternion).add(this.group.position);
      const spawned = this.spawnEffect('skid', {
        position: new THREE.Vector3(position.x, 0.17, position.z),
        velocity: new THREE.Vector3(),
        rotationY: this.heading,
        scale: 1,
        stretch: [1, 1, 1],
        growth: 0,
        life: 4.5,
        color: currentSurface.skidColor ?? 0x161410,
        fadeScale: true
      });
      if (spawned) this.recordSurfaceEffect('surfaceSkid', currentSurface);
    }
  }

  updateTrails(dt) {
    this.updateEffectPools(dt);
  }

  spawnEffect(poolName, options) {
    const pool = this.effectPools[poolName];
    if (!pool) return false;
    const index = pool.cursor;
    pool.cursor = (pool.cursor + 1) % pool.items.length;
    const item = pool.items[index];
    item.active = true;
    item.life = options.life;
    item.maxLife = options.life;
    item.position.copy(options.position);
    item.velocity.copy(options.velocity || new THREE.Vector3());
    if (options.quaternion) {
      item.quaternion.copy(options.quaternion);
    } else {
      item.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), options.rotationY || 0);
    }
    item.scale = options.scale ?? 1;
    item.stretch.set(...(options.stretch || [1, 1, 1]));
    item.growth = options.growth || 0;
    item.gravity = options.gravity || 0;
    item.fadeScale = options.fadeScale !== false;
    pool.mesh.setColorAt(index, this.effectColor.setHex(options.color || 0xffffff));
    if (pool.mesh.instanceColor) pool.mesh.instanceColor.needsUpdate = true;
    this.effectTotals[poolName] += 1;
    return true;
  }

  updateEffectPools(dt) {
    for (const pool of Object.values(this.effectPools)) {
      let activeCount = 0;
      for (let index = 0; index < pool.items.length; index += 1) {
        const item = pool.items[index];
        if (!item.active) continue;
        item.life -= dt;
        if (item.life <= 0) {
          item.active = false;
          this.hideEffectInstance(pool.mesh, index);
          continue;
        }

        item.position.addScaledVector(item.velocity, dt);
        if (item.gravity) item.velocity.y -= item.gravity * dt;
        item.scale *= 1 + item.growth * dt;
        const fade = item.fadeScale ? THREE.MathUtils.clamp(item.life / item.maxLife, 0.04, 1) : 1;
        this.effectDummy.position.copy(item.position);
        this.effectDummy.quaternion.copy(item.quaternion);
        this.effectDummy.scale.set(
          item.stretch.x * item.scale * fade,
          item.stretch.y * item.scale * fade,
          item.stretch.z * item.scale * fade
        );
        this.effectDummy.updateMatrix();
        pool.mesh.setMatrixAt(index, this.effectDummy.matrix);
        activeCount += 1;
      }
      pool.activeCount = activeCount;
      pool.mesh.instanceMatrix.needsUpdate = true;
    }
  }

  hideEffectInstance(mesh, index) {
    this.effectDummy.position.set(0, -1000, 0);
    this.effectDummy.rotation.set(0, 0, 0);
    this.effectDummy.scale.set(0, 0, 0);
    this.effectDummy.updateMatrix();
    mesh.setMatrixAt(index, this.effectDummy.matrix);
  }

  getEffectStats() {
    return {
      spawnedTrail: this.effectTotals.trail,
      spawnedSmoke: this.effectTotals.smoke,
      spawnedBoost: this.effectTotals.boost,
      spawnedSkid: this.effectTotals.skid,
      landingDust: this.effectTotals.landingDust,
      burnoutSmoke: this.effectTotals.burnoutSmoke,
      wheelieSmoke: this.effectTotals.wheelieSmoke,
      surfaceDustSmoke: this.effectTotals.surfaceDustSmoke,
      surfaceTrail: { ...this.effectTotals.surfaceTrail },
      surfaceSmoke: { ...this.effectTotals.surfaceSmoke },
      surfaceSkid: { ...this.effectTotals.surfaceSkid },
      activeTrail: this.effectPools.trail?.activeCount || 0,
      activeSmoke: this.effectPools.smoke?.activeCount || 0,
      activeBoost: this.effectPools.boost?.activeCount || 0,
      activeSkid: this.effectPools.skid?.activeCount || 0
    };
  }

  recordSurfaceEffect(counterName, surface) {
    const id = normalizeSurface(surface).id;
    this.effectTotals[counterName][id] = (this.effectTotals[counterName][id] || 0) + 1;
  }

  boostFromPad(pad) {
    if (!pad || this.lastBoostPad === pad.id) return false;
    const velocity = this.body.linvel();
    const current = new THREE.Vector3(velocity.x, 0, velocity.z);
    let direction = current.lengthSq() > 1 ? current.normalize() : new THREE.Vector3(0, 0, 1).applyQuaternion(this.group.quaternion).normalize();
    if (!this.controller.boost(direction, 26)) return false;
    this.lastBoostPad = pad.id;
    this.achievements.unlock('boost_pad');
    this.audio.click(940);
    this.audio.sweep?.(140, 720, 0.2, 0.04);
    window.setTimeout(() => {
      if (this.lastBoostPad === pad.id) this.lastBoostPad = null;
    }, 900);
    return true;
  }

  respawn(position = START, heading = 0) {
    this.body.setTranslation({ x: position.x, y: position.y, z: position.z }, true);
    this.body.setRotation(yawQuaternion(heading), true);
    this.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    this.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    this.controller?.resetTransientState();
    this.speed = 0;
    this.airborneTime = 0;
    this.wasAirborne = false;
    this.lastAirborneVerticalSpeed = 0;
    this.surfaceDustAccumulator = 0;
    this.handbrakeAudioCooldown = 0;
    this.surfaceAudioCooldown = 0;
    this.lastAudioState = {
      boost: false,
      burnout: false,
      wheelie: false,
      handbrake: false,
      surface: DEFAULT_SURFACE.id
    };
    this.surfaceTrailDustCounter = makeSurfaceCounter();
    this.lastLandingIntensity = 0;
    this.lastPosition.copy(position);
    this.syncModel();
  }

  get position() {
    const t = this.body.translation();
    return new THREE.Vector3(t.x, t.y, t.z);
  }

  get heading() {
    const q = this.body.rotation();
    const quaternion = new THREE.Quaternion(q.x, q.y, q.z, q.w);
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quaternion);
    return Math.atan2(forward.x, forward.z);
  }
}

function makeSurfaceCounter() {
  return Object.fromEntries(SURFACE_IDS.map((id) => [id, 0]));
}

function normalizeSurface(surface) {
  return surface ? { ...DEFAULT_SURFACE, ...surface } : DEFAULT_SURFACE;
}

function mixHex(a, b, t) {
  const ar = (a >> 16) & 255;
  const ag = (a >> 8) & 255;
  const ab = a & 255;
  const br = (b >> 16) & 255;
  const bg = (b >> 8) & 255;
  const bb = b & 255;
  const mix = (from, to) => Math.round(from + (to - from) * t);
  return (mix(ar, br) << 16) | (mix(ag, bg) << 8) | mix(ab, bb);
}

function yawQuaternion(heading) {
  const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, heading, 0));
  return { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w };
}

function shouldKeepVehicleMeshSeparate(object) {
  if (objectHasAncestorPrefix(object, 'WheelSpin') || objectHasAncestorPrefix(object, 'WheelFront')) return true;
  const materialName = Array.isArray(object.material)
    ? object.material.map((material) => material?.name || '').join(' ')
    : object.material?.name || '';
  const meshName = object.name || '';
  return object.material?.transparent || /glass|windshield|window|wiper/i.test(`${meshName} ${materialName}`);
}

function objectHasAncestorPrefix(object, prefix) {
  let current = object;
  while (current) {
    if ((current.name || '').startsWith(prefix)) return true;
    current = current.parent;
  }
  return false;
}

function prepareVehicleMaterial(material, cache, objectName = '') {
  if (Array.isArray(material)) {
    return material.map((item) => prepareVehicleMaterial(item, cache, objectName));
  }
  if (!material) return material;
  const name = material.name || '';
  const isWindshield = objectName.includes('Windshield') && !objectName.includes('Reflection') && !objectName.includes('Wiper');
  const cacheKey = `${name}:${isWindshield ? 'windshield' : 'standard'}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  let next = material;
  if (name.includes('metallic_paint') || name.includes('cabin_paint')) {
    const isCabin = name.includes('cabin');
    next = new THREE.MeshPhysicalMaterial({
      name,
      color: isCabin ? 0xa52912 : 0xbf3514,
      metalness: isCabin ? 0.62 : 0.72,
      roughness: isCabin ? 0.33 : 0.27,
      clearcoat: 0.78,
      clearcoatRoughness: 0.2
    });
    addObjectSpacePaintGrain(next, isCabin);
  } else if (name.includes('reflective_glass') || name.includes('smoked') || name.includes('glass')) {
    next = isWindshield
      ? new THREE.MeshPhysicalMaterial({
          name,
          color: 0x182b31,
          metalness: 0.0,
          roughness: 0.045,
          clearcoat: 0.96,
          clearcoatRoughness: 0.04,
          transparent: false,
          opacity: 1,
          depthWrite: true,
          side: THREE.DoubleSide
        })
      : new THREE.MeshPhysicalMaterial({
          name,
          color: 0x29494f,
          metalness: 0.0,
          roughness: 0.06,
          clearcoat: 0.82,
          clearcoatRoughness: 0.06,
          transparent: true,
          opacity: 0.78,
          depthWrite: false,
          side: THREE.DoubleSide
        });
  }

  cache.set(cacheKey, next);
  return next;
}

function addObjectSpacePaintGrain(material, darker = false) {
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vSabrePaintPosition;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvSabrePaintPosition = position;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vSabrePaintPosition;
float sabreHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float sabreNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = sabreHash(i);
  float b = sabreHash(i + vec2(1.0, 0.0));
  float c = sabreHash(i + vec2(0.0, 1.0));
  float d = sabreHash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
float sabreFleck = sabreNoise(vSabrePaintPosition.xz * 21.0 + vSabrePaintPosition.yy * 5.0);
float sabreFine = sabreNoise(vSabrePaintPosition.xy * 58.0 + vSabrePaintPosition.zz * 4.0);
float sabreBrush = sin((vSabrePaintPosition.z + vSabrePaintPosition.y * 0.18) * 42.0) * 0.5 + 0.5;
float sabreShade = ${darker ? '0.995' : '1.02'} + sabreFleck * 0.045 + sabreFine * 0.018 + sabreBrush * 0.012;
diffuseColor.rgb *= sabreShade;
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.95, 0.20, 0.055), ${darker ? '0.08' : '0.14'});
diffuseColor.rgb += vec3(0.055, 0.018, 0.004) * sabreFine;`);
  };
  material.customProgramCacheKey = () => `sabre-object-paint-grain-${darker ? 'dark' : 'red'}`;
}
