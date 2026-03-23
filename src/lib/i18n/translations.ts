export type Language = 'en' | 'zh';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavTranslations {
  home: string;
  about: string;
  projects: string;
  blog: string;
  aiAssistant: string;
  tools: string;
  resume: string;
  contact: string;
}

export interface HeroTranslations {
  greeting: string;
  name: string;
  titles: string[];
  scrollHint: string;
}

export interface AboutTranslations {
  label: string;
  title: string;
  bio1: string;
  bio2: string;
  stats: {
    githubStars: string;
    projects: string;
    contributions: string;
  };
  timeline: {
    year: string;
    title: string;
    desc: string;
  }[];
}

export interface SkillsTranslations {
  label: string;
  title: string;
  categories: {
    frontend: string;
    backend: string;
    ai: string;
    devops: string;
  };
}

export interface ProjectsTranslations {
  label: string;
  title: string;
  subtitle: string;
  viewProject: string;
  viewCode: string;
  projects: {
    id: number;
    title: string;
    description: string;
  }[];
}

export interface FooterTranslations {
  builtWith: string;
  rights: string;
  disclaimer: string;
}

export interface ContactTranslations {
  label: string;
  title: string;
  subtitle: string;
  email: string;
  message: string;
  send: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  successTitle: string;
  successDesc: string;
  socialsTitle: string;
}

export interface ToolsTranslations {
  label: string;
  title: string;
  tryIt: string;
}

export interface ResumeTranslations {
  label: string;
  title: string;
  download: string;
  print: string;
}

export interface BlogTranslations {
  label: string;
  title: string;
  readMore: string;
}

export interface AIChatTranslations {
  title: string;
  placeholder: string;
  send: string;
  settings: string;
  model: string;
  temperature: string;
  maxTokens: string;
}

export interface CommonTranslations {
  loading: string;
  error: string;
  retry: string;
  close: string;
  save: string;
  cancel: string;
  language: string;
  switchLanguage: string;
}

export interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  about: AboutTranslations;
  skills: SkillsTranslations;
  projects: ProjectsTranslations;
  footer: FooterTranslations;
  contact: ContactTranslations;
  tools: ToolsTranslations;
  resume: ResumeTranslations;
  blog: BlogTranslations;
  aiChat: AIChatTranslations;
  common: CommonTranslations;
}

export const en: Translations = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    blog: 'Blog',
    aiAssistant: 'AI Assistant',
    tools: 'Tools',
    resume: 'Resume',
    contact: 'Contact',
  },
  hero: {
    greeting: 'Hello, I am',
    name: 'badhope',
    titles: ['Full-Stack Developer', 'AI Era Explorer', 'Open Source Contributor', 'Data Engineer'],
    scrollHint: 'Scroll to explore',
  },
  about: {
    label: 'About Me',
    title: 'Full-Stack',
    bio1: 'Hello! I am <highlight>badhope</highlight>, a full-stack developer from Shenzhen. With a background in Data Science and Big Data Technology, I am passionate about creating value through code.',
    bio2: 'I am an <highlight>AI Era Explorer</highlight>, convinced that AI is key to boosting productivity. I leverage AI-assisted development and pursue technical excellence.',
    stats: {
      githubStars: 'GitHub Stars',
      projects: 'Projects',
      contributions: 'Contributions',
    },
    timeline: [
      { year: '2021', title: 'Data Science Studies', desc: 'Systematic learning of data science and big data technology' },
      { year: '2022', title: 'Full-Stack Development', desc: 'Mastered frontend to backend web development stack' },
      { year: '2023', title: 'AI Technology Deep Dive', desc: 'In-depth learning of machine learning and AI applications' },
      { year: '2024', title: 'Continuous Growth', desc: 'Exploring cutting-edge technologies, creating value through code' },
    ],
  },
  skills: {
    label: 'Skills',
    title: 'Tech',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      ai: 'AI & Data',
      devops: 'DevOps',
    },
  },
  projects: {
    label: 'Projects',
    title: 'Featured',
    subtitle: 'Every project is an exploration of technology and innovation',
    viewProject: 'View Project',
    viewCode: 'View Code',
    projects: [
      { id: 1, title: 'AI-Powered E-Commerce Platform', description: 'Modern shopping experience with AI recommendations, intelligent search and personalized suggestions' },
      { id: 2, title: 'Real-Time Data Visualization', description: 'Enterprise-grade analytics dashboard with multi-dimensional real-time monitoring' },
      { id: 3, title: 'Cross-Platform Social App', description: 'Interest-based social network with real-time chat and content sharing' },
      { id: 4, title: 'Distributed Crawler System', description: 'Scalable data collection framework with distributed crawling and cleaning capabilities' },
    ],
  },
  footer: {
    builtWith: 'Built with',
    rights: 'All rights reserved',
    disclaimer: 'The ideas and opinions expressed in this website are my own.',
  },
  contact: {
    label: 'Contact',
    title: 'Get in Touch',
    subtitle: 'Have a project idea or want to collaborate? Feel free to reach out!',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'Your email',
    messagePlaceholder: 'Your message...',
    successTitle: 'Message sent!',
    successDesc: 'Thank you for reaching out. I will get back to you soon.',
    socialsTitle: 'Social Platforms',
  },
  tools: {
    label: 'Tools',
    title: 'Useful',
    tryIt: 'Try It',
  },
  resume: {
    label: 'Resume',
    title: 'My Journey',
    download: 'Download PDF',
    print: 'Print',
  },
  blog: {
    label: 'Blog',
    title: 'Thoughts',
    readMore: 'Read More',
  },
  aiChat: {
    title: 'AI Assistant',
    placeholder: 'Ask me anything...',
    send: 'Send',
    settings: 'Settings',
    model: 'Model',
    temperature: 'Temperature',
    maxTokens: 'Max Tokens',
  },
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    language: 'Language',
    switchLanguage: 'Switch Language',
  },
};

export const zh: Translations = {
  nav: {
    home: '首页',
    about: '关于',
    projects: '项目',
    blog: '博客',
    aiAssistant: 'AI助手',
    tools: '工具',
    resume: '简历',
    contact: '联系',
  },
  hero: {
    greeting: '你好，我是',
    name: 'badhope',
    titles: ['全栈开发者', 'AI时代探索者', '开源贡献者', '数据工程师'],
    scrollHint: '滚动探索',
  },
  about: {
    label: '关于我',
    title: '全栈',
    bio1: '你好！我是 <highlight>badhope</highlight>，一名来自深圳的<span className={styles.highlight}>全栈开发者</span>。数据科学与大数据技术专业背景，热衷于用代码创造价值。',
    bio2: '我是 <highlight>AI时代探索者</highlight>，坚信AI是提升生产力的关键。善用AI辅助开发，追求技术卓越。',
    stats: {
      githubStars: 'GitHub Stars',
      projects: '项目数',
      contributions: '开源贡献',
    },
    timeline: [
      { year: '2021', title: '数据科学专业学习', desc: '系统学习数据科学与大数据技术，打下坚实基础' },
      { year: '2022', title: '全栈开发之路', desc: '从前端到后端，全面掌握Web开发技术栈' },
      { year: '2023', title: 'AI技术深耕', desc: '深入学习机器学习与人工智能，探索AI应用边界' },
      { year: '2024', title: '持续成长中', desc: '不断探索前沿技术，致力于用技术创造价值' },
    ],
  },
  skills: {
    label: '技能',
    title: '技术',
    categories: {
      frontend: '前端',
      backend: '后端',
      ai: 'AI与数据',
      devops: 'DevOps',
    },
  },
  projects: {
    label: '项目',
    title: '精选',
    subtitle: '每一个项目都是一次技术探索与创新的尝试',
    viewProject: '查看项目',
    viewCode: '查看代码',
    projects: [
      { id: 1, title: 'AI驱动的电商平台', description: '融合AI推荐的现代化购物体验，支持智能搜索与个性化推荐' },
      { id: 2, title: '实时数据可视化平台', description: '企业级数据分析仪表盘，支持多维度实时数据监控' },
      { id: 3, title: '跨平台社交应用', description: '基于兴趣图谱的社交网络，支持实时聊天与内容分享' },
      { id: 4, title: '智能爬虫系统', description: '分布式爬虫框架，支持大规模数据采集与清洗' },
    ],
  },
  footer: {
    builtWith: '用',
    rights: '版权所有',
    disclaimer: '本网站所表达的想法和观点仅代表本人。',
  },
  contact: {
    label: '联系',
    title: '联系我',
    subtitle: '有项目合作或技术交流？随时欢迎联系我',
    email: '邮箱',
    message: '留言',
    send: '发送消息',
    namePlaceholder: '您的姓名',
    emailPlaceholder: '您的邮箱',
    messagePlaceholder: '请输入留言内容...',
    successTitle: '消息已发送！',
    successDesc: '感谢你的留言，我会尽快回复。',
    socialsTitle: '社交平台',
  },
  tools: {
    label: '工具',
    title: '实用',
    tryIt: '试试看',
  },
  resume: {
    label: '简历',
    title: '历程',
    download: '下载PDF',
    print: '打印',
  },
  blog: {
    label: '博客',
    title: '思考',
    readMore: '阅读更多',
  },
  aiChat: {
    title: 'AI助手',
    placeholder: '问我任何问题...',
    send: '发送',
    settings: '设置',
    model: '模型',
    temperature: '温度',
    maxTokens: '最大令牌',
  },
  common: {
    loading: '加载中...',
    error: '发生错误',
    retry: '重试',
    close: '关闭',
    save: '保存',
    cancel: '取消',
    language: '语言',
    switchLanguage: '切换语言',
  },
};