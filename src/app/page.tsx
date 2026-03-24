'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import DailyQuote from '@/components/sections/DailyQuote';
import StarNavigation from '@/components/ui/StarNavigation';
import Footer from '@/components/sections/Footer';
import styles from './home/page.module.css';

const WarpLoader = dynamic(() => import('@/components/animations/WarpLoader'), {
  ssr: false,
});

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
          <StarNavigation />
          <main className={styles.main}>
            <HeroSection />
            <div className={styles.divider} />
            <AboutSection />
            <div className={styles.divider} />
            <DailyQuote />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
