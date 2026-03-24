'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import styles from './resume.module.css';

const skills = {
  zh: {
    frontend: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Tailwind CSS', 'Sass'],
    backend: ['Node.js', 'Python', 'Java', 'Go', 'Express', 'FastAPI', 'Spring Boot'],
    ai: ['PyTorch', 'TensorFlow', 'LangChain', 'OpenAI API', 'Hugging Face', 'Scikit-learn'],
    bigdata: ['Spark', 'Hadoop', 'Kafka', 'Elasticsearch', 'Flink', 'ClickHouse'],
    devops: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS', 'Nginx', 'Linux'],
    database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'ClickHouse'],
  },
  en: {
    frontend: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Tailwind CSS', 'Sass'],
    backend: ['Node.js', 'Python', 'Java', 'Go', 'Express', 'FastAPI', 'Spring Boot'],
    ai: ['PyTorch', 'TensorFlow', 'LangChain', 'OpenAI API', 'Hugging Face', 'Scikit-learn'],
    bigdata: ['Spark', 'Hadoop', 'Kafka', 'Elasticsearch', 'Flink', 'ClickHouse'],
    devops: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS', 'Nginx', 'Linux'],
    database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'ClickHouse'],
  },
};

const skillCategories = [
  { key: 'frontend' as const, labelZh: '前端开发', labelEn: 'Frontend', icon: '🎨' },
  { key: 'backend' as const, labelZh: '后端开发', labelEn: 'Backend', icon: '⚙️' },
  { key: 'ai' as const, labelZh: 'AI / 机器学习', labelEn: 'AI / ML', icon: '🤖' },
  { key: 'bigdata' as const, labelZh: '大数据', labelEn: 'Big Data', icon: '📊' },
  { key: 'devops' as const, labelZh: 'DevOps', labelEn: 'DevOps', icon: '🔧' },
  { key: 'database' as const, labelZh: '数据库', labelEn: 'Database', icon: '🗄️' },
];

export default function ResumePage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const currentSkills = isZh ? skills.zh : skills.en;

  return (
    <div className={styles.page}>
      <StarNavigation />

      <main className={styles.main}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.tag}>{isZh ? '// 简历' : '// Resume'}</span>
          <h1 className={styles.title}>{isZh ? '星际档案' : 'Stellar Profile'}</h1>
          <p className={styles.subtitle}>badhope</p>
        </motion.div>

        {/* Profile Summary */}
        <motion.div
          className={styles.profileCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.profileHeader}>
            <span className={styles.profileIcon}>⭐</span>
            <div>
              <h2 className={styles.profileName}>badhope</h2>
              <p className={styles.profileTitle}>
                {isZh ? '全栈开发者 · AI 探索者 · 代码创造者' : 'Full-Stack Developer · AI Explorer · Code Creator'}
              </p>
            </div>
          </div>
          <p className={styles.profileBio}>
            {isZh
              ? '在职开发者，专注于全栈开发和人工智能领域。拥有从前端到后端、从数据科学到机器学习的完整技术栈经验。热衷于探索前沿技术，用代码构建创新解决方案。'
              : 'Developer focused on full-stack development and AI. Experienced with the complete tech stack from frontend to backend, data science to machine learning. Passionate about exploring cutting-edge technology and building innovative solutions with code.'}
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          className={styles.skillsSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className={styles.sectionTitle}>
            {isZh ? '🛠️ 技术装备' : '🛠️ Tech Arsenal'}
          </h2>
          <div className={styles.skillsGrid}>
            {skillCategories.map((cat, index) => (
              <motion.div
                key={cat.key}
                className={styles.skillCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -4, borderColor: 'rgba(212, 175, 55, 0.3)' }}
              >
                <div className={styles.skillCardHeader}>
                  <span className={styles.skillIcon}>{cat.icon}</span>
                  <h3>{isZh ? cat.labelZh : cat.labelEn}</h3>
                </div>
                <div className={styles.skillTags}>
                  {currentSkills[cat.key].map(skill => (
                    <span key={skill} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className={styles.timelineSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className={styles.sectionTitle}>
            {isZh ? '📅 航行日志' : '📅 Voyage Log'}
          </h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <span className={styles.timelineYear}>2024</span>
                <h3>{isZh ? '数据科学启航' : 'Data Science Journey'}</h3>
                <p>{isZh ? '系统学习数据科学与大数据技术' : 'Systematically studied data science and big data'}</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineContent}>
                <span className={styles.timelineYear}>2025</span>
                <h3>{isZh ? '全栈开发' : 'Full-Stack Development'}</h3>
                <p>{isZh ? '掌握完整技术栈，构建真实项目' : 'Mastered full tech stack, built real projects'}</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={`${styles.timelineDot} ${styles.dotActive}`} />
              <div className={styles.timelineContent}>
                <span className={styles.timelineYear}>2026</span>
                <h3>{isZh ? 'AI + 全栈深入' : 'AI + Full-Stack Deep Dive'}</h3>
                <p>{isZh ? '深入AI与全栈融合，持续学习成长' : 'Deep diving into AI + full-stack, continuously learning'}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
