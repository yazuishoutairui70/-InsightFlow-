# InsightFlow · 真 AI 竞品拆解 MVP

桌面端竞品拆解工作台。原有三个预置演示案例仍可点击；`/ai` 则是真实上传分析：将用户提供的文本、CSV、PDF 或图片发送到服务端，再调用 Google Gemini 生成结构化拆解。

## 功能

- 购物 App、品牌（含服饰零售适配）、线下实体三种分析视角；“业务问题”选填。
- 输入产品名，上传最多 4 个文件（单个 4 MB、合计 8 MB）或粘贴材料；接受 PDF、PNG/JPG/WebP、TXT、CSV、Markdown。
- 分析定位、事实－动因－效果证据链、关键变量与替代解释、评论主题（仅材料中有评论时）、可迁移策略、验证计划与待补资料。
- 查看来源证据和原话，复制或下载 Markdown 报告。没有评论或效果数据时明确说明未知，不生成虚构样本。
- 不在本站持久保存上传材料或 AI 结果。页面刷新后结果消失；请及时下载报告。

## 安全与限制

Gemini 密钥只在服务端环境变量 `GEMINI_API_KEY` 中，绝不发送给浏览器或提交 GitHub。部署站点保持私有，并要求登录身份。用户须确认拥有上传材料的使用权；内容会被传给 Google 模型服务。每次分析可能产生 API 费用，受到提供方额度限制。模型引用、页码、评论数量和因果判断应由使用者核对。当前不抓取网页、不支持 DOCX、不提供跨设备持久化。

## 开发与部署

静态展示页：`index.html`, `app.js`, `data.js`, `styles.css`。真实上传页：`ai.html`, `ai.js`, `ai.css`。服务端接口：`worker/index.js` 的 `POST /api/analyze`。构建脚本将静态资源嵌入 Cloudflare Worker 产物。

```bash
npm test
npm run build
npm run validate
```

在 Sites 设置 `GEMINI_API_KEY`（密钥）、可选 `GEMINI_MODEL`（默认 `gemini-3.8-flash`），再部署构建产物。不要在本地/线上前端配置密钥。仓库 `.env.example` 仅记录变量名。
