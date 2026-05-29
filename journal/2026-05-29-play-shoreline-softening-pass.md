# Play Shoreline Softening Pass

## Context

The water interaction screenshot showed a hard, dark shoreline band. The water systems were functioning, but the coast still looked too much like a flat ring rather than a soft toy-island shoreline.

## Change

- Softened the wet sand and shore wash material colors/opacity.
- Replaced the low cliff edge material with a warmer, thinner shoreline edge.
- Added broken instanced foam marks around the coast.
- Added shoreline verifier stats for edge bands and foam breaks.
- Did not change terrain physics, water drag, respawn behavior, or colliders.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T12-45-43-976Z`.
- Screenshot inspected: `04-water-interaction.png`.

Key verifier metrics:

- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console messages: 0.
- Page errors: 0.
- Desktop p95 frame: 8.4 ms.
- Desktop FPS: 120.65.
- Desktop draw calls: 305.
- Desktop triangles: 378,850.
- Mobile quality: low.
- Mobile draw calls: 243.
- Mobile triangles: 349,486.
- Shoreline stats: 1 edge band, 69 foam breaks.
- Water behavior still passed: surface state, splash particles, wake rings, drag reduction, and submerge respawn.

## Remaining Risk

This softens the worst dark shoreline read, but it is not final water art. The next water pass should make the shoreline foam more spatially intentional around harbors and beaches, not only distributed around the island edge.
