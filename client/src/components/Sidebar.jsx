import { Link, useLocation } from "react-router-dom";

const navigationLinks = [
  { to: "/dashboard", label: "Cohorts", icon: "🎓" },
  { to: "/students", label: "Students", icon: "👥" },
  { to: "/profile", label: "Profile", icon: "💼" },
];

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <aside
      className={`sidebar-surface fixed inset-y-0 left-0 z-40 flex w-72 -translate-x-full flex-col border-r border-slate-800/60 px-6 pb-10 pt-28 shadow-xl transition-transform duration-500 ease-out lg:static lg:translate-x-0 lg:pt-24 ${
        isOpen ? "translate-x-0" : ""
      }`}
    >
      <div className="hidden lg:block">
        <p className="text-xs uppercase tracking-[0.45em] text-slate-500">Navigation</p>
      </div>

      <nav className="mt-8 space-y-2">
        {navigationLinks.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-transparent text-white"
                  : "text-slate-300 hover:text-white"
              }`}
              onClick={onClose}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 text-lg shadow-inner shadow-slate-950/60">
                {item.icon}
              </span>
              <span>{item.label}</span>
              {isActive && (
                <span className="absolute inset-y-1 right-2 w-[3px] rounded-full bg-gradient-to-b from-sky-500 via-indigo-500 to-purple-500" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="glass-card glass-card--accent gradient-border p-5 text-sm leading-relaxed text-slate-100">
          <p className="font-semibold">Need a break?</p>
          <p className="mt-1 text-slate-300">
            Switch between cohorts and student data effortlessly. Stay focused with a calm, modern workspace.
          </p>
        </div>
      </div>

      <button
        className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/70 text-slate-300 transition hover:text-white lg:hidden"
        onClick={onClose}
        aria-label="Close navigation"
      >
        ×
      </button>
    </aside>
  );
}

export default Sidebar;
