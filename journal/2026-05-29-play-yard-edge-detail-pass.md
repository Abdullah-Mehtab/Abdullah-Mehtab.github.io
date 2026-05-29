# /play Yard Edge Detail Pass

## Decision

Add an authored yard-detail kit to break up the broad Todo Board and Behind The Build pads.

## Why

The previous composition pass added pads and route framing, but screenshots still showed broad flat surfaces. The active goal requires finished district art direction, not bare pads.

## Changed

- Added authored Blender templates:
  - `EnvPolishYardEdgeTrim`
  - `EnvPolishYardSurfaceMarks`
  - `EnvPolishWorkshopProcessRail`
- Placed edge trims, painted surface marks, and process rails around Todo Board and Behind The Build.
- Extended `districtComposition` stats and verifier assertions to require the authored detail layer.
- Regenerated only `polish-props.glb` and rebuilt `/play` assets.

## Verification

- `npm run play:validate-map` passed.
- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T11-48-40-410Z/result.json`
- Screenshots inspected:
  - `zone-todo.png`
  - `zone-behind.png`
  - `zone-projects.png`
  - `mobile-start.png`

## Metrics

- Desktop p95 frame time: 8.4 ms.
- Desktop draw calls: 300.
- Desktop triangles: 301,850.
- Mobile draw calls: 238.
- Mobile triangles: 272,486.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console/page errors: 0.
- `polish-props.glb`: 1,952,212 bytes.
- `districtComposition`: 4 pads, 15 path marks, 4 lamps, 2 planters, 35 authored assets, 20 edge trims, 6 surface marks, 3 rails.

## Remaining Gap

The yards now have authored trim and surface detail, but the next world-art pass should continue replacing broad simple pads with stronger district silhouettes and authored vertical elements in other lower-density areas.
