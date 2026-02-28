import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: '熊泽城 | AI时代的探索者',
  description: '大数据专业本科生，全栈开发者，活跃的开源贡献者。探索前沿技术，创造无限可能。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="bg-space-bg text-text-main min-h-screen">
        {/* 全局侧边栏 */}
        <Sidebar />
        
        {/* 页面内容容器 */}
        <main className="min-h-screen relative">
          {children}
        </main>
      </body>
    </html>
  );
}
