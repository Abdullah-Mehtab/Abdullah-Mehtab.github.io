# Play Road Threshold Material Pass

## Decision

Changed road threshold and road-edge visual treatment so it reads less like broad translucent debug geometry.

The route topology, road surface metadata, and physics were left intact. The pass only changes visual materials for the decorative route thresholds and verge feathers.

## Implementation Notes

- Added an alpha-mapped broken threshold pattern for road transition aprons.
- Added an alpha-mapped broken verge pattern for road-edge feathers.
- Reduced road verge opacity and narrowed edge-feather widths.
- Added verifier probes for the threshold and verge patterns so future passes cannot silently restore full translucent sheets.
- Did not touch the protected Sabre Turbo-style car model or the FCC/S-block model.

## Verification

Commands run on 2026-05-30:

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.

Verifier output:

- Output directory: `.codex-tmp/play-verify-2026-05-30T13-39-46-656Z`.
- Console messages: none.
- Page errors: none.
- High quality: p95 frame time 8.4 ms, 436 draw calls, 259188 triangles.
- Mobile low tier: 229 draw calls, 132302 triangles.
- Route replay: 39 passed, 0 failed.
- Collider audit: 5 total, 0 failures.
- Road threshold apron pattern: `broken-threshold`, alpha mapped.
- Road edge feather pattern: `broken-verge`, alpha mapped, opacity 0.08.

Screenshots inspected:

- `02-start-driving.png`
- `zone-landing.png`
- `zone-education.png`
- `zone-security.png`

## Remaining Gap

This is still not the full road-layout rebuild. The island needs a deeper authored road pass to replace the remaining broad pad-like surfaces and route geometry with more intentional lane hierarchy, shoulders, plaza edges, and terrain transitions.
