"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultTheme } from './themeDefinitions';

interface ThemeContextType {
  currentTheme: string;
  setTheme: (themeId: string) => void;
  isClient: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<string>(defaultTheme);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('antarshanti-theme');
    if (saved) {
      setCurrentTheme(saved);
    }
  }, []);

  const setTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('antarshanti-theme', themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, isClient }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return default values for SSR
    return {
      currentTheme: defaultTheme,
      setTheme: () => {},
      isClient: false,
    };
  }
  return context;
}
