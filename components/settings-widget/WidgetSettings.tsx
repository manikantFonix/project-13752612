'use client';

import StatusCard from './StatusCard';
import WebsitesCard from './WebsitesCard';
import SnippetCard from './SnippetCard';
import ThemeCard from './ThemeCard';
import { focusRing, type WidgetState } from './data';

function LoadingCard() {
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-6 space-y-3">
      <div className="h-4 w-1/3 rounded-full bg-[#E4E9F4]" />
      <div className="h-3 w-2/3 rounded-full bg-[#E4E9F4]" />
      <div className="h-3 w-1/2 rounded-full bg-[#E4E9F4]" />
      <div className="h-9 w-40 rounded-full bg-[#E4E9F4]" />
    </div>
  );
}

function ErrorCard() {
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-6 flex flex-col items-center justify-center text-center min-h-[120px] space-y-3">
      <p className="text-[13px] text-[#16233E]">We couldn't load this.</p>
      <button
        type="button"
        className={`h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
      >
        Try again
      </button>
    </div>
  );
}

export default function WidgetSettings({ state }: { state: WidgetState }) {
  const loading = state === 'loading';
  const error = state === 'error';

  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#16233E]">Widget</h2>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">
        Put the design tool on your own website. Customers can describe a
        piece, see it made, get an estimate and send you a request — without
        leaving your site.
      </p>

      <div className="mt-5 flex flex-col gap-4 max-w-[720px]">
          <StatusCard key={`status-${state}`} state={state} />
          {loading ? (
            [0, 1, 2].map((i) => <LoadingCard key={i} />)
          ) : error ? (
            [0, 1, 2].map((i) => <ErrorCard key={i} />)
          ) : (
            <>
              <WebsitesCard key={`websites-${state}`} state={state} />
              <SnippetCard key={`snippet-${state}`} state={state} />
              <ThemeCard key={`theme-${state}`} state={state} />
            </>
          )}
        </div>
    </div>
  );
}