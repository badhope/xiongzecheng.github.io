'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './DailyQuote.module.css';

// Fallback quotes when API is unavailable
const fallbackQuotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", textZh: "成就伟大事业的唯一方法就是热爱你所做的事。", authorZh: "史蒂夫·乔布斯" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House", textZh: "代码就像幽默。当你需要解释它时，它就不好了。", authorZh: "科里·豪斯" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson", textZh: "首先，解决问题。然后，编写代码。", authorZh: "约翰·约翰逊" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs", textZh: "最好的错误信息是永远不会出现的那条。", authorZh: "托马斯·富克斯" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds", textZh: "废话少说，放码过来。", authorZh: "林纳斯·托瓦兹" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler", textZh: "任何傻瓜都能写出计算机能理解的代码。优秀的程序员能写出人类能理解的代码。", authorZh: "马丁·福勒" },
  { text: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay", textZh: "你能学到的最灾难性的事情就是你的第一门编程语言。", authorZh: "艾伦·凯" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman", textZh: "简洁是效率的灵魂。", authorZh: "奥斯汀·弗里曼" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson", textZh: "程序必须为人而写，只是顺便让机器执行。", authorZh: "哈罗德·阿贝尔森" },
  { text: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch", textZh: "好软件的作用是让复杂的事物看起来简单。", authorZh: "格雷迪·布奇" },
  { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson", textZh: "软件要可复用，首先必须可用。", authorZh: "拉尔夫·约翰逊" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck", textZh: "先让它能跑，再让它正确，最后让它快。", authorZh: "肯特·贝克" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", textZh: "种一棵树最好的时间是二十年前，其次是现在。", authorZh: "中国谚语" },
  { text: "We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard.", author: "John F. Kennedy", textZh: "我们选择登月，不是因为它容易，而是因为它困难。", authorZh: "约翰·肯尼迪" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", textZh: "在困难之中蕴藏着机遇。", authorZh: "阿尔伯特·爱因斯坦" },
];

interface Quote {
  text: string;
  author: string;
}

export default function DailyQuote() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      setLoading(true);
      try {
        // Try ZenQuotes API first
        const res = await fetch('https://zenquotes.io/api/random', {
          signal: AbortSignal.timeout(3000),
        });
        if (res.ok) {
          const data = await res.json();
          if (data[0]) {
            setQuote({ text: data[0].q, author: data[0].a });
            setLoading(false);
            return;
          }
        }
      } catch {
        // API failed, use fallback
      }

      try {
        const res = await fetch('https://api.quotable.io/random', {
          signal: AbortSignal.timeout(3000),
        });
        if (res.ok) {
          const data = await res.json();
          setQuote({ text: data.content, author: data.author });
          setLoading(false);
          return;
        }
      } catch {
        // API failed, use fallback
      }

      // Use fallback based on day of year for consistency
      const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
      const fallback = fallbackQuotes[dayOfYear % fallbackQuotes.length];
      setQuote({
        text: isZh ? fallback.textZh : fallback.text,
        author: isZh ? fallback.authorZh : fallback.author,
      });
      setLoading(false);
    };

    fetchQuote();
  }, [isZh]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={styles.quoteCard}>
        <div className={styles.quoteIcon}>✦</div>
        <AnimatePresence mode="wait">
          {loading ? (
            <div className={styles.loading}>
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
            </div>
          ) : quote ? (
            <motion.div
              key={quote.text}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className={styles.quoteText}>&ldquo;{quote.text}&rdquo;</p>
              <p className={styles.quoteAuthor}>— {quote.author}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
