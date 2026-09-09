'use client';

import { installCopy, installStatusFor, originsFor, STATUS_LABEL, type WidgetState } from './data';

function StatusSkeleton() {
  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-6 space-y-3">
      <div className="h-4 w-24 rounded-full bg-[#E4E9F4]" />
      <div className="h-3 w-1/2 rounded-full bg-[#E4E9F4]" />
      <div className="h-3 w-2/3 rounded-full bg-[#E4E9F4]" />
    </section>
  );
}

function StatusError() {
  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-6">
      <h3 className="text-[15px] font-medium text-[#16233E]">Status</h3>
      <p className="mt-3 text-[13px] text-[#A8552A]">We couldn't read your status.</p>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">
        Nothing is broken on your site — we just couldn't check it just now. Try again in a moment.
      </p>
    </section>
  );
}

export default function StatusCard({ state }: { state: WidgetState }) {
  if (state === 'loading') return <StatusSkeleton />;
  if (state === 'error') return <StatusError />;

  const status = installStatusFor(state);
  const c = installCopy[status];
  const empty = originsFor(state).length === 0;

  return (
    <section className="bg-white border border-[#DCE3F0] rounded-[12px] p-6">
      {empty && (
        <div className="border-l-2 border-[#A8552A] pl-3 py-3 mb-4">
          <p className="text-[13px] text-[#A8552A]">{STATUS_LABEL.noOriginBlock}</p>
        </div>
      )}
      <h3 className="text-[15px] font-medium text-[#16233E]">Status</h3>
      <p className="mt-3 text-[13px] font-medium leading-none" style={{ color: c.color }}>
        {c.label}
      </p>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">{c.explanation}</p>
    </section>
  );
}