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
      .cuboid(1.14, 0.42, 2.28)
      .setDensity(1.4)
      .setFriction(0.92)
      .setRestitution(0.12);
    this.physics.world.createCollider(collider, this.body);
  }

  createModel() {
    const paint = new THREE.MeshPhysicalMaterial({
      color: 0x8e2f17,
      roughness: 0.26,
      metalness: 0.5,
      clearcoat: 0.58,
      clearcoatRoughness: 0.18,
      emissive: 0x160402,
      emissiveIntensity: 0.1
    });
    const paintDark = new THREE.MeshPhysicalMaterial({
      color: 0x5f1c10,
      roughness: 0.34,
      metalness: 0.42,
      clearcoat: 0.42,
      clearcoatRoughness: 0.22
    });
    const stripe = new THREE.MeshStandardMaterial({ color: 0xe8dfca, roughness: 0.28, metalness: 0.22 });
    const dark = new THREE.MeshStandardMaterial({
      color: 0x071018,
      roughness: 0.42,
      metalness: 0.38
    });
    const chrome = new THREE.MeshStandardMaterial({ color: 0xc8ced0, roughness: 0.2, metalness: 0.82 });
    const grille = new THREE.MeshStandardMaterial({ color: 0x15191d, roughness: 0.42, metalness: 0.64 });
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x132235,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.12,
      transparent: true,
      opacity: 0.66,
      side: THREE.DoubleSide
    });
    const glow = new THREE.MeshBasicMaterial({ color: 0xfff3cf });
    const tire = new THREE.MeshStandardMaterial({ color: 0x020407, roughness: 0.74, metalness: 0.12 });
    const hubcap = new THREE.MeshStandardMaterial({ color: 0xaeb4b8, roughness: 0.18, metalness: 0.82 });
    const rubberLine = new THREE.MeshBasicMaterial({ color: 0x8f989b });

    const add = (geometry, material, position, rotation = [0, 0, 0]) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.group.add(mesh);
      return mesh;
    };

    add(createMuscleBodyGeometry(), paint, [0, 0.28, 0]);
    add(createHoodGeometry(), paint, [0, 0.94, 1.35]);
    add(createTrunkGeometry(), paint, [0, 0.91, -1.55]);
    add(createFastbackGeometry(), paint, [0, 1.03, -0.32]);

    add(new THREE.BoxGeometry(0.42, 0.035, 2.7), stripe, [0, 1.135, 1.45], [-0.045, 0, 0]);
    add(new THREE.BoxGeometry(0.38, 0.032, 1.08), stripe, [0, 1.765, -0.36], [-0.02, 0, 0]);
    add(new THREE.BoxGeometry(0.42, 0.035, 1.78), stripe, [0, 1.075, -1.72], [0.035, 0, 0]);

    add(createWindshieldGeometry(), glass, [0, 1.52, 0.43]);
    add(createRearWindowGeometry(), glass, [0, 1.45, -1.14]);
    for (const side of [-1, 1]) {
      const sideGlass = add(createSideWindowGeometry(side), glass, [0, 1.48, -0.35]);
      sideGlass.renderOrder = 2;
      add(new THREE.BoxGeometry(0.05, 0.42, 1.62), paintDark, [side * 0.86, 1.52, -0.4], [0, 0.03 * side, 0]);
      add(new THREE.BoxGeometry(0.07, 0.07, 0.38), chrome, [side * 1.28, 1.14, 0.48], [0, side * 0.16, 0]);
      add(new THREE.BoxGeometry(0.09, 0.07, 0.32), chrome, [side * 1.26, 0.98, -0.52]);
      add(new THREE.BoxGeometry(0.06, 0.36, 0.04), dark, [side * 1.19, 1.05, -0.2]);
      add(new THREE.BoxGeometry(0.05, 0.04, 4.58), chrome, [side * 1.2, 0.72, 0.02]);
    }

    add(new THREE.BoxGeometry(2.1, 0.42, 0.16), grille, [0, 0.82, 2.76]);
    add(new THREE.BoxGeometry(2.45, 0.18, 0.22), chrome, [0, 0.55, 2.9]);
    add(new THREE.BoxGeometry(2.24, 0.16, 0.18), chrome, [0, 0.54, -2.86]);
    add(new THREE.BoxGeometry(1.95, 0.06, 0.08), chrome, [0, 0.98, 2.84]);
    add(new THREE.BoxGeometry(1.75, 0.05, 0.06), chrome, [0, 1.02, -2.78]);

    for (const x of [-0.72, -0.44, 0.44, 0.72]) {
      const lamp = add(new THREE.CylinderGeometry(0.13, 0.13, 0.045, 24), glow, [x, 0.86, 2.86], [Math.PI / 2, 0, 0]);
      lamp.castShadow = false;
      const ring = add(new THREE.TorusGeometry(0.145, 0.018, 8, 24), chrome, [x, 0.86, 2.89], [0, 0, 0]);
      ring.rotation.x = Math.PI / 2;
    }

    for (const x of [-0.64, 0.64]) {
      const light = new THREE.SpotLight(0xfff0c4, 12, 36, Math.PI / 9, 0.42, 1.45);
      light.position.set(x, 0.86, 2.96);
      light.target.position.set(x, 0.35, 10);
      this.group.add(light);
      this.group.add(light.target);
    }

    for (const x of [-0.62, 0.62]) {
      add(new THREE.BoxGeometry(0.34, 0.15, 0.055), new THREE.MeshBasicMaterial({ color: 0xff2b36 }), [x, 0.78, -2.92]);
      add(new THREE.BoxGeometry(0.14, 0.15, 0.055), new THREE.MeshBasicMaterial({ color: 0xffa04d }), [x * 1.42, 0.78, -2.92]);
    }

    for (const x of [-1.22, 1.22]) {
      for (const z of [1.64, -1.68]) {
        add(new THREE.TorusGeometry(0.56, 0.055, 8, 32, Math.PI), paintDark, [x, 0.52, z], [0, Math.PI / 2, x > 0 ? Math.PI : 0]);
        add(new THREE.TorusGeometry(0.54, 0.035, 8, 32, Math.PI), chrome, [x * 1.006, 0.5, z], [0, Math.PI / 2, x > 0 ? Math.PI : 0]);
      }
    }

    const wheelGeometry = new THREE.CylinderGeometry(0.52, 0.52, 0.42, 36);
    const wheelPositions = [
      [-1.24, 0.35, 1.62],
      [1.24, 0.35, 1.62],
      [-1.24, 0.35, -1.68],
      [1.24, 0.35, -1.68]
    ];
    for (let i = 0; i < wheelPositions.length; i += 1) {
      const pivot = new THREE.Group();
      pivot.position.set(...wheelPositions[i]);
      const wheel = new THREE.Mesh(wheelGeometry, tire);
      wheel.rotation.z = Math.PI / 2;
      wheel.castShadow = true;
      pivot.add(wheel);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.04, 32), hubcap);
      cap.position.x = wheelPositions[i][0] > 0 ? 0.235 : -0.235;
      cap.rotation.z = Math.PI / 2;
      pivot.add(cap);
      const whitewall = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.018, 8, 32), rubberLine);
      whitewall.position.x = wheelPositions[i][0] > 0 ? 0.238 : -0.238;
      whitewall.rotation.y = Math.PI / 2;
      pivot.add(whitewall);
      this.group.add(pivot);
      this.wheels.push(wheel);
      if (i < 2) this.frontWheels.push(pivot);
    }

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

function createMuscleBodyGeometry() {
  const vertices = new Float32Array([
    -1.08, 0.00, -2.55, 1.08, 0.00, -2.55, 1.18, 0.00, 2.56, -1.18, 0.00, 2.56,
    -1.02, 0.78, -2.42, 1.02, 0.78, -2.42, 1.04, 0.66, 2.48, -1.04, 0.66, 2.48,
    -1.22, 0.18, -1.7, -1.22, 0.18, 1.65, 1.22, 0.18, -1.7, 1.22, 0.18, 1.65
  ]);
  const indices = [
    0, 1, 2, 0, 2, 3,
    4, 6, 5, 4, 7, 6,
    0, 4, 5, 0, 5, 1,
    1, 5, 10, 1, 10, 2, 10, 5, 6, 10, 6, 2,
    2, 6, 7, 2, 7, 3,
    3, 7, 8, 3, 8, 0, 8, 7, 4, 8, 4, 0,
    8, 9, 7, 7, 9, 3,
    10, 5, 11, 11, 5, 6
  ];
  return buildGeometry(vertices, indices);
}

function createHoodGeometry() {
  const vertices = new Float32Array([
    -1.02, 0.00, -1.18, 1.02, 0.00, -1.18, 1.08, 0.00, 1.36, -1.08, 0.00, 1.36,
    -0.94, 0.20, -1.08, 0.94, 0.20, -1.08, 0.98, 0.08, 1.28, -0.98, 0.08, 1.28
  ]);
  return buildGeometry(vertices, boxIndices());
}

function createTrunkGeometry() {
  const vertices = new Float32Array([
    -1.02, 0.00, -0.92, 1.02, 0.00, -0.92, 1.06, 0.00, 0.92, -1.06, 0.00, 0.92,
    -0.96, 0.16, -0.84, 0.96, 0.16, -0.84, 0.98, 0.08, 0.86, -0.98, 0.08, 0.86
  ]);
  return buildGeometry(vertices, boxIndices());
}

function createFastbackGeometry() {
  const vertices = new Float32Array([
    -0.82, 0.00, -1.25, 0.82, 0.00, -1.25, 0.9, 0.00, 0.82, -0.9, 0.00, 0.82,
    -0.64, 0.72, -0.72, 0.64, 0.72, -0.72, 0.68, 0.58, 0.28, -0.68, 0.58, 0.28
  ]);
  return buildGeometry(vertices, boxIndices());
}

function createWindshieldGeometry() {
  const vertices = new Float32Array([
    -0.72, -0.28, 0.22, 0.72, -0.28, 0.22, 0.62, 0.24, -0.2, -0.62, 0.24, -0.2
  ]);
  return buildGeometry(vertices, [0, 1, 2, 0, 2, 3]);
}

function createRearWindowGeometry() {
  const vertices = new Float32Array([
    -0.66, -0.22, -0.08, 0.66, -0.22, -0.08, 0.55, 0.18, 0.44, -0.55, 0.18, 0.44
  ]);
  return buildGeometry(vertices, [0, 1, 2, 0, 2, 3]);
}

function createSideWindowGeometry(side) {
  const x = side * 0.9;
  const vertices = new Float32Array([
    x, -0.18, 0.62,
    x, 0.24, 0.18,
    x, 0.28, -0.78,
    x, -0.16, -1.12
  ]);
  return buildGeometry(vertices, [0, 1, 2, 0, 2, 3]);
}

function boxIndices() {
  return [
    0, 1, 2, 0, 2, 3,
    4, 6, 5, 4, 7, 6,
    0, 4, 5, 0, 5, 1,
    1, 5, 6, 1, 6, 2,
    2, 6, 7, 2, 7, 3,
    3, 7, 4, 3, 4, 0
  ];
}

function buildGeometry(vertices, indices) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
