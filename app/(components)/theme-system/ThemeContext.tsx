"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultTheme } from './themeDefinitions';

interface ThemeContextType {
  currentTheme: string;
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<string>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('antarshanti-theme');
    if (saved) {
      setCurrentTheme(saved);
    }
  }, []);

  const setTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('antarshanti-theme', themeId);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
