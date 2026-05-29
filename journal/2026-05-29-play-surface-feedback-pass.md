# /play Surface Feedback Pass

## Decision

The car should not feel detached from the island surface. This checkpoint introduces a small world-to-vehicle surface contract so road, grass, sand, shore, and water can affect grip, engine force, drag, dust color, skid marks, and debug state without replacing the protected Sabre Turbo-style car.

## Implementation Notes

- `World.getSurfaceInfo()` classifies road, grass, sand, shore, and water from road metadata, coastline radius, and water height.
- `Game` now sends the current surface into the vehicle before the physics step.
- `VehicleController` now applies surface multipliers to engine force, top speed, wheel slip, and side friction.
- `Vehicle` now applies surface drag, surface-colored dust/trails, rough-ground rumble, and skips asphalt skid marks on soft surfaces.
- The verifier now asserts that road, grass, sand, shore, and water classifications remain distinct.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed with output `.codex-tmp/play-verify-2026-05-28T23-39-29-753Z`.
- `npm test` passed.

Latest verifier metrics:

- Console/page errors: 0.
- FPS: 120.47; p95 frame: 8.4ms.
- Render calls: 514; triangles: 270,294.
- Gameplay probes passed: handbrake, boost, jump, burnout, wheelie, movement.
- Water probe passed: surface state, splash particles, velocity drag, submerge respawn.
- Surface probe passed: road, grass, sand, shore, and water stayed distinct.
- Mobile canvas rendered.

## Remaining Risk

This pass makes surfaces functional, but the actual driving feel still needs manual tuning over longer route replays. A future pass should add explicit route replay metrics for road-to-grass-to-sand transitions and tune the multipliers against real driving footage.
