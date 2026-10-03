# CPRS grid-based showcase

Eight image-grounded cases, with two cases per sensor, adapted to the project's existing 3 × 3 grid convention. This compact showcase illustrates the [FBA project website](https://z0ngl1ng.github.io/filling-before-advancing/#evidence); it is not a training release or a held-out benchmark.

| Modality | Source image record IDs | Focus |
|---|---|---|
| RGB | 00003, 06670 | Vessel across cells, warehouse region, ship center and crane region |
| SAR | 00001, 01202 | Bright-return centers, central return and spatial relations, uncertainty |
| PAN | 00115, 00002 | Vessel spanning a column, small boat, coastal vessel centers |
| NIR | 00001, 00055 | Warehouse region, visible uncertainty, vessel and warehouses across cells |

## Grid convention

The nine cell names follow the existing project examples:

| | Left | Center | Right |
|---|---|---|---|
| Top | top-left | top-center | top-right |
| Middle | middle-left | middle-center | middle-right |
| Bottom | bottom-left | bottom-center | bottom-right |

Questions distinguish the visible extent of a target, the center of a target, and the clearest region. A target may occupy multiple cells. `meta.grid_grounding` records each spatial question's target, answer cells, and selection rule. The website colors the cells of the first spatial answer and lets visitors switch off the grid.

## Source and adaptation

The inspected source snapshot contains 8,300 image-dialogue records: RGB 6,659, SAR 1,348, PAN 193, and NIR 100. The original source records have 2–4 dialogue turns. These counts describe the source collection, not the approximately 810K stage-wise CPRS supervision records or the final Scenario-EG export. `profile.json` retains the inspected source counts.

Image pixels are unchanged at 512 × 512. Showcase questions and answers were rewritten after viewing these images with the nine-cell grid; they are illustrative adaptations, rather than verbatim source dialogue or official benchmark annotations. Chinese text on the website translates the adapted English dialogue. Source files remain unchanged.

Contextual system prompts and environmental metadata are omitted. Public records contain image references, adapted grid dialogue, grid targets, and source object relations. They do not reproduce pixel-coordinate geometry from the original source metadata.

The eight images were checked for exact decoded-pixel overlap with the original stage samples, one another, and the public benchmark showcase; none overlap. Existing stage-specific records, benchmark input-only packaging, and public-example exclusions remain unchanged. Matching source numbers across sensors do not imply paired scenes.

## Record format

- `id`: modality-prefixed showcase ID, for example `RGB_00003`.
- `images`: relative path to the unchanged source image.
- `conversations`: adapted English user/assistant turns; the first turn defines the grid.
- `meta.grid`: three rows, three columns, and the nine cell names.
- `meta.grid_grounding`: target, question turn, cell names, and selection rule.
- `meta.relations`: source subject–predicate–object triples.
- `source`: original record ID, relative source file/image, original turn count, and adaptation note.

Source dataset licenses and usage conditions continue to apply; this compact showcase does not establish a new license for the underlying images.
