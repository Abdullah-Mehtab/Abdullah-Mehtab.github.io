// ABOUTME: Wraps Rapier world creation, stepping, debug collider records, and visual syncing.
// ABOUTME: Keeps physics colliders auditable so invisible blockers can be found during verification.
import * as THREE from 'three';

export class PhysicsWorld {
  constructor(RAPIER) {
    this.RAPIER = RAPIER;
    this.world = new this.RAPIER.World({ x: 0, y: -18.5, z: 0 });
    this.accumulator = 0;
    this.fixedStep = 1 / 60;
    this.dynamicVisuals = [];
    this.staticColliders = [];
  }

  createFixedBox(position, size, options = {}) {
    const bodyDesc = this.RAPIER.RigidBodyDesc.fixed().setTranslation(position[0], position[1], position[2]);
    if (options.rotation) {
      bodyDesc.setRotation(toRapierQuaternion(options.rotation));
    }
    const body = this.world.createRigidBody(bodyDesc);
    const collider = this.RAPIER.ColliderDesc
      .cuboid(size[0] / 2, size[1] / 2, size[2] / 2)
      .setFriction(options.friction ?? 0.85)
      .setRestitution(options.restitution ?? 0.05);
    if (options.sensor) collider.setSensor(true);
    this.world.createCollider(collider, body);
    this.recordStaticCollider('box', position, {
      name: options.debugName || 'FixedBox',
      visualName: options.visualName || null,
      size,
      rotation: options.rotation || [0, 0, 0],
      sensor: Boolean(options.sensor)
    });
    return body;
  }

  createFixedCylinder(position, halfHeight, radius, options = {}) {
    const bodyDesc = this.RAPIER.RigidBodyDesc.fixed().setTranslation(position[0], position[1], position[2]);
    if (options.rotation) {
      bodyDesc.setRotation(toRapierQuaternion(options.rotation));
    }
    const body = this.world.createRigidBody(bodyDesc);
    const collider = this.RAPIER.ColliderDesc
      .cylinder(halfHeight, radius)
      .setFriction(options.friction ?? 0.85)
      .setRestitution(options.restitution ?? 0.04);
    if (options.sensor) collider.setSensor(true);
    this.world.createCollider(collider, body);
    this.recordStaticCollider('cylinder', position, {
      name: options.debugName || 'FixedCylinder',
      visualName: options.visualName || null,
      halfHeight,
      radius,
      rotation: options.rotation || [0, 0, 0],
      sensor: Boolean(options.sensor)
    });
    return body;
  }

  createFixedBall(position, radius, options = {}) {
    const bodyDesc = this.RAPIER.RigidBodyDesc.fixed().setTranslation(position[0], position[1], position[2]);
    const body = this.world.createRigidBody(bodyDesc);
    const collider = this.RAPIER.ColliderDesc
      .ball(radius)
      .setFriction(options.friction ?? 0.85)
      .setRestitution(options.restitution ?? 0.04);
    if (options.sensor) collider.setSensor(true);
    this.world.createCollider(collider, body);
    this.recordStaticCollider('ball', position, {
      name: options.debugName || 'FixedBall',
      visualName: options.visualName || null,
      radius,
      sensor: Boolean(options.sensor)
    });
    return body;
  }

  createFixedTrimesh(position, vertices, indices, options = {}) {
    const bodyDesc = this.RAPIER.RigidBodyDesc.fixed().setTranslation(position[0], position[1], position[2]);
    if (options.rotation) {
      bodyDesc.setRotation(toRapierQuaternion(options.rotation));
    }
    const body = this.world.createRigidBody(bodyDesc);
    const collider = this.RAPIER.ColliderDesc
      .trimesh(vertices, indices)
      .setFriction(options.friction ?? 0.85)
      .setRestitution(options.restitution ?? 0.04);
    if (options.sensor) collider.setSensor(true);
    this.world.createCollider(collider, body);
    this.recordStaticCollider('trimesh', position, {
      name: options.debugName || 'FixedTrimesh',
      visualName: options.visualName || null,
      vertices: Float32Array.from(vertices),
      indices: Uint32Array.from(indices),
      rotation: options.rotation || [0, 0, 0],
      sensor: Boolean(options.sensor)
    });
    return body;
  }

  createDynamicBox(position, size, options = {}) {
    const bodyDesc = this.RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(position[0], position[1], position[2])
      .setLinearDamping(options.linearDamping ?? 0.35)
      .setAngularDamping(options.angularDamping ?? 0.45);
    const body = this.world.createRigidBody(bodyDesc);
    const collider = this.RAPIER.ColliderDesc
      .cuboid(size[0] / 2, size[1] / 2, size[2] / 2)
      .setDensity(options.density ?? 0.55)
      .setFriction(options.friction ?? 0.75)
      .setRestitution(options.restitution ?? 0.2);
    if (options.sensor) collider.setSensor(true);
    this.world.createCollider(collider, body);
    return body;
  }

  bindVisual(body, object) {
    const translation = body.translation();
    const rotation = body.rotation();
    this.dynamicVisuals.push({
      body,
      object,
      initial: {
        translation: { x: translation.x, y: translation.y, z: translation.z },
        rotation: { x: rotation.x, y: rotation.y, z: rotation.z, w: rotation.w }
      }
    });
  }

  resetDynamicVisuals() {
    for (const item of this.dynamicVisuals) {
      item.body.setTranslation(item.initial.translation, true);
      item.body.setRotation(item.initial.rotation, true);
      item.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
      item.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
    this.syncVisuals();
  }

  step(dt, beforeStep) {
    this.accumulator += Math.min(dt, 0.05);
    let stepped = false;
    while (this.accumulator >= this.fixedStep) {
      beforeStep?.(this.fixedStep);
      this.world.step();
      this.accumulator -= this.fixedStep;
      stepped = true;
    }
    if (stepped) this.syncVisuals();
  }

  syncVisuals() {
    for (const item of this.dynamicVisuals) {
      const translation = item.body.translation();
      const rotation = item.body.rotation();
      item.object.position.set(translation.x, translation.y, translation.z);
      item.object.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
    }
  }

  recordStaticCollider(type, position, data) {
    this.staticColliders.push({
      type,
      position: [...position],
      ...data
    });
  }

  getColliderDebugData() {
    return this.staticColliders.map((collider) => ({ ...collider }));
  }
}

function toRapierQuaternion(eulerArray) {
  const quaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(eulerArray[0], eulerArray[1], eulerArray[2])
  );
  return { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w };
}
