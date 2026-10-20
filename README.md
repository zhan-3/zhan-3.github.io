# Zhan3 · 博客与工具箱

Astro 静态站，采用雾霾蓝、极简布局和少量像素细节。当前只在本地开发与提交，尚未推送或替换线上站。

## 本地运行

在仓库根目录执行：

```bash
npm ci
npm run dev
```

打开 `http://127.0.0.1:4321/`，开发服务仅监听本机。

```bash
npm run check    # Astro / TypeScript 检查
npm test         # 数据、图标及文章格式检查
npm run build    # 自动先执行测试，再输出到 dist/
npm run preview  # 预览构建结果
```

## 写博客

每篇文章放在 `src/content/posts/`，使用独立的 Markdown 文件。格式示例为 `templates/blog-post.example.md`，模板本身不会出现在首页。

```markdown
---
title: "文章标题"
date: "2026-10-20"
topic: "具体主题"
description: "一句话简介"
draft: true
---

正文从这里开始。
```

- 文件名决定地址，例如 `new-to-sc.md` 对应 `/posts/new-to-sc/`。
- 首页根据文章实际 `topic` 分组，各组按日期倒序，不预设阅读层次。
- 日期使用带引号的 `YYYY-MM-DD` 格式，页面当前显示为“整理日期”。
- `draft: true` 只显示草稿标记，**不会隐藏文章，也不是隐私保护**；写好后可改为 `false`。
- 图片放在 `public/images/posts/文章文件名/`，正文用 `/images/posts/文章文件名/图片名.webp` 引用。
- 正文由用户手写。代理仅按明确需要协助资料核对、链接、校对或排版，不主动代写或补充观点。

当前已有用户手写的《初来乍到》，保留为草稿。此前代理代写的文章已撤下，不得自动恢复。

## 工具箱

`data.json` 是唯一当前推荐数据源，共 34 条工具、6 个分类。支持按名称、描述和标签搜索，也支持分类与搜索组合；例如 `/toolbox/?cat=dev&q=AI`。

- 官网、文档或作者仓库作为入口，条目显示来源域名。
- Clash Verge Rev 与 res-downloader 已转为普通条目，不再设置“补充收录”。
- 已明确移除酷安、F-Droid、OpenCode、Tailscale；不把本机安装清单直接当成推荐。
- 只显示 `icons/sources.json` 中身份对应且已核验的图标，其余使用文字缩写。当前 GitHub、VS Code、Telegram 三项有记录；来源与核验方法见 `icons/README.md`。
- 取舍与链接整理记录见 `docs/toolbox-curation.md`。

## 结构

```text
src/content/posts/        用户手写文章
src/content.config.ts    文章元信息校验
src/pages/               首页、文章模板、工具箱
src/components/          共用名片、标识、工具图标
src/lib/                 数据读取、文章归档、图标来源检查
src/styles/global.css    样式与配色
public/                  头像、favicon、字体及许可、文章图片
icons/                   工具图标与核验记录
data.json                工具箱推荐数据
templates/               写作格式示例，不参与页面生成
tests/                   轻量检查
PRODUCT.md               当前产品约定
DESIGN.md                当前视觉约定
CONTEXT.md               原站历史决策，仅作参考
```

原 HTML/CSS/JS 可从 Git 历史追溯，不再维护第二套入口。未采用的天空试样已清理。

## 验证与部署边界

默认进行类型检查、构建和必要的少量定向验证，不自动反复跑浏览器矩阵。`tests/browser-smoke.js` 是可选手动检查，需要 `playwright-cli`，不生成截图；扩大浏览器测试范围前先询问。

页面保留 `noindex, nofollow`，但这不等于访问控制。个人简介仍是明确占位。

`.github/workflows/deploy.yml` 已适配 `npm ci` → 类型检查 → 测试与构建 → **仅上传 `dist/`**，不上传源码。未来推送 `main` 或手动触发工作流会部署，所以本次只做本地提交，**不推送、不触发部署**。上线前还需确认文章状态、简介及索引策略。
