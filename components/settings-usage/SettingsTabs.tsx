'use client';

import { usePathname } from 'next/navigation';
import { focusRing } from './data';

const tabs = [
  { label: 'Brand', href: '/settings/brand' },
  { label: 'Notifications', href: '/settings/notifications' },
  { label: 'Widget', href: '/settings/widget' },
  { label: 'Appearance', href: '/settings/appearance' },
  { label: 'Team', href: '/settings/team' },
  { label: 'Usage and plan', href: '/settings/usage' },
];

export default function SettingsTabs() {
  const pathname = usePathname();

  return (
    <nav className="mt-4 flex items-center gap-6">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return active ? (
          <span
            key={t.label}
            className="h-9 flex items-center text-[13px] font-medium text-[#16233E] border-b-2 border-[#152E56]"
          >
            {t.label}
          </span>
        ) : (
          <a
            key={t.label}
            href={t.href}
            className={`h-9 flex items-center text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
          >
            {t.label}
          </a>
        );
      })}
    </nav>
  );
}