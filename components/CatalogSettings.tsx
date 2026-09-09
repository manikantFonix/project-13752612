'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { METAL_LIST } from '../lib/metals';
import RegenerateDialog from './RegenerateDialog';
import DeleteCatalogDialog from './catalog-publication/DeleteCatalogDialog';
import { defaultPublication } from './catalog-publication/types';
import StateSwitcherPanel from './ui/StateSwitcherPanel';

type SettingsDemo =
  | 'default'
  | 'changed'
  | 'dialogDefault'
  | 'dialogOption2'
  | 'dialogNotEnough'
  | 'remAttempt'
  | 'saved1'
  | 'saved2';

const METALS = METAL_LIST.map((m) =>
  m.id === 'yellow' ? { ...m, locked: true } : m
);

const demos: SettingsDemo[] = [
  'default',
  'changed',
  'dialogDefault',
  'dialogOption2',
  'dialogNotEnough',
  'remAttempt',
  'saved1',
  'saved2',
];

const demoLabel: Record<SettingsDemo, string> = {
  default: 'Default',
  changed: 'Changed',
  dialogDefault: 'Dialog',
  dialogOption2: 'Opt 2',
  dialogNotEnough: 'No renders',
  remAttempt: 'Removal',
  saved1: 'Saved 1',
  saved2: 'Saved 2',
};

export default function CatalogSettings() {
  const [cols, setCols] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [opt, setOpt] = useState<1 | 2>(1);
  const [notEnough, setNotEnough] = useState(false);
  const [remMsg, setRemMsg] = useState(false);
  const [confirm, setConfirm] = useState<null | 1 | 2>(null);
  const [preview, setPreview] = useState<SettingsDemo>('default');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const deleteData = defaultPublication(true);
  const remTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (remTimer.current) clearTimeout(remTimer.current);
    };
  }, []);

  const saveEnabled = cols.length > 0;

  const applyPreview = (d: SettingsDemo) => {
    setPreview(d);
    setDialogOpen(['dialogDefault', 'dialogOption2', 'dialogNotEnough'].includes(d));
    setOpt(d === 'dialogOption2' ? 2 : 1);
    setNotEnough(d === 'dialogNotEnough');
    setCols(['changed', 'dialogDefault', 'dialogOption2', 'dialogNotEnough', 'saved1', 'saved2'].includes(d) ? ['rose'] : []);
    setConfirm(d === 'saved1' ? 1 : d === 'saved2' ? 2 : null);
    setRemMsg(d === 'remAttempt');
  };

  const toggle = (id: string) => {
    setConfirm(null);
    setRemMsg(false);
    if (cols.includes(id)) setCols(cols.filter((c) => c !== id));
    else setCols([...cols, id]);
  };

  const clickLocked = () => {
    setCols([]);
    setConfirm(null);
    setRemMsg(true);
    if (remTimer.current) clearTimeout(remTimer.current);
    remTimer.current = setTimeout(() => setRemMsg(false), 2600);
  };

  const openDialog = () => {
    setDialogOpen(true);
    setOpt(1);
    setNotEnough(false);
  };

  const saveDialog = () => {
    setDialogOpen(false);
    setConfirm(opt);
    if (remTimer.current) clearTimeout(remTimer.current);
  };

  return (
    <main className="min-h-screen bg-[#EDF1FA] pt-8 pb-16">
      <div className="max-w-[1180px] mx-auto px-8">
        <nav className="text-[13px] text-[#5D6C8A]">
          <Link href="/" className="hover:text-[#16233E] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]">Catalogs</Link>
          <span className="mx-1">/</span>
          <Link href="/catalog/bridal-2026" className="hover:text-[#16233E] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]">Bridal 2026</Link>
          <span className="mx-1">/</span>
          <span className="text-[#16233E]">Settings</span>
        </nav>

        <h1 className="mt-4 text-[26px] font-semibold tracking-[-0.02em] text-[#16233E]">
          Catalog settings
        </h1>

        <div className="mt-6 max-w-[720px] bg-white border border-[#DCE3F0] rounded-[12px] p-6">
          <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-[#16233E]">
            Metal colors
          </h2>
          <p className="mt-1 text-[13px] text-[#5D6C8A]">
            Products you add from now on will be generated in these colors.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {METALS.map((m) => {
              const locked = !!m.locked;
              const selected = locked || cols.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => (locked ? clickLocked() : toggle(m.id))}
                  className={`flex flex-col items-center gap-2 border-2 rounded-[12px] py-3 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
                    selected ? 'border-[#152E56]' : 'border-[#DCE3F0] hover:border-[#C6D0E6]'
                  } ${locked ? 'bg-[#F3F6FC] cursor-not-allowed' : ''}`}
                >
                  <span
                    className="relative w-7 h-7 rounded-full ring-1 ring-black/10"
                    style={{ backgroundColor: m.hex }}
                  >
                    {selected && (
                      <span className={`absolute inset-0 flex items-center justify-center text-white ${locked ? 'opacity-50' : ''}`}>
                        <i className="ri-check-line text-[16px]" />
                      </span>
                    )}
                  </span>
                  <span className={`flex items-center gap-1 text-[13px] ${locked ? 'text-[#5D6C8A]' : 'text-[#16233E]'}`}>
                    {m.name}
                    {locked && <i className="ri-lock-2-line text-[14px]" />}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-[13px] text-[#5D6C8A]">
            This color has already been generated and can't be removed.
          </p>
          {remMsg && (
            <p className="mt-1 text-[13px] text-[#A8552A]">
              Yellow gold has already been generated and can't be removed.
            </p>
          )}

          {confirm === 1 && (
            <p className="mt-4 text-[13px] text-[#3D6B54]">
              New products will be generated in yellow gold and rose gold.
              Existing products are unchanged.
            </p>
          )}
          {confirm === 2 && (
            <div className="mt-4 text-[13px] text-[#3D6B54]">
              <p>Generating rose gold for 128 products.</p>
              <button className="mt-1 font-medium text-[#3D6B54] underline underline-offset-2 hover:text-[#2f5542] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]">
                View render status
              </button>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={openDialog}
              disabled={!saveEnabled}
              className={`h-10 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
                saveEnabled
                  ? 'bg-[#152E56] border-[#152E56] text-white hover:bg-[#172D54]'
                  : 'bg-[#EDF1FA] border-[#DCE3F0] text-[#5D6C8A]'
              }`}
            >
              Save colors
            </button>
          </div>
        </div>

        <div className="mt-8 max-w-[720px] border-t border-[#DCE3F0] pt-8">
          <h2 className="text-[15px] font-medium text-[#16233E]">
            Delete this catalog
          </h2>
          <p className="mt-1 text-[13px] text-[#5D6C8A]">
            This destroys the catalog and everything in it. It cannot be
            undone.
          </p>
          <button
            ref={deleteButtonRef}
            onClick={() => setDeleteOpen(true)}
            className="mt-4 h-9 px-4 text-[13px] font-medium text-[#A8552A] bg-white border border-[#A8552A] rounded-full hover:bg-[#F3F6FC] hover:text-[#91441E] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            Delete catalog
          </button>
        </div>
      </div>

      <RegenerateDialog
        open={dialogOpen}
        option={opt}
        notEnough={notEnough}
        onOption={setOpt}
        onCancel={() => setDialogOpen(false)}
        onSave={saveDialog}
      />

      <DeleteCatalogDialog
        open={deleteOpen}
        catalogName="Bridal 2026"
        data={deleteData}
        onCancel={() => setDeleteOpen(false)}
        triggerRef={deleteButtonRef}
      />

      <StateSwitcherPanel
        title="Settings state"
        icon="ri-settings-3-line"
        hint="Switch how the catalog settings page looks"
        groups={[{ options: demos.map((d) => ({ value: d, label: demoLabel[d] })) }]}
        active={(v) => preview === v}
        onSelect={(v) => applyPreview(v as SettingsDemo)}
      />
    </main>
  );
}