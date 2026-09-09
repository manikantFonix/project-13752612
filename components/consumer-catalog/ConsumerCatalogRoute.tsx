'use client';

import { useEffect, useState } from 'react';
import { resolveCatalog, type RetailerBranding } from './data';
import ConsumerHeader from './ConsumerHeader';
import ConsumerFooter from './ConsumerFooter';
import CatalogGrid from './CatalogGrid';
import SelectionBar from './SelectionBar';
import UnavailablePage from './UnavailablePage';
import PreviewControl, { type PreviewScenario } from './PreviewControl';

const GRID_SCENARIOS: PreviewScenario[] = [
  { id: 'default', label: 'Default' },
  { id: 'filtered', label: 'Filtered' },
  { id: 'nomatch', label: 'No match' },
  { id: 'empty', label: 'Empty' },
  { id: 'loading', label: 'Loading' },
  { id: 'broken', label: 'Broken image' },
  { id: 'unavailable', label: 'Unavailable' },
  { id: 'sel-none', label: 'Selection off' },
  { id: 'sel-single', label: 'Selection 1' },
  { id: 'sel-few', label: 'Selection 3' },
  { id: 'sel-over', label: 'Over PDF cap' },
  { id: 'sel-drop', label: 'Items dropped' },
  { id: 'brand-nologo', label: 'No logo' },
  { id: 'brand-nocontact', label: 'No contact' },
];

export default function ConsumerCatalogRoute({ token }: { token: string }) {
  const catalog = resolveCatalog(token);
  const [scenario, setScenario] = useState('default');

  useEffect(() => {
    try {
      if (!window.sessionStorage.getItem(`consumer-visit:${token}`)) {
        window.sessionStorage.setItem(`consumer-visit:${token}`, '1');
      }
    } catch {
      /* ignore */
    }
  }, [token]);

  if (!catalog || !catalog.available || scenario === 'unavailable') {
    return <UnavailablePage />;
  }

  const showLogo = scenario !== 'brand-nologo';
  const noContact = scenario === 'brand-nocontact';
  const effectiveBrand: RetailerBranding = noContact
    ? { ...catalog.brand, email: undefined, phone: undefined }
    : catalog.brand;

  return (
    <div
      className="min-h-screen bg-[#EDF1FA]"
      style={{ ['--brand' as any]: catalog.brand.primaryColor }}
    >
      <ConsumerHeader brand={effectiveBrand} showLogo={showLogo} />
      <CatalogGrid
        catalog={catalog}
        scenario={scenario}
        brandColor={catalog.brand.primaryColor}
      />
      <ConsumerFooter brand={effectiveBrand} />
      <SelectionBar
        token={token}
        brand={catalog.brand}
        scenario={scenario}
      />
      <PreviewControl
        scenarios={GRID_SCENARIOS}
        value={scenario}
        onChange={setScenario}
      />
    </div>
  );
}