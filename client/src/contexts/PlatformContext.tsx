// Dao-Yu-101 Platform Context
// Manages: theme, language, user progress, gamification state

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Theme, Language, UserProgress, UserRole } from '@/lib/data';
import { demoStudent, translations } from '@/lib/data';

interface PlatformContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  user: UserProgress;
  setUser: React.Dispatch<React.SetStateAction<UserProgress>>;
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  completeLesson: (lessonId: number) => void;
  unlockAchievement: (achievementId: string) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  showXPGain: number | null;
  showCoinGain: number | null;
}

const PlatformContext = createContext<PlatformContextType | null>(null);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('island');
  const [language, setLanguageState] = useState<Language>('en');
  const [user, setUser] = useState<UserProgress>(demoStudent);
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [showXPGain, setShowXPGain] = useState<number | null>(null);
  const [showCoinGain, setShowCoinGain] = useState<number | null>(null);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t === 'island' ? '' : t);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  }, [language]);

  const addXP = useCallback((amount: number) => {
    setUser(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { ...prev, xp: newXP, level: Math.max(prev.level, newLevel) };
    });
    setShowXPGain(amount);
    setTimeout(() => setShowXPGain(null), 2000);
  }, []);

  const addCoins = useCallback((amount: number) => {
    setUser(prev => ({ ...prev, coins: prev.coins + amount }));
    setShowCoinGain(amount);
    setTimeout(() => setShowCoinGain(null), 2000);
  }, []);

  const completeLesson = useCallback((lessonId: number) => {
    setUser(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return { ...prev, completedLessons: [...prev.completedLessons, lessonId] };
    });
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setUser(prev => {
      if (prev.achievements.includes(achievementId)) return prev;
      return { ...prev, achievements: [...prev.achievements, achievementId] };
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'island' ? '' : theme);
  }, [theme]);

  return (
    <PlatformContext.Provider value={{
      theme, setTheme,
      language, setLanguage, t,
      user, setUser,
      addXP, addCoins, completeLesson, unlockAchievement,
      currentRole, setCurrentRole,
      showXPGain, showCoinGain,
    }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error('usePlatform must be used inside PlatformProvider');
  return ctx;
}
