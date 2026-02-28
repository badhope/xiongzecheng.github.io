import HeroSection from '@/components/HeroSection';
import StarBackground from '@/components/StarBackground';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-space-bg">
      {/* 1. 3D 背景层 */}
      <div className="absolute inset-0 z-0">
        <StarBackground />
      </div>

      {/* 2. 前景内容层 */}
      <HeroSection />
    </main>
  );
}
