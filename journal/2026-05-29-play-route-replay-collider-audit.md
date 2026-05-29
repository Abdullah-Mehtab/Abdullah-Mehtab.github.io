# /play Route Replay And Collider Audit

## Decision

The owner reported invisible assets interrupting car movement, and the goal requires route replay plus collision checks. This checkpoint turns that concern into an automated browser gate: every authored road segment gets a short physical replay, and every static collider must have a debug name plus a visible scene object reference.

## Implementation Notes

- Added `visualName` metadata to recorded static collider debug data.
- Named the terrain collider, protected FCC/S-block collider, and stunt ramp colliders.
- Linked each physical collider to visible geometry:
  - `ToyIslandTerrainCollider` -> `ToyIslandGrassPlateau`
  - `ZONE_education_protected_landmark_collider` -> `VIS_Landmark_education`
  - each stunt ramp collider -> its matching visible ramp mesh
- Extended `npm run play:verify` with a route replay that respawns and launches the car through all authored road segments.
- Extended `npm run play:verify` with a collider audit that fails on generic collider names or colliders without visible geometry.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed with output `.codex-tmp/play-verify-2026-05-29T01-13-37-436Z`.
- `npm test` passed.

Latest verifier metrics:

- Console/page errors: 0.
- FPS: 120.55; p95 frame: 8.4ms.
- Render calls: 526; triangles: 284,470.
- Route replay: 39/39 road segments passed; minimum segment movement was 3.13m; minimum Y was 0.94.
- Collider audit: 5/5 static colliders passed with visible scene references.
- Gameplay, water, surface, authored district asset, mobile, and zone-count probes passed.

## Remaining Risk

The replay is a targeted automated probe, not a full human playtest. It proves the current road centerlines do not have obvious invisible blockers under short impulse travel. It does not prove every off-road shortcut, stunt line, or high-speed collision edge is finished. A later pass should add longer circuit replay and human-driven screenshot review after the next visual composition changes.
