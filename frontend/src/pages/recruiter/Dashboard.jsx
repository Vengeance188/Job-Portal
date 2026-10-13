import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import RecruiterNavbar from "../../components/RecruiterNavbar";
import api from "../../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH RECRUITER DASHBOARD
  // =====================================================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/api/recruiter/dashboard");

        setDashboard(response.data);
      } catch (error) {
        console.error("Dashboard error:", error);

        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <>
        <RecruiterNavbar />

        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

            <p className="mt-4 text-sm font-medium text-slate-600">
              Loading dashboard...
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

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

        {/* =================================================
            HEADER
        ================================================== */}

        <section className="bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

            <p className="text-sm font-medium text-blue-400">
              Recruiter Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Welcome back, {dashboard?.recruiterName} 👋
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your jobs, applicants, and company profile.
            </p>

          </div>
        </section>

        {/* =================================================
            DASHBOARD CONTENT
        ================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

          {/* =================================================
              STATISTICS
          ================================================== */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Active Jobs */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <p className="text-sm font-medium text-slate-500">
                Active Jobs
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {dashboard?.activeJobs ?? 0}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Currently hiring
              </p>

            </div>

            {/* Total Applicants */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <p className="text-sm font-medium text-slate-500">
                Total Applicants
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {dashboard?.totalApplicants ?? 0}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Applications received
              </p>

            </div>

            {/* Recent Applicants */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <p className="text-sm font-medium text-slate-500">
                Recent Applicants
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {dashboard?.recentApplicants?.length ?? 0}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Latest applications
              </p>

            </div>

            {/* Hired */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <p className="text-sm font-medium text-slate-500">
                Hired
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {dashboard?.hired ?? 0}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Candidates hired
              </p>

            </div>

          </div>

          {/* =================================================
              MAIN CONTENT
          ================================================== */}

          <div className="mt-10 grid gap-8 lg:grid-cols-3">

            {/* =================================================
                RECENT APPLICANTS
            ================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white lg:col-span-2">

              <div className="flex items-center justify-between border-b border-slate-100 p-6">

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Applicants
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Candidates who recently applied to your jobs.
                  </p>

                </div>

                <Link
                  to="/recruiter/applicants"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View All
                </Link>

              </div>

              <div className="divide-y divide-slate-100">

                {dashboard?.recentApplicants?.length > 0 ? (

                  dashboard.recentApplicants.map((application) => {

                    const candidateName =
                      application?.candidate?.name || "Unknown Candidate";

                    const jobTitle =
                      application?.job?.title || "Job";

                    const status =
                      application?.status || "APPLIED";

                    return (
                      <div
                        key={application.id}
                        className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                      >

                        <div className="flex items-center gap-4">

                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                            {candidateName
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <h3 className="font-semibold text-slate-900">
                              {candidateName}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                              {jobTitle}
                            </p>

                          </div>

                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                            status === "HIRED"
                              ? "bg-green-50 text-green-700"
                              : status === "SHORTLISTED"
                              ? "bg-yellow-50 text-yellow-700"
                              : status === "REJECTED"
                              ? "bg-red-50 text-red-700"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {status}
                        </span>

                      </div>
                    );
                  })

                ) : (

                  <div className="p-8 text-center">

                    <p className="text-sm text-slate-500">
                      No applications yet.
                    </p>

                  </div>

                )}

              </div>

            </div>

            {/* =================================================
                QUICK ACTIONS
            ================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your recruitment activities.
              </p>

              <div className="mt-6 space-y-3">

                <Link
                  to="/recruiter/post-job"
                  className="block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  + Post a Job
                </Link>

                <Link
                  to="/recruiter/manage-jobs"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Manage Jobs
                </Link>

                <Link
                  to="/recruiter/applicants"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  View Applicants
                </Link>

                <Link
                  to="/recruiter/company-profile"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Company Profile
                </Link>

              </div>

            </div>

          </div>

          {/* =================================================
              RECENT JOBS
          ================================================== */}

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white">

            <div className="flex items-center justify-between border-b border-slate-100 p-6">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Your Recent Jobs
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Recently posted job openings.
                </p>

              </div>

              <Link
                to="/recruiter/manage-jobs"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Manage All
              </Link>

            </div>

            <div className="divide-y divide-slate-100">

              {dashboard?.recentJobs?.length > 0 ? (

                dashboard.recentJobs.map((job) => (

                  <div
                    key={job.id}
                    className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div>

                      <h3 className="font-semibold text-slate-900">
                        {job.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {job.location} • {job.jobType} • {job.salary}
                      </p>

                    </div>

                    <div className="flex items-center gap-4">

                      <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                        Active
                      </span>

                      <span className="text-sm text-slate-400">
                        {job.vacancies} vacancies
                      </span>

                    </div>

                  </div>

                ))

              ) : (

                <div className="p-8 text-center">

                  <p className="text-sm text-slate-500">
                    You haven't posted any jobs yet.
                  </p>

                  <Link
                    to="/recruiter/post-job"
                    className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Post Your First Job
                  </Link>

                </div>

              )}

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Dashboard;