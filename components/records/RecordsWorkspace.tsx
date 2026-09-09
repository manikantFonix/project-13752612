'use client';

import { useEffect, useState } from 'react';
import {
  customers,
  manufacturers,
  type KindConfig,
  type RecordItem,
} from './data';
import RecordListPanel, { type ListMode } from './RecordListPanel';
import RecordDetailPane from './RecordDetailPane';
import RecordDialog from './RecordDialog';
import RecordDeleteDialog from './RecordDeleteDialog';
import DeactivateDialog from './DeactivateDialog';
import CustomerDetailPane from './CustomerDetailPane';
import CustomerDialog from './CustomerDialog';
import CustomerRemoveDialog from './CustomerRemoveDialog';
import ManufacturerDetailPane from './ManufacturerDetailPane';
import ManufacturerDialog from './ManufacturerDialog';
import ManufacturerRemoveDialog from './ManufacturerRemoveDialog';
import StateSwitcherPanel from '../ui/StateSwitcherPanel';

interface Props {
  config: KindConfig;
}

type Dialogs =
  | { type: 'add' }
  | { type: 'edit'; record: RecordItem }
  | { type: 'delete'; record: RecordItem }
  | { type: 'inactive'; record: RecordItem }
  | null;

export default function RecordsWorkspace({ config }: Props) {
  const source = config.kind === 'customer' ? customers : manufacturers;
  const [records, setRecords] = useState<RecordItem[]>(source);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const [listMode, setListMode] = useState<ListMode>('data');
  const [dialog, setDialog] = useState<Dialogs>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(`${config.kind}:collapsed`);
    if (stored === '1') setCollapsed(true);
  }, [config.kind]);

  useEffect(() => {
    sessionStorage.setItem(`${config.kind}:collapsed`, collapsed ? '1' : '0');
  }, [collapsed, config.kind]);

  const activeRecord = records.find((r) => r.id === selectedId) ?? null;

  const select = (id: string) => {
    setSelectedId(id);
    setMobileView('detail');
  };

  const listClasses = collapsed
    ? 'hidden'
    : `w-[320px] shrink-0 ${mobileView === 'list' ? 'block' : 'hidden lg:block'}`;
  const detailClasses = `flex-1 min-w-0 ${
    mobileView === 'detail' ? 'block' : 'hidden lg:block'
  }`;

  const addRecord = () => {
    setDialog({ type: 'add' });
  };

  const saveRecord = (data: Partial<RecordItem>) => {
    if (dialog?.type === 'edit') {
      setRecords((prev) =>
        prev.map((r) => (r.id === dialog.record.id ? { ...r, ...data } : r))
      );
    } else {
      const id = `${config.kind === 'customer' ? 'c' : 'm'}${Date.now()}`;
      const name = data.name ?? '';
      setRecords((prev) => [
        {
          id,
          name,
          email: data.email ?? '',
          phone: data.phone,
          address: data.address,
          contactName: data.contactName,
          notes: data.notes,
          active: data.active,
          tag: data.tag,
          emails: data.emails,
          requestIds: [],
          clientSince: data.clientSince,
          lastInteraction: data.lastInteraction,
          totalSpent: data.totalSpent,
          activeProjects: data.activeProjects,
          linkedProjects: data.linkedProjects,
          activity: data.activity,
          specialty: data.specialty,
          avgResponse: data.avgResponse,
          lastActivity: data.lastActivity,
          totalValue: data.totalValue,
          completed: data.completed,
          pending: data.pending,
          totalRequests: data.totalRequests,
          mfrStatus: data.mfrStatus,
          sentRequests: data.sentRequests,
          timeline: data.timeline,
          latestNote: data.latestNote,
          location: data.location,
        },
        ...prev,
      ]);
      setSelectedId(id);
      setMobileView('detail');
    }
    setDialog(null);
  };

  const applyToggle = (inactive: boolean) => {
    if (!activeRecord) return;
    setRecords((prev) =>
      prev.map((r) => (r.id === activeRecord.id ? { ...r, active: !inactive } : r))
    );
    setDialog(null);
  };

  const deletePermanent = () => {
    if (!activeRecord) return;
    setRecords((prev) => prev.filter((r) => r.id !== activeRecord.id));
    setSelectedId(null);
    setDialog(null);
  };

  const hasSharedForEdit = () => {
    if (dialog?.type !== 'edit') return false;
    return dialog.record.requestIds.length > 0;
  };

  const previewDetailOptions = config.kind === 'customer'
    ? [
        { label: 'None' },
        { label: 'All fields', id: 'c1' },
        { label: 'Required only', id: 'c4' },
        { label: 'Notes', id: 'c9' },
        { label: 'Empty history', id: 'c10' },
      ]
    : [
        { label: 'None' },
        { label: 'Active', id: 'm1' },
        { label: 'Inactive', id: 'm4' },
        { label: 'Empty history', id: 'm5' },
      ];

  const listModes: { value: ListMode; label: string }[] = [
    { value: 'data', label: 'Data' },
    { value: 'loading', label: 'Loading' },
    { value: 'error', label: 'Error' },
  ];

  const isCustomer = config.kind === 'customer';
  const isManufacturer = config.kind === 'manufacturer';

  return (
    <main className="min-h-screen bg-[#EDF1FA]">
      <div className="flex gap-6 pt-8 pb-8 px-8 h-screen">
        <aside className={`${listClasses} h-full`}>
          <div className="h-full">
            <RecordListPanel
              config={config}
              records={records}
              selectedId={selectedId}
              onSelect={select}
              onCollapse={() => {
                setCollapsed(true);
                setMobileView('detail');
              }}
              onAdd={addRecord}
              mode={listMode}
              onResetError={() => setListMode('data')}
            />
          </div>
        </aside>

        <section className={`${detailClasses} h-full`}>
          {activeRecord ? (
            isCustomer ? (
              <CustomerDetailPane
                key={activeRecord.id}
                record={activeRecord}
                showExpand={collapsed}
                onExpand={() => {
                  setCollapsed(false);
                  setMobileView('list');
                }}
                onBack={() => setMobileView('list')}
                onEdit={() => setDialog({ type: 'edit', record: activeRecord })}
                onRemove={() => setDialog({ type: 'delete', record: activeRecord })}
              />
            ) : isManufacturer ? (
              <ManufacturerDetailPane
                key={activeRecord.id}
                record={activeRecord}
                showExpand={collapsed}
                onExpand={() => {
                  setCollapsed(false);
                  setMobileView('list');
                }}
                onBack={() => setMobileView('list')}
                onEdit={() => setDialog({ type: 'edit', record: activeRecord })}
                onRemove={() => setDialog({ type: 'delete', record: activeRecord })}
              />
            ) : (
              <RecordDetailPane
                key={activeRecord.id}
                config={config}
                record={activeRecord}
                showExpand={collapsed}
                onExpand={() => {
                  setCollapsed(false);
                  setMobileView('list');
                }}
                onBack={() => setMobileView('list')}
                onEdit={() => setDialog({ type: 'edit', record: activeRecord })}
                onToggleActive={() => {
                  if (activeRecord.active === false) {
                    applyToggle(false);
                  } else {
                    setDialog({ type: 'inactive', record: activeRecord });
                  }
                }}
                onDelete={() => setDialog({ type: 'delete', record: activeRecord })}
              />
            )
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-[13px] text-[#5D6C8A]">
                Choose a record to see it here.
              </p>
            </div>
          )}
        </section>
      </div>

      {isCustomer ? (
        <CustomerDialog
          open={dialog?.type === 'add' || dialog?.type === 'edit'}
          record={dialog?.type === 'edit' ? dialog.record : null}
          onClose={() => setDialog(null)}
          onSave={saveRecord}
        />
      ) : isManufacturer ? (
        <ManufacturerDialog
          open={dialog?.type === 'add' || dialog?.type === 'edit'}
          record={dialog?.type === 'edit' ? dialog.record : null}
          onClose={() => setDialog(null)}
          onSave={saveRecord}
        />
      ) : (
        <RecordDialog
          open={dialog?.type === 'add' || dialog?.type === 'edit'}
          config={config}
          record={dialog?.type === 'edit' ? dialog.record : null}
          hasSharedRequest={hasSharedForEdit()}
          onClose={() => setDialog(null)}
          onSave={saveRecord}
        />
      )}

      {isCustomer ? (
        <CustomerRemoveDialog
          open={dialog?.type === 'delete'}
          record={dialog?.type === 'delete' ? dialog.record : (activeRecord as RecordItem)}
          onClose={() => setDialog(null)}
          onConfirm={deletePermanent}
        />
      ) : isManufacturer ? (
        <ManufacturerRemoveDialog
          open={dialog?.type === 'delete'}
          record={dialog?.type === 'delete' ? dialog.record : (activeRecord as RecordItem)}
          onClose={() => setDialog(null)}
          onConfirm={deletePermanent}
        />
      ) : (
        <RecordDeleteDialog
          open={dialog?.type === 'delete'}
          config={config}
          record={dialog?.type === 'delete' ? dialog.record : (activeRecord as RecordItem)}
          onClose={() => setDialog(null)}
          onConfirmPermanent={deletePermanent}
          onMakeInactive={() => {
            if (dialog?.type === 'delete' && dialog.record) {
              setRecords((prev) =>
                prev.map((r) => (r.id === dialog.record.id ? { ...r, active: false } : r))
              );
            }
            setDialog(null);
          }}
        />
      )}

      <DeactivateDialog
        open={dialog?.type === 'inactive'}
        record={dialog?.type === 'inactive' ? dialog.record : (activeRecord as RecordItem)}
        onClose={() => setDialog(null)}
        onConfirm={() => {
          if (dialog?.type === 'inactive' && dialog.record) {
            setRecords((prev) =>
              prev.map((r) => (r.id === dialog.record.id ? { ...r, active: false } : r))
            );
          }
          setDialog(null);
        }}
      />

      <StateSwitcherPanel
        title="Preview state"
        icon="ri-contacts-book-line"
        hint="Toggle the list and detail panels"
        groups={[
          { label: 'List', options: [...listModes.map((m) => ({ value: m.value, label: m.label })), { value: 'collapsed', label: 'Collapse' }] },
          {
            label: 'Detail',
            options: previewDetailOptions.map((o) => ({ value: o.id ?? 'none', label: o.label })),
          },
        ]}
        active={(v) =>
          listMode === (v as ListMode) ||
          (v === 'collapsed' && collapsed) ||
          (previewDetailOptions.find((x) => (x.id ?? 'none') === v)?.id ?? null) === selectedId
        }
        onSelect={(v) => {
          if (v === 'collapsed') {
            setCollapsed((c) => !c);
          } else if (listModes.some((m) => m.value === v)) {
            setListMode(v as ListMode);
          } else {
            const o = previewDetailOptions.find((x) => (x.id ?? 'none') === v);
            setSelectedId(o?.id ?? null);
            setMobileView('detail');
          }
        }}
      />
    </main>
  );
}