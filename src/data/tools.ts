/**
 * ============================================================
 * 🛠️ TOOLS DATABASE
 * ============================================================
 * AI READ THIS: This file contains all tool entries for the Tools page.
 * 
 * HOW TO ADD A NEW TOOL:
 * 1. Find the appropriate category array
 * 2. Add a new object: { name, url, description, descriptionZh, icon, tags }
 * 3. Rebuild and deploy
 * 
 * HOW TO ADD A NEW CATEGORY:
 * 1. Add a new entry to the 'categories' array
 * 2. Add a new array of tools with matching categoryId
 * 3. Rebuild and deploy
 * 
 * STRUCTURE:
 * - categories: Array of category definitions
 * - tools: Flat array of all tools, each with a categoryId
 * ============================================================
 */

export interface ToolCategory {
  id: string;
  name: string;
  nameZh: string;
  icon: string;
  description: string;
  descriptionZh: string;
}

export interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  descriptionZh: string;
  icon: string;
  tags: string[];
  categoryId: string;
}

export const categories: ToolCategory[] = [
  { id: 'editor', name: 'Editors & IDEs', nameZh: '编辑器 & IDE', icon: '🖥️', description: 'Code editors and development environments', descriptionZh: '代码编辑器和开发环境' },
  { id: 'design', name: 'Design Tools', nameZh: '设计工具', icon: '🎨', description: 'UI/UX design and creative tools', descriptionZh: 'UI/UX设计和创意工具' },
  { id: 'deploy', name: 'Deployment', nameZh: '部署平台', icon: '🚀', description: 'Cloud deployment and hosting platforms', descriptionZh: '云部署和托管平台' },
  { id: 'devops', name: 'DevOps', nameZh: 'DevOps 工具', icon: '🔧', description: 'CI/CD, containers, and infrastructure', descriptionZh: 'CI/CD、容器和基础设施' },
  { id: 'ai', name: 'AI Tools', nameZh: 'AI 工具', icon: '🤖', description: 'AI models, chatbots, and ML tools', descriptionZh: 'AI模型、聊天机器人和ML工具' },
  { id: 'cdn', name: 'Package & CDN', nameZh: '包管理 & CDN', icon: '📦', description: 'Package managers and CDN services', descriptionZh: '包管理器和CDN服务' },
  { id: 'color-font', name: 'Color & Font', nameZh: '颜色 & 字体', icon: '🌈', description: 'Color palettes, fonts, and typography', descriptionZh: '配色方案、字体和排版' },
  { id: 'image', name: 'Image & Icon', nameZh: '图片 & 图标', icon: '📸', description: 'Stock photos, icons, and image tools', descriptionZh: '图库、图标和图片工具' },
  { id: 'format', name: 'Formatters', nameZh: '格式化 & 转换', icon: '🔄', description: 'Code formatters and data converters', descriptionZh: '代码格式化和数据转换' },
  { id: 'dataviz', name: 'Data Viz', nameZh: '数据可视化', icon: '📊', description: 'Charts, graphs, and data visualization', descriptionZh: '图表、图形和数据可视化' },
  { id: 'security', name: 'Security', nameZh: '安全 & 加密', icon: '🔒', description: 'Security tools and encryption', descriptionZh: '安全工具和加密' },
  { id: 'docs', name: 'Docs & Notes', nameZh: '文档 & 笔记', icon: '📝', description: 'Documentation and note-taking tools', descriptionZh: '文档和笔记工具' },
  { id: 'seo', name: 'SEO & Analytics', nameZh: 'SEO & 分析', icon: '🌐', description: 'Search optimization and web analytics', descriptionZh: '搜索优化和网站分析' },
  { id: 'test', name: 'Testing', nameZh: '测试工具', icon: '🧪', description: 'Unit testing, E2E testing, and QA', descriptionZh: '单元测试、E2E测试和QA' },
  { id: 'learn', name: 'Learning', nameZh: '学习资源', icon: '📖', description: 'Tutorials, courses, and coding challenges', descriptionZh: '教程、课程和编程挑战' },
  { id: 'fun', name: 'Dev Fun', nameZh: '开发者娱乐', icon: '🎮', description: 'Fun stuff for developers', descriptionZh: '开发者趣味工具' },
  { id: 'api', name: 'API Tools', nameZh: 'API 工具', icon: '🔌', description: 'API testing, monitoring, and management', descriptionZh: 'API测试、监控和管理' },
  { id: 'database', name: 'Database', nameZh: '数据库工具', icon: '🗄️', description: 'Database management and visualization', descriptionZh: '数据库管理和可视化' },
  { id: 'network', name: 'Network', nameZh: '网络工具', icon: '📡', description: 'Network debugging and monitoring', descriptionZh: '网络调试和监控' },
  { id: 'git', name: 'Git & Version Control', nameZh: 'Git & 版本控制', icon: '🔀', description: 'Git hosting and version control tools', descriptionZh: 'Git托管和版本控制工具' },
];

export const tools: Tool[] = [
  // === Editors & IDEs ===
  { id: 'vscode', name: 'VS Code', url: 'https://code.visualstudio.com/', description: 'Powerful open-source code editor by Microsoft', descriptionZh: '微软出品的强大开源代码编辑器', icon: '💻', tags: ['editor', 'ide', 'microsoft'], categoryId: 'editor' },
  { id: 'webstorm', name: 'WebStorm', url: 'https://www.jetbrains.com/webstorm/', description: 'Intelligent JavaScript IDE by JetBrains', descriptionZh: 'JetBrains出品的智能JavaScript IDE', icon: '🌊', tags: ['ide', 'jetbrains', 'javascript'], categoryId: 'editor' },
  { id: 'vim', name: 'Vim', url: 'https://www.vim.org/', description: 'The ubiquitous text editor', descriptionZh: '无处不在的文本编辑器', icon: '📝', tags: ['editor', 'terminal', 'vim'], categoryId: 'editor' },
  { id: 'sublime', name: 'Sublime Text', url: 'https://www.sublimetext.com/', description: 'A sophisticated text editor for code', descriptionZh: '精致的代码文本编辑器', icon: '🔶', tags: ['editor', 'fast'], categoryId: 'editor' },
  { id: 'cursor', name: 'Cursor', url: 'https://cursor.sh/', description: 'AI-first code editor built for pair programming', descriptionZh: 'AI优先的代码编辑器，专为结对编程设计', icon: '🖱️', tags: ['editor', 'ai', 'ide'], categoryId: 'editor' },
  { id: 'windsurf', name: 'Windsurf', url: 'https://codeium.com/windsurf', description: 'AI-powered IDE with deep code understanding', descriptionZh: 'AI驱动的IDE，深度理解代码', icon: '🏄', tags: ['editor', 'ai', 'ide'], categoryId: 'editor' },
  { id: 'zed', name: 'Zed', url: 'https://zed.dev/', description: 'High-performance, multiplayer code editor', descriptionZh: '高性能多人协作代码编辑器', icon: '⚡', tags: ['editor', 'fast', 'rust'], categoryId: 'editor' },
  { id: 'nova', name: 'Nova', url: 'https://nova.app/', description: 'Beautiful, native code editor for Mac', descriptionZh: 'Mac平台精美的原生代码编辑器', icon: '✨', tags: ['editor', 'mac'], categoryId: 'editor' },

  // === Design Tools ===
  { id: 'figma', name: 'Figma', url: 'https://www.figma.com/', description: 'Collaborative interface design tool', descriptionZh: '协作式界面设计工具', icon: '🎨', tags: ['design', 'ui', 'collaborative'], categoryId: 'design' },
  { id: 'canva', name: 'Canva', url: 'https://www.canva.com/', description: 'Easy-to-use graphic design platform', descriptionZh: '简单易用的图形设计平台', icon: '🖼️', tags: ['design', 'graphic'], categoryId: 'design' },
  { id: 'excalidraw', name: 'Excalidraw', url: 'https://excalidraw.com/', description: 'Virtual whiteboard for sketching hand-drawn diagrams', descriptionZh: '手绘风格虚拟白板', icon: '✏️', tags: ['design', 'whiteboard', 'diagram'], categoryId: 'design' },
  { id: 'spline', name: 'Spline', url: 'https://spline.design/', description: 'Collaborative 3D design tool for the web', descriptionZh: '协作式Web 3D设计工具', icon: '🧊', tags: ['design', '3d', 'web'], categoryId: 'design' },
  { id: 'penpot', name: 'Penpot', url: 'https://penpot.app/', description: 'Open-source design and prototyping platform', descriptionZh: '开源设计和原型平台', icon: '🟣', tags: ['design', 'open-source', 'prototype'], categoryId: 'design' },
  { id: 'coolors', name: 'Coolors', url: 'https://coolors.co/', description: 'Fast color scheme generator', descriptionZh: '快速配色方案生成器', icon: '🎭', tags: ['design', 'color'], categoryId: 'design' },

  // === Deployment ===
  { id: 'vercel', name: 'Vercel', url: 'https://vercel.com/', description: 'Frontend cloud platform by Next.js creators', descriptionZh: 'Next.js创建者的前端云平台', icon: '▲', tags: ['deploy', 'serverless', 'nextjs'], categoryId: 'deploy' },
  { id: 'netlify', name: 'Netlify', url: 'https://www.netlify.com/', description: 'Powerful platform for modern web projects', descriptionZh: '现代Web项目的强大平台', icon: '🌐', tags: ['deploy', 'jamstack', 'static'], categoryId: 'deploy' },
  { id: 'railway', name: 'Railway', url: 'https://railway.app/', description: 'Infrastructure platform for effortless deployment', descriptionZh: '轻松部署的基础设施平台', icon: '🚂', tags: ['deploy', 'infrastructure'], categoryId: 'deploy' },
  { id: 'flyio', name: 'Fly.io', url: 'https://fly.io/', description: 'Run apps close to users with global edge network', descriptionZh: '全球边缘网络运行应用', icon: '✈️', tags: ['deploy', 'edge', 'containers'], categoryId: 'deploy' },
  { id: 'render', name: 'Render', url: 'https://render.com/', description: 'Modern cloud platform for static sites and apps', descriptionZh: '现代云平台，支持静态站点和应用', icon: '☁️', tags: ['deploy', 'cloud'], categoryId: 'deploy' },
  { id: 'cloudflare', name: 'Cloudflare Pages', url: 'https://pages.cloudflare.com/', description: 'Global CDN-powered JAMstack platform', descriptionZh: '全球CDN驱动的JAMstack平台', icon: '🔶', tags: ['deploy', 'cdn', 'edge'], categoryId: 'deploy' },
  { id: 'surge', name: 'Surge.sh', url: 'https://surge.sh/', description: 'Publish to the web in seconds', descriptionZh: '秒级发布到Web', icon: '⚡', tags: ['deploy', 'static', 'simple'], categoryId: 'deploy' },
  { id: 'github-pages', name: 'GitHub Pages', url: 'https://pages.github.com/', description: 'Free static site hosting from GitHub', descriptionZh: 'GitHub免费静态站点托管', icon: '📄', tags: ['deploy', 'github', 'free'], categoryId: 'deploy' },

  // === DevOps ===
  { id: 'docker', name: 'Docker', url: 'https://www.docker.com/', description: 'Container platform for building and shipping apps', descriptionZh: '构建和发布应用的容器平台', icon: '🐳', tags: ['devops', 'containers'], categoryId: 'devops' },
  { id: 'kubernetes', name: 'Kubernetes', url: 'https://kubernetes.io/', description: 'Container orchestration platform', descriptionZh: '容器编排平台', icon: '☸️', tags: ['devops', 'containers', 'orchestration'], categoryId: 'devops' },
  { id: 'github-actions', name: 'GitHub Actions', url: 'https://github.com/features/actions', description: 'Automate workflows directly from GitHub', descriptionZh: '直接从GitHub自动化工作流', icon: '⚙️', tags: ['devops', 'ci-cd', 'github'], categoryId: 'devops' },
  { id: 'jenkins', name: 'Jenkins', url: 'https://www.jenkins.io/', description: 'Leading open-source automation server', descriptionZh: '领先的开源自动化服务器', icon: '🔧', tags: ['devops', 'ci-cd', 'open-source'], categoryId: 'devops' },
  { id: 'terraform', name: 'Terraform', url: 'https://www.terraform.io/', description: 'Infrastructure as Code tool', descriptionZh: '基础设施即代码工具', icon: '🏗️', tags: ['devops', 'iac', 'hashicorp'], categoryId: 'devops' },

  // === AI Tools ===
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com/', description: 'OpenAI\'s conversational AI assistant', descriptionZh: 'OpenAI的对话AI助手', icon: '🤖', tags: ['ai', 'chatbot', 'openai'], categoryId: 'ai' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/', description: 'Anthropic\'s helpful, harmless, and honest AI', descriptionZh: 'Anthropic的有用、无害、诚实的AI', icon: '🧠', tags: ['ai', 'chatbot', 'anthropic'], categoryId: 'ai' },
  { id: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com/', description: 'Powerful Chinese AI model', descriptionZh: '强大的中国AI模型', icon: '🔍', tags: ['ai', 'chinese', 'chatbot'], categoryId: 'ai' },
  { id: 'kimi', name: 'Kimi (Moonshot)', url: 'https://kimi.moonshot.cn/', description: 'Long-context AI assistant by Moonshot', descriptionZh: '月之暗面长上下文AI助手', icon: '🌙', tags: ['ai', 'chinese', 'long-context'], categoryId: 'ai' },
  { id: 'qwen', name: '通义千问', url: 'https://tongyi.aliyun.com/', description: 'Alibaba Cloud\'s large language model', descriptionZh: '阿里云大语言模型', icon: '💬', tags: ['ai', 'chinese', 'alibaba'], categoryId: 'ai' },
  { id: 'zhipu', name: '智谱清言', url: 'https://chatglm.cn/', description: 'Zhipu AI\'s conversational assistant', descriptionZh: '智谱AI对话助手', icon: '💎', tags: ['ai', 'chinese', 'glm'], categoryId: 'ai' },
  { id: 'ernie', name: '文心一言', url: 'https://yiyan.baidu.com/', description: 'Baidu\'s ERNIE Bot AI assistant', descriptionZh: '百度文心一言AI助手', icon: '📘', tags: ['ai', 'chinese', 'baidu'], categoryId: 'ai' },
  { id: 'spark', name: '讯飞星火', url: 'https://xinghuo.xfyun.cn/', description: 'iFlytek\'s Spark AI assistant', descriptionZh: '科大讯飞星火AI助手', icon: '🔥', tags: ['ai', 'chinese', 'iflytek'], categoryId: 'ai' },
  { id: 'doubao', name: '豆包', url: 'https://www.doubao.com/', description: 'ByteDance\'s AI assistant', descriptionZh: '字节跳动AI助手', icon: '🫘', tags: ['ai', 'chinese', 'bytedance'], categoryId: 'ai' },
  { id: 'tongyi', name: '通义万相', url: 'https://tongyi.aliyun.com/wanxiang/', description: 'Alibaba\'s AI image generation', descriptionZh: '阿里AI图像生成', icon: '🖼️', tags: ['ai', 'image', 'alibaba'], categoryId: 'ai' },
  { id: 'midjourney', name: 'Midjourney', url: 'https://www.midjourney.com/', description: 'AI art generation tool', descriptionZh: 'AI艺术生成工具', icon: '🎨', tags: ['ai', 'image', 'art'], categoryId: 'ai' },
  { id: 'github-copilot', name: 'GitHub Copilot', url: 'https://github.com/features/copilot', description: 'AI pair programmer that suggests code', descriptionZh: 'AI结对编程助手，智能代码建议', icon: '👨‍💻', tags: ['ai', 'coding', 'github'], categoryId: 'ai' },
  { id: 'cursor-ai', name: 'Cursor AI', url: 'https://cursor.sh/', description: 'AI-first code editor with intelligent completions', descriptionZh: 'AI优先的代码编辑器，智能补全', icon: '🖱️', tags: ['ai', 'coding', 'editor'], categoryId: 'ai' },
  { id: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai/', description: 'AI-powered search engine', descriptionZh: 'AI驱动的搜索引擎', icon: '🔮', tags: ['ai', 'search'], categoryId: 'ai' },
  { id: 'huggingface', name: 'Hugging Face', url: 'https://huggingface.co/', description: 'The AI community platform with models and datasets', descriptionZh: 'AI社区平台，模型和数据集', icon: '🤗', tags: ['ai', 'models', 'datasets'], categoryId: 'ai' },
  { id: 'runway', name: 'Runway', url: 'https://runwayml.com/', description: 'AI-powered creative video tools', descriptionZh: 'AI驱动的创意视频工具', icon: '🎬', tags: ['ai', 'video', 'creative'], categoryId: 'ai' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', url: 'https://stability.ai/', description: 'Open-source AI image generation', descriptionZh: '开源AI图像生成', icon: '🌀', tags: ['ai', 'image', 'open-source'], categoryId: 'ai' },
  { id: 'suno', name: 'Suno', url: 'https://suno.com/', description: 'AI music generation platform', descriptionZh: 'AI音乐生成平台', icon: '🎵', tags: ['ai', 'music'], categoryId: 'ai' },

  // === Package & CDN ===
  { id: 'npm', name: 'npm', url: 'https://www.npmjs.com/', description: 'The world\'s largest software registry', descriptionZh: '全球最大的软件注册表', icon: '📦', tags: ['package', 'nodejs'], categoryId: 'cdn' },
  { id: 'unpkg', name: 'unpkg', url: 'https://unpkg.com/', description: 'Fast CDN for npm packages', descriptionZh: 'npm包快速CDN', icon: '⚡', tags: ['cdn', 'npm'], categoryId: 'cdn' },
  { id: 'jsdelivr', name: 'jsDelivr', url: 'https://www.jsdelivr.com/', description: 'Free CDN for open-source projects', descriptionZh: '开源项目免费CDN', icon: '🚀', tags: ['cdn', 'open-source'], categoryId: 'cdn' },
  { id: 'cdnjs', name: 'cdnjs', url: 'https://cdnjs.com/', description: 'Free open-source CDN for web developers', descriptionZh: 'Web开发者免费开源CDN', icon: '🌐', tags: ['cdn', 'libraries'], categoryId: 'cdn' },
  { id: 'pypi', name: 'PyPI', url: 'https://pypi.org/', description: 'Python Package Index', descriptionZh: 'Python包索引', icon: '🐍', tags: ['package', 'python'], categoryId: 'cdn' },
  { id: 'crates', name: 'Crates.io', url: 'https://crates.io/', description: 'Rust package registry', descriptionZh: 'Rust包注册表', icon: '🦀', tags: ['package', 'rust'], categoryId: 'cdn' },

  // === Color & Font ===
  { id: 'google-fonts', name: 'Google Fonts', url: 'https://fonts.google.com/', description: 'Free web fonts library', descriptionZh: '免费Web字体库', icon: '🔤', tags: ['font', 'free', 'google'], categoryId: 'color-font' },
  { id: 'fontpair', name: 'FontPair', url: 'https://fontpair.co/', description: 'Font pairing made simple', descriptionZh: '字体搭配变得简单', icon: '👫', tags: ['font', 'pairing'], categoryId: 'color-font' },
  { id: 'fontshare', name: 'Fontshare', url: 'https://www.fontshare.com/', description: 'Free fonts by Indian Type Foundry', descriptionZh: 'Indian Type Foundry免费字体', icon: '🆓', tags: ['font', 'free'], categoryId: 'color-font' },
  { id: 'colorhunt', name: 'Color Hunt', url: 'https://colorhunt.co/', description: 'Curated color palettes for designers', descriptionZh: '精选设计师配色方案', icon: '🎯', tags: ['color', 'palette'], categoryId: 'color-font' },
  { id: 'adobe-color', name: 'Adobe Color', url: 'https://color.adobe.com/', description: 'Color wheel and palette generator', descriptionZh: '色轮和配色方案生成器', icon: '🌈', tags: ['color', 'adobe'], categoryId: 'color-font' },
  { id: 'realtime-colors', name: 'Realtime Colors', url: 'https://www.realtimecolors.com/', description: 'Test colors in real-time on a real design', descriptionZh: '在真实设计上实时测试颜色', icon: '🎨', tags: ['color', 'preview'], categoryId: 'color-font' },

  // === Image & Icon ===
  { id: 'unsplash', name: 'Unsplash', url: 'https://unsplash.com/', description: 'Free high-resolution photos', descriptionZh: '免费高清图片', icon: '📷', tags: ['image', 'free', 'photos'], categoryId: 'image' },
  { id: 'pexels', name: 'Pexels', url: 'https://www.pexels.com/', description: 'Free stock photos and videos', descriptionZh: '免费图库和视频', icon: '🖼️', tags: ['image', 'free', 'stock'], categoryId: 'image' },
  { id: 'flaticon', name: 'Flaticon', url: 'https://www.flaticon.com/', description: 'Largest database of free icons', descriptionZh: '最大的免费图标数据库', icon: '🎭', tags: ['icon', 'free'], categoryId: 'image' },
  { id: 'heroicons', name: 'Heroicons', url: 'https://heroicons.com/', description: 'Beautiful hand-crafted SVG icons by Tailwind Labs', descriptionZh: 'Tailwind Labs精美手绘SVG图标', icon: '⭐', tags: ['icon', 'svg', 'tailwind'], categoryId: 'image' },
  { id: 'lucide', name: 'Lucide Icons', url: 'https://lucide.dev/', description: 'Beautiful & consistent icon library', descriptionZh: '美观一致的图标库', icon: '✨', tags: ['icon', 'svg', 'open-source'], categoryId: 'image' },
  { id: 'tinypng', name: 'TinyPNG', url: 'https://tinypng.com/', description: 'Smart PNG and JPEG image compression', descriptionZh: '智能PNG和JPEG图片压缩', icon: '🐼', tags: ['image', 'compression'], categoryId: 'image' },
  { id: 'removebg', name: 'Remove.bg', url: 'https://www.remove.bg/', description: 'Remove image backgrounds automatically', descriptionZh: '自动去除图片背景', icon: '✂️', tags: ['image', 'background', 'ai'], categoryId: 'image' },
  { id: 'placeholder', name: 'Placeholder.com', url: 'https://placeholder.com/', description: 'Quick placeholder image generator', descriptionZh: '快速占位图生成器', icon: '🔲', tags: ['image', 'placeholder'], categoryId: 'image' },

  // === Formatters ===
  { id: 'json-formatter', name: 'JSON Formatter', url: 'https://jsonformatter.org/', description: 'Online JSON formatter and validator', descriptionZh: '在线JSON格式化和验证', icon: '📋', tags: ['format', 'json'], categoryId: 'format' },
  { id: 'prettier', name: 'Prettier', url: 'https://prettier.io/', description: 'Opinionated code formatter', descriptionZh: '有主见的代码格式化工具', icon: '💅', tags: ['format', 'code'], categoryId: 'format' },
  { id: 'base64', name: 'Base64 Encode/Decode', url: 'https://www.base64encode.org/', description: 'Online Base64 encoder and decoder', descriptionZh: '在线Base64编码解码', icon: '🔐', tags: ['format', 'encoding'], categoryId: 'format' },
  { id: 'url-encode', name: 'URL Encoder', url: 'https://www.urlencoder.org/', description: 'Online URL encoder and decoder', descriptionZh: '在线URL编码解码', icon: '🔗', tags: ['format', 'encoding', 'url'], categoryId: 'format' },
  { id: 'markdown-editor', name: 'StackEdit', url: 'https://stackedit.io/', description: 'In-browser Markdown editor', descriptionZh: '浏览器内Markdown编辑器', icon: '📝', tags: ['format', 'markdown', 'editor'], categoryId: 'format' },
  { id: 'regex101', name: 'Regex101', url: 'https://regex101.com/', description: 'Build, test, and debug regex', descriptionZh: '构建、测试和调试正则表达式', icon: '🔍', tags: ['format', 'regex'], categoryId: 'format' },
  { id: 'jwt-io', name: 'JWT.io', url: 'https://jwt.io/', description: 'Decode and verify JWT tokens', descriptionZh: '解码和验证JWT令牌', icon: '🎫', tags: ['format', 'jwt', 'auth'], categoryId: 'format' },
  { id: 'devtoys', name: 'DevToys', url: 'https://devtoys.app/', description: 'Swiss Army knife for developers', descriptionZh: '开发者瑞士军刀', icon: '🔧', tags: ['format', 'tools', 'all-in-one'], categoryId: 'format' },

  // === Data Visualization ===
  { id: 'd3', name: 'D3.js', url: 'https://d3js.org/', description: 'Data-Driven Documents for powerful visualizations', descriptionZh: '数据驱动文档，强大的可视化库', icon: '📊', tags: ['dataviz', 'javascript', 'charts'], categoryId: 'dataviz' },
  { id: 'echarts', name: 'ECharts', url: 'https://echarts.apache.org/', description: 'Powerful charting and visualization library', descriptionZh: '强大的图表可视化库', icon: '📈', tags: ['dataviz', 'charts', 'apache'], categoryId: 'dataviz' },
  { id: 'chartjs', name: 'Chart.js', url: 'https://www.chartjs.org/', description: 'Simple yet flexible JavaScript charting', descriptionZh: '简单灵活的JavaScript图表库', icon: '📉', tags: ['dataviz', 'charts', 'simple'], categoryId: 'dataviz' },
  { id: 'observable', name: 'Observable', url: 'https://observablehq.com/', description: 'Interactive data visualization notebooks', descriptionZh: '交互式数据可视化笔记本', icon: '📓', tags: ['dataviz', 'notebook', 'interactive'], categoryId: 'dataviz' },
  { id: 'gradio', name: 'Gradio', url: 'https://gradio.app/', description: 'Build ML demos and web apps quickly', descriptionZh: '快速构建ML演示和Web应用', icon: '🤖', tags: ['dataviz', 'ml', 'demo'], categoryId: 'dataviz' },

  // === Security ===
  { id: 'ssl-checker', name: 'SSL Checker', url: 'https://www.sslshopper.com/ssl-checker.html', description: 'SSL certificate checker', descriptionZh: 'SSL证书检查器', icon: '🔒', tags: ['security', 'ssl'], categoryId: 'security' },
  { id: 'password-gen', name: 'Bitwarden', url: 'https://bitwarden.com/', description: 'Open-source password manager', descriptionZh: '开源密码管理器', icon: '🔑', tags: ['security', 'password', 'open-source'], categoryId: 'security' },
  { id: 'security-headers', name: 'Security Headers', url: 'https://securityheaders.com/', description: 'Analyze HTTP response headers for security', descriptionZh: '分析HTTP响应头安全性', icon: '🛡️', tags: ['security', 'headers'], categoryId: 'security' },
  { id: 'csp-analyzer', name: 'CSP Evaluator', url: 'https://csp-evaluator.withgoogle.com/', description: 'Content Security Policy analyzer', descriptionZh: '内容安全策略分析器', icon: '📋', tags: ['security', 'csp', 'google'], categoryId: 'security' },

  // === Docs & Notes ===
  { id: 'notion', name: 'Notion', url: 'https://www.notion.so/', description: 'All-in-one workspace for notes and docs', descriptionZh: '笔记和文档一体化工作空间', icon: '📓', tags: ['docs', 'notes', 'wiki'], categoryId: 'docs' },
  { id: 'obsidian', name: 'Obsidian', url: 'https://obsidian.md/', description: 'A second brain, for you, forever', descriptionZh: '你的第二大脑', icon: '💜', tags: ['docs', 'notes', 'markdown'], categoryId: 'docs' },
  { id: 'swagger', name: 'Swagger', url: 'https://swagger.io/', description: 'API design and documentation toolkit', descriptionZh: 'API设计和文档工具包', icon: '📖', tags: ['docs', 'api', 'documentation'], categoryId: 'docs' },
  { id: 'docusaurus', name: 'Docusaurus', url: 'https://docusaurus.io/', description: 'Easy to maintain open source documentation', descriptionZh: '易于维护的开源文档网站', icon: '🦖', tags: ['docs', 'static', 'react'], categoryId: 'docs' },
  { id: 'gitbook', name: 'GitBook', url: 'https://www.gitbook.com/', description: 'Modern documentation platform', descriptionZh: '现代文档平台', icon: '📚', tags: ['docs', 'collaborative'], categoryId: 'docs' },

  // === SEO & Analytics ===
  { id: 'google-analytics', name: 'Google Analytics', url: 'https://analytics.google.com/', description: 'Web analytics service by Google', descriptionZh: 'Google网站分析服务', icon: '📊', tags: ['seo', 'analytics', 'google'], categoryId: 'seo' },
  { id: 'lighthouse', name: 'Lighthouse', url: 'https://developers.google.com/web/tools/lighthouse', description: 'Automated tool for improving web quality', descriptionZh: '自动化Web质量改进工具', icon: '🏠', tags: ['seo', 'performance', 'google'], categoryId: 'seo' },
  { id: 'pagespeed', name: 'PageSpeed Insights', url: 'https://pagespeed.web.dev/', description: 'Measure web page performance', descriptionZh: '测量网页性能', icon: '⚡', tags: ['seo', 'performance', 'google'], categoryId: 'seo' },
  { id: 'google-search-console', name: 'Search Console', url: 'https://search.google.com/search-console', description: 'Monitor and maintain your site\'s presence in Google', descriptionZh: '监控网站在Google中的表现', icon: '🔍', tags: ['seo', 'google', 'search'], categoryId: 'seo' },
  { id: 'hotjar', name: 'Hotjar', url: 'https://www.hotjar.com/', description: 'Behavior analytics and user feedback', descriptionZh: '行为分析和用户反馈', icon: '🌡️', tags: ['seo', 'analytics', 'heatmap'], categoryId: 'seo' },

  // === Testing ===
  { id: 'jest', name: 'Jest', url: 'https://jestjs.io/', description: 'Delightful JavaScript testing framework', descriptionZh: '令人愉快的JavaScript测试框架', icon: '🃏', tags: ['test', 'javascript', 'unit'], categoryId: 'test' },
  { id: 'playwright', name: 'Playwright', url: 'https://playwright.dev/', description: 'End-to-end testing for modern web apps', descriptionZh: '现代Web应用端到端测试', icon: '🎭', tags: ['test', 'e2e', 'microsoft'], categoryId: 'test' },
  { id: 'cypress', name: 'Cypress', url: 'https://www.cypress.io/', description: 'Fast, easy, and reliable testing', descriptionZh: '快速、简单、可靠的测试', icon: '🌲', tags: ['test', 'e2e'], categoryId: 'test' },
  { id: 'postman', name: 'Postman', url: 'https://www.postman.com/', description: 'API platform for building and using APIs', descriptionZh: 'API构建和使用平台', icon: '📮', tags: ['test', 'api', 'debugging'], categoryId: 'test' },
  { id: 'storybook', name: 'Storybook', url: 'https://storybook.js.org/', description: 'UI component explorer for frontend developers', descriptionZh: '前端开发者UI组件浏览器', icon: '📖', tags: ['test', 'ui', 'components'], categoryId: 'test' },

  // === Learning ===
  { id: 'mdn', name: 'MDN Web Docs', url: 'https://developer.mozilla.org/', description: 'Resources for developers, by developers', descriptionZh: '开发者资源，来自开发者', icon: '🦊', tags: ['learn', 'reference', 'mozilla'], categoryId: 'learn' },
  { id: 'freecodecamp', name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', description: 'Learn to code for free', descriptionZh: '免费学习编程', icon: '🏕️', tags: ['learn', 'free', 'courses'], categoryId: 'learn' },
  { id: 'leetcode', name: 'LeetCode', url: 'https://leetcode.com/', description: 'Coding interview preparation platform', descriptionZh: '编程面试准备平台', icon: '🧩', tags: ['learn', 'algorithms', 'interview'], categoryId: 'learn' },
  { id: 'coursera', name: 'Coursera', url: 'https://www.coursera.org/', description: 'Online courses from top universities', descriptionZh: '顶尖大学在线课程', icon: '🎓', tags: ['learn', 'courses', 'university'], categoryId: 'learn' },
  { id: 'kaggle', name: 'Kaggle', url: 'https://www.kaggle.com/', description: 'Data science and machine learning community', descriptionZh: '数据科学和机器学习社区', icon: '📊', tags: ['learn', 'data-science', 'ml'], categoryId: 'learn' },
  { id: 'roadmap-sh', name: 'roadmap.sh', url: 'https://roadmap.sh/', description: 'Community-driven roadmaps for developers', descriptionZh: '社区驱动的开发者路线图', icon: '🗺️', tags: ['learn', 'roadmap', 'career'], categoryId: 'learn' },
  { id: 'w3schools', name: 'W3Schools', url: 'https://www.w3schools.com/', description: 'Largest web developer site for tutorials', descriptionZh: '最大的Web开发者教程网站', icon: '📚', tags: ['learn', 'tutorials', 'reference'], categoryId: 'learn' },
  { id: 'typeracer', name: 'TypeRacer', url: 'https://play.typeracer.com/', description: 'Improve your typing speed', descriptionZh: '提高打字速度', icon: '🏎️', tags: ['learn', 'typing', 'fun'], categoryId: 'learn' },

  // === Dev Fun ===
  { id: 'css-battle', name: 'CSS Battle', url: 'https://cssbattle.dev/', description: 'Code CSS to replicate targets', descriptionZh: '用CSS代码复刻目标图形', icon: '⚔️', tags: ['fun', 'css', 'challenge'], categoryId: 'fun' },
  { id: 'codewars', name: 'Codewars', url: 'https://www.codewars.com/', description: 'Achieve code mastery through challenges', descriptionZh: '通过挑战达到代码精通', icon: '⚔️', tags: ['fun', 'algorithms', 'challenge'], categoryId: 'fun' },
  { id: 'adventofcode', name: 'Advent of Code', url: 'https://adventofcode.com/', description: 'Annual coding challenge calendar', descriptionZh: '年度编程挑战日历', icon: '🎄', tags: ['fun', 'challenge', 'annual'], categoryId: 'fun' },
  { id: 'hackerrank', name: 'HackerRank', url: 'https://www.hackerrank.com/', description: 'Coding challenges and competitions', descriptionZh: '编程挑战和竞赛', icon: '🏆', tags: ['fun', 'challenge', 'interview'], categoryId: 'fun' },
  { id: 'internet-map', name: 'Internet Map', url: 'https://internet-map.net/', description: 'Visualize the internet as a galaxy', descriptionZh: '将互联网可视化为星系', icon: '🌐', tags: ['fun', 'visualization'], categoryId: 'fun' },

  // === API Tools ===
  { id: 'postman-api', name: 'Postman', url: 'https://www.postman.com/', description: 'The complete API development platform', descriptionZh: '完整的API开发平台', icon: '📮', tags: ['api', 'testing', 'development'], categoryId: 'api' },
  { id: 'insomnia', name: 'Insomnia', url: 'https://insomnia.rest/', description: 'Open-source API client', descriptionZh: '开源API客户端', icon: '💤', tags: ['api', 'testing', 'open-source'], categoryId: 'api' },
  { id: 'rapidapi', name: 'RapidAPI', url: 'https://rapidapi.com/', description: 'World\'s largest API hub', descriptionZh: '全球最大的API中心', icon: '⚡', tags: ['api', 'marketplace'], categoryId: 'api' },
  { id: 'swagger-api', name: 'Swagger UI', url: 'https://swagger.io/tools/swagger-ui/', description: 'Interactive API documentation', descriptionZh: '交互式API文档', icon: '📖', tags: ['api', 'documentation'], categoryId: 'api' },
  { id: 'hoppscotch', name: 'Hoppscotch', url: 'https://hoppscotch.io/', description: 'Open source API development ecosystem', descriptionZh: '开源API开发生态', icon: '🐰', tags: ['api', 'open-source', 'testing'], categoryId: 'api' },

  // === Database ===
  { id: 'supabase', name: 'Supabase', url: 'https://supabase.com/', description: 'Open source Firebase alternative', descriptionZh: '开源Firebase替代品', icon: '⚡', tags: ['database', 'postgres', 'baas'], categoryId: 'database' },
  { id: 'prisma', name: 'Prisma', url: 'https://www.prisma.io/', description: 'Next-generation Node.js and TypeScript ORM', descriptionZh: '下一代Node.js和TypeScript ORM', icon: '🔷', tags: ['database', 'orm', 'typescript'], categoryId: 'database' },
  { id: 'redis', name: 'Redis', url: 'https://redis.io/', description: 'In-memory data structure store', descriptionZh: '内存数据结构存储', icon: '🔴', tags: ['database', 'cache', 'nosql'], categoryId: 'database' },
  { id: 'mongodb-atlas', name: 'MongoDB Atlas', url: 'https://www.mongodb.com/atlas', description: 'Cloud database service for MongoDB', descriptionZh: 'MongoDB云数据库服务', icon: '🍃', tags: ['database', 'nosql', 'cloud'], categoryId: 'database' },
  { id: 'dbeaver', name: 'DBeaver', url: 'https://dbeaver.io/', description: 'Universal database tool', descriptionZh: '通用数据库工具', icon: '🦫', tags: ['database', 'gui', 'universal'], categoryId: 'database' },

  // === Network ===
  { id: 'wireshark', name: 'Wireshark', url: 'https://www.wireshark.org/', description: 'Network protocol analyzer', descriptionZh: '网络协议分析器', icon: '🦈', tags: ['network', 'analyzer', 'packets'], categoryId: 'network' },
  { id: 'dns-checker', name: 'DNS Checker', url: 'https://dnschecker.org/', description: 'DNS propagation checker', descriptionZh: 'DNS传播检查器', icon: '🔍', tags: ['network', 'dns'], categoryId: 'network' },
  { id: 'down-detector', name: 'DownDetector', url: 'https://downdetector.com/', description: 'Real-time outage monitoring', descriptionZh: '实时故障监控', icon: '📉', tags: ['network', 'monitoring', 'outage'], categoryId: 'network' },
  { id: 'webpagetest', name: 'WebPageTest', url: 'https://www.webpagetest.org/', description: 'Advanced website performance testing', descriptionZh: '高级网站性能测试', icon: '🧪', tags: ['network', 'performance', 'testing'], categoryId: 'network' },

  // === Git & Version Control ===
  { id: 'github', name: 'GitHub', url: 'https://github.com/', description: 'World\'s largest code hosting platform', descriptionZh: '全球最大的代码托管平台', icon: '🐙', tags: ['git', 'hosting', 'collaboration'], categoryId: 'git' },
  { id: 'gitlab', name: 'GitLab', url: 'https://gitlab.com/', description: 'Complete DevOps platform', descriptionZh: '完整的DevOps平台', icon: '🦊', tags: ['git', 'devops', 'ci-cd'], categoryId: 'git' },
  { id: 'bitbucket', name: 'Bitbucket', url: 'https://bitbucket.org/', description: 'Git solution for professional teams', descriptionZh: '专业团队的Git解决方案', icon: '🪣', tags: ['git', 'atlassian', 'teams'], categoryId: 'git' },
  { id: 'gitee', name: 'Gitee', url: 'https://gitee.com/', description: 'Chinese code hosting platform', descriptionZh: '中国代码托管平台', icon: '🔴', tags: ['git', 'chinese', 'hosting'], categoryId: 'git' },
  { id: 'gitignore-io', name: 'gitignore.io', url: 'https://www.toptal.com/developers/gitignore', description: 'Create useful .gitignore files', descriptionZh: '创建有用的.gitignore文件', icon: '🚫', tags: ['git', 'gitignore'], categoryId: 'git' },
];
