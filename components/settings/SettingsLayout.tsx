'use client';

import type { ReactNode } from 'react';
import SettingsSidebar from './SettingsSidebar';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1100px] mx-auto px-8 pt-8 pb-16">
      <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[var(--text)]">
        Settings
      </h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] items-start">
        <SettingsSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}