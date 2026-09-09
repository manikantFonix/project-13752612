import Sidebar from '../../components/Sidebar';
import RecordsWorkspace from '../../components/records/RecordsWorkspace';
import { CUSTOMER_CONFIG } from '../../components/records/data';

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-[#EDF1FA]">
      <Sidebar />
      <div className="pl-[116px] min-h-screen bg-[#EDF1FA]">
        <RecordsWorkspace config={CUSTOMER_CONFIG} />
      </div>
    </div>
  );
}