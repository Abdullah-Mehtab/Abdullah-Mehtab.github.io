import * as THREE from 'three';

const WHEEL_OFFSETS = [
  { x: -0.88, y: -0.42, z: 1.58, front: true },
  { x: 0.88, y: -0.42, z: 1.58, front: true },
  { x: -0.88, y: -0.42, z: -1.64, front: false },
  { x: 0.88, y: -0.42, z: -1.64, front: false }
];

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
    this.stuckTimer = 0;
    this.lastCollisionSpeed = 0;
    this.driveState = { boost: false, handbrake: false, throttle: 0, slip: 0 };
    this.setupWheels();
  }

  setupWheels() {
    this.radius = 0.39;
    for (const wheel of WHEEL_OFFSETS) {
      this.controller.addWheel(
        { x: wheel.x, y: wheel.y, z: wheel.z },
        { x: 0, y: -1, z: 0 },
        { x: -1, y: 0, z: 0 },
        0.3,
        this.radius
      );
    }
    for (let i = 0; i < WHEEL_OFFSETS.length; i += 1) {
      this.controller.setWheelFrictionSlip(i, 1.82);
      this.controller.setWheelSideFrictionStiffness(i, 9.8);
      this.controller.setWheelSuspensionStiffness(i, 42);
      this.controller.setWheelSuspensionCompression(i, 9.4);
      this.controller.setWheelSuspensionRelaxation(i, 10.8);
      this.controller.setWheelMaxSuspensionTravel(i, 0.21);
      this.controller.setWheelMaxSuspensionForce(i, 360);
    }
  }

  update(input, dt) {
    const joy = input.joystick;
    const forward = input.actions.forward || joy.y < -0.22;
    const reverse = input.actions.backward || joy.y > 0.22;
    const left = input.actions.left || joy.x < -0.22;
    const right = input.actions.right || joy.x > 0.22;
    const boost = input.actions.boost && !input.actions.handbrake;
    const handbrake = input.actions.handbrake;
    const brakeInput = input.actions.brake;
    const velocity = this.body.linvel();
    const localVelocity = this.getLocalVelocity(velocity);
    this.speed = Math.hypot(velocity.x, velocity.y * 0.12, velocity.z);
    this.localSpeed = localVelocity.z;
    const horizontalSpeed = Math.hypot(velocity.x, velocity.z);
    const speedNorm = THREE.MathUtils.clamp(horizontalSpeed / 40, 0, 1);
    const rawSteer = THREE.MathUtils.clamp((left ? 1 : 0) + (right ? -1 : 0) + THREE.MathUtils.clamp(-joy.x, -1, 1), -1, 1);
    const steerLimit = THREE.MathUtils.lerp(0.54, 0.24, speedNorm) * (handbrake ? 1.22 : 1);
    const steerTarget = rawSteer * steerLimit;
    this.steering += (steerTarget - this.steering) * Math.min(1, dt * (handbrake ? 10.5 : 7.8));

    const throttleTarget = forward ? 1 : reverse ? -0.58 : 0;
    const throttleRate = throttleTarget === 0 ? 4.4 : 6.6;
    this.throttle += (throttleTarget - this.throttle) * Math.min(1, dt * throttleRate);

    const topSpeed = boost ? 52 : 34;
    const reverseTopSpeed = 13;
    const top = this.throttle >= 0 ? topSpeed : reverseTopSpeed;
    const overflow = Math.max(0, Math.abs(this.localSpeed) - top);
    const speedRatio = THREE.MathUtils.clamp(Math.abs(this.localSpeed) / top, 0, 1.25);
    const launchBonus = this.throttle > 0 && this.localSpeed < 5 ? 1.34 : 1;
    const engineBase = this.throttle >= 0 ? (boost ? 470 : 258) : 124;
    let engine = this.throttle * engineBase * launchBonus * (1 - Math.min(0.82, speedRatio * 0.72));
    engine /= 1 + overflow * 0.36;
    if (boost && forward && horizontalSpeed > 3 && this.groundedWheels > 1) {
      this.applyHeldBoost(dt, velocity);
    }

    const changingDirection = (forward && this.localSpeed < -1.4) || (reverse && this.localSpeed > 1.4);
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
      this.controller.setWheelFrictionSlip(i, this.getWheelSlip(isFront, handbrake, boost));
      this.controller.setWheelSideFrictionStiffness(i, this.getWheelSideFriction(isFront, handbrake));
    }
    this.controller.updateVehicle(Math.min(dt, 1 / 45));
    this.updateContactState();
    this.applyDriftAssist(rawSteer, handbrake, dt);
    this.stabilizeOnGround(handbrake);
    this.applyAeroGrip(dt, handbrake);
    this.applyStuckRecovery({ forward, reverse, rawSteer }, dt);
    this.limitChaos();
    this.lastCollisionSpeed = horizontalSpeed;
    this.boostCooldown = Math.max(0, this.boostCooldown - dt);
    this.driveState = {
      boost,
      handbrake,
      throttle: this.throttle,
      slip: handbrake && this.speed > 5 ? THREE.MathUtils.clamp(this.speed / 24, 0, 1) : 0
    };
    return { boost, handbrake, grounded: this.groundedWheels > 1 };
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
    if (this.boostCooldown > 0) return;
    const mass = this.body.mass();
    this.body.applyImpulse({ x: direction.x * strength * mass, y: 0.08 * mass, z: direction.z * strength * mass }, true);
    this.boostCooldown = 0.5;
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
    const maxUp = this.groundedWheels > 1 ? 5.4 : 10;
    if (velocity.y > maxUp) {
      this.body.setLinvel({ x: velocity.x, y: maxUp, z: velocity.z }, true);
    }
    const angular = this.body.angvel();
    this.body.setAngvel({
      x: THREE.MathUtils.clamp(angular.x, -2.4, 2.4),
      y: THREE.MathUtils.clamp(angular.y, -4.2, 4.2),
      z: THREE.MathUtils.clamp(angular.z, -2.4, 2.4)
    }, true);
  }

  stabilizeOnGround(handbrake = false) {
    if (this.groundedWheels < 2) return;
    const angular = this.body.angvel();
    const q = this.body.rotation();
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(new THREE.Quaternion(q.x, q.y, q.z, q.w));
    const pitchRollCorrection = this.body.mass() * (handbrake ? 0.5 : 0.76);
    this.body.applyTorqueImpulse({
      x: (-angular.x * 0.68 - up.z * 0.96) * pitchRollCorrection,
      y: -angular.y * this.body.mass() * (handbrake ? 0.006 : 0.016),
      z: (-angular.z * 0.68 + up.x * 0.96) * pitchRollCorrection
    }, true);
    if (this.speed > 5) {
      this.body.applyImpulse({ x: 0, y: -Math.min(0.92, this.speed * 0.02) * this.body.mass(), z: 0 }, true);
    }
  }

  applyAeroGrip(dt, handbrake = false) {
    if (this.groundedWheels < 2) return;
    const mass = this.body.mass();
    const downforce = Math.min(2.45, 0.48 + this.speed * 0.032) * mass * (handbrake ? 0.78 : 1);
    this.body.applyImpulse({ x: 0, y: -downforce * Math.min(1, dt * 60) * 0.022, z: 0 }, true);
  }

  getWheelSlip(isFront, handbrake, boost) {
    if (handbrake) return isFront ? 1.7 : 0.86;
    return boost ? 2.08 : 1.86;
  }

  getWheelSideFriction(isFront, handbrake) {
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
    const force = mass * 0.23 * Math.min(1, dt * 60);
    this.body.applyImpulse({ x: direction.x * force, y: -0.01 * mass, z: direction.z * force }, true);
  }

  applyDriftAssist(rawSteer, handbrake, dt) {
    if (!handbrake || this.groundedWheels < 2 || Math.abs(rawSteer) < 0.12 || this.speed < 5) return;
    const mass = this.body.mass();
    const impulseScale = Math.min(1, dt * 60);
    this.body.applyTorqueImpulse({ x: 0, y: -rawSteer * mass * 0.34 * impulseScale, z: 0 }, true);
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
