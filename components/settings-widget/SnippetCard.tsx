'use client';

import { useState } from 'react';
import {
  EMBED_KEY,
  focusRing,
  SNIPPET,
  STATUS_LABEL,
  type WidgetState,
} from './data';
import RotateKeyDialog from './RotateKeyDialog';

export default function SnippetCard({ state }: { state: WidgetState }) {
  const [copied, setCopied] = useState(state === 'snippetCopied');
  const [rotateOpen, setRotateOpen] = useState(state === 'rotateConfirm');
  const [rotating, setRotating] = useState(state === 'rotating');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPET);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const confirmRotate = () => {
    setRotateOpen(false);
    setRotating(true);
    window.setTimeout(() => setRotating(false), 1600);
  };

  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-6">
      <h3 className="text-[15px] font-medium text-[#16233E]">Your snippet</h3>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">
        Paste this into your website where you want the widget to appear.
      </p>

      <div className="mt-4 border border-[#DCE3F0] rounded-[12px] bg-[#F3F6FC] p-4">
        <div className="flex items-start justify-between gap-4">
          <code
            tabIndex={0}
            className="block flex-1 font-mono text-[12px] leading-relaxed text-[#16233E] break-all whitespace-pre-wrap select-text"
          >
            {SNIPPET}
          </code>
          <button
            type="button"
            onClick={copy}
            className={`h-9 px-4 shrink-0 text-[13px] font-medium bg-white border border-[#DCE3F0] rounded-full transition-colors duration-150 whitespace-nowrap ${focusRing} ${
              copied
                ? 'text-[#3D6B54]'
                : 'text-[#16233E] hover:bg-[#EDF1FA]'
            }`}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <span aria-live="polite" className="sr-only">
          {copied ? 'Snippet copied to clipboard.' : ''}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-[12px] text-[#5D6C8A]">Key</span>
          <span className="text-[13px] text-[#16233E] tabular-nums">
            {EMBED_KEY}
          </span>
        </div>
        <p className="mt-1 text-[12px] text-[#5D6C8A]">{STATUS_LABEL.keyNote}</p>
      </div>

      <div className="mt-5 pt-5 border-t border-[#DCE3F0]">
        <button
          type="button"
          onClick={() => setRotateOpen(true)}
          disabled={rotating}
          className={`h-9 px-4 text-[13px] font-medium text-[#A8552A] hover:text-[#91441E] transition-colors duration-150 whitespace-nowrap disabled:text-[#C6D0E6] disabled:hover:text-[#C6D0E6] ${focusRing}`}
        >
          {rotating ? 'Rotating key…' : 'Rotate key'}
        </button>
      </div>

      <RotateKeyDialog
        open={rotateOpen}
        onClose={() => setRotateOpen(false)}
        onConfirm={confirmRotate}
      />
    </section>
  );
}