# Play district dressing visibility pass

## Context

The active `/play` goal requires dense authored districts and stronger performance at the same time. The previous verifier run showed the active surface-feedback view at 687 draw calls and 316762 triangles, with `SETPIECE_District_Dressing` rendering 163 mesh/material batches and 81500 triangles from a wide camera angle.

## Decision

Merged district-dressing batches now have a quality-tiered distance visibility radius. Nearby authored district details stay visible while far district batches are hidden during active driving. The protected FCC model and Sabre Turbo-style car are not part of this system.

Quality radii:

- low: 118
- medium: 172
- high: 238

The verifier now records district-dressing visibility in active render snapshots, desktop runtime metrics, and mobile metrics. It also asserts that the surface-feedback and mobile views hide at least one district batch, and tightens active render budgets from 760 calls / 340000 triangles to 700 calls / 330000 triangles.

## Verification

Commands run on 2026-05-30:

- `npm run play:validate-map`
- `npm run play:build`
- `npm run play:verify`
- `npm test`

Final browser verifier output:

- `G:\Resume-Website\.codex-tmp\play-verify-2026-05-30T00-54-58-134Z`
- console messages: 0
- page errors: 0
- desktop FPS: 120.85
- desktop p95 frame: 8.4 ms
- desktop draw calls: 357
- desktop triangles: 238158
- mobile low draw calls: 228
- mobile low triangles: 132532
- driving stress snapshot: 447 calls, 265986 triangles
- surface-feedback snapshot: 632 calls, 305902 triangles
- surface-feedback district dressing: 108 visible batches, 55 hidden batches, 163 total
- mobile district dressing: 135 visible batches, 28 hidden batches, 163 total
- route replay: 39/39 passed
- collider audit: 5/5 passed

Screenshots inspected from verifier output:

- `02-start-driving.png`
- `05-surface-feedback.png`
- `zone-education.png`
- `zone-security.png`
- `mobile-start.png`

## Failure note

After tightening the active render budget, one verifier run failed on `world life probe failed: beaconAnimated`. The recorded beacon movement delta was `0.004999154543325002` against a strict `> 0.005` single-beacon threshold. The probe now samples the maximum movement across visible whisper beacons, which verifies the intended animation without depending on one beacon's sine phase.

## Remaining work

This is a performance and verifier checkpoint, not completion of the full overhaul. The next high-value pass should target another broad active-view bucket, likely route composition, gateways, or static road detail, while preserving authored density near the car.
