# /play Circuit Objective Pass

## Decision

Make the circuit route a verified micro-objective instead of only a visible map/start-gate concept. The circuit now has authored checkpoint trail dressing, animated target markers, finish state, a finish achievement, and browser verification for completing the full checkpoint sequence.

## Implementation

- Added an authored checkpoint trail in `play-src/src/world/StuntPark.js` using the existing `EnvPolishStuntCheckpoint` Blender-authored asset from the polish props pack.
- Added instanced active target rings and arrows for all 12 circuit targets.
- Updated `World` circuit state with checkpoint event count, finish count, and last lap.
- Added the `circuit_finish` achievement and finish audio cue.
- Suppressed normal zone prompts while the circuit is active so the checkpoint objective is not visually interrupted by portfolio terminal prompts.
- Extended `tools/verify-play.mjs` to preview the active circuit marker, finish the full circuit sequence, verify 12 checkpoint events, verify the finish achievement, and assert marker/gate counts.

## Failed Attempt

The first browser verification run failed because mobile low quality reached 238 draw calls, above the 235-call verifier budget. The heavier authored checkpoint gate trail was then hidden on low quality while the cheaper target rings/arrows remain visible. The final run passed at 232 mobile draw calls.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T14-26-48-651Z/result.json`.
- Screenshots spot-checked: `06-circuit-target.png`, `zone-circuit.png`, and `mobile-start.png`.

## Metrics

- Circuit: 12/12 checkpoint events, finish event true, `circuit_finish` achievement true, last lap 2.16s in the automated teleport probe.
- Circuit visuals: 11 authored checkpoint gates, 12 target rings, 12 target arrows.
- Desktop: p95 frame time 8.4ms, average frame time 8.29ms, 321 draw calls, 436,152 triangles.
- Mobile low tier: ready, nonblank canvas, 232 draw calls, 304,190 triangles.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console/page errors: none.

## Remaining Gap

The circuit is now technically playable and verified, but it is still not a fully tuned hand-driven racing experience. Future passes should improve route readability at speed, checkpoint arrival effects, timing UI, missed-checkpoint recovery, and a manual driving verification route instead of relying only on the automated teleport probe.
