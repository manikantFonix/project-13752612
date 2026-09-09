'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSelection } from './SelectionProvider';
import {
  resolveCatalog,
  servableProducts,
  type RetailerBranding,
} from './data';

export default function SelectionBar({
  token,
  brand,
  scenario = 'default',
}: {
  token: string;
  brand: RetailerBranding;
  scenario?: string;
}) {
  const { selected, clear, removeMany } = useSelection();
  const [droppedMsg, setDroppedMsg] = useState<string | null>(null);

  const catalog = resolveCatalog(token);
  const servable = useMemo(
    () => (catalog ? servableProducts(catalog) : []),
    [catalog],
  );
  const servableIds = useMemo(
    () => new Set(servable.map((p) => p.id)),
    [servable],
  );

  let count = selected.length;
  let forced = false;
  let cap = false;
  let drop = false;
  if (scenario === 'sel-none') return null;
  if (scenario === 'sel-single') {
    count = 1;
    forced = true;
  } else if (scenario === 'sel-few') {
    count = 3;
    forced = true;
  } else if (scenario === 'sel-over') {
    count = 63;
    forced = true;
    cap = true;
  } else if (scenario === 'sel-drop') {
    count = 3;
    forced = true;
    drop = true;
  }

  if (!forced && count === 0) return null;

  const primary = brand.primaryColor;
  const ring =
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFFFF]';

  const runDropCheck = () => {
    const unavailable = selected.filter((id) => !servableIds.has(id));
    if (unavailable.length > 0) {
      removeMany(unavailable);
      setDroppedMsg(
        `${unavailable.length} of the pieces you chose aren't available any more and have been removed.`,
      );
    } else {
      setDroppedMsg(null);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#DCE3F0] px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4">
      <div className="max-w-[1180px] mx-auto">
        {(drop || droppedMsg) && (
          <p className="mb-3 text-[13px] text-[#A8552A]">
            {droppedMsg ??
              '2 of the pieces you chose aren\'t available any more and have been removed.'}
          </p>
        )}
        {cap && (
          <p className="mb-3 text-[13px] text-[#A8552A]">
            You can include up to 50 pieces in a PDF. You've chosen {count} —
            remove {count - 50} to continue.
          </p>
        )}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-medium text-[#16233E] tabular-nums">
              {count} piece{count === 1 ? '' : 's'} selected
            </p>
            <button
              onClick={() => {
                clear();
                setDroppedMsg(null);
              }}
              className={`text-[13px] text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 ${ring}`}
            >
              Clear
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/c/${token}/pdf`}
              onClick={runDropCheck}
              aria-disabled={cap}
              style={cap ? undefined : undefined}
              className={`h-9 px-4 text-[13px] font-medium rounded-full border border-[#DCE3F0] bg-white text-[#16233E] hover:border-[#C6D0E6] transition-colors duration-150 whitespace-nowrap inline-flex items-center justify-center ${ring} ${
                cap ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Download PDF
            </Link>
            <Link
              href={`/c/${token}/request`}
              onClick={runDropCheck}
              style={{ backgroundColor: primary }}
              className={`h-9 px-4 text-[13px] font-medium rounded-full text-white hover:opacity-90 transition-opacity duration-150 whitespace-nowrap inline-flex items-center justify-center ${ring}`}
            >
              Request these
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}