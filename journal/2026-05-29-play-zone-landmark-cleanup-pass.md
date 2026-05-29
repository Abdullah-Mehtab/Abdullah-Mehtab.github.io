# Play Zone Landmark Cleanup Pass

## Context

`Zones.js` still rendered primitive fallback landmarks for most portfolio zones. Those shapes overlapped with the authored compositions created by `SetPieces.js`, adding duplicate cylinders and boxes that made the world read less finished. The FCC education landmark is the exception: its exact protected model must stay in the zone system because it has a visible protected collider and distance LOD.

## Decision

Keep portfolio interaction zones and rings, but skip non-FCC fallback landmark meshes when a zone is already composed by authored set pieces.

- `play-src/src/world/Zones.js` now treats every non-education zone as externally composed by `SetPieces.js`.
- The FCC/S-block education model still loads through `EnvLandmark_library` and keeps the `VIS_Landmark_education` root for collider auditing.
- Zone stats now report protected, externally composed, and fallback landmark counts.
- `tools/verify-play.mjs` now fails if primitive fallback zone landmarks return.

This does not remove zone ids, actions, triggers, map pins, panels, achievements, or the FCC protected collider.

## Verification

Commands passed:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Final verifier output:

- `.codex-tmp/play-verify-2026-05-29T16-54-15-371Z`

Observed verifier state:

- Zone landmarks: 1 protected, 15 externally composed, 0 fallback.
- No console messages or page errors.
- Route replay: 39/39.
- Collider audit: 5/5.
- Protected FCC LOD: exact model preserved near camera, silhouette used at distance.
- Circuit: 12/12 events, finish true.
- Water, surface feedback, panel UI, map/menu, collectibles, audio, and mobile probes passed.

Performance snapshot:

- Desktop: 309 renderer calls, 297,552 triangles, p95 8.4ms.
- Mobile low tier: 213 renderer calls, 155,390 triangles.
- Scene objects: 1,127 objects, 729 meshes, 11 lights.

Screenshots inspected:

- `06-circuit-target.png`

The inspected circuit screenshot no longer shows the previous large primitive cylinder landmark in the middle of the composition.

## Remaining Risk

This removes one clear amateur visual layer, but it does not by itself finish the Bruno-level art direction. The remaining work is still authored modeling, material polish, lighting composition, road/environment staging, water feel, camera/game-feel tuning, and continued performance guarding.
