import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

function Home() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  /*
   * Fetch all jobs from backend
   */
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get("/api/jobs");
      setJobs(response.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  /*
   * Search from Hero section
   */
  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    const queryString = params.toString();

    navigate(queryString ? `/jobs?${queryString}` : "/jobs");
  };

  /*
   * Search from Popular searches
   */
  const handlePopularSearch = (search) => {
    navigate(`/jobs?search=${encodeURIComponent(search)}`);
  };

  /*
   * Search category
   *
   * Categories are inferred from title/description/skills
   * because the current Job entity does not have a category field.
   */
  const handleCategorySearch = (category) => {
    const categoryKeywords = {
      "Software Development": "software",
      "Data & Analytics": "data",
      "Design & Creative": "design",
      "Mobile Development": "mobile",
      "Marketing & Sales": "marketing",
      Engineering: "engineering",
    };

    const keyword = categoryKeywords[category] || category;

    navigate(`/jobs?category=${encodeURIComponent(keyword)}`);
  };

  /*
   * Dynamic categories
   */
  const categories = useMemo(() => {
    const categoryDefinitions = [
      {
        icon: "💻",
        title: "Software Development",
        color: "bg-blue-50",
        keywords: [
          "software",
          "developer",
          "development",
          "java",
          "spring",
          "react",
          "javascript",
          "backend",
          "frontend",
          "full stack",
          "fullstack",
        ],
      },
      {
        icon: "📊",
        title: "Data & Analytics",
        color: "bg-purple-50",
        keywords: [
          "data",
          "analyst",
          "analytics",
          "sql",
          "python",
          "excel",
          "bi",
        ],
      },
      {
        icon: "🎨",
        title: "Design & Creative",
        color: "bg-pink-50",
        keywords: [
          "design",
          "designer",
          "ui",
          "ux",
          "creative",
          "figma",
          "graphic",
        ],
      },
      {
        icon: "📱",
        title: "Mobile Development",
        color: "bg-green-50",
        keywords: [
          "mobile",
          "android",
          "ios",
          "flutter",
          "react native",
          "kotlin",
          "swift",
        ],
      },
      {
        icon: "📈",
        title: "Marketing & Sales",
        color: "bg-orange-50",
        keywords: [
          "marketing",
          "sales",
          "seo",
          "digital marketing",
          "business development",
          "sales executive",
        ],
      },
      {
        icon: "⚙️",
        title: "Engineering",
        color: "bg-cyan-50",
        keywords: [
          "engineer",
          "engineering",
          "devops",
          "cloud",
          "aws",
          "azure",
          "docker",
          "kubernetes",
        ],
      },
    ];

    return categoryDefinitions.map((category) => {
      const count = jobs.filter((job) => {
        const searchableText = `
          ${job.title || ""}
          ${job.description || ""}
          ${job.skills || ""}
        `.toLowerCase();

        return category.keywords.some((keyword) =>
          searchableText.includes(keyword.toLowerCase())
        );
      }).length;

      return {
        ...category,
        jobs: `${count} ${count === 1 ? "job" : "jobs"}`,
      };
    });
  }, [jobs]);

  /*
   * Latest 3 jobs
   */
  const featuredJobs = useMemo(() => {
    return [...jobs]
      .sort((a, b) => {
        const dateA = a.postedDate
          ? new Date(a.postedDate).getTime()
          : 0;

        const dateB = b.postedDate
          ? new Date(b.postedDate).getTime()
          : 0;

        return dateB - dateA;
      })
      .slice(0, 3);
  }, [jobs]);

  /*
   * Dynamic company count
   */
  const companyCount = useMemo(() => {
    const companies = new Set();

    jobs.forEach((job) => {
      if (job.company?.id) {
        companies.add(job.company.id);
      } else if (job.company?.name) {
        companies.add(job.company.name);
      }
    });

    return companies.size;
  }, [jobs]);

  /*
   * Job type formatting
   */
  const formatType = (type) => {
    if (!type) return "Not specified";

    return type
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  /*
   * Skills formatting
   */
  const getSkills = (skills) => {
    if (!skills) return [];

    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white text-slate-900">

        {/* =====================================================
            HERO SECTION
        ====================================================== */}

        <section className="relative overflow-hidden bg-slate-950">

          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">

            <div className="mx-auto max-w-4xl text-center">

              {/* Badge */}

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">

                <span className="h-2 w-2 rounded-full bg-green-400" />

                Discover opportunities waiting for you

              </span>


              {/* Heading */}

              <h1 className="mt-7 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">

                Find work that

                <span className="block text-blue-500">
                  moves you forward.
                </span>

              </h1>


              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">

                Discover opportunities from great companies and
                take the next step in your career.

              </p>


              {/* Search Box */}

              <form
                onSubmit={handleSearch}
                className="mx-auto mt-10 max-w-4xl rounded-2xl bg-white p-2 shadow-2xl"
              >

                <div className="flex flex-col gap-2 md:flex-row">

                  {/* Job */}

                  <div className="flex flex-1 items-center gap-3 rounded-xl px-4">

                    <span className="text-xl text-slate-400">
                      🔍
                    </span>

                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Job title, skills or keywords"
                      className="w-full py-4 text-sm outline-none"
                    />

                  </div>


                  {/* Divider */}

                  <div className="hidden h-10 self-center border-l border-slate-200 md:block" />


                  {/* Location */}

                  <div className="flex flex-1 items-center gap-3 rounded-xl px-4">

                    <span className="text-sm text-slate-400">
                      📍
                    </span>

                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Location"
                      className="w-full py-4 text-sm outline-none"
                    />

                  </div>


                  {/* Button */}

                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-4 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Search Jobs
                  </button>

                </div>

              </form>


              {/* Popular */}

              <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">

                <span className="text-slate-500">
                  Popular:
                </span>

                <button
                  type="button"
                  onClick={() => handlePopularSearch("Java Developer")}
                  className="text-slate-300 transition hover:text-white"
                >
                  Java Developer
                </button>

                <button
                  type="button"
                  onClick={() => handlePopularSearch("React Developer")}
                  className="text-slate-300 transition hover:text-white"
                >
                  React Developer
                </button>

                <button
                  type="button"
                  onClick={() => handlePopularSearch("Software Engineer")}
                  className="text-slate-300 transition hover:text-white"
                >
                  Software Engineer
                </button>

                <button
                  type="button"
                  onClick={() => handlePopularSearch("Internship")}
                  className="text-slate-300 transition hover:text-white"
                >
                  Internship
                </button>

              </div>

            </div>


            {/* Stats */}

            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-y-8 border-t border-white/10 pt-8 md:grid-cols-4 md:gap-y-0">

              <Stat
                number={jobs.length}
                label="Available Jobs"
              />

              <Stat
                number={companyCount}
                label="Companies"
              />

              <Stat
                number="Live"
                label="Job Listings"
              />

              <Stat
                number="24/7"
                label="Access"
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            CATEGORIES
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div className="max-w-2xl">

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Explore opportunities
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Find jobs by category
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                Explore opportunities across popular industries
                and find a role that matches your skills.
              </p>

            </div>

            <Link
              to="/jobs"
              className="font-semibold text-blue-600 transition hover:text-blue-900"
            >
              View all jobs →
            </Link>

          </div>


          {/* Categories */}

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {categories.map((category) => (

              <button
                type="button"
                key={category.title}
                onClick={() => handleCategorySearch(category.title)}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >

                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl ${category.color}`}
                >
                  {category.icon}
                </div>


                <div className="flex-1">

                  <h3 className="font-semibold text-slate-900">
                    {category.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {category.jobs}
                  </p>

                </div>


                <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">
                  →
                </span>

              </button>

            ))}

          </div>

        </section>


        {/* =====================================================
            FEATURED JOBS
        ====================================================== */}

        <section className="border-y border-slate-100 bg-slate-50">

          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Latest opportunities
                </p>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Featured jobs
                </h2>

                <p className="mt-3 text-slate-500">
                  Discover roles from companies currently hiring.
                </p>

              </div>

              <Link
                to="/jobs"
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Explore all →
              </Link>

            </div>


            {/* Job Cards */}

            {loadingJobs ? (

              <div className="mt-10 grid gap-5 lg:grid-cols-3">

                {[1, 2, 3].map((item) => (

                  <div
                    key={item}
                    className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white"
                  />

                ))}

              </div>

            ) : featuredJobs.length === 0 ? (

              <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center">

                <p className="text-slate-500">
                  No jobs are currently available.
                </p>

              </div>

            ) : (

              <div className="mt-10 grid gap-5 lg:grid-cols-3">

                {featuredJobs.map((job) => {

                  const companyName =
                    job.company?.name || "Company";

                  const companyLogo =
                    companyName.charAt(0).toUpperCase();

                  const skills = getSkills(job.skills);

                  return (

                    <Link
                      key={job.id}
                      to={`/jobs/${job.id}`}
                      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                    >

                      {/* Company */}

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 font-bold text-white">
                            {companyLogo}
                          </div>

                          <div>

                            <p className="font-semibold text-slate-900">
                              {companyName}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Verified company
                            </p>

                          </div>

                        </div>

                        <span className="text-lg text-slate-300 transition group-hover:text-blue-600">
                          ↗
                        </span>

                      </div>


                      {/* Job information */}

                      <div className="mt-6">

                        <h3 className="text-lg font-bold text-slate-900">
                          {job.title}
                        </h3>

                        <div className="mt-4 space-y-2 text-sm text-slate-500">

                          <p>
                            📍 {job.location || "Location not specified"}
                          </p>

                          <p>
                            💼 {formatType(job.jobType)}
                          </p>

                          <p className="font-semibold text-slate-700">
                            💰 {job.salary || "Salary not specified"}
                          </p>

                        </div>

                      </div>


                      {/* Skills */}

                      <div className="mt-5 flex flex-wrap gap-2">

                        {skills.slice(0, 5).map((skill) => (

                          <span
                            key={skill}
                            className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600"
                          >
                            {skill}
                          </span>

                        ))}

                      </div>


                      {/* Bottom */}

                      <div className="mt-6 border-t border-slate-100 pt-4">

                        <span className="text-sm font-semibold text-blue-600">
                          View job details →
                        </span>

                      </div>

                    </Link>

                  );
                })}

              </div>

            )}

          </div>

        </section>


        {/* =====================================================
            CANDIDATE + RECRUITER
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Candidate */}

            <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-8 sm:p-10">

              <div className="relative z-10">

                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200">
                  For job seekers
                </p>

                <h2 className="mt-4 max-w-lg text-3xl font-bold leading-tight text-white sm:text-4xl">

                  Build your profile.
                  <br />
                  Find your opportunity.

                </h2>

                <p className="mt-4 max-w-lg leading-7 text-blue-100">

                  Create your professional profile, upload your
                  resume and apply to jobs that match your skills.

                </p>

                 <Link
                to="/jobs"
                 className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Explore Jobs →
              </Link> 

              </div>

              <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-white/10" />

            </div>


            {/* Recruiter */}

            <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 sm:p-10">

              <div className="relative z-10">

                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-violet-400">
                  For recruiters
                </p>

                <h2 className="mt-4 max-w-lg text-3xl font-bold leading-tight text-white sm:text-4xl">

                  Find the right talent
                  <br />
                  for your team.

                </h2>

                <p className="mt-4 max-w-lg leading-7 text-slate-400">

                  Post jobs, manage applications and discover
                  talented candidates from one dashboard. A single
                  best platform to find and post relevant jobs from 
                  different companies.

                </p>

                

              </div>

              <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-violet-500/10" />

            </div>

          </div>

        </section>


        {/* =====================================================
            FINAL CTA
        ====================================================== */}

        <section className="px-6 pb-20">

          <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-14 text-center sm:px-12">

            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready for your next opportunity?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100">

              Join JobPortal and discover opportunities that
              can move your career forward.

            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                to="/jobs"
                className="rounded-xl bg-white px-7 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Explore Jobs
              </Link>

             

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}


/* =====================================================
   STAT COMPONENT
===================================================== */

function Stat({ number, label }) {
  return (
    <div className="text-center">

      <p className="text-2xl font-bold text-white">
        {number}
      </p>

      <p className="mt-2 text-xs text-slate-500">
        {label}
      </p>

    </div>
  );
}

export default Home;