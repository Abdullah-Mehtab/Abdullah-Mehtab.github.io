# Play Route Story Marker Pass

## Context

The latest verified build had stronger lighting, authored districts, and route dressing, but the long road approaches still relied heavily on low flat guide pieces. That helped navigation, yet it did not add enough vertical silhouette or roadside story density for the Bruno-level art-direction goal.

## Decision

Add a Blender-authored route story marker to the existing polish-props source pack and place ten instances along major road approaches.

- Source asset: `EnvPolishRouteStoryMarker` in `play-assets/source/blender/export_polish_props.py`.
- Runtime placement: `SETPIECE_Route_Composition` in `play-src/src/world/SetPieces.js`.
- Verification gate: `tools/verify-play.mjs` now requires the template, placement, and at least ten `routeStoryMarkers`.

The route composition group is already marked as secondary quality, so these markers stay visible on medium/high desktop but remain hidden on low/mobile. This keeps the mobile draw-call budget stable while improving desktop roadside composition.

## Verification

- `npm run play:validate-map` passed.
- `npm run play:build` passed.
- `npm run play:verify` passed using `.codex-tmp/play-verify-2026-05-29T22-27-00-917Z`.
- `npm test` passed.
- Screenshots reviewed: `02-start-driving.png`, `zone-security.png`, `zone-projects.png`, and `mobile-start.png`.

Latest verifier metrics:

- Console/page errors: 0.
- Load time: 2957ms.
- Desktop FPS: 120.47; p95 frame: 8.4ms.
- Desktop render calls: 355; triangles: 250,914.
- Mobile low render calls: 232; triangles: 142,120.
- Route replay: 39/39 segments passed.
- Collider audit: 5/5 passed.
- Route composition: 8 splitter islands, 12 plaza edge kits, 12 bollard runs, 10 route story markers, 42 authored assets, 40 guide tiles.
- `polish-props.glb`: 2,248,096 bytes.

## Remaining Risk

This is a composition and source-asset pass, not the final world overhaul. The marker improves road-side authored density, but the remaining large gains still require broader district composition, deeper terrain/road redesign, and art-directed optimization rather than just adding more props.
