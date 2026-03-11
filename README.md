# OpenClaw IM 集成项目（openclaw-im-mattermost）

本仓库用于基于 Mattermost 做二次开发，并与 OpenClaw 集成，目标是在 IM 消息内完成任务委派、过程管理与状态回执，形成可持续运行的协作闭环。

上游项目：`https://github.com/mattermost/mattermost`

## 作者简介

### 霍钧城（分布式 AI 架构师）

具备多年企业级研发与架构经验，长期聚焦“高并发分布式系统 + 业务中台 + AI Agent 工程化落地”的融合实践。

联系方式：`howard_007@163.com`

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

---

## 作者介绍（详细）

### 霍钧城（分布式 AI 架构师）

具备多年企业级研发与架构经验，长期聚焦“高并发分布式系统 + 电商交易中台 + AI 应用落地”的融合架构实践。

联系方式：`howard_007@163.com`

**技术架构能力（Technical Architecture）**

- 具备从单体到微服务的架构演进经验，熟悉 Spring Cloud、网关、配置中心、任务调度、消息中间件与可观测体系建设。
- 擅长高并发与高可用设计，围绕缓存分层、异步解耦、分布式锁、最终一致性、熔断限流等方案提升系统稳定性。
- 有云原生工程化落地经验，能够基于 Docker/K8s/Jenkins/DevOps 构建持续交付与自动化发布体系。

**业务架构能力（Business Architecture）**

- 深度参与 B2B2C 电商与供应链场景，覆盖商品、订单、库存、支付、分账、结算、对账等核心链路。
- 具备统一支付中台设计经验，支持多支付渠道接入、多级分账与实时结算，保障交易链路一致性与可追踪性。
- 强调平台化与中台化建设，通过通用能力抽象与组件复用，支撑多端业务持续迭代与规模增长。
- 面向业务智能化升级，推动企业级 Agent 在客服、运营、风控、供应链协同等场景落地，形成“人+AI+系统”协作闭环。
- 具备数字员工体系设计经验，围绕岗位职责、工具权限、SOP 流程与绩效指标构建可运营的 AI Workforce。

**AI 架构能力（AI Architecture / Agent Engineering）**

- 具备大模型平台化搭建与使用能力，支持多模型接入、模型路由、推理参数治理与成本/延迟/效果平衡。
- 基于 Spring AI + Qwen/DeepSeek/OpenAI 等模型构建企业级 AI 应用，覆盖智能问答、流程自动化、AI Copilot 与数字员工。
- 采用 RAG + Hybrid Search（向量检索 + 关键词检索）+ Rerank 架构，提升企业知识问答准确率与可解释性。
- 结合 Function Calling / Tool Calling 打通“自然语言意图 -> 业务操作执行”闭环，实现 Agentic Workflow 的工程化落地。
- 构建 MCP（Model Context Protocol）工具生态，沉淀 MCP Server 与标准化能力接口，支持跨系统工具编排与安全调用。
- 建设 Skills（技能）资产体系，将高频业务能力封装为可复用 Skill，支持版本化、灰度发布与持续迭代。
- 推动 Multi-Agent 协作模式，在复杂任务中通过 Planner/Executor/Reviewer 等角色分工提升稳定性与产出质量。
- 强化 AI 工程化治理（PromptOps、EvalOps、Guardrails、Observability），实现从 PoC 到 Production 的可持续演进。

该仓库围绕 Mattermost 的二次开发与 OpenClaw 集成，也延续了上述方法论：先保证协作链路可用，再推动任务编排自动化，最后实现可观测、可复盘、可持续优化的数字员工体系。
