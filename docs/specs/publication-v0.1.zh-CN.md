# 公开仓库发布 v0.1

简体中文 | [English](publication-v0.1.md)

ID：PUBLICATION-001
状态：已实现；等待首次推送后的远程验证
基线：已通过本地验证的 `0.0.0` Bootstrap 仓库
更新：2026-08-28
治理规则：[AGENTS.md](../../AGENTS.md)

## 决策

将 Bootstrap 仓库发布到公开 GitHub 仓库 [Duoasa/ai-native-evidence-layer](https://github.com/Duoasa/ai-native-evidence-layer)。英文作为默认 README 和规范语言；简体中文对应版本保持一等地位并维持语义一致。

## 发布契约

- 可见性为 Public；
- 默认分支为 `main`；
- 规范远程地址为 `https://github.com/Duoasa/ai-native-evidence-layer`；
- GitHub 端不初始化文件，经过审核的本地历史为准；
- 首次公开的是源代码仓库骨架，不是协议或数据集发布；
- 本次操作不创建 Tag、GitHub Release、包发布或真实试点数据集。

## 安全与身份

- Commit 身份使用 `Duoasa` 的 GitHub noreply 地址；
- 认证材料与机器专属 SSH 配置保留在仓库之外；
- 推送使用经过认证的 SSH，公开规范地址仍使用平台中立的 HTTPS 元数据；
- CI 保持只读仓库权限且不需要密钥。

## 验证

1. 执行 `npm ci --ignore-scripts --no-audit --no-fund`；
2. 执行 `npm run check` 与仓库卫生审计；
3. 将经过审核的首个提交推送到 `origin/main`；
4. 检查 GitHub 提供的公开仓库，确认可见性、英文 README、Apache-2.0 许可识别、已提交生成制品与 CI 执行情况。

## 恢复

- 若推送失败，保持公开仓库为空，并在不降低仓库安全性的前提下修复传输；
- 若远程内容不一致，停止发布，并以经过审核的本地提交为准完成核对；
- 未经维护者明确批准，不得重写已经公开的 `main` 历史。
