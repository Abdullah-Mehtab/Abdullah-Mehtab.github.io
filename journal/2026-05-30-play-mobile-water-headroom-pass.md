# Play mobile water headroom pass

## Decision

Keep authored shoreline life and tide-pool glimmers on medium/high quality, but disable them on low/mobile quality.

## Reasoning

The previous shoreline pass left mobile low quality exactly on the verifier draw-call limit at 235 calls. That leaves no room for future authored island work. Low/mobile still keeps foam rings, shore flecks, wave lanes, wake/splash behavior, bobbing props, roads, foliage, and district signals, so the mobile tier remains readable while medium/high keep the richer shoreline art.

## Failed Attempt

First tested reducing only `low.districtDressingRadius` from 92 to 76. That reduced mobile district dressing visibility from 95 visible batches to 79 visible batches, but the renderer draw-call sample stayed at 235. Since it did not move the measured budget, the radius change was reverted.

## Implementation

- Set `TIDE_GLIMMER_LIMITS.low` to `0` in `play-src/src/world/Water.js`.
- Changed the base shoreline life group visibility so the authored tide-pool/breakwater kits appear on medium/high, not low.
- Tightened verifier gates in `tools/verify-play.mjs`: mobile low must now have zero visible shoreline life kits, zero visible tide glimmers, and no more than 230 draw calls.
- Rebuilt the static `/play` output, updating `play/game-assets/index.js`.

## Verification

Commands run on 2026-05-30:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Final verifier output:

- `.codex-tmp/play-verify-2026-05-30T05-01-21-684Z`
- Console/page errors: 0.
- Desktop frame time: average 8.29ms, p95 8.4ms, estimated FPS 120.6.
- Desktop renderer load: 392 draw calls, 232450 triangles.
- Mobile low quality: 228 draw calls, 132956 triangles.
- Mobile low water tier: 0 visible tide glimmers, 0 visible shoreline life kits.
- Medium water interaction remains unchanged at 12 visible tide glimmers and 9 visible shoreline life kits.
- Route replay: 39/39 passed.
- Collider audit: 5/5 passed.
- Protected FCC near-field model remained exact in the verifier output.

## Notes

This creates seven mobile draw calls of headroom compared with the previous 235-call result. It is not a visual upgrade by itself; it is a budget recovery pass so the next island/world-art pass can add authored detail without pushing mobile over the current limit.
