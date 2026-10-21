# three.js, vendored

Three.js r183.2, MIT licensed, copied unmodified from `node_modules/three/build/`.

Two files, not one. `three.module.min.js` opens with
`import ... from "./three.core.min.js"`, so the pair has to travel together and stay in the
same directory. Deleting the core file leaves a module that resolves to a 404 and a page that
fails silently.

Self-hosted rather than loaded from a CDN: a hotlink is a dependency on
someone else's access policy, and nothing in this repository would notice it being revoked.

To update: copy both files again from `node_modules/three/build/` and run `npm test`, which
fails if the chapter's scene stops mounting. There is no build step here and there must not be one.

## addons/

Four of three's add-ons, the same release, copied unmodified from `node_modules/three/examples/jsm/`
into the same folder names, so the add-ons' own imports of each other still resolve:
`loaders/GLTFLoader.js`, which loads the Offensive Security Home Lab chapter's models, the two
`utils/` files it imports, and `libs/meshopt_decoder.module.js`, which unpacks the models' compressed
geometry.

They import three by its bare name, `three`. A page that loads them has to map that name to
`three.module.min.js` in an import map, before any module script:

```html
<script type="importmap">{ "imports": { "three": "../assets/vendor/three/three.module.min.js" } }</script>
```

The map points at the same file the engine imports by path, so the page gets one copy of three.
To update, copy the four files again from the same `node_modules` release as the two above.
