'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import styles from './blog.module.css';

interface BlogPost {
  title: string;
  url: string;
  source: string;
  date?: string;
  description?: string;
  author?: string;
}

export default function BlogPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [activeTab, setActiveTab] = useState<'csdn' | 'juejin' | 'analytics'>('csdn');

  // Blog links - direct to user's profiles since RSS may have CORS issues
  const blogSources = [
    {
      id: 'csdn' as const,
      name: 'CSDN',
      icon: '📚',
      url: 'https://blog.csdn.net/weixin_56622231',
      color: '#fc5531',
    },
    {
      id: 'juejin' as const,
      name: isZh ? '掘金' : 'Juejin',
      icon: '💎',
      url: 'https://juejin.cn/user/235011154247',
      color: '#1e80ff',
    },
  ];

  // Sample blog posts for display (will be replaced by real data from build script)
  const samplePosts: BlogPost[] = [
    { title: isZh ? 'Next.js 15 新特性解析' : 'Next.js 15 New Features', url: 'https://blog.csdn.net/weixin_56622231', source: 'CSDN', description: isZh ? '深入分析 Next.js 15 的最新特性和改进' : 'Deep dive into Next.js 15 latest features' },
    { title: isZh ? 'TypeScript 高级类型技巧' : 'Advanced TypeScript Type Tricks', url: 'https://blog.csdn.net/weixin_56622231', source: 'CSDN', description: isZh ? '掌握 TypeScript 的高级类型系统' : 'Master TypeScript advanced type system' },
    { title: isZh ? 'React 性能优化实战' : 'React Performance Optimization', url: 'https://juejin.cn/user/235011154247', source: isZh ? '掘金' : 'Juejin', description: isZh ? 'React 应用性能优化的实用技巧' : 'Practical React performance tips' },
    { title: isZh ? 'Docker 容器化部署指南' : 'Docker Containerization Guide', url: 'https://juejin.cn/user/235011154247', source: isZh ? '掘金' : 'Juejin', description: isZh ? '从零开始的 Docker 部署教程' : 'Docker deployment tutorial from scratch' },
    { title: isZh ? 'AI 大模型接入实践' : 'AI LLM Integration Practice', url: 'https://blog.csdn.net/weixin_56622231', source: 'CSDN', description: isZh ? '如何将大语言模型接入你的应用' : 'How to integrate LLMs into your app' },
    { title: isZh ? 'Three.js 3D 可视化入门' : 'Three.js 3D Visualization Intro', url: 'https://blog.csdn.net/weixin_56622231', source: 'CSDN', description: isZh ? '使用 Three.js 创建炫酷的 3D 效果' : 'Create cool 3D effects with Three.js' },
  ];

  return (
    <div className={styles.page}>
      <StarNavigation />

      <main className={styles.main}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.tag}>{isZh ? '// 博客' : '// Blog'}</span>
          <h1 className={styles.title}>{isZh ? '星际日志' : 'Stellar Logs'}</h1>
          <p className={styles.subtitle}>
            {isZh ? '记录技术探索的每一步' : 'Documenting every step of tech exploration'}
          </p>
        </motion.div>

        {/* Blog Platform Links */}
        <motion.div
          className={styles.platforms}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {blogSources.map(source => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.platformCard}
              style={{ '--accent': source.color } as React.CSSProperties}
            >
              <span className={styles.platformIcon}>{source.icon}</span>
              <div>
                <h3 className={styles.platformName}>{source.name}</h3>
                <p className={styles.platformUrl}>{source.url.replace('https://', '')}</p>
              </div>
              <span className={styles.platformArrow}>→</span>
            </a>
          ))}
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          className={styles.postsSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className={styles.sectionTitle}>
            {isZh ? '📝 最新文章' : '📝 Latest Posts'}
          </h2>
          <div className={styles.postsGrid}>
            {samplePosts.map((post, index) => (
              <motion.a
                key={index}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.postCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ y: -4 }}
              >
                <div className={styles.postMeta}>
                  <span className={styles.postSource}>{post.source}</span>
                </div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postDesc}>{post.description}</p>
                <span className={styles.postLink}>
                  {isZh ? '阅读全文 →' : 'Read More →'}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Analytics Section */}
        <motion.div
          className={styles.analyticsSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className={styles.sectionTitle}>
            {isZh ? '📊 博客数据' : '📊 Blog Analytics'}
          </h2>
          <div className={styles.analyticsGrid}>
            <div className={styles.analyticsCard}>
              <span className={styles.analyticsValue}>2</span>
              <span className={styles.analyticsLabel}>{isZh ? '博客平台' : 'Platforms'}</span>
            </div>
            <div className={styles.analyticsCard}>
              <span className={styles.analyticsValue}>∞</span>
              <span className={styles.analyticsLabel}>{isZh ? '持续更新中' : 'Continuously updating'}</span>
            </div>
            <div className={styles.analyticsCard}>
              <span className={styles.analyticsValue}>⭐</span>
              <span className={styles.analyticsLabel}>{isZh ? '技术探索' : 'Tech Exploration'}</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
