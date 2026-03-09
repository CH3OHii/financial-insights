# Financial Insights — 财经数据可视化

交互式财报分析与数据驱动的投资可视化网站。

## 技术栈

- **Next.js 14** — React 全栈框架
- **Tailwind CSS** — 原子化样式
- **Recharts** — 图表库
- **Lucide React** — 图标

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开浏览器访问
# http://localhost:3000
```

## 部署到 Vercel（3 步）

### 方式一：通过 GitHub（推荐）

1. **上传到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/financial-insights.git
   git push -u origin main
   ```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com) 并使用 GitHub 登录
   - 点击 "New Project" → 选择你刚推送的 `financial-insights` 仓库
   - Framework Preset 会自动识别为 Next.js
   - 点击 "Deploy"

3. **完成！** Vercel 会自动构建并分配一个 `xxx.vercel.app` 域名。
   之后每次 push 到 main 分支都会自动重新部署。

### 方式二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 一键部署
vercel
```

## 项目结构

```
financial-insights/
├── app/
│   ├── layout.js              # 根布局（字体、全局样式）
│   ├── page.js                # 首页（文章列表）
│   ├── globals.css            # 全局CSS
│   └── analysis/
│       └── crowdstrike-q4-fy26/
│           ├── layout.js      # 页面 metadata
│           └── page.js        # CrowdStrike 分析页
├── components/
│   ├── Header.js              # 网站头部
│   ├── Footer.js              # 网站底部
│   ├── ArticleCard.js         # 首页文章卡片
│   ├── Sankey.js              # Sankey 流向图组件
│   └── ChartUI.js             # 通用图表 UI 组件
├── data/
│   └── crowdstrike.js         # CrowdStrike 财务数据
└── public/                    # 静态资源
```

## 添加新的分析页

1. 在 `data/` 下创建新的数据文件（如 `broadcom.js`）
2. 在 `app/analysis/` 下创建新路由文件夹（如 `broadcom-q1-fy26/page.js`）
3. 在 `app/page.js` 的 `articles` 数组中添加新条目

## 自定义域名

在 Vercel Dashboard → Settings → Domains 中添加你的自定义域名，
然后在域名注册商处将 DNS 指向 Vercel。

## 许可

仅供学习和个人使用。财务数据仅供参考，不构成投资建议。
