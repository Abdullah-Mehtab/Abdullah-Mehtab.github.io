// ABOUTME: Builds the driveable stunt yard ramps, boost pads, and visual markers.
// ABOUTME: Keeps only ramp surfaces physical so yard decoration does not block the car.
import * as THREE from 'three';
import { boostPads, worldZones } from './worldData.js';
import { mergeStaticMeshesInGroup } from './StaticBatching.js';

export class StuntPark {
  constructor(world) {
    this.world = world;
  }

  build() {
    this.createYardDressing();
    this.createRamps();
    this.createBoostPads();
  }

  createYardDressing() {
    const zone = worldZones.find((item) => item.id === 'drift');
    if (!zone) return;
    const group = new THREE.Group();
    group.name = 'STUNT_Yard_Dressing';
    const baseX = zone.position[0];
    const baseZ = zone.position[2];

    this.addRunwayStripe(group, baseX - 10, baseZ - 18, 24, Math.PI / 2, 0xff9b6d);
    this.addRunwayStripe(group, baseX + 9, baseZ - 2, 18, -Math.PI / 2.6, 0xffc36a);
    this.addRunwayStripe(group, baseX - 2, baseZ + 16, 14, 0.1, 0x68d8ff);

    for (let i = 0; i < 12; i += 1) {
      const side = i % 2 === 0 ? -1 : 1;
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.9, 5), this.world.materials.warmGlow);
      cone.name = 'STUNT_slalom_cone';
      cone.position.set(baseX - 6 + i * 2.6, 0.6, baseZ + side * 4.2);
      cone.rotation.y = i * 0.7;
      group.add(cone);
    }

    for (const [dx, dz, rot] of [
      [-21, -8, 0.2],
      [-18, 10, -0.4],
      [18, -16, 0.6],
      [23, 7, -0.2],
      [4, 22, 0.1]
    ]) {
      const stack = new THREE.Group();
      stack.name = 'STUNT_tire_stack';
      for (let i = 0; i < 3; i += 1) {
        const tire = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.16, 8, 16), this.world.materials.cable);
        tire.position.y = 0.28 + i * 0.24;
        tire.rotation.x = Math.PI / 2;
        stack.add(tire);
      }
      stack.position.set(baseX + dx, 0.18, baseZ + dz);
      stack.rotation.y = rot;
      group.add(stack);
    }

    mergeStaticMeshesInGroup(group, { namePrefix: 'STUNT_yard' });
    this.world.scene.add(group);
  }

  addRunwayStripe(group, x, z, length, rotation, color) {
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.52, depthWrite: false });
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.035, length), material);
    stripe.name = 'STUNT_runway_glow';
    stripe.position.set(x, 0.22, z);
    stripe.rotation.y = rotation;
    group.add(stripe);
  }

  createRamps() {
    const zone = worldZones.find((item) => item.id === 'drift');
    if (!zone) return;
    const baseX = zone.position[0];
    const baseZ = zone.position[2];
    const ramps = [
      { id: 'cove-main-ramp', x: baseX - 14, z: baseZ - 18, y: 0.12, rot: Math.PI / 2, width: 8.8, length: 22, height: 2.1 },
      { id: 'cove-return-ramp', x: baseX + 12, z: baseZ - 2, y: 0.12, rot: -Math.PI / 2.6, width: 6.4, length: 16, height: 1.55 },
      { id: 'cove-short-hop', x: baseX - 2, z: baseZ + 16, y: 0.12, rot: 0.1, width: 5.4, length: 12, height: 1.15 }
    ];
    for (const ramp of ramps) {
      const rampShape = createRampShape(ramp.width, ramp.length, ramp.height);
      const mesh = new THREE.Mesh(rampShape.geometry, this.world.materials.stuntRamp);
      mesh.name = `STUNT_${ramp.id}`;
      mesh.position.set(ramp.x, ramp.y, ramp.z);
      mesh.rotation.y = ramp.rot;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.world.scene.add(mesh);
      this.world.ramps.push({ id: ramp.id, position: new THREE.Vector3(ramp.x, 0, ramp.z), radius: 11, triggered: false });
      this.world.physics.createFixedTrimesh([ramp.x, ramp.y, ramp.z], rampShape.vertices, rampShape.indices, {
        rotation: [0, ramp.rot, 0],
        friction: 0.92,
        restitution: 0.02
      });
      this.addGuardrails(ramp);
      this.addLandingMarkers(ramp);
    }
  }

  addGuardrails(ramp) {
    for (const side of [-1, 1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.36, ramp.length * 0.92), this.world.materials.wood);
      rail.name = `STUNT_${ramp.id}_wood_guardrail`;
      rail.position.set(ramp.x + Math.cos(ramp.rot) * ramp.width * 0.56 * side, 0.78, ramp.z - Math.sin(ramp.rot) * ramp.width * 0.56 * side);
      rail.rotation.y = ramp.rot;
      rail.castShadow = true;
      rail.receiveShadow = true;
      this.world.scene.add(rail);
    }
  }

  addLandingMarkers(ramp) {
    const landingDistance = ramp.length * 0.72;
    const centerX = ramp.x + Math.sin(ramp.rot) * landingDistance;
    const centerZ = ramp.z + Math.cos(ramp.rot) * landingDistance;
    for (const side of [-1, 1]) {
      const marker = new THREE.Group();
      marker.name = `STUNT_${ramp.id}_landing_marker`;
      marker.position.set(centerX + Math.cos(ramp.rot) * side * (ramp.width * 0.62), 0.18, centerZ - Math.sin(ramp.rot) * side * (ramp.width * 0.62));
      marker.rotation.y = ramp.rot;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.6, 8), this.world.materials.darkWood);
      post.position.y = 0.8;
      const flag = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.45, 0.04), this.world.materials.warmGlow);
      flag.position.set(0.48, 1.32, 0);
      marker.add(post, flag);
      this.world.scene.add(marker);
    }
  }

  createBoostPads() {
    for (const pad of boostPads) {
      const group = new THREE.Group();
      group.name = `BOOST_${pad.id}`;
      group.position.set(pad.position[0], 0.35, pad.position[2]);
      group.rotation.y = pad.rotation || 0;
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(2.2, 2.4, 0.22, 6),
        new THREE.MeshStandardMaterial({ color: pad.color, emissive: new THREE.Color(pad.color).multiplyScalar(0.22), roughness: 0.42 })
      );
      const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.4, 3), this.world.materials.glow);
      arrow.position.z = 0.5;
      arrow.rotation.x = Math.PI / 2;
      group.add(base, arrow);
      this.world.scene.add(group);
      this.world.boostPads.push({ ...pad, position: new THREE.Vector3(pad.position[0], 0, pad.position[2]) });
    }
  }
}

function createRampShape(width, length, height) {
  const halfWidth = width / 2;
  const halfLength = length / 2;
  const lowTop = -0.18;
  const bottom = -0.82;
  const vertices = new Float32Array([
    -halfWidth, lowTop, -halfLength,
    halfWidth, lowTop, -halfLength,
    halfWidth, height, halfLength,
    -halfWidth, height, halfLength,
    -halfWidth, bottom, -halfLength,
    halfWidth, bottom, -halfLength,
    halfWidth, bottom, halfLength,
    -halfWidth, bottom, halfLength
  ]);
  const indices = new Uint32Array([
    0, 2, 1, 0, 3, 2,
    4, 7, 6, 4, 6, 5,
    0, 4, 5, 0, 5, 1,
    3, 2, 6, 3, 6, 7,
    0, 3, 7, 0, 7, 4,
    1, 5, 6, 1, 6, 2
  ]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  return { geometry, vertices, indices };
}
