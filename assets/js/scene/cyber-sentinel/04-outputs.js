// ABOUTME: Act IV's set: the two things Cyber Sentinel actually puts in front of a person.
// ABOUTME: A Kibana dashboard and an HTML email alert, painted into canvases at load and hung in space.
//
// Every other act is infrastructure. This one is the output, because a monitoring system that
// nobody reads has not detected anything. Both panels are drawn with the 2D canvas API at load
// time, which is the only way to get real charts and real type into a WebGL scene without
// shipping an image, and this site self-hosts everything it renders anyway.
import { THREE, clamp01, drift, ease, edgedBox, glow, motes, nameplate, painted, panel, repeated, seeded, solid, thread, wire } from "../kit.js";

const ROWS = [
  ["12:04:18", "5710", "Attempt to login using a non-existent user", "5"],
  ["12:07:52", "5712", "SSHD brute force trying to get access", "10"],
  ["12:11:07", "2001219", "Suricata: aggressive scan detected", "8"],
  ["12:18:44", "31103", "SQL injection attempt", "12"],
  ["12:26:30", "31168", "Shellshock attack detected", "12"]
];

function dashboardTexture(accent, ink, lightRoom) {
  const wash = lightRoom ? "#ffffff" : "#0a1119";
  const line = lightRoom ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)";
  return painted(1024, 640, (g, w, h) => {
    g.fillStyle = wash;
    g.fillRect(0, 0, w, h);
    g.strokeStyle = accent;
    g.lineWidth = 3;
    g.strokeRect(1.5, 1.5, w - 3, h - 3);

    g.fillStyle = accent;
    g.globalAlpha = 0.16;
    g.fillRect(0, 0, w, 56);
    g.globalAlpha = 1;
    g.font = "600 30px Archivo, 'Segoe UI', sans-serif";
    g.textBaseline = "middle";
    g.fillText("Kibana  ·  Cyber Sentinel alerts", 20, 29);
    g.font = "400 22px 'IBM Plex Mono', ui-monospace, monospace";
    g.globalAlpha = 0.65;
    g.fillText("last 24 hours", w - 190, 29);
    g.globalAlpha = 1;

    // Alerts over time, the panel anyone actually looks at first.
    g.strokeStyle = line;
    g.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = 110 + i * 42;
      g.beginPath();
      g.moveTo(24, y);
      g.lineTo(600, y);
      g.stroke();
    }
    g.fillStyle = accent;
    const bars = [34, 52, 28, 74, 96, 61, 40, 88, 120, 70, 44, 58, 33, 91, 66, 38];
    for (let i = 0; i < bars.length; i++) {
      const bh = bars[i] * 1.6;
      g.globalAlpha = 0.35 + (bars[i] / 120) * 0.5;
      g.fillRect(30 + i * 35, 278 - bh, 24, bh);
    }
    g.globalAlpha = 1;
    g.font = "500 20px 'IBM Plex Mono', ui-monospace, monospace";
    g.globalAlpha = 0.7;
    g.fillText("alerts over time", 24, 92);
    g.globalAlpha = 1;

    // Severity ring.
    const cx = 800;
    const cy = 190;
    const slices = [0.42, 0.28, 0.19, 0.11];
    let angle = -Math.PI / 2;
    for (let i = 0; i < slices.length; i++) {
      g.beginPath();
      g.strokeStyle = accent;
      g.globalAlpha = 0.85 - i * 0.18;
      g.lineWidth = 26;
      g.arc(cx, cy, 74, angle, angle + slices[i] * Math.PI * 2);
      g.stroke();
      angle += slices[i] * Math.PI * 2;
    }
    g.globalAlpha = 1;
    g.fillStyle = accent;
    g.textAlign = "center";
    g.font = "600 38px Archivo, 'Segoe UI', sans-serif";
    g.fillText("1,284", cx, cy - 4);
    g.font = "400 20px 'IBM Plex Mono', ui-monospace, monospace";
    g.globalAlpha = 0.65;
    g.fillText("alerts by level", cx, cy + 28);
    g.globalAlpha = 1;
    g.textAlign = "left";

    // The alert table.
    g.globalAlpha = 0.7;
    g.font = "500 20px 'IBM Plex Mono', ui-monospace, monospace";
    g.fillText("time", 30, 330);
    g.fillText("rule", 170, 330);
    g.fillText("description", 290, 330);
    g.fillText("level", 940, 330);
    g.globalAlpha = 1;
    for (let i = 0; i < ROWS.length; i++) {
      const y = 372 + i * 48;
      g.strokeStyle = line;
      g.beginPath();
      g.moveTo(24, y + 18);
      g.lineTo(w - 24, y + 18);
      g.stroke();
      g.fillStyle = accent;
      g.globalAlpha = 0.9;
      g.font = "400 22px 'IBM Plex Mono', ui-monospace, monospace";
      g.fillText(ROWS[i][0], 30, y);
      g.fillText(ROWS[i][1], 170, y);
      g.fillText(ROWS[i][2], 290, y);
      g.globalAlpha = 1;
      g.font = "600 22px 'IBM Plex Mono', ui-monospace, monospace";
      g.fillText(ROWS[i][3], 946, y);
    }
  });
}

function emailTexture(accent, lightRoom) {
  const wash = lightRoom ? "#ffffff" : "#0a1119";
  return painted(768, 900, (g, w, h) => {
    g.fillStyle = wash;
    g.fillRect(0, 0, w, h);
    g.strokeStyle = accent;
    g.lineWidth = 3;
    g.strokeRect(1.5, 1.5, w - 3, h - 3);

    g.fillStyle = accent;
    g.fillRect(0, 0, w, 92);
    g.fillStyle = wash;
    g.font = "600 34px Archivo, 'Segoe UI', sans-serif";
    g.textBaseline = "middle";
    g.fillText("Cyber Sentinel alert", 26, 46);

    g.fillStyle = accent;
    g.globalAlpha = 0.62;
    g.font = "400 24px 'IBM Plex Mono', ui-monospace, monospace";
    g.fillText("from  wazuh@cyber-sentinel.local", 26, 136);
    g.fillText("to    the person on call", 26, 172);
    g.globalAlpha = 1;

    g.globalAlpha = 0.2;
    g.fillRect(26, 200, w - 52, 2);
    g.globalAlpha = 1;

    const fields = [
      ["rule", "5712 · SSHD brute force trying to get access"],
      ["level", "10"],
      ["agent", "pi5-sensor-01"],
      ["source", "192.0.2.44"],
      ["time", "2025-04-19 12:07:52"],
      ["groups", "syslog, sshd, authentication_failures"]
    ];
    let y = 254;
    for (const [key, value] of fields) {
      g.globalAlpha = 0.55;
      g.font = "500 22px 'IBM Plex Mono', ui-monospace, monospace";
      g.fillText(key, 26, y);
      g.globalAlpha = 1;
      g.font = "400 25px 'IBM Plex Mono', ui-monospace, monospace";
      g.fillText(value, 150, y);
      y += 58;
    }

    g.globalAlpha = 0.14;
    g.fillRect(26, y + 4, w - 52, 210);
    g.globalAlpha = 0.85;
    g.font = "400 21px 'IBM Plex Mono', ui-monospace, monospace";
    const body = [
      "Apr 19 12:07:52 pi5-sensor-01 sshd[2281]:",
      "  Failed password for invalid user admin",
      "  from 192.0.2.44 port 51188 ssh2",
      "",
      "8 failed attempts in 42 seconds."
    ];
    for (let i = 0; i < body.length; i++) g.fillText(body[i], 42, y + 44 + i * 34);
    g.globalAlpha = 1;
  });
}

export function buildOutputs(palette) {
  const group = new THREE.Group();
  const accent = palette.accents[3];
  const face = palette.face;
  const random = seeded(59);

  // Screens, not cards. A textured plane floating edge-on in a void is the weakest thing in
  // this vocabulary: it has no thickness, no mount and no reason to be where it is, and it is
  // the one device on the page a reviewer called borrowed rather than built. So each output
  // gets a body with a depth, a bezel its content sits inside, and an arm holding it up from
  // the machine that produces it.
  function display(texture, w, h, depth) {
    const unit = new THREE.Group();
    const shell = edgedBox(w + 4, h + 4, depth, face, accent, 0.85);
    shell.material.transparent = true;
    shell.material.opacity = 0;
    unit.add(shell);
    const glass = panel(texture, w, h, 0);
    glass.position.z = depth / 2 + 0.2;
    unit.add(glass);
    // A stalk down to the floor of the set, so the screen is standing rather than hovering.
    const arm = wire(new THREE.BoxGeometry(1.6, 12, 1.6), accent, 0.5);
    arm.position.y = -h / 2 - 6;
    unit.add(arm);
    unit.userData.glass = glass;
    unit.userData.shell = shell;
    unit.userData.arm = arm;
    return unit;
  }

  // The email sits below the dashboard's right half rather than alongside it.
  //
  // This act has the narrowest art lane on the page: it is the only one whose copy runs to
  // seven of twelve columns, and in two columns at that. Side by side the two screens made the
  // subject 64 world units across and the dashboard, the widest and brightest thing in the
  // chapter, was the left one, so its edge landed across the Outcome heading at three times
  // that heading's edge budget. Stacking them squarely instead made the subject 123 units tall
  // against a frame that is wider than it is high, and the set fell off the top instead.
  const dashboard = display(dashboardTexture("#" + accent.getHexString(), palette.ink, palette.lightRoom), 96, 60, 3.4);
  dashboard.position.set(24, 20, -10);
  dashboard.rotation.y = 0.24;
  group.add(dashboard);

  const email = display(emailTexture("#" + accent.getHexString(), palette.lightRoom), 44, 51, 2.6);
  email.position.set(60, -30, 22);
  email.rotation.y = -0.34;
  group.add(email);

  // Where each screen rests, recorded once so the per-frame sway has something to sway around
  // rather than a second copy of the coordinates.
  for (const unit of [dashboard, email]) unit.userData.home = unit.position.clone();

  // Where both of them come from. Without it the act is two posters; with it, it is the end
  // of the pipeline the previous act flew through.
  const source = edgedBox(18, 15, 14, face, accent, 0.9);
  source.position.set(-18, -28, -30);
  group.add(source);
  const sourceLabel = nameplate("Logstash", "", accent, palette.deep, 32);
  sourceLabel.userData.primary = true;
  sourceLabel.position.set(-18, -14, -30);
  group.add(sourceLabel);

  const feeds = [dashboard, email].map((target, i) => {
    const from = source.position.clone();
    const to = target.position.clone();
    const mid = from.clone().lerp(to, 0.5);
    mid.x += i === 0 ? -22 : 22;
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    const line = thread(curve.getPoints(26), accent, 0);
    group.add(line);
    const bead = glow(accent, 4.5, 0);
    group.add(bead);
    return { line, bead, curve, offset: i * 0.5 };
  });

  // Two full-size documents would fill the whole frame and the copy would be reading through
  // a dashboard. They stay legible as objects at this size, which is all they need to be.
  // Sized so the whole subject fits the lane the copy leaves, at the distance the camera
  // actually reaches. At 0.42 it was 64 units wide and 93 tall, which needs 89 units of
  // standoff to fit; the camera closes to about 55, so the set was cut by the frame at 20 of
  // the depths this act is read at. This act is marked contained because the reader is meant
  // to read what is on its two screens, and a screen half off the frame is not readable.
  group.scale.setScalar(0.3);

  // ——— the operations room ———
  // A back wall and a run of desks, both very dim. Two screens hanging in nothing read as an
  // illustration of screens; two screens on a wall above a desk read as somewhere an alert
  // gets looked at, which is the act's whole point.
  const desks = repeated(new THREE.BoxGeometry(60, 8, 30), [
    [40, -84, -40], [110, -88, -66], [180, -80, -30],
    [-30, -86, -78], [70, -90, -110], [150, -84, -140], [-100, -82, -46]
  ], face, accent, 0.18);
  desks.userData.ambient = true;
  group.add(desks);

  // A desk with nothing on it is a slab. Small monitors and seat backs, one shape each at
  // varying scale, turn the run of slabs into somewhere people sit.
  const posts = repeated(new THREE.BoxGeometry(14, 9, 1.4), [
    [30, -70, -40, 0, 0.2, 0, 1, 1, 1],
    [58, -72, -40, 0, -0.1, 0, 0.8, 0.9, 1],
    [104, -74, -66, 0, 0.3, 0, 1.1, 1, 1],
    [-36, -72, -78, 0, -0.2, 0, 0.9, 1, 1],
    [160, -70, -140, 0, 0.1, 0, 1, 1.1, 1]
  ], face, accent, 0.2);
  posts.userData.ambient = true;
  group.add(posts);

  const seats = repeated(new THREE.BoxGeometry(9, 11, 2), [
    [36, -92, -14, 0, 0.3, 0, 1, 1, 1],
    [112, -94, -40, 0, -0.2, 0, 1, 0.9, 1],
    [-28, -92, -52, 0, 0.15, 0, 0.9, 1, 1]
  ], face, accent, 0.16);
  seats.userData.ambient = true;
  group.add(seats);

  const wallPoints = [];
  for (let i = 0; i < 13; i++) {
    const x = -90 + i * 46;
    wallPoints.push(new THREE.Vector3(x, -110, -150), new THREE.Vector3(x, 110, -150));
  }
  const wall = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(wallPoints),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.12 })
  );
  wall.userData.ambient = true;
  group.add(wall);

  // Envelopes and chart columns, which is what everything upstream finally turns into.
  // Envelopes and chart columns, which is what everything upstream finally turns into, plus a
  // report page. Flat parts only.
  const output = drift([
    new THREE.BoxGeometry(10, 6.5, 0.5),
    new THREE.BoxGeometry(2.4, 12, 2.4),
    new THREE.BoxGeometry(2.4, 7, 2.4),
    new THREE.BoxGeometry(7, 9, 0.5)
  ], 26, accent, palette.lightRoom ? 0.22 : 0.28, 77);
  output.object.userData.ambient = true;
  group.add(output.object);

  const halo = glow(accent, 120, 0);
  halo.userData.ambient = true;
  halo.position.set(0, 0, -70);
  group.add(halo);

  const dust = [];
  for (let i = 0; i < 640; i++) dust.push((random() - 0.5) * 280, (random() - 0.5) * 180, (random() - 0.5) * 200);
  const air = motes(dust, accent, 1.15, 0.3);
  air.userData.ambient = true;
  group.add(air);

  return {
    group,
    // Two screens the reader is meant to read, so they stay whole inside the frame.
    contained: true,
    // How much of this set's offset the camera follows. Low, so the set keeps the right of the
    // frame while the copy keeps the left.
    //
    // This is the only act whose copy sits in two columns beside the set rather than above it,
    // so it has the narrowest art lane on the page. The value was 0.26, then 0.78, then 1, and
    // at every one of them either the dashboard was printed across the Outcome paragraph or
    // the set slid off the frame. Neither was really about this number: the camera was aiming
    // at a point a fixed 150 units ahead, so the aim weakened as it closed, and the offset was
    // measured from an origin that sits 16 units left of the screens. With both of those fixed
    // in the engine, a low value here now means what it says.
    aimFollow: 0.68,
    update(t, p, camera) {
      // Both screens are most of the way in by the time the act arrives. Ramping them from
      // almost nothing left the opening third of this act, which is its establishing view,
      // with nothing established.
      const shown = clamp01(p * 1.5 + 0.55);
      const a = ease(clamp01(shown / 0.45));
      const b = ease(clamp01((shown - 0.3) / 0.45));

      // The screens come on as the reader arrives at them.
      //
      // They were lit at 55% from the first frame of the act, which also means lit through the
      // whole flight toward it, because a station's progress is zero until its act begins. A
      // brightly painted dashboard travelling across the previous act covered nearly half a
      // line of its copy.
      //
      // Driven by this act's own progress. How close the camera is was tried instead and leaves
      // the handoff lit, which is the one moment the dashboard and the paragraph beside it are
      // both at their furthest and land on each other.
      //
      // The shells, arms and feeds keep their own fade, so the set arrives as a built thing
      // whose screens then come on, rather than materialising all at once.
      const lit = ease(clamp01((p - 0.08) / 0.22));

      // A screen's resting place is where it was built, not a second copy of the number here.
      // The two disagreed: the set was moved to fit the lane its copy leaves and this went on
      // putting both screens back where they used to be, every frame, so the set stayed 46
      // units wide when it had been made narrower.
      function show(unit, k, driftX, phase, sway) {
        const home = unit.userData.home;
        unit.visible = k > 0.01;
        unit.scale.setScalar(Math.max(0.001, 0.9 + k * 0.1));
        unit.userData.glass.material.opacity = k * lit;
        unit.userData.shell.material.opacity = k;
        unit.userData.shell.children[0].material.opacity = k * 0.85;
        unit.userData.arm.material.opacity = k * 0.45;
        unit.position.x = home.x + (1 - k) * driftX;
        unit.position.y = home.y + Math.sin(t * 0.42 + phase) * 1.4;
        unit.rotation.y = sway + Math.sin(t * 0.28 + phase) * 0.035;
      }
      show(dashboard, a, -20, 0, 0.24);
      show(email, b, 22, 2, -0.34);

      const sourceIn = ease(clamp01(shown * 3));
      source.scale.setScalar(Math.max(0.001, sourceIn));
      source.rotation.y = t * 0.3;
      sourceLabel.material.opacity = sourceIn * 0.9;
      // Tied to the screens rather than to the source node. It used to come up with the
      // Logstash box, which meant a 190-unit soft glow filled the frame while the only thing
      // inside it was one small monitor: scenery louder than the subject, at the one depth
      // where the act had least to show.
      halo.material.opacity = Math.min(a, b) * (palette.lightRoom ? 0.06 : 0.12);

      for (let i = 0; i < feeds.length; i++) {
        const feed = feeds[i];
        const live = i === 0 ? a : b;
        feed.line.material.opacity = live * 0.4;
        const along = (t * 0.4 + feed.offset) % 1;
        feed.bead.position.copy(feed.curve.getPoint(along));
        feed.bead.material.opacity = live * (0.3 + Math.sin(along * Math.PI) * 0.65);
        feed.bead.scale.setScalar(3 + Math.sin(along * Math.PI) * 2.6);
      }

      air.rotation.y = -t * 0.014;
      output.update(t);
    },
    // Close by pulling back off both panels: the chapter ends on the whole output rather than
    // on a detail of it.
    // Both screens in one view first, then in toward them. This act is also the one where a
    // second column of copy sits beside the set rather than above it, so the camera stays a
    // little further right throughout: the screens belong on the set's own side of the frame
    // and never in the column the "Outcome" paragraph occupies.
    mod: (p) => {
      const settle = ease(clamp01(p / 0.34));
      const enter = ease(clamp01((p - 0.34) / 0.66));
      return {
        dx: -18 - 4 * settle + 22 * enter,
        dy: 10 - 2 * settle - 12 * enter,
        dz: 118 - 6 * settle - 18 * enter,
        df: 0
      };
    }
  };
}
