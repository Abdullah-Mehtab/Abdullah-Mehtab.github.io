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
    this.trailGeometry = new THREE.SphereGeometry(0.08, 8, 5);
    this.smokeGeometry = new THREE.SphereGeometry(0.16, 10, 6);
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
    for (const x of [-0.62, 0.62]) {
      const light = new THREE.SpotLight(0xfff0c4, 4.8, 26, Math.PI / 10, 0.45, 1.6);
      light.position.set(x, 0.78 + VISUAL_Y_OFFSET, 2.86);
      light.target.position.set(x, 0.32 + VISUAL_Y_OFFSET, 10);
      this.group.add(light, light.target);
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
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = false;
        if (object.material?.transparent) object.renderOrder = 7;
      }
    });
    this.modelRoot.add(model);
    this.wheels = [];
    this.frontWheels = [];
    model.traverse((object) => {
      if (object.name.startsWith('WheelFront') || object.name.startsWith('WheelRear')) {
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
    this.updateVisualRumble(dt);
    this.updateWheelVisuals(dt);
    this.updateTrails(dt);
    if (state.burnout) this.spawnRearSmoke(true);
    if (state.wheelie && this.controller.speed > 4) this.spawnRearSmoke(false);
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
