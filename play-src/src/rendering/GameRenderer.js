import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export class GameRenderer {
  constructor({ canvas, scene, camera }) {
    this.canvas = canvas;
    this.scene = scene;
    this.camera = camera;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false
    });
    this.composer = null;
    this.bloom = null;
    this.postprocessingEnabled = false;
    this.maxPixelRatio = 1.15;
  }

  setup() {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.maxPixelRatio));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.shadowMap.enabled = false;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.04;

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.18, 0.58, 0.92);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }

  setQuality(quality) {
    const profile = {
      low: { pixelRatio: 1, shadows: false, post: false, bloom: 0.04 },
      medium: { pixelRatio: 1.15, shadows: false, post: false, bloom: 0.08 },
      high: { pixelRatio: 1.35, shadows: true, post: true, bloom: 0.18 }
    }[quality] || { pixelRatio: 1.15, shadows: false, post: false, bloom: 0.08 };
    this.maxPixelRatio = profile.pixelRatio;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.maxPixelRatio));
    this.renderer.shadowMap.enabled = profile.shadows;
    this.postprocessingEnabled = profile.post;
    if (!this.bloom) return;
    this.bloom.strength = profile.bloom;
    if (quality === 'low') {
      this.bloom.radius = 0.32;
    } else if (quality === 'high') {
      this.bloom.radius = 0.52;
    } else {
      this.bloom.radius = 0.4;
    }
  }

  render() {
    if (this.composer && this.postprocessingEnabled) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  }

  resize() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, this.maxPixelRatio);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.composer?.setSize(window.innerWidth, window.innerHeight);
    this.bloom?.resolution.set(window.innerWidth, window.innerHeight);
  }
}
