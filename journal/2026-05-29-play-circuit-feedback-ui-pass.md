# Circuit Feedback UI Pass

## Context

The circuit objective had in-world checkpoint gates and markers, but the runtime feedback was still thin: the HUD only changed the zone readout and checkpoint completion had no persistent split/timing surface.

## Changes

- Added a compact circuit status overlay for active runs and short finish summaries.
- Tracked last checkpoint index, split time, pulse strength, and finish summary timing in world circuit state.
- Added checkpoint capture pulses to the circuit ring and arrow markers.
- Moved the circuit HUD down only in debug-drive mode so verifier screenshots do not overlap the debug readout.
- Extended the browser verifier to assert circuit HUD visibility, preview text, finish summary text, and checkpoint pulse stats.

## Verification

- `npm run play:validate-map`: passed.
- `npm run play:build`: passed.
- `npm run play:verify`: passed.
  - Output: `.codex-tmp/play-verify-2026-05-29T15-01-38-214Z`.
  - Console messages: 0.
  - Page errors: 0.
  - Desktop p95 frame time: 8.4 ms.
  - Desktop render calls: 321.
  - Desktop triangles: 436,152.
  - Mobile low-tier render calls: 231.
  - Mobile low-tier triangles: 304,166.
  - Route replay: 39/39 passed.
  - Collider audit: 5/5 passed.
  - Circuit checkpoints: 12/12 events.
  - Circuit finish: passed.
  - Circuit UI preview: visible, `Checkpoint 1/12`.
  - Circuit finish summary: visible.
  - Checkpoint pulse samples: 215.
  - Max checkpoint pulse: 0.98565.
- `npm test`: passed.

## Notes

This improves the circuit loop, but the broader goal is still active. Remaining work includes manual circuit readability, missed-checkpoint recovery, deeper route composition, asset/material consolidation, and continued district-level authored polish.
