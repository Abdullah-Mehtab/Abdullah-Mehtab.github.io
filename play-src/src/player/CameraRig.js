import * as THREE from 'three';

export class CameraRig {
  constructor(camera, vehicle, input) {
    this.camera = camera;
    this.vehicle = vehicle;
    this.input = input;
    this.focus = new THREE.Vector3();
    this.smoothedTarget = new THREE.Vector3();
    this.mode = 'follow';
    this.cinematicTarget = null;
    this.cinematicPosition = null;
  }

  setCinematic(position, target) {
    this.mode = 'cinematic';
    this.cinematicPosition = position.clone();
    this.cinematicTarget = target.clone();
  }

  clearCinematic() {
    this.mode = 'follow';
    this.cinematicPosition = null;
    this.cinematicTarget = null;
  }

  update(dt) {
    if (this.mode === 'cinematic' && this.cinematicPosition && this.cinematicTarget) {
      this.camera.position.lerp(this.cinematicPosition, 1 - Math.pow(0.002, dt));
      this.smoothedTarget.lerp(this.cinematicTarget, 1 - Math.pow(0.004, dt));
      this.camera.lookAt(this.smoothedTarget);
      return;
    }

    const vehiclePosition = this.vehicle.position;
    const rotation = this.vehicle.body.rotation();
    const quaternion = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quaternion).setY(0).normalize();
    const orbit = this.input.pointer.orbitX;
    const orbitQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), orbit);
    const cameraForward = forward.clone().applyQuaternion(orbitQuaternion);
    const speedPull = THREE.MathUtils.clamp(Math.abs(this.vehicle.speed) * 0.16, 0, 4);
    const zoom = this.input.pointer.zoom;
    const pitch = this.input.pointer.orbitY;

    const target = vehiclePosition.clone()
      .add(new THREE.Vector3(0, 1.35, 0))
      .addScaledVector(cameraForward, 4.2);
    const desired = vehiclePosition.clone()
      .addScaledVector(cameraForward, (-13.5 - speedPull) * zoom)
      .add(new THREE.Vector3(0, 7.2 + speedPull * 0.18 + pitch * 4.5, 0));

    const cameraEase = 1 - Math.pow(0.001, dt);
    const targetEase = 1 - Math.pow(0.0005, dt);
    this.camera.position.lerp(desired, cameraEase * 0.62);
    this.smoothedTarget.lerp(target, targetEase * 0.7);
    this.camera.lookAt(this.smoothedTarget);
  }
}
