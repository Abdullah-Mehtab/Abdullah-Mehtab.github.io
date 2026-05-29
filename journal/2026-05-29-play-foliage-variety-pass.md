# Play Foliage Variety Pass

## Decision

The `/play` world now uses clustered vegetation placement, per-instance foliage color variation, and non-colliding understory patches. The pass keeps the car, FCC/S-block model, route ids, collisions, and static GitHub Pages deployment unchanged.

## Reasoning

The latest screenshots still had a repeated flat-tree look and broad grass fields. The change targets visual authorship without adding gameplay blockers: foliage remains decorative, quality-tiered, and instanced.

## Implementation Notes

- `play-src/src/world/Foliage.js` now clusters grass around scenic zones, colors trees/grass/flowers per instance, adds a gold flower variant, adds low flat understory patches, and spaces trees to prevent overlapping crowns.
- `play-src/src/world/WorldMaterials.js` adds quality-tier budgets for understory patches.
- `tools/verify-play.mjs` records foliage stats and fails if understory/color variation disappears.
- A first attempt used material-level vertex colors on instanced meshes, which made crowns render nearly black in screenshots. The fix keeps `InstancedMesh.setColorAt()` and avoids material `vertexColors` for these generated meshes.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Latest screenshot/metrics directory: `.codex-tmp/play-verify-2026-05-29T13-14-32-520Z`.
- Key metrics from that verifier run: route replay 39/39, collider audit 5/5, no console/page errors, p95 frame time 8.4ms, desktop draw calls 308, mobile low draw calls 246.
- Foliage probe from that run: 111 tree entries, 900 grass entries, 156 understory entries, 108 visible understory patches at medium, 12 tree color variants, 5 grass tones, and 9 flower tones.

## Follow-Up

The world still needs more authored district-specific prop modeling and stronger road/landmark composition. This pass improves vegetation variety but does not complete the full art-direction goal.
