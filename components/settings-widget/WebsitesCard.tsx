'use client';

import { useState } from 'react';
import {
  focusRing,
  forcedRefusal,
  originsFor,
  STATUS_LABEL,
  type WidgetState,
} from './data';
import RemoveOriginDialog from './RemoveOriginDialog';

const HOST_RE = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;

export default function WebsitesCard({ state }: { state: WidgetState }) {
  const [hosts, setHosts] = useState<string[]>(() => originsFor(state));
  const [draft, setDraft] = useState('');
  const [refusal, setRefusal] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(state === 'confirmRemoveLast');

  const forced = forcedRefusal(state);
  const shownRefusal = forced ?? refusal;
  const atTen = hosts.length >= 10;

  const add = () => {
    const value = draft.trim();
    if (!value) return;
    if (value.includes('*')) {
      setRefusal(STATUS_LABEL.wildcardRefusal);
      return;
    }
    if (hosts.some((h) => h.toLowerCase() === value.toLowerCase())) {
      setRefusal(STATUS_LABEL.duplicateRefusal);
      return;
    }
    if (!HOST_RE.test(value)) {
      setRefusal(STATUS_LABEL.invalidRefusal);
      return;
    }
    setHosts((h) => [...h, value]);
    setDraft('');
    setRefusal(null);
  };

  const remove = (host: string) => {
    if (hosts.length === 1) {
      setConfirmOpen(true);
      return;
    }
    setHosts((h) => h.filter((x) => x !== host));
  };

  const confirmRemove = () => {
    setHosts([]);
    setRefusal(null);
    setConfirmOpen(false);
  };

  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-6">
      <div className="flex items-baseline gap-2">
        <h3 className="text-[15px] font-medium text-[#16233E]">Your websites</h3>
        <span className="text-[13px] text-[#5D6C8A] tabular-nums">
          {hosts.length} of 10
        </span>
      </div>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">{STATUS_LABEL.websitesDescription}</p>

      <div className="mt-4 flex items-center gap-3">
        <input
          type="text"
          value={draft}
          disabled={atTen}
          onChange={(e) => {
            setDraft(e.target.value);
            setRefusal(null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !atTen) add();
          }}
          placeholder="shop.example.com"
          aria-label="Website address"
          className={`h-10 flex-1 min-w-0 rounded-[12px] border border-[#DCE3F0] bg-white px-3 text-[13px] text-[#16233E] placeholder:text-[#748AB4] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
            atTen ? 'disabled:bg-[#F3F6FC] disabled:text-[#C6D0E6]' : ''
          }`}
        />
        <button
          type="button"
          onClick={add}
          disabled={atTen}
          className={`h-9 px-4 shrink-0 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap disabled:text-[#C6D0E6] disabled:hover:bg-white ${focusRing}`}
        >
          Add
        </button>
      </div>

      {shownRefusal && !atTen && (
        <p className="mt-2 text-[13px] text-[#A8552A]">{shownRefusal}</p>
      )}

      {atTen ? (
        <p className="mt-2 text-[13px] text-[#5D6C8A]">{STATUS_LABEL.maxNote}</p>
      ) : (
        <p className="mt-2 text-[12px] text-[#5D6C8A]">{STATUS_LABEL.exactNote}</p>
      )}

      {hosts.length > 0 && (
        <ul className="mt-4 divide-y divide-[#DCE3F0] border-y border-[#DCE3F0]">
          {hosts.map((host) => (
            <li key={host} className="flex items-center justify-between h-12">
              <span className="text-[13px] text-[#16233E]">{host}</span>
              <button
                type="button"
                onClick={() => remove(host)}
                className={`h-9 px-3 text-[13px] font-medium text-[#A8552A] hover:text-[#91441E] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {hosts.length > 0 && !atTen && (
        <p className="mt-3 text-[12px] text-[#5D6C8A]">{STATUS_LABEL.subdomainNote}</p>
      )}

      <RemoveOriginDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmRemove}
      />
    </section>
  );
}