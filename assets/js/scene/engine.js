// ABOUTME: The chapter film engine: one canvas, a camera on a dolly track, one 3D set per act.
// ABOUTME: Written once and shared by every chapter page. Adding a chapter is a set file, never a change here.
//
// The shape of it. Acts in the document are stations along the negative z axis, spaced
// STATION_GAP apart. The camera rests CAM_BACK in front of whichever station is active. An act
// spends the first HOLD of its scroll range sitting still in front of its set, then flies to
// the next one. So a reader reads while the camera is parked, and travels while they are
// between paragraphs, which is the only arrangement where neither job interrupts the other.
//
// Two things here are the whole difference between this and a page that merely moves:
//
//   The camera follows a damped copy of the scroll position, never window.scrollY itself.
//   Raw scroll is a step function sampled by a wheel; damping is what "smooth" means.
//
//   The pointer moves the camera's look target, not the page. Nothing on screen is attached to
//   the cursor, and yet the frame answers it. That is the whole trick.
import * as THREE from "../../vendor/three/three.module.min.js";
import { clamp01, lerp, ease, motes, seeded } from "./kit.js";

const STATION_GAP = 420;
const CAM_BACK = 62;
const HOLD = 0.55;
const SCROLL_DAMPING = 0.1;
const POINTER_DAMPING = 0.04;
const BASE_FOV = 55;

// Hue offsets, in degrees, applied to the theme's own accent to give each act its own colour.
// Owner decision, 2026-09-11: the theme sets the palette and the acts shift within it, chosen
// over a fixed film palette and over one flat colour per theme. Forest gives four greens.
// Sixteen degrees apart left acts two and three reading as one room in the perceptual
// difference check. Wider, and the four still sit inside the theme's own hue family.
const ACT_HUE_SHIFT = [-30, -10, 12, 28];

function parseColor(value, fallback) {
  const probe = new THREE.Color();
  try {
    probe.setStyle(value.trim());
    return probe;
  } catch (err) {
    return new THREE.Color(fallback);
  }
}

// Reads the live theme rather than carrying a palette of its own. Eighteen themes are a
// feature of this site, two of them are light, and a scene with its own fixed colours would
// quietly opt out of all of that.
function readPalette(body, actCount) {
  const style = getComputedStyle(body);
  const token = (name, fallback) => parseColor(style.getPropertyValue(name) || "", fallback);

  const deep = token("--bg-deep", 0x060b12);
  const ink = token("--text", 0xe9f3fb);
  const accent = token("--cyan", 0x4de1dc);

  const hsl = { h: 0, s: 0, l: 0 };
  accent.getHSL(hsl);
  const lightRoom = deep.getHSL({ h: 0, s: 0, l: 0 }).l > 0.5;

  const accents = [];
  for (let i = 0; i < actCount; i++) {
    const shift = ACT_HUE_SHIFT[i % ACT_HUE_SHIFT.length] / 360;
    const colour = new THREE.Color();
    // On a light theme the same accent on a pale ground is invisible, so the room keeps its
    // hue and loses its lightness instead of the scene going dark and ignoring the theme.
    const l = lightRoom ? Math.min(0.42, hsl.l * 0.62) : Math.min(0.72, hsl.l + 0.06);
    colour.setHSL((hsl.h + shift + 1) % 1, Math.min(1, hsl.s * (lightRoom ? 1.05 : 0.95)), l);
    accents.push(colour);
  }

  // The faces sit just off the background so a solid reads as a body rather than a hole, and
  // the edge does the drawing. Pulling them to pure black would lose every silhouette.
  const face = deep.clone();
  face.offsetHSL(0, 0, lightRoom ? -0.04 : 0.035);

  // Each act gets its own air, not just its own objects. The sets occupy about a third of the
  // frame, so two acts whose only difference is the geometry in that third are two versions of
  // the same room to anyone looking at the whole screen: .claude-tools/audit-scene-difference.mjs
  // put three of the six pairs below the floor for exactly that reason. Tinting the clear
  // colour and the fog is the cheapest honest way to make an act a place.
  // Built in HSL rather than mixed toward the accent. Mixing pulls the whole frame toward the
  // accent's lightness, and with a bright cyan accent that turned the right half of the screen
  // into pale grey fog with the set barely visible in it. Taking the hue and keeping the
  // background's own darkness gives four distinct rooms that are all still night.
  const ROOM_LIFT = [0, 0.034, 0.014, 0.05];
  const deepHsl = { h: 0, s: 0, l: 0 };
  deep.getHSL(deepHsl);
  const rooms = accents.map((accent, i) => {
    const hue = { h: 0, s: 0, l: 0 };
    accent.getHSL(hue);
    const lift = ROOM_LIFT[i % 4] * (lightRoom ? -0.5 : 1);
    return new THREE.Color().setHSL(hue.h, lightRoom ? 0.1 : 0.4, Math.max(0, deepHsl.l + lift));
  });

  return { deep, ink, accents, face, rooms, lightRoom };
}

// Nameplates are the one thing in a set whose placement cannot be solved when the set is
// built. A flown graph puts nodes behind each other constantly, so two plates that are six
// units apart in the world are one plate on screen at forty units of depth, and a plate near
// the edge of a set is cut in half by the frame as the camera swings. Both are properties of
// where the camera is this frame, so they are settled this frame, here, for every set at once.
//
// Two rules, applied after the sets have had their say:
//   a plate leaving the frame fades out rather than being cropped;
//   of two plates on the same pixels, the nearer one keeps its name and the further one loses it.
const NAMEPLATE_EDGE_FADE = 0.07;
const NAMEPLATE_OVERLAP = 0.06;
// The left edge of the art lane, in clip space. film.css gives the copy columns one to eight
// of twelve when the scene is live, and that container is centred at a maximum of 1180px, so
// the copy's right edge lands here. A nameplate reaching past it is a second caption landing
// on the page's own headline, which is the one thing the lane exists to prevent.
const COPY_LANE_EDGE = 0.3;

function screenBox(node, camera, probe) {
  const params = node.geometry && node.geometry.parameters;
  if (!params) return null;
  const hw = (params.width || 1) / 2;
  const hh = (params.height || 1) / 2;
  node.updateWorldMatrix(true, false);
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let corner = 0; corner < 4; corner++) {
    probe.set(corner === 0 || corner === 3 ? -hw : hw, corner < 2 ? -hh : hh, 0);
    probe.applyMatrix4(node.matrixWorld);
    const depth = probe.distanceTo(camera.position);
    probe.project(camera);
    if (probe.z > 1) return null;
    minX = Math.min(minX, probe.x);
    maxX = Math.max(maxX, probe.x);
    minY = Math.min(minY, probe.y);
    maxY = Math.max(maxY, probe.y);
    if (corner === 0) node.userData.range = depth;
  }
  return { minX, minY, maxX, maxY };
}

// Heading rectangles are read from the document at most this often. On a phone the copy is
// the whole width, so the only way to keep a nameplate off a headline is to know where the
// headlines are; reading them every frame would cost a forced layout per frame, and they do
// not move faster than this.
const HEADING_REFRESH_MS = 140;
let headingCache = [];
let headingCachedAt = 0;

function headingRects(now) {
  if (now - headingCachedAt < HEADING_REFRESH_MS) return headingCache;
  headingCachedAt = now;
  headingCache = [];
  for (const el of document.querySelectorAll("main .act h1, main .act h2, main .act h3")) {
    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight || rect.width < 40) continue;
    headingCache.push(rect);
  }
  return headingCache;
}

function keepNameplatesLegible(stations, camera, probe, plates, narrow, width, height, now) {
  plates.length = 0;
  // A phone has no art lane: the copy is the whole width, so any nameplate can land on the
  // page's own heading. Dropping all of them fixed that and cost every act its specificity:
  // a phone reader got unlabelled geometry and no BCM2712, no DDoS, no Filebeat. So on a
  // narrow screen each set keeps the one label that names it, and every label is checked
  // against the headings actually on screen rather than removed in advance.
  for (const station of stations) {
    if (!station.group.visible) continue;
    station.group.traverse((node) => {
      if (!node.userData || !node.userData.caption || !node.material) return;
      if (narrow && !node.userData.primary) node.material.opacity = 0;
    });
  }
  for (const station of stations) {
    if (!station.group.visible) continue;
    station.group.traverse((node) => {
      if (!node.userData || !node.userData.caption || !node.material) return;
      if (node.material.opacity <= 0.02) return;
      const box = screenBox(node, camera, probe);
      if (!box) return;
      // Drawn over the set rather than inside it. A caption half behind a monitor stand is a
      // fragment, and depth-sorting a label against the thing it names never ends well.
      if (node.material.depthTest) {
        node.material.depthTest = false;
        node.renderOrder = 12;
      }
      plates.push({ node, box, range: node.userData.range });
    });
  }
  if (plates.length === 0) return;

  // Clip space runs -1 to 1, so a plate is whole while its box stays inside that. The overflow
  // is measured against the plate's own size rather than the screen's: a narrow plate hanging
  // two per cent of the screen past the edge has lost a fifth of itself, and a wide one has
  // lost a letter.
  for (const plate of plates) {
    const own = Math.max(0.001, Math.max(plate.box.maxX - plate.box.minX, plate.box.maxY - plate.box.minY));
    const out = Math.max(0, -1 - plate.box.minX, plate.box.maxX - 1, -1 - plate.box.minY, plate.box.maxY - 1);
    if (out > 0) plate.node.material.opacity *= Math.max(0, 1 - (out / own) / NAMEPLATE_EDGE_FADE);

    // And the same treatment for the copy's side of the frame, on a wide screen where the
    // copy has a column of its own.
    if (!narrow) {
      const intoLane = COPY_LANE_EDGE - plate.box.minX;
      if (intoLane > 0) plate.node.material.opacity *= Math.max(0, 1 - (intoLane / own) / 0.35);
    }
  }

  // Anywhere, wide or narrow: a nameplate over one of the page's own headings goes.
  const headings = headingRects(now);
  if (headings.length) {
    for (const plate of plates) {
      if (plate.node.material.opacity <= 0.02) continue;
      const left = (plate.box.minX * 0.5 + 0.5) * width;
      const right = (plate.box.maxX * 0.5 + 0.5) * width;
      const top = (-plate.box.maxY * 0.5 + 0.5) * height;
      const bottom = (-plate.box.minY * 0.5 + 0.5) * height;
      for (const rect of headings) {
        if (right < rect.left || left > rect.right || bottom < rect.top || top > rect.bottom) continue;
        plate.node.material.opacity = 0;
        break;
      }
    }
  }

  plates.sort((a, b) => a.range - b.range);
  for (let i = 0; i < plates.length; i++) {
    if (plates[i].node.material.opacity <= 0.02) continue;
    for (let j = i + 1; j < plates.length; j++) {
      if (plates[j].node.material.opacity <= 0.02) continue;
      const a = plates[i].box;
      const b = plates[j].box;
      const w = Math.min(a.maxX, b.maxX) - Math.max(a.minX, b.minX);
      const h = Math.min(a.maxY, b.maxY) - Math.max(a.minY, b.minY);
      if (w <= 0 || h <= 0) continue;
      const smaller = Math.min((a.maxX - a.minX) * (a.maxY - a.minY), (b.maxX - b.minX) * (b.maxY - b.minY));
      if (smaller > 0 && w * h > smaller * NAMEPLATE_OVERLAP) plates[j].node.material.opacity = 0;
    }
  }
}

function disposeGroup(group) {
  group.traverse((node) => {
    if (node.geometry) node.geometry.dispose();
    const material = node.material;
    if (!material) return;
    for (const m of Array.isArray(material) ? material : [material]) m.dispose();
  });
}

// What travels between the stations.
//
// This used to be drifting octahedra, tetrahedra and wireframe toruses, which is the default
// furniture of every WebGL scroll page including the one this is benchmarked against, and it
// said nothing about a chapter on security monitoring. What actually moves between these four
// sets is log lines and packets, so that is what fills the space: rows of a log seen edge on,
// and short bright ticks strung down the track. Both are one buffer each, so the whole track
// costs three draw calls instead of ninety.
function buildTrackAmbience(scene, palette, stationCount) {
  const random = seeded(7);
  const span = stationCount * STATION_GAP + 500;

  const dust = [];
  for (let i = 0; i < 1100; i++) {
    dust.push((random() - 0.5) * 340, (random() - 0.5) * 200, 140 - random() * span);
  }
  const field = motes(dust, palette.ink, 1.1, palette.lightRoom ? 0.22 : 0.3);
  scene.add(field);

  // Log rows. Each is three or four bars of unequal length, the shape a line of a log file
  // makes when you stop being able to read it.
  const rowPoints = [];
  const rows = [];
  for (let i = 0; i < 40; i++) {
    const side = random() < 0.5 ? -1 : 1;
    const ox = side * (34 + random() * 150);
    const oy = (random() - 0.5) * 170;
    const oz = -(0.2 + random() * (stationCount - 0.6)) * STATION_GAP;
    const lines = 3 + Math.floor(random() * 2);
    for (let l = 0; l < lines; l++) {
      const length = 5 + random() * 13;
      const y = oy + l * 2.4;
      rowPoints.push(ox, y, oz, ox + length, y, oz);
    }
    rows.push({ x: ox, y: oy, z: oz });
  }
  const logs = new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(rowPoints, 3)),
    new THREE.LineBasicMaterial({ color: palette.accents[1], transparent: true, opacity: 0.3 })
  );
  scene.add(logs);

  // Packet ticks: short segments lying along the direction of travel, so they streak past.
  const tickPoints = [];
  for (let i = 0; i < 150; i++) {
    const side = random() < 0.5 ? -1 : 1;
    const x = side * (26 + random() * 170);
    const y = (random() - 0.5) * 190;
    const z = 120 - random() * span;
    const length = 3 + random() * 9;
    tickPoints.push(x, y, z, x, y, z + length);
  }
  const ticks = new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(tickPoints, 3)),
    new THREE.LineBasicMaterial({ color: palette.accents[2], transparent: true, opacity: 0.34 })
  );
  scene.add(ticks);

  return { field, logs, ticks };
}

export function mountFilm({ canvas, buildStations }) {
  const body = document.body;
  const acts = Array.from(document.querySelectorAll("main > .act"));
  if (acts.length === 0) return null;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Ask for the context here rather than letting the renderer ask. Three logs an error to the
  // console before it throws, and a reader whose browser has no WebGL has done nothing wrong:
  // they get the typographic chapter underneath, quietly, with a clean console.
  const context = canvas.getContext("webgl2", { antialias: true, powerPreference: "high-performance" });
  if (!context) return null;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true, powerPreference: "high-performance" });
  } catch (err) {
    // No context, no scene, and no apology: the page underneath is already the page.
    return null;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(BASE_FOV, 1, 0.1, 1800);

  let palette = readPalette(body, acts.length);
  let stations = [];
  let ambience = null;

  // Sets sit off to one side so the copy has the other half of the frame. On a phone the copy
  // fills the width, so they move to the centre and drop below it instead.
  // Where each set sits in the frame. The copy column runs down the left of a desktop frame
  // and most of its height, so a set belongs in the right third and slightly above the middle,
  // which is also where the eye goes after it finishes a heading.
  const DESKTOP_OFFSET = [38, 34, 34, 34];
  const DESKTOP_LIFT = [16, 10, 6, 10];
  // On a phone the sets drop below the reader's line of sight rather than sitting behind the
  // heading they belong to.
  const NARROW_LIFT = -26;
  let offsets = DESKTOP_OFFSET.slice();
  let lifts = DESKTOP_LIFT.slice();

  function buildWorld() {
    stations = buildStations(palette, THREE);
    stations.forEach((station, i) => {
      station.group.position.set(offsets[i] || 0, lifts[i] || 0, -i * STATION_GAP);
      scene.add(station.group);
    });
    ambience = buildTrackAmbience(scene, palette, stations.length);
    renderer.setClearColor(palette.rooms[0], 1);
    scene.fog = new THREE.FogExp2(palette.rooms[0].clone(), 0.0042);
  }

  function teardownWorld() {
    for (const station of stations) {
      scene.remove(station.group);
      disposeGroup(station.group);
    }
    if (ambience) {
      for (const part of [ambience.field, ambience.logs, ambience.ticks]) {
        scene.remove(part);
        disposeGroup(part);
      }
    }
    stations = [];
    ambience = null;
  }

  buildWorld();

  // ——— sizing ———
  let width = 0;
  let height = 0;
  let chapterBottom = 0;
  let narrow = false;
  let aspectPullback = 0;

  function measure() {
    width = window.innerWidth;
    height = window.innerHeight;
    narrow = width <= 820;
    // A tall narrow frame crops a wide set, so the camera stands further back on a phone.
    aspectPullback = Math.max(0, 1 - width / height) * 74;
    renderer.setPixelRatio(Math.min(narrow ? 1.4 : 1.75, window.devicePixelRatio || 1));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    offsets = DESKTOP_OFFSET.map((x) => (narrow ? 0 : x));
    lifts = DESKTOP_LIFT.map((y) => (narrow ? NARROW_LIFT : y));
    stations.forEach((station, i) => {
      station.group.position.setX(offsets[i] || 0);
      station.group.position.setY(lifts[i] || 0);
    });
    const tops = acts.map((act) => Math.round(act.getBoundingClientRect().top + window.scrollY));
    // The chapter ends with its last act, not with the element that contains it. The comment
    // thread and the closing links live inside main too, so measuring from main's bottom left
    // the scene still painting behind a comment form: a Kibana screen visible through a
    // "Name or handle" field.
    const lastAct = acts[acts.length - 1].getBoundingClientRect();
    const chapterEnd = Math.round(lastAct.bottom + window.scrollY);
    for (let i = 0; i < acts.length; i++) {
      acts[i].dataset.stationTop = String(tops[i]);
      // An act's station owns the scroll from its own top to the next act's top. Measuring it
      // from the act's own height instead leaves the camera parked between stations, because
      // the acts overlap each other by more than half a screen so that one dissolves into the
      // next. Two of those dead zones were most of the reason the film felt rushed: the travel
      // was happening in a third of the scroll and the rest was a still.
      const end = i + 1 < acts.length ? tops[i + 1] : Math.max(tops[i] + height, chapterEnd - height);
      acts[i].dataset.stationSpan = String(Math.max(1, end - tops[i]));
    }
    chapterBottom = chapterEnd;
  }
  measure();

  let lastWidth = width;
  let lastHeight = height;
  window.addEventListener("resize", () => {
    // A phone's URL bar collapsing fires resize with a small height delta. Re-measuring on
    // that makes the whole film jump while the reader is simply scrolling.
    if (window.innerWidth === lastWidth && Math.abs(window.innerHeight - lastHeight) < 140) return;
    lastWidth = window.innerWidth;
    lastHeight = window.innerHeight;
    measure();
  }, { passive: true });

  // ——— pointer ———
  let pointerX = 0;
  let pointerY = 0;
  let smoothPointerX = 0;
  let smoothPointerY = 0;
  window.addEventListener("pointermove", (event) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    pointerX = (event.clientX / width) * 2 - 1;
    pointerY = (event.clientY / height) * 2 - 1;
  }, { passive: true });

  // ——— theme ———
  // Rebuilding the sets is heavier than re-tinting them, and it is the only version that
  // cannot leave one forgotten material on last month's palette. A theme change is a click,
  // not a frame.
  const themeWatcher = new MutationObserver(() => {
    const next = readPalette(body, acts.length);
    if (next.accents[0].getHex() === palette.accents[0].getHex() && next.deep.getHex() === palette.deep.getHex()) return;
    palette = next;
    teardownWorld();
    buildWorld();
    measure();
  });
  themeWatcher.observe(body, { attributes: true, attributeFilter: ["data-theme", "class"] });

  // ——— the loop ———
  const roomColour = new THREE.Color();
  const nameplateProbe = new THREE.Vector3();
  const nameplates = [];
  // Where the camera is on the track, published for the frame audit. A set leaving the frame
  // during a flight is the flight; only a set being cut while the camera is parked in front of
  // it is a fault, and the two cannot be told apart from outside.
  const state = { index: 0, travel: 0, progress: 0 };
  let smoothScroll = window.scrollY;
  // Autoplay: the film opens by settling into the first set rather than starting parked in it.
  // Owner decision, 2026-09-11. It runs once, and reduced motion skips it entirely.
  let intro = reduced ? 0 : 1;
  const start = performance.now();
  let running = true;
  let painted = false;

  function stationProgress(index) {
    const act = acts[index];
    const top = Number(act.dataset.stationTop) || 0;
    const span = Math.max(1, Number(act.dataset.stationSpan) || height);
    return clamp01((smoothScroll - top) / span);
  }

  function frame(now) {
    if (!running) return;
    window.requestAnimationFrame(frame);
    if (document.hidden) return;

    const time = reduced ? 0 : (now - start) / 1000;
    const y = window.scrollY;
    smoothScroll = Math.abs(y - smoothScroll) < 0.1 || reduced ? y : lerp(smoothScroll, y, SCROLL_DAMPING);
    intro = intro < 0.001 ? 0 : intro * 0.94;

    let index = 0;
    for (let i = 0; i < acts.length; i++) {
      if (smoothScroll >= (Number(acts[i].dataset.stationTop) || 0) - 1) index = i;
    }
    const last = acts.length - 1;
    const progress = stationProgress(index);

    // Hold on the set, then fly. Easing only the travel half means the camera leaves and
    // arrives gently but never creeps while the reader is stationary and reading.
    const held = clamp01(progress / HOLD);
    const travel = index >= last ? 0 : ease(clamp01((progress - HOLD) / (1 - HOLD)));
    const along = index + travel;

    state.index = index;
    state.travel = travel;
    state.progress = progress;

    const here = stations[index].mod(reduced ? 1 : held, time);
    const next = stations[Math.min(index + 1, last)].mod(0, time);
    const dx = lerp(here.dx, next.dx, travel);
    const dy = lerp(here.dy, next.dy, travel);
    const dz = lerp(here.dz, next.dz, travel);
    const df = lerp(here.df, next.df, travel);

    smoothPointerX = lerp(smoothPointerX, pointerX, POINTER_DAMPING);
    smoothPointerY = lerp(smoothPointerY, pointerY, POINTER_DAMPING);

    camera.position.set(
      dx + smoothPointerX * 2.6,
      dy - smoothPointerY * 1.8,
      -along * STATION_GAP + CAM_BACK + dz + aspectPullback + intro * 150
    );

    // The look target leads the camera down the track and answers the pointer at more than
    // twice the camera's own swing, which is what makes a still frame feel hand-held.
    const kick = Math.sin(travel * Math.PI);
    // How much of the set's sideways offset the camera follows. Below 1 the camera stays
    // nearer the middle of the track and the set sits out to one side of the frame, which is
    // the whole point: the left two thirds belong to the copy. Raising this walks the camera
    // across until the set is centred and the words are on top of it.
    const aimX = lerp(offsets[index] || 0, offsets[Math.min(index + 1, last)] || 0, travel) * 0.18;
    camera.lookAt(
      aimX + dx * 0.4 + smoothPointerX * 4,
      dy * 0.5 - smoothPointerY * 2.6,
      camera.position.z - 150
    );
    camera.rotateZ(Math.sin(along * 2.1) * 0.01 + kick * 0.03);
    camera.fov = BASE_FOV + df + kick * 10;
    camera.updateProjectionMatrix();

    // The room crossfades with the camera, so the change of air happens during the flight
    // rather than snapping at the act boundary.
    roomColour.copy(palette.rooms[index]).lerp(palette.rooms[Math.min(index + 1, last)], travel);
    renderer.setClearColor(roomColour, 1);
    if (scene.fog) scene.fog.color.copy(roomColour);

    if (ambience && !reduced) {
      // The log rows drift up the way a tail scrolls; the packet ticks pulse rather than move,
      // because anything travelling at the camera's own speed looks nailed to the lens.
      ambience.logs.position.y = (time * 1.6) % 12;
      ambience.ticks.material.opacity = 0.26 + Math.sin(time * 2.4) * 0.1;
    }

    // Only the sets within reach of the camera run or draw. Everything else is one visible
    // flag away and costs nothing, which is most of the draw-call budget.
    for (let i = 0; i < stations.length; i++) {
      const near = Math.abs(i - along) < 1.6;
      stations[i].group.visible = near;
      if (near) stations[i].update(time, reduced ? 1 : stationProgress(i), camera);
    }

    keepNameplatesLegible(stations, camera, nameplateProbe, nameplates, narrow, width, height, now);

    renderer.render(scene, camera);

    // The sets end with the chapter. Past the last act the page is a comment form and a
    // footer, and a 3D scene behind a text input is not atmosphere.
    const past = clamp01((smoothScroll + height - chapterBottom) / (height * 0.7));
    const base = narrow ? 0.92 : 1;
    canvas.style.opacity = ((1 - past) * base).toFixed(3);

    if (!painted) {
      painted = true;
      body.classList.add("scene-live");
    }
  }
  window.requestAnimationFrame(frame);

  // Audio placeholder. A track is chosen per page once the sets are built, owner decision
  // 2026-09-11, so nothing is loaded and nothing is wired: this is where it will attach.
  return {
    // Handed out so a page can expose the scene graph for measurement. Nothing on the page
    // uses these; .claude-tools/audit-scene-frame.mjs projects labels and nodes into screen
    // space with them, which is the only way to check that a nameplate is on screen and not
    // on top of another nameplate. Judging that from a screenshot is guesswork.
    scene,
    camera,
    get stations() { return stations; },
    state,
    stop() {
      running = false;
      themeWatcher.disconnect();
      teardownWorld();
      renderer.dispose();
      body.classList.remove("scene-live");
    }
  };
}
