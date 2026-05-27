import { useOutletContext } from "react-router-dom";
import AnalyticsCard from "../../components/admin/AnalyticsCard";

const AdminOverviewPage = () => {
  const { summary } = useOutletContext();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnalyticsCard label="Total Volunteers" value={summary?.volunteerCount ?? "-"} />
      <AnalyticsCard label="Total Contacts" value={summary?.contactCount ?? "-"} />
      <AnalyticsCard label="Gallery Images" value={summary?.galleryCount ?? "-"} />
    </div>
  );
};

export default AdminOverviewPage;
