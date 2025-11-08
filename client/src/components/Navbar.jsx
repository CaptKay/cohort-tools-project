import logo from "./../assets/logo-ironhack-blue.png";
import { Link, useLocation } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar({ toggleSidebar, isSidebarOpen }) {
  const location = useLocation();
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const pageTitle = useMemo(() => {
    const routes = {
      "/dashboard": "Cohort Overview",
      "/students": "Student Directory",
      "/cohorts/create": "Create Cohort",
      "/profile": "Profile",
      "/login": "Log In",
      "/signup": "Create Account",
    };

    const dynamicRoutes = [
      { pattern: /^\/cohorts\/details\//, label: "Cohort Details" },
      { pattern: /^\/cohorts\/edit\//, label: "Edit Cohort" },
      { pattern: /^\/students\/details\//, label: "Student Details" },
      { pattern: /^\/students\/edit\//, label: "Edit Student" },
    ];

    if (routes[location.pathname]) {
      return routes[location.pathname];
    }

    const matched = dynamicRoutes.find((route) => route.pattern.test(location.pathname));
    return matched ? matched.label : "Dashboard";
  }, [location.pathname]);

  return (
    <nav className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="nav-blur gradient-border relative flex items-center justify-between gap-4 rounded-3xl px-4 py-4 sm:px-6">
          <div className="flex flex-1 items-center gap-4">
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-900/80 text-slate-200 shadow-inner shadow-slate-950/40 transition hover:-translate-y-0.5 hover:border-slate-500 hover:text-white"
              onClick={toggleSidebar}
              aria-label="Toggle navigation"
            >
              <span className="text-xl">{isSidebarOpen ? "×" : "☰"}</span>
            </button>

            <div className="hidden sm:flex sm:flex-col">
              <span className="text-xs uppercase tracking-[0.4em] text-slate-400">{pageTitle}</span>
              <span className="mt-1 text-lg font-semibold text-slate-100">Cohort Tools</span>
            </div>
          </div>

          <Link to="/dashboard" className="flex shrink-0 items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500/80 via-blue-500/80 to-indigo-500/80 p-2 shadow-lg shadow-sky-900/40">
              <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
            </div>
            <span className="text-base font-medium text-slate-200 sm:hidden">Cohort Tools</span>
          </Link>

          <div className="flex flex-1 items-center justify-end gap-3">
            {isLoggedIn ? (
              <button
                onClick={logOutUser}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-900/40 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span>Log Out</span>
              </button>
            ) : (
              <Link to="/login">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-600/60 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-400 hover:text-white">
                  Log In
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
