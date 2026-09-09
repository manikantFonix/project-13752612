'use client';

import { useEffect, useRef, useState } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { FOCUS_RING } from './data';

export interface RecordedResponse {
  type: 'quote' | 'declined';
  amount: number;
  deliveryDays?: number;
  notes?: string;
}

interface Props {
  open: boolean;
  manufacturerName: string;
  onSave: (obj: RecordedResponse) => void;
  onClose: () => void;
}

export default function RecordResponseDialog({
  open,
  manufacturerName,
  onSave,
  onClose,
}: Props) {
  const [type, setType] = useState<'quote' | 'declined' | null>(null);
  const [price, setPrice] = useState('');
  const [days, setDays] = useState('');
  const [notes, setNotes] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useDialogFocus(open, cardRef, cancelRef);

  useEffect(() => {
    if (!open) return;
    setType(null);
    setPrice('');
    setDays('');
    setNotes('');
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const parsedPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
  const priceReady = !Number.isNaN(parsedPrice) && parsedPrice > 0;
  const needPrice = type === 'quote' && !priceReady;
  const disabled = !type || needPrice;

  const reason = !type
    ? 'Choose how they replied.'
    : type === 'declined'
    ? ''
    : !priceReady
    ? 'Enter a quoted price to keep this on the record.'
    : '';

  const save = () => {
    if (disabled) return;
    onSave({
      type,
      amount: type === 'quote' ? parsedPrice : 0,
      deliveryDays:
        type === 'quote' && days.trim() !== ''
          ? parseInt(days.replace(/[^0-9]/g, ''), 10)
          : undefined,
      notes: notes.trim() !== '' ? notes.trim() : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-[#16233E]/40"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="record-mfr-title"
        className="relative w-full max-w-[520px] bg-white border border-[#DCE3F0] rounded-[12px] p-7"
      >
        <h2 id="record-mfr-title" className="text-[20px] font-semibold text-[#16233E]">
          Record {manufacturerName}&#39;s response
        </h2>

        <div className="mt-4 flex flex-col gap-2" role="radiogroup">
          {(
            [
              { v: 'quote', label: 'They sent a quote' },
              { v: 'declined', label: 'They declined' },
            ] as const
          ).map((o) => (
            <label
              key={o.v}
              className={`flex items-center gap-2.5 px-3 py-2.5 border rounded-[12px] cursor-pointer transition-colors duration-150 ${FOCUS_RING} ${
                type === o.v
                  ? 'border-[#152E56] bg-[#F3F6FC]'
                  : 'border-[#DCE3F0]'
              }`}
            >
              <input
                type="radio"
                name="mfr-response"
                value={o.v}
                checked={type === o.v}
                onChange={() => setType(o.v)}
                className="sr-only"
              />
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  type === o.v ? 'border-[#152E56]' : 'border-[#C6D0E6]'
                }`}
              >
                {type === o.v && <span className="w-2 h-2 rounded-full bg-[#152E56]" />}
              </span>
              <span className="text-[13px] font-medium text-[#16233E]">
                {o.label}
              </span>
            </label>
          ))}
        </div>

        {type === 'quote' && (
          <div className="mt-4 flex flex-col gap-3">
            <label className="block">
              <span className="text-[12px] text-[#5D6C8A]">Quoted price</span>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-[#5D6C8A]">
                  $
                </span>
                <input
                  inputMode="decimal"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="5,200"
                  className={`w-full h-10 pl-7 pr-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] tabular-nums outline-none placeholder:text-[#C6D0E6] ${FOCUS_RING}`}
                />
              </div>
            </label>
            <label className="block">
              <span className="text-[12px] text-[#5D6C8A]">
                Estimated delivery in days
                <span className="font-normal text-[#C6D0E6]"> (optional)</span>
              </span>
              <input
                inputMode="numeric"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="14"
                className={`mt-1 w-full h-10 px-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] tabular-nums outline-none placeholder:text-[#C6D0E6] ${FOCUS_RING}`}
              />
            </label>
            <label className="block">
              <span className="text-[12px] text-[#5D6C8A]">
                Their notes
                <span className="font-normal text-[#C6D0E6]"> (optional)</span>
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={500}
                rows={3}
                placeholder="Any specifics worth keeping on the record."
                className={`mt-1 w-full px-3 py-2 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#C6D0E6] resize-none ${FOCUS_RING}`}
              />
            </label>
          </div>
        )}

        <p className="mt-3 text-[12px] text-[#5D6C8A]">
          Recorded as coming from you on their behalf, so the record stays
          accurate.
        </p>

        <div className="mt-5 flex items-center gap-4">
          <button
            type="button"
            ref={cancelRef}
            onClick={onClose}
            className={`h-9 px-4 text-[13px] font-medium text-[#16233E] hover:text-[#152E56] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={disabled}
            className={`h-9 px-4 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
              disabled
                ? 'bg-white border border-[#DCE3F0] text-[#C6D0E6] cursor-not-allowed'
                : 'text-white bg-[#152E56] border border-[#152E56] hover:bg-[#172D54]'
            }`}
          >
            Save
          </button>
          {reason && (
            <span className="text-[13px] text-[#5D6C8A]">{reason}</span>
          )}
        </div>
      </div>
    </div>
  );
}