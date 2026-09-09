'use client';

import { INPUT_BASE } from './tokens';

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autocomplete?: string;
  error?: string;
  hint?: string;
  onEnter?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  autocomplete,
  error,
  hint,
  onEnter,
  inputRef,
}: Props) {
  const describedBy = error
    ? `${id}-error`
    : hint
    ? `${id}-hint`
    : undefined;
  const border = error ? 'border-[#A8552A] focus:border-[#A8552A]' : 'border-[#DCE3F0] focus:border-[#152E56]';

  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-medium text-[#16233E]">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autocomplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (onEnter && e.key === 'Enter') {
            e.preventDefault();
            onEnter();
          }
        }}
        className={`mt-2 ${INPUT_BASE} ${border}`}
      />
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