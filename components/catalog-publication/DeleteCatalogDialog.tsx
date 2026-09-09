'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { useRouter } from 'next/navigation';
import type { PublicationData } from './types';
import { useDismissOnEsc, useReturnFocus } from './useDialog';

interface Props {
  open: boolean;
  catalogName: string;
  data: PublicationData;
  onCancel: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  busy?: boolean;
}

export default function DeleteCatalogDialog({
  open,
  catalogName,
  data,
  onCancel,
  triggerRef,
  busy,
}: Props) {
  const [deleting, setDeleting] = useState(false);
  const [failed, setFailed] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useDismissOnEsc(open, onCancel, busy || deleting);
  useReturnFocus(open, triggerRef);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setDeleting(false);
      setFailed(false);
      cancelRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const bullets = [
    'The catalog itself',
    `${data.productCount} products`,
    `Every photograph you uploaded for them`,
    `${data.renders} generated renders`,
  ];
  if (data.published) {
    bullets.push(
      'The share link — it stops working permanently and can never be brought back.',
    );
  }

  const processing = busy || deleting;

  const del = () => {
    setFailed(false);
    setDeleting(true);
    timer.current = setTimeout(() => {
      router.push('/');
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
          Delete {catalogName} permanently?
        </h2>
        <p className="mt-2 text-[13px] text-[#16233E]">
          This destroys, in one go:
        </p>

        <ul className="mt-2 space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="text-[13px] tabular-nums text-[#16233E]">
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-4 bg-[#F3F6FC] rounded-[12px] p-3">
          <p className="text-[13px] text-[#16233E]">
            Inquiries you've already received stay in your lead inbox and stay
            fully readable — the customer's details, the pieces they asked about
            and the images they saw. Nothing there is affected.
          </p>
        </div>

        {data.rendersGenerating > 0 && (
          <p className="mt-4 text-[13px] tabular-nums text-[#A8552A]">
            {data.rendersGenerating} renders are still generating. They'll be
            abandoned, and the renders already used aren't returned.
          </p>
        )}

        <p className="mt-2 text-[13px] text-[#A8552A]">
          This cannot be undone. There's no trash and no restore — not for you,
          and not for support.
        </p>

        {failed && (
          <div className="mt-4 border-l-2 border-[#A8552A] pl-3">
            <p className="text-[13px] text-[#A8552A]">
              We couldn't delete this catalog. Nothing has changed — try again.
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
            onClick={del}
            disabled={processing}
            className="h-9 px-4 text-[13px] font-medium text-white bg-[#A8552A] border border-[#A8552A] rounded-full hover:bg-[#91441E] transition-colors duration-150 whitespace-nowrap flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] disabled:opacity-70"
          >
            {processing && (
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {processing ? 'Deleting…' : 'Delete permanently'}
          </button>
        </div>
      </div>
    </div>
  );
}