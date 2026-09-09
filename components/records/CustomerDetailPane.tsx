'use client';

import Link from 'next/link';
import {
  CUSTOMER_FOCUS_RING,
  activityFor,
  initials,
  linkedProjects,
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

const STATS: { key: string; icon: string; label: string }[] = [
  { key: 'requests', icon: 'ri-file-list-3-line', label: 'Total Requests' },
  { key: 'active', icon: 'ri-vip-diamond-line', label: 'Active Projects' },
  { key: 'spent', icon: 'ri-money-dollar-circle-line', label: 'Total Spent' },
  { key: 'interaction', icon: 'ri-time-line', label: 'Last Interaction' },
];

function statusPill(status: string) {
  if (status === 'approved')
    return 'bg-[#E8F1EC] text-[#3D6B54]';
  if (status === 'draft') return 'bg-[#F3F6FC] text-[#5D6C8A]';
  return 'bg-[#F3F6FC] text-[#16233E]';
}

function ContactRow({ icon, label, value }: { icon: string; label: string; value?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-5 h-5 flex items-center justify-center text-[#5D6C8A]">
        <i className={`${icon} text-[15px]`} />
      </span>
      <span className="w-20 shrink-0 text-[13px] text-[#16233E]">{label}</span>
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
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-4 flex items-center gap-3">
      <span className="w-9 h-9 rounded-[12px] bg-[#F3F6FC] flex items-center justify-center text-[#5D6C8A] shrink-0">
        <i className={`${icon} text-[18px] w-5 h-5 flex items-center justify-center`} />
      </span>
      <div className="min-w-0">
        <p className="text-[12px] text-[#5D6C8A] truncate">{label}</p>
        <p className="mt-0.5 text-[20px] font-semibold text-[#16233E] tabular-nums truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

const ACTIVITY_ICON: Record<string, { icon: string; cls: string }> = {
  render: { icon: 'ri-cpu-line', cls: 'bg-[#F3F6FC] text-[#5D6C8A]' },
  design: { icon: 'ri-quill-pen-line', cls: 'bg-[#F3F6FC] text-[#5D6C8A]' },
  request: { icon: 'ri-add-circle-line', cls: 'bg-[#F3F6FC] text-[#5D6C8A]' },
};

export default function CustomerDetailPane({
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
  const projects = linkedProjects(record);
  const activity = activityFor(record);
  const count = record.requestIds.length;

  const requests = count.toString();
  const active = (record.activeProjects ?? 0).toString();

  const stats: Record<string, { value: string; sub: string }> = {
    requests: { value: requests, sub: count === 1 ? 'request' : 'requests' },
    active: { value: active, sub: 'projects' },
    spent: { value: record.totalSpent ?? '$0', sub: 'all time' },
    interaction: { value: record.lastInteraction ?? '—', sub: 'last touch' },
  };

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
          Back to customers
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
                  {record.tag && (
                    <span className="inline-flex h-6 items-center px-3 rounded-full bg-[#E8F1EC] text-[#3D6B54] text-[12px] font-medium whitespace-nowrap">
                      {record.tag}
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
                Edit Client
              </button>
              <button
                type="button"
                onClick={onRemove}
                className={`h-9 px-4 text-[13px] font-medium text-[#A8552A] bg-white border border-[#A8552A] rounded-full hover:text-white hover:bg-[#91441E] hover:border-[#91441E] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
              >
                <i className="ri-delete-bin-line text-[14px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                Remove Client
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-2.5 border-t border-[#DCE3F0] pt-5">
            {emails.map((e) => (
              <ContactRow key={e.email} icon="ri-mail-line" label={e.label} value={e.email} />
            ))}
            <ContactRow icon="ri-phone-line" label="Phone" value={record.phone} />
            <ContactRow icon="ri-map-pin-line" label="Location" value={record.address} />
          </div>

          <div className="mt-4 flex items-center gap-5 text-[12px] text-[#5D6C8A]">
            <span className="flex items-center gap-1.5 tabular-nums">
              <i className="ri-calendar-line text-[14px] w-4 h-4 flex items-center justify-center" />
              Client since {record.clientSince ?? '—'}
            </span>
            {record.lastInteraction && (
              <span className="flex items-center gap-1.5 tabular-nums">
                <i className="ri-time-line text-[14px] w-4 h-4 flex items-center justify-center" />
                Last interaction {record.lastInteraction}
              </span>
            )}
          </div>
        </section>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard
              key={s.key}
              icon={s.icon}
              label={s.label}
              value={stats[s.key].value}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-4">
          <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-medium text-[#16233E]">Linked Projects</p>
              {projects.length > 0 && (
                <span className="text-[12px] text-[#5D6C8A] tabular-nums">
                  {count} {count === 1 ? 'project' : 'projects'}
                </span>
              )}
            </div>
            {projects.length === 0 ? (
              <p className="mt-4 text-[13px] text-[#5D6C8A]">
                No linked projects yet.
              </p>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3.5 border border-[#DCE3F0] rounded-[12px] p-3"
                  >
                    <img
                      src={p.thumb}
                      alt={p.category}
                      className="w-11 h-11 rounded-[10px] object-cover border border-[#DCE3F0] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-medium text-[#16233E] truncate">
                          {p.designNo}
                        </p>
                        <span className="text-[12px] text-[#5D6C8A] truncate">
                          {p.category}
                        </span>
                      </div>
                      <span
                        className={`inline-flex mt-1.5 h-5 px-2 rounded-full text-[11px] font-medium items-center ${statusPill(p.status)}`}
                      >
                        Shared with customer
                      </span>
                    </div>
                    <Link
                      href={`/requests/${p.id}`}
                      className={`shrink-0 h-9 px-3 text-[12px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap inline-flex items-center gap-1 ${CUSTOMER_FOCUS_RING}`}
                    >
                      View request
                      <i className="ri-arrow-right-s-line text-[14px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-medium text-[#16233E]">Activity Timeline</p>
              <span className="text-[12px] text-[#5D6C8A] tabular-nums">
                RC-{projects[0]?.designNo ?? 'N/A'}
              </span>
            </div>
            {activity.length === 0 ? (
              <p className="mt-4 text-[13px] text-[#5D6C8A]">No activity yet.</p>
            ) : (
              <div className="mt-4 flex flex-col">
                {activity.map((a, i) => (
                  <div key={a.id} className="relative flex gap-3 pb-5 last:pb-0">
                    {i < activity.length - 1 && (
                      <span className="absolute left-4 top-8 bottom-0 w-px bg-[#DCE3F0]" />
                    )}
                    <span
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${ACTIVITY_ICON[a.kind].cls}`}
                    >
                      <i className={`${ACTIVITY_ICON[a.kind].icon} text-[15px] w-4 h-4 flex items-center justify-center`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium text-[#16233E]">{a.title}</p>
                      <p className="mt-0.5 text-[12px] text-[#5D6C8A] leading-relaxed">
                        {a.project}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[12px] text-[#16233E] tabular-nums">{a.time}</p>
                      <p className="mt-0.5 text-[11px] text-[#5D6C8A] tabular-nums">{a.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}