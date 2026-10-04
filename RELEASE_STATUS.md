# Release status / 发布状态

This checklist describes actual downloadable research artifacts, separately from online project pages and sample showcases.

这份清单记录研究资源文件的实际公开状态，区别于项目介绍页上线及样例展示。

## English

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

## 简体中文

**更新于 2026-10-04。** 网页与 HF 预览介绍页已上线，资源文件需另行发布。两个 HF 仓库目前都只有 README.md 和 .gitattributes。

| 资源 | 文件发布状态 | 公开版本 |
| --- | --- | --- |
| 训练与评测代码 | 尚未发布 · 公开包准备中 | — |
| FBA / LLaVA-v1.5-7B 权重 | 尚未发布 · 权重包准备中 | — |
| FBA / Qwen3-VL-8B 权重 | 尚未发布 · 权重包准备中 | — |
| CPRS 完整数据集 | 尚未发布 · 来源许可审核中 | — |
| HarborEval 评测包 | 尚未发布 · 公开评测包准备中 | — |

**— 表示尚无公开资源版本。** 基座型号不等于 FBA 发布版本。资源计划在论文录用后陆续发布。已公开样例仅用于展示，HarborEval 参考答案与评分说明目前保持私有。

[统一状态清单](https://github.com/Z0ngL1ng/filling-before-advancing/blob/main/RELEASE_STATUS.md) · [许可适用范围](https://github.com/Z0ngL1ng/filling-before-advancing/blob/main/LICENSE_SCOPE.md)

## Availability wording / 可用性表述

As of 2026-10-04, the paper, project website, documentation, and illustrative samples are publicly accessible. The Hugging Face repositories contain preview cards only, with no model weights or full dataset files. Training/evaluation code, FBA checkpoints for LLaVA-v1.5-7B and Qwen3-VL-8B, CPRS, and the HarborEval evaluation package have not been released. They are planned for progressive release after paper acceptance, subject to the applicable artifact and source-material terms. HarborEval reference answers and scoring notes currently remain private.

截至 2026-10-04，论文、项目网页、文档与展示样例已可公开访问。Hugging Face 仓库目前仅提供预览介绍卡片，没有模型权重或完整数据文件。训练评测代码、LLaVA-v1.5-7B 与 Qwen3-VL-8B 的 FBA 权重、CPRS 和 HarborEval 评测包尚未发布，计划在论文录用后按各项资源与来源材料的许可条件陆续发布。HarborEval 参考答案与评分说明目前仍保持私有。

Update `docs/data/release-status.json` and run `python scripts/sync_release_status.py` to refresh this file, both READMEs, the website, and the HF card sources. Publish the updated card sources as the corresponding HF `README.md` files.
