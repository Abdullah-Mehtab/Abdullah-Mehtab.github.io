# Play Authored Field Motif Pass

## Decision

Added a medium/high quality terrain motif layer to reduce the flat empty-lawn read between authored districts without adding colliders. The layer is data-driven from hand-authored cluster positions in `worldData`, rendered as two instanced meshes: grass-colored low berms and transparent colored field ribbons.

## Reasoning

The latest screenshots still showed large green voids between pads and roads even after district props, roads, and meadow patches. Adding more standalone props would increase clutter and draw calls. Instanced terrain motifs give broad composition at a predictable cost and do not interrupt vehicle movement.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- Latest verifier output: `.codex-tmp/play-verify-2026-05-29T22-00-05-287Z`.
- Field motifs: 14 clusters, 31 berms, 63 ribbons, 94 visible motifs on medium/high.
- Mobile low quality hides the layer: visibleTotal 0.
- Desktop verifier metrics: 121.32 FPS, p95 frame 8.4ms, 353 draw calls, 239914 triangles.
- Mobile low verifier metrics: 232 draw calls, 142120 triangles.
- Route replay passed 39/39 segments.
- Collider audit passed 5/5 visible collider checks.
- Console messages and page errors were empty.

## Notes

This pass does not claim the island is finished or Bruno-level. It specifically addresses the empty-field problem while preserving the protected car, protected FCC model, static GitHub Pages route, and existing physics colliders.
