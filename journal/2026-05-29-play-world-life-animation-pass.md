# /play World Life Animation Pass

## Decision

The route/collider checkpoint made the world safer to drive, but the scene still needed more visible life. This checkpoint adds cheap non-colliding animation layers: foliage wind sway, zone pulses, route banners, whisper beacons, and terminal pulses. The goal is to make the island feel less static without changing the protected Sabre Turbo-style car or FCC/S-block building.

## Implementation Notes

- `Foliage` now rewrites visible tree and grass instance matrices under a low-cost wind sway.
- `SetPieces` now creates a separate `SETPIECE_Living_Signals` group that is not merged into static batches.
- Added 16 zone pulse rings, 10 wind banners, 10 whisper beacons, and 6 terminal pulses.
- Added world-life verifier probes that sample foliage matrices and signal transforms over time.
- The animated signals are visual only and add no colliders.

## Verification

- `npm run play:build` passed.
- First `npm run play:verify` failed because the verifier sampled pulse scale at two times that could read too similarly.
- Adjusted the verifier to sample pulse rotation instead, which is monotonic in the runtime animation.
- `npm run play:verify` passed with output `.codex-tmp/play-verify-2026-05-29T01-45-47-376Z`.
- `npm test` passed.

Latest verifier metrics:

- Console/page errors: 0.
- FPS: 120.6; p95 frame: 8.4ms.
- Render calls: 599; triangles: 285,114.
- Scene objects: 928 total, 688 meshes, 11 lights.
- World-life counts: 16 zone pulses, 10 wind banners, 10 whisper beacons, 6 terminal pulses.
- World-life probes passed: grass wind, banner motion, pulse motion, beacon motion, and motion counter advancement.
- Route replay still passed: 39/39 road segments.
- Collider audit still passed: 5/5 static colliders have visible scene references.

## Remaining Risk

This improves motion and feedback, but it also raised draw calls from the previous checkpoint. The metrics remain well within the desktop p95 target, but later art passes should consolidate repeated animated signals or quality-gate them if mobile performance becomes the bottleneck.
