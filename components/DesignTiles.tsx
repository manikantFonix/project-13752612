'use client';

export const JEWELRY_TYPES = [
  { id: 'pendant', label: 'Pendant', icon: 'ri-vip-diamond-line' },
  { id: 'ring', label: 'Ring', icon: 'ri-circle-line' },
  { id: 'bracelet', label: 'Bracelet', icon: 'ri-vip-crown-line' },
  { id: 'necklace', label: 'Necklace', icon: 'ri-shapes-line' },
  { id: 'earring', label: 'Earring', icon: 'ri-drop-line' },
  { id: 'body-jewelry', label: 'Body jewelry', icon: 'ri-heart-line' },
  { id: 'brooch', label: 'Brooch', icon: 'ri-medal-line' },
];

export const MORE_TYPES = [
  { id: 'grillz', label: 'Grillz', icon: 'ri-emotion-happy-line' },
  { id: 'watch', label: 'Watch', icon: 'ri-time-line' },
  { id: 'bail', label: 'Bail', icon: 'ri-attachment-line' },
  { id: 'clasp', label: 'Clasp', icon: 'ri-lock-line' },
  { id: 'buckle', label: 'Buckle', icon: 'ri-toggle-line' },
  { id: 'cufflink', label: 'Cufflink', icon: 'ri-suitcase-line' },
];

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
  more: boolean;
  onToggleMore: () => void;
}

export default function DesignTiles({ selected, onSelect, more, onToggleMore }: Props) {
  const tile = (t: { id: string; label: string; icon: string }) => {
    const active = selected === t.id;
    return (
      <div key={t.id} className="w-[84px] flex flex-col items-center">
        <button
          type="button"
          onClick={() => onSelect(t.id)}
          aria-pressed={active}
          className={`w-16 h-16 rounded-[18px] flex items-center justify-center transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
            active
              ? 'border-2 border-[#152E56] bg-white'
              : 'border border-[#DCE3F0] bg-white hover:border-[#C6D0E6]'
          }`}
        >
          <i
            className={`${t.icon} text-[26px] ${
              active ? 'text-[#152E56]' : 'text-[#5D6C8A]'
            }`}
          />
        </button>
        <span
          className={`mt-2 text-[12px] leading-none text-center font-medium ${
            active ? 'text-[#16233E]' : 'text-[#5D6C8A]'
          }`}
        >
          {t.label}
        </span>
      </div>
    );
  };

  const moreTile = (
    <div key="more" className="w-[84px] flex flex-col items-center">
      <button
        type="button"
        onClick={onToggleMore}
        aria-expanded={more}
        className="w-16 h-16 rounded-[18px] border border-dashed border-[#C6D0E6] bg-white flex items-center justify-center transition-colors duration-150 cursor-pointer hover:border-[#5D6C8A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
      >
        <i className="ri-add-line text-[26px] text-[#5D6C8A]" />
      </button>
      <span className="mt-2 text-[12px] leading-none text-center font-medium text-[#5D6C8A]">
        {more ? 'Less' : 'More'}
      </span>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap justify-center gap-3">
        {JEWELRY_TYPES.map(tile)}
        {moreTile}
      </div>
      {more && (
        <div className="flex flex-wrap justify-center gap-3">
          {MORE_TYPES.map(tile)}
        </div>
      )}
    </div>
  );
}