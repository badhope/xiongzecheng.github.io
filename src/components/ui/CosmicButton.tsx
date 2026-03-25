'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CosmicButton.module.css';

interface CosmicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'cosmic';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  fullWidth?: boolean;
}

const rippleVariants = {
  initial: {
    scale: 0,
    opacity: 0.5,
  },
  animate: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const glowVariants = {
  initial: {
    boxShadow: '0 0 0px rgba(212, 175, 55, 0)',
  },
  hover: {
    boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    boxShadow: '0 0 50px rgba(212, 175, 55, 0.5)',
    transition: {
      duration: 0.1,
    },
  },
};

export default function CosmicButton({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className = '',
  fullWidth = false,
}: CosmicButtonProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || loading) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.();
  };

  const buttonContent = (
    <>
      {loading && (
        <motion.span
          className={styles.spinner}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          ⚡
        </motion.span>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className={styles.icon}>{icon}</span>
      )}
      
      <span className={styles.text}>{children}</span>
      
      {icon && iconPosition === 'right' && !loading && (
        <span className={styles.icon}>{icon}</span>
      )}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className={styles.ripple}
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            variants={rippleVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {variant === 'cosmic' && isHovered && (
        <motion.div
          className={styles.cosmicGlow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.star} style={{ left: '20%', top: '30%' }} />
          <div className={styles.star} style={{ left: '70%', top: '60%' }} />
          <div className={styles.star} style={{ left: '40%', top: '80%' }} />
        </motion.div>
      )}
    </>
  );

  const buttonClasses = `
    ${styles.button}
    ${styles[variant]}
    ${styles[size]}
    ${disabled ? styles.disabled : ''}
    ${loading ? styles.loading : ''}
    ${fullWidth ? styles.fullWidth : ''}
    ${className}
  `.trim();

  const motionProps = {
    whileHover: disabled || loading ? undefined : { scale: 1.02 },
    whileTap: disabled || loading ? undefined : { scale: 0.98 },
    variants: variant === 'cosmic' ? glowVariants : undefined,
    initial: 'initial',
    whileFocus: 'hover',
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        {...motionProps}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled || loading}
      className={buttonClasses}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...motionProps}
    >
      {buttonContent}
    </motion.button>
  );
}

interface CosmicLinkProps {
  children: ReactNode;
  href: string;
  external?: boolean;
  underline?: boolean;
  className?: string;
}

export function CosmicLink({
  children,
  href,
  external = false,
  underline = true,
  className = '',
}: CosmicLinkProps) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`${styles.cosmicLink} ${underline ? styles.underline : ''} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={styles.linkText}>{children}</span>
      <motion.span
        className={styles.linkArrow}
        initial={{ x: 0, opacity: 0.5 }}
        whileHover={{ x: 4, opacity: 1 }}
      >
        →
      </motion.span>
      {underline && (
        <motion.span
          className={styles.linkUnderline}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.a>
  );
}

interface CosmicCardProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export function CosmicCard({
  children,
  onClick,
  href,
  className = '',
  glow = true,
  hover = true,
}: CosmicCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardContent = (
    <>
      {children}
      {glow && isHovered && (
        <motion.div
          className={styles.cardGlow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </>
  );

  const cardClasses = `${styles.cosmicCard} ${hover ? styles.hoverable : ''} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
        whileTap={hover ? { scale: 0.99 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {cardContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      onClick={onClick}
      className={cardClasses}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      whileTap={hover ? { scale: 0.99 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {cardContent}
    </motion.div>
  );
}
