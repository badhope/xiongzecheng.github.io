'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './not-found.module.css';

export default function NotFound() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(2, 5, 16, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${star.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.content}>
        {/* Astronaut */}
        <motion.div
          className={styles.astronaut}
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🧑‍🚀
        </motion.div>

        {/* 404 */}
        <motion.h1
          className={styles.errorCode}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          404
        </motion.h1>

        <motion.p
          className={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isZh ? '迷失在星际空间中...' : 'Lost in interstellar space...'}
        </motion.p>

        <motion.p
          className={styles.description}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isZh
            ? '这个星域似乎不存在，或者已经漂移到了未知空间。'
            : 'This star sector doesn\'t exist, or has drifted into unknown space.'}
        </motion.p>

        {/* Terminal */}
        <motion.div
          className={styles.terminal}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className={styles.prompt}>$</span>
          <span className={styles.command}>
            {isZh ? '导航错误：目标星域未找到' : 'NAV ERROR: Target sector not found'}
          </span>
        </motion.div>

        {/* Actions */}
        <motion.div
          className={styles.actions}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Link href="/home" className={styles.btnPrimary}>
            {isZh ? '🏠 返回空间站' : '🏠 Return to Starbase'}
          </Link>
          <button
            className={styles.btnSecondary}
            onClick={() => {
              const url = 'https://github.com/badhope/github.io/issues/new?template=bug_report.md';
              window.open(url, '_blank');
            }}
          >
            {isZh ? '🐛 报告问题' : '🐛 Report Issue'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
