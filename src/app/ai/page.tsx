'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import { aiProviders } from '@/data/config';
import styles from './ai.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Simple keyword-based response system
function generateResponse(input: string, isZh: boolean): string {
  const lower = input.toLowerCase();
  
  // Greetings
  if (/^(hi|hello|hey|嗨|你好|哈喽|hihi)/.test(lower)) {
    const responses = isZh
      ? ['你好呀！我是 badhope 的 AI 助手，有什么可以帮你的吗？ ✨', '嗨！欢迎来到星际空间站，我是你的导航助手 ⭐', '你好！今天想聊点什么呢？']
      : ['Hello! I\'m badhope\'s AI assistant. How can I help? ✨', 'Hey! Welcome to the Starbase, I\'m your navigation assistant ⭐', 'Hi there! What would you like to chat about today?'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // About badhope
  if (/badhope|关于|about|who|谁|介绍/.test(lower)) {
    const responses = isZh
      ? ['badhope 是一名全栈开发者和 AI 探索者，热衷于用代码构建星辰大海般的未来 ⭐', 'badhope 是一位在职开发者，专注于全栈开发和人工智能领域，同时也是开源贡献者和技术博主', 'badhope — 一个在代码宇宙中航行的开发者，相信每一行代码都是通往未来的星轨']
      : ['badhope is a full-stack developer and AI explorer, passionate about building a stellar future with code ⭐', 'badhope is a developer focused on full-stack development and AI, also an open source contributor and tech blogger', 'badhope — a developer navigating the code universe, believing every line of code is a star trail to the future'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Skills/Tech
  if (/技能|skill|技术|tech|会什么|能做什么|can/.test(lower)) {
    const responses = isZh
      ? ['badhope 擅长 React、Next.js、TypeScript、Node.js、Python 等技术栈，同时也深入研究 AI/ML 和大数据领域 🛠️', '从前端到后端，从数据科学到人工智能，badhope 的技术装备库相当丰富！具体可以看看简历页面', '全栈开发、AI 探索、大数据处理、DevOps — 这些都是 badhope 的技术领域']
      : ['badhope is skilled in React, Next.js, TypeScript, Node.js, Python, and also deep dives into AI/ML and big data 🛠️', 'From frontend to backend, data science to AI — badhope\'s tech arsenal is quite comprehensive! Check the resume page for details', 'Full-stack development, AI exploration, big data, DevOps — these are badhope\'s areas of expertise'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Contact
  if (/联系|contact|邮箱|email|微信|wechat|怎么找/.test(lower)) {
    const responses = isZh
      ? ['你可以通过以下方式联系 badhope：📧 Email: x18825407105@outlook.com，或者访问联系页面获取更多信息！', '最直接的方式是发邮件到 x18825407105@outlook.com，也可以通过 GitHub、CSDN、掘金等平台找到 badhope']
      : ['You can reach badhope via: 📧 Email: x18825407105@outlook.com, or visit the Contact page for more info!', 'The most direct way is to email x18825407105@outlook.com, or find badhope on GitHub, CSDN, Juejin'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Projects
  if (/项目|project|作品|portfolio|做过什么/.test(lower)) {
    const responses = isZh
      ? ['badhope 有很多有趣的项目！你可以访问作品集页面查看 GitHub 上的所有开源项目 ⭐', '去作品集页面看看吧，那里有从 GitHub 自动同步的所有项目，包括 AI、全栈、大数据等各种类型']
      : ['badhope has many interesting projects! Check the Projects page to see all open source repos on GitHub ⭐', 'Head over to the Projects page — it auto-syncs all repos from GitHub, including AI, full-stack, big data and more'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Job/Collaboration
  if (/合作|collab|工作|job|招聘|hire|外包|freelance/.test(lower)) {
    const responses = isZh
      ? ['如果你有合作意向，欢迎通过邮件联系 badhope：x18825407105@outlook.com 🤝', 'badhope 对有趣的项目和合作机会持开放态度，请通过联系页面发送详细信息']
      : ['If you\'re interested in collaboration, feel free to email badhope: x18825407105@outlook.com 🤝', 'badhope is open to interesting projects and collaboration opportunities. Please send details via the Contact page'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Easter egg triggers
  if (/秘密|secret|彩蛋|easter|隐藏|hidden|konami/.test(lower)) {
    return isZh
      ? '🤫 你发现了隐藏频道！badhope 的网站里藏了很多彩蛋，试试在键盘上输入 ↑↑↓↓←→←→BA 看看会发生什么...'
      : '🤫 You found the hidden channel! There are many easter eggs hidden in badhope\'s website. Try typing ↑↑↓↓←→←→BA on your keyboard...';
  }

  if (/星星|star|星辰|宇宙|cosmos|universe/.test(lower)) {
    return isZh
      ? '✨ 星辰大海是 badhope 的设计主题！每一颗星星都代表一个代码片段，每一个星系都是一个项目。在这片数字宇宙中，badhope 不断探索和创造。'
      : '✨ Stars and cosmos is badhope\'s design theme! Each star represents a code snippet, each galaxy a project. In this digital universe, badhope keeps exploring and creating.';
  }

  // Thank you
  if (/谢谢|thanks|thank you|感谢|3q/.test(lower)) {
    const responses = isZh
      ? ['不客气！如果还有其他问题，随时问我 ⭐', '很高兴能帮到你！祝你今天愉快 ✨', '不用谢！在星际空间站，帮助旅者是我们的使命']
      : ['You\'re welcome! Feel free to ask anything else ⭐', 'Happy to help! Have a great day ✨', 'No problem! At the Starbase, helping travelers is our mission'];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Default fallback
  const defaults = isZh
    ? ['这是一个有趣的问题！不过作为一个预设题库的 AI 助手，我的知识有限。你可以尝试接入真实的 AI API 来获得更好的回答体验 🤖', '嗯...这个问题超出了我的预设范围。不过你可以问问关于 badhope、技术、项目相关的问题，我更擅长这些！', '我的 circuits 还在处理中...你可以试试换个方式提问，或者联系 badhope 获取更详细的回答']
    : ['That\'s an interesting question! But as a preset knowledge base AI, my knowledge is limited. You can try connecting a real AI API for better answers 🤖', 'Hmm... this is beyond my preset scope. But try asking about badhope, tech, or projects — I\'m better at those!', 'My circuits are still processing... try rephrasing, or contact badhope for a more detailed answer'];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

export default function AIPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: isZh
        ? '⭐ 你好！我是 badhope 的 AI 助手，目前运行在预设题库模式。你可以问我关于 badhope 的问题，比如技能、项目、联系方式等。如需更强大的对话能力，可以在设置中接入 AI API。'
        : '⭐ Hello! I\'m badhope\'s AI assistant, currently running in preset knowledge base mode. You can ask me about badhope — skills, projects, contact info, etc. For more powerful conversations, connect an AI API in settings.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(input, isZh);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.page}>
      <StarNavigation />

      <main className={styles.main}>
        {/* Chat Header */}
        <motion.div
          className={styles.chatHeader}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.headerLeft}>
            <span className={styles.headerIcon}>🤖</span>
            <div>
              <h1 className={styles.headerTitle}>
                {isZh ? 'AI 助手' : 'AI Assistant'}
              </h1>
              <span className={styles.headerStatus}>
                {isZh ? '预设题库模式' : 'Preset KB Mode'} · {isZh ? '在线' : 'Online'}
              </span>
            </div>
          </div>
          <button
            className={styles.settingsBtn}
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️ {isZh ? 'API 设置' : 'API Settings'}
          </button>
        </motion.div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.assistantMsg}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {msg.role === 'assistant' && (
                <span className={styles.msgAvatar}>⭐</span>
              )}
              <div className={styles.msgBubble}>
                <p className={styles.msgContent}>{msg.content}</p>
                <span className={styles.msgTime}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {msg.role === 'user' && (
                <span className={styles.msgAvatar}>👤</span>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              className={`${styles.message} ${styles.assistantMsg}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className={styles.msgAvatar}>⭐</span>
              <div className={styles.msgBubble}>
                <div className={styles.typing}>
                  <span /><span /><span />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <div className={styles.inputContainer}>
            <textarea
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isZh ? '输入消息... (Enter 发送)' : 'Type a message... (Enter to send)'}
              rows={1}
            />
            <button
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
            >
              {isZh ? '发送' : 'Send'}
            </button>
          </div>
          <p className={styles.inputHint}>
            {isZh ? '💡 试试问我：badhope 是谁？他会什么技术？怎么联系？' : '💡 Try asking: Who is badhope? What tech skills? How to contact?'}
          </p>
        </div>

        {/* API Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              className={styles.settingsPanel}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h3 className={styles.settingsTitle}>
                {isZh ? '🔌 AI API 配置' : '🔌 AI API Configuration'}
              </h3>
              <p className={styles.settingsDesc}>
                {isZh
                  ? '选择一个 AI 提供商并输入你的 API Key 来启用真实 AI 对话。API Key 仅存储在本地浏览器中。'
                  : 'Select an AI provider and enter your API Key to enable real AI conversations. API Key is stored locally only.'}
              </p>
              <div className={styles.providerList}>
                {aiProviders.filter(p => p.id !== 'custom').map(provider => (
                  <div key={provider.id} className={styles.providerItem}>
                    <div className={styles.providerInfo}>
                      <span className={styles.providerName}>{provider.name}</span>
                      <span className={styles.providerModels}>
                        {provider.models.slice(0, 3).join(', ')}
                      </span>
                    </div>
                    <a
                      href={provider.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.providerLink}
                    >
                      {isZh ? '获取 Key →' : 'Get Key →'}
                    </a>
                  </div>
                ))}
              </div>
              <div className={styles.settingsNote}>
                <p>📝 {isZh ? '在 src/data/config.ts 中配置 API Key' : 'Configure API Key in src/data/config.ts'}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
