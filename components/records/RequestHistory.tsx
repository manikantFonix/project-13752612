'use client';

import Link from 'next/link';
import {
  CUSTOMER_FOCUS_RING,
  historyFor,
  type RecordItem,
} from './data';
import { statusLabel } from '../requests/data';

export default function RequestHistory({ record }: { record: RecordItem }) {
  const items = historyFor(record);
  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
      <div className="flex items-center gap-2">
        <h3 className="text-[15px] font-medium text-[#16233E]">Requests</h3>
        <span className="text-[13px] text-[#5D6C8A] tabular-nums">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <p className="mt-5 text-[13px] text-[#5D6C8A]">No requests yet.</p>
      ) : (
        <div className="mt-4">
          {items.map((h, i) => {
            const green = h.status === 'approved' || h.status === 'completed';
            return (
              <div
                key={h.id}
                className={`flex items-center gap-3 ${i > 0 ? 'border-t border-[#DCE3F0]' : ''}`}
                style={{ minHeight: 64 }}
              >
                <img
                  src={h.thumb}
                  alt={h.category}
                  className="w-11 h-11 rounded-[8px] object-cover bg-[#E4E9F4] shrink-0"
                />
                <Link
                  href={`/requests/${h.id}`}
                  prefetch={false}
                  className={`flex-1 min-w-0 rounded-[8px] px-1 -mx-1 hover:bg-[#F3F6FC] transition-colors duration-150 ${CUSTOMER_FOCUS_RING}`}
                >
                  <p className="text-[13px] font-medium text-[#16233E]">{h.designNo}</p>
                  <p className="text-[12px] text-[#5D6C8A]">{h.category}</p>
                </Link>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span
                    className={`inline-flex h-5 items-center px-2 rounded-full text-[11px] font-medium whitespace-nowrap ${
                      green
                        ? 'bg-[#E8F1EC] text-[#3D6B54]'
                        : 'bg-[#F3F6FC] text-[#5D6C8A]'
                    }`}
                  >
                    {h.cancelled ? 'Cancelled' : statusLabel[h.status]}
                  </span>
                  <span className="text-[11px] text-[#5D6C8A] tabular-nums">
                    {h.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}