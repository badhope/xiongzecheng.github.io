'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import { socialLinks, siteConfig, contactForm } from '@/data/config';
import styles from './contact.module.css';

export default function ContactPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(contactForm.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `[Starbase] New message from ${formData.name}`,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className={styles.page}>
      <StarNavigation />

      <main className={styles.main}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.tag}>{isZh ? '// 联系我' : '// Contact'}</span>
          <h1 className={styles.title}>{isZh ? '星际通讯' : 'Stellar Comm'}</h1>
          <p className={styles.subtitle}>
            {isZh ? '无论你想聊技术、合作还是随便聊聊，都欢迎联系我' : 'Whether you want to chat about tech, collaborate, or just say hi'}
          </p>
        </motion.div>

        <div className={styles.grid}>
          {/* Contact Form */}
          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className={styles.cardTitle}>{isZh ? '发送消息' : 'Send Message'}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>{isZh ? '名字' : 'Name'}</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder={isZh ? '你的名字' : 'Your name'}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{isZh ? '邮箱' : 'Email'}</label>
                <input
                  type="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder={isZh ? '你的邮箱' : 'Your email'}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{isZh ? '消息' : 'Message'}</label>
                <textarea
                  className={styles.textarea}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  placeholder={isZh ? '你想说什么...' : 'What do you want to say...'}
                />
              </div>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'sending'}
              >
                {status === 'sending'
                  ? (isZh ? '发送中...' : 'Sending...')
                  : (isZh ? '🚀 发送消息' : '🚀 Send Message')}
              </button>
              {status === 'success' && (
                <motion.p
                  className={styles.success}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✅ {isZh ? '消息已发送！' : 'Message sent!'}
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  className={styles.error}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ❌ {isZh ? '发送失败，请稍后重试' : 'Failed to send, please try again'}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className={styles.socialCard}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className={styles.cardTitle}>{isZh ? '社交平台' : 'Social Platforms'}</h2>
            <div className={styles.socialList}>
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.active ? link.url : undefined}
                  className={`${styles.socialItem} ${!link.active ? styles.inactive : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!link.active) {
                      e.preventDefault();
                    }
                  }}
                >
                  <span className={styles.socialIcon}>{link.icon}</span>
                  <div className={styles.socialInfo}>
                    <span className={styles.socialName}>{link.platform}</span>
                    <span className={styles.socialStatus}>
                      {link.active
                        ? (isZh ? '已连接' : 'Connected')
                        : (isZh ? '请联系获取' : 'Contact for access')}
                    </span>
                  </div>
                  {!link.active && <span className={styles.lockIcon}>🔒</span>}
                  {link.active && <span className={styles.arrowIcon}>→</span>}
                </a>
              ))}
            </div>

            {/* Email */}
            <div className={styles.emailSection}>
              <h3 className={styles.emailTitle}>📧 Email</h3>
              <a href={`mailto:${siteConfig.email}`} className={styles.emailLink}>
                {siteConfig.email}
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
