'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useDialogFocus } from '../../lib/useDialogFocus';
import { FOCUS_RING, statusLabel, type Request } from './data';
import { customers, initials, type Customer } from './customers';

interface Props {
  open: boolean;
  req: Request;
  onClose: () => void;
  onSend: (customer: Customer) => void;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[13px] text-[#16233E]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`mt-1.5 w-full h-10 px-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#5D6C8A] transition-colors duration-150 ${FOCUS_RING}`}
      />
    </label>
  );
}

function NewCustomerForm({
  onSave,
}: {
  onSave: (c: Customer) => void;
}) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(false);

  const save = () => {
    if (!name.trim() || !email.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onSave({
      id: 'new-' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim() || undefined,
      location: location.trim() || undefined,
    });
  };

  return (
    <div className="mt-4 border-t border-[#DCE3F0] pt-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-[#16233E]">New customer</p>
      </div>
      <p className="mt-0.5 text-[12px] text-[#5D6C8A]">
        They'll be added to your contacts and selected for this design.
      </p>
      <div className="mt-3 flex flex-col gap-3">
        <Field label="Full name" value={name} onChange={setName} placeholder="Jane Whitmore" />
        <Field label="Company" value={company} onChange={setCompany} placeholder="Whitmore & Sons" />
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="jane@whitmore.com" />
        <Field label="Phone" value={phone} onChange={setPhone} placeholder="555-0100" />
        <Field label="Location" value={location} onChange={setLocation} placeholder="New York, United States" />
      </div>
      {error && (
        <p className="mt-2 text-[12px] text-[#A8552A]">
          A name and an email are needed.
        </p>
      )}
      <button
        type="button"
        onClick={save}
        className={`mt-3 w-full h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
      >
        Add &amp; select customer
      </button>
    </div>
  );
}

function Toggle({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`flex items-center justify-between gap-3 flex-1 px-3 h-8 border rounded-full transition-colors duration-150 ${FOCUS_RING} ${
        on ? 'bg-[#EDF1FA] border-[#DCE3F0]' : 'bg-white border-[#DCE3F0]'
      }`}
    >
      <span className="text-[12px] font-medium text-[#16233E]">{label}</span>
      <span
        className={`w-6 h-4 rounded-full p-0.5 transition-colors duration-150 ${
          on ? 'bg-[#152E56]' : 'bg-[#C6D0E6]'
        }`}
      >
        <span
          className={`block w-3 h-3 rounded-full bg-white transition-transform duration-150 ${
            on ? 'translate-x-2' : ''
          }`}
        />
      </span>
    </button>
  );
}

export default function CustomerSendDialog({
  open,
  req,
  onClose,
  onSend,
}: Props) {
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<Customer | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [message, setMessage] = useState('');
  const [messageErr, setMessageErr] = useState(false);
  const [requireApproval, setRequireApproval] = useState(true);
  const [allowFeedback, setAllowFeedback] = useState(false);
  const [allowRevisions, setAllowRevisions] = useState(false);
  const [error, setError] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useDialogFocus(open, cardRef, cancelRef);

  useEffect(() => {
    if (!open) return;
    setQ('');
    setSelected(null);
    setShowNew(false);
    setMessage('');
    setMessageErr(false);
    setError(false);
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

  const filtered = useMemo(
    () =>
      customers.filter((c) =>
        `${c.name} ${c.company ?? ''} ${c.email}`
          .toLowerCase()
          .includes(q.trim().toLowerCase())
      ),
    [q]
  );

  if (!open) return null;

  const saveNew = (c: Customer) => {
    setSelected(c);
    setShowNew(false);
  };

  const send = () => {
    if (!selected) {
      setError(true);
      return;
    }
    if (message.length > 500) {
      setMessageErr(true);
      return;
    }
    setMessageErr(false);
    onSend(selected);
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
        aria-labelledby="send-title"
        className="relative w-full max-w-[720px] bg-white border border-[#DCE3F0] rounded-[12px] flex flex-col max-h-[90vh]"
      >
        <div className="p-6 pb-4 border-b border-[#DCE3F0]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id="send-title" className="text-[18px] font-semibold text-[#16233E]">
                Customer design overview
              </h2>
              <p className="mt-0.5 text-[12px] text-[#5D6C8A]">
                Choose who this design is shared with for review and approval.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:bg-[#EDF1FA] transition-colors duration-150 ${FOCUS_RING}`}
            >
              <i className="ri-close-line text-[18px] w-5 h-5 flex items-center justify-center" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[13px] font-medium text-[#16233E]">{req.designNo}</span>
            <span className="inline-flex h-6 items-center px-3 rounded-full text-[12px] font-medium bg-[#F3F6FC] text-[#16233E]">
              {statusLabel[req.status]}
            </span>
            <span className="text-[12px] text-[#5D6C8A]">· Nothing sent yet</span>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-6">
          <div className="flex gap-3">
            <div className="flex-1 rounded-[12px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={req.views.front ?? undefined}
                alt="Design front view"
                className="w-full h-[220px] object-cover object-top"
              />
            </div>
            <div className="w-[120px] flex flex-col gap-3">
              {(['side', 'back', 'worn'] as const).map((v) => (
                <div key={v} className="flex-1 rounded-[12px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={req.views[v] ?? undefined}
                    alt={`Design ${v} view`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[13px] font-medium text-[#16233E]">
              Message for customer
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a short note, or leave it blank."
              maxLength={500}
              rows={3}
              className={`mt-1.5 w-full px-3 py-2 text-[13px] text-[#16233E] bg-[#F3F6FC] border border-[#DCE3F0] rounded-[12px] outline-none placeholder:text-[#5D6C8A] transition-colors duration-150 resize-none ${FOCUS_RING}`}
            />
            {messageErr && (
              <p className="mt-1 text-[12px] text-[#A8552A]">
                Keep the message under 500 characters.
              </p>
            )}
          </div>

          <div className="mt-5">
            <p className="text-[13px] font-medium text-[#16233E]">
              Select customer
            </p>
            <div className="relative mt-1.5">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[16px] w-4 h-4 flex items-center justify-center text-[#5D6C8A]" />
              <input
                ref={searchRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name or email"
                className={`w-full h-10 pl-9 pr-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-full outline-none placeholder:text-[#5D6C8A] transition-colors duration-150 ${FOCUS_RING}`}
              />
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {filtered.length === 0 && (
                <p className="py-3 text-center text-[13px] text-[#16233E]">
                  No matches.
                </p>
              )}
              {filtered.map((c) => {
                const active = selected?.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelected(c)}
                    aria-pressed={active}
                    className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-[12px] border transition-colors duration-150 ${FOCUS_RING} ${
                      active
                        ? 'bg-[#EDF1FA] border-[#152E56]'
                        : 'bg-white border-[#DCE3F0] hover:bg-[#F3F6FC]'
                    }`}
                  >
                    <span className="w-10 h-10 rounded-full bg-[#E4E9F4] flex items-center justify-center flex-shrink-0">
                      <span className="text-[13px] font-medium text-[#5D6C8A]">
                        {initials(c.name)}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-[13px] font-medium text-[#16233E]">
                          {c.name}
                        </span>
                        {c.company && (
                          <span className="text-[11px] font-medium bg-[#F3F6FC] text-[#5D6C8A] px-1.5 py-0.5 rounded-full">
                            {c.company}
                          </span>
                        )}
                      </span>
                      <span className="block text-[12px] text-[#5D6C8A]">
                        {c.phone} · {c.email}
                      </span>
                    </span>
                    <i
                      className={`ri-radio-button-line text-[18px] w-5 h-5 flex items-center justify-center transition-colors duration-150 ${
                        active ? 'text-[#152E56]' : 'text-[#C6D0E6]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {showNew ? (
              <NewCustomerForm onSave={saveNew} />
            ) : (
              <button
                type="button"
                onClick={() => setShowNew(true)}
                className={`mt-3 w-full h-9 px-4 text-[13px] font-medium text-[#152E56] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
              >
                Add a new customer
              </button>
            )}
          </div>
        </div>

        <div className="p-6 pt-4 border-t border-[#DCE3F0]">
          <div className="flex flex-wrap gap-2.5">
            <Toggle label="Require approval" on={requireApproval} onChange={setRequireApproval} />
            <Toggle label="Allow feedback" on={allowFeedback} onChange={setAllowFeedback} />
            <Toggle label="Allow multiple revisions" on={allowRevisions} onChange={setAllowRevisions} />
          </div>
          {error && (
            <p className="mt-3 text-[13px] text-[#A8552A]">
              Choose a customer to send this design to.
            </p>
          )}
          <div className="mt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              ref={cancelRef}
              onClick={onClose}
              className={`h-9 px-4 text-[13px] font-medium text-[#16233E] hover:text-[#152E56] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={send}
              className={`h-9 px-5 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
            >
              Send to customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}