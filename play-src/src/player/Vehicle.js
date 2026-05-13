import * as THREE from 'three';
import { WORLD_HALF_SIZE } from '../world/worldData.js';

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
    const red = new THREE.MeshStandardMaterial({
      color: 0xb31322,
      roughness: 0.32,
      metalness: 0.48,
      emissive: 0x260005,
      emissiveIntensity: 0.22
    });
    const stripe = new THREE.MeshStandardMaterial({ color: 0xf4f1e7, roughness: 0.28, metalness: 0.38 });
    const dark = new THREE.MeshStandardMaterial({
      color: 0x06111d,
      roughness: 0.42,
      metalness: 0.38
    });
    const chrome = new THREE.MeshStandardMaterial({ color: 0xb8c1ca, roughness: 0.22, metalness: 0.78 });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x101d2d,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.2,
      transparent: true,
      opacity: 0.72
    });
    const glow = new THREE.MeshBasicMaterial({ color: 0xffefb2 });
    const tire = new THREE.MeshStandardMaterial({ color: 0x020407, roughness: 0.74, metalness: 0.12 });

    const body = new THREE.Mesh(createCarShellGeometry(2.72, 0.72, 4.38), red);
    body.position.y = 0.64;
    body.castShadow = true;
    this.group.add(body);

    const hood = new THREE.Mesh(createCarShellGeometry(2.24, 0.34, 1.64, 0.12), red);
    hood.position.set(0, 0.95, 1.33);
    hood.castShadow = true;
    this.group.add(hood);

    const trunk = new THREE.Mesh(createCarShellGeometry(2.34, 0.3, 1.08, -0.04), red);
    trunk.position.set(0, 0.93, -1.47);
    trunk.castShadow = true;
    this.group.add(trunk);

    const frontStripe = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.035, 1.72), stripe);
    frontStripe.position.set(0, 1.105, 1.35);
    this.group.add(frontStripe);

    const centerStripe = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.04, 1.18), stripe);
    centerStripe.position.set(0, 1.03, -0.05);
    this.group.add(centerStripe);

    const rearStripe = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.035, 1.24), stripe);
    rearStripe.position.set(0, 1.08, -1.52);
    this.group.add(rearStripe);

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.78, 1.22), glass);
    cabin.position.set(0, 1.28, -0.28);
    cabin.rotation.x = -0.03;
    cabin.castShadow = true;
    this.group.add(cabin);

    const roofStripe = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, 1.0), stripe);
    roofStripe.position.set(0, 1.71, -0.28);
    this.group.add(roofStripe);

    const hoodScoop = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.16, 0.58), dark);
    hoodScoop.position.set(0, 1.24, 1.2);
    hoodScoop.castShadow = true;
    this.group.add(hoodScoop);

    const spoiler = new THREE.Mesh(new THREE.BoxGeometry(2.42, 0.12, 0.28), stripe);
    spoiler.position.set(0, 1.22, -2.14);
    spoiler.castShadow = true;
    this.group.add(spoiler);

    for (const z of [2.18, -2.18]) {
      const bumper = new THREE.Mesh(new THREE.BoxGeometry(2.36, 0.2, 0.18), chrome);
      bumper.position.set(0, 0.55, z);
      this.group.add(bumper);
    }

    for (const x of [-1.34, 1.34]) {
      for (const z of [1.32, -1.42]) {
        const arch = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.055, 8, 32, Math.PI), chrome);
        arch.position.set(x, 0.54, z);
        arch.rotation.set(0, Math.PI / 2, x > 0 ? Math.PI : 0);
        this.group.add(arch);
      }
    }

    const wheelGeometry = new THREE.CylinderGeometry(0.46, 0.46, 0.46, 24);
    const wheelPositions = [
      [-1.32, 0.34, 1.32],
      [1.32, 0.34, 1.32],
      [-1.32, 0.34, -1.42],
      [1.32, 0.34, -1.42]
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
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.13, 0.06), glow);
      lamp.position.set(x, 0.77, 2.16);
      this.group.add(lamp);

      const light = new THREE.SpotLight(0xfff0c4, 8.5, 28, Math.PI / 8, 0.42, 1.5);
      light.position.set(x, 0.82, 2.26);
      light.target.position.set(x, 0.35, 8);
      this.group.add(light);
      this.group.add(light.target);
    }

    for (const x of [-0.56, 0.56]) {
      const rearLamp = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.06), new THREE.MeshBasicMaterial({ color: 0xff253e }));
      rearLamp.position.set(x, 0.78, -2.17);
      this.group.add(rearLamp);
    }
    const underGlow = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.05, 0.06), new THREE.MeshBasicMaterial({ color: 0xff6d8d, transparent: true, opacity: 0.7 }));
    underGlow.position.set(0, 0.3, -2.12);
    this.group.add(underGlow);

    this.scene.add(this.group);
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
    this.speed = this.driveSpeed;

    const speedFactor = THREE.MathUtils.clamp(Math.abs(this.driveSpeed) / 18, 0.28, 1.35);
    if (Math.abs(steer) > 0.03) {
      const direction = Math.sign(this.driveSpeed || 1);
      this.heading += steer * direction * speedFactor * 2.15 * dt;
    }
    this.body.setRotation(yawQuaternion(this.heading), true);

    if (brake) {
      this.driveSpeed *= Math.max(0, 1 - dt * 8.5);
    }

    const desiredVelocity = forward.clone()
      .multiplyScalar(this.driveSpeed)
      .add(right.clone().multiplyScalar(sideSpeed * (brake ? 0.22 : 0.1)));
    this.body.setLinvel({ x: desiredVelocity.x, y: linvel.y, z: desiredVelocity.z }, true);

    const grounded = translation.y < 0.92 || (translation.y < 1.75 && Math.abs(linvel.y) < 0.32);
    this.groundedFrames = grounded ? Math.min(18, this.groundedFrames + 1) : 0;
    this.airTime = grounded ? 0 : this.airTime + dt;
    if (input.consume('jump') && this.groundedFrames > 2) {
      this.body.setLinvel({ x: desiredVelocity.x, y: 10.4, z: desiredVelocity.z }, true);
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

  respawn(position = START, heading = 0) {
    this.body.setTranslation({ x: position.x, y: position.y, z: position.z }, true);
    this.heading = heading;
    this.body.setRotation(yawQuaternion(this.heading), true);
    this.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    this.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
    this.driveSpeed = 0;
    this.speed = 0;
    this.airTime = 0;
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
    this.heading = Math.atan2(pad.direction.x, pad.direction.z);
    this.driveSpeed = Math.max(this.driveSpeed, 50);
    this.body.setRotation(yawQuaternion(this.heading), true);
    this.body.setLinvel({
      x: pad.direction.x * 52,
      y: Math.max(2.4, this.body.linvel().y + 2.6),
      z: pad.direction.z * 52
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

function createCarShellGeometry(width, height, depth, noseDrop = 0.04) {
  const hw = width / 2;
  const hd = depth / 2;
  const y0 = 0;
  const y1 = height;
  const taper = 0.22;
  const vertices = new Float32Array([
    -hw, y0, -hd, hw, y0, -hd, hw, y0, hd, -hw, y0, hd,
    -hw + taper, y1, -hd + 0.18, hw - taper, y1, -hd + 0.18, hw - taper, y1 - noseDrop, hd - 0.12, -hw + taper, y1 - noseDrop, hd - 0.12
  ]);
  const indices = [
    0, 1, 2, 0, 2, 3,
    4, 6, 5, 4, 7, 6,
    0, 4, 5, 0, 5, 1,
    1, 5, 6, 1, 6, 2,
    2, 6, 7, 2, 7, 3,
    3, 7, 4, 3, 4, 0
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
