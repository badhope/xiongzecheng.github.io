'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useSettings } from '@/lib/settings/SettingsContext';
import styles from './StarNavigation.module.css';

interface NavItem {
  path: string;
  labelZh: string;
  labelEn: string;
  icon: string;
  group: 'main' | 'more';
}

const navItems: NavItem[] = [
  { path: '/', labelZh: '首页', labelEn: 'Home', icon: '🏠', group: 'main' },
  { path: '/projects', labelZh: '作品集', labelEn: 'Projects', icon: '💼', group: 'main' },
  { path: '/tools', labelZh: '工具集', labelEn: 'Tools', icon: '🛠️', group: 'main' },
  { path: '/news', labelZh: '资讯中心', labelEn: 'News Hub', icon: '📡', group: 'main' },
  { path: '/blog', labelZh: '博客', labelEn: 'Blog', icon: '📝', group: 'more' },
  { path: '/ai', labelZh: 'AI 助手', labelEn: 'AI Assistant', icon: '🤖', group: 'more' },
  { path: '/resume', labelZh: '简历', labelEn: 'Resume', icon: '📄', group: 'more' },
  { path: '/contact', labelZh: '联系我', labelEn: 'Contact', icon: '📧', group: 'more' },
];

export default function StarNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { settings } = useSettings();
  const isZh = language === 'zh';

  // Close nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsSettingsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const mainItems = navItems.filter(i => i.group === 'main');
  const moreItems = navItems.filter(i => i.group === 'more');

  return (
    <>
      {/* Navigation Toggle - Top Left Star */}
      <motion.button
        className={styles.navToggle}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          className={styles.starIcon}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ⭐
        </motion.span>
      </motion.button>

      {/* Settings Toggle - Top Right */}
      <motion.button
        className={styles.settingsToggle}
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        ⚙️
      </motion.button>

      {/* Language Toggle */}
      <motion.button
        className={styles.langToggle}
        onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        {isZh ? 'EN' : '中'}
      </motion.button>

      {/* Side Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              className={styles.navPanel}
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className={styles.navHeader}>
                <span className={styles.navLogo}>⭐</span>
                <span className={styles.navTitle}>
                  {isZh ? '星际导航' : 'Star Navigation'}
                </span>
              </div>

              <div className={styles.navGroups}>
                {/* Main Navigation */}
                <div className={styles.navGroup}>
                  <span className={styles.groupLabel}>
                    {isZh ? '▸ 主导航' : '▸ Main'}
                  </span>
                  {mainItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={item.path}
                        className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
                      >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navLabel}>
                          {isZh ? item.labelZh : item.labelEn}
                        </span>
                        {pathname === item.path && (
                          <motion.div
                            className={styles.activeIndicator}
                            layoutId="activeNav"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* More Navigation */}
                <div className={styles.navGroup}>
                  <span className={styles.groupLabel}>
                    {isZh ? '▸ 更多' : '▸ More'}
                  </span>
                  {moreItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <Link
                        href={item.path}
                        className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
                      >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navLabel}>
                          {isZh ? item.labelZh : item.labelEn}
                        </span>
                        {pathname === item.path && (
                          <motion.div
                            className={styles.activeIndicator}
                            layoutId="activeNav2"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={styles.navFooter}>
                <div className={styles.statusLine}>
                  <span className={styles.statusDot} />
                  <span className={styles.statusText}>
                    {isZh ? '系统在线' : 'Systems Online'}
                  </span>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <div onClick={() => setIsSettingsOpen(false)}>
          {/* Placeholder - will be replaced by SettingsPanel component */}
        </div>
      )}
    </>
  );
}
