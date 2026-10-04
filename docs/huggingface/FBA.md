---
pipeline_tag: image-text-to-text
tags:
  - remote-sensing
  - vision-language
  - multimodal
  - harbor-understanding
  - post-training
  - arxiv:2607.22205
---

<div align="center">

# Filling Before Advancing

*Fill the gaps. Then advance.*

<p>
  <a href="https://arxiv.org/abs/2607.22205"><img src="https://img.shields.io/badge/arXiv-2607.22205-b31b1b.svg?style=flat-square" alt="Paper" height="20"></a>
  <a href="https://z0ngl1ng.github.io/filling-before-advancing/"><img src="https://img.shields.io/badge/Project-Website-39766b.svg?style=flat-square" alt="Project website" height="20"></a>
  <a href="https://github.com/Z0ngL1ng/filling-before-advancing"><img src="https://img.shields.io/badge/GitHub-Project-25292b.svg?logo=github&amp;style=flat-square" alt="GitHub repository" height="20"></a>
  <a href="https://huggingface.co/datasets/zongling/CPRS"><img src="https://img.shields.io/badge/Hugging_Face-CPRS-e9b44c.svg?logo=huggingface&amp;style=flat-square" alt="CPRS" height="20"></a>
</p>

</div>

We’re exploring a simple idea: **before asking a model to become a harbor specialist, help it build the skills that the job needs.** That’s what Filling Before Advancing, or **FBA**, is about.

We study this with **LLaVA-v1.5** and **Qwen3-VL**, using harbor imagery from **RGB, SAR, PAN, and NIR** sensors.

> **A small update:** we’ve put the project page and examples online first. Checkpoints and inference instructions will follow after paper acceptance.
>
> 我们先把项目介绍和样例放在这里。论文录用后，会陆续补上模型权重和使用方法，欢迎回来看看。

## Pages and files

<!-- release-status:start -->
**Updated 2026-10-04.** The website and HF preview pages are online; resource files are a separate release. Both HF repositories currently contain only README.md and .gitattributes.

| Artifact | File availability | Public version |
| --- | --- | --- |
| Training & evaluation code | Not released · package in preparation | — |
| FBA / LLaVA-v1.5-7B weights | Not released · checkpoint package in preparation | — |
| FBA / Qwen3-VL-8B weights | Not released · checkpoint package in preparation | — |
| CPRS full dataset | Not released · source permissions under review | — |
| HarborEval evaluation package | Not released · public evaluation package in preparation | — |

**— means no public resource version yet.** Base-model names are not FBA release versions. Releases are planned progressively after paper acceptance. Public examples remain illustrative; HarborEval reference answers and scoring notes are currently private.

[Shared checklist](https://github.com/Z0ngL1ng/filling-before-advancing/blob/main/RELEASE_STATUS.md) · [License scope](https://github.com/Z0ngL1ng/filling-before-advancing/blob/main/LICENSE_SCOPE.md)
<!-- release-status:end -->

## How it works

The route has three steps:

1. **RS-Anchor** — learn to read overhead imagery and connect it with language.
2. **Bridge-Conv** — learn from related coastal scenes across different sensors.
3. **Scenario-EG** — answer harbor questions, locate objects with a grid, and write reports using visible evidence.

<p align="center"><a href="https://z0ngl1ng.github.io/filling-before-advancing/#method"><img src="https://raw.githubusercontent.com/Z0ngL1ng/filling-before-advancing/main/assets/fba_stages.png" alt="The three ordered FBA training stages" width="900"></a></p>

## A quick look at the results

On HarborEval, with scores on a 0–100 scale:

| Training route | LLaVA-v1.5 | Qwen3-VL |
| --- | ---: | ---: |
| Direct-SFT | 57.95 | 81.09 |
| **FBA** | **70.29** | **83.37** |

HarborEval includes **T5: Sensor-aware observability** and **T6: Evidence judgment**. T5 asks what a sensor can support observing; T6 asks whether the visual evidence supports a claim.

That’s **+12.34** and **+2.28 score points** over Direct-SFT. The [GitHub results](https://github.com/Z0ngL1ng/filling-before-advancing#results) include the full comparisons and the areas where there’s still room to improve.

## Take a look around

The [project website](https://z0ngl1ng.github.io/filling-before-advancing/) is a good place to start: it has a short overview and eight interactive grid examples. You can also browse the [CPRS dataset page](https://huggingface.co/datasets/zongling/CPRS) or follow updates on [GitHub](https://github.com/Z0ngL1ng/filling-before-advancing).

We’ll add download and setup notes alongside the checkpoints. Base-model and source-data terms still apply; each release will explain the relevant licenses.

## A note on licenses

We haven’t assigned one license to every part of this project. Original code and website text, each model variant, source images, annotations, and evaluation records have separate scopes. Model and data releases will include the applicable terms; upstream licenses still apply. See [license scope](https://github.com/Z0ngL1ng/filling-before-advancing/blob/main/LICENSE_SCOPE.md).

当前不以一个许可覆盖所有内容。代码、网页文字、两种权重、源图像与标注将分别说明条件，上游材料的许可继续适用。

<details>
<summary>Cite the paper</summary>

```bibtex
@article{zong2026fba,
  title   = {Filling Before Advancing: Capability-Gap-Driven Post-Training for Scenario-Specialized Remote Sensing MLLMs},
  author  = {Zong, Yuheng and Wang, Minghua and Zhao, Xin and Zhan, Zhi-Hui and Plaza, Antonio and Benediktsson, Jon Atli},
  journal = {arXiv preprint arXiv:2607.22205},
  year    = {2026},
  doi     = {10.48550/arXiv.2607.22205},
  url     = {https://arxiv.org/abs/2607.22205}
}
```

</details>
