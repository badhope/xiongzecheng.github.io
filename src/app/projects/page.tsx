'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import styles from './projects.module.css';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
  size: number;
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  C: '#555555',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Dart: '#00B4AB',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
};

export default function ProjectsPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRepo, setExpandedRepo] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/badhope/repos?sort=updated&per_page=100&type=owner');
        if (res.ok) {
          const data: GitHubRepo[] = await res.json();
          // Filter out forks and empty repos
          const filtered = data.filter(r => !r.fork && (r.description || r.language));
          setRepos(filtered);
        }
      } catch {
        // Fallback repos
        setRepos([]);
      }
      setLoading(false);
    };
    fetchRepos();
  }, []);

  const languages = ['all', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean) as string[]))];
  const filteredRepos = filter === 'all' ? repos : repos.filter(r => r.language === filter);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(isZh ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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
          <span className={styles.tag}>{isZh ? '// 作品集' : '// Projects'}</span>
          <h1 className={styles.title}>{isZh ? '星际项目库' : 'Stellar Projects'}</h1>
          <p className={styles.subtitle}>
            {isZh ? '从 GitHub 自动同步的项目仓库' : 'Auto-synced repositories from GitHub'}
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{repos.length}</span>
              <span className={styles.statLabel}>{isZh ? '个项目' : 'Projects'}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{repos.reduce((a, r) => a + r.stargazers_count, 0)}</span>
              <span className={styles.statLabel}>⭐</span>
            </div>
          </div>
        </motion.div>

        {/* Language Filter */}
        {languages.length > 2 && (
          <motion.div
            className={styles.filters}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {languages.map(lang => (
              <button
                key={lang}
                className={`${styles.filterBtn} ${filter === lang ? styles.filterActive : ''}`}
                onClick={() => setFilter(lang)}
              >
                {lang === 'all' ? (isZh ? '全部' : 'All') : lang}
                {lang !== 'all' && (
                  <span
                    className={styles.langDot}
                    style={{ background: languageColors[lang] || '#888' }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className={styles.loading}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🌌</span>
            <p>{isZh ? '暂无项目数据' : 'No projects found'}</p>
          </div>
        ) : (
          <div className={styles.grid}>
            <AnimatePresence>
              {filteredRepos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  className={styles.card}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setExpandedRepo(expandedRepo === repo.id ? null : repo.id)}
                >
                  <div className={styles.cardHeader}>
                    <h3 className={styles.repoName}>{repo.name}</h3>
                    {repo.stargazers_count > 0 && (
                      <span className={styles.stars}>⭐ {repo.stargazers_count}</span>
                    )}
                  </div>

                  <p className={styles.repoDesc}>
                    {repo.description || (isZh ? '暂无描述' : 'No description')}
                  </p>

                  <div className={styles.cardMeta}>
                    {repo.language && (
                      <span className={styles.lang}>
                        <span
                          className={styles.langDot}
                          style={{ background: languageColors[repo.language] || '#888' }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className={styles.date}>{formatDate(repo.updated_at)}</span>
                  </div>

                  {repo.topics.length > 0 && (
                    <div className={styles.topics}>
                      {repo.topics.slice(0, 4).map(topic => (
                        <span key={topic} className={styles.topic}>{topic}</span>
                      ))}
                    </div>
                  )}

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedRepo === repo.id && (
                      <motion.div
                        className={styles.expanded}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={styles.expandedContent}>
                          <div className={styles.expandedStats}>
                            <span>🍴 {repo.forks_count} {isZh ? 'forks' : 'forks'}</span>
                            <span>📦 {(repo.size / 1024).toFixed(1)} MB</span>
                          </div>
                          <div className={styles.expandedLinks}>
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.link}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {isZh ? '查看源码' : 'Source Code'} →
                            </a>
                            {repo.homepage && (
                              <a
                                href={repo.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {isZh ? '在线预览' : 'Live Demo'} →
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
