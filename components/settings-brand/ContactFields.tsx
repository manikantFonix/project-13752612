'use client';

import { focusRingVar } from '../settings/theme/tokens';

interface Props {
  email: string;
  phone: string;
  emailError: boolean;
  onEmail: (v: string) => void;
  onPhone: (v: string) => void;
}

export default function ContactFields({
  email,
  phone,
  emailError,
  onEmail,
  onPhone,
}: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="brand-email"
            className="text-[13px] font-medium text-[var(--text)]"
          >
            Business email
          </label>
          <span className="text-[13px] text-[var(--text-sec)]">Optional</span>
        </div>
        <input
          id="brand-email"
          type="email"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          className={`mt-2 w-full h-10 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border rounded-[12px] outline-none placeholder:[var(--text-sec)] ${focusRingVar} ${
            emailError
              ? 'border-[var(--alert)] focus:border-[var(--alert)]'
              : 'border-[var(--border)] focus:border-[var(--accent)]'
          }`}
        />
        {emailError ? (
          <p className="mt-1.5 text-[13px] text-[var(--alert)]">
            Enter a valid email address.
          </p>
        ) : (
          <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
            Shown to customers on your shared catalog and PDFs.
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="brand-phone"
            className="text-[13px] font-medium text-[var(--text)]"
          >
            Phone number
          </label>
          <span className="text-[13px] text-[var(--text-sec)]">Optional</span>
        </div>
        <input
          id="brand-phone"
          type="text"
          value={phone}
          onChange={(e) => onPhone(e.target.value)}
          className={`mt-2 w-full h-10 px-3 text-[13px] text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-[12px] outline-none focus:border-[var(--accent)] placeholder:[var(--text-sec)] ${focusRingVar}`}
        />
        <p className="mt-1.5 text-[12px] text-[var(--text-sec)]">
          Shown exactly as you type it.
        </p>
      </div>
    </div>
  );
}