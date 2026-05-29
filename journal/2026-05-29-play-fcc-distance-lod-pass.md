# Play FCC Distance LOD Pass

## Context

The FCC/S-block model is protected and must remain exact near the car. The browser verifier from the approach-dressing pass showed the visible FCC landmark bucket at about 139k triangles when rendered from distance. That is a measured performance/art risk because the model can dominate the scene even when it is only a background silhouette.

## Decision

Add a protected landmark display path for FCC in `play-src/src/world/Zones.js`:

- Keep the exact merged FCC asset as the near-field render.
- Add a low-triangle silhouette for distance views.
- Switch by vehicle distance with hysteresis: exact below 58m, silhouette above 70m.
- Keep the same visual root name, `VIS_Landmark_education`, so the existing protected collider remains auditable.
- Do not add new colliders.

The silhouette is only a distance stand-in. The exact FCC model remains the required near-field identity.

## Verification

Commands run:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Browser verifier artifact:

- `.codex-tmp/play-verify-2026-05-29T04-44-20-105Z/result.json`

Verifier results:

- Console messages: 0
- Page errors: 0
- Route replay: 39/39 passed
- Desktop p95 frame time: 8.4ms
- Desktop draw calls: 258
- Collider audit failures: 0
- FCC far mode: silhouette
- FCC near mode: exact
- FCC exact model triangles: 139068
- FCC silhouette triangles: 804
- Visible `ZONE_education_FCC_Education_Grove` render-profile bucket from landing metrics: 812 triangles

Screenshots inspected:

- `02-start-driving.png`
- `zone-education.png`
- `mobile-start.png`

## Remaining Work

The total world still needs broader art-direction completion. This pass addresses one specific measured risk: keeping the protected FCC model exact near-field while avoiding paying the full triangle cost in distant background views.
