# Play District Gateway Staging Pass

## Context

The `/play/` island still needed stronger route punctuation between dense districts. The current pass adds authored transition landmarks without moving the protected FCC model or changing the Sabre Turbo-style vehicle.

## Decision

Add Blender-authored district gateways and route lanterns to `polish-props.glb`, then place them through `SetPieces` as static, merged scene dressing.

Reasoning:
- Empty travel spaces need readable authored landmarks, not more broad placeholder road loops.
- Route transitions should be visible from driving distance and help the player understand district boundaries.
- The pass should remain compatible with the static GitHub Pages build and current `/play/` asset pipeline.

## Implementation Notes

- Added `EnvPolishDistrictGateway` and `EnvPolishRouteLantern` to `play-assets/source/blender/export_polish_props.py`.
- Placed 12 gateways, 24 lanterns, and 60 guide strips in `play-src/src/world/SetPieces.js`.
- Added runtime verifier coverage for district gateway counts in `tools/verify-play.mjs`.
- Rebuilt `play-src/assets/models/world/polish-props.glb` and deployed copy `play/game-assets/polish-props.glb`.

## Failed Approach

Tried running the broad asset rebuild with `PLAY_ASSETS_BLENDER=1 npm run play:assets`. It timed out and touched protected/generated assets unrelated to this checkpoint. I restored those unintended changes and switched to a targeted Blender export for `polish-props.glb`.

Do not use the broad asset rebuild casually for small polish-prop changes until it is profiled or split into narrower commands.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed using `.codex-tmp/play-verify-2026-05-29T10-10-24-023Z`.
- `npm test` passed.

Verifier highlights:
- Console messages: 0.
- Page errors: 0.
- Route replay: 39/39.
- Collider audit: 5/5.
- District gateway stats: 12 gateways, 24 lanterns, 36 authored assets, 60 guide strips.
- Desktop frame p95: 8.4 ms.
- Desktop draw calls: 290.
- Mobile quality: low.
- Mobile draw calls: 231.

## Remaining Risk

This is route staging, not the final Bruno-level world. It improves district readability and density, but the island still needs deeper authored modeling, animation, lighting, camera, physics, and performance passes before the full goal can be considered complete.
