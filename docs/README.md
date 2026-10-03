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

Research claims, author order, scores, citation, and release status follow the repository README. Update the website when those facts change. The interactive examples show training supervision; they do not present benchmark answers or model predictions. The PAN answer is explicitly identified as an excerpt. Chinese sample text is a translation of the public English record.

- `assets/rgb.png`: `examples/dataset_samples/stage3_harbor_reasoning/images/s3_01_presence_or_evidence_rgb.png`
- `assets/nir.png`: `examples/dataset_samples/stage3_harbor_reasoning/images/s3_02_grid_nir.png`
- `assets/sar.jpg`: `examples/dataset_samples/stage2_modality_adaptation/images/s2_02_sar_modality_boundary.jpg`
- `assets/pan.png`: `examples/dataset_samples/stage2_modality_adaptation/images/s2_03_pan_modality_grounded_prompt.png`
- `assets/fba_stages.png`: the existing `assets/fba_stages.png` research figure.

These are unchanged copies of already-public repository assets. Existing source resource licenses and usage conditions apply. No external fonts, analytics, or frontend packages are required.
