'use client';

import { useEffect, useRef, useState } from 'react';
import { METAL_LIST } from '../lib/metals';

export type DialogDemo =
  | 'default'
  | 'valid'
  | 'tooLong'
  | 'noColor'
  | 'saving'
  | 'error';

export interface NewCatalog {
  id: string;
  name: string;
  productCount: number;
  status: 'Not published';
}

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (catalog: NewCatalog) => void;
}

const METALS = METAL_LIST;

const LONG_NAME =
  'This is a deliberately long catalog name that exceeds eighty characters by quite a margin for the test.';

const demos: DialogDemo[] = [
  'default',
  'valid',
  'tooLong',
  'noColor',
  'saving',
  'error',
];

export default function NewCatalogDialog({ open, onClose, onCreated }: Props) {
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<string[]>(['yellow']);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState<DialogDemo>('default');
  const cancelRef = useRef<HTMLButtonElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !saving) onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, saving, onClose]);

  if (!open) return null;

  const tooLong = name.length > 80;
  const nameFilled = name.trim().length > 0 && !tooLong;
  const hasColor = selected.length > 0;
  const canCreate = nameFilled && hasColor && !saving;
  const renders = selected.length * 4;

  const toggleColor = (id: string) => {
    setError(false);
    if (selected.includes(id)) {
      if (selected.length === 1) return;
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const applyPreview = (d: DialogDemo) => {
    setPreview(d);
    setError(false);
    if (d === 'default') {
      setName('');
      setSelected(['yellow']);
      setSaving(false);
    } else {
      setName(d === 'tooLong' ? LONG_NAME : 'Bridal 2026');
      if (d === 'valid') setSelected(['yellow', 'white']);
      else if (d === 'noColor') setSelected([]);
      else setSelected(['yellow']);
      setSaving(d === 'saving');
      setError(d === 'error');
    }
  };

  const deriveId = (n: string) =>
    n
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

  const create = () => {
    if (!canCreate) return;
    setSaving(true);
    saveTimer.current = setTimeout(() => {
      setSaving(false);
      onCreated({
        id: deriveId(name),
        name: name.trim(),
        productCount: 0,
        status: 'Not published',
      });
      onClose();
    }, 1200);
  };

  let disabledReason = '';
  if (!saving && !canCreate) {
    if (name.trim().length === 0) {
      disabledReason = 'Enter a name to continue.';
    } else if (name.length > 80) {
      disabledReason = 'Shorten the name to 80 characters or fewer.';
    } else if (selected.length === 0) {
      disabledReason = 'Select at least one metal color to continue.';
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(22,35,62,0.4)]"
        onClick={() => !saving && onClose()}
      />
      <div className="relative w-[520px] bg-white border border-[#DCE3F0] rounded-[12px] p-7">
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
          New catalog
        </h2>

        <div className="mt-6">
          <label className="block text-[13px] font-medium text-[#16233E]">
            Catalog name
          </label>
          <div
            className={`flex items-center border rounded-[12px] transition-colors duration-150 ${
              tooLong ? 'border-[#A8552A]' : 'border-[#DCE3F0]'
            }`}
          >
            <input
              type="text"
              value={name}
              disabled={saving}
              maxLength={90}
              onChange={(e) => {
                setError(false);
                setName(e.target.value);
              }}
              placeholder="Bridal 2026"
              className="w-full px-3 h-10 text-[13px] text-[#16233E] placeholder:text-[#5D6C8A] bg-transparent outline-none disabled:bg-[#EDF1FA] disabled:text-[#5D6C8A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
            />
          </div>
          <div className="mt-1 flex items-center justify-between">
            {tooLong ? (
              <span className="text-[13px] text-[#A8552A]">
                Catalog names can be up to 80 characters.
              </span>
            ) : (
              <span />
            )}
            <span className="text-[13px] font-medium text-[#5D6C8A] tabular-nums">
              {name.length}/80
            </span>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-[13px] font-medium text-[#16233E]">
            Metal colors
          </label>
          <p className="mt-1 text-[13px] text-[#5D6C8A]">
            Every product in this catalog will be generated in the colors
            you pick.
          </p>
          <p className="mt-2 text-[13px] text-[#5D6C8A]">
            A color that has been generated for a product can never be
            removed later. You can add more colors at any time.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {METALS.map((m) => {
              const isSel = selected.includes(m.id);
              return (
                <button
                  key={m.id}
                  disabled={saving}
                  onClick={() => toggleColor(m.id)}
                  className={`flex flex-col items-center gap-2 border-2 rounded-[12px] py-3 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
                    isSel
                      ? 'border-[#152E56]'
                      : 'border-[#DCE3F0] hover:border-[#C6D0E6]'
                  } disabled:opacity-60`}
                >
                  <span
                    className="relative w-7 h-7 rounded-full ring-1 ring-black/10"
                    style={{ backgroundColor: m.hex }}
                  >
                    {isSel && (
                      <span className="absolute inset-0 flex items-center justify-center text-white">
                        <i className="ri-check-line text-[16px]" />
                      </span>
                    )}
                  </span>
                  <span className="text-[13px] text-[#16233E]">{m.name}</span>
                </button>
              );
            })}
          </div>
          {!hasColor && (
            <p className="mt-2 text-[13px] text-[#A8552A]">
              Select at least one metal color.
            </p>
          )}
        </div>

        <div className="mt-4 bg-[#EDF1FA] rounded-[12px] p-4">
          <p className="text-[13px] text-[#16233E]">
            Each product generates 4 views in each color —{' '}
            <span className="font-medium tabular-nums">at least {renders} renders</span>{' '}
            per product.
          </p>
        </div>

        {error && (
          <div className="mt-4 border-l-2 border-[#A8552A] pl-3">
            <p className="text-[13px] text-[#A8552A]">
              We couldn't create this catalog. Your details have been kept —
              try again.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            ref={cancelRef}
            onClick={() => !saving && onClose()}
            className="text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 px-2 h-9 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            Cancel
          </button>
          <div className="flex flex-col items-center">
            <button
              onClick={create}
              disabled={!canCreate}
              className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
                canCreate
                  ? 'bg-[#152E56] border-[#152E56] text-white hover:bg-[#172D54]'
                  : 'bg-[#EDF1FA] border-[#DCE3F0] text-[#5D6C8A]'
              }`}
            >
              {saving && (
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {saving ? 'Creating…' : 'Create catalog'}
            </button>
            {!canCreate && !saving && (
              <span className="mt-1 text-[13px] text-[#5D6C8A]">
                {disabledReason}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-1 bg-white border border-[#DCE3F0] rounded-full p-1">
        <span className="px-2 text-[13px] font-medium text-[#5D6C8A]">
          Dialog state
        </span>
        {demos.map((d) => (
          <button
            key={d}
            onClick={() => applyPreview(d)}
            className={`h-7 px-2 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
              preview === d
                ? 'bg-[#152E56] text-white'
                : 'text-[#5D6C8A] hover:bg-[#EDF1FA]'
            }`}
          >
            {d === 'noColor'
              ? 'No color'
              : d === 'tooLong'
              ? 'Too long'
              : d === 'default'
              ? 'Default'
              : d === 'valid'
              ? 'Valid'
              : d === 'saving'
              ? 'Saving'
              : 'Error'}
          </button>
        ))}
      </div>
    </div>
  );
}