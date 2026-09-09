'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CUSTOMER_FOCUS_RING,
  type MfrStatus,
  type RecordItem,
} from './data';
import { useDialogFocus } from '../../lib/useDialogFocus';

interface Props {
  open: boolean;
  record: RecordItem | null;
  onClose: () => void;
  onSave: (data: Partial<RecordItem>) => void;
}

const SPECIALTIES = [
  'Gold Specialist',
  'Gemstone Specialist',
  'Platinum Specialist',
  'Diamond Setting',
  'Colored Gemstones',
  'Pearl Jewelry',
];
const EMAIL_LABELS = ['Orders', 'Production', 'Studio', 'Work'];
const STATUSES: { value: MfrStatus; label: string }[] = [
  { value: 'available', label: 'Available' },
  { value: 'busy', label: 'Busy' },
  { value: 'delayed', label: 'Delayed' },
];

interface EmailRow {
  label: string;
  email: string;
}

const emailValid = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim());

export default function ManufacturerDialog({ open, record, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('Gold Specialist');
  const [emails, setEmails] = useState<EmailRow[]>([{ label: 'Work', email: '' }]);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<MfrStatus>('available');
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const specialtyRef = useRef<HTMLDivElement>(null);

  useDialogFocus(open, cardRef);

  useEffect(() => {
    if (open) {
      setName(record?.name ?? '');
      setSpecialty(record?.specialty ?? 'Gold Specialist');
      setEmails(
        record?.emails?.length
          ? record.emails.map((e) => ({ label: e.label, email: e.email }))
          : [{ label: 'Work', email: record?.email ?? '' }]
      );
      setPhone(record?.phone ?? '');
      setAddress(record?.address ?? '');
      setStatus(record?.mfrStatus ?? 'available');
      setSpecialtyOpen(false);
    }
  }, [open, record]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    const onClick = (e: MouseEvent) => {
      if (specialtyRef.current && !specialtyRef.current.contains(e.target as Node)) {
        setSpecialtyOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, onClose]);

  if (!open) return null;

  const isEdit = !!record;
  const title = isEdit ? 'Edit Manufacturer' : 'Add Manufacturer';
  const em = emails.filter((x) => x.email.trim() !== '');
  const validEmails = em.length > 0 && em.every((x) => emailValid(x.email));
  const requiredPresent = name.trim() !== '' && validEmails;

  const updateEmail = (i: number, patch: Partial<EmailRow>) =>
    setEmails((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const removeEmail = (i: number) =>
    setEmails((prev) => prev.filter((_, idx) => idx !== i));

  const submit = () => {
    if (!requiredPresent) return;
    onSave({
      name: name.trim(),
      specialty,
      emails: em.map((x) => ({ label: x.label, email: x.email.trim() })),
      email: em[0]?.email.trim() ?? '',
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
      location: address.trim() || undefined,
      mfrStatus: status,
      active: true,
    });
  };

  const reason = !requiredPresent
    ? name.trim() === ''
      ? 'Add a manufacturer name and at least one email to continue.'
      : 'Enter a valid email address to continue.'
    : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#16233E]/30"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={cardRef}
        className="w-[440px] max-w-[calc(100vw-32px)] bg-white border border-[#DCE3F0] rounded-[12px] p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-[#16233E]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:bg-[#F3F6FC] hover:text-[#16233E] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
          >
            <i className="ri-close-line text-[16px] w-4 h-4 flex items-center justify-center" />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <label className="block">
            <span className="text-[12px] text-[#5D6C8A]">Manufacturer Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. ArtisanGold Co."
              className={`mt-1 w-full h-10 px-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#C6D0E6] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
            />
          </label>

          <div className="relative" ref={specialtyRef}>
            <p className="text-[12px] text-[#5D6C8A]">Specialty</p>
            <button
              type="button"
              onClick={() => setSpecialtyOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={specialtyOpen}
              className={`mt-1 w-full h-10 px-3 text-[13px] text-[#A8552A] bg-[#F5EFE5]/50 border border-[#DCE3F0] rounded-[12px] flex items-center justify-between transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
            >
              <span className="font-medium">{specialty}</span>
              <i
                className={`ri-arrow-down-s-line text-[16px] w-4 h-4 flex items-center justify-center text-[#A8552A] transition-transform duration-150 ${
                  specialtyOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {specialtyOpen && (
              <div
                role="listbox"
                className="absolute z-10 mt-1 w-full bg-white border border-[#DCE3F0] rounded-[12px] p-1.5"
              >
                {SPECIALTIES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="option"
                    aria-selected={specialty === s}
                    onClick={() => {
                      setSpecialty(s);
                      setSpecialtyOpen(false);
                    }}
                    className={`w-full text-left h-9 px-3 text-[13px] font-medium rounded-[8px] transition-colors duration-150 ${CUSTOMER_FOCUS_RING} ${
                      specialty === s ? 'bg-[#EDF1FA] text-[#16233E]' : 'text-[#5D6C8A] hover:bg-[#F3F6FC]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-[12px] text-[#5D6C8A]">Email Addresses</p>
            <div className="mt-1 flex flex-col gap-2">
              {emails.map((row, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="relative w-[120px] shrink-0">
                    <select
                      value={row.label}
                      onChange={(e) => updateEmail(i, { label: e.target.value })}
                      aria-label="Email type"
                      className={`w-full h-10 pl-3 pr-8 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none appearance-none ${CUSTOMER_FOCUS_RING}`}
                    >
                      {EMAIL_LABELS.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-[16px] w-4 h-4 flex items-center justify-center text-[#5D6C8A] pointer-events-none" />
                  </div>
                  <input
                    placeholder="Email address"
                    value={row.email}
                    onChange={(e) => updateEmail(i, { email: e.target.value })}
                    className={`h-10 flex-1 px-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#C6D0E6] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
                  />
                  {emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmail(i)}
                      aria-label="Remove email"
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[#5D6C8A] hover:text-[#A8552A] hover:bg-[#F3F6FC] transition-colors duration-150 shrink-0 ${CUSTOMER_FOCUS_RING}`}
                    >
                      <i className="ri-close-line text-[16px] w-4 h-4 flex items-center justify-center" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setEmails((prev) => [...prev, { label: 'Work', email: '' }])}
                className={`self-start text-[13px] font-medium text-[#152E56] hover:text-[#172D54] transition-colors duration-150 inline-flex items-center gap-1 ${CUSTOMER_FOCUS_RING}`}
              >
                <i className="ri-add-line text-[14px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                Add another email
              </button>
            </div>
          </div>

          <label className="block">
            <span className="text-[12px] text-[#5D6C8A]">{isEdit ? 'Phone Number' : 'Contact Number'}</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +39 02 1234 5678"
              className={`mt-1 w-full h-10 px-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#C6D0E6] ${CUSTOMER_FOCUS_RING}`}
            />
          </label>

          <label className="block">
            <span className="text-[12px] text-[#5D6C8A]">
              Location {!isEdit && <span className="text-[#C6D0E6]">(optional)</span>}
            </span>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Milan, Italy"
              className={`mt-1 w-full h-10 px-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#C6D0E6] ${CUSTOMER_FOCUS_RING}`}
            />
          </label>

          {isEdit && (
            <div>
              <p className="text-[12px] text-[#5D6C8A]">Status</p>
              <div className="mt-1 flex items-center gap-2">
                {STATUSES.map((st) => (
                  <button
                    key={st.value}
                    type="button"
                    aria-pressed={status === st.value}
                    onClick={() => setStatus(st.value)}
                    className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING} ${
                      status === st.value
                        ? 'bg-[#E9E7F8] text-[#5B4BA8] border-[#E9E7F8]'
                        : 'bg-white border-[#DCE3F0] text-[#5D6C8A] hover:bg-[#F3F6FC]'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={submit}
            disabled={!requiredPresent}
            className={`w-full h-10 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING} ${
              !requiredPresent ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {isEdit ? 'Save Changes' : 'Add Manufacturer'}
          </button>
          {reason && !requiredPresent && (
            <p className="text-[13px] text-[#5D6C8A] text-center">{reason}</p>
          )}
        </div>
      </div>
    </div>
  );
}