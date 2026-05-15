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
    this.speed = 0;
    this.groundedWheels = 0;
    this.boostCooldown = 0;
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
      this.controller.setWheelFrictionSlip(i, 1.78);
      this.controller.setWheelSideFrictionStiffness(i, 9.4);
      this.controller.setWheelSuspensionStiffness(i, 34);
      this.controller.setWheelSuspensionCompression(i, 8.2);
      this.controller.setWheelSuspensionRelaxation(i, 8.6);
      this.controller.setWheelMaxSuspensionTravel(i, 0.24);
      this.controller.setWheelMaxSuspensionForce(i, 285);
    }
  }

  update(input, dt) {
    const joy = input.joystick;
    const forward = input.actions.forward || joy.y < -0.22;
    const reverse = input.actions.backward || joy.y > 0.22;
    const left = input.actions.left || joy.x < -0.22;
    const right = input.actions.right || joy.x > 0.22;
    const boost = input.actions.boost;
    const brakeInput = input.actions.brake;

    const steerTarget = ((left ? 1 : 0) + (right ? -1 : 0) + THREE.MathUtils.clamp(-joy.x, -1, 1)) * 0.42;
    this.steering += (steerTarget - this.steering) * Math.min(1, dt * 7.5);

    const velocity = this.body.linvel();
    this.speed = Math.hypot(velocity.x, velocity.y * 0.18, velocity.z);
    const topSpeed = boost ? 31 : 22;
    const overflow = Math.max(0, this.speed - topSpeed);
    let engine = 0;
    if (forward) engine += (boost ? 218 : 132) / (1 + overflow * 0.42);
    if (reverse) engine -= 64 / (1 + overflow * 0.42);
    let brake = brakeInput ? 54 : 0.18;
    if (!forward && !reverse && this.speed < 1.8) brake = 5.0;

    for (let i = 0; i < WHEEL_OFFSETS.length; i += 1) {
      const isFront = WHEEL_OFFSETS[i].front;
      this.controller.setWheelSteering(i, isFront ? this.steering : 0);
      this.controller.setWheelBrake(i, brake);
      this.controller.setWheelEngineForce(i, engine);
    }
    this.controller.updateVehicle(Math.min(dt, 1 / 45));
    this.updateContactState();
    this.stabilizeOnGround();
    this.applyAeroGrip(dt);
    this.limitChaos();
    this.boostCooldown = Math.max(0, this.boostCooldown - dt);
    return { boost, grounded: this.groundedWheels > 1 };
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
    this.body.applyImpulse({ x: direction.x * strength * mass, y: 0.45 * mass, z: direction.z * strength * mass }, true);
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

  stabilizeOnGround() {
    if (this.groundedWheels < 2) return;
    const angular = this.body.angvel();
    const q = this.body.rotation();
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(new THREE.Quaternion(q.x, q.y, q.z, q.w));
    const pitchRollCorrection = this.body.mass() * 0.68;
    this.body.applyTorqueImpulse({
      x: (-angular.x * 0.58 - up.z * 0.84) * pitchRollCorrection,
      y: -angular.y * this.body.mass() * 0.018,
      z: (-angular.z * 0.58 + up.x * 0.84) * pitchRollCorrection
    }, true);
    if (this.speed > 5) {
      this.body.applyImpulse({ x: 0, y: -Math.min(0.74, this.speed * 0.016) * this.body.mass(), z: 0 }, true);
    }
  }

  applyAeroGrip(dt) {
    if (this.groundedWheels < 2) return;
    const mass = this.body.mass();
    const downforce = Math.min(1.55, 0.34 + this.speed * 0.024) * mass;
    this.body.applyImpulse({ x: 0, y: -downforce * Math.min(1, dt * 60) * 0.022, z: 0 }, true);
  }
}
