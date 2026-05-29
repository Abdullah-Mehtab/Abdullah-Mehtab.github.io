ABOUTME: Records the /play terminal-style UI checkpoint.
ABOUTME: Captures verification evidence for compact panels, map/menu styling, and runtime probes.

# /play Terminal UI Pass

## Decision

The interaction layer still read too much like centered website modals. This pass moves zone content toward compact terminal panels, makes prompts zone-accented, docks the drive menu to the side, and adds browser verification for an actual zone panel screenshot.

This does not complete the full Bruno-level world goal. It is a checkpoint toward the stated UI requirement: less modal, more world-integrated, and still verifiable.

## Implementation Notes

- Added panel metadata chips for signal type, nearest district, stop id, link count, scanner state, farm counter, or circuit state.
- Set zone accent color on prompts and panels from the active zone data.
- Kept portfolio actions and zone ids unchanged.
- Restyled the drive menu as a right-side console instead of a large centered card.
- Kept the map available and visually smaller while preserving fast-travel pins.
- Added `panel-security.png` and `panelUi` assertions to `tools/verify-play.mjs`.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Browser verification output: `.codex-tmp/play-verify-2026-05-29T03-36-17-281Z/result.json`.
- Screenshot evidence includes `panel-security.png`, `menu.png`, `map.png`, and `mobile-start.png` in that directory.
- Console messages: 0.
- Page errors: 0.
- Route replay: 39/39 passed.
- Desktop runtime sample: 120.4 FPS, p95 8.4ms, 433 draw calls, 315,798 triangles.
- Mobile low sample: 187 draw calls, 128,606 triangles.
- Panel probe: security terminal visible, mode `terminal`, 5 metadata chips, 520px card width.

## Remaining Work

The UI is less intrusive, but the full goal still requires deeper authored modeling, district art completion, sound polish, and continued game-feel/optimization passes.
