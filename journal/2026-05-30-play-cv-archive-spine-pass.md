# Play CV Archive Spine Pass

## Decision

Added `EnvPolishCvArchiveSpine` as a Blender-authored CV district landmark kit instead of continuing to dress the CV stop with flat signs and small runtime primitives only.

The kit lives in `play-assets/source/blender/export_polish_props.py` and is exported through `play-src/assets/models/world/polish-props.glb` / `play/game-assets/polish-props.glb`.

## Implementation Notes

- The CV spine is a low-poly archive/canopy structure with document shelves, display faces, roof/cornice massing, glow strips, column rhythm, and small document blocks.
- It is placed near the CV Vault court from `play-src/src/world/SetPieces.js`.
- The verifier now requires `EnvPolishCvArchiveSpine` to exist as an authored district asset.
- The asset is isolated in `SETPIECE_District_Hero_Dressing`, a secondary quality group registered for broad visibility culling.

## Failed Attempt

The first placement put `EnvPolishCvArchiveSpine` directly inside `SETPIECE_District_Dressing`.

That made the richer CV scene visible, but mobile low failed the verifier:

- `npm run play:verify`
- Failure: `mobile draw-call budget exceeded: 231`
- Mobile low budget in `tools/verify-play.mjs`: max 230 calls

Lowering low-quality `districtDressingRadius` from 92 to 88 did not fix the draw call count. The correct fix was to move the heavier CV hero kit into a secondary quality group so mobile low can hide it while medium/high retain the authored landmark.

## Verification

Verified after the quality-tier fix:

- `npm run play:build`: passed
- `npm run play:verify`: passed
- `npm test`: passed

Browser verifier evidence from `.codex-tmp/play-verify-2026-05-30T05-54-30-274Z/result.json`:

- Console messages: 0
- Page errors: 0
- Mobile low calls: 228
- Mobile low triangles: 132322
- Mobile secondary groups: 4 total, 0 visible
- CV archive spine template: present
- CV archive spine placement: present
- Route replay: 39 passed, 0 failed
- Collider audit: 5 checked, 0 failures
- Protected FCC near mode still exact, far mode still silhouette

## Follow-Up

The CV stop is better, but it is not final-art-direction quality. It still needs stronger foreground composition, more readable approach staging, fewer flat sign surfaces, and better integration with the surrounding roads/terrain.
