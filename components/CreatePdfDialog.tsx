'use client';

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import type { Product } from './ProductTable';

type Phase = 'select' | 'preparing' | 'ready' | 'failed';
type DemoTab = 'select' | 'cap' | 'unpublished' | 'preparing' | 'ready' | 'dropped' | 'failed';

const demos: DemoTab[] = ['select', 'cap', 'unpublished', 'preparing', 'ready', 'dropped', 'failed'];

const demoLabel: Record<DemoTab, string> = {
  select: 'Select',
  cap: 'Cap',
  unpublished: 'Unpublish',
  preparing: 'Preparing',
  ready: 'Ready',
  dropped: 'Dropped',
  failed: 'Failed',
};

const MAX_PDF = 50;
const CAP_SYNTH = 60;

const SYNTH_IMG =
  'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20with%20a%20six-prong%20setting%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=41&orientation=squarish';

function syntheticProducts(count: number): Product[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `s${i + 1}`,
    category: 'Ring',
    description: `Synthetic piece ${i + 1} design`,
    renderStatus: 'complete',
    price: 1000 + i * 30,
    active: true,
    image: SYNTH_IMG,
  }));
}

function includeReason(p: Product): 'ok' | 'generating' | 'flagged' | 'inactive' {
  if (!p.active) return 'inactive';
  if (p.renderStatus === 'flagged') return 'flagged';
  if (p.renderStatus !== 'complete') return 'generating';
  return 'ok';
}

const reasonText: Record<'generating' | 'flagged' | 'inactive', string> = {
  generating: 'Renders still generating',
  flagged: 'Renders flagged',
  inactive: 'Set to inactive',
};

function formatPrice(price: number | null): string {
  if (price === null) return 'Price on request';
  return `$${price.toLocaleString('en-US')}`;
}

interface Props {
  open: boolean;
  onClose: () => void;
  openButtonRef?: RefObject<HTMLButtonElement | null>;
  products: Product[];
  catalogName: string;
  published: boolean;
  initialSelection?: string[];
}

export default function CreatePdfDialog({
  open,
  onClose,
  openButtonRef,
  products,
  catalogName,
  published,
  initialSelection,
}: Props) {
  const [phase, setPhase] = useState<Phase>('select');
  const [demo, setDemo] = useState<DemoTab>('select');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const baseProducts = useMemo(() => {
    if (demo === 'cap') return syntheticProducts(CAP_SYNTH);
    if (demo === 'dropped') return syntheticProducts(14);
    return products;
  }, [demo, products]);

  const includableIds = useMemo(
    () => baseProducts.filter((p) => includeReason(p) === 'ok').map((p) => p.id),
    [baseProducts]
  );

  const availableCount = includableIds.length;
  const selectedCount = selected.size;
  const includedCount = selectedCount;
  const capReached = selectedCount >= MAX_PDF;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return baseProducts.filter((p) => {
      if (!q) return true;
      return (
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
  }, [baseProducts, search]);

  const dropped: number = demo === 'dropped' ? 2 : 0;
  const shownIncluded = demo === 'dropped' ? Math.max(0, selectedCount - dropped) : selectedCount;

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setPhase('select');
    setDemo('select');
    setSearch('');
    setDownloaded(false);
    const pre = initialSelection ?? [];
    setSelected(
      new Set(
        includableIds.filter((id) => pre.includes(id)).slice(0, MAX_PDF),
      ),
    );
    cancelRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => {
    openButtonRef?.current?.focus();
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const els = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && el.style.display !== 'none');
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, phase, selected]);

  const applyDemo = (d: DemoTab) => {
    setDemo(d);
    setSearch('');
    setDownloaded(false);
    if (d === 'cap') {
      setPhase('select');
      setSelected(new Set(includableIds.slice(0, 50)));
      return;
    }
    if (d === 'unpublished' || d === 'select') {
      setPhase('select');
      setSelected(new Set());
      return;
    }
    if (d === 'preparing' || d === 'ready') {
      setPhase(d);
      setSelected(new Set(includableIds.slice(0, 12)));
      return;
    }
    if (d === 'dropped') {
      setPhase('ready');
      setSelected(new Set(includableIds.slice(0, 14)));
      return;
    }
    if (d === 'failed') {
      setPhase('failed');
      setSelected(new Set(includableIds.slice(0, 12)));
      return;
    }
  };

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedCount === Math.min(availableCount, MAX_PDF)) {
      setSelected(new Set());
    } else {
      setSelected(new Set(includableIds.slice(0, MAX_PDF)));
    }
  };

  const startCreate = () => {
    if (includedCount === 0) return;
    setPhase('preparing');
    timer.current = setTimeout(() => {
      setPhase('ready');
      setDownloaded(false);
    }, 1600);
  };

  const handleRetry = () => {
    setPhase('preparing');
    setDownloaded(false);
    timer.current = setTimeout(() => {
      setPhase('ready');
      setDownloaded(false);
    }, 1600);
  };

  const handleDownload = () => setDownloaded(true);
  const selecting = phase === 'select';
  const ctaDisabled = includedCount === 0;
  const allSelected = selectedCount === Math.min(availableCount, MAX_PDF) && availableCount > 0;
  const showUnpublished = demo === 'unpublished' || !published;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[rgba(22,35,62,0.4)]" onClick={handleClose} />
      {phase === 'preparing' && (
        <style>{`
          .pdf-ind-bar {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 30%;
            border-radius: 999px;
            background: #152E56;
            animation: pdfSlide 1.2s ease-in-out infinite;
          }
          @keyframes pdfSlide {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(440%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .pdf-ind-bar { animation: none; width: 30%; }
          }
        `}</style>
      )}

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-live="polite"
        className="relative w-[680px] max-h-[90vh] overflow-auto bg-white border border-[#DCE3F0] rounded-[12px] p-7"
      >
        {selecting && (
          <SelectPhase
            products={filtered}
            selected={selected}
            onToggle={toggle}
            onSelectAll={toggleSelectAll}
            allSelected={allSelected}
            availableCount={availableCount}
            capReached={capReached}
            ctaDisabled={ctaDisabled}
            onCancel={handleClose}
            onCreate={startCreate}
            showUnpublished={showUnpublished}
            search={search}
            onSearch={setSearch}
            cancelRef={cancelRef}
          />
        )}

        {phase === 'preparing' && (
          <div>
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
              Preparing your PDF
            </h2>
            <p className="mt-1 text-[13px] text-[#5D6C8A]">
              This takes a moment. Keep this open — there's no notification
              when it finishes.
            </p>
            <div className="mt-5 h-1 w-full bg-[#E4E9F4] rounded-[999px] overflow-hidden relative">
              <div className="pdf-ind-bar" />
            </div>
            <p className="mt-4 text-[13px] text-[#16233E] tabular-nums">
              {includedCount} {includedCount === 1 ? 'piece' : 'pieces'} from {catalogName}
            </p>
          </div>
        )}

        {phase === 'ready' && (
          <div>
            {dropped > 0 && (
              <div className="border-l-2 border-[#A8552A] pl-3 py-1">
                <p className="text-[13px] text-[#A8552A]">
                  {dropped} {dropped === 1 ? 'piece' : 'pieces'} couldn't be included, so{' '}
                  {shownIncluded} of the {selectedCount} you chose are in the document.
                </p>
              </div>
            )}
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
              Your PDF is ready
            </h2>
            <p className="mt-1 text-[13px] text-[#5D6C8A] tabular-nums">
              {shownIncluded} {shownIncluded === 1 ? 'piece' : 'pieces'} · 4.2 MB
            </p>
            <button
              onClick={handleDownload}
              className="mt-5 h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
            >
              <i className="ri-download-2-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
              {downloaded ? 'Download again' : 'Download PDF'}
            </button>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-[12px] text-[#5D6C8A]">
                This file stays available for a limited time.
              </p>
              <button
                onClick={handleClose}
                className="px-2 h-9 text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {phase === 'failed' && (
          <div>
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
              We couldn't make your PDF.
            </h2>
            <p className="mt-1 text-[13px] text-[#5D6C8A]">
              Nothing has changed and your selection is still here.
            </p>
            <div className="mt-5 flex items-center gap-4 justify-end">
              <button
                onClick={() => setPhase('select')}
                className="px-2 h-9 text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              >
                Back to selection
              </button>
              <button
                onClick={handleRetry}
                className="h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-1 bg-white border border-[#DCE3F0] rounded-full p-1">
        <span className="px-2 text-[13px] font-medium text-[#5D6C8A]">
          Dialog state
        </span>
        {demos.map((d) => (
          <button
            key={d}
            onClick={() => applyDemo(d)}
            className={`h-7 px-2 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
              demo === d ? 'bg-[#152E56] text-white' : 'text-[#5D6C8A] hover:bg-[#EDF1FA]'
            }`}
          >
            {demoLabel[d]}
          </button>
        ))}
      </div>
    </div>
  );
}

interface SelectPhaseProps {
  products: Product[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSelectAll: () => void;
  allSelected: boolean;
  availableCount: number;
  capReached: boolean;
  ctaDisabled: boolean;
  onCancel: () => void;
  onCreate: () => void;
  showUnpublished: boolean;
  search: string;
  onSearch: (v: string) => void;
  cancelRef: RefObject<HTMLButtonElement | null>;
}

function SelectPhase({
  products,
  selected,
  onToggle,
  onSelectAll,
  allSelected,
  availableCount,
  capReached,
  ctaDisabled,
  onCancel,
  onCreate,
  showUnpublished,
  search,
  onSearch,
  cancelRef,
}: SelectPhaseProps) {
  const selectedCount = selected.size;

  return (
    <div>
      <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
        Create a PDF
      </h2>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">
        Pick the pieces to include. The document carries your logo, brand name
        and contact details.
      </p>

      {showUnpublished && (
        <div className="mt-4 border-l-2 border-[#A8552A] pl-3 py-1">
          <p className="text-[13px] text-[#A8552A]">
            This catalog isn't published yet. Every piece in the document
            links back to your catalog, and those links won't work until you
            publish it.
          </p>
        </div>
      )}

      <div className="mt-5 relative">
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-[#5D6C8A] w-4 h-4 flex items-center justify-center" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search pieces"
          className="w-full h-9 pl-9 pr-3 text-[13px] bg-white border border-[#DCE3F0] rounded-full text-[#16233E] outline-none placeholder-[#5D6C8A] focus:border-[#152E56] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={onSelectAll}
          className="h-9 px-2 text-[13px] font-medium text-[#152E56] hover:text-[#172D54] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
        >
          {allSelected ? 'Clear all' : 'Select all available'}
        </button>
        <p className="text-[13px] font-medium text-[#16233E] tabular-nums">
          {selectedCount} of {availableCount} selected
        </p>
      </div>

      {capReached && (
        <p className="mt-1 text-right text-[13px] text-[#A8552A]">
          That's the most a PDF can hold. Deselect one to choose another.
        </p>
      )}

      <div className="mt-3 border border-[#DCE3F0] rounded-[12px] overflow-hidden max-h-[360px] overflow-y-auto">
        {products.length === 0 ? (
          <p className="p-4 text-[13px] text-[#5D6C8A]">No pieces match your search.</p>
        ) : (
          products.map((p) => {
            const r = includeReason(p);
            const reason = r === 'ok' ? null : reasonText[r];
            const disabled = capReached && !selected.has(p.id);
            const isChecked = selected.has(p.id);
            const dimmed = reason !== null || disabled;
            return (
              <div
                key={p.id}
                className={`flex items-center gap-3 px-3 h-16 border-b border-[#DCE3F0] last:border-b-0 ${
                  dimmed ? 'opacity-60' : ''
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={disabled}
                    onChange={() => onToggle(p.id)}
                    aria-label={`Select ${p.category}`}
                    className="w-[18px] h-[18px] rounded-[6px] border-[#DCE3F0] text-[#152E56] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
                  />
                </label>
                {p.image ? (
                  <img
                    src={p.image}
                    alt=""
                    className="w-12 h-12 rounded-[8px] object-cover object-top bg-[#E4E9F4] shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-[8px] bg-[#E4E9F4] shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-[#16233E] truncate">
                    {p.category}
                  </p>
                  <p className="text-[12px] text-[#5D6C8A] truncate">
                    {p.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  {reason ? (
                    <span className="text-[12px] text-[#5D6C8A] whitespace-nowrap">
                      {reason}
                    </span>
                  ) : (
                    <span className="text-[13px] text-[#16233E] tabular-nums">
                      {formatPrice(p.price)}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-5 flex flex-col items-end gap-1">
        <div className="flex items-center gap-4 w-full justify-end">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="px-2 h-9 text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            disabled={ctaDisabled}
            className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
              ctaDisabled
                ? 'bg-[#EDF1FA] border-[#DCE3F0] text-[#5D6C8A]'
                : 'bg-[#152E56] border-[#152E56] text-white hover:bg-[#172D54]'
            }`}
          >
            Create PDF
          </button>
        </div>
        {ctaDisabled && (
          <p className="text-[13px] text-[#5D6C8A]">
            Choose at least one piece to continue.
          </p>
        )}
      </div>
    </div>
  );
}