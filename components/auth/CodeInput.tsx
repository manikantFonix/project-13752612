'use client';

import { useRef } from 'react';
import { RING } from './tokens';

const LABEL_ID = 'verification-code-label';

export default function CodeInput({
  value,
  onChange,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const arr = Array.from({ length: 6 }, (_, i) => value[i] || '');
  const border = invalid
    ? 'border-[#A8552A] focus:border-[#A8552A]'
    : 'border-[#DCE3F0] focus:border-[#152E56]';

  const commit = (next: string, focusIndex?: number) => {
    onChange(next.slice(0, 6));
    if (typeof focusIndex === 'number') {
      refs.current[Math.min(Math.max(focusIndex, 0), 5)]?.focus();
    }
  };

  const handleChange = (i: number, raw: string) => {
    if (raw.length > 1) {
      const digits = raw.replace(/\D/g, '');
      commit(digits.slice(0, 6), digits.length - 1);
      return;
    }
    if (raw === '') {
      const next = arr.slice();
      next[i] = '';
      commit(next.join(''));
      return;
    }
    if (!/^\d$/.test(raw)) return;
    const next = arr.slice();
    next[i] = raw;
    commit(next.join(''), i + 1);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (arr[i] === '') {
        refs.current[Math.max(i - 1, 0)]?.focus();
      } else {
        const next = arr.slice();
        next[i] = '';
        commit(next.join(''));
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      refs.current[Math.max(i - 1, 0)]?.focus();
    } else if (e.key === 'ArrowRight') {
      refs.current[Math.min(i + 1, 5)]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!digits) return;
    e.preventDefault();
    commit(digits.slice(0, 6), digits.length - 1);
  };

  return (
    <div>
      <span id={LABEL_ID} className="sr-only">
        Verification code
      </span>
      <div
        role="group"
        aria-labelledby={LABEL_ID}
        className="flex justify-between gap-2"
        onPaste={handlePaste}
      >
        {arr.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            value={d}
            maxLength={1}
            aria-labelledby={LABEL_ID}
            aria-invalid={invalid ? true : undefined}
            onFocus={(e) => e.currentTarget.select()}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-12 h-12 rounded-[12px] border text-center text-[20px] font-medium text-[#16233E] tabular-nums outline-none transition-colors duration-150 ${border} ${RING}`}
          />
        ))}
      </div>
    </div>
  );
}