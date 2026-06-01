// ABOUTME: Wraps the Three.js renderer, quality tiers, shadows, and postprocessing for /play.
// ABOUTME: Keeps expensive high-tier rendering bounded for static GitHub Pages visitors.
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const QUALITY_PROFILES = {
  low: { pixelRatio: 1, minPixelRatio: 0.45, maxRenderPixels: 1100000, shadows: false, post: false, bloom: 0.04 },
  medium: { pixelRatio: 1.15, minPixelRatio: 0.5, maxRenderPixels: 1720000, shadows: false, post: false, bloom: 0.08 },
  high: { pixelRatio: 1.2, minPixelRatio: 0.5, maxRenderPixels: 1900000, shadows: true, post: true, bloom: 0.16 }
};
const DEFAULT_QUALITY_PROFILE = QUALITY_PROFILES.medium;

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
    this.qualityProfile = DEFAULT_QUALITY_PROFILE;
    this.maxPixelRatio = DEFAULT_QUALITY_PROFILE.pixelRatio;
    this.maxRenderPixels = DEFAULT_QUALITY_PROFILE.maxRenderPixels;
  }

  setup() {
    this.applyPixelRatio();
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.shadowMap.enabled = false;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.04;
  }

  setQuality(quality) {
    const profile = QUALITY_PROFILES[quality] || DEFAULT_QUALITY_PROFILE;
    this.qualityProfile = profile;
    this.maxPixelRatio = profile.pixelRatio;
    this.maxRenderPixels = profile.maxRenderPixels;
    this.applyPixelRatio();
    this.renderer.shadowMap.enabled = profile.shadows;
    this.postprocessingEnabled = profile.post;
    if (profile.post) this.ensureComposer();
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
    if (this.postprocessingEnabled && this.ensureComposer()) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
  }

  ensureComposer() {
    if (this.composer && this.bloom) return this.composer;
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.18, 0.58, 0.92);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
    this.resize();
    return this.composer;
  }

  resize() {
    const pixelRatio = this.applyPixelRatio();
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.composer?.setPixelRatio?.(pixelRatio);
    this.composer?.setSize(window.innerWidth, window.innerHeight);
    this.bloom?.resolution.set(window.innerWidth, window.innerHeight);
  }

  applyPixelRatio() {
    const pixelRatio = this.getBoundedPixelRatio();
    this.renderer.setPixelRatio(pixelRatio);
    return pixelRatio;
  }

  getBoundedPixelRatio() {
    const profile = this.qualityProfile || DEFAULT_QUALITY_PROFILE;
    const width = Math.max(1, window.innerWidth || this.canvas.clientWidth || 1);
    const height = Math.max(1, window.innerHeight || this.canvas.clientHeight || 1);
    const budgetRatio = Math.sqrt(profile.maxRenderPixels / (width * height));
    return Math.min(
      window.devicePixelRatio || 1,
      profile.pixelRatio,
      Math.max(profile.minPixelRatio, budgetRatio)
    );
  }
}
