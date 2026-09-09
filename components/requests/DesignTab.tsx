'use client';

import { useEffect, useState } from 'react';
import { FOCUS_RING, VIEWS, type Request, type ViewKey } from './data';
import DesignView, {
  ALL_VIEWS,
  ANGLE_STAGES,
  FRONT_STAGES,
  metalName,
  type MetalId,
  type Phase,
} from './DesignView';
import DraftHistory, { type Draft } from './DraftHistory';
import RefineDialog from './RefineDialog';
import DesignStateControl, { type DesignState } from './DesignStateControl';
import ShareMenu from './ShareMenu';
import DesignPrompt from './DesignPrompt';

interface Props {
  req: Request;
  canSwitch: boolean;
  customerSet: boolean;
  onShare: () => void;
  onShareManufacturer: () => void;
}

const LOCK_REASON = 'Locked at the draft that was approved.';
const WAIT_REASON = 'Wait for the front view to finish.';
const CUSTOMER_REASON = 'Add a customer before sharing.';

function buildDrafts(req: Request): Draft[] {
  const fv = req.viewVersions.front;
  if (!fv.length) return [{ id: 'v1', label: 'V1', image: req.views.front ?? '' }];
  return fv.map((v, i) => ({
    id: v.id,
    label: `V${i + 1} · ${v.date}`,
    image: req.views.front ?? '',
  }));
}

const THREE_DRAFTS: Draft[] = [
  { id: 'v1', label: 'V1 · 25 Aug', image: '' },
  { id: 'v2', label: 'V2 · 27 Aug', image: '' },
  { id: 'v3', label: 'V3 · 2 Sep', image: '' },
];

export default function DesignTab({ req, canSwitch, customerSet, onShare, onShareManufacturer }: Props) {
  const baseDrafts = buildDrafts(req);
  const oneImage = req.views.front ?? '';
  const [metal, setMetal] = useState<MetalId>('yellow');
  const [activeView, setActiveView] = useState<ViewKey>('front');
  const [drafts, setDrafts] = useState<Draft[]>(baseDrafts);
  const [currentDraftId, setCurrentDraftId] = useState(
    baseDrafts[baseDrafts.length - 1]?.id ?? ''
  );
  const [phase, setPhase] = useState<Phase>(canSwitch ? 'ready' : 'locked');
  const [available, setAvailable] = useState<ViewKey[]>(
    canSwitch ? [...ALL_VIEWS] : [...ALL_VIEWS]
  );
  const [preview, setPreview] = useState<DesignState | null>(null);
  const [frontStage, setFrontStage] = useState(0);
  const [angleStage, setAngleStage] = useState(0);
  const [refineOpen, setRefineOpen] = useState(false);
  const [anglesOpen, setAnglesOpen] = useState(false);

  const locked = !canSwitch || preview === 'locked';
  const frontRunning = phase === 'generating-front';
  const anglesRunning = phase === 'generating-angles';
  const running = frontRunning || anglesRunning;
  const hasFront = available.includes('front');
  const allAngles = available.length === ALL_VIEWS.length;
  const currentDraftImage =
    drafts.find((d) => d.id === currentDraftId)?.image ?? oneImage;
  const activeLabel = VIEWS.find((v) => v.key === activeView)?.label ?? 'Front';

  const imageFor = (v: ViewKey) =>
    v === 'front' ? currentDraftImage : (req.views[v] ?? '');

  useEffect(() => {
    if (phase !== 'generating-front') return;
    const id = setInterval(() => {
      setFrontStage((s) => {
        if (s >= FRONT_STAGES.length - 1) {
          setPhase('front-only');
          setAvailable(['front']);
          return s;
        }
        return s + 1;
      });
    }, 1200);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'generating-angles') return;
    const order: ViewKey[] = ['side', 'back', 'worn'];
    let i = 0;
    const id = setInterval(() => {
      setAngleStage(Math.min(i, ANGLE_STAGES.length - 1));
      const toAdd = order[i];
      if (toAdd) {
        setAvailable((p) => (p.includes(toAdd) ? p : [...p, toAdd]));
        i++;
      } else {
        setAvailable([...ALL_VIEWS]);
        setPhase('ready');
        clearInterval(id);
      }
    }, 1300);
    return () => clearInterval(id);
  }, [phase]);

  const applyState = (s: DesignState) => {
    setPreview(s);
    setRefineOpen(false);
    switch (s) {
      case 'front-generating':
        setPhase('generating-front');
        setFrontStage(0);
        setDrafts(THREE_DRAFTS.map((d) => ({ ...d, image: oneImage })).slice(0, 1));
        setCurrentDraftId('v1');
        setAvailable([]);
        break;
      case 'front-failed':
        setPhase('front-failed');
        setAvailable([]);
        break;
      case 'front-only':
        setPhase('front-only');
        setDrafts(THREE_DRAFTS.map((d) => ({ ...d, image: oneImage })).slice(0, 1));
        setCurrentDraftId('v1');
        setAvailable(['front']);
        break;
      case 'angles-generating':
        setPhase('generating-angles');
        setAngleStage(0);
        setDrafts(THREE_DRAFTS.map((d) => ({ ...d, image: oneImage })).slice(0, 1));
        setCurrentDraftId('v1');
        setAvailable(['front']);
        break;
      case 'chain-failed':
        setPhase('chain-failed');
        setAvailable(['front']);
        break;
      case 'ready':
        setPhase('ready');
        setAvailable([...ALL_VIEWS]);
        break;
      case 'one-draft':
        setPhase('ready');
        setAvailable([...ALL_VIEWS]);
        setDrafts(THREE_DRAFTS.map((d) => ({ ...d, image: oneImage })).slice(0, 1));
        setCurrentDraftId('v1');
        break;
      case 'three-drafts':
        setPhase('ready');
        setAvailable([...ALL_VIEWS]);
        setDrafts(THREE_DRAFTS.map((d) => ({ ...d, image: oneImage })));
        setCurrentDraftId('v3');
        break;
      case 'older-draft':
        setPhase('ready');
        setAvailable([...ALL_VIEWS]);
        setDrafts(THREE_DRAFTS.map((d) => ({ ...d, image: oneImage })));
        setCurrentDraftId('v1');
        break;
      case 'locked':
        setPhase('locked');
        setAvailable([...ALL_VIEWS]);
        setDrafts(THREE_DRAFTS.map((d) => ({ ...d, image: oneImage })).slice(0, 1));
        setCurrentDraftId('v1');
        break;
      case 'refine-dialog':
        setPhase('ready');
        setAvailable([...ALL_VIEWS]);
        setRefineOpen(true);
        break;
      case 'angles-confirm':
        setPhase('front-only');
        setAvailable(['front']);
        setAnglesOpen(true);
        break;
    }
  };

  const reasons: string[] = [];
  if (running) reasons.push(WAIT_REASON);
  else if (locked) reasons.push(LOCK_REASON);
  if (!customerSet) reasons.push(CUSTOMER_REASON);
  const reasonText = [...new Set(reasons)].join(' ');

  const refineEnabled = !locked && !running && hasFront;
  const anglesEnabled =
    !locked && !running && !allAngles && hasFront;
  const downloadEnabled = hasFront;
  const shareEnabled = !running && customerSet;
  const showImageAvailable = available.includes(activeView);

  const handleDownload = () => {
    if (!showImageAvailable) return;
    const url = imageFor(activeView);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${req.designNo}-${activeLabel.toLowerCase()}-${metalName(metal)}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <DesignView
        phase={phase}
        metal={metal}
        onMetal={setMetal}
        activeView={activeView}
        onActiveView={setActiveView}
        imageFor={imageFor}
        available={available}
        frontStage={frontStage}
        angleStage={angleStage}
        onRetryFront={() => applyState('front-generating')}
        onRetrySide={() => applyState('angles-generating')}
        onGenerateMore={() => applyState('angles-generating')}
        canGenerate={anglesEnabled}
        onDownload={handleDownload}
      />

      <div className="mt-5">
        <DesignPrompt req={req} />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setRefineOpen(true)}
            disabled={!refineEnabled}
            className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
              refineEnabled
                ? 'bg-white border-[#DCE3F0] text-[#16233E] hover:bg-[#EDF1FA]'
                : 'border-[#DCE3F0] text-[#C6D0E6] cursor-not-allowed'
            }`}
          >
            Refine design
          </button>
        </div>
        <ShareMenu
          disabled={!shareEnabled}
          onCustomer={onShare}
          onManufacturer={onShareManufacturer}
        />
      </div>

      {reasonText && (
        <p className="mt-2 text-[13px] text-[#5D6C8A]">{reasonText}</p>
      )}

      <DraftHistory
        drafts={drafts}
        metal={metal}
        currentId={currentDraftId}
        locked={locked}
        reason={LOCK_REASON}
        onSelect={(id) => {
          setCurrentDraftId(id);
        }}
      />

      <DesignStateControl state={preview} onChange={applyState} />

      {refineOpen && (
        <RefineDialog
          hasAllAngles={allAngles}
          onClose={() => setRefineOpen(false)}
          onRefine={() => {
            setRefineOpen(false);
            setDrafts((p) => [
              ...p.map((d) => ({ ...d, label: d.label })),
              { id: `v${p.length + 1}`, label: `V${p.length + 1} · 8 Sep`, image: oneImage },
            ]);
            setCurrentDraftId(`v${Number(currentDraftId.replace('v', '')) + 1}`);
          }}
        />
      )}
    </div>
  );
}