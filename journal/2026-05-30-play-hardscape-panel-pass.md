# Play Hardscape Panel Pass

## Decision

Changed broad rectangular set-piece ground slabs into chipped hardscape panels with built-in seam strips.

The goal is to make Start Hub, FCC Grove, Security, and district courts read less like flat placeholder pads while preserving the current placement, zone access, road surfaces, and physics.

## Implementation Notes

- Replaced `groundRect` box slabs with deterministic chipped panel geometry.
- Added subtle seam strips to the panels using material-aware dark or cool line materials.
- Added surface panel stats so the verifier can prove the chipped panel treatment is active.
- Did not touch the protected Sabre Turbo-style car model or the FCC/S-block model.

## Verification

Commands run on 2026-05-30:

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.

Verifier output:

- Output directory: `.codex-tmp/play-verify-2026-05-30T13-51-48-038Z`.
- Console messages: none.
- Page errors: none.
- High quality: p95 frame time 8.4 ms, 439 draw calls, 259488 triangles.
- Mobile low tier: 230 draw calls, 132362 triangles.
- Route replay: 39 passed, 0 failed.
- Collider audit: 5 total, 0 failures.
- Surface panels: 21 hardscape panels, 21 chipped panels, 99 seam strips.

Screenshots inspected:

- `02-start-driving.png`
- `zone-education.png`
- `zone-security.png`
- `zone-projects.png`
- `zone-cv.png`
- `mobile-start.png`

## Remaining Gap

This reduces the placeholder-pad look, but it does not complete the district rebuild. Several zones still need stronger authored silhouettes, terrain transitions, and more composed approach paths.
