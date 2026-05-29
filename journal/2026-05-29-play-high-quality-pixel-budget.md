# Play High Quality Pixel Budget

## Context

The `/play` verifier keeps the default desktop path on medium quality and mobile default on low quality, but visitors can save the high quality tier. The high tier previously allowed a 1.35 pixel ratio with shadows and postprocessing, which is a likely source of real-world GPU spikes on high-DPI displays.

## Decision

Cap the high quality renderer pixel ratio at 1.2 and slightly reduce high-tier bloom strength. Keep shadows and postprocessing enabled so the tier still reads as the premium visual mode, but reduce the pixel fill cost. Mirror the same pixel ratio in the world quality profile and add verifier coverage for the saved high-quality mobile path.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed using `.codex-tmp/play-verify-2026-05-29T19-34-30-236Z`.
- `npm test` passed.
- Saved high-quality mobile path: pixelRatio 1.2, maxPixelRatio 1.2.
- Default mobile low verifier metrics: 230 draw calls, 184,726 triangles.
- Desktop verifier metrics: p95 frame time 8.4ms, average frame time 8.3ms, 120.51 FPS, 334 draw calls, 331,242 triangles.
- Route replay: 39 of 39 segments passed.
- Collider audit: 5 of 5 passed.
- Console/page errors: none reported by the verifier.

## Notes

This does not solve every possible performance issue. Future profiling should focus on authored district mesh/material count, GLB payload size, and postprocessing cost on real hardware.
