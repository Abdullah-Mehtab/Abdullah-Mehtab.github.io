# Play mobile road detail tier

## Context

The active `/play` goal requires the island to stay visually authored while mobile avoids desktop-heavy rendering. After the mobile water tier pass, the latest verified mobile low-quality render still had 232 draw calls. Road wear strips and lane seams were useful desktop polish, but they were fine-detail overlays rather than navigation-critical road guidance.

## Decision

Hide the road wear/seam instanced overlays on the low landscape quality tier while keeping road surfaces, shoulders, curbs, lane-edge lines, chevrons, reflector studs, junction blends, and all route guidance visible.

`Roads` now owns an `applyQuality()` method. It is called during road build and when `World.setLandscapeQuality()` changes the tier. The verifier now records mobile road detail visibility and fails if low quality leaves road detail overlay meshes visible.

## Failed approach

I tested widening or removing spatial cells for `SETPIECE_District_Dressing` batching because the render profile showed that group as the largest mesh/material bucket.

- `cellSize: 256` reduced the visible district-dressing bucket from 163 to 126 meshes, but desktop draw calls stayed flat and triangles increased.
- removing cells failed verification: desktop triangles rose to 288460, mobile triangles rose to 189118, mobile draw calls rose to 247, and the static batching cell-group probe failed.

Conclusion: collapsing district spatial batching is not a safe optimization without deeper LOD/culling work.

## Verification

Commands run on 2026-05-30:

- `npm run play:validate-map`
- `npm run play:build`
- `npm run play:verify`
- `npm test`

Browser verifier output:

- `G:\Resume-Website\.codex-tmp\play-verify-2026-05-30T00-17-42-515Z`
- console messages: 0
- page errors: 0
- desktop FPS: 120.49
- desktop p95 frame: 8.4 ms
- desktop draw calls: 357
- desktop triangles: 238158
- mobile low draw calls: 228
- mobile low triangles: 132532
- desktop visible road wear strips: 97
- desktop visible lane seams: 50
- mobile low visible road detail meshes: 0
- route replay: 39/39 passed
- collider audit: 5/5 passed

## Notes

This is a mobile performance-tier checkpoint, not completion of the full overhaul. The next worthwhile optimization target is still the authored set-piece rendering path, but it likely needs real LOD/visibility grouping rather than larger merged batches.
