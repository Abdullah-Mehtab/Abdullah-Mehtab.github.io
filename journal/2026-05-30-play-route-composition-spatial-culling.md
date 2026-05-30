# Play route composition spatial culling

## Context

The broad set-piece visibility pass left `SETPIECE_Route_Composition` as a persistent active render bucket. The 2026-05-30 verifier output at `G:\Resume-Website\.codex-tmp\play-verify-2026-05-30T01-07-23-754Z` showed the route composition bucket at 15 meshes / 28360 triangles in the main render profile, and route composition remained fully visible in the driving broad visibility sample.

## Failed approach

A radius-only change was tested first. It gave route composition its own radius key, but because the route-composition meshes were globally merged by material, the surface-feedback snapshot only hid one route-composition batch. That was not enough to count as a meaningful optimization.

## Decision

Route composition now uses spatial static batching with `cellSize: 56`, and the broad visibility registry supports per-group radius keys. Route composition uses a smaller quality-tiered radius than broader approach and gateway dressing:

- low: 72
- medium: 96
- high: 156

This keeps route composition as authored world detail near the car while allowing far route-detail cells to disappear independently. The separate route guidance arrows remain outside this culling path, so navigation readability does not rely only on these detail batches.

The verifier now enforces route-composition spatial batching and culling:

- active snapshot triangle budget tightened from 320000 to 300000
- driving route-composition batches must be spatially split
- driving route-composition hidden batches must be at least 20
- surface-feedback route-composition hidden batches must be at least 40

## Verification

Commands run on 2026-05-30:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Final browser verifier output:

- `G:\Resume-Website\.codex-tmp\play-verify-2026-05-30T01-21-34-554Z`
- console messages: 0
- page errors: 0
- desktop FPS: 120.73
- desktop p95 frame: 8.4 ms
- desktop draw calls: 375
- desktop triangles: 220474
- mobile low draw calls: 228
- mobile low triangles: 132532
- driving stress snapshot: 496 calls, 252274 triangles
- surface-feedback snapshot: 642 calls, 283998 triangles
- driving route composition: 100 visible / 43 hidden / 143 total batches
- surface-feedback route composition: 47 visible / 96 hidden / 143 total batches
- mobile broad set pieces: 0 visible / 190 hidden / 190 total batches
- route replay: 39/39 passed
- collider audit: 5/5 passed

Screenshots inspected from verifier output:

- `02-start-driving.png`
- `05-surface-feedback.png`
- `mobile-start.png`

## Remaining work

This improves active triangle cost but increases route-composition draw-call count because the merged material batches are now spatially split. The next optimization pass should target draw-call pressure from the newly split route cells, likely by grouping route-composition geometry into fewer authored cells or by building lower-triangle distance proxy cells for far route detail.
