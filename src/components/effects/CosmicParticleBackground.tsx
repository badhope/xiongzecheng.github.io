'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useSettings } from '@/lib/settings/SettingsContext';
import styles from './CosmicParticleBackground.module.css';

export type ParticlePreset =
  | 'nebula'
  | 'starfield'
  | 'aurora'
  | 'matrix'
  | 'fireflies'
  | 'galaxy'
  | 'comets'
  | 'waves';

interface ParticleConfig {
  count: number;
  minSize: number;
  maxSize: number;
  speed: number;
  colors: string[];
  opacity: { min: number; max: number };
  direction: 'up' | 'down' | 'left' | 'right' | 'radial' | 'random';
  shape: 'circle' | 'square' | 'star' | 'triangle';
  trail: boolean;
  trailLength: number;
  glow: boolean;
  connectLines: boolean;
  connectDistance: number;
  mouseInteraction: boolean;
  mouseRadius: number;
  parallax: boolean;
  parallaxStrength: number;
}

const presetConfigs: Record<ParticlePreset, ParticleConfig> = {
  nebula: {
    count: 80,
    minSize: 1,
    maxSize: 4,
    speed: 0.3,
    colors: ['#d4af37', '#1a73e8', '#7c3aed', '#06b6d4', '#f0d060'],
    opacity: { min: 0.2, max: 0.8 },
    direction: 'radial',
    shape: 'circle',
    trail: true,
    trailLength: 30,
    glow: true,
    connectLines: true,
    connectDistance: 150,
    mouseInteraction: true,
    mouseRadius: 120,
    parallax: true,
    parallaxStrength: 0.02,
  },
  starfield: {
    count: 200,
    minSize: 0.5,
    maxSize: 2,
    speed: 0.1,
    colors: ['#ffffff', '#d4af37', '#a0a0ff'],
    opacity: { min: 0.3, max: 1 },
    direction: 'up',
    shape: 'circle',
    trail: false,
    trailLength: 0,
    glow: true,
    connectLines: false,
    connectDistance: 0,
    mouseInteraction: false,
    mouseRadius: 0,
    parallax: true,
    parallaxStrength: 0.01,
  },
  aurora: {
    count: 60,
    minSize: 2,
    maxSize: 6,
    speed: 0.2,
    colors: ['#00ff88', '#00ffff', '#ff00ff', '#8800ff'],
    opacity: { min: 0.1, max: 0.5 },
    direction: 'up',
    shape: 'circle',
    trail: true,
    trailLength: 50,
    glow: true,
    connectLines: false,
    connectDistance: 0,
    mouseInteraction: true,
    mouseRadius: 80,
    parallax: false,
    parallaxStrength: 0,
  },
  matrix: {
    count: 100,
    minSize: 1,
    maxSize: 1,
    speed: 2,
    colors: ['#00ff00', '#00dd00', '#00bb00'],
    opacity: { min: 0.3, max: 1 },
    direction: 'down',
    shape: 'square',
    trail: true,
    trailLength: 20,
    glow: true,
    connectLines: false,
    connectDistance: 0,
    mouseInteraction: false,
    mouseRadius: 0,
    parallax: false,
    parallaxStrength: 0,
  },
  fireflies: {
    count: 40,
    minSize: 2,
    maxSize: 5,
    speed: 0.5,
    colors: ['#ffdd00', '#ffaa00', '#ffff88'],
    opacity: { min: 0.3, max: 1 },
    direction: 'random',
    shape: 'circle',
    trail: false,
    trailLength: 0,
    glow: true,
    connectLines: false,
    connectDistance: 0,
    mouseInteraction: true,
    mouseRadius: 150,
    parallax: false,
    parallaxStrength: 0,
  },
  galaxy: {
    count: 150,
    minSize: 0.5,
    maxSize: 3,
    speed: 0.15,
    colors: ['#d4af37', '#ffffff', '#1a73e8', '#ff6b6b', '#4ecdc4'],
    opacity: { min: 0.2, max: 0.9 },
    direction: 'radial',
    shape: 'star',
    trail: true,
    trailLength: 15,
    glow: true,
    connectLines: true,
    connectDistance: 100,
    mouseInteraction: true,
    mouseRadius: 100,
    parallax: true,
    parallaxStrength: 0.03,
  },
  comets: {
    count: 30,
    minSize: 2,
    maxSize: 4,
    speed: 3,
    colors: ['#ffffff', '#d4af37', '#00ffff'],
    opacity: { min: 0.5, max: 1 },
    direction: 'down',
    shape: 'circle',
    trail: true,
    trailLength: 80,
    glow: true,
    connectLines: false,
    connectDistance: 0,
    mouseInteraction: false,
    mouseRadius: 0,
    parallax: false,
    parallaxStrength: 0,
  },
  waves: {
    count: 100,
    minSize: 1,
    maxSize: 3,
    speed: 0.4,
    colors: ['#1a73e8', '#06b6d4', '#7c3aed'],
    opacity: { min: 0.2, max: 0.7 },
    direction: 'left',
    shape: 'circle',
    trail: false,
    trailLength: 0,
    glow: false,
    connectLines: true,
    connectDistance: 120,
    mouseInteraction: true,
    mouseRadius: 100,
    parallax: true,
    parallaxStrength: 0.02,
  },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  targetOpacity: number;
  angle: number;
  angleSpeed: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface CosmicParticleBackgroundProps {
  preset: ParticlePreset;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  showOverlay?: boolean;
}

export default function CosmicParticleBackground({
  preset,
  className,
  intensity = 'medium',
  showOverlay = true,
}: CosmicParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationRef = useRef<number>(0);
  const { settings } = useSettings();

  const config = useMemo(() => {
    const baseConfig = presetConfigs[preset];
    const intensityMultiplier = intensity === 'low' ? 0.5 : intensity === 'high' ? 1.5 : 1;
    return {
      ...baseConfig,
      count: Math.floor(baseConfig.count * intensityMultiplier),
    };
  }, [preset, intensity]);

  const getParticleCountForScreen = useCallback(() => {
    if (typeof window === 'undefined') return config.count;
    const width = window.innerWidth;
    const baseCount = config.count;
    if (width < 480) return Math.floor(baseCount * 0.4);
    if (width < 768) return Math.floor(baseCount * 0.6);
    if (width < 1024) return Math.floor(baseCount * 0.8);
    return baseCount;
  }, [config.count]);

  const drawShape = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number, shape: string) => {
    switch (shape) {
      case 'star':
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const px = x + Math.cos(angle) * size;
          const py = y + Math.sin(angle) * size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size * 0.866, y + size * 0.5);
        ctx.lineTo(x + size * 0.866, y + size * 0.5);
        ctx.closePath();
        break;
      case 'square':
        ctx.beginPath();
        ctx.rect(x - size / 2, y - size / 2, size, size);
        break;
      default:
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
    }
  }, []);

  useEffect(() => {
    if (!settings.showParticles) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const particleCount = getParticleCountForScreen();
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * config.speed,
        vy: (Math.random() - 0.5) * config.speed,
        size: config.minSize + Math.random() * (config.maxSize - config.minSize),
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        opacity: config.opacity.min + Math.random() * (config.opacity.max - config.opacity.min),
        targetOpacity: config.opacity.min + Math.random() * (config.opacity.max - config.opacity.min),
        angle: angle,
        angleSpeed: (Math.random() - 0.5) * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (config.mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    let lastTime = performance.now();
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      lastTime = currentTime - (deltaTime % frameInterval);

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      particlesRef.current.forEach((particle, index) => {
        particle.pulsePhase += particle.pulseSpeed;
        const pulseFactor = 0.5 + Math.sin(particle.pulsePhase) * 0.5;
        particle.opacity += (particle.targetOpacity - particle.opacity) * 0.05;

        if (Math.random() < 0.005) {
          particle.targetOpacity = config.opacity.min + Math.random() * (config.opacity.max - config.opacity.min);
        }

        switch (config.direction) {
          case 'up':
            particle.y -= config.speed * (1 + pulseFactor * 0.5);
            if (particle.y < -10) {
              particle.y = height + 10;
              particle.x = Math.random() * width;
            }
            break;
          case 'down':
            particle.y += config.speed * (1 + pulseFactor * 0.5);
            if (particle.y > height + 10) {
              particle.y = -10;
              particle.x = Math.random() * width;
            }
            break;
          case 'left':
            particle.x -= config.speed * (1 + pulseFactor * 0.5);
            if (particle.x < -10) {
              particle.x = width + 10;
              particle.y = Math.random() * height;
            }
            break;
          case 'right':
            particle.x += config.speed * (1 + pulseFactor * 0.5);
            if (particle.x > width + 10) {
              particle.x = -10;
              particle.y = Math.random() * height;
            }
            break;
          case 'radial':
            particle.angle += particle.angleSpeed;
            const radialSpeed = config.speed * 0.5;
            particle.x += Math.cos(particle.angle) * radialSpeed;
            particle.y += Math.sin(particle.angle) * radialSpeed;

            const distFromCenter = Math.sqrt(
              Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2)
            );
            if (distFromCenter > Math.max(width, height) * 0.7) {
              particle.x = centerX + (Math.random() - 0.5) * 100;
              particle.y = centerY + (Math.random() - 0.5) * 100;
            }
            break;
          case 'random':
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (Math.random() < 0.02) {
              particle.vx = (Math.random() - 0.5) * config.speed * 2;
              particle.vy = (Math.random() - 0.5) * config.speed * 2;
            }

            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;
            break;
        }

        if (config.mouseInteraction && mouseRef.current.active) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.mouseRadius) {
            const force = (config.mouseRadius - dist) / config.mouseRadius;
            const angle = Math.atan2(dy, dx);
            particle.x += Math.cos(angle) * force * 2;
            particle.y += Math.sin(angle) * force * 2;
          }
        }

        if (config.trail && config.trailLength > 0) {
          const gradient = ctx.createLinearGradient(
            particle.x,
            particle.y,
            particle.x - particle.vx * config.trailLength,
            particle.y - particle.vy * config.trailLength
          );
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, 'transparent');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = particle.size;
          ctx.globalAlpha = particle.opacity * 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(
            particle.x - particle.vx * config.trailLength,
            particle.y - particle.vy * config.trailLength
          );
          ctx.stroke();
        }

        if (config.connectLines && config.connectDistance > 0) {
          for (let j = index + 1; j < particlesRef.current.length; j++) {
            const other = particlesRef.current[j];
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < config.connectDistance) {
              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = (1 - dist / config.connectDistance) * 0.15;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        }

        ctx.globalAlpha = particle.opacity;

        if (config.glow) {
          ctx.shadowBlur = particle.size * 3;
          ctx.shadowColor = particle.color;
        }

        ctx.fillStyle = particle.color;
        drawShape(ctx, particle.x, particle.y, particle.size * (0.8 + pulseFactor * 0.4), config.shape);
        ctx.fill();

        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
    };

    animate(performance.now());

    return () => {
      window.removeEventListener('resize', resize);
      if (config.mouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, [config, settings.showParticles, getParticleCountForScreen, drawShape]);

  if (!settings.showParticles) {
    return showOverlay ? <div className={`${styles.staticOverlay} ${className || ''}`} /> : null;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`${styles.canvas} ${className || ''}`}
        aria-hidden="true"
      />
      {showOverlay && <div className={styles.gradientOverlay} />}
    </>
  );
}

export const PAGE_PARTICLE_PRESETS: Record<string, ParticlePreset> = {
  ai: 'nebula',
  projects: 'galaxy',
  blog: 'starfield',
  contact: 'fireflies',
  news: 'aurora',
  resume: 'starfield',
  tools: 'matrix',
  'contact-unavailable': 'comets',
};
