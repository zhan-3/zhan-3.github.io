# CONTEXT — 个人软件推荐导航站

> 项目决策记录(grill-with-docs 模式)。更新时间:2026-08-10

## 项目定位

个人网站:推荐好用的软件 + 聚合链接,导航站形态。

## 已定决策

| 决策点 | 结论 |
|---|---|
| 托管平台 | GitHub Pages,默认域名 `https://zhan-3.github.io/`,仓库名 `zhan-3.github.io`(注意账号是 zhan-3,不是 zhan3) |
| 技术栈 | 纯静态 HTML + CSS + JS,无构建步骤,`data.json` 驱动渲染 |
| 站点形态 | 单页导航站:分类筛选 + 关键词搜索(搜索默认包含,未单独确认) |
| 内容规模 | 目标 50~100 条;每条 = 一条 `data.json` 记录 |
| 博客 | 不做 |
| 内容政策 | **站内只收录正规/官网内容**;破解教程与文件一律放站外(网盘/Telegram 等),网站最多给外链(Q6=b) |
| 双语 | 仅界面双语:按钮/标题/栏目名中英切换,条目描述保持中文(Q7=a) |
| 分类 | 开发工具 / 资源获取 / 网络 / 学习办公,可扩展(「等」) |
| 资源获取栏目 | = 获取资源的软件官网导航(Google Play、Telegram、F-Droid、酷安等) |
| 视觉 | 暗色默认 + 亮色切换,卡片式布局,简洁现代工具站风 |
| 站点名 | 「Zhan3 的软件导航」(可改) |

## 内容分级制度(2026-08-10 定,用户授权我拿捏分寸)

- **站内卡片**:有稳定官网/官方 GitHub 的正规软件。当前 23 条,6 个分类。
- **外链区**(折叠 + 免责声明):开源工具但用途灰色 —— clash-verge-rev、res-downloader。
- **笔记文字**(不放链接):盗版资源站与无官网灰色工具 —— zlib、世纪音乐网、Slpeey、真红小站、Tyranor、OCS、机场、IDM 破解版。
- **完全不收录**:赔钱机场(商业灰色服务)、IDM 破解版(官网卡已覆盖)。

## 环境事实

- git 身份:user.name=`zhan3`,email=`2375515459@qq.com`
- GitHub 用户名 `zhan-3`(探测 HTTP 200);`zhan3` 是别人的账号
- 仓库 `zhan-3/zhan-3.github.io` 已就位(用户已改名),代码已推送,站点已上线
- SSH key 已拷入 WSL 并修复 config(实测 `Hi zhan-3!`)
- Pages Source = GitHub Actions 已生效,自动部署链路可用
- `gh` CLI 未登录
- `docs/recommendation` 已收到 50 行内容清单,已分级转成 data.json

## 待办

- [x] 用户确认内容分拣表(争议项 + 教程文案区段与否)→ 转成 `data.json`(用户授权代理决定)
- [x] 用户把仓库改名为 `zhan-3.github.io`
- [x] 认证:SSH key 拷入 WSL 并修复 config(实测 `Hi zhan-3!`)
- [x] 仓库 Settings → Pages → Source = GitHub Actions(已生效,站点上线 HTTP 200)
- [x] `git push -u origin main` → 自动部署成功
- [ ] impeccable 视觉打磨(内容就位后)
- [ ] code-review 收尾
