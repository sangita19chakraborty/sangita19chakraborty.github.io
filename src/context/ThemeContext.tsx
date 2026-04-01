import { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeMode } from '../constants/theme';
import { themes } from '../constants/theme';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  // Apply CSS custom properties from theme.ts to :root on every change
  useEffect(() => {
    const tokens = themes[theme];
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.setProperty('--bg',           tokens.bg);
    root.style.setProperty('--bg-surface',   tokens.bgSurface);
    root.style.setProperty('--text',         tokens.text);
    root.style.setProperty('--text-muted',   tokens.textMuted);
    root.style.setProperty('--border',       tokens.border);
    root.style.setProperty('--accent',       tokens.accent);
    root.style.setProperty('--accent-fg',    tokens.accentFg);
    root.style.setProperty('--outline',      tokens.outline);
    root.style.setProperty('--cursor-color', theme === 'dark' ? '#d4ff00' : '#ff6200');
    root.style.setProperty('--cursor-ring',  theme === 'dark' ? 'rgba(212,255,0,0.45)' : 'rgba(255,98,0,0.45)');
    root.style.setProperty('--cursor-ring-grow', theme === 'dark' ? 'rgba(212,255,0,0.8)' : 'rgba(255,98,0,0.8)');
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
