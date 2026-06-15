// ABOUTME: Builds a retention manifest for local Codex artifact folders.
// ABOUTME: Shrinks referenced evidence and deletes unreferenced verifier spam safely.
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, dirname, extname, join, relative, resolve, sep } from 'node:path';

const repoRoot = resolve(import.meta.dirname, '..');
const tmpRoot = resolve(repoRoot, '.codex-tmp');
const checkpointsRoot = join(tmpRoot, 'checkpoints');
const manifestPath = join(tmpRoot, '_artifact-retention-manifest.csv');
const apply = process.argv.includes('--apply');

const checkpointSources = new Map([
  ['play-verify-2026-06-13T08-01-27-571Z', '2026-06-13-gate4e-cu-road-path-before'],
  ['play-verify-2026-06-13T09-24-21-574Z', '2026-06-13-gate4e-cu-road-path-final'],
  ['gate-4fr-a-audit-2026-06-14T12-10-20-106Z', '2026-06-14-gate4fr-a-owner-rejection-audit'],
  ['play-verify-2026-06-14T13-50-45-133Z', '2026-06-14-gate4fr-b-start-flow-launch-removal'],
  ['play-verify-2026-06-14T15-16-23-615Z', '2026-06-14-gate4fr-c-b1-behind-build'],
  ['play-verify-2026-06-14T15-53-16-943Z', '2026-06-14-gate4fr-c-b2-career-campus'],
  ['play-verify-2026-06-14T16-42-08-096Z', '2026-06-14-gate4fr-c-b3-projects-build-hall'],
  ['play-verify-2026-06-14T17-14-35-524Z', '2026-06-14-gate4fr-c-b4-contact-signal-exchange'],
  ['play-verify-2026-06-14T18-01-46-628Z', '2026-06-14-gate4fr-c-b5-circuit-time-trial'],
  ['play-verify-2026-06-14T18-43-24-143Z', '2026-06-14-gate4fr-c-b6-sentinel-soc'],
  ['play-verify-2026-06-14T19-13-13-154Z', '2026-06-14-gate4fr-c-b7-awards-museum'],
  ['play-verify-2026-06-14T20-06-18-629Z', '2026-06-14-gate4fr-c-b8-todo-planning-studio'],
  ['play-verify-2026-06-14T20-53-56-911Z', '2026-06-14-gate4fr-c-b9-potato-farm'],
  ['play-verify-2026-06-14T21-40-19-749Z', '2026-06-14-gate4fr-d-terrain-bounds-final'],
  ['play-verify-2026-06-14T22-04-00-107Z', '2026-06-14-gate4fr-e-rejected-final-state']
]);

if (!existsSync(tmpRoot)) {
  console.log(JSON.stringify({ tmpRoot, entries: 0, message: '.codex-tmp does not exist' }, null, 2));
  process.exit(0);
}

const referenced = await collectArtifactReferences();
await mkdir(tmpRoot, { recursive: true });
if (apply) await mkdir(checkpointsRoot, { recursive: true });

const entries = [];
const topLevelDirs = (await readdir(tmpRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

for (const name of topLevelDirs) {
  const fullPath = join(tmpRoot, name);
  const stats = await stat(fullPath);
  const sizeBytes = await directorySize(fullPath);
  const isReferenced = referenced.folders.has(name);
  const checkpointName = checkpointSources.get(name);
  let action = 'delete';
  let reason = 'unreferenced local verifier/screenshot artifact';

  if (name === 'checkpoints' || name === 'scratch') {
    action = 'keep full';
    reason = name === 'checkpoints'
      ? 'named retained checkpoint evidence'
      : 'current replaceable scratch verifier output';
  } else if (isReferenced || checkpointName) {
    action = 'shrink';
    reason = checkpointName
      ? `important checkpoint copied to checkpoints/${checkpointName} and original kept reduced for journal compatibility`
      : 'referenced by GOAL/journal/docs; keep only result/json/contact sheets/explicit references';
  }

  entries.push({
    path: `.codex-tmp/${name}`,
    date: stats.mtime.toISOString(),
    sizeBytes,
    referenced: isReferenced ? 'yes' : 'no',
    action,
    reason
  });
}

await writeManifest(entries);

if (apply) {
  for (const [sourceName, checkpointName] of checkpointSources) {
    const source = join(tmpRoot, sourceName);
    if (!existsSync(source)) continue;
    await copyReducedCheckpoint(sourceName, checkpointName);
  }

  for (const entry of entries) {
    const fullPath = resolve(repoRoot, entry.path);
    if (entry.action === 'delete') {
      await safeRemove(fullPath);
    } else if (entry.action === 'shrink') {
      await shrinkReferencedFolder(basename(fullPath));
    }
  }
}

const summary = summarize(entries);
console.log(JSON.stringify({
  mode: apply ? 'applied' : 'dry-run',
  manifest: relative(repoRoot, manifestPath).replaceAll(sep, '/'),
  checkpoints: relative(repoRoot, checkpointsRoot).replaceAll(sep, '/'),
  ...summary
}, null, 2));

async function collectArtifactReferences() {
  const folders = new Set();
  const filesByFolder = new Map();
  const roots = ['GOAL.md', 'journal', 'docs'].map((item) => join(repoRoot, item)).filter((item) => existsSync(item));
  const files = [];
  for (const root of roots) {
    const rootStats = await stat(root);
    if (rootStats.isFile()) {
      files.push(root);
    } else {
      files.push(...await walkFiles(root, (file) => ['.md', '.txt'].includes(extname(file).toLowerCase())));
    }
  }

  const artifactPattern = /\.codex-tmp[\\/][^\s`'")\]]+/g;
  for (const file of files) {
    const text = await readFile(file, 'utf8');
    for (const match of text.matchAll(artifactPattern)) {
      const normalized = normalizeArtifactReference(match[0]);
      const parts = normalized.split('/');
      if (parts.length < 2 || parts[0] !== '.codex-tmp') continue;
      const folder = parts[1];
      folders.add(folder);
      if (parts.length > 2 && extname(parts.at(-1))) {
        if (!filesByFolder.has(folder)) filesByFolder.set(folder, new Set());
        filesByFolder.get(folder).add(parts.slice(2).join('/'));
      }
    }
  }

  return { folders, filesByFolder };
}

function normalizeArtifactReference(value) {
  let normalized = value.replaceAll('\\', '/');
  while (/[.,;:]+$/.test(normalized)) normalized = normalized.slice(0, -1);
  return normalized;
}

async function copyReducedCheckpoint(sourceName, checkpointName) {
  const source = join(tmpRoot, sourceName);
  const destination = join(checkpointsRoot, checkpointName);
  assertInsideTmp(source);
  assertInsideTmp(destination);
  if (existsSync(destination)) await safeRemove(destination);
  await mkdir(destination, { recursive: true });
  const keepFiles = await getKeepFilesForFolder(sourceName);
  for (const relPath of keepFiles) {
    const sourceFile = join(source, relPath);
    if (!existsSync(sourceFile)) continue;
    const destinationFile = join(destination, relPath);
    assertInsideTmp(destinationFile);
    await mkdir(dirname(destinationFile), { recursive: true });
    await cp(sourceFile, destinationFile);
  }
  await writeFile(join(destination, '_checkpoint-source.txt'), [
    `source=.codex-tmp/${sourceName}`,
    `created=${new Date().toISOString()}`,
    'retention=reduced checkpoint copy'
  ].join('\n'));
}

async function shrinkReferencedFolder(folderName) {
  const folder = join(tmpRoot, folderName);
  if (!existsSync(folder)) return;
  const keepFiles = await getKeepFilesForFolder(folderName);
  const files = await walkFiles(folder);
  for (const file of files) {
    const relPath = relative(folder, file).replaceAll(sep, '/');
    if (keepFiles.has(relPath)) continue;
    await safeRemove(file);
  }
  await removeEmptyDirectories(folder);
  const remainingFiles = await walkFiles(folder);
  if (remainingFiles.length === 0) {
    await writeFile(join(folder, '_retention-note.txt'), [
      `folder=.codex-tmp/${folderName}`,
      `updated=${new Date().toISOString()}`,
      'retention=referenced folder retained, but no result.json, contact sheet, metrics file, evidence json, or explicitly linked screenshot existed to keep',
      'reason=the folder path is referenced by docs/journal/GOAL, but the screenshot dump itself was removed under the artifact retention policy'
    ].join('\n'));
  }
}

async function getKeepFilesForFolder(folderName) {
  const folder = join(tmpRoot, folderName);
  const keep = new Set();
  const explicit = referenced.filesByFolder.get(folderName);
  if (explicit) {
    for (const relPath of explicit) keep.add(relPath);
  }

  for (const relPath of ['result.json', 'gate-4fr-a-evidence.json']) {
    if (existsSync(join(folder, relPath))) keep.add(relPath);
  }

  if (existsSync(folder)) {
    const files = await walkFiles(folder);
    for (const file of files) {
      const relPath = relative(folder, file).replaceAll(sep, '/');
      const lower = basename(file).toLowerCase();
      if (lower.includes('contact-sheet')) keep.add(relPath);
      if (lower === 'metrics.json') keep.add(relPath);
    }
  }

  return keep;
}

async function writeManifest(rows) {
  const header = ['path', 'date', 'size', 'referenced by journal/GOAL?', 'keep full / shrink / delete', 'reason'];
  const lines = [header.map(csv).join(',')];
  for (const row of rows) {
    lines.push([
      row.path,
      row.date,
      `${(row.sizeBytes / 1024 / 1024).toFixed(1)} MB`,
      row.referenced,
      row.action,
      row.reason
    ].map(csv).join(','));
  }
  await writeFile(manifestPath, `${lines.join('\n')}\n`);
}

function csv(value) {
  const text = String(value ?? '');
  if (!/[",\n]/.test(text)) return text;
  return `"${text.replaceAll('"', '""')}"`;
}

function summarize(rows) {
  const byAction = new Map();
  for (const row of rows) {
    const current = byAction.get(row.action) || { folders: 0, bytes: 0 };
    current.folders += 1;
    current.bytes += row.sizeBytes;
    byAction.set(row.action, current);
  }
  return {
    folders: rows.length,
    actions: Object.fromEntries([...byAction.entries()].map(([key, value]) => [
      key,
      { folders: value.folders, sizeGB: Number((value.bytes / 1024 / 1024 / 1024).toFixed(2)) }
    ]))
  };
}

async function directorySize(dir) {
  let total = 0;
  for (const file of await walkFiles(dir)) {
    total += (await stat(file)).size;
  }
  return total;
}

async function walkFiles(root, predicate = () => true) {
  const results = [];
  const entries = await readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(root, entry.name);
    if (entry.isDirectory()) {
      results.push(...await walkFiles(fullPath, predicate));
    } else if (entry.isFile() && predicate(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function removeEmptyDirectories(root) {
  const entries = await readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const fullPath = join(root, entry.name);
    await removeEmptyDirectories(fullPath);
    const remaining = await readdir(fullPath);
    if (remaining.length === 0) await safeRemove(fullPath);
  }
}

async function safeRemove(target) {
  const resolved = resolve(target);
  assertInsideTmp(resolved);
  if (resolved === tmpRoot) {
    throw new Error(`Refusing to remove .codex-tmp root: ${resolved}`);
  }
  await rm(resolved, { recursive: true, force: true });
}

function assertInsideTmp(target) {
  const resolved = resolve(target);
  const rootWithSep = tmpRoot.endsWith(sep) ? tmpRoot : `${tmpRoot}${sep}`;
  if (resolved !== tmpRoot && !resolved.startsWith(rootWithSep)) {
    throw new Error(`Refusing to touch path outside .codex-tmp: ${resolved}`);
  }
}
