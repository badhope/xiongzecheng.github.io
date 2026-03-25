'use client';

import { ReactNode, useEffect, useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

type AnimationIntensity = 'low' | 'medium' | 'high';

interface AnimationContextType {
  intensity: AnimationIntensity;
  showAnimations: boolean;
  setIntensity: (intensity: AnimationIntensity) => void;
  setShowAnimations: (show: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType>({
  intensity: 'medium',
  showAnimations: true,
  setIntensity: () => {},
  setShowAnimations: () => {},
});

export const useAnimation = () => useContext(AnimationContext);

const intensityConfigs = {
  low: {
    duration: 0.2,
    stagger: 0.02,
    distance: 10,
    scale: 0.98,
  },
  medium: {
    duration: 0.4,
    stagger: 0.05,
    distance: 20,
    scale: 0.95,
  },
  high: {
    duration: 0.6,
    stagger: 0.08,
    distance: 30,
    scale: 0.9,
  },
};

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
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: 'blur(10px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const starRevealVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: 'brightness(0.5)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'brightness(1)',
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const cosmicSlideVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * 50,
    rotateY: direction * 15,
  }),
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -50,
    rotateY: direction * -15,
    transition: {
      duration: 0.3,
    },
  }),
};

interface AnimationProviderProps {
  children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [intensity, setIntensity] = useState<AnimationIntensity>('medium');
  const [showAnimations, setShowAnimations] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedIntensity = localStorage.getItem('animation-intensity') as AnimationIntensity;
    const savedShowAnimations = localStorage.getItem('show-animations');
    
    if (savedIntensity && ['low', 'medium', 'high'].includes(savedIntensity)) {
      setIntensity(savedIntensity);
    }
    if (savedShowAnimations !== null) {
      setShowAnimations(savedShowAnimations === 'true');
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('animation-intensity', intensity);
      localStorage.setItem('show-animations', String(showAnimations));
    }
  }, [intensity, showAnimations, mounted]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setShowAnimations(false);
    }
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setShowAnimations(false);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <AnimationContext.Provider value={{ intensity, showAnimations, setIntensity, setShowAnimations }}>
      {children}
    </AnimationContext.Provider>
  );
}

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  const { showAnimations } = useAnimation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={showAnimations ? 'initial' : false}
        animate="enter"
        exit={showAnimations ? 'exit' : undefined}
        variants={pageTransitionVariants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface StarRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function StarReveal({ children, delay = 0, className }: StarRevealProps) {
  const { showAnimations, intensity } = useAnimation();
  const config = intensityConfigs[intensity];

  return (
    <motion.div
      initial={showAnimations ? 'hidden' : false}
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={starRevealVariants}
      transition={{ delay: delay * config.stagger }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface CosmicSlideProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
}

export function CosmicSlide({ children, direction = 'up', delay = 0, className }: CosmicSlideProps) {
  const { showAnimations, intensity } = useAnimation();
  const config = intensityConfigs[intensity];
  
  const directionValue = direction === 'left' ? -1 : direction === 'right' ? 1 : direction === 'up' ? -1 : 1;
  const isHorizontal = direction === 'left' || direction === 'right';

  const variants = {
    hidden: {
      opacity: 0,
      [isHorizontal ? 'x' : 'y']: directionValue * config.distance,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: config.duration,
        delay: delay * config.stagger,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      initial={showAnimations ? 'hidden' : false}
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ children, staggerDelay = 0.1, className }: StaggerContainerProps) {
  const { showAnimations, intensity } = useAnimation();
  const config = intensityConfigs[intensity];

  return (
    <motion.div
      initial={showAnimations ? 'hidden' : false}
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay * config.stagger * 10,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const { showAnimations } = useAnimation();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PulseGlowProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function PulseGlow({ children, color = '#d4af37', className }: PulseGlowProps) {
  const { showAnimations } = useAnimation();

  return (
    <motion.div
      animate={showAnimations ? {
        boxShadow: [
          `0 0 10px ${color}20`,
          `0 0 25px ${color}40`,
          `0 0 10px ${color}20`,
        ],
      } : undefined}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({ children, scale = 1.02, className }: HoverScaleProps) {
  const { showAnimations } = useAnimation();

  return (
    <motion.div
      whileHover={showAnimations ? { scale } : undefined}
      whileTap={showAnimations ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HoverGlowProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function HoverGlow({ children, color = '#d4af37', className }: HoverGlowProps) {
  const { showAnimations } = useAnimation();

  return (
    <motion.div
      whileHover={showAnimations ? {
        boxShadow: `0 0 30px ${color}30`,
        borderColor: `${color}60`,
      } : undefined}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScrollParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ScrollParallax({ children, speed = 0.5, className }: ScrollParallaxProps) {
  const { showAnimations } = useAnimation();

  if (!showAnimations) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{
        y: -20 * speed,
      }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, ease: 'linear' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface TypewriterEffectProps {
  text: string;
  delay?: number;
  className?: string;
}

export function TypewriterEffect({ text, delay = 0.05, className }: TypewriterEffectProps) {
  const { showAnimations } = useAnimation();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!showAnimations) {
      setDisplayText(text);
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay, showAnimations]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && showAnimations && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

interface CounterAnimationProps {
  value: number;
  duration?: number;
  className?: string;
}

export function CounterAnimation({ value, duration = 2, className }: CounterAnimationProps) {
  const { showAnimations } = useAnimation();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!showAnimations) {
      setDisplayValue(value);
      return;
    }

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
  }, [value, duration, showAnimations]);

  return <span className={className}>{displayValue}</span>;
}

export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: -10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 10 },
  },
  cosmic: {
    initial: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 1.02, filter: 'blur(10px)' },
  },
};

export { intensityConfigs };

export {
  useAnimationSettings,
  AnimationSettingsPanel,
  AnimationSettingsButton,
  getAnimationConfig,
  shouldShowAnimation,
} from './AnimationSettings';

export type { AnimationSettings } from './AnimationSettings';
