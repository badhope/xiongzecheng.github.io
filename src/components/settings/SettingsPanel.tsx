'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useSettings } from '@/lib/settings/SettingsContext';
import styles from './SettingsPanel.module.css';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { language, setLanguage, t } = useLanguage();
  const { settings, updateSettings } = useSettings();

  const isZh = language === 'zh';

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
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>⚙️ {isZh ? '设置' : 'Settings'}</h2>
              <button className={styles.closeBtn} onClick={onClose}>✕</button>
            </div>

            <div className={styles.content}>
              {/* Language Switcher - 核心功能 */}
              <div className={styles.settingGroup}>
                <div className={styles.sectionTitle}>🌐 {isZh ? '语言' : 'Language'}</div>
                <div className={styles.languageSwitcher}>
                  <button
                    className={`${styles.langBtn} ${language === 'zh' ? styles.langActive : ''}`}
                    onClick={() => setLanguage('zh')}
                  >
                    <span className={styles.langFlag}>🇨🇳</span>
                    <span className={styles.langLabel}>{isZh ? '中文' : 'Chinese'}</span>
                  </button>
                  <button
                    className={`${styles.langBtn} ${language === 'en' ? styles.langActive : ''}`}
                    onClick={() => setLanguage('en')}
                  >
                    <span className={styles.langFlag}>🇺🇸</span>
                    <span className={styles.langLabel}>English</span>
                  </button>
                </div>
                <p className={styles.settingDesc}>
                  {isZh ? '✓ 当前语言已保存，下次访问自动应用' : '✓ Language preference saved for next visit'}
                </p>
              </div>

              <div className={styles.divider} />

              {/* Animation toggle */}
              <div className={styles.settingGroup}>
                <div className={styles.settingRow}>
                  <div className={styles.settingInfo}>
                    <span className={styles.settingLabel}>✨ {isZh ? '动画效果' : 'Animations'}</span>
                    <span className={styles.settingDesc}>{isZh ? '开启/关闭页面动画' : 'Enable/disable page animations'}</span>
                  </div>
                  <button
                    className={`${styles.toggle} ${settings.showAnimations ? styles.toggleOn : ''}`}
                    onClick={() => updateSettings({ showAnimations: !settings.showAnimations })}
                  >
                    <div className={styles.toggleThumb} />
                  </button>
                </div>
              </div>

              {/* Particles toggle */}
              <div className={styles.settingGroup}>
                <div className={styles.settingRow}>
                  <div className={styles.settingInfo}>
                    <span className={styles.settingLabel}>✦ {isZh ? '粒子效果' : 'Particles'}</span>
                    <span className={styles.settingDesc}>{isZh ? '开启/关闭背景粒子' : 'Enable/disable background particles'}</span>
                  </div>
                  <button
                    className={`${styles.toggle} ${settings.showParticles ? styles.toggleOn : ''}`}
                    onClick={() => updateSettings({ showParticles: !settings.showParticles })}
                  >
                    <div className={styles.toggleThumb} />
                  </button>
                </div>
              </div>

              {/* Volume */}
              <div className={styles.settingGroup}>
                <div className={styles.settingRow}>
                  <div className={styles.settingInfo}>
                    <span className={styles.settingLabel}>🔊 {isZh ? '音量' : 'Volume'}</span>
                    <span className={styles.settingDesc}>{isZh ? '调整背景音乐音量' : 'Adjust background music volume'}</span>
                  </div>
                  <div className={styles.volumeControl}>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.volume ?? 50}
                      onChange={(e) => updateSettings({ volume: parseInt(e.target.value) })}
                      className={styles.volumeSlider}
                    />
                    <span className={styles.volumeValue}>{settings.volume ?? 50}%</span>
                  </div>
                </div>
              </div>

              {/* Version */}
              <div className={styles.version}>
                <span>badhope&apos;s Starbase</span>
                <span>v2.1 · 2026</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
