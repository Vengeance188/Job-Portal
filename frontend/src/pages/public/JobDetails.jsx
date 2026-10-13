import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

import Footer from "../../components/Footer";

import api from "../../services/api";

function JobDetails() {

  const { id } = useParams();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showApplyForm, setShowApplyForm] = useState(false);

  const [applicationData, setApplicationData] = useState({

    coverLetter: "",

  });

  const [resumeFile, setResumeFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [applicationMessage, setApplicationMessage] = useState("");

  useEffect(() => {

    fetchJob();

  }, [id]);

  const fetchJob = async () => {

    try {

      const response = await api.get(`/api/jobs/${id}`);

      setJob(response.data);

    } catch (error) {

      console.error("Error fetching job:", error);

    } finally {

      setLoading(false);

    }

  };

  // =========================

  // APPLICATION

  // =========================

  const handleApplicationChange = (e) => {

    setApplicationData({

      ...applicationData,

      [e.target.name]: e.target.value,

    });

  };

  const handleResumeChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) {

      setResumeFile(null);

      return;

    }

    if (!file.name.toLowerCase().endsWith(".pdf") || (file.type && file.type !== "application/pdf")) {

      setResumeFile(null);

      e.target.value = "";

      setApplicationMessage("Please select a PDF resume.");

      return;

    }

    if (file.size > 5 * 1024 * 1024) {

      setResumeFile(null);

      e.target.value = "";

      setApplicationMessage("Resume must be 5 MB or smaller.");

      return;

    }

    setApplicationMessage("");

    setResumeFile(file);

  };

  const handleApply = async (e) => {

    e.preventDefault();

    setApplicationMessage("");

    if (!resumeFile) {

      setApplicationMessage("Please upload your resume as a PDF.");

      return;

    }

    setIsSubmitting(true);

    try {

      // Upload the selected PDF using the existing candidate resume endpoint.

      const uploadData = new FormData();

      uploadData.append("file", resumeFile);

      const uploadResponse = await api.post(

        "/api/candidate/resume/upload",

        uploadData

      );

      // Supports common response shapes: URL string, {resumeUrl}, {url}, or {secure_url}.

      const uploadResult = uploadResponse.data;

      const resumeUrl =

        (typeof uploadResult === "string" && uploadResult.startsWith("http")

          ? uploadResult

          : uploadResult?.resumeUrl ||

            uploadResult?.url ||

            uploadResult?.secure_url ||

            uploadResult?.data?.resumeUrl ||

            uploadResult?.data?.url ||

            uploadResult?.data?.secure_url);

      if (!resumeUrl) {

        throw new Error(

          "Resume uploaded, but the server did not return its URL. Check the resume upload API response."

        );

      }

      // Submit the application with the uploaded resume URL.

      const response = await api.post("/api/applications", null, {

        params: {

          jobId: id,

          coverLetter: applicationData.coverLetter.trim(),

        },

      });

      console.log("Application submitted:", response.data);

      setApplicationMessage("Application submitted successfully!");

      setApplicationData({ coverLetter: "" });

      setResumeFile(null);

      const fileInput = document.getElementById("resumeFile");

      if (fileInput) fileInput.value = "";

    } catch (error) {

      console.error("Application error:", error);

      setApplicationMessage(

        error.response?.data?.message ||

          error.message ||

          "Failed to submit application. Please try again."

      );

    } finally {

      setIsSubmitting(false);

    }

  };

  // LOADING

  // =========================

  if (loading) {

    return (

      <>

        <Navbar />

        <div className="flex min-h-screen items-center justify-center bg-slate-50">

          <p className="text-slate-500">

            Loading job...

          </p>

        </div>

        <Footer />

      </>

    );

  }

  // =========================

  // JOB NOT FOUND

  // =========================

  if (!job) {

    return (

      <>

        <Navbar />

        <div className="flex min-h-screen items-center justify-center bg-slate-50">

          <div className="text-center">

            <h2 className="text-2xl font-bold text-slate-900">

              Job Not Found

            </h2>

            <p className="mt-2 text-slate-500">

              The job you are looking for does not exist.

            </p>

            <Link

              to="/jobs"

              className="mt-5 inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"

            >

              Browse Jobs

            </Link>

          </div>

        </div>

        <Footer />

      </>

    );

  }

  // =========================

  // COMPANY

  // =========================

  const companyName = job.company?.name || "Company";

  const companyLogo = companyName

    .charAt(0)

    .toUpperCase();

  // =========================

  // SKILLS

  // =========================

  const skills = job.skills

    ? job.skills

        .split(",")

        .map((skill) => skill.trim())

        .filter((skill) => skill.length > 0)

    : [];

  // =========================

  // POSTED DATE

  // =========================

  const postedDate = job.postedDate

    ? new Date(job.postedDate).toLocaleDateString()

    : "Recently";

  return (

  <>

   <Navbar />

    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <section className="bg-slate-950">

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

          {/* Breadcrumb */}

          <div className="mb-8 flex items-center gap-2 text-sm text-slate-400">

            <Link

              to="/"

              className="hover:text-white"

            >

              Home

            </Link>

            <span>›</span>

            <Link

              to="/jobs"

              className="hover:text-white"

            >

              Jobs

            </Link>

            <span>›</span>

            <span className="text-slate-300">

              Job Details

            </span>

          </div>

          {/* Job Header */}

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-5">

              {/* Logo */}

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-slate-900">

                {companyLogo}

              </div>

              <div>

                <p className="text-sm font-medium text-blue-400">

                  {companyName}

                </p>

                <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">

                  {job.title}

                </h1>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">

                  <span>

                    📍 {job.location}

                  </span>

                  <span>

                    💼 {job.jobType}

                  </span>

                  <span>

                    💰 {job.salary}

                  </span>

                </div>

              </div>

            </div>

            {/* Apply */}

            <button

              onClick={() => {

                setApplicationMessage("");

                setShowApplyForm(true);

              }}

              className="rounded-xl bg-blue-600 px-8 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"

            >

              Apply Now

            </button>

          </div>

        </div>

      </section>

      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

          {/* ================= LEFT ================= */}

          <div className="space-y-6">

            {/* About Job */}

            <section className="rounded-2xl border border-slate-200 bg-white p-7">

              <h2 className="text-xl font-bold text-slate-900">

                About the Job

              </h2>

              <p className="mt-5 leading-7 text-slate-600">

                {job.description}

              </p>

            </section>

            {/* Skills */}

            <section className="rounded-2xl border border-slate-200 bg-white p-7">

              <h2 className="text-xl font-bold text-slate-900">

                Required Skills

              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

                {skills.length > 0 ? (

                  skills.map((skill) => (

                    <span

                      key={skill}

                      className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"

                    >

                      {skill}

                    </span>

                  ))

                ) : (

                  <p className="text-sm text-slate-500">

                    No skills specified.

                  </p>

                )}

              </div>

            </section>

          </div>

          {/* ================= RIGHT SIDEBAR ================= */}

          <aside>

            <div className="sticky top-24 space-y-5">

              {/* Job Summary */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6">

                <h2 className="font-bold text-slate-900">

                  Job Summary

                </h2>

                <div className="mt-5 space-y-5">

                  <SummaryItem

                    icon="💼"

                    label="Employment Type"

                    value={job.jobType}

                  />

                  <SummaryItem

                    icon="💰"

                    label="Salary"

                    value={job.salary}

                  />

                  <SummaryItem

                    icon="🎓"

                    label="Experience"

                    value={job.experience}

                  />

                  <SummaryItem

                    icon="📍"

                    label="Location"

                    value={job.location}

                  />

                  <SummaryItem

                    icon="👥"

                    label="Vacancies"

                    value={job.vacancies}

                  />

                  <SummaryItem

                    icon="📅"

                    label="Posted"

                    value={postedDate}

                  />

                </div>

              </section>

              {/* Company */}

              <section className="rounded-2xl border border-slate-200 bg-white p-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 font-bold text-white">

                    {companyLogo}

                  </div>

                  <div>

                    <h3 className="font-bold">

                      {companyName}

                    </h3>

                    <p className="text-xs text-slate-400">

                      Company

                    </p>

                  </div>

                </div>

                <Link

                  to={`/companies/${job.company?.id}`}

                  className="mt-5 block text-sm font-semibold text-blue-600 hover:text-blue-700"

                >

                  View company →

                </Link>

              </section>

              {/* Save */}

              <button

                className="w-full rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"

              >

                ♡ Save this job

              </button>

            </div>

          </aside>

        </div>

      </main>

      {/* ================= BOTTOM APPLY ================= */}

      <section className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-8 sm:flex-row lg:px-8">

          <div>

            <h3 className="font-bold text-slate-900">

              Interested in this position?

            </h3>

            <p className="mt-1 text-sm text-slate-500">

              Apply for this position and start your journey.

            </p>

          </div>

          <button

            onClick={() => {

              setApplicationMessage("");

              setShowApplyForm(true);

            }}

            className="rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-blue-700"

          >

            Apply Now →

          </button>

        </div>

      </section>

      {/* ================= APPLICATION MODAL ================= */}

      {showApplyForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold text-slate-900">

                Apply for {job.title}

              </h2>

              <button

                onClick={() => setShowApplyForm(false)}

                className="text-xl text-slate-400 hover:text-slate-700"

              >

                ✕

              </button>

            </div>

            {/* Application Form */}

            <form

              onSubmit={handleApply}

              className="mt-6 space-y-5"

            >

              {/* Resume PDF */}

              <div>

                <label

                  htmlFor="resumeFile"

                  className="mb-2 block text-sm font-semibold text-slate-700"

                >

                  Resume (PDF) <span className="text-red-500">*</span>

                </label>

                <input

                  id="resumeFile"

                  name="resumeFile"

                  type="file"

                  accept=".pdf,application/pdf"

                  onChange={handleResumeChange}

                  required

                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700 focus:border-blue-500"

                />

                <p className="mt-2 text-xs text-slate-500">

                  Upload a PDF file, maximum 5 MB.

                </p>

                {resumeFile && (

                  <p className="mt-2 break-all text-sm font-medium text-green-700">

                    Selected: {resumeFile.name}

                  </p>

                )}

              </div>

              {/* Cover Letter */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">

                  Cover Letter <span className="font-normal text-slate-400">(optional)</span>

                </label>

                <textarea

                  name="coverLetter"

                  value={applicationData.coverLetter}

                  onChange={handleApplicationChange}

                  placeholder="Write your cover letter..."

                  rows="6"

                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"

                />

              </div>

              {/* Message */}

              {applicationMessage && (

                <p

                  className={`text-sm font-medium ${

                    applicationMessage.includes("successfully")

                      ? "text-green-600"

                      : "text-red-600"

                  }`}

                >

                  {applicationMessage}

                </p>

              )}

              {/* Submit */}

              <button

                type="submit"

                disabled={isSubmitting}

                className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"

              >

                {isSubmitting ? "Uploading resume and applying..." : "Submit Application"}

              </button>

            </form>

          </div>

        </div>

      )}

    </div>

</>

  );

}

/* =====================================================

   SUMMARY ITEM

\\===================================================== */

function SummaryItem({ icon, label, value }) {

  return (

    <div className="flex gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm">

        {icon}

      </div>

      <div>

        <p className="text-xs text-slate-400">

          {label}

        </p>

        <p className="mt-1 text-sm font-semibold text-slate-700">

          {value ?? "Not specified"}

        </p>

      </div>

    </div>

  );

}

export default JobDetails;
