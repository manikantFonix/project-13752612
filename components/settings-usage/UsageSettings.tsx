'use client';

import UsageBanner from './UsageBanner';
import PlanCard from './PlanCard';
import BalanceCard from './BalanceCard';
import ConsumptionCard from './ConsumptionCard';
import TopUpCard from './TopUpCard';
import InvoicesCard from './InvoicesCard';
import ErrorCard from './ErrorCard';
import {
  cancelInfo,
  consumptionData,
  getBalance,
  invoicesData,
  planData,
  purchasesData,
  topUpPacksData,
  type UsageState,
} from './data';

function LoadingCard() {
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5 space-y-3">
      <div className="h-4 w-1/3 rounded-full bg-[#E4E9F4]" />
      <div className="h-3 w-2/3 rounded-full bg-[#E4E9F4]" />
      <div className="h-3 w-1/2 rounded-full bg-[#E4E9F4]" />
      <div className="h-3 w-1/4 rounded-full bg-[#E4E9F4]" />
    </div>
  );
}

export default function UsageSettings({ state }: { state: UsageState }) {
  const plan =
    state === 'cancelling'
      ? { ...planData, status: 'cancelling' as const }
      : planData;
  const balance = getBalance(state);
  const emptyHistory = state === 'emptyHistory';

  const scrollToTopUp = () => {
    document.getElementById('top-up')?.scrollIntoView({ behavior: 'smooth' });
  };

  const showBanner =
    state === 'lowBalance' ||
    state === 'exhausted' ||
    state === 'paymentFailed';

  return (
    <div>
      <h2 className="text-[20px] font-semibold text-[#16233E]">Usage & Plan</h2>
      <p className="mt-1 text-[13px] text-[#5D6C8A]">
        Your plan, balance and what you've used.
      </p>

      {showBanner && (
          <div className="mt-6">
            {state === 'lowBalance' && (
              <UsageBanner type="low" onTopUp={scrollToTopUp} />
            )}
            {state === 'exhausted' && (
              <UsageBanner type="exhausted" onTopUp={scrollToTopUp} />
            )}
            {state === 'paymentFailed' && (
              <UsageBanner type="payment" onTopUp={scrollToTopUp} />
            )}
          </div>
        )}

        <div className="mt-5 flex flex-col gap-5">
          {state === 'loading' ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : state === 'error' ? (
            <>
              <ErrorCard />
              <ErrorCard />
              <ErrorCard />
              <ErrorCard />
              <ErrorCard />
            </>
          ) : (
            <>
              <PlanCard plan={plan} cancelInfo={cancelInfo} />
              <BalanceCard balance={balance} />
              <ConsumptionCard rows={consumptionData} />
              <TopUpCard
                packs={topUpPacksData}
                purchases={purchasesData}
                emptyHistory={emptyHistory}
              />
              <InvoicesCard invoices={invoicesData} hasMore={false} empty={false} />
            </>
          )}
        </div>
    </div>
  );
}