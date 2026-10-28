// ABOUTME: Act one's set for Linear Regression in Assembly: the whole program as a fan-folded printout, and the data file at its foot.
// ABOUTME: The printout carries the program's real 1,000 lines; the data file's "9" and "8" lift out at the end for act two to read.
//
// The page's claim is that a line was fitted with nothing underneath but the processor's own instructions, and the plainest way
// to show what that costs is the program itself, all of it at once. A folded printout reads as "a very long program" to anyone,
// with its words covered or not. The data file stands at its foot because that is where the story starts: act two follows one
// number from it, the 98 that the run on the projects card held back for testing.
import { THREE, clamp01, drift, ease, glow, lerp, motes, nameplate, painted, seeded, wire } from "../kit.js";

// Seven sheets, each holding a seventh of the program in three columns. The sheet is about the proportion of a strip of
// continuous form paper, and seven of them folded back and forth stand about as tall as the frame's reading height.
const SHEETS = 7;
const SHEET_W = 46;
const SHEET_H = 13;
// How far each sheet leans from upright, alternating, so the stack reads as paper folded at its perforations.
const FOLD = 0.5;
const TEX_W = 1024;
const TEX_H = Math.round((TEX_W * SHEET_H) / SHEET_W);
const COLUMNS = 3;
export const MONO = "'IBM Plex Mono', Consolas, monospace";

// The data file the run on the projects card read, exactly as it is in the repository: its size, then ten rows of y,x.
export const DATA_FILE = ["10,2", "69,2", "98,9", "82,5", "77,5", "71,3", "84,7", "55,1", "94,8", "84,6", "64,2"];
// The line holding the 98, counted from the file's first line.
const ROW_98 = 2;

export const hex = (colour) => "#" + colour.getHexString();

// Paper and ink from the theme, for every act's paper: the paper sits just off the room like every face in these films, the code in
// the theme's ink, labels in the act's accent, comments faded. Right on the light themes too, because every colour is read from the
// palette.
export function paperColours(palette, accent) {
  const paperColour = palette.face.clone();
  return {
    paper: hex(paperColour),
    band: hex(paperColour.clone().lerp(accent, 0.05)),
    hole: hex(paperColour.clone().lerp(accent, 0.35)),
    // Stronger ink on a pale page: at the dark themes' mix the code on Light mode's paper was nearly invisible.
    code: hex(paperColour.clone().lerp(palette.ink, palette.lightRoom ? 1 : 0.72)),
    comment: hex(paperColour.clone().lerp(palette.ink, palette.lightRoom ? 0.7 : 0.38)),
    label: hex(accent)
  };
}

// One sheet of the printout: a seventh of the program in three columns on the paper's own ground, with the feed holes down both
// edges and a faint band on every third line, which is what continuous form listing paper looks like.
function paintSheet(lines, colours, heavy) {
  return painted(TEX_W, TEX_H, (g, w, h) => {
    g.fillStyle = colours.paper;
    g.fillRect(0, 0, w, h);
    const margin = 30;
    const lineHeight = (h - 12) / Math.ceil(lines.length / COLUMNS);
    g.fillStyle = colours.band;
    for (let y = 6; y < h; y += lineHeight * 6) g.fillRect(margin, y, w - margin * 2, lineHeight * 3);
    g.strokeStyle = colours.hole;
    g.lineWidth = 2;
    for (let y = 12; y < h; y += 22) {
      for (const x of [14, w - 14]) {
        g.beginPath();
        g.arc(x, y, 5, 0, Math.PI * 2);
        g.stroke();
      }
    }
    const perColumn = Math.ceil(lines.length / COLUMNS);
    const columnWidth = (w - margin * 2) / COLUMNS;
    // Seen from the reading distance each line is a few pixels tall and blends into the paper. Light ink on dark paper survives
    // that; dark ink on pale paper washed out to almost nothing, so on the light themes the code is set heavier.
    g.font = `${heavy ? 700 : 400} ${Math.max(4, lineHeight * 0.86)}px ${MONO}`;
    g.textBaseline = "top";
    lines.forEach((line, i) => {
      const column = Math.floor(i / perColumn);
      const row = i % perColumn;
      const text = line.replace(/\t/g, "    ");
      const trimmed = text.trim();
      g.fillStyle = trimmed.startsWith("#") ? colours.comment : /^[A-Za-z_]\w*:/.test(trimmed) ? colours.label : colours.code;
      g.fillText(text.slice(0, 60), margin + column * columnWidth + 6, 6 + row * lineHeight);
    });
  });
}

// The data file as a card: its name over its lines in large type, the 98 marked in the accent.
function paintDataFile(colours) {
  const width = 512;
  const height = 760;
  const texture = painted(width, height, (g, w, h) => {
    g.fillStyle = colours.paper;
    g.fillRect(0, 0, w, h);
    g.fillStyle = colours.label;
    g.font = `600 40px ${MONO}`;
    g.textBaseline = "top";
    g.fillText("test.csv", 40, 34);
    g.fillStyle = colours.band;
    g.fillRect(40, 90, w - 80, 3);
    g.font = `400 46px ${MONO}`;
    DATA_FILE.forEach((line, i) => {
      const y = 116 + i * 56;
      g.fillStyle = colours.code;
      g.fillText(line, 40, y);
      if (i === ROW_98) {
        // The 98 on a solid accent mark in the paper's own colour: accent type on an accent tint was the one line nobody could read.
        const mark = g.measureText("98").width;
        g.fillStyle = colours.label;
        g.fillRect(34, y - 6, mark + 12, 56);
        g.fillStyle = colours.paper;
        g.fillText("98", 40, y);
      }
    });
  });
  return { texture, width, height };
}

// A single character, standing on its own: the "9" and the "8" once they leave the file.
export function paintGlyph(char, colour) {
  return painted(256, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.fillStyle = colour;
    g.font = `600 220px ${MONO}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(char, w / 2, h / 2 + 8);
  });
}

// A flat sheet that hides what is behind it, with its outline drawn in the accent. The printout is the subject, so it is solid:
// a see-through sheet would show every other sheet's code through it and read as noise.
export function sheet(texture, w, h, accent, lineOpacity) {
  const geometry = new THREE.PlaneGeometry(w, h);
  const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }));
  mesh.add(wire(geometry, accent, lineOpacity));
  return mesh;
}

export function buildProgram(palette, program) {
  const group = new THREE.Group();
  const accent = palette.accents[0];
  const random = seeded(17);

  const colours = paperColours(palette, accent);

  // ——— the printout ———
  const lines = program.split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  const perSheet = Math.ceil(lines.length / SHEETS);
  const TOP = 46;
  const parts = [];
  let edgeY = TOP;
  let edgeZ = 0;
  for (let i = 0; i < SHEETS; i++) {
    const lean = i % 2 === 0 ? -FOLD : FOLD;
    const down = new THREE.Vector3(0, Math.cos(lean), Math.sin(lean)).multiplyScalar(SHEET_H / 2);
    const mesh = sheet(paintSheet(lines.slice(i * perSheet, (i + 1) * perSheet), colours, palette.lightRoom), SHEET_W, SHEET_H, accent, 0.7);
    mesh.rotation.x = lean;
    mesh.position.set(0, edgeY - down.y, edgeZ - down.z);
    edgeY -= down.y * 2;
    edgeZ -= down.z * 2;
    group.add(mesh);
    // Sheets arrive from the top down while the title is read, so the program spills out rather than standing there.
    parts.push({ mesh, at: (i / SHEETS) * 0.55, y: mesh.position.y });
  }
  const BOTTOM = edgeY;

  // ——— the data file ———
  const card = paintDataFile(colours);
  const CARD_W = 17;
  const CARD_H = (CARD_W * card.height) / card.width;
  const dataFile = sheet(card.texture, CARD_W, CARD_H, accent, 0.9);
  // To the right of the printout's foot, on the side away from the page's words: on the left it stood against the opening
  // paragraph at the frame the page lands on.
  const cardAt = new THREE.Vector3(40, BOTTOM + CARD_H / 2 + 2, 12);
  dataFile.position.copy(cardAt);
  dataFile.rotation.y = -0.12;
  group.add(dataFile);

  // Where the "98" sits on the card, in the set's units, so the two characters leave from it.
  const rowY = cardAt.y + CARD_H / 2 - ((116 + ROW_98 * 56 + 22) / card.height) * CARD_H;
  const rowX = cardAt.x - CARD_W / 2 + ((40 + 28) / card.width) * CARD_W;

  // ——— the "9" and the "8" ———
  const glyphs = ["9", "8"].map((char, i) => {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.MeshBasicMaterial({ map: paintGlyph(char, colours.label), transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide })
    );
    mesh.userData.from = new THREE.Vector3(rowX + (i - 0.5) * 2.4, rowY, cardAt.z + 1);
    // Apart, above the card and toward the camera, where act two's set will take them.
    mesh.userData.to = new THREE.Vector3(cardAt.x - 24 + i * 14, cardAt.y + CARD_H / 2 + 12, cardAt.z + 10);
    mesh.position.copy(mesh.userData.from);
    group.add(mesh);
    return mesh;
  });

  // ——— the words ———
  const plates = [
    { mesh: nameplate("The program", "1,000 lines of MIPS assembly", accent, palette.deep, 44), pos: [SHEET_W / 2 + 10, TOP - 4, 8], at: 0.5 },
    { mesh: nameplate("test.csv", "ten rows of data, read as text", accent, palette.deep, 44), pos: [cardAt.x - 16, cardAt.y - CARD_H / 2 + 4, cardAt.z + 6], at: 0.6 },
    { mesh: nameplate("\"9\" and \"8\"", "two characters, not yet a number", accent, palette.deep, 44), pos: [cardAt.x - 16, cardAt.y + CARD_H / 2 + 26, cardAt.z + 10], at: 0 }
  ];
  for (const plate of plates) {
    plate.mesh.position.set(plate.pos[0], plate.pos[1], plate.pos[2]);
    group.add(plate.mesh);
  }
  plates[0].mesh.userData.primary = true;

  // ——— air ———
  // Dust, and a few loose slips of paper: the printout's own offcuts, not shapes from somewhere else.
  const dust = [];
  for (let i = 0; i < 420; i++) dust.push((random() - 0.5) * 240, -60 + random() * 150, (random() - 0.5) * 200);
  const air = motes(dust, accent, 1.2, palette.lightRoom ? 0.3 : 0.38);
  air.userData.ambient = true;
  group.add(air);

  const slips = drift([
    new THREE.BoxGeometry(12, 0.2, 3.4),
    new THREE.BoxGeometry(7, 0.2, 7),
    new THREE.BoxGeometry(16, 0.2, 2.2)
  ], 16, accent, palette.lightRoom ? 0.2 : 0.26, 41);
  slips.object.userData.ambient = true;
  group.add(slips.object);

  const halo = glow(accent, 150, palette.lightRoom ? 0.08 : 0.16);
  halo.position.set(0, (TOP + BOTTOM) / 2, -40);
  halo.userData.ambient = true;
  group.add(halo);
  const haloLit = halo.material.opacity;

  // Turned a little toward the copy so the folds show their depth, and sized to the right lane of a 1440 frame. At 0.5 the
  // printout and the file filled about 7% of the frame, the size the first film's sets were called "barely visible" at.
  group.rotation.y = -0.3;
  group.scale.setScalar(0.78);

  return {
    group,
    // The reader is meant to see the whole program and the file at its foot.
    contained: true,
    // The camera turns less toward this set than the engine's usual 0.62, so the printout keeps to the right lane beside the
    // title. At the usual turn, any move of the set to the right was mostly undone by the camera following it: the frame kept
    // 16 to 24% of its right side empty while the printout's left edge stood against the opening paragraph.
    aimFollow: 0.35,
    update(t, p) {
      // Starts part spilled: the frame the page lands on should already read as a printout.
      const build = clamp01(p * 1.9 + 0.5);
      for (const item of parts) {
        const k = ease(clamp01((build - item.at) / 0.22));
        item.mesh.visible = k > 0.01;
        item.mesh.scale.set(1, Math.max(0.001, k), 1);
        item.mesh.position.y = item.y + (1 - k) * 6;
      }

      group.rotation.y = -0.3 + Math.sin(t * 0.12) * 0.06 + p * 0.16;
      group.position.y = Math.sin(t * 0.45) * 0.6;
      air.rotation.y = t * 0.02;
      slips.update(t);
      halo.material.opacity = haloLit * (0.4 + 0.6 * build);

      // The two characters leave the file late in the hold and hang apart, waiting to be read. p is the share of the whole act and
      // the camera holds on this set for the first 46% of it before flying on, so this ends while the reader is still here.
      const lift = ease(clamp01((p - 0.18) / 0.22));
      glyphs.forEach((glyph, i) => {
        glyph.position.lerpVectors(glyph.userData.from, glyph.userData.to, lift);
        glyph.position.y += Math.sin(t * 0.9 + i * 1.7) * 0.5 * lift;
        glyph.scale.setScalar(lerp(0.35, 1, lift));
        glyph.material.opacity = clamp01(lift * 3);
      });

      const labelIn = (at) => ease(clamp01((build - at) * 7));
      plates[0].mesh.material.opacity = labelIn(plates[0].at) * 0.95;
      plates[1].mesh.material.opacity = labelIn(plates[1].at) * 0.95;
      plates[2].mesh.material.opacity = ease(clamp01((lift - 0.55) * 4)) * 0.95;
    },
    // Establish, then come down the printout to the data file: the reader first sees the whole program, then the file at its foot,
    // where the act ends with the two characters in the air.
    mod: (p) => {
      const settle = ease(clamp01(p / 0.34));
      const descend = ease(clamp01((p - 0.34) / 0.66));
      return {
        // No closing in on the way down: the file stands at the set's outer edge, and closing grew the set until the file and its
        // two labels were pushed off the right of the frame.
        dx: -6 - 2 * settle + 6 * descend,
        dy: 16 - 3 * settle - 10 * descend,
        dz: 80 - 3 * settle,
        df: 0
      };
    }
  };
}
