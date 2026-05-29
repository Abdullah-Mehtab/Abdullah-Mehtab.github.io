# Play road junction blend pass

Date: 2026-05-29

## Decision

The road system should not draw circular caps at every route point. That made the island read like a debug spline visualization instead of an authored driving world. This pass keeps the same `roadPaths`, `roadSegments`, route replay data, and vehicle behavior, but replaces per-point cylinders with directional blend patches only where multiple roads actually meet.

## Implementation notes

- `Roads.addPath()` now builds only the path ribbon.
- `Roads.addJunctionPatches()` builds a small road graph from shared route points.
- Junction patches use the directions and widths of the connected roads, so intersections read like blended paving instead of round dots.
- The verifier now records `roadJunctions.blendPatches` and `roadJunctions.circularPointCaps` to prevent this visual regression from returning silently.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- Latest verification artifact: `.codex-tmp/play-verify-2026-05-29T04-04-58-040Z/result.json`.
- Browser verifier highlights from that run: no console or page errors, route replay 39/39, road junction blend patches 10, circular point caps 0, data shards 7/7, p95 frame time 8.4ms, draw calls 229, triangles 140774.
- Road network render profile improved from the previous checkpoint's roughly 14,676 road triangles to 7,444 road triangles in this run.
- `npm test` passed.

## Remaining limitation

This removes a visible road-language defect, but it is not the full road-system finish. The next road pass should address road silhouettes, shoulder hierarchy, approach lanes, and the large dark plaza/road patches that still feel too broad in screenshots.
