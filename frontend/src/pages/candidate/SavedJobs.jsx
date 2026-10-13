import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Bookmark } from "lucide-react";

function SavedJobs() {

  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingJobId, setRemovingJobId] = useState(null);


  // =====================================================
  // FETCH SAVED JOBS
  // =====================================================

  useEffect(() => {

    fetchSavedJobs();

  }, []);


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

      setLoading(false);

    }
  };


  // =====================================================
  // REMOVE SAVED JOB
  // =====================================================

  const handleRemove = async (jobId) => {

    if (removingJobId !== null) {
      return;
    }

    try {

      setRemovingJobId(jobId);

      await api.delete(
        `/api/candidate/saved-jobs/${jobId}`
      );

      // Remove the job from the UI
      // after successful DELETE request
      setSavedJobs((previousJobs) =>
        previousJobs.filter(
          (savedJob) => savedJob.job.id !== jobId
        )
      );

    } catch (error) {

      console.error(
        "Error removing saved job:",
        error
      );

    } finally {

      setRemovingJobId(null);

    }
  };


  // =====================================================
  // FORMAT JOB TYPE
  // =====================================================

  const formatType = (type) => {

    if (!type) {
      return "";
    }

    return type
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };


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

              Candidate Portal

            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">

              Saved Jobs

            </h1>

            <p className="mt-2 text-slate-400">

              Jobs you have saved for later.

            </p>

          </div>

        </section>


        {/* =================================================
            CONTENT
        ================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">


          {/* =================================================
              TOP SECTION
          ================================================== */}

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-900">

                Your Saved Jobs

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                You have saved {savedJobs.length} jobs.

              </p>

            </div>


            <Link
              to="/jobs"
              className="w-fit rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >

              Browse Jobs

            </Link>

          </div>


          {/* =================================================
              LOADING STATE
          ================================================== */}

          {loading && (

            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

              <p className="text-sm text-slate-500">

                Loading saved jobs...

              </p>

            </div>

          )}


          {/* =================================================
              SAVED JOBS
          ================================================== */}

          {!loading && savedJobs.length > 0 && (

            <div className="grid gap-5 md:grid-cols-2">

              {savedJobs.map((savedJob) => {

                const job = savedJob.job;

                const companyName =
                  job.company?.name || "Company";

                const companyLogo =
                  companyName
                    .charAt(0)
                    .toUpperCase();

                const skills = job.skills
                  ? job.skills
                      .split(",")
                      .map((skill) => skill.trim())
                  : [];


                return (

                  <div
                    key={savedJob.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >


                    {/* =================================================
                        JOB HEADER
                    ================================================== */}

                    <div className="flex items-start justify-between">

                      <div className="flex items-center gap-4">


                        {/* Company Logo */}

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">

                          {companyLogo}

                        </div>


                        {/* Company Name */}

                        <div>

                          <h3 className="font-bold text-slate-900">

                            {job.title}

                          </h3>

                          <p className="mt-1 text-sm text-slate-500">

                            {companyName}

                          </p>

                        </div>

                      </div>


                      {/* =================================================
                          REMOVE BOOKMARK
                      ================================================== */}

                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(job.id)
                        }
                        disabled={
                          removingJobId === job.id
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Remove from saved jobs"
                      >

                        <Bookmark
                          size={18}
                          strokeWidth={2}
                          fill="currentColor"
                        />

                      </button>

                    </div>


                    {/* =================================================
                        JOB INFORMATION
                    ================================================== */}

                    <div className="mt-5 space-y-2 text-sm text-slate-500">

                      <p className="flex items-center gap-2">

                        <span>📍</span>

                        {job.location}

                      </p>


                      <p className="flex items-center gap-2">

                        <span>💼</span>

                        {formatType(job.jobType)}

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


                    {/* =================================================
                        SKILLS
                    ================================================== */}

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


                    {/* =================================================
                        FOOTER
                    ================================================== */}

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">

                      <p className="text-xs text-slate-400">

                        Saved job

                      </p>


                      <Link
                        to={`/jobs/${job.id}`}
                        className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                      >

                        View Job →

                      </Link>

                    </div>

                  </div>

                );

              })}

            </div>

          )}


          {/* =================================================
              EMPTY STATE
          ================================================== */}

          {!loading && savedJobs.length === 0 && (

            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">

                <Bookmark
                  size={26}
                  className="text-slate-400"
                />

              </div>


              <h2 className="mt-5 text-xl font-bold text-slate-900">

                No saved jobs

              </h2>


              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">

                You haven't saved any jobs yet.
                Browse available jobs and save
                the ones you want to apply for later.

              </p>


              <Link
                to="/jobs"
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >

                Browse Jobs

              </Link>

            </div>

          )}

        </section>

      </main>

      <Footer />
    </>
  );
}

export default SavedJobs;