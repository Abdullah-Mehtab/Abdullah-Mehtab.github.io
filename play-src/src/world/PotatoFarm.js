// ABOUTME: Builds the potato counter interaction pocket and temporary potato summons.
// ABOUTME: Uses authored prop templates where available while keeping farm props visual-only.
import * as THREE from 'three';
import { pseudoRandom } from './WorldMaterials.js';

export class PotatoFarm {
  constructor(world) {
    this.world = world;
    this.group = null;
    this.counterTexture = null;
    this.counterMaterial = null;
    this.count = 0;
    this.center = new THREE.Vector3();
    this.dressingRadius = 0;
    this.pulseItems = [];
    this.elapsed = 0;
    this.stats = {
      visible: true,
      dressingRadius: 0,
      cullRadius: 0,
      authoredAssets: 0,
      counterPanels: 0,
      summonEffects: 0,
      activePotatoes: 0
    };
  }

  build() {
    const zone = this.world.zones.find((item) => item.id === 'potato');
    if (!zone) return;

    this.group = new THREE.Group();
    this.group.name = 'ZONE_potato_counter_pocket';
    this.group.position.copy(zone.position);
    this.group.rotation.y = zone.rotation || 0;
    this.center.copy(zone.position);
    this.dressingRadius = zone.radius + 14;
    this.stats.dressingRadius = this.dressingRadius;
    this.world.scene.add(this.group);

    this.addCounterBooth();
    this.addCounter();
    this.addCounterDressing();
    this.addSummonPad();
    this.updateVisibility();
  }

  addCounterBooth() {
    this.box('PotatoCounterDeck', 0, 0.16, 6.45, 7.4, 0.22, 2.35, this.world.materials.warmStone);
    this.box('PotatoCounterBackRail', 0, 0.86, 6.98, 6.75, 0.28, 0.22, this.world.materials.darkWood);
    this.box('PotatoCounterFrontRail', 0, 0.78, 5.5, 6.25, 0.22, 0.18, this.world.materials.wood);
    this.box('PotatoCounterAwning', 0, 3.34, 6.18, 7.7, 0.28, 2.75, this.world.materials.wood);
    this.box('PotatoCounterAwningGlow', 0, 3.1, 5.0, 6.25, 0.08, 0.08, this.world.materials.warmGlow);
    for (const x of [-3.1, 3.1]) {
      this.box('PotatoCounterPost', x, 1.86, 5.08, 0.18, 2.88, 0.18, this.world.materials.darkWood);
      this.box('PotatoCounterBackPost', x, 1.65, 6.95, 0.16, 2.42, 0.16, this.world.materials.darkWood);
    }
    this.stats.counterPanels += 6;
  }

  addCounter() {
    this.counterTexture = makePotatoCounterTexture(this.count);
    this.counterMaterial = new THREE.MeshBasicMaterial({ map: this.counterTexture, transparent: true, side: THREE.DoubleSide });
    const board = new THREE.Mesh(new THREE.PlaneGeometry(5.35, 1.72), this.counterMaterial);
    board.name = 'PotatoCounterRoadFacing';
    board.position.set(0, 2.08, 6.86);
    this.group.add(board);

    this.box('PotatoCounterBoardBack', 0, 2.08, 6.94, 5.82, 1.98, 0.18, this.world.materials.darkWood);
    this.box('PotatoCounterBoardTopTrim', 0, 3.08, 6.78, 5.9, 0.14, 0.2, this.world.materials.wood);
    this.box('PotatoCounterBoardBottomTrim', 0, 1.08, 6.78, 5.9, 0.14, 0.2, this.world.materials.wood);
    for (const x of [-2.95, 2.95]) this.box('PotatoCounterBoardSidePost', x, 2.02, 6.72, 0.2, 2.35, 0.2, this.world.materials.wood);
    this.stats.counterPanels += 5;
  }

  addCounterDressing() {
    this.addAuthoredAsset('EnvPolishBuildCrateStack', -4.3, 5.95, -0.18, 0.52);
    this.addAuthoredAsset('EnvPolishBenchPlanter', 4.45, 5.9, 0.16, 0.62);
    this.addAuthoredAsset('EnvPolishRouteLantern', -3.8, 3.1, -0.42, 0.58);
    this.addAuthoredAsset('EnvPolishRouteLantern', 3.8, 3.1, 0.42, 0.58);
    this.addAuthoredAsset('EnvPolishFarmIrrigator', 5.4, -1.25, 0.18, 0.48);
    for (const [x, z, scale] of [
      [-2.4, 4.72, 0.72],
      [0, 4.56, 0.66],
      [2.4, 4.72, 0.72]
    ]) {
      this.box('PotatoCounterGuideStone', x, 0.2, z, 1.2 * scale, 0.055, 0.42 * scale, this.world.materials.paleStone, 0.04 * x);
    }
  }

  addSummonPad() {
    const pad = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.8, 0.2, 6),
      new THREE.MeshStandardMaterial({ color: 0x7cffb2, emissive: 0x163826, roughness: 0.62, metalness: 0.08 })
    );
    pad.name = 'PotatoSummonPad';
    pad.position.set(0, 0.28, 9.15);
    this.group.add(pad);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x7cffb2, transparent: true, opacity: 0.42, depthWrite: false, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.95, 2.24, 6), ringMaterial);
    ring.name = 'PotatoSummonPulseRing';
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(0, 0.42, 9.15);
    this.group.add(ring);
    this.pulseItems.push({ mesh: ring, material: ringMaterial, baseScale: 1, speed: 1.6, phase: 0 });
    for (let i = 0; i < 6; i += 1) {
      const angle = (i / 6) * Math.PI * 2;
      this.box(
        'PotatoSummonRune',
        Math.cos(angle) * 2.55,
        0.39,
        9.15 + Math.sin(angle) * 2.55,
        0.48,
        0.045,
        0.14,
        i % 2 ? this.world.materials.glow : this.world.materials.crop,
        -angle
      );
    }
    this.stats.summonEffects += 7;
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
    const seed = this.count * 17.13 + this.world.potatoes.length * 9.71 + 3;
    const potato = this.createPotatoSummon(seed);
    const offset = new THREE.Vector3(
      (pseudoRandom(seed) - 0.5) * 7.2,
      2.5,
      (pseudoRandom(seed + 4.9) - 0.5) * 5.8
    ).applyAxisAngle(new THREE.Vector3(0, 1, 0), zone.rotation || 0);
    potato.position.copy(zone.position).add(offset);
    potato.rotation.set(pseudoRandom(seed + 7.2) * 0.28, pseudoRandom(seed + 11.4) * Math.PI * 2, pseudoRandom(seed + 15.6) * 0.28);
    potato.scale.setScalar(0.82 + pseudoRandom(seed + 19.8) * 0.28);
    this.world.scene.add(potato);
    this.world.potatoes.push({ mesh: potato, life: 22 });
    this.stats.activePotatoes = this.world.potatoes.length;
    return potato;
  }

  update(dt, vehiclePosition) {
    this.updateVisibility(vehiclePosition);
    this.elapsed += dt;
    for (const item of this.pulseItems) {
      const pulsePhase = this.elapsed * item.speed + item.phase;
      const pulse = 1 + Math.sin(pulsePhase) * 0.1;
      item.mesh.scale.setScalar(item.baseScale * pulse);
      item.mesh.rotation.z += dt * 0.28;
      item.material.opacity = 0.34 + Math.sin(pulsePhase) * 0.08;
    }
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
    this.stats.activePotatoes = this.world.potatoes.length;
  }

  updateVisibility(origin) {
    if (!this.group) return;
    const profile = this.world.getQualityProfile();
    const radius = profile.farmDressingRadius || profile.districtDressingRadius || 0;
    let visible = true;
    if (origin && Number.isFinite(origin.x) && Number.isFinite(origin.z) && radius > 0) {
      const edgeDistance = Math.hypot(origin.x - this.center.x, origin.z - this.center.z) - this.dressingRadius;
      const threshold = this.group.visible ? radius + 18 : radius;
      visible = edgeDistance <= threshold;
    }
    this.group.visible = visible;
    this.stats.visible = visible;
    this.stats.cullRadius = radius;
  }

  getStats() {
    return { ...this.stats };
  }

  addAuthoredAsset(name, x, z, rotation = 0, scale = 1) {
    const asset = this.world.cloneEnvironmentAsset(name);
    if (!asset) return null;
    asset.name = `PotatoCounter_${name}`;
    asset.position.set(x, 0.08, z);
    asset.rotation.y = rotation;
    asset.scale.setScalar(scale);
    this.group.add(asset);
    this.stats.authoredAssets += 1;
    return asset;
  }

  box(name, x, y, z, sx, sy, sz, material, rotation = 0) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotation;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    this.group.add(mesh);
    return mesh;
  }

  createPotatoSummon(seed) {
    const group = new THREE.Group();
    group.name = 'PotatoSummon';
    const body = new THREE.Mesh(new THREE.DodecahedronGeometry(0.54, 0), this.world.materials.potato);
    body.name = 'PotatoSummonBody';
    body.scale.set(1.0, 0.72 + pseudoRandom(seed + 1.1) * 0.12, 0.82 + pseudoRandom(seed + 2.2) * 0.18);
    body.rotation.set(0.18, 0.34, -0.12);
    const sprout = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.56, 5), this.world.materials.crop);
    sprout.name = 'PotatoSummonSprout';
    sprout.position.set(0.04, 0.54, -0.04);
    sprout.rotation.set(0.28, pseudoRandom(seed + 3.3) * Math.PI, -0.18);
    group.add(body, sprout);
    return group;
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
