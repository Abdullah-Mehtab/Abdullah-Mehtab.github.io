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
      { id: 'cove-main-ramp', x: baseX - 2, z: baseZ + 2, rot: -0.35, size: [8.5, 0.95, 12], pitch: -0.2 }
    ];
    for (const ramp of ramps) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(...ramp.size), this.world.materials.roadEdge);
      mesh.name = `STUNT_${ramp.id}`;
      mesh.position.set(ramp.x, 0.72, ramp.z);
      mesh.rotation.set(ramp.pitch, ramp.rot, 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.world.scene.add(mesh);
      this.world.ramps.push({ id: ramp.id, position: new THREE.Vector3(ramp.x, 0, ramp.z), radius: 8, triggered: false });
      this.world.physics.createFixedBox([ramp.x, 0.72, ramp.z], ramp.size, {
        rotation: [ramp.pitch, ramp.rot, 0],
        friction: 0.92,
        restitution: 0.02
      });
      this.addGuardrails(ramp);
    }
  }

  addGuardrails(ramp) {
    for (const side of [-1, 1]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.55, ramp.size[2]), this.world.materials.paleStone);
      rail.position.set(ramp.x + Math.cos(ramp.rot) * ramp.size[0] * 0.55 * side, 1.25, ramp.z - Math.sin(ramp.rot) * ramp.size[0] * 0.55 * side);
      rail.rotation.y = ramp.rot;
      this.world.scene.add(rail);
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
