# Zhan3 的软件导航

个人软件推荐与资源导航站,基于 GitHub Pages 部署。

## 技术栈

- 纯静态 HTML + CSS + JS,无构建步骤
- `data.json` 驱动渲染,加一条推荐 = 加一条记录
- 分类筛选 + 关键词搜索
- 界面中英双语切换,暗色/亮色主题

## 添加推荐

编辑 `data.json` 的 `items` 数组,按现有格式添加:

```json
{
  "name": "软件名",
  "desc": "一句话描述(中文)",
  "url": "https://官网地址",
  "cat": "分类 id(见 categories)",
  "tags": ["标签1", "标签2"]
}
```

新增分类时在 `categories` 数组加一条(带中英文名)。推送 `main` 分支后,GitHub Actions 自动部署。

## 本地预览

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

> 直接双击打开 `index.html` 时 `data.json` 无法通过 fetch 加载,请用上面的方式预览。

## 目录结构

```
├── index.html          # 页面骨架
├── styles.css          # 样式(暗色默认 + 亮色)
├── app.js              # 渲染/筛选/搜索/双语/主题逻辑
├── data.json           # 所有推荐条目
├── CONTEXT.md          # 项目决策记录
└── .github/workflows/  # Pages 自动部署
```
