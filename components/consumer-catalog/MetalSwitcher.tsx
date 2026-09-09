'use client';

import { METAL_LABEL, metalHex, type Metal } from './data';

export default function MetalSwitcher({
  metals,
  value,
  onChange,
  brandColor,
}: {
  metals: Metal[];
  value: Metal;
  onChange: (m: Metal) => void;
  brandColor: string;
}) {
  if (metals.length <= 1) return null;
  return (
    <div className="flex items-center gap-4">
      {metals.map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          aria-pressed={value === m}
          className="flex flex-col items-center gap-1.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]"
        >
          <span
            aria-hidden
            className="w-8 h-8 rounded-full border transition-all duration-150"
            style={{
              backgroundColor: metalHex(m),
              borderColor: value === m ? brandColor : '#C6D0E6',
              boxShadow: value === m ? `0 0 0 2px ${brandColor}` : undefined,
            }}
          />
          <span
            className={`text-[12px] ${
              value === m
                ? 'font-medium text-[#16233E]'
                : 'text-[#5D6C8A]'
            }`}
          >
            {METAL_LABEL[m]}
          </span>
        </button>
      ))}
    </div>
  );
}