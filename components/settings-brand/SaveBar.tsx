'use client';

import { focusRingVar } from '../settings/theme/tokens';

interface Props {
  dirty: boolean;
  saving: boolean;
  failed: boolean;
  canSave: boolean;
  reason: string;
  onSave: () => void;
  onDiscard: () => void;
}

export default function SaveBar({
  dirty,
  saving,
  failed,
  canSave,
  reason,
  onSave,
  onDiscard,
}: Props) {
  if (!dirty && !saving && !failed) return null;

  return (
    <div className="flex flex-col items-end gap-2">
      {failed && (
        <p className="text-[13px] text-[var(--alert)]">
          We couldn't save that. Nothing has changed — try again.
        </p>
      )}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDiscard}
          disabled={saving}
          className={`h-9 px-3 text-[13px] font-medium text-[var(--text-sec)] hover:text-[var(--text)] transition-colors duration-150 whitespace-nowrap ${focusRingVar} ${
            saving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Discard
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={saving || !canSave}
          className={`h-9 px-5 text-[13px] font-medium bg-[var(--accent)] text-[var(--on-accent)] rounded-full hover:bg-[var(--accent-hover)] transition-colors duration-150 whitespace-nowrap ${focusRingVar} ${
            saving || !canSave ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <i className="ri-loader-4-line text-[16px] animate-spin" />
              Saving…
            </span>
          ) : (
            'Save changes'
          )}
        </button>
      </div>
      {!saving && !canSave && dirty && (
        <p className="text-[13px] text-[var(--text-sec)]">{reason}</p>
      )}
    </div>
  );
}