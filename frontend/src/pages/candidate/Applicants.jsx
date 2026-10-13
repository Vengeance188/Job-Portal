import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Applicant() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get("/api/applications/my");
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "SHORTLISTED":
        return "bg-yellow-50 text-yellow-700";

      case "INTERVIEW":
        return "bg-green-50 text-green-700";

      case "REJECTED":
        return "bg-red-50 text-red-700";

      case "HIRED":
        return "bg-green-50 text-green-700";

      default:
        return "bg-blue-50 text-blue-700";
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* Header */}
        <section className="bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <p className="text-sm font-medium text-blue-400">
              Candidate Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              My Applications
            </h1>

            <p className="mt-2 text-slate-400">
              Track all the jobs you have applied for.
            </p>
          </div>
        </section>

        {/* Applications */}
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

          {/* Top section */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Applications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                You have applied to {applications.length} jobs.
              </p>
            </div>

            <Link
              to="/jobs"
              className="w-fit rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Find More Jobs
            </Link>
          </div>

          {/* Loading */}
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-slate-500">
                Loading applications...
              </p>
            </div>
          )}

          {/* No Applications */}
          {!loading && applications.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <h3 className="text-lg font-bold text-slate-900">
                No applications yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                You haven't applied to any jobs yet.
              </p>

              <Link
                to="/jobs"
                className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Browse Jobs
              </Link>
            </div>
          )}

          {/* Application Cards */}
          {!loading && applications.length > 0 && (
            <div className="space-y-4">

              {applications.map((application) => {
                const job = application.job;
                const company = job?.company;

                return (
                  <div
                    key={application.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                      {/* Job Information */}
                      <div className="flex items-start gap-4">

                        {/* Company Logo */}
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">
                          {company?.name
                            ? company.name.charAt(0).toUpperCase()
                            : "C"}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {job?.title}
                          </h3>

                          <p className="mt-1 font-medium text-slate-600">
                            {company?.name}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                            <span>
                              📍 {job?.location}
                            </span>

                            <span>
                              💰 {job?.salary}
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* Status */}
                      <div className="flex flex-col items-start gap-3 lg:items-end">

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>

                        <p className="text-xs text-slate-400">
                          Applied on{" "}
                          {application.appliedDate
                            ? new Date(
                                application.appliedDate
                              ).toLocaleDateString()
                            : "N/A"}
                        </p>

                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">

                      <Link
                        to={`/jobs/${job?.id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        View Job
                      </Link>

                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        View Application
                      </button>

                    </div>
                  </div>
                );
              })}

            </div>
          )}

        </section>
      </main>

      <Footer />
    </>
  );
}

export default Applicant;