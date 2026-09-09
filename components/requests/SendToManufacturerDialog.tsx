'use client';

import { useEffect, useRef, useState } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { FOCUS_RING } from './data';
import {
  MANUFACTURER_POOL,
  SPECIALTIES,
  availabilityPill,
  type MfrPick,
} from './manufacturers';

interface Props {
  open: boolean;
  onClose: () => void;
  onSend: (picks: MfrPick[]) => void;
}

function SearchField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[16px] w-4 h-4 flex items-center justify-center text-[#5D6C8A]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, specialty, or location..."
        className={`w-full h-10 pl-9 pr-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#C6D0E6] ${FOCUS_RING}`}
      />
    </div>
  );
}

function AddManufacturerForm({
  onAdd,
  onCancel,
}: {
  onAdd: (pick: MfrPick) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('Gold Specialist');
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [emails, setEmails] = useState<string[]>(['']);
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const add = () => {
    if (name.trim() === '') return;
    const initials = name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
    onAdd({
      id: 'custom-' + name.trim().toLowerCase().replace(/\s+/g, '-'),
      name: name.trim(),
      specialty,
      location: location.trim() || '—',
      initials: initials || 'NM',
      status: 'available',
      hours: '—',
      requests: 0,
      completed: 0,
      email: emails.find((e) => e.trim() !== '') || '',
      phone: phone.trim() || '',
    });
  };

  return (
    <div className="border border-dashed border-[#C6D0E6] rounded-[12px] p-4">
      <label className="block">
        <span className="text-[12px] text-[#5D6C8A]">Manufacturer Name</span>
        <input
          ref={nameRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. ArtisanGold Co."
          className={`mt-1 w-full h-10 px-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#C6D0E6] ${FOCUS_RING}`}
        />
      </label>

      <label className="block mt-3">
        <span className="text-[12px] text-[#5D6C8A]">Specialty</span>
        <div className="relative mt-1">
          <button
            type="button"
            onClick={() => setSpecialtyOpen((o) => !o)}
            className={`w-full h-10 px-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] flex items-center justify-between ${FOCUS_RING}`}
          >
            <span className="truncate">{specialty}</span>
            <i className="ri-arrow-down-s-line text-[16px] text-[#5D6C8A]" />
          </button>
          {specialtyOpen && (
            <div className="absolute z-10 mt-1 w-full max-h-52 overflow-y-auto bg-white border border-[#DCE3F0] rounded-[12px] p-1">
              {SPECIALTIES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSpecialty(s);
                    setSpecialtyOpen(false);
                  }}
                  className={`w-full h-8 px-2.5 text-[13px] text-left rounded-[8px] hover:bg-[#F3F6FC] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
                    specialty === s ? 'text-[#152E56] font-medium' : 'text-[#16233E]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </label>

      <div className="mt-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#5D6C8A]">Email Addresses</span>
          <button
            type="button"
            onClick={() => setEmails((prev) => [...prev, ''])}
            className={`text-[12px] font-medium text-[#152E56] hover:text-[#172D54] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            + Add another email
          </button>
        </div>
        {emails.map((email, i) => (
          <div key={i} className="mt-1.5 flex items-center gap-2">
            <span className="text-[12px] text-[#5D6C8A] w-10">Work</span>
            <input
              value={email}
              onChange={(e) =>
                setEmails((prev) =>
                  prev.map((p, idx) => (idx === i ? e.target.value : p))
                )
              }
              placeholder="Email address"
              className={`flex-1 h-10 px-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#C6D0E6] ${FOCUS_RING}`}
            />
            {emails.length > 1 && (
              <button
                type="button"
                aria-label="Remove email"
                onClick={() => setEmails((prev) => prev.filter((_, idx) => idx !== i))}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 shrink-0 ${FOCUS_RING}`}
              >
                <i className="ri-close-line text-[15px] w-4 h-4 flex items-center justify-center" />
              </button>
            )}
          </div>
        ))}
      </div>

      <label className="block mt-3">
        <span className="text-[12px] text-[#5D6C8A]">Contact Number</span>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. +01 1234 5678"
          className={`mt-1 w-full h-10 px-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#C6D0E6] ${FOCUS_RING}`}
        />
      </label>

      <label className="block mt-3">
        <span className="text-[12px] text-[#5D6C8A]">
          Location<span className="font-normal text-[#C6D0E6]"> (optional)</span>
        </span>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Milan, Italy"
          className={`mt-1 w-full h-10 px-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#C6D0E6] ${FOCUS_RING}`}
        />
      </label>

      <button
        type="button"
        onClick={add}
        disabled={name.trim() === ''}
        className={`mt-4 w-full h-10 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
          name.trim() === ''
            ? 'bg-white border border-[#DCE3F0] text-[#C6D0E6] cursor-not-allowed'
            : 'text-white bg-[#152E56] border border-[#152E56] hover:bg-[#172D54]'
        }`}
      >
        Add &amp; Select Manufacturer
      </button>
      <div className="mt-2 flex justify-center">
        <button
          type="button"
          onClick={onCancel}
          className={`text-[12px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function SendToManufacturerDialog({
  open,
  onClose,
  onSend,
}: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [adding, setAdding] = useState(false);
  const [picks, setPicks] = useState<MfrPick[]>(MANUFACTURER_POOL);
  const cardRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useDialogFocus(open, cardRef, cancelRef);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setSelected([]);
    setNote('');
    setAdding(false);
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

  const q = query.trim().toLowerCase();
  const filtered = picks.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.specialty.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
  );

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addPick = (pick: MfrPick) => {
    setPicks((prev) => [...prev, pick]);
    setSelected((prev) => [...prev, pick.id]);
    setAdding(false);
  };

  const send = () => {
    const chosen = picks.filter((p) => selected.includes(p.id));
    if (chosen.length === 0) return;
    onSend(chosen);
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
        aria-labelledby="send-mfr-title"
        className="relative w-full max-w-[560px] bg-white border border-[#DCE3F0] rounded-[12px] p-5"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-[10px] bg-[#F3F6FC] flex items-center justify-center text-[#152E56]">
              <i className="ri-send-plane-fill text-[15px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
            </span>
            <h2 id="send-mfr-title" className="text-[17px] font-semibold text-[#16233E]">
              Send to Manufacturer
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[#5D6C8A] hover:text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 shrink-0 ${FOCUS_RING}`}
          >
            <i className="ri-close-line text-[18px] w-5 h-5 flex items-center justify-center" />
          </button>
        </div>

        <div className="mt-4">
          <SearchField value={query} onChange={setQuery} />
        </div>

        <div className="mt-3 space-y-2 max-h-[40vh] overflow-y-auto pr-1">
          {filtered.map((p) => {
            const pill = availabilityPill(p.status);
            const isSel = selected.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                role="checkbox"
                aria-checked={isSel}
                onClick={() => toggle(p.id)}
                className={`w-full text-left p-3.5 border rounded-[12px] flex items-start gap-3 transition-colors duration-150 ${FOCUS_RING} ${
                  isSel
                    ? 'border-[#152E56] bg-[#F3F6FC]'
                    : 'border-[#DCE3F0] hover:border-[#C6D0E6]'
                }`}
              >
                <span className="w-10 h-10 rounded-full bg-[#E4E9F4] flex items-center justify-center flex-shrink-0">
                  <span className="text-[13px] font-medium text-[#5D6C8A]">
                    {p.initials}
                  </span>
                </span>
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="text-[14px] font-medium text-[#16233E]">
                      {p.name}
                    </span>
                    <span
                      className={`inline-flex h-5 px-2 rounded-full text-[11px] font-medium items-center whitespace-nowrap ${pill.cls}`}
                    >
                      {pill.label}
                    </span>
                  </span>
                  <span className="block text-[12px] text-[#5D6C8A] mt-0.5">
                    {p.specialty} · {p.location}
                  </span>
                  {p.hours !== '—' && (
                    <span className="flex items-center gap-1 text-[11px] text-[#5D6C8A] mt-1">
                      <i className="ri-time-line text-[12px]" />
                      {p.hours} · {p.requests} requests · {p.completed} completed
                    </span>
                  )}
                </span>
                <span
                  className={`w-5 h-5 rounded-[6px] border flex items-center justify-center flex-shrink-0 mt-1 ${
                    isSel
                      ? 'bg-[#152E56] border-[#152E56]'
                      : 'border-[#C6D0E6] bg-white'
                  }`}
                >
                  {isSel && (
                    <i className="ri-check-line text-[13px] w-3 h-3 flex items-center justify-center text-white" />
                  )}
                </span>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-center text-[13px] text-[#5D6C8A] py-6">
              No manufacturers match your search.
            </p>
          )}
        </div>

        <div className="mt-3">
          {adding ? (
            <AddManufacturerForm
              onAdd={addPick}
              onCancel={() => setAdding(false)}
            />
          ) : (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className={`w-full h-10 border border-dashed border-[#C6D0E6] rounded-[12px] text-[13px] font-medium text-[#152E56] hover:bg-[#F3F6FC] transition-colors duration-150 flex items-center justify-center gap-1.5 whitespace-nowrap ${FOCUS_RING}`}
            >
              <i className="ri-add-line text-[15px]" />
              Add New Manufacturer
            </button>
          )}
        </div>

        <label className="block mt-4">
          <span className="text-[12px] text-[#5D6C8A]">
            Note<span className="font-normal text-[#C6D0E6]"> (optional)</span>
          </span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Add production instructions..."
            className={`mt-1 w-full px-3 py-2 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#C6D0E6] resize-none ${FOCUS_RING}`}
          />
        </label>

        <div className="mt-4 flex items-center gap-3 border-t border-[#DCE3F0] pt-4">
          <span className="text-[12px] text-[#5D6C8A] tabular-nums">
            {selected.length}{' '}
            {selected.length === 1 ? 'manufacturer' : 'manufacturers'} selected
          </span>
          <span className="flex-1" />
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
            onClick={send}
            disabled={selected.length === 0}
            className={`h-9 px-5 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
              selected.length === 0
                ? 'bg-white border border-[#DCE3F0] text-[#C6D0E6] cursor-not-allowed'
                : 'text-white bg-[#152E56] border border-[#152E56] hover:bg-[#172D54]'
            }`}
          >
            Send (Design)
          </button>
        </div>
      </div>
    </div>
  );
}