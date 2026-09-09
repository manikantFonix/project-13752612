'use client';

import type { ReactNode } from 'react';

type AlertVariant = 'info' | 'warning' | 'error';

const config: Record<
  AlertVariant,
  { bar: string; bg: string; icon: string; iconColor: string; text: string }
> = {
  info: {
    bar: 'border-[#152E56]',
    bg: 'bg-[#EDF1FA]/70',
    icon: 'ri-information-line',
    iconColor: 'text-[#152E56]',
    text: 'text-[#16233E]',
  },
  warning: {
    bar: 'border-[#A8552A]',
    bg: 'bg-white',
    icon: 'ri-alert-line',
    iconColor: 'text-[#A8552A]',
    text: 'text-[#A8552A]',
  },
  error: {
    bar: 'border-[#A8552A]',
    bg: 'bg-white',
    icon: 'ri-close-circle-line',
    iconColor: 'text-[#A8552A]',
    text: 'text-[#A8552A]',
  },
};

export default function Alert({
  variant = 'info',
  children,
  className = '',
}: {
  variant?: AlertVariant;
  children: ReactNode;
  className?: string;
}) {
  const c = config[variant];
  return (
    <div
      className={`flex items-start gap-2.5 rounded-r-[8px] border-l-2 ${c.bar} ${c.bg} px-3 py-2.5 ${className}`}
    >
      <i className={`${c.icon} ${c.iconColor} text-[16px] leading-none mt-0.5`} />
      <p className={`text-[13px] leading-snug ${c.text}`}>{children}</p>
    </div>
  );
}