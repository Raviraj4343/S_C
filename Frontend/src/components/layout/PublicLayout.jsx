import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";
import Footer from "./Footer";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
  { to: "/admin/login", label: "Admin" }
];

const PublicLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div>
      <header className="section-shell pt-6">
        <div className="glass-card flex items-center justify-between rounded-2xl px-4 py-3">
          <p className="font-display text-lg font-extrabold text-foreground">She Can Foundation</p>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-edge bg-card text-foreground transition hover:bg-slate-200/60 dark:hover:bg-slate-800/70"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </header>

      {menuOpen ? <button className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]" onClick={() => setMenuOpen(false)} aria-label="Close menu overlay" /> : null}

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-80 border-l border-edge bg-slate-950/95 p-5 shadow-2xl backdrop-blur-xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-500">Navigation</p>
            <p className="font-display text-2xl font-extrabold text-white">Menu</p>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-200"
          >
            <FiX />
          </button>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
          <nav className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    isActive ? "bg-cyan-700 text-white" : "text-slate-200 hover:bg-slate-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Appearance</p>
          <ThemeToggle />
        </div>

        <div className="mt-6 text-xs text-slate-500">She Can Foundation Community Platform</div>
      </aside>

      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
