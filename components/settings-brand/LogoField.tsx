'use client';

import { useRef } from 'react';
import { focusRingVar } from '../settings/theme/tokens';
import { type LogoRefusal } from './data';

interface Props {
  logo: string | null;
  refusal: LogoRefusal;
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
}

const REFUSALS: Record<'type' | 'size' | 'dims', string> = {
  type: "That file type isn't supported. Use a PNG, JPEG or SVG.",
  size: 'That file is 4.1 MB. The limit is 2 MB.',
  dims: "That image is 140px on its shorter side. It needs at least 200px, or it'll look rough in a printed document.",
};

export default function LogoField({ logo, refusal, onUpload, onRemove }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpload(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-medium text-[var(--text)]">Logo</span>
        <span className="text-[13px] text-[var(--text-sec)]">Optional</span>
      </div>

      {logo ? (
        <div className="mt-3 w-[160px]">
          <div className="h-[140px] w-full bg-[var(--muted)] rounded-[12px] flex items-center justify-center p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt="Brand logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className={`h-9 px-4 text-[13px] font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-full hover:bg-[var(--muted)] transition-colors duration-150 whitespace-nowrap ${focusRingVar}`}
            >
              Replace
            </button>
            <button
              type="button"
              onClick={onRemove}
              className={`h-9 px-2 text-[13px] font-medium text-[var(--alert)] hover:text-[var(--alert-strong)] transition-colors duration-150 whitespace-nowrap ${focusRingVar}`}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`mt-3 w-full h-[140px] bg-[var(--surface)] border border-dashed border-[var(--border-strong)] rounded-[12px] flex flex-col items-center justify-center gap-1.5 hover:border-[var(--accent)] transition-colors duration-150 ${focusRingVar}`}
        >
          <span className="w-6 h-6 flex items-center justify-center text-[var(--text-sec)]">
            <i className="ri-image-add-line text-[24px]" />
          </span>
          <span className="text-[13px] text-[var(--text)]">Add your logo</span>
          <span className="text-[13px] text-[var(--text-sec)]">
            PNG, JPEG or SVG. A transparent PNG works best.
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/svg+xml"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {logo ? (
        <p className="mt-2 text-[12px] text-[var(--text-sec)]">
          Up to 2 MB, and at least 200px on the shorter side so it stays sharp in a PDF.
        </p>
      ) : refusal ? (
        <p className="mt-2 text-[13px] text-[var(--alert)]">{REFUSALS[refusal]}</p>
      ) : (
        <p className="mt-2 text-[12px] text-[var(--text-sec)]">
          Up to 2 MB, and at least 200px on the shorter side so it stays sharp in a PDF.
        </p>
      )}
    </div>
  );
}