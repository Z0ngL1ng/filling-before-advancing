---
pretty_name: CPRS — Coastal-Port Remote Sensing
task_categories:
  - image-to-text
  - visual-question-answering
tags:
  - remote-sensing
  - multimodal
  - coastal-harbor
  - grid-grounding
  - arxiv:2607.22205
---

<div align="center">

# CPRS

*Coastal-Port Remote Sensing · The data behind FBA*

<p>
  <a href="https://arxiv.org/abs/2607.22205"><img src="https://img.shields.io/badge/arXiv-2607.22205-b31b1b.svg?style=flat-square" alt="Paper" height="20"></a>
  <a href="https://z0ngl1ng.github.io/filling-before-advancing/"><img src="https://img.shields.io/badge/Project-Website-39766b.svg?style=flat-square" alt="Project website" height="20"></a>
  <a href="https://github.com/Z0ngL1ng/filling-before-advancing"><img src="https://img.shields.io/badge/GitHub-Project-25292b.svg?logo=github&amp;style=flat-square" alt="GitHub repository" height="20"></a>
  <a href="https://huggingface.co/zongling/FBA"><img src="https://img.shields.io/badge/Hugging_Face-FBA-e9b44c.svg?logo=huggingface&amp;style=flat-square" alt="FBA" height="20"></a>
</p>

</div>

**CPRS is the data we put together for [FBA](https://huggingface.co/zongling/FBA).** It brings together remote sensing image–caption pairs and instruction dialogues, with a focus on understanding coastal harbors.

> **A small update:** the public examples are ready to browse. We’ll share the full data and preparation notes here after paper acceptance.
>
> 先放一些样例，方便大家看看数据是什么样的。论文录用后，我们会陆续补上完整数据和整理方法。

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

## What’s inside

About **810K supervision records**, arranged in three layers:

| Layer | Records | What it helps the model learn |
| --- | ---: | --- |
| **RS-Anchor** | 569,853 image-caption pairs | Read overhead imagery and learn broad remote sensing semantics |
| **Bridge-Conv** | 187,296 SFT records | Understand related coastal scenes across RGB, SAR, PAN, and NIR |
| **Scenario-EG** | 53,000 SFT records | Use visible evidence for harbor questions, grid grounding, and reports |

These are the counts used in the study; the full download packages are still being prepared.

## Have a look

Here are a few scenes from the source collection. We’ve shared **eight cases, two per sensor**, on the [project website](https://z0ngl1ng.github.io/filling-before-advancing/#evidence) and in the [GitHub examples](https://github.com/Z0ngL1ng/filling-before-advancing/tree/main/examples/dataset_samples/cprs_source_showcase).

<table align="center">
  <tr><th align="center">RGB</th><th align="center">SAR</th></tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/Z0ngL1ng/filling-before-advancing/main/examples/dataset_samples/cprs_source_showcase/images/rgb_00003.png" alt="CPRS RGB harbor sample" width="220"></td>
    <td align="center"><img src="https://raw.githubusercontent.com/Z0ngL1ng/filling-before-advancing/main/examples/dataset_samples/cprs_source_showcase/images/sar_00001.png" alt="CPRS SAR harbor sample" width="220"></td>
  </tr>
  <tr><th align="center">PAN</th><th align="center">NIR</th></tr>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/Z0ngL1ng/filling-before-advancing/main/examples/dataset_samples/cprs_source_showcase/images/pan_00115.png" alt="CPRS PAN harbor sample" width="220"></td>
    <td align="center"><img src="https://raw.githubusercontent.com/Z0ngL1ng/filling-before-advancing/main/examples/dataset_samples/cprs_source_showcase/images/nir_00001.png" alt="CPRS NIR harbor sample" width="220"></td>
  </tr>
</table>

On the website, you can switch cases and inspect **3×3 grid answers**. The short dialogues were adapted for this demo; they aren’t official benchmark annotations. Each sensor example shows a separate scene.

One detail about the numbers: this source snapshot has **8,300 records**. The **810K** total counts the three supervision layers above, so the two figures describe different collections.

## What comes next

After paper acceptance, we’ll add the data files and practical notes on formats, source credits, and licenses. Where source material can’t be redistributed, we’ll provide preparation instructions within its licensing terms.

**HarborEval stays separate as an evaluation resource.** Its public examples contain inputs only; reference answers and scoring notes remain private.

For the latest updates, head to [GitHub](https://github.com/Z0ngL1ng/filling-before-advancing), the [FBA model page](https://huggingface.co/zongling/FBA), or the [project website](https://z0ngl1ng.github.io/filling-before-advancing/).

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
