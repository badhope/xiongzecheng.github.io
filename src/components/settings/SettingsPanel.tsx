'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings, SiteSettings } from '@/lib/settings/SettingsContext';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './SettingsPanel.module.css';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { language } = useLanguage();
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
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <h2>{isZh ? '⚙️ 设置' : '⚙️ Settings'}</h2>
              <button className={styles.closeBtn} onClick={onClose}>✕</button>
            </div>

            <div className={styles.content}>
              {/* Animations */}
              <section className={styles.section}>
                <h3>{isZh ? '🎬 动画效果' : '🎬 Animations'}</h3>
                <div className={styles.toggleRow}>
                  <span>{isZh ? '启用动画' : 'Enable Animations'}</span>
                  <button
                    className={`${styles.toggle} ${settings.animationsEnabled ? styles.active : ''}`}
                    onClick={() => updateSettings({ animationsEnabled: !settings.animationsEnabled })}
                  >
                    <span className={styles.toggleThumb} />
                  </button>
                </div>
                <div className={styles.toggleRow}>
                  <span>{isZh ? '粒子效果' : 'Particle Effects'}</span>
                  <button
                    className={`${styles.toggle} ${settings.showParticles ? styles.active : ''}`}
                    onClick={() => updateSettings({ showParticles: !settings.showParticles })}
                  >
                    <span className={styles.toggleThumb} />
                  </button>
                </div>
                <div className={styles.selectRow}>
                  <span>{isZh ? '过渡风格' : 'Transition Style'}</span>
                  <select
                    className={styles.select}
                    value={settings.transitionStyle}
                    onChange={(e) => updateSettings({ transitionStyle: e.target.value as SiteSettings['transitionStyle'] })}
                  >
                    <option value="warp">{isZh ? '星际穿越' : 'Warp Speed'}</option>
                    <option value="fade">{isZh ? '淡入淡出' : 'Fade'}</option>
                    <option value="none">{isZh ? '无动画' : 'None'}</option>
                  </select>
                </div>
              </section>

              {/* Sound */}
              <section className={styles.section}>
                <h3>{isZh ? '🔊 声音' : '🔊 Sound'}</h3>
                <div className={styles.toggleRow}>
                  <span>{isZh ? '启用声音' : 'Enable Sound'}</span>
                  <button
                    className={`${styles.toggle} ${settings.soundEnabled ? styles.active : ''}`}
                    onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                  >
                    <span className={styles.toggleThumb} />
                  </button>
                </div>
                {settings.soundEnabled && (
                  <div className={styles.sliderRow}>
                    <span>{isZh ? '音量' : 'Volume'}</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.soundVolume}
                      onChange={(e) => updateSettings({ soundVolume: parseFloat(e.target.value) })}
                      className={styles.slider}
                    />
                    <span className={styles.volumeValue}>{Math.round(settings.soundVolume * 100)}%</span>
                  </div>
                )}
              </section>

              {/* Background Music Placeholder */}
              <section className={styles.section}>
                <h3>{isZh ? '🎵 背景音乐' : '🎵 Background Music'}</h3>
                <div className={styles.placeholder}>
                  <p>{isZh ? '音乐文件占位 - 请配置音频链接' : 'Music placeholder - Configure audio URL'}</p>
                  <code className={styles.code}>
                    {isZh ? '在 src/data/config.ts 中设置 bgMusicUrl' : 'Set bgMusicUrl in src/data/config.ts'}
                  </code>
                </div>
              </section>

              {/* Reset */}
              <section className={styles.section}>
                <button className={styles.resetBtn} onClick={resetSettings}>
                  {isZh ? '🔄 恢复默认设置' : '🔄 Reset to Defaults'}
                </button>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
