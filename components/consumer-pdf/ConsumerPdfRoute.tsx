'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { resolveCatalog, servableProducts } from '../consumer-catalog/data';
import ConsumerHeader from '../consumer-catalog/ConsumerHeader';
import ConsumerFooter from '../consumer-catalog/ConsumerFooter';
import PreviewControl, { type PreviewScenario } from '../consumer-catalog/PreviewControl';
import { useSelection } from '../consumer-catalog/SelectionProvider';
import UnavailablePage from '../consumer-catalog/UnavailablePage';
import BackLink from './BackLink';
import DroppedNotice from './DroppedNotice';
import PreparingState from './PreparingState';
import ReadyState from './ReadyState';
import TooManyState from './TooManyState';
import NothingLeftState from './NothingLeftState';
import FailedState from './FailedState';
import GoneState from './GoneState';

const CAP = 50;
const SIZE = '4.2 MB';

const PDF_SCENARIOS: PreviewScenario[] = [
  { id: 'preparing', label: 'Preparing' },
  { id: 'dropped', label: 'Some dropped' },
  { id: 'ready', label: 'Ready' },
  { id: 'toomany', label: 'Too many' },
  { id: 'none', label: 'Nothing left' },
  { id: 'failed', label: 'Failed' },
  { id: 'gone', label: 'Link gone' },
  { id: 'brand-nologo', label: 'No logo' },
  { id: 'brand-nocontact', label: 'No contact' },
];

export default function ConsumerPdfRoute({
  token,
  jobId,
}: {
  token: string;
  jobId?: string;
}) {
  const router = useRouter();
  const catalog = resolveCatalog(token);
  const servable = useMemo(
    () => (catalog ? servableProducts(catalog) : []),
    [catalog],
  );
  const servableIds = useMemo(
    () => new Set(servable.map((p) => p.id)),
    [servable],
  );
  const { selected } = useSelection();

  const [scenario, setScenario] = useState('preparing');
  const [phase, setPhase] = useState<'preparing' | 'ready'>('preparing');
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!jobId) {
      router.replace(`/c/${token}/pdf/preview-job`);
    }
  }, [jobId, token, router]);

  const transition = scenario === 'preparing' || scenario === 'dropped';
  useEffect(() => {
    if (transition) {
      setPhase('preparing');
      setDownloaded(false);
      const t = setTimeout(() => setPhase('ready'), 2600);
      return () => clearTimeout(t);
    }
    setPhase('ready');
  }, [scenario, transition]);

  if (!catalog || !catalog.available) {
    return <UnavailablePage />;
  }

  const realServableSelected = selected.filter((id) => servableIds.has(id));
  let included =
    realServableSelected.length > 0 ? realServableSelected.length : 12;
  let total = selected.length || included;
  let dropped = Math.max(0, total - included);

  if (scenario === 'dropped') {
    included = 12;
    total = 14;
    dropped = 2;
  }
  const chosen = scenario === 'toomany' ? 63 : total;

  const showLogo = scenario !== 'brand-nologo';
  const noContact = scenario === 'brand-nocontact';
  const effectiveBrand = noContact
    ? { ...catalog.brand, email: undefined, phone: undefined }
    : catalog.brand;

  let content: React.ReactNode;
  if (scenario === 'toomany') {
    content = <TooManyState token={token} chosen={chosen} cap={CAP} />;
  } else if (scenario === 'none') {
    content = <NothingLeftState token={token} />;
  } else if (scenario === 'failed') {
    content = <FailedState onRetry={() => setScenario('preparing')} />;
  } else if (scenario === 'gone') {
    content = <GoneState token={token} />;
  } else {
    content = (
      <>
        {dropped > 0 && (
          <DroppedNotice
            dropped={dropped}
            included={included}
            total={total}
          />
        )}
        {phase === 'preparing' ? (
          <PreparingState included={included} catalogName={catalog.name} />
        ) : (
          <ReadyState
            included={included}
            size={SIZE}
            downloaded={downloaded}
            onDownload={() => setDownloaded(true)}
          />
        )}
      </>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#EDF1FA]"
      style={{ ['--brand' as any]: catalog.brand.primaryColor }}
    >
      <ConsumerHeader brand={effectiveBrand} showLogo={showLogo} />
      <main className="max-w-[560px] mx-auto px-6 md:px-0 pt-8 pb-32">
        <BackLink token={token} />
        <div className="mt-4 bg-white border border-[#DCE3F0] rounded-[12px] p-6">
          {content}
        </div>
      </main>
      <ConsumerFooter brand={effectiveBrand} />
      <PreviewControl
        scenarios={PDF_SCENARIOS}
        value={scenario}
        onChange={setScenario}
      />
    </div>
  );
}