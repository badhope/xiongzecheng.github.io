'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

export default function EasterEgg() {
  const [clickCount, setClickCount] = useState(0);
  const [showEgg, setShowEgg] = useState(false);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 5) {
      setShowEgg(true);
      setTimeout(() => {
        setShowEgg(false);
        setClickCount(0);
      }, 3000);
    }
  };

  return (
    <>
      {/* 隐藏的触发按钮 */}
      <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 w-8 h-8 opacity-0 hover:opacity-20 transition-opacity z-[9990]"
        aria-label="Secret Button"
      >
        <Star className="text-neon-cyan" />
      </button>

      {/* 彩蛋动画 */}
      <AnimatePresence>
        {showEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center bg-black/50"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", damping: 10 }}
              className="text-center"
            >
              <div className="text-8xl mb-4">🚀</div>
              <h2 className="text-4xl font-bold text-neon-cyan mb-2">你发现了秘密！</h2>
              <p className="text-white text-lg">AI 探索者，继续前进吧！</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
