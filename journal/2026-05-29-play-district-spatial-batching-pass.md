# Play District Spatial Batching Pass

## Context

The district dressing group was previously merged into broad static batches. That reduced object count, but it kept too much authored district geometry visible to the renderer from distant camera angles. The larger `/play` goal still needs deeper art direction and authored modeling, but this pass is narrowly about preserving that authored density while making off-camera district dressing easier for the renderer to cull.

## Decision

Add an optional spatial cell key to `mergeStaticMeshesInGroup` and apply it only to `SetPiece_District_Dressing`.

- `play-src/src/world/StaticBatching.js` now accepts `cellSize`.
- The batching key includes a coarse X/Z cell signature when `cellSize` is set.
- Static batch stats now report cell counts.
- `play-src/src/world/SetPieces.js` batches district dressing with `cellSize: 128`.
- `tools/verify-play.mjs` asserts at least one spatially batched group and adds a mobile triangle budget check.

I tried `cellSize: 96` first. It passed verification, but the extra buckets raised desktop renderer calls to 333. `cellSize: 128` kept culling benefits while lowering calls back near the previous baseline.

## Tradeoff

This intentionally trades some scene object count and district mesh count for much lower triangle submission in the measured camera routes.

Previous verified prune pass:

- Desktop: 321 calls, 436,152 triangles, p95 8.4ms.
- Mobile: 232 calls, 304,190 triangles.
- Scene objects: 1,077.

This pass:

- Desktop: 319 calls, 297,948 triangles, p95 8.4ms.
- Mobile: 219 calls, 155,654 triangles.
- Scene objects: 1,182.
- District dressing render profile: 156 meshes/materials, 204,226 triangles.
- Static batching stats: 272 groups, 1,881 batches, 5,719 merged meshes, 144 pruned empty groups, 1 cell-group, 278 cells.

## Verification

Commands passed:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Final verifier output:

- `.codex-tmp/play-verify-2026-05-29T16-41-30-203Z`

Observed verifier state:

- No console messages or page errors.
- Route replay: 39/39.
- Collider audit: 5/5.
- Circuit: 12/12 events, finish true.
- Mobile quality tier: low, canvas rendered, 219 calls, 155,654 triangles.
- Desktop runtime: average 8.29ms, p95 8.4ms, 120.64 FPS.

Screenshots inspected:

- `mobile-start.png`
- `06-circuit-target.png`

## Remaining Risk

This is not an art-completion pass. The larger objective still needs authored asset quality, environmental composition, water feel, road layout, physics tuning, and stronger Bruno-benchmark art direction. This pass only reduces one measured rendering cost so later art work has more performance headroom.
