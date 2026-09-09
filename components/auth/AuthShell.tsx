import type { ReactNode } from 'react';
import { MARK_URL } from './tokens';

export default function AuthShell({
  footer,
  children,
}: {
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#EDF1FA] flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-[400px]">
        <div className="flex items-center justify-center gap-2.5 mb-6">
          <img
            src={MARK_URL}
            alt="CraftsmanAI"
            className="w-10 h-10 object-contain"
          />
          <span className="text-[18px] font-semibold text-[#16233E]">
            CraftsmanAI
          </span>
        </div>
        <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-8">
          {children}
        </div>
        {footer && (
          <div className="mt-6 text-[13px] text-[#5D6C8A] text-center">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}