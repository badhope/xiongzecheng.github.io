'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './not-found.module.css';

export default function NotFound() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  useEffect(() => {
    console.warn('404 - Page not found');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          className={styles.errorCode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.code}>4</span>
          <span className={styles.icon}>🔍</span>
          <span className={styles.code}>4</span>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isZh ? '页面未找到' : 'Page Not Found'}
        </motion.h1>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {isZh
            ? '抱歉，您访问的页面不存在或已被移除。'
            : 'Sorry, the page you are looking for does not exist or has been removed.'}
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/" className={styles.primaryBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            {isZh ? '返回首页' : 'Go Home'}
          </Link>

          <Link href="/blog/" className={styles.secondaryBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/>
            </svg>
            {isZh ? '浏览博客' : 'Browse Blog'}
          </Link>
        </motion.div>

        <motion.div
          className={styles.suggestions}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className={styles.suggestionsTitle}>
            {isZh ? '您可以尝试：' : 'You might want to:'}
          </span>
          <ul className={styles.suggestionsList}>
            <li><Link href="/projects/">{isZh ? '查看项目' : 'View Projects'}</Link></li>
            <li><Link href="/tools/">{isZh ? '探索工具' : 'Explore Tools'}</Link></li>
            <li><Link href="/contact/">{isZh ? '联系我' : 'Contact Me'}</Link></li>
          </ul>
        </motion.div>
      </div>

      <div className={styles.backgroundEffect}>
        <div className={styles.gradientOrb} />
        <div className={styles.gradientOrb2} />
      </div>
    </div>
  );
}