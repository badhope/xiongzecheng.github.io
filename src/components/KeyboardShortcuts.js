'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Keyboard, X } from 'lucide-react';

export default function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // 如果在输入框中，不触发快捷键
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case '?':
          setShowHelp((prev) => !prev);
          break;
        case '1':
          router.push('/');
          break;
        case '2':
          router.push('/resume');
          break;
        case '3':
          router.push('/works');
          break;
        case '4':
          router.push('/tools');
          break;
        case 'Escape':
          setShowHelp(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router]);

  return (
    <AnimatePresence>
      {showHelp && (
        <>
          {/* 遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHelp(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
          />
          
          {/* 帮助面板 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-space-card border border-neon-cyan rounded-lg p-8 shadow-2xl z-[9999] max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Keyboard className="text-neon-cyan" /> 快捷键导航
              </h2>
              <button onClick={() => setShowHelp(false)} className="text-text-light hover:text-white">
                <X />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { key: '1', action: '首页' },
                { key: '2', action: '简历页' },
                { key: '3', action: '作品集' },
                { key: '4', action: '工具站' },
                { key: '?', action: '显示/隐藏帮助' },
                { key: 'ESC', action: '关闭帮助' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-text-light">
                  <span>{item.action}</span>
                  <kbd className="px-3 py-1 bg-space-bg border border-space-border rounded text-neon-cyan font-mono">
                    {item.key}
                  </kbd>
                </div>
              ))}
            </div>

            <p className="text-xs text-text-light mt-6 text-center opacity-50">
              极客专属功能，随时随地快速导航
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
