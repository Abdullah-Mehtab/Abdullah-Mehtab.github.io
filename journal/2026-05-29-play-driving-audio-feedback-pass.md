# /play Driving Audio Feedback Pass

## Decision

Add explicit driving-state audio events for boost start, burnout start, wheelie start, handbrake squeal, and surface transitions. The existing engine loop already reacts to throttle, speed, boost, burnout, wheelie, slip, and surface, but the browser verifier only proved impacts, zone stingers, and data shard cues. This pass makes the muscle-car feedback more alive and measurable without changing the protected Sabre Turbo-style car identity or the protected FCC/S-block model.

## Implementation

- Added `boostBurst`, `burnout`, `wheelie`, `tireSqueal`, `surfaceRumble`, and `getStats` to `play-src/src/core/AudioSystem.js`.
- Wired `play-src/src/player/Vehicle.js` to trigger those events from actual controller state transitions and surface changes, with cooldowns for repeated handbrake and surface sounds.
- Updated `tools/verify-play.mjs` to collect `AudioSystem.getStats()` and fail if the full driving-feedback set does not occur during browser gameplay verification.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T14-12-24-877Z/result.json`.
- Browser screenshots spot-checked: `02-start-driving.png`, `03-driving-stress.png`, `05-surface-feedback.png`, and `mobile-start.png`.

## Metrics

- Desktop: p95 frame time 8.4ms, average frame time 8.3ms, 120.53 FPS sample, 311 draw calls, 414,408 triangles.
- Mobile low tier: ready, nonblank canvas, 228 draw calls, 303,830 triangles.
- Console/page errors: none.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Audio counters: 1 boost burst, 1 burnout, 1 wheelie, 1 tire squeal, 6 surface rumbles, 2 impacts, 5 zone stingers, 8 data shard cues.

## Remaining Gap

This is not the full Bruno-level completion state. It improves one game-feel layer and strengthens regression coverage. The larger unfinished work remains authored modeling, district composition, road/terrain art direction, water feel, UI polish, and continued performance iteration across the whole island.
