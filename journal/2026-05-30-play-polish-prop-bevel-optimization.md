# Play Polish Prop Bevel Optimization

## Context

The route composition and district dressing passes increased visual density, but the authored polish prop GLB had become one of the largest world assets. The goal still requires a denser world, but not at the cost of runaway triangles or mobile performance.

## Decision

Reduced the shared cube bevel modifier in `play-assets/source/blender/export_polish_props.py` from 2 segments to 1 segment, then regenerated `play-src/assets/models/world/polish-props.glb` and the built `play/game-assets/polish-props.glb`.

This keeps the authored prop silhouettes and placement model while lowering mesh cost. It does not alter the protected car or FCC/S-block source model.

## Verification

Commands run on 2026-05-30:

- `npm test`
- `npm run play:build`
- `npm run play:verify`

Results:

- `npm test` passed: map validation and site check passed.
- `npm run play:build` passed.
- `npm run play:verify` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T20-03-48-575Z`

Measured verifier metrics after the change:

- `play/game-assets/polish-props.glb`: 2,164,424 bytes.
- Desktop triangles: 232,062.
- Desktop draw calls: 346.
- Desktop p95 frame time: 8.4ms.
- Desktop FPS sample: 120.68.
- Mobile low triangles: 136,918.
- Mobile low draw calls: 230.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console messages: none.
- Page errors: none.

Verifier budgets were tightened so this regression is caught later:

- Desktop triangles must stay at or below 280,000.
- Mobile low triangles must stay at or below 180,000.
- `play/game-assets/polish-props.glb` must stay at or below 2,500,000 bytes.

## Remaining Work

This is not the final `/play` overhaul. The screenshots still show areas that need deeper authored art direction, stronger composition, better district finishing, and further game-feel iteration. This checkpoint only protects performance while preserving the direction of the authored world work.
