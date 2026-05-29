# /play Todo And Behind Composition Pass

## Decision

Give Todo Board and Behind The Build visible yard composition instead of leaving their authored objects on mostly empty grass.

## Why

The previous district story prop pass replaced placeholder clusters with authored templates, but screenshots still showed Todo and Behind The Build surrounded by too much empty green space. That was still inconsistent with the active overhaul goal.

## Changed

- Added local pads and walkway areas for Todo Board and Behind The Build.
- Added guide marks, lamps, planters, route lanterns, and road barriers around both districts.
- Added `districtComposition` runtime stats and verifier assertions for the new composition layer.
- Rebuilt the GitHub Pages `/play` bundle.

## Verification

- `npm run play:validate-map` passed.
- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T11-39-46-812Z/result.json`
- Screenshots inspected:
  - `zone-todo.png`
  - `zone-behind.png`
  - `zone-projects.png`

## Metrics

- Desktop p95 frame time: 8.4 ms.
- Desktop draw calls: 300.
- Desktop triangles: 270,314.
- Mobile draw calls: 238.
- Mobile triangles: 240,950.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console/page errors: 0.
- `districtComposition`: 4 pads, 15 path marks, 4 lamps, 2 planters, 6 authored assets.

## Remaining Gap

The districts are less empty now, but the pads are still broad and simple. A later art pass should break them up with authored edge trims, surface decals, small elevation transitions, and more distinctive district-specific silhouettes.
