'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useSettings } from '@/lib/settings/SettingsContext';
import styles from './WarpLoader.module.css';

interface WarpLoaderProps {
  onComplete: () => void;
}

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  size: number;
  color: string;
}

export default function WarpLoader({ onComplete }: WarpLoaderProps) {
  const { language } = useLanguage();
  const { settings } = useSettings();
  const isZh = language === 'zh';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const [phase, setPhase] = useState<'idle' | 'warp' | 'transition'>('idle');
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const STAR_COUNT = 800;
  const WARP_SPEED = 15;
  const MAX_DEPTH = 1500;

  const starColors = [
    '#ffffff', '#ffd700', '#87ceeb', '#ff6b6b', '#98fb98',
    '#dda0dd', '#f0e68c', '#add8e6', '#ffa07a', '#b0c4de',
  ];

  const initStars = useCallback(() => {
    const stars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * MAX_DEPTH,
        prevZ: 0,
        size: Math.random() * 2 + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }
    starsRef.current = stars;
  }, []);

  useEffect(() => {
    if (!settings.animationsEnabled) {
      onComplete();
      return;
    }

    initStars();
    const timer = setTimeout(() => setShowSkip(true), 2000);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let speed = 2;
    let targetSpeed = 2;
    let frameCount = 0;

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(2, 5, 16, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Smooth speed transition
      speed += (targetSpeed - speed) * 0.02;

      starsRef.current.forEach((star) => {
        star.prevZ = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = MAX_DEPTH;
          star.prevZ = MAX_DEPTH;
        }

        const sx = (star.x / star.z) * 400 + cx;
        const sy = (star.y / star.z) * 400 + cy;
        const px = (star.x / star.prevZ) * 400 + cx;
        const py = (star.y / star.prevZ) * 400 + cy;

        const size = Math.max(0.1, (1 - star.z / MAX_DEPTH) * 3);
        const opacity = Math.max(0.1, 1 - star.z / MAX_DEPTH);

        // Draw star trail
        if (speed > 5) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = star.color + Math.floor(opacity * 80).toString(16).padStart(2, '0');
          ctx.lineWidth = size * 0.8;
          ctx.stroke();
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = star.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Glow effect for close stars
        if (star.z < 200 && speed > 3) {
          ctx.beginPath();
          ctx.arc(sx, sy, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = star.color + '15';
          ctx.fill();
        }
      });

      // Central glow during warp
      if (speed > 8) {
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
        gradient.addColorStop(0, `rgba(212, 175, 55, ${Math.min(0.15, (speed - 8) * 0.02)})`);
        gradient.addColorStop(0.5, `rgba(26, 115, 232, ${Math.min(0.08, (speed - 8) * 0.01)})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      frameCount++;

      // Phase transitions
      if (phase === 'idle' && frameCount > 60) {
        targetSpeed = WARP_SPEED;
        setPhase('warp');
      }

      if (phase === 'warp') {
        const newProgress = Math.min(100, progress + 0.5);
        setProgress(newProgress);
        if (newProgress >= 100) {
          setPhase('transition');
        }
      }

      if (phase === 'transition') {
        targetSpeed = 30;
        if (frameCount > 350) {
          // Flash white then complete
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          setTimeout(() => onComplete(), 300);
          return;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [settings.animationsEnabled, onComplete, initStars, phase, progress]);

  const handleSkip = () => {
    cancelAnimationFrame(animationRef.current);
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.container}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* Central Content */}
        <div className={styles.content}>
          <motion.div
            className={styles.logo}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            <div className={styles.starIcon}>⭐</div>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className={styles.titleGold}>badhope&apos;s</span>
            <span className={styles.titleWhite}> Starbase</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {isZh ? '穿越星际，探索无限可能' : 'Warping through the cosmos'}
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            className={styles.progressContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressFill}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className={styles.progressText}>
              {isZh ? '正在穿越星域...' : 'Warping through starfield...'} {Math.floor(progress)}%
            </span>
          </motion.div>
        </div>

        {/* Skip Button */}
        <AnimatePresence>
          {showSkip && (
            <motion.button
              className={styles.skipBtn}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleSkip}
            >
              {isZh ? '跳过 →' : 'Skip →'}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Corner decorations */}
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />
      </motion.div>
    </AnimatePresence>
  );
}
