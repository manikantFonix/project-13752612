'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { METAL_LIST } from '../lib/metals';
import DeleteDialog from './DeleteDialog';
import StateSwitcherPanel from './ui/StateSwitcherPanel';

export type DetailDemo =
  | 'default'
  | 'roseGold'
  | 'edited'
  | 'incomplete'
  | 'unresolved'
  | 'saving'
  | 'saveError'
  | 'hidden';

interface Props {
  productId: string;
}

const demos: DetailDemo[] = [
  'default',
  'roseGold',
  'edited',
  'incomplete',
  'unresolved',
  'saving',
  'saveError',
  'hidden',
];

const demoLabel: Record<DetailDemo, string> = {
  default: 'Default',
  roseGold: 'Rose gold',
  edited: 'Edited',
  incomplete: 'Inc. renders',
  unresolved: 'Unresolved',
  saving: 'Saving',
  saveError: 'Save error',
  hidden: 'Hidden',
};

const VIEWS = ['Front', 'Side', 'Back', 'Worn'] as const;

const VIEW_IMG: Record<string, string> = {
  yellow: {
    Front:
      'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20yellow%20gold%20solitaire%20engagement%20ring%20with%20a%20six%20prong%20setting%20and%20brilliant%20cut%20diamond%20shot%20from%20the%20front%2C%20plain%20pale%20off-white%20seamless%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=440&height=440&seq=41&orientation=squarish',
    Side:
      'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20yellow%20gold%20solitaire%20engagement%20ring%20side%20profile%20view%20showing%20the%20tapered%20band%20and%20raised%20six%20prong%20setting%2C%20plain%20pale%20off-white%20seamless%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=440&height=440&seq=42&orientation=squarish',
    Back:
      'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20yellow%20gold%20solitaire%20engagement%20ring%20back%20view%20showing%20the%20smooth%20tapered%20band%20and%20gallery%20beneath%20the%20diamond%2C%20plain%20pale%20off-white%20seamless%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=440&height=440&seq=43&orientation=squarish',
    Worn:
      'https://readdy.ai/api/search-image?query=Elegant%20fashion%20photograph%20of%20a%20yellow%20gold%20solitaire%20engagement%20ring%20worn%20on%20a%20woman%20hand%20wrist%20resting%20on%20a%20clean%20pale%20surface%2C%20soft%20natural%20lighting%2C%20warm%20muted%20palette%2C%20luxury%20jewelry%20on%20model%2C%20refined%20editorial%20composition&width=440&height=440&seq=44&orientation=squarish',
  },
  rose: {
    Front:
      'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20rose%20gold%20solitaire%20engagement%20ring%20with%20a%20six%20prong%20setting%20and%20brilliant%20cut%20diamond%20shot%20from%20the%20front%2C%20plain%20pale%20off-white%20seamless%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=440&height=440&seq=45&orientation=squarish',
    Side:
      'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20rose%20gold%20solitaire%20engagement%20ring%20side%20profile%20view%20showing%20the%20tapered%20band%20and%20raised%20six%20prong%20setting%2C%20plain%20pale%20off-white%20seamless%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=440&height=440&seq=46&orientation=squarish',
    Back:
      'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20rose%20gold%20solitaire%20engagement%20ring%20back%20view%20showing%20the%20smooth%20tapered%20band%20and%20gallery%20beneath%20the%20diamond%2C%20plain%20pale%20off-white%20seamless%20background%2C%20soft%20even%20diffused%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=440&height=440&seq=47&orientation=squarish',
    Worn:
      'https://readdy.ai/api/search-image?query=Elegant%20fashion%20photograph%20of%20a%20rose%20gold%20solitaire%20engagement%20ring%20worn%20on%20a%20woman%20hand%20wrist%20resting%20on%20a%20clean%20pale%20surface%2C%20soft%20natural%20lighting%2C%20warm%20muted%20palette%2C%20luxury%20jewelry%20on%20model%2C%20refined%20editorial%20composition&width=440&height=440&seq=48&orientation=squarish',
  },
};

const UPLOADS = [
  'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20yellow%20gold%20solitaire%20engagement%20ring%20front%20view%2C%20plain%20pale%20off-white%20seamless%20background%2C%20soft%20even%20lighting%2C%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=128&height=128&seq=51&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20yellow%20gold%20solitaire%20engagement%20ring%20side%20profile%20view%2C%20plain%20pale%20off-white%20seamless%20background%2C%20soft%20even%20lighting%2C%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=128&height=128&seq=52&orientation=squarish',
  'https://readdy.ai/api/search-image?query=Professional%20studio%20product%20photograph%20of%20a%20yellow%20gold%20solitaire%20engagement%20ring%20back%20view%2C%20plain%20pale%20off-white%20seamless%20background%2C%20soft%20even%20lighting%2C%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=128&height=128&seq=53&orientation=squarish',
];

const COLORS = METAL_LIST.map((m) => ({ id: m.id, name: m.name, swatch: m.hex }));

const DEFAULT_DESC =
  'Classic solitaire in a six-prong setting, with a tapered band and a brilliant-cut center stone.';

export default function ProductDetail({ productId }: Props) {
  const [demo, setDemo] = useState<DetailDemo>('default');
  const [color, setColor] = useState('yellow');
  const [desc, setDesc] = useState(DEFAULT_DESC);
  const [price, setPrice] = useState('1240');
  const [visible, setVisible] = useState(true);
  const [edited, setEdited] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [unresolved, setUnresolved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [saveError, setSaveError] = useState(false);
  const [hiddenMsg, setHiddenMsg] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      if (clearTimer.current) clearTimeout(clearTimer.current);
    };
  }, []);

  const applyDemo = (d: DetailDemo) => {
    setDemo(d);
    setColor(d === 'roseGold' ? 'rose' : 'yellow');
    setDesc(d === 'edited' ? 'Classic solitaire in a raised six-prong setting, tapered band.' : DEFAULT_DESC);
    setPrice('1240');
    setVisible(d !== 'hidden');
    setEdited(d === 'edited');
    setIncomplete(d === 'incomplete');
    setUnresolved(d === 'unresolved');
    setSaving(d === 'saving');
    setSaveError(d === 'saveError');
    setHiddenMsg(d === 'hidden');
    setSavedMsg('');
    if (d === 'saving') {
      setSavedMsg('Saved');
    }
  };

  const triggerSave = () => {
    setSaveError(false);
    setSaving(true);
    setSavedMsg('Saving…');
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setSaving(false);
      setSavedMsg('Saved');
      clearTimer.current = setTimeout(() => setSavedMsg(''), 2000);
    }, 700);
  };

  const handleDescChange = (v: string) => {
    setDesc(v);
    setEdited(true);
    triggerSave();
  };

  const handlePriceChange = (v: string) => {
    setPrice(v.replace(/[^\d.]/g, ''));
    triggerSave();
  };

  const handleVisibility = () => {
    const next = !visible;
    setVisible(next);
    setHiddenMsg(!next);
    triggerSave();
  };

  const incompleteViews = new Set(['Side', 'Worn']);
  const showIncomplete = incomplete;

  const SaveState = () => {
    if (saveError)
      return (
        <p className="mt-1 text-[13px] text-[#A8552A]">
          We couldn't save your changes.
        </p>
      );
    if (savedMsg) {
      return (
        <p className="mt-1 text-[13px] text-[#3D6B54]">{savedMsg}</p>
      );
    }
    return null;
  };

  return (
    <main className="min-h-screen bg-[#EDF1FA] pt-8 pb-16">
      <div className="max-w-[1180px] mx-auto px-8">
        <nav className="text-[13px] text-[#5D6C8A]">
          <Link
            href="/"
            className="hover:text-[#16233E] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            Catalogs
          </Link>
          <span className="mx-1">/</span>
          <Link
            href="/catalog/bridal-2026"
            className="hover:text-[#16233E] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            Bridal 2026
          </Link>
          <span className="mx-1">/</span>
          <span className="text-[#16233E]">Solitaire ring</span>
        </nav>

        <div className="mt-4 grid grid-cols-[3fr_2fr] gap-8">
          <div>
            <div className="flex items-center gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  className="relative w-7 h-7 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
                  title={c.name}
                >
                  <span
                    className={`w-6 h-6 rounded-full ${
                      color === c.id ? 'ring-2 ring-[#152E56] ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: c.swatch, border: '1px solid #C6D0E6' }}
                  />
                </button>
              ))}
              <span className="text-[13px] text-[#5D6C8A]">
                {COLORS.find((c) => c.id === color)?.name}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {VIEWS.map((v) => (
                <div key={v}>
                  {showIncomplete && incompleteViews.has(v) ? (
                    <div className="w-full aspect-square rounded-[12px] border border-[#DCE3F0] bg-white flex items-center justify-center">
                      <span className="text-[13px] text-[#5D6C8A]">
                        Generating
                      </span>
                    </div>
                  ) : (
                    <div className="w-full aspect-square rounded-[12px] border border-[#DCE3F0] overflow-hidden bg-[#F3F6FC]">
                      <img
                        key={`${color}-${v}`}
                        src={VIEW_IMG[color][v]}
                        alt={`${v} view`}
                        className="w-full h-full object-cover transition-opacity duration-[120ms]"
                      />
                    </div>
                  )}
                  <p className="mt-1.5 text-[13px] text-[#5D6C8A]">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[#DCE3F0]">
              <p className="text-[13px] text-[#5D6C8A]">
                Photographs you uploaded
              </p>
              <div className="mt-2 flex gap-3">
                {UPLOADS.map((u) => (
                  <img
                    key={u}
                    src={u}
                    alt=""
                    className="w-16 h-16 rounded-[12px] object-cover border border-[#DCE3F0] bg-[#F3F6FC]"
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#16233E]">
              Ring
            </h1>

            {unresolved && (
              <p className="mt-3 text-[13px] text-[#A8552A]">
                Saved, but we couldn't tell these angles apart. Retake the photographs to start generating.
              </p>
            )}

            <div className="mt-6">
              {desc === DEFAULT_DESC && (
                <div className="flex justify-end">
                  <span className="px-2 h-6 flex items-center text-[13px] font-medium text-[#5D6C8A] bg-[#EDF1FA] rounded-full">
                    Written by AI
                  </span>
                </div>
              )}
              <label className="block mt-1 text-[13px] font-medium text-[#16233E]">
                Description
              </label>
              <textarea
                value={desc}
                rows={4}
                onChange={(e) => handleDescChange(e.target.value)}
                className="mt-1 w-full px-3 py-2 text-[13px] border border-[#DCE3F0] rounded-[12px] text-[#16233E] outline-none focus:border-[#152E56] resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              />
              <p className="mt-1 text-[13px] text-[#5D6C8A]">
                Edit this any time.
              </p>
              <SaveState />
            </div>

            <div className="mt-6">
              <label className="text-[13px] font-medium text-[#16233E]">
                Price
              </label>
              <div className="mt-1 flex items-center border border-[#DCE3F0] rounded-[12px] focus-within:border-[#152E56] bg-white">
                <span className="pl-3 text-[13px] text-[#5D6C8A]">$</span>
                <input
                  value={price}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="w-full h-10 pl-2 pr-3 text-[13px] text-[#16233E] outline-none bg-transparent tabular-nums focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
                />
              </div>
              <p className="mt-1 text-[13px] text-[#5D6C8A]">
                Leave blank to show Price on request.
              </p>
              <SaveState />
            </div>

            <div className="mt-6">
              <button
                onClick={handleVisibility}
                className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
                aria-pressed={visible}
              >
                <span
                  className={`relative inline-flex items-center w-9 h-5 rounded-full transition-colors duration-150 ${
                    visible ? 'bg-[#152E56]' : 'bg-[#C6CFE0]'
                  }`}
                >
                  <span
                    className={`absolute w-4 h-4 rounded-full bg-white transition-all duration-150 ${
                      visible ? 'left-[18px]' : 'left-[2px]'
                    }`}
                  />
                </span>
                <span className="text-[13px] font-medium text-[#16233E]">
                  Show in catalog
                </span>
              </button>
              <p className="mt-1 text-[13px] text-[#5D6C8A]">
                Turn this off to hide the product from customers without
                deleting it.
              </p>
              {hiddenMsg && !visible && (
                <p className="mt-1 text-[13px] text-[#3D6B54]">
                  This product is now hidden from your catalog.
                </p>
              )}
              <SaveState />
            </div>

            <div className="mt-8 pt-6 border-t border-[#DCE3F0]">
              <button
                onClick={() => setDeleteOpen(true)}
                className="px-2 text-[13px] font-medium text-[#A8552A] hover:text-[#91441E] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              >
                Delete product
              </button>
              <p className="mt-1 text-[13px] text-[#5D6C8A]">
                Deleting is permanent.
              </p>
            </div>
          </div>
        </div>
      </div>

      <StateSwitcherPanel
        title="Preview state"
        icon="ri-product-hunt-line"
        hint="Switch how the product page looks"
        groups={[{ options: demos.map((d) => ({ value: d, label: demoLabel[d] })) }]}
        active={(v) => demo === v}
        onSelect={(v) => applyDemo(v as DetailDemo)}
      />

      <DeleteDialog
        open={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => setDeleteOpen(false)}
      />
    </main>
  );
}