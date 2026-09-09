'use client';

import { useEffect, useRef, useState } from 'react';
import { FOCUS_RING } from './requests/data';

interface Props {
  onClose: () => void;
  onUse: (transcript: string) => void;
}

const SAMPLE =
  'A slim rose gold band with a single round brilliant stone set high in a raised basket. The customer wants a comfort-fit profile and no engraving.';

export default function VoiceDialog({ onClose, onUse }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      const els = Array.from(
        wrap.querySelectorAll<HTMLElement>('button, input, textarea, [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.hasAttribute('disabled'));
      if (els.length === 0) return;
      const first = els[0];
      const lastEl = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (timer.current) clearInterval(timer.current);
      prev?.focus();
    };
  }, [onClose]);

  const start = () => {
    setRecording(true);
    setSeconds(0);
    setTranscript('');
    timer.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  };

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setRecording(false);
    setTranscript((t) => (t.trim() === '' ? SAMPLE : t));
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[#16233E]/40" onClick={onClose} aria-hidden />
      <div
        ref={wrapRef}
        role="dialog"
        aria-modal="true"
        aria-label="Describe it out loud"
        className="relative w-full max-w-[520px] bg-white border border-[#DCE3F0] rounded-[12px] p-6"
      >
        <h2 className="text-[20px] font-semibold text-[#16233E]">
          Describe it out loud
        </h2>

        <div className="mt-6 flex flex-col items-center">
          <button
            type="button"
            onClick={recording ? stop : start}
            aria-label={recording ? 'Stop recording' : 'Start recording'}
            className={`w-14 h-14 flex items-center justify-center rounded-full text-white transition-colors duration-150 ${FOCUS_RING} ${
              recording ? 'bg-[#91441E]' : 'bg-[#152E56] hover:bg-[#172D54]'
            }`}
          >
            <i className={`${recording ? 'ri-stop-line' : 'ri-mic-line'} text-[24px] w-6 h-6 flex items-center justify-center`} />
          </button>
          {recording && (
            <p className="mt-3 text-[13px] text-[#16233E] tabular-nums">
              {mm}:{ss}
            </p>
          )}
        </div>

        {transcript && (
          <div className="mt-6">
            <p className="text-[12px] text-[#5D6C8A]">
              Check this before you generate — edit anything that came out wrong.
            </p>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={4}
              className="mt-2 w-full p-3 text-[13px] text-[#16233E] bg-[#F3F6FC] border border-[#DCE3F0] rounded-[12px] outline-none resize-none focus:border-[#152E56] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
            />
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className={`h-9 px-4 text-[13px] font-medium text-[#16233E] hover:text-[#152E56] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Cancel
          </button>
          <button
            type="button"
            data-autofocus
            disabled={!transcript}
            onClick={() => {
              onUse(transcript);
              onClose();
            }}
            className={`h-9 px-4 text-[13px] font-medium rounded-full border whitespace-nowrap ${FOCUS_RING} ${
              transcript
                ? 'bg-[#152E56] border-[#152E56] text-white hover:bg-[#172D54]'
                : 'bg-[#EDF1FA] border-[#EDF1FA] text-[#5D6C8A] cursor-not-allowed'
            } transition-colors duration-150`}
          >
            Use this
          </button>
        </div>
      </div>
    </div>
  );
}