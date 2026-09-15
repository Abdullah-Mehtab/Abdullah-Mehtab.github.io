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
        await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle2' });
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
        await page.evaluate(() => new Promise((done) => setTimeout(done, 600)));
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
      await page.goto(`${baseUrl}${route}?still&scene-debug`, { waitUntil: 'networkidle2' });
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
      await page.goto(`${baseUrl}${route}?still&scene-debug`, { waitUntil: 'networkidle2' });
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

// Where in each act to look for nameplates. Seven depths an act, all inside the part of it the
// camera spends in front of its own set: past about 60% the camera is in flight to the next
// station and an act's own labels are behind it, so a sample there measures the next act. Even
// spacing out to 0.95 looked more thorough and missed a plate whose whole window is at 30%.
const PLATE_DEPTHS = [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
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
      await page.goto(`${baseUrl}${route}?still&scene-debug`, { waitUntil: 'networkidle2' });
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

// The play control never takes a reader backwards, and is not offered where there is nothing
// to play.
//
// It plays the chapter by moving the scroll, and it stops itself at the bottom of the last act
// because past that the page is a comment form and a footer. Pressed from below that point it
// was scrolling the reader back up to it: measured at 932px of travel in the wrong direction,
// from a control sitting in full view at the foot of the page.
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
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle2' });
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
    await checkFilmPlayControl(baseUrl);
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
