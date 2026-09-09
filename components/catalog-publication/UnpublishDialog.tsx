'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { useDismissOnEsc, useReturnFocus } from './useDialog';

interface Props {
  open: boolean;
  catalogName: string;
  onCancel: () => void;
  onUnpublished: () => void;
  triggerRef: RefObject<HTMLElement | null>;
}

export default function UnpublishDialog({
  open,
  catalogName,
  onCancel,
  onUnpublished,
  triggerRef,
}: Props) {
  const [unpublishing, setUnpublishing] = useState(false);
  const [failed, setFailed] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useDismissOnEsc(open, onCancel, unpublishing);
  useReturnFocus(open, triggerRef);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setUnpublishing(false);
      setFailed(false);
      cancelRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const unpublish = () => {
    setFailed(false);
    setUnpublishing(true);
    timer.current = setTimeout(() => {
      setUnpublishing(false);
      onUnpublished();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(22,35,62,0.4)]"
        onClick={() => !unpublishing && onCancel()}
      />
      <div className="relative w-[460px] bg-white border border-[#DCE3F0] rounded-[12px] p-7">
        <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-[#16233E]">
          Unpublish {catalogName}?
        </h2>
        <p className="mt-2 text-[13px] text-[#16233E]">
          The link stops working straight away. Anyone who opens it will see a
          page saying the catalog isn't available.
        </p>

        <div className="mt-4 bg-[#F3F6FC] rounded-[12px] p-3">
          <p className="text-[13px] text-[#5D6C8A]">
            Nothing is deleted. Your products, photographs and renders all stay
            exactly as they are. Publish again and the same link starts working
            again.
          </p>
        </div>

        {failed && (
          <div className="mt-4 border-l-2 border-[#A8552A] pl-3">
            <p className="text-[13px] text-[#A8552A]">
              We couldn't unpublish this catalog. Nothing has changed — try
              again.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            ref={cancelRef}
            onClick={() => !unpublishing && onCancel()}
            className="px-2 h-9 text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            Cancel
          </button>
          <button
            onClick={unpublish}
            disabled={unpublishing}
            className="h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] disabled:opacity-70"
          >
            {unpublishing && (
              <span className="w-3.5 h-3.5 border-2 border-[#5D6C8A]/40 border-t-[#5D6C8A] rounded-full animate-spin" />
            )}
            {unpublishing ? 'Unpublishing…' : 'Unpublish'}
          </button>
        </div>
      </div>
    </div>
  );
}