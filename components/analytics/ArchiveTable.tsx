'use client';

import Link from 'next/link';
import { focusRing, type DesignRow } from './data';

const success = ['Approved', 'Completed'];

export default function ArchiveTable({ rows }: { rows: DesignRow[] }) {
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="h-11">
              <th className="pl-4 pr-4 text-left text-[13px] font-medium text-[#5D6C8A]">Design</th>
              <th className="pl-4 pr-4 text-left text-[13px] font-medium text-[#5D6C8A]">Customer</th>
              <th className="pl-4 pr-4 text-left text-[13px] font-medium text-[#5D6C8A]">Outcome</th>
              <th className="pl-4 pr-4 w-28 text-right text-[13px] font-medium text-[#5D6C8A]">Made</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCE3F0]">
            {rows.map((d) => (
              <tr key={d.id}>
                <td className="py-3 pl-4 pr-4">
                  <Link
                    href={`/requests/${d.id}`}
                    className={`flex items-center gap-3 ${focusRing} rounded-[8px]`}
                  >
                    <span
                      aria-hidden="true"
                      className="w-10 h-10 rounded-[8px] bg-[#E4E9F4] overflow-hidden flex-shrink-0"
                    >
                      <img src={d.thumbnail} alt="" className="w-full h-full object-cover" />
                    </span>
                    <span>
                      <span className="block text-[13px] font-medium text-[#16233E]">{d.number}</span>
                      <span className="block text-[12px] text-[#5D6C8A]">{d.category}</span>
                    </span>
                  </Link>
                </td>
                <td className="py-3 pl-4 pr-4 text-[13px] text-[#16233E]">
                  {d.customer ?? <span className="text-[13px] text-[#5D6C8A]">—</span>}
                </td>
                <td className="py-3 pl-4 pr-4">
                  <Link
                    href={`/requests/${d.id}`}
                    className={`text-[13px] font-medium ${focusRing} rounded-[8px] ${
                      success.includes(d.outcome) ? 'text-[#3D6B54]' : 'text-[#5D6C8A]'
                    }`}
                  >
                    {d.outcome}
                  </Link>
                </td>
                <td className="py-3 pl-4 pr-4 text-right text-[13px] text-[#5D6C8A] tabular-nums">
                  {d.madeLabel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}