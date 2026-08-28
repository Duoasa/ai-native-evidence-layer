# Repository Rules / 仓库规则

These rules are durable constraints for human and AI contributors. They describe what this repository must preserve; transient progress belongs in `docs/handoff.md`.

这些规则是人类和 AI 贡献者都必须遵守的长期约束。它们描述仓库必须保持的原则；临时进度应记录在 `docs/handoff.md`。

## Product identity / 产品定位

- Build an open, distributed, AI-native knowledge and evidence layer; do not turn the repository into a centralized source of unquestioned truth.
- 建设开放、分布式、AI 原生的知识与证据层；不得把仓库变成不容质疑的中心化真相来源。

## Source of truth / 事实优先级

1. Current explicit maintainer instruction / 当前维护者明确指令
2. Working code, schemas, tests, and generated artifacts / 当前代码、Schema、测试与生成制品
3. Verified tagged releases / 已验证的标签发布
4. `docs/handoff.md`
5. Approved specifications and ADRs / 已批准的规范与 ADR
6. External references and conventions / 外部参考与惯例

## Data invariants / 数据不变量

- Every stable entity uses a durable identifier independent of display text.
- 每个稳定实体都必须使用与展示文本无关的持久 ID。
- Claims distinguish assertion, verification, dispute, staleness, withdrawal, and unknown state.
- 声明必须区分宣称、核验、争议、过期、撤回和未知状态。
- Missing, unavailable, stale, and false are never interchangeable.
- 缺失、不可用、过期和否定不得互相替代。
- Important claims include inspectable references and observation time.
- 关键声明必须包含可检查来源与观测时间。
- Machine extraction and inference remain labeled until a defined review process verifies them.
- 机器提取与推断在完成明确审核前必须保持相应标记。
- Conflicting claims may coexist; aggregation must not silently overwrite provenance.
- 冲突声明可以并存；聚合不得静默覆盖来源。

## Openness and portability / 开放与可迁移

- Core schemas, validators, builders, and exports must run without proprietary services.
- 核心 Schema、校验器、构建器和导出流程不得依赖专有服务。
- Do not bind protocol semantics to one AI model, vendor, hosting provider, or pilot domain.
- 协议语义不得绑定单一 AI 模型、厂商、托管平台或试点领域。
- Generated artifacts must be deterministic from committed source data.
- 生成制品必须能由已提交的源数据确定性重建。

## Security and privacy / 安全与隐私

- Never commit secrets, private tokens, production credentials, or private personal data.
- 禁止提交密钥、私人令牌、生产凭据或私人个人数据。
- Test fixtures must be synthetic or explicitly licensed public material.
- 测试样例必须是合成数据或明确许可的公开材料。
- Minimize third-party excerpts; link to sources and preserve their licensing boundaries.
- 尽量减少第三方原文摘录，优先链接来源并保留其许可边界。
- No external publication, release, or remote mutation without explicit maintainer authorization.
- 未经维护者明确授权，不得对外发布、创建 Release 或修改远程状态。

## Bilingual policy / 双语政策

- User-facing normative documents maintain English and Simplified Chinese counterparts.
- 面向用户的规范性文档必须同时维护英文和简体中文版本。
- Schema identifiers, code symbols, paths, and machine values remain language-neutral English.
- Schema 标识符、代码符号、路径和机器值统一使用语言中立的英文。
- A translation must preserve meaning; translation-only changes must not alter requirements.
- 翻译必须保持语义；仅翻译修改不得改变要求。

## Verification / 验证

- Run `npm run check` before proposing a merge.
- 提议合并前执行 `npm run check`。
- A generated-output change must be produced by `npm run build`, not hand-edited.
- 生成制品必须通过 `npm run build` 产生，不得手工修改。
- Mark results as verified, failed, not run, blocked, or waiting for owner acceptance.
- 结果状态只能明确标记为已验证、失败、未运行、受阻或等待维护者验收。
- Update `docs/handoff.md` whenever implementation state or the exact next action changes materially.
- 实现状态或下一步发生实质变化时，必须同步更新 `docs/handoff.md`。
