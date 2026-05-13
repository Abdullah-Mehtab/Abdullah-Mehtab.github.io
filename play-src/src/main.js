import './styles.css';
import { Game } from './core/Game.js';

async function boot() {
  const { default: RAPIER } = await import('@dimforge/rapier3d-compat');
  await RAPIER.init({});
  const game = new Game(RAPIER);
  await game.init();
}

boot().catch((error) => {
  console.error('Portfolio Drive failed to boot:', error);
  const loading = document.getElementById('loading');
  if (loading) {
    loading.innerHTML = '<span class="boot-error">World failed to load. Check the console.</span>';
  }
});
