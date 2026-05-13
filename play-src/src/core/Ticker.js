export class Ticker {
  constructor() {
    this.items = [];
    this.elapsed = 0;
    this.delta = 0;
    this.last = performance.now();
  }

  add(name, priority, fn) {
    this.items.push({ name, priority, fn });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  tick(now = performance.now()) {
    const rawDelta = (now - this.last) / 1000;
    this.last = now;
    this.delta = Math.min(rawDelta, 0.05);
    this.elapsed += this.delta;

    for (const item of this.items) {
      item.fn(this.delta, this.elapsed);
    }
  }
}
