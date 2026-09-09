'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { focusRingVar } from './theme/tokens';

const items = [
  { label: 'Brand', icon: 'ri-store-2-line', href: '/settings/brand' },
  { label: 'Notifications', icon: 'ri-notification-3-line', href: '/settings/notifications' },
  { label: 'Widget', icon: 'ri-layout-right-2-line', href: '/settings/widget' },
  { label: 'Appearance', icon: 'ri-moon-line', href: '/settings/appearance' },
  { label: 'Team', icon: 'ri-team-line', href: '/settings/team' },
  { label: 'Usage & Plan', icon: 'ri-line-chart-line', href: '/settings/usage' },
];

export default function SettingsSidebar() {
  const pathname = usePathname();
  const active = (href: string) => pathname === href;

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[12px] p-3">
      <p className="px-3 pt-2 pb-1 text-[12px] font-medium text-[var(--text-sec)]">
        All settings
      </p>
      <div className="flex flex-col gap-1">
        {items.map((it) => {
          const on = active(it.href);
          return (
            <Link
              key={it.label}
              href={it.href}
              className={`relative flex items-center gap-3 h-10 px-3 rounded-[10px] text-[13px] font-medium transition-colors duration-150 whitespace-nowrap ${focusRingVar} ${
                on
                  ? 'bg-[var(--muted)] text-[var(--accent)]'
                  : 'text-[var(--text-sec)] hover:text-[var(--text)] hover:bg-[var(--muted)]'
              }`}
              aria-current={on ? 'page' : undefined}
            >
              {on && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-[var(--accent)]" />
              )}
              <span className="w-5 h-5 flex items-center justify-center shrink-0">
                <i className={`${it.icon} text-[17px]`} />
              </span>
              {it.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}