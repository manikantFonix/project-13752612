'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DesignTiles, { JEWELRY_TYPES, MORE_TYPES } from './DesignTiles';
import DesignDescription from './DesignDescription';
import DesignLibrary, { type LibraryState } from './DesignLibrary';
import CustomStateControl, { type CustomState } from './CustomStateControl';
import { registerNewRequest } from './requests/data';
import SketchDialog from './SketchDialog';
import VoiceDialog from './VoiceDialog';

const SAMPLE_DESC =
  'A one-off rose gold solitaire, six-prong setting, featuring a 1.2ct round brilliant. The customer asked for a slightly tapered band and no engraving.';

const SKETCH_THUMB =
  'https://readdy.ai/api/search-image?query=close%20up%20jewelry%20sketch%20drawing%20of%20a%20ring%20on%20plain%20white%20paper%2C%20simple%20pencil%20line%20art%2C%20minimal&width=40&height=40&seq=41&orientation=squarish';

const sampleAttachments = [
  { id: 'a1', name: 'reference-scan.png', thumb: SKETCH_THUMB, kind: 'photo' as const },
  {
    id: 'a2',
    name: 'stone-photo.jpg',
    thumb:
      'https://readdy.ai/api/search-image?query=macro%20photograph%20of%20a%20single%20round%20cut%20gemstone%20on%20a%20plain%20white%20background%2C%20soft%20even%20lighting&width=40&height=40&seq=42&orientation=squarish',
    kind: 'photo' as const,
  },
];

type Attachment = { id: string; name: string; thumb: string; kind: 'photo' | 'sketch' };

const typeLabel: Record<string, string> = [
  ...JEWELRY_TYPES,
  ...MORE_TYPES,
].reduce<Record<string, string>>((acc, t) => {
  acc[t.id] = t.label;
  return acc;
}, {});

const VIDEO_MSG =
  "Video isn't accepted. Use a photo, a sketch, a description or your voice.";

export default function CustomDesign() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [more, setMore] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [generating, setGenerating] = useState(false);
  const [libraryState, setLibraryState] = useState<LibraryState>('ready');
  const [balance, setBalance] = useState(18);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [sketchOpen, setSketchOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [demoState, setDemoState] = useState<CustomState>('default');

  const applyDemo = (s: CustomState) => {
    setDemoState(s);
    setMore(s === 'more-expanded');
    setGenerating(s === 'generating');
    setVideoError(s === 'video-refused' ? VIDEO_MSG : null);
    setBalance(s === 'low-balance' ? 2 : 18);
    setAttachmentsListFor(s);
    setLibraryState(
      s === 'library-empty'
        ? 'empty'
        : s === 'library-loading'
          ? 'loading'
          : s === 'library-error'
            ? 'error'
            : 'ready'
    );
    if (s === 'default') {
      setSelectedType(null);
      setDescription('');
    } else {
      setSelectedType('ring');
      setDescription(s === 'type-selected' ? '' : SAMPLE_DESC);
    }
  };

  const setAttachmentsListFor = (s: CustomState) => {
    if (s === 'attachment') {
      setAttachments(sampleAttachments);
    } else if (s === 'has-sketch') {
      setAttachments([
        { id: 'sk1', name: 'sketch.png', thumb: SKETCH_THUMB, kind: 'sketch' },
      ]);
    } else if (s === 'voice') {
      setAttachments([]);
    } else {
      setAttachments([]);
    }
  };

  const typeSelected = selectedType !== null;
  const textEntered = description.trim() !== '';
  const hasAttachment = attachments.length > 0;
  const hasInput = textEntered || hasAttachment;
  const balanceShort = balance < 3;
  const canGenerate = typeSelected && hasInput && !generating && !balanceShort;
  const disabledReason = !typeSelected
    ? 'Choose a jewelry type to continue.'
    : !hasInput
      ? 'Add a description, a photo, a sketch or a voice note to continue.'
      : null;

  const addFile = (file: File) => {
    if (file.type.startsWith('video/')) {
      setVideoError(VIDEO_MSG);
      return;
    }
    setVideoError(null);
    setAttachments((cur) => [
      ...cur,
      { id: `a${Date.now()}`, name: file.name, thumb: sampleAttachments[0].thumb, kind: 'photo' },
    ]);
  };

  const openFilePicker = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) addFile(file);
    };
    input.click();
  };

  const handleGenerate = () => {
    if (!canGenerate) return;
    registerNewRequest(typeLabel[selectedType!] ?? 'Jewelry', description.trim());
    setGenerating(true);
    setTimeout(() => router.push('/requests/new-request'), 0);
  };

  return (
    <div className="mt-8">
      <section>
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-[15px] font-semibold text-[#16233E]">Jewelry type</h2>
          <span className="text-[13px] text-[#5D6C8A]">Required</span>
        </div>
        <div className="mt-3">
          <DesignTiles
            selected={selectedType}
            onSelect={(id) => {
              setSelectedType((cur) => (cur === id ? null : id));
            }}
            more={more}
            onToggleMore={() => setMore((m) => !m)}
          />
        </div>
      </section>

      <section className="mt-8">
        <div className="mt-0">
          <DesignDescription
            value={description}
            onChange={(v) => {
              setDescription(v);
              setVideoError(null);
            }}
            generating={generating}
            attachments={attachments.map(({ id, name, thumb }) => ({ id, name, thumb }))}
            onRemoveAttachment={(id) => setAttachments((cur) => cur.filter((a) => a.id !== id))}
            onAttach={openFilePicker}
            onCamera={openFilePicker}
            onOpenSketch={() => setSketchOpen(true)}
            onOpenVoice={() => setVoiceOpen(true)}
            canGenerate={canGenerate}
            disabledReason={disabledReason}
            onGenerate={handleGenerate}
          />
        </div>

        {balanceShort && (
          <div className="mt-3 border-l-2 border-[#A8552A] pl-4 py-3 text-[13px]">
            <p className="text-[#A8552A]">
              You need at least 3 renders for this and have {balance}. Nothing has
              been generated and no renders have been used.
            </p>
            <Link
              href="/settings/usage"
              className={`mt-2 inline-flex items-center h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#F3F6FC] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]`}
            >
              Top up renders
            </Link>
          </div>
        )}

        {videoError && (
          <p className="mt-3 text-[13px] text-[#A8552A]">{videoError}</p>
        )}
      </section>

      <div className="mt-8">
        <DesignLibrary
          state={libraryState}
          onRetry={() => setLibraryState('ready')}
        />
      </div>

      <CustomStateControl state={demoState} onChange={applyDemo} />
      {sketchOpen && (
        <SketchDialog
          onClose={() => setSketchOpen(false)}
          onAdd={(dataUrl) => {
            setVideoError(null);
            setAttachments((cur) => [
              ...cur,
              { id: `sk${Date.now()}`, name: 'sketch.png', thumb: dataUrl, kind: 'sketch' },
            ]);
          }}
        />
      )}
      {voiceOpen && (
        <VoiceDialog
          onClose={() => setVoiceOpen(false)}
          onUse={(transcript) => {
            setVideoError(null);
            setDescription(transcript);
          }}
        />
      )}
    </div>
  );
}