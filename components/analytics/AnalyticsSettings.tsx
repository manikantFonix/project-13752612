'use client';

import { useState } from 'react';
import PeriodSelector from './PeriodSelector';
import AnalyticsHeader from './AnalyticsHeader';
import DesignActivity from './DesignActivity';
import TimeChartsSection from './TimeChartsSection';
import PipelineFunnel from './PipelineFunnel';
import ProductMix from './ProductMix';
import CatalogsSection from './CatalogsSection';
import InquiriesSection from './InquiriesSection';
import WidgetSection from './WidgetSection';
import DesignArchive from './DesignArchive';
import { getViewData, type AnalyticsState, type PeriodId, type SectionMode } from './data';

function periodRow(view: ReturnType<typeof getViewData>, period: PeriodId, onPeriodChange: (p: PeriodId) => void, disabled: boolean) {
  return (
    <div className="flex items-center gap-3">
      <PeriodSelector value={period} onChange={onPeriodChange} disabled={disabled} />
      <span className="text-[13px] text-[#5D6C8A]">{view.period.range}</span>
    </div>
  );
}

export default function AnalyticsSettings({
  state,
  period,
  onPeriodChange,
}: {
  state: AnalyticsState;
  period: PeriodId;
  onPeriodChange: (p: PeriodId) => void;
}) {
  const [view, setView] = useState<'overview' | 'archive'>('overview');
  const mode: SectionMode = state === 'loading' ? 'loading' : state === 'error' ? 'error' : 'ready';
  const viewData = getViewData(state, period);
  const inProduction = viewData.pipeline.find((p) => p.label === 'With a manufacturer')?.count ?? 0;

  return (
    <main className="min-h-screen bg-[#EDF1FA] pt-8 pb-16">
      <div className="max-w-[980px] mx-auto px-8">
        <AnalyticsHeader
          view={view}
          onViewChange={setView}
          count={viewData.archiveRows.length}
        />

        {view === 'overview' ? (
          <>
            <div className="mt-6">{periodRow(viewData, period, onPeriodChange, mode !== 'ready')}</div>
            <div className="mt-8 flex flex-col gap-8">
              <DesignActivity mode={mode} activity={viewData.activity} inProduction={inProduction} />
              <TimeChartsSection mode={mode} monthly={viewData.monthly} />
              <PipelineFunnel
                mode={mode}
                pipeline={viewData.pipeline}
                approvalDays={viewData.cards.approvalDays}
                refinementsPerDesign={viewData.cards.refinementsPerDesign}
                reachingProduction={viewData.cards.reachingProduction}
              />
              <ProductMix mode={mode} productMix={viewData.productMix} />
              <CatalogsSection mode={mode} catalogs={viewData.catalogs} />
              <InquiriesSection mode={mode} inquiries={viewData.inquiries} />
              <WidgetSection mode={mode} widget={viewData.widget} />
            </div>
          </>
        ) : (
          <div className="mt-8">
            <DesignArchive
              mode={mode}
              rows={viewData.archiveRows}
              empty={viewData.archiveEmpty}
              noMatch={viewData.archiveNoMatch}
            />
          </div>
        )}
      </div>
    </main>
  );
}