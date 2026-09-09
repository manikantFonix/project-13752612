'use client';

import { useEffect, useRef, useState } from 'react';
import { FOCUS_RING, type Request } from './data';
import RecordDecisionDialog from './RecordDecisionDialog';
import CustomerSendDialog from './CustomerSendDialog';
import CustomerStateControl, {
  type CustomerScenario,
} from './CustomerStateControl';
import { customers, initials, type Customer } from './customers';

interface Props {
  req: Request;
  onOpenPicker: () => void;
  onShare: () => void;
  onResend: () => void;
  onGoDesign: () => void;
  onRecord: (outcome: 'approved' | 'rejected') => void;
  onResume: () => void;
}

interface Model {
  scenario: CustomerScenario;
  linkState?: 'waiting' | 'expired' | 'used';
  decision?: Request['decision'];
}

const DEMO_CUSTOMER = customers[0];

function defaultScenario(req: Request): Model {
  if (!req.customer) return { scenario: 'no-customer' };
  const shared = !!req.linkState || !!req.decision;
  if (!shared) return { scenario: 'not-shared' };
  if (req.decision) {
    const retailer = req.decision.by === 'retailer';
    return {
      scenario: req.decision.outcome === 'approved'
        ? retailer ? 'approved-retailer' : 'approved-customer'
        : retailer ? 'rejected-retailer' : 'rejected-customer',
      linkState: 'used',
      decision: req.decision,
    };
  }
  if (req.linkState === 'expired') return { scenario: 'expired', linkState: 'expired' };
  return { scenario: 'waiting', linkState: 'waiting' };
}

const PILL: Record<string, { label: string; cls: string }> = {
  waiting: { label: 'Waiting for approval', cls: 'bg-[#F3F6FC] text-[#5D6C8A]' },
  expired: {
    label: 'Link expired',
    cls: 'bg-white border border-[#A8552A] text-[#A8552A]',
  },
  approved: { label: 'Approved', cls: 'bg-[#E8F1EC] text-[#3D6B54]' },
  rejected: {
    label: 'Rejected',
    cls: 'bg-white border border-[#A8552A] text-[#A8552A]',
  },
};

function Block({
  cls,
  lines,
}: {
  cls: string;
  lines: { text: string; cls: string }[];
}) {
  return (
    <div className={`mt-5 rounded-[12px] px-4 py-3 ${cls}`}>
      {lines.map((l, i) => (
        <p key={i} className={`text-[13px] leading-relaxed ${l.cls} ${i > 0 ? 'mt-1.5' : ''}`}>
          {l.text}
        </p>
      ))}
    </div>
  );
}

function LinkField({ req }: { req: Request }) {
  const [copied, setCopied] = useState(false);
  const liveRef = useRef<HTMLSpanElement>(null);
  const link = `https://shop.craftsman.ai/approve/${req.id}`;
  const mid = Math.floor(link.length / 2);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      /* no-op */
    }
    setCopied(true);
    if (liveRef.current) liveRef.current.textContent = 'Link copied.';
    setTimeout(() => {
      setCopied(false);
      if (liveRef.current) liveRef.current.textContent = '';
    }, 2000);
  };

  const view = `${link.slice(0, mid)}…${link.slice(mid + 8)}`;

  return (
    <>
      <span ref={liveRef} aria-live="polite" className="sr-only" />
      <div className="flex items-center gap-2">
        <div className="flex-1 h-10 px-3 bg-[#F3F6FC] border border-[#DCE3F0] rounded-[12px] flex items-center">
          <span className="text-[13px] text-[#16233E] truncate" title={link}>
            {view}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
            copied
              ? 'border-[#DCE3F0] text-[#3D6B54] bg-[#E8F1EC]'
              : 'bg-white border-[#DCE3F0] text-[#16233E] hover:bg-[#EDF1FA]'
          }`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </>
  );
}

function CenteredCard({
  title,
  body,
  children,
}: {
  title: string;
  body: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-10 min-h-[280px] flex flex-col items-center justify-center text-center">
      <span className="w-14 h-14 rounded-[16px] bg-[#F3F6FC] flex items-center justify-center">
        <i className="ri-user-line text-[24px] w-6 h-6 flex items-center justify-center text-[#5D6C8A]" />
      </span>
      <p className="mt-5 text-[18px] font-semibold text-[#16233E]">{title}</p>
      <p className="mt-1.5 text-[13px] text-[#5D6C8A] max-w-[360px]">{body}</p>
      {children}
    </div>
  );
}

export default function CustomerTab({
  req,
  onOpenPicker,
  onShare,
  onResend,
  onGoDesign,
  onRecord,
  onResume,
}: Props) {
  const [scenario, setScenario] = useState<CustomerScenario>(() => defaultScenario(req).scenario);
  const [customer, setCustomer] = useState<Customer | undefined>(req.customer);
  const [decision, setDecision] = useState<Request['decision'] | undefined>(req.decision);
  const [linkState, setLinkState] = useState<Request['linkState']>(req.linkState);
  const [sendOpen, setSendOpen] = useState(false);
  const [recordFor, setRecordFor] = useState<'approved' | 'rejected' | null>(null);
  const [recordError, setRecordError] = useState(false);
  const [resendMsg, setResendMsg] = useState('');
  const [saveFails, setSaveFails] = useState(false);
  const resultRef = useRef<HTMLSpanElement>(null);

  const empty =
    scenario === 'no-customer' || scenario === 'not-shared' || scenario === 'send-dialog-open';
  const canChange = req.status === 'draft' || req.status === 'ready';
  const sharedDate = decision?.date ?? req.updatedFull;

  const openSend = () => setSendOpen(true);

  const handleSend = (selected: Customer) => {
    setCustomer(selected);
    setSendOpen(false);
    setScenario('waiting');
    setLinkState('waiting');
    onShare();
    if (resultRef.current) resultRef.current.textContent = 'Design sent.';
  };

  const applyScenario = (s: CustomerScenario) => {
    setScenario(s);
    setRecordFor(null);
    setRecordError(false);
    if (s === 'no-customer') {
      setCustomer(undefined);
      setDecision(undefined);
      setLinkState(undefined);
      return;
    }
    if (s === 'send-dialog-open') {
      setCustomer((c) => c ?? DEMO_CUSTOMER);
      setScenario('not-shared');
      setSendOpen(true);
      return;
    }
    if (s === 'not-shared') {
      setCustomer((c) => c ?? DEMO_CUSTOMER);
      setDecision(undefined);
      setLinkState(undefined);
      return;
    }
    const c = customer ?? DEMO_CUSTOMER;
    setCustomer(c);
    if (s === 'waiting') {
      setDecision(undefined);
      setLinkState('waiting');
      return;
    }
    if (s === 'expired') {
      setDecision(undefined);
      setLinkState('expired');
      return;
    }
    const retailer = s.endsWith('-retailer');
    const outcome = s.startsWith('approved') ? 'approved' : 'rejected';
    setDecision({
      outcome,
      date: '29 April 2026',
      by: retailer ? 'retailer' : 'customer',
      customerName: c.name,
    });
    setLinkState('used');
  };

  const resend = () => {
    onResend();
    setResendMsg('New link sent.');
    if (resultRef.current) resultRef.current.textContent = 'New link sent.';
    setTimeout(() => {
      setResendMsg('');
      if (resultRef.current) resultRef.current.textContent = '';
    }, 2400);
  };

  const confirmRecord = (outcome: 'approved' | 'rejected') => {
    const c = customer ?? DEMO_CUSTOMER;
    setRecordFor(null);
    if (saveFails) {
      setRecordError(true);
      return;
    }
    setRecordError(false);
    setDecision({ outcome, date: '29 April 2026', by: 'retailer', customerName: c.name });
    setLinkState('used');
    const retailer = true;
    setScenario(
      outcome === 'approved'
        ? retailer ? 'approved-retailer' : 'approved-customer'
        : retailer ? 'rejected-retailer' : 'rejected-customer'
    );
    onRecord(outcome);
  };

  let pill: { label: string; cls: string };
  let block: { cls: string; lines: { text: string; cls: string }[] } | null = null;

  if (scenario === 'waiting') {
    pill = PILL.waiting;
    block = {
      cls: 'bg-white border-l-2 border-[#5D6C8A]',
      lines: [
        {
          text: "Waiting for the customer. They've been emailed a link with Approve and Reject on it.",
          cls: 'text-[#16233E]',
        },
      ],
    };
  } else if (scenario === 'expired') {
    pill = PILL.expired;
    block = {
      cls: 'bg-white border-l-2 border-[#A8552A]',
      lines: [
        { text: 'The approval link has expired.', cls: 'text-[#A8552A]' },
        {
          text: "Send a new one to keep this moving. It's the same link — it just starts working again.",
          cls: 'text-[#5D6C8A]',
        },
      ],
    };
  } else if (scenario === 'approved-customer' || scenario === 'approved-retailer') {
    pill = PILL.approved;
    const retailer = scenario === 'approved-retailer';
    block = {
      cls: 'bg-[#E8F1EC]',
      lines: [
        {
          text: retailer
            ? `Approved by you on behalf of ${customer?.name} on ${decision?.date}.`
            : `Approved on ${decision?.date}.`,
          cls: 'text-[#3D6B54]',
        },
        {
          text: 'The design is locked at the draft they saw. You can route it to a manufacturer now.',
          cls: 'text-[#5D6C8A]',
        },
      ],
    };
  } else if (scenario === 'rejected-customer' || scenario === 'rejected-retailer') {
    pill = PILL.rejected;
    const retailer = scenario === 'rejected-retailer';
    block = {
      cls: 'bg-white border-l-2 border-[#A8552A]',
      lines: [
        {
          text: retailer
            ? `Rejected by you on behalf of ${customer?.name} on ${decision?.date}.`
            : `Rejected on ${decision?.date}.`,
          cls: 'text-[#A8552A]',
        },
        {
          text: 'No reason is collected. The design is unlocked so you can refine it and share again.',
          cls: 'text-[#5D6C8A]',
        },
      ],
    };
  } else {
    pill = PILL.approved;
  }

  const showDecision = scenario === 'waiting' || scenario === 'expired';
  const showResend = scenario === 'waiting' || scenario === 'expired';
  const showRefine =
    scenario === 'rejected-customer' || scenario === 'rejected-retailer';

  return (
    <div>
      {(scenario === 'no-customer' || scenario === 'not-shared') && (
        <CenteredCard
          title="No design sent to the customer yet"
          body={`Share this design with ${customer?.name ?? 'your customer'} for review and approval.`}
        >
          <button
            type="button"
            onClick={openSend}
            className={`mt-6 h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Send to customer
          </button>
          {customer?.email && (
            <p className="mt-3 text-[13px] text-[#5D6C8A]">
              Goes to {customer.email}.
            </p>
          )}
          <p className="mt-1 text-[12px] text-[#5D6C8A]">
            You can also share from the{' '}
            <button
              type="button"
              onClick={onGoDesign}
              className={`text-[12px] font-medium text-[#152E56] hover:text-[#172D54] transition-colors duration-150 ${FOCUS_RING}`}
            >
              Design tab
            </button>
            .
          </p>
        </CenteredCard>
      )}

      {!empty && (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-5 items-start">
          <div className="bg-white border border-[#DCE3F0] rounded-[12px] p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[15px] font-medium text-[#16233E]">
                Customer review
              </p>
              <span
                className={`inline-flex h-6 px-3 rounded-full text-[12px] font-medium items-center whitespace-nowrap ${pill.cls}`}
              >
                {pill.label}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3.5">
              <span className="w-12 h-12 rounded-full bg-[#E4E9F4] flex items-center justify-center flex-shrink-0">
                <span className="text-[15px] font-medium text-[#5D6C8A]">
                  {initials(customer?.name ?? '')}
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-medium text-[#16233E]">
                  {customer?.name}
                </p>
                <a
                  href={`mailto:${customer?.email}`}
                  className="block text-[13px] text-[#16233E] truncate hover:text-[#152E56] transition-colors duration-150"
                >
                  {customer?.email}
                </a>
                <p className="text-[12px] text-[#5D6C8A] tabular-nums">
                  Shared on {sharedDate}
                </p>
              </div>
              {canChange && scenario === 'not-shared' && (
                <button
                  type="button"
                  onClick={onOpenPicker}
                  className={`shrink-0 text-[13px] font-medium text-[#152E56] hover:text-[#172D54] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
                >
                  Change customer
                </button>
              )}
            </div>

            {block && <Block cls={block.cls} lines={block.lines} />}

            {showDecision && (
              <div className="mt-5 pt-4 border-t border-[#DCE3F0]">
                <LinkField req={req} />
              </div>
            )}
          </div>

          {showDecision && (
            <div className="bg-[#F3F6FC] border border-[#DCE3F0] rounded-[12px] p-5">
              {recordError && (
                <p className="mb-4 text-[13px] text-[#A8552A]">
                  We couldn't save that. Nothing has changed — try again.
                </p>
              )}
              <p className="text-[13px] font-medium text-[#16233E]">
                Record their decision
              </p>
              <p className="mt-1 text-[12px] text-[#5D6C8A] leading-relaxed">
                Use this when the customer is with you. It's the same as them
                deciding through the link.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setRecordFor('approved')}
                  className={`h-9 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} text-white bg-[#152E56] border border-[#152E56] hover:bg-[#172D54]`}
                >
                  Record approval
                </button>
                <button
                  type="button"
                  onClick={() => setRecordFor('rejected')}
                  className={`h-9 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} text-[#A8552A] bg-white border-[#A8552A] hover:text-[#91441E] hover:border-[#91441E]`}
                >
                  Record rejection
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!empty && (
        <div className="mt-4 flex items-center gap-6">
          <span ref={resultRef} aria-live="polite" className="sr-only" />
          {showResend && (
            <button
              type="button"
              onClick={resend}
              className={`text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
            >
              Resend link
            </button>
          )}
          {resendMsg && !showResend && (
            <p className="text-[13px] text-[#5D6C8A]">{resendMsg}</p>
          )}
          {showRefine && (
            <button
              type="button"
              onClick={onResume}
              className={`text-[13px] font-medium text-[#152E56] hover:text-[#172D54] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
            >
              Refine the design
            </button>
          )}
        </div>
      )}

      <CustomerSendDialog
        open={sendOpen}
        req={req}
        onClose={() => setSendOpen(false)}
        onSend={handleSend}
      />

      <RecordDecisionDialog
        open={recordFor !== null}
        customerName={customer?.name ?? ''}
        outcome={recordFor ?? 'approved'}
        onClose={() => setRecordFor(null)}
        onConfirm={() => recordFor && confirmRecord(recordFor)}
      />

      <CustomerStateControl
        scenario={scenario}
        onChange={applyScenario}
        saveFails={saveFails}
        onSaveFails={setSaveFails}
      />
    </div>
  );
}