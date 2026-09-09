'use client';

import SegmentedControl from './SegmentedControl';

export default function AnalyticsHeader({
  view,
  onViewChange,
  count,
}: {
  view: 'overview' | 'archive';
  onViewChange: (v: 'overview' | 'archive') => void;
  count: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#16233E]">
          Analytics
        </h1>
        <p className="mt-1 text-[13px] text-[#5D6C8A]">What your account has produced</p>
      </div>
      <SegmentedControl value={view} onValueChange={onViewChange} count={count} />
    </div>
  );
}