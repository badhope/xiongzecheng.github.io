'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import styles from './news.module.css';

interface NewsItem {
  title: string;
  url: string;
  source: string;
  date?: string;
  description?: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

export default function NewsPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [activeTab, setActiveTab] = useState<'trending' | 'ai' | 'articles' | 'history'>('trending');
  const [trendingRepos, setTrendingRepos] = useState<GitHubRepo[]>([]);
  const [historyEvent, setHistoryEvent] = useState<{ text: string; year: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // GitHub Trending
        const res = await fetch('https://api.github.com/search/repositories?q=stars:>10000+pushed:>2024-01-01&sort=stars&order=desc&per_page=10');
        if (res.ok) {
          const data = await res.json();
          setTrendingRepos(data.items || []);
        }
      } catch { /* ignore */ }

      try {
        // History events
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const res = await fetch(`https://history.muffinlabs.com/date/${month}/${day}`);
        if (res.ok) {
          const data = await res.json();
          const techEvents = (data.data?.Events || [])
            .filter((e: { text: string }) => 
              /computer|internet|software|programming|space|NASA|tech|digital|AI|robot|launch/i.test(e.text)
            );
          if (techEvents.length > 0) {
            const event = techEvents[Math.floor(Math.random() * Math.min(5, techEvents.length))];
            setHistoryEvent({ text: event.text, year: event.year });
          }
        }
      } catch { /* ignore */ }

      setLoading(false);
    };
    fetchData();
  }, []);

  const tabs = [
    { id: 'trending' as const, labelZh: '🔥 GitHub Trending', labelEn: '🔥 GitHub Trending' },
    { id: 'ai' as const, labelZh: '🤖 AI 资讯', labelEn: '🤖 AI News' },
    { id: 'articles' as const, labelZh: '📰 技术热文', labelEn: '📰 Tech Articles' },
    { id: 'history' as const, labelZh: '📅 历史上的今天', labelEn: '📅 Today in History' },
  ];

  return (
    <div className={styles.page}>
      <StarNavigation />

      <main className={styles.main}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.tag}>{isZh ? '// 资讯中心' : '// News Hub'}</span>
          <h1 className={styles.title}>{isZh ? '星际通讯站' : 'Stellar Comm Station'}</h1>
          <p className={styles.subtitle}>
            {isZh ? '汇聚技术前沿资讯，洞察行业动态' : 'Gathering cutting-edge tech news and industry insights'}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {isZh ? tab.labelZh : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={styles.content}>
          {activeTab === 'trending' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>{isZh ? '🔥 今日热门开源项目' : '🔥 Today\'s Trending Open Source'}</h2>
              {loading ? (
                <div className={styles.loadingGrid}>
                  {[1,2,3,4,5].map(i => <div key={i} className={styles.skeleton} />)}
                </div>
              ) : (
                <div className={styles.repoList}>
                  {trendingRepos.map((repo, index) => (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.repoCard}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <span className={styles.repoRank}>#{index + 1}</span>
                      <div className={styles.repoInfo}>
                        <h3 className={styles.repoName}>{repo.name}</h3>
                        <p className={styles.repoDesc}>{repo.description || 'No description'}</p>
                      </div>
                      <div className={styles.repoMeta}>
                        <span className={styles.repoStars}>⭐ {repo.stargazers_count.toLocaleString()}</span>
                        {repo.language && <span className={styles.repoLang}>{repo.language}</span>}
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>{isZh ? '🤖 AI 模型排行榜' : '🤖 AI Model Leaderboard'}</h2>
              <div className={styles.aiLeaderboard}>
                <a href="https://chat.lmsys.org/?leaderboard" target="_blank" rel="noopener noreferrer" className={styles.aiCard}>
                  <div className={styles.aiCardIcon}>🏆</div>
                  <h3>LMSYS Chatbot Arena</h3>
                  <p>{isZh ? '全球最大AI模型竞技场排行榜' : 'World\'s largest AI model arena leaderboard'}</p>
                  <span className={styles.aiCardLink}>{isZh ? '查看排行 →' : 'View Leaderboard →'}</span>
                </a>
                <a href="https://www.superclue.ai/" target="_blank" rel="noopener noreferrer" className={styles.aiCard}>
                  <div className={styles.aiCardIcon}>🇨🇳</div>
                  <h3>SuperCLUE</h3>
                  <p>{isZh ? '中文通用大模型综合性测评基准' : 'Chinese LLM comprehensive evaluation benchmark'}</p>
                  <span className={styles.aiCardLink}>{isZh ? '查看排行 →' : 'View Leaderboard →'}</span>
                </a>
                <a href="https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard" target="_blank" rel="noopener noreferrer" className={styles.aiCard}>
                  <div className={styles.aiCardIcon}>🤗</div>
                  <h3>Open LLM Leaderboard</h3>
                  <p>{isZh ? 'Hugging Face开源大模型排行榜' : 'Hugging Face open LLM leaderboard'}</p>
                  <span className={styles.aiCardLink}>{isZh ? '查看排行 →' : 'View Leaderboard →'}</span>
                </a>
                <a href="https://artificialanalysis.ai/" target="_blank" rel="noopener noreferrer" className={styles.aiCard}>
                  <div className={styles.aiCardIcon}>📊</div>
                  <h3>Artificial Analysis</h3>
                  <p>{isZh ? 'AI模型性能和价格对比分析' : 'AI model performance and price comparison'}</p>
                  <span className={styles.aiCardLink}>{isZh ? '查看排行 →' : 'View Leaderboard →'}</span>
                </a>
              </div>
            </motion.div>
          )}

          {activeTab === 'articles' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>{isZh ? '📰 技术热文' : '📰 Tech Hot Articles'}</h2>
              <div className={styles.articleLinks}>
                <a href="https://blog.csdn.net/rank/list" target="_blank" rel="noopener noreferrer" className={styles.articleCard}>
                  <span className={styles.articleIcon}>📚</span>
                  <div>
                    <h3>CSDN {isZh ? '热榜' : 'Trending'}</h3>
                    <p>{isZh ? 'CSDN热门文章排行' : 'CSDN trending articles'}</p>
                  </div>
                  <span className={styles.articleArrow}>→</span>
                </a>
                <a href="https://juejin.cn/hot/articles" target="_blank" rel="noopener noreferrer" className={styles.articleCard}>
                  <span className={styles.articleIcon}>💎</span>
                  <div>
                    <h3>{isZh ? '掘金热榜' : 'Juejin Trending'}</h3>
                    <p>{isZh ? '掘金热门文章排行' : 'Juejin trending articles'}</p>
                  </div>
                  <span className={styles.articleArrow}>→</span>
                </a>
                <a href="https://news.ycombinator.com/" target="_blank" rel="noopener noreferrer" className={styles.articleCard}>
                  <span className={styles.articleIcon}>🔶</span>
                  <div>
                    <h3>Hacker News</h3>
                    <p>{isZh ? '全球科技新闻聚合' : 'Global tech news aggregator'}</p>
                  </div>
                  <span className={styles.articleArrow}>→</span>
                </a>
                <a href="https://www.techmeme.com/" target="_blank" rel="noopener noreferrer" className={styles.articleCard}>
                  <span className={styles.articleIcon}>📰</span>
                  <div>
                    <h3>Techmeme</h3>
                    <p>{isZh ? '科技行业头条新闻' : 'Tech industry top headlines'}</p>
                  </div>
                  <span className={styles.articleArrow}>→</span>
                </a>
                <a href="https://github.com/trending" target="_blank" rel="noopener noreferrer" className={styles.articleCard}>
                  <span className={styles.articleIcon}>🐙</span>
                  <div>
                    <h3>GitHub Trending</h3>
                    <p>{isZh ? 'GitHub每日热门项目' : 'GitHub daily trending repos'}</p>
                  </div>
                  <span className={styles.articleArrow}>→</span>
                </a>
                <a href="https://www.infoq.cn/" target="_blank" rel="noopener noreferrer" className={styles.articleCard}>
                  <span className={styles.articleIcon}>💡</span>
                  <div>
                    <h3>InfoQ</h3>
                    <p>{isZh ? '技术深度报道和社区' : 'In-depth tech reporting and community'}</p>
                  </div>
                  <span className={styles.articleArrow}>→</span>
                </a>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>
                {isZh ? '📅 历史上的今天' : '📅 Today in History'}
              </h2>
              <div className={styles.historyCard}>
                {historyEvent ? (
                  <>
                    <span className={styles.historyYear}>{historyEvent.year}</span>
                    <p className={styles.historyText}>{historyEvent.text}</p>
                  </>
                ) : (
                  <p className={styles.historyLoading}>
                    {isZh ? '正在加载历史事件...' : 'Loading historical events...'}
                  </p>
                )}
              </div>
              <div className={styles.historyLinks}>
                <a href="https://history.muffinlabs.com/" target="_blank" rel="noopener noreferrer" className={styles.historyLink}>
                  {isZh ? '查看更多历史事件 →' : 'View more events →'}
                </a>
                <a href="https://www.computerhistory.org/timeline/" target="_blank" rel="noopener noreferrer" className={styles.historyLink}>
                  {isZh ? '计算机历史时间线 →' : 'Computer History Timeline →'}
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
