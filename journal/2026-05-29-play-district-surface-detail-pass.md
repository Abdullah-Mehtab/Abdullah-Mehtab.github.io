# Play district surface detail pass

Date: 2026-05-29

## Decision

Broad district ground patches should carry authored surface language instead of reading as large flat pads. This pass keeps the existing district footprints, roads, colliders, car, and FCC model intact, but adds deterministic instanced seam strips, paver slabs, and accent bars to every district footprint.

## Implementation notes

- `Terrain` now creates `ToyIslandSurface_Seams`, `ToyIslandSurface_Pavers`, and `ToyIslandSurface_Accents` instanced meshes.
- `WorldMaterials` owns the surface detail materials so the palette remains part of the shared material system.
- Surface details are visual only. No colliders, route data, zone ids, achievements, or protected assets changed.
- The verifier now records `surfaceDetails` counts and fails if the district surface layer disappears.

## Verification

- First `npm run play:verify` attempt failed because the paver count was only 21 against a 24 minimum. The implementation was adjusted to increase deterministic paver density.
- `npm run play:build` passed after the adjustment.
- `npm run play:verify` passed.
- Latest verification artifact: `.codex-tmp/play-verify-2026-05-29T04-14-28-188Z/result.json`.
- Browser verifier highlights from that run: no console or page errors, route replay 39/39, surface details 10 districts / 45 seams / 31 pavers / 20 accents, p95 frame time 8.4ms, draw calls 235, triangles 141158, mobile low-tier ready.
- `npm test` passed.

## Remaining limitation

This breaks up flat district pads, but it does not finish the road/plaza art direction. The next visual pass should address road edge silhouettes, shoulder transitions, and stronger approach composition around high-priority stops.
