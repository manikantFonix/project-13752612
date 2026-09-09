'use client';

import { AreaTimeChart, BarTimeChart } from './TimeChart';
import ErrorBlock from './ErrorBlock';
import type { MonthlyPoint, SectionMode } from './data';

function ChartCard({
  title,
  keyName,
  data,
  kind,
  mode,
}: {
  title: string;
  keyName: 'designs' | 'completed';
  data: MonthlyPoint[];
  kind: 'area' | 'bar';
  mode: SectionMode;
}) {
  const textRow = data
    .map((d) => `${d.month} ${d[keyName].toLocaleString('en-US')}`)
    .join(' · ');

  if (mode === 'loading') {
    return (
      <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
        <div className="h-4 w-36 rounded-full bg-[#E4E9F4]" />
        <div className="mt-2 h-3 w-24 rounded-full bg-[#E4E9F4]" />
        <div className="mt-6 h-40 w-full rounded-[12px] bg-[#E4E9F4]" />
        <div className="mt-4 h-3 w-2/3 rounded-full bg-[#E4E9F4]" />
      </div>
    );
  }

  if (mode === 'error') {
    return (
      <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
        <ErrorBlock />
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
      <h3 className="text-[15px] font-medium text-[#16233E]">{title}</h3>
      <p className="mt-0.5 text-[12px] text-[#5D6C8A]">By month</p>
      <div className="mt-5">
        {kind === 'area' ? (
          <AreaTimeChart data={data} />
        ) : (
          <BarTimeChart data={data} />
        )}
      </div>
      <p className="mt-4 text-[12px] text-[#5D6C8A] tabular-nums leading-relaxed">
        {textRow || 'No activity in this period.'}
      </p>
    </div>
  );
}

export default function TimeChartsSection({
  mode,
  monthly,
}: {
  mode: SectionMode;
  monthly: MonthlyPoint[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title="Designs generated" keyName="designs" data={monthly} kind="area" mode={mode} />
      <ChartCard
        title="Requests completed"
        keyName="completed"
        data={monthly}
        kind="bar"
        mode={mode}
      />
    </div>
  );
}