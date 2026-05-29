# Play Route Story Marker Optimization

## Context

The route story marker pass added useful authored roadside silhouettes, but it also raised route-composition triangles from 22,480 to 33,480 and total desktop triangles from 239,914 to 250,914. That was within budget, but the owner has explicitly called out performance as a first-class concern.

## Decision

Keep the `EnvPolishRouteStoryMarker` silhouette and ten-route placement, but remove bevel modifiers from thin glow, screen, tag, reflector, and detail cubes in the Blender source. Bevels remain only on the pieces where they materially affect the readable shape.

This preserves the authored route marker while lowering mesh cost. No runtime batching changes were made because recent journaled batching experiments showed that broader batching changes can reduce mesh count while hurting measured runtime.

## Verification

- `npm run play:validate-map` passed.
- `npm run play:build` passed.
- `npm run play:verify` passed using `.codex-tmp/play-verify-2026-05-29T22-34-22-352Z`.
- `npm test` passed.
- Screenshots reviewed: `02-start-driving.png`, `zone-projects.png`, `zone-security.png`, and `mobile-start.png`.

Measured after optimization:

- Console/page errors: 0.
- Load time: 3501ms.
- Desktop FPS: 120.71; p95 frame: 8.4ms.
- Desktop render calls: 355; triangles: 245,794.
- Mobile low render calls: 232; triangles: 142,120.
- Route replay: 39/39 segments passed.
- Collider audit: 5/5 passed.
- Route composition: 10 route story markers still verified.
- Route-composition triangles: 28,360.
- `polish-props.glb`: 2,224,520 bytes.

## Remaining Risk

The route marker is now cheaper, but the larger performance and quality target still requires source-level district asset optimization, better authored composition, and measured iteration. The current highest render-profile bucket remains `SETPIECE_District_Dressing`, and prior journaled attempts show it should be optimized through source asset and placement structure rather than generic batch-size changes.
