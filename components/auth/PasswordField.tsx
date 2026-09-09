'use client';

import { useState } from 'react';
import { INPUT_BASE, RING } from './tokens';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autocomplete?: string;
  error?: string;
  hint?: string;
  show?: boolean;
  onToggleShow?: () => void;
}

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  autocomplete,
  error,
  hint,
  show,
  onToggleShow,
}: Props) {
  const [internal, setInternal] = useState(false);
  const visible = show ?? internal;
  const toggle = onToggleShow ?? (() => setInternal((s) => !s));
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const border = error
    ? 'border-[#A8552A] focus:border-[#A8552A]'
    : 'border-[#DCE3F0] focus:border-[#152E56]';

  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-medium text-[#16233E]">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          autoComplete={autocomplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          className={`${INPUT_BASE} pr-11 ${border}`}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 rounded-full ${RING}`}
        >
          <i
            className={`${visible ? 'ri-eye-off-line' : 'ri-eye-line'} text-[20px] w-5 h-5 flex items-center justify-center`}
          />
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} aria-live="polite" className="mt-1.5 text-[13px] text-[#A8552A]">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[12px] text-[#5D6C8A]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}