# Play Stunt Circuit Composition Pass

## Decision

Replace the stunt yard's weakest flat-pad read with a more authored circuit composition while keeping the existing driveable ramp colliders unchanged.

## Reasoning

- The latest verification screenshots showed the stunt area still had large blank brown pads and scattered-looking props.
- The goal requires authored modeling and visible physical intent, not random procedural clutter.
- The safest next step was to add Blender-source stunt props, non-blocking visual route language, and verifier coverage without increasing invisible collision risk.

## Implementation Notes

- Added three Blender-source templates in `play-assets/source/blender/export_polish_props.py`:
  - `EnvPolishStuntCheckpoint`
  - `EnvPolishStuntScoreTower`
  - `EnvPolishStuntArrowFence`
- Regenerated `play-src/assets/models/world/polish-props.glb` with Blender.
- Updated `play-src/src/world/StuntPark.js` to place authored checkpoint gates, score towers, arrow fences, lane chevrons, and rubber scuffs around the stunt route.
- The only physical stunt colliders remain the existing three ramp colliders. New props are visual-only so they cannot become invisible blockers.
- Updated `tools/verify-play.mjs` to assert stunt asset templates, placements, and composition counts.

## Verification

- `npm run play:build` passed on 2026-05-29.
- `npm run play:verify` passed on 2026-05-29.
- `npm test` passed on 2026-05-29.

Latest verifier output:

- Output directory: `.codex-tmp/play-verify-2026-05-29T09-09-39-388Z`
- Console messages: 0
- Page errors: 0
- Desktop p95 frame time: 8.4 ms
- Desktop draw calls: 261
- Desktop triangles: 179798
- Mobile quality: low
- Mobile draw calls: 209
- Mobile triangles: 161116
- Route replay: 39/39 passed
- Collider audit failures: 0
- Stunt ramps: 3
- Stunt boost pads: 3
- Stunt cones: 12
- Stunt tire stacks: 5
- Stunt landing markers: 6
- Stunt authored asset placements: 7
- Stunt lane chevrons: 19
- Stunt rubber scuffs: 32
- Stunt gates: 2

## Remaining Risk

This improves the stunt district composition, but the full island still needs deeper route, terrain, district, UI, audio, and asset polish before the overall Bruno-level goal is satisfied.
