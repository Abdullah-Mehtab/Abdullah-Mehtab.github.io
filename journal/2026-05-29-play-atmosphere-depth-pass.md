# /play Atmosphere Depth Pass

## Decision

The sky and horizon need authored depth and motion because the goal is an alive driving world, not a flat game board under a plain backdrop. This checkpoint keeps the existing sky dome and cloud system but adds cheap layered atmosphere elements with quality-tier gates.

## Implementation Notes

- Added tracked sky dome state for verification.
- Added three sun glow layers around the existing sun disk.
- Added three horizon light ribbons around the island/water edge.
- Added instanced cloud shadows projected onto the world surface.
- Added quality gating so low tier keeps one sun glow, one horizon ribbon, and five cloud shadow instances.
- Added `Atmosphere.getStats()` and verifier assertions for atmosphere presence, motion, and mobile reduction.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed with output `.codex-tmp/play-verify-2026-05-29T09-41-07-183Z`.
- `npm test` passed.
- Screenshots reviewed: `01-title.png`, `02-start-driving.png`, and `zone-education.png` from the verifier output directory above.

Latest verifier metrics:

- Console/page errors: 0.
- FPS: 120.48; p95 frame: 8.4ms.
- Render calls: 277; triangles: 183,798.
- Mobile low-tier calls: 219; mobile triangles: 163,574.
- Route replay: 39/39 road segments passed.
- Collider audit: 5/5 static colliders passed.
- Atmosphere probe: sky dome present, sun disk present, 3 sun glows, 3 horizon ribbons, 9 visible medium clouds, 9 cloud shadow instances, motion samples recorded.
- Mobile atmosphere probe: 5 visible clouds, 1 visible sun glow, 1 visible horizon ribbon.

## Remaining Risk

This pass improves first-frame depth and sky motion without touching protected assets, but the sky still depends on simple procedural geometry. A later art pass should tune exact composition after the island layout changes and should keep an eye on high-tier postprocessing cost.
