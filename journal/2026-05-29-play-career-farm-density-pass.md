# /play Career And Farm Density Pass

## Decision

Career and Farm were still too sparse after the silhouette-anchor pass. This checkpoint adds authored set-piece structure using existing world materials and already-authored polish assets:

- Career gets a larger signal plaza, terminal bank, bench planter, guide marks, and edge trim.
- Farm gets field pads, crop rows, soil rows, fence segments, extra irrigator/lantern/bench assets, lamps, and track guide marks.

No protected car or FCC/S-block model asset was changed.

## Verification

Commands run:

- `npm run play:build`
- `npm run play:verify`
- `npm test`

Browser verifier output:

- Result: passed
- Output directory: `.codex-tmp/play-verify-2026-05-29T14-01-00-232Z`
- Console errors: 0
- Page errors: 0
- Route replay: 39/39 passed
- Collider audit: 5/5 passed
- Desktop p95 frame: 8.4ms
- Desktop draw calls: 311
- Desktop triangles: 414,408
- Mobile low draw calls: 228
- Mobile low triangles: 303,830
- Career connector marks: 7
- Farm rows: 8
- Farm fence segments: 12
- Protected FCC near mode: exact model visible
- Protected FCC far mode: silhouette visible, exact model hidden

`npm test` passed with map validation and protected route/static reference checks.

## Screenshot Notes

Checked screenshots:

- `zone-career.png`: Career now reads as a larger staged plaza instead of a mostly empty lawn around the office.
- `zone-potato.png`: Farm now has visible crop rows and fencing, making the potato district more legible from the road.
- `02-start-driving.png`: first driving view still renders with the same route and car framing; no new UI overlap observed in this screenshot.

## Remaining Work

The pass improves density but does not solve the whole goal. Remaining high-value work includes authored road/gameplay redesign, stronger district-specific interactions, audio polish, water/shore gameplay depth, and replacing remaining generic-looking open spaces with composed terrain and props.
