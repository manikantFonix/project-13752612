'use client';

import { useEffect, useState } from 'react';
import { FOCUS_RING, getRequest } from './data';
import RequestListPanel, { type ListMode } from './RequestListPanel';
import RequestDetailPane from './RequestDetailPane';
import { setDemoVisible } from '../../lib/demoVisibility';
import { useDemoVisible } from './useDemoVisible';
import DemoShortcut from './DemoShortcut';
import FloatingPanel from './FloatingPanel';

const listModes: { value: ListMode; label: string }[] = [
  { value: 'data', label: 'Data' },
  { value: 'loading', label: 'Loading' },
  { value: 'error', label: 'Error' },
];

const detailModes: { label: string; id?: string }[] = [
  { label: 'None' },
  { label: 'Draft', id: 'r1' },
  { label: 'Rejected draft', id: 'r2' },
  { label: 'Ready', id: 'r4' },
  { label: 'Sent to customer', id: 'r5' },
  { label: 'Approved by link', id: 'r7' },
  { label: 'Approved on behalf', id: 'r8' },
  { label: 'Routed', id: 'r8' },
  { label: 'Quote received', id: 'r9' },
  { label: 'In production', id: 'r12' },
  { label: 'Completed', id: 'r10' },
  { label: 'Cancelled', id: 'r11' },
];

export default function RequestsWorkspace({ selectedId }: { selectedId?: string }) {
  const [selected, setSelected] = useState<string | null>(selectedId ?? null);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const [listMode, setListMode] = useState<ListMode>('data');
  const visible = useDemoVisible();

  useEffect(() => {
    if (selectedId) setSelected(selectedId);
  }, [selectedId]);

  useEffect(() => {
    const stored = sessionStorage.getItem('requests:collapsed');
    if (stored === '1') setCollapsed(true);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('requests:collapsed', collapsed ? '1' : '0');
  }, [collapsed]);

  const select = (id: string) => {
    setSelected(id);
    setMobileView('detail');
  };

  const listClasses = collapsed
    ? 'hidden'
    : `w-[320px] shrink-0 ${mobileView === 'list' ? 'block' : 'hidden lg:block'}`;
  const detailClasses = `flex-1 min-w-0 ${
    mobileView === 'detail' ? 'block' : 'hidden lg:block'
  }`;

  return (
    <main className="min-h-screen bg-[#EDF1FA]">
      <div className="flex gap-6 pt-8 pb-8 px-8 h-screen">
        <aside className={`${listClasses} h-full`}>
          <div className="h-full">
            <RequestListPanel
              mode={listMode}
              selectedId={selected}
              onSelect={select}
              onCollapse={() => {
                setCollapsed(true);
                setMobileView('detail');
              }}
            />
          </div>
        </aside>

        <section className={`${detailClasses} h-full`}>
          {selected ? (
            <RequestDetailPane
              key={selected}
              req={getRequest(selected)!}
              showExpand={collapsed}
              onExpand={() => {
                setCollapsed(false);
                setMobileView('list');
              }}
              onBack={() => setMobileView('list')}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-[13px] text-[#5D6C8A]">
                Choose a request to see it here.
              </p>
            </div>
          )}
        </section>
      </div>

      <DemoShortcut />

      <FloatingPanel
        title="Preview"
        icon="ri-layout-3-line"
        hint="Ctrl+Alt+P"
        position="right"
      >
        <span className="px-1.5 pt-1 text-[11px] font-medium tracking-wide text-[#5D6C8A]">
          List
        </span>
        <div className="flex flex-wrap gap-1.5 px-1.5">
          {listModes.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setListMode(m.value)}
              className={`h-7 px-2.5 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
                listMode === m.value
                  ? 'bg-[#152E56] text-white'
                  : 'text-[#5D6C8A] hover:bg-[#EDF1FA]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <span className="px-1.5 pt-2 text-[11px] font-medium tracking-wide text-[#5D6C8A]">
          Detail
        </span>
        <div className="flex flex-wrap gap-1.5 px-1.5">
          {detailModes.map((m) => (
            <button
              key={m.label}
              type="button"
              onClick={() => setSelected(m.id ?? null)}
              className={`h-7 px-2.5 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${FOCUS_RING} ${
                (m.id ?? null) === selected
                  ? 'bg-[#152E56] text-white'
                  : 'text-[#5D6C8A] hover:bg-[#EDF1FA]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </FloatingPanel>

      {!visible && (
        <button
          type="button"
          onClick={() => setDemoVisible(true)}
          title="Show preview controls (Ctrl+Alt+P)"
          aria-label="Show preview controls"
          className={`fixed bottom-6 right-6 z-40 h-8 px-3 rounded-full bg-white border border-[#DCE3F0] text-[13px] font-medium text-[#5D6C8A] hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
        >
          <i className="ri-eye-line text-[16px] mr-1.5 align-middle" />
          Preview
        </button>
      )}
    </main>
  );
}