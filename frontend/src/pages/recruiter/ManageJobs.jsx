import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import RecruiterNavbar from "../../components/RecruiterNavbar";
import api from "../../services/api";

function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Fetch Recruiter's Jobs
  // =========================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/jobs/my-jobs");

        setJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your jobs."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // =========================
  // Format Job Type
  // =========================
  const formatType = (type) => {
    if (!type) return "N/A";

    return type.replaceAll("_", " ");
  };

  // =========================
  // Format Posted Date
  // =========================
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // Delete Job
  // =========================
  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/api/jobs/${id}`);

      // Remove deleted job from UI
      setJobs((previousJobs) =>
        previousJobs.filter((job) => job.id !== id)
      );

    } catch (error) {
      console.error("Failed to delete job:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete job."
      );
    }
  };

  // =========================
  // Loading Screen
  // =========================
  if (loading) {
    return (
      <>
        <RecruiterNavbar />

        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

            <p className="mt-4 text-sm font-medium text-slate-600">
              Loading your jobs...
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // =========================
  // Error Screen
  // =========================
  if (error) {
    return (
      <>
        <RecruiterNavbar />

        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">

            <h2 className="text-xl font-bold text-red-600">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>

          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <RecruiterNavbar />

      <main className="min-h-screen bg-slate-50">

        {/* =========================
            Header
        ========================= */}
        <section className="bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

            <p className="text-sm font-medium text-blue-400">
              Recruiter Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Manage Jobs
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your job postings and track applicants.
            </p>

          </div>
        </section>

        {/* =========================
            Content
        ========================= */}
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

          {/* Top Bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Your Job Postings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage all jobs posted by your company.
              </p>

            </div>

            <Link
              to="/recruiter/post-job"
              className="w-fit rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              + Post New Job
            </Link>

          </div>

          {/* =========================
              Job Cards
          ========================= */}
          {jobs.length > 0 && (
            <div className="space-y-5">

              {jobs.map((job) => (

                <div
                  key={job.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md"
                >

                  {/* Job Header */}
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                    <div className="flex items-start gap-4">

                      {/* Company Logo / Initial */}
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">
                        {job?.company?.name
                          ? job.company.name
                              .charAt(0)
                              .toUpperCase()
                          : "T"}
                      </div>

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <h3 className="text-lg font-bold text-slate-900">
                            {job.title}
                          </h3>

                          {/* Current backend doesn't have status */}
                          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                            POSTED
                          </span>

                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">

                          <span>
                            📍 {job.location || "Not specified"}
                          </span>

                          <span>
                            💼 {formatType(job.jobType)}
                          </span>

                          <span>
                            💰 {job.salary || "Not specified"}
                          </span>

                          <span>
                            🎓 {job.experience || "Not specified"}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* Vacancy Count */}
                    <div className="rounded-xl bg-blue-50 px-5 py-3 text-center">

                      <p className="text-2xl font-bold text-blue-600">
                        {job.vacancies ?? 0}
                      </p>

                      <p className="text-xs font-medium text-blue-600">
                        Vacancies
                      </p>

                    </div>

                  </div>

                  {/* Job Information */}
                  <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">

                    {/* Posted */}
                    <div>

                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Posted
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {formatDate(job.postedDate)}
                      </p>

                    </div>

                    {/* Skills */}
                    <div>

                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Skills
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {job.skills || "Not specified"}
                      </p>

                    </div>

                    {/* Job Description */}
                    <div>

                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Description
                      </p>

                      <p className="mt-1 line-clamp-2 text-sm font-medium text-slate-700">
                        {job.description || "No description available"}
                      </p>

                    </div>

                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">

                    {/* View Job */}
                    <Link
                      to={`/jobs/${job.id}`}
                      className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      View Job
                    </Link>

                    {/* View Applicants */}
                    <Link
                      to={`/recruiter/applicants?jobId=${job.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Applicants
                    </Link>

                    {/* Edit Job */}
                    <Link
                      to={`/recruiter/edit-job/${job.id}`}
                      className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Edit Job
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => deleteJob(job.id)}
                      className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

          {/* =========================
              Empty State
          ========================= */}
          {jobs.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                💼
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                No jobs posted
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                You haven't posted any jobs yet. Create your first job
                opening and start finding candidates.
              </p>

              <Link
                to="/recruiter/post-job"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Post a Job
              </Link>

            </div>
          )}

        </section>

      </main>

      <Footer />
    </>
  );
}

export default ManageJobs;