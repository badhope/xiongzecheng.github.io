'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import StarNavigation from '@/components/ui/StarNavigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import DailyQuote from '@/components/sections/DailyQuote';
import Footer from '@/components/sections/Footer';
import styles from './home/page.module.css';

const WarpLoader = dynamic(() => import('@/components/animations/WarpLoader'), { ssr: false });
const MouseTrail = dynamic(() => import('@/components/animations/MouseTrail'), { ssr: false });
const CosmicOrbit = dynamic(() => import('@/components/animations/CosmicOrbit'), { ssr: false });
const GitHubStats = dynamic(() => import('@/components/animations/GitHubStats'), { ssr: false });
const DynamicStatus = dynamic(() => import('@/components/sections/DynamicStatus'), { ssr: false });
const FunZone = dynamic(() => import('@/components/sections/FunZone'), { ssr: false });

export default function RootPage() {
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      {loading && <WarpLoader onComplete={handleLoaderComplete} />}

      {!loading && (
        <>
          <MouseTrail />
          <StarNavigation />

          <main className={styles.main}>
            <HeroSection />
            <div className={styles.divider} />

            <AboutSection />
            <div className={styles.divider} />

            <CosmicOrbitSection />
            <div className={styles.divider} />

            <GitHubStats />
            <div className={styles.divider} />

            <DynamicStatusSection />
            <div className={styles.divider} />

            <FunZone />
            <div className={styles.divider} />

            <DailyQuote />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

function CosmicOrbitSection() {
  const [visible, setVisible] = useState(false);
  const ref = (node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(node);
  };
  return (
    <section ref={ref} style={{ padding: '60px 24px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#d4af37', letterSpacing: '1px', marginBottom: '24px' }}>
        {'// Cosmic Tech Orbit'}
      </div>
      {visible && <CosmicOrbit size={360} />}
    </section>
  );
}

function DynamicStatusSection() {
  return (
    <section style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <DynamicStatus />
      </div>
    </section>
  );
}
