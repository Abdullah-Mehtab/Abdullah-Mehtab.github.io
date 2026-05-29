# Play Circuit Start Composition Pass

## Context

The circuit start area still read sparse compared with the authored district and shoreline passes. The goal requirement is not satisfied by a single track gate on open grass; the circuit needs a readable start-grid composition with visible racing intent and verifier coverage.

## Change

- Added a circuit start composition around the existing `circuit` zone.
- Used existing authored polish/stunt assets: circuit gate, stunt checkpoint, score towers, arrow fences, route lanterns, and road barriers.
- Added start-grid and pit-lane pads, checker stripe, grid marks, curb markers, light tiles, and yard edge details.
- Added runtime stats and verifier assertions for circuit start pads, grid marks, authored assets, checkpoint gate, score towers, arrow fences, and lane lights.

## Verification

- `npm run play:validate-map` passed: 12 road paths, 39 road segments, 16 zones.
- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T12-25-52-590Z`.
- Screenshots inspected: `zone-circuit.png`.

Key verifier metrics:

- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console messages: 0.
- Page errors: 0.
- Desktop p95 frame: 8.4 ms.
- Desktop FPS: 120.76.
- Desktop draw calls: 304.
- Desktop triangles: 350,534.
- Mobile quality: low.
- Mobile draw calls: 242.
- Mobile triangles: 321,170.
- Circuit start stats: 2 pads, 18 grid marks, 10 authored assets, 1 checkpoint gate, 2 score towers, 2 arrow fences, 6 lane lights, 2 pit details.

## Remaining Risk

This is an incremental composition pass, not completion of the full Bruno-level goal. The circuit start now has more authored staging, but the full circuit still needs deeper track gameplay, route pacing, scoring feedback, audio, and stronger camera/game-feel tuning.
