# Play District Batching Rejected

## Finding

Tested increasing `SETPIECE_District_Dressing` static batching cell size from 128 to 192 to reduce the render-profile hotspot.

The hypothesis was that fewer merged batches would reduce draw calls without materially increasing rendered triangles.

## Result

- `npm run play:build` passed.
- `npm run play:verify` passed.
- Verifier output: `.codex-tmp/play-verify-2026-05-29T21-09-40-110Z`.
- District dressing meshes dropped from 163 to 126.
- Total draw calls did not improve: 348 before and 348 after.
- Rendered triangles increased from 237106 to 244846.
- Average FPS dropped from 106.35 to 76.95 in that verifier run.
- Mobile low-tier triangles increased from 141944 to 148988 while calls only dropped from 232 to 231.

## Decision

Rejected the change and restored the 128-unit cell size. Bigger district cells reduce object count but weaken culling enough that the measured runtime result is worse.
