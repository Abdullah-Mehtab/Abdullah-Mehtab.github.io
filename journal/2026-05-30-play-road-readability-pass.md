# Play Road Readability Pass

## Decision

Lower the opacity of visual-only road detail overlays so the first-frame and driving screenshots read less cluttered while preserving route topology, surface detection, and all visual guidance counts.

The change intentionally avoids moving roads or touching physics. It only tunes the road/detail material presentation and adds verifier-visible opacity values.

## Implementation Notes

- Added named road detail opacity constants.
- Reduced road wear opacity to 0.20.
- Reduced road seam opacity to 0.16.
- Reduced transition apron opacity to 0.10.
- Reduced transition edge opacity to 0.18.
- Reduced transition guide opacity to 0.26.
- Reduced road marker opacity to 0.42.
- Reduced road verge opacity by hierarchy.
- Added road detail opacity stats to the verifier result.
- Added verifier gates so future passes do not silently restore overly bright road overlays.

## Verification

Commands run on 2026-05-30:

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.

Verifier output:

- Output directory: `.codex-tmp/play-verify-2026-05-30T13-18-22-195Z`
- Console messages: none.
- Page errors: none.
- High quality: p95 frame time 8.4 ms, 436 draw calls, 259188 triangles.
- Mobile low tier: 229 draw calls, 132302 triangles.
- Route replay: 39 passed, 0 failed.
- Collider audit: 5 total, 0 failures.
- Road guidance: 85 chevrons, 348 reflector studs, marker opacity 0.42.
- Road detail opacities: wear 0.20, seam 0.16, transition apron 0.10, transition edge 0.18, transition guide 0.26.

Screenshots inspected:

- `02-start-driving.png`
- `03-driving-stress.png`
- `zone-landing.png`
- `zone-education.png`

## Remaining Gap

This is a readability tuning pass, not a full road art replacement. The island still needs a deeper authored road-layout pass with stronger shoulders, district transitions, curb work, and less reliance on overlay markings.
