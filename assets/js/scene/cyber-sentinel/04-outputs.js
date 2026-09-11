// ABOUTME: Act IV's set: the two things Cyber Sentinel actually puts in front of a person.
// ABOUTME: A Kibana dashboard and an HTML email alert, painted into canvases at load and hung in space.
//
// Every other act is infrastructure. This one is the output, because a monitoring system that
// nobody reads has not detected anything. Both panels are drawn with the 2D canvas API at load
// time, which is the only way to get real charts and real type into a WebGL scene without
// shipping an image, and this site self-hosts everything it renders anyway.
import { THREE, clamp01, drift, ease, edgedBox, glow, motes, painted, panel, repeated, seeded, solid, thread, wire } from "../kit.js";

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

  const dashboard = display(dashboardTexture("#" + accent.getHexString(), palette.ink, palette.lightRoom), 96, 60, 3.4);
  dashboard.position.set(16, 12, -10);
  dashboard.rotation.y = 0.24;
  group.add(dashboard);

  const email = display(emailTexture("#" + accent.getHexString(), palette.lightRoom), 44, 51, 2.6);
  email.position.set(52, -26, 22);
  email.rotation.y = -0.34;
  group.add(email);

  // Where both of them come from. Without it the act is two posters; with it, it is the end
  // of the pipeline the previous act flew through.
  const source = edgedBox(18, 15, 14, face, accent, 0.9);
  source.position.set(16, -44, -30);
  group.add(source);
  const sourceLabel = panel(painted(512, 80, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    g.fillStyle = "#" + accent.getHexString();
    g.font = "600 40px Archivo, 'Segoe UI', sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("Logstash", w / 2, h / 2);
  }), 32, 5, 0);
  sourceLabel.userData.caption = "Logstash";
  sourceLabel.userData.primary = true;
  sourceLabel.position.set(16, -30, -30);
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
  group.scale.setScalar(0.5);

  // ——— the operations room ———
  // A back wall and a run of desks, both very dim. Two screens hanging in nothing read as an
  // illustration of screens; two screens on a wall above a desk read as somewhere an alert
  // gets looked at, which is the act's whole point.
  const desks = repeated(new THREE.BoxGeometry(60, 8, 30), [
    [10, -84, -40],
    [80, -88, -66],
    [150, -80, -30]
  ], face, accent, 0.18);
  desks.userData.ambient = true;
  group.add(desks);

  const wallPoints = [];
  for (let i = 0; i < 7; i++) {
    const x = -30 + i * 52;
    wallPoints.push(new THREE.Vector3(x, -110, -150), new THREE.Vector3(x, 110, -150));
  }
  const wall = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(wallPoints),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.12 })
  );
  wall.userData.ambient = true;
  group.add(wall);

  // Envelopes and chart columns, which is what everything upstream finally turns into.
  const output = drift([
    new THREE.BoxGeometry(10, 6.5, 0.5),
    new THREE.BoxGeometry(2.4, 12, 2.4),
    new THREE.BoxGeometry(2.4, 7, 2.4),
    new THREE.CylinderGeometry(4, 4, 0.8, 12)
  ], 12, accent, palette.lightRoom ? 0.22 : 0.28, 77);
  output.object.userData.ambient = true;
  group.add(output.object);

  const halo = glow(accent, 190, 0);
  halo.userData.ambient = true;
  halo.position.set(0, 0, -70);
  group.add(halo);

  const dust = [];
  for (let i = 0; i < 300; i++) dust.push((random() - 0.5) * 280, (random() - 0.5) * 180, (random() - 0.5) * 200);
  const air = motes(dust, accent, 1.15, 0.3);
  air.userData.ambient = true;
  group.add(air);

  return {
    group,
    // Two screens the reader is meant to read, so they stay whole inside the frame.
    contained: true,
    update(t, p) {
      const shown = clamp01(p * 1.6 + 0.36);
      const a = ease(clamp01(shown / 0.45));
      const b = ease(clamp01((shown - 0.3) / 0.45));

      function show(unit, k, baseX, driftX, baseY, phase, sway) {
        unit.visible = k > 0.01;
        unit.scale.setScalar(Math.max(0.001, 0.9 + k * 0.1));
        unit.userData.glass.material.opacity = k;
        unit.userData.shell.material.opacity = k;
        unit.userData.shell.children[0].material.opacity = k * 0.85;
        unit.userData.arm.material.opacity = k * 0.45;
        unit.position.x = baseX + (1 - k) * driftX;
        unit.position.y = baseY + Math.sin(t * 0.42 + phase) * 1.4;
        unit.rotation.y = sway + Math.sin(t * 0.28 + phase) * 0.035;
      }
      show(dashboard, a, 16, -20, 12, 0, 0.24);
      show(email, b, 52, 22, -26, 2, -0.34);

      const sourceIn = ease(clamp01(shown * 3));
      source.scale.setScalar(Math.max(0.001, sourceIn));
      source.rotation.y = t * 0.3;
      sourceLabel.material.opacity = sourceIn * 0.9;
      halo.material.opacity = sourceIn * (palette.lightRoom ? 0.08 : 0.16);

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
    // Forward, all the way through. This move used to increase dz, which walks the camera
    // backwards while the reader scrolls forwards, and that is exactly what it looked like.
    // It now closes in on the dashboard and then drifts between the two screens, which is
    // also why the engine feeds this act its full progress rather than just its hold.
    mod: (p) => {
      const k = ease(p);
      return {
        dx: -8 + 18 * k,
        dy: 12 - 16 * k,
        dz: 92 - 60 * k,
        df: 0
      };
    }
  };
}
