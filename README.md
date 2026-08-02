# 个人知识库

这是一个独立的 VuePress 2 静态知识库项目。内容使用 Markdown 编写，推送到 GitHub 的 `main` 分支后，可以自动构建并发布到腾讯云 COS，再由腾讯云 CDN 对外提供访问。

## 本地使用

要求 Node.js 22 和 pnpm 11。

```bash
pnpm install --frozen-lockfile
pnpm docs:dev
```

构建正式静态文件：

```bash
pnpm docs:build
```

输出目录为 `docs/.vuepress/dist`。

## 写一篇新文档

在 `docs/guide`、`docs/notes` 或 `docs/resources` 中创建 Markdown 文件，并包含：

```yaml
---
title: 文档标题
description: 一句话说明这篇文档解决什么问题
date: 2026-08-01
tags:
  - 示例标签
---
```

文件名只使用小写英文、数字和连字符，例如 `vuepress-basics.md`。文档会生成 `/分类/文章名/` 形式的地址。已发布文件如需改名，请在根目录 `redirects.json` 中保留旧地址：

```json
{
  "/guide/old-name/": "/guide/new-name/"
}
```

构建会验证目标页面存在，并为旧地址生成可部署的静态重定向页。

## 上线

完整的腾讯云、备案、GitHub Variables/Secrets 和验收步骤见 [上线操作手册](docs/guide/cloud-deployment.md)。

需要先替换以下占位内容：

- `.env.example` 中的域名、站点名称和作者；
- `docs/.vuepress/config.ts` 中通过环境变量读取的站点信息；
- GitHub 仓库 Variables 与 Secrets；
- ICP 和公安联网备案号。

> 安全提示：腾讯云密钥只能保存到 GitHub Secrets，不能写入仓库、Markdown、截图或构建日志。
