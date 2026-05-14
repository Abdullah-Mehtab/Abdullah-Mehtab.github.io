import { access, mkdir, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..', '..');
const output = resolve(root, 'play-src', 'assets', 'models', 'vehicles', 'sabre-turbo.glb');
const manifest = resolve(root, 'play-src', 'assets', 'models', 'asset-manifest.json');

await mkdir(dirname(output), { recursive: true });
await mkdir(dirname(manifest), { recursive: true });

const blenderRequested = process.env.PLAY_ASSETS_BLENDER === '1';
const blenderBinary = await resolveBlenderBinary(blenderRequested);
const blenderScript = resolve(root, 'play-assets', 'source', 'blender', 'export_sabre_turbo.py');

let builder = 'node';
if (blenderBinary) {
  const result = spawnSync(blenderBinary, [
    '--background',
    '--python',
    blenderScript,
    '--',
    '--output',
    output
  ], { cwd: root, stdio: 'inherit' });

  if (result.status !== 0) {
    throw new Error(`Blender asset export failed with exit code ${result.status}`);
  }
  builder = 'blender';
} else {
  const moduleUrl = pathToFileURL(resolve(root, 'play-assets', 'source', 'js', 'create-sabre-turbo.mjs')).href;
  const { buildSabreTurbo } = await import(moduleUrl);
  await buildSabreTurbo({ output });
}

await writeFile(manifest, JSON.stringify({
  schemaVersion: 1,
  builder,
  assets: {
    sabreTurbo: 'models/vehicles/sabre-turbo.glb'
  }
}, null, 2));

console.log(`Built play assets with ${builder}: ${output}`);

async function canExecute(command) {
  if (command.includes('\\') || command.includes('/')) {
    try {
      await access(command, constants.X_OK);
    } catch {
      return false;
    }
  }
  const result = spawnSync(command, ['--version'], { stdio: 'ignore' });
  return result.status === 0;
}

async function resolveBlenderBinary(required) {
  const candidates = [
    process.env.BLENDER,
    'C:\\Tools\\blender-4.5.0-windows-x64\\blender.exe',
    'C:\\Tools\\Blender\\blender-4.5.0-windows-x64\\blender.exe',
    'blender'
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (await canExecute(candidate)) {
      return candidate;
    }
  }

  if (required) {
    throw new Error('PLAY_ASSETS_BLENDER=1 was set, but Blender could not be executed. Set BLENDER to blender.exe.');
  }

  return null;
}
