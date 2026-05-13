import { achievementDefinitions } from '../world/worldData.js';

const STORAGE_KEY = 'portfolio-drive-achievements';

export class Achievements {
  constructor() {
    this.definitions = achievementDefinitions.map(([id, title, description]) => ({ id, title, description }));
    this.unlocked = new Set(this.read());
    this.zoneUnlocks = new Set();
    this.distance = Number(localStorage.getItem('portfolio-drive-distance') || 0);
    this.onUnlock = null;
  }

  read() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.unlocked]));
    localStorage.setItem('portfolio-drive-distance', String(Math.round(this.distance)));
  }

  unlock(id) {
    if (this.unlocked.has(id)) return false;
    this.unlocked.add(id);
    this.save();
    const definition = this.definitions.find((item) => item.id === id);
    this.onUnlock?.(definition || { id, title: id, description: '' });
    return true;
  }

  visitZone(zone) {
    if (!zone?.achievement) return;
    this.zoneUnlocks.add(zone.achievement);
    this.unlock(zone.achievement);
    const zoneAchievements = this.definitions
      .map((item) => item.id)
      .filter((id) => !['boost', 'boost_pad', 'jump', 'ramp_jump', 'data_shards', 'potato_summon', 'distance_1km', 'all_zones'].includes(id));
    const allVisited = zoneAchievements.every((id) => this.unlocked.has(id) || this.zoneUnlocks.has(id));
    if (allVisited) this.unlock('all_zones');
  }

  addDistance(meters) {
    if (!Number.isFinite(meters) || meters <= 0) return;
    this.distance += meters;
    if (this.distance >= 1000) this.unlock('distance_1km');
    this.save();
  }

  reset() {
    this.unlocked.clear();
    this.zoneUnlocks.clear();
    this.distance = 0;
    this.save();
  }

  getProgress() {
    return {
      unlocked: this.unlocked.size,
      total: this.definitions.length,
      distance: this.distance
    };
  }
}
