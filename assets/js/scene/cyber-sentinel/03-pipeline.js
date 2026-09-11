// ABOUTME: Act III's set: Cyber Sentinel's real data flow, laid out in depth and flown through.
// ABOUTME: Every node and every edge is taken from the project's own repository, including the fork at Logstash.
//
// The flow, verbatim from the project:
//   Agents -> Wazuh Manager -> alerts.json -> Filebeat -> Elasticsearch
//   Suricata -> network alerts -> Wazuh Manager
//   Logstash -> HTML email alerts + Kibana dashboards
//
// So it is drawn as a real graph with a real fork, not as a row of boxes. The camera enters at
// the agents and comes out past the fork, which is why this act is the one worth flying.
import { THREE, clamp01, ease, edgedBox, glow, motes, painted, panel, repeated, seeded, solid, thread, wire } from "../kit.js";

// z runs away from the camera, so the pipeline is laid out in depth and the reader travels it.
const NODES = {
  agents: { at: [-26, 10, 86], size: [16, 12, 12], label: "Agents", sub: "endpoints" },
  suricata: { at: [34, -20, 64], size: [20, 14, 14], label: "Suricata", sub: "network alerts" },
  manager: { at: [0, 2, 30], size: [30, 30, 26], label: "Wazuh Manager", sub: "rules, decoders" },
  alerts: { at: [-6, -12, 2], size: [22, 2, 16], label: "alerts.json", sub: "" },
  filebeat: { at: [10, 12, -24], size: [18, 14, 14], label: "Filebeat", sub: "ships events" },
  elastic: { at: [-18, -8, -52], size: [26, 24, 22], label: "Elasticsearch", sub: "index, search" },
  logstash: { at: [12, 6, -80], size: [24, 20, 18], label: "Logstash", sub: "the fork" },
  email: { at: [-34, 30, -114], size: [26, 18, 4], label: "HTML email alerts", sub: "" },
  kibana: { at: [44, -18, -114], size: [30, 20, 4], label: "Kibana dashboards", sub: "" }
};

const EDGES = [
  ["agents", "manager"],
  ["suricata", "manager"],
  ["manager", "alerts"],
  ["alerts", "filebeat"],
  ["filebeat", "elastic"],
  ["elastic", "logstash"],
  ["logstash", "email"],
  ["logstash", "kibana"]
];

export function buildPipeline(palette) {
  const group = new THREE.Group();
  const accent = palette.accents[2];
  const face = palette.face;
  const random = seeded(41);
  const probe = new THREE.Vector3();

  function nameplate(text, sub) {
    const plate = panel(painted(640, 128, (g, w, h) => {
      g.clearRect(0, 0, w, h);
      g.fillStyle = "#" + accent.getHexString();
      g.textBaseline = "middle";
      g.textAlign = "center";
      g.font = "600 46px Archivo, 'Segoe UI', sans-serif";
      g.fillText(text, w / 2, sub ? 48 : h / 2);
      if (sub) {
        g.globalAlpha = 0.6;
        g.font = "400 30px 'IBM Plex Mono', ui-monospace, monospace";
        g.fillText(sub, w / 2, 96);
        g.globalAlpha = 1;
      }
    }), 40, 8, 0);
    plate.userData.caption = text;
    // Three of the nine nodes name the whole flow, and those are the ones a phone keeps.
    plate.userData.primary = text === "Wazuh Manager" || text === "Elasticsearch" || text === "Logstash";
    return plate;
  }

  // Stretched in depth. Nine nodes within eighty units read as one oblique plane rather than
  // a space, because nothing near is much bigger on screen than anything far.
  const DEPTH_STRETCH = 1.35;

  const built = {};
  const order = Object.keys(NODES);
  order.forEach((key, i) => {
    const spec = NODES[key];
    const node = new THREE.Group();
    const body = edgedBox(spec.size[0], spec.size[1], spec.size[2], face, accent, 0.95);
    node.add(body);

    // Elasticsearch is a stack of indices and the manager is a stack of rules, so both are
    // built as stacked plates rather than as a faceted polyhedron. The polyhedron is the
    // reference site's own device, and it is a benchmark, never a source.
    if (key === "elastic" || key === "manager") {
      const stack = new THREE.Group();
      const count = key === "elastic" ? 7 : 9;
      for (let l = 0; l < count; l++) {
        const radius = spec.size[0] * (key === "elastic" ? 0.5 - Math.abs(l - (count - 1) / 2) * 0.03 : 0.42);
        const disc = wire(
          key === "elastic"
            ? new THREE.CylinderGeometry(radius, radius, 0.9, 14)
            : new THREE.BoxGeometry(radius * 2, 0.9, radius * 2),
          accent,
          0.45
        );
        disc.position.y = -spec.size[1] * 0.36 + l * (spec.size[1] * 0.72 / (count - 1));
        stack.add(disc);
      }
      node.add(stack);
      node.userData.cage = stack;
    }
    // The two outputs are screens, not solids: they face the camera and they are lit.
    if (key === "email" || key === "kibana") {
      const glass = solid(new THREE.PlaneGeometry(spec.size[0] - 3, spec.size[1] - 3), accent, 0.12);
      glass.position.z = spec.size[2] / 2 + 0.1;
      node.add(glass);
      node.userData.glass = glass;
    }
    if (key === "alerts") {
      // A file, drawn as a thin slab with lines of text on it.
      const lines = new THREE.Group();
      for (let l = 0; l < 5; l++) {
        const row = solid(new THREE.PlaneGeometry(14 - (l % 3) * 3, 0.7), accent, 0.5);
        row.rotation.x = -Math.PI / 2;
        row.position.set(-2 + (l % 3), 1.2, -5 + l * 2.4);
        lines.add(row);
      }
      node.add(lines);
    }

    const label = nameplate(spec.label, spec.sub);
    // Staggering was not enough: a flown graph puts nodes behind each other constantly, and
    // two plates six units apart in world space are one plate in screen space at forty units
    // of depth. So a node is named when the camera is near it and unnamed when it is not,
    // which is what a caption is for anyway.
    label.position.set(0, spec.size[1] / 2 + 7 + (i % 2) * 7, 0);
    node.add(label);

    node.position.set(spec.at[0], spec.at[1], spec.at[2] * DEPTH_STRETCH);
    group.add(node);

    // Only the three nodes that hold something get a halo. Nine of them lit the whole set
    // evenly and cost nine draw calls to say nothing about which parts matter.
    let halo = null;
    if (key === "manager" || key === "elastic" || key === "logstash") {
      halo = glow(accent, spec.size[0] * 2.4, 0);
      halo.userData.ambient = true;
      halo.position.copy(node.position);
      group.add(halo);
    }

    built[key] = { node, label, halo, spec, at: i / order.length };
  });

  // ——— the edges ———
  const paths = EDGES.map(([fromKey, toKey], i) => {
    const from = new THREE.Vector3(NODES[fromKey].at[0], NODES[fromKey].at[1], NODES[fromKey].at[2] * DEPTH_STRETCH);
    const to = new THREE.Vector3(NODES[toKey].at[0], NODES[toKey].at[1], NODES[toKey].at[2] * DEPTH_STRETCH);
    const mid = from.clone().lerp(to, 0.5);
    // Bowing the two fork branches apart is what makes the fork legible from inside it.
    mid.x += (to.x - from.x) * 0.18;
    mid.y += 6 + (fromKey === "logstash" ? (toKey === "email" ? 10 : -10) : 0);
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    const line = thread(curve.getPoints(30), accent, 0);
    group.add(line);

    const beads = [];
    for (let b = 0; b < 1; b++) {
      const bead = glow(accent, 4, 0);
      group.add(bead);
      beads.push({ bead, offset: random() });
    }
    return { line, beads, curve, at: i / EDGES.length };
  });

  // ——— conduit ———
  // Long runs of trunking either side of the flight path. They are what gives the fly-through
  // its speed: the nodes are ahead and barely move, and these stream past the frame edges.
  const conduit = [];
  for (let i = 0; i < 5; i++) {
    conduit.push([54 + (i % 3) * 40, -46 + (i % 3) * 52, 40 - i * 56, 0, 0, 0]);
  }
  // Round, not rectangular. They are conduit runs, and a square girder is a different object
  // with a different job.
  const pipe = new THREE.CylinderGeometry(3.6, 3.6, 150, 10, 1, true);
  pipe.rotateX(Math.PI / 2);
  const trunking = repeated(pipe, conduit, face, accent, 0.2);
  trunking.userData.ambient = true;
  group.add(trunking);

  // Flanges at intervals down each run. A bare cylinder is a tube; a tube with joints in it
  // is conduit, and the joints are also what give the fly-through something to count off.
  const flangePoints = [];
  for (const [cx, cy, cz] of conduit) {
    for (let f = -2; f <= 2; f++) {
      const z = cz + f * 30;
      for (let a = 0; a < 10; a++) {
        const a0 = (a / 10) * Math.PI * 2;
        const a1 = ((a + 1) / 10) * Math.PI * 2;
        flangePoints.push(
          new THREE.Vector3(cx + Math.cos(a0) * 4.6, cy + Math.sin(a0) * 4.6, z),
          new THREE.Vector3(cx + Math.cos(a1) * 4.6, cy + Math.sin(a1) * 4.6, z)
        );
      }
    }
  }
  const flanges = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(flangePoints),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.26 })
  );
  flanges.userData.ambient = true;
  group.add(flanges);

  group.scale.setScalar(0.42);

  const dust = [];
  for (let i = 0; i < 420; i++) dust.push((random() - 0.5) * 260, (random() - 0.5) * 170, 140 - random() * 340);
  const air = motes(dust, accent, 1.2, 0.32);
  air.userData.ambient = true;
  group.add(air);

  return {
    group,
    update(t, p, camera) {
      // The graph draws itself from the agents forward, so the reader watches the flow being
      // laid down in the direction it actually flows.
      // Already most of a graph when the act arrives. An act whose opening frame is two boxes
      // in fog is a frame with nothing composed in it, which is the single most common finding
      // against the previous version of this page.
      const drawn = clamp01(p * 1.5 + 0.44);

      for (const key of order) {
        const item = built[key];
        const k = ease(clamp01((drawn - item.at * 0.8) / 0.18));
        item.node.visible = k > 0.01;
        item.node.scale.setScalar(Math.max(0.001, k));
        // Named within about fifty units, gone by a hundred and forty. At most three nodes
        // carry a name at once, so no two plates can be read on top of each other.
        let near = 1;
        if (camera) {
          item.node.getWorldPosition(probe);
          const range = probe.distanceTo(camera.position);
          near = clamp01(1.35 - Math.max(0, range - 52) / 88);
        }
        item.label.material.opacity = k * 0.95 * near;
        if (item.halo) item.halo.material.opacity = k * 0.16 * (0.85 + Math.sin(t * 1.3 + item.at * 9) * 0.15);

        if (item.node.userData.cage) item.node.userData.cage.rotation.y = t * 0.2;
        if (item.node.userData.glass) {
          item.node.userData.glass.material.opacity = 0.1 + k * 0.16 + Math.sin(t * 2 + item.at * 4) * 0.03;
        }
      }

      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const k = ease(clamp01((drawn - path.at * 0.8) / 0.16));
        path.line.material.opacity = k * 0.42;
        for (const { bead, offset } of path.beads) {
          const along = (t * 0.3 + offset + i * 0.13) % 1;
          bead.position.copy(path.curve.getPoint(along));
          bead.material.opacity = k * (0.35 + Math.sin(along * Math.PI) * 0.6);
          bead.scale.setScalar(2.5 + Math.sin(along * Math.PI) * 2.5);
        }
      }

      air.rotation.z = t * 0.01;
    },
    // The signature shot. The camera starts above and behind the agents and ends past the
    // fork, so the reader is inside the pipeline rather than looking at a diagram of it.
    // The signature shot. The camera starts behind and above the agents and ends between the
    // two branches of the fork, so the reader is inside the pipeline looking at where it
    // splits. It must not overshoot: the whole graph is 200 units deep once scaled, and a
    // longer move leaves the camera in empty space with the set behind it.
    mod: (p) => {
      const k = ease(p);
      // Into the graph, not through and out of it. The whole thing is 84 units deep once
      // scaled, so a move that ends past the manager leaves the camera four units from a
      // twelve-unit box and the act renders as one wireframe filling the frame.
      return {
        dx: -10 + 12 * k,
        dy: 16 - 18 * k,
        dz: 76 - 92 * k,
        df: -4 + 8 * k
      };
    }
  };
}
