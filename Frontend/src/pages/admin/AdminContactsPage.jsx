import { useOutletContext } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";

const contactColumns = [
  { key: "fullName", label: "Name" },
  { key: "email", label: "Email" },
  { key: "subject", label: "Subject" }
];

const AdminContactsPage = () => {
  const { contacts, loading, onDeleteContact } = useOutletContext();

  return (
    <section>
      <h2 className="mb-3 font-display text-xl font-bold text-foreground">Contact Messages</h2>
      <DataTable columns={contactColumns} rows={contacts} loading={loading} onDelete={onDeleteContact} emptyText="No contact messages found" />
    </section>
  );
};

export default AdminContactsPage;
