# Play Mobile Render Profile Pass

## Decision

Lower the low-quality district dressing radius from 92 to 76 and make the verifier record a mobile visible-scene profile. The goal is to keep the low mobile tier from drawing too much authored district dressing at once, and to expose the next optimization targets with measured buckets instead of guessing.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Verification output: `.codex-tmp/play-verify-2026-05-30T23-12-26-976Z`.
- Console messages: 0.
- Page errors: 0.
- App-ready load: 2991ms.
- High quality start: 471 calls, 262732 triangles, p95 8.4ms, 120.81 FPS.
- Mobile low tier: 230 calls, 132362 triangles.
- Mobile district dressing cull: 85 visible batches, 97 hidden batches, radius 76.
- Route replay: 39/39 segments passed.
- Collider audit: 5/5 colliders passed; no invisible collider failures reported.

## Render Profile Findings

The mobile render profile now reports the highest material-count buckets:

- `SETPIECE_District_Dressing`: 85 meshes, 85 materials, 60448 triangles.
- `Vehicle`: 78 meshes, 78 materials, 29972 triangles.
- `ROAD_Network`: 48 meshes, 48 materials, 10132 triangles.
- `SETPIECE_Security_Lab`: 31 meshes, 31 materials, 3684 triangles.
- `SETPIECE_Start_Diorama`: 30 meshes, 30 materials, 3844 triangles.
- `SETPIECE_FCC_Education_Grove`: 30 meshes, 30 materials, 8094 triangles.

## Important Limit

This pass did not lower mobile render calls below 230. It reduced visible low-tier district dressing and added evidence for the next optimization pass. The next measured targets are district dressing material count, vehicle material count, and road network mesh/material count.
