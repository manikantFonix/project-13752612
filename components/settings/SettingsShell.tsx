'use client';

import { useTheme } from './theme/ThemeProvider';
import { varsFor } from './theme/tokens';
import Sidebar from '../Sidebar';
import type { ReactNode } from 'react';

export default function SettingsShell({ children }: { children: ReactNode }) {
  const { dark } = useTheme();
  return (
    <div className="min-h-screen bg-[var(--canvas)]" style={varsFor(dark)}>
      <Sidebar />
      <div className="pl-[116px] min-h-screen bg-[var(--canvas)]">{children}</div>
    </div>
  );
}