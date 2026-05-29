# /play Landing And Zone Feedback Pass

## Decision

The driving world needs more immediate game-feel response without changing the protected Sabre Turbo-style car identity or FCC/S-block model. This checkpoint adds landing feedback, camera response, procedural impact audio counters, and zone stingers as a small verified step toward the "alive" world target.

## Implementation Notes

- `Vehicle` now tracks airborne time, landing events, landing intensity, and spawns surface-colored landing dust on touchdown.
- `CameraRig` now reacts to recent landing intensity with short shake and FOV response.
- `AudioSystem` now has `impact` and `zoneStinger` counters so muted browser verification can still prove those events fired.
- `Game` now plays a zone stinger the first time the active drivable zone changes after driving starts.
- `tools/verify-play.mjs` now fails if jump/landing feedback, impact counting, or zone stinger counting breaks.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed with output `.codex-tmp/play-verify-2026-05-29T00-56-11-156Z`.
- `npm test` passed.

Latest verifier metrics:

- Console/page errors: 0.
- FPS: 120.6; p95 frame: 8.4ms.
- Render calls: 522; triangles: 284,402.
- Scene objects: 865 total, 636 meshes, 11 lights.
- Gameplay probes passed: keyboard handbrake, boost, jump, landing, impact audio counter, burnout, wheelie, handbrake, movement.
- Landing event count: 1; landing intensity: 1.35.
- Zone stingers counted: 13.
- Mobile canvas rendered.

## Remaining Risk

This pass makes landings and zone changes observable and more alive, but it does not solve the larger art-direction gap by itself. The next high-value work should target route replay/collider validation and stronger authored composition for weak districts, not just adding more feedback particles.
