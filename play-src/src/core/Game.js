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

export class Game {
  constructor(RAPIER) {
    this.RAPIER = RAPIER;
    this.canvas = document.getElementById('play-canvas');
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 900);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    this.ticker = new Ticker();
    this.started = false;
    this.activeZone = null;
    this.resumeData = null;
    this.lights = {};
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
    this.vehicle = new Vehicle({
      scene: this.scene,
      physics: this.physics,
      achievements: this.achievements,
      audio: this.audio
    });
    this.cameraRig = new CameraRig(this.camera, this.vehicle, this.input);
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
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
  }

  setupScene() {
    this.scene.background = new THREE.Color(0x75c9f4);
    this.scene.fog = new THREE.Fog(0xbbe8f7, 135, 470);
    this.camera.position.set(0, 9, -18);

    const hemi = new THREE.HemisphereLight(0xf8fbff, 0x2b5a31, 2.05);
    this.scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xffe4ad, 3.45);
    sun.position.set(-70, 66, -58);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -190;
    sun.shadow.camera.right = 190;
    sun.shadow.camera.top = 190;
    sun.shadow.camera.bottom = -190;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 360;
    this.scene.add(sun);

    const rim = new THREE.DirectionalLight(0x9fe7ff, 0.7);
    rim.position.set(54, 30, 54);
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
    window.__portfolioDrive = {
      game: this,
      sampleCanvas: () => {
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
      nearest: () => this.activeZone?.name || null
    };
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

    const canDrive = this.started && !this.ui.isPanelOpen();
    this.physics.step(dt, (fixedDt) => {
      if (canDrive) {
        this.vehicle.update(this.input, fixedDt);
        const pad = this.world.checkBoostPad(this.vehicle.position);
        if (pad) {
          this.vehicle.boostFromPad(pad);
          this.ui?.notify?.('Boost pad launched');
        }
        const collected = this.world.checkCollectibles(this.vehicle.position);
        if (collected.length) {
          const count = this.world.getCollectedCount();
          this.ui?.notify?.(`Data shard ${count}/${this.world.collectibles.length}`);
          if (count === this.world.collectibles.length) {
            this.achievements.unlock('data_shards');
          }
        }
      }
    });

    if (!canDrive) {
      this.vehicle.body.setLinvel({
        x: this.vehicle.body.linvel().x * 0.94,
        y: this.vehicle.body.linvel().y,
        z: this.vehicle.body.linvel().z * 0.94
      }, true);
      this.vehicle.syncModel();
    }

    this.world.update(dt, elapsed, this.vehicle.position);
    if (this.world.checkRampAir(this.vehicle.position, this.vehicle.body.linvel().y)) {
      this.achievements.unlock('ramp_jump');
    }
    this.updateLighting(elapsed);
    this.cameraRig.update(dt);
    this.audio.update(this.vehicle.speed);
    this.ui.update({ speed: this.vehicle.speed, activeZone: this.activeZone, circuit: this.world.circuit });

    const circuitEvent = this.world.updateCircuit(this.vehicle.position, elapsed);
    if (circuitEvent?.finished) {
      this.ui.notify(`Circuit finished: ${formatTime(circuitEvent.lap)}`);
    } else if (circuitEvent?.checkpoint) {
      this.audio.click(700);
      this.ui.notify(`Checkpoint ${circuitEvent.checkpoint}`);
    }

    this.renderer.render(this.scene, this.camera);
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

  updateLighting(elapsed) {
    const cycle = Math.sin(elapsed * 0.035) * 0.5 + 0.5;
    this.lights.sun.intensity = 2.7 + cycle * 0.65;
    this.lights.rim.intensity = 0.55 + (1 - cycle) * 0.5;
    this.scene.fog.color.lerpColors(new THREE.Color(0xbbe8f7), new THREE.Color(0xf0e7c9), cycle * 0.22);
  }

  getZoneLines(zone) {
    if (zone.lines) return zone.lines;
    if (zone.dialogueId && this.resumeData.dialogues?.[zone.dialogueId]) {
      return this.resumeData.dialogues[zone.dialogueId].lines || [];
    }
    return ['Information for this area is being prepared.'];
  }

  focusZone(zone) {
    const position = zone.position.clone().add(new THREE.Vector3(7.5, 7.2, 9.5));
    const target = zone.position.clone().add(new THREE.Vector3(0, 2.4, 0));
    this.cameraRig.setCinematic(position, target);
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
    this.ui.notify('Circuit started');
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds - minutes * 60;
  return `${minutes}:${rest.toFixed(2).padStart(5, '0')}`;
}
