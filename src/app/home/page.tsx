'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import DailyQuote from '@/components/sections/DailyQuote';
import StarNavigation from '@/components/ui/StarNavigation';
import SettingsPanel from '@/components/settings/SettingsPanel';
import WarpLoader from '@/components/animations/WarpLoader';
import styles from './home.module.css';

const Footer = dynamic(() => import('@/components/sections/Footer'), { ssr: false });

export default function HomePage() {
  const [showLoader, setShowLoader] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
  }, []);

  return (
    <div className={styles.page}>
      {showLoader && <WarpLoader onComplete={handleLoaderComplete} />}
      {!showLoader && (
        <>
          <StarNavigation />
          <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
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
