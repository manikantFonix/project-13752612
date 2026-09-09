'use client';

import SectionLabel from './SectionLabel';
import StatCard from './StatCard';
import ErrorBlock from './ErrorBlock';
import { SkeletonStat } from './SkeletonStat';
import type { SectionMode, Slice } from './data';

function StatGroup({
  mode,
  label,
  cards,
}: {
  mode: SectionMode;
  label: string;
  cards: { icon: string; value: string; label: string; hint: string }[];
}) {
  return (
    <section>
      <SectionLabel>{label}</SectionLabel>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mode === 'loading'
          ? Array.from({ length: cards.length }).map((_, i) => <SkeletonStat key={i} />)
          : mode === 'error'
            ? <ErrorBlock />
            : cards.map((c, i) => (
                <StatCard key={c.label} icon={c.icon} value={c.value} label={c.label} hint={c.hint} />
              ))}
      </div>
    </section>
  );
}

export default function DesignActivity({
  mode,
  activity,
  inProduction,
}: {
  mode: SectionMode;
  activity: {
    designsGenerated: number;
    refinements: number;
    approvals: number;
    rejections: number;
    quotesReceived: number;
    quotesAccepted: number;
  };
  inProduction: number;
}) {
  const approvalRate =
    activity.approvals + activity.rejections > 0
      ? Math.round((activity.approvals / (activity.approvals + activity.rejections)) * 100)
      : 0;

  const fmt = (n: number) => n.toLocaleString('en-US');
  const pct = (n: number) => `${n}%`;

  return (
    <div className="flex flex-col gap-8">
      <StatGroup
        mode={mode}
        label="Design activity"
        cards={[
          { icon: 'ri-brush-line', value: fmt(activity.designsGenerated), label: 'Designs generated', hint: 'Bespoke pieces made from a description.' },
          { icon: 'ri-refresh-line', value: fmt(activity.refinements), label: 'Refinements', hint: 'Times a design was sent back for a change.' },
          { icon: 'ri-check-double-line', value: fmt(activity.approvals), label: 'Approvals', hint: 'Customers who approved.' },
          { icon: 'ri-close-circle-line', value: fmt(activity.rejections), label: 'Rejections', hint: 'Customers who asked for changes.' },
        ]}
      />
      <StatGroup
        mode={mode}
        label="Quotes and outcomes"
        cards={[
          { icon: 'ri-file-list-3-line', value: fmt(activity.quotesReceived), label: 'Quotes received', hint: 'Manufacturers who sent a price.' },
          { icon: 'ri-checkbox-circle-line', value: fmt(activity.quotesAccepted), label: 'Quotes accepted', hint: 'Prices you went ahead with.' },
          { icon: 'ri-percent-line', value: pct(approvalRate), label: 'Approval rate', hint: 'Of the designs you shared.' },
          { icon: 'ri-tools-line', value: fmt(inProduction), label: 'In production', hint: 'Requests with a manufacturer working on them.' },
        ]}
      />
    </div>
  );
}