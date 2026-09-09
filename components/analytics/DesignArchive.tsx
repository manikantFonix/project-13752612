'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import ArchiveTable from './ArchiveTable';
import ErrorBlock from './ErrorBlock';
import { SkeletonTable } from './SkeletonStat';
import { focusRing, type DesignRow, type SectionMode } from './data';

const PAGE_SIZE = 50;

export default function DesignArchive({
  mode,
  rows,
  empty,
  noMatch,
}: {
  mode: SectionMode;
  rows: DesignRow[];
  empty: boolean;
  noMatch: boolean;
}) {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sentinel = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (d) =>
        d.number.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        (d.customer ?? '').toLowerCase().includes(q)
    );
  }, [rows, query]);

  const showNoMatch = noMatch || (query.trim() !== '' && filtered.length === 0);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query]);

  useEffect(() => {
    if (mode !== 'ready') return;
    const node = sentinel.current;
    if (!node) return;
    if (filtered.length <= visible) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible((v) => v + PAGE_SIZE);
      },
      { rootMargin: '400px 0px' }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [filtered.length, visible, mode]);

  const clearSearch = () => setQuery('');

  return (
    <section>
      <h2 className="text-[20px] font-semibold text-[#16233E]">Design archive</h2>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">
        Every design you've made and what happened to it. Everything, not just this period.
      </p>

      {mode === 'loading' ? (
        <div className="mt-4">
          <SkeletonTable rows={5} />
        </div>
      ) : mode === 'error' ? (
        <div className="mt-4">
          <ErrorBlock />
        </div>
      ) : empty ? (
        <p className="mt-4 text-[13px] text-[#5D6C8A]">No designs yet.</p>
      ) : (
        <>
          <div className="mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by design number, customer or description"
              aria-label="Search the design archive"
              className={`h-9 w-[280px] px-3 rounded-full bg-white border border-[#DCE3F0] text-[13px] text-[#16233E] placeholder:text-[#748AB4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] transition-colors duration-150`}
            />
          </div>

          {showNoMatch ? (
            <div className="mt-4 flex items-center gap-3">
              <p className="text-[13px] text-[#5D6C8A]">No designs match that.</p>
              <button
                type="button"
                onClick={clearSearch}
                className={`h-9 px-3 text-[13px] font-medium text-[#152E56] hover:bg-[#F3F6FC] rounded-full transition-colors duration-150 whitespace-nowrap ${focusRing}`}
              >
                Clear search
              </button>
            </div>
          ) : (
            <>
              <div className="mt-4">
                <ArchiveTable rows={filtered.slice(0, visible)} />
              </div>
              {filtered.length > visible && (
                <div ref={sentinel} aria-hidden="true" className="h-px" />
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}