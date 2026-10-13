import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../../components/Footer";
import RecruiterNavbar from "../../components/RecruiterNavbar";
import api from "../../services/api";

function EditJob() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    experience: "",
    salary: "",
    skills: "",
    vacancies: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  // ==========================================
  // Fetch Existing Job
  // ==========================================

  useEffect(() => {

    const fetchJob = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await api.get(`/api/jobs/${id}`);

        setJob({
          title: response.data.title || "",
          description: response.data.description || "",
          location: response.data.location || "",
          jobType: response.data.jobType || "",
          experience: response.data.experience || "",
          salary: response.data.salary || "",
          skills: response.data.skills || "",
          vacancies: response.data.vacancies ?? "",
        });

      } catch (error) {

        console.error("Failed to fetch job:", error);

        setError(
          error.response?.data?.message ||
          "Failed to load job details."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchJob();

  }, [id]);


  // ==========================================
  // Handle Input Change
  // ==========================================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setJob((previousJob) => ({
      ...previousJob,
      [name]: value,
    }));

  };


  // ==========================================
  // Update Job
  // ==========================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      setSaving(true);
      setError("");
      setSuccess("");

      const updatedJob = {
        ...job,
        vacancies: Number(job.vacancies),
      };

      await api.put(
        `/api/jobs/${id}`,
        updatedJob
      );

      setSuccess("Job updated successfully!");

      setTimeout(() => {
        navigate("/recruiter/manage-jobs");
      }, 1000);

    } catch (error) {

      console.error("Failed to update job:", error);

      setError(
        error.response?.data?.message ||
        "Failed to update job."
      );

    } finally {

      setSaving(false);

    }

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
              Loading job details...
            </p>

          </div>

        </main>

        <Footer />
      </>
    );

  }


  // ==========================================
  // Page
  // ==========================================

  return (
    <>
      <RecruiterNavbar />

      <main className="min-h-screen bg-slate-50">

        {/* Header */}

        <section className="bg-slate-950">

          <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">

            <p className="text-sm font-medium text-blue-400">
              Recruiter Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Edit Job
            </h1>

            <p className="mt-2 text-slate-400">
              Update the details of your job posting.
            </p>

          </div>

        </section>


        {/* Form */}

        <section className="mx-auto max-w-4xl px-6 py-10 lg:px-8">

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >

            {/* Error */}

            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}


            {/* Success */}

            {success && (
              <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {success}
              </div>
            )}


            <div className="grid gap-6">


              {/* Job Title */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Job Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={job.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Java Backend Developer"
                />

              </div>


              {/* Description */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Job Description
                </label>

                <textarea
                  name="description"
                  value={job.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Describe the job responsibilities..."
                />

              </div>


              {/* Location + Job Type */}

              <div className="grid gap-6 sm:grid-cols-2">

                {/* Location */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={job.location}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Noida"
                  />

                </div>


                {/* Job Type */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Job Type
                  </label>

                  <select
                    name="jobType"
                    value={job.jobType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="">
                      Select Job Type
                    </option>

                    <option value="FULL_TIME">
                      Full Time
                    </option>

                    <option value="PART_TIME">
                      Part Time
                    </option>

                    <option value="INTERNSHIP">
                      Internship
                    </option>

                    <option value="CONTRACT">
                      Contract
                    </option>

                  </select>

                </div>

              </div>


              {/* Experience + Salary */}

              <div className="grid gap-6 sm:grid-cols-2">

                {/* Experience */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Experience
                  </label>

                  <input
                    type="text"
                    name="experience"
                    value={job.experience}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="1-3 Years"
                  />

                </div>


                {/* Salary */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Salary
                  </label>

                  <input
                    type="text"
                    name="salary"
                    value={job.salary}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="₹8L - ₹12L"
                  />

                </div>

              </div>


              {/* Skills */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Skills
                </label>

                <input
                  type="text"
                  name="skills"
                  value={job.skills}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Java, Spring Boot, MySQL, REST API"
                />

                <p className="mt-1 text-xs text-slate-400">
                  Separate multiple skills using commas.
                </p>

              </div>


              {/* Vacancies */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Number of Vacancies
                </label>

                <input
                  type="number"
                  name="vacancies"
                  value={job.vacancies}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="2"
                />

              </div>

            </div>


            {/* Buttons */}

            <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6">

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Updating..." : "Update Job"}
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate("/recruiter/manage-jobs")
                }
                className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

            </div>

          </form>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default EditJob;