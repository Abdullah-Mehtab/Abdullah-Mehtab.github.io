# Play Approach Dressing Pass

## Context

The route network and surface-detail passes made the island safer and more readable, but the approach roads still needed stronger authored composition. This pass adds measurable route-side staging without changing the protected car, FCC/S-block model identity, public URLs, zone ids, or deployment model.

## Decision

Add a `SETPIECE_Approach_Dressing` pass in `play-src/src/world/SetPieces.js` that places compact authored clusters along key district approaches. Each cluster combines existing Blender-authored polish assets with route signs, lamp silhouettes, and small road ticks. The clusters are visual-only and do not add colliders.

The verifier now records `approachDressing` stats and fails if the route-side density drops below this checkpoint:

- 12 approach clusters
- 12 signs
- 12 lamps
- 24 authored GLB asset placements
- 36 road ticks

## Verification

Commands run:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Browser verifier artifact:

- `.codex-tmp/play-verify-2026-05-29T04-37-06-427Z/result.json`

Metrics from the verifier:

- Console messages: 0
- Page errors: 0
- Route replay: 39/39 passed
- Desktop p95 frame time: 8.4ms
- Desktop draw calls: 258
- Desktop triangles: 174710
- Mobile low-tier draw calls: 206
- Mobile low-tier triangles: 156284
- Collider audit failures: 0

Screenshots inspected:

- `02-start-driving.png`
- `zone-education.png`
- `zone-security.png`
- `mobile-start.png`

## Remaining Work

The world is still not done against the full Bruno-level goal. The next high-value work is to keep replacing broad empty areas with intentional authored terrain, prop composition, and landmark-specific set pieces while watching the FCC triangle cost and mobile budgets.
