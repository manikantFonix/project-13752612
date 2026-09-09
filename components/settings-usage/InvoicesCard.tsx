'use client';

import { focusRing, type Invoice } from './data';

interface Props {
  invoices: Invoice[];
  hasMore: boolean;
  empty: boolean;
}

const statusColor: Record<Invoice['status'], string> = {
  Paid: 'text-[#3D6B54]',
  Failed: 'text-[#A8552A]',
  Refunded: 'text-[#5D6C8A]',
};

export default function InvoicesCard({ invoices, hasMore, empty }: Props) {
  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
      <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
        Invoices
      </h2>
      {empty ? (
        <p className="mt-4 text-[13px] text-[#5D6C8A]">
          No invoices yet. Your first one appears after your first billing date.
        </p>
      ) : (
        <div className="mt-4">
          <div className="grid grid-cols-[1fr_150px_120px_120px_120px] items-center gap-4 px-2 h-9 border-b border-[#DCE3F0]">
            <span className="text-[13px] font-medium text-[#5D6C8A]">
              Invoice
            </span>
            <span className="text-[13px] font-medium text-[#5D6C8A]">Date</span>
            <span className="text-[13px] font-medium text-[#5D6C8A]">
              Amount
            </span>
            <span className="text-[13px] font-medium text-[#5D6C8A]">
              Status
            </span>
            <span className="text-right" />
          </div>
          {invoices.map((inv) => (
            <div
              key={inv.reference}
              className="grid grid-cols-[1fr_150px_120px_120px_120px] items-center gap-4 px-2 py-3 border-b border-[#DCE3F0] last:border-b-0"
            >
              <p className="text-[13px] text-[#16233E]">{inv.reference}</p>
              <p className="text-[13px] text-[#5D6C8A]">{inv.date}</p>
              <p className="text-[13px] text-[#16233E] tabular-nums">
                ${inv.amount}
              </p>
              <p className={`text-[13px] font-medium ${statusColor[inv.status]}`}>
                {inv.status}
              </p>
              <div className="flex justify-end">
                <button
                  className={`h-8 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
          {hasMore && (
            <div className="mt-3">
              <button
                className={`text-[13px] font-medium text-[#152E56] hover:text-[#172D54] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
              >
                View all invoices
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}