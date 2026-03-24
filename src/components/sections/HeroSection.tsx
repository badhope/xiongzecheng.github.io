'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useSettings } from '@/lib/settings/SettingsContext';
import styles from './HeroSection.module.css';

const StarLogo = dynamic(() => import('@/components/3d/StarLogo'), { ssr: false });

const titles = {
  zh: ['全栈开发者', 'AI 时代探索者', '代码创造者', '星辰收集者', '开源贡献者', '终端爱好者', '大数据工程师', '后端架构师'],
  en: ['Full-Stack Developer', 'AI Explorer', 'Code Creator', 'Star Collector', 'Open Source Contributor', 'Terminal Enthusiast', 'Big Data Engineer', 'Backend Architect'],
};

export default function HeroSection() {
  const { language } = useLanguage();
  const { settings } = useSettings();
  const isZh = language === 'zh';
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const currentTitles = isZh ? titles.zh : titles.en;

  useEffect(() => {
    if (!settings.animationsEnabled) {
      setDisplayText(currentTitles[0]);
      return;
    }

    const currentTitle = currentTitles[titleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % currentTitles.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentTitle.substring(0, displayText.length - 1)
            : currentTitle.substring(0, displayText.length + 1)
        );
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, currentTitles, settings.animationsEnabled]);

  const scrollToContent = useCallback(() => {
    const el = document.getElementById('about-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background effects */}
      <div className={styles.bgGradient} />
      <div className={styles.gridOverlay} />

      {/* Main content */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* 3D Star Logo */}
        <motion.div
          className={styles.logoContainer}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
        >
          <StarLogo size={200} />
        </motion.div>

        {/* Terminal-style greeting */}
        <motion.div
          className={styles.terminal}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <span className={styles.terminalPrompt}>$</span>
          <span className={styles.terminalCommand}>
            {isZh ? 'echo "你好，我是"' : 'echo "Hello, I\'m"'}
          </span>
        </motion.div>

        <motion.h1
          className={styles.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <span className={styles.nameText}>badhope</span>
          <span className={styles.cursor}>_</span>
        </motion.h1>

        {/* Typing title */}
        <motion.div
          className={styles.titleContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <span className={styles.titlePrefix}>{isZh ? '▸ ' : '▸ '}</span>
          <span className={styles.titleText}>{displayText}</span>
          <span className={styles.titleCursor}>▊</span>
        </motion.div>

        {/* Description */}
        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          {isZh
            ? '在星辰大海中，用代码构建无限可能。持续探索前沿技术，将创意转化为现实。'
            : 'Building infinite possibilities with code across the cosmic sea. Exploring cutting-edge technology and turning ideas into reality.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9 }}
        >
          <button className={styles.btnPrimary} onClick={scrollToContent}>
            {isZh ? '探索更多 ↓' : 'Explore More ↓'}
          </button>
          <a href="/projects" className={styles.btnSecondary}>
            {isZh ? '查看作品' : 'View Projects'}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Decorative elements */}
      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />
    </section>
  );
}
