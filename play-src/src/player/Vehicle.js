import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { WORLD_HALF_SIZE } from '../world/worldData.js';
import sabreTurboModelUrl from '../../assets/models/vehicles/sabre-turbo.glb?url';

const START = new THREE.Vector3(2, 1.45, 5.5);

export class Vehicle {
  constructor({ scene, physics, achievements, audio }) {
    this.scene = scene;
    this.physics = physics;
    this.achievements = achievements;
    this.audio = audio;
    this.RAPIER = physics.RAPIER;
    this.group = new THREE.Group();
    this.wheels = [];
    this.frontWheels = [];
    this.speed = 0;
    this.driveSpeed = 0;
    this.heading = 0;
    this.airTime = 0;
    this.lastBoostPad = null;
    this.trails = [];
    this.trailGeometry = new THREE.SphereGeometry(0.16, 8, 6);
    this.distanceAccumulator = 0;
    this.lastPosition = START.clone();
    this.steerVisual = 0;
    this.groundedFrames = 0;
    this.impactRecovery = 0;
    this.createBody();
    this.createModel();
    this.respawn();
  }

  createBody() {
    const bodyDesc = this.RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(START.x, START.y, START.z)
      .setLinearDamping(0.52)
      .setAngularDamping(2.8);
    this.body = this.physics.world.createRigidBody(bodyDesc);
    const collider = this.RAPIER.ColliderDesc
      .cuboid(1.16, 0.42, 2.76)
      .setDensity(1.4)
      .setFriction(0.92)
      .setRestitution(0.0);
    this.physics.world.createCollider(collider, this.body);
  }

  createModel() {
    this.modelRoot = new THREE.Group();
    this.modelRoot.name = 'VehicleModelRoot';
    this.group.add(this.modelRoot);
    this.addHeadlightBeams();
    this.scene.add(this.group);
    this.loadVehicleModel();
  }

  loadVehicleModel() {
    const loader = new GLTFLoader();
    loader.load(
      sabreTurboModelUrl,
      (gltf) => this.installVehicleModel(gltf.scene),
      undefined,
      (error) => {
        console.error('Vehicle model failed to load', error);
        this.createModelLoadFallback();
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
        if (object.material?.transparent) {
          object.renderOrder = 7;
        }
      }
    });
    this.modelRoot.add(model);
    this.wheels = [];
    this.frontWheels = [];
    model.traverse((object) => {
      if (object.name.startsWith('WheelMesh_')) {
        this.wheels.push(object);
      }
      if (object.name.startsWith('WheelFront')) {
        this.frontWheels.push(object);
      }
    });
  }

  createModelLoadFallback() {
    this.modelRoot.clear();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.7, 5.1),
      new THREE.MeshStandardMaterial({ color: 0x8b2b13, roughness: 0.35, metalness: 0.45 })
    );
    body.name = 'VehicleModel_Fallback';
    body.position.y = 0.65;
    body.castShadow = true;
    body.receiveShadow = true;
    this.modelRoot.add(body);
  }

  addHeadlightBeams() {
    for (const x of [-0.64, 0.64]) {
      const light = new THREE.SpotLight(0xfff0c4, 12, 36, Math.PI / 9, 0.42, 1.45);
      light.position.set(x, 0.86, 2.96);
      light.target.position.set(x, 0.35, 10);
      this.group.add(light);
      this.group.add(light.target);
    }
  }

  update(input, dt) {
    const translation = this.body.translation();
    if (translation.y < -12 || Math.abs(translation.x) > WORLD_HALF_SIZE + 16 || Math.abs(translation.z) > WORLD_HALF_SIZE + 16) {
      this.respawn();
      return;
    }

    const forward = new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading)).normalize();
    const right = new THREE.Vector3(Math.cos(this.heading), 0, -Math.sin(this.heading)).normalize();
    const linvel = this.body.linvel();
    const velocity = new THREE.Vector3(linvel.x, linvel.y, linvel.z);
    const forwardSpeed = velocity.dot(forward);
    const sideSpeed = velocity.dot(right);

    const joy = input.joystick;
    const forwardInput = input.actions.forward || joy.y < -0.22;
    const backwardInput = input.actions.backward || joy.y > 0.22;
    const leftInput = input.actions.left || joy.x < -0.22;
    const rightInput = input.actions.right || joy.x > 0.22;
    const steer = (leftInput ? 1 : 0) + (rightInput ? -1 : 0) + THREE.MathUtils.clamp(-joy.x, -1, 1);
    const boost = input.actions.boost;
    const brake = input.actions.brake;

    if (boost && Math.abs(forwardSpeed) > 2) {
      this.achievements.unlock('boost');
    }

    const engine = boost ? 66 : 44;
    const reverse = 28;
    if (forwardInput) {
      this.driveSpeed += engine * dt;
    }
    if (backwardInput) {
      this.driveSpeed -= reverse * dt;
    }
    if (!forwardInput && !backwardInput) {
      this.driveSpeed *= Math.max(0, 1 - dt * 1.35);
    }
    this.driveSpeed += (forwardSpeed - this.driveSpeed) * Math.min(1, dt * 0.55);
    this.driveSpeed = THREE.MathUtils.clamp(this.driveSpeed, -15, boost ? 48 : 34);
    const impactStall = (forwardInput || backwardInput)
      && Math.abs(this.driveSpeed) > 10
      && Math.abs(forwardSpeed) < Math.abs(this.driveSpeed) * 0.2;
    if (impactStall) {
      this.impactRecovery = 0.28;
      this.driveSpeed *= Math.max(0, 1 - dt * 7.5);
    }
    this.speed = this.driveSpeed;

    const speedFactor = THREE.MathUtils.clamp(Math.abs(this.driveSpeed) / 18, 0.28, 1.35);
    if (Math.abs(steer) > 0.03) {
      const direction = Math.sign(this.driveSpeed || 1);
      this.heading += steer * direction * speedFactor * 2.15 * dt;
    }
    this.body.setRotation(steeredQuaternion(this.heading, this.body.rotation()), true);

    if (brake) {
      this.driveSpeed *= Math.max(0, 1 - dt * 8.5);
    }

    this.impactRecovery = Math.max(0, this.impactRecovery - dt);
    const maxUpwardVelocity = this.impactRecovery > 0 ? 2.8 : 9.2;
    const verticalVelocity = THREE.MathUtils.clamp(linvel.y, -32, maxUpwardVelocity);
    const desiredVelocity = forward.clone()
      .multiplyScalar(this.driveSpeed)
      .add(right.clone().multiplyScalar(sideSpeed * (brake ? 0.22 : 0.1)));
    this.body.setLinvel({ x: desiredVelocity.x, y: verticalVelocity, z: desiredVelocity.z }, true);
    this.dampenImpactSpin();

    const grounded = translation.y < 0.92 || (translation.y < 1.75 && Math.abs(linvel.y) < 0.32);
    this.groundedFrames = grounded ? Math.min(18, this.groundedFrames + 1) : 0;
    this.airTime = grounded ? 0 : this.airTime + dt;
    if (input.consume('jump') && this.groundedFrames > 2) {
      this.impactRecovery = 0;
      this.body.setLinvel({ x: desiredVelocity.x, y: 10.4, z: desiredVelocity.z }, true);
      this.achievements.unlock('jump');
      this.audio.click(760);
    }

    if (input.consume('honk')) {
      this.audio.click(320);
      this.body.applyImpulse({ x: 0, y: 1.35, z: 0 }, true);
    }

    if (input.consume('respawn')) {
      this.respawn();
    }

    if (Math.abs(this.driveSpeed) > 12) {
      this.spawnTrail(forward, boost);
    }

    const pos = new THREE.Vector3(translation.x, translation.y, translation.z);
    const distance = pos.distanceTo(this.lastPosition);
    if (distance < 5) {
      this.distanceAccumulator += distance;
      this.achievements.addDistance(distance);
    }
    this.lastPosition.copy(pos);

    this.syncModel();
    this.updateWheels(dt, steer, this.driveSpeed);
    this.updateTrails(dt);
  }

  syncModel() {
    const translation = this.body.translation();
    const rotation = this.body.rotation();
    this.group.position.set(translation.x, translation.y, translation.z);
    this.group.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
  }

  updateWheels(dt, steer, forwardSpeed) {
    this.steerVisual += (steer * 0.42 - this.steerVisual) * Math.min(1, dt * 12);
    for (const pivot of this.frontWheels) {
      pivot.rotation.y = this.steerVisual;
    }
    for (const wheel of this.wheels) {
      wheel.rotation.x += forwardSpeed * dt * 2.4;
    }
  }

  dampenImpactSpin() {
    const velocity = this.body.linvel();
    const maxUpwardVelocity = this.impactRecovery > 0 ? 2.8 : 9.2;
    if (velocity.y > maxUpwardVelocity) {
      this.body.setLinvel({ x: velocity.x, y: maxUpwardVelocity, z: velocity.z }, true);
    }
    const angular = this.body.angvel();
    this.body.setAngvel({
      x: THREE.MathUtils.clamp(angular.x, -0.95, 0.95),
      y: THREE.MathUtils.clamp(angular.y, -1.25, 1.25),
      z: THREE.MathUtils.clamp(angular.z, -0.95, 0.95)
    }, true);
  }

  respawn(position = START, heading = 0) {
    this.body.setTranslation({ x: position.x, y: position.y, z: position.z }, true);
    this.heading = heading;
    this.body.setRotation(yawQuaternion(this.heading), true);
    this.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    this.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    this.driveSpeed = 0;
    this.speed = 0;
    this.airTime = 0;
    this.impactRecovery = 0;
    this.lastPosition.copy(position);
    this.syncModel();
  }

  spawnTrail(forward, boost) {
    if (this.trails.length > 90) return;
    const origin = this.position.addScaledVector(forward, -2.25);
    const particle = new THREE.Mesh(
      this.trailGeometry,
      new THREE.MeshBasicMaterial({
        color: boost ? 0x7cffb2 : 0x68d8ff,
        transparent: true,
        opacity: boost ? 0.38 : 0.22
      })
    );
    particle.position.set(
      origin.x + (Math.random() - 0.5) * 0.7,
      Math.max(0.22, origin.y - 0.1),
      origin.z + (Math.random() - 0.5) * 0.7
    );
    this.scene.add(particle);
    this.trails.push({
      mesh: particle,
      life: boost ? 0.55 : 0.38,
      velocity: new THREE.Vector3((Math.random() - 0.5) * 0.5, 0.45 + Math.random() * 0.28, (Math.random() - 0.5) * 0.5)
    });
  }

  updateTrails(dt) {
    for (let i = this.trails.length - 1; i >= 0; i -= 1) {
      const trail = this.trails[i];
      trail.life -= dt;
      trail.mesh.position.addScaledVector(trail.velocity, dt);
      trail.mesh.scale.multiplyScalar(1 + dt * 1.8);
      trail.mesh.material.opacity = Math.max(0, trail.life) * 0.7;
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
    const currentDirection = new THREE.Vector3(velocity.x, 0, velocity.z);
    const headingDirection = new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading)).normalize();
    const direction = currentDirection.lengthSq() > 4 ? currentDirection.normalize() : headingDirection;
    const boostSpeed = Math.max(42, Math.abs(this.driveSpeed) + 18, Math.hypot(velocity.x, velocity.z) + 20);
    this.heading = Math.atan2(direction.x, direction.z);
    this.driveSpeed = Math.max(this.driveSpeed, boostSpeed);
    this.body.setRotation(steeredQuaternion(this.heading, this.body.rotation()), true);
    this.body.setLinvel({
      x: direction.x * boostSpeed,
      y: Math.max(2.4, this.body.linvel().y + 2.6),
      z: direction.z * boostSpeed
    }, true);
    this.achievements.unlock('boost_pad');
    this.audio.click(940);
    window.setTimeout(() => {
      if (this.lastBoostPad === pad.id) this.lastBoostPad = null;
    }, 550);
  }

  get position() {
    const t = this.body.translation();
    return new THREE.Vector3(t.x, t.y, t.z);
  }
}

function yawQuaternion(heading) {
  const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, heading, 0));
  return { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w };
}

function steeredQuaternion(heading, currentRotation) {
  const current = new THREE.Quaternion(currentRotation.x, currentRotation.y, currentRotation.z, currentRotation.w);
  const euler = new THREE.Euler().setFromQuaternion(current, 'YXZ');
  const preservedPitch = THREE.MathUtils.clamp(euler.x, -0.55, 0.55);
  const preservedRoll = THREE.MathUtils.clamp(euler.z, -0.42, 0.42);
  const quaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(preservedPitch, heading, preservedRoll, 'YXZ'));
  return { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w };
}
