'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
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
  const isZh = language === 'zh';
  const [phase, setPhase] = useState<'idle' | 'warp' | 'transition'>('idle');
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const [countdown, setCountdown] = useState(5); // 5 second countdown
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<{id: number; x: number; y: number; delay: number; duration: number}[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const speedRef = useRef(0);
  const targetSpeedRef = useRef(0);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize stars
  useEffect(() => {
    const newStars: Star[] = [];
    // Use softer colors
    const colors = ['#ffffff', '#f0d060', '#7ca8ff', '#c5a2f0', '#a0e8f0', '#ffd8a0'];
    for (let i = 0; i < 600; i++) { // Reduced from 800 to make less crowded
      newStars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1500 + 500,
        prevZ: 0,
        size: Math.random() * 1.5 + 0.5, // Smaller stars
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    starsRef.current = newStars;
    setStars(newStars);

    // Initialize meteors
    const newMeteors = Array.from({ length: 3 }, (_, i) => ({ // Reduced from 5
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 50,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 2, // Slower meteors
    }));
    setMeteors(newMeteors);
  }, []);

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const centerX = () => canvas.width / 2;
    const centerY = () => canvas.height / 2;

    const animate = () => {
      // Softer background - less intense
      ctx.fillStyle = 'rgba(4, 7, 26, 0.2)'; // Changed from rgba(2, 5, 16, 0.15) to softer blue
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth speed transition
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.02;

      const cx = centerX();
      const cy = centerY();

      starsRef.current.forEach((star) => {
        star.prevZ = star.z;
        star.z -= speedRef.current;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = 1500;
          star.prevZ = 1500;
        }

        // Project to 2D
        const sx = (star.x / star.z) * 300 + cx;
        const sy = (star.y / star.z) * 300 + cy;
        const px = (star.x / star.prevZ) * 300 + cx;
        const py = (star.y / star.prevZ) * 300 + cy;

        const size = Math.max(0.1, (1 - star.z / 1500) * star.size * 2); // Smaller size multiplier
        const alpha = Math.max(0.1, Math.min(1, 1 - star.z / 1500));

        // Draw star trail during warp - more subtle
        if (speedRef.current > 5) {
          const trailLength = Math.min(speedRef.current * 0.3, 20); // Shorter trails
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = alpha * 0.4; // Softer trails
          ctx.lineWidth = size * 0.3;
          ctx.stroke();
        }

        // Draw star point
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Subtle glow effect for bright stars
        if (size > 1.2) {
          ctx.beginPath();
          ctx.arc(sx, sy, size * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 2);
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.globalAlpha = alpha * 0.2; // Softer glow
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;

      // Nebula clouds during warp - more subtle
      if (speedRef.current > 10) {
        const time = Date.now() * 0.0005; // Slower movement
        for (let i = 0; i < 2; i++) { // Reduced from 3
          const nx = cx + Math.sin(time + i * 2) * 150; // Smaller movement
          const ny = cy + Math.cos(time + i * 1.5) * 100;
          const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, 150);
          const colors = ['rgba(26,115,232,0.02)', 'rgba(124,58,237,0.02)', 'rgba(212,175,55,0.01)']; // Softer
          gradient.addColorStop(0, colors[i]);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Progress simulation
  useEffect(() => {
    if (phase !== 'warp') return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setPhase('transition');
          return 100;
        }
        return p + Math.random() * 2 + 0.5; // Slower progress
      });
    }, 80); // Slower updates
    return () => clearInterval(interval);
  }, [phase]);

  // Handle transition complete
  useEffect(() => {
    if (phase === 'transition') {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000); // Faster transition
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  // Countdown timer
  useEffect(() => {
    if (phase === 'idle' && showButton) {
      const handleEnter = () => {
        if (countdownRef.current) clearInterval(countdownRef.current);
        setShowButton(false);
        setPhase('warp');
        targetSpeedRef.current = 30;
      };

      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current);
            handleEnter(); // Auto-enter when countdown reaches 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [phase, showButton]);

  const handleEnter = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setShowButton(false);
    setPhase('warp');
    targetSpeedRef.current = 30; // Reduced from 50 to make less intense
  }, []);

  const handleSkip = useCallback(() => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    cancelAnimationFrame(animFrameRef.current);
    onComplete();
  }, [onComplete]);

  return (
    <div className={styles.loader}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Softer nebula background effects */}
      <div className={styles.nebula1Soft} />
      <div className={styles.nebula2Soft} />
      <div className={styles.nebula3Soft} />

      {/* Meteors */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className={styles.meteorSoft}
          style={{
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        />
      ))}

      {/* Central content */}
      <AnimatePresence mode="wait">
        {phase === 'idle' && showButton && (
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
          >
            {/* Star Logo */}
            <motion.div
              className={styles.logoContainer}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} // Slower rotation
            >
              <div className={styles.logoStar}>⭐</div>
              <div className={styles.logoGlowSoft} />
            </motion.div>

            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className={styles.titleLine1}>badhope&apos;s</span>
              <span className={styles.titleLine2}>Starbase</span>
            </motion.h1>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {isZh ? '探索代码与创意的宇宙' : 'Exploring the universe of code and creativity'}
            </motion.p>

            <motion.div
              className={styles.enterBtnContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <button className={styles.enterBtn} onClick={handleEnter}>
                <span className={styles.enterBtnText}>ENTER</span>
                <span className={styles.enterBtnSub}>{isZh ? '进入空间站' : 'Enter Station'}</span>
                <div className={styles.enterBtnGlowSoft} />
              </button>
            </motion.div>

            <motion.div
              className={styles.countdown}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <span className={styles.countdownText}>
                {isZh ? `自动进入倒计时: ${countdown}s` : `Auto-enter countdown: ${countdown}s`}
              </span>
            </motion.div>

            <motion.div
              className={styles.hint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }} // Softer hint
              transition={{ delay: 1.5, duration: 1 }}
            >
              <span className={styles.hintText}>{'// ' + (isZh ? '初始化空间站系统...' : 'Initializing station systems...')}</span>
            </motion.div>
          </motion.div>
        )}

        {phase === 'warp' && (
          <motion.div
            className={styles.warpContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.warpText}>
              <motion.span
                className={styles.warpLabel}
                animate={{ opacity: [0.4, 0.8, 0.4] }} // Softer pulsing
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isZh ? '曲速驱动激活' : 'WARP DRIVE ACTIVATED'}
              </motion.span>
            </div>

            {/* Progress bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressFill}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <span className={styles.progressText}>
                {Math.min(Math.floor(progress), 100)}%
              </span>
            </div>

            {/* Warp speed indicator */}
            <div className={styles.speedIndicator}>
              <span className={styles.speedLabel}>WARP</span>
              <motion.span
                className={styles.speedValue}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                {Math.floor(speedRef.current * 2.4)}
              </motion.span>
            </div>

            <button className={styles.skipBtn} onClick={handleSkip}>
              {isZh ? '跳过 →' : 'Skip →'}
            </button>
          </motion.div>
        )}

        {phase === 'transition' && (
          <motion.div
            className={styles.transitionOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0 }} // Faster transition
          >
            <div className={styles.transitionFlashSoft} />
            <motion.div
              className={styles.transitionText}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              ⭐ {isZh ? '欢迎来到空间站' : 'Welcome to Starbase'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
