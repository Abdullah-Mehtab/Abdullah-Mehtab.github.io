// ABOUTME: Coordinates the /play driving experience, lifecycle, systems, and runtime loop.
// ABOUTME: Owns scene setup, input handling, zone interactions, and verification hooks.
import * as THREE from 'three';
import { Ticker } from './Ticker.js';
import { Input } from './Input.js';
import { AudioSystem } from './AudioSystem.js';
import { Achievements } from './Achievements.js';
import { Analytics } from './Analytics.js';
import { PhysicsWorld } from '../physics/PhysicsWorld.js';
import { Vehicle } from '../player/Vehicle.js';
import { CameraRig } from '../player/CameraRig.js';
import { loadEnvironmentAssets } from '../world/EnvironmentAssets.js';
import { World } from '../world/World.js';
import { UI } from '../ui/UI.js';
import { GameRenderer } from '../rendering/GameRenderer.js';

export class Game {
  constructor(RAPIER) {
    this.RAPIER = RAPIER;
    this.canvas = document.getElementById('play-canvas');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 900);
    this.rendererSystem = new GameRenderer({ canvas: this.canvas, scene: this.scene, camera: this.camera });
    this.renderer = this.rendererSystem.renderer;
    this.ticker = new Ticker();
    this.started = false;
    this.activeZone = null;
    this.resumeData = null;
    this.lights = {};
    this.fogDay = new THREE.Color(0xb7e8ee);
    this.fogWarm = new THREE.Color(0xffbf86);
    this.debugReadout = null;
    this.debugEnabled = false;
    this.debugFrame = 0;
    this.debugColliderOverlay = null;
    this.lastAudioZoneId = null;
  }

  async init() {
    this.resumeData = await this.fetchResumeData();
    this.setupRenderer();
    this.setupScene();
    this.input = new Input(this.canvas);
    this.audio = new AudioSystem();
    this.achievements = new Achievements();
    this.physics = new PhysicsWorld(this.RAPIER);
    this.environmentAssets = await loadEnvironmentAssets();
    this.world = new World({
      scene: this.scene,
      physics: this.physics,
      resumeData: this.resumeData,
      environmentAssets: this.environmentAssets
    });
    this.world.onQualityChange = (quality) => this.rendererSystem.setQuality(quality);
    this.rendererSystem.setQuality(this.world.landscapeQuality);
    this.vehicle = new Vehicle({
      scene: this.scene,
      physics: this.physics,
      achievements: this.achievements,
      audio: this.audio
    });
    this.cameraRig = new CameraRig(this.camera, this.vehicle, this.input, this.physics);
    this.analytics = new Analytics();
    this.ui = new UI({ game: this, achievements: this.achievements, audio: this.audio });
    this.analytics.init().then(() => {
      if (Number.isFinite(this.analytics.potatoCount)) {
        this.ui.setPotatoCount(this.analytics.potatoCount);
      }
    }).catch(() => {});
    this.setupEvents();
    this.setupDebug();
    this.ui.markLoaded();
    this.renderer.setAnimationLoop((now) => this.loop(now));
  }

  async fetchResumeData() {
    const response = await fetch('resume_data.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Unable to load resume_data.json: ${response.status}`);
    }
    return response.json();
  }

  setupRenderer() {
    this.rendererSystem.setup();
  }

  setupScene() {
    this.scene.background = new THREE.Color(0x8fd6f3);
    this.scene.fog = new THREE.Fog(0xb7e8ee, 132, 520);
    this.camera.position.set(0, 9, -18);

    const hemi = new THREE.HemisphereLight(0xffe3bf, 0x203c3c, 1.22);
    this.scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xffb36f, 3.85);
    sun.position.set(-132, 58, -102);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -96;
    sun.shadow.camera.right = 96;
    sun.shadow.camera.top = 96;
    sun.shadow.camera.bottom = -96;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 360;
    sun.shadow.bias = -0.00015;
    sun.shadow.normalBias = 0.08;
    this.scene.add(sun);

    const rim = new THREE.DirectionalLight(0x74e8ff, 1.68);
    rim.position.set(72, 34, 92);
    this.scene.add(rim);

    this.lights = { hemi, sun, rim };
  }

  setupEvents() {
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.audio?.context?.suspend?.();
      } else {
        this.audio?.resume();
      }
    });
  }

  setupDebug() {
    this.debugReadout = document.getElementById('debug-readout');
    const params = new URLSearchParams(window.location.search);
    this.debugEnabled = params.has('debugDrive') || localStorage.getItem('portfolio-drive-debug') === '1';
    document.body.classList.toggle('debug-drive', this.debugEnabled);
    if (this.debugReadout && this.debugEnabled) this.debugReadout.hidden = false;
    window.__portfolioDrive = {
      game: this,
      sampleCanvas: () => {
        this.rendererSystem.render();
        const gl = this.renderer.getContext();
        const width = Math.max(1, Math.min(16, this.renderer.domElement.width));
        const height = Math.max(1, Math.min(16, this.renderer.domElement.height));
        const pixels = new Uint8Array(width * height * 4);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        return Array.from(pixels).reduce((sum, value) => sum + value, 0);
      },
      ready: () => Boolean(this.world && this.vehicle && this.renderer),
      start: () => this.startDriving(),
      respawn: (zoneId) => this.respawn(zoneId),
      summonPotato: () => this.summonPotato(),
      nearest: () => this.activeZone?.name || null,
      colliders: () => this.physics.getColliderDebugData(),
      showColliders: () => this.createColliderDebugOverlay(),
      debug: (enabled = true) => {
        this.debugEnabled = Boolean(enabled);
        localStorage.setItem('portfolio-drive-debug', this.debugEnabled ? '1' : '0');
        document.body.classList.toggle('debug-drive', this.debugEnabled);
        if (this.debugReadout) this.debugReadout.hidden = !this.debugEnabled;
      }
    };
    if (params.has('debugColliders')) this.createColliderDebugOverlay();
  }

  startDriving() {
    this.started = true;
    this.audio.resume();
    this.ui.hideTitle();
    this.ui.notify('Drive started');
  }

  loop(now) {
    this.ticker.tick(now);
    const dt = this.ticker.delta;
    const elapsed = this.ticker.elapsed;

    this.input.update();
    this.handleGlobalInput();
    const vehiclePosition = this.vehicle.position;
    const nearest = this.world.nearestZone(vehiclePosition);
    this.activeZone = nearest?.zone || null;
    this.updateZoneStinger(this.activeZone);
    this.vehicle.setSurface(this.world.getSurfaceInfo(vehiclePosition));

    const canDrive = this.started && !this.ui.isPanelOpen();
    this.physics.step(dt, (fixedDt) => {
      if (canDrive) {
        this.vehicle.update(this.input, fixedDt);
        const pad = this.world.checkBoostPad(this.vehicle.position);
        if (pad && this.vehicle.boostFromPad(pad)) {
          this.ui?.notify?.('Boost pad launched');
        }
        this.collectNearbyDataShards();
      }
    });
    this.vehicle.postPhysics();

    if (!canDrive) {
      this.vehicle.idleDampen();
    }

    this.world.update(dt, elapsed, this.vehicle.position, this.vehicle);
    if (this.world.checkRampAir(this.vehicle.position, this.vehicle.body.linvel().y)) {
      this.achievements.unlock('ramp_jump');
    }
    this.updateLighting(elapsed);
    this.cameraRig.update(dt);
    this.audio.update(this.vehicle.speed, this.vehicle.controller?.driveState);

    const circuitEvent = this.world.updateCircuit(this.vehicle.position, elapsed);
    if (circuitEvent?.finished) {
      this.achievements.unlock('circuit_finish');
      this.audio.sweep?.(240, 1240, 0.36, 0.05);
      this.ui.notify(`Circuit finished: ${formatTime(circuitEvent.lap)}`);
    } else if (circuitEvent?.checkpoint) {
      this.audio.click(700);
      this.ui.notify(`Checkpoint ${circuitEvent.checkpoint}`);
    }

    this.ui.update({ speed: this.vehicle.speed, activeZone: this.activeZone, circuit: this.world.circuit });
    this.updateDebugReadout(dt);

    this.rendererSystem.render();
    this.input.clearTransient();
  }

  handleGlobalInput() {
    if (!this.started && this.input.consume('interact')) {
      this.startDriving();
      return;
    }
    if (this.input.consume('menu')) {
      this.ui.toggleMenu();
    }
    if (this.input.consume('map')) {
      this.ui.toggleMap();
    }
    if (this.input.consume('potato') && !this.ui.isPanelOpen()) {
      this.summonPotato();
    }
    if (this.input.consume('interact') && this.activeZone && !this.ui.isPanelOpen()) {
      this.ui.openZone(this.activeZone);
    }
  }

  recordZoneVisit(zone) {
    this.analytics?.recordZone(zone?.id);
  }

  async summonPotato() {
    const farm = this.world.zones.find((zone) => zone.id === 'potato');
    if (!farm) return;
    const position = this.vehicle.position;
    const nearFarm = Math.hypot(position.x - farm.position.x, position.z - farm.position.z) <= farm.radius + 6;
    if (!nearFarm) {
      this.ui?.notify?.('Drive to the Potato Farm to summon one');
      return;
    }
    this.world.spawnPotato();
    this.achievements.unlock('potato_summon');
    this.audio.click(190);
    this.ui?.notify?.('Potato summoned');
    const count = await this.analytics?.recordPotatoSummon?.();
    if (Number.isFinite(count)) {
      this.ui.setPotatoCount(count);
      this.ui.notify(`Potato counter: ${count}`);
    }
  }

  runSecurityScan(zone) {
    if (!this.world.startSecurityScan(this.ticker.elapsed)) {
      this.ui.notify('Scanner already running');
      return;
    }
    this.ui.notify('Security scanner warming up');
    this.audio.click(880);
    this.audio.sweep(180, 920, 0.42, 0.045);
    window.setTimeout(() => {
      this.world.completeSecurityScan();
      this.achievements.unlock('security_scan');
      this.audio.click(1180);
      this.audio.sweep(520, 1280, 0.24, 0.035);
      this.ui.notify('Security scan complete');
      this.ui.openZone(zone, { skipScan: true });
    }, 1250);
  }

  updateLighting(elapsed) {
    const cycle = Math.sin(elapsed * 0.035) * 0.5 + 0.5;
    this.lights.sun.intensity = 3.05 + cycle * 0.72;
    this.lights.rim.intensity = 1.18 + (1 - cycle) * 0.5;
    this.scene.fog.color.lerpColors(this.fogDay, this.fogWarm, cycle * 0.38);
  }

  updateZoneStinger(zone) {
    if (!this.started || !zone || this.ui?.isPanelOpen?.()) return;
    if (zone.id === this.lastAudioZoneId) return;
    this.lastAudioZoneId = zone.id;
    this.audio?.zoneStinger?.(zone);
  }

  collectNearbyDataShards(position = this.vehicle.position) {
    const collected = this.world.checkCollectibles(position);
    if (!collected.length) return collected;
    const count = this.world.getCollectedCount();
    const total = this.world.collectibles.length;
    for (const item of collected) {
      this.audio?.dataShard?.(item.index, count, total);
    }
    this.ui?.notify?.(`Data shard ${count}/${total}`);
    if (count === total) {
      this.achievements.unlock('data_shards');
    }
    return collected;
  }

  updateDebugReadout(dt) {
    if (!this.debugEnabled || !this.debugReadout) return;
    this.debugFrame = (this.debugFrame + 1) % 8;
    if (this.debugFrame !== 0) return;
    const driveState = this.vehicle.controller?.driveState || {};
    const info = this.renderer.info;
    this.debugReadout.textContent = [
      `fps ${Math.round(1 / Math.max(dt, 0.001))}`,
      `speed ${Math.round(this.vehicle.speed)} km/h`,
      `wheels ${this.vehicle.controller?.groundedWheels ?? 0}`,
      `slip ${Number(driveState.slip || 0).toFixed(2)}`,
      `surface ${this.world.surfaceState?.label || 'land'}`,
      `zone ${this.activeZone?.id || 'none'}`,
      `colliders ${this.physics.getColliderDebugData().length}`,
      `calls ${info.render.calls}`,
      `tris ${info.render.triangles}`
    ].join(' | ');
  }

  createColliderDebugOverlay() {
    if (this.debugColliderOverlay) {
      this.debugColliderOverlay.visible = true;
      return this.debugColliderOverlay;
    }
    const group = new THREE.Group();
    group.name = 'DEBUG_ColliderOverlay';
    const materials = {
      box: new THREE.MeshBasicMaterial({ color: 0xffc36a, wireframe: true, transparent: true, opacity: 0.42, depthTest: false }),
      cylinder: new THREE.MeshBasicMaterial({ color: 0x9ccfff, wireframe: true, transparent: true, opacity: 0.42, depthTest: false }),
      ball: new THREE.MeshBasicMaterial({ color: 0xff6d8d, wireframe: true, transparent: true, opacity: 0.42, depthTest: false }),
      trimesh: new THREE.MeshBasicMaterial({ color: 0x7cffb2, wireframe: true, transparent: true, opacity: 0.32, depthTest: false }),
      sensor: new THREE.MeshBasicMaterial({ color: 0xb6a0ff, wireframe: true, transparent: true, opacity: 0.38, depthTest: false })
    };

    for (const collider of this.physics.getColliderDebugData()) {
      const material = collider.sensor ? materials.sensor : materials[collider.type] || materials.box;
      let geometry = null;
      if (collider.type === 'box') {
        geometry = new THREE.BoxGeometry(collider.size[0], collider.size[1], collider.size[2]);
      } else if (collider.type === 'cylinder') {
        geometry = new THREE.CylinderGeometry(collider.radius, collider.radius, collider.halfHeight * 2, 16, 1);
      } else if (collider.type === 'ball') {
        geometry = new THREE.SphereGeometry(collider.radius, 16, 10);
      } else if (collider.type === 'trimesh') {
        geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(collider.vertices, 3));
        geometry.setIndex(new THREE.BufferAttribute(collider.indices, 1));
        geometry.computeBoundingSphere();
      }
      if (!geometry) continue;
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = `DEBUG_Collider_${collider.name || collider.type}`;
      mesh.position.set(collider.position[0], collider.position[1], collider.position[2]);
      if (collider.rotation) {
        mesh.rotation.set(collider.rotation[0], collider.rotation[1], collider.rotation[2]);
      }
      mesh.renderOrder = 999;
      group.add(mesh);
    }

    this.debugColliderOverlay = group;
    this.scene.add(group);
    return group;
  }

  getZoneLines(zone) {
    if (zone.lines) return zone.lines;
    if (zone.dialogueId && this.resumeData.dialogues?.[zone.dialogueId]) {
      return this.resumeData.dialogues[zone.dialogueId].lines || [];
    }
    return ['Information for this area is being prepared.'];
  }

  focusZone(zone) {
    const pose = this.world.getPresentationPose(zone.id);
    this.cameraRig.setCinematic(pose.position, pose.target, pose.fov);
  }

  clearFocus() {
    this.cameraRig.clearCinematic();
  }

  respawn(zoneId = 'landing') {
    const pose = this.world.getRespawnPose(zoneId);
    this.vehicle.respawn(pose.position, pose.heading);
    this.audio.click(420);
  }

  resetWorld() {
    this.physics.resetDynamicVisuals();
  }

  startCircuit() {
    this.world.startCircuit(this.ticker.elapsed);
    this.achievements.unlock('circuit_gate');
    this.audio.sweep?.(160, 820, 0.24, 0.04);
    this.ui.notify('Circuit started');
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.rendererSystem.resize();
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds - minutes * 60;
  return `${minutes}:${rest.toFixed(2).padStart(5, '0')}`;
}
