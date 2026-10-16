# InsightFlow · 真 AI 竞品拆解 MVP

桌面端竞品拆解工作台。固定三入口：新建项目（`/ai`）、本地数据采集（`/collector`）、历史记录（`/history`）。上传材料后调用 Google Gemini 生成结构化拆解；原有三个预置演示案例已移除。

## 功能

- 购物 App、品牌（含服饰零售适配）、线下实体三种分析视角；“业务问题”选填。
- 输入产品名，上传最多 4 个文件（单个 4 MB、合计 8 MB）或粘贴材料；接受 PDF、PNG/JPG/WebP、TXT、CSV、JSON/JSONL、Markdown。
- 分析定位、事实－动因－效果证据链、关键变量与替代解释、评论主题（仅材料中有评论时）、可迁移策略、验证计划与待补资料。
- 查看来源证据和原话，复制或下载 Markdown 报告。没有评论或效果数据时明确说明未知，不生成虚构样本。
- 上传的原始文件不在本站持久保存；成功生成的报告会自动保存在当前浏览器的本地存储中（最多 20 份），可在历史记录重新打开、下载或删除。换浏览器、换设备或清除浏览器数据会丢失，请及时下载重要报告。
- `/collector` 本地评论采集工作台：基于用户自行安装的 MediaCrawler 生成低频、小样本采集命令，并把用户主动选择的 CSV、JSON、JSONL、TXT 或 Markdown 导入分析页。账号登录、Cookie、扫码与采集均只发生在用户本机。

## 安全与限制

Gemini 密钥只在服务端环境变量 `GEMINI_API_KEY` 中，绝不发送给浏览器或提交 GitHub。部署站点保持私有，并要求登录身份。用户须确认拥有上传材料的使用权；内容会被传给 Google 模型服务。每次分析可能产生 API 费用，受到提供方额度限制。模型引用、页码、评论数量和因果判断应由使用者核对。当前不抓取网页、不支持 DOCX、不提供跨设备持久化。

## 本地评论采集（个人研究）

`/collector` 不包含 MediaCrawler 的源码，也不控制用户的浏览器。它仅根据该项目公开的命令行参数生成小样本命令，并读取用户主动导入的导出文件。使用前请自行阅读 [MediaCrawler 的非商业学习许可证](https://github.com/NanmiCoder/MediaCrawler/blob/main/LICENSE) 与目标平台规则；不要绕过登录验证、验证码或访问限制，也不要进行高频或批量采集。

### 一次性准备（Windows）

需要安装 Git、[uv](https://docs.astral.sh/uv/) 和 Chrome（或 Edge）。在 PowerShell 中执行：

```powershell
cd $env:USERPROFILE\Documents
git clone https://github.com/NanmiCoder/MediaCrawler.git
cd .\MediaCrawler
uv sync
```

上述步骤只需要完成一次。之后每次采集，只需打开 PowerShell 并进入项目目录：

```powershell
cd $env:USERPROFILE\Documents\MediaCrawler
```

### 开启浏览器连接

MediaCrawler 默认通过本机 Chrome DevTools Protocol（CDP）连接到浏览器的 `9222` 端口。开始采集前：

1. 打开 **Google Chrome**，在地址栏进入 `chrome://inspect/#remote-debugging`。
2. 勾选 **Allow remote debugging for this browser instance**。
3. 确认页面显示 `Server running at: 127.0.0.1:9222`，并保持该浏览器窗口打开。
4. 运行采集命令后，如浏览器弹出授权提示，选择接受；随后按平台正常流程扫码登录。

这项权限只供本机程序临时控制浏览器。采集结束后可关闭 Chrome；下次重新打开 Chrome 时，需要重新开启此权限。采集期间不要关闭 Chrome，也不要操作正在被采集器控制的标签页；电脑的其他软件和浏览器窗口可以正常使用。

### 首次小样本采集

先用少量公开内容验证整个链路。以下命令以小红书上对 Manner Coffee 的讨论为例，限制为 8 篇笔记、每篇最多 15 条一级评论，不下载媒体文件：

```powershell
uv run main.py --platform xhs --lt qrcode --type search --keywords "Manner咖啡" --get_comment true --get_sub_comment false --get_media false --crawler_max_notes_count 8 --max_comments_count_singlenotes 15 --max_concurrency_num 1 --save_data_option csv
```

关键词可替换为 `优衣库`、`小红书` 等。建议始终先使用小样本；如需其他平台或参数，优先在 InsightFlow 的 `/collector` 页面填写条件并复制它生成的命令。

采集完成后查找导出的 CSV：

```powershell
Get-ChildItem -Recurse .\data -Filter *.csv
```

### 导入 InsightFlow

1. 打开 `/collector`，在“导入采集结果”中选择导出的 CSV、JSON、JSONL、TXT 或 Markdown 文件。
2. 文件会被带到 `/ai` 页面；填写产品名称、选择“线下实体 / 快消品牌 / 购物 App”视角后开始分析。
3. AI 会基于导入材料形成事实、动因、效果、评论主题、可迁移策略和待验证问题。结论应回看原始内容核验，不把模型推断当作已验证事实。

### 常见问题

| 现象 | 原因与处理 |
| --- | --- |
| `CDP port 9222 is not accessible` | 尚未开启浏览器远程调试。按“开启浏览器连接”步骤在 Chrome 打开并允许 `chrome://inspect/#remote-debugging`，再重新运行命令。 |
| 一直没有出现小红书扫码页 | 先确认 Chrome 保持打开、`9222` 已显示为运行中，并在浏览器弹出的授权窗口选择接受。 |
| `Cannot find path ... MediaCrawler` | 项目尚未克隆在该路径，重新执行“一次性准备”中的 `git clone` 步骤，或将 `cd` 改成实际项目路径。 |
| `git` 不是命令 | 安装 Git 后关闭并重新打开 PowerShell，再执行准备命令。 |
| 采集结果过少、平台要求验证或登录失效 | 不要尝试绕过限制；降低频率与数量，必要时重新按平台正常流程登录。 |

## 开发与部署

共用导航：`nav.js`、`styles.css`；真实上传页：`ai.html`, `ai.js`, `ai.css`；本地数据采集：`collector.html`, `collector.js`；浏览器本地历史：`history.html`, `history.js`, `history-store.js`。服务端接口：`worker/index.js` 的 `POST /api/analyze`。构建脚本将静态资源嵌入 Cloudflare Worker 产物。

```bash
npm test
npm run build
npm run validate
```

在 Sites 设置 `GEMINI_API_KEY`（密钥）、可选 `GEMINI_MODEL`（默认 `gemini-3.8-flash`），再部署构建产物。不要在本地/线上前端配置密钥。仓库 `.env.example` 仅记录变量名。
