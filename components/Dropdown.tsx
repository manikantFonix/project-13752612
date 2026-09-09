'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  open: boolean;
  onToggle: (open: boolean) => void;
  trigger: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right';
  panelClass?: string;
}

export default function Dropdown({
  open,
  onToggle,
  trigger,
  children,
  align = 'left',
  panelClass = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onToggle(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onToggle]);

  return (
    <div ref={ref} className="relative">
      {trigger}
      {open && (
        <div
          className={`absolute z-30 mt-1 bg-white border border-[#DCE3F0] rounded-[12px] p-1 ${
            align === 'left' ? 'left-0' : 'right-0'
          } ${panelClass}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}