# /play Authored District Props Pass

## Decision

The non-protected portfolio districts should move away from generic runtime boxes toward reusable authored source props. This checkpoint extends the Blender polish prop source with district-specific templates and places them in the world while leaving the protected Sabre Turbo-style car and FCC/S-block model untouched.

## Implementation Notes

- Added Blender-authored templates for Projects Forge, CV Vault, Skills Array, Career Office, Awards Monument, Todo Board, Circuit Gate, Build Workbench, Farm Irrigator, and Harbor Signal.
- Regenerated `play-src/assets/models/world/polish-props.glb`; the built `/play` copy is now 1,089,748 bytes.
- Placed the new templates in matching districts through `SetPieces`.
- Extended `npm run play:verify` to fail unless every new authored district template is both loaded from the GLB and present in the scene.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed with output `.codex-tmp/play-verify-2026-05-29T00-06-55-454Z`.
- `npm test` passed.

Latest verifier metrics:

- Console/page errors: 0.
- FPS: 117.95; p95 frame: 8.5ms.
- Render calls: 522; triangles: 284,402.
- Scene objects: 865 total, 636 meshes, 11 lights.
- Gameplay, water, surface, mobile, collider, and zone-count probes passed.
- All 10 new authored district templates were verified as loaded and placed.

## Remaining Risk

These are source-authored district props, but they are still a first art pass. Some pieces are visually chunky and need manual composition, scale, material, and camera staging passes before they reach the final art-direction target. The next district work should focus on composition quality, not simply increasing asset count.
