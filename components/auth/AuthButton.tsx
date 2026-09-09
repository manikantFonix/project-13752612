'use client';

import { PRIMARY_BTN } from './tokens';

interface Props {
  children: string;
  busyLabel: string;
  submitting: boolean;
  disabled: boolean;
  reason?: string;
  onClick?: () => void;
  type?: 'submit' | 'button';
}

export default function AuthButton({
  children,
  busyLabel,
  submitting,
  disabled,
  reason,
  onClick,
  type = 'submit',
}: Props) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || submitting}
        className={`${PRIMARY_BTN} flex items-center justify-center gap-2`}
      >
        {submitting && (
          <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
        )}
        {submitting ? busyLabel : children}
      </button>
      {reason && disabled && !submitting && (
        <p className="mt-2 text-[13px] text-[#5D6C8A] text-center">{reason}</p>
      )}
    </div>
  );
}