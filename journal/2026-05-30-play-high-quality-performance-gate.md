# Play High Quality Performance Gate

## Decision

Add a desktop high-quality probe to `tools/verify-play.mjs` so the expensive quality tier is checked directly during `/play` browser verification.

## Reasoning

The default verifier already enforces desktop p95 frame time, FPS, draw calls, triangles, mobile low quality, route replay, and collider checks. It did not separately exercise the high-quality tier with postprocessing and shadows enabled. Because the owner reported severe FPS drops, high quality needs explicit evidence instead of relying on medium-quality metrics.

## Measurement Correction

The first high-quality probe used `renderer.info.render` while postprocessing was active. That produced misleading `calls: 1` and `triangles: 1` values because Three.js reported the final full-screen postprocessing pass, not the scene render cost.

The probe now samples frame time with postprocessing and shadows active, then temporarily renders one scene pass without postprocessing only to collect meaningful scene draw calls and triangles. The output also records `postRenderCalls` and `postRenderTriangles` so the postprocessing behavior remains visible.

## Implementation

- `tools/verify-play.mjs` captures `high-quality-start.png`.
- The probe forces `portfolio-drive-landscape-quality=high`.
- It records quality, saved quality, pixel ratio, max pixel ratio, postprocessing, shadows, average frame time, p95 frame time, FPS, scene calls, scene triangles, and post-render pass counters.
- Verification now fails if high quality does not render, does not activate the high tier, exceeds frame-time/FPS budgets, or exceeds scene draw-call/triangle budgets.

## Verification

- `npm run play:verify` passed with output in `.codex-tmp/play-verify-2026-05-30T07-11-39-959Z/result.json`.
- `npm test` passed.

Latest high-quality probe:

- Ready: true.
- Quality: high.
- Postprocessing: true.
- Shadows: true.
- p95 frame time: 8.4ms.
- FPS: 120.86.
- Scene calls: 434.
- Scene triangles: 249588.
- Post-render pass calls: 1.
- Post-render pass triangles: 1.

## Follow-Up

This does not prove the whole `/play` endpoint is finished or fast on every user machine. It adds a stronger gate so future high-tier visual work cannot hide behind the medium-quality verifier.
