// ============================================================
// badhope's Starbase - AI Knowledge Base (60+ entries)
// ============================================================

export interface FAQItem {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  category: 'about' | 'skills' | 'projects' | 'tech' | 'contact' | 'general' | 'career' | 'ai' | 'website';
  priority?: number;
}

export const knowledgeBase: FAQItem[] = [
  // ===== ABOUT / 个人介绍 =====
  { id: 'about-001', keywords: ['关于', '个人', '介绍', '是谁', '背景', '经历'], question: 'badhope是谁？', answer: 'badhope 是一名全栈开发者，专注于数据科学与大数据技术专业。毕业于深圳，热衷于探索前沿技术，是AI时代的积极探索者和开源贡献者。', category: 'about', priority: 10 },
  { id: 'about-002', keywords: ['学历', '学校', '专业', '毕业', '教育'], question: 'badhope的学历和专业是什么？', answer: 'badhope 毕业于深圳，学习**数据科学与大数据技术**专业，系统学习数据分析、机器学习和大数据处理技术。', category: 'about', priority: 9 },
  { id: 'about-003', keywords: ['位置', '地点', '城市', '在哪里', '深圳'], question: 'badhope在哪里？', answer: 'badhope 目前在 **深圳 · 广东 · 中国** 工作和生活。深圳是中国科技创新的核心城市之一，拥有腾讯、华为、大疆等众多科技公司。', category: 'about', priority: 8 },
  { id: 'about-004', keywords: ['全栈', '全栈开发者', 'fullstack', 'full-stack'], question: 'badhope是全栈开发者吗？', answer: '是的！badhope 是一名**全栈开发者**，从前端到后端，从数据库到部署，能够独立完成完整的项目开发。', category: 'about', priority: 9 },
  { id: 'about-005', keywords: ['独立开发者', '自由职业', 'freelance', '接单'], question: 'badhope是独立开发者吗？', answer: 'badhope 目前以**独立开发者**身份工作，专注于个人项目和技术探索。同时也乐于接受项目合作和技术咨询。', category: 'about', priority: 8 },
  { id: 'about-006', keywords: ['开源', '开源贡献', 'open source', '贡献'], question: 'badhope参与开源吗？', answer: '是的！badhope 是一名活跃的**开源贡献者**，在 GitHub 上有多个开源项目，并持续为社区做出贡献。GitHub: https://github.com/badhope', category: 'about', priority: 9 },
  { id: 'about-007', keywords: ['成长', '学习', '历程', '怎么学'], question: 'badhope是怎么成长为开发者的？', answer: 'badhope 的成长路径：**2021年**系统学习数据科学 → **2022年**掌握全栈开发 → **2023年**深入AI技术 → **2024年至今**持续探索前沿技术，用代码创造价值。', category: 'about', priority: 8 },
  { id: 'about-008', keywords: ['AI探索者', 'AI时代', 'AI爱好者'], question: 'badhope为什么称自己为AI探索者？', answer: 'badhope 深信 **AI 是提升生产力的关键**，积极探索 AI 技术在开发中的应用，是 AI 时代的积极探索者和实践者。善用 AI 辅助开发，追求技术卓越。', category: 'about', priority: 8 },
  { id: 'about-009', keywords: ['个人网站', '博客', '作品集网站'], question: 'badhope有个人网站吗？', answer: '有的！badhope 的个人网站是 **https://badhope.github.io**，采用 Next.js 构建，包含作品集、博客、AI助手、工具箱等多个板块，还有贪吃蛇等趣味互动游戏！', category: 'about', priority: 9 },
  { id: 'about-010', keywords: ['GitHub', 'github', '个人主页', '仓库'], question: 'badhope的GitHub主页是什么样的？', answer: 'badhope 的 GitHub 主页有33+个公开仓库，涵盖 Web 应用、数据工具、AI 项目等多个领域：https://github.com/badhope', category: 'about', priority: 9 },
  { id: 'about-011', keywords: ['博客', '写作', '文章', 'CSDN', '掘金', 'juejin', 'csdn'], question: 'badhope在哪里写博客？', answer: 'badhope 在 **CSDN** 和 **掘金** 分享技术文章，涵盖 Python 爬虫、Next.js、React、AI辅助开发、Docker 等多个领域，累计多篇文章获得较高阅读量。', category: 'about', priority: 8 },
  { id: 'about-012', keywords: ['性格', '特点', '风格', '什么样的人'], question: 'badhope是什么样的性格？', answer: '从网站风格可以看出，badhope 喜欢**有创意、有趣味**的东西（比如贪吃蛇游戏）。技术上有追求，热衷探索，同时也很务实，追求用技术解决实际问题。', category: 'about', priority: 7 },
  { id: 'about-013', keywords: ['研究方向', '关注', '兴趣'], question: 'badhope目前最关注哪些技术方向？', answer: 'badhope 目前最关注：**① AI/LLM 应用开发**（用 AI 提升开发效率）**② 全栈工程化**（Next.js 生态、性能优化）**③ 数据工程**（大数据处理、实时分析）', category: 'about', priority: 8 },
  { id: 'about-014', keywords: ['大数据', '数据科学', 'data science'], question: 'badhope的数据科学背景是什么？', answer: 'badhope 的专业是**数据科学与大数据技术**，系统学习过数据分析、机器学习、数据可视化和大数据处理框架（Hadoop、Spark等)，这是他全栈技能的重要基础。', category: 'about', priority: 8 },
  { id: 'about-015', keywords: ['深圳', '为什么在深圳'], question: 'badhope为什么选择深圳？', answer: '深圳是中国的"硅谷"，拥有腾讯、华为、大疆、比亚迪等顶级科技公司，创新氛围浓厚，机会众多。对于技术人来说，深圳是理想的工作和生活之地。', category: 'about', priority: 7 },
  { id: 'about-016', keywords: ['目标', '愿景', '未来'], question: 'badhope的职业目标是什么？', answer: 'badhope 的目标是成为**顶尖的全栈开发者 + AI 工程师**，用技术创造有影响力的产品，同时持续分享知识，帮助更多人进入技术世界。', category: 'about', priority: 8 },
  { id: 'about-017', keywords: ['团队', '合作', '一个人', 'solo'], question: 'badhope喜欢一个人开发还是团队合作？', answer: '作为独立开发者，badhope 擅长独立完成项目。但也**非常欢迎合作**！无论是项目合作、技术交流还是商业合作，都可以通过 /contact 页面联系。', category: 'about', priority: 7 },
  { id: 'about-018', keywords: ['作品集', 'portfolio', '案例', '成功项目'], question: 'badhope有哪些代表性作品？', answer: 'badhope 的代表作品包括：**① AI驱动电商平台**（React + Python + AI推荐）**② 实时数据可视化平台**（Next.js + D3.js）**③ 个人网站 starbase**（Next.js 15 + 多种动态效果）**④ 分布式爬虫系统**（Python + Redis）', category: 'about', priority: 9 },
  { id: 'about-019', keywords: ['技术栈', '技术体系', '生态系统'], question: 'badhope的技术栈体系是怎样的？', answer: 'badhope 的技术栈分为四层：**表现层**（React/Next.js/TS）→ **业务层**（Node.js/Python/FastAPI）→ **数据层**（PostgreSQL/MongoDB/Redis）→ **基础设施**（Docker/Linux/Git）。整体围绕 Web 开发 + AI 应用展开。', category: 'about', priority: 9 },

  // ===== SKILLS / 技能相关 =====
  { id: 'skill-001', keywords: ['技能', '技术', '擅长', '栈', '能力', '编程语言'], question: 'badhope擅长哪些技术？', answer: 'badhope 的核心技术栈：\n\n**前端：** React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js\n**后端：** Node.js, Python, Go, FastAPI, GraphQL\n**数据：** Python, SQL, Pandas, 大数据处理\n**AI/ML：** 机器学习, 深度学习, NLP, OpenAI API, LangChain\n**工具：** Git, Docker, Linux, PostgreSQL, Redis', category: 'skills', priority: 10 },
  { id: 'skill-002', keywords: ['前端', '前端开发', 'Vue', 'React', 'UI'], question: 'badhope会前端开发吗？', answer: '精通！badhope 精通前端开发：React, Next.js (App Router), TypeScript (强类型), Tailwind CSS, Framer Motion, Three.js。可以构建现代化的响应式 Web 应用。', category: 'skills', priority: 9 },
  { id: 'skill-003', keywords: ['后端', '服务器', 'Node', 'Python', 'API'], question: 'badhope会后端开发吗？', answer: '是的！badhope 掌握后端开发：**Node.js**（Express/NestJS，构建 RESTful API）、**Python**（FastAPI 高性能异步API、Django）、**Go**（微服务开发）。能够设计数据库架构、构建可扩展的后端服务。', category: 'skills', priority: 9 },
  { id: 'skill-004', keywords: ['AI', '人工智能', '机器学习', '深度学习', 'NLP'], question: 'badhope对AI有了解吗？', answer: '是的！badhope 是 AI 时代的积极探索者：**机器学习**（Scikit-learn, TensorFlow, PyTorch）、**深度学习**（CNN, RNN, Transformer）、**NLP**（分词、情感分析、RAG）、**LLM应用**（OpenAI API, LangChain, RAG系统）、**AI辅助开发**（用 Copilot 等工具提升10倍效率）', category: 'skills', priority: 9 },
  { id: 'skill-005', keywords: ['TypeScript', 'typescript', 'ts', '类型'], question: 'badhope的TypeScript水平如何？', answer: 'badhope 的 TypeScript 水平非常扎实，网站源码全部用 TypeScript 编写，包括：完整的类型定义（interfaces, types）、泛型编程、联合类型/交叉类型、工具类型（Partial, Required, Pick）、严格模式下的类型安全。', category: 'skills', priority: 9 },
  { id: 'skill-006', keywords: ['React', 'react', '组件', 'hooks'], question: 'badhope的React水平如何？', answer: 'badhope 对 React 的掌握程度：Hooks（useState, useEffect, useCallback, useMemo, useRef）、性能优化（React.memo, useMemo）、状态管理（Context, useReducer）、Server Components（Next.js App Router）、动画集成（Framer Motion）。是主力前端框架。', category: 'skills', priority: 9 },
  { id: 'skill-007', keywords: ['Next.js', 'nextjs', 'SSR', 'SSG', 'app router'], question: 'badhope的Next.js水平如何？', answer: 'badhope 的 Next.js 能力非常成熟：**App Router**（最新架构）、**Server Components**（服务端渲染优化）、**Static Generation**（SSG + ISR）、**API Routes**（全栈一体化开发）、**SEO优化**（Metadata API）、**部署**（GitHub Pages / Vercel）', category: 'skills', priority: 9 },
  { id: 'skill-008', keywords: ['Python', 'python', '爬虫', '后端', '数据'], question: 'badhope的Python水平如何？', answer: 'badhope 的 Python 能力：数据处理（Pandas, NumPy, Matplotlib）、爬虫开发（requests, BeautifulSoup, Scrapy, Selenium）、后端开发（FastAPI, Django）、AI/ML（PyTorch, TensorFlow, LangChain）、自动化（脚本编写, CI/CD）。是数据科学和后端的主力语言。', category: 'skills', priority: 9 },
  { id: 'skill-009', keywords: ['数据库', 'database', 'SQL', 'MongoDB', 'PostgreSQL'], question: 'badhope会数据库吗？', answer: 'badhope 掌握多种数据库技术：**关系型**（PostgreSQL, MySQL：ER建模、索引优化、事务）、**NoSQL**（MongoDB：文档数据库）、**缓存**（Redis：高性能缓存、消息队列）。能够根据业务场景选择最优数据库方案。', category: 'skills', priority: 8 },
  { id: 'skill-010', keywords: ['Docker', 'docker', '容器', 'container', '部署'], question: 'badhope会Docker吗？', answer: '是的！badhope 熟练使用 Docker：**镜像管理**（Dockerfile 编写，镜像优化）、**容器编排**（Docker Compose 多容器管理）、**CI/CD**（GitHub Actions + Docker）、**生产部署**（容器化应用运维）。写过 Docker 相关文章在掘金平台。', category: 'skills', priority: 8 },
  { id: 'skill-011', keywords: ['Git', 'git', '版本控制', 'github', '版本管理'], question: 'badhope的Git水平如何？', answer: 'badhope 精通 Git 版本控制：分支管理（feature分支、git flow）、合并与冲突处理、Rebase 和 Cherry-pick、GitHub Pull Request 工作流。版本控制是日常开发的基础工具。', category: 'skills', priority: 8 },
  { id: 'skill-012', keywords: ['Linux', 'linux', '命令行', 'shell', 'bash'], question: 'badhope会Linux吗？', answer: '是的！作为独立开发者，badhope 在 Linux 环境下工作：Shell 脚本编写（Bash）、服务器部署与运维、Vim / Nano 编辑器、网络配置与诊断、系统监控与性能优化。可以独立完成从开发到部署的全流程。', category: 'skills', priority: 8 },
  { id: 'skill-013', keywords: ['性能优化', 'performance', '优化', '速度'], question: 'badhope会性能优化吗？', answer: 'badhope 关注性能优化：前端（代码分割Code Splitting、Tree Shaking、懒加载、Core Web Vitals）、后端（数据库索引、缓存策略、异步处理）、网络（CDN、Gzip压缩、HTTP/2）、监控（Lighthouse、PageSpeed Insights）。网站的 Core Web Vitals 指标都经过优化。', category: 'skills', priority: 8 },
  { id: 'skill-014', keywords: ['Tailwind', 'tailwindcss', 'css', '样式'], question: 'badhope用Tailwind CSS吗？', answer: '是的！badhope 使用 Tailwind CSS 作为主要样式方案：原子化 CSS 快速构建 UI、自定义主题配置、深色模式适配、与 CSS Modules 混用、Responsive Design（移动端适配）。这是现代前端开发的效率利器。', category: 'skills', priority: 8 },
  { id: 'skill-015', keywords: ['数据结构', '算法', 'algorithm', '刷题'], question: 'badhope的算法能力如何？', answer: '作为数据科学背景的开发者，badhope 有良好的数据结构和算法基础：常用数据结构（数组、链表、树、图、哈希表）、基础算法（排序、搜索、递归、动态规划）、时间/空间复杂度分析。数据科学专业课程中系统学习过算法。', category: 'skills', priority: 7 },
  { id: 'skill-016', keywords: ['Three.js', 'threejs', '3D', 'WebGL', '3d'], question: 'badhope会Three.js吗？', answer: '是的！badhope 的网站就用到了 Three.js：React Three Fiber（Three.js 的 React 封装）、3D 场景构建、材质与光照、粒子系统、性能优化（InstancedMesh）。个人网站的 3D 效果就是 badhope 自己实现的！', category: 'skills', priority: 8 },
  { id: 'skill-017', keywords: ['爬虫', '数据采集', '抓取', 'crawler', 'scrapy'], question: 'badhope的爬虫技术如何？', answer: 'badhope 的爬虫能力很强：基础（requests + BeautifulSoup）、进阶（Scrapy 分布式爬虫框架）、进阶（Selenium / Playwright 动态渲染页面）、数据清洗（正则表达式、数据格式化）、存储（MongoDB / MySQL）。写过阅读量25k+的爬虫实战文章！', category: 'skills', priority: 9 },
  { id: 'skill-018', keywords: ['大模型', 'LLM', 'GPT', 'ChatGPT', 'Claude', '大语言模型'], question: 'badhope怎么看待大语言模型(LLM)？', answer: 'badhope 非常关注 LLM 技术：在个人网站中集成了 AI 助手功能、使用 OpenAI API / Claude API 构建应用、关注 RAG（检索增强生成）技术、用 LLM 辅助代码开发和文档撰写、关注开源模型（Llama, Qwen, DeepSeek）发展。', category: 'skills', priority: 9 },
  { id: 'skill-019', keywords: ['LangChain', 'langchain', 'RAG', '向量数据库'], question: 'badhope会LangChain吗？', answer: 'badhope 了解并实践过 LangChain 和 RAG 技术栈：LangChain 的 Chains、Agents、Memory、向量数据库（Chroma, Pinecone）、Embedding 技术（文本向量化）、知识库问答系统构建、Prompt Engineering。个人网站 AI 助手就是 RAG 应用案例！', category: 'skills', priority: 8 },
  { id: 'skill-020', keywords: ['CI/CD', 'cicd', '自动化部署', 'github actions'], question: 'badhope会CI/CD吗？', answer: '是的！badhope 使用 GitHub Actions 构建 CI/CD 流水线：代码检查（ESLint、TypeScript）、自动构建和测试、自动部署到 GitHub Pages、环境变量管理、工作流优化（缓存依赖）。个人网站就是全自动 CI/CD 的案例！', category: 'skills', priority: 8 },

  // ===== PROJECTS / 项目相关 =====
  { id: 'proj-001', keywords: ['项目', '作品', '开源', 'github', '做过的项目'], question: 'badhope有哪些开源项目？', answer: 'badhope 在 GitHub 上有 **33+ 个公开仓库**，涵盖：Web 应用（Next.js、React）、AI 应用（聊天机器人、RAG 系统）、数据工具（爬虫、可视化）、开发工具（脚本、模板）。可以在 https://github.com/badhope 查看所有项目！', category: 'projects', priority: 10 },
  { id: 'proj-002', keywords: ['项目展示', '作品集', 'portfolio', '案例'], question: '在哪里可以看到badhope的项目？', answer: '在网站的 **/projects** 页面可以查看 badhope 的精选项目展示，包括项目描述、技术栈、GitHub 链接和在线演示地址。', category: 'projects', priority: 9 },
  { id: 'proj-003', keywords: ['电商', '商城', 'e-commerce', '购物'], question: 'badhope做过电商项目吗？', answer: '是的！badhope 开发过 **AI 驱动的电商平台**：AI 智能推荐系统、关键词搜索和语义搜索、个性化商品推荐、完整的购物流程、现代简洁的 UI 设计。', category: 'projects', priority: 8 },
  { id: 'proj-004', keywords: ['数据可视化', '图表', 'dashboard', '可视化'], question: 'badhope做过数据可视化项目吗？', answer: '有的！badhope 开发过**企业级数据分析仪表盘**：实时数据更新、多维度图表（折线图、饼图、热力图）、交互式筛选、响应式布局、主题切换（深色/浅色）。', category: 'projects', priority: 8 },
  { id: 'proj-005', keywords: ['社交', '社交应用', 'social', '社区'], question: 'badhope做过社交应用吗？', answer: '是的！badhope 开发过**跨平台社交应用**：基于兴趣图谱的社交网络、实时聊天功能、内容分享和评论、用户关系系统、移动端适配。', category: 'projects', priority: 8 },
  { id: 'proj-006', keywords: ['爬虫项目', '爬虫系统', '分布式爬虫'], question: 'badhope的爬虫系统是什么样的？', answer: 'badhope 的**分布式爬虫系统**特点：Scrapy + Redis 分布式架构、支持大规模数据采集、自动数据清洗和格式化、代理池管理、增量爬取和断点续传、反爬策略应对。', category: 'projects', priority: 9 },
  { id: 'proj-007', keywords: ['个人网站', 'starbase', 'portfolio网站'], question: 'badhope的个人网站是怎么做的？', answer: 'badhope 的个人网站（Starbase）技术亮点：**Next.js 15** App Router 架构、**TypeScript** 全类型安全、**Three.js** 3D 粒子效果、**Framer Motion** 流畅动画、**Canvas API** 贪吃蛇游戏、**GitHub API** 实时数据、**wttr.in** 天气 API。整个网站都是 badhope 独立开发的！', category: 'projects', priority: 10 },
  { id: 'proj-008', keywords: ['AI助手', 'AI chatbot', '聊天机器人', '智能问答'], question: 'badhope做过AI聊天机器人吗？', answer: '是的！badhope 在个人网站中集成了 **AI 助手 "Star"**：基于知识库的智能问答、支持真实 LLM API（OpenAI/Claude）、本地知识库模式（无需 API key）、知识库持续更新、Markdown 格式回复、快捷问题推荐。', category: 'projects', priority: 9 },
  { id: 'proj-009', keywords: ['RAG', '知识库', '知识库问答', 'rag系统'], question: 'badhope做过RAG系统吗？', answer: 'badhope 了解并实践过 RAG（检索增强生成）：文档切分和向量化、向量数据库（Chroma）、Embedding 模型选择、Context 拼接策略、结合 LLM 实现知识库问答。个人网站 AI 助手就是 RAG 应用案例！', category: 'projects', priority: 8 },
  { id: 'proj-010', keywords: ['模板', 'template', 'boilerplate', '脚手架'], question: 'badhope有没有开源模板或脚手架？', answer: '有的！badhope 在 GitHub 上有多个实用的**项目模板**：Next.js + TypeScript 模板、React + Tailwind CSS 模板、Python 爬虫脚手架、FastAPI 项目模板。可以省去重复搭建基础架构的时间。', category: 'projects', priority: 8 },
  { id: 'proj-011', keywords: ['游戏', 'game', '贪吃蛇', 'snake', 'canvas'], question: 'badhope做过游戏项目吗？', answer: '有的！badhope 在个人网站中用 **Canvas API** 实现了**贪吃蛇游戏**：键盘和触摸双控制、宇宙星空主题、粒子特效、分数和历史最高分、暂停/继续功能、移动端适配。可以在网站的 Fun Zone 体验！', category: 'projects', priority: 9 },
  { id: 'proj-012', keywords: ['移动端', '手机', 'mobile', 'responsive', '响应式'], question: 'badhope做移动端开发吗？', answer: '是的！badhope 的个人网站就是**响应式设计**的：Mobile First 设计理念、Tailwind CSS 的响应式断点、触摸友好的交互、移动端性能优化。可以用手机访问 https://badhope.github.io 体验！', category: 'projects', priority: 8 },
  { id: 'proj-013', keywords: ['GitHub page', '静态网站', '部署', 'hosting'], question: 'badhope的网站是怎么部署的？', answer: 'badhope 的个人网站部署在 **GitHub Pages**！每次 push 自动触发 GitHub Actions、自动构建（Next.js build）、自动部署到 gh-pages 分支、全程无需手动操作、免费且稳定。', category: 'projects', priority: 8 },
  { id: 'proj-014', keywords: ['SEO', '搜索引擎', '排名', '优化'], question: 'badhope关注SEO吗？', answer: '是的！badhope 的个人网站做了 SEO 优化：Next.js Metadata API（标题、描述、关键词）、Open Graph（社交分享卡片）、Twitter Card、robots.txt 和 sitemap、语义化 HTML、Core Web Vitals 优化。', category: 'projects', priority: 8 },

  // ===== WEBSITE / 网站相关 =====
  { id: 'web-001', keywords: ['这个网站', '个人网站', 'starbase'], question: '这个网站是用什么技术做的？', answer: '这个网站（Starbase）使用以下技术构建：**Next.js 15**（App Router, SSG）、**TypeScript**（全类型安全）、**Tailwind CSS**（原子化样式）、**Framer Motion**（流畅动画）、**Three.js + React Three Fiber**（3D效果）、**Canvas API**（贪吃蛇游戏）。部署在 **GitHub Pages**，通过 CI/CD 全自动部署。', category: 'website', priority: 10 },
  { id: 'web-002', keywords: ['网站功能', '有哪些功能', '板块', '页面'], question: '网站有哪些板块？', answer: 'Starbase 网站包含：🏠 首页（Hero动画、GitHub统计、贪吃蛇游戏）、💼 作品集（自动同步GitHub仓库）、🛠️ 工具箱（100+开发工具）、📰 资讯中心（AI排行、技术新闻、GitHub Trending）、🤖 AI助手 Star（知识库问答）、📄 简历、📧 联系页面、🎮 趣味互动区（贪吃蛇）', category: 'website' },
  { id: 'web-003', keywords: ['网站慢', '加载慢', '性能'], question: '网站性能怎么样？', answer: '网站做了充分的性能优化：SSG 静态生成（首屏秒开）、懒加载（Intersection Observer）、Canvas 组件动态导入、代码分割（Next.js automatic）、字体优化（Google Fonts preconnect）、图片优化（Next.js Image）。', category: 'website' },
  { id: 'web-004', keywords: ['暗色模式', '深色', 'dark mode', '亮色模式'], question: '网站支持深色模式吗？', answer: '网站目前是**深色主题**设计！采用深蓝/金色配色方案，护眼且有科技感。主题颜色基于 CSS 变量，易于扩展为多主题。', category: 'website' },
  { id: 'web-005', keywords: ['移动端适配', '手机浏览', '响应式'], question: '网站支持手机访问吗？', answer: '是的！网站采用 **响应式设计**：Tailwind CSS 断点适配、移动端导航菜单、触摸友好的按钮、Canvas 触摸事件支持。可以在手机上访问体验！', category: 'website' },
  { id: 'web-006', keywords: ['浏览器', '兼容性', 'chrome', 'safari', 'firefox'], question: '网站支持哪些浏览器？', answer: '网站支持所有现代浏览器：Chrome 90+、Firefox 88+、Safari 14+、Edge 90+、iOS Safari 14+、Android Chrome 90+。', category: 'website' },
  { id: 'web-007', keywords: ['开源代码', '源码', 'source code', 'github源码'], question: '网站源码开源吗？', answer: '是的！Starbase 网站的源码完全开源：https://github.com/badhope/badhope.github.io 可以自由查看、克隆和改进！欢迎 star ⭐', category: 'website' },
  { id: 'web-008', keywords: ['为什么做网站', '做网站的目的', '初衷'], question: 'badhope为什么要做这个网站？', answer: 'badhope 做这个网站的目的是：① 展示个人品牌和作品集 ② 练习全栈开发技术栈 ③ 分享技术文章和经验 ④ 构建自己的 AI 知识库 ⑤ 创造一个有趣、互动的个人主页。技术和创意结合的实验田 🚀', category: 'website' },

  // ===== TECH / 技术选型 =====
  { id: 'tech-001', keywords: ['React vs Vue', 'vue还是react', '框架选择'], question: 'React和Vue应该学哪个？', answer: '两者都是优秀框架：**React**：灵活、生态大、岗位多；**Vue**：上手简单、中文文档好。badhope 就是主力 React/Next.js。建议先学一个，再学另一个就很快。市场：React岗位更多，大厂首选。', category: 'tech' },
  { id: 'tech-002', keywords: ['为什么用Next.js', 'nextjs优势'], question: '为什么选择Next.js而不是纯React？', answer: 'Next.js 的优势：**SSR/SSG**（SEO友好、首屏快）、**App Router**（现代架构）、**API Routes**（前后端一体化）、**自动优化**（图片、字体、代码分割）、**部署简单**（Vercel/GitHub Pages）。badhope 的网站就是 Next.js 案例！', category: 'tech' },
  { id: 'tech-003', keywords: ['TypeScript值不值得学', 'ts vs js'], question: 'TypeScript值得学吗？', answer: '**非常值得！** badhope 的强烈建议：大型项目必备（类型安全）、VS Code 智能提示效率翻倍、重构时减少bug、招聘加分项、Next.js 默认支持TS。JS → TS 只需几天，上手很快！', category: 'tech' },
  { id: 'tech-004', keywords: ['Python vs JavaScript', 'python还是js', '后端选型'], question: '后端选Python还是Node.js？', answer: '两种选择对比：**Python**：AI/数据方向，语法简洁，FastAPI高性能；**Node.js**：前端团队首选，全栈语言统一，性能好。**badhope选择**：两者都用！Python用于爬虫、数据处理、AI，Node.js用于Web API、Next.js全栈。', category: 'tech' },
  { id: 'tech-005', keywords: ['数据库选择', 'sql还是mongodb', 'postgres'], question: '应该用PostgreSQL还是MongoDB？', answer: '选择建议：**PostgreSQL**：结构化数据、复杂查询、事务需求；**MongoDB**：灵活schema、快速迭代、JSON文档。**badhope**：两者都用！PG用于用户数据、订单等核心业务，MongoDB用于日志、爬虫数据等灵活数据。', category: 'tech' },
  { id: 'tech-006', keywords: ['Docker有用吗', 'docker用途'], question: 'Docker在开发中有什么用？', answer: 'Docker 超级有用：**环境一致**（团队开发环境统一）、**快速部署**（一行命令启动服务）、**微服务**（Docker Compose 管理多容器）、**CI/CD**（构建镜像，任意环境运行）。badhope 用 Docker 部署个人服务器应用 🚀', category: 'tech' },
  { id: 'tech-007', keywords: ['云服务器', 'VPS', '云服务', '阿里云', '腾讯云'], question: '个人开发者用什么云服务？', answer: '个人开发者推荐：**免费/低价**：GitHub Pages（静态）、Vercel（Next.js）；**性价比**：阿里云ECS、腾讯云轻量；**国际**：AWS EC2、Google Cloud。**badhope**：GitHub Pages部署博客，GitHub Actions自动构建。', category: 'tech' },
  { id: 'tech-008', keywords: ['Tailwind CSS', 'tailwind', 'css框架'], question: 'Tailwind CSS为什么火？', answer: 'Tailwind CSS 爆火原因：**快速开发**（不用写CSS文件）、**一致性**（设计系统内置）、**响应式**（天然支持断点）、**Tree Shaking**（不用就删除）、**低学习成本**（类名即样式）。badhope 个人网站就在用！', category: 'tech' },

  // ===== AI =====
  { id: 'ai-001', keywords: ['ChatGPT', 'GPT', 'AI写代码', 'codegpt', 'copilot'], question: 'badhope怎么用AI辅助编程？', answer: 'badhope 的 AI 编程工作流：**Copilot**（实时代码补全）、**Claude**（代码审查和优化建议）、**ChatGPT**（技术调研、方案设计）、**本地LLM**（处理敏感数据）。效率提升估计10倍以上 ⚡。写过博客分享 AI 辅助开发经验，阅读量34k+！', category: 'ai' },
  { id: 'ai-002', keywords: ['怎么学AI', 'AI入门', '机器学习入门'], question: 'AI/ML应该怎么入门？', answer: 'badhope 的 AI 学习路径：① **Python 基础**（必须）② **NumPy + Pandas**（数据处理）③ **Scikit-learn**（传统ML）④ **PyTorch**（深度学习）⑤ **LLM应用**（OpenAI API、LangChain）。每个阶段都做一个小项目！', category: 'ai' },
  { id: 'ai-003', keywords: ['prompt engineering', '提示词工程', '写好提示词'], question: '怎么写出好的AI提示词？', answer: '好的提示词公式：① **角色**：你是XX专家 ② **任务**：帮我做XX ③ **要求**：满足XX条件 ④ **格式**：用XX格式输出 ⑤ **示例**：参考这个例子。多迭代！Bad prompt → Good prompt → Great prompt', category: 'ai' },
  { id: 'ai-004', keywords: ['开源模型', 'llama', 'qwen', 'deepseek', '免费LLM'], question: '有哪些好用的开源LLM？', answer: '2024-2025年热门开源LLM：**Llama 3.1 405B**（Meta，最强开源）、**Qwen 2.5 72B**（阿里，中文强）、**DeepSeek V2.5**（幻方，性价比）、**Mistral**（欧洲力量）、**GLM-4**（智谱）。badhope 关注国产模型发展！', category: 'ai' },
  { id: 'ai-005', keywords: ['AI应用', 'AI能做什么', 'AI产品'], question: '个人开发者可以用AI做什么产品？', answer: 'AI赋能的创业方向：**AI + 内容**（自动写作、摘要、翻译）、**AI + 教育**（题库、答疑机器人）、**AI + 客服**（智能客服系统）、**AI + 数据**（数据分析助手）、**AI + 代码**（代码审查、文档生成）。**badhope**：已在网站集成AI助手。', category: 'ai' },

  // ===== CAREER =====
  { id: 'career-001', keywords: ['找工作', '求职', '招聘', 'job', 'hire'], question: 'badhope在找工作吗？', answer: 'badhope 目前作为独立开发者工作。如果您有合适的项目合作机会，欢迎通过 /contact 页面联系！', category: 'career' },
  { id: 'career-002', keywords: ['合作', '项目合作', '外包', 'freelance'], question: '可以和badhope合作项目吗？', answer: '当然可以！访问 /contact 页面，讨论：技术咨询、项目开发合作、AI应用构建、前端/后端开发、开源贡献。', category: 'career' },
  { id: 'career-003', keywords: ['远程', 'remote', 'work from home', '居家办公'], question: 'badhope接受远程工作吗？', answer: '是的！作为独立开发者，主要远程工作。可以配合各种远程协作工具（GitHub、Slack、飞书等）。时区在深圳 GMT+8。', category: 'career' },

  // ===== CONTACT =====
  { id: 'contact-001', keywords: ['联系', '联系方式', '社交', '微信', 'email'], question: '如何联系badhope？', answer: '联系 badhope 的方式：邮箱 x18825407105@outlook.com、GitHub https://github.com/badhope、博客 CSDN/掘金、联系表单 /contact 页面。通过 /contact 页面可以直接发送消息！', category: 'contact', priority: 9 },
  { id: 'contact-002', keywords: ['合作', '项目合作', '外包', 'freelance'], question: '可以和badhope合作项目吗？', answer: '当然可以！访问 /contact 页面，讨论：技术咨询、项目开发合作、AI 应用构建、前后端开发、开源贡献。', category: 'contact' },
  { id: 'contact-003', keywords: ['微信', 'wechat', 'weixin'], question: '可以加badhope的微信吗？', answer: '微信联系方式未公开。建议通过：/contact 页面的表单 或 发送邮件到 x18825407105@outlook.com。', category: 'contact' },

  // ===== GENERAL =====
  { id: 'general-001', keywords: ['你好', 'hi', 'hello', '嗨'], question: '你好', answer: '你好！我是 Star，badhope 的 AI 助手。有什么关于 badhope 或技术的问题想问我吗？试试问：badhope 擅长什么技术？有哪些项目？如何联系？这个网站用什么做的？', category: 'general' },
  { id: 'general-002', keywords: ['帮助', 'help', '你能做什么'], question: '你能做什么？', answer: '我是 Star，badhope 的 AI 助手！我可以回答：badhope 的技能、项目、经历；技术栈推荐和学习建议；网站功能和用法；AI 应用和工具推荐。也可以去 Fun Zone 玩贪吃蛇游戏！', category: 'general' },
  { id: 'general-003', keywords: ['你叫什么', '名字', '你是谁', 'star'], question: '你叫什么名字？', answer: '我叫 Star，是 badhope 的 AI 助手！我存在于网站的 AI 助手页面，可以回答关于 badhope 的各种问题。有什么我可以帮你的吗？', category: 'general' },
  { id: 'general-004', keywords: ['你是AI吗', '机器人', '几岁'], question: '你是AI吗？', answer: '是的！我是 Star，基于 badhope 网站知识库的 AI 助手。虽然不是真正的 GPT-4，但我对 badhope 的了解很全面！', category: 'general' },
  { id: 'general-005', keywords: ['无聊', '游戏', '好玩的'], question: '好无聊，有什么好玩的？', answer: '来玩 badhope 网站的贪吃蛇游戏！在首页滚动到 Fun Zone，点击贪吃蛇卡片开始！用方向键或 WASD 控制，吃星星得分，看看你能拿多少分！', category: 'general' },
  { id: 'general-006', keywords: ['网站崩了', 'bug', '错误', '打不开'], question: '网站出bug了怎么办？', answer: '试试：① 强制刷新 Ctrl+Shift+R ② 清除浏览器缓存 ③ 换个浏览器。如果还是有问题可以去 GitHub 提 issue：https://github.com/badhope/badhope.github.io/issues', category: 'general' },
];


// Search function (for AIChat component)
export function searchKnowledgeBase(query: string): FAQItem | null {
  const normalizedQuery = query.toLowerCase().trim();
  const words = normalizedQuery.split(/\s+/);

  let bestMatch: FAQItem | null = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    let score = 0;

    for (const keyword of item.keywords) {
      const keywordLower = keyword.toLowerCase();
      if (normalizedQuery.includes(keywordLower)) score += 10;
      for (const word of words) {
        if (keywordLower.includes(word) || word.includes(keywordLower)) score += 5;
      }
    }

    if (item.question.toLowerCase().includes(normalizedQuery)) score += 20;
    if (score > highestScore) { highestScore = score; bestMatch = item; }
  }

  return highestScore > 0 ? bestMatch : null;
}

export function getRandomGreeting(): string {
  const greetings = [
    '你好！有什么关于 badhope 的问题想问我吗？',
    '嗨！我是 badhope 的 AI 助手，可以回答各种问题～',
    '欢迎！你可以问我关于技能、项目或联系方式的问题。',
    '你好！想了解 badhope 的哪方面呢？',
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

export const skillCategories = {
  frontend: { name: '前端开发', icon: '🎨', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'] },
  backend: { name: '后端开发', icon: '⚙️', skills: ['Node.js', 'Python', 'Go', 'RESTful API', 'GraphQL', 'Docker'] },
  database: { name: '数据库', icon: '🗄️', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL', 'Database Design'] },
  ai: { name: 'AI/机器学习', icon: '🤖', skills: ['Machine Learning', 'Deep Learning', 'NLP', 'PyTorch', 'TensorFlow', 'OpenAI API'] },
  tools: { name: '开发工具', icon: '🔧', skills: ['Git', 'GitHub', 'VS Code', 'Docker', 'Linux', 'CI/CD'] },
  other: { name: '其他技能', icon: '📦', skills: ['Agile/Scrum', 'Technical Writing', 'System Design', 'Cloud Services'] },
};
