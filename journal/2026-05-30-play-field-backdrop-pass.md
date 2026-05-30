# /play Field Backdrop Pass

## Decision

Added a medium/high-only `fieldBackdrops` set-piece layer to reduce the remaining "bare grass around decorated pads" read without increasing low-tier mobile render cost. The layer uses the existing Blender-authored `EnvPolish*` prop pack, cullable static batches, lawn/feather patches, guide tiles, frame strips, and lamps.

## Failed attempt

The first version used `broadSetPieceRadius` with 52-unit batching. `npm run play:verify` failed because the layer stayed too visible during the surface-feedback probe:

- `surfaceFeedback` active render calls: 684, over the 660 gate.
- mobile calls: 239, over the 230 gate.

## Correction

Changed field backdrops to use larger 84-unit static-batch cells and the tighter `meadowCompositionRadius`. Moved the east-shore cluster inward so the shore surface-feedback probe does not carry nearby decorative batches.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Latest verifier output: `.codex-tmp/play-verify-2026-05-30T21-32-08-710Z`.
- Mobile: 230 calls, 132362 triangles, field backdrop visible batches 0.
- High quality: p95 8.4ms, 120.25 FPS, 471 calls, 262732 triangles.
- Route replay: 39/39 passed.
- Collider audit: 0 failures.

## Notes

This is a composition pass, not completion of the overhaul. The field layer is intentionally hidden on low quality and kept local on medium quality. Further work should keep adding authored scene meaning, but only with culling and metric gates in place.
