## Context

The `/play` route still needs more authored road-edge composition. Previous culling work kept the frame budget healthy, so the next art pass needed to add visible staging without broadening culling radii or adding colliders.

## Decision

Add `EnvPolishRouteVistaKit` to the Blender polish prop source and place six instances along key routes through the existing route composition group.

The asset is a small roadside curb/sign/marker cluster with warm stone, screen glow, bollards, reeds, blossoms, and pebbles. It is authored in `play-assets/source/blender/export_polish_props.py`, exported into the polish prop GLB, placed by `SetPieces.createRouteComposition()`, and then static-batched/celled with the rest of the route composition layer.

The kit has no collider. It is visual staging only, so it cannot introduce invisible blockers.

## Verification

Commands:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Verifier output:

- Output folder: `.codex-tmp/play-verify-2026-05-30T04-00-17-552Z`
- Console errors: 0
- Page errors: 0
- Polish prop GLB: 2,269,144 bytes
- Desktop FPS: 120.46
- Desktop p95 frame: 8.4 ms
- Desktop calls/triangles: 369 / 224602
- Mobile low calls/triangles: 229 / 132336
- Route replay: 39 / 39 passed
- Collider audit: 5 / 5 passed
- Route vista kits: 6 placed
- Route composition authored assets: 48

Screens inspected:

- `02-start-driving.png`
- `05-surface-feedback.png`
- `zone-education.png`
- `mobile-start.png`

## Notes

The first Blender rebuild attempt timed out after modifying unrelated generated GLBs. Those unrelated generated files were reverted, and only the intended polish prop source/GLB changes were kept.

This checkpoint adds an authored route kit and proves it stays within current budgets. It does not finish the larger terrain/road/island redesign; the next pass should focus on more substantial terrain shape and road hierarchy work rather than only adding decorative kits.
