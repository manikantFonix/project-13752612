'use client';

import { useState } from 'react';
import type { Metal, ViewName } from './data';

const VIEWS: { id: ViewName; label: string }[] = [
  { id: 'front', label: 'Front' },
  { id: 'side', label: 'Side' },
  { id: 'back', label: 'Back' },
  { id: 'worn', label: 'Worn' },
];

export default function Gallery({
  metal,
  images,
  category,
}: {
  metal: Metal;
  images: Partial<Record<ViewName, string>>;
  category: string;
}) {
  const available = VIEWS.filter((v) => images[v.id]);
  const [active, setActive] = useState(0);

  if (available.length === 0) return null;

  const go = (i: number) =>
    setActive(Math.max(0, Math.min(available.length - 1, i)));

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(active + 1);
    if (e.key === 'ArrowLeft') go(active - 1);
  };

  return (
    <div>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={`${category} views`}
        tabIndex={0}
        onKeyDown={onKey}
        className="flex snap-x snap-mandatory overflow-x-auto md:overflow-hidden rounded-[12px] bg-[#E4E9F4] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
      >
        {available.map((v) => (
          <div
            key={v.id}
            className="shrink-0 w-full snap-center aspect-square"
            aria-roledescription="slide"
            aria-label={`${v.label} view`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[v.id]}
              alt={`${category} ${v.id} view`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {available.length > 1 && (
        <div className="mt-2 flex md:hidden items-center justify-center gap-2">
          {available.map((v, i) => (
            <button
              key={v.id}
              onClick={() => go(i)}
              aria-label={`Show ${v.label} view`}
              aria-current={i === active}
              className={`h-2 w-2 rounded-full transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 ${
                i === active ? 'bg-[var(--brand)]' : 'bg-[#C6CFE0]'
              }`}
            />
          ))}
        </div>
      )}

      {available.length > 1 && (
        <div className="hidden md:flex gap-2 mt-3">
          {available.map((v, i) => (
            <button
              key={v.id}
              onClick={() => go(i)}
              aria-label={`Show ${v.label} view`}
              aria-current={i === active}
              className={`w-16 h-16 rounded-[8px] overflow-hidden border-2 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 ${
                i === active ? 'border-[var(--brand)]' : 'border-[#DCE3F0]'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[v.id]}
                alt={`${category} ${v.id} thumbnail`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}