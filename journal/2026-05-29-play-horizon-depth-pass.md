# Play Horizon Depth Pass

## Context

Water and shore screenshots still had a flat, empty cyan horizon. That made the island feel like a stage floating in a void instead of a broader authored world. This pass adds cheap horizon depth without touching the protected FCC model, the car asset, route contracts, or physics colliders.

## Decision

Add quality-gated distant islets to the atmosphere system.

- `play-src/src/world/Atmosphere.js` now creates two instanced meshes for low-poly distant islet bases and hills.
- The islets sit beyond the playable island and have subtle bobbing so shore views feel less static.
- Quality gates keep 8 visible islets on low, 14 on medium, and 20 on high.
- `tools/verify-play.mjs` now asserts the desktop/medium and mobile/low islet budgets.

## Verification

Commands passed:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Final verifier output:

- `.codex-tmp/play-verify-2026-05-29T17-03-32-068Z`

Observed verifier state:

- Atmosphere: 20 distant islets, 14 visible on medium.
- Mobile low tier: 8 visible distant islets.
- No console messages or page errors.
- Route replay: 39/39.
- Collider audit: 5/5.
- Circuit: 12/12 events, finish true.
- Water, surface feedback, protected FCC LOD, zone landmarks, UI, audio, and mobile probes passed.

Performance snapshot:

- Desktop: 311 renderer calls, 298,028 triangles, p95 8.4ms.
- Mobile low tier: 216 renderer calls, 155,902 triangles.
- Scene objects: 1,129 objects, 731 meshes, 11 lights.

Screenshots inspected:

- `04-water-interaction.png`

The screenshot now shows distant land silhouettes on the waterline instead of an empty ocean horizon.

## Remaining Risk

The islets add depth, but they are still simple low-poly silhouettes. A later art pass should improve their shape/material language or replace them with Blender-authored horizon props if the benchmark demands richer background composition.
