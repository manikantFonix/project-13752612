'use client';

import { useEffect, useState } from 'react';
import { focusRingVar } from '../settings/theme/tokens';
import { presets, isHex, normalizeHex, contrastVsWhite, type BrandPreset } from './data';

interface Props {
  color: string;
  onChange: (hex: string) => void;
}

function Swatch({ p, selected, onPick }: { p: BrandPreset; selected: boolean; onPick: (h: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPick(p.hex)}
      aria-label={`${p.name} ${p.hex}`}
      className="flex flex-col items-center gap-1.5"
    >
      <span
        aria-hidden="true"
        className={`w-11 h-11 rounded-full transition-all duration-150 ${
          selected ? 'ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--surface)]' : ''
        } ${focusRingVar}`}
        style={{ background: p.hex }}
      />
      <span className="text-[11px] text-[var(--text-sec)]">{p.name}</span>
    </button>
  );
}

export default function ColorField({ color, onChange }: Props) {
  const [hexText, setHexText] = useState(color);

  useEffect(() => {
    setHexText(color);
  }, [color]);

  const valid = isHex(color);
  const ratio = valid ? contrastVsWhite(color) : 0;
  const pass = valid && ratio >= 4.5;
  const custom = !presets.some((p) => p.hex.toLowerCase() === color.toLowerCase());

  const handleHex = (v: string) => {
    setHexText(v);
    const normalized = normalizeHex(v);
    if (normalized) onChange(normalized);
  };

  return (
    <div>
      <p className="text-[13px] font-medium text-[var(--text)]">Primary color</p>
      <p className="mt-1 text-[12px] text-[var(--text-sec)]">
        Used for buttons and links on the things your customers see. White text
        sits on it, so it has to be dark enough to read.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {presets.map((p) => (
          <Swatch
            key={p.hex}
            p={p}
            selected={p.hex.toLowerCase() === color.toLowerCase()}
            onPick={onChange}
          />
        ))}
      </div>

      <div className="mt-6">
        <p className="text-[13px] text-[var(--text-sec)]">Or enter your own</p>
        <div className="mt-2 flex items-center gap-3">
          <input
            type="color"
            value={valid ? color : '#000000'}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Pick a custom color"
            className={`w-10 h-10 p-0 border border-[var(--border)] rounded-[12px] bg-[var(--surface)] cursor-pointer ${focusRingVar}`}
          />
          <input
            type="text"
            value={hexText}
            onChange={(e) => handleHex(e.target.value)}
            placeholder="#000000"
            aria-label="Custom color hex value"
            className={`w-[180px] h-10 px-3 text-[13px] tabular-nums text-[var(--text)] bg-[var(--surface)] border rounded-[12px] outline-none placeholder:[var(--text-sec)] ${focusRingVar} ${
              !pass ? 'border-[var(--border)] focus:border-[var(--accent)]' : 'border-[var(--border)] focus:border-[var(--accent)]'
            }`}
          />
        </div>

        {!pass && (
          <div className="mt-3 border-l-2 border-[var(--alert)] px-3 py-3">
            <p className="text-[13px] text-[var(--alert)]">
              This color is too light to read text on. Try a darker shade.
            </p>
            <p className="mt-1 text-[12px] text-[var(--text-sec)]">
              It reaches {ratio.toFixed(1)}:1 against white. It needs at least 4.5:1.
            </p>
          </div>
        )}
        {pass && custom && (
          <p className="mt-3 text-[12px] text-[var(--success)]">
            Reaches {ratio.toFixed(1)}:1 against white.
          </p>
        )}
      </div>
    </div>
  );
}