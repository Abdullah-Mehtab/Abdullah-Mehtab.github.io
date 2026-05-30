# Play mobile water tier

## Context

After adding shoreline foam flecks, the mobile low-quality render path passed but sat close to the draw-call cap. The `/play` goal requires water to feel alive while staying usable on mobile, so the next checkpoint focused on reducing low-tier water cost without changing desktop medium/high water detail.

## Decision

Disable surface-glint strips on the low water tier while keeping low-tier foam rings, wave lanes, shoreline flecks, bobbing props, splashes, wakes, drag, and submerge respawn. Desktop medium/high still keep surface glints.

The `Water.applyQuality()` fallback changed from `||` to `??` so an explicit tier limit of `0` is respected instead of falling back to the medium value.

## Failed attempt

The first verifier run failed because `GLINT_LIMITS.low = 0` was treated as falsy by the previous `|| GLINT_LIMITS.medium` fallback. Mobile reported 20 visible surface glints instead of 0. The root cause was the fallback operator, not the quality profile or verifier.

## Verification

Commands run on 2026-05-30:

- `npm run play:validate-map`
- `npm run play:build`
- `npm run play:verify`
- `npm test`

Browser verifier output:

- `G:\Resume-Website\.codex-tmp\play-verify-2026-05-30T00-08-00-590Z`
- console messages: 0
- page errors: 0
- desktop FPS: 120.31
- desktop p95 frame: 8.5 ms
- desktop draw calls: 357
- desktop triangles: 238158
- mobile low draw calls: 232
- mobile low triangles: 133120
- mobile low visible surface glints: 0
- mobile low visible shoreline flecks: 24
- medium visible surface glints: 20
- medium visible shoreline flecks: 72
- route replay: 39/39 passed
- collider audit: 5/5 passed

## Notes

This is a performance-tier checkpoint. It does not complete the full `/play` overhaul. The next high-value work remains reducing expensive district/vehicle/road render groups and improving authored scene quality district by district.
