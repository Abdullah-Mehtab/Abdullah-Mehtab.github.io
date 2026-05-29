# /play Map Route Polish Pass

## Decision

The map is part of the driving experience and should read like an authored island route surface, not a flat modal with pins. This checkpoint keeps the existing route data and public behavior intact while making the map show road hierarchy, districts, circuit routing, and checkpoints.

## Implementation Notes

- Added full-map district labels from `districtFootprints`.
- Added route labels and road underlays for every `roadPaths` entry.
- Added a circuit overlay and checkpoint markers from `circuitCheckpoints`.
- Added a compact map legend and compass marker.
- Added `UI.getMapStats()` so browser verification can assert map completeness.
- Extended `npm run play:verify` to fail if pins, district labels, route labels, road underlays, road lines, circuit checkpoints, or legend items regress.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed with output `.codex-tmp/play-verify-2026-05-29T09-35-39-838Z`.
- `npm test` passed.
- Screenshot reviewed: `.codex-tmp/play-verify-2026-05-29T09-35-39-838Z/map.png`.

Latest verifier metrics:

- Console/page errors: 0.
- FPS: 120.58; p95 frame: 8.4ms.
- Render calls: 269; triangles: 181,446.
- Mobile low-tier calls: 215; mobile triangles: 162,694.
- Route replay: 39/39 road segments passed.
- Collider audit: 5/5 static colliders passed.
- Map probe: 16 pins, 10 district labels, 12 route labels, 12 road underlays, 12 road lines, 13 circuit checkpoints, 5 legend items.

## Remaining Risk

The map is more readable and better aligned with the authored-world goal, but it is still a web overlay. A later UI pass should make the menu and map feel more diegetic, reduce modal dominance, and tune mobile map density after the next island layout changes.
