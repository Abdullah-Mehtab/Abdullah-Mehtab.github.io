# /play Mobile Quality Default

## Decision

Mobile and narrow viewports now default to low landscape quality when no saved user preference exists. A saved quality still wins, so users who choose medium or high are not forced back to low.

## Reasoning

The previous verifier forced mobile to low by writing `portfolio-drive-landscape-quality` before loading `/play/`. That proved the low tier could render, but not that real first-time mobile visitors would receive the lighter tier. The app now makes that choice in `World.readLandscapeQuality()` based on viewport width, coarse pointer, or touch capability.

## Verification

Commands run with the repo-local Node toolchain:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Verifier output:

- Directory: `.codex-tmp/play-verify-2026-05-29T02-07-08-345Z`
- Console errors: 0
- Page errors: 0
- Mobile no saved quality: `low`
- Mobile saved high quality: `high`
- Mobile low visible life signals: 18
- Mobile low calls: 241
- Mobile low triangles: 101734
- Desktop medium: 119.21 FPS, p95 8.4ms, 590 calls, 285094 triangles
- Route replay: 39/39 passed
- Collider audit: 5/5 passed

Screenshots inspected:

- `mobile-start.png`
- `menu.png`

## Failed Probe

One verifier run at `.codex-tmp/play-verify-2026-05-29T02-04-04-859Z` failed on `bannerAnimated`. The probe only sampled `Life_WindBanner_0`, which made the check too narrow for a world-life system. The verifier now samples visible banners as a set and records the max delta. The passing run recorded banner delta `0.14611505099111416`.

## Remaining Work

This improves the mobile/default quality behavior. It does not complete the full `/play` art overhaul. The next useful optimization step is reducing desktop draw calls from the high 500s while continuing authored district work.
