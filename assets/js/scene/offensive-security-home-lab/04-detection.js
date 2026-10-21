// ABOUTME: Act IV's set: act three's lab laid down as a floor round the Raspberry Pi, toured over the shoulder of the laptop's Kali as
// ABOUTME: it scans, brute forces SSH, walks into Cowrie on port 2222, is traced, and is blocked into silence.
//
// Owner rulings 2026-10-19. The floor, the Pi as a small house with Cowrie's door, the agent lamps and the barrier stand from plan H2;
// the story is told from the attacker's side, because this is an offensive security chapter and the defender's side is Cyber
// Sentinel's. What the outside Kali did and saw, in the owner's words: "basic nmap scans, ssh bruteforce and trigerring cowrie";
// "simply failed attempts, rejection when hitting cowrie", Cowrie traced the address and Wazuh confirmed it, and "once attacker is
// blocked, its a silent timeout"; "Cowrie's ssh port was 2222 to mimic ssh". The trace is shown as the address being identified and
// nothing more: hacking back stays out of this chapter (ruling of 2026-10-12).
//
// Act three's hosts keep their order round the ring, turned on the floor so the laptop stands at the near right with the house's front
// facing it. Home Kali is left out: it plays no part here, and two Kalis on one floor would ask a visitor which one attacks.
//
// The set drives the camera itself (`camera`), as acts one and three do: over Kali's shoulder for the attack, close on each beat, and
// back out to the whole lab at the end, which a closing act must show whole. The beats follow the camera's place through the act, not
// the act's progress, because with reduced motion the engine hands every set a progress of 1 while the camera still follows the scroll.
import { THREE, LAYER, clamp01, ease, lerp, glow, nameplate } from "../kit.js";
import { ACCENT, GLOW, edgeMaterial } from "./01-desk.js";

const SET_SCALE = 0.4;
const RING = { x: 52, z: 78 };
// Act three's hosts in act three's order round the ring, by angle from the far side clockwise, turned by TURN on the floor.
const TURN = 134;
const HOSTS = [
  { octet: ".1", angle: 88, size: 11, os: "router" },
  { octet: ".21", angle: 232, size: 12, os: "linux" },
  { octet: ".22", angle: 160, size: 15, os: "windows", agent: true },
  { octet: ".23", angle: 304, size: 11, os: "linux", agent: true, probed: true },
  { octet: ".30", angle: 16, size: 10, os: "windows", agent: true, laptop: true }
];
const STAND = 5;
const onFloor = (angle) => {
  const a = ((angle + TURN) * Math.PI) / 180;
  return new THREE.Vector3(RING.x * Math.sin(a), 0, -RING.z * Math.cos(a));
};
// The house, its front facing the laptop.
const HOUSE = { w: 30, h: 26, d: 22, roof: 14 };
const LAPTOP_AT = onFloor(16);
const HOUSE_YAW = Math.atan2(LAPTOP_AT.x, LAPTOP_AT.z);
// How far in front of the Cowrie door the barrier stands, along the attacker's line, and how long its arm is. The attacker's lines run
// level at about the height of Kali's face and the door's middle: a line running down to the floor made a box round itself that took
// in the laptop's platform, and started inside Kali counted as a body inside Kali (the body clash check, 2.6 and 4.4 units).
const GATE_OUT = 16, ARM = 20, LINE_Y = 7;

// The share of the act the camera tours for: the closing act has no flight after it.
const HOLD = 0.95;
// Each beat's start and end, as a share of the tour.
const BEATS = {
  scan: [0.08, 0.24],
  brute: [0.28, 0.44],
  cowrie: [0.48, 0.63],
  trace: [0.66, 0.77],
  block: [0.8, 0.91]
};
const ASPECT = 1.6;

export function buildDetection(palette) {
  const group = new THREE.Group();
  const face = palette.face.clone();
  const lit = new THREE.Color(GLOW);
  const light = (size, opacity) => {
    const sprite = glow(GLOW, size, opacity);
    if (palette.lightRoom) sprite.material.blending = THREE.NormalBlending;
    return sprite;
  };
  const lines = (geometry, opacity, angle = 12) => new THREE.LineSegments(new THREE.EdgesGeometry(geometry, angle), edgeMaterial(opacity));
  const body = (geometry, opacity) => {
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: face.clone() }));
    mesh.add(lines(geometry, opacity));
    return mesh;
  };
  const segments = (points, opacity) => new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points), edgeMaterial(opacity));

  // ---------- the floor: act three's broken hop ring, laid down ----------
  const ringPts = [];
  for (let i = 0; i < 144; i++) {
    if (i % 3 === 2) continue;
    const a = (i / 144) * Math.PI * 2, b = ((i + 1) / 144) * Math.PI * 2;
    ringPts.push(new THREE.Vector3(RING.x * Math.sin(a), 0, RING.z * Math.cos(a)), new THREE.Vector3(RING.x * Math.sin(b), 0, RING.z * Math.cos(b)));
  }
  const ring = segments(ringPts, 0.22);
  ring.material.depthWrite = false;
  group.add(ring);

  // ---------- the hosts, as short platforms with their marks on top ----------
  const markPoints = (os, r) => {
    const out = [];
    const box = (x0, y0, x1, y1) => out.push(x0, y0, 0, x1, y0, 0, x1, y0, 0, x1, y1, 0, x1, y1, 0, x0, y1, 0, x0, y1, 0, x0, y0, 0);
    if (os === "windows") {
      const s = r * 0.3, g = r * 0.07;
      box(-s - g, g, -g, s + g); box(g, g, s + g, s + g); box(-s - g, -s - g, -g, -g); box(g, -s - g, s + g, -g);
    } else if (os === "linux") {
      const s = r * 0.36;
      out.push(-s, s * 0.7, 0, -s * 0.15, 0, 0, -s * 0.15, 0, 0, -s, -s * 0.7, 0, s * 0.1, -s * 0.7, 0, s, -s * 0.7, 0);
    } else {
      const w = r * 0.32, h = r * 0.28;
      for (const x of [-1.1, 0, 1.1]) box(x * w - w * 0.4, -h, x * w + w * 0.4, h);
    }
    return new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(out, 3)).rotateX(-Math.PI / 2).translate(0, STAND + 0.3, 0);
  };
  const hosts = HOSTS.map((spec) => {
    const node = new THREE.Group();
    node.position.copy(onFloor(spec.angle));
    const geometry = spec.os === "router"
      ? new THREE.BoxGeometry(spec.size * 2, STAND, spec.size * 2).translate(0, STAND / 2, 0)
      : new THREE.CylinderGeometry(spec.size, spec.size, STAND, 48).translate(0, STAND / 2, 0);
    const base = body(geometry, 0.55);
    const mark = new THREE.LineSegments(markPoints(spec.os, spec.size), edgeMaterial(0.7));
    node.add(base, mark);
    group.add(node);
    const host = { spec, node, base, mark };
    // The agent's lamp: a post at the platform's far edge and a lamp on top. It lights when the attack touches the machine: the
    // attacker does not see it, the reader does.
    if (spec.agent) {
      // The laptop's lamp is a short one on the side of its platform. On a full post it stood between the camera over the attacker's
      // shoulder and the house, or the laptop's screen, wherever on the platform it went.
      const toHouse = node.position.clone().negate().setY(0).normalize();
      const at = spec.laptop
        ? new THREE.Vector3(toHouse.z, 0, -toHouse.x).multiplyScalar(spec.size - 1.5)
        : new THREE.Vector3(0, 0, -spec.size + 1.5);
      const POST = spec.laptop ? 4 : 18;
      const post = new THREE.Mesh(new THREE.BoxGeometry(1.2, POST, 1.2).translate(0, STAND + POST / 2, 0), new THREE.MeshBasicMaterial({ color: face.clone() }));
      post.add(lines(post.geometry, 0.6));
      post.position.copy(at);
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(spec.laptop ? 1.8 : 2.4, 16, 12), new THREE.MeshBasicMaterial({ color: face.clone() }));
      lamp.position.copy(at).setY(STAND + POST + 2);
      const halo = light(16, 0);
      halo.position.copy(lamp.position);
      node.add(post, lamp, halo);
      Object.assign(host, { post, lamp, halo });
    }
    return host;
  });
  const laptop = hosts.find((h) => h.spec.laptop);
  const probed = hosts.find((h) => h.spec.probed);
  const agentHosts = hosts.filter((h) => h.spec.agent);

  // ---------- the attacker: the laptop, open, with Kali's terminal on its screen ----------
  // The laptop's back is to the house and its screen to the camera, so the tour looks over the attacker's shoulder at the terminal.
  // A plain block stood here first and read as nothing in particular: a closed box glowing purple outshone the house it attacked.
  const KALI = { w: 12, h: 8, d: 8 };
  const kali = new THREE.Group();
  kali.rotation.y = HOUSE_YAW;
  laptop.node.add(kali);
  const deckGeo = new THREE.BoxGeometry(KALI.w, 1, KALI.d).translate(0, STAND + 0.5, 0);
  const deck = body(deckGeo, 0.8);
  // The keys, as rows of short strokes on the deck.
  const keyRows = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 8; c++) {
      const x = -KALI.w / 2 + 1.5 + c * 1.2, z = 0.4 + r * 1.2;
      keyRows.push(new THREE.Vector3(x, STAND + 1.05, z), new THREE.Vector3(x + 0.8, STAND + 1.05, z));
    }
  }
  const keyStrokes = segments(keyRows, 0.45);
  // The lid stands on the hinge at the back of the deck, leaning back from the reader.
  const lid = new THREE.Group();
  lid.position.set(0, STAND + 1, -KALI.d / 2 + 0.4);
  lid.rotation.x = -0.24;
  const lidGeo = new THREE.BoxGeometry(KALI.w, KALI.h, 0.6).translate(0, KALI.h / 2, 0);
  const screenGeo = new THREE.PlaneGeometry(KALI.w - 1.6, KALI.h - 1.6).translate(0, KALI.h / 2, 0.32);
  const lidBody = body(lidGeo, 0.8);
  const screen = new THREE.Mesh(screenGeo, new THREE.MeshBasicMaterial({ color: face.clone() }));
  lid.add(lidBody, screen);
  // Kali's terminal: a prompt and the lines each beat types, as strokes on the screen.
  const TERM = 5;
  const termLines = Array.from({ length: TERM }, (_, i) => {
    const y = KALI.h - 1.9 - i * 1.15;
    const pts = [];
    let x = -KALI.w / 2 + 1.6;
    const words = [1, 2 - (i % 2) * 0.8, 1.4 + (i % 3) * 0.5, 1.6 - (i % 2) * 0.6];
    for (const w of words) { pts.push(new THREE.Vector3(x, y, 0.36), new THREE.Vector3(x + w, y, 0.36)); x += w + 0.5; }
    const row = segments(pts, 0);
    row.material.color.set(GLOW);
    row.visible = false;
    lid.add(row);
    return row;
  });
  kali.add(deck, keyStrokes, lid);
  const screenGlow = light(18, 0);
  screenGlow.position.set(0, STAND + KALI.h / 2 + 1, -KALI.d / 2 + 2);
  kali.add(screenGlow);

  // ---------- the house: the Raspberry Pi, the Wazuh Manager, with Cowrie's door ----------
  const house = new THREE.Group();
  house.rotation.y = HOUSE_YAW;
  group.add(house);
  const walls = body(new THREE.BoxGeometry(HOUSE.w, HOUSE.h, HOUSE.d).translate(0, HOUSE.h / 2, 0), 0.9);
  const roofGeo = new THREE.ConeGeometry(Math.SQRT1_2, 1, 4, 1).rotateY(Math.PI / 4).scale(HOUSE.w + 4, HOUSE.roof, HOUSE.d + 4).translate(0, HOUSE.h + HOUSE.roof / 2, 0);
  const roof = body(roofGeo, 0.9);
  house.add(walls, roof);
  const front = HOUSE.d / 2 + 0.3;
  // Cowrie on port 2222, on the left of the front: a door that answers like SSH, turns every login away, and keeps every one.
  const DOOR = { x: -6.5, w: 8, h: 14 };
  const doorFrame = segments([
    new THREE.Vector3(DOOR.x - DOOR.w / 2, 0, front), new THREE.Vector3(DOOR.x - DOOR.w / 2, DOOR.h, front),
    new THREE.Vector3(DOOR.x - DOOR.w / 2, DOOR.h, front), new THREE.Vector3(DOOR.x + DOOR.w / 2, DOOR.h, front),
    new THREE.Vector3(DOOR.x + DOOR.w / 2, DOOR.h, front), new THREE.Vector3(DOOR.x + DOOR.w / 2, 0, front)
  ], 0.9);
  const doorGeo = new THREE.PlaneGeometry(DOOR.w - 0.6, DOOR.h - 0.4).translate(DOOR.x, (DOOR.h - 0.4) / 2, front + 0.05);
  const door = new THREE.Mesh(doorGeo, new THREE.MeshBasicMaterial({ color: face.clone(), side: THREE.DoubleSide }));
  door.add(lines(doorGeo, 0.8));
  // The light over the door that shows it is recording.
  const rec = new THREE.Mesh(new THREE.SphereGeometry(1.1, 12, 8), new THREE.MeshBasicMaterial({ color: face.clone() }));
  rec.position.set(DOOR.x, DOOR.h + 3, front + 0.6);
  const recGlow = light(10, 0);
  recGlow.position.copy(rec.position);
  // Every login Cowrie turned away, kept: a tally on the wall beside the door, one mark per try, the fifth struck through the four
  // before it as tallies are. Seven even bars in a row read as a vent.
  const TALLY = 7;
  const tallyX = DOOR.x + DOOR.w / 2 + 2;
  const tally = Array.from({ length: TALLY }, (_, i) => {
    const strike = i === 4;
    const bar = new THREE.Mesh(new THREE.PlaneGeometry(0.7, strike ? 7.2 : 5), new THREE.MeshBasicMaterial({ color: GLOW, transparent: true, opacity: 0, depthWrite: false }));
    if (strike) {
      bar.position.set(tallyX + 2.4, 5, front + 0.15);
      bar.rotation.z = -1.05;
    } else {
      bar.position.set(tallyX + (i < 4 ? i * 1.6 : 7.4 + (i - 5) * 1.6), 5, front + 0.1);
    }
    bar.visible = false;
    house.add(bar);
    return bar;
  });
  house.add(doorFrame, door, rec, recGlow);
  // A window on the right of the front, lit while the Manager confirms the address.
  const winGeo = new THREE.PlaneGeometry(8, 6).translate(7, 15, front);
  const win = new THREE.Mesh(winGeo, new THREE.MeshBasicMaterial({ color: face.clone() }));
  win.add(lines(winGeo, 0.8));
  house.add(win);
  const flare = light(1, 0);
  flare.position.set(0, HOUSE.h * 0.6, 0);
  house.add(flare);
  // The cable from act three arrives at the Pi's port, on its right side.
  const socket = new THREE.Object3D();
  socket.position.set(HOUSE.w / 2 + 0.5, 4, 0);
  house.add(socket);

  // ---------- the attacker's line to Cowrie, straight and low across the floor, and the barrier across it ----------
  const up = new THREE.Vector3(0, 1, 0);
  const doorAt = new THREE.Vector3(DOOR.x, LINE_Y, front + 0.5).applyAxisAngle(up, HOUSE_YAW);
  const kaliAt = laptop.node.position.clone().setY(STAND + KALI.h / 2);
  // Where a line leaves the laptop: toward the target, outside its box, at the height of its lid.
  const leaving = (target) => kaliAt.clone().addScaledVector(target.clone().sub(kaliAt).setY(0).normalize(), KALI.w * 0.75);
  const levelCurve = (from, to) => curveOf([from, from.clone().lerp(to, 0.5), to]);
  const toKali = kaliAt.clone().sub(doorAt).setY(0);
  const pathLength = toKali.length();
  const pathDir = toKali.clone().normalize();
  const across = new THREE.Vector3(pathDir.z, 0, -pathDir.x);
  const crossing = doorAt.clone().addScaledVector(pathDir, GATE_OUT);
  const gate = new THREE.Group();
  gate.position.copy(crossing).addScaledVector(across, -ARM / 2).setY(0);
  // Local +z runs across the line, so the lowered arm lies across it.
  gate.rotation.y = Math.atan2(across.x, across.z);
  group.add(gate);
  const gatePost = body(new THREE.BoxGeometry(2.4, 10, 2.4).translate(0, 5, 0), 0.9);
  const armPivot = new THREE.Group();
  armPivot.position.set(0, 9, 0);
  const armGeo = new THREE.BoxGeometry(1.6, 1.6, ARM).translate(0, 0, ARM / 2 + 1);
  const arm = new THREE.Mesh(armGeo, new THREE.MeshBasicMaterial({ color: face.clone() }));
  arm.add(lines(armGeo, 0.9));
  armPivot.add(arm);
  gate.add(gatePost, armPivot);
  // A short flash where the arm comes down on the line. It stays where it is, so nothing reads it as something travelling.
  const cut = light(1, 0);
  cut.position.copy(crossing).setY(LINE_Y);
  cut.visible = false;
  group.add(cut);

  const TUBE = 48;
  const tube = (curve, radius, opacity = 1) => {
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, TUBE, radius, 8, false), new THREE.MeshBasicMaterial({ color: GLOW, transparent: true, opacity, depthWrite: false }));
    mesh.renderOrder = LAYER.path;
    mesh.visible = false;
    group.add(mesh);
    return mesh;
  };
  const drawn = (mesh, share) => mesh.geometry.setDrawRange(0, Math.round(clamp01(share) * TUBE) * 8 * 6);
  const curveOf = (points) => new THREE.CatmullRomCurve3(points, false, "centripetal");
  // The brute force, at .23's real SSH on port 22.
  const portAt = probed.node.position.clone().setY(STAND + 2);
  const bruteCurve = levelCurve(leaving(portAt), portAt);
  // Thin, so they read as lines: at a radius of 0.6 the close shots of the door turned the line to Cowrie into a wide flat ribbon.
  const brute = tube(bruteCurve, 0.3, 0.35);
  // The try at Cowrie, across the floor into the door.
  const tryCurve = levelCurve(leaving(doorAt), doorAt);
  const attempt = tube(tryCurve, 0.3, 0.4);
  // The trace: the same way back, from Cowrie's door to Kali, drawn from the door's end.
  const trace = tube(curveOf(tryCurve.getPoints(24).reverse()), 0.8);

  // The logins themselves: small keys thrown along a line, which bounce off and fall away. Solid and small, so they are not counted
  // as bodies, and not sprites, so nothing reads them as packets of the cable.
  const KEYS = 4;
  // Small enough that the ones passing the camera in the door shots are not the largest things in the frame.
  const keyGeo = new THREE.BoxGeometry(2.6, 1.4, 1.4);
  const keys = Array.from({ length: KEYS }, () => {
    const key = new THREE.Mesh(keyGeo, new THREE.MeshBasicMaterial({ color: GLOW, transparent: true, opacity: 0, depthWrite: false }));
    key.renderOrder = LAYER.traffic;
    key.visible = false;
    group.add(key);
    return key;
  });
  const keyAt = new THREE.Vector3();
  // One throw at share k of its flight: out along the curve to the door, then back a little and down, fading.
  const throwKey = (key, curve, k) => {
    if (k <= 0 || k >= 1) { key.visible = false; return; }
    key.visible = true;
    if (k < 0.7) {
      curve.getPoint(ease(k / 0.7) * 0.97, keyAt);
      key.material.opacity = 1;
    } else {
      const back = (k - 0.7) / 0.3;
      curve.getPoint(0.97 - 0.12 * back, keyAt);
      keyAt.y -= 6 * back * back;
      key.material.opacity = 1 - back;
    }
    key.position.copy(keyAt);
    key.lookAt(curve.getPoint(0.99));
  };

  // The scan: rings spreading from Kali across the floor.
  const SWEEP_SEG = 96;
  const sweepPos = new Float32Array(SWEEP_SEG * 6), sweepCol = new Float32Array(SWEEP_SEG * 8);
  const sweepGeo = new THREE.BufferGeometry();
  sweepGeo.setAttribute("position", new THREE.BufferAttribute(sweepPos, 3));
  sweepGeo.setAttribute("color", new THREE.BufferAttribute(sweepCol, 4));
  const sweep = new THREE.LineSegments(sweepGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false }));
  sweep.renderOrder = LAYER.path;
  sweep.frustumCulled = false;
  sweep.userData.ambient = true;
  group.add(sweep);
  const SWEEP_REACH = 170;
  const drawSweep = (radius, alpha) => {
    for (let i = 0, w = 0; i < SWEEP_SEG; i++) {
      for (const e of [i, i + 1]) {
        const a = (e / SWEEP_SEG) * Math.PI * 2;
        sweepPos.set([kaliAt.x + Math.cos(a) * radius, 0.4, kaliAt.z + Math.sin(a) * radius], w * 3);
        sweepCol.set([ACCENT.r, ACCENT.g, ACCENT.b, alpha], w * 4);
        w++;
      }
    }
    sweepGeo.attributes.position.needsUpdate = true;
    sweepGeo.attributes.color.needsUpdate = true;
  };
  const reach = (h) => h.node.position.distanceTo(kaliAt.clone().setY(0));

  // ---------- the agents' reports to the Manager ----------
  const roofTop = new THREE.Vector3(0, HOUSE.h + HOUSE.roof * 0.55, 0);
  const SEG = 24;
  const reports = agentHosts.map((h) => {
    const from = h.node.position.clone().add(h.lamp.position);
    const mid = from.clone().lerp(roofTop, 0.5).add(new THREE.Vector3(0, 14, 0));
    return new THREE.QuadraticBezierCurve3(from, mid, roofTop).getPoints(SEG);
  });
  const reportPos = new Float32Array(reports.length * SEG * 6), reportCol = new Float32Array(reports.length * SEG * 8);
  reports.forEach((pts, r) => {
    for (let i = 0; i < SEG; i++) reportPos.set([pts[i].x, pts[i].y, pts[i].z, pts[i + 1].x, pts[i + 1].y, pts[i + 1].z], (r * SEG + i) * 6);
  });
  const reportGeo = new THREE.BufferGeometry();
  reportGeo.setAttribute("position", new THREE.BufferAttribute(reportPos, 3));
  reportGeo.setAttribute("color", new THREE.BufferAttribute(reportCol, 4));
  const reportLines = new THREE.LineSegments(reportGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false }));
  reportLines.renderOrder = LAYER.path;
  group.add(reportLines);

  // The timed-out probes after the block: they leave Kali toward the hosts and go nowhere.
  const lost = hosts.filter((h) => !h.spec.laptop).slice(0, 3).map((h) => {
    const to = h.node.position.clone().setY(STAND + 2);
    return curveOf([kaliAt, kaliAt.clone().lerp(to, 0.5).setY(STAND + 6), to]);
  });

  // ---------- names ----------
  // Each plate hangs from an anchor of its own, in front of and above what it names, because the engine hides a plate while a solid
  // body that is not the anchor's own stands between the camera and the anchor. The camera tours, so each plate turns to face it.
  const plates = [];
  const label = (parent, text, sub, width, at, primary) => {
    const anchor = new THREE.Group();
    anchor.position.copy(at);
    parent.add(anchor);
    const plate = nameplate(text, sub, ACCENT, palette.deep, width, true);
    if (primary) plate.userData.primary = true;
    plate.visible = false;
    anchor.add(plate);
    plates.push(plate);
    return plate;
  };
  const above = (v, y, z = 6) => v.clone().add(new THREE.Vector3(0, y, z));
  const overRoof = new THREE.Vector3(0, HOUSE.h + HOUSE.roof + 10, 12);
  // Left of the roof rather than on it: over the roof it lay across the apex and the platform behind, and right of it it reached the
  // act rail at the frame's right edge in the opening wide.
  // Over the roof's peak, so it names the house: left of the roof it hung over .22's platform and was read as naming that.
  const overPeak = new THREE.Vector3(0, HOUSE.h + HOUSE.roof + 8, 0);
  const piPlate = label(group, "Raspberry Pi", "Wazuh Manager", 64, overPeak, true);
  const kaliPlate = label(group, "Kali, on the laptop", "the outside attacker", 60, above(kaliAt, 16, 4), false);
  const scanPlate = label(group, "Nmap scan", "each watched machine notices", 64, overRoof, false);
  // Nearer Kali than the target, so it stays off the act rail at the frame's right edge.
  const brutePlate = label(group, "SSH brute force, port 22", "Permission denied", 72, above(kaliAt.clone().lerp(portAt, 0.25), 22, 4), false);
  const cowriePlate = label(group, "Port 2222 is Cowrie", "refuses logins, keeps each one", 72, above(doorAt, 17, 6), false);
  // Beside the trace line rather than over the roof, where the trace shot put it under the page's header.
  const tracePlate = label(group, "Traced", "attacker's address confirmed", 64, kaliAt.clone().lerp(doorAt, 0.5).addScaledVector(across, -16).setY(14), false);
  // On the cut line between the barrier and Kali, beside it on the side of the barrier's post: hung by Kali it was read as naming
  // Kali, and over the post it covered Cowrie's door in the closing wide.
  const blockPlate = label(group, "Blocked", "Connection timed out", 64, crossing.clone().lerp(kaliAt, 0.4).addScaledVector(across, -20).setY(4), false);

  const halo = light(1, palette.lightRoom ? 0.08 : 0.16);
  halo.scale.set(320, 260, 1); halo.position.set(0, 0, -90); halo.userData.ambient = true;
  group.add(halo);

  // The lab around the subject fades behind the page's words like the rest of a set: the hosts' platforms, lamps and posts and the
  // barrier. The close shots of the tour put them behind the copy, and a contained set's bodies otherwise stay whole there (owner
  // ruling, 2026-10-19). The house and Kali's laptop, the two things the act is about, stay whole. The laptop is a child of its host's
  // platform, so its meshes are unmarked again after the platform's are marked.
  for (const root of [...hosts.map((h) => h.node), gate]) {
    root.traverse((n) => { if (n.isMesh) n.userData.fadesBehindText = true; });
  }
  kali.traverse((n) => { if (n.isMesh) delete n.userData.fadesBehindText; });

  // The floor lies flat; the camera stands above it, so the lab is a floor rather than act three's map seen face on.
  group.scale.setScalar(SET_SCALE);

  // ---------- the camera's route, in the set's own units ----------
  // A shot stands at `eye` and keeps `subject` across the frame to the right by `across` of half its width, clear of the act's copy.
  const shot = (eye, subject, fov, across) => {
    const dir = subject.clone().sub(eye);
    const right = new THREE.Vector3().crossVectors(dir, up).normalize();
    const half = dir.length() * Math.tan((fov * Math.PI) / 360) * ASPECT;
    return { pos: eye.toArray(), look: subject.clone().addScaledVector(right, -across * half).toArray(), fov };
  };
  // Over Kali's shoulder: behind it on the line to what it attacks, raised, so Kali stands in the foreground under its target and both
  // keep the right of the frame, clear of the act's copy.
  const flat = (v) => v.clone().setY(0);
  const behindOn = (target, back, high) => {
    const dir = flat(target).sub(flat(kaliAt)).normalize();
    return kaliAt.clone().addScaledVector(dir, -back).add(new THREE.Vector3(0, high, 0));
  };
  // Aimed below the lab's middle, so the lab stands up the frame with Kali in front of it: aimed at the middle, the frame opened with
  // the set's middle 0.65 down it and a third of it empty above the house.
  const labMiddle = new THREE.Vector3(-4, -10, -6);
  const house0 = new THREE.Vector3(0, 0, 0);
  const SHOTS = {
    arrive: shot(behindOn(house0, 150, 110), labMiddle, 50, 0.49),
    shoulder: shot(behindOn(house0, 105, 58), labMiddle, 48, 0.55),
    shoulderNear: shot(behindOn(house0, 96, 52), labMiddle, 48, 0.55),
    // The house stands left of the line to .23, so this shot keeps its subject further right than the others, clear of the copy.
    brute: shot(behindOn(portAt, 100, 70), kaliAt.clone().lerp(portAt, 0.6).setY(6), 40, 0.7),
    bruteNear: shot(behindOn(portAt, 92, 64), kaliAt.clone().lerp(portAt, 0.64).setY(6), 40, 0.7),
    // Down the attacker's line on the far side from the barrier's post, so the raised post is not in front of the door, and near enough
    // the door that Kali's platform and the router stand behind the camera: further out they loomed in the foreground behind the copy.
    // Face on to Cowrie's door at about its own height, so the door, the line arriving at it and the tally beside it are the frame.
    // From above and to the side the house wall filled the frame and the door was a fifth of it in a corner.
    // Far enough back and high enough that the roof's edge and the floor are in the frame, so the door reads as a door in the Pi's
    // house: nearer, the frame was a dark wall and a flat door, and the keys passing the camera were the largest things in it.
    // Off the line from the laptop, to the side: on it the camera stood beside the laptop and its lamp loomed huge in the foreground.
    // From the side the house's far wall turns away and stays clear of the act rail.
    door: shot(doorAt.clone().addScaledVector(pathDir, 74).add(new THREE.Vector3(0, 34, 0)).addScaledVector(across, 38), doorAt.clone().setY(12).addScaledVector(across, 8), 46, 0.38),
    doorNear: shot(doorAt.clone().addScaledVector(pathDir, 70).add(new THREE.Vector3(0, 32, 0)).addScaledVector(across, 36), doorAt.clone().setY(12).addScaledVector(across, 8), 46, 0.38),
    trace: shot(behindOn(doorAt, 100, 64), kaliAt.clone().lerp(doorAt, 0.5).setY(10), 48, 0.55),
    block: shot(behindOn(doorAt, 84, 52), crossing.clone().lerp(kaliAt, 0.3).setY(8), 46, 0.5),
    blockNear: shot(behindOn(doorAt, 84, 56), crossing.clone().lerp(kaliAt, 0.3).setY(8), 46, 0.44),
    // Nearer and aimed lower than the opening wide, so the chapter ends on the lab filling the lane beside the copy rather than small
    // and low in it (36% of the frame's width and half the frame empty above it).
    whole: shot(new THREE.Vector3(49, 169, 211), new THREE.Vector3(-4, -12, 0), 48, 0.46)
  };
  const ROUTE = [
    [0, SHOTS.arrive], [0.08, SHOTS.shoulder], [0.24, SHOTS.shoulderNear], [0.3, SHOTS.brute], [0.44, SHOTS.bruteNear],
    [0.5, SHOTS.door], [0.63, SHOTS.doorNear], [0.68, SHOTS.trace], [0.79, SHOTS.block], [0.9, SHOTS.blockNear], [1, SHOTS.whole]
  ];
  const pose = { position: new THREE.Vector3(), look: new THREE.Vector3(), fov: 50 };
  function tour(p) {
    p = clamp01(p);
    let i = 0;
    while (i < ROUTE.length - 2 && p > ROUTE[i + 1][0]) i++;
    const [p0, a] = ROUTE[i], [p1, b] = ROUTE[i + 1];
    const k = ease(clamp01((p - p0) / Math.max(1e-6, p1 - p0)));
    pose.position.set(lerp(a.pos[0], b.pos[0], k), lerp(a.pos[1], b.pos[1], k), lerp(a.pos[2], b.pos[2], k));
    pose.look.set(lerp(a.look[0], b.look[0], k), lerp(a.look[1], b.look[1], k), lerp(a.look[2], b.look[2], k));
    pose.fov = lerp(a.fov, b.fov, k);
    return pose;
  }
  // Written by camera(p), which the engine calls for this act's hold and with 0 for the flight into it, before any set's update.
  let along = 0;

  const show = (plate, on) => { plate.visible = on; plate.material.opacity = on ? 1 : 0; };
  const beat = (name, p) => clamp01((p - BEATS[name][0]) / (BEATS[name][1] - BEATS[name][0]));
  const tint = (material, k) => material.color.copy(face).lerp(lit, clamp01(k));
  const facing = new THREE.Quaternion();
  const plateAt = new THREE.Vector3();
  const TYPE_PX = 18;

  return {
    group,
    socket,
    contained: true,
    hold: HOLD,
    camera: (p) => { along = p; return tour(p); },
    // Where the camera rests for the engine's own arithmetic: about the distance of the tour's first frame, so the flight from act
    // three is the length it looks.
    mod: () => ({ dx: 0, dy: 0, dz: 60, df: 0 }),
    debug: { tour, BEATS, ROUTE, along: () => along },
    update(t, progress, camera) {
      const p = along;
      const scan = beat("scan", p), bruteK = beat("brute", p), cowrie = beat("cowrie", p);
      const traced = beat("trace", p), block = beat("block", p);
      // The barrier is the blocking script, which acts only at the block: it rises out of the floor, then its arm drops. Standing there
      // from the start, its raised post stood behind the act's Outcome paragraph in the Cowrie shot (61 to 74% of that line's edge).
      const rise = ease(clamp01(block / 0.3));
      const down = ease(clamp01((block - 0.3) / 0.7));

      // The scan: three rings spread from Kali, and each watched machine's lamp lights as a ring reaches it.
      const ringK = (scan * 3) % 1;
      // After its scan Kali goes on scanning, faintly, a ring every five seconds by the clock, so the lab is never still while a reader
      // stops; once blocked it goes silent. Before its scan it has not started.
      const idleK = (t / 5) % 1;
      if (scan > 0 && scan < 1) drawSweep(ringK * SWEEP_REACH, 1 - 0.7 * ringK);
      else if (scan >= 1 && block <= 0) drawSweep(idleK * SWEEP_REACH, 0.28 * (1 - idleK));
      else drawSweep(0, 0);
      // The first ring is the one that finds them.
      const furthest = scan >= 1 ? Infinity : scan > 0 ? SWEEP_REACH * Math.min(1, scan * 3) : -1;

      // The brute force: keys thrown at .23's port 22 bounce off and fall, and its lamp flickers with each one.
      brute.visible = bruteK > 0 && bruteK < 1;
      drawn(brute, ease(clamp01(bruteK / 0.15)));
      brute.material.opacity = 0.35 * (1 - clamp01((bruteK - 0.9) / 0.1));
      // The try at Cowrie: the line to the door, keys thrown into it, and each one kept on the wall.
      attempt.visible = cowrie > 0;
      drawn(attempt, cowrie > 0 ? ease(clamp01(cowrie / 0.15)) : 0);
      keys.forEach((key, i) => {
        if (bruteK > 0 && bruteK < 1) throwKey(key, bruteCurve, bruteK * 1.6 - i * 0.2);
        else if (cowrie > 0 && cowrie < 1) throwKey(key, tryCurve, cowrie * 1.6 - 0.15 - i * 0.2);
        else key.visible = false;
      });
      const kept = Math.floor(clamp01((cowrie - 0.2) / 0.7) * TALLY + 0.0001);
      // The tally and the door share the frame; the door is the subject, so the tally is the quieter of the two.
      tally.forEach((bar, i) => { bar.visible = i < kept; bar.material.opacity = (i < kept ? 0.5 : 0) * (1 - 0.5 * down); });
      const recording = cowrie > 0 ? 0.5 + 0.5 * Math.sin(t * 6) : 0;
      tint(rec.material, 0.2 + 0.8 * recording * (1 - down));
      recGlow.material.opacity = 0.5 * recording * (1 - down) * (palette.lightRoom ? 0.5 : 1);
      // While Cowrie answers, its door is the brightest thing on the house: lit, and pulsing as each try arrives.
      const answering = cowrie > 0 && traced <= 0 ? ease(clamp01(cowrie / 0.15)) : 0;
      tint(door.material, 0.1 + answering * (0.75 + 0.25 * Math.abs(Math.sin(t * 3))));
      doorFrame.material.opacity = 0.9 + 0.1 * answering;

      // The lamps: lit by the scan as it reaches them, flickering at each brute force try on .23, and sending their reports to the
      // Manager while the address is confirmed.
      agentHosts.forEach((h, i) => {
        const seen = scan >= 1 || reach(h) <= furthest ? 1 : 0;
        const flicker = h === probed && bruteK > 0 && bruteK < 1 ? 0.5 + 0.5 * Math.sin(t * 14) : 0;
        // A lit lamp breathes slowly, each on its own beat, so the watched machines read as watching while the reader stops.
        const breath = seen * (0.5 + 0.5 * Math.sin(t * 1.6 + i * 2.1));
        tint(h.lamp.material, 0.2 + 0.55 * seen + 0.2 * breath + 0.4 * flicker);
        h.halo.material.opacity = (0.18 * seen + 0.2 * breath + 0.4 * flicker) * (palette.lightRoom ? 0.5 : 1);
        h.halo.scale.setScalar(13 + 5 * breath + 8 * flicker);
        for (let k = 0; k < SEG; k++) {
          const at = k / SEG;
          const sent = at < ease(traced) ? 1 : 0;
          const flow = 0.5 + 0.5 * Math.sin((at * 3 - t * 0.8) * Math.PI * 2);
          const alpha = sent * (0.3 + 0.4 * flow) * (1 - 0.6 * down);
          for (const e of [0, 1]) reportCol.set([ACCENT.r, ACCENT.g, ACCENT.b, alpha], ((i * SEG + k) * 2 + e) * 4);
        }
      });
      reportGeo.attributes.color.needsUpdate = true;

      // Traced: a light runs back from Cowrie's door to Kali, the agents' reports arrive, and the Manager's window lights.
      trace.visible = traced > 0;
      drawn(trace, ease(clamp01(traced / 0.6)));
      trace.material.opacity = 1 - 0.6 * down;
      const confirm = ease(clamp01((traced - 0.5) / 0.5));
      // Dark until the Manager confirms the address: lit from the start, the window was a bright mass beside the door in the Cowrie
      // shots that meant nothing yet.
      tint(win.material, 0.12 + 0.05 * Math.sin(t * 2.3) + 0.7 * confirm * (1 - 0.4 * down));
      flare.material.opacity = 0.5 * confirm * (1 - down) * (palette.lightRoom ? 0.5 : 1);
      flare.scale.setScalar(40 + 20 * confirm * (1 - down));
      // Kali's terminal: a prompt before the attack, a line more with each beat it types, and the cursor line blinking on the last.
      const typed = 1 + (scan > 0 ? 1 : 0) + (bruteK > 0 ? 1 : 0) + (cowrie > 0 ? 1 : 0) + (block > 0.3 ? 1 : 0);
      const blink = Math.sin(t * 5) > 0 ? 1 : 0.35;
      termLines.forEach((row, i) => {
        row.visible = i < typed;
        row.material.opacity = i === typed - 1 ? 0.95 * blink : 0.6;
      });
      tint(screen.material, 0.12 + 0.12 * (scan > 0 ? 1 : 0) * (1 - 0.5 * down));
      screenGlow.material.opacity = (0.22 + 0.08 * Math.sin(t * 1.3)) * (palette.lightRoom ? 0.5 : 1);

      // Blocked: the arm drops across the line, and Kali's next probes leave and never come back. The hosts go quiet.
      gate.visible = rise > 0.01;
      gate.scale.set(1, Math.max(0.01, rise), 1);
      armPivot.rotation.x = (-Math.PI / 2) * (1 - down);
      tint(arm.material, 0.25 + 0.75 * down);
      const landed = Math.sin(Math.PI * clamp01((block - 0.55) / 0.4));
      cut.visible = landed > 0.01;
      cut.material.opacity = 0.6 * landed * (palette.lightRoom ? 0.5 : 1);
      cut.scale.setScalar(10 + 12 * landed);
      if (block > 0) {
        attempt.visible = true;
        drawn(attempt, 1 - (1 - (1 - GATE_OUT / pathLength - 0.05)) * down);
        attempt.material.opacity = 0.4 * (1 - 0.5 * down);
        lost.forEach((curve, i) => {
          const key = keys[i];
          // Once blocked, Kali keeps trying on the clock, every three seconds, and every try times out: the closing frame is never still.
          const k = block < 1 ? clamp01((block - 0.35 - i * 0.12) / 0.45) : (t / 3 + i / 3) % 1;
          key.visible = k > 0 && k < 1;
          curve.getPoint(0.55 * ease(k), keyAt);
          key.position.copy(keyAt);
          key.material.opacity = 1 - k;
        });
      }
      hosts.forEach((h) => {
        if (h === laptop) return;
        h.base.children[0].material.opacity = 0.55 * (1 - 0.6 * down);
        h.mark.material.opacity = 0.7 * (1 - 0.6 * down);
      });

      // One beat's name at a time, beside what it names; the Pi and Kali are named on arrival and the Pi again at the close.
      const inBeat = (name) => p >= BEATS[name][0] && p < (BEATS[name][1] + 0.03);
      show(kaliPlate, p < BEATS.scan[0]);
      show(scanPlate, inBeat("scan"));
      show(brutePlate, inBeat("brute"));
      show(cowriePlate, inBeat("cowrie"));
      show(tracePlate, inBeat("trace"));
      show(blockPlate, p >= BEATS.block[0]);
      show(piPlate, p < BEATS.scan[0] || p >= BEATS.block[1]);

      // Each plate turns to face the camera, which tours, and keeps the same size of type at every distance: sized for the far shots,
      // the close ones made it 30 to 105px and ran it off the frame.
      if (camera) {
        const screenH = window.innerHeight || 900;
        const viewTan = 2 * Math.tan((camera.fov * Math.PI) / 360);
        for (const plate of plates) {
          if (!plate.visible) continue;
          plate.parent.getWorldQuaternion(facing).invert();
          plate.quaternion.copy(facing).multiply(camera.quaternion);
          plate.getWorldPosition(plateAt);
          const typeAtOne = (plate.userData.typeShare * plate.geometry.parameters.height * SET_SCALE * screenH) / (plateAt.distanceTo(camera.position) * viewTan);
          plate.scale.setScalar(clamp01(TYPE_PX / Math.max(1e-3, typeAtOne)) || 1);
        }
      }
    }
  };
}
