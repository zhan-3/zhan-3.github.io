# 工具箱整理记录

## 取舍原则

- 工具箱是个人精选，不是本机软件资产清单；“扫描到”不等于“推荐”。
- 原有 23 条中，按用户最新要求移除酷安、F-Droid、OpenCode、Tailscale，保留 19 条；清单补充 7 条，再增加用户确认的 6 条精选，原计 32 条；本轮将原补充区两项转正，现共 34 条。不会未经确认自动删除其它既有内容。
- 不新增 Git、GitHub CLI、Windows Terminal 等常见基础工具；ripgrep 和 jq 不单独新增。
- `.pi/agent/bin/rg` 是当前本机 Pi 管理的工具；jq 来自 WinGet，并非 Pi 自带。不因二者在本机可用就收录为网站推荐。
- 推荐只链接到官网、官方文档或作者仓库，不增加破解、激活或未确认来源入口。
- 用户最新要求取消“补充收录”：Clash Verge Rev 转入网络类，res-downloader 转入系统工具类，进入普通搜索与筛选；使用权限、配置来源和版权边界写进描述，不因转正而省略。
- 原站提醒不再在工具箱底部堆放；是否写入正文由用户决定，代理代写稿不恢复。未经核实的账号封禁概率、灰色资源地址与无来源工具不照搬为新建议。旧站原文可从 Git 历史追溯。

## 已补充的原清单项目

| 工具 | 分类 | 核对的官方入口 |
|---|---|---|
| 7-Zip | 系统工具 | https://www.7-zip.org/ |
| PixPin | 系统工具 | https://pixpin.cn/ |
| Pi | 开发工具 | https://pi.dev/ |
| Playwright | 开发工具 | https://playwright.dev/ |
| Browser Use | 开发工具 | https://browser-use.com/ |
| Chrome DevTools | 开发工具 | https://developer.chrome.com/docs/devtools/ |
| PCL2 | 影音娱乐 | https://github.com/Meloong-Git/PCL |

Chrome DevTools 链接是官方文档，不是第三方下载站。PCL2 旧入口 `Hex-Dragon/PCL2` 会跳到 `Meloong-Git/PCL`，已使用最终仓库地址。

## 用户确认的新增精选

| 工具 | 分类 | 用途与门槛 | 核对的官方入口 |
|---|---|---|---|
| PowerToys | 系统工具 | Windows 效率工具集；按需开启模块 | https://learn.microsoft.com/zh-cn/windows/powertoys/ |
| Obsidian | 学习办公 | 本地 Markdown 笔记；需要自己组织内容 | https://obsidian.md/ |
| Anki | 学习办公 | 间隔重复复习；制卡和复习都需要投入 | https://apps.ankiweb.net/ |
| OBS Studio | 影音娱乐 | 录屏与直播；复杂场景需要配置 | https://obsproject.com/ |
| Thorium Reader | 学习办公 | EPUB 等电子书阅读；不是书源站 | https://thorium.edrlab.org/en/ |
| UniGetUI | 系统工具 | 软件包管理图形界面；仍需辨别包来源 | https://devolutions.net/unigetui/ |

UniGetUI 官方入口已由原作者站点演进到 Devolutions，不能凭软件名称猜测下载域名。上述页面均进行了官方页面内容核对，本站不镜像安装包，也不保证软件永远免费、适合所有人或没有风险。

## 原链接与文案修正

- PotPlayer：旧 `potplayer.daum.net` 在本机 TLS 握手失败，核对官方页面后改为 https://potplayer.tv/ 。单次网络失败不直接等于网站失效。
- 图吧工具箱：旧 `.com` 地址跳转到 `.org`，核对项目页面后改为 https://www.tubatool.org/ 。
- Microsoft Authenticator：采用官方最终中文页面 https://www.microsoft.com/zh-cn/security/mobile-authenticator-app 。
- OpenCode：整理阶段曾统一名称与描述，后按用户要求不再推荐；当前清单已移除。
- WinRAR：移除“官方免费版功能完整”的不准确说法，改为试用与授权说明。
- Google Play、Telegram：删除未经核实的封号概率与加密范围宣传，改为用途介绍。
- Google Play、Firecrawl 在整页请求时收到部分内容后超时；不因本机整页读取超时而删除官方入口。HTTP 可达性检查不等于安全或授权审计。

## 98 条本机扫描候选的边界

用户提供的 `software-tools-catalog.md` / `.csv` 有 98 行，但 `NVM for Windows` 重复，实际 97 个不同名称。JSON 原始扫描有 282 个桌面条目、154 个 AppX 条目，不能单独证明全部 PATH、npm、Cargo 或便携目录候选来源。

这份扫描清单仅用作选题底稿，未整体导入。没有复制原始扫描、安装路径或本机版本清单到仓库。其它开发环境、驱动、运行库和垂直领域工具，留待有具体使用说明时再决定。

## 展示与维护

- `data.json` 为唯一当前推荐数据源；`icon` 可选，仅展示 `icons/sources.json` 中身份对应的已核验图标，其他显示文字缩写。旧图标核查发现平台图标与产品图标混用，详细问题和核验方式见 `../icons/README.md`。
- 页面按分类顺序与名称排序，显示官网域名或官方仓库路径。
- 原始 23 条及其旧图标可从 Git 历史追溯；当前不再维护旧站副本。
- 单元测试校验唯一 HTTPS 链接、分类、图标、原条目保留及已确认入口；浏览器测试校验 34 条搜索与筛选、2 项补充工具转正、4 项明确移除以及仅展示 3 项已核验图标。
- 用户已授权本地整理与提交，不推送、不部署。
