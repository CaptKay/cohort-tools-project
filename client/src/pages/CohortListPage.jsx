import { useState, useEffect } from "react";
import axios from "axios";
import CohortFilterBar from "../components/CohortFilterBar";
import CohortCard from "../components/CohortCard";

const API_URL = import.meta.env.VITE_API_URL;

function CohortListPage() {
  const [cohorts, setCohorts] = useState([]);
  const [campusQuery, setCampusQuery] = useState("");
  const [programQuery, setProgramQuery] = useState("");

  const handleChange = (event, updateState) => {
    updateState(event.target.value);
  };

  useEffect(() => {
    let queryString = "";
    if (campusQuery) queryString += `campus=${campusQuery}&`;
    if (programQuery) queryString += `program=${programQuery}`;

    axios
      .get(`${API_URL}/api/cohorts?${queryString}`)
      .then((response) => {
        setCohorts(response.data);
      })
      .catch((error) => console.log(error));
  }, [campusQuery, programQuery]);

  const getAllCohorts = () => {
    axios
      .get(`${API_URL}/api/cohorts`)
      .then((response) => {
        setCohorts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCohorts();
  }, []);

  return (
    <div className="CohortListPage space-y-8">
      <CohortFilterBar
        campusQuery={campusQuery}
        setCampusQuery={setCampusQuery}
        programQuery={programQuery}
        setProgramQuery={setProgramQuery}
        handleChange={handleChange}
      />

      <section className="glass-card gradient-border fade-in shadow-ring px-4 py-6 sm:px-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Cohorts</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">Active learning journeys</h2>
            <p className="text-sm text-slate-400">Review cohort performance at a glance with modern, legible summaries.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-800/60 bg-slate-900/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-400">
            Total
            <span className="rounded-full bg-slate-800/80 px-2 py-1 text-sm font-semibold text-slate-100">
              {cohorts.length}
            </span>
          </div>
        </div>

        <div className="hidden rounded-2xl border border-slate-800/50 bg-slate-900/50 px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 md:grid md:grid-cols-[2fr,1.2fr,1.2fr,1fr,1.2fr]">
          <span>Cohort</span>
          <span>Program</span>
          <span>Campus</span>
          <span>Status</span>
          <span>Identifier</span>
        </div>

        <div className="mt-4 grid gap-3">
          {cohorts && cohorts.length > 0 ? (
            cohorts.map((cohort) => <CohortCard key={cohort._id} {...cohort} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/40 px-6 py-10 text-center text-slate-400">
              No cohorts found. Try adjusting the filters to broaden your results.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CohortListPage;
