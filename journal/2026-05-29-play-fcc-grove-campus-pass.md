# FCC Grove Campus Surroundings Pass

## Decision

Keep the FCC/S-block protected landmark model unchanged, but make its district feel less like an isolated asset by adding authored campus surroundings around it.

## Why

The education stop is a protected identity anchor, so the model itself should not be remodeled or reskinned. The weak part was the surrounding staging: approach paths, small campus props, and camera framing did not sell a deliberate university grove. This pass adds campus-specific dressing while keeping the protected model and collider behavior intact.

## Changes

- Added Blender-authored campus prop templates: `EnvPolishCampusFountain`, `EnvPolishCampusNoticeBoard`, `EnvPolishCampusWalkwayPavilion`, and `EnvPolishCampusStudyBench`.
- Added left/right campus walks, arrival pavers, guide strips, and placed the new props around the FCC grove.
- Adjusted the education presentation camera to show more of the campus staging around the building.
- Added verifier coverage so the campus prop templates and placements are checked.

## Verification

Verified on 2026-05-29 with:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Latest browser verification output:

- Directory: `.codex-tmp/play-verify-2026-05-29T18-19-36-234Z`
- Console messages: 0
- Page errors: 0
- Desktop frame profile: 324 calls, 328,078 triangles, 8.29 ms average frame, 8.4 ms p95, 120.64 FPS
- Mobile low profile: 221 calls, 182,374 triangles
- Route replay: 39/39 passed
- Collider audit: 5/5 passed
- Protected FCC landmark: far silhouette mode, near exact mode, exact triangles 139,068, silhouette triangles 804
- FCC set piece profile: 28 meshes, 14,894 triangles
- New campus authored assets: all templates present and placed

## Notes

The screenshot `zone-education.png` in the verifier output shows the protected FCC building intact with added plaza, fountain, pavilion, benches, signage, lamps, and garden/sidewalk staging. This is a checkpoint toward the larger island-quality goal, not the final Bruno-level finish.
