import Sidebar from '../../components/Sidebar';
import AnalyticsRoute from '../../components/analytics/AnalyticsRoute';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#EDF1FA]">
      <Sidebar />
      <div className="pl-[116px]">
        <AnalyticsRoute />
      </div>
    </div>
  );
}