'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const items = [
  { label: 'Dashboard', icon: 'ri-home-5-line', href: '/' },
  { label: 'Requests', icon: 'ri-inbox-archive-line', href: '/requests' },
  { label: 'Leads', icon: 'ri-user-3-line', href: '/leads' },
  { label: 'Customers', icon: 'ri-team-line', href: '/customers' },
  { label: 'Manufacturers', icon: 'ri-building-2-line', href: '/manufacturers' },
  { label: 'Analytics', icon: 'ri-bar-chart-2-line', href: '/analytics' },
  { label: 'Settings', icon: 'ri-settings-3-line', href: '/settings/notifications' },
];

const itemClass = (active: boolean) =>
  `w-16 h-16 rounded-[18px] flex flex-col items-center justify-center transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#152E56] ${
    active
      ? 'bg-white/[0.12] text-white'
      : 'text-white/65 hover:bg-white/[0.08] hover:text-white'
  }`;

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const unreadCount = 3;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <aside className="fixed top-3 left-3 bottom-3 w-[104px] rounded-[20px] bg-[#152E56] flex flex-col items-center">
      <div className="mt-5 w-12 h-12 flex items-center justify-center">
        <img
          src="https://storage.helloreaddy.io/project_files/6400e04c-322f-4ef6-9665-9ccf5cbe53fc/b40bf451-1643-4fa9-9733-cbf4016e449e_972.svg"
          alt="Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <nav className="mt-6 flex flex-col gap-1 items-center">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              prefetch={false}
              className={itemClass(active)}
              aria-current={active ? 'page' : undefined}
            >
              <span className="w-6 h-6 flex items-center justify-center">
                <i className={`${item.icon} text-[26px]`} />
              </span>
              <span className="mt-0.5 text-[11px] leading-none font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 mb-4 w-8 h-px bg-white/[0.12]" />

      <div className="mt-auto mb-5 flex flex-col items-center">
        <button
          type="button"
          aria-label={`Notifications, ${unreadCount} unread`}
          className="w-16 h-16 rounded-[18px] flex flex-col items-center justify-center transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#152E56] text-white/65 hover:bg-white/[0.08] hover:text-white"
        >
          <span className="relative w-6 h-6 flex items-center justify-center">
            <i className="ri-notification-3-line text-[26px]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#A8552A] text-white text-[11px] font-medium tabular-nums flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </span>
          <span className="mt-1 text-[11px] leading-none font-medium">
            Alerts
          </span>
        </button>

        <div className="relative" ref={menuRef}>
          {menuOpen && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 bg-white border border-[#DCE3F0] rounded-[12px] p-1 z-50">
              <Link
                href="/help"
                prefetch={false}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-2.5 h-9 rounded-[8px] text-[13px] font-medium text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              >
                <i className="ri-question-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                Help
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-2 px-2.5 h-9 rounded-[8px] text-[13px] font-medium text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              >
                <i className="ri-logout-box-r-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                Sign out
              </button>
            </div>
          )}
          <button
            type="button"
            aria-label="Account"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="w-8 h-8 rounded-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#152E56]"
          >
            <img
              src="https://readdy.ai/api/search-image?query=professional%20corporate%20headshot%20portrait%20of%20a%20woman%20with%20shoulder%20length%20dark%20hair%2C%20neutral%20studio%20background%2C%20soft%20even%20diffused%20lighting%2C%20realistic%20photography%2C%20head%20and%20shoulders%20crop&width=64&height=64&seq=21&orientation=squarish"
              alt="Account"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </aside>
  );
}