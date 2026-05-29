# Play Camera Occlusion Pass

## Context

The `/play` follow camera already reacts to speed, boost, burnout, wheelie, and landing, but it did not avoid visible static landmarks. That is a game-feel and polish gap because the protected FCC/S-block building is large enough to block the camera during close driving.

## Decision

Add follow-camera occlusion handling in `play-src/src/player/CameraRig.js`. The camera now casts from the look target toward the desired follow position and pulls closer when an auditable static collider blocks the view.

`play-src/src/physics/PhysicsWorld.js` now exposes `castStaticCameraRay()`, which checks the same recorded static collider data used by the debug overlay and collider audit. Trimesh terrain colliders are intentionally ignored for this camera query so the ground plane does not constantly collapse the follow camera.

## Correction During Implementation

The first implementation attempted to use Rapier `world.castRay()` directly, but the verifier probe missed the FCC collider. I replaced the verification path with deterministic ray intersections over recorded static collider data. This keeps camera avoidance tied to explicit, auditable collider records and avoids relying on unclear query-filter behavior.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser artifact: `.codex-tmp/play-verify-2026-05-29T03-22-19-374Z`.

Accepted verifier metrics:

- Desktop FPS: 120.71.
- Desktop p95 frame time: 8.4ms.
- Desktop draw calls: 433.
- Desktop triangles: 315798.
- Mobile low draw calls: 187.
- Mobile low triangles: 128606.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console/page errors: 0.
- Camera occlusion probe: desired 32.39m, resolved 7.23m, hit distance 8.28m.

Screenshots inspected:

- `02-start-driving.png`.
- `03-driving-stress.png`.
- `zone-education.png`.
- `mobile-start.png`.

## Follow-Up

This handles static landmark occlusion for the follow camera. A future pass should add camera-side avoidance against authored district props once those props become physical, and tune cinematic zone camera paths separately.
