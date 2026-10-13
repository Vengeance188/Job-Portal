import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Footer from "../../components/Footer";
import RecruiterNavbar from "../../components/RecruiterNavbar";
import api from "../../services/api";

function Applicants() {

  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const jobId = params.get("jobId");

  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const [applicants, setApplicants] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState(null);


  // ==========================================
  // Fetch Applicants For Specific Job
  // ==========================================

  useEffect(() => {
  const fetchApplicants = async () => {
    try {
      setLoading(true);
      setError("");

      const response = jobId
        ? await api.get(`/api/applications/recruiter/job/${jobId}`)
        : await api.get("/api/applications/recruiter");

      setApplicants(response.data);
    } catch (error) {
      console.error("Failed to fetch applicants:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load applicants."
      );
    } finally {
      setLoading(false);
    }
  };

  fetchApplicants();
}, [jobId]);


  // ==========================================
  // Status Styling
  // ==========================================

  const getStatusStyle = (status) => {

    switch (status) {

      case "SHORTLISTED":
        return "bg-yellow-50 text-yellow-700";

      case "HIRED":
        return "bg-purple-50 text-purple-700";

      case "REJECTED":
        return "bg-red-50 text-red-700";

      case "APPLIED":
      default:
        return "bg-blue-50 text-blue-700";
    }

  };


  // ==========================================
  // Update Status
  // ==========================================

  const updateStatus = async (id, newStatus) => {

    try {

      setUpdatingId(id);

      const response =
        await api.put(
          `/api/applications/${id}/status`,
          null,
          {
            params: {
              status: newStatus
            }
          }
        );

      // Update only the changed applicant
      setApplicants((previousApplicants) =>
        previousApplicants.map((applicant) =>
          applicant.applicationId === id
            ? response.data
            : applicant
        )
      );

    } catch (error) {

      console.error(
        "Failed to update status:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update application status."
      );

    } finally {

      setUpdatingId(null);

    }

  };


  // ==========================================
  // Filter Applicants
  // ==========================================

  const filteredApplicants =
    selectedStatus === "ALL"
      ? applicants
      : applicants.filter(
          (applicant) =>
            applicant.status === selectedStatus
        );


  // ==========================================
  // Format Date
  // ==========================================

  const formatDate = (date) => {

    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  // ==========================================
  // Loading
  // ==========================================

  if (loading) {

    return (
      <>
        <RecruiterNavbar />

        <main className="flex min-h-screen items-center justify-center bg-slate-50">

          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

            <p className="mt-4 text-sm font-medium text-slate-600">
              Loading applicants...
            </p>

          </div>

        </main>

        <Footer />
      </>
    );

  }


  // ==========================================
  // Error
  // ==========================================

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

        {/* ==================================
            Header
        ================================== */}

        <section className="bg-slate-950">

          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

            <p className="text-sm font-medium text-blue-400">
              Recruiter Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Applicants
            </h1>

            <p className="mt-2 text-slate-400">
              Review candidates and manage their applications.
            </p>

          </div>

        </section>


        {/* ==================================
            Content
        ================================== */}

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">


          {/* Top Bar */}

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Applicants
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review and manage candidates who applied to this job.
              </p>

            </div>


            <Link
              to="/recruiter/manage-jobs"
              className="w-fit rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Manage Jobs
            </Link>

          </div>


          {/* ==================================
              Status Filters
          ================================== */}

          <div className="mt-6 flex flex-wrap gap-2">

            {[
              "ALL",
              "APPLIED",
              "SHORTLISTED",
              "HIRED",
              "REJECTED",
            ].map((status) => (

              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  selectedStatus === status
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {status}
              </button>

            ))}

          </div>


          {/* ==================================
              Applicants
          ================================== */}

          <div className="mt-6 space-y-5">

            {filteredApplicants.map((applicant) => (

              <div
                key={applicant.applicationId}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md"
              >

                {/* Candidate Header */}

                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                  <div className="flex items-start gap-4">

                    {/* Avatar */}

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">

                      {applicant.candidateName
                        ?.charAt(0)
                        ?.toUpperCase()}

                    </div>


                    <div>

                      <h3 className="text-lg font-bold text-slate-900">
                        {applicant.candidateName}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {applicant.candidateEmail}
                      </p>


                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">

                        <span>
                          📍 {applicant.location || "N/A"}
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* Status */}

                  <span
                    className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      applicant.status
                    )}`}
                  >
                    {applicant.status}
                  </span>

                </div>


                {/* Application Information */}

                <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">

                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Applied For
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {applicant.jobTitle}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Applied On
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {formatDate(applicant.appliedDate)}
                    </p>

                  </div>


                  <div>

                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Application ID
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      #{applicant.applicationId}
                    </p>

                  </div>

                </div>


                {/* Actions */}

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">


                  {/* Resume */}

                  {applicant.resumeUrl ? (

                    <a
                      href={applicant.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      View Resume
                    </a>

                  ) : (

                    <span className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-400">
                      Resume Not Available
                    </span>

                  )}


                  {/* Download Resume */}

                  {applicant.resumeUrl && (

                    <a
                      href={applicant.resumeUrl}
                      download
                      className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Download Resume
                    </a>

                  )}


                  {/* Status Dropdown */}

                  <select
                    value={applicant.status}
                    disabled={updatingId === applicant.applicationId}
                    onChange={(event) =>
                      updateStatus(
                        applicant.applicationId,
                        event.target.value
                      )
                    }
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    <option value="APPLIED">
                      Applied
                    </option>

                    <option value="SHORTLISTED">
                      Shortlisted
                    </option>

                    <option value="HIRED">
                      Hired
                    </option>

                    <option value="REJECTED">
                      Rejected
                    </option>

                  </select>


                  {updatingId === applicant.applicationId && (

                    <span className="text-sm text-slate-500">
                      Updating...
                    </span>

                  )}

                </div>

              </div>

            ))}

          </div>


          {/* ==================================
              Empty State
          ================================== */}

          {filteredApplicants.length === 0 && (

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                👤
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                No applicants found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                There are no applicants with the selected application status.
              </p>

            </div>

          )}

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Applicants;