'use client';

import Link from 'next/link';
import SectionLabel from './SectionLabel';
import StatCard from './StatCard';
import ErrorBlock from './ErrorBlock';
import { SkeletonStat } from './SkeletonStat';
import { focusRing, type SectionMode } from './data';

export default function WidgetSection({
  mode,
  widget,
}: {
  mode: SectionMode;
  widget: { installed: boolean; designsGenerated: number; estimatesProduced: number; inquiriesRaised: number };
}) {
  return (
    <section>
      <SectionLabel>Widget</SectionLabel>
      <div className="mt-4">
        {mode === 'loading' ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonStat key={i} />
            ))}
          </div>
        ) : mode === 'error' ? (
          <ErrorBlock />
        ) : !widget.installed ? (
          <div className="flex items-center gap-3">
            <p className="text-[13px] text-[#5D6C8A]">No widget installed yet.</p>
            <Link
              href="/settings/widget"
              className={`h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
            >
              Set up the widget
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              icon="ri-brush-line"
              value={widget.designsGenerated.toLocaleString('en-US')}
              label="Designs generated"
              hint="Made through the widget on your site."
            />
            <StatCard
              icon="ri-calculator-line"
              value={widget.estimatesProduced.toLocaleString('en-US')}
              label="Estimates produced"
              hint="Prices your customers saw."
            />
            <StatCard
              icon="ri-mail-send-line"
              value={widget.inquiriesRaised.toLocaleString('en-US')}
              label="Inquiries raised"
              hint="Requests sent to you from the widget."
            />
          </div>
        )}
      </div>
    </section>
  );
}