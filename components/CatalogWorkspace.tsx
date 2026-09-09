'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import FilterBar, { type Filters, emptyFilters } from './FilterBar';
import ProductTable, { type Product } from './ProductTable';
import ProductGrid from './ProductGrid';
import AddProductDialog from './AddProductDialog';
import CreatePdfDialog from './CreatePdfDialog';
import ProductSelectionBar from './ProductSelectionBar';
import DeleteDialog from './DeleteDialog';
import CatalogPublishControl from './catalog-publication/CatalogPublishControl';
import { defaultPublication, type PublicationState } from './catalog-publication/types';
import StateSwitcherPanel from './ui/StateSwitcherPanel';

export type WorkspaceState = 'default' | 'loading' | 'empty' | 'filtered' | 'error';

const products: Product[] = [
  {
    id: '1',
    category: 'Ring',
    description: 'Solitaire, six-prong setting',
    renderStatus: 'complete',
    price: 1240,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20solitaire%20engagement%20ring%20with%20a%20six-prong%20setting%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=11&orientation=squarish',
  },
  {
    id: '2',
    category: 'Ring',
    description: 'Halo cluster, round center stone',
    renderStatus: 'complete',
    price: 2180,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20halo%20cluster%20ring%20with%20a%20round%20center%20diamond%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=12&orientation=squarish',
  },
  {
    id: '3',
    category: 'Pendant',
    description: 'Teardrop with pavé bail',
    renderStatus: 'complete',
    price: null,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20teardrop%20pendant%20with%20a%20pav%C3%A9%20bail%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=13&orientation=squarish',
  },
  {
    id: '4',
    category: 'Necklace',
    description: 'Fine chain with solitaire drop',
    renderStatus: 'generating',
    price: null,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20fine%20gold%20chain%20necklace%20with%20a%20solitaire%20diamond%20drop%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=14&orientation=squarish',
  },
  {
    id: '5',
    category: 'Earring',
    description: 'Stud pair, four-prong',
    renderStatus: 'flagged',
    price: 760,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20gold%20stud%20earrings%20with%20four-prong%20settings%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=15&orientation=squarish',
  },
  {
    id: '6',
    category: 'Bracelet',
    description: 'Tennis, channel set',
    renderStatus: 'complete',
    price: 3950,
    active: false,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20tennis%20bracelet%20with%20channel-set%20diamonds%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=16&orientation=squarish',
  },
  {
    id: '7',
    category: 'Ring',
    description: 'Eternity band, full',
    renderStatus: 'complete',
    price: 1890,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20full%20eternity%20band%20ring%20with%20diamonds%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=17&orientation=squarish',
  },
  {
    id: '8',
    category: 'Brooch',
    description: 'Floral spray, mixed stones',
    renderStatus: 'complete',
    price: null,
    active: true,
    image:
      'https://readdy.ai/api/search-image?query=Professional%20product%20photograph%20of%20a%20gold%20floral%20spray%20brooch%20with%20mixed%20colored%20stones%20on%20a%20plain%20pale%20off-white%20studio%20background%2C%20soft%20even%20lighting%2C%20minimalist%20luxury%20jewelry%20product%20shot%2C%20crisp%20focus%2C%20clean%20composition&width=112&height=112&seq=18&orientation=squarish',
  },
];

const states: WorkspaceState[] = ['default', 'loading', 'empty', 'filtered', 'error'];
const stateLabel: Record<string, string> = {
  default: 'Default',
  loading: 'Loading',
  empty: 'Empty',
  filtered: 'No match',
  error: 'Error',
};

const loadingRow = (
  <div className="grid grid-cols-[56px_1fr_120px_120px_160px_40px] items-center gap-4 px-4 py-3 border-b border-[#DCE3F0] last:border-b-0">
    <div className="w-14 h-14 rounded-full bg-[#E4E9F4]" />
    <div className="space-y-2">
      <div className="h-3.5 w-1/3 rounded-full bg-[#E4E9F4]" />
      <div className="h-3 w-2/3 rounded-full bg-[#E4E9F4]" />
    </div>
    <div className="h-3 w-12 rounded-full bg-[#E4E9F4]" />
    <div className="ml-auto h-3 w-14 rounded-full bg-[#E4E9F4]" />
    <div className="h-3 w-16 rounded-full bg-[#E4E9F4]" />
  </div>
);

export default function CatalogWorkspace({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const [state, setState] = useState<WorkspaceState>(id === 'new-catalog' ? 'empty' : 'default');
  const [pubState, setPubState] = useState<PublicationState>(id === 'new-catalog' ? 'not-published' : 'published');
  const [everPublished, setEverPublished] = useState(id !== 'new-catalog');
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Product[]>(id === 'new-catalog' ? [] : products);
  const [addOpen, setAddOpen] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const [pdfOpen, setPdfOpen] = useState(false);
  const pdfButtonRef = useRef<HTMLButtonElement>(null);
  const catalogId = id;
  const isNew = id === 'new-catalog';
  const catalogName = isNew
    ? searchParams.get('name')?.trim() || 'New catalog'
    : 'Bridal 2026';

  const renderProgress = useMemo(() => {
    const total = data.length;
    const complete = data.filter((p) => p.renderStatus === 'complete').length;
    const generating = data.filter((p) => p.renderStatus === 'generating').length;
    const flagged = data.filter((p) => p.renderStatus === 'flagged').length;
    return { total, complete, generating, flagged };
  }, [data]);
  const renderWidth = renderProgress.total
    ? (renderProgress.complete / renderProgress.total) * 100
    : 0;

  const publishCounts = useMemo(() => {
    const servable = data.filter((p) => p.renderStatus === 'complete' && p.active).length;
    const generating = data.filter((p) => p.renderStatus === 'generating' || p.renderStatus === 'pending').length;
    const flagged = data.filter((p) => p.renderStatus === 'flagged').length;
    const inactive = data.filter((p) => !p.active).length;
    return { servable, generating, flagged, inactive };
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.status === 'Active' && !p.active) return false;
      if (filters.status === 'Inactive' && p.active) return false;
      if (filters.renderState && p.renderStatus.toLowerCase() !== filters.renderState.toLowerCase())
        return false;
      if (
        q &&
        !p.category.toLowerCase().includes(q) &&
        !p.description.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [data, filters, search]);

  const filtersApplied =
    filters.category !== null ||
    filters.status !== null ||
    filters.renderState !== null;

  const searchActive = search.trim() !== '';
  const filterNoMatch =
    state === 'default' && !searchActive && filtersApplied && filtered.length === 0;
  const searchNoMatch =
    state === 'default' && searchActive && filtered.length === 0;

  const handleToggle = (id: string, active: boolean) => {
    setData((d) => d.map((p) => (p.id === id ? { ...p, active } : p)));
  };

  const handleAddProduct = (p: Product) => {
    setData((d) => [{ ...p }, ...d]);
  };

  const allSelected =
    selectMode &&
    filtered.length > 0 &&
    filtered.every((p) => selectedIds.has(p.id));

  const toggleSelectMode = () => {
    if (selectMode) {
      setSelectedIds(new Set());
      setSelectMode(false);
    } else {
      setSelectMode(true);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        filtered.forEach((p) => next.delete(p.id));
      } else {
        filtered.forEach((p) => next.add(p.id));
      }
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const handleDeleteSelected = () => {
    setData((d) => d.filter((p) => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
    setBulkDeleteOpen(false);
  };

  const naturalPub: PublicationState = id === 'new-catalog' ? 'not-published' : 'published';
  const publication = {
    ...defaultPublication(pubState === 'published', publishCounts),
    firstPublish: !everPublished,
  };

  const pubPreviewStates: PublicationState[] = ['not-published', 'published', 'publishing', 'deleting'];
  const pubPreviewLabel: Record<string, string> = {
    'not-published': 'Not published',
    published: 'Published',
    publishing: 'Publishing',
    deleting: 'Deleting',
  };

  const applyPubState = (s: PublicationState) => {
    setPubState(s);
    setState('default');
  };
  const applyWorkspaceState = (s: WorkspaceState) => {
    setState(s);
    setPubState(naturalPub);
  };

  return (
    <main className="min-h-screen bg-[#EDF1FA] pt-8 pb-16">
      <div className="max-w-[1180px] mx-auto px-8">
        <nav className="text-[13px] text-[#5D6C8A]">
          <Link href="/" className="hover:text-[#16233E] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]">
            Catalogs
          </Link>
          <span className="mx-1">/</span>
          <span className="text-[#16233E]">{catalogName}</span>
        </nav>

        <div className="mt-4 flex items-start justify-between">
          <div>
            <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#16233E]">
              {catalogName}
            </h1>
            <p className="mt-1 text-[13px] text-[#5D6C8A] tabular-nums">
              {data.length} products ·{' '}
              {pubState === 'published' ? 'Published' : 'Not published'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CatalogPublishControl
              catalogName={catalogName}
              data={publication}
              pubState={pubState}
              onChangePubState={(s) => {
                setPubState(s);
                if (s === 'published') setEverPublished(true);
              }}
            />
            <Link
              href={`/catalog/${catalogId}/settings`}
              className="h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
            >
              Catalog settings
            </Link>
            <button
              ref={pdfButtonRef}
              onClick={() => setPdfOpen(true)}
              className="h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
            >
              Create PDF
            </button>
            <button
              ref={addButtonRef}
              onClick={() => setAddOpen(true)}
              className="h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
            >
              Add product
            </button>
          </div>
        </div>

        {data.length > 0 && (
          <div
            className="mt-4 bg-white border border-[#DCE3F0] rounded-[12px] p-4"
            aria-live="polite"
          >
            <div className="flex items-center justify-between gap-6">
              <p className="text-[16px] font-semibold tracking-[-0.02em] text-[#16233E]">
                Render progress
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-6 tabular-nums text-[15px] font-medium">
                  <span className="text-[#3D6B54]">
                    {renderProgress.complete} of {renderProgress.total} complete
                  </span>
                  <span className="text-[#5D6C8A]">
                    {renderProgress.generating} generating
                  </span>
                  <Link
                    href={`/catalog/${catalogId}/render-status?state=flagged`}
                    className="text-[#A8552A] hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
                  >
                    {renderProgress.flagged} flagged
                  </Link>
                </div>
                <Link
                  href={`/catalog/${catalogId}/render-status`}
                  className="h-9 px-4 text-sm font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
                >
                  <i className="ri-loader-4-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                  Render status
                </Link>
              </div>
            </div>
            <div className="mt-3 h-1 w-full bg-[#E4E9F4] rounded-[999px] overflow-hidden">
              <div
                className="h-full bg-[#152E56] rounded-[999px]"
                style={{ width: `${renderWidth}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-[#5D6C8A] w-4 h-4 flex items-center justify-center" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              className="w-[240px] h-9 pl-9 pr-3 text-[13px] bg-white border border-[#DCE3F0] rounded-full text-[#16233E] outline-none placeholder-[#5D6C8A] focus:border-[#152E56] focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
            />
          </div>
          <FilterBar filters={filters} onChange={setFilters} />
          </div>
          <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSelectMode}
            aria-pressed={selectMode}
            className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
              selectMode
                ? 'bg-[#152E56] text-white border-[#152E56] hover:bg-[#172D54]'
                : 'text-[#16233E] bg-white border-[#DCE3F0] hover:bg-[#EDF1FA]'
            }`}
          >
            <i className="ri-checkbox-multiple-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
            Select
          </button>
          <div className="flex items-center gap-1 bg-white border border-[#DCE3F0] rounded-full p-1">
            <button
              type="button"
              onClick={() => setView('table')}
              aria-label="List view"
              aria-pressed={view === 'table'}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
                view === 'table'
                  ? 'bg-[#152E56] text-white'
                  : 'text-[#5D6C8A] hover:bg-[#EDF1FA]'
              }`}
            >
              <i className="ri-list-check text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
            </button>
            <button
              type="button"
              onClick={() => setView('grid')}
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
                view === 'grid'
                  ? 'bg-[#152E56] text-white'
                  : 'text-[#5D6C8A] hover:bg-[#EDF1FA]'
              }`}
            >
              <i className="ri-layout-grid-fill text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
            </button>
          </div>
          </div>
        </div>

        {selectMode && (
          <ProductSelectionBar
            selectedCount={selectedIds.size}
            onClear={clearSelection}
            onDone={toggleSelectMode}
            onGeneratePdf={() => setPdfOpen(true)}
            onDelete={() => setBulkDeleteOpen(true)}
          />
        )}

        <div className="mt-4">
          {state === 'loading' && (
            <div className="bg-white border border-[#DCE3F0] rounded-[12px] overflow-hidden">
              <div className="grid grid-cols-[56px_1fr_120px_120px_160px_40px] items-center gap-4 px-4 h-11 border-b border-[#DCE3F0]">
                <span />
                <span className="text-[13px] font-medium text-[#5D6C8A]">Product</span>
                <span className="text-[13px] font-medium text-[#5D6C8A]">Renders</span>
                <span className="text-right text-[13px] font-medium text-[#5D6C8A]">Price</span>
                <span className="text-[13px] font-medium text-[#5D6C8A]">Status</span>
                <span />
              </div>
              {loadingRow}
              {loadingRow}
              {loadingRow}
              {loadingRow}
              {loadingRow}
              {loadingRow}
            </div>
          )}

          {state === 'empty' && (
            <div className="flex flex-col items-center justify-center text-center min-h-[320px]">
              <p className="text-[13px] text-[#16233E] max-w-[380px]">
                This catalog is empty. Add your first product with three
                photographs of the piece.
              </p>
              <button
                onClick={() => setAddOpen(true)}
                className="mt-4 h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              >
                Add product
              </button>
            </div>
          )}

          {state === 'filtered' && (
            <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
              <p className="text-[13px] text-[#16233E]">
                No products match these filters.
              </p>
              <button
                onClick={() => setFilters(emptyFilters)}
                className="h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              >
                Clear filters
              </button>
            </div>
          )}

          {state === 'error' && (
            <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
              <p className="text-[13px] text-[#16233E]">
                We couldn't load these products.
              </p>
              <button
                onClick={() => setState('default')}
                className="h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              >
                Try again
              </button>
            </div>
          )}

          {filterNoMatch && (
            <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
              <p className="text-[13px] text-[#16233E]">
                No products match these filters.
              </p>
              <button
                onClick={() => setFilters(emptyFilters)}
                className="h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              >
                Clear filters
              </button>
            </div>
          )}

          {searchNoMatch && (
            <div className="flex flex-col items-center justify-center text-center min-h-[320px] space-y-4">
              <p className="text-[13px] text-[#16233E]">
                No products match your search.
              </p>
              <button
                onClick={() => setSearch('')}
                className="h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              >
                Clear search
              </button>
            </div>
          )}

          {state === 'default' &&
            !filterNoMatch &&
            !searchNoMatch &&
            (view === 'table' ? (
              <ProductTable
                products={filtered}
                onToggle={handleToggle}
                selectMode={selectMode}
                selectedIds={selectedIds}
                onSelect={toggleSelect}
                onSelectAll={toggleSelectAll}
                allSelected={allSelected}
              />
            ) : (
              <ProductGrid
                products={filtered}
                onToggle={handleToggle}
                selectMode={selectMode}
                selectedIds={selectedIds}
                onSelect={toggleSelect}
              />
            ))}
        </div>
      </div>

      <StateSwitcherPanel
        title="Preview state"
        icon="ri-layout-3-line"
        hint="Switch how the catalog workspace looks"
        groups={[
          { label: 'Workspace', options: states.map((s) => ({ value: s, label: stateLabel[s] })) },
          { label: 'Publication', options: pubPreviewStates.map((s) => ({ value: s, label: pubPreviewLabel[s] })) },
        ]}
        active={(v) => state === v || pubState === v}
        onSelect={(v) =>
          states.includes(v as WorkspaceState)
            ? applyWorkspaceState(v as WorkspaceState)
            : applyPubState(v as PublicationState)
        }
      />
      <AddProductDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        openButtonRef={addButtonRef}
        onAddProduct={handleAddProduct}
      />
      <CreatePdfDialog
        open={pdfOpen}
        onClose={() => setPdfOpen(false)}
        openButtonRef={pdfButtonRef}
        products={data}
        catalogName={catalogName}
        published={pubState === 'published'}
        initialSelection={Array.from(selectedIds)}
      />
      <DeleteDialog
        open={bulkDeleteOpen && selectedIds.size > 0}
        onCancel={() => setBulkDeleteOpen(false)}
        onConfirm={handleDeleteSelected}
        count={selectedIds.size}
      />
    </main>
  );
}