'use client';

import { usePathname } from 'next/navigation';
import { focusRingVar } from './tokens';

const tabs = [
  { label: 'Brand', href: '/settings/brand' },
  { label: 'Notifications', href: '/settings/notifications' },
  { label: 'Widget', href: '/settings/widget' },
  { label: 'Appearance', href: '/settings/appearance' },
  { label: 'Team', href: '/settings/team' },
  { label: 'Usage and plan', href: '/settings/usage' },
];

export default function ThemedSettingsTabs() {
  const pathname = usePathname();

  return (
    <nav className="mt-4 flex items-center gap-6 overflow-x-auto">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return active ? (
          <span
            key={t.label}
            className="h-9 flex items-center text-[13px] font-medium text-[var(--text)] border-b-2 border-[var(--accent)] whitespace-nowrap"
          >
            {t.label}
          </span>
        ) : (
          <a
            key={t.label}
            href={t.href}
            className={`h-9 flex items-center text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap ${focusRingVar}`}
          >
            {t.label}
          </a>
        );
      })}
    </nav>
  );
}