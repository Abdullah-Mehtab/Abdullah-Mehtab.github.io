import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VehicleController } from '../physics/VehicleController.js';
import { ISLAND_RADIUS, WORLD_HALF_SIZE } from '../world/worldData.js';
import sabreTurboModelUrl from '../../assets/models/vehicles/sabre-turbo.glb?url';

const START = new THREE.Vector3(10, 1.08, 27);
const VISUAL_Y_OFFSET = -0.88;

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
    this.trails = [];
    this.skidMarks = [];
    this.trailGeometry = new THREE.SphereGeometry(0.08, 8, 5);
    this.smokeGeometry = new THREE.SphereGeometry(0.16, 10, 6);
    this.skidGeometry = new THREE.BoxGeometry(0.26, 0.012, 2.2);
    this.boostGeometry = new THREE.ConeGeometry(0.18, 0.9, 8);
    this.createBody();
    this.createLights();
    this.loadVehicleModel();
    this.scene.add(this.group);
    this.respawn();
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
    this.speed = this.controller.speed;
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

    this.trackDistance();
    this.syncModel();
    this.updateVehicleLights(input, state);
    this.updateVisualRumble(dt);
    this.updateWheelVisuals(dt);
    this.updateTrails(dt);
    if (state.burnout) this.spawnRearSmoke(true);
    if (state.wheelie && this.controller.speed > 4) this.spawnRearSmoke(false);
    if (state.boost && this.controller.speed > 8) this.spawnBoostFlame();
    if (state.handbrake && this.controller.speed > 6) this.spawnSkidMark();
    if (this.controller.speed > 10 || (state.handbrake && this.controller.speed > 4)) this.spawnTrail(state.boost, state.handbrake);
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

  syncModel() {
    const translation = this.body.translation();
    const rotation = this.body.rotation();
    this.group.position.set(translation.x, translation.y, translation.z);
    this.group.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
  }

  updateVisualRumble(dt) {
    this.visualRumbleTime += dt * (1 + Math.min(3.2, this.speed * 0.035));
    const state = this.controller?.driveState || {};
    const rumble = state.burnout
      ? 0.022
      : state.wheelie
        ? 0.012
        : Math.min(0.008, this.speed * 0.00012);
    const idle = this.speed < 1 ? 0.003 : 0;
    const amount = rumble + idle;
    this.modelRoot.position.set(
      0,
      VISUAL_Y_OFFSET + Math.sin(this.visualRumbleTime * 35) * amount,
      0
    );
    this.modelRoot.rotation.set(
      Math.sin(this.visualRumbleTime * 22) * amount * 0.18,
      0,
      Math.sin(this.visualRumbleTime * 29) * amount * 0.12
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

  spawnTrail(boosting, drifting = false) {
    if (this.trails.length > 45) return;
    const rear = new THREE.Vector3(0, 0.2, -2.6).applyQuaternion(this.group.quaternion).add(this.group.position);
    const particle = new THREE.Mesh(
      this.trailGeometry,
      new THREE.MeshBasicMaterial({
        color: boosting ? 0xff9a4c : drifting ? 0xcfd4cf : 0x6f6250,
        transparent: true,
        opacity: boosting ? 0.18 : drifting ? 0.16 : 0.09,
        depthWrite: false
      })
    );
    particle.position.set(rear.x + (Math.random() - 0.5) * 0.7, Math.max(0.25, rear.y), rear.z + (Math.random() - 0.5) * 0.7);
    this.scene.add(particle);
    this.trails.push({
      mesh: particle,
      life: boosting ? 0.46 : drifting ? 0.38 : 0.28,
      velocity: new THREE.Vector3((Math.random() - 0.5) * 0.28, 0.16 + Math.random() * 0.18, (Math.random() - 0.5) * 0.28)
    });
  }

  spawnRearSmoke(burnout = false) {
    if (this.trails.length > 82) return;
    const rearOffsets = [-0.88, 0.88];
    for (const side of rearOffsets) {
      const local = new THREE.Vector3(side, -0.42, -1.78);
      const position = local.applyQuaternion(this.group.quaternion).add(this.group.position);
      const particle = new THREE.Mesh(
        this.smokeGeometry,
        new THREE.MeshBasicMaterial({
          color: burnout ? 0xded8cb : 0xc9c2b5,
          transparent: true,
          opacity: burnout ? 0.28 : 0.16,
          depthWrite: false
        })
      );
      particle.position.set(
        position.x + (Math.random() - 0.5) * 0.36,
        Math.max(0.2, position.y),
        position.z + (Math.random() - 0.5) * 0.36
      );
      this.scene.add(particle);
      this.trails.push({
        mesh: particle,
        life: burnout ? 0.72 : 0.42,
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.38, 0.22 + Math.random() * 0.22, (Math.random() - 0.5) * 0.38)
      });
    }
  }

  spawnBoostFlame() {
    if (this.trails.length > 96) return;
    for (const side of [-0.48, 0.48]) {
      const local = new THREE.Vector3(side, -0.35, -2.74);
      const position = local.applyQuaternion(this.group.quaternion).add(this.group.position);
      const flame = new THREE.Mesh(
        this.boostGeometry,
        new THREE.MeshBasicMaterial({
          color: 0xff9a4c,
          transparent: true,
          opacity: 0.48,
          depthWrite: false
        })
      );
      flame.position.copy(position);
      flame.quaternion.copy(this.group.quaternion);
      flame.rotateX(Math.PI / 2);
      this.scene.add(flame);
      this.trails.push({
        mesh: flame,
        life: 0.18,
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.12, 0.06, (Math.random() - 0.5) * 0.12)
      });
    }
  }

  spawnSkidMark() {
    if (this.skidMarks.length > 64) {
      const old = this.skidMarks.shift();
      this.scene.remove(old.mesh);
      old.mesh.material.dispose();
    }
    for (const side of [-0.82, 0.82]) {
      const local = new THREE.Vector3(side, -0.84, -1.56);
      const position = local.applyQuaternion(this.group.quaternion).add(this.group.position);
      const mark = new THREE.Mesh(
        this.skidGeometry,
        new THREE.MeshBasicMaterial({
          color: 0x161410,
          transparent: true,
          opacity: 0.22,
          depthWrite: false
        })
      );
      mark.name = 'VehicleSkidMark';
      mark.position.set(position.x, 0.17, position.z);
      mark.rotation.y = this.heading;
      this.scene.add(mark);
      this.skidMarks.push({ mesh: mark, life: 4.5 });
    }
  }

  updateTrails(dt) {
    for (let i = this.trails.length - 1; i >= 0; i -= 1) {
      const trail = this.trails[i];
      trail.life -= dt;
      trail.mesh.position.addScaledVector(trail.velocity, dt);
      trail.mesh.scale.multiplyScalar(1 + dt * 0.9);
      trail.mesh.material.opacity = Math.max(0, trail.life) * 0.42;
      if (trail.life <= 0) {
        this.scene.remove(trail.mesh);
        trail.mesh.material.dispose();
        this.trails.splice(i, 1);
      }
    }
    for (let i = this.skidMarks.length - 1; i >= 0; i -= 1) {
      const mark = this.skidMarks[i];
      mark.life -= dt;
      mark.mesh.material.opacity = Math.max(0, mark.life / 4.5) * 0.22;
      if (mark.life <= 0) {
        this.scene.remove(mark.mesh);
        mark.mesh.material.dispose();
        this.skidMarks.splice(i, 1);
      }
    }
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

function yawQuaternion(heading) {
  const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, heading, 0));
  return { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w };
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
