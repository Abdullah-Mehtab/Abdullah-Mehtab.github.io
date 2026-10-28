// ABOUTME: Act three's set for Linear Regression in Assembly: the eight training rows as points with no grid behind them, and the fit
// ABOUTME: played as the act's four steps: their averages, the table, the solve, and a solid line settling through them.
//
// The points are the card's run's eight training rows, x across and y up, and the two held back rows are drawn as rings: the 98 row
// waits at the top right for act four. The four steps follow the act's list. Averages: each point sends its value into the middle
// of the data. The table: each point's distance from that middle, x times y, drawn as the rectangle it is, which is what "how x and
// y move together" sums. The solve: with one input the table is one row, and solving it is one division. The line: the intercept
// from the slope, and the line drawn through the middle, with each point's miss drawn down to it.
//
// The numbers on the working slip are the program's own for that split: averages 77 and 4.625, the table 41.875 and 196, the slope
// 4.680597, the intercept 55.35224 (scratchpad `which-test.mjs` and the run in `card-run`, 2026-10-28).
import { THREE, LAYER, clamp01, drift, ease, glow, lerp, motes, nameplate, painted, seeded } from "../kit.js";
import { MONO, paperColours, sheet } from "./01-program.js";

const TRAIN = [[69, 2], [82, 5], [77, 5], [71, 3], [84, 7], [55, 1], [94, 8], [84, 6]];
const HELD = [[98, 9], [64, 2]];
const MEAN = { x: 4.625, y: 77 };
const SLOPE = 4.680597;
// Set units per unit of x and of y. No grid and no axes: the points are where the data puts them, and nothing else is drawn.
const SX = 7, SY = 1.1;
const at = (x, y) => new THREE.Vector3((x - MEAN.x) * SX, (y - MEAN.y) * SY, 0);
// The line's slope as drawn, and how far it runs either side of the middle, in x.
const DRAWN_SLOPE = Math.atan((SLOPE * SY) / SX);
const LINE_FROM = 0.4, LINE_TO = 9.6;

// The act holds on this set longer than the engine's usual share, so each of the four steps has room to be seen.
const HOLD = 0.6;
const STEPS = [[0.03, 0.15], [0.15, 0.27], [0.27, 0.41], [0.41, 0.56]];
const SLIP = { w: 54, h: 7.6, y: -34 };
const WORKING = [
  "Train Data: 8 rows",
  "Averages:  Y 77.0   X1 4.625",
  "The table:  [ 41.875   196 ]",
  "Slope:  196 / 41.875 = 4.680597",
  "b0 = 77 - 4.680597 * 4.625 = 55.35224"
];

function dot(colour, ring, fill) {
  return painted(128, 128, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.beginPath();
    g.arc(w / 2, h / 2, w / 2 - 8, 0, Math.PI * 2);
    if (fill) { g.fillStyle = fill; g.fill(); }
    g.strokeStyle = colour;
    g.lineWidth = ring;
    g.stroke();
  });
}

export function buildFitting(palette) {
  const group = new THREE.Group();
  const accent = palette.accents[2];
  const colours = paperColours(palette, accent);
  const random = seeded(31);
  const flat = (texture, size, opacity = 1) => new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity, depthWrite: false })
  );

  // ——— the points ———
  const pointTexture = dot(colours.label, 16, colours.paper);
  const points = TRAIN.map(([y, x]) => {
    const mesh = flat(pointTexture, 4.2);
    mesh.position.copy(at(x, y));
    group.add(mesh);
    return mesh;
  });
  const ringTexture = dot(colours.label, 10, null);
  const held = HELD.map(([y, x]) => {
    const mesh = flat(ringTexture, 4.6, 0.85);
    mesh.position.copy(at(x, y));
    group.add(mesh);
    return mesh;
  });

  // ——— the middle of the data, and each point's value travelling into it ———
  const middle = flat(painted(160, 160, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.strokeStyle = colours.label;
    g.lineWidth = 12;
    g.beginPath();
    g.arc(w / 2, h / 2, w / 2 - 14, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = colours.label;
    g.fillRect(w / 2 - 6, 20, 12, h - 40);
    g.fillRect(20, h / 2 - 6, w - 40, 12);
  }), 7);
  middle.position.set(0, 0, 0.4);
  group.add(middle);

  // Traffic, by the clock: a light leaves each point for the middle, over and over, once the averages step has begun.
  const beads = points.map((point, i) => {
    const bead = glow(accent, 3.2, 0);
    if (palette.lightRoom) bead.material.blending = THREE.NormalBlending;
    bead.userData.from = point.position.clone().setZ(1);
    bead.userData.phase = i / points.length;
    group.add(bead);
    return bead;
  });
  const centre = new THREE.Vector3(0, 0, 1);

  // ——— the table: each point's x distance times its y distance from the middle, as a rectangle ———
  const rectangles = TRAIN.map(([y, x]) => {
    const corner = at(x, y);
    const geometry = new THREE.PlaneGeometry(Math.max(0.01, Math.abs(corner.x)), Math.max(0.01, Math.abs(corner.y)));
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0, depthWrite: false }));
    mesh.position.set(corner.x / 2, corner.y / 2, -0.6);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0, depthWrite: false }));
    mesh.add(edge);
    group.add(mesh);
    return { mesh, edge };
  });

  // ——— the line: a flat bar turning about the middle until it settles at the slope ———
  const pivot = new THREE.Group();
  const lineFrom = (LINE_FROM - MEAN.x) * SX / Math.cos(DRAWN_SLOPE);
  const lineTo = (LINE_TO - MEAN.x) * SX / Math.cos(DRAWN_SLOPE);
  const barGeometry = new THREE.BoxGeometry(lineTo - lineFrom, 1.2, 0.4).translate((lineFrom + lineTo) / 2, 0, 0);
  const bar = new THREE.Mesh(barGeometry, new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0 }));
  bar.renderOrder = LAYER.path;
  pivot.add(bar);
  pivot.position.set(0, 0, 0.2);
  group.add(pivot);

  // Each point's miss, drawn straight down or up to the line once it has settled.
  const missPositions = new Float32Array(TRAIN.length * 6);
  TRAIN.forEach(([y, x], i) => {
    const point = at(x, y);
    const onLine = at(x, MEAN.y + SLOPE * (x - MEAN.x));
    missPositions.set([point.x, point.y, -0.2, onLine.x, onLine.y, -0.2], i * 6);
  });
  const misses = new THREE.LineSegments(
    new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(missPositions, 3)),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0, depthWrite: false })
  );
  group.add(misses);

  // ——— the working slip under the points, rewritten at each step ———
  const slipTexture = painted(1024, Math.round((1024 * SLIP.h) / SLIP.w), () => {});
  const paintSlip = (text) => {
    const g = slipTexture.image.getContext("2d");
    const { width: w, height: h } = slipTexture.image;
    g.fillStyle = colours.paper;
    g.fillRect(0, 0, w, h);
    g.fillStyle = colours.code;
    // As large as the slip allows: the longest step is set smaller until it fits with a margin.
    let size = 62;
    g.font = `400 ${size}px ${MONO}`;
    while (g.measureText(text).width > w - 80 && size > 20) g.font = `400 ${(size -= 2)}px ${MONO}`;
    g.textBaseline = "middle";
    g.textAlign = "center";
    g.fillText(text, w / 2, h / 2 + 3);
    slipTexture.needsUpdate = true;
  };
  const slip = sheet(slipTexture, SLIP.w, SLIP.h, accent, 0.8);
  slip.position.set(2, SLIP.y, 0);
  group.add(slip);

  // ——— the words ———
  const stepPlates = [
    nameplate("01 Averages", "the middle of the eight rows", accent, palette.deep, 44, true),
    nameplate("02 The table", "how x and y move together", accent, palette.deep, 44, true),
    nameplate("03 The solve", "one input, so one division", accent, palette.deep, 44, true),
    nameplate("04 The line", "through the middle of the data", accent, palette.deep, 44, true)
  ];
  for (const plate of stepPlates) {
    // Above the empty top left of the data: the points rise to the right.
    plate.position.set(-18, 24, 8);
    plate.userData.primary = true;
    group.add(plate);
  }
  const rowPlate = nameplate("The 98 row", "held back for the test", accent, palette.deep, 40, true);
  // Up and to the left of its ring: to the right it stood on the act rail at the frame's edge.
  rowPlate.position.copy(at(9, 98)).add(new THREE.Vector3(-12, 9, 8));
  group.add(rowPlate);

  // ——— air ———
  const dust = [];
  for (let i = 0; i < 360; i++) dust.push((random() - 0.5) * 220, -70 + random() * 150, (random() - 0.5) * 200);
  const air = motes(dust, accent, 1.2, palette.lightRoom ? 0.3 : 0.38);
  air.userData.ambient = true;
  group.add(air);
  // Loose points in the air, the act's own shape. Without them the right of the frame was empty while the camera flew in from act
  // two (22% of the screen against 4% at the left, framing check), because acts one and two each carry a flock there and this
  // act carried none.
  const loose = drift([new THREE.CircleGeometry(2, 20), new THREE.RingGeometry(1.4, 2.2, 20)], 16, accent, palette.lightRoom ? 0.2 : 0.26, 67);
  loose.object.userData.ambient = true;
  group.add(loose.object);
  const halo = glow(accent, 150, palette.lightRoom ? 0.08 : 0.16);
  halo.position.set(0, 0, -40);
  halo.userData.ambient = true;
  group.add(halo);

  group.rotation.y = -0.2;
  group.scale.setScalar(0.72);

  let written = -1;
  const step = (i, p) => clamp01((p - STEPS[i][0]) / (STEPS[i][1] - STEPS[i][0]));
  return {
    group,
    contained: true,
    aimFollow: 0.35,
    hold: HOLD,
    update(t, p) {
      group.rotation.y = -0.2 + Math.sin(t * 0.12) * 0.05;
      group.position.y = Math.sin(t * 0.45) * 0.6;
      air.rotation.y = t * 0.02;
      loose.update(t);
      const averages = step(0, p), table = step(1, p), solve = step(2, p), line = step(3, p);

      // 01: the middle appears, and the values flow into it on the clock from then on.
      middle.scale.setScalar(lerp(0.2, 1, ease(averages)));
      middle.material.opacity = ease(averages);
      beads.forEach((bead, i) => {
        const k = (t / 2.6 + bead.userData.phase) % 1;
        bead.position.lerpVectors(bead.userData.from, centre, ease(k));
        bead.material.opacity = averages > 0 ? Math.sin(Math.PI * k) * 0.9 * (1 - 0.5 * ease(line)) : 0;
        bead.visible = bead.material.opacity > 0.01;
      });

      // 02: each point's rectangle opens from the middle; 03 takes them away again as they are summed into one number.
      const open = ease(table) * (1 - ease(solve));
      rectangles.forEach(({ mesh, edge }, i) => {
        const k = ease(clamp01(table * 1.6 - i * 0.08)) * (1 - ease(solve));
        mesh.scale.setScalar(Math.max(0.001, k));
        const corner = points[i].position;
        mesh.position.set((corner.x / 2) * k, (corner.y / 2) * k, -0.6);
        mesh.material.opacity = 0.16 * k;
        edge.material.opacity = 0.85 * k;
        mesh.visible = open > 0.001;
      });

      // 03: the line arrives flat through the middle and turns to its slope, overshooting a little and settling.
      const turn = ease(solve);
      const settle = Math.sin(solve * Math.PI * 2.5) * (1 - solve) * 0.25;
      pivot.rotation.z = DRAWN_SLOPE * turn + settle;
      bar.material.opacity = ease(clamp01(solve * 3));
      bar.visible = solve > 0;

      // 04: each point's miss, down or up to the line.
      misses.material.opacity = 0.9 * ease(line);
      misses.visible = line > 0;

      let shown = 0;
      STEPS.forEach((range, i) => { if (p >= range[0]) shown = i + 1; });
      if (shown !== written) {
        written = shown;
        paintSlip(WORKING[shown]);
      }
      stepPlates.forEach((plate, i) => {
        const end = i + 1 < STEPS.length ? STEPS[i + 1][0] : 1.01;
        plate.material.opacity = p >= STEPS[i][0] && p < end ? 0.95 : 0;
      });
      rowPlate.material.opacity = p < STEPS[0][0] || p >= STEPS[3][0] ? 0.95 : 0;
      held.forEach((ring, i) => { ring.material.opacity = 0.65 + (i === 0 ? 0.3 * (0.5 + 0.5 * Math.sin(t * 1.6)) : 0); });
    },
    mod: (p) => {
      const settle = ease(clamp01(p / 0.6));
      return { dx: -4, dy: 6 - 4 * settle, dz: 80 - 6 * settle, df: 0 };
    }
  };
}
