'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CUSTOMER_FOCUS_RING,
  type KindConfig,
  type RecordItem,
} from './data';
import { useDialogFocus } from '../../lib/useDialogFocus';

interface Props {
  open: boolean;
  config: KindConfig;
  record: RecordItem | null;
  hasSharedRequest?: boolean;
  onClose: () => void;
  onSave: (data: Partial<RecordItem>) => void;
}

function TextInput({
  value,
  onChange,
  placeholder,
  invalid,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  invalid?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`h-10 w-full px-3 text-[13px] text-[#16233E] bg-white border rounded-[12px] outline-none placeholder:text-[#5D6C8A] transition-colors duration-150 ${CUSTOMER_FOCUS_RING} ${
        invalid ? 'border-[#A8552A]' : 'border-[#DCE3F0]'
      }`}
    />
  );
}

const emailValid = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim());

export default function RecordDialog({
  open,
  config,
  record,
  hasSharedRequest,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [notes, setNotes] = useState('');
  const [active, setActive] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useDialogFocus(open, cardRef);

  useEffect(() => {
    if (open) {
      setName(record?.name ?? '');
      setEmail(record?.email ?? '');
      setPhone(record?.phone ?? '');
      setAddress(record?.address ?? '');
      setContactName(record?.contactName ?? '');
      setNotes(record?.notes ?? '');
      setActive(record?.active ?? true);
    }
  }, [open, record]);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const isEdit = !!record;
  const title = isEdit ? config.editLabel : config.addLabel;
  const requiredPresent = name.trim() && email.trim();

  const submit = () => {
    if (!requiredPresent || !emailValid(email)) return;
    onSave({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
      contactName: contactName.trim() || undefined,
      notes: notes.trim() || undefined,
      active,
    });
  };

  const showEmailNote = config.kind === 'customer' && hasSharedRequest;
  const saveDisabled = !requiredPresent || !emailValid(email);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#16233E]/30"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div ref={cardRef} className="w-[520px] bg-white border border-[#DCE3F0] rounded-[12px] p-7">
        <h2 className="text-[20px] font-semibold text-[#16233E]">{title}</h2>

        <div className="mt-5 space-y-4">
          <div>
            <p className="text-[12px] text-[#5D6C8A] mb-1">Name</p>
            <TextInput value={name} onChange={setName} placeholder="e.g. Elena Whitmore" />
          </div>

          {config.kind === 'customer' && (
            <>
              <div>
                <p className="text-[12px] text-[#5D6C8A] mb-1">Email</p>
                <TextInput
                  value={email}
                  onChange={setEmail}
                  placeholder="name@example.com"
                  invalid={!!email.trim() && !emailValid(email)}
                />
                {!!email.trim() && !emailValid(email) && (
                  <p className="mt-1 text-[12px] text-[#A8552A]">
                    Enter a valid email address.
                  </p>
                )}
                {showEmailNote && (
                  <p className="mt-1 text-[12px] text-[#5D6C8A]">
                    Changing this won't resend an approval link that's already out.
                    Send a new link from the request if you need to.
                  </p>
                )}
              </div>
              <div>
                <p className="text-[12px] text-[#5D6C8A] mb-1">
                  Phone <span className="text-[#5D6C8A]">Optional</span>
                </p>
                <TextInput value={phone} onChange={setPhone} placeholder="e.g. 555-0177" />
              </div>
              <div>
                <p className="text-[12px] text-[#5D6C8A] mb-1">
                  Address <span className="text-[#5D6C8A]">Optional</span>
                </p>
                <TextInput value={address} onChange={setAddress} placeholder="e.g. 9 Rosewood Terrace" />
              </div>
              <div>
                <p className="text-[12px] text-[#5D6C8A] mb-1">
                  Notes <span className="text-[#5D6C8A]">Optional</span>
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add a private note"
                  className={`w-full px-3 py-2 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#5D6C8A] resize-none ${CUSTOMER_FOCUS_RING}`}
                />
              </div>
            </>
          )}

          {config.kind === 'manufacturer' && (
            <>
              <div>
                <p className="text-[12px] text-[#5D6C8A] mb-1">
                  Contact name <span className="text-[#5D6C8A]">Optional</span>
                </p>
                <TextInput value={contactName} onChange={setContactName} placeholder="e.g. Marco Benetti" />
              </div>
              <div>
                <p className="text-[12px] text-[#5D6C8A] mb-1">Email</p>
                <TextInput
                  value={email}
                  onChange={setEmail}
                  placeholder="craft@studio.com"
                  invalid={!!email.trim() && !emailValid(email)}
                />
                {!!email.trim() && !emailValid(email) && (
                  <p className="mt-1 text-[12px] text-[#A8552A]">
                    Enter a valid email address.
                  </p>
                )}
              </div>
              <div>
                <p className="text-[12px] text-[#5D6C8A] mb-1">
                  Phone <span className="text-[#5D6C8A]">Optional</span>
                </p>
                <TextInput value={phone} onChange={setPhone} placeholder="e.g. 555-0401" />
              </div>
              <div>
                <p className="text-[12px] text-[#5D6C8A] mb-1">
                  Notes <span className="text-[#5D6C8A]">Optional</span>
                </p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add a private note"
                  className={`w-full px-3 py-2 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#5D6C8A] resize-none ${CUSTOMER_FOCUS_RING}`}
                />
              </div>
              <div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  onClick={() => setActive((v) => !v)}
                  className={`inline-flex w-9 h-5 rounded-full p-0.5 items-center transition-colors duration-150 ${CUSTOMER_FOCUS_RING} ${
                    active ? 'bg-[#152E56]' : 'bg-[#C6D0E6]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white transition-transform duration-150 transform ${
                      active ? 'translate-x-4' : ''
                    }`}
                  />
                </button>
                <span className="ml-3 text-[13px] font-medium text-[#16233E]">
                  {active ? 'Active' : 'Inactive'}
                </span>
                <p className="mt-2 text-[12px] text-[#5D6C8A]">
                  An inactive manufacturer isn't offered when you route a new request.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`h-9 px-4 text-[13px] font-medium text-[#16233E] hover:text-[#5D6C8A] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={saveDisabled}
              className={`h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING} ${
                saveDisabled ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              Save
            </button>
          </div>
          {!requiredPresent && (
            <p className="text-[13px] text-[#5D6C8A]">
              Add a name and an email to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}