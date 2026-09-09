'use client';

import { useState } from 'react';
import Link from 'next/link';
import { metalSwatch, type Lead, type CatalogItem } from './data';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

function ItemCard({ item }: { item: CatalogItem }) {
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] overflow-hidden">
      <div className="flex gap-5 p-4">
        <img
          src={item.image}
          alt={item.category}
          className="w-[120px] h-[120px] rounded-[12px] object-cover bg-[#E4E9F4] shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium text-[#16233E]">
            {item.category}
          </p>
          <p className="mt-1 text-[13px] text-[#5D6C8A] leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      <div className="flex divide-x divide-[#DCE3F0] border-t border-[#DCE3F0] bg-[#F3F6FC]">
        <div className="flex-1 min-w-0 px-4 py-3">
          <p className="text-[12px] text-[#5D6C8A]">Metal color</p>
          <div className="mt-1 text-[13px] text-[#16233E] inline-flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-[4px]"
              style={{ backgroundColor: metalSwatch[item.metal] }}
            />
            {item.metal}
          </div>
        </div>
        <div className="flex-1 min-w-0 px-4 py-3">
          <p className="text-[12px] text-[#5D6C8A]">Quantity</p>
          <p className="mt-1 text-[13px] text-[#16233E] tabular-nums">
            {item.quantity}
          </p>
        </div>
        <div className="flex-1 min-w-0 px-4 py-3">
          <p className="text-[12px] text-[#5D6C8A]">Price</p>
          {item.price !== null ? (
            <p className="mt-1 text-[13px] text-[#16233E] tabular-nums">
              ${item.price.toLocaleString('en-US')}
            </p>
          ) : (
            <p className="mt-1 text-[13px] text-[#5D6C8A]">Price on request</p>
          )}
        </div>
      </div>
    </div>
  );
}

function EstimateBlock({ lead }: { lead: Lead }) {
  if (!lead.estimate) return null;
  const { estimate } = lead;
  return (
    <div className="mt-4 bg-[#F3F6FC] border border-[#DCE3F0] rounded-[12px] p-4">
      <p className="text-[13px] font-medium text-[#5D6C8A]">Their estimate</p>
      <div className="mt-2 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#5D6C8A]">Metal</span>
          <span className="text-[13px] text-[#16233E] tabular-nums">
            {estimate.metal}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#5D6C8A]">Stones</span>
          <span className="text-[13px] text-[#16233E] tabular-nums">
            {estimate.stones}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#5D6C8A]">Labor</span>
          <span className="text-[13px] text-[#16233E] tabular-nums">
            {estimate.labor}
          </span>
        </div>
      </div>
      <div className="mt-3 h-px bg-[#DCE3F0]" />
      <div className="mt-3 flex items-end justify-between">
        <p className="text-[12px] text-[#5D6C8A]">Estimated total</p>
        <p className="text-[18px] font-semibold text-[#16233E] tabular-nums">
          ${estimate.low.toLocaleString('en-US')} – $
          {estimate.high.toLocaleString('en-US')}
        </p>
      </div>
    </div>
  );
}

export default function LeadDetail({ lead }: { lead: Lead }) {
  const [status, setStatus] = useState<Lead['status']>(lead.status);
  const [saveError, setSaveError] = useState(false);

  const decidedOn =
    status === 'accepted' || status === 'rejected' ? lead.decidedOn : undefined;

  return (
    <main className="min-h-screen bg-[#EDF1FA] pt-8 pb-16">
      <div className="max-w-[1180px] mx-auto px-8">
        <nav className="text-[13px] text-[#5D6C8A]">
          <Link
            href="/leads"
            prefetch={false}
            className={`hover:text-[#16233E] transition-colors duration-150 ${focusRing}`}
          >
            Leads
          </Link>
          <span className="mx-1">/</span>
          <span className="text-[#16233E]">{lead.name}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="order-2 lg:order-none flex flex-col gap-5">
            {lead.message && (
              <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
                <p className="text-[13px] font-medium text-[#5D6C8A]">
                  Their message
                </p>
                <p className="mt-2 text-[15px] text-[#16233E] whitespace-pre-line">
                  {lead.message}
                </p>
              </div>
            )}

            {lead.source === 'widget' ? (
              <div>
                <h2 className="text-[20px] font-semibold text-[#16233E]">
                  What they're asking about
                </h2>
                <div className="mt-3 bg-white border border-[#DCE3F0] rounded-[12px] p-4">
                  <p className="text-[13px] font-medium text-[#5D6C8A]">
                    The design they generated
                  </p>
                  <img
                    src={lead.widgetImage}
                    alt="Generated design"
                    className="mt-3 w-[240px] h-[240px] rounded-[12px] object-cover bg-[#E4E9F4]"
                  />
                  <p className="mt-3 text-[13px] text-[#16233E] tabular-nums">
                    Quantity: {lead.quantity}
                  </p>
                  {lead.estimate && <EstimateBlock lead={lead} />}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-[20px] font-semibold text-[#16233E]">
                  What they're asking about
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {lead.items?.map((item, i) => (
                    <ItemCard key={i} item={item} />
                  ))}
                </div>
              </div>
            )}

            {saveError && (
              <div className="border-l-2 border-[#A8552A] p-3">
                <p className="text-[13px] text-[#A8552A]">
                  We couldn't save that. Nothing has changed — try again.
                </p>
              </div>
            )}

            <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-5">
              {status === 'new' ? (
                <>
                  <p className="text-[13px] font-medium text-[#5D6C8A]">
                    Mark this inquiry
                  </p>
                  <p className="mt-1 text-[13px] text-[#5D6C8A] max-w-[420px]">
                    This is for your records only. It doesn't message the
                    customer — call or message them yourself.
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSaveError(false);
                        setStatus('accepted');
                      }}
                      className={`h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        setSaveError(false);
                        setStatus('rejected');
                      }}
                      className={`h-9 px-4 text-[13px] font-medium text-[#A8552A] bg-white border border-[#A8552A] rounded-full hover:text-[#91441E] hover:border-[#91441E] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
                    >
                      Reject
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-[13px] text-[#16233E]">
                  <span
                    className={
                      status === 'accepted'
                        ? 'font-medium text-[#3D6B54]'
                        : 'font-medium text-[#5D6C8A]'
                    }
                  >
                    {status === 'accepted' ? 'Accepted' : 'Rejected'}
                  </span>{' '}
                  on {decidedOn}
                </p>
              )}
            </div>
          </div>

          <aside className="order-1 lg:order-none lg:sticky lg:top-8 bg-white border border-[#DCE3F0] rounded-[12px] p-5">
            <p className="text-[18px] font-medium text-[#16233E]">{lead.name}</p>

            <p className="mt-4 text-[12px] text-[#5D6C8A]">Phone</p>
            <a
              href={`tel:${lead.phone}`}
              className={`block text-[20px] font-semibold text-[#16233E] tabular-nums transition-colors duration-150 hover:text-[#152E56] ${focusRing}`}
            >
              {lead.phone}
            </a>
            <a
              href={`tel:${lead.phone}`}
              className={`mt-3 h-9 w-full inline-flex items-center justify-center text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
            >
              Call {lead.phone}
            </a>

            <p className="mt-4 text-[12px] text-[#5D6C8A]">Email</p>
            <a
              href={`mailto:${lead.email}`}
              className={`block text-[13px] text-[#16233E] hover:text-[#152E56] transition-colors duration-150 whitespace-pre-line ${focusRing}`}
            >
              {lead.email}
            </a>

            {lead.address && (
              <>
                <p className="mt-4 text-[12px] text-[#5D6C8A]">Address</p>
                <p className="text-[13px] text-[#16233E] whitespace-pre-line">
                  {lead.address}
                </p>
              </>
            )}

            <div className="my-4 h-px bg-[#DCE3F0]" />

            <p className="text-[12px] text-[#5D6C8A]">Received</p>
            <p className="mt-0.5 text-[13px] text-[#16233E]">
              {lead.receivedFull}
            </p>

            <p className="mt-4 text-[12px] text-[#5D6C8A]">From</p>
            <p className="mt-0.5 text-[13px] text-[#16233E]">
              {lead.source === 'catalog' ? lead.catalogName : 'Widget'}
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}