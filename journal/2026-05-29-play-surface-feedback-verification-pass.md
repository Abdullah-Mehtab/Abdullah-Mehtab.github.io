# /play Surface Feedback Verification Pass

## Decision

The surface system already classified road, grass, sand, shore, and water, but the verifier only proved labels existed. This checkpoint makes the tire feedback contract observable: the browser probe now drives on grass, sand, and shore and asserts that each surface emits its own trail and smoke feedback.

## Implementation Notes

- `Vehicle` now tracks surface-specific trail, smoke, and skid counters for verification.
- Soft surfaces now emit additional dust or mist while driving, using the surface dust color so grass, sand, and shore read differently.
- Shore mist is tied to trail emission as well as speed accumulation because shoreline contact can be brief while the car crosses from wet edge to sand.
- The verifier now captures `05-surface-feedback.png` before route replay and records per-surface trail/smoke deltas.

## Failed Probe

The first two verifier runs failed with `surface feedback probe failed: shore smoke=0`.

Observed result:

- Shore trail deltas were present, proving the car was on the shore surface.
- Shore smoke deltas were zero, which showed the dust accumulator did not fire before the car crossed into sand.

Fix:

- Lowered the shore dust speed threshold.
- Allowed partial wheel contact for soft-surface dust.
- Added a low-rate soft-surface mist cadence tied to trail emission.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed with output `.codex-tmp/play-verify-2026-05-29T05-14-15-056Z`.
- `npm test` passed.
- Screenshot inspected: `.codex-tmp/play-verify-2026-05-29T05-14-15-056Z/05-surface-feedback.png`.

Latest verifier metrics:

- Console/page errors: 0.
- FPS: 120.71; p95 frame: 8.4ms.
- Render calls: 259; triangles: 175,094.
- Mobile low tier: 207 calls; 156,412 triangles.
- Route replay: 39/39 passed.
- Collider audit failures: 0.
- Surface feedback deltas: grass trail 95, grass smoke 20; sand trail 61, sand smoke 14; shore trail 17, shore smoke 4.
- Surface dust delta: 38.

## Remaining Risk

The automated probe proves surface feedback exists, but the subjective tire feel still needs a long manual driving pass across all district transitions. The screenshot also shows the island still needs larger authored terrain and landmark composition work before the overall experience reaches the target art direction.
