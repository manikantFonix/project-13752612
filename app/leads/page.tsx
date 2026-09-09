import Sidebar from '../../components/Sidebar';
import LeadInbox from '../../components/leads/LeadInbox';

export default function LeadsPage() {
  return (
    <div className="min-h-screen bg-[#EDF1FA]">
      <Sidebar />
      <div className="pl-[116px] min-h-screen bg-[#EDF1FA]">
        <LeadInbox />
      </div>
    </div>
  );
}