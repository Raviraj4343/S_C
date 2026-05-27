import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SkeletonRow from "../components/common/SkeletonRow";
import {
  fetchDashboardSummary,
  fetchAdminVolunteers,
  fetchAdminContacts,
  fetchAdminGalleryImages,
  removeVolunteer,
  removeContact
} from "../services/formService";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadData = async (searchText = "") => {
    setLoading(true);
    try {
      const [summaryRes, volRes, contactRes, galleryRes] = await Promise.all([
        fetchDashboardSummary(),
        fetchAdminVolunteers(searchText),
        fetchAdminContacts(searchText),
        fetchAdminGalleryImages()
      ]);
      setSummary(summaryRes.data);
      setVolunteers(volRes.data);
      setContacts(contactRes.data);
      setGalleryImages(galleryRes.data);
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("shecan_admin_token");
        navigate("/admin/login");
      }
      toast.error("Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onDeleteVolunteer = async (id) => {
    await removeVolunteer(id);
    toast.success("Volunteer deleted");
    loadData(search);
  };

  const onDeleteContact = async (id) => {
    await removeContact(id);
    toast.success("Contact deleted");
    loadData(search);
  };

  return (
    <div className="space-y-5">
      <div className="glass-card flex gap-3 rounded-2xl p-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search volunteers or contacts"
          className="w-full rounded-xl border border-edge bg-card px-4 py-3 text-foreground"
        />
        <button onClick={() => loadData(search)} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white dark:bg-cyan-700">
          Search
        </button>
      </div>

      {loading ? (
        <div className="space-y-3"><SkeletonRow /><SkeletonRow /><SkeletonRow /></div>
      ) : (
        <Outlet context={{ summary, volunteers, contacts, galleryImages, loading, onDeleteVolunteer, onDeleteContact, refreshAll: () => loadData(search) }} />
      )}
    </div>
  );
};

export default AdminDashboardPage;
