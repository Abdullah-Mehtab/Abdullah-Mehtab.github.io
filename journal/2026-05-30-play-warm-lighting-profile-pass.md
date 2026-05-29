# Play Warm Lighting Profile Pass

## Context

The current world had accumulated more authored props and terrain detail, but verifier screenshots still showed a broad flat sky and oversized sun treatment. That worked mechanically but weakened the art-direction goal because the scene read closer to a bright test map than a composed toy driving world.

## Decision

Keep the existing cheap sky dome, clouds, horizon ribbons, and quality gates, but retune the lighting stack toward a lower warm sun with a cooler rim:

- Warmer sun and hemisphere colors in `Game.setupScene()`.
- Shorter fog range and warmer fog/background interpolation in `Game.updateLighting()`.
- Smaller, lower sun disk and lower-opacity sun glows in `Atmosphere`.
- Verifier lighting probes for sun height, fog range, exposure, and mobile lighting parity.

The first tuning kept the sun disk too large in the Security district screenshot. I rejected that version before committing and reduced the disk/glow size and intensity further.

## Verification

- `npm run play:validate-map` passed.
- `npm run play:build` passed.
- `npm run play:verify` passed using `.codex-tmp/play-verify-2026-05-29T22-14-59-045Z`.
- Screenshots reviewed: `02-start-driving.png`, `zone-security.png`, and `zone-education.png`.

Latest verifier metrics:

- Console/page errors: 0.
- Load time: 2853ms.
- Desktop FPS: 117.38; p95 frame: 8.4ms.
- Desktop render calls: 353; triangles: 239,914.
- Mobile low render calls: 232; triangles: 142,120.
- Route replay: 39/39 segments passed.
- Collider audit: 5/5 passed.
- Lighting probe: sun height 34, fog 118/500, exposure 1.04.
- Mobile lighting probe: sun height 34, fog 118/500, exposure 1.04.

## Remaining Risk

This improves the global mood without adding cost, but it is still a lighting-tuning pass, not a full final art pass. The next large visual gains need authored district composition, stronger road-side landmarks, and better material/prop silhouette work.
