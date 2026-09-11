# three.js, vendored

Three.js r183.2, MIT licensed, copied unmodified from `node_modules/three/build/`.

Two files, not one. `three.module.min.js` opens with
`import ... from "./three.core.min.js"`, so the pair has to travel together and stay in the
same directory. Deleting the core file leaves a module that resolves to a 404 and a page that
fails silently.

Self-hosted rather than loaded from a CDN, per `CLAUDE.md`: a hotlink is a dependency on
someone else's access policy, and nothing in this repository would notice it being revoked.

To update: copy both files again from `node_modules/three/build/` and re-run
`.claude-tools/audit-scene-perf.mjs`. There is no build step here and there must not be one.
