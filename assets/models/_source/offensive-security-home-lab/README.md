# Offensive Security Home Lab: model sources

The Blender scripts that build the five desk models in act one of the Offensive Security Home Lab
chapter: the PC tower, the keyboard, the mouse, the monitor (used twice) and the laptop. **No page
loads anything from this folder.** The page loads the finished models from
`assets/models/offensive-security-home-lab/`.

The folder `_source` starts with an underscore on purpose. GitHub Pages builds this site with Jekyll,
and Jekyll does not publish any file or folder whose name starts with `_`, so these files stay in the
repository without being served on the site. Keep the underscore if the folder is moved or renamed.

Everything was modelled from scratch in Blender 4.5 in 2026, so no credit line is owed to anyone.

## What is here

- `blender/`: one script per model (`tower.py`, `kbd.py`, `mouse.py`, `monitor.py`, `laptop.py`),
  `assembly.py` for the whole desk, the shared helpers in `lib.py`, the entry point `run.py`, and
  `keys.json`, the keyboard's 87 keys in the order of the legend atlas.
- `tools/optimize.mjs`: shrinks an exported model (dedup, weld, reorder, meshopt compression). Its
  packages are listed in `tools/package.json`. Install them outside this folder.
- `preview/`: the pictures the preview renders put on the screens and keycaps. The page draws its
  own at run time.

The `.blend` files are not kept: the scripts rebuild them.

## Rebuilding a model

Set `HOMELAB_BLENDER_OUT` to a folder **outside the repository** (the repository root is the
published site), then run Blender with no add-ons or user settings:

```
blender --background --factory-startup --python blender/run.py -- tower none 64 64 1 export
```

The arguments are the model, the preview views to render (`none`, or for example `front,side`),
the render width, height and samples, and `export`. The model lands in
`$HOMELAB_BLENDER_OUT/export/<model>.glb`. Shrink it with
`node tools/optimize.mjs <in.glb> <out.glb>` and copy the result into
`assets/models/offensive-security-home-lab/`.

## Names the page depends on

The page finds parts by name, so keep these when editing a model:

- `key_<code>`, one per keycap, named for the key's `KeyboardEvent.code`
- `fan_*`, the spinning fan rotors (the frames around them are `frame_*` and do not turn)
- `wheel`, the mouse wheel
- `screen`, the monitor and laptop screens
- `led_*`, the small lights
