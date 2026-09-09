'use client';

interface Props {
  checked: boolean;
  onChange?: () => void;
  label: string;
  locked?: boolean;
  disabled?: boolean;
}

export default function Switch({ checked, onChange, label, locked, disabled }: Props) {
  const inert = locked || disabled;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={inert}
      onClick={onChange}
      style={{ background: checked ? 'var(--track-on)' : 'var(--track-off)' }}
      className={`relative w-11 h-6 rounded-full transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] ${
        locked ? 'opacity-60 cursor-not-allowed' : disabled ? 'cursor-not-allowed' : ''
      }`}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-[var(--knob)]"
        style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }}
      />
    </button>
  );
}