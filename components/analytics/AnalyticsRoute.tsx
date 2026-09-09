'use client';

import { useState } from 'react';
import AnalyticsSettings from './AnalyticsSettings';
import StateSwitcherPanel from '../ui/StateSwitcherPanel';
import type { AnalyticsState, PeriodId } from './data';

const previews: { value: AnalyticsState; label: string }[] = [
  { value: 'default', label: 'Populated' },
  { value: 'noActivity', label: 'No activity' },
  { value: 'noCatalogs', label: 'No catalogs' },
  { value: 'noWidget', label: 'No widget' },
  { value: 'deleted', label: 'Deleted catalog' },
  { value: 'archiveEmpty', label: 'Archive empty' },
  { value: 'noMatch', label: 'Archive no match' },
  { value: 'loading', label: 'Loading' },
  { value: 'error', label: 'Error' },
];

export default function AnalyticsRoute() {
  const [state, setState] = useState<AnalyticsState>('default');
  const [period, setPeriod] = useState<PeriodId>('30d');

  return (
    <>
      <AnalyticsSettings state={state} period={period} onPeriodChange={setPeriod} />
      <StateSwitcherPanel
        title="Preview state"
        icon="ri-line-chart-line"
        hint="Switch how the analytics screen looks"
        groups={[{ options: previews.map((p) => ({ value: p.value, label: p.label })) }]}
        active={(v) => state === v}
        onSelect={(v) => setState(v as AnalyticsState)}
      />
    </>
  );
}