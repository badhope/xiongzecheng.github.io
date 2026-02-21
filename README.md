# github.io
my first personal website. 

# 熊泽城个人作品集网站

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=flat-square&logo=github)](https://xiongzecheng338.github.io)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

> 🚀 一个功能齐全、设计现代的个人作品集网站，集成实时天气、GitHub数据、动态时钟等交互功能。

[在线预览](https://xiongzecheng338.github.io) · [报告问题](../../issues) · [提出建议](../../issues/new)

---

## ✨ 功能特性

### 🎨 核心页面
- **响应式 Hero 区域** - 打字机动画效果，自动计算年龄展示
- **关于我** - 个人简介、技能标签、社交链接
- **技术栈** - 可视化技能进度条，分类展示（前端/后端/设计）
- **项目展示** - 支持分类筛选（Web/小程序/设计/开源）
- **工作经历** - 时间轴式经历展示
- **博客文章** - 技术文章预览板块
- **工具箱** - 实用在线工具集合（开发中）
- **联系表单** - 完整的联系信息展示

### ⚡ 动态功能
| 功能 | 说明 | 数据来源 |
|:---|:---|:---|
| 🕐 实时时钟 | 数字时钟 + 模拟时钟（带指针动画） | 本地 JavaScript |
| 🌤️ 天气显示 | 当前温度、湿度、风速、天气状况 | [Open-Meteo API](https://open-meteo.com) |
| 💬 每日一句 | 编程名言随机展示，支持刷新/复制 | 本地数据 |
| 📊 GitHub 贡献图 | 模拟贡献热力图 + 实时统计数据 | [GitHub API](https://docs.github.com/en/rest) |
| 🌓 深色模式 | 自动/手动切换，支持系统偏好检测 | LocalStorage |
| 📱 移动端适配 | 完整的移动端菜单和布局优化 | CSS Media Queries |

---

## 🛠️ 技术栈

### 前端技术
- **HTML5** - 语义化标签，SEO 友好
- **Tailwind CSS** (CDN) - 实用优先的 CSS 框架
- **原生 JavaScript** - 无框架依赖，轻量高效
- **Lucide Icons** - 现代化图标库

### 第三方 API
- Open-Meteo - 免费天气数据
- GitHub REST API - 用户统计数据

### 设计特性
- 🎨 Glassmorphism 玻璃态设计
- ✨ 流畅的 CSS 动画和过渡效果
- 🎯 渐变色主题（蓝紫色调）
- 📐 完全响应式布局

---

## 📁 项目结构
.
├── index.html          # 主页面（单文件应用）
├── README.md           # 项目说明文档
├── LICENSE             # MIT 许可证（可选）
└── assets/             # 静态资源（可选）
├── images/         # 图片资源
└── resume.pdf      # 简历下载
plain
复制

> **注意**：本项目采用单文件架构，所有 CSS 和 JavaScript 都内联在 HTML 中，便于直接部署到 GitHub Pages。

---

## 🚀 快速开始

### 1. 克隆仓库
```bash
git clone https://github.com/Xiongzecheng338/Xiongzecheng338.github.io.git
cd Xiongzecheng338.github.io
2. 本地预览
由于使用 CDN 资源，无需安装依赖，直接用浏览器打开：
bash
复制
# 方式一：直接打开
open index.html

# 方式二：使用本地服务器（推荐，避免 CORS 问题）
npx serve .
# 或
python -m http.server 8000
3. 部署到 GitHub Pages
在 GitHub 创建名为 Xiongzecheng338.github.io 的仓库
上传 index.html 到仓库根目录
进入 Settings → Pages → Source，选择 main 分支
访问 https://xiongzecheng338.github.io
✏️ 自定义配置
修改个人信息
编辑 index.html 中的以下部分：
JavaScript
复制
// 第 ~200 行：基础信息
const birthYear = 2006;                    // 出生年份（自动计算年龄）
const location = { lat: 23.1291, lon: 113.2644 };  // 广州坐标

// 第 ~850 行：联系方式
<a href="mailto:3351234258@qq.com">...</a>    // 邮箱
<span id="wechat">Xbb444</span>                // 微信号
修改项目展示
搜索 <!-- Project --> 注释，修改项目卡片：
HTML
预览
复制
<div class="project-card" data-category="web">
    <h3>你的项目名称</h3>
    <p>项目描述...</p>
    <!-- 修改链接 -->
    <a href="你的GitHub链接">...</a>
</div>
修改技能进度条
搜索 skill-bar 类，调整 style="--width: XX%"：
HTML
预览
复制
<div class="skill-bar bg-blue-600 h-2 rounded-full" style="--width: 90%"></div>
添加新的每日一句
搜索 quotes 数组，添加新名言：
JavaScript
复制
const quotes = [
    { content: "你的名言", author: "作者名" },
    // ... 其他名言
];
🔧 高级配置
更换天气城市
修改 fetchWeather() 函数中的坐标：
JavaScript
复制
// 例如：改为北京
const lat = 39.9042;
const lon = 116.4074;
接入真实 GitHub 贡献数据
当前使用模拟数据，如需真实数据：
申请 GitHub Personal Access Token
使用 GitHub GraphQL API 查询贡献数据
或使用第三方库如 github-contributions-canvas
添加新的工具
在 <!-- Tools Section --> 中添加：
HTML
预览
复制
<div class="bg-white dark:bg-slate-800 p-6 rounded-2xl" onclick="yourToolFunction()">
    <i data-lucide="icon-name"></i>
    <h3>工具名称</h3>
</div>
📱 浏览器支持
表格
复制
浏览器	版本	支持状态
Chrome	90+	✅ 完全支持
Firefox	88+	✅ 完全支持
Safari	14+	✅ 完全支持
Edge	90+	✅ 完全支持
微信内置浏览器	最新	✅ 支持
IE 11	-	❌ 不支持
🤝 贡献指南
欢迎提交 Issue 和 Pull Request！
Fork 本仓库
创建你的特性分支 (git checkout -b feature/AmazingFeature)
提交更改 (git commit -m 'Add some AmazingFeature')
推送到分支 (git push origin feature/AmazingFeature)
打开 Pull Request
📄 许可证
本项目基于 MIT 许可证开源。
你可以自由使用、修改和分发，只需保留原始许可证声明。
👤 关于作者
熊泽城 - 全栈开发者 & 设计师
🎓 数据科学与大数据技术专业
📍 广东广州
💼 网页设计 | 小程序开发 | 开源贡献
📧 3351234258@qq.com
💬 微信：Xbb444
https://github.com/Xiongzecheng338
🙏 致谢
Tailwind CSS - 强大的 CSS 框架
Lucide Icons - 精美的开源图标
Open-Meteo - 免费天气 API
GitHub Pages - 免费托管服务
⭐ 如果这个项目对你有帮助，请给它一个 Star！
plain
复制

## 使用说明

1. **保存文件**：将以上内容保存为 `README.md`，放在与 `index.html` 同一目录
2. **个性化修改**：
   - 替换所有链接为你的真实仓库地址
   - 根据需要调整功能特性表格
   - 修改"关于作者"部分的个人信息
3. **可选增强**：
   - 添加 `LICENSE` 文件（MIT 许可证）
   - 创建 `assets/` 文件夹存放简历等下载文件
   - 添加截图到 README（推荐添加网站预览图）

这个 README 采用标准开源项目格式，包含徽章、功能说明、部署指南和自定义教程，既专业又实用！
