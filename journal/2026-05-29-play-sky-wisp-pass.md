# Play Sky Wisp Pass

## Context

The atmosphere system already had a sky dome, sun, distant islets, and clouds, but verifier screenshots still showed large empty blue areas in the common `/play` camera angles. The sky needed visible motion without adding expensive volumetric rendering.

## Decision

Add a quality-gated instanced horizon-wisp layer to `Atmosphere`. The wisps are transparent billboard strips placed around the island horizon and updated with subtle drift. They are not colliders and they do not affect driving. The verifier now checks visible sky wisps on desktop and the mobile low cap.

Screenshot review kept the layer because it is subtle enough not to read as UI, while still breaking the empty sky in start and harbor/security views.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed using `.codex-tmp/play-verify-2026-05-29T19-23-45-780Z`.
- `npm test` passed.
- Atmosphere metrics: 12 sky wisps, 8 visible sky wisps on desktop, 4 visible sky wisps on mobile low.
- Desktop verifier metrics: p95 frame time 8.4ms, average frame time 8.28ms, 120.71 FPS, 334 draw calls, 331,242 triangles.
- Mobile low verifier metrics: 231 draw calls, 189,802 triangles.
- Route replay: 39 of 39 segments passed.
- Collider audit: 5 of 5 passed.
- Console/page errors: none reported by the verifier.

## Notes

This is a subtle atmosphere pass, not a final sky treatment. Future work should add more authored cloud silhouettes, stronger sun/framing composition, and district-specific sky staging while keeping the mobile quality gate strict.
