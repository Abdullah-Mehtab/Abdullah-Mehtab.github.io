import * as THREE from 'three';
import { pseudoRandom } from './WorldMaterials.js';

export class PotatoFarm {
  constructor(world) {
    this.world = world;
    this.group = null;
    this.counterTexture = null;
    this.counterMaterial = null;
    this.count = 0;
  }

  build() {
    const zone = this.world.zones.find((item) => item.id === 'potato');
    if (!zone) return;

    this.group = new THREE.Group();
    this.group.name = 'ZONE_potato_voxel_farm';
    this.group.position.copy(zone.position);
    this.group.rotation.y = zone.rotation || 0;
    this.world.scene.add(this.group);

    this.addField();
    this.addCounter();
    this.addSummonPad();
    this.addFenceColliders(zone);
  }

  addField() {
    const farmAsset = this.world.cloneEnvironmentAsset('EnvPotatoFarm');
    if (farmAsset) {
      farmAsset.name = 'EnvPotatoFarm_BlockyVoxelField';
      farmAsset.position.set(0, 0, 0);
      farmAsset.rotation.y = 0;
      this.group.add(farmAsset);
      return;
    }

    for (let row = -3; row <= 3; row += 1) {
      for (let col = -4; col <= 4; col += 1) {
        const wet = col === 0;
        const block = new THREE.Mesh(
          new THREE.BoxGeometry(1.25, 0.34, 1.25),
          wet ? this.world.materials.water : this.world.materials.darkWood
        );
        block.position.set(col * 1.34, 0.16, row * 1.34);
        this.group.add(block);
        if (!wet && (row + col) % 2 === 0) {
          const crop = this.world.cloneEnvironmentAsset('EnvPotatoCrop') || new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.62, 0.42), this.world.materials.crop);
          crop.position.set(col * 1.34, 0.68, row * 1.34);
          crop.rotation.y = pseudoRandom((row + 8) * (col + 10)) * Math.PI * 2;
          this.group.add(crop);
        }
      }
    }
    this.addFence();
  }

  addFence() {
    const fenceTemplate = this.world.cloneEnvironmentAsset('EnvFencePost');
    for (let x = -6; x <= 6; x += 1.5) {
      this.addFencePiece(fenceTemplate, x, 0.8, -5.5, 0);
      this.addFencePiece(fenceTemplate, x, 0.8, 5.5, 0);
    }
    for (let z = -4.5; z <= 4.5; z += 1.5) {
      this.addFencePiece(fenceTemplate, -6.4, 0.8, z, Math.PI / 2);
      this.addFencePiece(fenceTemplate, 6.4, 0.8, z, Math.PI / 2);
    }
  }

  addFencePiece(template, x, y, z, rotation) {
    const post = template ? template.clone(true) : new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.35, 0.22), this.world.materials.wood);
    post.position.set(x, y, z);
    post.rotation.y = rotation;
    this.group.add(post);
  }

  addCounter() {
    this.counterTexture = makePotatoCounterTexture(this.count);
    this.counterMaterial = new THREE.MeshBasicMaterial({ map: this.counterTexture, transparent: true, side: THREE.DoubleSide });
    const board = new THREE.Mesh(new THREE.PlaneGeometry(5.35, 1.72), this.counterMaterial);
    board.name = 'PotatoCounterRoadFacing';
    board.position.set(0, 2.25, 7.2);
    this.group.add(board);

    const backing = new THREE.Mesh(new THREE.BoxGeometry(5.7, 2.05, 0.2), this.world.materials.darkWood);
    backing.position.set(0, 2.25, 7.08);
    const leftPost = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.7, 0.18), this.world.materials.wood);
    leftPost.position.set(-2.95, 1.45, 7.02);
    const rightPost = leftPost.clone();
    rightPost.position.x = 2.95;
    this.group.add(backing, leftPost, rightPost);
  }

  addSummonPad() {
    const pad = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.8, 0.2, 6),
      new THREE.MeshStandardMaterial({ color: 0x7cffb2, emissive: 0x163826, roughness: 0.62, metalness: 0.08 })
    );
    pad.name = 'PotatoSummonPad';
    pad.position.set(0, 0.28, 9.45);
    this.group.add(pad);
  }

  addFenceColliders(zone) {
    const rotation = zone.rotation || 0;
    for (const item of [
      { local: [0, 0.84, -6.25], size: [15.8, 1.7, 0.34] },
      { local: [0, 0.84, 6.25], size: [15.8, 1.7, 0.34] },
      { local: [-7.75, 0.84, 0], size: [0.34, 1.7, 12.5] },
      { local: [7.75, 0.84, 0], size: [0.34, 1.7, 12.5] }
    ]) {
      const local = new THREE.Vector3(item.local[0], item.local[1], item.local[2]).applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation);
      this.world.physics.createFixedBox([zone.position.x + local.x, local.y, zone.position.z + local.z], item.size, {
        rotation: [0, rotation, 0],
        friction: 0.92,
        restitution: 0.02
      });
    }
  }

  setPotatoCount(count) {
    this.count = count;
    if (!this.counterTexture) return;
    const replacement = makePotatoCounterTexture(count);
    this.counterMaterial.map = replacement;
    this.counterMaterial.needsUpdate = true;
    this.counterTexture.dispose();
    this.counterTexture = replacement;
  }

  spawnPotato() {
    const zone = this.world.zones.find((item) => item.id === 'potato');
    if (!zone) return null;
    const potato = this.world.cloneEnvironmentAsset('EnvMinecraftPotato') || new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.55, 0.55), this.world.materials.potato);
    const offset = new THREE.Vector3(
      (Math.random() - 0.5) * 7.2,
      2.5,
      (Math.random() - 0.5) * 5.8
    ).applyAxisAngle(new THREE.Vector3(0, 1, 0), zone.rotation || 0);
    potato.position.copy(zone.position).add(offset);
    potato.rotation.set(Math.random() * 0.4, Math.random() * Math.PI * 2, Math.random() * 0.4);
    potato.scale.setScalar(0.8 + Math.random() * 0.35);
    this.world.scene.add(potato);
    this.world.potatoes.push({ mesh: potato, life: 22 });
    return potato;
  }

  update(dt) {
    for (let i = this.world.potatoes.length - 1; i >= 0; i -= 1) {
      const potato = this.world.potatoes[i];
      potato.life -= dt;
      potato.mesh.rotation.y += dt * 1.2;
      potato.mesh.position.y += Math.sin(potato.life * 6) * dt * 0.2;
      if (potato.life <= 0) {
        this.world.scene.remove(potato.mesh);
        this.world.potatoes.splice(i, 1);
      }
    }
  }
}

function makePotatoCounterTexture(count) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2a160c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let x = 0; x < canvas.width; x += 32) {
    ctx.fillStyle = x % 64 === 0 ? '#4b2a15' : '#3a1f11';
    ctx.fillRect(x, 0, 28, canvas.height);
  }
  ctx.strokeStyle = '#d7a357';
  ctx.lineWidth = 10;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);
  ctx.fillStyle = '#f7e1a3';
  ctx.textAlign = 'center';
  ctx.font = '800 34px Arial';
  ctx.fillText('POTATOES', canvas.width / 2, 75);
  ctx.font = '900 64px Arial';
  ctx.fillText(String(count), canvas.width / 2, 145);
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 6;
  return texture;
}
