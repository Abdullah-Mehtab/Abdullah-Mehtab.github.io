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
  { route: '/chapters/cyber-sentinel.html', file: 'chapters/cyber-sentinel.html' },
  { route: '/play/', file: 'play/index.html' },
  { route: '/classic/', file: 'classic/index.html' },
  { route: '/Abdullah-Mehtab-Master-CV.pdf', file: 'Abdullah-Mehtab-Master-CV.pdf' },
  { route: '/Abdullah-Mehtab-Cyber-CV.pdf', file: 'Abdullah-Mehtab-Cyber-CV.pdf' },
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
  'drafts',
  'localbackups',
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

// The CV links deliberately split two things: a stable href so a shared link never dies, and a
// versioned download filename so the saved file says which version it is. Those two drift apart the
// moment someone edits one and forgets the other, and nothing else would notice.
async function checkDownloadNames() {
  const html = await readFile(resolve(repoRoot, 'cv.html'), 'utf8');
  // Match every PDF anchor first, so removing the attribute outright is caught too.
  const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]+\.pdf)"[^>]*>/g)];

  if (anchors.length === 0) {
    failures.push('cv.html links no PDF downloads at all; the CV downloads were lost.');
    return;
  }

  for (const [tag, href] of anchors) {
    const stem = href.replace(/\.pdf$/, '');
    const named = tag.match(/\bdownload="([^"]+)"/);

    if (!named) {
      failures.push(`cv.html links ${href} without download="..."; it would save under the versionless served name instead of saying which version it is.`);
      continue;
    }

    const downloadName = named[1];
    if (!downloadName.startsWith(`${stem}-v`)) {
      failures.push(`cv.html serves ${href} but would save it as ${downloadName}; the download name must be the href plus a version, e.g. ${stem}-vX.Y.pdf`);
    }
  }
}

// cyber-sentinel.html is a redirect stub: the page moved to chapters/ but the old path stays live
// because two portfolio actions inside play-src/src/world/worldData.js still point at it, and those
// are protected. A stub that stops redirecting serves an almost-empty page and looks fine, so the
// refresh target and the visible link are checked against each other and against the file on disk.
async function checkRedirectStub() {
  const stubFile = 'cyber-sentinel.html';
  const html = await readFile(resolve(repoRoot, stubFile), 'utf8');

  const refresh = html.match(/<meta\s+http-equiv="refresh"\s+content="\d+;\s*url=([^"]+)"/i);
  const anchor = html.match(/<a\s+href="([^"]+)"/i);

  if (!refresh) {
    failures.push(`${stubFile} lost its meta refresh; the old URL would serve a dead end.`);
    return;
  }
  if (!anchor) {
    failures.push(`${stubFile} lost its fallback link; a reader who blocks refreshes has no way out.`);
    return;
  }
  if (refresh[1] !== anchor[1]) {
    failures.push(`${stubFile} refreshes to ${refresh[1]} but links to ${anchor[1]}; they must name the same page.`);
    return;
  }

  const target = resolve(repoRoot, refresh[1]);
  if (!await fileExists(target)) {
    failures.push(`${stubFile} redirects to ${refresh[1]}, which does not exist.`);
  }
}

// Em-dashes and en-dashes are banned from published copy: they read as machine-written to the
// people this site is aimed at. classic/ is exempt because it is a frozen archive, and play/ is
// generated output. Char codes, not literals, so this file never trips its own check.
async function checkDashes() {
  const EM = String.fromCharCode(0x2014);
  const EN = String.fromCharCode(0x2013);
  const files = (await walkFiles(repoRoot))
    .filter((file) => extname(file).toLowerCase() === '.html')
    .filter((file) => {
      const shown = toDisplayPath(file);
      return !shown.startsWith('classic/') && !shown.startsWith('play/');
    });

  for (const file of files) {
    const content = await readFile(file, 'utf8');
    content.split(/\r?\n/).forEach((line, index) => {
      if (!line.includes(EM) && !line.includes(EN)) return;
      const which = line.includes(EM) ? 'em-dash' : 'en-dash';
      failures.push(
        `${toDisplayPath(file)}:${index + 1} uses an ${which}; published copy must use a colon, comma, full stop or brackets instead.`
      );
    });
  }
}

// Themes are declared on body[data-theme], so a custom property in film.css that aliases one
// must also live on body. A "var(--cyan)" written inside :root resolves against the :root default
// and freezes to a single colour in all eighteen themes, while still looking correct in whichever
// theme was used to build it. That has now happened twice: once to the scenery, once to the
// chapter accents. film.css keeps constants in :root and everything derived on body.film, and
// this enforces the split cheaply, without needing a browser.
async function checkFilmTokenScope() {
  const file = resolve(repoRoot, 'assets/css/film.css');
  if (!await fileExists(file)) return;

  const css = await readFile(file, 'utf8');
  const start = css.indexOf(':root {');
  if (start === -1) return;

  const block = css.slice(start, css.indexOf('}', start));
  for (const match of block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]*var\([^;]*)/gi)) {
    failures.push(
      `assets/css/film.css declares ${match[1]} in :root using ${match[2].trim()}; a token that aliases a theme value must be declared on body.film or it freezes to the :root default in every theme.`
    );
  }
}

async function checkFilmActHandoff() {
  const cssFile = resolve(repoRoot, 'assets/css/film.css');
  const jsFile = resolve(repoRoot, 'assets/js/film.js');
  if (!await fileExists(cssFile) || !await fileExists(jsFile)) return;

  const css = await readFile(cssFile, 'utf8');
  const js = await readFile(jsFile, 'utf8');

  // Two structural facts carry the handoff between chapter acts, and breaking either one is
  // invisible in a diff.
  //
  // This replaced an arithmetic check over three tuned numbers: how far the act wrappers
  // overlapped, how fast the outgoing copy faded, and how early the incoming copy arrived.
  // That check could only work while the copy's opacity was computed from scroll position,
  // and it passed a page with the title card and the next act printed on top of each other
  // once the copy started latching instead. The numbers are gone; these two facts are what
  // the page actually relies on now.

  // 1. Acts must not overlap. A negative margin between them puts two pinned screens in the
  //    same band, and with a latched reveal both are at full opacity there.
  const overlap = css.match(/\.act \+ \.act \{[^}]*margin-top:\s*-([0-9.]+)(vh|px|rem|em)/);
  if (overlap) {
    failures.push(
      `assets/css/film.css pulls chapter acts back over each other by ${overlap[1]}${overlap[2]}. Acts hand off by one pin scrolling away as the next climbs in; overlapping them puts two acts' copy in the same pixels, which the owner reported as the worst fault on the page.`
    );
  }

  // 2. The reveal must latch. It arrives once and is never taken off again: copy whose
  //    opacity or position is recomputed from scroll offset runs backwards when the reader
  //    scrolls back, and the text visibly twitches against the scrollbar.
  const latches = /classList\.add\(["']is-arrived["']\)/.test(js);
  const unlatches = /classList\.(remove|toggle)\(["']is-arrived["']/.test(js);
  if (!latches) {
    failures.push(
      'assets/js/film.js no longer adds the is-arrived class that reveals the copy in a chapter act, so either the reveal has been rewritten or it is dead. A reveal driven by a scroll-derived value instead of a latched class reverses when the reader scrolls back.'
    );
  }
  if (unlatches) {
    failures.push(
      'assets/js/film.js removes or toggles the is-arrived class. It must only ever be added: copy that has been shown to a reader has to stay shown, whatever they do with the wheel.'
    );
  }
}

// A chapter act is a pinned screen, and a sticky element taller than the viewport does not
// hold with its top at zero: it scrolls until its bottom is flush with the bottom of the
// screen, which puts its top above the fold and behind the fixed header. The reader sees a
// heading cut through the middle of its first line.
//
// Nothing static can catch this. It depends on how many lines the copy wraps to at the
// rendered type size, so it comes back the next time anyone lengthens a heading.
// The screens this is measured on. 1440x900 is the size every other measurement on this page
// uses; the other two are the laptop screens the chapter was failing on while it passed here.
// At 1366x768 the opening act ran 35px over and the problem act 71px, and at 1280x720 it was
// 67px and 115px, none of which a check that only ever looked at one height could see.
const FRAME_FIT_SIZES = [
  { width: 1440, height: 900 },
  { width: 1366, height: 768 },
  { width: 1280, height: 720 }
];

async function checkFilmFrameFit(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter frame fit check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }

  const files = (await walkFiles(repoRoot)).filter((file) => extname(file) === '.html');
  const routes = [];
  for (const file of files) {
    const html = await readFile(file, 'utf8');
    if (!/<body[^>]*class="[^"]*\bfilm\b/.test(html)) continue;
    routes.push('/' + toDisplayPath(file));
  }
  // Fail closed. A check that finds nothing to look at and reports success is
  // indistinguishable from a check that looked and found everything fine.
  if (routes.length === 0) {
    failures.push('The chapter frame fit check found no page carrying the film body class, so it measured nothing. Either the class was renamed or the check can no longer find the chapter pages.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  try {
    const page = await browser.newPage();
    for (const size of FRAME_FIT_SIZES) {
      await page.setViewport({ width: size.width, height: size.height, deviceScaleFactor: 1 });
      for (const route of routes) {
        await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle2' });
        const tall = await page.evaluate(() => {
          const pins = [...document.querySelectorAll('main > .act .act-pin')];
          return pins
            .map((pin, i) => ({ act: i + 1, over: Math.round(pin.getBoundingClientRect().height - window.innerHeight) }))
            .filter((row) => row.over > 1);
        });
        for (const row of tall) {
          failures.push(
            `${route} act ${row.act} needs ${row.over}px more than a ${size.width}x${size.height} screen is tall, so its pinned frame cannot hold with its top at the header line and the first line of its heading is cut off. Shorten the heading, or give that frame less to carry.`
          );
        }
      }
    }
  } finally {
    await browser.close();
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
    headless: true,
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
  await checkDownloadNames();
  await checkRedirectStub();
  await checkDashes();
  await checkFilmTokenScope();
  await checkFilmActHandoff();
  await checkStaticReferences();

  const { server, baseUrl } = await startStaticServer();
  try {
    await smokeTestRoutes(baseUrl);
    await checkFilmFrameFit(baseUrl);
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
