'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './AboutSection.module.css';

const timeline = [
  {
    year: '2024',
    titleZh: '数据科学启航',
    titleEn: 'Data Science Journey',
    descZh: '系统学习数据科学与大数据技术，探索数据的无限可能',
    descEn: 'Systematically studied data science and big data technologies',
  },
  {
    year: '2025',
    titleZh: '全栈开发',
    titleEn: 'Full-Stack Development',
    descZh: '掌握前端到后端的完整技术栈，构建真实项目',
    descEn: 'Mastered the complete tech stack from frontend to backend',
  },
  {
    year: '2026',
    titleZh: 'AI + 全栈深入',
    titleEn: 'AI + Full-Stack Deep Dive',
    descZh: '深入AI与全栈开发的融合，持续学习，持续成长',
    descEn: 'Deep diving into AI + full-stack integration, continuously learning and growing',
  },
];

const skills = [
  { categoryZh: '前端', categoryEn: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS'] },
  { categoryZh: '后端', categoryEn: 'Backend', items: ['Node.js', 'Python', 'Java', 'Go', 'Rust'] },
  { categoryZh: 'AI/ML', categoryEn: 'AI/ML', items: ['PyTorch', 'TensorFlow', 'LangChain', 'OpenAI API', 'Hugging Face'] },
  { categoryZh: '大数据', categoryEn: 'Big Data', items: ['Spark', 'Hadoop', 'Kafka', 'Elasticsearch', 'Redis'] },
  { categoryZh: 'DevOps', categoryEn: 'DevOps', items: ['Docker', 'K8s', 'CI/CD', 'AWS', 'Linux'] },
  { categoryZh: '数据库', categoryEn: 'Database', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'ClickHouse'] },
];

export default function AboutSection() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <section id="about-section" className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionTag}>
            {isZh ? '// 关于我' : '// About Me'}
          </span>
          <h2 className={styles.sectionTitle}>
            {isZh ? '星际旅者档案' : 'Star Traveler Profile'}
          </h2>
          <div className={styles.divider} />
        </motion.div>

        {/* Bio */}
        <motion.div
          className={styles.bio}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.bioCard}>
            <div className={styles.bioIcon}>⭐</div>
            <p className={styles.bioText}>
              {isZh
                ? '一名在职开发者，穿梭于代码与星辰之间。从前端到后端，从数据科学到人工智能，始终保持着对技术的好奇心和探索欲。相信每一行代码都是通往未来的星轨，每一个项目都是一次星际航行。'
                : 'A developer navigating between code and stars. From frontend to backend, from data science to AI, always maintaining curiosity and a desire to explore technology. Believing every line of code is a star trail to the future, every project an interstellar voyage.'}
            </p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className={styles.timeline}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className={styles.timelineTitle}>
            {isZh ? '📅 航行日志' : '📅 Voyage Log'}
          </h3>
          <div className={styles.timelineItems}>
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <div className={styles.timelineDot} />
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineContent}>
                  <h4>{isZh ? item.titleZh : item.titleEn}</h4>
                  <p>{isZh ? item.descZh : item.descEn}</p>
                </div>
              </motion.div>
            ))}
            <motion.div
              className={`${styles.timelineItem} ${styles.timelineOngoing}`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className={`${styles.timelineDot} ${styles.dotActive}`} />
              <div className={styles.timelineYear}>∞</div>
              <div className={styles.timelineContent}>
                <h4>{isZh ? '持续探索中...' : 'Continuing to explore...'}</h4>
                <p>{isZh ? '用技术创造价值，用代码书写未来' : 'Creating value with technology, writing the future with code'}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className={styles.skills}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className={styles.skillsTitle}>
            {isZh ? '🛠️ 技术装备库' : '🛠️ Tech Arsenal'}
          </h3>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.categoryEn}
                className={styles.skillCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ y: -4, borderColor: 'rgba(212, 175, 55, 0.4)' }}
              >
                <h4 className={styles.skillCategory}>
                  {isZh ? skill.categoryZh : skill.categoryEn}
                </h4>
                <div className={styles.skillTags}>
                  {skill.items.map((item) => (
                    <span key={item} className={styles.skillTag}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
