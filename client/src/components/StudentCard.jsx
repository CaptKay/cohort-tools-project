import { Link } from "react-router-dom";
import placeholderImage from "../assets/profile-icon.png";

function StudentCard({
  _id: studentId,
  firstName,
  lastName,
  email,
  phone,
  program,
  image,
}) {
  return (
    <Link to={`/students/details/${studentId}`} className="group">
      <article className="hover-card relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/60 p-5 shadow-inner shadow-slate-950/40 transition">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-purple-500 via-indigo-500 to-sky-500 opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="flex flex-col gap-4 md:grid md:grid-cols-[1.2fr,1.5fr,1.2fr,1.5fr,1.2fr] md:items-center">
          <div className="flex items-center gap-3 md:justify-start">
            <div className="gradient-border relative rounded-2xl p-[2px]">
              <img
                src={image || placeholderImage}
                alt={`${firstName} ${lastName}`}
                className="h-12 w-12 rounded-2xl object-cover"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = placeholderImage;
                }}
              />
            </div>
          </div>

          <p className="text-sm font-medium text-slate-100 md:text-left">
            {firstName} {lastName}
          </p>

          <p className="text-sm text-slate-300 md:text-center">{program}</p>

          <p className="text-sm text-slate-300 md:text-left">{email}</p>

          <p className="text-sm text-slate-300 md:text-right">{phone}</p>
        </div>
      </article>
    </Link>
  );
}

export default StudentCard;
