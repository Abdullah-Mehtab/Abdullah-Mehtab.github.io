# Play Road Guidance Marker Pass

## Context

The `/play` road network already uses visual-only spline ribbons, which keeps decorative road geometry from blocking the car. The next gap was readability: roads still needed stronger authored driving language so route direction is visible without relying on HUD text.

## Decision

Add instanced road chevrons and reflector studs generated from `roadPaths` in `play-src/src/world/worldData.js`. The markers are added after road static batching in `play-src/src/world/Roads.js`, so they remain two cheap instanced meshes instead of hundreds of unique meshes.

No new colliders were added. The markers are visual-only.

## Correction During Implementation

The first browser verifier pass succeeded mechanically, but screenshot inspection showed the new markers reading too dark. I corrected the marker geometry/material path by adding explicit white vertex colors before applying instance colors, then reran the full browser verification.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser artifact: `.codex-tmp/play-verify-2026-05-29T02-57-13-964Z`.

Verifier metrics from the accepted run:

- Desktop FPS: 120.67.
- Desktop p95 frame time: 8.4ms.
- Desktop draw calls: 428.
- Desktop triangles: 291894.
- Mobile low draw calls: 183.
- Mobile low triangles: 108542.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console/page errors: 0.
- Road guidance markers: 88 chevrons, 364 reflector studs.

Screenshots inspected:

- `02-start-driving.png`.
- `03-driving-stress.png`.
- `zone-security.png`.
- `mobile-start.png`.

## Follow-Up

This improves route readability, but it is not the full art-direction target. The remaining major work is authored terrain/shoreline modeling, district rebuilds, camera polish, physics tuning, UI integration, audio depth, and broader optimization.
