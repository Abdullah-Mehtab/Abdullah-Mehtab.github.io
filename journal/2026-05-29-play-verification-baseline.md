# /play Verification Baseline

## Decision

The `/play` overhaul needs a committed verifier before the next visual and physics passes. A temporary `.codex-tmp` screenshot script was not durable enough for the goal because future sessions need the same browser checks, metrics, screenshots, gameplay probes, and collider visibility.

## Implementation Notes

- Added `npm run play:verify` to run `tools/verify-play.mjs`.
- The verifier serves the built GitHub Pages artifact from `play/`, opens `/play/?debugDrive=1`, captures all zones plus map, menu, mobile, and collider overlay screenshots, records GLB sizes and renderer metrics, and fails on console/page errors.
- Physics fixed-collider creation now records debug metadata. `window.__portfolioDrive.colliders()` and `window.__portfolioDrive.showColliders()` expose that data only for debug/verification.
- Keyboard handbrake is now bound to `C` so drift behavior is reachable without a gamepad.

## Baseline Metrics

Latest verifier output: `.codex-tmp/play-verify-2026-05-28T23-04-29-917Z/result.json`.

- Console/page errors: 0.
- FPS: 120.57; p95 frame: 8.4ms.
- Render calls: 499; triangles: 260,364.
- Scene objects: 746 total, 547 meshes, 11 lights.
- Fixed collider records: 5; debug overlay objects: 5.
- Gameplay probes passed: drive movement, keyboard handbrake, boost, jump, burnout, wheelie, handbrake.
- Mobile canvas rendered.

## Remaining Risk

The verifier proves that the current mechanics and page load are measurable; it does not prove the final Bruno-level art direction is complete. The next pass should use these screenshots and metrics as the baseline while replacing broad flat districts, improving water/shore behavior, and reducing draw calls as authored art density increases.
