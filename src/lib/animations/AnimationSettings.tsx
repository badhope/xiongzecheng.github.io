'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AnimationSettings.module.css';

type AnimationIntensity = 'low' | 'medium' | 'high';

export interface AnimationSettings {
  enabled: boolean;
  intensity: AnimationIntensity;
  particles: boolean;
  pageTransitions: boolean;
  hoverEffects: boolean;
  scrollAnimations: boolean;
}

const defaultSettings: AnimationSettings = {
  enabled: true,
  intensity: 'medium',
  particles: true,
  pageTransitions: true,
  hoverEffects: true,
  scrollAnimations: true,
};

const STORAGE_KEY = 'cosmic-animation-settings';

export function useAnimationSettings() {
  const [settings, setSettings] = useState<AnimationSettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed });
      } catch {
        setSettings(defaultSettings);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, mounted]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setSettings(prev => ({ ...prev, enabled: false }));
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setSettings(prev => ({ ...prev, enabled: false }));
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const updateSettings = (updates: Partial<AnimationSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return { settings, updateSettings, mounted };
}

interface AnimationSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnimationSettingsPanel({ isOpen, onClose }: AnimationSettingsPanelProps) {
  const { settings, updateSettings } = useAnimationSettings();

  const intensityLevels: { value: AnimationIntensity; label: string; desc: string }[] = [
    { value: 'low', label: '低', desc: '减少动画，提升性能' },
    { value: 'medium', label: '中', desc: '平衡动画效果与性能' },
    { value: 'high', label: '高', desc: '完整动画体验' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className={styles.header}>
              <h3 className={styles.title}>动画设置</h3>
              <button className={styles.closeBtn} onClick={onClose}>
                ✕
              </button>
            </div>

            <div className={styles.content}>
              <div className={styles.section}>
                <div className={styles.toggleRow}>
                  <div>
                    <span className={styles.toggleLabel}>启用动画</span>
                    <span className={styles.toggleDesc}>全局动画开关</span>
                  </div>
                  <button
                    className={`${styles.toggle} ${settings.enabled ? styles.active : ''}`}
                    onClick={() => updateSettings({ enabled: !settings.enabled })}
                  >
                    <span className={styles.toggleKnob} />
                  </button>
                </div>
              </div>

              <div className={`${styles.section} ${!settings.enabled ? styles.disabled : ''}`}>
                <span className={styles.sectionTitle}>动画强度</span>
                <div className={styles.intensityGrid}>
                  {intensityLevels.map((level) => (
                    <button
                      key={level.value}
                      className={`${styles.intensityBtn} ${settings.intensity === level.value ? styles.active : ''}`}
                      onClick={() => updateSettings({ intensity: level.value })}
                      disabled={!settings.enabled}
                    >
                      <span className={styles.intensityLabel}>{level.label}</span>
                      <span className={styles.intensityDesc}>{level.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`${styles.section} ${!settings.enabled ? styles.disabled : ''}`}>
                <span className={styles.sectionTitle}>动画类型</span>

                <div className={styles.toggleRow}>
                  <div>
                    <span className={styles.toggleLabel}>粒子背景</span>
                    <span className={styles.toggleDesc}>页面粒子动态效果</span>
                  </div>
                  <button
                    className={`${styles.toggle} ${settings.particles ? styles.active : ''}`}
                    onClick={() => updateSettings({ particles: !settings.particles })}
                    disabled={!settings.enabled}
                  >
                    <span className={styles.toggleKnob} />
                  </button>
                </div>

                <div className={styles.toggleRow}>
                  <div>
                    <span className={styles.toggleLabel}>页面过渡</span>
                    <span className={styles.toggleDesc}>页面切换动画</span>
                  </div>
                  <button
                    className={`${styles.toggle} ${settings.pageTransitions ? styles.active : ''}`}
                    onClick={() => updateSettings({ pageTransitions: !settings.pageTransitions })}
                    disabled={!settings.enabled}
                  >
                    <span className={styles.toggleKnob} />
                  </button>
                </div>

                <div className={styles.toggleRow}>
                  <div>
                    <span className={styles.toggleLabel}>悬停效果</span>
                    <span className={styles.toggleDesc}>鼠标悬停动画</span>
                  </div>
                  <button
                    className={`${styles.toggle} ${settings.hoverEffects ? styles.active : ''}`}
                    onClick={() => updateSettings({ hoverEffects: !settings.hoverEffects })}
                    disabled={!settings.enabled}
                  >
                    <span className={styles.toggleKnob} />
                  </button>
                </div>

                <div className={styles.toggleRow}>
                  <div>
                    <span className={styles.toggleLabel}>滚动动画</span>
                    <span className={styles.toggleDesc}>滚动触发效果</span>
                  </div>
                  <button
                    className={`${styles.toggle} ${settings.scrollAnimations ? styles.active : ''}`}
                    onClick={() => updateSettings({ scrollAnimations: !settings.scrollAnimations })}
                    disabled={!settings.enabled}
                  >
                    <span className={styles.toggleKnob} />
                  </button>
                </div>
              </div>

              <div className={styles.section}>
                <button
                  className={styles.resetBtn}
                  onClick={() => updateSettings(defaultSettings)}
                >
                  重置为默认设置
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface AnimationSettingsButtonProps {
  onClick: () => void;
}

export function AnimationSettingsButton({ onClick }: AnimationSettingsButtonProps) {
  return (
    <motion.button
      className={styles.settingsBtn}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="动画设置"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    </motion.button>
  );
}

export function getAnimationConfig(intensity: AnimationIntensity) {
  const configs = {
    low: {
      duration: 0.2,
      stagger: 0.02,
      distance: 10,
      scale: 0.98,
      particleCount: 0.3,
      blur: 5,
    },
    medium: {
      duration: 0.4,
      stagger: 0.05,
      distance: 20,
      scale: 0.95,
      particleCount: 0.6,
      blur: 10,
    },
    high: {
      duration: 0.6,
      stagger: 0.08,
      distance: 30,
      scale: 0.9,
      particleCount: 1,
      blur: 15,
    },
  };

  return configs[intensity];
}

export function shouldShowAnimation(
  settings: AnimationSettings,
  animationType: keyof Pick<AnimationSettings, 'particles' | 'pageTransitions' | 'hoverEffects' | 'scrollAnimations'>
): boolean {
  if (!settings.enabled) return false;
  return settings[animationType];
}
