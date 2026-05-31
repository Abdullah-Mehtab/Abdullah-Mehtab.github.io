# Play Stunt Low Tier Culling

## Decision

Add distance-based visibility for the stunt yard decoration group. The ramps, boost pads, and circuit systems stay active; only the visual yard dressing is hidden on low quality when the player is far from the stunt district.

## Reasoning

The mobile render profile showed `STUNT_Yard_Dressing` as a visible top bucket from the start view even though the player begins far from the stunt yard. Hiding that far-away decoration on low quality reduces visible scene work without removing the stunt gameplay or changing the car/FCC protected assets.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Verification output: `.codex-tmp/play-verify-2026-05-31T00-17-21-172Z`.
- Console messages: 0.
- Page errors: 0.
- High quality start: 471 calls, 262732 triangles, p95 8.4ms, 121.02 FPS.
- Mobile low tier: 230 calls, 132362 triangles.
- Mobile visible scene: 517 meshes, 840 visible objects.
- Mobile stunt yard: `yardDressingVisible=false`, cull radius 76.
- Root/medium stunt yard: `yardDressingVisible=true`, cull radius 142.
- Route replay: 39/39 segments passed.
- Collider audit: 5/5 colliders passed.

## Important Limit

This reduced visible mobile meshes from the previous 537 to 517 and removed `STUNT_Yard_Dressing` from the mobile render profile, but the renderer call counter still reported 230 calls. The next optimization pass should target the remaining top buckets: district dressing, vehicle meshes, and road network meshes/materials.
