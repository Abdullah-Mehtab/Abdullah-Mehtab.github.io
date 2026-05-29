# Play Mobile Set-Piece Quality Pass

## Decision

Secondary approach and gateway dressing should be quality-aware. Medium and high quality keep those groups visible; low quality hides them so mobile does not carry the full desktop scene cost.

## Reasoning

The desktop scene has enough authored detail to remain readable, but the mobile verifier was close to the draw-call budget. The next visual passes will need more authored art, so low quality needs headroom before the scene grows further.

## Implementation Notes

- Added quality-group tracking to `SetPieces`.
- Registered `SETPIECE_Approach_Dressing` and `SETPIECE_District_Gateways` as secondary groups.
- Low quality hides the two secondary groups; medium and high show them.
- Primary landmarks, FCC, car, road guidance, interactions, panels, map, and portfolio actions remain visible.
- Added verifier coverage for medium visibility and mobile low hiding behavior.
- Tightened the mobile draw-call verifier budget from 260 to 235.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verifier output: `.codex-tmp/play-verify-2026-05-29T13-38-19-920Z/result.json`.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Console/page errors: 0.
- Desktop p95 frame time: 8.4 ms.
- Desktop draw calls: 314.
- Desktop triangles: 381,612.
- Mobile low draw calls: 226.
- Mobile low triangles: 270,566.
- Mobile low set-piece visibility: 2 secondary groups, 0 visible.
- Medium set-piece visibility: 2 secondary groups, 2 visible.

## Follow-Up

This is a performance guardrail, not the final art pass. The next authored-world work should use this headroom instead of increasing mobile cost blindly.
