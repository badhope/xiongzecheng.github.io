'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './Projects.module.css';

const projectsStatic = [
  {
    id: 1,
    tags: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL'],
    emoji: '🛒',
    gradient: 'linear-gradient(135deg, #00d4ff, #bf5af2)',
    stars: 230,
    forks: 45,
    link: 'https://github.com/badhope',
  },
  {
    id: 2,
    tags: ['React', 'D3.js', 'Node.js', 'Redis'],
    emoji: '📊',
    gradient: 'linear-gradient(135deg, #bf5af2, #ff375f)',
    stars: 189,
    forks: 32,
    link: 'https://github.com/badhope',
  },
  {
    id: 3,
    tags: ['React Native', 'Firebase', 'Node.js'],
    emoji: '💬',
    gradient: 'linear-gradient(135deg, #ff375f, #ff6b35)',
    stars: 156,
    forks: 28,
    link: 'https://github.com/badhope',
  },
  {
    id: 4,
    tags: ['Python', 'Scrapy', 'MongoDB', 'Docker'],
    emoji: '🤖',
    gradient: 'linear-gradient(135deg, #30d158, #00d4ff)',
    stars: 312,
    forks: 67,
    link: 'https://github.com/badhope',
  },
];

export default function Projects() {
  const { t, language } = useLanguage();
  const projects = t.projects.projects;

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>{t.projects.label}</span>
          <h2 className={styles.title}>
            <span className="gradient-text">{t.projects.title}</span>
          </h2>
          <p className={styles.subtitle}>{t.projects.subtitle}</p>
        </motion.div>

        <div className={styles.grid}>
          {projects.map((project, index) => {
            const staticData = projectsStatic.find(p => p.id === project.id) || projectsStatic[0];
            return (
            <motion.a
              key={project.id}
              href={staticData.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div
                className={styles.cardGlow}
                style={{ background: staticData.gradient }}
              />
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <span className={styles.emoji}>{staticData.emoji}</span>
                  <div className={styles.cardStats}>
                    <span className={styles.stat}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 15.77l-6.18 3.25L7 12.14 2 7.27l6.91-1.01L12 0z"/>
                      </svg>
                      {staticData.stars}
                    </span>
                    <span className={styles.stat}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 2l2 6h8l2-6h-2v14H8V2H6zm2 2h4v4H8V4zm0 6h4v4H8v-4z"/>
                      </svg>
                      {staticData.forks}
                    </span>
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.cardTags}>
                  {staticData.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className={styles.cardArrow}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </div>
            </motion.a>
            );
          })}
        </div>

        <motion.div
          className={styles.moreLink}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://github.com/badhope"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>{language === 'zh' ? '查看更多项目' : 'View More Projects'}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}