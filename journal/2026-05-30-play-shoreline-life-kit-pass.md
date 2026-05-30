# Play shoreline life kit pass

## Decision

Add a small authored shoreline detail pass using Blender source assets, runtime quality tiers, and verifier gates instead of treating water polish as only shader work.

## Reasoning

The current `/play/` goal is still a full art-direction overhaul, but shoreline and harbor areas were reading too flat. This pass adds tide-pool and breakwater props to the existing polish asset source, places them around the coast and harbor, and records metrics so the detail does not silently disappear or overload mobile.

## Implementation

- Added `EnvPolishShorelineTidePool` and `EnvPolishShorelineBreakwater` to `play-assets/source/blender/export_polish_props.py`.
- Regenerated `play-src/assets/models/world/polish-props.glb`.
- Added shoreline life placement, tide glimmer strips, quality-tier visibility, batching, and water stats in `play-src/src/world/Water.js`.
- Added three shoreline assets to the harbor composition in `play-src/src/world/SetPieces.js`.
- Added verifier gates for authored shoreline counts and mobile quality limits in `tools/verify-play.mjs`.
- Rebuilt the static `/play` output, including `play/game-assets/index.js` and `play/game-assets/polish-props.glb`.

## Failed Attempt

An east-shore tide-pool placement was first assigned to the low quality tier so it would be visible in more screenshots. `npm run play:verify` failed the mobile draw-call budget at 238 calls. Moving that placement to the medium tier restored the final mobile draw-call count to 235, which passes the current gate but leaves almost no budget margin.

## Verification

Final verifier output: `.codex-tmp/play-verify-2026-05-30T04-48-10-967Z`.

Recorded metrics:

- Console/page errors: 0.
- Desktop frame time: average 8.29ms, p95 8.4ms, estimated FPS 120.62.
- Desktop renderer load: 392 draw calls, 232450 triangles.
- Mobile low quality: 235 draw calls, 133808 triangles.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Water stats: 12 shoreline life kits, 9 visible shoreline life kits, 7 tide pools, 6 visible tide pools, 5 breakwaters, 3 visible breakwaters, 12 visible tide glimmers, 36 shoreline life batches.
- Harbor composition: 15 authored assets.
- Protected FCC near-field model remained exact in the verifier output.

## Notes

This is not the full Bruno-level water overhaul. It is one verified shoreline detail checkpoint. The mobile draw-call budget is now tight; the next visual pass should either buy back mobile budget through batching/LOD work or avoid adding new low-tier objects.
