'use client';

import ErrorBlock from './ErrorBlock';
import { SkeletonStat } from './SkeletonStat';
import type { PipelineStage, SectionMode } from './data';

function FunnelRow({
  stage,
  first,
  current,
}: {
  stage: PipelineStage;
  first: number;
  current?: boolean;
}) {
  const proportion = first > 0 ? (stage.count / first) * 100 : 0;
  const width = `${proportion}%`;
  const inside = proportion >= 12;
  return (
    <div className={`flex items-center gap-3 ${current ? 'rounded-[12px] border border-[#152E56]/15 bg-[#EDF1FA] px-2 py-1.5 -mx-2' : ''}`}>
      <div className="w-[140px] shrink-0 flex items-center gap-2">
        {current && (
          <span aria-hidden="true" className="relative w-2.5 h-2.5 rounded-full bg-[#152E56] flex-shrink-0">
            <span className="absolute inset-0 rounded-full border border-[#152E56]/25" />
          </span>
        )}
        <span className={`text-[13px] truncate ${current ? 'font-semibold text-[#152E56]' : 'text-[#16233E]'}`}>
          {stage.label}
        </span>
        {current && (
          <span className="shrink-0 text-[11px] font-medium text-[#3D6B54] bg-[#E8F1EC] rounded-full px-2 py-0.5">
            Current
          </span>
        )}
      </div>
      <div className="flex-1 h-9 rounded-full bg-[#F3F6FC] relative overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full rounded-full ${current ? 'bg-[#172D54]' : 'bg-[#152E56]'}`}
          style={{ width }}
        />
        {inside ? (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[13px] font-medium text-white tabular-nums whitespace-nowrap">
            {stage.count.toLocaleString('en-US')}
          </span>
        ) : (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[13px] font-medium text-[#16233E] tabular-nums whitespace-nowrap">
            {stage.count.toLocaleString('en-US')}
          </span>
        )}
      </div>
      <div className="w-[56px] shrink-0 text-right text-[13px] text-[#5D6C8A] tabular-nums">
        {Math.round(proportion)}%
      </div>
    </div>
  );
}

function FunnelCard({
  mode,
  pipeline,
  currentLabel,
}: {
  mode: SectionMode;
  pipeline: PipelineStage[];
  currentLabel?: string;
}) {
  if (mode === 'loading') {
    return (
      <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5 space-y-4">
        <div className="h-4 w-36 rounded-full bg-[#E4E9F4]" />
        <div className="h-3 w-48 rounded-full bg-[#E4E9F4]" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-[140px] h-3 rounded-full bg-[#E4E9F4]" />
            <div className="flex-1 h-9 rounded-full bg-[#E4E9F4]" />
            <div className="w-[56px] h-3 rounded-full bg-[#E4E9F4]" />
          </div>
        ))}
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
  if (pipeline.length === 0) {
    return (
      <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
        <h3 className="text-[15px] font-medium text-[#16233E]">Request pipeline</h3>
        <p className="mt-0.5 text-[12px] text-[#5D6C8A]">Where your requests have reached</p>
        <p className="mt-4 text-[13px] text-[#5D6C8A]">No requests in this period.</p>
      </div>
    );
  }
  const first = pipeline[0].count;
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
      <h3 className="text-[15px] font-medium text-[#16233E]">Request pipeline</h3>
      <p className="mt-0.5 text-[12px] text-[#5D6C8A]">Where your requests have reached</p>
      <div className="mt-5 space-y-3">
        {pipeline.map((stage) => (
          <FunnelRow
            key={stage.label}
            stage={stage}
            first={first}
            current={stage.label === currentLabel}
          />
        ))}
      </div>
    </div>
  );
}

export default function PipelineFunnel({
  mode,
  pipeline,
  approvalDays,
  refinementsPerDesign,
  reachingProduction,
  currentLabel = 'Approved',
}: {
  mode: SectionMode;
  pipeline: PipelineStage[];
  approvalDays: number;
  refinementsPerDesign: number;
  reachingProduction: number;
  currentLabel?: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
      <FunnelCard mode={mode} pipeline={pipeline} currentLabel={currentLabel} />
      <div className="flex flex-col gap-4">
        {mode === 'loading' ? (
          <>
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
          </>
        ) : mode === 'error' ? (
          <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
            <ErrorBlock />
          </div>
        ) : (
          <>
            <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
              <div className="w-10 h-10 rounded-[12px] bg-[#F3F6FC] flex items-center justify-center text-[#5D6C8A]">
                <i className="ri-time-line text-[20px]" />
              </div>
              <div className="mt-3 text-[26px] font-semibold tabular-nums leading-none text-[#16233E]">
                {approvalDays > 0 ? `${approvalDays} days` : '—'}
              </div>
              <div className="mt-1 text-[13px] text-[#5D6C8A]">Average time to approval</div>
              <div className="mt-1 text-[12px] text-[#5D6C8A]">
                From sharing a design to the customer deciding.
              </div>
            </div>
            <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
              <div className="w-10 h-10 rounded-[12px] bg-[#F3F6FC] flex items-center justify-center text-[#5D6C8A]">
                <i className="ri-refresh-line text-[20px]" />
              </div>
              <div className="mt-3 text-[26px] font-semibold tabular-nums leading-none text-[#16233E]">
                {refinementsPerDesign > 0 ? refinementsPerDesign.toFixed(1) : '—'}
              </div>
              <div className="mt-1 text-[13px] text-[#5D6C8A]">Average refinements per design</div>
              <div className="mt-1 text-[12px] text-[#5D6C8A]">
                How often a design goes back for changes.
              </div>
            </div>
            <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
              <div className="w-10 h-10 rounded-[12px] bg-[#F3F6FC] flex items-center justify-center text-[#5D6C8A]">
                <i className="ri-tools-line text-[20px]" />
              </div>
              <div className="mt-3 text-[26px] font-semibold tabular-nums leading-none text-[#16233E]">
                {reachingProduction > 0 ? `${reachingProduction}%` : '—'}
              </div>
              <div className="mt-1 text-[13px] text-[#5D6C8A]">Requests reaching production</div>
              <div className="mt-1 text-[12px] text-[#5D6C8A]">
                Of every request you've started.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}