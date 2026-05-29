# Play Water Wake Pass

## Decision

Add a lightweight instanced wake-ring system to the existing water runtime instead of adding unique mesh instances per tire event.

## Reasoning

- The water pass needed visible feedback when the car drives on the shoreline or into shallow water.
- The current world already uses quality profiles, so wake counts are tiered by low, medium, and high settings.
- Instancing keeps the effect bounded while still allowing repeated rear-wheel wake feedback.

## Implementation Notes

- `play-src/src/world/Water.js` now owns a fixed-capacity wake pool using `THREE.InstancedMesh`.
- Wake counts are capped per quality tier: low 10, medium 26, high 42.
- Shore wakes are clamped outward to the waterline so they do not disappear under the sand.
- `tools/verify-play.mjs` now probes wake spawning, captures a water-interaction screenshot, and fails if no wake activity is observed.

## Verification

- `npm run play:build` passed on 2026-05-29.
- `npm run play:verify` passed on 2026-05-29.
- `npm test` passed on 2026-05-29.

Latest verifier output:

- Output directory: `.codex-tmp/play-verify-2026-05-29T05-36-58-376Z`
- Water wake observed: true
- Wake spawn delta: 8
- Active wakes during probe: 6
- Desktop p95 frame time: 8.4 ms
- Desktop draw calls: 261
- Desktop triangles: 179798
- Mobile quality: low
- Mobile draw calls: 209
- Mobile triangles: 161116
- Route replay: 39/39 passed
- Collider audit failures: 0
- Console messages: 0
- Page errors: 0

## Remaining Risk

The static screenshot shows the shoreline wake, but the effect is still more readable in motion than in a single frame. A later water art pass should improve the water shader, shoreline foam, depth tint, and tire interaction together rather than only increasing wake opacity.
