# /play CV And Career Yard Detail Pass

## Decision

Extend the authored yard-detail kit to CV Vault and Career Signal Office.

## Why

After Todo and Behind were framed, the latest screenshots showed CV Vault and Career Signal Office as comparatively sparse: simple pads, weak edge definition, and little surface storytelling. This pass reuses the existing authored trim/detail kit instead of adding another asset family.

## Changed

- Added authored edge trims, surface marks, and process rails to CV Vault.
- Converted the CV pad to tracked district composition stats.
- Converted the Career office deck to tracked district composition stats.
- Added authored edge trims, surface marks, and process rail detail to Career Signal Office.
- Raised `districtComposition` verifier thresholds to require the expanded detail layer.
- Rebuilt the GitHub Pages `/play` bundle.

## Verification

- `npm run play:validate-map` passed.
- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T11-56-19-210Z/result.json`
- Screenshots inspected:
  - `zone-cv.png`
  - `zone-career.png`
  - `zone-todo.png`
  - `zone-behind.png`

## Metrics

- Desktop p95 frame time: 8.4 ms.
- Desktop draw calls: 300.
- Desktop triangles: 326,042.
- Mobile draw calls: 238.
- Mobile triangles: 296,678.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console/page errors: 0.
- `districtComposition`: 6 pads, 15 path marks, 4 lamps, 2 planters, 57 authored assets, 36 edge trims, 10 surface marks, 5 rails.

## Remaining Gap

CV Vault now reads as more intentionally framed. Career still needs a dedicated silhouette/camera pass because the current verifier screenshot is dominated by the roof and does not show the new yard detail well.
