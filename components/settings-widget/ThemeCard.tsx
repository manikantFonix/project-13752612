'use client';

import { useState } from 'react';
import {
  focusRing,
  installStatusFor,
  STATUS_LABEL,
  themeCopy,
  themeStatusFor,
  type WidgetState,
} from './data';

const previewTiles = [
  { bg: '#E4E9F4', label: 'Rings' },
  { bg: '#E8F1EC', label: 'Necklaces' },
  { bg: '#C6D0E6', label: 'Bracelets' },
];

export default function ThemeCard({ state }: { state: WidgetState }) {
  const status = themeStatusFor(state);
  const c = themeCopy[status];
  const reReadDisabled =
    state !== 'themeReReading' && installStatusFor(state) === 'waiting';
  const [reading, setReading] = useState(state === 'themeReReading');
  const disabled = reReadDisabled || reading;

  const handleRead = () => {
    setReading(true);
    window.setTimeout(() => setReading(false), 1600);
  };

  const buttonLabel = reading ? 'Reading…' : 'Read my site again';
  const note = reReadDisabled
    ? STATUS_LABEL.reReadDisabledNote
    : STATUS_LABEL.reReadNote;

  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-6">
      <h3 className="text-[15px] font-medium text-[#16233E]">How it looks</h3>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">
        The widget reads your website and matches it — your colors, your
        typeface, your button shape. There's nothing to set up.
      </p>

      <p className="mt-3 text-[13px] font-medium leading-none" style={{ color: c.color }}>
        {c.label}
      </p>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">{c.explanation}</p>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={handleRead}
          disabled={disabled}
          className={`h-9 px-4 shrink-0 text-[13px] font-medium bg-white border border-[#DCE3F0] rounded-full transition-colors duration-150 whitespace-nowrap ${focusRing} ${
            disabled
              ? 'text-[#C6D0E6] cursor-not-allowed'
              : 'text-[#16233E] hover:bg-[#EDF1FA]'
          }`}
        >
          {buttonLabel}
        </button>
        <p className="text-[12px] text-[#5D6C8A]">{note}</p>
      </div>

      <div className="mt-6">
        <p className="text-[12px] text-[#5D6C8A]">What your customers see.</p>
        <div
          aria-hidden="true"
          className="mt-2 border border-[#DCE3F0] rounded-[12px] overflow-hidden h-[320px] bg-[#F3F6FC] p-6"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-1/3 rounded-full bg-[#DCE3F0]" />
            <div className="h-6 px-3 rounded-full bg-white border border-[#DCE3F0] flex items-center">
              <span className="text-[11px] text-[#5D6C8A]">Design a piece</span>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {previewTiles.map((t) => (
              <div key={t.label} className="flex flex-col gap-2">
                <div
                  className="h-16 rounded-[10px] flex items-center justify-center"
                  style={{ background: t.bg }}
                >
                  <span className="text-[11px] font-medium text-[#16233E]">
                    {t.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 h-10 rounded-[10px] border border-[#DCE3F0] bg-white flex items-center px-3">
            <span className="text-[12px] text-[#748AB4]">
              Describe the piece you have in mind…
            </span>
          </div>
          <div className="mt-3 h-9 rounded-full bg-[#152E56] flex items-center justify-center">
            <span className="text-[12px] font-medium text-white">Design it</span>
          </div>
        </div>
      </div>
    </section>
  );
}