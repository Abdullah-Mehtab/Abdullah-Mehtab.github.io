# Play Fresh Mobile Render Sampling

## Decision

Change the mobile verifier sample to reset `renderer.info`, wait for a fresh animation frame, and then read draw calls/triangles. This keeps mobile render metrics tied to the current scene state after culling and screenshot capture.

## Verification

- `npm run play:verify` passed.
- `npm test` passed.
- Verification output: `.codex-tmp/play-verify-2026-05-31T01-19-16-339Z`.
- Mobile reported `freshRenderSample=true`.
- Mobile still reported 230 calls and 132362 triangles after the fresh-frame sample.
- Mobile visible scene stayed at 517 meshes and 840 visible objects.
- `STUNT_Yard_Dressing` stayed absent from the mobile render profile.

## Finding

The stale-metric hypothesis was wrong. Mobile calls remain genuinely flat at 230 after the stunt-yard cull, so the next performance work should target the remaining high-cost buckets directly: district dressing batching/materials, vehicle mesh/material count, and road network mesh count.
