# Play Dashboard UI Pass

## Decision

The `/play` map and menu overlays now use the same console-style chrome instead of plain web-card styling. The implementation adds explicit `drive-console` classes to the menu/map cards, keeps the public `/play/` route unchanged, and leaves the car and FCC/S-block assets untouched.

## Reasoning

The latest verified screenshots showed the world becoming more authored, but the menu and map still read like normal web modals. This pass keeps the existing menu/map behavior, fast travel, and zone pins while improving the visual language toward an in-world driving instrument.

## Implementation Notes

- `play-src/index.html` marks the menu/map cards as console overlays.
- `play-src/src/styles.css` adds dashboard chrome, tighter sizing, scanline/grid treatment, stronger map framing, reduced label dominance, and hides the debug readout while overlays are open.
- `play-src/src/ui/UI.js` gives map pins stable `data-zone-id` values and exposes overlay stats to the verifier.
- `tools/verify-play.mjs` records overlay metrics and fails if the dashboard classes, card widths, or map pin count regress.

## Verification

- `npm run play:build` passed.
- `npm run play:verify` passed.
- `npm test` passed.
- Latest screenshot/metrics directory: `.codex-tmp/play-verify-2026-05-29T13-00-34-703Z`.
- Key metrics from that verifier run: route replay 39/39, collider audit 5/5, no console/page errors, p95 frame time 8.4ms, desktop draw calls 305, mobile low draw calls 243.

## Follow-Up

The overlay pass improves presentation but does not complete the full Bruno-level objective. Remaining work still needs deeper scene composition, authored landmark density, driving feel iteration, and performance profiling by district.
