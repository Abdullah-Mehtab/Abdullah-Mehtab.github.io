# Play Potato Low Tier Culling

## Decision

Add distance-based visibility for the potato farm dressing group. The farm remains available when the player approaches it, and temporary spawned potatoes are not tied to this visibility cull.

## Reasoning

After the stunt-yard cull, the mobile render profile still showed a far-away `ZONE_potato_voxel_farm` bucket from the start view. The landing area is far from the potato farm, so low quality should not pay that visible-scene cost until the player gets near the farm district.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Verification output: `.codex-tmp/play-verify-2026-05-31T12-08-26-369Z`.
- Console messages: 0.
- Page errors: 0.
- Mobile low tier: 230 calls, 132362 triangles.
- Mobile visible scene: 507 meshes, 37 instanced meshes, 829 visible objects.
- Mobile potato farm: `visible=false`, cull radius 76.
- `ZONE_potato_voxel_farm` no longer appears in the mobile start render profile.
- Route replay: 39/39 segments passed.
- Collider audit: 5/5 colliders passed.

## Important Limit

This reduced visible low-tier scene objects and removed the farm bucket from mobile start, but the mobile call counter remains at 230. The remaining heavy buckets are still district dressing, the vehicle, and the road network.
