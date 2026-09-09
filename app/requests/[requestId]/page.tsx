import { notFound } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import RequestsWorkspace from '../../../components/requests/RequestsWorkspace';

const KNOWN_IDS = [
  'new-request',
  'r1',
  'r2',
  'r3',
  'r4',
  'r5',
  'r6',
  'r7',
  'r8',
  'r9',
  'r10',
  'r11',
  'r12',
];

export function generateStaticParams() {
  return KNOWN_IDS.map((requestId) => ({ requestId }));
}

export const dynamicParams = false;

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = await params;
  if (!KNOWN_IDS.includes(requestId)) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-[#EDF1FA]">
      <Sidebar />
      <div className="pl-[116px] min-h-screen bg-[#EDF1FA]">
        <RequestsWorkspace selectedId={requestId} />
      </div>
    </div>
  );
}