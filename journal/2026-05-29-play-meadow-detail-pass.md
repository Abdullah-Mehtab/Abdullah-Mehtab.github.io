# Play Meadow Detail Pass

## Context

The full `/play` goal still calls for a Bruno-benchmark level of authored density and polish without copying Bruno's assets or layouts. After the document/terminal district architecture pass, several grass fields still read as broad flat color from camera screenshots even though the island already had foliage, roads, district pads, and relief.

## Decision

Add a lightweight meadow-detail layer to break up remaining empty grass fields without adding colliders or per-prop draw-call cost. The layer uses hand-authored patch placements in `play-src/src/world/worldData.js`, an instanced irregular patch mesh in `play-src/src/world/Terrain.js`, and a translucent vertex-colored material in `play-src/src/world/WorldMaterials.js`.

The first version used rectangular surface-detail instances. Screenshot review showed the patches read as obvious translucent tiles, so that approach was rejected before commit. The committed approach uses the existing irregular `makePatchGeometry` path with lower opacity so the detail reads as soft lawn color variation instead of hard overlays.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed using `.codex-tmp/play-verify-2026-05-29T18-55-33-622Z`.
- `npm test` passed.
- Desktop verifier metrics: p95 frame time 8.4ms, average frame time 8.3ms, 120.52 FPS, 326 draw calls, 329,966 triangles.
- Mobile low verifier metrics: 224 draw calls, 183,854 triangles.
- Meadow detail metrics: 28 patches, 26 color variants.
- Route replay: 39 of 39 segments passed.
- Collider audit: 5 of 5 passed.
- Console/page errors: none reported by the verifier.

## Notes

This is a targeted art-density checkpoint, not the end state. It reduces flat empty grass reads and preserves performance, but the island still needs continued authored modeling, animation, road composition, water polish, physics tuning, and UI/game-feel iteration before the larger goal can be considered complete.
