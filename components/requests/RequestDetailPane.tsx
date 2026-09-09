'use client';

import { useState } from 'react';
import { FOCUS_RING, locked, statusLabel, type Request } from './data';
import DesignTab from './DesignTab';
import CustomerTab from './CustomerTab';
import ManufacturerTab from './ManufacturerTab';
import CancelDialog from './CancelDialog';
import PickerDialog, { type PickOption } from './PickerDialog';

type DetailTab = 'design' | 'customer' | 'manufacturer';

const customerOptions: PickOption[] = [
  { name: 'Elena Marchetti', detail: '555-0177' },
  { name: 'Oliver Bennett', detail: '555-0241' },
  { name: 'Mia Taylor', detail: '555-0139' },
  { name: 'Ava Clarke', detail: '555-0228' },
  { name: 'Sophia Reed', detail: '555-0206' },
  { name: 'Ethan Walker', detail: '555-0256' },
  { name: 'Grace Hall', detail: '555-0194' },
];

const manufacturerOptions: PickOption[] = [
  { name: 'Atelier Monaco', detail: '555-0401' },
  { name: 'Novum Fineworks', detail: '555-0432' },
  { name: 'Craftline Guild', detail: '555-0418' },
];

const TABS: { id: DetailTab; label: string }[] = [
  { id: 'design', label: 'Design' },
  { id: 'customer', label: 'Customer' },
  { id: 'manufacturer', label: 'Manufacturer' },
];

interface Props {
  req: Request;
  showExpand: boolean;
  onExpand: () => void;
  onBack: () => void;
}

export default function RequestDetailPane({ req, showExpand, onExpand, onBack }: Props) {
  const [tab, setTab] = useState<DetailTab>('design');
  const [designNo, setDesignNo] = useState(req.designNo);
  const [editing, setEditing] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [resumed, setResumed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [shared, setShared] = useState(false);
  const [recorded, setRecorded] = useState<Request['decision']>(undefined);
  const [picker, setPicker] = useState<'customer' | 'manufacturer' | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState(req.customer);
  const [selectedManufacturer, setSelectedManufacturer] = useState(req.manufacturer);

  const effStatus = completed
    ? 'completed'
    : cancelled
    ? req.status
    : resumed
    ? 'draft'
    : shared
    ? 'sent'
    : req.status;
  const effDecision = recorded ?? (resumed ? undefined : req.decision);
  const effLinkState = recorded
    ? 'used'
    : shared
    ? 'waiting'
    : resumed
    ? undefined
    : req.linkState;

  const eff: Request = {
    ...req,
    designNo,
    status: effStatus,
    decision: effDecision,
    linkState: effLinkState,
    customer: selectedCustomer,
    manufacturer: selectedManufacturer,
  };

  const isCompleted = effStatus === 'completed';
  const isCancelled = cancelled || req.cancelled;
  const showCancel = !isCompleted && !isCancelled;
  const inProduction = effStatus === 'manufacturer' && eff.quote?.status === 'accepted';
  const canSwitch = !locked(effStatus);
  const statusText = isCancelled ? 'Cancelled' : statusLabel[effStatus];

  const onTabKey = (e: React.KeyboardEvent) => {
    const idx = TABS.findIndex((t) => t.id === tab);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setTab(TABS[(idx + 1) % TABS.length].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setTab(TABS[(idx - 1 + TABS.length) % TABS.length].id);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-3">
        {showExpand && (
          <button
            type="button"
            onClick={onExpand}
            aria-label="Expand request list"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[#5D6C8A] hover:text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 ${FOCUS_RING}`}
          >
            <i className="ri-arrow-right-s-line text-[18px] w-5 h-5 flex items-center justify-center" />
          </button>
        )}
        <button
          type="button"
          onClick={onBack}
          className={`text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 lg:hidden ${FOCUS_RING}`}
        >
          Back to requests
        </button>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            {editing ? (
              <input
                autoFocus
                value={designNo}
                onChange={(e) => setDesignNo(e.target.value)}
                onBlur={() => setEditing(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
                className={`w-[220px] h-9 px-2 text-[22px] font-semibold text-[#16233E] bg-white border border-[#DCE3F0] rounded-[8px] outline-none ${FOCUS_RING}`}
              />
            ) : (
              <h1 className="flex items-center gap-2 text-[22px] font-semibold text-[#16233E]">
                {designNo}
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  aria-label="Edit design number"
                  className={`w-4 h-4 flex items-center justify-center text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 ${FOCUS_RING}`}
                >
                  <i className="ri-edit-line text-[16px] w-4 h-4 shrink-0 inline-flex items-center justify-center" />
                </button>
              </h1>
            )}
            <span
              className={`inline-flex h-6 items-center px-3 rounded-full text-[12px] font-medium whitespace-nowrap ${
                effStatus === 'approved' || effStatus === 'completed'
                  ? 'bg-[#E8F1EC] text-[#3D6B54]'
                  : 'bg-[#F3F6FC] text-[#16233E]'
              }`}
            >
              {statusText}
            </span>
          </div>
          <p className="mt-1 text-[13px] text-[#5D6C8A]">
            {req.category} · {req.createdDate}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {inProduction && !completed && (
            <button
              type="button"
              onClick={() => setCompleted(true)}
              className={`h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
            >
              Mark as complete
            </button>
          )}
          {showCancel && (
            <button
              type="button"
              onClick={() => setCancelOpen(true)}
              className={`text-[13px] font-medium text-[#A8552A] hover:text-[#91441E] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
            >
              Cancel request
            </button>
          )}
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Request detail"
        onKeyDown={onTabKey}
        className="mt-6 flex w-full items-center gap-1 p-1 bg-[#F3F6FC] border border-[#DCE3F0] rounded-full"
      >
        {TABS.map((t) => {
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              tabIndex={isActive ? 0 : -1}
              aria-selected={isActive}
              onClick={() => setTab(t.id)}
              className={`flex-1 h-9 text-[14px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
                isActive
                  ? 'bg-[#152E56] text-white'
                  : 'text-[#5D6C8A] hover:text-[#16233E] hover:bg-[#EDF1FA]'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex-1 min-h-0 overflow-y-auto pr-1">
        {tab === 'design' && (
          <DesignTab
            req={eff}
            canSwitch={canSwitch}
            customerSet={!!eff.customer}
            onShare={() => setShared(true)}
            onShareManufacturer={() => setShared(true)}
          />
        )}
        {tab === 'customer' && (
          <CustomerTab
            req={eff}
            onOpenPicker={() => setPicker('customer')}
            onShare={() => setShared(true)}
            onResend={() => setShared(true)}
            onGoDesign={() => setTab('design')}
            onRecord={(outcome) =>
              setRecorded({
                outcome,
                date: '8 September 2026',
                by: 'retailer',
                customerName: selectedCustomer?.name ?? '',
              })
            }
            onResume={() => setResumed(true)}
          />
        )}
        {tab === 'manufacturer' && (
          <ManufacturerTab
            req={eff}
            onGoDesign={() => setTab('design')}
          />
        )}
      </div>

      <CancelDialog
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        onConfirm={() => {
          setCancelled(true);
          setCancelOpen(false);
        }}
      />

      <PickerDialog
        open={picker === 'customer'}
        title="Add a customer"
        options={customerOptions}
        onSelect={(name) => {
          const o = customerOptions.find((c) => c.name === name);
          setSelectedCustomer({
            name: name === '__create__' ? 'New customer' : name,
            phone: o?.detail ?? '',
            email: '',
          });
          setPicker(null);
        }}
        onClose={() => setPicker(null)}
      />

      <PickerDialog
        open={picker === 'manufacturer'}
        title="Choose a manufacturer"
        options={manufacturerOptions}
        onSelect={(name) => {
          if (name !== '__create__') {
            setSelectedManufacturer({ name, phone: '', email: '' });
          }
          setPicker(null);
        }}
        onClose={() => setPicker(null)}
      />
    </div>
  );
}