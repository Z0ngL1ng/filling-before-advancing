<!-- INTERNAL DRAFT: keep private until the current AAAI-27 anonymity rules are confirmed. -->

<div align="center">

# Filling Before Advancing

### Capability-Gap-Driven Post-Training for Scenario-Specialized Remote Sensing MLLMs

[English](README.md) | [简体中文](README_zh-CN.md)

</div>

<p align="center">
  <img src="assets/fba_overview.png" alt="Motivation and overview of Filling Before Advancing" width="100%">
</p>

## Overview

Remote sensing multimodal large language models (RS-MLLMs) can understand general aerial imagery, but practical Earth-observation applications often require fine-grained scenario specialization. Limited target data must bridge overhead-view semantics, heterogeneous sensor observations, transferable domain knowledge, and task-specific behavior at the same time. Direct supervised fine-tuning can therefore leave prerequisite capability gaps unresolved.

**Filling Before Advancing (FBA)** formulates this adaptation as a capability-ordered post-training problem. It first builds the capabilities that specialization depends on, and then tunes the final evidence-grounded scenario behavior.

We instantiate FBA for multi-source coastal harbor understanding and introduce:

- **CPRS**, approximately 810K supervision records organized into three capability-aligned layers;
- **HarborEval**, 1,245 diagnostic items over 471 images across RGB, SAR, PAN, and NIR; and
- controlled evaluations on **LLaVA-v1.5** and **Qwen3-VL**.

## Method

FBA organizes supervision by capability dependency rather than mixing all available samples in a single stage.

| Stage | Supervision | Role | Scale |
|---|---|---|---:|
| **S1** | **RS-Anchor** | Overhead-view visual-language alignment and broad RS semantics | 569,853 image-caption pairs |
| **S2** | **Bridge-Conv** | Shared RS priors across target/bridging scenes and multiple sensors | 187,296 SFT records |
| **S3** | **Scenario-EG** | Evidence-grounded perception, spatial reasoning, robustness, and generation | 53,000 SFT records |

<p align="center">
  <img src="assets/fba_stages.png" alt="Three ordered stages of Filling Before Advancing" width="100%">
</p>

1. **RS semantic anchoring** establishes a broad RGB remote-sensing visual-language foundation.
2. **Domain-bridge convergence** introduces target-related coastal, port, water, dock, and ship scenes across RGB, SAR, PAN, and NIR, with modality-aware construction and verification.
3. **Evidence-grounded scenario tuning** focuses on presence validation, relation reasoning, grid localization, functional-zone interpretation, uncertainty, hard-negative rejection, and grounded reporting.

## Resource construction

CPRS and HarborEval are maintained as separate, audited resources; raw training datasets and evaluation benchmarks are never merged directly.

<p align="center">
  <a href="assets/cprs_progressive_data_curation.png"><img src="assets/cprs_progressive_data_curation.png" alt="Progressive data curation of the three-layer CPRS dataset" width="100%"></a>
</p>

The CPRS overview from the paper connects four parts of the dataset design: the stage-wise shift from **RS-Anchor** to **Bridging-Conv** and **Scenario-EG**, the increasing concentration of harbor supervision, broad coastal geographic coverage, and image-level curation followed by staged multi-teacher SFT synthesis and manual inspection.

**CPRS construction and audit.** The three supervision layers share one evidence-centered curation policy. Heterogeneous sources are normalized into image-text or ShareGPT-style records; image-text data retain one caption per unique image, while instruction conversations are restricted to visible evidence. For SAR, NIR, and PAN, wording is further constrained by what each sensor can support. Staged multi-teacher distillation assigns fixed roles to metadata grounding, instruction synthesis, and evidence verification, after which candidates are retained, rewritten, or discarded. Source metadata, teacher notes, verifier rationales, construction tags, and retry outcomes are preserved for audit but removed from student-model exports, together with malformed records, duplicate references, benchmark traces, and modality-incompatible claims.

### CPRS curation at a glance

- **RS-Anchor:** 3,135,250 source samples → 569,853 unique image-caption pairs from eight public datasets, after caption cleaning, image-level deduplication, scene classification, diversity-aware sampling, and visible-semantic filtering.
- **Bridging-Conv:** 187,296 SFT records—99,088 RGB, 29,984 SAR, 28,475 NIR, and 29,749 PAN. Its RGB pool includes 59,453 water/coast/port/dock/ship-related records. Construction applies modality-aware rewriting plus staged evidence grounding, instruction synthesis, and verify/rewrite/drop decisions.
- **Scenario-EG:** 53,000 train-only SFT records over 8,703 RGB, SAR, PAN, and NIR images, covering presence validation, relation reasoning, grid grounding, functional-zone interpretation, controlled negatives, response replay, and benchmark-trace removal.

Resources that cannot be redistributed will be represented by source manifests and reconstruction scripts where their licenses permit.

### HarborEval: eight diagnostic tracks

| Track (items) | Diagnostic role |
|---|---|
| **T1 (162)** | Object/scene VQA |
| **T2 (182)** | Functional-zone interpretation |
| **T3 (183)** | Spatial-relation reasoning |
| **T4 (164)** | Multi-cell grid grounding |
| **T5 (171)** | Sensor-aware observability |
| **T6 (123)** | Evidence judgment and uncertainty |
| **T7 (79)** | Evidence-grounded report generation |
| **T8 (181)** | Non-harbor and near-domain rejection |

**Construction and audit.** HarborEval is built from harbor and non-harbor remote-sensing records as item-level diagnostic questions. Harbor records support object and scene recognition, functional-zone interpretation, spatial relations, grid localization, sensor-aware observability, evidence judgment, and grounded reporting; non-harbor records support rejection-oriented questions. Cleaning removes weakly visual or metadata-dependent questions, malformed options, duplicate image references, benchmark-specific traces, and sensor-incompatible statements. Accepted alternatives are retained only when supported by audited visual evidence.

HarborEval contains **1,245 items over 471 unique images**, including **1,154 structured items** and **91 open-ended description or rejection items**. Once a source record is assigned to HarborEval, every derived conversation is excluded from training. Public inference records contain only the image, question, and answer choices when applicable; answers, evidence annotations, accepted labels or grid cells, references, forbidden claims, and scoring rubrics remain private and are merged only after inference.

### Public sample showcases

- [`examples/dataset_samples`](examples/dataset_samples) contains 12 inspection samples spanning the three CPRS supervision layers and RGB, SAR, PAN, and NIR imagery.
- [`examples/benchmark_samples`](examples/benchmark_samples) contains six input-only examples from HarborEval, OpenEval, and RSVQA-Harbor. Private reference answers are omitted, and published held-out examples are recorded for exclusion from future score reporting.

These compact showcases illustrate record structure and visual-task coverage; they are not substitutes for the full resource release.

## Evidence-grounded examples

The four examples below illustrate the response forms targeted by Scenario-EG and diagnosed by HarborEval: functional captioning in RGB, geometry-based grid grounding in PAN, evidence-based VQA in SAR, and spatial-relation reasoning in NIR. The goal is not identical wording across sensors, but claims that remain compatible with what each modality can actually reveal.

<p align="center">
  <a href="assets/evidence_grounded_examples.png"><img src="assets/evidence_grounded_examples.png" alt="Four evidence-grounded harbor examples across RGB, PAN, SAR, and NIR" width="100%"></a>
</p>

<details>
<summary><strong>Positive vs. hard-negative evidence audit</strong></summary>

Vessel or water keywords alone do not justify a harbor label. Positive records must contain relational evidence such as docked vessels aligned with piers, quays, basins, or land-based port facilities. Isolated ships, ambiguous coastlines, and low-information water scenes instead receive negative or uncertainty-compatible responses.

<p align="center">
  <a href="assets/positive_negative_audit.png"><img src="assets/positive_negative_audit.png" alt="Positive and hard-negative evidence audit for harbor-scene recognition" width="72%"></a>
</p>

</details>

## Results

### 1. Controlled route comparison and HarborEval diagnosis

| Training route | LLaVA-v1.5 | Qwen3-VL |
|---|---:|---:|
| Direct-SFT | 57.95 | 81.09 |
| Strongest Collapsed-SFT | 55.74 | 79.36 |
| **FBA** | **70.29** | **83.37** |

FBA achieves the highest HarborEval score in both controlled backbone families. The LLaVA-v1.5 route improves from **57.95 to 70.29** over Direct-SFT. The same pattern holds on Qwen3-VL, where FBA also exceeds Direct-SFT and the strongest collapsed baseline.

<details>
<summary><strong>Direct-SFT → FBA track-level breakdown</strong></summary>

| HarborEval component | LLaVA-v1.5 | Qwen3-VL |
|---|---:|---:|
| Overall | 57.95 → **70.29** | 81.09 → **83.37** |
| Object | 75.07 → 73.47 | 87.99 → **92.42** |
| Functional zone | 66.67 → **67.22** | 78.33 → **81.11** |
| Modality | 50.88 → **80.12** | 81.29 → **82.46** |
| Spatial relation | 60.67 → **69.10** | 81.46 → **83.15** |
| Grid grounding | 48.37 → 43.82 | 66.06 → **68.61** |
| Hard negative | 52.03 → **69.11** | 78.05 → **79.67** |
| Rejection | 37.28 → **85.80** | 95.27 → **98.22** |
| Report generation | 72.60 → **73.70** | 80.23 → **81.32** |

For LLaVA-v1.5, the overall gain is driven especially by modality understanding, hard-negative handling, rejection, and reporting, while object recognition and grid grounding remain slightly lower than Direct-SFT. Qwen3-VL improves across all eight diagnostic components.

</details>

### 2. Comparison with existing RS-MLLMs

| Model | Params | Data scale | HarborEval | VRSBench | RSVQA | OpenEval |
|---|---:|---:|---:|---:|---:|---:|
| GeoChat | 7B | 318K* | 47.49 | 53.44 | 51.46 | 21.78 |
| SkyEyeGPT | 7B | 968K | 28.28 | 36.72 | 36.72 | 12.33 |
| LHRS-Bot-Nova | 7B | 2.02M | 39.73 | 28.40 | 31.15 | 22.96 |
| SkySenseGPT | 7B | 3.00M | 47.24 | 42.99 | 42.98 | 35.78 |
| **FBA (LLaVA-v1.5)** | 7B | **810K** | **70.29** | **57.62** | **53.96** | **61.47** |
| **FBA (Qwen3-VL)** | 8B | **810K** | **83.37** | **67.77** | **63.00** | **76.67** |

Both FBA variants obtain the strongest scores among the compared models on all four evaluation settings, while using approximately 810K curated supervision records. Data-scale values are contextual rather than a controlled fairness claim; `318K*` for GeoChat excludes its inherited general-purpose LLaVA data.

### 3. Stage-wise capability trajectory

| Backbone | Checkpoint | RS-VL | MS | HE | VRS | RQA | OE |
|---|---|---:|---:|---:|---:|---:|---:|
| LLaVA-v1.5 | +S1 | 69.71 | 52.97 | 29.44 | 49.54 | 37.00 | 42.23 |
| LLaVA-v1.5 | +S2 | 87.53 | **73.55** | 35.61 | 54.88 | 47.55 | 58.01 |
| LLaVA-v1.5 | +S3 | **89.16** | 68.04 | **70.29** | **57.62** | **53.96** | **61.47** |
| Qwen3-VL | Base | 90.40 | 69.60 | 70.37 | 57.02 | 50.63 | 65.48 |
| Qwen3-VL | +S1 | **95.29** | 70.32 | 77.26 | 51.14 | 54.66 | 60.03 |
| Qwen3-VL | +S2 | 93.37 | **79.77** | 71.80 | 66.58 | 57.30 | 60.15 |
| Qwen3-VL | +S3 | 92.22 | 76.54 | **83.37** | **67.77** | **63.00** | **76.67** |

The trajectory is role-specific rather than uniformly monotonic: S1 establishes strong RS visual-language alignment, S2 produces the highest multi-source diagnostic score, and S3 delivers the strongest final scenario performance. RS-VL and MS denote intermediate diagnostics; HE, VRS, RQA, and OE denote HarborEval, VRSBench, RSVQA, and OpenEval.

### 4. Supervision-role replacement controls

| Role | Replacement → intended supervision | RS-VL | MS | HE |
|---|---|---:|---:|---:|
| **D1 anchoring** | Generic image-text → RS-Anchor | 76.42 → **89.16** | 64.49 → **68.04** | 60.36 → **70.29** |
| **D2 bridging** | Non-bridging → Bridging-Conv | 84.36 → **89.16** | 66.90 → **68.04** | 57.11 → **70.29** |
| **D3 specialization** | Non-EG → Scenario-EG | 88.97 → **89.16** | 67.78 → **68.04** | 50.12 → **70.29** |

Replacing each intended supervision layer weakens the capability it is designed to supply. RS-Anchor contributes most clearly to RS-VL anchoring, Bridge-Conv improves multi-source and downstream adaptation, and Scenario-EG produces the largest HarborEval recovery. This compact control view focuses on the intermediate diagnostics and HarborEval that directly test the three capability roles.

All scores use a 0-100 scale. Evaluation inputs, semantic prompts, decoding policies, answer normalization, and scoring rules are held consistent within each controlled comparison.

## Bridge-domain analysis

Bridge-Conv is selected around target-related visual-language priors rather than treating all non-target imagery as equally useful. In the shared embedding space, its centroid reaches **0.92** cosine similarity with the harbor centroid, compared with **0.73** for general RS imagery and **0.54** for natural imagery. Bridging samples form **70.1%** of the local non-harbor neighbors around harbor queries.

<p align="center">
  <img src="assets/bridging_transfer.png" alt="Representation proximity between harbor and bridging domains" width="78%">
</p>

## Release status

| Artifact | Status |
|---|---|
| Paper | Anonymous submission package prepared |
| Code | Training and evaluation release in preparation |
| Weights | Release preparation in progress |
| CPRS | Release scope and source licenses under review |
| HarborEval | Public/private evaluation packaging in preparation |

**Datasets, benchmarks, and trained weights will be publicly released after notification.**

No artifact is presented as downloadable until it has passed anonymity, licensing, and reproducibility review.

<details>
<summary><strong>Planned repository structure</strong></summary>

```text
.
|-- assets/                 # Project figures
|-- configs/                # Frozen training/evaluation configurations
|-- data/                   # CPRS manifests and preparation documentation
|-- eval/                   # HarborEval inference and scoring tools
|-- models/                 # Model cards and weight-release notes
|-- scripts/                # Training, inference, and evaluation entry points
`-- docs/                   # Release and communication material
```

</details>

## Citation and license

Final citation metadata will be added after the paper record and author list are public. A template is provided in [`CITATION.cff.template`](CITATION.cff.template).

The public repository will document the licenses and usage conditions of original code, third-party models, source datasets, figures, evaluation records, and released weights. Resources that cannot be redistributed will be represented through manifests and reproducible preparation scripts where permitted.
