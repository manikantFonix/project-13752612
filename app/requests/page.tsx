import Sidebar from '../../components/Sidebar';
import RequestsWorkspace from '../../components/requests/RequestsWorkspace';

export default function RequestsPage() {
  return (
    <div className="min-h-screen bg-[#EDF1FA]">
      <Sidebar />
      <div className="pl-[116px] min-h-screen bg-[#EDF1FA]">
        <RequestsWorkspace />
      </div>
    </div>
  );
}