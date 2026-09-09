'use client';

import { METAL_HEX, METAL_LIST } from '../../lib/metals';
import { FOCUS_RING, VIEWS, type ViewKey } from './data';

const darkRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#407CDD] focus-visible:ring-offset-2 focus-visible:ring-offset-[#10151E]';

export type MetalId = 'yellow' | 'white' | 'rose';

export type Phase =
  | 'generating-front'
  | 'front-failed'
  | 'front-only'
  | 'generating-angles'
  | 'chain-failed'
  | 'ready'
  | 'locked';

export const ALL_VIEWS: ViewKey[] = ['front', 'side', 'back', 'worn'];

export const FRONT_STAGES = [
  'Writing the prompt for your ring',
  'Drawing the front view',
  'Checking it against your description',
  'Correcting the front view',
  'Generating the other metal colors',
];

export const ANGLE_STAGES = [
  'Drawing the side view',
  'Drawing the back view',
  'Drawing the worn view',
];

const viewLabel = (v: ViewKey) => VIEWS.find((x) => x.key === v)?.label ?? '' + v;

function MetalImg({
  src,
  metal,
  alt,
  contain,
  className,
}: {
  src: string;
  metal: MetalId;
  alt: string;
  contain?: boolean;
  className?: string;
}) {
  const hex = METAL_HEX[metal];
  return (
    <div className={`relative ${className ?? ''}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-${contain ? 'contain' : 'cover'}`}
      />
      {metal !== 'yellow' && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: hex, mixBlendMode: 'multiply', opacity: 0.8 }}
        />
      )}
    </div>
  );
}

const STAGE_ICONS = ['ri-pen-nib-line', 'ri-shapes-line', 'ri-sparkling-2-line'];

function StageNode({
  label,
  state,
  icon,
}: {
  label: string;
  state: 'done' | 'active' | 'pending';
  icon: string;
}) {
  const cx =
    state === 'done'
      ? 'bg-[#E8F1EC] text-[#3D6B54]'
      : state === 'active'
      ? 'bg-[#152E56] text-white'
      : 'bg-[#F3F6FC] text-[#C6CFE0]';
  const labelCx =
    state === 'done'
      ? 'text-[#3D6B54]'
      : state === 'active'
      ? 'text-[#152E56] font-semibold'
      : 'text-[#C6CFE0]';
  return (
    <div className="flex-1 flex flex-col items-center">
      <div
        className={`w-[42px] h-[42px] rounded-[12px] flex items-center justify-center transition-colors duration-300 ${cx}`}
      >
        <i
          className={`${state === 'done' ? 'ri-check-line' : `${icon} design-node-breathe`} text-[20px] w-5 h-5 flex items-center justify-center`}
        />
      </div>
      <p className={`mt-3 text-[12px] text-center leading-tight ${labelCx}`}>
        {label}
      </p>
      <div className="mt-2 h-[4px] flex items-center gap-[5px]">
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            className={`w-[5px] h-[5px] rounded-full ${state === 'active' ? 'design-dot' : state === 'done' ? 'bg-[#3D6B54]' : 'bg-[#C6CFE0]'}`}
            style={{ animationDelay: `${d * 0.16}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function NeuralBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#F3F6FC_0%,#F3F6FC_55%,#EDF1FA_100%)]" />
      <div className="absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full bg-[#407CDD]/20 blur-[90px] design-aurora1" />
      <div className="absolute -bottom-28 -right-20 w-[400px] h-[400px] rounded-full bg-[#5D6C8A]/25 blur-[100px] design-aurora2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-[#407CDD]/15 blur-[110px] design-aurora3" />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 300" preserveAspectRatio="xMidYMid slice">
        <g stroke="#407CDD" strokeWidth="0.5" opacity="0.32">
          <line x1="30" y1="52" x2="120" y2="30" className="design-link" />
          <line x1="120" y1="30" x2="210" y2="64" className="design-link" />
          <line x1="210" y1="64" x2="300" y2="28" className="design-link" />
          <line x1="300" y1="28" x2="388" y2="58" className="design-link" />
          <line x1="30" y1="52" x2="78" y2="150" className="design-link" />
          <line x1="388" y1="58" x2="352" y2="158" className="design-link" />
          <line x1="78" y1="150" x2="210" y2="64" className="design-link" />
          <line x1="352" y1="158" x2="210" y2="64" className="design-link" />
          <line x1="78" y1="150" x2="352" y2="158" className="design-link" opacity="0.5" />
          <line x1="120" y1="30" x2="30" y2="52" stroke="#5D6C8A" />
          <line x1="300" y1="28" x2="210" y2="64" stroke="#5D6C8A" />
        </g>
        <g>
          <circle cx="30" cy="52" r="3.2" className="design-neuron" />
          <circle cx="120" cy="30" r="2.6" className="design-neuron" style={{ animationDelay: '0.2s' }} />
          <circle cx="210" cy="64" r="3.6" className="design-neuron design-neuron-core" />
          <circle cx="300" cy="28" r="2.6" className="design-neuron" style={{ animationDelay: '0.5s' }} />
          <circle cx="388" cy="58" r="3.2" className="design-neuron" style={{ animationDelay: '0.8s' }} />
          <circle cx="78" cy="150" r="2.8" className="design-neuron" style={{ animationDelay: '0.35s' }} />
          <circle cx="352" cy="158" r="2.8" className="design-neuron" style={{ animationDelay: '0.65s' }} />
        </g>
      </svg>

      {[
        { '--x': '12%', '--y': '82%', '--s': '10px', '--d': '0s' },
        { '--x': '18%', '--y': '18%', '--s': '7px', '--d': '1.1s' },
        { '--x': '26%', '--y': '48%', '--s': '5px', '--d': '2s' },
        { '--x': '84%', '--y': '24%', '--s': '8px', '--d': '0.6s' },
        { '--x': '90%', '--y': '72%', '--s': '6px', '--d': '1.6s' },
        { '--x': '70%', '--y': '10%', '--s': '5px', '--d': '2.4s' },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full design-particle"
          style={{
            left: p['--x'],
            top: p['--y'],
            width: p['--s'],
            height: p['--s'],
            animationDelay: p['--d'],
            background: i % 2 ? 'rgba(93,108,138,0.55)' : 'rgba(64,124,221,0.5)',
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
}

function LoadingStage({
  stages,
  current,
  phase,
}: {
  stages: string[];
  current: number;
  phase: number;
}) {
  const total = stages.length;
  const idx = Math.min(current, total - 1);
  const pct = Math.round(((idx + 1) / total) * 100);
  const head = idx > 0 ? 'Applying materials and lighting' : 'Turning your idea into a design';
  return (
    <div className="absolute inset-0 bg-[#F3F6FC] flex flex-col items-center justify-center p-6">
      <NeuralBg />
      <div className="relative z-10 w-full max-w-[760px] bg-white/72 backdrop-blur-md border border-white/70 rounded-[12px] px-6 py-7 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-[40px] h-[40px] rounded-[12px] bg-gradient-to-br from-[#152E56] to-[#407CDD] flex items-center justify-center">
              <i className="ri-sparkling-2-line text-[20px] w-5 h-5 flex items-center justify-center text-white" />
              <span className="absolute -inset-1 rounded-[12px] border border-[#407CDD]/45 design-halo" />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-semibold text-[#16233E]">
                CraftsmanAI at work
              </p>
              <p className="text-[12px] text-[#5D6C8A] leading-snug mt-0.5">
                {head}
              </p>
            </div>
          </div>
          <span className="text-[12px] font-semibold text-[#152E56] bg-[#F3F6FC] rounded-full px-3 py-1.5 whitespace-nowrap">
            Phase {idx + 1} of {total}
          </span>
        </div>

        <div className="mt-5 h-[6px] rounded-[999px] bg-[#E4E9F4] overflow-hidden">
          <div
            className="h-full rounded-[999px] bg-gradient-to-r from-[#152E56] to-[#407CDD] transition-all duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="mt-6 flex items-start">
          {stages.map((label, i) => (
            <div key={label} className="flex-1 flex items-start">
              <StageNode
                label={label}
                state={i < idx ? 'done' : i === idx ? 'active' : 'pending'}
                icon={STAGE_ICONS[i % STAGE_ICONS.length]}
              />
              {i < total - 1 && (
                <div
                  className={`mt-[20px] flex-1 h-[2px] rounded-full ${i < idx ? 'bg-[#3D6B54]' : 'bg-[#DCE3F0]'}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-5 flex items-center justify-center gap-2 text-[12px] text-[#5D6C8A]">
        <i className="ri-information-line text-[14px] w-4 h-4 flex items-center justify-center" />
        {phase === 1
          ? 'Adding the side, back and worn views — this keeps going even if you leave.'
          : 'This takes a moment. You can leave this page — it keeps going.'}
      </div>
    </div>
  );
}

function FrontFailed({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      <p className="text-[13px] font-medium text-[#16233E]">
        The front view couldn't be produced.
      </p>
      <p className="mt-1.5 text-[12px] text-[#5D6C8A]">
        Nothing else was attempted, and the renders that failed aren't charged
        again.
      </p>
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className={`h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#F3F6FC] transition-colors duration-150 whitespace-nowrap ${darkRing}`}
        >
          Try again
        </button>
        <p className="text-[12px] text-[#5D6C8A]">Uses at least 3 renders.</p>
      </div>
    </div>
  );
}

const ANGLE_SLOTS: ViewKey[] = ['side', 'back', 'worn'];

function NeuralTile() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(130%_130%_at_50%_0%,#F3F6FC_0%,#F3F6FC_60%,#EDF1FA_100%)]" />
      <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-[#407CDD]/25 blur-[22px] design-aurora1" />
      <div className="absolute -bottom-6 -right-4 w-16 h-16 rounded-full bg-[#5D6C8A]/25 blur-[24px] design-aurora2" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 176 96" preserveAspectRatio="xMidYMid slice">
        <g stroke="#407CDD" strokeWidth="0.5" opacity="0.35">
          <line x1="16" y1="32" x2="88" y2="20" className="design-link" />
          <line x1="88" y1="20" x2="160" y2="38" className="design-link" />
          <line x1="16" y1="32" x2="56" y2="68" className="design-link" />
          <line x1="160" y1="38" x2="120" y2="68" className="design-link" />
          <line x1="56" y1="68" x2="120" y2="68" className="design-link" opacity="0.5" />
          <line x1="88" y1="20" x2="88" y2="68" stroke="#5D6C8A" opacity="0.6" />
        </g>
        <g>
          <circle cx="16" cy="32" r="2.2" className="design-neuron" />
          <circle cx="88" cy="20" r="2.6" className="design-neuron design-neuron-core" />
          <circle cx="160" cy="38" r="2.2" className="design-neuron" style={{ animationDelay: '0.5s' }} />
          <circle cx="56" cy="68" r="2" className="design-neuron" style={{ animationDelay: '0.35s' }} />
          <circle cx="120" cy="68" r="2" className="design-neuron" style={{ animationDelay: '0.65s' }} />
        </g>
      </svg>
      {[
        { '--x': '18%', '--y': '22%', '--s': '5px', '--d': '0s' },
        { '--x': '72%', '--y': '50%', '--s': '4px', '--d': '1.4s' },
        { '--x': '46%', '--y': '78%', '--s': '4px', '--d': '2.2s' },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full design-particle"
          style={{
            left: p['--x'],
            top: p['--y'],
            width: p['--s'],
            height: p['--s'],
            animationDelay: p['--d'],
            background: i % 2 ? 'rgba(93,108,138,0.6)' : 'rgba(64,124,221,0.55)',
            filter: 'blur(0.6px)',
          }}
        />
      ))}
    </div>
  );
}

function SkeletonAngle({ label }: { label: string }) {
  return (
    <div className="flex-1 flex flex-col relative">
      <div className="flex-1 aspect-square rounded-[8px] overflow-hidden bg-[#F3F6FC] border border-[#DCE3F0] relative">
        <NeuralTile />
        <div className="absolute inset-0 design-shimmer" />
      </div>
      <span className="absolute left-2 bottom-2 text-[11px] font-medium text-[#16233E] bg-white/75 backdrop-blur px-1.5 py-0.5 rounded-[6px] whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function AngleGrid({
  available,
  metal,
  activeView,
  imageFor,
  onSelect,
  phase,
  onGenerateMore,
  canGenerate,
}: {
  available: ViewKey[];
  metal: MetalId;
  activeView: ViewKey;
  imageFor: (v: ViewKey) => string;
  onSelect: (v: ViewKey) => void;
  phase: Phase;
  onGenerateMore: () => void;
  canGenerate: boolean;
}) {
  const allAngles = available.length === ALL_VIEWS.length;
  const generating = phase === 'generating-angles';

  if (!allAngles && !generating) {
    return (
      <div className="relative w-[18%] min-w-[170px] max-w-[250px] rounded-[12px] border border-[#DCE3F0] bg-[#F3F6FC] flex flex-col items-center justify-center gap-2.5 px-3 text-center">
        <i className="ri-layout-grid-fill text-[24px] w-6 h-6 flex items-center justify-center text-[#5D6C8A]" />
        <p className="text-[13px] font-medium text-[#16233E]">3 more angles</p>
        <p className="text-[12px] text-[#5D6C8A] leading-relaxed">
          Side, back and worn views of this design.
        </p>
        <button
          type="button"
          onClick={onGenerateMore}
          className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${darkRing} ${
            canGenerate
              ? 'bg-white border-[#DCE3F0] text-[#16233E] hover:bg-[#EDF1FA]'
              : 'border-[#DCE3F0] text-[#C6CFE0] cursor-not-allowed'
          }`}
        >
          Get more angles
        </button>
      </div>
    );
  }

  if (generating) {
    return (
      <div
        className="flex flex-col gap-3 w-[18%] min-w-[170px] max-w-[250px]"
        role="tablist"
        aria-label="Angles"
      >
        {ANGLE_SLOTS.map((v) => (
          <SkeletonAngle key={v} label={viewLabel(v)} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-3 w-[18%] min-w-[170px] max-w-[250px]"
      role="tablist"
      aria-label="Angles"
    >
      {ANGLE_SLOTS.map((v) => {
        return (
          <button
            key={v}
            type="button"
            data-v={v}
            role="tab"
            aria-selected={false}
            onClick={() => onSelect(v)}
            className={`relative text-left flex-1 flex flex-col transition-opacity duration-150 hover:opacity-100 ${darkRing}`}
          >
            <div className="flex-1 aspect-square rounded-[8px] overflow-hidden bg-white border border-[#DCE3F0]">
              <MetalImg
                src={imageFor(v)}
                metal={metal}
                alt={`${viewLabel(v)} view in ${metalName(metal)}`}
                className="w-full h-full"
              />
            </div>
            <span className="absolute left-2 bottom-2 text-[11px] font-medium text-[#16233E] bg-white/75 backdrop-blur px-1.5 py-0.5 rounded-[6px] whitespace-nowrap">
              {viewLabel(v)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export const metalName = (m: MetalId) =>
  METAL_LIST.find((x) => x.id === m)?.name ?? '';

interface Props {
  phase: Phase;
  metal: MetalId;
  onMetal: (m: MetalId) => void;
  activeView: ViewKey;
  onActiveView: (v: ViewKey) => void;
  imageFor: (v: ViewKey) => string;
  available: ViewKey[];
  frontStage: number;
  angleStage: number;
  onRetryFront: () => void;
  onRetrySide: () => void;
  onGenerateMore: () => void;
  canGenerate: boolean;
  onDownload: () => void;
}

export default function DesignView({
  phase,
  metal,
  onMetal,
  activeView,
  onActiveView,
  imageFor,
  available,
  frontStage,
  angleStage,
  onRetryFront,
  onRetrySide,
  onGenerateMore,
  canGenerate,
  onDownload,
}: Props) {
  const showImage = available.includes(activeView);
  const running = phase === 'generating-front' || phase === 'generating-angles';
  const activeLabel = showImage ? viewLabel(activeView) : '';

  return (
    <div aria-live="polite">
      <div className="flex items-stretch gap-3">
        <div className="relative flex-1 rounded-[12px] bg-[#F3F6FC] border border-[#DCE3F0] overflow-hidden flex items-center justify-center">
          {showImage && (
            <MetalImg
              src={imageFor(activeView)}
              metal={metal}
              alt={`${activeLabel} view in ${metalName(metal)}`}
              contain
              className="w-[62%] h-[62%]"
            />
          )}

          <div className="absolute top-3 right-3 flex items-center gap-2.5">
            <button
              type="button"
              onClick={onDownload}
              aria-label="Download the active view"
              title="Download"
              className={`w-9 h-9 flex items-center justify-center rounded-full bg-white/85 backdrop-blur border border-[#DCE3F0] text-[#5D6C8A] hover:text-[#16233E] hover:border-[#C6D0E6] transition-colors duration-150 ${darkRing}`}
            >
              <i className="ri-download-2-line text-[18px]" />
            </button>
            <span className="text-[12px] text-[#5D6C8A]">{metalName(metal)}</span>
            <div className="flex items-center gap-2">
              {METAL_LIST.map((m) => {
                const selected = m.id === metal;
                return (
                  <button
                    key={m.id}
                    type="button"
                    aria-label={m.name}
                    title={m.name}
                    aria-pressed={selected}
                    onClick={() => onMetal(m.id as MetalId)}
                    className={`w-8 h-8 rounded-full transition-colors duration-150 ${darkRing} ${
                      selected
                        ? 'ring-2 ring-[#407CDD] ring-offset-2 ring-offset-[#F3F6FC]'
                        : 'hover:ring-2 hover:ring-[#AFB9CA]/50'
                    }`}
                    style={{ backgroundColor: m.hex }}
                  />
                );
              })}
            </div>
          </div>

          {showImage && (
            <span className="absolute bottom-3 left-3 text-[12px] text-[#5D6C8A]">
              {activeLabel}
            </span>
          )}

          {phase === 'generating-front' && (
            <LoadingStage
              stages={FRONT_STAGES}
              current={frontStage}
              phase={0}
            />
          )}
          {phase === 'chain-failed' && <FrontFailed onRetry={onRetrySide} />}
          {phase === 'front-failed' && <FrontFailed onRetry={onRetryFront} />}
        </div>

        <AngleGrid
          available={available}
          metal={metal}
          activeView={activeView}
          imageFor={imageFor}
          onSelect={onActiveView}
          phase={phase}
          onGenerateMore={onGenerateMore}
          canGenerate={canGenerate}
        />
      </div>

      <style>{`@keyframes design-track { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } } .design-shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent); background-size: 200% 100%; animation: design-shimmer 1.4s linear infinite; } @keyframes design-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } } .design-node-breathe { animation: design-node 1.5s ease-in-out infinite; } @keyframes design-node { 0%, 100% { transform: scale(0.92); opacity: 0.6; } 50% { transform: scale(1.05); opacity: 1; } } .design-dot { background: #152E56; animation: design-dot 0.9s ease-in-out infinite; } @keyframes design-dot { 0%, 100% { opacity: 0.25; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-3px); } } .design-aurora1 { animation: design-aurora 13s ease-in-out infinite; } .design-aurora2 { animation: design-aurora 16s ease-in-out infinite reverse; } .design-aurora3 { animation: design-aurora 19s ease-in-out infinite; animation-delay: 2s; } @keyframes design-aurora { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.55; } 50% { transform: translate(30px, -20px) scale(1.12); opacity: 0.85; } } .design-neuron { fill: #407CDD; opacity: 0.5; animation: design-neuron 3.2s ease-in-out infinite; transform-origin: center; } .design-neuron-core { fill: #5D6C8A; r: 4.6; } @keyframes design-neuron { 0%, 100% { opacity: 0.35; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.25); } } .design-link { animation: design-link 2.4s linear infinite; } @keyframes design-link { 0% { stroke-dashoffset: 0; stroke-dasharray: 2 120; } 100% { stroke-dashoffset: -122; stroke-dasharray: 2 120; } } .design-particle { animation: design-particle 6s linear infinite; } @keyframes design-particle { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 0.8; } 85% { opacity: 0.6; } 100% { transform: translateY(-70px); opacity: 0; } } .design-halo { animation: design-halo 2.4s ease-in-out infinite; } @keyframes design-halo { 0%, 100% { opacity: 0.25; transform: scale(0.96); } 50% { opacity: 0.9; transform: scale(1.08); } }`}</style>
    </div>
  );
}