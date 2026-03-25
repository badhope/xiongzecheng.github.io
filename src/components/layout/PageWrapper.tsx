'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/lib/settings/SettingsContext';
import CosmicParticleBackground, { ParticlePreset, PAGE_PARTICLE_PRESETS } from '../effects/CosmicParticleBackground';
import styles from './PageWrapper.module.css';

interface PageWrapperProps {
  children: ReactNode;
  preset?: ParticlePreset;
  className?: string;
  showParticles?: boolean;
}

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(10px)',
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: 'blur(5px)',
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const starWipeVariants = {
  initial: {
    clipPath: 'circle(0% at 50% 50%)',
    opacity: 0,
  },
  enter: {
    clipPath: 'circle(150% at 50% 50%)',
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    clipPath: 'circle(0% at 50% 50%)',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PageWrapper({
  children,
  preset,
  className,
  showParticles = true,
}: PageWrapperProps) {
  const pathname = usePathname();
  const { settings } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activePreset = preset || PAGE_PARTICLE_PRESETS[pathname?.split('/')[1] || ''] || 'starfield';

  const animationIntensity = settings.reducedMotion ? 'low' : settings.showAnimations ? 'high' : 'medium';

  if (!mounted) {
    return <div className={styles.loadingPlaceholder} />;
  }

  return (
    <div className={`${styles.pageWrapper} ${className || ''}`}>
      {showParticles && settings.showParticles && (
        <CosmicParticleBackground
          preset={activePreset}
          intensity={animationIntensity}
          showOverlay={true}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className={styles.pageContent}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={settings.showAnimations ? pageTransitionVariants : undefined}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {settings.showAnimations && (
        <AnimatePresence>
          <motion.div
            key={`transition-${pathname}`}
            className={styles.transitionOverlay}
            initial="initial"
            animate="enter"
            exit="exit"
            variants={starWipeVariants}
          >
            <div className={styles.starsPattern} />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export function SectionContainer({
  children,
  className,
  delay = 0,
  fullWidth = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  fullWidth?: boolean;
}) {
  const { settings } = useSettings();

  return (
    <motion.section
      className={`${styles.section} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`}
      initial={settings.showAnimations ? { opacity: 0, y: 30 } : undefined}
      whileInView={settings.showAnimations ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.section>
  );
}

export function ContentCard({
  children,
  className,
  delay = 0,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}) {
  const { settings } = useSettings();

  return (
    <motion.div
      className={`${styles.contentCard} ${hover ? styles.hoverable : ''} ${className || ''}`}
      initial={settings.showAnimations ? { opacity: 0, y: 20, scale: 0.98 } : undefined}
      whileInView={settings.showAnimations ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={settings.showAnimations && hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={`${styles.staggerContainer} ${className || ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { settings } = useSettings();

  return (
    <motion.div
      className={`${styles.staggerItem} ${className || ''}`}
      variants={
        settings.showAnimations
          ? {
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
