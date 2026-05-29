# Play First Frame UI Ticket Pass

## Decision

Reduced the `/play` title overlay from a large instruction-heavy card into a smaller start ticket. The first frame now emphasizes the authored road, car, start plaza, signs, and distant districts instead of leading with a web-modal feeling.

Also tightened the mobile debug readout so `?debugDrive=1` no longer turns the mobile screenshot into a large text block.

## Verification Notes

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Latest verifier output: `.codex-tmp/play-verify-2026-05-29T21-15-34-334Z`.
- Checked `01-title.png`; the start ticket is smaller and the first-frame composition remains visible.
- Checked `mobile-start.png`; debug readout is shorter and does not overlap the top HUD.
- App-ready load time: 6020ms.
- Desktop verifier metrics: 76.5 FPS, p95 frame 16.8ms, 348 draw calls, 237106 triangles.
- Mobile low tier metrics: 232 draw calls, 141944 triangles.
- Route replay passed 39/39 segments.
- Collider audit passed 5/5 visible collider checks.
- No console messages or page errors were reported.

## Follow-Up

The first frame is less modal-heavy, but the next visual work should be in-world authored composition and camera framing rather than more UI polish.
