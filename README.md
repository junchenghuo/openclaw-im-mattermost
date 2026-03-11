# OpenClaw IM 集成项目（openclaw-im-mattermost）

本仓库用于基于 Mattermost 做二次开发，并与 OpenClaw 集成，目标是在 IM 消息内完成任务委派、过程管理与状态回执，形成可持续运行的协作闭环。

上游项目：`https://github.com/mattermost/mattermost`

## 作者简介

### 霍钧城（分布式 AI 架构师）

具备多年企业级研发与架构经验，长期聚焦“高并发分布式系统 + 业务中台 + AI Agent 工程化落地”的融合实践。

- 擅长企业级架构设计与高可用治理，具备从单体到微服务的演进经验。
- 深度参与 B2B2C 电商与供应链核心链路建设，具备支付中台与分账结算实践。
- 聚焦 AI Agent 工程化落地，覆盖 RAG、Tool Calling、MCP 与 Skills 资产化建设。

---

## 项目目标

1. 在 Mattermost 频道内直接完成任务派发、接单回执、过程追踪与结果归档。
2. 对接 OpenClaw Agent 能力，实现“消息即任务”的协作方式。
3. 优化中文交互体验，降低团队在 IM 场景下的沟通和执行成本。

---

## 当前改造范围（2026-03-11）

本阶段重点完成“显示名称统一”与“@提及中文化”，为后续 OpenClaw 任务编排打好交互基础。

### 1) @ 提及显示改造

- `webapp/channels/src/components/suggestion/at_mention_provider/at_mention_provider.tsx`
- `webapp/channels/src/components/suggestion/at_mention_provider/at_mention_suggestion.tsx`
- `webapp/channels/src/components/at_mention/at_mention.tsx`

改造结果：

- 提及候选项统一优先显示昵称/全名。
- `@all` 前端展示为 `@所有人`。

### 2) 发送链路标准化

- `webapp/channels/src/components/advanced_text_editor/use_submit.tsx`

改造结果：

- 输入 `@所有人` 发送前自动标准化为 `@all`。
- 去除 `@all` 发送确认弹窗，减少操作阻断。

### 3) 会话列表显示统一

- `webapp/channels/src/packages/mattermost-redux/src/utils/channel_utils.ts`
- `webapp/channels/src/packages/mattermost-redux/src/selectors/entities/channel_categories.ts`
- `webapp/channels/src/packages/mattermost-redux/src/selectors/entities/preferences.ts`

改造结果：

- DM/GM 与侧边栏统一使用显示名称策略。
- 降低 `username` 回退导致的英文展示不一致问题。

### 4) 附带稳定性修复

- `webapp/channels/src/components/channel_layout/channel_identifier_router/actions.ts`
- `webapp/channels/src/packages/mattermost-redux/src/actions/scheduled_posts.ts`
- `webapp/platform/shared/src/context/context.tsx`

改造结果：

- 修复深链路由异常与无许可证场景下的初始化问题。
- 修复 `jsxDEV is not a function` 导致的页面转圈。

---

## OpenClaw 集成方向（下一阶段）

1. 在频道中支持标准任务消息模板（派单、回执、阻塞、完成）。
2. 将 OpenClaw 多角色 Agent（Leader/Product/Arch/FE/BE/QA/Ops）接入 Mattermost。
3. 支持任务状态自动更新与关键节点通知。
4. 建立任务留痕数据结构，沉淀过程可追踪与复盘能力。

---

## 本地运行

源码目录：`mattermost-master/`

```bash
cd mattermost-master/server
make run-server

cd ../webapp
make run
```

默认访问：`http://localhost:8065`

---

## 说明

- 本仓库用于 `openclaw-im-mattermost` 的二次开发与持续迭代。
- 当前文档聚焦显示改造与 OpenClaw 集成目标，后续按里程碑持续补充。
