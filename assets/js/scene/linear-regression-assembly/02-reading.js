// ABOUTME: Act two's set for Linear Regression in Assembly: the "9" and the "8" become the number 98 in a register, the way the code
// ABOUTME: does it, then every row of the file meets a coin flip and lands in training or testing, the split of the run on the projects card.
//
// The act's two paragraphs are the two halves of the set, top to bottom. First the characters act one lifted out of the file drop
// into a register one at a time, and its value goes 0, 9, 90, 98: subtract the code for "0", and multiply what is there by ten when
// another digit follows. Then the ten rows leave the register in file order, each meets the coin, and stacks in its column. The
// split is the one the projects card's run drew, which held back the 98 row and the 64 row: found again by running the program
// until its coin flips drew the same split (scratchpad `card-run`, 2026-10-28).
import { THREE, clamp01, drift, ease, edged, glow, lerp, motes, nameplate, painted, seeded } from "../kit.js";
import { MONO, paintGlyph, paperColours, sheet } from "./01-program.js";

// The file's ten rows in its own order, y then x, and where the card's run sent each: true for training.
const ROWS = [
  [69, 2, true], [98, 9, false], [82, 5, true], [77, 5, true], [71, 3, true],
  [84, 7, true], [55, 1, true], [94, 8, true], [84, 6, true], [64, 2, false]
];
// The register's value as each character arrives, and the arithmetic that got it there, in the program's own order.
const STATES = [
  { at: 0, value: "0", step: "$t0 = 0" },
  { at: 0.09, value: "9", step: "'9' - '0' = 9" },
  { at: 0.14, value: "90", step: "9 * 10 = 90" },
  { at: 0.2, value: "98", step: "90 + ('8' - '0') = 98" }
];
const REGISTER = { w: 36, h: 13, y: 18, depth: 5 };
const SLIP = { w: 36, h: 5.5, y: 8.2 };
const COIN = { r: 4.6, y: -1, z: 5 };
// Training's eight rows stand as two columns of four under one heading, testing's two in a column of their own. In one column of
// eight the set grew so much taller once the rows landed that it ran off the bottom of the frame while the act was read.
const ROW = { w: 15, h: 3.1, pitch: 3.8, top: -13.3, train: [-16.5, -0.5], test: 17 };
// When the rows leave the register, one after another, and how long each takes to land. The last lands at the end of the hold.
const ROWS_START = 0.22, ROW_STEP = 0.02, ROW_TIME = 0.06;

// A canvas the act paints again when its words change, rather than every frame.
function repaintable(width, height) {
  const texture = painted(width, height, () => {});
  return { texture, paint(draw) { const g = texture.image.getContext("2d"); draw(g, width, height); texture.needsUpdate = true; } };
}

export function buildReading(palette) {
  const group = new THREE.Group();
  const accent = palette.accents[1];
  const colours = paperColours(palette, accent);
  const random = seeded(23);

  // ——— the register: its name, and the value being built in it ———
  const register = repaintable(768, Math.round((768 * REGISTER.h) / REGISTER.w));
  const paintRegister = (value) => register.paint((g, w, h) => {
    g.fillStyle = colours.paper;
    g.fillRect(0, 0, w, h);
    g.textBaseline = "middle";
    g.fillStyle = colours.label;
    g.font = `600 64px ${MONO}`;
    g.fillText("$t0", 36, h / 2);
    g.font = `600 150px ${MONO}`;
    g.textAlign = "right";
    const width = g.measureText(value).width;
    if (value === "98") {
      // Marked the way act one marks the 98 in the file: paper coloured type on a solid accent mark.
      g.fillRect(w - 52 - width - 18, h / 2 - 84, width + 36, 168);
      g.fillStyle = colours.paper;
    } else {
      g.fillStyle = colours.code;
    }
    g.fillText(value, w - 52, h / 2 + 6);
    g.textAlign = "left";
  });
  // A register is a cell of the processor, so it has a body: a block with its face painted, the face flush with the front.
  const registerNode = new THREE.Group();
  registerNode.position.set(0, REGISTER.y, 0);
  const block = edged(new THREE.BoxGeometry(REGISTER.w, REGISTER.h, REGISTER.depth), palette.face.clone(), accent, 0.5);
  block.position.z = -REGISTER.depth / 2 - 0.05;
  registerNode.add(block, sheet(register.texture, REGISTER.w, REGISTER.h, accent, 0.9));
  group.add(registerNode);

  const slip = repaintable(768, Math.round((768 * SLIP.h) / SLIP.w));
  const paintSlip = (text) => slip.paint((g, w, h) => {
    g.fillStyle = colours.paper;
    g.fillRect(0, 0, w, h);
    g.fillStyle = colours.code;
    g.font = `400 58px ${MONO}`;
    g.textBaseline = "middle";
    g.textAlign = "center";
    g.fillText(text, w / 2, h / 2 + 3);
    g.textAlign = "left";
  });
  const slipSheet = sheet(slip.texture, SLIP.w, SLIP.h, accent, 0.5);
  slipSheet.position.set(0, SLIP.y, 0);
  group.add(slipSheet);

  // ——— the "9" and the "8", where act one left them, apart and above ———
  const valueAt = new THREE.Vector3(REGISTER.w / 2 - 8, REGISTER.y, 1);
  const glyphs = ["9", "8"].map((char, i) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.MeshBasicMaterial({ map: paintGlyph(char, colours.label), transparent: true, depthWrite: false, side: THREE.DoubleSide })
    );
    mesh.userData.from = new THREE.Vector3(-7 + i * 14, REGISTER.y + 12, 6);
    mesh.position.copy(mesh.userData.from);
    group.add(mesh);
    return mesh;
  });

  // ——— the coin: a 0 on one face and a 1 on the other ———
  const paintFace = (digit) => painted(256, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.fillStyle = colours.paper;
    g.beginPath();
    g.arc(w / 2, h / 2, w / 2 - 6, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = colours.label;
    g.lineWidth = 10;
    g.stroke();
    g.fillStyle = colours.label;
    g.font = `600 150px ${MONO}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(digit, w / 2, h / 2 + 8);
  });
  const coin = new THREE.Group();
  const faces = ["0", "1"].map((digit, i) => {
    const face = new THREE.Mesh(
      new THREE.CircleGeometry(COIN.r, 48),
      new THREE.MeshBasicMaterial({ map: paintFace(digit), transparent: true })
    );
    face.rotation.x = i * Math.PI;
    face.position.z = i ? -0.05 : 0.05;
    coin.add(face);
    return face;
  });
  coin.position.set(0, COIN.y, COIN.z);
  group.add(coin);

  // ——— the rows: each painted once, the 98 row marked ———
  const slots = { train: 0, test: 0 };
  const rows = ROWS.map(([y, x, train], i) => {
    const texture = painted(512, Math.round((512 * ROW.h) / ROW.w), (g, w, h) => {
      g.fillStyle = colours.paper;
      g.fillRect(0, 0, w, h);
      g.font = `400 64px ${MONO}`;
      g.textBaseline = "middle";
      const text = `${y}, ${x}`;
      if (y === 98) {
        const width = g.measureText("98").width;
        g.fillStyle = colours.label;
        g.fillRect(34, h / 2 - 38, width + 12, 76);
        g.fillStyle = colours.paper;
        g.fillText("98", 40, h / 2 + 3);
        g.fillStyle = colours.code;
        g.fillText(text.slice(2), 40 + width, h / 2 + 3);
      } else {
        g.fillStyle = colours.code;
        g.fillText(text, 40, h / 2 + 3);
      }
    });
    const mesh = sheet(texture, ROW.w, ROW.h, accent, y === 98 ? 1 : 0.6);
    mesh.material.transparent = true;
    const slot = train ? slots.train++ : slots.test++;
    const to = train
      ? new THREE.Vector3(ROW.train[Math.floor(slot / 4)], ROW.top - (slot % 4) * ROW.pitch, 0)
      : new THREE.Vector3(ROW.test, ROW.top - slot * ROW.pitch, 0);
    // Built where it lands: the engine weighs a set once, as built, to decide the height the camera looks at, and rows weighed at
    // the register made it look too high for the columns they end in.
    mesh.position.copy(to);
    mesh.visible = false;
    group.add(mesh);
    return { mesh, to, train, start: ROWS_START + i * ROW_STEP };
  });
  // Each column under the program's own heading for it, as it prints the split.
  const trainWidth = ROW.train[1] - ROW.train[0] + ROW.w;
  const headings = [["Train Data:", (ROW.train[0] + ROW.train[1]) / 2, trainWidth], ["Test Data:", ROW.test, ROW.w]].map(([text, x, width]) => {
    const texture = painted(Math.round((512 * width) / ROW.w), Math.round((512 * ROW.h) / ROW.w), (g, w, h) => {
      g.fillStyle = colours.paper;
      g.fillRect(0, 0, w, h);
      g.fillStyle = colours.label;
      g.font = `600 62px ${MONO}`;
      g.textBaseline = "middle";
      g.fillText(text, 30, h / 2 + 3);
    });
    const mesh = sheet(texture, width, ROW.h, accent, 0.9);
    mesh.position.set(x, ROW.top + ROW.pitch + 0.4, 0);
    group.add(mesh);
    return mesh;
  });
  const from = new THREE.Vector3(0, REGISTER.y, 1);
  const atCoin = new THREE.Vector3(0, COIN.y, COIN.z + 1.5);

  // ——— the words ———
  const plates = [
    // Under the coin, where the rows will land, until they start to: beside the register it stood on the act rail at the frame's
    // right edge.
    { mesh: nameplate("A register", "$t0, where 98 is built", accent, palette.deep, 44, true), pos: [ROW.train[0] + 8, ROW.top - 5, 8] },
    // One name for the split, beside the shorter column. A name for each column fell below the frame or onto the act's words; the
    // columns carry the program's own headings instead.
    { mesh: nameplate("The split", "8 rows to train, 2 to test", accent, palette.deep, 44, true), pos: [ROW.test + 4, ROW.top - ROW.pitch * 2 - 5, 8] }
  ];
  for (const plate of plates) {
    plate.mesh.position.set(...plate.pos);
    group.add(plate.mesh);
  }
  plates[1].mesh.userData.primary = true;

  // ——— air ———
  const dust = [];
  for (let i = 0; i < 360; i++) dust.push((random() - 0.5) * 220, -70 + random() * 150, (random() - 0.5) * 200);
  const air = motes(dust, accent, 1.2, palette.lightRoom ? 0.3 : 0.38);
  air.userData.ambient = true;
  group.add(air);
  // Loose coins and slips in the air: the act's own two shapes, small and flat.
  const chips = drift([new THREE.CircleGeometry(2.2, 18), new THREE.BoxGeometry(3, 3, 0.2)], 14, accent, palette.lightRoom ? 0.2 : 0.26, 52);
  chips.object.userData.ambient = true;
  group.add(chips.object);
  const halo = glow(accent, 150, palette.lightRoom ? 0.08 : 0.16);
  halo.position.set(0, 0, -40);
  halo.userData.ambient = true;
  group.add(halo);

  group.rotation.y = -0.2;
  group.scale.setScalar(0.78);

  let shown = -1;
  const along = new THREE.Vector3();
  return {
    group,
    contained: true,
    aimFollow: 0.35,
    update(t, p) {
      group.rotation.y = -0.2 + Math.sin(t * 0.12) * 0.05;
      group.position.y = Math.sin(t * 0.45) * 0.6;
      air.rotation.y = t * 0.02;
      chips.update(t);

      // The characters drop into the register one at a time; each is spent once it lands.
      const drops = [ease(clamp01((p - 0.03) / 0.07)), ease(clamp01((p - 0.13) / 0.07))];
      glyphs.forEach((glyph, i) => {
        const k = drops[i];
        glyph.position.lerpVectors(glyph.userData.from, valueAt, k);
        glyph.position.y += Math.sin(t * 0.9 + i * 1.7) * 0.5 * (1 - k);
        glyph.scale.setScalar(lerp(1, 0.45, k));
        glyph.material.opacity = 1 - clamp01((k - 0.7) / 0.3);
        glyph.visible = glyph.material.opacity > 0.01;
      });
      let state = 0;
      STATES.forEach((s, i) => { if (p >= s.at) state = i; });
      if (state !== shown) {
        shown = state;
        paintRegister(STATES[state].value);
        paintSlip(STATES[state].step);
      }

      // The rows: out of the register, through the coin, into their column. The coin shows the face each row drew as it passes
      // and spins on its own between them.
      let facing = null;
      for (const row of rows) {
        const k = clamp01((p - row.start) / ROW_TIME);
        row.mesh.visible = k > 0;
        if (k < 0.4) along.lerpVectors(from, atCoin, ease(k / 0.4));
        else along.lerpVectors(atCoin, row.to, ease((k - 0.4) / 0.6));
        row.mesh.position.copy(along);
        row.mesh.scale.setScalar(lerp(0.4, 1, ease(clamp01(k / 0.4))));
        row.mesh.material.opacity = clamp01(k * 6);
        if (k > 0.25 && k < 0.6) facing = row.train ? 0 : Math.PI;
      }
      coin.rotation.x = facing === null ? t * 2.2 : facing;

      const showing = (on) => (on ? 0.95 : 0);
      plates[0].mesh.material.opacity = showing(p < ROWS_START);
      plates[1].mesh.material.opacity = showing(p >= ROWS_START);
    },
    mod: (p) => {
      // The camera rises through the act. The characters leave the top of the set and the rows land under it, so its middle sinks;
      // the camera looks at a fixed height, so rising tips the frame down onto the set and keeps it where it was.
      const settle = ease(clamp01(p / 0.45));
      return { dx: -4, dy: -4 + 32 * settle, dz: 80 - 4 * settle, df: 0 };
    }
  };
}
