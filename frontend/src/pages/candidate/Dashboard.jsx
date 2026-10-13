import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Chatbot from "../../components/Chatbot";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [totalApplications, setTotalApplications] = useState(0);
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0);

  const [loadingApplications, setLoadingApplications] = useState(true);
  const [loadingSavedJobs, setLoadingSavedJobs] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // =====================================================
  // FETCH DASHBOARD DATA
  // =====================================================

  useEffect(() => {
    fetchTotalApplications();
    fetchSavedJobs();
    fetchApplications();
    fetchProfileCompletion();
  }, []);

  // =====================================================
  // FETCH TOTAL APPLICATIONS
  // =====================================================

  const fetchTotalApplications = async () => {
    try {
      const response = await api.get(
        "/api/candidate/dashboard/applications"
      );

      setTotalApplications(response.data);
    } catch (error) {
      console.error(
        "Error fetching total applications:",
        error
      );
    } finally {
      setLoadingApplications(false);
    }
  };

  // =====================================================
  // FETCH SAVED JOBS
  // =====================================================

  const fetchSavedJobs = async () => {
    try {
      const response = await api.get(
        "/api/candidate/saved-jobs"
      );

      setSavedJobs(response.data);
    } catch (error) {
      console.error(
        "Error fetching saved jobs:",
        error
      );
    } finally {
      setLoadingSavedJobs(false);
    }
  };

  // =====================================================
  // FETCH MY APPLICATIONS
  // =====================================================

  const fetchApplications = async () => {
    try {
      const response = await api.get(
        "/api/applications/my"
      );

      setApplications(response.data);
    } catch (error) {
      console.error(
        "Error fetching applications:",
        error
      );
    }
  };

  // =====================================================
  // FETCH PROFILE COMPLETION
  // =====================================================

  const fetchProfileCompletion = async () => {
    try {
      const response = await api.get(
        "/api/candidate/dashboard/profile-completion"
      );

      setProfileCompletion(response.data);
    } catch (error) {
      console.error(
        "Error fetching profile completion:",
        error
      );
    } finally {
      setLoadingProfile(false);
    }
  };

  // =====================================================
  // FORMAT APPLICATION STATUS
  // =====================================================

  const formatStatus = (status) => {
    if (!status) {
      return "";
    }

    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "SHORTLISTED":
        return "bg-yellow-50 text-yellow-700";

      case "APPLIED":
        return "bg-blue-50 text-blue-700";

      case "REJECTED":
        return "bg-red-50 text-red-700";

      case "HIRED":
        return "bg-green-50 text-green-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // =====================================================
  // RECENT APPLICATIONS
  // =====================================================

  const recentApplications = applications.slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* =================================================
            HEADER
        ================================================== */}

        <section className="bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

            <p className="text-sm font-medium text-blue-400">
              Candidate Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Welcome back, {user?.name} 👋
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your applications, profile, and saved jobs.
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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* Applications */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <Link
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
                to="/candidate/applications"
              >
                Applications
              </Link>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {loadingApplications
                  ? "..."
                  : totalApplications}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Jobs applied
              </p>

            </div>

            {/* Saved Jobs */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <Link
                to="/candidate/saved-jobs"
                className="block text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Saved Jobs
              </Link>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {loadingSavedJobs
                  ? "..."
                  : savedJobs.length}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Jobs saved
              </p>

            </div>

            {/* Profile */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6">

              <Link
                to="/candidate/edit-profile"
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Profile
              </Link>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {loadingProfile
                  ? "..."
                  : `${profileCompletion}%`}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Profile completed
              </p>

            </div>

          </div>

          {/* =================================================
              MAIN GRID
          ================================================== */}

          <div className="mt-10 grid gap-8 lg:grid-cols-3">

            {/* =================================================
                RECENT APPLICATIONS
            ================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white lg:col-span-2">

              <div className="flex items-center justify-between border-b border-slate-100 p-6">

                <div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Recent Applications
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Track your latest job applications.
                  </p>

                </div>

                <Link
                  to="/candidate/applications"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View All
                </Link>

              </div>

              {/* Applications */}

              <div className="divide-y divide-slate-100">

                {applications.length === 0 ? (

                  <div className="p-6 text-center">

                    <p className="text-sm text-slate-500">
                      You haven't applied to any jobs yet.
                    </p>

                    <Link
                      to="/jobs"
                      className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Find Jobs →
                    </Link>

                  </div>

                ) : (

                  recentApplications.map((application) => {

                    const job = application.job;

                    const companyName =
                      job?.company?.name || "Company";

                    const companyLogo =
                      companyName
                        .charAt(0)
                        .toUpperCase();

                    return (

                      <div
                        key={application.id}
                        className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                      >

                        <div className="flex items-center gap-4">

                          {/* Company Logo */}

                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 font-bold text-white">
                            {companyLogo}
                          </div>

                          {/* Job Details */}

                          <div>

                            <h3 className="font-semibold text-slate-900">
                              {job?.title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                              {companyName}
                              {" • "}
                              {job?.location}
                            </p>

                          </div>

                        </div>

                        {/* Application Status */}

                        <span
                          className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                            application.status
                          )}`}
                        >
                          {formatStatus(
                            application.status
                          )}
                        </span>

                      </div>

                    );
                  })

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
                Manage your job search.
              </p>

              <div className="mt-6 space-y-3">

                <Link
                  to="/jobs"
                  className="block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Find Jobs
                </Link>

                <Link
                  to="/candidate/profile"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  View Profile
                </Link>

                <Link
                  to="/candidate/edit-profile"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Edit Profile
                </Link>

                <Link
                  to="/candidate/saved-jobs"
                  className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Saved Jobs
                </Link>

              </div>

            </div>

          </div>

          {/* =================================================
              PROFILE COMPLETION
          ================================================== */}

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="font-bold text-slate-900">
                  Complete your profile
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  Your profile is{" "}
                  {loadingProfile
                    ? "being checked..."
                    : `${profileCompletion}% complete.`}
                </p>

              </div>

              <Link
                to="/candidate/edit-profile"
                className="w-fit rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {profileCompletion === 100
                  ? "View Profile"
                  : "Complete Profile"}
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />

      {/* =================================================
          AI JOB PORTAL CHATBOT
      ================================================== */}

      <Chatbot />
    </>
  );
}

export default Dashboard;