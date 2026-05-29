# Play Yard Edge Trim Optimization

## Context

The route story marker optimization left `SETPIECE_District_Dressing` as the largest measured render-profile bucket. A GLB template inspection showed `EnvPolishYardEdgeTrim` was not the heaviest template individually, but it is placed 90 times in district composition, so its cost is multiplied across the island.

Before this pass:

- `EnvPolishYardEdgeTrim`: 11 meshes, 484 triangles.
- Last journaled desktop total: 245,794 triangles.
- Last journaled mobile low total: 142,120 triangles.
- Last journaled `SETPIECE_District_Dressing`: 109,940 triangles.

## Decision

Keep the visible curb role of `EnvPolishYardEdgeTrim`, but simplify the Blender-authored source asset:

- Keep the long curb body and shadow lip.
- Replace five separate glow chips with two longer glow bars.
- Replace repeated end post plus lamp stacks with compact end caps.
- Preserve the generated-asset flow by regenerating `polish-props.glb` from source.

This targets the repeated district-dressing cost without changing protected car/FCC assets, route ids, public URLs, or runtime behavior.

## Verification

- `npm run play:validate-map` passed.
- `npm run play:build` passed.
- `npm run play:verify` passed using `.codex-tmp/play-verify-2026-05-29T23-40-31-653Z`.
- `npm test` passed.
- Screenshots reviewed: `zone-projects.png`, `zone-todo.png`, `zone-cv.png`, and `mobile-start.png`.

Measured after optimization:

- `EnvPolishYardEdgeTrim`: 6 meshes, 168 triangles.
- Console/page errors: 0.
- Load time: 3545ms.
- Desktop FPS: 120.65; p95 frame: 8.4ms.
- Desktop render calls: 355; triangles: 236,314.
- Mobile low render calls: 232; triangles: 132,640.
- `SETPIECE_District_Dressing`: 163 meshes, 81,500 triangles.
- Route replay: 39/39 segments passed.
- Collider audit: 5/5 passed.
- District composition edge trims: 90.
- `polish-props.glb`: 2,206,796 bytes.

## Remaining Risk

This improves repeated mesh cost, but the full `/play` goal is still active. The largest visual/performance work remains broader source-level district authoring, road/terrain composition, water/game-feel tuning, and more measured optimization of repeated authored props.
