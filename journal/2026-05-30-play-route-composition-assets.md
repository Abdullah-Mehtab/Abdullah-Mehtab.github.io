# /play Route Composition Asset Pass

## Decision

Added a dedicated route-composition layer instead of only increasing generic prop scatter. The goal is to make road approaches and plaza edges read as authored driving spaces: shoulder islands, curb kits, bollard runs, and small guide tiles.

## Source Assets

- Added `EnvPolishRouteSplitterIsland`, `EnvPolishPlazaEdgeKit`, and `EnvPolishChevronBollardRun` to `play-assets/source/blender/export_polish_props.py`.
- Regenerated only `play-src/assets/models/world/polish-props.glb` from that Blender source.
- Did not regenerate or alter protected car/FCC source assets in this pass.

## Runtime Placement

- Added `SETPIECE_Route_Composition` in `play-src/src/world/SetPieces.js`.
- Placed 8 splitter islands, 12 plaza edge kits, 12 bollard runs, and 40 guide tiles around route shoulders, intersections, and district approaches.
- Registered the group as a secondary quality group so low quality/mobile can hide it.
- Added `getRouteCompositionStats()` and verifier coverage for the new layer.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.

Verification output: `.codex-tmp/play-verify-2026-05-29T19-50-35-244Z`.

Key metrics from the browser verifier:

- Desktop p95 frame time: 8.4ms.
- Desktop FPS sample: 117.87.
- Desktop draw calls: 346.
- Desktop triangles: 385,662.
- Mobile low draw calls: 229.
- Mobile low triangles: 184,474.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console/page errors: none.

## Notes

- Desktop triangles rose because the new authored props add geometry. The frame-time and mobile budgets still passed, but the full goal still needs a later optimization pass.
- This is not final art direction completion. It is one verified step toward replacing weak road/plaza emptiness with authored composition.
