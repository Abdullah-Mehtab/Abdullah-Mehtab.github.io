import * as THREE from 'three';

const WHEEL_OFFSETS = [
  { x: -0.88, y: -0.36, z: 1.58, front: true },
  { x: 0.88, y: -0.36, z: 1.58, front: true },
  { x: -0.88, y: -0.36, z: -1.64, front: false },
  { x: 0.88, y: -0.36, z: -1.64, front: false }
];

const WHEEL_RADIUS = 0.43;

export class VehicleController {
  constructor({ physics, body }) {
    this.physics = physics;
    this.RAPIER = physics.RAPIER;
    this.body = body;
    this.controller = physics.world.createVehicleController(body);
    this.steering = 0;
    this.throttle = 0;
    this.speed = 0;
    this.localSpeed = 0;
    this.groundedWheels = 0;
    this.boostCooldown = 0;
    this.burnoutCharge = 0;
    this.wasBurnout = false;
    this.wheelieTimer = 0;
    this.wheelieCooldown = 0;
    this.stuckTimer = 0;
    this.lastCollisionSpeed = 0;
    this.driveState = { boost: false, handbrake: false, throttle: 0, slip: 0, burnout: false, wheelie: false };
    this.setupWheels();
  }

  setupWheels() {
    this.radius = WHEEL_RADIUS;
    for (const wheel of WHEEL_OFFSETS) {
      this.controller.addWheel(
        { x: wheel.x, y: wheel.y, z: wheel.z },
        { x: 0, y: -1, z: 0 },
        { x: -1, y: 0, z: 0 },
        0.28,
        this.radius
      );
    }
    for (let i = 0; i < WHEEL_OFFSETS.length; i += 1) {
      this.controller.setWheelFrictionSlip(i, 1.82);
      this.controller.setWheelSideFrictionStiffness(i, 9.8);
      this.controller.setWheelSuspensionStiffness(i, 34);
      this.controller.setWheelSuspensionCompression(i, 12.8);
      this.controller.setWheelSuspensionRelaxation(i, 14.2);
      this.controller.setWheelMaxSuspensionTravel(i, 0.18);
      this.controller.setWheelMaxSuspensionForce(i, 430);
    }
  }

  update(input, dt) {
    const joy = input.joystick;
    const forward = input.actions.forward || joy.y < -0.22;
    const reverse = input.actions.backward || joy.y > 0.22;
    const left = input.actions.left || joy.x < -0.22;
    const right = input.actions.right || joy.x > 0.22;
    const handbrake = input.actions.handbrake;
    const brakeInput = input.actions.brake;
    const burnout = forward && (reverse || brakeInput);
    const boost = input.actions.boost && !burnout && !input.actions.handbrake;
    const velocity = this.body.linvel();
    const localVelocity = this.getLocalVelocity(velocity);
    this.speed = Math.hypot(velocity.x, velocity.y * 0.12, velocity.z);
    this.localSpeed = localVelocity.z;
    const horizontalSpeed = Math.hypot(velocity.x, velocity.z);
    const speedNorm = THREE.MathUtils.clamp(horizontalSpeed / 52, 0, 1);
    const rawSteer = THREE.MathUtils.clamp((left ? 1 : 0) + (right ? -1 : 0) + THREE.MathUtils.clamp(-joy.x, -1, 1), -1, 1);
    const steerLimit = THREE.MathUtils.lerp(0.56, 0.22, speedNorm) * (handbrake ? 1.22 : 1);
    const steerTarget = rawSteer * steerLimit;
    this.steering += (steerTarget - this.steering) * Math.min(1, dt * (handbrake ? 10.5 : 7.8));

    const throttleTarget = burnout ? 1 : forward ? 1 : reverse ? -0.58 : 0;
    const throttleRate = throttleTarget === 0 ? 4.4 : 6.6;
    this.throttle += (throttleTarget - this.throttle) * Math.min(1, dt * throttleRate);

    const topSpeed = boost ? 102 : 68;
    const reverseTopSpeed = 18;
    const top = this.throttle >= 0 ? topSpeed : reverseTopSpeed;
    const overflow = Math.max(0, Math.abs(this.localSpeed) - top);
    const speedRatio = THREE.MathUtils.clamp(Math.abs(this.localSpeed) / top, 0, 1.25);
    const launchBonus = this.throttle > 0 && this.localSpeed < 8 ? 1.62 : 1;
    const engineBase = this.throttle >= 0 ? (burnout ? 920 : boost ? 1080 : 650) : 178;
    let engine = this.throttle * engineBase * launchBonus * (1 - Math.min(0.82, speedRatio * 0.72));
    engine /= 1 + overflow * 0.36;
    if (boost && forward && horizontalSpeed > 3 && this.groundedWheels > 1) {
      this.applyHeldBoost(dt, velocity);
    }

    const changingDirection = !burnout && ((forward && this.localSpeed < -1.4) || (reverse && this.localSpeed > 1.4));
    let frontBrake = brakeInput ? 42 : 0.08;
    let rearBrake = brakeInput ? 42 : 0.08;
    if (changingDirection) {
      frontBrake = Math.max(frontBrake, 30);
      rearBrake = Math.max(rearBrake, 30);
    }
    if (handbrake) {
      rearBrake = Math.max(rearBrake, 38);
      frontBrake = Math.max(frontBrake, 2.5);
      engine *= 0.64;
    }
    if (burnout) {
      frontBrake = Math.max(frontBrake, 58);
      rearBrake = Math.max(rearBrake, 5.5);
      engine *= 1.2;
      this.burnoutCharge = Math.min(1.35, this.burnoutCharge + dt);
      this.applyBurnoutHold(dt);
    }
    const wheelieLaunch = this.wasBurnout && !burnout && forward && this.burnoutCharge > 0.22 && this.wheelieCooldown <= 0;
    if (!forward && !reverse && this.speed < 1.8) {
      frontBrake = 4.2;
      rearBrake = 4.2;
    }

    for (let i = 0; i < WHEEL_OFFSETS.length; i += 1) {
      const isFront = WHEEL_OFFSETS[i].front;
      const isRear = !isFront;
      this.controller.setWheelSteering(i, isFront ? this.steering : 0);
      this.controller.setWheelBrake(i, isRear ? rearBrake : frontBrake);
      this.controller.setWheelEngineForce(i, isRear ? engine : 0);
      this.controller.setWheelFrictionSlip(i, this.getWheelSlip(isFront, handbrake, boost, burnout));
      this.controller.setWheelSideFrictionStiffness(i, this.getWheelSideFriction(isFront, handbrake, burnout));
    }
    this.controller.updateVehicle(Math.min(dt, 1 / 45));
    this.updateContactState();
    if (wheelieLaunch) this.launchWheelie();
    this.applyDriftAssist(rawSteer, handbrake, dt);
    this.stabilizeOnGround(handbrake, rawSteer);
    this.applyAeroGrip(dt, handbrake);
    this.settleDriveNoise(rawSteer, forward || reverse, dt);
    this.applyStuckRecovery({ forward, reverse, rawSteer }, dt);
    this.limitChaos();
    this.lastCollisionSpeed = horizontalSpeed;
    this.boostCooldown = Math.max(0, this.boostCooldown - dt);
    this.wheelieCooldown = Math.max(0, this.wheelieCooldown - dt);
    this.wheelieTimer = Math.max(0, this.wheelieTimer - dt);
    if (!burnout && !wheelieLaunch) this.burnoutCharge = Math.max(0, this.burnoutCharge - dt * 1.6);
    this.driveState = {
      boost,
      handbrake,
      throttle: this.throttle,
      burnout,
      wheelie: this.wheelieTimer > 0,
      wheelieLaunch,
      burnoutCharge: this.burnoutCharge,
      slip: burnout ? 1 : handbrake && this.speed > 5 ? THREE.MathUtils.clamp(this.speed / 24, 0, 1) : 0
    };
    this.wasBurnout = burnout;
    return { boost, handbrake, burnout, wheelie: this.wheelieTimer > 0, wheelieLaunch, grounded: this.groundedWheels > 1 };
  }

  updateContactState() {
    this.groundedWheels = 0;
    for (let i = 0; i < WHEEL_OFFSETS.length; i += 1) {
      if (this.controller.wheelIsInContact(i)) this.groundedWheels += 1;
    }
  }

  jump(force = 6.2) {
    if (this.groundedWheels < 2) return false;
    this.body.applyImpulse({ x: 0, y: force * this.body.mass(), z: 0 }, true);
    this.body.applyTorqueImpulse({ x: 0.08 * this.body.mass(), y: 0, z: 0 }, true);
    return true;
  }

  boost(direction, strength = 18) {
    if (this.boostCooldown > 0) return false;
    const mass = this.body.mass();
    this.body.applyImpulse({ x: direction.x * strength * mass, y: 0.08 * mass, z: direction.z * strength * mass }, true);
    this.boostCooldown = 0.62;
    return true;
  }

  flipRecovery() {
    const q = this.body.rotation();
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(new THREE.Quaternion(q.x, q.y, q.z, q.w));
    if (up.y > 0.22) return false;
    const mass = this.body.mass();
    this.body.applyImpulse({ x: 0, y: 4.8 * mass, z: 0 }, true);
    this.body.applyTorqueImpulse({ x: 2.8 * mass, y: 0, z: 1.6 * mass }, true);
    return true;
  }

  limitChaos() {
    const velocity = this.body.linvel();
    const maxUp = this.groundedWheels > 1 ? (this.wheelieTimer > 0 ? 6.8 : 5.4) : 10;
    if (velocity.y > maxUp) {
      this.body.setLinvel({ x: velocity.x, y: maxUp, z: velocity.z }, true);
    }
    const angular = this.body.angvel();
    const pitchLimit = this.wheelieTimer > 0 ? 4.8 : 2.4;
    this.body.setAngvel({
      x: THREE.MathUtils.clamp(angular.x, -pitchLimit, pitchLimit),
      y: THREE.MathUtils.clamp(angular.y, -4.2, 4.2),
      z: THREE.MathUtils.clamp(angular.z, -2.4, 2.4)
    }, true);
  }

  stabilizeOnGround(handbrake = false, rawSteer = 0) {
    if (this.groundedWheels < 2) return;
    const angular = this.body.angvel();
    const q = this.body.rotation();
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(new THREE.Quaternion(q.x, q.y, q.z, q.w));
    const wheelie = this.wheelieTimer > 0;
    const pitchRollCorrection = this.body.mass() * (wheelie ? 0.16 : handbrake ? 0.5 : 0.76);
    this.body.applyTorqueImpulse({
      x: (-angular.x * (wheelie ? 0.18 : 0.68) - up.z * (wheelie ? 0.12 : 0.96)) * pitchRollCorrection,
      y: -angular.y * this.body.mass() * (handbrake ? 0.006 : Math.abs(rawSteer) < 0.08 ? 0.035 : 0.016),
      z: (-angular.z * 0.68 + up.x * 0.96) * pitchRollCorrection
    }, true);
    if (!wheelie && this.speed > 5) {
      this.body.applyImpulse({ x: 0, y: -Math.min(0.92, this.speed * 0.02) * this.body.mass(), z: 0 }, true);
    }
  }

  applyAeroGrip(dt, handbrake = false) {
    if (this.groundedWheels < 2) return;
    if (this.wheelieTimer > 0) return;
    const mass = this.body.mass();
    const downforce = Math.min(2.45, 0.48 + this.speed * 0.032) * mass * (handbrake ? 0.78 : 1);
    this.body.applyImpulse({ x: 0, y: -downforce * Math.min(1, dt * 60) * 0.022, z: 0 }, true);
  }

  getWheelSlip(isFront, handbrake, boost, burnout) {
    if (burnout) return isFront ? 1.55 : 0.58;
    if (handbrake) return isFront ? 1.7 : 0.86;
    return boost ? 2.18 : 1.94;
  }

  getWheelSideFriction(isFront, handbrake, burnout) {
    if (burnout) return isFront ? 11.2 : 1.45;
    if (handbrake) return isFront ? 8.4 : 2.35;
    return isFront ? 10.2 : 9.4;
  }

  getLocalVelocity(velocity) {
    const q = this.body.rotation();
    const inverse = new THREE.Quaternion(q.x, q.y, q.z, q.w).invert();
    return new THREE.Vector3(velocity.x, velocity.y, velocity.z).applyQuaternion(inverse);
  }

  getForwardVector() {
    const q = this.body.rotation();
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(new THREE.Quaternion(q.x, q.y, q.z, q.w));
    forward.y = 0;
    if (forward.lengthSq() < 0.0001) return new THREE.Vector3(0, 0, 1);
    return forward.normalize();
  }

  applyHeldBoost(dt, velocity) {
    const mass = this.body.mass();
    const current = new THREE.Vector3(velocity.x, 0, velocity.z);
    const direction = current.lengthSq() > 5 ? current.normalize() : this.getForwardVector();
    const force = mass * 0.46 * Math.min(1, dt * 60);
    this.body.applyImpulse({ x: direction.x * force, y: -0.01 * mass, z: direction.z * force }, true);
  }

  applyBurnoutHold(dt) {
    if (this.groundedWheels < 2) return;
    const velocity = this.body.linvel();
    const hold = Math.pow(0.18, Math.min(1, dt * 9));
    this.body.setLinvel({ x: velocity.x * hold, y: velocity.y, z: velocity.z * hold }, true);
    const angular = this.body.angvel();
    this.body.setAngvel({ x: angular.x * 0.76, y: angular.y * 0.74, z: angular.z * 0.76 }, true);
  }

  launchWheelie() {
    if (this.groundedWheels < 2) return false;
    const charge = THREE.MathUtils.clamp(this.burnoutCharge / 1.2, 0.24, 1);
    const mass = this.body.mass();
    const forward = this.getForwardVector();
    const q = this.body.rotation();
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(new THREE.Quaternion(q.x, q.y, q.z, q.w)).normalize();
    this.body.applyImpulse({
      x: forward.x * mass * (4.4 + charge * 8.8),
      y: mass * (0.34 + charge * 0.34),
      z: forward.z * mass * (4.4 + charge * 8.8)
    }, true);
    this.body.applyTorqueImpulse({
      x: right.x * -mass * (1.55 + charge * 2.75),
      y: right.y * -mass * (1.55 + charge * 2.75),
      z: right.z * -mass * (1.55 + charge * 2.75)
    }, true);
    this.wheelieTimer = 0.92 + charge * 0.42;
    this.wheelieCooldown = 0.85;
    this.burnoutCharge = 0;
    return true;
  }

  applyDriftAssist(rawSteer, handbrake, dt) {
    if (!handbrake || this.groundedWheels < 2 || Math.abs(rawSteer) < 0.12 || this.speed < 5) return;
    const mass = this.body.mass();
    const impulseScale = Math.min(1, dt * 60);
    this.body.applyTorqueImpulse({ x: 0, y: -rawSteer * mass * 0.34 * impulseScale, z: 0 }, true);
  }

  settleDriveNoise(rawSteer, wantsMove, dt) {
    if (this.groundedWheels < 3 || this.wheelieTimer > 0) return;
    const angular = this.body.angvel();
    const straight = wantsMove && Math.abs(rawSteer) < 0.08;
    const yawDamp = straight ? Math.pow(0.18, Math.min(1, dt * 5.2)) : Math.pow(0.42, Math.min(1, dt * 2.4));
    const pitchRollDamp = Math.pow(0.28, Math.min(1, dt * 4.5));
    const next = {
      x: Math.abs(angular.x) < 0.045 ? 0 : angular.x * pitchRollDamp,
      y: straight && Math.abs(angular.y) < 0.75 ? 0 : angular.y * yawDamp,
      z: Math.abs(angular.z) < 0.045 ? 0 : angular.z * pitchRollDamp
    };
    this.body.setAngvel(next, true);
  }

  applyStuckRecovery(intent, dt) {
    const wantsMove = intent.forward || intent.reverse;
    if (!wantsMove || this.groundedWheels < 2 || this.speed > 1.15) {
      this.stuckTimer = 0;
      return;
    }
    this.stuckTimer += dt;
    if (this.stuckTimer < 0.48) return;

    const mass = this.body.mass();
    const direction = this.getForwardVector().multiplyScalar(intent.forward ? 1 : -1);
    this.body.applyImpulse({ x: direction.x * mass * 0.7, y: mass * 0.06, z: direction.z * mass * 0.7 }, true);
    if (Math.abs(intent.rawSteer) > 0.12) {
      this.body.applyTorqueImpulse({ x: 0, y: -intent.rawSteer * mass * 0.42, z: 0 }, true);
    }
    this.stuckTimer = 0.24;
  }
}
