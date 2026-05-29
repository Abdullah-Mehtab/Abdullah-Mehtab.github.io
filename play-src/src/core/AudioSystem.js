// ABOUTME: Provides procedural engine, impact, UI, and world stinger audio for /play.
// ABOUTME: Keeps mute state respected while exposing counters for browser verification.
import { Howler } from 'howler';

export class AudioSystem {
  constructor() {
    this.context = null;
    this.master = null;
    this.engineOsc = null;
    this.engineSubOsc = null;
    this.enginePulseOsc = null;
    this.engineGain = null;
    this.engineSubGain = null;
    this.enginePulseGain = null;
    this.engineNoise = null;
    this.engineNoiseGain = null;
    this.engineFilter = null;
    this.engineSubFilter = null;
    this.windOsc = null;
    this.windGain = null;
    this.muted = localStorage.getItem('portfolio-drive-muted') === '1';
    this.impactsPlayed = 0;
    this.zoneStingersPlayed = 0;
  }

  async init() {
    if (this.context) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.context = new AudioContext();
    this.master = this.context.createGain();
    this.master.gain.value = this.muted ? 0 : 0.35;
    this.master.connect(this.context.destination);

    this.engineOsc = this.context.createOscillator();
    this.engineOsc.type = 'sawtooth';
    this.engineSubOsc = this.context.createOscillator();
    this.engineSubOsc.type = 'square';
    this.enginePulseOsc = this.context.createOscillator();
    this.enginePulseOsc.type = 'triangle';
    this.engineGain = this.context.createGain();
    this.engineSubGain = this.context.createGain();
    this.enginePulseGain = this.context.createGain();
    this.engineNoiseGain = this.context.createGain();
    this.engineGain.gain.value = 0.0001;
    this.engineSubGain.gain.value = 0.0001;
    this.enginePulseGain.gain.value = 0.0001;
    this.engineNoiseGain.gain.value = 0.0001;
    this.engineFilter = this.context.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.value = 340;
    this.engineFilter.Q.value = 0.85;
    this.engineSubFilter = this.context.createBiquadFilter();
    this.engineSubFilter.type = 'lowpass';
    this.engineSubFilter.frequency.value = 96;
    const pulseFilter = this.context.createBiquadFilter();
    pulseFilter.type = 'bandpass';
    pulseFilter.frequency.value = 68;
    pulseFilter.Q.value = 1.4;
    const shaper = this.context.createWaveShaper();
    shaper.curve = makeDistortionCurve(58);
    shaper.oversample = '2x';
    this.engineOsc.connect(this.engineFilter);
    this.engineFilter.connect(shaper);
    shaper.connect(this.engineGain);
    this.engineGain.connect(this.master);
    this.engineSubOsc.connect(this.engineSubFilter);
    this.engineSubFilter.connect(this.engineSubGain);
    this.engineSubGain.connect(this.master);
    this.enginePulseOsc.connect(pulseFilter);
    pulseFilter.connect(this.enginePulseGain);
    this.enginePulseGain.connect(this.master);
    this.engineNoise = this.context.createBufferSource();
    this.engineNoise.buffer = makeNoiseBuffer(this.context);
    this.engineNoise.loop = true;
    const noiseFilter = this.context.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 290;
    noiseFilter.Q.value = 0.85;
    this.engineNoise.connect(noiseFilter);
    noiseFilter.connect(this.engineNoiseGain);
    this.engineNoiseGain.connect(this.master);
    this.engineOsc.start();
    this.engineSubOsc.start();
    this.enginePulseOsc.start();
    this.engineNoise.start();

    this.windOsc = this.context.createOscillator();
    this.windOsc.type = 'triangle';
    this.windGain = this.context.createGain();
    this.windGain.gain.value = 0.012;
    const windFilter = this.context.createBiquadFilter();
    windFilter.type = 'highpass';
    windFilter.frequency.value = 180;
    this.windOsc.connect(windFilter);
    windFilter.connect(this.windGain);
    this.windGain.connect(this.master);
    this.windOsc.frequency.value = 84;
    this.windOsc.start();
  }

  resume() {
    this.init();
    Howler.mute(this.muted);
    if (this.context?.state === 'suspended') {
      this.context.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('portfolio-drive-muted', this.muted ? '1' : '0');
    Howler.mute(this.muted);
    if (this.master) {
      this.master.gain.setTargetAtTime(this.muted ? 0 : 0.35, this.context.currentTime, 0.04);
    }
    return this.muted;
  }

  click(frequency = 520) {
    if (!this.context || this.muted) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.type = 'triangle';
    osc.frequency.value = frequency;
    gain.gain.value = 0.001;
    osc.connect(gain);
    gain.connect(this.master);
    gain.gain.setValueAtTime(0.001, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, this.context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.15);
    osc.start();
    osc.stop(this.context.currentTime + 0.17);
  }

  impact(intensity = 1) {
    this.impactsPlayed += 1;
    if (!this.context || this.muted) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.type = 'square';
    osc.frequency.value = 90 + Math.random() * 30;
    gain.gain.value = Math.min(0.1, 0.03 * intensity);
    osc.connect(gain);
    gain.connect(this.master);
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.12);
    osc.start();
    osc.stop(this.context.currentTime + 0.14);
  }

  zoneStinger(zone = {}) {
    this.zoneStingersPlayed += 1;
    if (!this.context || this.muted) return;

    const base = frequencyForZone(zone.id || zone.name || 'zone');
    this.sweep(base * 0.62, base * 1.34, 0.26, 0.032);

    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    osc.type = 'triangle';
    filter.type = 'lowpass';
    filter.frequency.value = base * 2.4;
    osc.frequency.setValueAtTime(base * 1.5, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(base * 0.92, this.context.currentTime + 0.18);
    gain.gain.setValueAtTime(0.001, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.048, this.context.currentTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.2);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    osc.start();
    osc.stop(this.context.currentTime + 0.22);
  }

  sweep(start = 220, end = 880, duration = 0.32, gainValue = 0.06) {
    if (!this.context || this.muted) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    osc.type = 'sawtooth';
    filter.type = 'bandpass';
    filter.frequency.value = Math.max(start, end);
    filter.Q.value = 2.2;
    osc.frequency.setValueAtTime(start, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, end), this.context.currentTime + duration);
    gain.gain.setValueAtTime(0.001, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(gainValue, this.context.currentTime + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    osc.start();
    osc.stop(this.context.currentTime + duration + 0.02);
  }

  update(speed, driveState = {}) {
    if (!this.context || !this.engineOsc || !this.engineGain) return;
    const normalized = Math.min(1, Math.abs(speed) / 70);
    const throttle = Math.min(1, Math.abs(driveState.throttle ?? 0));
    const boost = driveState.boost ? 1 : 0;
    const burnout = driveState.burnout ? 1 : 0;
    const wheelie = driveState.wheelie ? 1 : 0;
    const slip = driveState.slip ?? 0;
    const surface = driveState.surface || 'road';
    const softSurface = ['grass', 'sand', 'shore'].includes(surface) ? 1 : 0;
    const water = surface === 'water' ? 1 : 0;
    const wobble = Math.sin(this.context.currentTime * (18 + normalized * 28)) * (2 + normalized * 5);
    this.engineOsc.frequency.setTargetAtTime(38 + normalized * 176 + throttle * 56 + boost * 38 + burnout * 58 + wheelie * 18 + wobble, this.context.currentTime, 0.055);
    this.engineGain.gain.setTargetAtTime(this.muted ? 0 : 0.04 + normalized * 0.095 + throttle * 0.034 + boost * 0.026 + burnout * 0.04, this.context.currentTime, 0.075);
    this.engineFilter?.frequency.setTargetAtTime(220 + normalized * 760 + throttle * 230 + boost * 280 + burnout * 240, this.context.currentTime, 0.12);
    if (this.engineSubOsc && this.engineSubGain) {
      this.engineSubOsc.frequency.setTargetAtTime(23 + normalized * 52 + throttle * 10 + burnout * 7, this.context.currentTime, 0.08);
      this.engineSubGain.gain.setTargetAtTime(this.muted ? 0 : 0.027 + normalized * 0.05 + throttle * 0.018 + burnout * 0.022, this.context.currentTime, 0.12);
    }
    if (this.enginePulseOsc && this.enginePulseGain) {
      this.enginePulseOsc.frequency.setTargetAtTime(15 + normalized * 35 + boost * 16 + burnout * 12, this.context.currentTime, 0.1);
      this.enginePulseGain.gain.setTargetAtTime(this.muted ? 0 : 0.013 + normalized * 0.028 + boost * 0.018 + burnout * 0.018, this.context.currentTime, 0.1);
    }
    if (this.engineNoiseGain) {
      this.engineNoiseGain.gain.setTargetAtTime(
        this.muted ? 0 : 0.006 + normalized * 0.019 + slip * 0.09 + boost * 0.026 + burnout * 0.07 + softSurface * normalized * 0.026 + water * 0.035,
        this.context.currentTime,
        0.08
      );
    }
    if (this.windGain) {
      this.windGain.gain.setTargetAtTime(this.muted ? 0 : 0.008 + normalized * 0.025, this.context.currentTime, 0.2);
    }
  }
}

function frequencyForZone(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 997;
  }
  return 260 + (hash % 8) * 48;
}

function makeDistortionCurve(amount) {
  const samples = 44100;
  const curve = new Float32Array(samples);
  const deg = Math.PI / 180;
  for (let i = 0; i < samples; i += 1) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

function makeNoiseBuffer(context) {
  const length = context.sampleRate * 2;
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1;
    last = last * 0.92 + white * 0.08;
    data[i] = last * 0.55;
  }
  return buffer;
}
