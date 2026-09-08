# Image sources

Full-resolution originals. **No page loads anything from this folder.**

They are kept because `assets/images/optimized/*.webp` — which the pages *do* load — is generated
from them, and nothing in this repository regenerates those automatically. Delete a file here and the
matching WebP can never be re-made or re-optimised.

`classic/assets/images/` holds its own byte-identical copies for the archived site. Those are
separate; do not treat either set as a backup of the other.

To produce a web-sized WebP from one of these, resize to roughly 620px wide at quality 82, which is
what the existing optimized files use.
