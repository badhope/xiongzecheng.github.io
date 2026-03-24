'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SiteSettings {
  animationsEnabled: boolean;
  soundEnabled: boolean;
  soundVolume: number;
  reducedMotion: boolean;
  showParticles: boolean;
  transitionStyle: 'warp' | 'fade' | 'none';
}

interface SettingsContextType {
  settings: SiteSettings;
  updateSettings: (updates: Partial<SiteSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: SiteSettings = {
  animationsEnabled: true,
  soundEnabled: false,
  soundVolume: 0.5,
  reducedMotion: false,
  showParticles: true,
  transitionStyle: 'warp',
};

const SettingsContext = createContext<SettingsContextType | null>(null);

const STORAGE_KEY = 'starbase-settings';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsed });
      }
    } catch {
      // ignore parse errors
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch {
        // ignore storage errors
      }
    }
  }, [settings, mounted]);

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    return {
      settings: defaultSettings,
      updateSettings: () => {},
      resetSettings: () => {},
    };
  }
  return context;
}
