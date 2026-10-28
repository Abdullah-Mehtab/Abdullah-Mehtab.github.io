// ABOUTME: Act four's set for Linear Regression in Assembly: the fitted line asked about the 98 row, its answer a hair under the real
// ABOUTME: value, and the simulator's console printing the run's last lines and the program's goodbye cats.
//
// Above, a close view of the line where x is 9: the ring is the row's real 98, the solid mark on the line is the line's answer, and
// the short bar between them is the miss. Below, the console prints the end of the run on the projects card, line for line. That
// run was the 2024 program's: run again in MARS 4.5 until its coin flips drew the same split (scratchpad `card-run`, run 296,
// 2026-10-28), it printed exactly the weights and the prediction on the card. The fixed program prints the same line to one more
// digit (55.352238) and the answer as 97.47761, so this console is the 2024 run's, to agree with the page's words and the card.
import { THREE, clamp01, ease, edged, glow, motes, nameplate, painted, seeded } from "../kit.js";
import { MONO, paperColours, sheet } from "./01-program.js";

// The run's output from "Formula:" to its end, as MARS printed it. Tabs are the program's own. The two unusual characters in the
// banner are U+00BA and U+00B4, which MARS writes as single bytes.
const OUTPUT = [
  "Formula:",
  "Y = b0 + x1 * b1 + x2 * b2 . . . xn * bn",
  "Y = 55.35224 + (X1 * 4.680597)",
  "",
  "Actual: 98\tPredicted: 97.477615",
  "",
  "Actual: 64\tPredicted: 64.71343",
  "",
  "",
  "  |\\_/|   ****************************  (\\_/)",
  " / @ @ \\  *     Project Complete!    * (='.'=)",
  "( > º < ) *         Goodbye!         * (')_(')",
  " `>>x<<´  *     (Abdullah Mehtab)    *",
  " /  O  \\  *"
];
// How many of those lines are printed by each share of the act: the formula on arrival, then each answer, then the goodbye.
const PRINTED = [[0, 3], [0.1, 5], [0.2, 7], [0.3, OUTPUT.length]];
const CONSOLE = { w: 54, h: 36, y: -8 };
const TEX_W = 1280;
const TEX_H = Math.round((TEX_W * CONSOLE.h) / CONSOLE.w);
const TITLE_H = 70, MARGIN = 54, LINE_H = 52;

// The close view of the line above the console's left half, a name either side of it: x across from 8.7 to 9.35, y up, in set
// units per unit, with x = 9 at X and the answer at Y.
const SLOPE = 4.680597, INTERCEPT = 55.35224;
const SX = 24, SY = 5;
const VIEW = { x: -8, y: 21 };
const ANSWER = INTERCEPT + SLOPE * 9;
const atXY = (x, y) => new THREE.Vector3(VIEW.x + (x - 9) * SX, VIEW.y + (y - ANSWER) * SY, 0);

const expand = (line) => {
  let out = "";
  for (const c of line) out += c === "\t" ? " ".repeat(8 - (out.length % 8)) : c;
  return out;
};

export function buildTesting(palette) {
  const group = new THREE.Group();
  const accent = palette.accents[3];
  const colours = paperColours(palette, accent);
  const random = seeded(47);

  // ——— the console ———
  const texture = painted(TEX_W, TEX_H, () => {});
  const paintConsole = (count) => {
    const g = texture.image.getContext("2d");
    g.fillStyle = colours.paper;
    g.fillRect(0, 0, TEX_W, TEX_H);
    // MARS's console pane is the tab named Run I/O.
    g.fillStyle = colours.band;
    g.fillRect(0, 0, TEX_W, TITLE_H);
    g.fillStyle = colours.label;
    g.fillRect(0, TITLE_H - 4, TEX_W, 4);
    g.font = `600 40px ${MONO}`;
    g.textBaseline = "middle";
    g.fillText("Run I/O", MARGIN, TITLE_H / 2);
    g.font = `400 38px ${MONO}`;
    g.textBaseline = "top";
    OUTPUT.slice(0, count).forEach((line, i) => {
      g.fillStyle = /^Actual: 98/.test(line) ? colours.label : colours.code;
      g.fillText(expand(line), MARGIN, TITLE_H + 28 + i * LINE_H);
    });
    texture.needsUpdate = true;
  };
  const consoleNode = new THREE.Group();
  consoleNode.position.set(0, CONSOLE.y, 0);
  group.add(consoleNode);
  const screen = sheet(texture, CONSOLE.w, CONSOLE.h, accent, 0.9);
  screen.userData.screen = "the console";
  // The console pane stands on a body of its own, its glass flush with the front.
  const body = edged(new THREE.BoxGeometry(CONSOLE.w, CONSOLE.h, 4), palette.face.clone(), accent, 0.4);
  body.position.z = -2.05;
  consoleNode.add(body, screen);
  // The cursor, after the last line printed.
  const cursor = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.1), new THREE.MeshBasicMaterial({ color: accent, transparent: true }));
  consoleNode.add(cursor);
  const unit = CONSOLE.w / TEX_W;
  const lineTop = (i) => CONSOLE.h / 2 - (TITLE_H + 28 + i * LINE_H) * unit;

  // ——— the line, close, where x is 9 ———
  const from = atXY(8.7, INTERCEPT + SLOPE * 8.7), to = atXY(9.35, INTERCEPT + SLOPE * 9.35);
  const run = to.clone().sub(from);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(run.length(), 1.4, 0.4), new THREE.MeshBasicMaterial({ color: accent }));
  bar.position.copy(from).add(to).multiplyScalar(0.5);
  bar.rotation.z = Math.atan2(run.y, run.x);
  group.add(bar);

  const disc = (fill, ring, size) => new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({
      map: painted(128, 128, (g, w, h) => {
        g.clearRect(0, 0, w, h);
        g.beginPath();
        g.arc(w / 2, h / 2, w / 2 - 8, 0, Math.PI * 2);
        if (fill) { g.fillStyle = fill; g.fill(); }
        g.strokeStyle = colours.label;
        g.lineWidth = ring;
        g.stroke();
      }),
      transparent: true,
      depthWrite: false
    })
  );
  const actual = disc(null, 12, 4.6);
  actual.position.copy(atXY(9, 98)).setZ(0.6);
  group.add(actual);
  const answer = disc(colours.label, 12, 3.6);
  answer.position.copy(atXY(9, ANSWER)).setZ(0.8);
  group.add(answer);
  // The miss: 0.522385 of a mark, from the line's answer up to the real value.
  const miss = new THREE.Mesh(new THREE.PlaneGeometry(0.6, (98 - ANSWER) * SY), new THREE.MeshBasicMaterial({ color: accent, transparent: true }));
  miss.position.copy(atXY(9, (98 + ANSWER) / 2)).setZ(0.5);
  group.add(miss);

  // ——— the words ———
  const anchor = new THREE.Group();
  // Under the console: above it, beside the close view, the three names crowded the act rail at the frame's right edge.
  anchor.position.set(-CONSOLE.w / 2 + 12, -CONSOLE.h / 2 - 6, 6);
  consoleNode.add(anchor);
  const consolePlate = nameplate("MARS 4.5", "the run on the projects card", accent, palette.deep, 40, true);
  consolePlate.userData.primary = true;
  anchor.add(consolePlate);
  const actualPlate = nameplate("Actual 98", "the row it never saw", accent, palette.deep, 38, true);
  // Left of its ring, the answer's name to the right: both to the right stacked the real value's name against the top of the frame.
  actualPlate.position.copy(atXY(9, 98)).add(new THREE.Vector3(-17, 4, 8));
  group.add(actualPlate);
  const answerPlate = nameplate("Predicted 97.48", "the line's answer", accent, palette.deep, 38, true);
  answerPlate.position.copy(atXY(9, ANSWER)).add(new THREE.Vector3(18, -6, 8));
  group.add(answerPlate);

  // ——— air ———
  const dust = [];
  for (let i = 0; i < 360; i++) dust.push((random() - 0.5) * 220, -70 + random() * 150, (random() - 0.5) * 200);
  const air = motes(dust, accent, 1.2, palette.lightRoom ? 0.3 : 0.38);
  air.userData.ambient = true;
  group.add(air);
  const halo = glow(accent, 150, palette.lightRoom ? 0.08 : 0.16);
  halo.position.set(0, 0, -40);
  halo.userData.ambient = true;
  group.add(halo);

  group.rotation.y = -0.16;
  group.scale.setScalar(1.1);

  let printed = -1;
  return {
    group,
    contained: true,
    aimFollow: 0.35,
    update(t, p) {
      group.rotation.y = -0.16 + Math.sin(t * 0.12) * 0.04;
      group.position.y = Math.sin(t * 0.45) * 0.6;
      air.rotation.y = t * 0.02;

      let count = 0;
      for (const [at, lines] of PRINTED) if (p >= at) count = lines;
      if (count !== printed) {
        printed = count;
        paintConsole(count);
      }
      cursor.position.set(-CONSOLE.w / 2 + MARGIN * unit + 0.6, lineTop(count) - 1.2, 0.1);
      cursor.material.opacity = Math.sin(t * 5) > 0 ? 0.9 : 0;

      // The answer lands on the line as its line is printed, and the miss is drawn up from it to the real value.
      const asked = ease(clamp01((p - 0.1) / 0.06));
      answer.scale.setScalar(Math.max(0.001, asked));
      answer.material.opacity = asked;
      miss.scale.y = Math.max(0.001, ease(clamp01((p - 0.14) / 0.06)));
      miss.material.opacity = miss.scale.y;
      actual.material.opacity = 0.7 + 0.3 * (0.5 + 0.5 * Math.sin(t * 1.6));

      consolePlate.material.opacity = 0.95;
      actualPlate.material.opacity = 0.95;
      answerPlate.material.opacity = asked > 0.99 ? 0.95 : 0;
    },
    mod: (p) => {
      // The closing act comes in on its subject, so the chapter ends on the console rather than looking at it from across the room.
      const settle = ease(clamp01(p));
      return { dx: -4, dy: 10 - 4 * settle, dz: 84 - 16 * settle, df: 0 };
    }
  };
}
