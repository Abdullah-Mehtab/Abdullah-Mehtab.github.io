import * as THREE from 'three';

export class PhysicsWorld {
  constructor(RAPIER) {
    this.RAPIER = RAPIER;
    this.world = new this.RAPIER.World({ x: 0, y: -18.5, z: 0 });
    this.accumulator = 0;
    this.fixedStep = 1 / 60;
    this.dynamicVisuals = [];
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
    this.world.createCollider(collider, body);
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
}

function toRapierQuaternion(eulerArray) {
  const quaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(eulerArray[0], eulerArray[1], eulerArray[2])
  );
  return { x: quaternion.x, y: quaternion.y, z: quaternion.z, w: quaternion.w };
}
