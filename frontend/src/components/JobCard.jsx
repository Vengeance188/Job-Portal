import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Bookmark } from "lucide-react";

function JobCard({
  job,
  initiallySaved,
  onSaveChange
}) {

  const companyName = job.company?.name || "Company";

  const companyLogo = companyName
    .charAt(0)
    .toUpperCase();

  const skills = job.skills
    ? job.skills
        .split(",")
        .map((skill) => skill.trim())
    : [];

  const [saved, setSaved] = useState(initiallySaved);
  const [saving, setSaving] = useState(false);


  // Keep bookmark state synchronized
  // with the saved status received from the parent
  useEffect(() => {

    setSaved(initiallySaved);

  }, [initiallySaved]);


  // Save / Unsave job
  const handleSave = async (e) => {

    // Prevent the Link from opening JobDetails
    e.preventDefault();
    e.stopPropagation();

    // Prevent multiple clicks
    if (saving) {
      return;
    }

    try {

      setSaving(true);

      // --------------------------------
      // UNSAVE JOB
      // --------------------------------
      if (saved) {

        await api.delete(
          `/api/candidate/saved-jobs/${job.id}`
        );

        setSaved(false);

        // Update savedJobIds in Jobs.jsx
        if (onSaveChange) {

          onSaveChange(job.id, false);

        }

      }

      // --------------------------------
      // SAVE JOB
      // --------------------------------
      else {

        await api.post(
          `/api/candidate/saved-jobs/${job.id}`
        );

        setSaved(true);

        // Update savedJobIds in Jobs.jsx
        if (onSaveChange) {

          onSaveChange(job.id, true);

        }

      }

    } catch (error) {

      console.error(
        "Error saving job:",
        error
      );

    } finally {

      setSaving(false);

    }
  };


  return (

    <Link
      to={`/jobs/${job.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >

      {/* Top Section */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          {/* Company Logo */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">

            {companyLogo}

          </div>


          {/* Company Name */}
          <div>

            <h3 className="font-semibold text-slate-900">

              {companyName}

            </h3>

            <p className="mt-1 text-xs text-slate-400">

              Verified company

            </p>

          </div>

        </div>


        {/* Arrow */}
        <span className="text-lg text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">

          ↗

        </span>

      </div>


      {/* Job Title */}
      <div className="mt-6">

        <h2 className="text-lg font-bold text-slate-900">

          {job.title}

        </h2>

      </div>


      {/* Job Information */}
      <div className="mt-4 space-y-2 text-sm text-slate-500">

        <p className="flex items-center gap-2">

          <span>📍</span>

          {job.location}

        </p>


        <p className="flex items-center gap-2">

          <span>💼</span>

          {job.jobType}

        </p>


        <p className="flex items-center gap-2">

          <span>💰</span>

          {job.salary}

        </p>


        <p className="flex items-center gap-2">

          <span>🎓</span>

          {job.experience}

        </p>

      </div>


      {/* Skills */}
      <div className="mt-5 flex flex-wrap gap-2">

        {skills.map((skill) => (

          <span
            key={skill}
            className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600"
          >

            {skill}

          </span>

        ))}

      </div>


      {/* Bottom Section */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">

        {/* Posted Date */}
        <span className="text-xs text-slate-400">

          {job.postedDate
            ? new Date(
                job.postedDate
              ).toLocaleDateString()
            : "Recently posted"}

        </span>


        <div className="flex items-center gap-4">

          {/* Save / Unsave Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-1.5 text-sm font-semibold transition ${
              saved
                ? "text-blue-600"
                : "text-slate-500 hover:text-blue-600"
            }`}
          >

            <Bookmark
              size={18}
              strokeWidth={2}
              fill={
                saved
                  ? "currentColor"
                  : "none"
              }
            />

            {saving
              ? "Saving..."
              : saved
              ? "Saved"
              : "Save"}

          </button>


          {/* View Details */}
          <span className="text-sm font-semibold text-blue-600">

            View Details →

          </span>

        </div>

      </div>

    </Link>
  );
}

export default JobCard;