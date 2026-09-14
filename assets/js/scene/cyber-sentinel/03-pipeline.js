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
import { THREE, clamp01, drift, ease, edgedBox, glow, motes, nameplate, painted, panel, repeated, seeded, solid, thread, wire } from "../kit.js";

// z runs away from the camera, so the pipeline is laid out in depth and the reader travels it.
//
// Every node carries a `form` as well as a size, and that is the point of this act. When each
// node was a box, the flow could only be read by reading nine labels, so the moment a label
// was camouflaged against the wireframe behind it the structure stopped making sense. A
// collector, a store, a shipper and a fork do not look alike, and now they do not.
//
// The z spacing is even, near to far, so the graph reads as an ordered sequence rather than a
// cloud. The two branches of the fork are the only nodes that share a depth.
//
// The run used to be 212 units deep, which at this scale is more depth than the frame holds
// from anywhere the camera can stand: a reader got two of the nine names at a time and never
// saw the shape of the flow, only pieces of it. The far half was also outside the distance at
// which a node is named at all, so Filebeat's plate never came up to a readable opacity.
//
// It is 117 deep now, and no wider across than the frame can hold: the fork's two branches were
// 100 units apart, which put one of them outside the frame at every depth the whole flow was
// visible from. The sequence still runs away from the reader and the whole of it is in one
// frame at the act's establishing depth. Depth is what makes this a flow
// rather than a diagram; more of it than the frame can hold makes it neither.
const NODES = {
  // Left of the middle, and clear of the reading column. At -30 its plate straddled the edge of
  // that column at the one depth it is biggest, and the lane fade took it to 0.77 opacity: the
  // room then shows through the ground the words are painted on and it measured 4.43:1 against
  // a 4.5 floor. The same thing, further along the flow, is why Elasticsearch moved.
  agents:   { at: [-14, 15, 51], size: [18, 13, 13], form: "cluster", label: "Agents", sub: "endpoints" },
  suricata: { at: [35, -25, 36], size: [20, 14, 14], form: "sensor", label: "Suricata", sub: "network alerts" },
  manager:  { at: [0, 2, 19], size: [30, 32, 26], form: "rules", label: "Wazuh Manager", sub: "rules, decoders" },
  alerts:   { at: [-11, -18, 2], size: [22, 3, 17], form: "file", label: "alerts.json", sub: "" },
  filebeat: { at: [16, 17, -14], size: [18, 14, 14], form: "shipper", label: "Filebeat", sub: "ships events" },
  // Left of the flow's middle but not out in the reading column. At -22 its plate sat over the
  // words at every depth the camera could see it from, so the lane fade took it to nothing and
  // the one node here that stores anything was never named.
  elastic:  { at: [-6, -10, -31], size: [26, 24, 24], form: "store", label: "Elasticsearch", sub: "index, search" },
  logstash: { at: [16, 8, -47], size: [24, 22, 18], form: "fork", label: "Logstash", sub: "the fork" },
  email:    { at: [-31, 34, -66], size: [26, 18, 4], form: "screen", label: "HTML email alerts", sub: "" },
  kibana:   { at: [40, -21, -66], size: [30, 20, 4], form: "screen", label: "Kibana dashboards", sub: "" }
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
  const beadProbe = new THREE.Vector3();

  // Every nameplate comes from kit.nameplate, which paints a ground behind the words. Without
  // it a label is legible over empty space and invisible over a dense wireframe, which is
  // where most of these end up.
  function plate(text, sub) {
    const made = nameplate(text, sub, accent, palette.deep, 40);
    // Three of the nine name the whole flow, and those are the ones a phone keeps.
    made.userData.primary = text === "Wazuh Manager" || text === "Elasticsearch" || text === "Logstash";
    return made;
  }

  const built = {};
  const order = Object.keys(NODES);
  order.forEach((key, i) => {
    const spec = NODES[key];
    const node = new THREE.Group();
    const [w, h, d] = spec.size;

    // One silhouette per job. A reader should be able to follow the flow with every nameplate
    // covered, which is the test this act kept failing.
    if (spec.form === "cluster") {
      // Several small machines reporting as one: the agents are a group, not a box.
      const units = [[-w * 0.34, h * 0.2, 0], [w * 0.3, h * 0.26, -d * 0.2], [0, -h * 0.24, d * 0.18]];
      node.add(repeated(new THREE.BoxGeometry(w * 0.5, h * 0.42, d * 0.5), units, face, accent, 0.9));
    } else if (spec.form === "sensor") {
      // A tap on the wire: a body with a dish looking out of it.
      node.add(edgedBox(w * 0.7, h * 0.7, d * 0.7, face, accent, 0.95));
      const dish = wire(new THREE.ConeGeometry(w * 0.5, h * 0.7, 14, 1, true), accent, 0.7);
      dish.rotation.x = -Math.PI / 2;
      dish.position.z = d * 0.6;
      node.add(dish);
    } else if (spec.form === "rules") {
      // An ordered stack that events are pushed down through.
      node.add(edgedBox(w * 0.62, h, d * 0.62, face, accent, 0.95));
      for (let i = 0; i < 7; i++) {
        const plate = wire(new THREE.BoxGeometry(w * (0.9 - Math.abs(i - 3) * 0.06), 1, d * 0.8), accent, 0.55);
        plate.position.y = -h * 0.38 + i * (h * 0.76 / 6);
        node.add(plate);
      }
    } else if (spec.form === "file") {
      // A thin slab with lines of text on it, and a folded corner.
      node.add(edgedBox(w, h, d, face, accent, 0.95));
      for (let l = 0; l < 5; l++) {
        const row = solid(new THREE.PlaneGeometry(w * 0.7 - (l % 3) * 3, 0.8), accent, 0.55);
        row.rotation.x = -Math.PI / 2;
        row.position.set(-w * 0.06 + (l % 3), h * 0.6, -d * 0.28 + l * (d * 0.14));
        node.add(row);
      }
    } else if (spec.form === "shipper") {
      // A funnel: wide in, narrow out, pointed the way the data goes.
      const funnel = wire(new THREE.CylinderGeometry(w * 0.5, w * 0.16, d, 12, 1, true), accent, 0.85);
      funnel.rotation.x = Math.PI / 2;
      node.add(funnel);
      node.add(edgedBox(w * 0.3, h * 0.3, d * 0.35, face, accent, 0.9));
    } else if (spec.form === "store") {
      // Stacked indices. A database is a pile of shards, not a shipping crate.
      const stack = new THREE.Group();
      for (let i = 0; i < 6; i++) {
        const r = w * (0.46 - Math.abs(i - 2.5) * 0.025);
        const disc = wire(new THREE.CylinderGeometry(r, r, h * 0.1, 16), accent, 0.6);
        disc.position.y = -h * 0.38 + i * (h * 0.76 / 5);
        stack.add(disc);
      }
      node.add(stack);
      node.userData.cage = stack;
    } else if (spec.form === "fork") {
      // The split itself, built into the node: one trunk, two arms.
      node.add(edgedBox(w * 0.5, h * 0.5, d * 0.6, face, accent, 0.95));
      for (const side of [-1, 1]) {
        const arm = wire(new THREE.BoxGeometry(w * 0.14, h * 0.14, d * 0.9), accent, 0.75);
        arm.position.set(side * w * 0.36, side * h * 0.3, -d * 0.5);
        arm.rotation.y = side * 0.5;
        node.add(arm);
      }
    } else {
      node.add(edgedBox(w, h, d, face, accent, 0.95));
    }

    // The two outputs are screens, not solids: they face the camera and they are lit.
    if (spec.form === "screen") {
      const glass = solid(new THREE.PlaneGeometry(w - 3, h - 3), accent, 0.12);
      glass.position.z = d / 2 + 0.1;
      node.add(glass);
      node.userData.glass = glass;
    }

    const label = plate(spec.label, spec.sub);
    // Staggering was not enough: a flown graph puts nodes behind each other constantly, and
    // two plates six units apart in world space are one plate in screen space at forty units
    // of depth. So a node is named when the camera is near it and unnamed when it is not,
    // which is what a caption is for anyway.
    label.position.set(0, spec.size[1] / 2 + 7 + (i % 2) * 7, 0);
    node.add(label);

    node.position.set(spec.at[0], spec.at[1], spec.at[2]);
    group.add(node);

    // No per-node halo at all. Three of them were a draw call each to put a soft glow behind
    // a node that already reads, and the act is at the draw-call ceiling.
    const halo = null;

    built[key] = { node, label, halo, spec, at: i / order.length };
  });

  // ——— the edges ———
  //
  // All eight in one line buffer and all eight beads in one point buffer, which is two draw
  // calls instead of sixteen. This act is the densest on the page and the whole chapter sits
  // against a hard ceiling of 120 draw calls a frame; bringing the flow's nodes close enough
  // together to read as a sequence put more of them on screen at once and took it over.
  //
  // What that costs: the edges come up together rather than one after another. The nodes still
  // arrive in order, which is what carries the sense of the flow being drawn, and an edge
  // cannot precede the node it leaves anyway.
  const edgePoints = [];
  const paths = EDGES.map(([fromKey, toKey], i) => {
    const from = new THREE.Vector3(...NODES[fromKey].at);
    const to = new THREE.Vector3(...NODES[toKey].at);
    const mid = from.clone().lerp(to, 0.5);
    // Bowing the two fork branches apart is what makes the fork legible from inside it.
    mid.x += (to.x - from.x) * 0.18;
    mid.y += 6 + (fromKey === "logstash" ? (toKey === "email" ? 10 : -10) : 0);
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    const along = curve.getPoints(30);
    for (let p = 0; p < along.length - 1; p++) edgePoints.push(along[p], along[p + 1]);
    return { curve, offset: random(), at: i / EDGES.length };
  });

  const edges = new THREE.LineSegments(
    new THREE.BufferGeometry().setFromPoints(edgePoints),
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0, depthWrite: false })
  );
  group.add(edges);

  const beadPositions = new Float32Array(EDGES.length * 3);
  const beads = motes(Array.from(beadPositions), accent, 5.5, 0);
  beads.geometry.setAttribute("position", new THREE.BufferAttribute(beadPositions, 3));
  // Same reason as the swarm in act two: an exact bounding sphere per frame is a second pass
  // over every point for a frustum test on something that is always in shot.
  beads.geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 160);
  beads.frustumCulled = false;
  group.add(beads);

  // ——— conduit ———
  // Long runs of trunking either side of the flight path. They are what gives the fly-through
  // its speed: the nodes are ahead and barely move, and these stream past the frame edges.
  const conduit = [];
  // Further out, so they frame the graph instead of crossing it.
  for (let i = 0; i < 7; i++) {
    conduit.push([76 + (i % 3) * 40, -66 + (i % 4) * 48, 46 - i * 46, 0, 0, 0]);
  }
  // Round, not rectangular. They are conduit runs, and a square girder is a different object
  // with a different job.
  const pipe = new THREE.CylinderGeometry(2.2, 2.2, 150, 8, 1, true);
  pipe.rotateX(Math.PI / 2);
  // Dimmer and thinner than the graph. These were the brightest, longest objects in the act
  // and the eye followed them instead of the flow: scenery has to sit behind the subject, not
  // in front of it.
  const trunking = repeated(pipe, conduit, face, accent, 0.1);
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
    new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.13 })
  );
  flanges.userData.ambient = true;
  group.add(flanges);

  group.scale.setScalar(0.62);

  // Records in transit: log lines, index shards, couplings. The things that are actually
  // moving through a pipeline, rather than scenery that could belong to any page.
  // Records in transit: a log line, a document, an index page, a batch. All flat, because a
  // wireframe cylinder in the air is a hexagonal prism and belongs to somebody else's page.
  const cargo = drift([
    new THREE.BoxGeometry(12, 1.1, 0.5),
    new THREE.BoxGeometry(8, 8, 0.6),
    new THREE.BoxGeometry(6, 7, 0.5),
    new THREE.BoxGeometry(10, 0.8, 4)
  ], 26, accent, palette.lightRoom ? 0.22 : 0.28, 63);
  cargo.object.userData.ambient = true;
  group.add(cargo.object);

  const dust = [];
  for (let i = 0; i < 860; i++) dust.push((random() - 0.5) * 260, (random() - 0.5) * 170, 140 - random() * 340);
  const air = motes(dust, accent, 1.2, 0.32);
  air.userData.ambient = true;
  group.add(air);

  return {
    group,
    // This act is a sequence, so a reader has to be able to see most of it at once. Nine nodes
    // strung out over more depth than the frame holds is nine details, not a flow.
    partsTogether: 0.7,
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
        // Named out to about two hundred and fifty units, gone by three hundred and fifty. It
        // was fifty and a hundred and forty, which named at most three nodes at a time: that is
        // right for a graph the reader is inside and wrong for one they are looking at. The far
        // end of this flow sits around a hundred and sixty units out at the establishing depth,
        // and at the old falloff its plates never came above half opacity, which means the room
        // showing through the ground they are painted on. Two plates landing on each other is handled
        // where it can be handled, in the engine, which hides the further of any two that
        // overlap on screen.
        let near = 1;
        if (camera) {
          item.node.getWorldPosition(probe);
          const range = probe.distanceTo(camera.position);
          near = clamp01(1.8 - Math.max(0, range - 90) / 200);
        }
        // Fully opaque, not 0.95. These plates are painted with a ground that is solid through
        // the middle precisely so the node behind cannot show through the words, and five per
        // cent of a node's own lit wireframe is enough to undo it: "Agents" sits on its own
        // cluster and read 4.42:1 against a 4.5 floor at the one depth it is biggest.
        item.label.material.opacity = k * near;
        if (item.halo) item.halo.material.opacity = k * 0.16 * (0.85 + Math.sin(t * 1.3 + item.at * 9) * 0.15);

        if (item.node.userData.cage) item.node.userData.cage.rotation.y = t * 0.2;
        if (item.node.userData.glass) {
          item.node.userData.glass.material.opacity = 0.1 + k * 0.16 + Math.sin(t * 2 + item.at * 4) * 0.03;
        }
      }

      // One opacity for the whole edge buffer, taken from the last edge to arrive, so the flow
      // is not drawn before the nodes it joins.
      const edgesIn = ease(clamp01((drawn - 0.8) / 0.16));
      edges.material.opacity = edgesIn * 0.42;
      beads.material.opacity = edgesIn * 0.75;
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const along = (t * 0.3 + path.offset + i * 0.13) % 1;
        path.curve.getPoint(along, beadProbe);
        beadPositions[i * 3] = beadProbe.x;
        beadPositions[i * 3 + 1] = beadProbe.y;
        beadPositions[i * 3 + 2] = beadProbe.z;
      }
      beads.geometry.attributes.position.needsUpdate = true;

      air.rotation.z = t * 0.01;
      cargo.update(t);
    },
    // Establish, then lean in. The flight through the graph is the track's job, not this one's.
    //
    // The camera used to start moving on the first frame of the act and cover 150 units before
    // the reader had seen what the graph was, so it read as clutter going past. It now holds
    // back far enough to take the whole flow in one view for the first third, and only then
    // descends into it. Nothing about the geometry changed to fix that; where the camera
    // stands while a reader is reading is the fix.
    //
    // The closing move was 144 units, which was most of the way through a graph 264 deep. Once
    // the engine docked every set at one reading distance, that sweep put the camera inside
    // this one by a third of the way through the act, and the remaining two thirds were an
    // empty room: measured 17.5% of the frame carrying something at 35%, then 0.8% at 70%.
    // The flight to act four already travels the whole graph, so the hold only has to lean in.
    mod: (p) => {
      const settle = ease(clamp01(p / 0.34));
      const enter = ease(clamp01((p - 0.34) / 0.66));
      return {
        dx: -6 - 8 * settle + 22 * enter,
        dy: 30 - 6 * settle - 26 * enter,
        dz: 210 - 14 * settle - 38 * enter,
        df: -6 + 4 * settle + 8 * enter
      };
    }
  };
}
