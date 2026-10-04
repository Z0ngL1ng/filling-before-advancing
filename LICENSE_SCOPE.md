# License scope / 许可适用范围

This preview does not advertise one blanket license for every project artifact. No repository-wide `LICENSE` has been adopted yet. The earlier Apache-2.0 label on the HF model preview card did not specify an artifact scope; that unscoped label has been removed. Licenses already attached to upstream or published material continue to apply.

本预览项目不把同一许可证笼统用于所有内容，目前尚未选定仓库级 `LICENSE`。此前 HF 模型预览卡片上的 Apache-2.0 标签未注明适用对象，现已移除这个未限定范围的标签。上游材料及已发表材料已有的许可条件继续适用。

| Content / 内容 | Current scope / 当前适用范围 |
| --- | --- |
| Original project code / 项目原创代码 | Training/evaluation code is not released. A code-specific license will accompany its release; none is declared here. / 训练评测代码尚未发布，将随代码包单独说明许可，目前未指定。 |
| Original website text, documentation, and presentation code / 原创网页文字、文档及展示代码 | Publicly readable; a reuse license has not yet been specified. These materials do not confer a license on model weights or source imagery. / 已可浏览，复用许可尚未指定，不据此授权模型权重或源图像。 |
| Paper text and original paper figures / 论文文字及原创论文图表 | Follow the terms attached to the specific paper version. Separately sourced images retain their own terms. / 按对应论文版本所附条件使用；独立来源图像保留其自身许可。 |
| FBA / LLaVA-v1.5-7B weights / 权重 | Not released. The release must identify its base checkpoint, adapter/merged format, and applicable upstream and derivative terms. The [upstream model card](https://huggingface.co/liuhaotian/llava-v1.5-7b#license) lists the Llama 2 Community License. / 尚未发布；发布时注明基座、适配器或合并格式及上游与衍生权重条件。上游模型卡列明 Llama 2 Community License。 |
| FBA / Qwen3-VL-8B weights / 权重 | Not released. The [Qwen3-VL-8B-Instruct upstream repository](https://huggingface.co/Qwen/Qwen3-VL-8B-Instruct) lists Apache-2.0; the exact base revision and terms of each FBA artifact will be documented at release. This upstream label does not license all FBA materials. / 尚未发布；上游仓库列明 Apache-2.0，FBA 发布时注明实际基座版本及各项权重的条件。上游标签不覆盖所有 FBA 内容。 |
| CPRS source imagery and third-party data / CPRS 源图像与第三方数据 | Retain source-specific licenses and redistribution restrictions, including imagery shown in demos. Public display does not establish a blanket redistribution grant. Non-redistributable material will be represented by manifests/preparation instructions where permitted. / 按各来源许可及再分发限制处理，展示样张中的图像亦如此；公开展示不等于统一授予再分发许可。不可再分发材料将在允许范围内提供清单或制备说明。 |
| CPRS original annotations and HarborEval records / CPRS 原创标注与 HarborEval 记录 | Artifact-specific terms will be specified with each release. Input imagery remains subject to its source terms. HarborEval reference answers and scoring notes currently remain private. / 随每项发布单独说明条件，输入图像仍受来源许可约束；HarborEval 参考答案与评分说明目前保持私有。 |

For current availability and public versions, see [the shared release checklist](RELEASE_STATUS.md). Base-model versions and paper revisions are not public FBA resource versions.

当前可用性和公开版本见[统一发布状态清单](RELEASE_STATUS.md)。基座型号与论文修订号不等同于 FBA 资源公开版本。
