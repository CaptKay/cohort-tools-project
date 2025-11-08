import { Link } from "react-router-dom";

function CohortFilterBar({
  campusQuery,
  setCampusQuery,
  programQuery,
  setProgramQuery,
  handleChange,
}) {
  return (
    <section className="glass-card gradient-border fade-in shadow-ring px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Filters</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-100">Refine your cohort insights</h2>
        </div>

        <Link to="/cohorts/create" className="ml-auto inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-900/40 transition hover:-translate-y-0.5 hover:shadow-xl">
          + New Cohort
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Campus</span>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-800/60 bg-slate-900/60 px-4 py-2 text-sm shadow-inner shadow-slate-950/40">
            <span className="text-lg">🏙️</span>
            <select
              name="campus"
              id="campus"
              value={campusQuery}
              onChange={(e) => handleChange(e, setCampusQuery)}
              className="flex-1 bg-transparent text-slate-100 focus:outline-none"
            >
              <option value="">All</option>
              <option value="Madrid">Madrid</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Miami">Miami</option>
              <option value="Paris">Paris</option>
              <option value="Berlin">Berlin</option>
              <option value="Amsterdam">Amsterdam</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Program</span>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-800/60 bg-slate-900/60 px-4 py-2 text-sm shadow-inner shadow-slate-950/40">
            <span className="text-lg">📚</span>
            <select
              name="program"
              id="program"
              value={programQuery}
              onChange={(e) => handleChange(e, setProgramQuery)}
              className="flex-1 bg-transparent text-slate-100 focus:outline-none"
            >
              <option value="">All</option>
              <option value="Web Dev">Web Development</option>
              <option value="UX/UI">UX/UI</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div>
        </label>

        <div className="flex items-center justify-center rounded-2xl border border-slate-800/60 bg-slate-900/50 px-4 py-4 text-sm text-slate-300 shadow-inner shadow-slate-950/40">
          <span className="text-center leading-relaxed">
            Tip: Combine campus and program filters to hone in on the cohorts that matter most.
          </span>
        </div>
      </div>
    </section>
  );
}

export default CohortFilterBar;
