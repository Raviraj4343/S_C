import { useOutletContext } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";

const volunteerColumns = [
  { key: "fullName", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" }
];

const AdminVolunteersPage = () => {
  const { volunteers, loading, onDeleteVolunteer } = useOutletContext();

  return (
    <section>
      <h2 className="mb-3 font-display text-xl font-bold text-foreground">Volunteers</h2>
      <DataTable columns={volunteerColumns} rows={volunteers} loading={loading} onDelete={onDeleteVolunteer} emptyText="No volunteers found" />
    </section>
  );
};

export default AdminVolunteersPage;
