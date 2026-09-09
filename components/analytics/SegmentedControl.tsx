'use client';

import { useRef } from 'react';
import { focusRing } from './data';

export default function SegmentedControl({
  value,
  onValueChange,
  count,
}: {
  value: 'overview' | 'archive';
  onValueChange: (v: 'overview' | 'archive') => void;
  count: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const options: { id: 'overview' | 'archive'; label: string; showCount?: boolean }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'archive', label: 'Archive', showCount: true },
  ];

  const onKey = (e: React.KeyboardEvent) => {
    const idx = options.findIndex((o) => o.id === value);
    const dir =
      e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (dir === 0) return;
    e.preventDefault();
    const next = options[(idx + dir + options.length) % options.length];
    onValueChange(next.id);
  };

  return (
    <div
      ref={ref}
      role="tablist"
      aria-label="Analytics view"
      onKeyDown={onKey}
      className="inline-flex items-center bg-white border border-[#DCE3F0] rounded-full p-1"
    >
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="tab"
            id={`seg-${o.id}`}
            aria-selected={active}
            aria-controls={active ? `panel-${o.id}` : undefined}
            tabIndex={active ? 0 : -1}
            onClick={() => onValueChange(o.id)}
            className={`h-9 px-4 rounded-full text-[13px] font-medium transition-colors duration-150 whitespace-nowrap inline-flex items-center gap-1.5 ${focusRing} ${
              active
                ? 'bg-[#152E56] text-white'
                : 'text-[#5D6C8A] hover:bg-[#F3F6FC] hover:text-[#16233E]'
            }`}
          >
            {o.label}
            {o.showCount && (
              <span
                className={`min-w-5 h-5 px-1 rounded-full text-[11px] font-medium tabular-nums flex items-center justify-center ${
                  active ? 'bg-white text-[#152E56]' : 'bg-[#F3F6FC] text-[#5D6C8A]'
                }`}
              >
                {count.toLocaleString('en-US')}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}