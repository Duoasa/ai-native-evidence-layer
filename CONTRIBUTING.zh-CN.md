# 贡献指南

简体中文 | [English](CONTRIBUTING.md)

感谢你参与建设面向 AI 的开放知识与证据层。项目欢迎规范、校验器、文档、翻译、试点数据、测试和治理提案等贡献。

## 贡献前必读

1. [README.zh-CN.md](README.zh-CN.md)：项目范围；
2. [AGENTS.md](AGENTS.md)：长期仓库规则；
3. [docs/data-principles.zh-CN.md](docs/data-principles.zh-CN.md)：证据语义；
4. [GOVERNANCE.zh-CN.md](GOVERNANCE.zh-CN.md)：决策权限。

## 本地验证

使用 Node.js 24、npm 11 或更高版本。

```bash
npm ci
npm run check
```

项目初始阶段刻意保持零运行时依赖。新增依赖必须说明收益、维护成本、许可证和安全边界。

## 贡献方式

### 纠正数据

使用 **Data correction / 数据纠正** Issue 表单，或提交满足以下条件的 Pull Request：

- 指明实体与声明；
- 说明建议值和适用范围；
- 链接可检查的来源；
- 记录观测时间；
- 保留有来源支持的冲突声明，不直接删除；
- 不包含私人或敏感个人信息。

### 新增试点条目

复制有效示例，分配稳定的小写 ID，并为所有关键声明添加来源。提交 PR 前执行完整校验。试点数据是领域证据，不是宣传文案。

### 修改 Schema

Schema 修改必须包括：

- **Schema proposal / Schema 提案** Issue；
- 受影响的用例与失败语义；
- 兼容性和迁移影响；
- 更新后的示例、测试、生成制品和双语文档；
- 对重要或难以撤销的决策新增 ADR。

首个协议发布前允许破坏性修改，但仍然必须明确并可审核。

### 翻译文档

英文和简体中文文档必须保持语义一致。仅翻译 PR 不得修改要求。

## Pull Request 要求

- 每个 PR 只包含一个完整且一致的修改；
- 存在 Issue 或决策记录时必须关联；
- 说明修改内容、原因、兼容性影响和验证证据；
- 仓库状态或下一步发生实质变化时更新 `docs/handoff.md`；
- 禁止手工修改 `dist/`，必须执行 `npm run build` 生成；
- 确认你有权按照仓库许可政策贡献所提交的材料。

## 审核标准

维护者会审核语义、证据质量、兼容性、隐私、安全、确定性构建和双语一致性。CI 通过是必要条件，但不能证明来源确实支持某项声明。

## 行为与安全

参与行为遵循 [CODE_OF_CONDUCT.zh-CN.md](CODE_OF_CONDUCT.zh-CN.md)。安全漏洞请遵循 [SECURITY.zh-CN.md](SECURITY.zh-CN.md)，不要在公开 Issue 中提交漏洞利用细节。
