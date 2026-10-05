// ABOUTME: Validates protected GitHub Pages routes and local static asset references.
// ABOUTME: Can also smoke-test routes through a tiny local static server.

import { createReadStream, existsSync } from 'node:fs';
import { access, mkdir, readdir, readFile, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
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
  // This era's equivalent of .codex-tools, and git-ignored for the same reason. Without it the
  // browser checks measure scratch fixtures that exist on one machine and not in CI.
  '.claude-tools',
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

// "Chapter" is what this repository calls a project page while building it. A visitor reads a
// project called Cyber Sentinel, not a chapter of something. Owner, 2026-09-11: calling them
// chapters on the front end "is revealing our methodology". Only what a reader can see is
// checked: text between tags, and the text attributes a screen reader or a hover reads. Class
// names, data attributes, URLs, comments, scripts and styles keep the word, they are names.
async function checkNoChapterWordInCopy() {
  const files = (await walkFiles(repoRoot))
    .filter((file) => extname(file).toLowerCase() === '.html')
    .filter((file) => {
      const shown = toDisplayPath(file);
      return !shown.startsWith('classic/') && !shown.startsWith('play/');
    });

  for (const file of files) {
    const content = await readFile(file, 'utf8');
    const markup = content
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
    const seen = [];
    for (const match of markup.matchAll(/\b(?:aria-label|alt|title)="([^"]*)"/gi)) seen.push(match[1]);
    for (const text of markup.replace(/<[^>]*>/g, '\n').split(/\r?\n/)) seen.push(text);
    const hit = seen.find((text) => /\bchapters?\b/i.test(text));
    if (hit) {
      failures.push(
        `${toDisplayPath(file)} shows the word "chapter" to a reader: "${hit.trim().slice(0, 80)}". Name the project, not the repository's word for it.`
      );
    }
  }
}

// A date range that ends in Present is a claim with an expiry date, and nothing here notices when
// it passes. The owner's current role is the one fact the site keeps current, and it is shown twice
// on purpose: on the home timeline and on the CV page, because a recruiter reads both and checks one
// against the other, and dates that disagree read as carelessness or worse. So exactly those two
// may say Present, once each, and they must say the same thing. Anywhere else it is finished work
// that needs its end date.
async function checkPresentDates() {
  const roleFiles = ['index.html', 'cv.html'];
  const pattern = /\d\s*(?:-|to)\s*Present\b/i;
  const files = (await walkFiles(repoRoot))
    .filter((file) => extname(file).toLowerCase() === '.html')
    .filter((file) => {
      const shown = toDisplayPath(file);
      return !shown.startsWith('classic/') && !shown.startsWith('play/');
    });

  const roleRanges = new Map();
  for (const file of files) {
    const shown = toDisplayPath(file);
    const content = await readFile(file, 'utf8');
    const found = [];
    content.split(/\r?\n/).forEach((line, index) => {
      if (!pattern.test(line)) return;
      found.push({ line: index + 1, text: line.replace(/<[^>]+>/g, ' ').trim() });
    });

    if (!roleFiles.includes(shown)) {
      for (const hit of found) {
        failures.push(`${shown}:${hit.line} dates something as ongoing ("${hit.text}"). Only the current role may say Present; give finished work its end date.`);
      }
      continue;
    }
    if (found.length !== 1) {
      failures.push(`${shown} has ${found.length} date ranges ending in Present; it must have exactly one, the current role.`);
      continue;
    }
    roleRanges.set(shown, found[0]);
  }

  for (const file of roleFiles) {
    if (!files.some((candidate) => toDisplayPath(candidate) === file)) {
      failures.push(`${file} is missing, so the current role's dates cannot be checked.`);
    }
  }
  const [home, cv] = roleFiles.map((file) => roleRanges.get(file));
  if (home && cv && home.text !== cv.text) {
    failures.push(`The current role's dates disagree: index.html:${home.line} says "${home.text}" and cv.html:${cv.line} says "${cv.text}". Change both together.`);
  }
}

// docs/ and .claude/ hold notes written for the coding assistant, not for a reader of this
// repository, and the repository is public. .gitignore used to name each private doc one by one,
// so every new doc was public by default and two of them shipped that way. It now ignores the
// folders and names the one public file, but an ignore rule is not a gate: git add -f walks
// straight past it. So this asks git what it is actually tracking there.
async function checkPrivateFolders() {
  const allowed = new Set(['docs/maintenance.md']);
  let tracked;
  try {
    tracked = execFileSync('git', ['ls-files', '--', 'docs', '.claude'], { cwd: repoRoot, encoding: 'utf8' });
  } catch (error) {
    failures.push(`Could not ask git which files are tracked under docs/ and .claude/ (${error.message}); this check needs a git checkout.`);
    return;
  }
  for (const file of tracked.split(/\r?\n/).filter(Boolean)) {
    if (!allowed.has(file)) {
      failures.push(`${file} is tracked, so it is published on GitHub. docs/ and .claude/ are internal: untrack it with git rm --cached, or add it to the allowed list here if it is meant for readers.`);
    }
  }
}

// The visitor counter only records on one host, set in site-config.js. If the site moves to
// another domain and that setting does not move with it, real visits stop being counted and
// nothing on the page says so. sitemap.xml has to name the live domain anyway, so the two are
// held together here.
async function checkVisitorProofHost() {
  const config = await readFile(resolve(repoRoot, 'assets/js/site-config.js'), 'utf8');
  const sitemap = await readFile(resolve(repoRoot, 'sitemap.xml'), 'utf8');
  const host = config.match(/visitorProofHost:\s*"([^"]+)"/)?.[1];
  if (!host) {
    failures.push('assets/js/site-config.js sets no visitorProofHost, so the visitor counter would count no visit anywhere.');
    return;
  }
  const named = new Set([...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(([, loc]) => {
    try {
      return new URL(loc).hostname;
    } catch {
      return `an unreadable address (${loc})`;
    }
  }));
  if (named.size === 0) {
    failures.push("sitemap.xml lists no pages, so the visitor counter's host could not be checked against the live domain.");
    return;
  }
  for (const hostname of named) {
    if (hostname !== host) {
      failures.push(`sitemap.xml names ${hostname} but the visitor counter only counts visits on ${host} (visitorProofHost in assets/js/site-config.js). Change them together.`);
    }
  }
}

// The visitor counter has to stay silent in every browser npm test drives, and still count a real
// visitor. Three cases on the home page, each in a fresh browser, and each of the first two
// leaves exactly one of the counter's two rules able to keep it silent:
//   the local copy as served, in a browser that does not report automation, which is someone
//   previewing the site locally: only the host rule stands between it and a recorded visit;
//   the local copy presented as the published host, in an automated browser, which is a test
//   run against the live site: only the automation rule does;
//   the published host in a browser that does not report automation, which is how a visitor's
//   browser looks: the counter has to try.
// The third case is what tells silence because the rules work apart from silence because counting
// broke. It also proves the wait is long enough: if the counter ever waits longer than this check
// does, the third case fails rather than the first two passing for the wrong reason. guardPage
// refuses every request that leaves the local copy, so even the third case reaches nothing outside
// this machine.
//
// The counter waits 6s after the page loads, then up to 8s more for the browser to go idle.
const VISIT_COUNTER_WAIT_MS = 16000;

async function checkVisitCounting(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the visitor counter check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const config = await readFile(resolve(repoRoot, 'assets/js/site-config.js'), 'utf8');
  const endpoint = config.match(/visitorProofEndpoint:\s*"([^"]+)"/)?.[1];
  if (!endpoint) {
    failures.push('assets/js/site-config.js sets no visitorProofEndpoint, so the visitor counter check cannot tell whether a visit was sent.');
    return;
  }
  // The counter's own two routes: its edge function, and the table it falls back to writing.
  // Not the Supabase library itself, which the comments load from the same CDN.
  const isVisitRecord = (url) => url.startsWith(endpoint) || url.includes('/rest/v1/visitor_events');

  const cases = [
    { name: 'the local copy as served, in a browser that does not report automation', published: false, automated: false, expectVisit: false },
    { name: 'the local copy presented as the published host, in an automated browser', published: true, automated: true, expectVisit: false },
    { name: 'the local copy presented as the published host, in a browser that does not report automation', published: true, automated: false, expectVisit: true }
  ];

  const { default: puppeteer } = await import('puppeteer-core');
  for (const testCase of cases) {
    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', ...(testCase.automated ? [] : ['--disable-blink-features=AutomationControlled'])]
    });
    try {
      const page = await browser.newPage();
      if (testCase.published) {
        // site-config.js assigns window.PORTFOLIO_CONFIG. Catching that assignment points the
        // counter's host at wherever this copy is being served from, and changes nothing else.
        await page.evaluateOnNewDocument(() => {
          let held;
          Object.defineProperty(window, 'PORTFOLIO_CONFIG', {
            configurable: true,
            get: () => held,
            set: (value) => { held = { ...value, visitorProofHost: window.location.hostname }; }
          });
        });
      }
      await openPage(page, `${baseUrl}/`);
      const automated = await page.evaluate(() => navigator.webdriver === true);
      if (automated !== testCase.automated) {
        failures.push(`The visitor counter check could not set up ${testCase.name}: navigator.webdriver was ${automated}. Chrome has changed how it reports automation, so this check no longer tests what it says.`);
        continue;
      }
      const deadline = Date.now() + VISIT_COUNTER_WAIT_MS;
      while (Date.now() < deadline && !refusedRequests(page).some(isVisitRecord)) {
        await new Promise((resolveWait) => setTimeout(resolveWait, 250));
      }
      const tried = refusedRequests(page).some(isVisitRecord);
      if (tried && !testCase.expectVisit) {
        failures.push(`With ${testCase.name}, the visitor counter tried to record a visit. Test runs and local previews would be counted as visitors in the live data.`);
      }
      if (!tried && testCase.expectVisit) {
        failures.push(`With ${testCase.name}, the visitor counter never tried to record a visit within ${VISIT_COUNTER_WAIT_MS / 1000}s. Either real visitors are no longer counted, or the counter now waits longer than this check does.`);
      }
    } finally {
      await browser.close();
    }
  }
}

// The truck strip's mountain range is a repeating tile, and three files have to agree on its
// width for the loop to be invisible: the tile's own width in mountains.svg, the
// background-size in animations.css, and the distance the mtn keyframes travel. Before this
// they did not: a single non-repeating image slid 5350px in 20s, which left the strip with no
// mountain at all for seven seconds in every twenty, and cut the skyline off with a 55px
// vertical cliff at each of its own edges twice per pass.
//
// The artwork has to hold two properties as well, and neither is visible in a diff: the
// skyline has to match at the two tile edges, or the repeat shows a step, and it has to stay
// above the strip's own clip line, or the ground shows through a slit between two peaks.
async function checkTruckStripLoop() {
  const cssFile = resolve(repoRoot, 'assets/css/animations.css');
  const svgFile = resolve(repoRoot, 'assets/images/mountains.svg');
  if (!await fileExists(cssFile) || !await fileExists(svgFile)) {
    failures.push('The truck strip loop check needs assets/css/animations.css and assets/images/mountains.svg, and at least one of them is missing.');
    return;
  }

  const css = await readFile(cssFile, 'utf8');
  const rule = css.match(/\.mountain\s*\{([\s\S]*?)\}/);
  const keyframes = css.match(/@keyframes\s+mtn\s*\{([\s\S]*?)\}\s*\}/) || css.match(/@keyframes\s+mtn\s*\{([\s\S]*?)\n\}/);
  if (!rule || !keyframes) {
    failures.push('assets/css/animations.css no longer has both a .mountain rule and mtn keyframes, so the truck strip loop could not be checked.');
    return;
  }

  const size = rule[1].match(/background-size:\s*(\d+)px\s+(\d+)px/);
  const repeats = /background:[^;]*\brepeat-x\b/.test(rule[1]);
  const travel = keyframes[1].match(/translateX\(\s*-(\d+)px\s*\)/);
  const sits = rule[1].match(/bottom:\s*(-?\d+)px/);
  if (!size || !travel || !sits) {
    failures.push('assets/css/animations.css .mountain must set background-size in pixels, a bottom offset in pixels, and mtn must translateX a pixel distance, so that the tile width, the clip line and the travel can be compared.');
    return;
  }
  const tile = Number(size[1]);
  const tall = Number(size[2]);
  const clip = Math.max(0, -Number(sits[1]));

  if (!repeats) {
    failures.push('assets/css/animations.css .mountain does not repeat-x its background. A single tile runs out before the loop comes round, and the strip shows no mountain at all for part of every pass.');
  }
  if (Number(travel[1]) !== tile) {
    failures.push(`assets/css/animations.css moves the mountain range ${travel[1]}px per loop while its tile is ${tile}px wide. The travel has to be exactly one tile or the skyline jumps once per loop.`);
  }

  // The skyline the artwork actually draws, as the union of its triangles, with the copies one
  // tile either side that make the tile seamless.
  const svg = await readFile(svgFile, 'utf8');
  const box = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  if (!box || Number(box[1]) !== tile || Number(box[2]) !== tall) {
    failures.push(`assets/images/mountains.svg is ${box ? `${box[1]}x${box[2]}` : 'not on a 0 0 w h viewBox'} while animations.css draws it at ${tile}x${tall}. A scaled tile makes every measurement below meaningless.`);
    return;
  }
  const triangles = [...svg.matchAll(/points="([^"]+)"/g)]
    .map((match) => match[1].trim().split(/[\s,]+/).map(Number))
    .filter((n) => n.length === 6 && n[0] < n[2] && n[2] < n[4]);
  if (triangles.length < 3) {
    failures.push('assets/images/mountains.svg has fewer than three left-to-right triangles, so its skyline could not be read. Either the artwork changed shape or this check can no longer read it.');
    return;
  }
  // Where the artwork is actually painted, read from the file rather than assumed. What makes
  // the tile seamless is that each range is drawn again one tile to the left and one to the
  // right, and that is a <use x> per copy. Measuring the polygon list as if those copies were
  // always there would report a seamless tile however the file draws it.
  const uses = [...svg.matchAll(/<use\b[^>]*>/g)].map((tag) => Number((tag[0].match(/\sx="(-?\d+)"/) || [0, 0])[1]));
  const drawn = [...new Set(uses.length ? uses : [0])];
  if (uses.length && /<polygon/.test(svg.replace(/<defs>[\s\S]*<\/defs>/, ''))) {
    failures.push('assets/images/mountains.svg mixes polygons drawn directly with polygons drawn through <use>, and this check reads only one of those. Put every triangle in the defs block or this measurement is not describing the file.');
    return;
  }
  const topAt = (x) => {
    let top = tall;
    for (const [ax, ay, bx, by, cx, cy] of triangles) {
      for (const shift of drawn) {
        const a = ax + shift, b = bx + shift, c = cx + shift;
        if (x < a || x > c) continue;
        const y = x <= b ? ay + (x - a) / (b - a) * (by - ay) : by + (x - b) / (c - b) * (cy - by);
        if (y < top) top = y;
      }
    }
    return top;
  };
  let lowest = { height: Infinity, x: 0 };
  for (let x = 0; x < tile; x++) {
    const height = tall - topAt(x);
    if (height < lowest.height) lowest = { height, x };
  }
  // A tile edge that does not match its opposite edge is the vertical cliff, measured.
  const seam = Math.abs((tall - topAt(0)) - (tall - topAt(tile - 1)));
  if (seam > 2) {
    failures.push(`assets/images/mountains.svg is ${seam.toFixed(1)}px taller at one edge of the tile than the other, so every repeat shows a vertical step in the skyline. Draw each range again at -${tile} and +${tile} so what leaves one edge arrives at the other.`);
  }
  if (lowest.height <= clip + 4) {
    failures.push(`assets/images/mountains.svg drops to ${lowest.height.toFixed(1)}px at x=${lowest.x}, and animations.css hides the bottom ${clip}px of it. The range vanishes there and the ground line shows through a slit between two peaks.`);
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
// Every page that carries the film body class, which is what makes a page a chapter.
async function filmRoutes() {
  const files = (await walkFiles(repoRoot)).filter((file) => extname(file) === '.html');
  const routes = [];
  for (const file of files) {
    const html = await readFile(file, 'utf8');
    if (!/<body[^>]*class="[^"]*\bfilm\b/.test(html)) continue;
    routes.push('/' + toDisplayPath(file));
  }
  return routes;
}

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

  const routes = await filmRoutes();
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
        await openPage(page, `${baseUrl}${route}`);
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

// The widths this is measured at, and why these two. 1181 is the narrowest screen that still
// shows the rail and the running head, so it is where they come closest to the copy. 2560 is
// where the fault this catches was visible: the gutter is max(--film-inset, (100vw - --max)/2)
// and grows without limit, so chrome centred inside a container as wide as the gutter walked
// 340px in from the right edge of that screen while measuring 0px from the edge at 1440.
const EDGE_CHROME_SIZES = [
  { width: 1181, height: 800 },
  { width: 2560, height: 1440 }
];
// How far a piece of edge chrome may sit from the edge it is pinned to, as a share of the
// screen width. At 6% of 2560 it is already 154px in, which no reader would call an edge.
const EDGE_CHROME_SHARE = 0.06;
// How far the reading column's left edge may sit right of the wordmark's, in pixels. The two
// come from different rules and will never be to the pixel; 64 is about one indent, past which
// the eye stops reading them as one edge.
// How much of a piece of chrome's own rectangle has to change when it is hidden, before the
// page can be said to be drawing it. Low on purpose: a two pixel hairline inside the fourteen
// pixel letterbox bar changes a seventh of the bar's rectangle and that is the whole of it.
const CHROME_DRAWN_SHARE = 0.02;
const COLUMN_EDGE_DRIFT = 64;

async function checkFilmEdgeChrome(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter edge chrome check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter edge chrome check found no page carrying the film body class, so it measured nothing.');
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
    for (const size of EDGE_CHROME_SIZES) {
      await page.setViewport({ width: size.width, height: size.height, deviceScaleFactor: 1 });
      for (const route of routes) {
        await openPage(page, `${baseUrl}${route}`);
        // The copy scrolls under the header, so the header has to be opaque.
        //
        // It was 95% of the page's ground mixed with transparent, with a blur behind it, and
        // the chapter's own title read straight through it as the reader left the first act:
        // measured as a luma spread of 5.2 in a band of the bar carrying none of the bar's own
        // ink, against 1 to 2 for the room's dither. A blur softens what shows through; it does
        // not stop it.
        await page.evaluate(() => new Promise((done) => setTimeout(done, 400)));
        const seeThrough = await page.evaluate(() => {
          const bar = document.querySelector('.site-header');
          if (!bar) return 'missing';
          const background = getComputedStyle(bar).backgroundColor;
          if (background === 'transparent') return background;
          // Two serialisations, and reading only the first is how this check passed a header
          // that was 95% opaque: a color-mix comes back as color(srgb r g b / a), not as rgba().
          const slash = background.lastIndexOf('/');
          const alpha = slash >= 0
            ? Number(background.slice(slash + 1, background.lastIndexOf(')')))
            : (background.startsWith('rgba') ? Number(background.slice(background.lastIndexOf(',') + 1, -1)) : 1);
          return Number.isFinite(alpha) && alpha < 0.999 ? background : null;
        });
        if (seeThrough === 'missing') {
          failures.push(`${route} has no site header, so the check that copy cannot read through it measured nothing.`);
        } else if (seeThrough) {
          failures.push(`${route} draws its fixed header at ${seeThrough}, which is not opaque. The page's own copy scrolls under that bar and reads through it.`);
        }
        const marks = await page.evaluate(() => {
          // The mark a reader sees, not the box it is positioned in. A container pinned to
          // the edge and as wide as the gutter measures 0px from the edge however far inside
          // it the dots actually sit, which is how this went unnoticed.
          const ink = (selector, from) => {
            const root = document.querySelector(selector);
            if (!root) return null;
            const inside = [...root.querySelectorAll('*')].filter((el) => el.childElementCount === 0);
            const marks = (inside.length ? inside : [root]).filter((el) => {
              const box = el.getBoundingClientRect();
              const style = getComputedStyle(el);
              return box.width >= 1 && box.height >= 1 && style.visibility !== 'hidden' && Number(style.opacity) > 0.05;
            });
            if (!marks.length) return null;
            return Math.min(...marks.map((el) => {
              const box = el.getBoundingClientRect();
              return from === 'right' ? innerWidth - box.right : box.left;
            }));
          };
          // The reading column against the page's own left edge. film.css says a reader should
          // be able to draw a straight line down the left edge of the page from the wordmark
          // to the footer, and a container capped at --max and centred cannot keep that: the
          // stage behind it is the whole viewport, so every pixel of leftover width becomes
          // dead screen on the left that the scene never grows on the right. Measured at 130px
          // in on a 1440 screen, 370px at 1920 and 1130px at 3440, against a wordmark that
          // stayed at 56px.
          const brand = document.querySelector('.site-nav .brand, .site-header .brand, header a');
          const column = document.querySelector('main .act .section-inner') || document.querySelector('main .section-inner');
          const straight = brand && column
            ? Math.round(column.getBoundingClientRect().left - brand.getBoundingClientRect().left)
            : null;
          return {
            'act rail': ink('.film-act-nav', 'right'),
            'running head': ink('.film-spine', 'left'),
            'play control': ink('.film-play', 'right'),
            straight
          };
        });
        const straight = marks.straight;
        delete marks.straight;
        if (straight === null) {
          failures.push(`${route} has no wordmark or no reading column that this check can find at ${size.width}x${size.height}, so the page's left edge could not be measured.`);
        } else if (straight > COLUMN_EDGE_DRIFT) {
          failures.push(
            `${route} sets its reading column ${straight}px right of the wordmark above it on a ${size.width}px screen, ceiling ${COLUMN_EDGE_DRIFT}px. A column centred inside a capped container walks inward as the window grows while the scene behind it stays full width, so the whole composition slides to one side and the other side goes dead. Anchor the container to the page inset instead of centring it.`
          );
        }
        // Fail closed. All three are built by film.js on every chapter page, so none of them
        // being measurable means the selectors moved, not that the page is fine.
        if (Object.values(marks).every((value) => value === null)) {
          failures.push(`${route} showed none of the act rail, running head or play control at ${size.width}x${size.height}, so nothing could be measured. Either film.js stopped building them or this check can no longer find them.`);
          continue;
        }
        for (const [name, value] of Object.entries(marks)) {
          if (value === null) continue;
          if (value / size.width > EDGE_CHROME_SHARE) {
            failures.push(
              `${route} puts the ${name} ${Math.round(value)}px from its own edge on a ${size.width}px screen, ${((value / size.width) * 100).toFixed(1)}% of the width against a ceiling of ${EDGE_CHROME_SHARE * 100}%. Edge chrome centred in a gutter walks toward the middle of the page as the window grows; pin it to the edge instead.`
            );
          }
        }

        // Every piece of chrome the film builds actually changes the pixels where it is.
        //
        // The progress indicator was built, positioned, given the act's colour and updated on
        // every scroll, and no reader ever saw it: it sits at the bottom edge of the header at
        // z-index 25 and the top letterbox bar sits at the same place, 14px of the page's own
        // ground, at 26. Every check the page had asked whether a thing existed and where its
        // box was. None asked whether it reached the reader.
        //
        // Measured by hiding one piece at a time and comparing only its own rectangle, so a
        // piece that is drawn but identical to what is behind it fails and a piece that merely
        // moved the layout does not. visibility, not display: the film reads the acts' own
        // rects to drive the camera.
        const shotOf = async () => page.screenshot({ encoding: 'base64' });
        const differsInside = (a, b, rect) => page.evaluate(async ([one, two, box]) => {
          const read = async (data) => {
            const img = new Image();
            img.src = 'data:image/png;base64,' + data;
            await img.decode();
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);
            return { px: ctx.getImageData(0, 0, canvas.width, canvas.height).data, w: canvas.width, h: canvas.height };
          };
          const first = await read(one);
          const second = await read(two);
          const x0 = Math.max(0, Math.floor(box[0]));
          const y0 = Math.max(0, Math.floor(box[1]));
          const x1 = Math.min(first.w - 1, Math.ceil(box[2]));
          const y1 = Math.min(first.h - 1, Math.ceil(box[3]));
          let moved = 0;
          let total = 0;
          for (let y = y0; y <= y1; y++) {
            for (let x = x0; x <= x1; x++) {
              const i = (y * first.w + x) * 4;
              total++;
              const d = Math.abs(first.px[i] - second.px[i]) + Math.abs(first.px[i + 1] - second.px[i + 1]) + Math.abs(first.px[i + 2] - second.px[i + 2]);
              if (d > 8) moved++;
            }
          }
          return total > 0 ? moved / total : 0;
        }, [a, b, rect]);

        // Partway through the film, so anything whose size tracks the scroll is not at zero.
        await page.evaluate(() => {
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo(0, Math.round(document.documentElement.scrollHeight * 0.5));
        });
        // Until the progress bar has caught up with the scroll, not for a fixed time. It is set
        // from an animation frame after the scroll, and a load can land the scroll in a long
        // first frame: 3 loads in 9 took over a second under a throttled CPU, on code from before
        // 2026-10-05, and a fixed 600ms failed two CI runs in four that way. A bar that never
        // gets a width still fails below, after five seconds, with the same message.
        try {
          await page.waitForFunction(() => {
            const bar = document.querySelector('.film-progress');
            return !bar || bar.getBoundingClientRect().width >= 1;
          }, { timeout: 5000 });
        } catch (error) {
          if (error?.name !== 'TimeoutError') throw error;
        }
        const pieces = await page.evaluate(() => [...document.querySelectorAll('.film-progress, .film-spine, .film-act-nav, .film-play, .film-bar')]
          .map((el, i) => {
            el.dataset.filmChromeId = String(i);
            const rect = el.getBoundingClientRect();
            return {
              id: String(i),
              name: el.className.split(' ').find((c) => c.startsWith('film-')) || el.tagName.toLowerCase(),
              rect: [rect.left, rect.top, rect.right, rect.bottom],
              width: rect.width,
              height: rect.height
            };
          }));
        if (pieces.length === 0) {
          failures.push(`${route} builds none of the film's own chrome at ${size.width}x${size.height}, so whether any of it reaches the reader could not be measured.`);
        }
        const withAll = await shotOf();
        for (const piece of pieces) {
          if (piece.width < 1 || piece.height < 1) {
            failures.push(`${route} draws its ${piece.name} at ${Math.round(piece.width)}x${Math.round(piece.height)} halfway through the film, so there is nothing of it on screen.`);
            continue;
          }
          await page.evaluate((id) => {
            document.querySelector(`[data-film-chrome-id="${id}"]`).style.visibility = 'hidden';
          }, piece.id);
          const without = await shotOf();
          await page.evaluate((id) => {
            document.querySelector(`[data-film-chrome-id="${id}"]`).style.visibility = '';
          }, piece.id);
          const share = await differsInside(withAll, without, piece.rect);
          if (share < CHROME_DRAWN_SHARE) {
            failures.push(
              `${route} builds a ${piece.name} halfway through the film that changes ${(share * 100).toFixed(1)}% of its own ${Math.round(piece.width)}x${Math.round(piece.height)} rectangle, floor ${CHROME_DRAWN_SHARE * 100}%. It is positioned, coloured and updated, and nothing of it reaches the reader: something is painted over it.`
            );
          }
        }
        await page.evaluate(() => {
          document.querySelectorAll('[data-film-chrome-id]').forEach((el) => { delete el.dataset.filmChromeId; });
          window.scrollTo(0, 0);
        });
      }
    }
  } finally {
    await browser.close();
  }
}

// How much of the frame the chapter's closing set must fill at the last frame of its act.
//
// The closing act is the only one the camera does not fly through, so size is the only way it
// can read as arrived at rather than watched from across the room. It was measured at 17.6% of
// the frame, its biggest, at the final sample of the act, while the three acts before it
// reached 96%, 100% and 52%. A quarter is the line below which it is a detail in a room.
const CLOSING_SET_SHARE = 0.25;
// How far outside the frame a set that declares itself contained may reach, as a share of the
// frame's width. A contained set is one whose surfaces the reader is meant to read, and a
// screen with its top row of text past the edge is not readable. Not zero, because the pointer
// moves the camera a little and the margin that allows for is the engine's business.
const CONTAINED_SPILL = 0.02;

// The closing set is big enough to be the subject, and a contained one is whole.
//
// Both numbers come out of the engine's own docking arithmetic, which is easy to get wrong in a
// way nothing on the page complains about: the standoff that keeps a set inside the frame was
// measured from the camera's own x while the camera was already turned towards the set, and
// against the middle of the set rather than its near face. The first cost the closing act half
// its size, the second called a subject contained while its near corners were a fifth outside
// the frame.
async function checkFilmClosingSet(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter closing set check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }

  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter closing set check found no page carrying the film body class, so it measured nothing. Either the class was renamed or the check can no longer find the chapter pages.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?still&scene-debug`, { scene: true });
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1800)));
      const published = await page.evaluate(() => Boolean(window.chapterFilm));
      if (!published) {
        failures.push(`${route} did not publish its scene through ?scene-debug, so the closing set could not be measured. A chapter page has to keep that seam for this check to mean anything.`);
        continue;
      }
      const end = await page.evaluate(() => {
        const acts = [...document.querySelectorAll('main > .act')];
        const last = acts[acts.length - 1];
        if (!last) return null;
        const top = Math.round(last.getBoundingClientRect().top + window.scrollY);
        const span = Number(last.dataset.stationSpan) || Math.round(last.getBoundingClientRect().height);
        return top + span;
      });
      if (end === null) {
        failures.push(`${route} carries the film body class but has no acts, so there is no closing set to measure.`);
        continue;
      }
      await page.evaluate((to) => window.scrollTo(0, to), end);
      // The camera follows a damped scroll value and arrives over about 45 frames, so this has
      // to settle in frames. Waiting in milliseconds measures where the camera used to be.
      await page.evaluate(() => new Promise((done) => {
        let n = 0;
        const tick = () => (++n > 50 ? done() : requestAnimationFrame(tick));
        requestAnimationFrame(tick);
      }));
      const shot = await page.evaluate(() => {
        const film = window.chapterFilm;
        const camera = film.camera;
        const station = film.stations[film.stations.length - 1];
        let min = null;
        let max = null;
        station.group.updateMatrixWorld(true);
        station.group.traverse((node) => {
          if (!node.isMesh && !node.isLine && !node.isLineSegments && !node.isPoints) return;
          // Dust, glow and captions are the room, not the subject, and they are authored to
          // run past the frame on purpose.
          for (let p = node; p && p !== station.group.parent; p = p.parent) {
            if (p.userData && (p.userData.ambient || p.userData.caption)) return;
          }
          if (!node.geometry) return;
          if (!node.geometry.boundingBox) node.geometry.computeBoundingBox();
          const bb = node.geometry.boundingBox;
          node.updateWorldMatrix(true, false);
          for (let c = 0; c < 8; c++) {
            const v = bb.min.clone();
            if (c & 1) v.x = bb.max.x;
            if (c & 2) v.y = bb.max.y;
            if (c & 4) v.z = bb.max.z;
            v.applyMatrix4(node.matrixWorld);
            if (!min) { min = v.clone(); max = v.clone(); } else { min.min(v); max.max(v); }
          }
        });
        if (!min) return null;
        let x0 = Infinity;
        let y0 = Infinity;
        let x1 = -Infinity;
        let y1 = -Infinity;
        for (let c = 0; c < 8; c++) {
          const v = min.clone();
          if (c & 1) v.x = max.x;
          if (c & 2) v.y = max.y;
          if (c & 4) v.z = max.z;
          // A corner behind the camera projects to nonsense, so say so rather than measure it.
          if (v.clone().applyMatrix4(camera.matrixWorldInverse).z > -0.1) return { behind: true };
          v.project(camera);
          x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x);
          y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y);
        }
        const width = Math.max(0, Math.min(1, x1) - Math.max(-1, x0)) / 2;
        const height = Math.max(0, Math.min(1, y1) - Math.max(-1, y0)) / 2;
        return {
          behind: false,
          contained: Boolean(station.contained),
          share: width * height,
          spill: Math.max(0, -1 - x0, x1 - 1, -1 - y0, y1 - 1) / 2
        };
      });
      if (!shot) {
        failures.push(`${route} closing set has nothing in it that is not dust or a caption, so the chapter ends on an empty room.`);
        continue;
      }
      if (shot.behind) {
        failures.push(`${route} ends with part of its closing set behind the camera, so the chapter closes on a room the reader has already flown through.`);
        continue;
      }
      if (shot.share < CLOSING_SET_SHARE) {
        failures.push(
          `${route} closing set fills ${(shot.share * 100).toFixed(1)}% of the last frame of its act, floor ${CLOSING_SET_SHARE * 100}%. The chapter ends on a subject the reader watches from across the room instead of one they arrived at.`
        );
      }
      if (shot.contained && shot.spill > CONTAINED_SPILL) {
        failures.push(
          `${route} closing set says it is contained but ${(shot.spill * 100).toFixed(1)}% of the frame's width of it is outside the frame, ceiling ${CONTAINED_SPILL * 100}%. Its surfaces are what the reader is meant to read, and the engine's standoff is not keeping them whole.`
        );
      }
    }
  } finally {
    await browser.close();
  }
}

// Where in each act to look. The first three are inside the hold, where the camera is parked in
// front of its own set and a reader is stationary in front of it. The fourth is the transit,
// where the camera has left this set and the next one is still ahead: the frame still carries
// this act's words, so it is still a frame a reader stops on.
const FRAMING_DEPTHS = [0, 0.2, 0.45, 0.7];
// Up and down the frame, only the hold is judged. A set leaving the frame during a flight is
// the flight, and the engine's own note says so.
const FRAMING_HOLD = 0.45;
// Where the subject's middle may sit, as a share of the frame measured from the top. Half is
// the neutral answer and a third down is the cinematographic one, so the band runs from a third
// to a little below the middle.
const SUBJECT_BAND = [0.35, 0.62];
// How far that middle may move across the reading window. This is the one that matters: every
// act's opening frame was already right and none of them stayed right, because each set's move
// descends the camera through its act while the camera aimed at a height derived from its own.
// Six per cent of the frame is 54 pixels at 900 high.
const SUBJECT_DRIFT = 0.06;
// Within this much of an edge, the subject's middle stops meaning anything: what is measured
// then is the middle of the part still in shot, and that moves when the subject grows as
// readily as when the composition does. A subject this close to one edge is judged on the
// other one instead.
const SUBJECT_EDGE = 0.06;
// How much of the frame may be empty on the side away from the edge the subject is running off.
// A set filling the frame and running off the top is a camera that has arrived. A set running
// off the top with half the frame empty underneath is a camera aiming at itself, which is what
// act three did for the whole second half of its hold.
const SUBJECT_OVERRUN = 0.2;
// Across the frame, how much wider the dead band at one edge may be than the dead band at the
// other, counting both the scene and the page's own words. A set is not meant to be centred:
// the copy takes one side of the frame and the set stands in the lane beside it. What this
// catches is a frame where content runs to one edge and a fifth of the screen at the other has
// nothing in it at all, which is a composition made for a reader sitting off to one side.
const EDGE_IMBALANCE = 0.12;

// Where each act's set sits in the frame, across it and up and down it.
//
// It exists because nothing measured the second of those. Eighteen deterministic sweeps and
// five gates all measured the horizontal axis, because the complaint they were written for was
// that everything leaned right; the owner then found a set floating at the top of the frame
// with the space beneath it empty and no number in this repository could report it.
//
// Measured from pixels rather than from the geometry's bounding boxes, and the difference is
// not academic: the two disagree by up to 0.13 of the frame on this page, because a box around
// a sparse wireframe reaches further than anything drawn inside it, and a material at three per
// cent opacity has a bounding box and no pixels. The question is where the set appears, so the
// answer has to come from what was drawn.
async function checkFilmSetFraming(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter set framing check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }

  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter set framing check found no page carrying the film body class, so it measured nothing. Either the class was renamed or the check can no longer find the chapter pages.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    // One size. The field of view is vertical, so how much of a set fits up and down the frame
    // does not change with the width of the window, and the widest screen is not the one with
    // the least margin across it either: the fault this caught at 1440 read 16% against a 12%
    // ceiling, and 20% at 1920 and 2560.
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?still&scene-debug`, { scene: true });
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1800)));
      const seam = await page.evaluate(() => Boolean(window.chapterFilm)
        && typeof window.chapterFilm.pause === 'function'
        && typeof window.chapterFilm.render === 'function'
        && typeof window.chapterFilm.resume === 'function');
      if (!seam) {
        failures.push(`${route} did not publish a scene that can be held still through ?scene-debug, so where its sets sit in the frame could not be measured. A chapter page has to keep that seam for this check to mean anything.`);
        continue;
      }
      const bands = await page.evaluate(() => [...document.querySelectorAll('main > .act')].map((act, i) => ({
        act: i + 1,
        top: Math.round(act.getBoundingClientRect().top + window.scrollY),
        span: Number(act.dataset.stationSpan) || Math.round(act.getBoundingClientRect().height)
      })));
      if (bands.length === 0) {
        failures.push(`${route} carries the film body class but has no acts, so there are no sets to measure.`);
        continue;
      }

      // One layer at a time, by visibility rather than by display: the engine drives the camera
      // off the acts' own rects, and taking them out of layout would move the camera while it
      // is being measured. Only main counts as the page's own words. The site header's nav sits
      // in the right half of every frame at the same brightness as a heading, and counting it
      // reads the copy's weight as right of centre on a screen where the text is left of it.
      const showOnly = (layer) => page.evaluate((which) => {
        for (const el of document.body.children) {
          if (el.tagName === 'SCRIPT') continue;
          const isCanvas = el.tagName === 'CANVAS' || el.querySelector('canvas');
          const isMain = el.tagName === 'MAIN';
          el.style.visibility = (which === 'scene' ? isCanvas : isMain) ? '' : 'hidden';
        }
        document.querySelectorAll('*').forEach((el) => {
          if (getComputedStyle(el).position === 'fixed' && el.tagName !== 'CANVAS') el.style.visibility = 'hidden';
        });
      }, layer);

      for (const band of bands) {
        let opened = null;
        for (const depth of FRAMING_DEPTHS) {
          await page.evaluate((to) => window.scrollTo(0, to), Math.round(band.top + band.span * depth));
          // The camera arrives over about 45 frames, so this settles in frames, not in
          // milliseconds. Waiting in milliseconds measures where the camera used to be.
          await page.evaluate(() => new Promise((done) => {
            let n = 0;
            const tick = () => (++n > 50 ? done() : requestAnimationFrame(tick));
            requestAnimationFrame(tick);
          }));
          // The film has to be held still before anything is hidden. Its loop writes each
          // station group's visibility every frame and each set's update writes visibility on
          // its own parts, so with it running anything hidden here is drawn again before the
          // shot is taken.
          await page.evaluate(() => window.chapterFilm.pause());
          const draw = (mode) => page.evaluate(([i, what]) => {
            window.chapterFilm.stations.forEach((station, si) => {
              station.group.traverse((node) => {
                if (node.userData.filmWasVisible === undefined) node.userData.filmWasVisible = node.visible;
                if (what === 'restore') {
                  node.visible = node.userData.filmWasVisible;
                  delete node.userData.filmWasVisible;
                  return;
                }
                if (node === station.group) {
                  node.visible = what !== 'none' && si === i;
                  return;
                }
                // Dust, drift and labels spread across the whole frame by design. Counting
                // them would say every act fills its frame from edge to edge.
                const scenery = Boolean(node.userData.ambient || node.userData.caption);
                node.visible = node.userData.filmWasVisible && !scenery;
              });
            });
            if (what !== 'restore') window.chapterFilm.render();
          }, [band.act - 1, mode]);

          await showOnly('scene');
          await draw('none');
          const empty = await page.screenshot({ encoding: 'base64' });
          await draw('subject');
          const subject = await page.screenshot({ encoding: 'base64' });
          // The whole scene, not one act's subject: what fills the frame during a transit is
          // whatever is drawn, including the act ahead and the matter along the track.
          await draw('restore');
          await page.evaluate(() => window.chapterFilm.resume());
          const scene = await page.screenshot({ encoding: 'base64' });
          await showOnly('page');
          const copy = await page.screenshot({ encoding: 'base64' });

          // Ink per row and per column: the per pixel luma difference between two shots. For
          // the set that is the act's subject against the same camera in an empty room, which
          // is a control frame rather than a threshold against the room's own colour, because
          // the track carries drifting matter through every frame and a colour threshold counts
          // that as part of the act.
          const profile = (a, b) => page.evaluate(async ([one, two]) => {
            const read = async (data) => {
              const img = new Image();
              img.src = 'data:image/png;base64,' + data;
              await img.decode();
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d', { willReadFrequently: true });
              ctx.drawImage(img, 0, 0);
              return { px: ctx.getImageData(0, 0, canvas.width, canvas.height).data, w: canvas.width, h: canvas.height };
            };
            const first = await read(one);
            const second = await read(two);
            const luma = (px, i) => px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114;
            const rows = new Array(first.h).fill(0);
            const cols = new Array(first.w).fill(0);
            for (let y = 0; y < first.h; y++) {
              for (let x = 0; x < first.w; x++) {
                const i = (y * first.w + x) * 4;
                const d = Math.abs(luma(first.px, i) - luma(second.px, i));
                // Below this is the room's own dither, not something drawn in front of it.
                if (d <= 3) continue;
                rows[y] += d;
                cols[x] += d;
              }
            }
            // Smoothed, then cut at two per cent of the brightest line. A single bright speck
            // cannot reach that, and it sits below the fall-off where a fraction of a point
            // moves the reported edge by a tenth of the frame.
            const bandOf = (series) => {
              const reach = Math.max(6, Math.round(series.length / 90));
              const smooth = series.map((_, i) => {
                let sum = 0;
                for (let k = Math.max(0, i - reach); k <= Math.min(series.length - 1, i + reach); k++) sum += series[k];
                return sum / (reach * 2 + 1);
              });
              const peak = Math.max(...smooth);
              if (peak <= 0) return null;
              const floor = peak * 0.02;
              const lo = smooth.findIndex((v) => v >= floor);
              if (lo < 0) return null;
              const hi = smooth.length - 1 - [...smooth].reverse().findIndex((v) => v >= floor);
              return { lo: lo / series.length, hi: (hi + 1) / series.length };
            };
            return { down: bandOf(rows), across: bandOf(cols) };
          }, [a, b]);

          // Where a layer's content reaches, across the frame. Measured as distance from the
          // room's own colour rather than as a difference against an empty room, because what
          // this answers is whether a reader sees anything at that edge of the screen, and the
          // fog, the room's gradient and the matter drifting along the track are all things a
          // reader sees. The ground is read from the frame's own corners rather than assumed,
          // because each act tints its room.
          const spread = (shot) => page.evaluate(async (data) => {
            const img = new Image();
            img.src = 'data:image/png;base64,' + data;
            await img.decode();
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);
            const px = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const at = (x, y) => {
              const i = (y * canvas.width + x) * 4;
              return [px[i], px[i + 1], px[i + 2]];
            };
            const corners = [at(2, 2), at(canvas.width - 3, 2), at(2, canvas.height - 3), at(canvas.width - 3, canvas.height - 3)];
            const ground = [0, 1, 2].map((k) => corners.reduce((sum, p) => sum + p[k], 0) / corners.length);
            const cols = new Array(canvas.width).fill(0);
            for (let y = 0; y < canvas.height; y += 2) {
              for (let x = 0; x < canvas.width; x++) {
                const i = (y * canvas.width + x) * 4;
                const d = Math.abs(px[i] - ground[0]) + Math.abs(px[i + 1] - ground[1]) + Math.abs(px[i + 2] - ground[2]);
                if (d > 24) cols[x] += d;
              }
            }
            const reach = Math.max(8, Math.round(cols.length / 90));
            const smooth = cols.map((_, i) => {
              let sum = 0;
              for (let k = Math.max(0, i - reach); k <= Math.min(cols.length - 1, i + reach); k++) sum += cols[k];
              return sum / (reach * 2 + 1);
            });
            const peak = Math.max(...smooth);
            if (peak <= 0) return null;
            // Two per cent of the brightest column. Six was the first answer and it sits inside
            // a fall-off: act one's drift flock fades away toward the right edge through exactly
            // that value, and a one point change in the profile moved the reported edge of the
            // frame by 13% of the screen.
            const floor = peak * 0.02;
            const lo = smooth.findIndex((v) => v >= floor);
            if (lo < 0) return null;
            const hi = smooth.length - 1 - [...smooth].reverse().findIndex((v) => v >= floor);
            return { lo: lo / cols.length, hi: (hi + 1) / cols.length };
          }, shot);

          const subjectShape = (await profile(subject, empty)).down;
          const sceneShape = await spread(scene);
          const copyShape = await spread(copy);
          const at = `${route} act ${band.act} at ${Math.round(depth * 100)}% through it`;

          // Across the frame, counting both layers.
          if (!sceneShape || !copyShape) {
            failures.push(`${at}: one of the two layers drew nothing, so how the frame is balanced across the screen could not be measured.`);
          } else {
            const left = Math.min(sceneShape.lo, copyShape.lo);
            const right = Math.max(sceneShape.hi, copyShape.hi);
            const imbalance = left - (1 - right);
            if (Math.abs(imbalance) > EDGE_IMBALANCE) {
              failures.push(`${at}: ${Math.round(left * 100)}% of the screen is empty at the left edge against ${Math.round((1 - right) * 100)}% at the right, ceiling ${Math.round(EDGE_IMBALANCE * 100)}% apart. The frame is composed for a reader sitting off to one side of it.`);
            }
          }

          // Up and down the frame, the act's own subject only, and only while the camera is
          // parked in front of it. Past the hold it has flown through and the act's own set is
          // behind it, so there is nothing of it to place.
          if (depth > FRAMING_HOLD) continue;
          if (!subjectShape) {
            failures.push(`${at}: its own set draws nothing at all, at a depth the camera is still parked in front of it. A set that is not there cannot be what the act is about.`);
            continue;
          }
          const middle = (subjectShape.lo + subjectShape.hi) / 2;
          const above = subjectShape.lo;
          const below = 1 - subjectShape.hi;
          const atTop = above <= SUBJECT_EDGE;
          const atBottom = below <= SUBJECT_EDGE;
          if (opened === null) opened = { middle, atTop, atBottom };

          // Filling the frame in both directions. There is no composition left to judge and no
          // empty frame to complain about.
          if (atTop && atBottom) continue;
          if (atTop || atBottom) {
            const opposite = atTop ? below : above;
            if (opposite > SUBJECT_OVERRUN) {
              failures.push(`${at}: its set runs off the ${atTop ? 'top' : 'bottom'} of the frame with ${Math.round(opposite * 100)}% of the frame empty at the ${atTop ? 'bottom' : 'top'}, ceiling ${Math.round(SUBJECT_OVERRUN * 100)}%. The reader is still reading this act's words while its subject leaves the frame in one direction and abandons it in the other.`);
            }
            continue;
          }
          // The act opened on a frame its own set was already larger than, so there is no
          // middle from that frame to measure this one against.
          if (opened.atTop || opened.atBottom) continue;

          if (middle < SUBJECT_BAND[0] || middle > SUBJECT_BAND[1]) {
            failures.push(`${at}: its set's middle sits ${middle.toFixed(2)} down the frame, band ${SUBJECT_BAND[0]} to ${SUBJECT_BAND[1]}, with ${Math.round(above * 100)}% of the frame empty above it and ${Math.round(below * 100)}% below it.`);
          }
          const drift = middle - opened.middle;
          if (Math.abs(drift) > SUBJECT_DRIFT) {
            failures.push(`${at}: its set has moved ${Math.abs(drift).toFixed(2)} of the frame ${drift < 0 ? 'up' : 'down'} since the frame the act opens on, ceiling ${SUBJECT_DRIFT}. The reader is still reading this act's words while its subject slides ${drift < 0 ? 'out of the top of' : 'down'} the frame.`);
          }
        }
      }
    }
  } finally {
    await browser.close();
  }
}

// How strong a sequence's own wiring has to be at the frame its act opens on, as a share of
// what it reaches while the camera is still parked in front of it.
//
// This asks about the wiring and nothing else, and the narrowing is deliberate. It replaced a
// check that asked the same question of every drawable part of a sequence, which was more than
// the fault: how many of act three's nine nodes are up at its opening frame is a draw call
// decision, nine nodes cost 26 against a ceiling of 120, and the owner ruled on 2026-09-16 that
// they are not being paid for. Wiring costs nothing, because a set's connective geometry is one
// buffer that is already being drawn and how much of it appears is a draw range.
//
// Asked only of a set that declares partsTogether, and that restriction is what makes the rule
// honest rather than convenient. A set assembling as the reader descends is a device this page
// uses on purpose: act two's whole story is a rack room nobody is watching and then the moment
// agents start reporting, so its attack lanes arriving late is the act.
//
// partsTogether is a set saying a reader has to take it in at once. The frame they take it in
// at is the one the act opens on: the frame the act rail lands on, the frame a deep link lands
// on, and the frame the act's heading is read beside. Act three's heading is "Open-source
// components wired into a practical monitoring flow" and the eight edges that sentence names
// were at opacity zero for the first 30% of the act.
const WIRING_OPENING_SHARE = 0.3;
const WIRING_SETTLED = 0.45;
// What counts as a node being there, for the purpose of a line reaching it. Well below the
// threshold any set should use, so this catches wiring drawn to nothing and never argues with a
// set about how far into its arrival a box is far enough.
const JOINED_NODE_DRAWN = 0.05;

// A set that has to be read as a sequence draws the wiring its heading names, and draws none of
// it to a node that is not there.
async function checkFilmSequenceWiring(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter sequence wiring check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter sequence wiring check found no page carrying the film body class, so it measured nothing.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?still&scene-debug`, { scene: true });
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1800)));
      if (!await page.evaluate(() => Boolean(window.chapterFilm))) {
        failures.push(`${route} did not publish its scene through ?scene-debug, so its sequences could not be measured.`);
        continue;
      }
      const bands = await page.evaluate(() => [...document.querySelectorAll('main > .act')].map((act, i) => ({
        act: i + 1,
        top: Math.round(act.getBoundingClientRect().top + window.scrollY),
        span: Number(act.dataset.stationSpan) || Math.round(act.getBoundingClientRect().height)
      })));
      const sequences = await page.evaluate(() => window.chapterFilm.stations.map((station) => station.partsTogether || 0));

      // Every piece of connective geometry a set has marked, with how strongly it is drawn and
      // how much of it is in its own draw range. Scale counts alongside opacity, because
      // scaling a part up from nothing is the other way a set brings one in, and a part scaled
      // to nothing is not drawn however opaque its material claims to be.
      const readAt = async (index, depth, band) => {
        await page.evaluate((to) => window.scrollTo(0, to), Math.round(band.top + band.span * depth));
        await page.evaluate(() => new Promise((done) => {
          let n = 0;
          const tick = () => (++n > 50 ? done() : requestAnimationFrame(tick));
          requestAnimationFrame(tick);
        }));
        return page.evaluate(([i, joinedAt]) => {
          const root = window.chapterFilm.stations[i].group;
          const drawn = (node) => {
            let scale = 1;
            for (let q = node; q && q !== root.parent; q = q.parent) {
              if (!q.visible) return 0;
              scale *= q.scale.x;
            }
            scale = Math.min(1, scale);
            if (scale <= 0) return 0;
            // A node a set joins with wiring is usually a group of a face and its lit edges,
            // and a group has no material. It is drawn if anything under it is.
            let opacity = 0;
            node.traverse((child) => {
              if (!child.visible || !child.material) return;
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              for (const m of materials) opacity = Math.max(opacity, m.transparent ? m.opacity : 1);
            });
            return opacity * scale;
          };
          const out = [];
          root.traverse((node) => {
            if (!node.userData || !node.userData.connective) return;
            const total = node.geometry && node.geometry.attributes.position
              ? node.geometry.attributes.position.count : 0;
            const range = node.geometry ? node.geometry.drawRange.count : Infinity;
            const shownPoints = Math.min(total, range === Infinity ? total : range);
            const stride = node.userData.stride || total || 1;
            const joins = node.userData.joins || [];
            // A drawn run of wiring that reaches a node which is not itself drawn. This is the
            // concern the whole device was built around: a line arriving at nothing.
            const reaching = [];
            const runs = Math.floor(shownPoints / stride);
            for (let r = 0; r < Math.min(runs, joins.length); r++) {
              if (joins[r].map(drawn).some((end) => end < joinedAt)) reaching.push(r);
            }
            out.push({
              shown: drawn(node),
              runs,
              declaredRuns: joins.length,
              orphans: reaching
            });
          });
          return out;
        }, [index, JOINED_NODE_DRAWN]);
      };

      for (const band of bands) {
        const index = band.act - 1;
        if (!sequences[index]) continue;
        const opening = await readAt(index, 0, band);
        const settled = await readAt(index, WIRING_SETTLED, band);
        if (settled.length === 0) {
          failures.push(
            `${route} act ${band.act} declares itself a sequence and marks nothing as connective, so the wiring its heading names could not be measured. A set that is a flow sets userData.connective on the geometry that joins its parts.`
          );
          continue;
        }
        settled.forEach((part, i) => {
          const before = opening[i];
          if (!before) return;
          if (part.shown > 0 && before.shown / part.shown < WIRING_OPENING_SHARE) {
            failures.push(
              `${route} act ${band.act} declares itself a sequence and opens on a frame where its wiring is drawn at ${before.shown.toFixed(2)} against the ${part.shown.toFixed(2)} it reaches by ${Math.round(WIRING_SETTLED * 100)}% through the act, while the camera is still parked. That is under ${Math.round(WIRING_OPENING_SHARE * 100)}% of its own strength in the frame the act rail and a deep link both land on, and the frame its heading is read beside.`
            );
          }
          if (before.declaredRuns && before.runs === 0) {
            failures.push(
              `${route} act ${band.act} opens on a frame with none of its ${before.declaredRuns} runs of wiring in the draw range, so the flow its heading names is a set of parts with nothing between them.`
            );
          }
          if (before.orphans.length) {
            failures.push(
              `${route} act ${band.act} opens on a frame drawing ${before.orphans.length} run${before.orphans.length === 1 ? '' : 's'} of wiring to a part that is not itself drawn, at index ${before.orphans.join(', ')}. A line reaching for something that is not there reads as a fault in the set rather than as a flow being laid down.`
            );
          }
          if (part.orphans.length) {
            failures.push(
              `${route} act ${band.act} is still drawing ${part.orphans.length} run${part.orphans.length === 1 ? '' : 's'} of wiring to a part that is not drawn at ${Math.round(WIRING_SETTLED * 100)}% through the act, at index ${part.orphans.join(', ')}.`
            );
          }
        });
      }
    }
  } finally {
    await browser.close();
  }
}

// How much of a bead's journey may be spent inside a solid body it is not arriving at.
//
// A bead that ends at a component is meant to go into it: that is the flow reaching the thing it
// flows to, and a reader reads it as arrival. So the bodies a journey's own two ends sit in are
// exempt, and every other body it enters is a wall it went through. That is a better question
// than how far along the journey the bead is, which was the first form of this check and could
// not tell act three's beads from act two's: act three's edges run between node centres and the
// Wazuh Manager is 32 units across, so a bead is inside it for 40% of the run that arrives at
// it, which no distance fraction can call arrival without also excusing a bead crossing a rack.
//
// The fault: "Some beads go THROUGH the servers, some float in front, inconsistently." Owner,
// on act two. Nothing was sorting them wrongly. A bead inside an opaque body is hidden by it, so
// a run that crosses one blinks out partway along and comes back, and a run that does not stays
// solid. Act two's reporting lines started six units down inside a cabinet and sagged to 32 over
// cabinets 37 tall: measured at 1.69% of every journey against 0.01% once they were routed over.
//
// Not zero, because a path may graze a corner for a frame and a floor of zero is a check that
// fails on a rounding error.
const TRAFFIC_THROUGH = 0.005;
// A sprite that does not move is a fixture, not traffic: act one's power light sits inside the
// board it is mounted on, which is where a light on a board belongs.
const TRAFFIC_MOVES = 4;
// Long enough for the slowest bead on the page to get most of the way along its run.
const TRAFFIC_FRAMES = 180;

// Nothing a set moves along a path travels through a body it is not arriving at.
async function checkFilmTrafficPaths(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter traffic path check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter traffic path check found no page carrying the film body class, so it measured nothing.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?scene-debug`, { scene: true });
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1800)));
      if (!await page.evaluate(() => Boolean(window.chapterFilm))) {
        failures.push(`${route} did not publish its scene through ?scene-debug, so its traffic could not be measured.`);
        continue;
      }
      const bands = await page.evaluate(() => [...document.querySelectorAll('main > .act')].map((act, i) => ({
        act: i + 1,
        top: Math.round(act.getBoundingClientRect().top + window.scrollY),
        span: Number(act.dataset.stationSpan) || Math.round(act.getBoundingClientRect().height)
      })));
      if (bands.length === 0) {
        failures.push(`${route} carries the film body class and has no acts, so its traffic could not be measured.`);
        continue;
      }

      let measured = 0;
      for (const band of bands) {
        const index = band.act - 1;
        await page.evaluate((to) => window.scrollTo(0, to), Math.round(band.top + band.span * 0.3));
        await page.evaluate(() => new Promise((done) => {
          let n = 0;
          const tick = () => (++n > 40 ? done() : requestAnimationFrame(tick));
          requestAnimationFrame(tick);
        }));
        const reading = await page.evaluate(async ([i, moves, frames]) => {
          const root = window.chapterFilm.stations[i].group;
          const apply = (e, x, y, z) => [
            e[0] * x + e[4] * y + e[8] * z + e[12],
            e[1] * x + e[5] * y + e[9] * z + e[13],
            e[2] * x + e[6] * y + e[10] * z + e[14]
          ];
          const multiply = (a, b) => {
            const out = new Array(16);
            for (let c = 0; c < 4; c++) {
              for (let q = 0; q < 4; q++) {
                out[c * 4 + q] = a[q] * b[c * 4] + a[4 + q] * b[c * 4 + 1] + a[8 + q] * b[c * 4 + 2] + a[12 + q] * b[c * 4 + 3];
              }
            }
            return out;
          };
          const boxOf = (geometry, elements) => {
            if (!geometry.boundingBox) geometry.computeBoundingBox();
            const bb = geometry.boundingBox;
            const lo = [Infinity, Infinity, Infinity];
            const hi = [-Infinity, -Infinity, -Infinity];
            for (let c = 0; c < 8; c++) {
              const p = apply(elements, c & 1 ? bb.max.x : bb.min.x, c & 2 ? bb.max.y : bb.min.y, c & 4 ? bb.max.z : bb.min.z);
              for (let a = 0; a < 3; a++) { lo[a] = Math.min(lo[a], p[a]); hi[a] = Math.max(hi[a], p[a]); }
            }
            return [lo, hi];
          };

          // A solid body is a mesh with an opaque material. Those are the only things with a
          // surface a bead can be hidden behind. Scenery is not one: a bead crossing the back
          // wall of the room is the room, not a fault.
          const boxes = [];
          const movers = [];
          root.traverse((node) => {
            if (node.userData && node.userData.ambient) return;
            if (node.isSprite || node.isPoints) { movers.push(node); return; }
            if (!node.isMesh || !node.visible) return;
            const material = Array.isArray(node.material) ? node.material[0] : node.material;
            if (!material || material.transparent) return;
            if (node.isInstancedMesh) {
              for (let k = 0; k < node.count; k++) {
                boxes.push(boxOf(node.geometry, multiply(node.matrixWorld.elements, [...node.instanceMatrix.array.slice(k * 16, k * 16 + 16)])));
              }
            } else {
              boxes.push(boxOf(node.geometry, node.matrixWorld.elements));
            }
          });

          const holds = (b, p) => p[0] >= b[0][0] && p[0] <= b[1][0] && p[1] >= b[0][1] && p[1] <= b[1][1] && p[2] >= b[0][2] && p[2] <= b[1][2];
          const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

          // One track per thing that moves: a sprite is one, a point buffer is one per index.
          const tracks = new Map();
          const nextFrame = () => new Promise((r) => requestAnimationFrame(r));
          for (let f = 0; f < frames; f++) {
            await nextFrame();
            for (let mi = 0; mi < movers.length; mi++) {
              const mover = movers[mi];
              if (!mover.visible) continue;
              const e = mover.matrixWorld.elements;
              const push = (key, p) => {
                if (!tracks.has(key)) tracks.set(key, []);
                tracks.get(key).push(p);
              };
              if (mover.isSprite) {
                push(`${mi}:s`, [e[12], e[13], e[14]]);
              } else {
                const pos = mover.geometry.attributes.position;
                const range = mover.geometry.drawRange.count;
                const n = Math.min(pos.count, range === Infinity ? pos.count : range);
                for (let q = 0; q < n; q++) push(`${mi}:${q}`, apply(e, pos.getX(q), pos.getY(q), pos.getZ(q)));
              }
            }
          }

          let beads = 0;
          let samples = 0;
          let through = 0;
          for (const path of tracks.values()) {
            // The two ends of the journey: the furthest apart pair on the track. A fixture's
            // ends are the same point, so its span is nothing and it is not traffic.
            let a = path[0];
            let b = path[0];
            let span = 0;
            for (const p of path) {
              for (const q of [path[0], path[path.length - 1]]) {
                const d = dist(p, q);
                if (d > span) { span = d; a = p; b = q; }
              }
            }
            for (const p of path) {
              const d = dist(p, a);
              if (d > span) { span = d; b = p; }
            }
            if (span < moves) continue;
            beads++;
            const ends = new Set();
            boxes.forEach((box, k) => { if (holds(box, a) || holds(box, b)) ends.add(k); });
            for (const p of path) {
              samples++;
              if (boxes.some((box, k) => !ends.has(k) && holds(box, p))) through++;
            }
          }
          return { beads, samples, through };
        }, [index, TRAFFIC_MOVES, TRAFFIC_FRAMES]);

        if (reading.samples === 0) continue;
        measured++;
        const share = reading.through / reading.samples;
        if (share > TRAFFIC_THROUGH) {
          failures.push(
            `${route} act ${band.act} runs a bead through a solid body it is not arriving at, on ${(share * 100).toFixed(2)}% of its journey, ceiling ${(TRAFFIC_THROUGH * 100).toFixed(1)}%. A bead inside an opaque body is hidden by it, so a run that crosses one blinks out partway along and a run that does not stays solid, which is the inconsistency the owner reported against act two.`
          );
        }
      }
      if (measured === 0) {
        failures.push(`${route} moves nothing along a path in any of its ${bands.length} acts, so the traffic check measured nothing. A chapter with no traffic is possible, but it has never been this one, and a check that measures nothing has to say so rather than pass.`);
      }
    }
  } finally {
    await browser.close();
  }
}

// The band a nameplate may not be drawn in.
//
// A plate's dark ground and its words are one canvas texture, painted together by nameplate()
// in kit.js, so every fade in the engine multiplies both at once. The ground is the whole reason
// a label survives standing in front of a wireframe, and fading it first is backwards: a third
// of the way out, act three's "Elasticsearch" and "alerts.json" were grey type on the cage they
// name with nothing behind them, while two plates beside them were fully drawn. Measured before
// the fix: eight readings in this band out of 176. After: none.
//
// The published practice for labels in a 3D scene is to drop a dimmed one rather than fade it,
// because a partly faded label is harder to read than no label at all. This holds the engine to
// that: a plate is legible or it is gone.
//
// Not a contrast check. checkFilmNameplates already asks whether a plate's ink separates from
// its ground, and it asks at the depth each plate is strongest, which is exactly where this
// fault never appears.
//
// The top of the band is PLATE_SOLID, the line every other plate check calls solid, not a
// number of its own. A band with a lower top lets a plate drawn between the two pass here
// while it still reads as unfinished.
const PLATE_GONE = 0.02;
// Where to look. The same window the other plate checks use, plus the start of the flight, since
// a plate on its way out of frame is the case that produces the band.
const PLATE_BAND_DEPTHS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];

// No nameplate is ever drawn with its ground faded out from under its words.
async function checkFilmPlateLegibility(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter plate legibility check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter plate legibility check found no page carrying the film body class, so it measured nothing.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?still&scene-debug`, { scene: true });
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1800)));
      if (!await page.evaluate(() => Boolean(window.chapterFilm))) {
        failures.push(`${route} did not publish its scene through ?scene-debug, so its plates could not be measured.`);
        continue;
      }
      const bands = await page.evaluate(() => [...document.querySelectorAll('main > .act')].map((act, i) => ({
        act: i + 1,
        top: Math.round(act.getBoundingClientRect().top + window.scrollY),
        span: Number(act.dataset.stationSpan) || Math.round(act.getBoundingClientRect().height)
      })));

      let readings = 0;
      const caught = [];
      for (const band of bands) {
        for (const depth of PLATE_BAND_DEPTHS) {
          await page.evaluate((to) => window.scrollTo(0, to), Math.round(band.top + band.span * depth));
          await page.evaluate(() => new Promise((done) => {
            let n = 0;
            const tick = () => (++n > 40 ? done() : requestAnimationFrame(tick));
            requestAnimationFrame(tick);
          }));
          const rows = await page.evaluate((i) => {
            const out = [];
            window.chapterFilm.stations[i].group.traverse((node) => {
              if (!node.userData || !node.userData.caption || !node.material) return;
              out.push({ text: node.userData.caption, shown: node.material.opacity });
            });
            return out;
          }, band.act - 1);
          for (const row of rows) {
            readings++;
            if (row.shown > PLATE_GONE && row.shown < PLATE_SOLID) {
              caught.push(`act ${band.act} at ${Math.round(depth * 100)}% "${row.text}" at ${row.shown.toFixed(2)}`);
            }
          }
        }
      }

      if (readings === 0) {
        failures.push(`${route} carries the film body class and has no nameplates at any sampled depth, so the plate legibility check measured nothing.`);
        continue;
      }
      if (caught.length) {
        failures.push(
          `${route} draws ${caught.length} nameplate${caught.length === 1 ? '' : 's'} with the ground faded out from under the words, between ${PLATE_GONE} and ${PLATE_SOLID} opacity: ${caught.slice(0, 6).join('; ')}. A plate's ground and its words are one texture and fade together, and the ground is what makes the words legible over geometry. A label is legible or it is gone.`
        );
      }
    }
  } finally {
    await browser.close();
  }
}

// Where in each act to look for nameplates. Seven depths an act, all inside the part of it the
// camera spends in front of its own set: past about 60% the camera is in flight to the next
// station and an act's own labels are behind it, so a sample there measures the next act. Even
// spacing out to 0.95 looked more thorough and missed a plate whose whole window is at 30%.
const PLATE_DEPTHS = [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
// The smallest a label's own type may be, in CSS pixels, at the one depth in its act where it is
// biggest.
//
// 12px is the working floor for readable screen text; 14 to 16 is what is actually recommended.
// In a scene the stake is higher than on a page, because a nameplate is the only thing that makes
// a shape a component rather than a box: at 8px a reader can see that a word is there and cannot
// tell which word, so the set is a diagram with the labels rubbed off.
//
// Two rules. Each label reaches this somewhere in its own act, which keeps the owner's ruling of
// 2026-09-14 that every label is shown somewhere. And no label is drawn under it: a plate too
// small to read is hidden by the engine, not enlarged, so nothing has to grow at every depth and
// the displacement pass is not set fighting itself. A label coming up as the camera nears is what
// a label is for. Decided by the owner on 2026-10-05.
const LABEL_FLOOR = 12;
// nameplate() in kit.js paints the title at this size into the plate's own canvas, so the ratio
// of it to that canvas's height turns a plate's height on screen into a type size. Read from the
// texture rather than assumed, so a plate with a subtitle and one without both measure correctly.
const LABEL_TITLE_PX = 46;

// Every label a set means as a name is readable somewhere in its own act.
async function checkFilmLabelSize(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter label size check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter label size check found no page carrying the film body class, so it measured nothing.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?still&scene-debug`, { scene: true });
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1800)));
      if (!await page.evaluate(() => Boolean(window.chapterFilm))) {
        failures.push(`${route} did not publish its scene through ?scene-debug, so its labels could not be sized.`);
        continue;
      }
      const bands = await page.evaluate(() => [...document.querySelectorAll('main > .act')].map((act, i) => ({
        act: i + 1,
        top: Math.round(act.getBoundingClientRect().top + window.scrollY),
        span: Number(act.dataset.stationSpan) || Math.round(act.getBoundingClientRect().height)
      })));

      const biggest = new Map();
      const smallDrawn = [];
      for (const band of bands) {
        const index = band.act - 1;
        for (const depth of PLATE_DEPTHS) {
          await page.evaluate((to) => window.scrollTo(0, to), Math.round(band.top + band.span * depth));
          await page.evaluate(() => new Promise((done) => {
            let n = 0;
            const tick = () => (++n > 40 ? done() : requestAnimationFrame(tick));
            requestAnimationFrame(tick);
          }));
          const reading = await page.evaluate(([i, titlePx]) => {
            const film = window.chapterFilm;
            const camera = film.camera;
            const out = [];
            film.stations[i].group.traverse((node) => {
              if (!node.userData || !node.userData.caption) return;
              if (!node.visible || !node.material || node.material.opacity <= 0.02) return;
              const map = node.material.map;
              if (!map || !map.image || !node.geometry.parameters) return;
              // The plate's own height on screen, from the two ends of its vertical axis. A
              // plate faces the camera, so its height is what the type scales with and its
              // width is not: a long name and a short one are the same type at the same depth.
              const h = node.geometry.parameters.height;
              const Vector = node.position.constructor;
              const ends = [new Vector(0, h / 2, 0), new Vector(0, -h / 2, 0)].map((v) => {
                const p = node.localToWorld(v);
                if (p.clone().applyMatrix4(camera.matrixWorldInverse).z > -0.1) return null;
                p.project(camera);
                return (-p.y * 0.5 + 0.5) * window.innerHeight;
              });
              if (ends.some((e) => e === null)) return;
              out.push({
                text: node.userData.caption,
                swarm: Boolean(node.userData.swarm),
                type: (titlePx / map.image.height) * Math.abs(ends[0] - ends[1])
              });
            });
            return out;
          }, [index, LABEL_TITLE_PX]);
          for (const plate of reading) {
            const key = `act ${band.act} "${plate.text}"`;
            const had = biggest.get(key);
            if (!had || plate.type > had.type) biggest.set(key, plate);
          }
          // Every plate drawn right now, whichever act it belongs to. The biggest-in-its-act
          // reading above cannot see this: act three's labels are visible from inside act two,
          // a few pixels high, and are only ever sized against act three's own depths.
          const drawnSmall = await page.evaluate(([titlePx, floor]) => {
            const film = window.chapterFilm;
            const camera = film.camera;
            const out = [];
            film.scene.traverse((node) => {
              if (!node.userData || !node.userData.caption || node.userData.swarm) return;
              if (!node.visible || !node.material || node.material.opacity <= 0.02) return;
              const map = node.material.map;
              if (!map || !map.image || !node.geometry.parameters) return;
              const h = node.geometry.parameters.height;
              const Vector = node.position.constructor;
              const ends = [new Vector(0, h / 2, 0), new Vector(0, -h / 2, 0)].map((v) => {
                const p = node.localToWorld(v);
                if (p.clone().applyMatrix4(camera.matrixWorldInverse).z > -0.1) return null;
                p.project(camera);
                return (-p.y * 0.5 + 0.5) * window.innerHeight;
              });
              if (ends.some((e) => e === null)) return;
              const type = (titlePx / map.image.height) * Math.abs(ends[0] - ends[1]);
              if (type < floor) out.push({ text: node.userData.caption, type });
            });
            return out;
          }, [LABEL_TITLE_PX, LABEL_FLOOR]);
          for (const plate of drawnSmall) {
            smallDrawn.push(`act ${band.act} at ${Math.round(depth * 100)}% "${plate.text}" at ${plate.type.toFixed(1)}px`);
          }
        }
      }

      if (smallDrawn.length) {
        failures.push(
          `${route} draws ${smallDrawn.length} label${smallDrawn.length === 1 ? '' : 's'} under ${LABEL_FLOOR}px of type: ${smallDrawn.slice(0, 6).join('; ')}. A word too small to read is worse than no word, so a label is readable or it is not drawn: see keepNameplatesLegible in engine.js. A label a set means as atmosphere says so with userData.swarm.`
        );
      }
      const named = [...biggest.entries()].filter(([, plate]) => !plate.swarm);
      if (named.length === 0) {
        failures.push(`${route} has no label that is not marked as swarm, so the label size check measured nothing. Either the page lost its labels or every set is claiming its labels are atmosphere.`);
        continue;
      }
      for (const [key, plate] of named) {
        if (plate.type < LABEL_FLOOR) {
          failures.push(
            `${route} ${key} never gets above ${plate.type.toFixed(1)}px of type anywhere in its own act, floor ${LABEL_FLOOR}px. A reader can see a word is there and cannot read it, which leaves the part it names as an unexplained shape. A label a set means as atmosphere rather than as a name says so with userData.swarm.`
          );
        }
      }
    }
  } finally {
    await browser.close();
  }
}

// How much of the smaller of two plates may be covered by the other before they are two labels
// on the same pixels rather than two labels near each other. The engine works to the same
// number, so this fails when that pass stops working, not when it is merely tight.
const PLATE_OVERLAP = 0.06;
// Below this a plate's own ground is translucent enough that the room shows through the words
// it is carrying, so a label that never reaches it has been made and never shown.
const PLATE_SOLID = 0.75;
// The faintest a screen may ever be drawn and still count as shown. Below this its content is a
// ghost of itself: act three's two screens were capped at 0.29, which was the right strength
// for the flat tinted planes they used to be and left a painted dashboard barely visible.
const SCREEN_SHOWN = 0.5;
// How lit a screen in a contained set has to be at the frame its act lands on, as a share of
// the brightest it ever gets. A contained set is one the engine holds whole inside the frame,
// which means that frame is the view of it and there is no later arrival to wait for. A set the
// camera flies through may assemble as the reader travels.
const SCREEN_LIT_ON_ARRIVAL = 0.6;

// Every label that exists is readable somewhere, and no two are ever on the same pixels.
//
// Owner ruling, 2026-09-14: a thing that was made to be shown is shown. The engine used to
// resolve two plates landing on each other by zeroing the further one and never reconsidering,
// which left act three's "Agents" at opacity zero at five of six sampled depths and act two's
// "Unwatched LAN" never solid anywhere. It displaces before it eliminates now, and this is what
// stops that quietly going back to elimination.
async function checkFilmNameplates(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter nameplate check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }

  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter nameplate check found no page carrying the film body class, so it measured nothing. Either the class was renamed or the check can no longer find the chapter pages.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?still&scene-debug`, { scene: true });
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1800)));
      if (!await page.evaluate(() => Boolean(window.chapterFilm))) {
        failures.push(`${route} did not publish its scene through ?scene-debug, so its nameplates could not be measured.`);
        continue;
      }
      const bands = await page.evaluate(() => [...document.querySelectorAll('main > .act')].map((act) => ({
        top: Math.round(act.getBoundingClientRect().top + window.scrollY),
        span: Number(act.dataset.stationSpan) || Math.round(act.getBoundingClientRect().height)
      })));
      // What each set asks for. A set that is a sequence says so, and says how much of itself a
      // reader has to be able to take in at once; the rest hand one subject to the next on
      // purpose, and counting their labels together would be counting that handover as a fault.
      const asks = await page.evaluate(() => window.chapterFilm.stations.map((station) => station.partsTogether || 0));
      const best = new Map();
      const stacked = [];
      const onCopy = [];
      // Per act: how many of its own labels are legible at the same time, at its best depth.
      const together = new Map();
      const owned = new Map();
      // And what the sets' screens are doing, gathered in the same sweep rather than in a
      // second one: whether anything is painted on them, the brightest they are ever drawn, and
      // how lit they are at the frame their own act lands on.
      const screens = new Map();
      for (const band of bands) {
        for (const depth of PLATE_DEPTHS) {
          await page.evaluate((to) => window.scrollTo(0, to), Math.round(band.top + band.span * depth));
          // The camera arrives over about 45 frames, so this settles in frames, not milliseconds.
          await page.evaluate(() => new Promise((done) => {
            let n = 0;
            const tick = () => (++n > 50 ? done() : requestAnimationFrame(tick));
            requestAnimationFrame(tick);
          }));
          // Where the page's own words are this frame, in the same pixels, so a plate landing on
          // a line of copy is caught rather than assumed away.
          const copy = await page.evaluate(() => [...document.querySelectorAll('main .act h1, main .act h2, main .act h3, main .act p, main .act li')]
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.width >= 40 && r.bottom > 0 && r.top < window.innerHeight
                && Number(getComputedStyle(el).opacity) >= 0.12;
            })
            .map((el) => {
              const r = el.getBoundingClientRect();
              return [r.left, r.top, r.right, r.bottom];
            }));
          const seen = await page.evaluate(() => {
            const film = window.chapterFilm;
            const camera = film.camera;
            camera.updateMatrixWorld();
            const out = [];
            film.stations.forEach((station, si) => {
              if (!station.group.visible) return;
              station.group.traverse((node) => {
                if (!node.userData || !node.userData.caption || !node.material) return;
                if (node.material.opacity <= 0.08) return;
                const params = node.geometry && node.geometry.parameters;
                if (!params) return;
                const hw = (params.width || 1) / 2;
                const hh = (params.height || 1) / 2;
                node.updateWorldMatrix(true, false);
                let x0 = Infinity;
                let y0 = Infinity;
                let x1 = -Infinity;
                let y1 = -Infinity;
                let ok = true;
                for (let c = 0; c < 4; c++) {
                  const v = new (camera.position.constructor)(c === 0 || c === 3 ? -hw : hw, c < 2 ? -hh : hh, 0);
                  v.applyMatrix4(node.matrixWorld);
                  // Behind the camera projects to nonsense, so this plate is not on screen.
                  if (v.clone().applyMatrix4(camera.matrixWorldInverse).z > -0.1) { ok = false; break; }
                  v.project(camera);
                  x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x);
                  y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y);
                }
                if (!ok) return;
                if (x1 <= -1 || x0 >= 1 || y1 <= -1 || y0 >= 1) return;
                out.push({
                  act: si + 1,
                  text: node.userData.caption,
                  opacity: node.material.opacity,
                  // A label that crosses the room and leaves is bright for part of its own
                  // journey and dim for the rest of it, and which part four scroll depths land
                  // on says nothing. The sets mark these themselves.
                  transient: Boolean(node.userData.transient),
                  x0, x1, y0, y1
                });
              });
            });
            return out;
          });
          const glass = await page.evaluate(() => {
            const out = [];
            window.chapterFilm.stations.forEach((station, si) => {
              station.group.traverse((node) => {
                if (!node.userData || !node.userData.screen) return;
                let alpha = node.material ? node.material.opacity : 1;
                for (let p = node.parent; p; p = p.parent) {
                  if (p.material && p.material.transparent) alpha *= p.material.opacity;
                  if (!p.visible) alpha = 0;
                }
                if (!station.group.visible) alpha = 0;
                out.push({
                  act: si + 1,
                  name: node.userData.screen,
                  // Something painted on it, rather than a plane of flat tint with a border.
                  painted: Boolean(node.material && node.material.map),
                  contained: Boolean(station.contained),
                  lit: alpha
                });
              });
            });
            return out;
          });
          for (const pane of glass) {
            const key = `act ${pane.act} "${pane.name}"`;
            const held = screens.get(key) || { painted: pane.painted, contained: pane.contained, top: 0, arrival: null };
            held.top = Math.max(held.top, pane.lit);
            if (pane.act === bands.indexOf(band) + 1 && depth === PLATE_DEPTHS[0]) held.arrival = pane.lit;
            screens.set(key, held);
          }

          const solidHere = new Map();
          for (const plate of seen) {
            if (plate.transient) continue;
            const key = `act ${plate.act} "${plate.text}"`;
            best.set(key, Math.max(best.get(key) || 0, plate.opacity));
            if (!owned.has(plate.act)) owned.set(plate.act, new Set());
            owned.get(plate.act).add(plate.text);
            if (plate.opacity >= PLATE_SOLID) solidHere.set(plate.act, (solidHere.get(plate.act) || 0) + 1);
          }
          for (const [act, count] of solidHere) {
            together.set(act, Math.max(together.get(act) || 0, count));
          }
          for (const plate of seen) {
            const left = (plate.x0 * 0.5 + 0.5) * 1440;
            const right = (plate.x1 * 0.5 + 0.5) * 1440;
            const top = (-plate.y1 * 0.5 + 0.5) * 900;
            const bottom = (-plate.y0 * 0.5 + 0.5) * 900;
            for (const rect of copy) {
              if (right < rect[0] || left > rect[2] || bottom < rect[1] || top > rect[3]) continue;
              onCopy.push(`"${plate.text}" at ${Math.round(depth * 100)}% through act ${bands.indexOf(band) + 1}`);
              break;
            }
          }
          for (let i = 0; i < seen.length; i++) {
            for (let j = i + 1; j < seen.length; j++) {
              const a = seen[i];
              const b = seen[j];
              const w = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
              const h = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
              if (w <= 0 || h <= 0) continue;
              const smaller = Math.min((a.x1 - a.x0) * (a.y1 - a.y0), (b.x1 - b.x0) * (b.y1 - b.y0));
              if (smaller > 0 && w * h > smaller * PLATE_OVERLAP) {
                stacked.push(`"${a.text}" and "${b.text}" at ${Math.round(depth * 100)}% through act ${a.act}`);
              }
            }
          }
        }
      }
      if (best.size === 0) {
        failures.push(`${route} drew no nameplates at any sampled depth, so either the sets stopped labelling themselves or this check stopped finding them.`);
        continue;
      }
      for (const line of onCopy.slice(0, 4)) {
        failures.push(`${route} prints a nameplate on a line of the page's own copy: ${line}. The engine treats every block of words as somewhere a label may not sit and moves the label out of the way, so this means that is not happening.`);
      }
      for (const line of stacked.slice(0, 4)) {
        failures.push(`${route} draws two nameplates on the same pixels: ${line}. The engine displaces a plate that lands on another and hides it only when there is nowhere to put it, so this means that pass is not running.`);
      }
      for (const [act, names] of owned) {
        const share = asks[act - 1] || 0;
        if (share <= 0) continue;
        const most = together.get(act) || 0;
        const floor = Math.ceil(names.size * share);
        if (most < floor) {
          failures.push(
            `${route} act ${act} never has more than ${most} of its ${names.size} labels legible at once, floor ${floor}. The engine moves a label that lands on another out of the way and hides it only when there is nowhere to put it, so this means it is hiding them instead.`
          );
        }
      }
      if (screens.size === 0) {
        failures.push(`${route} marks none of its planes as a screen, so nothing checked what is on them. Either the sets stopped building screens or they stopped saying which ones they are.`);
      }
      for (const [key, pane] of screens) {
        if (!pane.painted) {
          failures.push(`${route} screen ${key} has nothing painted on it: its material carries no texture. A lit rectangle with a border and a nameplate over it is the loudest empty object a set can have, and both of this chapter's acts about outputs are named for what is meant to be on one.`);
        }
        if (pane.top < SCREEN_SHOWN) {
          failures.push(`${route} screen ${key} is never drawn above ${pane.top.toFixed(2)} opacity at any sampled depth, floor ${SCREEN_SHOWN}. Whatever is painted on it is a ghost of itself.`);
        }
        if (pane.contained && pane.top > 0 && pane.arrival !== null && pane.arrival / pane.top < SCREEN_LIT_ON_ARRIVAL) {
          failures.push(`${route} screen ${key} is at ${((pane.arrival / pane.top) * 100).toFixed(0)}% of its own brightest at the frame its act lands on, floor ${SCREEN_LIT_ON_ARRIVAL * 100}%. Its set is contained, so that frame is the view of it, and the screen is dark in it.`);
        }
      }
      const faint = [...best].filter(([, opacity]) => opacity < PLATE_SOLID);
      for (const [key, opacity] of faint.slice(0, 4)) {
        failures.push(`${route} nameplate ${key} never comes above ${opacity.toFixed(2)} opacity at any sampled depth, floor ${PLATE_SOLID}. Below that the room shows through the ground the words are painted on, so a label that was made is never shown.`);
      }
    }
  } finally {
    await browser.close();
  }
}

// A label is readable against what is behind it at every depth it is drawn, not only its best.
//
// A review on 2026-10-05 found act three's plates reading grey over the set, where the audit that
// looked only at each plate's best depth passed them. Owner decision 2026-10-05 to check every
// depth. Two things can take a plate under the floor: a plate drawn between PLATE_SOLID and full
// strength lets the room through its ground, and the scrim behind the copy darkens the words of
// a plate on the copy's side of the frame, which is what was measured here. Measured the way the audit
// measures a plate, ink against ground, but across the middle of the plate where the words are,
// and on the page as a reader sees it. The audit hides the page first, and with it the scrim
// that darkens the copy's side of the frame, which is where those plates were going grey: a
// plate there is read through it. The page's words are not in the way, because the engine
// keeps every plate off them and checkFilmNameplates fails if it does not. Measured on
// 2026-10-05 with the scrim at 92% and 72%: "alerts.json" 2.99:1 and "Elasticsearch" 3.60:1 in
// act three, both passing with the scrim at 40% and 20%.
const LABEL_CONTRAST_FLOOR = 4.5;
const LABEL_CONTRAST_DEPTHS = [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95];
// Fewer pixels than this inside a plate's middle and it is too small to measure; the size check
// owns that fault.
const LABEL_CONTRAST_PIXELS = 300;

async function checkFilmLabelContrast(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the label contrast check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The label contrast check found no page carrying the film body class, so it measured nothing.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?still&scene-debug`, { scene: true });
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1800)));
      if (!await page.evaluate(() => Boolean(window.chapterFilm))) {
        failures.push(`${route} did not publish its scene through ?scene-debug, so its labels could not be read against the room.`);
        continue;
      }
      const bands = await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = 'auto';
        return [...document.querySelectorAll('main > .act')].map((act) => ({
          top: Math.round(act.getBoundingClientRect().top + window.scrollY),
          span: Number(act.dataset.stationSpan) || Math.round(act.getBoundingClientRect().height)
        }));
      });
      let measured = 0;
      const low = [];
      for (let a = 0; a < bands.length; a++) {
        for (const depth of LABEL_CONTRAST_DEPTHS) {
          await page.evaluate((to) => window.scrollTo(0, to), Math.round(bands[a].top + bands[a].span * depth));
          await page.evaluate(() => new Promise((done) => {
            let n = 0;
            const tick = () => (++n > 50 ? done() : requestAnimationFrame(tick));
            requestAnimationFrame(tick);
          }));
          // Every plate drawn at a strength the engine calls legible, by the middle of its
          // ground: the inner two thirds across, where the ground is opaque at full strength and
          // the words are, and the band the words sit in.
          const plates = await page.evaluate((solid) => {
            const film = window.chapterFilm;
            const camera = film.camera;
            camera.updateMatrixWorld();
            const out = [];
            film.stations.forEach((station, si) => {
              if (!station.group.visible) return;
              station.group.traverse((node) => {
                if (!node.userData || !node.userData.caption || !node.material) return;
                if (node.material.opacity < solid) return;
                // Atmosphere, by the owner's ruling of 2026-09-16, and skipped by the size check
                // for the same reason: act two's attack classes crossing the room are a swarm of
                // words a few pixels tall, not names to read.
                if (node.userData.swarm) return;
                const params = node.geometry && node.geometry.parameters;
                if (!params) return;
                node.updateWorldMatrix(true, false);
                let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
                for (const [u, v] of [[-1 / 3, -0.4], [1 / 3, -0.4], [1 / 3, 0.4], [-1 / 3, 0.4]]) {
                  const p = new (camera.position.constructor)(u * (params.width || 1), v * (params.height || 1), 0);
                  p.applyMatrix4(node.matrixWorld);
                  if (p.clone().applyMatrix4(camera.matrixWorldInverse).z > -0.1) return;
                  p.project(camera);
                  x0 = Math.min(x0, (p.x * 0.5 + 0.5) * innerWidth);
                  x1 = Math.max(x1, (p.x * 0.5 + 0.5) * innerWidth);
                  y0 = Math.min(y0, (-p.y * 0.5 + 0.5) * innerHeight);
                  y1 = Math.max(y1, (-p.y * 0.5 + 0.5) * innerHeight);
                }
                if (x0 < 0 || y0 < 0 || x1 > innerWidth || y1 > innerHeight) return;
                out.push({ act: si + 1, text: node.userData.caption, rect: [x0, y0, x1, y1] });
              });
            });
            return out;
          }, PLATE_SOLID);
          if (!plates.length) continue;
          const shot = await page.screenshot({ encoding: 'base64' });
          const reads = await page.evaluate(async (data, rects, floorPixels) => {
            const img = new Image();
            img.src = 'data:image/png;base64,' + data;
            await img.decode();
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);
            const pixels = ctx.getImageData(0, 0, img.width, img.height).data;
            const channel = (v) => {
              const s = v / 255;
              return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
            };
            // Ink is the lightest tenth of the plate's middle on a dark theme and the darkest on a
            // light one, so both ends are taken and the ratio between them is the reading.
            return rects.map((rect) => {
              const values = [];
              for (let y = Math.ceil(rect[1]); y < Math.floor(rect[3]); y++) {
                for (let x = Math.ceil(rect[0]); x < Math.floor(rect[2]); x++) {
                  const i = (y * img.width + x) * 4;
                  values.push(0.2126 * channel(pixels[i]) + 0.7152 * channel(pixels[i + 1]) + 0.0722 * channel(pixels[i + 2]));
                }
              }
              if (values.length < floorPixels) return null;
              values.sort((p, q) => p - q);
              const tenth = Math.max(1, Math.round(values.length * 0.1));
              const mean = (from, to) => values.slice(from, to).reduce((s, v) => s + v, 0) / (to - from);
              return (mean(values.length - tenth, values.length) + 0.05) / (mean(0, tenth) + 0.05);
            });
          }, shot, plates.map((plate) => plate.rect), LABEL_CONTRAST_PIXELS);
          plates.forEach((plate, i) => {
            if (reads[i] === null) return;
            measured++;
            if (reads[i] < LABEL_CONTRAST_FLOOR) {
              low.push(`"${plate.text}" in act ${plate.act} at ${reads[i].toFixed(2)}:1, act ${a + 1} at ${Math.round(depth * 100)}%`);
            }
          });
        }
      }
      if (measured === 0) {
        failures.push(`${route} drew no label large and strong enough to measure at any sampled depth, so the label contrast check measured nothing.`);
        continue;
      }
      if (low.length) {
        failures.push(
          `${route} draws labels a reader cannot separate from what is behind them: ${low.slice(0, 8).join('; ')}${low.length > 8 ? `, and ${low.length - 8} more` : ''}, floor ${LABEL_CONTRAST_FLOOR}:1. Two things take a plate under it: a plate drawn below full strength lets the room through its ground, and the scrim behind the copy in film.css darkens the words of any plate on the copy's side of the frame. Anchor the label somewhere else, or look at the scrim.`
        );
      }
    }
  } finally {
    await browser.close();
  }
}

// The play control never takes a reader backwards, and is not offered where there is nothing
// to play.
//
// It plays the chapter by moving the scroll, and it stops itself at the bottom of the last act
// because past that the page is a comment form and a footer. Pressed from below that point it
// was scrolling the reader back up to it: measured at 932px of travel in the wrong direction,
// from a control sitting in full view at the foot of the page.
// How far apart two neighbouring acts' colours have to look.
//
// Measured as CIEDE2000 between the accents the page actually paints, not as hue degrees. Acts
// three and four were 22 degrees apart, which a hue check called different and which looked like
// one colour on screen, because the eye discriminates hue worst across exactly that
// blue to violet stretch. In perceptual terms they were 8.4 apart while the other two neighbouring
// pairs were 13.1 and 13.2. Widening act four to +42 degrees puts all three at 13.
//
// Ten, which is below what the page holds with room to move and above what a reader could not
// separate. Neighbours only: acts one and four are never on screen together.
const ACT_COLOUR_APART = 10;

function actLab([r, g, b]) {
  const lin = (v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const [R, G, B] = [lin(r), lin(g), lin(b)];
  const x = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
  const y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  const z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const [fx, fy, fz] = [f(x), f(y), f(z)];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

function actDeltaE(l1, l2) {
  const [L1, a1, b1] = l1;
  const [L2, a2, b2] = l2;
  const rad = Math.PI / 180;
  const C1 = Math.hypot(a1, b1);
  const C2 = Math.hypot(a2, b2);
  const Cb = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)));
  const ap1 = (1 + G) * a1;
  const ap2 = (1 + G) * a2;
  const Cp1 = Math.hypot(ap1, b1);
  const Cp2 = Math.hypot(ap2, b2);
  const hue = (b, ap) => {
    if (b === 0 && ap === 0) return 0;
    const h = Math.atan2(b, ap) / rad;
    return h >= 0 ? h : h + 360;
  };
  const hp1 = hue(b1, ap1);
  const hp2 = hue(b2, ap2);
  const dLp = L2 - L1;
  const dCp = Cp2 - Cp1;
  let dhp = 0;
  if (Cp1 * Cp2 !== 0) {
    dhp = hp2 - hp1;
    if (dhp > 180) dhp -= 360;
    else if (dhp < -180) dhp += 360;
  }
  const dHp = 2 * Math.sqrt(Cp1 * Cp2) * Math.sin((dhp / 2) * rad);
  const Lbp = (L1 + L2) / 2;
  const Cbp = (Cp1 + Cp2) / 2;
  let hbp = hp1 + hp2;
  if (Cp1 * Cp2 !== 0) {
    if (Math.abs(hp1 - hp2) > 180) hbp += hbp < 360 ? 360 : -360;
    hbp /= 2;
  }
  const T = 1 - 0.17 * Math.cos((hbp - 30) * rad) + 0.24 * Math.cos(2 * hbp * rad)
    + 0.32 * Math.cos((3 * hbp + 6) * rad) - 0.20 * Math.cos((4 * hbp - 63) * rad);
  const dTh = 30 * Math.exp(-(((hbp - 275) / 25) ** 2));
  const Rc = 2 * Math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7));
  const Sl = 1 + (0.015 * (Lbp - 50) ** 2) / Math.sqrt(20 + (Lbp - 50) ** 2);
  const Sc = 1 + 0.045 * Cbp;
  const Sh = 1 + 0.015 * Cbp * T;
  const Rt = -Math.sin(2 * dTh * rad) * Rc;
  return Math.sqrt((dLp / Sl) ** 2 + (dCp / Sc) ** 2 + (dHp / Sh) ** 2 + Rt * (dCp / Sc) * (dHp / Sh));
}

// Two acts a reader meets one after the other do not look like the same room.
async function checkFilmActColour(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter act colour check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter act colour check found no page carrying the film body class, so it measured nothing.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?still&scene-debug`, { scene: true });
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1800)));
      await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
      const bands = await page.evaluate(() => [...document.querySelectorAll('main > .act')].map((act, i) => ({
        act: i + 1,
        top: Math.round(act.getBoundingClientRect().top + window.scrollY),
        span: Number(act.dataset.stationSpan) || Math.round(act.getBoundingClientRect().height)
      })));
      if (bands.length < 2) {
        failures.push(route + ' carries the film body class and has fewer than two acts, so the act colour check measured nothing.');
        continue;
      }

      const accents = [];
      for (const band of bands) {
        await page.evaluate((to) => window.scrollTo(0, to), Math.round(band.top + band.span * 0.3));
        await page.evaluate(() => new Promise((done) => {
          let n = 0;
          const tick = () => (++n > 40 ? done() : requestAnimationFrame(tick));
          requestAnimationFrame(tick);
        }));
        const rgb = await page.evaluate(() => {
          const probe = document.createElement('span');
          probe.style.color = getComputedStyle(document.body).getPropertyValue('--scene-accent').trim();
          document.body.appendChild(probe);
          const c = getComputedStyle(probe).color;
          probe.remove();
          const parts = c.match(/\d+/g);
          return parts ? parts.slice(0, 3).map(Number) : null;
        });
        if (!rgb) {
          failures.push(route + ' act ' + band.act + ' does not paint a --scene-accent, so its colour could not be measured.');
          accents.push(null);
          continue;
        }
        accents.push({ act: band.act, lab: actLab(rgb) });
      }

      if (accents.some((a) => !a)) continue;
      for (let i = 0; i + 1 < accents.length; i++) {
        const apart = actDeltaE(accents[i].lab, accents[i + 1].lab);
        if (apart < ACT_COLOUR_APART) {
          failures.push(
            route + ' acts ' + accents[i].act + ' and ' + accents[i + 1].act + ' are ' + apart.toFixed(1)
            + ' apart to an eye, floor ' + ACT_COLOUR_APART + '. Two acts a reader meets one after the other read as one room, '
            + 'and hue degrees will not show it: the eye separates blues worst.'
          );
        }
      }
    }
  } finally {
    await browser.close();
  }
}

// How far two of a set's solid bodies may be into each other before one is standing inside the
// other, in the set's own units, and how solid a thing has to be to be asked about at all.
//
// The owner found act two's Wazuh Manager rotating through the last cabinet of the front row while
// every check here was green. Nothing asked. checkFilmTrafficPaths asks whether a bead passes
// through a body; the framing checks ask what one object does to the frame. Two bodies at one
// address was nobody's question, and the whole of a cabinet 21 units across was inside the manager
// for the second half of that act.
//
// Two units, because sets stand things against each other on purpose: a lit strip lies on a rack
// face, a unit stands proud of one. Those share a plane, not a volume. Four units of thickness to
// count as a body at all, for the same reason.
const BODY_CLASH = 2;
const BODY_SOLID = 4;
// How many depths of each act to sweep. A body that turns sweeps a wider box at forty five degrees
// than square on, and act two's manager grows from nothing across its act, so one frame is not a
// reading.
const BODY_DEPTHS = 13;

// Two boxes, each in its own orientation, by separating axis. Never along the world axes: act one's
// board is tilted, so a world aligned box around it is a slab of mostly air containing every
// component standing on it, and that form of this check reported fifteen clashes in act one of
// which all fifteen were the box rather than the board.
function bodyOverlap(A, B) {
  const dot = (u, v) => u.x * v.x + u.y * v.y + u.z * v.z;
  const t = { x: B.centre.x - A.centre.x, y: B.centre.y - A.centre.y, z: B.centre.z - A.centre.z };
  const axes = [...A.axes, ...B.axes];
  for (const a of A.axes) {
    for (const b of B.axes) {
      const c = { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x };
      const len = Math.hypot(c.x, c.y, c.z);
      if (len > 1e-6) axes.push({ x: c.x / len, y: c.y / len, z: c.z / len });
    }
  }
  let least = Infinity;
  for (const axis of axes) {
    const ra = A.half[0] * Math.abs(dot(axis, A.axes[0]))
      + A.half[1] * Math.abs(dot(axis, A.axes[1]))
      + A.half[2] * Math.abs(dot(axis, A.axes[2]));
    const rb = B.half[0] * Math.abs(dot(axis, B.axes[0]))
      + B.half[1] * Math.abs(dot(axis, B.axes[1]))
      + B.half[2] * Math.abs(dot(axis, B.axes[2]));
    const gap = ra + rb - Math.abs(dot(axis, t));
    if (gap <= 0) return 0;
    if (gap < least) least = gap;
  }
  return least;
}

// No set draws one solid body inside another.
async function checkFilmBodyClash(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter body clash check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter body clash check found no page carrying the film body class, so it measured nothing.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?scene-debug`, { scene: true });
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1800)));
      await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
      if (!await page.evaluate(() => Boolean(window.chapterFilm))) {
        failures.push(route + ' did not publish its scene through ?scene-debug, so its bodies could not be measured.');
        continue;
      }
      const bands = await page.evaluate(() => [...document.querySelectorAll('main > .act')].map((act, i) => ({
        act: i + 1,
        top: Math.round(act.getBoundingClientRect().top + window.scrollY),
        span: Number(act.dataset.stationSpan) || Math.round(act.getBoundingClientRect().height)
      })));
      if (bands.length === 0) {
        failures.push(route + ' carries the film body class and has no acts, so the body clash check measured nothing.');
        continue;
      }

      let measured = 0;
      const caught = [];
      for (const band of bands) {
        for (let d = 0; d < BODY_DEPTHS; d++) {
          const depth = d / (BODY_DEPTHS - 1);
          await page.evaluate((to) => window.scrollTo(0, to), Math.round(band.top + band.span * depth));
          await page.evaluate(() => new Promise((done) => {
            let n = 0;
            const tick = () => (++n > 40 ? done() : requestAnimationFrame(tick));
            requestAnimationFrame(tick);
          }));
          const bodies = await page.evaluate(([index, solid]) => {
            const film = window.chapterFilm;
            if (!film.stations[index]) return [];
            const g = film.stations[index].group;
            const s = g.scale.x || 1;
            const out = [];
            const obbOf = (bb, m, child, label) => {
              const e = m.elements;
              const c = { x: (bb.min.x + bb.max.x) / 2, y: (bb.min.y + bb.max.y) / 2, z: (bb.min.z + bb.max.z) / 2 };
              const centre = {
                x: (e[0] * c.x + e[4] * c.y + e[8] * c.z + e[12] - g.position.x) / s,
                y: (e[1] * c.x + e[5] * c.y + e[9] * c.z + e[13] - g.position.y) / s,
                z: (e[2] * c.x + e[6] * c.y + e[10] * c.z + e[14] - g.position.z) / s
              };
              const axes = [];
              const half = [];
              const reach = [(bb.max.x - bb.min.x) / 2, (bb.max.y - bb.min.y) / 2, (bb.max.z - bb.min.z) / 2];
              for (let a = 0; a < 3; a++) {
                const col = { x: e[a * 4] / s, y: e[a * 4 + 1] / s, z: e[a * 4 + 2] / s };
                const len = Math.hypot(col.x, col.y, col.z);
                if (len < 1e-9) return null;
                axes.push({ x: col.x / len, y: col.y / len, z: col.z / len });
                half.push(reach[a] * len);
              }
              if (Math.min(half[0], half[1], half[2]) * 2 < solid) return null;
              return { child, label, centre, axes, half };
            };
            g.children.forEach((child, ci) => {
              let ambient = false;
              child.traverse((n) => { if (n.userData && (n.userData.ambient || n.userData.caption)) ambient = true; });
              if (ambient || !child.visible) return;
              child.updateWorldMatrix(true, true);
              child.traverse((n) => {
                if (!n.isMesh && !n.isInstancedMesh) return;
                if (!n.visible || !n.geometry) return;
                if (n.material && n.material.opacity !== undefined && n.material.opacity < 0.05) return;
                if (!n.geometry.boundingBox) n.geometry.computeBoundingBox();
                if (!n.geometry.boundingBox) return;
                n.updateWorldMatrix(true, false);
                if (n.isInstancedMesh) {
                  for (let k = 0; k < n.count; k++) {
                    const m = new n.matrixWorld.constructor();
                    n.getMatrixAt(k, m);
                    const b = obbOf(n.geometry.boundingBox, m.clone().premultiply(n.matrixWorld), ci, child.type + ' copy ' + k);
                    if (b) out.push(b);
                  }
                } else {
                  const b = obbOf(n.geometry.boundingBox, n.matrixWorld, ci, child.name || (child.type + ' ' + n.type));
                  if (b) out.push(b);
                }
              });
            });
            return out;
          }, [band.act - 1, BODY_SOLID]);

          measured += bodies.length;
          for (let a = 0; a < bodies.length; a++) {
            for (let b = a + 1; b < bodies.length; b++) {
              if (bodies[a].child === bodies[b].child) continue;
              const deep = bodyOverlap(bodies[a], bodies[b]);
              if (deep < BODY_CLASH) continue;
              caught.push('act ' + band.act + ' at ' + Math.round(depth * 100) + '%: "' + bodies[a].label
                + '" and "' + bodies[b].label + '" are ' + deep.toFixed(1) + ' units into each other');
            }
          }
        }
      }

      if (measured === 0) {
        failures.push(route + ' carries the film body class and published no solid bodies at any depth, so the body clash check measured nothing.');
        continue;
      }
      if (caught.length) {
        const shown = [...new Set(caught)].slice(0, 5);
        failures.push(
          route + ' draws solid bodies inside each other at ' + caught.length + ' sampled pairs: ' + shown.join('; ')
          + '. A body standing inside another is two models at one address, and a body that turns sweeps through the one it is inside.'
        );
      }
    }
  } finally {
    await browser.close();
  }
}

async function checkFilmPlayControl(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter play control check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }

  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter play control check found no page carrying the film body class, so it measured nothing. Either the class was renamed or the check can no longer find the chapter pages.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}`);
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1500)));
      const has = await page.evaluate(() => Boolean(document.querySelector('.film-play')));
      if (!has) {
        failures.push(`${route} has no play control, so this check measured nothing. It is one of the pieces this form carries and it was built.`);
        continue;
      }
      // Two controls that do different things may not wear one costume.
      //
      // The opening screen carries both: a bare triangle and an uppercase mono word that opens
      // a video, and a bare triangle and an uppercase mono word that plays the film. They were
      // the same icon, the same type treatment and the same accent, so a reader could not tell
      // which was which until they pressed one.
      // Compared as pixels, because every other way of asking this measured the wrong thing.
      // One triangle is a background with a clip-path, the other is three borders on a
      // zero-sized box, so their computed styles differ completely while a reader sees one
      // shape; a check built on those styles passes whatever the page looks like. What a reader
      // has is the rendered mark, so that is what gets compared.
      const boxes = await page.evaluate(() => {
        const at = (selector) => {
          const el = document.querySelector(selector);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          if (r.width < 4 || r.height < 4) return null;
          return { x: Math.round(r.left), y: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) };
        };
        return { film: at('.film-play .film-play-icon'), video: at('.video-play .video-play-icon') };
      });
      if (boxes.film && boxes.video) {
        const shots = {};
        for (const [name, clip] of Object.entries(boxes)) {
          shots[name] = await page.screenshot({ clip, encoding: 'base64' });
        }
        // Both scaled to one small grid before comparing, so this is about shape rather than
        // about one mark being a couple of pixels bigger than the other.
        const alike = await page.evaluate(async ([a, b]) => {
          const grid = 12;
          const read = async (data) => {
            const img = new Image();
            img.src = 'data:image/png;base64,' + data;
            await img.decode();
            const c = document.createElement('canvas');
            c.width = grid;
            c.height = grid;
            const ctx = c.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0, grid, grid);
            const px = ctx.getImageData(0, 0, grid, grid).data;
            const out = [];
            for (let i = 0; i < px.length; i += 4) {
              out.push(px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114);
            }
            const lo = Math.min(...out);
            const hi = Math.max(...out);
            const span = Math.max(1, hi - lo);
            return out.map((v) => (v - lo) / span);
          };
          const one = await read(a);
          const two = await read(b);
          let diff = 0;
          for (let i = 0; i < one.length; i++) diff += Math.abs(one[i] - two[i]);
          return Math.round((1 - diff / one.length) * 100);
        }, [shots.film, shots.video]);
        if (alike >= 88) {
          failures.push(`${route} draws the mark on its video control and the mark on its film play control ${alike}% alike as pixels. They sit on the same opening screen in the same colour and the same type and they do different things, so the shape is all a reader has to tell them apart.`);
        }
      }

      // The foot of the page, which is past the last act and past anything the film plays.
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight - window.innerHeight));
      await page.evaluate(() => new Promise((done) => setTimeout(done, 600)));
      const offered = await page.evaluate(() => {
        const el = document.querySelector('.film-play');
        const style = window.getComputedStyle(el);
        const box = el.getBoundingClientRect();
        return style.display !== 'none'
          && style.visibility !== 'hidden'
          && Number(style.opacity) > 0.05
          && box.width > 0
          && box.height > 0;
      });
      if (offered) {
        failures.push(`${route} still offers its play control below the last act, where there is nothing left to play. A control that is visible is a control a reader will press.`);
      }
      const moved = await page.evaluate(async () => {
        const before = window.scrollY;
        document.querySelector('.film-play').click();
        await new Promise((done) => setTimeout(done, 900));
        return Math.round(window.scrollY - before);
      });
      if (moved < -2) {
        failures.push(`${route} play control scrolls the reader ${Math.abs(moved)}px back up the page when it is pressed from below the last act. Pressing play should never move a reader backwards.`);
      }

      // And from the top, where a reader actually presses it: does the page move at all.
      //
      // This check used to press play only from below the last act, where the right answer is
      // that nothing happens, and never once from a position where something should. So it was
      // green for the whole time the control did nothing, on every run, while the owner pressed
      // the button and watched the page sit still.
      //
      // What it did was real and invisible. portfolio-v2.css sets scroll-behavior: smooth on the
      // root, and the control calls window.scrollTo once a frame toward a target about four
      // pixels further on. Each call starts a fresh smooth scroll animation and the next frame
      // replaces it before it has travelled, so a run of 240px a second moved the page zero. A
      // single scrollTo on that page reaches 6px after 50ms and its target after 750ms; the same
      // call repeated every frame reaches nothing.
      //
      // Sixty pixels in a second, which a working control clears by a factor of four and a dead
      // one cannot reach. Not tied to the speed, so retuning the speed cannot quietly disable it.
      const PLAY_CARRIES = 60;
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.evaluate(() => new Promise((done) => setTimeout(done, 700)));
      const carried = await page.evaluate(async () => {
        const from = window.scrollY;
        document.querySelector('.film-play').click();
        await new Promise((done) => setTimeout(done, 1000));
        return { from: Math.round(from), to: Math.round(window.scrollY) };
      });
      // And the reader can take it back with a key, not only with the wheel.
      //
      // Pressing play leaves the button focused, so every keystroke afterwards arrived with the
      // button as its target, and the exemption that stops the control cancelling its own click
      // waved all of them through. The arrow keys scrolled while the film played over the top of
      // them. Wheel and pointer were fine the whole time, which is why nothing caught it.
      // Pressed on the control while the control holds focus, because that is the state a mouse
      // click leaves behind and it is the whole reason the fault was invisible. A key dispatched
      // at the window instead has the window as its target, takes the ordinary path, and passes
      // whether the page is right or wrong: this check was written that way first and proved
      // nothing.
      const gaveWay = await page.evaluate(async () => {
        const el = document.querySelector('.film-play');
        el.focus();
        await new Promise((done) => setTimeout(done, 200));
        const at = window.scrollY;
        (document.activeElement || el).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
        await new Promise((done) => setTimeout(done, 700));
        const after = window.scrollY;
        await new Promise((done) => setTimeout(done, 700));
        return { still: Math.round(window.scrollY - after), at: Math.round(at), focused: document.activeElement === el };
      });
      if (!gaveWay.focused) {
        failures.push(`${route} play control cannot take keyboard focus, so whether a key stops the film could not be measured.`);
      }
      if (gaveWay.still > 8) {
        failures.push(
          `${route} keeps playing after the reader presses a key: the page moved another ${gaveWay.still}px. `
          + 'Anything the reader does has to take the film back off them, and a key is the one that is easy to miss, '
          + 'because pressing play leaves the control focused and every keystroke then arrives on the control.'
        );
      }
      await page.evaluate(() => { const el = document.querySelector('.film-play'); if (el && el.textContent.trim() === 'Stop') el.click(); });

      const travelled = carried.to - carried.from;
      if (travelled < PLAY_CARRIES) {
        failures.push(
          `${route} play control moves the page ${travelled}px in a second when pressed from the top, floor ${PLAY_CARRIES}px. `
          + 'A control that says it plays the chapter and leaves the reader where they were is a dead button. '
          + 'Check scroll-behavior on the root: a per frame scrollTo cannot outrun a smooth scroll animation it restarts every frame.'
        );
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

// Every page a check opens may load from the local copy of the site and from nowhere else.
// Without this the browser runs the page exactly as a visitor's would: it asks the live Supabase
// project for comments, fetches a library from a CDN, and once a page has been open about six
// seconds the visitor counter records a visit in the production data. A check measures the files
// in this repository; it should neither depend on nor write to anything outside it.
//
// Puppeteer's rule for interception: once it is on, every request stalls until it is continued or
// aborted, so both branches end in one of the two. What was refused is kept per page, so a check
// can ask what a page tried to reach.
const guardedPages = new WeakMap();

async function guardPage(page, origin) {
  if (guardedPages.has(page)) return;
  const refused = [];
  guardedPages.set(page, refused);
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.isInterceptResolutionHandled()) return;
    const target = request.url();
    if (target === origin || target.startsWith(`${origin}/`) || /^(data|blob|about):/.test(target)) {
      request.continue();
      return;
    }
    refused.push(target);
    request.abort('blockedbyclient');
  });
}

function refusedRequests(page) {
  return guardedPages.get(page) || [];
}

// How every browser check opens a page. It waits for what the checks actually depend on: the
// load event, the web fonts (copy wraps differently without them, and the frame fit check is
// a measurement of wrapping), and, for a chapter opened with ?scene-debug, the scene handle.
//
// It used to wait for networkidle2, and that cannot be relied on for a page drawing WebGL
// without a GPU, which is what every CI runner is. Measured on this page with Chrome's GPU
// switched off: every request had finished inside half a second, and Chrome still had not
// reported the network idle after 30. With WebGL off as well it reported idle at 1.1s. CI
// timed out in the first browser check on every push from 2026-09-18 on, so none of the checks
// after it ever ran there.
//
// A scene that never publishes is not swallowed here: the wait ends, and each check's own test
// of window.chapterFilm reports the failure in its own words.
async function openPage(page, url, { scene = false } = {}) {
  await guardPage(page, new URL(url).origin);
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready.then(() => true));
  if (!scene) return;
  try {
    await page.waitForFunction(() => Boolean(window.chapterFilm), { timeout: 30000 });
  } catch (error) {
    if (error?.name !== 'TimeoutError') throw error;
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
      await guardPage(page, baseUrl);
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await new Promise((resolveDelay) => setTimeout(resolveDelay, 2500));
      await page.screenshot({ path: join(outputDir, `${name}.png`), fullPage: true });
    }
  } finally {
    await browser.close();
  }
}

// How much of the scene may be drawn behind the page's own words.
//
// A wireframe behind a paragraph passes a contrast check and still reads as busy: act three's
// cylinder rings through its four step captions, act two's cabinet edges through its copy. The
// engine fades whatever the scene draws behind a block of copy (clearBehindText in engine.js),
// and the page's scrim darkens the same region. This holds both to it.
//
// Measured as the extra edge the scene puts inside each rendered line of text, as a share of the
// edge the letters carry themselves: the frame with the scene's contents drawn against the same
// frame with them hidden, so the room's colour, the scrim and the glyphs are identical in both
// and the difference is the scene and nothing else. Hiding the canvas instead takes the room's
// ground away and measures the letters on a different backdrop.
//
// The ceiling is a line drawn through two measurements, not a derived number: the worst line in
// a sweep of four acts read 0.043 with the scene drawn at full strength behind the
// words, and 0.009 with the fade and the darker scrim. It sits between them.
const TEXT_EDGE_CEILING = 0.02;
const TEXT_EDGE_DEPTHS = [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6];

// No line of the page's copy has much of the scene drawn behind it.
async function checkFilmTextClear(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter text clearance check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter text clearance check found no page carrying the film body class, so it measured nothing.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?still&scene-debug`, { scene: true });
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1800)));
      if (!await page.evaluate(() => Boolean(window.chapterFilm))) {
        failures.push(`${route} did not publish its scene through ?scene-debug, so the copy could not be measured against it.`);
        continue;
      }
      const bands = await page.evaluate(() => [...document.querySelectorAll('main > .act')].map((act, i) => ({
        act: i + 1,
        top: Math.round(act.getBoundingClientRect().top + window.scrollY),
        span: Number(act.dataset.stationSpan) || Math.round(act.getBoundingClientRect().height)
      })));

      const settle = () => page.evaluate(() => new Promise((done) => {
        let n = 0;
        const tick = () => (++n > 40 ? done() : requestAnimationFrame(tick));
        requestAnimationFrame(tick);
      }));
      let lines = 0;
      let worst = null;
      for (const band of bands) {
        for (const depth of TEXT_EDGE_DEPTHS) {
          await page.evaluate((to) => window.scrollTo(0, to), Math.round(band.top + band.span * depth));
          await settle();
          // One box per rendered line, tight to the glyphs. A block box runs the full width of
          // its column however short the words are, and would count empty room as text.
          const boxes = await page.evaluate(() => {
            const header = document.querySelector('.site-header');
            const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
            const found = [];
            // The stat cards' words and the step numbers are set in strong and span, and are copy
            // a reader reads like any other line.
            for (const el of document.querySelectorAll('main .act h1, main .act h2, main .act h3, main .act p, main .act li, main .act .stat-card > *, main .act .case-step > span')) {
              const r = el.getBoundingClientRect();
              if (r.width < 40 || r.height < 10 || r.bottom < headerBottom || r.top > window.innerHeight) continue;
              const pin = el.closest('.act-pin');
              if (pin && !pin.classList.contains('is-arrived')) continue;
              let opacity = 1;
              for (let n = el; n && n !== document.documentElement; n = n.parentElement) opacity *= Number(getComputedStyle(n).opacity);
              if (opacity < 0.85) continue;
              const run = document.createRange();
              run.selectNodeContents(el);
              for (const line of run.getClientRects()) {
                if (line.width < 24 || line.height < 8 || line.top < headerBottom || line.bottom > window.innerHeight) continue;
                found.push({
                  text: el.textContent.trim().slice(0, 34),
                  rect: [Math.round(line.left), Math.round(line.top), Math.round(line.right), Math.round(line.bottom)]
                });
              }
            }
            return found;
          });
          if (boxes.length === 0) continue;
          const withScene = await page.screenshot({ encoding: 'base64' });
          await page.evaluate(() => {
            window.chapterFilm.scene.traverse((node) => {
              if (node === window.chapterFilm.scene || !node.visible) return;
              node.visible = false;
              node.userData.hiddenForTextCheck = true;
            });
          });
          await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
          const withoutScene = await page.screenshot({ encoding: 'base64' });
          await page.evaluate(() => {
            window.chapterFilm.scene.traverse((node) => {
              if (node.userData && node.userData.hiddenForTextCheck) {
                node.visible = true;
                node.userData.hiddenForTextCheck = false;
              }
            });
          });
          const added = await page.evaluate(async (a, b, rects) => {
            const read = async (data) => {
              const img = new Image();
              img.src = 'data:image/png;base64,' + data;
              await img.decode();
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d', { willReadFrequently: true });
              ctx.drawImage(img, 0, 0);
              return ctx.getImageData(0, 0, img.width, img.height);
            };
            const energy = (image, x0, y0, x1, y1) => {
              let total = 0;
              let counted = 0;
              for (let y = Math.max(0, y0); y < Math.min(image.height, y1); y++) {
                for (let x = Math.max(1, x0); x < Math.min(image.width, x1); x++) {
                  const i = (y * image.width + x) * 4;
                  const j = i - 4;
                  total += Math.abs(image.data[i] - image.data[j]) + Math.abs(image.data[i + 1] - image.data[j + 1]) + Math.abs(image.data[i + 2] - image.data[j + 2]);
                  counted += 3;
                }
              }
              return counted ? total / counted : 0;
            };
            const live = await read(a);
            const bare = await read(b);
            return rects.map((box) => {
              const own = energy(bare, ...box.rect);
              return { text: box.text, share: own > 0 ? (energy(live, ...box.rect) - own) / own : null };
            });
          }, withScene, withoutScene, boxes);
          for (const row of added) {
            if (row.share === null) continue;
            lines++;
            if (!worst || row.share > worst.share) worst = { ...row, act: band.act, depth };
          }
        }
      }
      if (lines === 0) {
        failures.push(`${route} showed no line of copy at any sampled depth, so the text clearance check measured nothing.`);
        continue;
      }
      if (worst.share > TEXT_EDGE_CEILING) {
        failures.push(
          `${route} puts ${worst.share.toFixed(3)} of a line's own edge inside "${worst.text}" (act ${worst.act} at ${Math.round(worst.depth * 100)}%), ceiling ${TEXT_EDGE_CEILING}, over ${lines} lines. The scene is being drawn behind the copy at full strength: see clearBehindText in engine.js and the scrim in film.css.`
        );
      }
    }
  } finally {
    await browser.close();
  }
}

// How far from its locking point a jump to an act may leave it, in CSS pixels.
//
// A pinned act locks with its top at the top of the window. The site's own stylesheet stops
// in-page jumps 82px short to keep headings clear of the fixed header, and on this page that
// left every act rail jump and every deep link 82px low: the copy and the camera moved into
// place only on the reader's next scroll. Two pixels is rounding, not a tolerance.
const JUMP_LANDING = 2;

// Every way of jumping to an act lands it where it locks: the act rail and a link from outside.
async function checkFilmJumpLanding(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the chapter jump landing check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The chapter jump landing check found no page carrying the film body class, so it measured nothing.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  // Waits until the page has stopped scrolling, by condition rather than by a fixed time: a
  // smooth scroll on a slow machine takes longer than any number written here would allow.
  const stillScrolling = (page) => page.waitForFunction(() => new Promise((done) => {
    let last = window.scrollY;
    let same = 0;
    const tick = () => {
      same = window.scrollY === last ? same + 1 : 0;
      last = window.scrollY;
      if (same >= 20) done(true); else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { timeout: 15000 });
  const where = (page, id) => page.evaluate((target) => {
    const act = document.getElementById(target);
    return act ? Math.round(act.getBoundingClientRect().top) : null;
  }, id);
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?scene-debug`, { scene: true });
      await stillScrolling(page);
      const ids = await page.evaluate(() => [...document.querySelectorAll('.film-act-nav a')].map((link) => link.getAttribute('href').slice(1)));
      if (ids.length === 0) {
        failures.push(`${route} has no act rail, so the jump landing check measured nothing.`);
        continue;
      }
      const missed = [];
      for (const id of ids) {
        await page.evaluate((target) => document.querySelector(`.film-act-nav a[href="#${target}"]`).click(), id);
        await stillScrolling(page);
        const top = await where(page, id);
        if (top === null || Math.abs(top) > JUMP_LANDING) missed.push(`the rail's #${id} leaves the act at ${top}px`);
      }
      // A link from outside, opened fresh, the way a reader arrives from another page.
      const last = ids[ids.length - 1];
      await openPage(page, `${baseUrl}${route}?scene-debug#${last}`, { scene: true });
      await stillScrolling(page);
      const linked = await where(page, last);
      if (linked === null || Math.abs(linked) > JUMP_LANDING) missed.push(`opening #${last} leaves the act at ${linked}px`);
      if (missed.length) {
        failures.push(
          `${route} stops a jump short of where the act locks: ${missed.join('; ')}, ceiling ${JUMP_LANDING}px. The copy and the camera then only arrive on the reader's next scroll. Look for a scroll-padding-top or scroll-margin-top that offsets the jump.`
        );
      }
    }
  } finally {
    await browser.close();
  }
}

// The demo video opens centred over the page and gives the page back when it closes.
//
// It used to play inside the button's own box, which on the Cyber Sentinel page is the bottom
// left of a pinned frame, and once it ended YouTube's end screen stayed there until a reload.
// YouTube itself is blocked here like every other outside request, so the player never loads:
// what is checked is the window it plays in. The end of the video is YouTube telling the page
// so, and that boundary is faked with an object shaped like YouTube's own player API.
const VIDEO_CENTRE_TOLERANCE = 0.02;
const VIDEO_MIN_WIDTH_SHARE = 0.6;

async function checkVideoDialog(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the video dialog check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = [];
  for (const file of (await walkFiles(repoRoot)).filter((f) => extname(f).toLowerCase() === '.html')) {
    const shown = toDisplayPath(file);
    if (shown.startsWith('classic/') || shown.startsWith('play/')) continue;
    if ((await readFile(file, 'utf8')).includes('data-video-id')) routes.push('/' + shown);
  }
  if (routes.length === 0) {
    failures.push('The video dialog check found no page with a video on it, so it measured nothing.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      const problems = [];
      await openPage(page, `${baseUrl}${route}`);
      // A real click, so the button takes focus the way it does for a reader, and focus coming
      // back to it afterwards means something.
      const hasButton = await page.evaluate(() => {
        const button = document.querySelector('[data-video-id] .video-play');
        // Instant: the site scrolls smoothly, and a click aimed while the button is still moving misses it.
        if (button) button.scrollIntoView({ block: 'center', behavior: 'instant' });
        return Boolean(button);
      });
      // And until it has stopped moving: the chapter settles its camera after load, which can
      // carry the page, and a click aimed at where the button was lands on nothing.
      if (hasButton) {
        await page.waitForFunction(() => new Promise((done) => {
          const button = document.querySelector('[data-video-id] .video-play');
          let last = button.getBoundingClientRect().top;
          let same = 0;
          const tick = () => {
            const now = button.getBoundingClientRect().top;
            same = now === last ? same + 1 : 0;
            last = now;
            if (same >= 10) done(true); else requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }), { timeout: 15000 });
        await page.click('[data-video-id] .video-play');
      }
      const opened = !hasButton ? null : await page.evaluate(async () => {
        const button = document.querySelector('[data-video-id] .video-play');
        await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
        const dialog = document.querySelector('dialog.video-dialog');
        if (!dialog || !dialog.open) return { open: false };
        const box = dialog.getBoundingClientRect();
        return {
          open: true,
          dx: Math.abs(box.left + box.width / 2 - innerWidth / 2) / innerWidth,
          dy: Math.abs(box.top + box.height / 2 - innerHeight / 2) / innerHeight,
          width: box.width / innerWidth,
          locked: getComputedStyle(document.documentElement).overflow === 'hidden',
          buttonKept: document.contains(button)
        };
      });
      if (!opened) {
        problems.push('has a video block with no button in it');
      } else if (!opened.open) {
        problems.push('does not open the video in a dialog when its button is pressed');
      } else {
        if (opened.dx > VIDEO_CENTRE_TOLERANCE || opened.dy > VIDEO_CENTRE_TOLERANCE) {
          problems.push(`opens the video ${Math.round(opened.dx * 100)}% across and ${Math.round(opened.dy * 100)}% down from the middle of the window, tolerance ${VIDEO_CENTRE_TOLERANCE * 100}%`);
        }
        if (opened.width < VIDEO_MIN_WIDTH_SHARE) {
          problems.push(`opens the video ${Math.round(opened.width * 100)}% of the window wide, floor ${VIDEO_MIN_WIDTH_SHARE * 100}%`);
        }
        if (!opened.locked) problems.push('lets the page scroll behind the open video');
        if (!opened.buttonKept) problems.push('replaces the button with the player, so there is nothing to return to');
        await page.keyboard.press('Escape');
        // The dialog's close event is queued, not run inside close(), so give it a frame.
        const closed = await page.evaluate(async () => {
          await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
          const dialog = document.querySelector('dialog.video-dialog');
          const button = document.querySelector('[data-video-id] .video-play');
          return {
            closed: !dialog.open,
            emptied: !dialog.querySelector('.video-dialog-frame').firstChild,
            focusBack: document.activeElement === button
          };
        });
        if (!closed.closed) problems.push('does not close the video on Escape');
        if (!closed.emptied) problems.push('keeps the player in the page after the video is closed, so it can play on unseen');
        if (!closed.focusBack) problems.push('does not give focus back to the button after the video closes');
      }

      // The end of the video. A fresh page, with YouTube's player API standing in for itself.
      await openPage(page, `${baseUrl}${route}`);
      const ended = await page.evaluate(async () => {
        let events = null;
        window.YT = {
          PlayerState: { ENDED: 0 },
          Player: class {
            constructor(element, options) { events = options.events; }
            destroy() {}
            getIframe() { return null; }
          }
        };
        const button = document.querySelector('[data-video-id] .video-play');
        if (!button) return null;
        button.click();
        for (let i = 0; i < 30 && !events; i++) await new Promise((done) => setTimeout(done, 20));
        const dialog = document.querySelector('dialog.video-dialog');
        if (!events || !dialog) return { reached: false };
        events.onStateChange({ data: 0 });
        return { reached: true, closed: !dialog.open, buttonKept: document.contains(button) };
      });
      if (ended && !ended.reached) problems.push('never handed the video to the player, so the end of the video could not be checked');
      if (ended && ended.reached && !ended.closed) problems.push('stays open after the video ends');
      if (ended && ended.reached && !ended.buttonKept) problems.push('does not leave the button in place after the video ends');

      for (const problem of problems) failures.push(`${route} ${problem}.`);
    }
  } finally {
    await browser.close();
  }
}

// What the fade behind the page's words leaves alone. Owner decision 2026-10-05: a screen keeps
// its content, and a set that declares itself contained keeps its solid bodies whole, because
// the closing act's Kibana title and act one's board corner both faded with the copy they
// passed behind. Everything else in a set still fades, and this asks that too, so a pass that
// simply stopped fading anything would not pass here.
async function checkFilmTextClearKeepsWhole(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the check of what the text fade keeps whole because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The check of what the text fade keeps whole found no page carrying the film body class, so it measured nothing.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?still&scene-debug`, { scene: true });
      if (!await page.evaluate(() => Boolean(window.chapterFilm))) {
        failures.push(`${route} did not publish its scene through ?scene-debug, so what the text fade keeps whole could not be checked.`);
        continue;
      }
      const found = await page.evaluate(() => {
        const out = { screensFaded: [], bodiesFaded: [], screens: 0, bodies: 0, sceneryFaded: 0, scenery: 0 };
        const faded = (node) => [].concat(node.material).some((m) => m && m.userData && m.userData.clearsBehindText);
        window.chapterFilm.stations.forEach((station, si) => {
          station.group.traverse((node) => {
            if (!node.material || (node.userData && node.userData.caption)) return;
            let ambient = false;
            for (let n = node; n && n !== station.group.parent; n = n.parent) {
              if (n.userData && n.userData.ambient) ambient = true;
            }
            if (node.userData && node.userData.screen) {
              out.screens++;
              if (faded(node)) out.screensFaded.push(`act ${si + 1} "${node.userData.screen}"`);
            } else if (station.contained && node.isMesh && !ambient) {
              out.bodies++;
              if (faded(node)) out.bodiesFaded.push(`act ${si + 1} ${node.type}`);
            } else if (ambient) {
              out.scenery++;
              if (faded(node)) out.sceneryFaded++;
            }
          });
        });
        return out;
      });
      if (found.screens === 0) failures.push(`${route} marks no screens, so whether the text fade leaves them whole was not checked.`);
      if (found.bodies === 0) failures.push(`${route} has no contained set with a solid body, so whether the text fade leaves them whole was not checked.`);
      for (const item of found.screensFaded.slice(0, 4)) {
        failures.push(`${route} fades ${item} behind the page's words. A screen's content stays whole: see clearBehindText in engine.js.`);
      }
      if (found.bodiesFaded.length) {
        failures.push(`${route} fades ${found.bodiesFaded.length} solid bodies of a contained set behind the page's words (${found.bodiesFaded.slice(0, 4).join(', ')}). A set meant to be seen whole keeps its bodies whole: see clearBehindText in engine.js.`);
      }
      if (found.scenery > 0 && found.sceneryFaded === 0) {
        failures.push(`${route} fades none of its ${found.scenery} pieces of scenery behind the page's words, so the fade is not running at all.`);
      }
    }
  } finally {
    await browser.close();
  }
}

// During a flight, the set the camera is heading for is louder than the streaks around it.
//
// The streaks stretch and brighten with the camera's speed so travel reads as travel. A review
// found them the brightest thing in the transit frames, with the incoming set small and drowned
// in them, and the owner chose on 2026-10-05 to cap how bright they get. Measured the way the
// landing weight is: inside the incoming set's own part of the frame, how much the set changes
// the picture against how much the streaks do, each drawn alone against the empty room.
const TRANSIT_LEAD = 2;
const TRANSIT_DEPTHS = [0.7, 0.8];
// And over the whole frame, once the flight is most of the way there. A second review read the
// transit frames as a warp-speed burst with the arriving set lost in it while the measure above
// passed: inside its own part of the frame the set led, and across the frame the streaks carried
// up to twenty times its weight. At 80% of a flight the set now carries 2.2 times the streaks'
// weight across the frame; it carried 0.37 before the streaks were shortened and dimmed.
const TRANSIT_WHOLE_DEPTH = 0.8;
const TRANSIT_WHOLE_LEAD = 1.5;

async function checkFilmTransitWeight(baseUrl) {
  const executablePath = findChromeExecutable();
  if (!executablePath) {
    warnings.push('Skipping the transit weight check because Chrome/Edge was not found. Set CHROME_PATH to enable it.');
    return;
  }
  const routes = await filmRoutes();
  if (routes.length === 0) {
    failures.push('The transit weight check found no page carrying the film body class, so it measured nothing.');
    return;
  }

  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle']
  });
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      await openPage(page, `${baseUrl}${route}?still&scene-debug`, { scene: true });
      await page.evaluate(() => new Promise((done) => setTimeout(done, 1800)));
      if (!await page.evaluate(() => Boolean(window.chapterFilm && window.chapterFilm.pause))) {
        failures.push(`${route} did not publish its scene through ?scene-debug, so its transit frames could not be weighed.`);
        continue;
      }
      const bands = await page.evaluate(() => [...document.querySelectorAll('main > .act')].map((act) => ({
        top: Math.round(act.getBoundingClientRect().top + window.scrollY),
        span: Number(act.dataset.stationSpan) || Math.round(act.getBoundingClientRect().height)
      })));
      let measured = 0;
      const drowned = [];
      // Every act with a set after it. The last act has no flight.
      for (let a = 0; a < bands.length - 1; a++) {
        for (const depth of TRANSIT_DEPTHS) {
          await page.evaluate((to) => window.scrollTo(0, to), Math.round(bands[a].top + bands[a].span * depth));
          await page.evaluate(() => new Promise((done) => {
            let n = 0;
            const tick = () => (++n > 40 ? done() : requestAnimationFrame(tick));
            requestAnimationFrame(tick);
          }));
          // Freeze the loop, then draw one layer at a time: nothing, the incoming set, the streaks.
          const shots = {};
          for (const layer of ['none', 'set', 'streaks']) {
            await page.evaluate(([show, next]) => {
              const film = window.chapterFilm;
              film.pause();
              film.scene.children.forEach((child) => {
                const isStation = film.stations.some((s) => s.group === child);
                if (isStation) child.visible = show === 'set' && child === film.stations[next].group;
                else if (child.userData && child.userData.streaks) child.visible = show === 'streaks';
                else if (child.isMesh || child.isLine || child.isPoints || child.isGroup) child.visible = false;
              });
              film.render();
            }, [layer, a + 1]);
            shots[layer] = await page.screenshot({ encoding: 'base64' });
          }
          const box = await page.evaluate((next) => {
            const film = window.chapterFilm;
            const camera = film.camera;
            const group = film.stations[next].group;
            let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
            group.updateMatrixWorld(true);
            group.traverse((node) => {
              if (!node.geometry || (!node.isMesh && !node.isLine && !node.isLineSegments)) return;
              for (let p = node; p && p !== group.parent; p = p.parent) {
                if (p.userData && (p.userData.ambient || p.userData.caption)) return;
              }
              if (!node.geometry.boundingBox) node.geometry.computeBoundingBox();
              const bb = node.geometry.boundingBox;
              for (let c = 0; c < 8; c++) {
                const v = bb.min.clone();
                if (c & 1) v.x = bb.max.x;
                if (c & 2) v.y = bb.max.y;
                if (c & 4) v.z = bb.max.z;
                v.applyMatrix4(node.matrixWorld);
                if (v.clone().applyMatrix4(camera.matrixWorldInverse).z > -0.1) continue;
                v.project(camera);
                x0 = Math.min(x0, (v.x * 0.5 + 0.5) * innerWidth);
                x1 = Math.max(x1, (v.x * 0.5 + 0.5) * innerWidth);
                y0 = Math.min(y0, (-v.y * 0.5 + 0.5) * innerHeight);
                y1 = Math.max(y1, (-v.y * 0.5 + 0.5) * innerHeight);
              }
            });
            if (x0 === Infinity) return null;
            return [Math.max(0, x0), Math.max(0, y0), Math.min(innerWidth, x1), Math.min(innerHeight, y1)];
          }, a + 1);
          // Hand the loop back before anything else is measured.
          await page.evaluate(() => {
            const film = window.chapterFilm;
            film.scene.children.forEach((child) => { child.visible = true; });
            if (film.resume) film.resume();
          });
          if (!box || box[2] - box[0] < 4 || box[3] - box[1] < 4) continue;
          const ink = await page.evaluate(async (empty, set, streaks, rect) => {
            const read = async (data) => {
              const img = new Image();
              img.src = 'data:image/png;base64,' + data;
              await img.decode();
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d', { willReadFrequently: true });
              ctx.drawImage(img, 0, 0);
              return ctx.getImageData(0, 0, img.width, img.height);
            };
            const base = await read(empty);
            const sum = async (data) => {
              const shot = await read(data);
              let total = 0;
              for (let y = Math.floor(rect[1]); y < Math.ceil(rect[3]); y++) {
                for (let x = Math.floor(rect[0]); x < Math.ceil(rect[2]); x++) {
                  const i = (y * shot.width + x) * 4;
                  total += Math.abs(shot.data[i] - base.data[i]) + Math.abs(shot.data[i + 1] - base.data[i + 1]) + Math.abs(shot.data[i + 2] - base.data[i + 2]);
                }
              }
              return total;
            };
            return { set: await sum(set), streaks: await sum(streaks) };
          }, shots.none, shots.set, shots.streaks, box);
          measured++;
          const lead = ink.streaks > 0 ? ink.set / ink.streaks : Infinity;
          if (lead < TRANSIT_LEAD) drowned.push(`act ${a + 1} at ${Math.round(depth * 100)}%, the set leads by ${lead.toFixed(2)}`);
          if (depth === TRANSIT_WHOLE_DEPTH) {
            const whole = await page.evaluate(async (empty, set, streaks) => {
              const read = async (data) => {
                const img = new Image();
                img.src = 'data:image/png;base64,' + data;
                await img.decode();
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                ctx.drawImage(img, 0, 0);
                return ctx.getImageData(0, 0, img.width, img.height).data;
              };
              const base = await read(empty);
              const sum = async (data) => {
                const shot = await read(data);
                let total = 0;
                for (let i = 0; i < shot.length; i += 4) {
                  total += Math.abs(shot[i] - base[i]) + Math.abs(shot[i + 1] - base[i + 1]) + Math.abs(shot[i + 2] - base[i + 2]);
                }
                return total;
              };
              return { set: await sum(set), streaks: await sum(streaks) };
            }, shots.none, shots.set, shots.streaks);
            const across = whole.streaks > 0 ? whole.set / whole.streaks : Infinity;
            if (across < TRANSIT_WHOLE_LEAD) drowned.push(`act ${a + 1} at ${Math.round(depth * 100)}%, across the whole frame the set carries ${across.toFixed(2)} of the streaks' weight, floor ${TRANSIT_WHOLE_LEAD}`);
          }
        }
      }
      if (measured === 0) {
        failures.push(`${route} showed no incoming set in any transit frame, so the transit weight check measured nothing.`);
        continue;
      }
      if (drowned.length) {
        failures.push(
          `${route} lets its streaks outweigh the set a flight is heading for: ${drowned.join('; ')}. Inside the set's own part of the frame the floor is ${TRANSIT_LEAD} times. The streaks are there to make travel read as travel, not to be the subject; see the streak opacity in engine.js.`
        );
      }
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
  await checkNoChapterWordInCopy();
  await checkPresentDates();
  await checkPrivateFolders();
  await checkVisitorProofHost();
  await checkFilmTokenScope();
  await checkTruckStripLoop();
  await checkFilmActHandoff();
  await checkStaticReferences();

  const { server, baseUrl } = await startStaticServer();
  try {
    await smokeTestRoutes(baseUrl);
    await checkFilmFrameFit(baseUrl);
    await checkFilmEdgeChrome(baseUrl);
    await checkFilmClosingSet(baseUrl);
    await checkFilmNameplates(baseUrl);
    await checkFilmSetFraming(baseUrl);
    await checkFilmTransitWeight(baseUrl);
    await checkFilmSequenceWiring(baseUrl);
    await checkFilmTrafficPaths(baseUrl);
    await checkFilmLabelSize(baseUrl);
    await checkFilmPlateLegibility(baseUrl);
    await checkFilmLabelContrast(baseUrl);
    await checkFilmTextClear(baseUrl);
    await checkFilmTextClearKeepsWhole(baseUrl);
    await checkFilmPlayControl(baseUrl);
    await checkFilmJumpLanding(baseUrl);
    await checkVideoDialog(baseUrl);
    await checkFilmBodyClash(baseUrl);
    await checkFilmActColour(baseUrl);
    await checkVisitCounting(baseUrl);
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
