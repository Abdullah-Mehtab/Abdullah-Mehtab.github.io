import * as THREE from 'three';

const START = new THREE.Vector3(0, 1.25, -8);

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
    this.distanceAccumulator = 0;
    this.lastPosition = START.clone();
    this.steerVisual = 0;
    this.groundedFrames = 0;
    this.createBody();
    this.createModel();
    this.respawn();
  }

  createBody() {
    const bodyDesc = this.RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(START.x, START.y, START.z)
      .setLinearDamping(0.38)
      .setAngularDamping(1.15);
    this.body = this.physics.world.createRigidBody(bodyDesc);
    const collider = this.RAPIER.ColliderDesc
      .cuboid(1.05, 0.38, 1.72)
      .setDensity(1.4)
      .setFriction(0.92)
      .setRestitution(0.12);
    this.physics.world.createCollider(collider, this.body);
  }

  createModel() {
    const blue = new THREE.MeshStandardMaterial({
      color: 0x68d8ff,
      roughness: 0.36,
      metalness: 0.42,
      emissive: 0x0a2f44,
      emissiveIntensity: 0.28
    });
    const dark = new THREE.MeshStandardMaterial({
      color: 0x06111d,
      roughness: 0.42,
      metalness: 0.38
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x9be8ff,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.2,
      transparent: true,
      opacity: 0.62
    });
    const glow = new THREE.MeshBasicMaterial({ color: 0x7cffb2 });
    const tire = new THREE.MeshStandardMaterial({ color: 0x020407, roughness: 0.74, metalness: 0.12 });

    const body = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.72, 3.6), blue);
    body.position.y = 0.64;
    body.castShadow = true;
    this.group.add(body);

    const nose = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.36, 1.25), blue);
    nose.position.set(0, 0.94, 1.18);
    nose.castShadow = true;
    this.group.add(nose);

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.82, 1.28), glass);
    cabin.position.set(0, 1.32, -0.36);
    cabin.castShadow = true;
    this.group.add(cabin);

    const spoiler = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.12, 0.28), dark);
    spoiler.position.set(0, 1.32, -1.85);
    spoiler.castShadow = true;
    this.group.add(spoiler);

    const rack = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 0.88), dark);
    rack.position.set(0, 1.86, -0.36);
    this.group.add(rack);

    const wheelGeometry = new THREE.CylinderGeometry(0.42, 0.42, 0.42, 22);
    const wheelPositions = [
      [-1.2, 0.34, 1.18],
      [1.2, 0.34, 1.18],
      [-1.2, 0.34, -1.2],
      [1.2, 0.34, -1.2]
    ];
    for (let i = 0; i < wheelPositions.length; i += 1) {
      const pivot = new THREE.Group();
      pivot.position.set(...wheelPositions[i]);
      const wheel = new THREE.Mesh(wheelGeometry, tire);
      wheel.rotation.z = Math.PI / 2;
      wheel.castShadow = true;
      pivot.add(wheel);
      this.group.add(pivot);
      this.wheels.push(wheel);
      if (i < 2) this.frontWheels.push(pivot);
    }

    for (const x of [-0.54, 0.54]) {
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.13, 0.06), glow);
      lamp.position.set(x, 0.78, 1.84);
      this.group.add(lamp);

      const light = new THREE.SpotLight(0x9df8ff, 7.5, 25, Math.PI / 8, 0.42, 1.5);
      light.position.set(x, 0.82, 1.96);
      light.target.position.set(x, 0.35, 8);
      this.group.add(light);
      this.group.add(light.target);
    }

    const rearGlow = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.08, 0.06), new THREE.MeshBasicMaterial({ color: 0xff6d8d }));
    rearGlow.position.set(0, 0.78, -1.84);
    this.group.add(rearGlow);

    this.scene.add(this.group);
  }

  update(input, dt) {
    const translation = this.body.translation();
    if (translation.y < -12 || Math.abs(translation.x) > 92 || Math.abs(translation.z) > 92) {
      this.respawn();
      return;
    }

    const rotation = this.body.rotation();
    const quaternion = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quaternion).setY(0).normalize();
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(quaternion).setY(0).normalize();
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

    const engine = boost ? 42 : 27;
    const reverse = 22;
    if (forwardInput) {
      this.driveSpeed += engine * dt;
    }
    if (backwardInput) {
      this.driveSpeed -= reverse * dt;
    }
    if (!forwardInput && !backwardInput) {
      this.driveSpeed *= Math.max(0, 1 - dt * 1.8);
    }
    this.driveSpeed += (forwardSpeed - this.driveSpeed) * Math.min(1, dt * 2);
    this.driveSpeed = THREE.MathUtils.clamp(this.driveSpeed, -12, boost ? 34 : 24);
    this.speed = this.driveSpeed;

    const speedFactor = THREE.MathUtils.clamp(Math.abs(forwardSpeed) / 12, 0.25, 1.25);
    if (Math.abs(steer) > 0.03) {
      const direction = Math.sign(forwardSpeed || 1);
      this.body.applyTorqueImpulse({ x: 0, y: steer * direction * speedFactor * 11.5 * dt, z: 0 }, true);
    }

    if (brake) {
      this.driveSpeed *= Math.max(0, 1 - dt * 7.5);
    }

    const desiredVelocity = forward.clone()
      .multiplyScalar(this.driveSpeed)
      .add(right.clone().multiplyScalar(sideSpeed * 0.12));
    this.body.setLinvel({ x: desiredVelocity.x, y: linvel.y, z: desiredVelocity.z }, true);

    const grounded = translation.y < 1.58 && Math.abs(linvel.y) < 2.8;
    this.groundedFrames = grounded ? Math.min(12, this.groundedFrames + 1) : 0;
    if (input.consume('jump') && this.groundedFrames > 2) {
      this.body.applyImpulse({ x: 0, y: 8.5, z: 0 }, true);
      this.body.applyTorqueImpulse({ x: (Math.random() - 0.5) * 1.2, y: 0, z: steer * -1.4 }, true);
      this.achievements.unlock('jump');
      this.audio.click(760);
    }

    if (input.consume('honk')) {
      this.audio.click(320);
      this.body.applyImpulse({ x: 0, y: 2.2, z: 0 }, true);
    }

    if (input.consume('respawn')) {
      this.respawn();
    }

    const pos = new THREE.Vector3(translation.x, translation.y, translation.z);
    const distance = pos.distanceTo(this.lastPosition);
    if (distance < 5) {
      this.distanceAccumulator += distance;
      this.achievements.addDistance(distance);
    }
    this.lastPosition.copy(pos);

    this.syncModel();
    this.updateWheels(dt, steer, forwardSpeed);
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

  respawn(position = START) {
    this.body.setTranslation({ x: position.x, y: position.y, z: position.z }, true);
    this.body.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
    this.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    this.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    this.driveSpeed = 0;
    this.speed = 0;
    this.lastPosition.copy(position);
    this.syncModel();
  }

  get position() {
    const t = this.body.translation();
    return new THREE.Vector3(t.x, t.y, t.z);
  }
}
