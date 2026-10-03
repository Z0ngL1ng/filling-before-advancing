# FBA project website

Public website: <https://z0ngl1ng.github.io/filling-before-advancing/>

Chinese entry: <https://z0ngl1ng.github.io/filling-before-advancing/?lang=zh>

This is a static, dependency-free research landing page. GitHub Pages publishes the `docs/` directory on `main` through its native branch publishing flow. The `.nojekyll` file disables Jekyll processing. Edits to this directory are published when pushed to `main`.

To preview locally from the repository root:

```sh
python -m http.server 8765 --directory docs
```

Open <http://localhost:8765/>. `?lang=en` and `?lang=zh` set the entry language; the language button preserves the visitor's preference when browser storage is available. The English content and links also work without JavaScript.

## Content and assets

Research claims, author order, scores, citation, and release status follow the repository README. Update the website when those facts change. The interactive gallery shows eight curated CPRS source-data cases from `examples/dataset_samples/cprs_source_showcase`, with two cases per sensor. The 8,300-record source snapshot is explicitly distinguished from the approximately 810K stage-wise supervision corpus. Existing stage-specific and benchmark showcases remain available separately.

- `data/cprs-showcase.json`: grid convention, adapted English dialogue, Chinese translations, grid answer cells, and object relations for the eight cases.
- `assets/rgb_*.png`, `assets/sar_*.png`, `assets/pan_*.png`, `assets/nir_*.png`: unchanged copies of the corresponding curated source showcase images.
- `assets/fba_stages.png`: the existing `assets/fba_stages.png` research figure.

The gallery lets visitors select a sensor and case, view adapted multi-turn dialogue and object relations, overlay a 3 × 3 grid, and open the original image. Names follow the project's existing top/middle/bottom and left/center/right convention. Colored cells correspond to the first grid answer; questions distinguish a target's extent, center, or clearest visible region. Multi-cell answers are supported.

The questions and answers were rewritten after visual inspection for this illustrative showcase. They are not verbatim source dialogue or official benchmark annotations. Chinese text translates the adapted English dialogue. Image pixels and source files are unchanged. The linked sample JSON records the source and the adaptation and uses grid names for spatial answers.

The default English first example and resource links remain readable without JavaScript. Gallery switching and overlays require JavaScript. Existing source resource licenses and usage conditions apply. No external fonts, analytics, or frontend packages are required.
