import { notFound } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import LeadDetailRoute from '../../../components/leads/LeadDetailRoute';

const KNOWN_IDS = [
  'c-1001',
  'c-1002',
  'c-1003',
  'c-1004',
  'c-1005',
  'c-1006',
  'c-1007',
  'w-2001',
  'w-2002',
  'w-2003',
  'w-2004',
];

export function generateStaticParams() {
  return KNOWN_IDS.map((leadId) => ({ leadId }));
}

export const dynamicParams = false;

export default function LeadDetailPage({
  params,
}: {
  params: { leadId: string };
}) {
  if (!KNOWN_IDS.includes(params.leadId)) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-[#EDF1FA]">
      <Sidebar />
      <div className="pl-[116px] min-h-screen bg-[#EDF1FA]">
        <LeadDetailRoute leadId={params.leadId} />
      </div>
    </div>
  );
}