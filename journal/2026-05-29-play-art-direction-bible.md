# /play Art Direction Bible

## Decision

The `/play` world should be a finished stylized driving portfolio, not a flat island with landmarks. Bruno Simon remains the quality benchmark for density, staging, game feel, readable controls, and playful motion, but this project must stay original and preserve the Sabre Turbo-style car and FCC/S-block model identities.

## Visual Rules

- Shape language: chunky low-poly forms, beveled edges, clean silhouettes, and readable props at driving speed.
- Palette: warm sunlit grass, teal water, pale stone, red/orange car paint, amber lamps, mint/cyan tech accents, and restrained pink warning accents.
- Lighting: warm low sun plus cool rim light. Districts need local accent light, but bloom must stay subtle and tiered.
- Terrain: island size can remain broad, but every route needs authored berms, beaches, cliffs, plazas, roads, and visual stops. Empty grass is a failure state.
- Roads: roads must guide driving. Use main loops, smaller district roads, shoulders, curbs, markings, signs, ramps, and plazas. Avoid arbitrary circles.
- Water: water must be alive through waves, foam, shallow/deep color, shore motion, bobbing props, splash feedback, drag, and submerge respawn.
- Props: repeated props are acceptable only when composed into districts. Random scatter is worse than fewer well-placed objects.
- FCC: the protected FCC/S-block model is the hero of the education district. Surroundings may improve; the building identity must not change.
- Car: the protected car must remain a toy muscle car: strong stance, wheelie/burnout fantasy, drift, boost, jump, tire feedback, and responsive camera.
- UI: in-world signs and small terminal overlays should lead. Large web-style panels should not dominate the primary experience.

## Performance Budgets

- Default quality should target p95 frame time under 20ms on desktop.
- Low quality must reduce particles, water detail, shadows/post, and animated decorative props.
- Repeated authored props should come from source assets and be cloned/merged/instanced where practical.
- Every collider must have a visible reason and debug metadata.
- More visual density is only acceptable if verification metrics stay within budget.

## Current Checkpoint Focus

The next implementation slice is shoreline/water because it is explicitly incomplete against the goal and can be improved without replacing the protected car or FCC model. The pass should add authored shoreline templates, tiered bobbing props, splash particles, water drag, and submerge respawn while preserving current verification gates.
