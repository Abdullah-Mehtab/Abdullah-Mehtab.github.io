# Play Static Prop Batching Pass

## Context

The `/play/` verifier profile showed many visible meshes from standalone decorative props. The largest top-level contributors before this pass included `Vehicle`, `unnamed-root`, `SETPIECE_District_Dressing`, and `SETPIECE_Living_Signals`.

## Decision

Batch static, non-colliding decorative props in `play-src/src/world/Props.js` after they are authored. These props are visual dressing only, so grouping them under `PROP_Static_Decor` and merging compatible materials reduces draw calls without changing protected car behavior, protected FCC model identity, zone ids, or public routes.

The verifier now records a scene render profile so future performance work can target measured contributors instead of guessing.

## Verification

Baseline verifier artifact:

- `.codex-tmp/play-verify-2026-05-29T02-13-14-902Z`
- Desktop medium: 589 render calls, 285014 triangles, 928 objects, 688 meshes

After batching:

- `.codex-tmp/play-verify-2026-05-29T02-15-54-867Z`
- Desktop medium: 537 render calls, 286226 triangles, 861 objects, 620 meshes, 120.58 FPS, 8.4 ms p95 frame time
- Mobile low: 241 render calls, 103606 triangles, 18 visible life signals
- Route replay: 39/39 segments passed
- Collider audit: 5/5 probes passed
- Console/page errors: 0

Screenshots inspected:

- `02-start-driving.png`
- `zone-contact.png`
- `zone-potato.png`
- `mobile-start.png`

Full test suite:

- `npm test` passed
- `play:validate-map` passed: 12 road paths, 39 road segments, 16 zones
- `check:site` passed: 12 protected routes, 7 runtime files, and local static references verified

## Remaining Work

The world is still not at the requested final art direction level. The next measured performance targets are vehicle mesh/material count, authored set-piece dressing, shoreline/water composition, and any animated/life props that remain unbatched or overdraw-heavy.
