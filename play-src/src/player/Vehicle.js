import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VehicleController } from '../physics/VehicleController.js';
import { ISLAND_RADIUS, WORLD_HALF_SIZE } from '../world/worldData.js';
import sabreTurboModelUrl from '../../assets/models/vehicles/sabre-turbo.glb?url';

const START = new THREE.Vector3(2, 1.08, 5.5);

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
    this.group.add(this.modelRoot);
    this.wheels = [];
    this.frontWheels = [];
    this.speed = 0;
    this.airTime = 0;
    this.lastBoostPad = null;
    this.distanceAccumulator = 0;
    this.lastPosition = START.clone();
    this.trails = [];
    this.trailGeometry = new THREE.SphereGeometry(0.14, 8, 6);
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
      .cuboid(1.1, 0.28, 2.38)
      .setDensity(1.35)
      .setFriction(1.0)
      .setRestitution(0.01);
    main.setTranslation(0, -0.18, 0);
    this.physics.world.createCollider(main, this.body);
    const ballast = this.RAPIER.ColliderDesc
      .cuboid(0.94, 0.14, 1.7)
      .setDensity(2.9)
      .setFriction(1.05)
      .setRestitution(0);
    ballast.setTranslation(0, -0.54, -0.08);
    this.physics.world.createCollider(ballast, this.body);
    const roof = this.RAPIER.ColliderDesc
      .cuboid(0.66, 0.22, 0.66)
      .setDensity(0.16)
      .setFriction(0.72)
      .setRestitution(0.02);
    roof.setTranslation(0, 0.36, -0.08);
    this.physics.world.createCollider(roof, this.body);
    this.controller = new VehicleController({ physics: this.physics, body: this.body });
  }

  createLights() {
    for (const x of [-0.62, 0.62]) {
      const light = new THREE.SpotLight(0xfff0c4, 10, 34, Math.PI / 10, 0.45, 1.5);
      light.position.set(x, 0.78, 2.86);
      light.target.position.set(x, 0.32, 10);
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
        object.receiveShadow = true;
        if (object.material?.transparent) object.renderOrder = 7;
      }
    });
    this.modelRoot.add(model);
    this.wheels = [];
    this.frontWheels = [];
    model.traverse((object) => {
      if (object.name.startsWith('WheelMesh_')) this.wheels.push(object);
      if (object.name.startsWith('WheelFront')) this.frontWheels.push(object);
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
    this.updateWheelVisuals(dt);
    this.updateTrails(dt);
    if (this.controller.speed > 10) this.spawnTrail(state.boost);
  }

  postPhysics() {
    this.syncModel();
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

  updateWheelVisuals(dt) {
    for (const wheel of this.wheels) {
      wheel.rotation.x += this.controller.speed * dt * 4.2;
    }
    for (const pivot of this.frontWheels) {
      pivot.rotation.y = this.controller.steering;
    }
  }

  spawnTrail(boosting) {
    if (this.trails.length > 70) return;
    const rear = new THREE.Vector3(0, 0.2, -2.6).applyQuaternion(this.group.quaternion).add(this.group.position);
    const particle = new THREE.Mesh(
      this.trailGeometry,
      new THREE.MeshBasicMaterial({
        color: boosting ? 0xffb35c : 0xb6e6ff,
        transparent: true,
        opacity: boosting ? 0.34 : 0.18,
        depthWrite: false
      })
    );
    particle.position.set(rear.x + (Math.random() - 0.5) * 0.7, Math.max(0.25, rear.y), rear.z + (Math.random() - 0.5) * 0.7);
    this.scene.add(particle);
    this.trails.push({
      mesh: particle,
      life: boosting ? 0.6 : 0.38,
      velocity: new THREE.Vector3((Math.random() - 0.5) * 0.35, 0.35 + Math.random() * 0.25, (Math.random() - 0.5) * 0.35)
    });
  }

  updateTrails(dt) {
    for (let i = this.trails.length - 1; i >= 0; i -= 1) {
      const trail = this.trails[i];
      trail.life -= dt;
      trail.mesh.position.addScaledVector(trail.velocity, dt);
      trail.mesh.scale.multiplyScalar(1 + dt * 1.6);
      trail.mesh.material.opacity = Math.max(0, trail.life) * 0.6;
      if (trail.life <= 0) {
        this.scene.remove(trail.mesh);
        trail.mesh.material.dispose();
        this.trails.splice(i, 1);
      }
    }
  }

  boostFromPad(pad) {
    if (!pad || this.lastBoostPad === pad.id) return;
    this.lastBoostPad = pad.id;
    const velocity = this.body.linvel();
    const current = new THREE.Vector3(velocity.x, 0, velocity.z);
    let direction = current.lengthSq() > 1 ? current.normalize() : new THREE.Vector3(0, 0, 1).applyQuaternion(this.group.quaternion).normalize();
    this.controller.boost(direction, 20);
    this.achievements.unlock('boost_pad');
    this.audio.click(940);
    window.setTimeout(() => {
      if (this.lastBoostPad === pad.id) this.lastBoostPad = null;
    }, 550);
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
