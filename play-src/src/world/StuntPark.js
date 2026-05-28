import * as THREE from 'three';
import { boostPads, worldZones } from './worldData.js';

export class StuntPark {
  constructor(world) {
    this.world = world;
  }

  build() {
    this.createRamps();
    this.createBoostPads();
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
    0, 1, 2, 0, 2, 3,
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
