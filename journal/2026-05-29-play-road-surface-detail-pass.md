# Play Road Surface Detail Pass

## Decision

Road wear and seam detail should be instanced, visual-only road decals that follow the existing road splines. They must not add colliders or change route topology.

## Reasoning

The current road network had route structure and guidance, but the driving surface still read as broad flat ribbons in screenshots. Surface marks add scale, direction, speed cues, and lived-in texture without introducing new physics risk.

## Implementation Notes

- Added road wear strip and lane seam instance generation in `play-src/src/world/Roads.js`.
- Kept road details non-colliding; the car still drives on the existing terrain/ramp colliders.
- Added `getDetailStats()` so the browser verifier can assert road-detail coverage.
- Added verifier checks for at least 90 wear strips and 36 lane seams.
- Regenerated the GitHub Pages `/play` build output.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T13-32-44-284Z/result.json`.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console/page errors: 0.
- Desktop p95 frame time: 8.4 ms.
- Desktop draw calls: 314.
- Mobile low draw calls: 252.
- Road detail metrics: 97 wear strips, 50 lane seams.

## Follow-Up

This improves road texture and readability, but it does not satisfy the full art-direction goal by itself. The remaining larger work is authored district architecture, stronger set-piece modeling, deeper game-feel tuning, audio, and a stricter final visual pass against the art bible.
