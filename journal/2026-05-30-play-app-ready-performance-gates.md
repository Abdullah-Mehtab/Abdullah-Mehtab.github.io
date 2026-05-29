# Play App-Ready Performance Gates

## Decision

Changed the `/play` browser verifier to measure startup using DOM load plus the app's own `waitForReady` signal instead of `networkidle0`. The prior verifier wait condition was too strict for this runtime page and had already produced a mobile navigation timeout. It also inflated the reported `loadMs` to roughly 45 seconds even when the game was ready much earlier.

The environment asset loader now starts the protected FCC asset pack and polish prop asset pack together because those GLB loads are independent.

## Verification Notes

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Latest verifier output: `.codex-tmp/play-verify-2026-05-29T20-49-24-941Z`.
- App-ready load time from the updated verifier: 4544ms.
- Desktop verifier metrics: 72.57 FPS, p95 frame 16.8ms, 346 draw calls, 232062 triangles.
- Mobile low tier metrics: 230 draw calls, 136918 triangles.
- Route replay passed 39/39 segments.
- Collider audit passed 5/5 visible collider checks.
- No console messages or page errors were reported.

## Performance Guardrail

The verifier now fails if app-ready load time exceeds 15000ms or desktop FPS drops below 60. Existing p95, draw-call, triangle, GLB-size, route replay, mobile, and collider gates remain in place.

## Note

The asset loader parallelization did not by itself prove a lower measured startup time under the old network-idle metric. The useful fix was making the metric reflect app readiness instead of network-idle behavior. Further load work should target asset size, GLB compression, code splitting, and FCC distance/near-field strategy with direct measurements.
