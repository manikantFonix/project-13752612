'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import type { PublicationData } from './types';
import { useDismissOnEsc, useReturnFocus } from './useDialog';

interface Props {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  data: PublicationData;
  onUnpublish: () => void;
  onDelete: () => void;
}

function truncateMiddle(url: string, head = 38, tail = 16) {
  const max = head + tail;
  if (url.length <= max) return url;
  return `${url.slice(0, head)}…${url.slice(url.length - tail)}`;
}

export default function PublishedPanel({
  open,
  onClose,
  triggerRef,
  data,
  onUnpublish,
  onDelete,
}: Props) {
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useDismissOnEsc(open, onClose);
  useReturnFocus(open, triggerRef);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setCopied(false);
      if (timer.current) clearTimeout(timer.current);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    linkRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const els = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el !== linkRef.current);
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        onClose();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(data.shareLink);
    } catch {
      // clipboard unavailable
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={panelRef}
      className="absolute top-[calc(100%+8px)] right-0 w-[400px] bg-white border border-[#DCE3F0] rounded-[12px] p-5 z-50"
      aria-label="Published catalog options"
    >
      <h3 className="text-[15px] font-medium text-[#16233E]">Published</h3>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">
        Anyone with this link can view your catalog.
      </p>

      <div className="mt-4">
        <label className="block text-[12px] text-[#5D6C8A]">Share link</label>
        <div className="mt-1 flex items-center gap-2">
          <div
            ref={linkRef}
            tabIndex={-1}
            className="flex-1 h-10 px-3 bg-[#F3F6FC] border border-[#DCE3F0] rounded-[12px] flex items-center outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            <span className="text-[13px] text-[#16233E] truncate">
              {truncateMiddle(data.shareLink)}
            </span>
          </div>
          <button
            onClick={copy}
            className={`h-9 px-4 text-[13px] font-medium rounded-full border border-[#DCE3F0] bg-white transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
              copied ? 'text-[#3D6B54]' : 'text-[#16233E] hover:bg-[#EDF1FA]'
            }`}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <span aria-live="polite" className="sr-only">
          {copied ? 'Link copied' : ''}
        </span>
      </div>

      <p className="mt-2 text-[12px] text-[#5D6C8A]">
        This link never changes. Unpublishing takes it offline, and publishing
        again brings the same link back.
      </p>

      <div className="mt-4 border-t border-[#DCE3F0]" />

      <button
        onClick={onUnpublish}
        className="mt-4 w-full h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
      >
        Unpublish
      </button>

      <div className="mt-4 border-t border-[#DCE3F0]" />

      <button
        onClick={onDelete}
        className="mt-2 w-full h-9 px-4 text-[13px] font-medium text-[#A8552A] bg-white border border-[#A8552A] rounded-full hover:bg-[#EDF1FA] hover:text-[#91441E] hover:border-[#91441E] transition-colors duration-150 whitespace-nowrap flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
      >
        <i className="ri-delete-bin-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
        Delete catalog
      </button>
    </div>
  );
}