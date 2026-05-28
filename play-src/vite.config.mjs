// ABOUTME: Configures the Portfolio Drive Vite build served from /play/.
// ABOUTME: Keeps the shared root site config available during Vite development.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const sharedSiteConfigPath = fileURLToPath(new URL('../assets/js/site-config.js', import.meta.url));

function serveSharedSiteConfig() {
  return {
    name: 'serve-shared-site-config',
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { src: '/assets/js/site-config.js' },
          injectTo: 'body'
        }
      ];
    },
    configureServer(server) {
      server.middlewares.use('/assets/js/site-config.js', async (request, response, next) => {
        if (request.method !== 'GET' && request.method !== 'HEAD') {
          next();
          return;
        }

        try {
          const config = await readFile(sharedSiteConfigPath, 'utf8');
          response.setHeader('content-type', 'text/javascript; charset=utf-8');
          response.end(request.method === 'HEAD' ? '' : config);
        } catch (error) {
          next(error);
        }
      });
    }
  };
}

export default defineConfig({
  root: 'play-src',
  base: './',
  publicDir: false,
  plugins: [serveSharedSiteConfig()],
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
