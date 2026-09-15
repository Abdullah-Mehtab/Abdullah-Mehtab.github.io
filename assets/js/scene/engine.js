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

// How far apart the sets sit along the track.
//
// At 420 the camera came out the far side of each set with the next one still 180 to 300 units
// ahead, and a set that far off carries under 2% of the pixels: the last fifth to third of
// every act was an empty room. The plan promised the opposite, that the next set is visible in
// the distance before arrival, and the distance is why it was not.
//
// The arithmetic, since it is not obvious: the camera leaves set i at its far face and the next
// near face is STATION_GAP + dz0(i) - dz0(i+1) - depth(i) further on. With the four sets here
// that is the gap minus 120, 238 and 172.
const STATION_GAP = 340;
const CAM_BACK = 62;
// How far in front of the camera the nearest face of a parked set sits, in world units.
//
// This number is the whole difference between reading beside a subject and reading beside a
// smudge. Every set was authored with its own absolute parking distance in its mod's dz, and
// those distances put the near face 128, 148, 197 and 167 units away at each act's opening
// frame, where the sets carried between 0.9% and 7.3% of the pixels. The owner described all
// three of the far ones separately: act two's servers "appear as if they're hiding BACK", act
// three "starts off TOO far away", act four's monitors "BARELY visible".
//
// Rather than retune four dz values against a constant none of them can see, the engine docks
// each set: it measures where the camera will actually rest and slides the set along the track
// until this gap is true. A new chapter's set file therefore never has to know CAM_BACK.
const REST_GAP = 78;
// Less of each act parked, more of it travelling. With the act's scroll doubled, holding for
// 55% of it would mean a very long still frame followed by the same quick flight; at 0.46 the
// extra scroll goes into the move, which is where the reader wanted it.
//
// Raising it to 0.58 to match the pin release was tried, on the theory that the camera was
// crossing the copy while it was still being read. It made the same measurement worse, 2.69 to
// 3.49: what crosses the words is act three's own set growing as the camera closes on it, not
// the flight to the next one.
const HOLD = 0.46;
// A longer glide. At 0.1 the camera is within a pixel of the scroll position in about twenty
// frames; at 0.065 it keeps moving for roughly half a second after the wheel stops, which is
// the difference between following a scroll and flowing with it.
const SCROLL_DAMPING = 0.065;
const POINTER_DAMPING = 0.04;
const BASE_FOV = 55;
const AIM_FOLLOW = 0.62;
// How far the camera swings away from the sets through the middle of a flight, in world units.
//
// Zero, on the owner's repeated verdict. This existed so the flight would clear the set it was
// leaving rather than passing through its geometry, after a review called two inside-the-rack
// frames a fault. The owner wants the opposite and has said so from the first pass: "we can
// literally go INTO the models and see the geometry", and later, of what the swing produces,
// "it just floats off to the right". Swinging sideways while closing on a set is exactly what
// makes it leave the frame edgeways instead of being arrived at, measured at 1.15, 4.90 and
// 2.15 of the way to the frame edge on the first three acts.
const FLIGHT_SWING = 0;
// How much of the closing set is still in front of the camera when the chapter ends, in world
// units. The last station has no next station to fly to, so its approach is worked out from its
// own depth instead of being a fraction picked by hand.
//
// A fixed 0.34 of the station gap was that fraction, and it carried the camera 18 units out the
// far side of the last set: at the final frame 18 of 21 parts were behind the camera and the
// chapter closed on an empty room. The owner's words were "as soon as it reaches the point
// where its nearing us, BOOM the act ends and we were NEVER able to zoom inside".
const LAST_ARRIVE = 43;
// The camera's fixed height below the frame breakpoint, chosen so every set sits in the band
// film.css reserves above the copy.
const NARROW_EYE = 34;

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
// Scratch for the plate displacement pass, which needs the camera's own axes to move a label
// straight up the screen. Module level because this runs every frame.
const plateRight = new THREE.Vector3();
const plateUp = new THREE.Vector3();
const plateAhead = new THREE.Vector3();
const plateScale = new THREE.Vector3();
const plateNudge = new THREE.Vector3();
// Where a plate may go when another one is already on its pixels, in order of preference, as
// multiples of its own height along the screen's up and of its own width along the screen's
// right.
const PLATE_SLOTS = [["y", 1], ["y", -1], ["y", 1.9], ["y", -1.9], ["x", 1], ["x", -1]];

// One plate width or height in world units, taken from the plate's own geometry rather than
// from how large it looks this frame. Deriving a step from the screen box made it depend on the
// measurement it was about to change, and the chosen position then flickered between frames.
function platePitch(node, axis) {
  const params = node.geometry && node.geometry.parameters;
  const own = Math.max(0.5, (params && params[axis]) || 1);
  node.getWorldScale(plateScale);
  return own * (axis === "width" ? plateScale.x : plateScale.y);
}
// The right edge of the reading column, in clip space. A nameplate is kept clear of it; the
// geometry itself is not, because passing behind the copy is what flying into a set looks like.
//
// Measured from the container rather than pinned. This was 0.1, a number that described where
// the words ended while the container was capped at 1180px and centred, and it stopped being
// true the moment the container was anchored to the page's left inset instead: on a 1920 screen
// the copy's right edge moved 310px left and every plate in the band it vacated was still being
// faded for standing where the copy was not. A constant in here describing a value the
// stylesheet computes is two authorities over one number, and this is what that costs.
const COPY_LANE_FALLBACK = 0.1;

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

function keepNameplatesLegible(stations, camera, probe, plates, narrow, width, height, now, laneEdge) {
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
      // Whatever this plate was moved by to get out of another plate's way last frame, taken
      // off before anything is measured.
      //
      // Put back by assignment, not by subtracting the shift again. Adding a float and taking it
      // off once a frame does not return the same number, and the creep shows: two captures of
      // the same frozen frame differed by 0.245% of their pixels, where the whole point of that
      // mode is that they do not differ at all.
      //
      // And if the plate is not where this pass left it, its set has assigned it a new place
      // since, which is now its home. Subtracting the shift there moves it backwards by the
      // shift instead, and the next frame it is somewhere else again: act two's threat labels
      // are positioned absolutely every frame from the time, and the result was a plate that
      // appeared and vanished on alternate frames with the camera standing still.
      const shift = node.userData.plateShift;
      const home = node.userData.plateHome;
      if (shift && home) {
        const asLeft = Math.abs(node.position.x - home.x - shift.x) < 1e-6
          && Math.abs(node.position.y - home.y - shift.y) < 1e-6
          && Math.abs(node.position.z - home.z - shift.z) < 1e-6;
        if (asLeft) node.position.copy(home);
      }
      if (shift) shift.set(0, 0, 0);
      node.userData.plateHome = (home || new THREE.Vector3()).copy(node.position);
      if (node.material.opacity <= 0.02) return;
      const box = screenBox(node, camera, probe);
      if (!box) return;
      // Drawn over the set rather than inside it. A caption half behind a monitor stand is a
      // fragment, and depth-sorting a label against the thing it names never ends well.
      if (node.material.depthTest) {
        node.material.depthTest = false;
        node.renderOrder = 12;
      }
      plates.push({ node, box, range: node.userData.range, primary: Boolean(node.userData.primary) });
    });
  }
  if (plates.length === 0) return;

  // Adds a world offset to a plate and remembers the total, so several passes can move the same
  // plate and the frame after this can put it back exactly where its set left it.
  const nudge = (node, by) => {
    if (!node.userData.plateShift) node.userData.plateShift = new THREE.Vector3();
    node.userData.plateShift.add(by);
    node.position.add(by);
  };

  camera.matrixWorld.extractBasis(plateRight, plateUp, plateAhead);

  // Clip space runs -1 to 1, so a plate is whole while its box stays inside that. The overflow
  // is measured against the plate's own size rather than the screen's: a narrow plate hanging
  // two per cent of the screen past the edge has lost a fifth of itself, and a wide one has
  // lost a letter.
  for (const plate of plates) {
    const own = Math.max(0.001, Math.max(plate.box.maxX - plate.box.minX, plate.box.maxY - plate.box.minY));
    const out = Math.max(0, -1 - plate.box.minX, plate.box.maxX - 1, -1 - plate.box.minY, plate.box.maxY - 1);
    if (out > 0) plate.node.material.opacity *= Math.max(0, 1 - (out / own) / NAMEPLATE_EDGE_FADE);

    // And the same treatment for the copy's side of the frame, on a wide screen where the copy
    // has a column of its own.
    //
    // Moving a plate out of the column rather than fading it was tried and reverted on
    // 2026-09-14: it rescued act three's "Elasticsearch" and pushed that plate onto "Filebeat",
    // which then lost the overlap pass and was drawn at no depth at all. A label's place in the
    // frame comes from where its node is, and a node on the copy's side of a flow is a layout
    // decision, not something to work around here.
    if (!narrow) {
      const intoLane = laneEdge - plate.box.minX;
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

  // Two plates on the same pixels: move the further one out of the way before giving up on it.
  //
  // This used to be elimination and nothing else, and it read as a bug rather than a policy.
  // Act three's "Agents" plate sat at opacity zero at five of six sampled depths because a
  // nearer plate covered the same pixels, so the label for the node that act begins at was
  // almost never drawn at all. External labelling practice says the same thing in cartography
  // and in 3D annotation: try the candidate positions around the anchor in order of preference
  // first, and drop a label only when none of them is free.
  //
  // The candidates are its own place, then one plate height above, then one below. Two are
  // enough for a set with this few labels, and a plate further from its node than that needs a
  // leader line to stay attached to what it names, which is a bigger change than this.
  //
  // Plates are placed nearest first, and a plate its set marks as primary is placed before any
  // of them: it is the one that names the set, so when something has to go it is never that.
  plates.sort((a, b) => (a.primary === b.primary ? a.range - b.range : (a.primary ? -1 : 1)));
  const placed = [];
  const covers = (box) => {
    const own = (box.maxX - box.minX) * (box.maxY - box.minY);
    for (const other of placed) {
      const w = Math.min(box.maxX, other.maxX) - Math.max(box.minX, other.minX);
      const h = Math.min(box.maxY, other.maxY) - Math.max(box.minY, other.minY);
      if (w <= 0 || h <= 0) continue;
      const smaller = Math.min(own, (other.maxX - other.minX) * (other.maxY - other.minY));
      if (smaller > 0 && w * h > smaller * NAMEPLATE_OVERLAP) return true;
    }
    return false;
  };
  for (const plate of plates) {
    if (plate.node.material.opacity <= 0.02) continue;
    if (!covers(plate.box)) {
      placed.push(plate.box);
      continue;
    }
    // One plate height, taken from the plate's own geometry rather than from how tall it looks
    // this frame. Deriving it from the screen box made the step depend on the measurement it
    // was about to change, and the chosen slot then flickered between frames: the same frozen
    // frame captured twice differed by 0.245% of its pixels, where it had been exactly equal.
    const lift = platePitch(plate.node, "height") * 1.15;
    const sideways = platePitch(plate.node, "width") * 0.62;
    let settled = false;
    // Up, down, further up, further down, then across. Vertical first because a label above or
    // below its node still reads as belonging to it, and a label beside it can look like it is
    // naming its neighbour.
    //
    // Whichever of them worked last frame is tried before any of the others. Without that the
    // pass has a two frame cycle in it: which slots are free depends on where the plates placed
    // before this one ended up, so a plate could find a slot on one frame and none on the next
    // with the camera not having moved at all. It showed up as act two's DDoS plate appearing
    // and disappearing on alternate frames, and as a frozen frame that was no longer identical
    // to itself, 0.119% of its pixels different between two captures.
    const slots = PLATE_SLOTS.slice();
    const lastSlot = plate.node.userData.plateSlot;
    if (lastSlot !== undefined && slots[lastSlot]) slots.unshift(slots.splice(lastSlot, 1)[0]);
    for (let slot = 0; slot < slots.length; slot++) {
      const [axis, step] = slots[slot];
      if (axis === "y") plateNudge.copy(plateUp).multiplyScalar(lift * step);
      else plateNudge.copy(plateRight).multiplyScalar(sideways * step);
      nudge(plate.node, plateNudge);
      const moved = screenBox(plate.node, camera, probe);
      // Inside the frame as well as clear of the other plates. The edge fade runs before this
      // pass, so a plate that was comfortably inside can be moved out by it and there is
      // nothing afterwards to notice: one depth showed a nameplate cut by the frame's own edge
      // the first time a set's geometry moved under this.
      const whole = moved
        && moved.minX >= -1 && moved.maxX <= 1
        && moved.minY >= -1 && moved.maxY <= 1;
      if (whole && !covers(moved)) {
        plate.box = moved;
        placed.push(moved);
        // Remembered against the unreordered list, so it still means the same slot next frame.
        plate.node.userData.plateSlot = slots === undefined ? slot : PLATE_SLOTS.findIndex(
          (candidate) => candidate[0] === axis && candidate[1] === step
        );
        settled = true;
        break;
      }
      plateNudge.negate();
      nudge(plate.node, plateNudge);
    }
    if (!settled) {
      plate.node.material.opacity = 0;
      plate.node.userData.plateSlot = undefined;
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
// How many times its resting length a packet tick is drawn at the fastest part of a flight.
const STREAK_STRETCH = 26;
// Below this the streaks are at rest and the buffer is left alone, so a reader parked in front
// of a set is not paying for a geometry upload every frame.
const STREAK_IDLE = 0.02;

// Rewrites the far end of every tick along z. Only the end moves, so a streak grows out behind
// its own starting point instead of sliding up the track.
function stretchStreaks(ticks, amount) {
  const factor = 1 + amount * STREAK_STRETCH;
  if (Math.abs(factor - (ticks.userData.drawnAt || 1)) < STREAK_IDLE) return;
  ticks.userData.drawnAt = factor;
  const position = ticks.geometry.getAttribute("position");
  const lengths = ticks.userData.lengths;
  const array = position.array;
  for (let i = 0; i < lengths.length; i++) {
    const end = i * 6 + 3;
    array[end + 2] = array[i * 6 + 2] + lengths[i] * factor;
  }
  position.needsUpdate = true;
}

function buildTrackAmbience(scene, palette, stationCount) {
  const random = seeded(7);
  const span = stationCount * STATION_GAP + 500;

  const dust = [];
  for (let i = 0; i < 2600; i++) {
    dust.push((random() - 0.5) * 340, (random() - 0.5) * 200, 140 - random() * span);
  }
  const field = motes(dust, palette.ink, 1.1, palette.lightRoom ? 0.22 : 0.3);
  scene.add(field);

  // Log rows. Each is three or four bars of unequal length, the shape a line of a log file
  // makes when you stop being able to read it.
  const rowPoints = [];
  const rows = [];
  for (let i = 0; i < 90; i++) {
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
  //
  // They are also the only thing between two sets. The sets are 78 to 264 units deep and sit a
  // station apart, so the camera leaves one and is in open track for a fifth to a third of
  // every act, where the frame carried under 2% of its pixels. Fog and a shorter station gap
  // each recovered about a point of that and neither filled it, because at 150 units a set
  // drawn in thin lines is simply small.
  //
  // So the track answers the camera instead: each tick stretches along the direction of travel
  // and brightens in proportion to how fast the camera is moving, which is the one moment the
  // frame has nothing else in it. Built from the ticks rather than as a new effect because
  // they already lie along z and already sit exactly where the void is.
  const tickPoints = [];
  const tickLengths = [];
  for (let i = 0; i < 900; i++) {
    // Clear of the reading column, on the set's side of the frame.
    //
    // Streaks radiate from the point the camera is travelling toward, so a field centred on the
    // track throws them straight across the copy: spread evenly they were the largest thing the
    // scene put inside the words, at four times the edge budget, and pulling them toward the
    // track made that worse rather than better because the track is where the vanishing point
    // is. They start where the copy ends instead.
    const x = 44 + random() * 190;
    const y = (random() - 0.5) * 190;
    const z = 120 - random() * span;
    const length = 3 + random() * 9;
    tickLengths.push(length);
    tickPoints.push(x, y, z, x, y, z + length);
  }
  const ticks = new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(tickPoints, 3)),
    new THREE.LineBasicMaterial({ color: palette.accents[2], transparent: true, opacity: 0.34 })
  );
  ticks.userData.lengths = tickLengths;
  // Nothing here moves between frames except along z, and the far ends of the streaks run well
  // past the box the starting points describe. Culling against the resting box would drop the
  // whole field the moment it stretched.
  ticks.frustumCulled = false;
  scene.add(ticks);

  return { field, logs, ticks };
}

export function mountFilm({ canvas, buildStations }) {
  const body = document.body;
  const acts = Array.from(document.querySelectorAll("main > .act"));
  if (acts.length === 0) return null;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // ?still holds the clock at zero and takes the camera off its damping, so the frame at a
  // given scroll position is the same frame every time.
  //
  // It exists because every screenshot taken of this page was a race: the fans turn, the beads
  // travel, the streams cross the room, and the camera is still arriving for about 45 frames
  // after a jump. Two captures at the same scroll position differed in a tenth of their pixels,
  // which makes a pixel comparison between two builds meaningless and makes every tool here
  // wait out an animation it cannot see the end of.
  //
  // Not the same as reduced motion, which also pins every set to its finished state. A still
  // frame has to be the frame at this depth, not the last frame of the act.
  const still = /[?&]still(?:=|&|$)/.test(window.location.search);
  const frozen = reduced || still;

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
  //
  // How far right the set's visible weight sits, in world units. dock() applies it to the
  // weight rather than to the origin the set was built around, so the number means the same
  // thing for every set: these four put each one between 0.4 and 0.5 of the way from the
  // middle of the frame to its right edge, which is the middle of the lane the copy leaves.
  //
  // They were 16, 18, 12 and 40, which is a different framing per act and none of them chosen.
  // Small numbers were deliberate at the time, because a set parked far to one side could only
  // slide past the edge of the frame. That was true while the offset was applied to an origin
  // and the camera aimed at a fixed point 150 units ahead; both of those are now measured.
  // Act four is the narrow one. It is the only act whose copy runs to seven of twelve columns,
  // so its subject has the least screen to sit in. It sat at 48 and came back to 34: a set that
  // is contained pays for every unit of sideways offset in standoff, because the standoff has
  // to hold the far edge of the subject inside a frustum the offset has pushed it towards. At
  // 48 the closing subject needed 85 units of clearance and filled a sixth of the frame.
  const DESKTOP_OFFSET = [42, 42, 34, 34];
  // How far above the track each set sits. Lifting act four clear of its copy was tried, at 24,
  // and it moved the set off the top of the frame instead: its camera ends the act four units
  // below the track, so every unit of lift is a unit the set climbs away from it.
  //
  // It sat at 10, which was right while the subject was a third of its present size and could
  // hang above the copy. Now that it is tall enough to reach down past the Outcome paragraph,
  // the lift is what keeps its lower corner off those lines, and containment is what stops it
  // going higher: at 10 the top of the dashboard is against the top of the frame.
  const DESKTOP_LIFT = [10, 6, 20, 6];
  // On a phone the sets drop below the reader's line of sight rather than sitting behind the
  // heading they belong to.
  const NARROW_LIFT = -26;
  let offsets = DESKTOP_OFFSET.slice();
  let lifts = DESKTOP_LIFT.slice();
  // Set by dock() from the closing set's own depth. See LAST_ARRIVE.
  let lastApproach = 0;
  // How much of the closing set's own dolly move the engine lets it keep. One when it fits
  // inside what containment allows, which is the ordinary case. See dock().
  let lastClose = 1;
  // Set by dock(): how far ahead each set's middle sits, so the look target can reach it, and
  // where the camera rests in front of it, so the lateral move knows where it started.
  const aimReach = [];
  const restZ = [];

  // Slides a set along the track until its nearest face sits REST_GAP in front of where the
  // camera actually parks in front of it.
  //
  // The camera's resting z is the station's own z, plus CAM_BACK, plus whatever the set's mod
  // asks for at the opening of its act. Only the set knows the second, only the engine knows
  // the first two, and before this nothing put them together: the result was four different
  // reading distances, none of them chosen.
  //
  // Ambient matter is excluded. Drift and dust extend a long way past the subject in every
  // direction, and docking to the nearest speck would park the camera in the haze.
  // Written to be safe to run again: it puts the set back on the track before measuring, so a
  // resize or a theme change cannot dock a set that is already docked and push it twice.
  // True when this node, or anything it hangs from inside the set, is drift, dust or a label.
  // Marking sits on whichever object the set happened to add, so a group can be ambient while
  // the meshes inside it carry nothing, and checking only the node lets a drift flock 70 units
  // behind the subject decide where the subject is.
  function isAtmosphere(node, root) {
    for (let n = node; n && n !== root.parent; n = n.parent) {
      if (n.userData && (n.userData.ambient || n.userData.caption)) return true;
    }
    return false;
  }

  // Where a set's actual subject is: the z range of it, nearest face first, and the x its
  // visible weight sits at. Weighted by the size of each part, because a set is not centred on
  // the middle of the box around it. Act four's two screens sit 16 units to the right of the
  // origin its author placed, so its offset of 40 put its subject at 56.
  function substance(group) {
    let near = -Infinity;
    let far = Infinity;
    let left = Infinity;
    let right = -Infinity;
    let bottom = Infinity;
    let top = -Infinity;
    let weightX = 0;
    let weight = 0;
    group.traverse((node) => {
      if (!node.geometry || isAtmosphere(node, group)) return;
      if (!node.geometry.boundingBox) node.geometry.computeBoundingBox();
      const box = node.geometry.boundingBox.clone().applyMatrix4(node.matrixWorld);
      near = Math.max(near, box.max.z);
      far = Math.min(far, box.min.z);
      left = Math.min(left, box.min.x);
      right = Math.max(right, box.max.x);
      bottom = Math.min(bottom, box.min.y);
      top = Math.max(top, box.max.y);
      const size = (box.max.x - box.min.x) * (box.max.y - box.min.y) + 1;
      weightX += ((box.min.x + box.max.x) / 2) * size;
      weight += size;
    });
    if (near === -Infinity) return null;
    return { near, far, left, right, bottom, top, massX: weight > 0 ? weightX / weight : 0 };
  }

  // The nearest the camera's resting place may sit to a set's near face and still have all of
  // the set inside the frame.
  //
  // A set that declares itself contained is one the reader is meant to read, so the engine has
  // to honour that rather than leaving it to a test to notice afterwards. Act four's two
  // screens are 45 units across with their centre 45 units off the camera's axis, which needs
  // between 82 and 102 units of standoff; the camera was closing to 24 and losing the dashboard
  // off the top and the right of the frame.
  //
  // Answered for the near face, not for the middle of the set. A set is a box with depth, and
  // its widest angle is always its near corners: measuring the extents at the middle and then
  // parking the camera half a depth nearer says a 35 unit deep subject fits when its near face
  // is a fifth outside the frame on both sides.
  //
  // Measured from the subject's own extents against the frustum the camera will actually have
  // at the end of the act, including whatever field of view the set's own move asks for.
  //
  // The frustum is symmetric about the direction the camera is pointing, not about the camera's
  // own x, and the camera turns toward the set by aimFollow. Measuring the set's displacement
  // from the camera's position instead of from that axis is the same class of mistake as a
  // constant in here describing a value the stylesheet computes: two parts of the engine
  // disagreeing about one number. It cost the closing act most of its size. Its subject sits
  // 47.5 units off the camera's x, which asked for 85 units of standoff, while the camera was
  // already turned far enough to be looking at a point 32 of those 47.5 units across.
  //
  // At distance d the axis has moved sideways by slope * d, and the frustum has opened to
  // half * d, so the two sides give d >= (offset + extent) / (half +/- slope). With no turn at
  // all the slopes are zero and this is the distance the old form returned.
  function keepBack(station, body, index) {
    const end = station.mod(1, 0);
    const fov = (BASE_FOV + end.df) * Math.PI / 180;
    const halfV = Math.tan(fov / 2);
    const halfH = halfV * Math.max(1, camera.aspect || 1.6);
    const midX = (body.left + body.right) / 2;
    const midY = (body.bottom + body.top) / 2;
    const follow = station.aimFollow === undefined ? AIM_FOLLOW : station.aimFollow;
    // The same target the frame loop aims at, and the same distance ahead it puts it. Nothing
    // flies through the closing set, so its lateral carry is zero here.
    const aimDepth = Math.max(70, REST_GAP + (body.near - body.far) / 2);
    const slopeX = ((offsets[index] || 0) * follow - end.dx * 0.6) / aimDepth;
    const slopeY = (-end.dy * 0.5) / aimDepth;
    const reach = (offset, extent, half, slope) => {
      const opening = Math.max(0.05, half - Math.abs(slope));
      const away = (Math.abs(offset) + extent) / (half + Math.abs(slope));
      const toward = (extent - Math.abs(offset)) / opening;
      return Math.max(away, toward, 0);
    };
    const needH = reach(midX - end.dx, (body.right - body.left) / 2, halfH, slopeX);
    const needV = reach(midY - end.dy, (body.top - body.bottom) / 2, halfV, slopeY);
    // A tenth of margin. Stopping exactly at the distance where the set fits leaves no room for
    // the pointer's own sway, which moves the camera 2.6 units sideways and 1.8 vertically, and
    // leaves the reading lane exactly as wide as the set rather than wide enough to place it in.
    return Math.max(needH, needV) * 1.1;
  }

  // Slides a set along the track until its nearest face sits REST_GAP in front of where the
  // camera actually parks in front of it.
  //
  // The camera's resting z is the station's own z, plus CAM_BACK, plus whatever the set's mod
  // asks for at the opening of its act. Only the set knows the second, only the engine knows
  // the first two, and before this nothing put them together: the result was four different
  // reading distances, none of them chosen.
  //
  // Written to be safe to run again: it puts the set back on the track before measuring, so a
  // resize or a theme change cannot dock a set that is already docked and push it twice.
  function dock(station, index) {
    station.group.position.z = -index * STATION_GAP;
    station.group.updateMatrixWorld(true);
    const body = substance(station.group);
    if (!body) return;
    const rest = -index * STATION_GAP + CAM_BACK + station.mod(0, 0).dz;
    station.group.position.z += rest - REST_GAP - body.near;
    // The offset is a statement about where the reader sees the set, so it is applied to what
    // the reader sees rather than to the origin the set was built around.
    const slide = (offsets[index] || 0) - body.massX;
    station.group.position.x += slide;
    // body was measured before that slide, and the standoff below is dominated by how far the
    // subject sits off the camera's axis, so it has to be asked about where the set ended up.
    body.left += slide;
    body.right += slide;
    body.massX += slide;

    // The closing set also decides how far the camera may travel toward it. Everything needed
    // is here and nowhere else: how deep its subject is, and how much of the closing its own
    // move already does. Adding those separately is what put the camera out the far side.
    if (index === stations.length - 1) {
      const depth = body.near - body.far;
      const byItsOwnMove = station.mod(0, 0).dz - station.mod(1, 0).dz;
      let closing = REST_GAP + depth - LAST_ARRIVE - byItsOwnMove;
      // A contained set is never approached past the distance at which it still fits the frame.
      // The distance is to the middle of the subject, so the near face is half its depth nearer.
      lastClose = 1;
      if (station.contained) {
        // Already a near-face distance, which is what REST_GAP is measured in too.
        const floor = keepBack(station, body, index);
        // Everything the camera is allowed to close, counting both ways it can close.
        const allowed = REST_GAP - floor;
        closing = Math.min(closing, allowed - byItsOwnMove);
        // A set's own move can spend the whole allowance by itself, and holding back only the
        // track travel then stops nothing: the camera closed past the floor on the set's own
        // dolly and the subject was cut by the top and the bottom of the frame while the engine
        // still called it contained. Scaling the move down lands it exactly on the floor, which
        // keeps the arrival moving rather than stalling it partway.
        if (byItsOwnMove > Math.max(0, allowed)) {
          lastClose = Math.max(0, allowed) / byItsOwnMove;
          closing = 0;
        }
      }
      lastApproach = clamp01(closing / STATION_GAP);
    }
    // How far in front of the resting camera the middle of this set sits. The look target uses
    // it so that aiming at a set means aiming at where the set actually is, and the lateral
    // move uses it to know how far into the set the camera has come.
    aimReach[index] = REST_GAP + (body.near - body.far) / 2;
    restZ[index] = rest;
  }

  function buildWorld() {
    stations = buildStations(palette, THREE);
    stations.forEach((station, i) => {
      station.group.position.set(offsets[i] || 0, lifts[i] || 0, -i * STATION_GAP);
      // Each set chooses its own size for a desktop frame. Remembering it here is what lets a
      // phone stand them all down by a fixed fraction without the reduction compounding every
      // time the window is measured again.
      station.group.userData.baseScale = station.group.scale.x || 1;
      scene.add(station.group);
    });
    ambience = buildTrackAmbience(scene, palette, stations.length);
    renderer.setClearColor(palette.rooms[0], 1);
    // The fog is what makes an act a place, and it is also what hid the next set during a
    // flight. At 0.0042 a set 220 units ahead was 57% fogged out; at 0.003 it is 34%, measured
    // to roughly double what the transit frames carry. Lower still flattens the depth and
    // costs the room its colour, for gains that had already stopped arriving by 0.0024.
    scene.fog = new THREE.FogExp2(palette.rooms[0].clone(), 0.003);
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
  // See COPY_LANE_FALLBACK. Read on resize rather than per frame: the container only moves when
  // the window does, and reading a rect in the frame loop after the renderer has written to the
  // canvas forces a layout recalculation every frame.
  let copyLaneEdge = COPY_LANE_FALLBACK;

  function measure() {
    // Before the writes below, not after. A custom-property or canvas-size write dirties style,
    // and the next getBoundingClientRect then pays for a full recalculation.
    //
    // The container holds twelve columns and the copy takes six of them, which is half the
    // container less half a gap. Half is close enough and errs narrow, and erring narrow lets a
    // plate sit nearer the words rather than fading one that is nowhere near them.
    const column = document.querySelector("main .act .section-inner");
    if (column) {
      const box = column.getBoundingClientRect();
      copyLaneEdge = box.width > 0 ? ((box.left + box.width / 2) / window.innerWidth) * 2 - 1 : COPY_LANE_FALLBACK;
    }

    width = window.innerWidth;
    height = window.innerHeight;
    narrow = width <= 820;
    // A tall narrow frame crops a wide set, so the camera stands further back on a phone.
    aspectPullback = Math.max(0, 1 - width / height) * 92;
    renderer.setPixelRatio(Math.min(narrow ? 1.4 : 1.75, window.devicePixelRatio || 1));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    offsets = DESKTOP_OFFSET.map((x) => (narrow ? 0 : x));
    lifts = DESKTOP_LIFT.map((y) => (narrow ? NARROW_LIFT : y));
    stations.forEach((station, i) => {
      station.group.position.setX(offsets[i] || 0);
      station.group.position.setY(lifts[i] || 0);
      const base = station.group.userData.baseScale || 1;
      station.group.scale.setScalar(narrow ? base * 0.72 : base);
      // After the scale, because a set standing down to 0.72 has a nearer face than the one
      // that was measured at full size.
      dock(station, i);
    });

    // The log rows and packet ticks live on the track rather than inside a station, so they
    // never moved when the sets were lifted into the phone's band: they were the edge the
    // audit kept finding inside the copy at 390px, not the sets. Dust stays, because soft
    // points put no edge behind a word.
    if (ambience) {
      ambience.logs.visible = !narrow;
      ambience.ticks.visible = !narrow;
    }

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
  // The act's own colour, handed to the document so the page furniture is painted in it.
  //
  // The rooms have changed hue per act since the scene was built, and the rules, eyebrows,
  // numerals and the progress hairline stayed one blue in all four: --scene-accent is declared
  // once in film.css and the per-scene blocks only override tokens that feed elements
  // .scene-live hides. A reader saw the room change and the page not.
  //
  // Written here rather than given a second set of values in CSS. The hue comes from
  // ACT_HUE_SHIFT applied to the live theme, so a stylesheet cannot know it without being told,
  // and two authorities over one colour is how they drift apart. The stylesheet keeps its own
  // default for the case this code never runs: no WebGL, and the page is the page.
  const actColour = new THREE.Color();
  let writtenAccent = "";
  let arrival = 0;
  const nameplateProbe = new THREE.Vector3();
  const nameplates = [];
  // Where the camera is on the track, published for the frame audit. A set leaving the frame
  // during a flight is the flight; only a set being cut while the camera is parked in front of
  // it is a fault, and the two cannot be told apart from outside.
  const state = { index: 0, travel: 0, progress: 0 };
  let smoothScroll = window.scrollY;
  // Autoplay: the film opens by settling into the first set rather than starting parked in it.
  // Owner decision, 2026-09-11. It runs once, and reduced motion skips it entirely.
  let intro = frozen ? 0 : 1;
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

    const time = frozen ? 0 : (now - start) / 1000;
    const y = window.scrollY;
    smoothScroll = Math.abs(y - smoothScroll) < 0.1 || frozen ? y : lerp(smoothScroll, y, SCROLL_DAMPING);
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
    const flight = ease(clamp01((progress - HOLD) / (1 - HOLD)));

    // The last station has nowhere to fly to, and parking the camera there for the whole act
    // is what made the closing set a distant still: 33% of the frame at its biggest, and that
    // biggest arriving at the final sample of the act, so the reader never arrived at it
    // before the chapter ended. It gets a short approach of its own instead, which closes most
    // of the resting gap without carrying the camera out the far side of the set.
    const atLast = index >= last;
    // Driven by the whole act, not by the part of it after the hold. Every other act holds
    // still while it is read and then flies, because the flight is a journey to somewhere
    // else. The closing act's move is not a journey, it is the arrival, and its own set mod is
    // already fed the full progress for exactly that reason. Leaving the track on the flight
    // fraction meant the camera did not start closing until 46% of the act had gone by, so the
    // frame at 45% was the furthest of the four sampled: the set 24% narrower than at the
    // opening frame with a quarter of the screen empty beside it.
    const travel = atLast ? progress * lastApproach : flight;
    // There is no next station to blend toward at the end, and blending toward itself would
    // pull its own move back to its resting pose as the reader arrives.
    const blend = atLast ? 0 : travel;
    const along = index + travel;

    state.index = index;
    state.travel = travel;
    state.progress = progress;

    // The last station never travels, because there is nothing after it to travel to. Feeding
    // its move the full progress rather than the hold is what keeps it moving through its
    // second half instead of parking. Without this the closing act is a still frame for the
    // last 45% of its scroll, which is what "round 4 is STATIC" described.
    const heldHere = atLast ? (reduced ? 1 : progress) : (reduced ? 1 : held);
    const here = stations[index].mod(heldHere, time);
    const next = stations[Math.min(index + 1, last)].mod(0, time);
    const dx = lerp(here.dx, next.dx, blend);
    const dy = lerp(here.dy, next.dy, blend);
    // At the last station next is the same station's opening pose, so this is its own move
    // scaled by however much of it containment leaves, and an untouched lerp everywhere else.
    const dz = atLast ? lerp(next.dz, here.dz, lastClose) : lerp(here.dz, next.dz, blend);
    const df = lerp(here.df, next.df, blend);

    smoothPointerX = frozen ? pointerX : lerp(smoothPointerX, pointerX, POINTER_DAMPING);
    smoothPointerY = frozen ? pointerY : lerp(smoothPointerY, pointerY, POINTER_DAMPING);

    // The flight swings wide of the set it is leaving instead of going through it.
    //
    // A dolly track puts every station on one line, so travelling from one to the next means
    // passing through the geometry of the one behind. Two frames in a review were the inside
    // of a server rack and the inside of a circuit board for exactly that reason: not a
    // framing mistake at either station, but the straight line between them.
    //
    // Lifting the camera over each set fixed that and caused a worse fault: the sets sweep
    // down across the copy column as the camera climbs, and the edge a set put inside the
    // word "Detect" went to three times its budget. Swinging sideways, away from the side the
    // sets are on, clears the same geometry and moves everything further from the words
    // rather than across them.
    const arc = Math.sin(blend * Math.PI);
    const swing = arc * FLIGHT_SWING;
    // The z this frame, written once because the lateral move has to know it before the camera
    // is placed.
    const camZ = (z) => -along * STATION_GAP + CAM_BACK + z + aspectPullback + intro * 150;
    // On a phone the camera holds its height for the whole chapter. Each set's move descends
    // toward its subject, which is right on a wide screen and wrong on a narrow one: the copy
    // does not move out of the way there, so the set simply sinks into it. Holding the height
    // keeps every set in the band above the words while its move still carries the reader in.
    const eyeY = narrow ? NARROW_EYE : dy;

    // The camera moves sideways onto the set as it closes on it.
    //
    // A set has to be off to one side while the reader is reading, so the copy has the rest of
    // the frame, and it has to be dead ahead at the moment the camera goes through it, or the
    // camera goes past it instead. Those are different places, and a fixed offset can only be
    // one of them: pushing the sets out to where they belonged during the hold turned act one's
    // fly-through into a slide past the frame edge, measured at 0.97 of the way out while the
    // set was still growing.
    //
    // So the offset says where the set sits while it is being read beside, and this carries the
    // camera onto its axis as it arrives. At rest the camera is on the track and the set is in
    // the art lane; at the set's own middle the camera is on the set's axis and inside it.
    //
    // The closing set is the exception. Nothing flies through it: the chapter ends in front of
    // it, so the camera stays off its axis and it keeps the art lane beside the two columns of
    // copy this act puts there. Moving onto it put its own heading behind a lit screen.
    // The move rises from nothing at the resting frame to all of it at the set's own middle,
    // then returns to nothing by the time the camera reaches the next station. It has to close
    // by then: keyed on the current station alone it was still at full strength when the index
    // flipped and dropped to zero in one frame, which is a sideways jump of 68 world units and
    // measured as a 170 unit lurch at the act one boundary.
    //
    // Measured against the real distance between this resting place and the next one, not
    // against STATION_GAP. Each set declares its own standoff in its mod, so those two differ
    // by up to a hundred units: normalising by the gap left the move still at 55% of full
    // strength when the station index flipped, and the jump came back at the next boundary.
    const nextRest = index + 1 <= last ? restZ[index + 1] : (restZ[index] || 0) - STATION_GAP;
    const span = Math.max(1, (restZ[index] || 0) - nextRest);
    const peakAt = clamp01((aimReach[index] || 1) / span);
    const along01 = clamp01(((restZ[index] || 0) - camZ(dz)) / span);
    const closed = atLast ? 0 : ease(along01 < peakAt
      ? along01 / Math.max(0.001, peakAt)
      : (1 - along01) / Math.max(0.001, 1 - peakAt));
    const ontoSet = closed * ((offsets[index] || 0) - dx);

    camera.position.set(
      dx + ontoSet - swing + smoothPointerX * 2.6,
      eyeY - smoothPointerY * 1.8,
      camZ(dz)
    );

    // The look target leads the camera down the track and answers the pointer at more than
    // twice the camera's own swing, which is what makes a still frame feel hand-held.
    const kick = Math.sin(blend * Math.PI);
    // How much of the set's sideways offset the camera follows. Near 1 the camera looks
    // straight at the set and flies into it; near 0 it stays on the track and the set drifts
    // past the edge. It was 0.18, and "the model moves towards the right side when scrolling
    // in" is the exact description of what 0.18 does.
    //
    // A station may lower it for itself. One act here has a second column of copy beside the
    // set rather than above it, and following that set all the way puts a lit screen behind a
    // paragraph; the measurement is a sixteen per cent contrast drop on one line.
    const followHere = stations[index].aimFollow === undefined ? AIM_FOLLOW : stations[index].aimFollow;
    const followNext = stations[Math.min(index + 1, last)].aimFollow === undefined
      ? AIM_FOLLOW
      : stations[Math.min(index + 1, last)].aimFollow;
    const aimX = lerp((offsets[index] || 0) * followHere, (offsets[Math.min(index + 1, last)] || 0) * followNext, blend);
    // How far ahead the camera's look target sits. It has to follow the set, not stay at a
    // constant: aiming at a point 150 units ahead turns a 40 unit sideways offset into 15
    // degrees, which is most of the way to the frame edge once the camera has closed to 65
    // units. The closing set was measured 90% off screen for exactly that reason, while the
    // value meant to control it, aimFollow, was already at its maximum.
    const aimDepth = Math.max(70, aimReach[index] || 150);
    camera.lookAt(
      aimX + (dx + ontoSet) * 0.4 - swing + smoothPointerX * 4,
      eyeY * 0.5 - smoothPointerY * 2.6,
      camera.position.z - aimDepth
    );
    camera.rotateZ(Math.sin(along * 2.1) * 0.01 + kick * 0.03);
    camera.fov = BASE_FOV + df + kick * 10;
    camera.updateProjectionMatrix();

    // The room crossfades with the camera, so the change of air happens during the flight
    // rather than snapping at the act boundary.
    roomColour.copy(palette.rooms[index]).lerp(palette.rooms[Math.min(index + 1, last)], blend);
    renderer.setClearColor(roomColour, 1);
    if (scene.fog) scene.fog.color.copy(roomColour);

    // Only when it has actually moved. Writing a custom property on the body invalidates style
    // for the whole document, and doing that every frame cost 27ms a frame the last time
    // something here tried it.
    actColour.copy(palette.accents[index]).lerp(palette.accents[Math.min(index + 1, last)], blend);
    const accent = actColour.getHexString();
    if (accent !== writtenAccent) {
      writtenAccent = accent;
      body.style.setProperty("--scene-accent", "#" + accent);
    }

    if (ambience && !reduced) {
      // The log rows drift up the way a tail scrolls.
      ambience.logs.position.y = (time * 1.6) % 12;
      // The ticks stretch into streaks through the middle of a flight and settle back to short
      // marks at either end of it, so the empty track between two sets reads as speed rather
      // than as nothing. Driven by the eased flight rather than by a measured frame-to-frame
      // speed, which would make the effect depend on the frame rate.
      stretchStreaks(ambience.ticks, arc);
      // Bright enough to carry a transit frame, dim enough to read through. Act three's copy is
      // the widest on the page, four columns of it, and at 0.4 the lit streaks behind it took
      // one line to 3.56:1 against a 4.5:1 floor.
      ambience.ticks.material.opacity = 0.26 + Math.sin(time * 2.4) * 0.1 + arc * 0.22;
    }

    // Only the sets within reach of the camera run or draw. Everything else is one visible
    // flag away and costs nothing, which is most of the draw-call budget.
    for (let i = 0; i < stations.length; i++) {
      const near = Math.abs(i - along) < 1.6;
      stations[i].group.visible = near;
      if (near) stations[i].update(time, reduced ? 1 : stationProgress(i), camera);
    }

    keepNameplatesLegible(stations, camera, nameplateProbe, nameplates, narrow, width, height, now, copyLaneEdge);

    renderer.render(scene, camera);

    // The sets end with the chapter. Past the last act the page is a comment form and a
    // footer, and a 3D scene behind a text input is not atmosphere.
    // Measured from the last act's bottom edge rather than from where it enters the frame, so
    // the fade is complete exactly when that edge leaves the top of the screen and not a
    // screen and a half later. Fading over a longer distance but finishing late put the scene
    // behind the comment form; this fades over the same distance and finishes on time.
    const toEnd = chapterBottom - smoothScroll;
    const past = clamp01((height * 1.4 - toEnd) / (height * 1.4));
    // A phone scene at 0.72 was measured safe for the text (0.40 of a 1.6 edge budget) and
    // read as a watermark rather than an object. The budget had more than half of itself
    // spare, so the geometry takes some of it back.
    const base = narrow ? 0.95 : 1;
    // The opening fade in as well as the fade out, both written here. Doing the fade in with a
    // CSS transition on the same property meant every per-frame write chased a moving target,
    // and left the scene painting at 0.41 behind the comment form three screens past the end.
    arrival = frozen ? 1 : Math.min(1, arrival + 0.03);
    canvas.style.opacity = ((1 - past) * base * arrival).toFixed(3);

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
    // The hue each act paints its room in, for .claude-tools/audit-act-colour.mjs to compare
    // against what the page furniture is painted in.
    get actAccents() { return palette.accents.map((c) => c.getHexString()); },
    // Hold the frame where it is, and draw one when asked.
    //
    // For .claude-tools/audit-landing-weight.mjs, which hides part of a set and photographs what
    // is left to find out whether an act's subject or its scenery is the louder thing in the
    // frame. Each set's own update writes visibility onto its parts every frame, so with the
    // loop running anything a tool hides is drawn again before the shot is taken, and two acts
    // measured as having a subject that changes nothing at all.
    pause() { running = false; },
    render() { renderer.render(scene, camera); },
    stop() {
      running = false;
      themeWatcher.disconnect();
      teardownWorld();
      renderer.dispose();
      body.style.removeProperty("--scene-accent");
      body.classList.remove("scene-live");
    }
  };
}
