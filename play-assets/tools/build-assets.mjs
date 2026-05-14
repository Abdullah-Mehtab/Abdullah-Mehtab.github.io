import { access, mkdir, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..', '..');
const vehicleOutput = resolve(root, 'play-src', 'assets', 'models', 'vehicles', 'sabre-turbo.glb');
const environmentOutput = resolve(root, 'play-src', 'assets', 'models', 'environment', 'play-environment.glb');
const islandVisualOutput = resolve(root, 'play-src', 'assets', 'models', 'world', 'island-visual.glb');
const islandPhysicsOutput = resolve(root, 'play-src', 'assets', 'models', 'world', 'island-physics.glb');
const medievalPropsOutput = resolve(root, 'play-src', 'assets', 'models', 'world', 'medieval-props.glb');
const manifest = resolve(root, 'play-src', 'assets', 'models', 'asset-manifest.json');

await mkdir(dirname(vehicleOutput), { recursive: true });
await mkdir(dirname(environmentOutput), { recursive: true });
await mkdir(dirname(islandVisualOutput), { recursive: true });
await mkdir(dirname(islandPhysicsOutput), { recursive: true });
await mkdir(dirname(medievalPropsOutput), { recursive: true });
await mkdir(dirname(manifest), { recursive: true });

const blenderRequested = process.env.PLAY_ASSETS_BLENDER === '1';
const blenderBinary = await resolveBlenderBinary(blenderRequested);
const vehicleBlenderScript = resolve(root, 'play-assets', 'source', 'blender', 'export_sabre_turbo.py');
const environmentBlenderScript = resolve(root, 'play-assets', 'source', 'blender', 'export_environment.py');
const medievalWorldScript = resolve(root, 'play-assets', 'source', 'blender', 'export_medieval_world.py');

let builder = 'node';
if (blenderBinary) {
  runBlenderExport(blenderBinary, vehicleBlenderScript, vehicleOutput);
  runBlenderExport(blenderBinary, environmentBlenderScript, environmentOutput);
  runMedievalExport(blenderBinary, 'visual', islandVisualOutput);
  runMedievalExport(blenderBinary, 'physics', islandPhysicsOutput);
  runMedievalExport(blenderBinary, 'props', medievalPropsOutput);
  builder = 'blender';
} else {
  const moduleUrl = pathToFileURL(resolve(root, 'play-assets', 'source', 'js', 'create-sabre-turbo.mjs')).href;
  const { buildSabreTurbo } = await import(moduleUrl);
  await buildSabreTurbo({ output: vehicleOutput });

  if (!await fileExists(environmentOutput)) {
    throw new Error('Environment GLB is missing and Blender is not available to rebuild it.');
  }
  for (const required of [islandVisualOutput, islandPhysicsOutput, medievalPropsOutput]) {
    if (!await fileExists(required)) {
      throw new Error(`Medieval world asset is missing and Blender is not available: ${required}`);
    }
  }
}

await writeFile(manifest, JSON.stringify({
  schemaVersion: 1,
  builder,
  assets: {
    sabreTurbo: 'models/vehicles/sabre-turbo.glb',
    environment: 'models/environment/play-environment.glb',
    islandVisual: 'models/world/island-visual.glb',
    islandPhysics: 'models/world/island-physics.glb',
    medievalProps: 'models/world/medieval-props.glb'
  }
}, null, 2));

console.log(`Built play assets with ${builder}: ${vehicleOutput}`);
console.log(`Built play environment assets with ${builder}: ${environmentOutput}`);
console.log(`Built medieval island assets with ${builder}: ${islandVisualOutput}`);

function runBlenderExport(blenderBinary, script, output) {
  const result = spawnSync(blenderBinary, [
    '--background',
    '--python',
    script,
    '--',
    '--output',
    output
  ], { cwd: root, stdio: 'inherit' });

  if (result.status !== 0) {
    throw new Error(`Blender asset export failed with exit code ${result.status}`);
  }
}

function runMedievalExport(blenderBinary, kind, output) {
  const result = spawnSync(blenderBinary, [
    '--background',
    '--python',
    medievalWorldScript,
    '--',
    '--kind',
    kind,
    '--output',
    output
  ], { cwd: root, stdio: 'inherit' });

  if (result.status !== 0) {
    throw new Error(`Blender medieval ${kind} export failed with exit code ${result.status}`);
  }
}

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

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
