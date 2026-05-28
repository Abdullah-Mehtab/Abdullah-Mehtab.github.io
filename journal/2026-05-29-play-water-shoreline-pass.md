# /play Water And Shoreline Pass

## Decision

The water pass should be a measurable system, not only a shader change. This checkpoint adds authored shoreline templates from the Blender polish prop source, runtime bobbing props, splash particles, drag, and submerge respawn while preserving the protected car and FCC assets.

## Implementation Notes

- Extended `play-assets/source/blender/export_polish_props.py` with shoreline buoy, dock float, and wave marker templates.
- Regenerated `play-src/assets/models/world/polish-props.glb`; the built `/play` copy is now 591,068 bytes.
- `Water.js` now applies quality-tier limits for foam, bobbing props, and splash counts.
- `Water.js` now detects shoreline/water state, emits wheel splash particles, damps velocity in water, and respawns after sustained submerge.
- The debug readout now includes the current surface label.
- The browser verifier now probes water behavior directly.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed with output `.codex-tmp/play-verify-2026-05-28T23-25-15-649Z`.
- `npm test` passed.

Latest verifier metrics:

- Console/page errors: 0.
- FPS: 120.68; p95 frame: 8.4ms.
- Render calls: 513; triangles: 261,916.
- Scene objects: 842 total, 627 meshes, 11 lights.
- Gameplay probes passed: handbrake, boost, jump, burnout, wheelie, drift input, movement.
- Water probe passed: surface state, splash particles, velocity drag, submerge respawn.
- Mobile canvas rendered.

## Remaining Risk

This is still not the full final art target. The shoreline is more alive and now mechanically verified, but the island still needs larger authored district modeling, road redesign, camera/game-feel tuning, UI restyling, audio expansion, and draw-call optimization before the full goal can be considered complete.
