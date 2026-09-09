'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CUSTOMER_FOCUS_RING,
  initials,
  type KindConfig,
  type RecordItem,
} from './data';

export type ListMode = 'data' | 'loading' | 'error';

interface Props {
  config: KindConfig;
  records: RecordItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCollapse: () => void;
  onAdd: () => void;
  mode: ListMode;
  onResetError: () => void;
}

function LoadingRows() {
  const bar = (
    <div className="flex items-center gap-3 px-3 py-4 border-b border-[#DCE3F0] last:border-b-0">
      <div className="w-9 h-9 rounded-full bg-[#E4E9F4]" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-28 rounded-full bg-[#E4E9F4]" />
        <div className="h-3 w-20 rounded-full bg-[#E4E9F4]" />
      </div>
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

function Empty({ text, addLabel, onAdd }: { text: string; addLabel: string; onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[240px] gap-4 px-6">
      <p className="text-[13px] text-[#16233E] max-w-[280px]">{text}</p>
      <button
        type="button"
        onClick={onAdd}
        className={`h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
      >
        {addLabel}
      </button>
    </div>
  );
}

function Row({
  r,
  config,
  selected,
  onSelect,
}: {
  r: RecordItem;
  config: KindConfig;
  selected: boolean;
  onSelect: () => void;
}) {
  const inactive = config.kind === 'manufacturer' && r.active === false;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full text-left relative flex items-center gap-3 px-3 border-b border-[#DCE3F0] last:border-b-0 transition-colors duration-150 ${CUSTOMER_FOCUS_RING} ${
        selected ? 'bg-[#EDF1FA]' : 'hover:bg-[#F3F6FC]'
      } ${inactive ? 'opacity-[0.6]' : ''}`}
      style={{ minHeight: 64 }}
    >
      {selected && (
        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#152E56]" />
      )}
      <span className="w-9 h-9 rounded-full bg-[#E4E9F4] text-[#5D6C8A] flex items-center justify-center text-[13px] font-medium shrink-0">
        {initials(r.name)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-[#16233E] truncate">{r.name}</p>
        <p className="text-[12px] text-[#5D6C8A] truncate">
          {config.kind === 'customer' && (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#3D6B54] mr-1.5 align-middle" />
          )}
          {r.email}
        </p>
        {config.kind === 'manufacturer' && r.specialty && (
          <span className="inline-flex mt-1 h-5 px-2 rounded-full bg-[#F5EFE5] text-[#A8552A] text-[11px] font-medium items-center whitespace-nowrap">
            {r.specialty}
          </span>
        )}
        {inactive && (
          <p className="text-[11px] font-medium text-[#5D6C8A]">Inactive</p>
        )}
      </div>
    </button>
  );
}

export default function RecordListPanel({
  config,
  records,
  selectedId,
  onSelect,
  onCollapse,
  onAdd,
  mode,
  onResetError,
}: Props) {
  const [chip, setChip] = useState('all');
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(50);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const total = records.length;

  const visible = useMemo(() => {
    let list = records;
    if (config.hasChips && chip !== 'all') {
      const active = chip === 'active';
      list = list.filter((r) => (r.active ?? true) === active);
    }
    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(s) ||
          r.email.toLowerCase().includes(s)
      );
    }
    return list;
  }, [records, chip, q, config]);

  useEffect(() => {
    setLimit(50);
  }, [chip, q]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setLimit((l) => l + 50);
      },
      { rootMargin: '80px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [visible.length > limit]);

  const searchEmpty = q.trim() && visible.length === 0;

  return (
    <div className="flex flex-col min-h-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-medium text-[#16233E]">{config.heading}</h2>
          <span className="text-[13px] text-[#5D6C8A] tabular-nums">{total}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onAdd}
            aria-label={config.addLabel}
            className={`w-7 h-7 rounded-full bg-[#152E56] text-white flex items-center justify-center hover:bg-[#172D54] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
          >
            <i className="ri-add-line text-[18px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
          </button>
          <button
            type="button"
            onClick={onCollapse}
            aria-label="Collapse list"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
          >
            <i className="ri-arrow-left-s-line text-[18px] w-5 h-5 flex items-center justify-center" />
          </button>
        </div>
      </div>

      <div className="relative mt-4">
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[16px] w-4 h-4 flex items-center justify-center text-[#5D6C8A]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={config.searchPlaceholder}
          className={`w-full h-9 pl-9 pr-3 text-[13px] text-[#16233E] bg-white border border-[#DCE3F0] rounded-full outline-none placeholder:text-[#5D6C8A] ${CUSTOMER_FOCUS_RING}`}
        />
      </div>

      {config.hasChips && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
          {config.chips.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={chip === c.id}
              onClick={() => setChip(c.id)}
              className={`h-7 px-3 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors duration-150 ${CUSTOMER_FOCUS_RING} ${
                chip === c.id
                  ? 'bg-[#152E56] text-white'
                  : 'bg-white border border-[#DCE3F0] text-[#5D6C8A] hover:text-[#16233E] hover:bg-[#F3F6FC]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex-1 min-h-0 overflow-y-auto border border-[#DCE3F0] rounded-[12px] bg-white">
        {mode === 'loading' && <LoadingRows />}
        {mode === 'error' && (
          <div className="flex flex-col items-center justify-center text-center min-h-[240px] px-4 gap-4">
            <p className="text-[13px] text-[#16233E]">
              We couldn't load your records.
            </p>
            <button
              type="button"
              onClick={onResetError}
              className={`h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap ${CUSTOMER_FOCUS_RING}`}
            >
              Try again
            </button>
          </div>
        )}
        {mode === 'data' &&
          (searchEmpty ? (
            <div className="flex flex-col items-center justify-center text-center min-h-[240px] gap-3">
              <p className="text-[13px] text-[#16233E]">Nothing matches that.</p>
              <button
                type="button"
                onClick={() => setQ('')}
                className={`text-[13px] font-medium text-[#152E56] hover:text-[#172D54] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
              >
                Clear search
              </button>
            </div>
          ) : visible.length === 0 ? (
            <Empty text={config.emptyText} addLabel={config.addLabel} onAdd={onAdd} />
          ) : (
            <>
              {visible.slice(0, limit).map((r) => (
                <Row
                  key={r.id}
                  r={r}
                  config={config}
                  selected={r.id === selectedId}
                  onSelect={() => onSelect(r.id)}
                />
              ))}
              {visible.length > limit && <div ref={sentinelRef} className="h-px" />}
            </>
          ))}
      </div>
    </div>
  );
}