import { FiBarChart2, FiUsers, FiMail, FiImage, FiLogOut } from "react-icons/fi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ThemeToggle from "../../common/ThemeToggle";

const navItems = [
  { to: "/admin/dashboard", label: "Overview", icon: FiBarChart2 },
  { to: "/admin/dashboard/volunteers", label: "Volunteers", icon: FiUsers },
  { to: "/admin/dashboard/contacts", label: "Contacts", icon: FiMail },
  { to: "/admin/dashboard/gallery", label: "Gallery", icon: FiImage }
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("shecan_admin_token");
    navigate("/admin/login");
  };

  return (
    <main className="section-shell min-h-screen py-8">
      <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
        <aside className="glass-card h-fit rounded-2xl p-5 shadow-premium">
          <h2 className="px-2 font-display text-2xl font-extrabold text-foreground">She Can Admin</h2>
          <p className="px-2 pt-1 text-xs uppercase tracking-[0.18em] text-cyan-700">Operations Console</p>
          <nav className="mt-5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                      isActive ? "bg-cyan-700 text-white" : "text-foreground hover:bg-slate-200/60 dark:hover:bg-slate-800/70"
                    }`
                  }
                >
                  <Icon /> {item.label}
                </NavLink>
              );
            })}
          </nav>
          <button onClick={onLogout} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-edge px-3 py-2.5 text-sm font-semibold text-foreground">
            <FiLogOut /> Logout
          </button>
        </aside>

        <section className="space-y-5">
          <header className="glass-card flex flex-wrap items-center justify-between gap-3 rounded-2xl p-5 shadow-premium">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">Admin Panel</p>
              <h1 className="font-display text-3xl font-extrabold text-foreground">Dashboard Workspace</h1>
            </div>
            <ThemeToggle />
          </header>
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default AdminLayout;
