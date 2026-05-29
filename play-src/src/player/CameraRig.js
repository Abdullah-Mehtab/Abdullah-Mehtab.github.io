// ABOUTME: Controls the /play follow and cinematic cameras around the driving car.
// ABOUTME: Adds speed, drift, boost, wheelie, and landing response to game feel.
import * as THREE from 'three';

export class CameraRig {
  constructor(camera, vehicle, input, physics = null) {
    this.camera = camera;
    this.vehicle = vehicle;
    this.input = input;
    this.physics = physics;
    this.focus = new THREE.Vector3();
    this.smoothedTarget = new THREE.Vector3();
    this.mode = 'follow';
    this.cinematicTarget = null;
    this.cinematicPosition = null;
    this.cinematicFov = null;
    this.baseFov = camera.fov;
    this.occlusionStats = { tests: 0, hits: 0, lastHitDistance: 0, lastResolvedDistance: 0 };
  }

  setCinematic(position, target, fov = null) {
    this.mode = 'cinematic';
    this.cinematicPosition = position.clone();
    this.cinematicTarget = target.clone();
    this.cinematicFov = Number.isFinite(fov) ? fov : null;
  }

  clearCinematic() {
    this.mode = 'follow';
    this.cinematicPosition = null;
    this.cinematicTarget = null;
    this.cinematicFov = null;
  }

  update(dt) {
    if (this.mode === 'cinematic' && this.cinematicPosition && this.cinematicTarget) {
      this.camera.position.lerp(this.cinematicPosition, 1 - Math.pow(0.002, dt));
      this.smoothedTarget.lerp(this.cinematicTarget, 1 - Math.pow(0.004, dt));
      if (this.cinematicFov) {
        this.camera.fov += (this.cinematicFov - this.camera.fov) * Math.min(1, dt * 4.5);
        this.camera.updateProjectionMatrix();
      }
      this.camera.lookAt(this.smoothedTarget);
      return;
    }

    const vehiclePosition = this.vehicle.position;
    const rotation = this.vehicle.body.rotation();
    const quaternion = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quaternion).setY(0).normalize();
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(quaternion).setY(0).normalize();
    const velocity = this.vehicle.body.linvel();
    const lateralSpeed = new THREE.Vector3(velocity.x, 0, velocity.z).dot(right);
    const lateralPull = THREE.MathUtils.clamp(lateralSpeed / 12, -1.8, 1.8);
    const driveState = this.vehicle.controller?.driveState || {};
    const orbit = this.input.pointer.orbitX;
    const orbitQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), orbit);
    const cameraForward = forward.clone().applyQuaternion(orbitQuaternion);
    const speedPull = THREE.MathUtils.clamp(Math.abs(this.vehicle.speed) * 0.16, 0, 4);
    const zoom = this.input.pointer.zoom;
    const pitch = this.input.pointer.orbitY;

    const target = vehiclePosition.clone()
      .add(new THREE.Vector3(0, 1.35, 0))
      .addScaledVector(cameraForward, 4.2)
      .addScaledVector(right, lateralPull * 0.22);
    const desired = vehiclePosition.clone()
      .addScaledVector(cameraForward, (-13.5 - speedPull) * zoom)
      .addScaledVector(right, -lateralPull * (driveState.handbrake ? 1.05 : 0.58))
      .add(new THREE.Vector3(0, 7.2 + speedPull * 0.18 + pitch * 4.5, 0));
    const now = performance.now() * 0.001;
    const landingAge = now - (this.vehicle.lastLandingAt ?? -Infinity);
    const landingShake = landingAge < 0.34
      ? (1 - landingAge / 0.34) * (this.vehicle.lastLandingIntensity || 0) * 0.34
      : 0;
    const shake = (driveState.boost ? 0.18 : 0)
      + (driveState.handbrake ? 0.08 : 0)
      + (driveState.burnout ? 0.14 : 0)
      + (driveState.wheelie ? 0.1 : 0)
      + landingShake;
    if (shake > 0) {
      const t = now;
      desired.add(new THREE.Vector3(
        Math.sin(t * 31) * shake,
        Math.sin(t * 43) * shake * 0.42,
        Math.cos(t * 29) * shake
      ));
    }

    const cameraEase = 1 - Math.pow(0.001, dt);
    const targetEase = 1 - Math.pow(0.0005, dt);
    const resolvedDesired = this.resolveCameraOcclusion(target, desired);
    this.camera.position.lerp(resolvedDesired, cameraEase * 0.62);
    this.smoothedTarget.lerp(target, targetEase * 0.7);
    const fovTarget = this.baseFov
      + Math.min(6.5, Math.abs(this.vehicle.speed) * 0.12)
      + (driveState.boost ? 2.4 : 0)
      + (driveState.handbrake ? 1.2 : 0)
      + landingShake * 1.4;
    this.camera.fov += (fovTarget - this.camera.fov) * Math.min(1, dt * 4.2);
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(this.smoothedTarget);
  }

  resolveCameraOcclusion(target, desired) {
    if (!this.physics?.world || !this.physics?.RAPIER) return desired;
    const offset = desired.clone().sub(target);
    const distance = offset.length();
    if (distance < 1) return desired;

    const direction = offset.multiplyScalar(1 / distance);
    const hit = this.physics.castStaticCameraRay?.(target, direction, distance) || this.castRapierRay(target, direction, distance);

    this.occlusionStats.tests += 1;
    if (!hit || !Number.isFinite(hit.toi)) return desired;

    const resolvedDistance = Math.max(3.2, hit.toi - 1.05);
    this.occlusionStats.hits += 1;
    this.occlusionStats.lastHitDistance = Number(hit.toi.toFixed(2));
    this.occlusionStats.lastResolvedDistance = Number(resolvedDistance.toFixed(2));
    return target.clone().addScaledVector(direction, resolvedDistance);
  }

  castRapierRay(target, direction, distance) {
    const ray = new this.physics.RAPIER.Ray(
      { x: target.x, y: target.y, z: target.z },
      { x: direction.x, y: direction.y, z: direction.z }
    );
    return this.physics.world.castRay(
      ray,
      distance,
      true,
      undefined,
      undefined,
      undefined,
      this.vehicle?.body || undefined
    );
  }

  probeOcclusion(target, desired) {
    const resolved = this.resolveCameraOcclusion(target, desired);
    return {
      desiredDistance: Number(target.distanceTo(desired).toFixed(2)),
      resolvedDistance: Number(target.distanceTo(resolved).toFixed(2)),
      resolvedCloser: target.distanceTo(resolved) < target.distanceTo(desired) - 0.5,
      hits: this.occlusionStats.hits,
      tests: this.occlusionStats.tests
    };
  }

  getDebugStats() {
    return { ...this.occlusionStats };
  }
}
