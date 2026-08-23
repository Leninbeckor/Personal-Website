---
title: DSH 开发实践
description: 介绍 DeepSeek Harness 的插件化架构、运行方式与 DSH 开发实践
sidebar: false
date: 2026-08-02
tags:
  - DSH
  - 开发实践
---

# DSH 开发实践

这里是 DSH 项目的实践入口，聚焦 DeepSeek Harness 的架构、运行方式，以及基于它开发专业 Agent 的方法。

## DeepSeek Harness 是什么

DeepSeek Harness（命令名 `dsh`）不是一个只能按固定方式使用的聊天应用，而是一套用于组装和运行智能体的底座。它基于 Cordis 插件框架，把模型、工具、Agent Loop、会话记录、权限控制、沙箱和 Web 界面组织成可以组合、替换和撤销的插件。

它的核心思路是“一切都是插件”：模型适配器通过 `ctx.llm` 提供模型能力，工具通过 `ctx.tools` 注册，Agent 通过 `ctx.agents` 管理，会话过程写入持久化 Session Log，Web 界面则消费会话事件并呈现对话、工具执行和运行状态。插件之间通过共享上下文和事件协作，因此可以在不重写核心循环的情况下替换模型、增加专业工具或扩展界面。

从整体上看，Harness 可以分为几层：底层是模型与 Agent 运行链路，中间是文件系统、Shell、网络、LSP 和子 Agent 等行动能力，外围是权限、沙箱、持久化、API、SDK 与 Web UI。Profile、Bundle 和 `cordis.patch.yml` 负责把这些能力组装成具体的运行环境。

这种结构适合用来开发专业 Agent：先保留 Harness 的运行底座，再通过独立插件加入领域工具、专业 Prompt、工作流、知识库和定制 Web UI。这样可以跟随上游更新，减少直接修改核心代码带来的维护成本。

## 如何运行 DeepSeek Harness

运行源码仓库前，需要准备 Node.js 22.19+ 或 24+、pnpm 11.7+，并准备可用的 `DEEPSEEK_API_KEY`。

在 Harness 源码目录中执行：

```powershell
corepack enable
pnpm install
pnpm run build
$env:DEEPSEEK_API_KEY="你的 API Key"
pnpm dsh web
```

如果不希望启动时自动打开浏览器，可以使用：

```powershell
pnpm dsh web --no-open
```

服务启动后，通常可以通过 `http://127.0.0.1:3080` 访问 Web 界面。`pnpm run build` 会构建 Host、Client 和 Web 前端；之后 `pnpm dsh web` 才能启动完整的本地 Web 服务。如果没有配置 `DEEPSEEK_API_KEY`，界面可能可以打开，但模型调用无法正常工作。

正式开发自己的专业 Agent 时，建议先确认原始 Harness 可以安装、构建、启动并完成一次模型调用，再通过独立插件逐步增加领域工具和界面能力。

## 最新发布

### [DeepSeek Harness：不是一个应用，而是一种组装智能体的方法](./deepseek-harness-architecture.md)

从插件树、共享上下文与事件日志出发，理解整套 Harness 的结构，以及它给非专业开发者的启发。

[阅读最新发布 →](./deepseek-harness-architecture.md)
