# Play Sign Atlas Pass

## Context

After instancing the life signals, the `/play/` verifier still showed sign-heavy set pieces as a draw-call contributor. The in-world signs each created their own canvas texture/material, which made otherwise similar sign boards impossible to batch.

## Decision

Draw the authored in-world sign panels into one shared canvas atlas and map each sign board to its atlas slot with UVs. Sign posts and board geometry remain in-world and continue to merge through the existing static batching pass.

This keeps the sign content readable while reducing texture/material churn. It does not change public routes, protected car identity, protected FCC/S-block identity, zone ids, Supabase behavior, or portfolio actions.

## Verification

Baseline verifier artifact:

- `.codex-tmp/play-verify-2026-05-29T02-28-20-530Z`
- Desktop medium: 495 render calls, 286286 triangles, 864 objects, 591 meshes
- `SETPIECE_District_Dressing`: 49 meshes/materials before the sign atlas pass
- Mobile low: 242 render calls, 104030 triangles

After sign atlas:

- `.codex-tmp/play-verify-2026-05-29T02-35-03-443Z`
- Desktop medium: 482 render calls, 286290 triangles, 850 objects, 577 meshes, 120.66 FPS, 8.4 ms p95 frame time
- `SETPIECE_District_Dressing`: 37 meshes/materials
- `SETPIECE_Start_Diorama`: 27 meshes/materials
- Mobile low: 242 render calls, 104086 triangles
- Route replay: 39/39 segments passed
- Collider audit: 5/5 probes passed
- Console/page errors: 0

Screenshots inspected:

- `02-start-driving.png`
- `zone-education.png`
- `zone-security.png`
- `zone-contact.png`
- `mobile-start.png`

Full test suite:

- `npm test` passed
- `play:validate-map` passed: 12 road paths, 39 road segments, 16 zones
- `check:site` passed: 12 protected routes, 7 runtime files, and local static references verified

## Remaining Work

The largest measured contributor is still the protected vehicle mesh/material count. The next non-protected world contributors are road batching/material consolidation, security/start set-piece geometry, shoreline bobbing props, and deeper authored art improvements beyond pure draw-call reduction.
