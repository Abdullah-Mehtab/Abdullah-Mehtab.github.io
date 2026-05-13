export class AudioSystem {
  constructor() {
    this.context = null;
    this.master = null;
    this.engineOsc = null;
    this.engineGain = null;
    this.windOsc = null;
    this.windGain = null;
    this.muted = localStorage.getItem('portfolio-drive-muted') === '1';
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
    this.engineGain = this.context.createGain();
    this.engineGain.gain.value = 0.0001;
    const engineFilter = this.context.createBiquadFilter();
    engineFilter.type = 'lowpass';
    engineFilter.frequency.value = 420;
    this.engineOsc.connect(engineFilter);
    engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.master);
    this.engineOsc.start();

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
    if (this.context?.state === 'suspended') {
      this.context.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('portfolio-drive-muted', this.muted ? '1' : '0');
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

  update(speed) {
    if (!this.context || !this.engineOsc || !this.engineGain) return;
    const normalized = Math.min(1, Math.abs(speed) / 34);
    this.engineOsc.frequency.setTargetAtTime(55 + normalized * 170, this.context.currentTime, 0.05);
    this.engineGain.gain.setTargetAtTime(this.muted ? 0 : 0.018 + normalized * 0.05, this.context.currentTime, 0.08);
    if (this.windGain) {
      this.windGain.gain.setTargetAtTime(this.muted ? 0 : 0.008 + normalized * 0.025, this.context.currentTime, 0.2);
    }
  }
}
