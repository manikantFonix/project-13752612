'use client';

import { useMemo, useState } from 'react';
import { FOCUS_RING, statusLabel, requests, type Request, type Status } from './data';
import RequestDeleteDialog from './RequestDeleteDialog';

export type ListMode = 'data' | 'loading' | 'error';

type Chip = 'all' | Status | 'cancelled' | 'archived';

const CHIPS: { id: Chip; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'draft', label: 'Draft' },
  { id: 'ready', label: 'Ready' },
  { id: 'sent', label: 'Sent to Customer' },
  { id: 'approved', label: 'Approved' },
  { id: 'manufacturer', label: 'Sent to Manufacturer' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
  { id: 'archived', label: 'Archived' },
];

const EMPTY: Record<Chip, string> = {
  all: 'No requests yet. Generate a design from the dashboard to start one.',
  draft: 'No drafts.',
  ready: 'Nothing ready to send. A request is ready once it has a customer.',
  sent: 'Nothing waiting on a customer.',
  approved: 'No approved designs waiting to be routed.',
  manufacturer: 'Nothing with a manufacturer.',
  completed: 'Nothing completed yet.',
  cancelled: 'No cancelled requests.',
  archived: 'Nothing archived. Use the ⋯ menu on a request to archive it.',
};

interface Props {
  mode: ListMode;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCollapse: () => void;
}

function statusPill(r: Request) {
  const label = r.cancelled ? 'Cancelled' : statusLabel[r.status];
  const green = r.status === 'approved' || r.status === 'completed';
  return (
    <span
      className={`inline-flex h-5 items-center px-2 rounded-full text-[11px] font-medium whitespace-nowrap ${
        green ? 'bg-[#E8F1EC] text-[#3D6B54]' : 'bg-[#F3F6FC] text-[#5D6C8A]'
      }`}
    >
      {label}
    </span>
  );
}

function Row({
  r,
  faded,
  selected,
  archived,
  menuOpen,
  onSelect,
  onToggleMenu,
  onArchive,
  onDelete,
}: {
  r: Request;
  faded: boolean;
  selected: boolean;
  archived: boolean;
  menuOpen: boolean;
  onSelect: () => void;
  onToggleMenu: () => void;
  onArchive: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className="relative border-b border-[#DCE3F0] last:border-b-0"
      style={{ minHeight: 76 }}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={`w-full text-left flex items-center gap-3 pl-3 pr-12 transition-colors duration-150 ${FOCUS_RING} ${
          selected ? 'bg-[#EDF1FA]' : 'hover:bg-[#F3F6FC]'
        } ${faded ? 'opacity-[0.55]' : ''}`}
        style={{ minHeight: 76 }}
      >
        {selected && (
          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#152E56]" />
        )}
        <img
          src={r.views.front ?? undefined}
          alt={r.category}
          className="w-11 h-11 rounded-[8px] object-cover bg-[#E4E9F4] shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-[#16233E]">{r.designNo}</p>
          <p className="text-[12px] text-[#5D6C8A]">{r.category}</p>
          <div className="mt-1 flex items-center gap-2">
            {statusPill(r)}
            {r.status === 'draft' && r.rejected && (
              <span className="text-[11px] font-medium text-[#A8552A]">
                Customer rejected
              </span>
            )}
          </div>
        </div>
        <span className="text-[11px] text-[#5D6C8A] tabular-nums shrink-0">
          {r.cancelled ? r.cancelLabel : r.updatedLabel}
        </span>
      </button>

      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <div className="relative">
          <button
            type="button"
            onClick={onToggleMenu}
            aria-label="More options"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-150 ${FOCUS_RING} ${
              menuOpen
                ? 'bg-[#EDF1FA] text-[#16233E]'
                : 'text-[#5D6C8A] hover:bg-[#EDF1FA] hover:text-[#16233E]'
            }`}
          >
            <i className="ri-more-2-line text-[18px] w-5 h-5 flex items-center justify-center" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={onToggleMenu} />
              <div
                role="menu"
                className="absolute right-0 top-full mt-1 z-50 w-44 bg-white border border-[#DCE3F0] rounded-[12px] p-1"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={onArchive}
                  className={`w-full flex items-center gap-2 px-2.5 h-9 rounded-[8px] text-[13px] font-medium text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
                >
                  <i className="ri-archive-line text-[16px] w-4 h-4 flex items-center justify-center" />
                  {archived ? 'Restore request' : 'Archive request'}
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={onDelete}
                  className={`w-full flex items-center gap-2 px-2.5 h-9 rounded-[8px] text-[13px] font-medium text-[#A8552A] hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
                >
                  <i className="ri-delete-bin-6-line text-[16px] w-4 h-4 flex items-center justify-center" />
                  Delete request
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingRows() {
  const bar = (
    <div className="flex items-center gap-3 px-3 py-4 border-b border-[#DCE3F0] last:border-b-0">
      <div className="w-11 h-11 rounded-[8px] bg-[#E4E9F4]" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-24 rounded-full bg-[#E4E9F4]" />
        <div className="h-3 w-16 rounded-full bg-[#E4E9F4]" />
        <div className="h-4 w-20 rounded-full bg-[#E4E9F4]" />
      </div>
      <div className="h-3 w-14 rounded-full bg-[#E4E9F4]" />
    </div>
  );
  return (
    <div className="border border-[#DCE3F0] rounded-[12px] overflow-hidden">
      {bar}
      {bar}
      {bar}
      {bar}
      {bar}
      {bar}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center text-center min-h-[200px]">
      <p className="text-[13px] text-[#16233E] max-w-[280px]">{text}</p>
    </div>
  );
}

export default function RequestListPanel({ mode, selectedId, onSelect, onCollapse }: Props) {
  const [chip, setChip] = useState<Chip>('all');
  const [q, setQ] = useState('');
  const [rows, setRows] = useState<Request[]>(requests);
  const [archivedIds, setArchivedIds] = useState<Set<string>>(new Set());
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Request | null>(null);

  const visible = useMemo(() => {
    let list = rows;

    if (chip === 'cancelled') {
      list = list.filter((r) => r.cancelled);
    } else if (chip === 'archived') {
      list = list.filter((r) => archivedIds.has(r.id));
    } else {
      list = list.filter((r) => !r.cancelled && !archivedIds.has(r.id));
      if (chip === 'all') list = list.filter((r) => r.status !== 'completed');
      else list = list.filter((r) => r.status === chip);
    }

    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.designNo.toLowerCase().includes(s) ||
          r.category.toLowerCase().includes(s) ||
          (r.customer?.name.toLowerCase().includes(s) ?? false)
      );
    }

    if (chip === 'all') {
      const active = list.filter((r) => r.status !== 'completed');
      const completed = list.filter((r) => r.status === 'completed');
      return [...active, ...completed];
    }
    return list;
  }, [chip, q, rows, archivedIds]);

  const searchEmpty = q.trim() && visible.length === 0;

  const toggleArchive = (id: string) => {
    setArchivedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setMenuOpenId(null);
  };

  const openDelete = (r: Request) => {
    setMenuOpenId(null);
    setDeleteTarget(r);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setRows((prev) => prev.filter((x) => x.id !== deleteTarget.id));
    }
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-medium text-[#16233E]">All requests</h2>
        <button
          type="button"
          onClick={onCollapse}
          aria-label="Collapse request list"
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 ${FOCUS_RING}`}
        >
          <i className="ri-arrow-left-s-line text-[18px] w-5 h-5 flex items-center justify-center" />
        </button>
      </div>

      <div className="relative mt-4">
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[16px] w-4 h-4 flex items-center justify-center text-[#5D6C8A]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search requests"
          className={`w-full h-9 pl-9 pr-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-full outline-none placeholder:text-[#5D6C8A] ${FOCUS_RING}`}
        />
      </div>

      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-webkit-scrollbar:none] [&::-webkit-scrollbar]:hidden">
        {CHIPS.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={chip === c.id}
            onClick={() => setChip(c.id)}
            className={`h-7 px-3 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 ${FOCUS_RING} ${
              chip === c.id
                ? 'bg-[#152E56] text-white'
                : 'bg-white border border-[#DCE3F0] text-[#5D6C8A] hover:text-[#16233E] hover:bg-[#F3F6FC]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex-1 min-h-0 overflow-y-auto [scrollbar-width:none] [-webkit-scrollbar:none] [&::-webkit-scrollbar]:hidden border border-[#DCE3F0] rounded-[12px] bg-white">
        {mode === 'loading' && <LoadingRows />}
        {mode === 'error' && (
          <div className="flex flex-col items-center justify-center text-center min-h-[200px] px-4 gap-4">
            <p className="text-[13px] text-[#16233E]">
              We couldn't load your requests.
            </p>
            <button
              type="button"
              className={`h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
            >
              Try again
            </button>
          </div>
        )}
        {mode === 'data' &&
          (searchEmpty ? (
            <div className="flex flex-col items-center justify-center text-center min-h-[200px] gap-3">
              <p className="text-[13px] text-[#16233E]">No requests match that.</p>
              <button
                type="button"
                onClick={() => setQ('')}
                className={`text-[13px] font-medium text-[#152E56] hover:text-[#172D54] transition-colors duration-150 ${FOCUS_RING}`}
              >
                Clear search
              </button>
            </div>
          ) : visible.length === 0 ? (
            <Empty text={EMPTY[chip]} />
          ) : (
            visible.map((r) => (
              <Row
                key={r.id}
                r={r}
                faded={
                  (chip === 'all' && r.status === 'completed') ||
                  chip === 'archived'
                }
                selected={r.id === selectedId}
                archived={archivedIds.has(r.id)}
                menuOpen={menuOpenId === r.id}
                onSelect={() => {
                  setMenuOpenId(null);
                  onSelect(r.id);
                }}
                onToggleMenu={() =>
                  setMenuOpenId((prev) => (prev === r.id ? null : r.id))
                }
                onArchive={() => toggleArchive(r.id)}
                onDelete={() => openDelete(r)}
              />
            ))
          ))}
      </div>

      <RequestDeleteDialog
        open={!!deleteTarget}
        request={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}