# Play Camera Game-Feel Pass

## Decision

The follow camera should respond more clearly to speed, boost, handbrake drift, burnout, wheelie, and landing. The car model and physics identity stay protected; this pass changes framing and feedback around the existing car.

## Reasoning

The verifier already proved the mechanics existed, but mechanics alone do not make the drive feel alive. The camera response was too conservative for the toy-muscle-car target, especially during boost, burnout, wheelie, and drift.

## Implementation Notes

- Increased speed pullback and speed lookahead in `CameraRig`.
- Increased boost, burnout, wheelie, handbrake, and landing camera shake.
- Increased FOV response to speed, boost, handbrake, wheelie, and landing.
- Added camera feel metrics to `CameraRig.getDebugStats()`.
- Added verifier assertions for camera FOV, shake, and speed pull response.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T13-43-08-977Z/result.json`.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console/page errors: 0.
- Desktop p95 frame time: 8.4 ms.
- Desktop draw calls: 309.
- Mobile low draw calls: 226.
- Camera feel metrics: max FOV 65.04, max shake 0.46, max speed pull 5.63, max lateral pull 0.82.

## Follow-Up

This makes the car framing more expressive, but deeper driving work still remains: stunt route design, drift scoring, stronger engine/tire audio events, and manual feel iteration outside the verifier.
