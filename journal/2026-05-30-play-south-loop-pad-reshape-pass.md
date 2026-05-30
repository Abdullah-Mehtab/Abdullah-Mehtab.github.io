# Play South Loop Pad Reshape Pass

## Decision

Replace the south-loop visual ground from one broad court into smaller authored pad shapes, and add flat stunt-yard infield/shoulder markers.

The latest verified screenshots showed the stunt and circuit districts still reading as large rectangular slabs. This pass attacks the layout shape itself instead of adding more prop clutter. It does not touch the protected Sabre Turbo-style car, the protected FCC/S-block model, public URLs, zone ids, or ramp colliders.

## Implementation Notes

- `worldData` now lets the `south-loop` district define `visualPads`.
- `Terrain` uses `visualPads` for district grounding and surface details while preserving the top-level district count.
- The old broad `south-stunt-rubber` terrain brush was replaced with smaller runway, pit, and infield brushes.
- `SetPieces` can now create irregular ground patches using `makePatchGeometry`.
- The stunt runoff pad and circuit start pads use irregular ground patches instead of rectangular boxes.
- `StuntPark` adds four flat painted infield islands and four flat runoff shoulder markers.
- The verifier now checks `stuntPark.infieldIslands` and `stuntPark.runoffShoulders`.

## Verification

Verified:

- `npm run play:build`: passed
- `npm run play:verify`: passed
- `npm test`: passed

Browser verifier evidence from `.codex-tmp/play-verify-2026-05-30T06-48-14-397Z/result.json`:

- Console messages: 0
- Page errors: 0
- Route replay: 39 passed, 0 failed
- Collider audit: 5 checked, 0 failures
- Mobile low calls: 228
- Mobile low triangles: 132278
- Active driving calls: 514
- Active driving triangles: 264748
- Surface details: 10 districts, 51 seams, 39 pavers, 26 accents, 31 breakups
- Stunt yard: 4 infield islands, 4 runoff shoulders, 3 ramps, 3 boost pads

Screenshot review:

- `zone-drift.png` now shows more broken-up south-loop ground and clearer track/infield language.
- `zone-circuit.png` is less rectangular than before, but the circuit start still needs a deeper authored track redesign before it can be called final.

## Follow-Up

The next pass should replace the circuit start/circuit route composition with a purpose-built track layout rather than continuing to patch the current camera-facing pad. The broad island quality target is still active.
