# Document And Terminal District Architecture Pass

## Decision

Add stronger authored silhouettes to the document and terminal-heavy districts instead of leaving them as small signs and flat pads.

## Why

The latest screenshots showed that CV, Skills, Todo, and Behind The Build still read too much like isolated boards on broad ground patches. That was below the active art-direction goal. This pass adds source-authored district structures while keeping the car, FCC/S-block model, public URLs, portfolio actions, and existing zone ids intact.

## Changes

- Added Blender-authored prop templates:
  - `EnvPolishDocumentArcade`
  - `EnvPolishTerminalCanopy`
  - `EnvPolishQueueMarquee`
  - `EnvPolishProcessCrane`
- Staged the new props around CV Vault, Skills Terminal, Todo Board, and Behind The Build.
- Expanded CV and Skills court ground staging.
- Adjusted CV, Skills, Todo, and Behind presentation cameras to frame the authored structures more tightly.
- Raised verifier coverage for the new templates and placement, plus the related authored-asset and silhouette-anchor counts.

## Verification

Verified on 2026-05-29 with:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Latest browser verification output:

- Directory: `.codex-tmp/play-verify-2026-05-29T18-45-30-541Z`
- Console messages: 0
- Page errors: 0
- Desktop frame profile: 324 calls, 328,510 triangles, 8.28 ms average frame, 8.4 ms p95, 120.79 FPS
- Mobile low profile: 222 calls, 182,398 triangles
- Route replay: 39/39 passed
- Collider audit: 5/5 passed
- `polish-props.glb`: 3,631,932 bytes
- Authored district assets: new document/terminal templates present and placed
- District composition: 17 pads, 162 authored assets, 90 edge trims, 11 silhouette anchors

## Notes

The corrected `zone-cv.png`, `zone-skills.png`, `zone-todo.png`, and `zone-behind.png` screenshots show better district silhouettes than the previous checkpoint. This remains a checkpoint toward the full `/play` overhaul, not final art completion.
