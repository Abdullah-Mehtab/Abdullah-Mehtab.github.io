import { defineConfig } from 'vite';

export default defineConfig({
  root: 'play-src',
  base: './',
  publicDir: false,
  build: {
    outDir: '../play',
    emptyOutDir: false,
    assetsDir: 'game-assets',
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      input: 'play-src/index.html',
      output: {
        entryFileNames: 'game-assets/[name].js',
        chunkFileNames: 'game-assets/[name].js',
        assetFileNames: 'game-assets/[name][extname]'
      }
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});
