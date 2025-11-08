import { useState, useEffect } from "react";
import axios from "axios";

import StudentCard from "../components/StudentCard";

const API_URL = import.meta.env.VITE_API_URL;

function StudentListPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/students?$`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="StudentListPage space-y-8">
      <section className="glass-card gradient-border fade-in shadow-ring px-4 py-6 sm:px-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Students</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">People powering each cohort</h2>
            <p className="text-sm text-slate-400">Keep tabs on every learner’s journey with updated contact details and programs.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-800/60 bg-slate-900/60 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-400">
            Total
            <span className="rounded-full bg-slate-800/80 px-2 py-1 text-sm font-semibold text-slate-100">{students.length}</span>
          </div>
        </div>

        <div className="hidden rounded-2xl border border-slate-800/50 bg-slate-900/50 px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.4em] text-slate-500 md:grid md:grid-cols-[1.2fr,1.5fr,1.2fr,1.5fr,1.2fr]">
          <span>Student</span>
          <span>Name</span>
          <span>Program</span>
          <span>Email</span>
          <span>Phone</span>
        </div>

        <div className="mt-4 grid gap-3">
          {students && students.length > 0 ? (
            students.map((student) => <StudentCard key={student._id} {...student} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/40 px-6 py-10 text-center text-slate-400">
              No students found. Once learners join, they will appear here.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentListPage;
