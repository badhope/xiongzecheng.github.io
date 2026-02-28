export const projectsData = [
  {
    title: "MIBT 专业人格评测系统",
    description: "基于心理学框架的专业测评网站，使用 HTML/CSS/JS 开发，部署在 GitHub Pages。用户可进行测评并获取维度分析。",
    tags: ["HTML5", "CSS3", "JavaScript", "Psychology"],
    link: "https://badhope.github.io/Mibt-Test/",
    github: "https://github.com/badhope/Mibt-Test",
    stars: 0, // 模拟数据
    forks: 0,
  },
  {
    title: "个人技术导航站",
    description: "基于 Next.js 构建的极客风个人主页，集成简历展示、工具导航与 GitHub 动态同步功能。",
    tags: ["Next.js", "React", "Tailwind CSS", "Three.js"],
    link: "https://github.com/badhope/badhope.github.io", // 假设这是当前项目仓库
    github: "https://github.com/badhope/badhope.github.io",
    stars: 5, 
    forks: 2,
  },
  // 可以手动添加更多项目，或者留空等待自动化脚本填充
];

export const articlesData = [
  {
    title: "数据清洗与标准化流程实践心得",
    platform: "CSDN",
    date: "2026-01-15",
    link: "https://blog.csdn.net/weixin_56622231",
    desc: "分享了在医药公司实习期间处理 5000+ 条数据的实战经验。",
  },
  {
    title: "Python Pandas 在业务报表中的应用",
    platform: "掘金",
    date: "2025-12-20",
    link: "https://juejin.cn/user/",
    desc: "如何利用 Pandas 优化数据展示逻辑，输出多维可视化报表。",
  },
  // 模拟数据，实际可通过 GitHub Action 抓取 RSS 生成
];
