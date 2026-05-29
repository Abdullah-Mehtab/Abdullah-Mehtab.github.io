# Play Contextual Whisper Signals

## Decision

Converted the existing world whisper beacons from purely visual life props into proximity-driven contextual UI signals. The implementation keeps the authored beacon positions as the source of truth, exposes nearest-whisper lookup through the world layer, and lets the UI show a compact "Island Signal" card only while driving and outside panels/menus/maps.

This moves guidance out of modal-heavy UI and closer to the in-world Bruno-inspired feel without adding heavy geometry or changing protected constants.

## Verification Notes

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Latest verifier output: `.codex-tmp/play-verify-2026-05-29T20-38-08-316Z`.
- Browser verifier reported no console messages and no page errors.
- Whisper probe: 10 total beacons, nearest beacon matched, overlay visible, text length valid, width 360px.
- Runtime metrics from verifier: 71.72 FPS, p95 frame 16.8ms, 347 draw calls, 233142 triangles.
- Mobile low tier remained active: 230 draw calls, 136918 triangles.
- Route replay passed 39/39 segments.
- Collider audit passed 5/5 visible collider checks.

## Failed Approach

The first verifier probe tried to show the whisper card by manually calling the UI method. The live game loop immediately hid it because the car was not actually near a beacon. The verifier now respawns the vehicle to an active whisper beacon and samples the real runtime path instead.

The first CSS fix hit the wrong animation target: the interaction prompt received the non-centered animation while the whisper card still used the centered prompt animation. The final version keeps the interaction prompt on `prompt-in` and gives the whisper card its own `whisper-in` keyframes so it does not overlap the minimap.

## Remaining Goal Status

This is only one checkpoint toward the full `/play/` overhaul. The broader Bruno-level art direction, physics, audio, district modeling, water, road, optimization, and final acceptance goals remain active.
