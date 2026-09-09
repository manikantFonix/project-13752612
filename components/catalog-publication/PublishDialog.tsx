'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { type PublishCounts, type PublicationData } from './types';
import { useDismissOnEsc, useReturnFocus } from './useDialog';

interface Props {
  open: boolean;
  catalogName: string;
  data: PublicationData;
  onCancel: () => void;
  onPublished: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  busy?: boolean;
}

const lines: { key: keyof PublishCounts; color: 'navy' | 'muted' | 'warn' }[] = [
  { key: 'servable', color: 'navy' },
  { key: 'generating', color: 'muted' },
  { key: 'flagged', color: 'warn' },
  { key: 'inactive', color: 'muted' },
];

const lineText: Record<keyof PublishCounts, { main: (n: number) => string; sub: string }> = {
  servable: {
    main: (n) => `${n} ${n === 1 ? 'product' : 'products'} will appear`,
    sub: 'Active products whose renders have all passed.',
  },
  generating: {
    main: (n) => `${n} are still generating`,
    sub: "They'll appear on their own as they finish.",
  },
  flagged: {
    main: (n) => `${n} have flagged renders`,
    sub: "They won't appear until the photographs are replaced.",
  },
  inactive: {
    main: (n) => `${n} are set to inactive`,
    sub: 'You turned these off yourself.',
  },
};

export default function PublishDialog({
  open,
  catalogName,
  data,
  onCancel,
  onPublished,
  triggerRef,
  busy,
}: Props) {
  const [publishing, setPublishing] = useState(false);
  const [failed, setFailed] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useDismissOnEsc(open, onCancel, busy || publishing);
  useReturnFocus(open, triggerRef);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setPublishing(false);
      setFailed(false);
      cancelRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const processing = busy || publishing;
  const present = lines.filter((l) => data.counts[l.key] > 0);
  const allZero = present.length === 0;

  const publish = () => {
    setFailed(false);
    setPublishing(true);
    timer.current = setTimeout(() => {
      setPublishing(false);
      onPublished();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(22,35,62,0.4)]"
        onClick={() => !processing && onCancel()}
      />
      <div className="relative w-[560px] bg-white border border-[#DCE3F0] rounded-[12px] p-7">
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
          Publish {catalogName}?
        </h2>
        <p className="mt-2 text-[13px] text-[#16233E]">
          Anyone with the link will be able to see this catalog. There's no
          sign-in and no account — the link is the only thing needed.
        </p>

        <div className="mt-4 bg-[#F3F6FC] rounded-[12px] p-4">
          <p className="text-[13px] font-medium text-[#5D6C8A]">
            What will appear
          </p>
          {allZero ? (
            <p className="mt-2 text-[13px] text-[#16233E]">
              No products will appear yet. You can still publish — products
              show up as they become ready.
            </p>
          ) : (
            <div className="mt-3 space-y-3">
              {present.map((l) => {
                const n = data.counts[l.key];
                const t = lineText[l.key];
                return (
                  <div key={l.key}>
                    <p
                      className={`text-[13px] font-medium tabular-nums ${
                        l.color === 'navy'
                          ? 'text-[#16233E]'
                          : l.color === 'warn'
                          ? 'text-[#A8552A]'
                          : 'text-[#5D6C8A]'
                      }`}
                    >
                      {t.main(n)}
                    </p>
                    <p className="text-[12px] text-[#5D6C8A]">{t.sub}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <p className="mt-4 text-[13px] text-[#5D6C8A]">
          {data.firstPublish
            ? "A share link will be created. It's permanent — it never changes, even if you unpublish and publish again later."
            : "Your existing link starts working again. It's the same link as before."}
        </p>

        <p className="mt-2 text-[12px] text-[#5D6C8A]">
          Search engines are asked not to index it.
        </p>

        {failed && (
          <div className="mt-4 border-l-2 border-[#A8552A] pl-3">
            <p className="text-[13px] text-[#A8552A]">
              We couldn't publish this catalog. Nothing has changed — try
              again.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            ref={cancelRef}
            onClick={() => !processing && onCancel()}
            className="px-2 h-9 text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            Cancel
          </button>
          <button
            onClick={publish}
            disabled={processing}
            className="h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] disabled:opacity-70"
          >
            {processing && (
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {processing ? 'Publishing…' : 'Publish catalog'}
          </button>
        </div>
      </div>
    </div>
  );
}