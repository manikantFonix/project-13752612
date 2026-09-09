'use client';

interface Props {
  mode: 'custom' | 'catalog';
  onChange: (mode: 'custom' | 'catalog') => void;
  count: number;
}

export default function SegmentedControl({ mode, onChange, count }: Props) {
  const base =
    'h-9 px-4 rounded-full text-[13px] font-medium transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-white border border-[#DCE3F0]">
      <button
        onClick={() => onChange('custom')}
        className={`${base} ${
          mode === 'custom'
            ? 'bg-[#152E56] text-white'
            : 'text-[#5D6C8A] hover:text-[#16233E]'
        }`}
      >
        Custom design
      </button>
      <button
        onClick={() => onChange('catalog')}
        className={`${base} ${
          mode === 'catalog'
            ? 'bg-[#152E56] text-white'
            : 'text-[#5D6C8A] hover:text-[#16233E]'
        }`}
      >
        Catalog
        <span
          className={`inline-flex items-center justify-center ml-1.5 h-5 min-w-5 px-1.5 rounded-full text-[11px] leading-none tabular-nums ${
            mode === 'catalog'
              ? 'bg-white text-[#152E56]'
              : 'bg-[#152E56]/10 text-[#152E56]'
          }`}
        >
          {count}
        </span>
      </button>
    </div>
  );
}