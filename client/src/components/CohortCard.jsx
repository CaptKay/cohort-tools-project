import { Link } from "react-router-dom";

function CohortCard({ _id, program, inProgress, campus, cohortName, cohortSlug }) {
  return (
    <Link to={`/cohorts/details/${_id}`} className="group">
      <article className="hover-card relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/60 p-5 shadow-inner shadow-slate-950/40 transition">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-sky-500 via-indigo-500 to-purple-500 opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="flex flex-col gap-4 md:grid md:grid-cols-[2fr,1.2fr,1.2fr,1fr,1.2fr] md:items-center">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">{cohortName}</h3>
          </div>

          <p className="text-sm text-slate-200/80 md:text-center">{program}</p>

          <p className="text-sm text-slate-300 md:text-center">{campus}</p>

          <div className="md:text-center">
            <span className={`badge ${inProgress ? "badge-success" : "badge-neutral"}`}>
              {inProgress ? "In Progress" : "Planned"}
            </span>
          </div>

          <p className="text-sm font-mono text-slate-400 md:text-right">{cohortSlug}</p>
        </div>
      </article>
    </Link>
  );
}

export default CohortCard;
