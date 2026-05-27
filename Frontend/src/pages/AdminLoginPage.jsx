import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/common/Spinner";
import ThemeToggle from "../components/common/ThemeToggle";
import { adminLogin } from "../services/formService";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await adminLogin(form);
      localStorage.setItem("shecan_admin_token", response.data.token);
      toast.success("Admin login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section-shell min-h-screen py-14">
      <div className="mb-6 flex justify-end"><ThemeToggle /></div>
      <form onSubmit={onSubmit} className="glass-card mx-auto max-w-lg space-y-4 rounded-3xl p-8 shadow-premium">
        <h1 className="font-display text-3xl font-extrabold text-foreground">Admin Login</h1>
        <p className="text-sm text-muted">Use admin credentials from backend environment setup.</p>
        <input required type="email" placeholder="Admin email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-edge bg-card px-4 py-3 text-foreground" />
        <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border border-edge bg-card px-4 py-3 text-foreground" />
        <button disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white dark:bg-cyan-700">
          {loading ? <Spinner /> : "Login"}
        </button>
      </form>
    </main>
  );
};

export default AdminLoginPage;
