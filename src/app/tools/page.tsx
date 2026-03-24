'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import { categories, tools, Tool, ToolCategory } from '@/data/tools';
import styles from './tools.module.css';

export default function ToolsPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchCategory = activeCategory === 'all' || tool.categoryId === activeCategory;
      const matchSearch = searchQuery === '' || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.descriptionZh.includes(searchQuery) ||
        tool.tags.some(t => t.includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const getCategoryName = (cat: ToolCategory) => isZh ? cat.nameZh : cat.name;
  const getCategoryDesc = (cat: ToolCategory) => isZh ? cat.descriptionZh : cat.description;

  return (
    <div className={styles.page}>
      <StarNavigation />

      <main className={styles.main}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className={styles.tag}>{isZh ? '// 工具集' : '// Tools'}</span>
          <h1 className={styles.title}>{isZh ? '星际工具箱' : 'Stellar Toolbox'}</h1>
          <p className={styles.subtitle}>
            {isZh ? '精心收集的开发者工具和资源' : 'Curated developer tools and resources'}
          </p>
          <div className={styles.stats}>
            <span className={styles.statValue}>{tools.length}</span>
            <span className={styles.statLabel}>{isZh ? '个工具' : 'Tools'}</span>
            <span className={styles.statDivider}>·</span>
            <span className={styles.statValue}>{categories.length}</span>
            <span className={styles.statLabel}>{isZh ? '个分类' : 'Categories'}</span>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          className={styles.searchContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={isZh ? '搜索工具...' : 'Search tools...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className={styles.clearBtn} onClick={() => setSearchQuery('')}>✕</button>
          )}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className={styles.categories}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button
            className={`${styles.catBtn} ${activeCategory === 'all' ? styles.catActive : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <span>{isZh ? '🌟 全部' : '🌟 All'}</span>
            <span className={styles.catCount}>{tools.length}</span>
          </button>
          {categories.map(cat => {
            const count = tools.filter(t => t.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                className={`${styles.catBtn} ${activeCategory === cat.id ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.icon} {getCategoryName(cat)}</span>
                <span className={styles.catCount}>{count}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Tools Grid */}
        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                className={styles.card}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ y: -4 }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.toolIcon}>{tool.icon}</span>
                  <div className={styles.cardTitleArea}>
                    <h3 className={styles.toolName}>{tool.name}</h3>
                    <span className={styles.toolCategory}>
                      {categories.find(c => c.id === tool.categoryId)?.icon}{' '}
                      {getCategoryName(categories.find(c => c.id === tool.categoryId)!)}
                    </span>
                  </div>
                </div>

                <p className={styles.toolDesc}>
                  {isZh ? tool.descriptionZh : tool.description}
                </p>

                <div className={styles.tags}>
                  {tool.tags.slice(0, 3).map(tag => (
                    <span key={tag} className={styles.tag}>#{tag}</span>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.visitBtn}
                  >
                    {isZh ? '访问 →' : 'Visit →'}
                  </a>
                  <button
                    className={styles.expandBtn}
                    onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
                  >
                    {expandedTool === tool.id ? '▲' : '▼'}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedTool === tool.id && (
                    <motion.div
                      className={styles.expanded}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className={styles.expandedContent}>
                        <p className={styles.fullDesc}>
                          {isZh ? tool.descriptionZh : tool.description}
                        </p>
                        <div className={styles.allTags}>
                          {tool.tags.map(tag => (
                            <span key={tag} className={styles.tag}>#{tag}</span>
                          ))}
                        </div>
                        <div className={styles.urlRow}>
                          <span className={styles.urlLabel}>URL:</span>
                          <code className={styles.urlCode}>{tool.url}</code>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTools.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🔭</span>
            <p>{isZh ? '未找到匹配的工具' : 'No matching tools found'}</p>
          </div>
        )}
      </main>
    </div>
  );
}
