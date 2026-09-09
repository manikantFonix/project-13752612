'use client';

import SectionLabel from './SectionLabel';
import StatCard from './StatCard';
import ErrorBlock from './ErrorBlock';
import { SkeletonStat } from './SkeletonStat';
import type { InquiryGroup, SectionMode } from './data';

function TrackGroup({ title, groups }: { title: string; groups: InquiryGroup[] }) {
  const total = groups.reduce((s, g) => s + g.count, 0);
  if (total === 0) {
    return (
      <div className="mt-5">
        <h4 className="text-[15px] font-medium text-[#16233E]">{title}</h4>
        <p className="mt-2 text-[13px] text-[#5D6C8A]">None in this period.</p>
      </div>
    );
  }
  return (
    <div className="mt-5">
      <h4 className="text-[15px] font-medium text-[#16233E]">{title}</h4>
      <div className="mt-3 space-y-3">
        {groups.map((g) => (
          <div key={g.label}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#16233E]">{g.label}</span>
              <span className="text-[13px] font-medium tabular-nums text-[#16233E]">
                {g.count.toLocaleString('en-US')}
              </span>
            </div>
            <div className="mt-1.5 h-1 rounded-full bg-[#E4E9F4]">
              <div
                className="h-full rounded-full bg-[#152E56]"
                style={{ width: `${(g.count / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InquiriesSection({
  mode,
  inquiries,
}: {
  mode: SectionMode;
  inquiries: { received: number; decided: number; byOrigin: InquiryGroup[]; byDecision: InquiryGroup[] };
}) {
  return (
    <section>
      <SectionLabel>Inquiries</SectionLabel>
      <div className="mt-4">
        {mode === 'loading' ? (
          <div className="grid grid-cols-2 gap-4">
            <SkeletonStat />
            <SkeletonStat />
          </div>
        ) : mode === 'error' ? (
          <ErrorBlock />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon="ri-mail-check-line"
                value={inquiries.received.toLocaleString('en-US')}
                label="Inquiries received"
              />
              <StatCard
                icon="ri-git-merge-line"
                value={inquiries.decided.toLocaleString('en-US')}
                label="Inquiries decided"
              />
            </div>
            <TrackGroup title="By origin" groups={inquiries.byOrigin} />
            <TrackGroup title="By decision" groups={inquiries.byDecision} />
            <div className="mt-6 bg-[#F3F6FC] rounded-[12px] p-4 space-y-2">
              <p className="text-[13px] text-[#5D6C8A]">
                We can show how many inquiries arrived and how many you decided, but not how
                quickly — there's no response clock in this product.
              </p>
              <p className="text-[13px] text-[#5D6C8A]">
                We also can't tell you what came of one. Once you've called someone, everything
                after that happens between you and them, off this platform.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}