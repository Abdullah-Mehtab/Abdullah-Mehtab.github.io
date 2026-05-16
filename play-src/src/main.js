import './styles.css';
import { Game } from './core/Game.js';

async function boot() {
  const RAPIER = await import('@dimforge/rapier3d-compat');
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (String(args[0]).includes('using deprecated parameters for the initialization function')) return;
    originalWarn(...args);
  };
  try {
    await RAPIER.init({});
  } finally {
    console.warn = originalWarn;
  }
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
