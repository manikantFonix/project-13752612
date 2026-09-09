'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type ThemeChoice = 'light' | 'dark' | 'system';

interface ThemeCtx {
  theme: ThemeChoice;
  dark: boolean;
  setTheme: (t: ThemeChoice) => void;
}

const Ctx = createContext<ThemeCtx>({ theme: 'light', dark: false, setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeChoice>('light');
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('cai-theme');
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      setThemeState(stored);
    }
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(mq.matches);
    const onChange = () => setSystemDark(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const dark = theme === 'dark' || (theme === 'system' && systemDark);

  const setTheme = (t: ThemeChoice) => {
    setThemeState(t);
    window.localStorage.setItem('cai-theme', t);
  };

  return <Ctx.Provider value={{ theme, dark, setTheme }}>{children}</Ctx.Provider>;
}

export function useTheme() {
  return useContext(Ctx);
}