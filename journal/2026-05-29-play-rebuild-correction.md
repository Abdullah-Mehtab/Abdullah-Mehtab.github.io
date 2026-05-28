ABOUTME: Records the corrected implementation direction for the /play rebuild.
ABOUTME: Captures why the additive overhaul is being replaced with a performance-first rebuild.

# /play Rebuild Correction

The additive vertical-slice pass did not meet the requested quality bar. It preserved too much of the previous map architecture, added decorative density without a coherent art direction, and increased runtime cost.

The corrected direction is a performance-first rebuild. The protected constants are still the public `/play/` route, the Sabre Turbo-style car identity and driving behavior, and the FCC/S-block education building model/cosmetic identity. Other world layout, roads, scenery, collisions, props, lighting, and UI staging may be replaced.

The next implementation should reduce mesh/material/light/collider counts before adding visual detail. Roads should become clean visual guidance on a single stable driving surface. Decorative scenery should be instanced or batched and mostly non-colliding. Landmark triggers should remain stable, but physical blockers must be explicit and visible.

Implementation verification on 2026-05-29:

- Browser smoke output: `.codex-tmp/play-rebuild-verify-2026-05-29-clean-console/metrics.json`.
- Console and page errors were empty in that browser run.
- FCC-heavy view measured about 120 FPS, 239 draw calls, 227,986 rendered triangles, 1,152 meshes, and 8 physics colliders.
- `npm run play:build`, `npm test`, `npm run check:site`, and `npm audit --omit=dev` passed.

Remaining known constraint: `play/game-assets/medieval-props.glb` is still large because the protected FCC/S-block asset is bundled there. The runtime now merges the FCC static meshes by material, but the asset package itself should be split in a future asset-pipeline pass.
