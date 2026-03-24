'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { socialLinks, siteConfig } from '@/data/config';
import styles from './Footer.module.css';

export default function Footer() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.divider} />

        {/* Social Links */}
        <div className={styles.socialRow}>
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.active ? link.url : '#contact-placeholder'}
              className={styles.socialLink}
              title={link.platform}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!link.active) {
                  e.preventDefault();
                  window.location.href = '/contact';
                }
              }}
            >
              <span className={styles.socialIcon}>{link.icon}</span>
              <span className={styles.socialLabel}>{link.platform}</span>
            </a>
          ))}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <p className={styles.brand}>
            <span className={styles.star}>⭐</span>
            <span className={styles.brandName}>{siteConfig.name}</span>
          </p>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {siteConfig.author}. {isZh ? '用代码书写星辰' : 'Written in the stars with code'}.
          </p>
          <p className={styles.builtWith}>
            {isZh ? '使用 ' : 'Built with '}
            <span className={styles.tech}>Next.js</span>
            <span className={styles.dot}>·</span>
            <span className={styles.tech}>TypeScript</span>
            <span className={styles.dot}>·</span>
            <span className={styles.tech}>Three.js</span>
            <span className={styles.dot}>·</span>
            <span className={styles.tech}>Framer Motion</span>
          </p>
        </div>

        {/* Visitor Counter */}
        <div className={styles.visitor}>
          <span className={styles.visitorIcon}>👁</span>
          <span className={styles.visitorText}>
            {isZh ? '星际访客 #' : 'Star Visitor #'}
          </span>
          <VisitorCounter />
        </div>
      </div>
    </footer>
  );
}

function VisitorCounter() {
  const [count, setCount] = useState('---');

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('https://api.counterapi.dev/v1/badhope-starbase/visits/up');
        if (res.ok) {
          const data = await res.json();
          setCount(data.count?.toString() || '---');
        }
      } catch {
        setCount('∞');
      }
    };
    fetchCount();
  }, []);

  return <span className={styles.count}>{count}</span>;
}

import { useState, useEffect } from 'react';
