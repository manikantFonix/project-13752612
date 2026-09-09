'use client';

import Link from 'next/link';
import {
  CUSTOMER_FOCUS_RING,
  initials,
  primaryEmail,
  type RecordItem,
} from './data';

interface Props {
  record: RecordItem;
  showExpand: boolean;
  onExpand: () => void;
  onBack: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

const toneCls: Record<string, string> = {
  violet: 'bg-[#E9E7F8] text-[#5B4BA8]',
  green: 'bg-[#E8F1EC] text-[#3D6B54]',
  gray: 'bg-[#F3F6FC] text-[#5D6C8A]',
};

function ContactRow({ icon, label, value }: { icon: string; label: string; value?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-5 h-5 flex items-center justify-center text-[#5D6C8A]">
        <i className={`${icon} text-[15px]`} />
      </span>
      <span className="w-[108px] shrink-0 text-[13px] text-[#16233E]">{label}</span>
      <span className="min-w-0 flex-1 text-[13px] text-[#16233E] truncate">
        {value ?? '—'}
      </span>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: string;
  label: string;
  value: string;
  tone: 'blue' | 'green' | 'amber' | 'violet';
}) {
  const iconCls: Record<string, string> = {
    blue: 'bg-[#EDF1FA] text-[#152E56]',
    green: 'bg-[#E8F1EC] text-[#3D6B54]',
    amber: 'bg-[#F5EFE5] text-[#A8552A]',
    violet: 'bg-[#E9E7F8] text-[#5B4BA8]',
  };
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-4 flex items-center gap-3">
      <span className={`w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0 ${iconCls[tone]}`}>
        <i className={`${icon} text-[18px] w-5 h-5 flex items-center justify-center`} />
      </span>
      <div className="min-w-0">
        <p className="text-[12px] text-[#5D6C8A] truncate">{label}</p>
        <p className="mt-0.5 text-[18px] font-semibold text-[#16233E] tabular-nums truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ManufacturerDetailPane({
  record,
  showExpand,
  onExpand,
  onBack,
  onEdit,
  onRemove,
}: Props) {
  const emails = record.emails ?? [
    { label: 'Work', email: primaryEmail(record) },
  ];
  const sent = record.sentRequests ?? [];
  const timeline = record.timeline ?? [];
  const statusTone = record.mfrStatus === 'available' ? 'bg-[#E8F1EC] text-[#3D6B54]' : 'bg-[#E9E7F8] text-[#5B4BA8]';
  const statusLabel = record.mfrStatus === 'available' ? 'Active' : record.mfrStatus === 'delayed' ? 'Delayed' : 'Active';

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-3">
        {showExpand && (
          <button
            type="button"
            onClick={onExpand}
            aria-label="Expand list"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
          >
            <i className="ri-arrow-right-s-line text-[18px] w-5 h-5 flex items-center justify-center" />
          </button>
        )}
        <button
          type="button"
          onClick={onBack}
          className={`text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 lg:hidden ${CUSTOMER_FOCUS_RING}`}
        >
          Back to manufacturers
        </button>
      </div>

      <div className="mt-4 flex-1 min-h-0 overflow-y-auto pr-1">
        <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <span className="w-14 h-14 rounded-full bg-[#E4E9F4] text-[#5D6C8A] flex items-center justify-center text-[18px] font-medium shrink-0">
                {initials(record.name)}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <h1 className="text-[22px] font-semibold text-[#16233E] truncate">
                    {record.name}
                  </h1>
                  <span className={`inline-flex h-6 items-center px-3 rounded-full text-[12px] font-medium whitespace-nowrap ${statusTone}`}>
                    {statusLabel}
                  </span>
                  {record.specialty && (
                    <span className="inline-flex h-6 items-center px-3 rounded-full bg-[#F5EFE5] text-[#A8552A] text-[12px] font-medium whitespace-nowrap">
                      {record.specialty}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onEdit}
                className={`h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
              >
                <i className="ri-edit-line text-[14px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                Edit Manufacturer
              </button>
              <button
                type="button"
                onClick={onRemove}
                className={`h-9 px-4 text-[13px] font-medium text-[#A8552A] bg-white border border-[#A8552A] rounded-full hover:text-white hover:bg-[#91441E] hover:border-[#91441E] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
              >
                <i className="ri-delete-bin-line text-[14px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                Remove Manufacturer
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-2.5 border-t border-[#DCE3F0] pt-5">
            <ContactRow icon="ri-map-pin-line" label={record.location ?? 'Location'} value={record.address} />
            <ContactRow icon="ri-phone-line" label="Phone" value={record.phone} />
            {emails.map((e) => (
              <ContactRow key={e.email} icon="ri-mail-line" label={e.label} value={e.email} />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-[12px] text-[#5D6C8A]">
            <span className="flex items-center gap-1.5 tabular-nums">
              <i className="ri-time-line text-[14px] w-4 h-4 flex items-center justify-center" />
              Avg response time
              <span className="text-[#16233E] font-medium">{record.avgResponse}</span>
            </span>
            {record.lastActivity && (
              <span className="flex items-center gap-1.5 tabular-nums">
                <i className="ri-time-line text-[14px] w-4 h-4 flex items-center justify-center" />
                Last activity {record.lastActivity}
              </span>
            )}
          </div>
        </section>

        <div className="mt-4 grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard icon="ri-file-list-3-line" label="Total Requests" value={(record.totalRequests ?? 0).toString()} tone="blue" />
          <StatCard icon="ri-check-double-line" label="Completed" value={(record.completed ?? 0).toString()} tone="green" />
          <StatCard icon="ri-money-dollar-circle-line" label="Total Value" value={record.totalValue ?? '$0'} tone="amber" />
          <StatCard icon="ri-time-line" label="Pending" value={(record.pending ?? 0).toString()} tone="violet" />
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-4">
          <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
            <p className="text-[15px] font-medium text-[#16233E]">Sent Requests</p>
            {sent.length === 0 ? (
              <p className="mt-4 text-[13px] text-[#5D6C8A]">No sent requests yet.</p>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                {sent.map((s) => (
                  <div
                    key={s.designNo}
                    className="flex items-center gap-3.5 border border-[#DCE3F0] rounded-[12px] p-3"
                  >
                    <img
                      src={s.thumb}
                      alt={s.category}
                      className="w-11 h-11 rounded-[10px] object-cover border border-[#DCE3F0] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-medium text-[#16233E] truncate">
                          {s.designNo}
                        </p>
                        <span className="text-[12px] text-[#5D6C8A] truncate">{s.category}</span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className={`inline-flex h-5 px-2 rounded-full text-[11px] font-medium items-center ${toneCls[s.statusTone]}`}>
                          {s.statusText}
                        </span>
                        <span className="text-[11px] text-[#5D6C8A] tabular-nums">{s.date}</span>
                      </div>
                    </div>
                    <Link
                      href={s.route}
                      className={`shrink-0 w-8 h-8 rounded-[8px] flex items-center justify-center text-[#5D6C8A] border border-[#DCE3F0] hover:bg-[#EDF1FA] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
                      aria-label="Open request"
                    >
                      <i className="ri-arrow-right-up-line text-[15px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-medium text-[#16233E]">Production Timeline</p>
              <span className="text-[12px] text-[#5D6C8A] tabular-nums">
                {sent[0]?.designNo ?? '—'} · {sent[0]?.category ?? 'Pending'}
              </span>
            </div>

            {timeline.length === 0 ? (
              <p className="mt-4 text-[13px] text-[#5D6C8A]">No timeline yet.</p>
            ) : (
              <div className="mt-4">
                <div className="mb-4 rounded-[12px] bg-[#E9E7F8] px-3 py-2.5 text-[12px] font-medium text-[#5B4BA8] flex items-center gap-2">
                  <i className="ri-focus-3-line text-[14px] w-4 h-4 flex items-center justify-center" />
                  Currently in active production phase
                </div>
                <div className="flex flex-col">
                  {timeline.map((t) => (
                    <div key={t.label} className="relative flex gap-3 pb-5 last:pb-0">
                      {!t.done && <span className="absolute left-4 top-8 bottom-0 w-px bg-[#DCE3F0]" />}
                      <span
                        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          t.done ? 'bg-[#F3F6FC] text-[#5D6C8A]' : 'bg-[#EDF1FA] text-[#C6D0E6]'
                        }`}
                      >
                        <i className={`${t.icon} text-[15px] w-4 h-4 flex items-center justify-center`} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`text-[13px] font-medium ${t.done ? 'text-[#16233E]' : 'text-[#5D6C8A]'}`}>
                            {t.label}
                          </p>
                          {t.current && (
                            <span className="inline-flex h-4 px-1.5 rounded-full bg-[#E9E7F8] text-[#5B4BA8] text-[10px] font-medium items-center">
                              Current Stage
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[12px] text-[#16233E] tabular-nums">{t.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {record.latestNote && (
              <div className="mt-5 bg-[#F3F6FC] border border-[#DCE3F0] rounded-[12px] p-3">
                <p className="text-[12px] font-medium text-[#5D6C8A] flex items-center gap-1.5">
                  <i className="ri-information-line text-[14px] w-4 h-4 flex items-center justify-center" />
                  Latest Note
                </p>
                <p className="mt-1 text-[12px] text-[#16233E] leading-relaxed">
                  {record.latestNote}
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}