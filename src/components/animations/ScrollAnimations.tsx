'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './ScrollAnimations.module.css';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.6,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...getInitialPosition() }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollScaleProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  scale?: number;
}

export function ScrollScale({
  children,
  className = '',
  delay = 0,
  scale = 0.9,
}: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRotateProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  rotate?: number;
}

export function ScrollRotate({
  children,
  className = '',
  delay = 0,
  rotate = -10,
}: ScrollRotateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, rotate }}
      animate={isInView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollBlurProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  blurAmount?: number;
}

export function ScrollBlur({
  children,
  className = '',
  delay = 0,
  blurAmount = 10,
}: ScrollBlurProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: `blur(${blurAmount}px)` }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: `blur(${blurAmount}px)` }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
}

export function ParallaxSection({
  children,
  className = '',
  speed = 0.5,
  offset = 0,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed + offset, -100 * speed + offset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}

interface ParallaxStarsProps {
  className?: string;
  count?: number;
}

interface StarItemProps {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function StarItem({ x, y: initialY, size, speed, opacity, scrollYProgress }: StarItemProps) {
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [initialY + 20 * speed, initialY - 20 * speed]
  );
  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      className={styles.star}
      style={{
        left: `${x}%`,
        y: smoothY,
        width: size,
        height: size,
        opacity,
      }}
    />
  );
}

export function ParallaxStars({ className = '', count = 50 }: ParallaxStarsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const [stars, setStars] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setStars(generatedStars);
  }, [count]);

  return (
    <div ref={ref} className={`${styles.starsContainer} ${className}`}>
      {stars.map((star) => (
        <StarItem
          key={star.id}
          x={star.x}
          y={star.y}
          size={star.size}
          speed={star.speed}
          opacity={star.opacity}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

interface ScrollProgressProps {
  className?: string;
  color?: string;
}

export function ScrollProgress({ className = '', color = '#d4af37' }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className={`${styles.scrollProgress} ${className}`}
      style={{ scaleX, backgroundColor: color }}
    />
  );
}

interface ScrollTriggeredCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function ScrollTriggeredCounter({
  value,
  duration = 2,
  className = '',
  prefix = '',
  suffix = '',
}: ScrollTriggeredCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setDisplayValue(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

interface ScrollRevealListProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
}

export function ScrollRevealList({
  children,
  className = '',
  itemClassName = '',
  staggerDelay = 0.1,
}: ScrollRevealListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          className={itemClassName}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface ScrollTriggeredTimelineProps {
  items: {
    title: string;
    description?: string;
    date?: string;
  }[];
  className?: string;
}

export function ScrollTriggeredTimeline({ items, className = '' }: ScrollTriggeredTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`${styles.timeline} ${className}`}>
      <div className={styles.timelineLine} />
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={styles.timelineItem}
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className={styles.timelineDot} />
          <div className={styles.timelineContent}>
            {item.date && <span className={styles.timelineDate}>{item.date}</span>}
            <h4 className={styles.timelineTitle}>{item.title}</h4>
            {item.description && <p className={styles.timelineDesc}>{item.description}</p>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

interface ScrollZoomProps {
  children: ReactNode;
  className?: string;
  zoomIn?: boolean;
}

export function ScrollZoom({
  children,
  className = '',
  zoomIn = true,
}: ScrollZoomProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    zoomIn ? [0.8, 1, 1.1] : [1.2, 1, 0.9]
  );
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} className={className} style={{ scale: smoothScale }}>
      {children}
    </motion.div>
  );
}

interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
  fadeIn?: boolean;
}

export function ScrollFade({
  children,
  className = '',
  fadeIn = true,
}: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    fadeIn ? [0, 1, 1, 0] : [1, 0.5, 0.5, 1]
  );

  return (
    <motion.div ref={ref} className={className} style={{ opacity }}>
      {children}
    </motion.div>
  );
}
