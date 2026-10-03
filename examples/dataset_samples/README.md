# LLaVA Three-Stage Dataset Samples

This folder is a compact, GitHub-ready showcase rather than a training release.

Start with [`cprs_source_showcase`](cprs_source_showcase) for eight visually clear, annotation-rich cases from the CPRS source collection. Each sensor has two cases, with adapted grid-based dialogue, multi-cell grounding, and object relations. These source examples are separate from the final stage-specific student exports below.

The original 12 stage-specific samples remain available for supervision-role inspection:

- `stage1_alignment`: diverse RGB image-caption alignment pairs.
- `stage2_modality_adaptation`: RGB, SAR, PAN, and NIR examples covering semantic, modality-grounded, and boundary supervision.
- `stage3_harbor_reasoning`: calibrated short answers, grid localization, relations, functional zones, rejection, open multi-turn reasoning, and weak-modality retention.

All images retain their original pixels. Image content is SHA-256 deduplicated within this folder and against the benchmark showcase.
