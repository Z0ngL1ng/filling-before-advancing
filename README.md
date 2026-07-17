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

## Data and evaluation

CPRS progressively shifts supervision from broad overhead semantics to multi-source bridge-domain evidence and finally to harbor-specialized behavior. Scenario-EG contains 53,000 train-only records over 8,703 images. The public release will distinguish redistributable resources from source manifests and reconstruction scripts according to the underlying licenses.

HarborEval evaluates four capability groups:

| Capability | Representative tracks |
|---|---|
| Perception | Object evidence, functional zones, modality recognition |
| Spatial understanding | Relations and multi-cell grid localization |
| Robustness | Negative cases, uncertainty, and rejection |
| Generation | Evidence-grounded harbor reporting |

The benchmark includes structured questions and open-ended reporting/rejection cases across the four sensor modalities.

## Results

### Controlled route comparison on HarborEval

| Training route | LLaVA-v1.5 | Qwen3-VL |
|---|---:|---:|
| Direct-SFT | 57.95 | 81.09 |
| Strongest Collapsed-SFT | 55.74 | 79.36 |
| **FBA** | **70.29** | **83.37** |

FBA achieves the highest HarborEval score in both controlled backbone families. The LLaVA-v1.5 route improves from **57.95 to 70.29** over Direct-SFT. The same pattern holds on Qwen3-VL, where FBA also exceeds Direct-SFT and the strongest collapsed baseline.

Against the representative RS-MLLMs evaluated in the paper, both FBA variants also rank first on HarborEval, the harbor-related VRSBench/RSVQA subsets, and OpenEval. The Qwen3-VL variant obtains **67.77** on the VRSBench subset, **63.00** on the RSVQA subset, and **76.67** on OpenEval.

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
