# /play Quality-Tier Life Pass

## Decision

Decorative world-life effects now obey the existing landscape quality tier. Dense animation is part of the Bruno-level direction, but low/mobile quality must not carry the same animated signal count or update cadence as desktop.

## Changes

- Added `lifeSignals`, `windCadence`, and `particleCadence` budgets to the world quality profiles.
- Made `SetPieces` keep total and visible counts for zone pulses, wind banners, whisper beacons, and terminal pulses.
- Made `SetPieces.applyQuality()` hide inactive decorative life signals and skip their animation work.
- Made `World.setLandscapeQuality()` propagate quality changes to set pieces.
- Made `Foliage` reduce wind and particle update cadence on lower quality tiers.
- Extended `tools/verify-play.mjs` to prove low quality reduces visible life signals, restores medium counts, and makes mobile load the low tier.

## Verification

Commands run with the repo-local Node toolchain:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Verifier output:

- Directory: `.codex-tmp/play-verify-2026-05-29T01-56-39-451Z`
- Console errors: 0
- Page errors: 0
- Desktop medium: 120.84 FPS, p95 8.4ms, 590 calls, 285094 triangles
- Desktop medium visible life signals: 37
- Mobile low: ready, canvas sample 130048, 241 calls, 101734 triangles
- Mobile low visible life signals: 18
- Route replay: 39/39 passed
- Collider audit: 5/5 passed
- Gameplay probes: boost, jump, landing, impact audio, burnout, wheelie, handbrake passed
- Water probes: surface, splash, drag, submerge respawn passed

Screenshots inspected:

- `02-start-driving.png`
- `mobile-start.png`
- `zone-security.png`

## Remaining Work

This pass improves the optimization and quality-tier side of the goal. It does not complete the full art overhaul. The next high-value work should continue reducing draw calls while replacing remaining non-protected district scenery with better authored source assets.
