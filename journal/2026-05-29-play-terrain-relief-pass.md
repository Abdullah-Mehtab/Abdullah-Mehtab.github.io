# Play Terrain Relief Pass

## Decision

Add a low-cost scenic terrain relief layer to reduce the flat island read without changing the existing driveable terrain collider.

## Reasoning

- Recent screenshots still showed large flat fields, especially around the first frame and harbor.
- The existing physics setup has one continuous terrain collider plus visible FCC and ramp colliders. That keeps driving stable and avoids invisible blockers.
- A visual-only relief pass can improve island shape, shore detail, and grass/sand break-up while preserving route replay and collider audit safety.

## Implementation Notes

- `play-src/src/world/Terrain.js` now creates `ToyIslandScenicRelief`.
- Added six visual mounds near perimeter grass margins.
- Added six cliff shelf meshes and twelve instanced rock outcrops around the coast.
- Added six dune ridges, forty-eight contour bands, and fifty-seven beach ripples.
- The relief is non-physical and placed away from the main road segments, so no new static colliders were introduced.
- `tools/verify-play.mjs` now records and asserts terrain relief counts.

## Verification

- `npm run play:build` passed on 2026-05-29.
- `npm run play:verify` passed on 2026-05-29.
- `npm test` passed on 2026-05-29.

Latest verifier output:

- Output directory: `.codex-tmp/play-verify-2026-05-29T09-20-23-151Z`
- Console messages: 0
- Page errors: 0
- Desktop p95 frame time: 8.4 ms
- Desktop draw calls: 269
- Desktop triangles: 181446
- Mobile quality: low
- Mobile draw calls: 215
- Mobile triangles: 162694
- Route replay: 39/39 passed
- Collider audit failures: 0
- Terrain mounds: 6
- Cliff shelves: 6
- Rock outcrops: 12
- Dune ridges: 6
- Contour bands: 48
- Beach ripples: 57

## Remaining Risk

This improves the flat-field read, but it does not complete the island rebuild. The road topology, map presentation, district depth, and larger authored terrain forms still need more iteration before the `/play` world reaches the requested quality bar.
