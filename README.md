# badhope 个人品牌网站

> 一个具有艺术感与现代美学的个人品牌网站，展示全栈开发者的专业形象

## 🌟 特性

- **叙事性引导页** - 粒子动画 + 品牌故事展示
- **动态交互设计** - 磁吸悬停、水波纹点击、弹性动画
- **数据可视化博客** - 平台统计图表展示
- **响应式布局** - 完美适配移动端与桌面端
- **现代化视觉风格** - 暗色主题 + 霓虹渐变

## 📁 项目结构

```
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── home/              # 首页（引导页 + Hero + 关于 + 技能 + 项目）
│   │   ├── blog/              # 博客页（数据可视化面板）
│   │   ├── projects/          # 项目展示页
│   │   ├── tools/             # 开发工具推荐
│   │   ├── resume/            # 简历页（在线查看 + PDF下载）
│   │   └── contact/           # 联系页
│   ├── components/            # React 组件
│   │   ├── animations/        # 动画组件（Loader, PageTransition）
│   │   ├── sections/          # 页面区块（Hero, About, Skills, Projects, Footer）
│   │   └── ui/                # UI组件（Navigation, InteractiveButton）
│   └── hooks/                 # 自定义Hooks（微交互）
├── public/                    # 静态资源
├── .github/workflows/         # GitHub Actions 自动部署
└── out/                       # 构建输出（部署用）
```

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 本地预览生产版本
npm run start
```

## 📦 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 3.4
- **动画**: Framer Motion
- **数据可视化**: Recharts
- **3D效果**: Three.js + React Three Fiber

## 🌐 部署

项目已配置 GitHub Actions 自动部署到 GitHub Pages：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建
3. 访问 `https://badhope.github.io`

**手动部署**:
```bash
npm run build
npm run deploy
```

## 📝 页面预览

| 页面 | 路径 | 描述 |
|------|------|------|
| 首页 | `/home` | 全屏Hero + 粒子背景 + 导航 |
| 博客 | `/blog` | 平台数据统计 + 图表展示 |
| 项目 | `/projects` | 项目卡片 + 分类筛选 |
| 工具 | `/tools` | 开发工具推荐 |
| 简历 | `/resume` | 在线简历 + PDF下载 |
| 联系 | `/contact` | 社交链接 + 留言表单 |

## 🎨 设计规范

### 色彩系统
- **背景**: `#0a0a0f` (深空黑)
- **卡片**: `#12121a` (暗夜蓝)
- **主色调**: `#00d4ff` (霓虹青)
- **强调色**: `#bf5af2` (霓虹紫)
- **点缀色**: `#ff375f` (霓虹粉)

### 字体
- **标题**: Space Grotesk
- **正文**: Inter / system-ui
- **代码**: JetBrains Mono

## 📄 许可证

MIT License

---

**© 2024-2026 badhope. All rights reserved.**
