// ABOUTME: Validates protected GitHub Pages routes and local static asset references.
// ABOUTME: Can also smoke-test routes through a tiny local static server.

import { createReadStream, existsSync } from 'node:fs';
import { access, mkdir, readdir, readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..');
const args = new Set(process.argv.slice(2));

const protectedRoutes = [
  { route: '/', file: 'index.html' },
  { route: '/index.html', file: 'index.html' },
  { route: '/projects.html', file: 'projects.html' },
  { route: '/cv.html', file: 'cv.html' },
  { route: '/todo.html', file: 'todo.html' },
  { route: '/cyber-sentinel.html', file: 'cyber-sentinel.html' },
  { route: '/play/', file: 'play/index.html' },
  { route: '/classic/', file: 'classic/index.html' },
  { route: '/Abdullah-Mehtab-Resume-v5.pdf', file: 'Abdullah-Mehtab-Resume-v5.pdf' },
  { route: '/Abdullah-Mehtab-CV-Cyber-v2.pdf', file: 'Abdullah-Mehtab-CV-Cyber-v2.pdf' },
  { route: '/robots.txt', file: 'robots.txt' },
  { route: '/sitemap.xml', file: 'sitemap.xml' }
];

const smokeRoutes = [
  ...protectedRoutes,
  { route: '/admin.html', file: 'admin.html' },
  { route: '/classic/index.html', file: 'classic/index.html' }
];

const requiredFiles = [
  'assets/js/site-config.js',
  'assets/js/portfolio-v2.js',
  'assets/js/comments.js',
  'assets/js/visitor-proof.js',
  'play/resume_data.json',
  'play/game-assets/index.js',
  'play/game-assets/index.css'
];

const ignoredDirs = new Set([
  '.git',
  '.codex-tmp',
  '.codex-tools',
  '.migration-safety',
  '.vscode',
  'docs',
  'node_modules',
  'supabase'
]);

const scannedExtensions = new Set(['.css', '.html', '.txt', '.xml']);
const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.pdf', 'application/pdf'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.xml', 'application/xml; charset=utf-8']
]);

const externalSchemes = /^(?:mailto|tel|data|javascript):/i;
const sameSiteHost = 'abdullah-mehtab.github.io';

const failures = [];
const warnings = [];

function toDisplayPath(filePath) {
  return relative(repoRoot, filePath).split(sep).join('/');
}

function isInsideRepo(filePath) {
  const rel = relative(repoRoot, filePath);
  return rel === '' || (!rel.startsWith('..') && !resolve(filePath).startsWith('..'));
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveFileTarget(targetPath, sourceFile) {
  let resolved = targetPath.startsWith('/src/') && toDisplayPath(sourceFile).startsWith('play-src/')
    ? resolve(repoRoot, 'play-src', `.${targetPath}`)
    : targetPath.startsWith('/')
    ? resolve(repoRoot, `.${targetPath}`)
    : resolve(dirname(sourceFile), targetPath);

  if (!isInsideRepo(resolved)) {
    return { ok: false, filePath: resolved, reason: 'resolves outside the repository' };
  }

  try {
    const info = await stat(resolved);
    if (info.isDirectory()) {
      resolved = join(resolved, 'index.html');
    }
  } catch {
    if (targetPath.endsWith('/')) {
      resolved = join(resolved, 'index.html');
    }
  }

  return { ok: await fileExists(resolved), filePath: resolved };
}

function localPathFromUrl(rawValue) {
  const value = rawValue.trim();
  if (!value || value.startsWith('#') || externalSchemes.test(value) || value.startsWith('//')) {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    let parsed;
    try {
      parsed = new URL(value);
    } catch {
      return null;
    }
    if (parsed.hostname !== sameSiteHost) return null;
    if (!isCurrentSitePath(parsed.pathname)) return null;
    return parsed.pathname || '/';
  }

  const [withoutHash] = value.split('#', 1);
  const [withoutQuery] = withoutHash.split('?', 1);
  return withoutQuery || null;
}

function isCurrentSitePath(pathname) {
  return (
    pathname === '/'
    || pathname.endsWith('.html')
    || pathname.endsWith('.pdf')
    || pathname === '/robots.txt'
    || pathname === '/sitemap.xml'
    || pathname.startsWith('/assets/')
    || pathname.startsWith('/classic/')
    || pathname.startsWith('/play/')
  );
}

function extractReferences(content, filePath) {
  const references = [];
  const extension = extname(filePath).toLowerCase();

  if (extension === '.html') {
    const attrPattern = /\b(?:href|src|poster|action)=["']([^"']+)["']/gi;
    for (const match of content.matchAll(attrPattern)) {
      references.push({ value: match[1], source: match[0] });
    }

    const srcsetPattern = /\bsrcset=["']([^"']+)["']/gi;
    for (const match of content.matchAll(srcsetPattern)) {
      for (const candidate of match[1].split(',')) {
        const value = candidate.trim().split(/\s+/)[0];
        if (value) references.push({ value, source: 'srcset' });
      }
    }
  }

  if (extension === '.css') {
    const urlPattern = /url\(\s*(['"]?)(.*?)\1\s*\)/gi;
    for (const match of content.matchAll(urlPattern)) {
      references.push({ value: match[2], source: match[0] });
    }
  }

  if (extension === '.xml' || extension === '.txt') {
    const urlPattern = /https?:\/\/[^\s<>"']+/gi;
    for (const match of content.matchAll(urlPattern)) {
      references.push({ value: match[0], source: 'absolute-url' });
    }
  }

  return references;
}

async function walkFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkFiles(fullPath));
    } else if (scannedExtensions.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function checkProtectedRoutes() {
  for (const item of protectedRoutes) {
    const filePath = resolve(repoRoot, item.file);
    if (!await fileExists(filePath)) {
      failures.push(`Protected route ${item.route} is missing ${item.file}`);
    }
  }

  for (const file of requiredFiles) {
    const filePath = resolve(repoRoot, file);
    if (!await fileExists(filePath)) {
      failures.push(`Required runtime file is missing: ${file}`);
    }
  }
}

async function checkStaticReferences() {
  const files = await walkFiles(repoRoot);
  for (const file of files) {
    const content = await readFile(file, 'utf8');
    for (const reference of extractReferences(content, file)) {
      const localPath = localPathFromUrl(reference.value);
      if (!localPath) continue;
      const target = await resolveFileTarget(localPath, file);
      if (!target.ok) {
        const sourcePath = toDisplayPath(file);
        const targetPath = toDisplayPath(target.filePath);
        failures.push(`${sourcePath} references missing ${reference.value} (${target.reason || targetPath})`);
      }
    }
  }
}

function routeToFile(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  const normalized = decoded.endsWith('/') ? `${decoded}index.html` : decoded;
  const filePath = resolve(repoRoot, `.${normalized}`);
  return isInsideRepo(filePath) ? filePath : null;
}

function startStaticServer() {
  const server = createServer(async (request, response) => {
    const url = new URL(request.url || '/', 'http://127.0.0.1');
    const filePath = routeToFile(url.pathname);
    if (!filePath) {
      response.writeHead(400);
      response.end('Bad request');
      return;
    }

    try {
      const info = await stat(filePath);
      if (!info.isFile()) throw new Error('not a file');
      response.writeHead(200, {
        'content-length': info.size,
        'content-type': mimeTypes.get(extname(filePath).toLowerCase()) || 'application/octet-stream'
      });
      createReadStream(filePath).pipe(response);
    } catch {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Not found');
    }
  });

  return new Promise((resolveStart, rejectStart) => {
    server.once('error', rejectStart);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolveStart({ server, baseUrl: `http://127.0.0.1:${address.port}` });
    });
  });
}

async function smokeTestRoutes(baseUrl) {
  for (const item of smokeRoutes) {
    const response = await fetch(`${baseUrl}${item.route}`);
    if (!response.ok) {
      failures.push(`Smoke route ${item.route} returned HTTP ${response.status}`);
    }
  }
}

function findChromeExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium'
  ].filter(Boolean);
  return candidates.find((candidate) => fileExistsSync(candidate));
}

function fileExistsSync(filePath) {
  return Boolean(filePath && existsSync(filePath));
}

async function captureScreenshots(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping screenshots because Chrome/Edge was not found. Set CHROME_PATH to enable them.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const outputDir = resolve(repoRoot, '.codex-tmp', 'site-screenshots');
  await mkdir(outputDir, { recursive: true });
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });
    const pages = [
      ['home', '/'],
      ['projects', '/projects.html'],
      ['cv', '/cv.html'],
      ['play', '/play/']
    ];
    for (const [name, route] of pages) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await new Promise((resolveDelay) => setTimeout(resolveDelay, 2500));
      await page.screenshot({ path: join(outputDir, `${name}.png`), fullPage: true });
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  await checkProtectedRoutes();
  await checkStaticReferences();

  const { server, baseUrl } = await startStaticServer();
  try {
    await smokeTestRoutes(baseUrl);
    if (args.has('--screenshots')) {
      await captureScreenshots(baseUrl);
    }
  } finally {
    await new Promise((resolveClose) => server.close(resolveClose));
  }

  for (const warning of warnings) {
    console.warn(`Warning: ${warning}`);
  }

  if (failures.length > 0) {
    console.error(`Site check failed with ${failures.length} issue(s):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`Site check passed: ${protectedRoutes.length} protected routes, ${requiredFiles.length} runtime files, and local static references verified.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
