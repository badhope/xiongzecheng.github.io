/**
 * ============================================================
 * 🌟 STARBASE GLOBAL CONFIGURATION
 * ============================================================
 * 
 * AI READ THIS FIRST:
 * This file is the central configuration for the entire website.
 * All customizable content, links, API endpoints, and settings
 * are defined here. To modify the site, edit this file.
 * 
 * FILE STRUCTURE GUIDE:
 * - bgMusicUrl: Background music audio file URL
 * - socialLinks: All social media links (invalid ones show "contact for access")
 * - contactEmail: Email for contact form (FormSubmit.co)
 * - aiProviders: All supported AI model providers
 * - apiEndpoints: All external API endpoints
 * - siteConfig: General site configuration
 * 
 * HOW TO MODIFY:
 * 1. Find the section you want to change
 * 2. Edit the value
 * 3. Rebuild and deploy
 * ============================================================
 */

export const siteConfig = {
  name: "badhope's Starbase",
  nameShort: 'Starbase',
  description: {
    en: 'Full-Stack Developer & AI Explorer | Building the future with code',
    zh: '全栈开发者 & AI时代探索者 | 用代码构建未来',
  },
  url: 'https://badhope.github.io',
  author: 'badhope',
  email: 'x18825407105@outlook.com',
  // ⬇️ BACKGROUND MUSIC - Replace with your audio file URL
  // Supported formats: mp3, ogg, wav
  // Example: 'https://example.com/path/to/your-music.mp3'
  bgMusicUrl: '',
  // ⬇️ FAVICON - Replace with your favicon URL
  faviconUrl: '',
};

export const socialLinks = [
  {
    platform: 'GitHub',
    url: 'https://github.com/badhope',
    icon: '🐙',
    color: '#333',
    active: true,
  },
  {
    platform: 'CSDN',
    url: 'https://blog.csdn.net/weixin_56622231',
    icon: '📚',
    color: '#fc5531',
    active: true,
  },
  {
    platform: '掘金',
    url: 'https://juejin.cn/user/235011154247',
    icon: '💎',
    color: '#1e80ff',
    active: true,
  },
  {
    platform: 'Bilibili',
    // ⬇️ Replace with your real Bilibili URL
    url: '',
    icon: '📺',
    color: '#fb7299',
    active: false,
    placeholder: 'https://space.bilibili.com/',
  },
  {
    platform: 'Twitter/X',
    // ⬇️ Replace with your real Twitter/X URL
    url: '',
    icon: '🐦',
    color: '#1da1f2',
    active: false,
    placeholder: 'https://twitter.com/',
  },
  {
    platform: 'LinkedIn',
    // ⬇️ Replace with your real LinkedIn URL
    url: '',
    icon: '💼',
    color: '#0077b5',
    active: false,
    placeholder: 'https://linkedin.com/in/',
  },
  {
    platform: 'WeChat',
    // ⬇️ Replace with your WeChat QR code image URL
    url: '',
    icon: '💬',
    color: '#07c160',
    active: false,
    placeholder: 'wechat-qrcode-placeholder',
    isQRCode: true,
  },
  {
    platform: 'Email',
    url: 'mailto:x18825407105@outlook.com',
    icon: '📧',
    color: '#0078d4',
    active: true,
  },
];

/**
 * AI Provider Configuration
 * AI READ THIS: To add a new AI provider, add an entry to this array.
 * Each provider needs: id, name, baseUrl, models array, and docsUrl.
 * The user will input their API key in the settings panel.
 */
export const aiProviders = [
  {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    defaultModel: 'gpt-4o-mini',
    docsUrl: 'https://platform.openai.com/api-keys',
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    baseUrl: 'https://api.anthropic.com/v1',
    models: ['claude-sonnet-4-20250514', 'claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307'],
    defaultModel: 'claude-sonnet-4-20250514',
    docsUrl: 'https://console.anthropic.com/',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    models: ['deepseek-chat', 'deepseek-reasoner'],
    defaultModel: 'deepseek-chat',
    docsUrl: 'https://platform.deepseek.com/api_keys',
  },
  {
    id: 'zhipu',
    name: '智谱AI (GLM)',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    models: ['glm-4-plus', 'glm-4-flash', 'glm-4'],
    defaultModel: 'glm-4-flash',
    docsUrl: 'https://open.bigmodel.cn/',
  },
  {
    id: 'qwen',
    name: '通义千问 (Qwen)',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    models: ['qwen-plus', 'qwen-turbo', 'qwen-max'],
    defaultModel: 'qwen-turbo',
    docsUrl: 'https://dashscope.console.aliyun.com/',
  },
  {
    id: 'ernie',
    name: '文心一言 (ERNIE)',
    baseUrl: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat',
    models: ['ernie-4.0-8k', 'ernie-3.5-8k', 'ernie-speed-128k'],
    defaultModel: 'ernie-4.0-8k',
    docsUrl: 'https://console.bce.baidu.com/qianfan/',
  },
  {
    id: 'moonshot',
    name: 'Moonshot (Kimi)',
    baseUrl: 'https://api.moonshot.cn/v1',
    models: ['moonshot-v1-128k', 'moonshot-v1-32k', 'moonshot-v1-8k'],
    defaultModel: 'moonshot-v1-8k',
    docsUrl: 'https://platform.moonshot.cn/',
  },
  {
    id: 'yi',
    name: '零一万物 (Yi)',
    baseUrl: 'https://api.lingyiwanwu.com/v1',
    models: ['yi-large', 'yi-medium', 'yi-spark'],
    defaultModel: 'yi-medium',
    docsUrl: 'https://platform.lingyiwanwu.com/',
  },
  {
    id: 'spark',
    name: '讯飞星火 (Spark)',
    baseUrl: 'https://spark-api-open.xf-yun.com/v1',
    models: ['generalv3.5', 'generalv3', '4.0Ultra'],
    defaultModel: 'generalv3.5',
    docsUrl: 'https://xinghuo.xfyun.cn/',
  },
  {
    id: 'custom',
    name: 'Custom / 自定义',
    baseUrl: '',
    models: [],
    defaultModel: '',
    docsUrl: '',
  },
];

/**
 * External API Endpoints
 * AI READ THIS: All external data sources are configured here.
 * To add a new API, add an entry with: id, name, url, description.
 */
export const apiEndpoints = {
  // Daily quotes
  quotes: {
    zenquotes: 'https://zenquotes.io/api/random',
    quotable: 'https://api.quotable.io/random',
    // Fallback: use built-in quotes if APIs fail
  },
  // Space images
  space: {
    nasaApod: 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
    unsplashSpace: 'https://api.unsplash.com/search/photos?query=space&per_page=10',
  },
  // GitHub
  github: {
    userRepos: 'https://api.github.com/users/badhope/repos?sort=updated&per_page=30',
    userStats: 'https://api.github.com/users/badhope',
    trending: 'https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=10',
  },
  // Blog feeds
  blogs: {
    csdn: 'https://blog.csdn.net/rss.html',
    juejin: 'https://rsshub.app/juejin/trending/all/monthly',
  },
  // AI Leaderboard
  aiLeaderboard: {
    lmsys: 'https://chat.lmsys.org/api/v1/leaderboard',
  },
  // Visitor counter
  visitor: {
    // Using a simple free counter API
    counter: 'https://api.counterapi.dev/v1/badhope-starbase/visits',
  },
  // Weather (optional)
  weather: {
    openWeatherMap: 'https://api.openweathermap.org/data/2.5/weather',
  },
  // History events
  history: {
    todayInHistory: 'https://history.muffinlabs.com/date',
  },
};

/**
 * Contact Form Configuration
 * Using FormSubmit.co - sends form data directly to email
 * No registration required, just use the email as endpoint
 */
export const contactForm = {
  endpoint: `https://formsubmit.co/ajax/${siteConfig.email}`,
  // FormSubmit will send a confirmation email on first use
  method: 'POST' as const,
};

/**
 * Error Reporting Configuration
 */
export const errorReporting = {
  // Sentry DSN - Replace with your own Sentry project DSN
  // Get one free at https://sentry.io/
  sentryDsn: '',
  // GitHub Issues for manual bug reports
  githubIssuesUrl: 'https://github.com/badhope/github.io/issues/new?template=bug_report.md',
};
