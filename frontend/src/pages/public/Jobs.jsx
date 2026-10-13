import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import JobCard from "../../components/JobCard";
import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

function Jobs() {

  const [searchParams, setSearchParams] = useSearchParams();

  /* =====================================================
     SEARCH
  ====================================================== */

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );

  const [locationInput, setLocationInput] = useState(
    searchParams.get("location") || ""
  );

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const [searchLocation, setSearchLocation] = useState(
    searchParams.get("location") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );


  /* =====================================================
     DATA
  ====================================================== */

  const [jobs, setJobs] = useState([]);
  const [savedJobIds, setSavedJobIds] = useState([]);

  const [loading, setLoading] = useState(true);


  /* =====================================================
     FILTERS
  ====================================================== */

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState([]);


  /* =====================================================
     SORT + PAGINATION
  ====================================================== */

  const [sortBy, setSortBy] = useState("latest");

  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 5;


  /* =====================================================
     FETCH JOBS
  ====================================================== */

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, []);


  const fetchJobs = async () => {
    try {

      const response = await api.get("/api/jobs");

      setJobs(response.data || []);

    } catch (error) {

      console.error("Error fetching jobs:", error);

    } finally {

      setLoading(false);

    }
  };


  /* =====================================================
     FETCH SAVED JOBS
  ====================================================== */

  const fetchSavedJobs = async () => {

    if (!localStorage.getItem("token")) {
      return;
    }

    try {

      const response = await api.get(
        "/api/candidate/saved-jobs"
      );

      const ids = response.data.map(
        (savedJob) => savedJob.job.id
      );

      setSavedJobIds(ids);

    } catch (error) {

      console.error(
        "Error fetching saved jobs:",
        error
      );

    }
  };


  /* =====================================================
     READ URL PARAMETERS
  ====================================================== */

  useEffect(() => {

    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";
    const categoryValue = searchParams.get("category") || "";

    setSearchInput(search);
    setLocationInput(location);

    setSearchTerm(search);
    setSearchLocation(location);

    setCategory(categoryValue);

    setCurrentPage(1);

  }, [searchParams]);


  /* =====================================================
     SEARCH HANDLER
  ====================================================== */

  const handleSearch = (e) => {

    e.preventDefault();

    const params = new URLSearchParams();

    if (searchInput.trim()) {
      params.set(
        "search",
        searchInput.trim()
      );
    }

    if (locationInput.trim()) {
      params.set(
        "location",
        locationInput.trim()
      );
    }

    setSearchParams(params);

    setCurrentPage(1);
  };


  /* =====================================================
     CLEAR ALL FILTERS
  ====================================================== */

  const clearFilters = () => {

    setSearchInput("");
    setLocationInput("");

    setSearchTerm("");
    setSearchLocation("");

    setCategory("");

    setSelectedLocations([]);
    setSelectedTypes([]);
    setSelectedExperience([]);
    setSelectedSalary([]);

    setSortBy("latest");

    setCurrentPage(1);

    setSearchParams({});
  };


  /* =====================================================
     FILTER TOGGLE
  ====================================================== */

  const toggleFilter = (
    setter,
    currentValues,
    value
  ) => {

    setter(
      currentValues.includes(value)
        ? currentValues.filter(
            (item) => item !== value
          )
        : [...currentValues, value]
    );

    setCurrentPage(1);
  };


  /* =====================================================
     NORMALIZE
  ====================================================== */

  const normalize = (value) => {

    return String(value || "")
      .toLowerCase()
      .replaceAll("_", " ")
      .trim();

  };


  /* =====================================================
     SALARY FILTER
  ====================================================== */

  const matchesSalary = (
    salary,
    selectedRanges
  ) => {

    if (selectedRanges.length === 0) {
      return true;
    }

    if (!salary) {
      return false;
    }

    const salaryText = String(salary)
      .toLowerCase()
      .replaceAll(",", "");

    const numbers = salaryText.match(
      /\d+(\.\d+)?/g
    );

    if (!numbers || numbers.length === 0) {
      return false;
    }

    let salaryValue = Math.max(
      ...numbers.map(Number)
    );

    /*
     * If salary contains L / LPA,
     * treat number as Lakhs.
     */
    if (
      salaryText.includes("lpa") ||
      salaryText.includes("lakh") ||
      salaryText.includes("lac") ||
      salaryText.includes("₹")
    ) {
      salaryValue = salaryValue * 100000;
    }

    return selectedRanges.some((range) => {

      switch (range) {

        case "0-3":
          return salaryValue < 300000;

        case "3-6":
          return (
            salaryValue >= 300000 &&
            salaryValue < 600000
          );

        case "6-10":
          return (
            salaryValue >= 600000 &&
            salaryValue < 1000000
          );

        case "10+":
          return salaryValue >= 1000000;

        default:
          return true;
      }

    });
  };


  /* =====================================================
     FILTER + SORT
  ====================================================== */

  const filteredAndSortedJobs = useMemo(() => {

    let result = [...jobs];


    /* ---------------------------------------------
       SEARCH
    --------------------------------------------- */

    if (searchTerm.trim()) {

      const search = normalize(searchTerm);

      result = result.filter((job) => {

        const searchableText = normalize(`
          ${job.title || ""}
          ${job.description || ""}
          ${job.skills || ""}
          ${job.company?.name || ""}
        `);

        /*
         * Every word typed by user must
         * exist somewhere in the job.
         */

        return search
          .split(/\s+/)
          .filter(Boolean)
          .every((word) =>
            searchableText.includes(word)
          );

      });

    }


    /* ---------------------------------------------
       LOCATION SEARCH
    --------------------------------------------- */

    if (searchLocation.trim()) {

      const location = normalize(
        searchLocation
      );

      result = result.filter((job) => {

        return normalize(
          job.location
        ).includes(location);

      });

    }


    /* ---------------------------------------------
       CATEGORY
    --------------------------------------------- */

    if (category.trim()) {

      const categorySearch =
        normalize(category);

      result = result.filter((job) => {

        const searchableText = normalize(`
          ${job.title || ""}
          ${job.description || ""}
          ${job.skills || ""}
        `);

        /*
         * Category is inferred from job content
         * because Job currently has no category field.
         */

        const categoryKeywords = {

          software: [
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
            "fullstack"
          ],

          data: [
            "data",
            "analyst",
            "analytics",
            "sql",
            "python",
            "excel"
          ],

          design: [
            "design",
            "designer",
            "ui",
            "ux",
            "figma",
            "creative"
          ],

          mobile: [
            "mobile",
            "android",
            "ios",
            "flutter",
            "react native",
            "kotlin",
            "swift"
          ],

          marketing: [
            "marketing",
            "sales",
            "seo",
            "digital marketing",
            "business development"
          ],

          engineering: [
            "engineer",
            "engineering",
            "devops",
            "cloud",
            "aws",
            "azure",
            "docker",
            "kubernetes"
          ]

        };

        const keywords =
          categoryKeywords[
            categorySearch
          ] || [categorySearch];

        return keywords.some(
          (keyword) =>
            searchableText.includes(
              normalize(keyword)
            )
        );

      });

    }


    /* ---------------------------------------------
       LOCATION CHECKBOX
    --------------------------------------------- */

    if (selectedLocations.length > 0) {

      result = result.filter((job) => {

        const jobLocation =
          normalize(job.location);

        return selectedLocations.some(
          (location) =>
            jobLocation.includes(
              normalize(location)
            )
        );

      });

    }


    /* ---------------------------------------------
       JOB TYPE
    --------------------------------------------- */

    if (selectedTypes.length > 0) {

      result = result.filter((job) => {

        const jobType =
          normalize(job.jobType);

        return selectedTypes.some(
          (type) =>
            jobType === normalize(type)
        );

      });

    }


    /* ---------------------------------------------
       EXPERIENCE
    --------------------------------------------- */

    if (selectedExperience.length > 0) {

      result = result.filter((job) => {

        const experience =
          normalize(job.experience);

        return selectedExperience.some(
          (item) =>
            experience.includes(
              normalize(item)
            )
        );

      });

    }


    /* ---------------------------------------------
       SALARY
    --------------------------------------------- */

    if (selectedSalary.length > 0) {

      result = result.filter((job) =>
        matchesSalary(
          job.salary,
          selectedSalary
        )
      );

    }


    /* ---------------------------------------------
       SORT
    --------------------------------------------- */

    if (sortBy === "latest") {

      result.sort((a, b) => {

        const dateA = a.postedDate
          ? new Date(a.postedDate).getTime()
          : 0;

        const dateB = b.postedDate
          ? new Date(b.postedDate).getTime()
          : 0;

        return dateB - dateA;

      });

    }


    if (sortBy === "salary-high") {

      result.sort((a, b) => {

        const getSalary = (salary) => {

          if (!salary) return 0;

          const numbers =
            String(salary).match(
              /\d+(\.\d+)?/g
            );

          if (!numbers) return 0;

          return Math.max(
            ...numbers.map(Number)
          );

        };

        return (
          getSalary(b.salary) -
          getSalary(a.salary)
        );

      });

    }


    if (sortBy === "experience") {

      result.sort((a, b) => {

        return normalize(
          a.experience
        ).localeCompare(
          normalize(b.experience)
        );

      });

    }


    return result;

  }, [
    jobs,
    searchTerm,
    searchLocation,
    category,
    selectedLocations,
    selectedTypes,
    selectedExperience,
    selectedSalary,
    sortBy
  ]);


  /* =====================================================
     PAGINATION
  ====================================================== */

  const totalPages = Math.ceil(
    filteredAndSortedJobs.length /
      jobsPerPage
  );


  const paginatedJobs =
    filteredAndSortedJobs.slice(
      (currentPage - 1) *
        jobsPerPage,

      currentPage *
        jobsPerPage
    );


  /* =====================================================
     PAGE CHANGE
  ====================================================== */

  const goToPage = (page) => {

    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  /* =====================================================
     SAVE STATE CHANGE
  ====================================================== */

  const handleSaveChange = (
    jobId,
    isSaved
  ) => {

    setSavedJobIds((previousIds) => {

      if (isSaved) {

        return [
          ...new Set([
            ...previousIds,
            jobId
          ])
        ];

      }

      return previousIds.filter(
        (id) => id !== jobId
      );

    });

  };


  /* =====================================================
     LOADING
  ====================================================== */

  if (loading) {

    return (
      <>
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading jobs...
            </p>

          </div>

        </div>

        <Footer />
      </>
    );

  }


  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* =====================================================
            HERO / SEARCH
        ====================================================== */}

        <section className="bg-slate-950">

          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

            <div className="mx-auto max-w-4xl">

              <h1 className="text-center text-3xl font-bold text-white sm:text-4xl">
                Find your next opportunity
              </h1>

              <p className="mt-3 text-center text-slate-400">
                Search thousands of jobs from companies hiring now.
              </p>


              <form
                onSubmit={handleSearch}
                className="mt-8 rounded-2xl bg-white p-2 shadow-xl"
              >

                <div className="flex flex-col gap-2 md:flex-row">

                  <div className="flex flex-1 items-center gap-3 px-4">

                    <span>
                      🔍
                    </span>

                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) =>
                        setSearchInput(
                          e.target.value
                        )
                      }
                      placeholder="Job title, skills or keywords"
                      className="w-full py-4 text-sm outline-none"
                    />

                  </div>


                  <div className="hidden h-10 self-center border-l border-slate-200 md:block" />


                  <div className="flex flex-1 items-center gap-3 px-4">

                    <span>
                      📍
                    </span>

                    <input
                      type="text"
                      value={locationInput}
                      onChange={(e) =>
                        setLocationInput(
                          e.target.value
                        )
                      }
                      placeholder="Location"
                      className="w-full py-4 text-sm outline-none"
                    />

                  </div>


                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-8 py-4 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Search
                  </button>

                </div>

              </form>

            </div>

          </div>

        </section>


        {/* =====================================================
            CONTENT
        ====================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

            {/* =================================================
                SIDEBAR
            ================================================== */}

            <aside className="hidden lg:block">

              <div className="rounded-2xl border border-slate-200 bg-white p-5">

                <div className="flex items-center justify-between">

                  <h2 className="font-bold text-slate-900">
                    Filters
                  </h2>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </button>

                </div>


                <div className="mt-6">

                  <FilterSection title="Location">

                    {[
                      "Noida",
                      "Bangalore",
                      "Hyderabad",
                      "Delhi",
                      "Mumbai",
                      "Remote"
                    ].map((location) => (

                      <FilterOption
                        key={location}
                        label={location}
                        checked={selectedLocations.includes(location)}
                        onChange={() =>
                          toggleFilter(
                            setSelectedLocations,
                            selectedLocations,
                            location
                          )
                        }
                      />

                    ))}

                  </FilterSection>


                  <FilterSection title="Job Type">

                    {[
                      "Full Time",
                      "Part Time",
                      "Internship",
                      "Contract"
                    ].map((type) => (

                      <FilterOption
                        key={type}
                        label={type}
                        checked={selectedTypes.includes(type)}
                        onChange={() =>
                          toggleFilter(
                            setSelectedTypes,
                            selectedTypes,
                            type
                          )
                        }
                      />

                    ))}

                  </FilterSection>


                  <FilterSection title="Experience">

                    {[
                      "Fresher",
                      "0-1 Years",
                      "1-3 Years",
                      "3-5 Years",
                      "5+ Years"
                    ].map((experience) => (

                      <FilterOption
                        key={experience}
                        label={experience}
                        checked={selectedExperience.includes(experience)}
                        onChange={() =>
                          toggleFilter(
                            setSelectedExperience,
                            selectedExperience,
                            experience
                          )
                        }
                      />

                    ))}

                  </FilterSection>


                  <FilterSection title="Salary">

                    {[
                      {
                        label: "Below ₹3 LPA",
                        value: "0-3"
                      },
                      {
                        label: "₹3 - ₹6 LPA",
                        value: "3-6"
                      },
                      {
                        label: "₹6 - ₹10 LPA",
                        value: "6-10"
                      },
                      {
                        label: "₹10+ LPA",
                        value: "10+"
                      }
                    ].map((salary) => (

                      <FilterOption
                        key={salary.value}
                        label={salary.label}
                        checked={selectedSalary.includes(
                          salary.value
                        )}
                        onChange={() =>
                          toggleFilter(
                            setSelectedSalary,
                            selectedSalary,
                            salary.value
                          )
                        }
                      />

                    ))}

                  </FilterSection>

                </div>

              </div>

            </aside>


            {/* =================================================
                JOB RESULTS
            ================================================== */}

            <div>

              {/* Result Header */}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-sm text-slate-500">

                    Showing{" "}

                    <span className="font-semibold text-slate-900">
                      {filteredAndSortedJobs.length}
                    </span>{" "}

                    jobs

                  </p>

                </div>


                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm outline-none"
                >

                  <option value="latest">
                    Sort by Latest
                  </option>

                  <option value="salary-high">
                    Salary: High to Low
                  </option>

                  <option value="experience">
                    Experience
                  </option>

                </select>

              </div>


              {/* Mobile Filters */}

              <div className="mt-5 grid gap-3 lg:hidden">

                <select
                  value=""
                  onChange={(e) => {

                    if (!e.target.value) return;

                    toggleFilter(
                      setSelectedLocations,
                      selectedLocations,
                      e.target.value
                    );

                    e.target.value = "";

                  }}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"
                >

                  <option value="">
                    Filter by Location
                  </option>

                  <option value="Noida">
                    Noida
                  </option>

                  <option value="Bangalore">
                    Bangalore
                  </option>

                  <option value="Hyderabad">
                    Hyderabad
                  </option>

                  <option value="Delhi">
                    Delhi
                  </option>

                  <option value="Mumbai">
                    Mumbai
                  </option>

                  <option value="Remote">
                    Remote
                  </option>

                </select>


                <select
                  value=""
                  onChange={(e) => {

                    if (!e.target.value) return;

                    toggleFilter(
                      setSelectedTypes,
                      selectedTypes,
                      e.target.value
                    );

                    e.target.value = "";

                  }}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"
                >

                  <option value="">
                    Filter by Job Type
                  </option>

                  <option value="Full Time">
                    Full Time
                  </option>

                  <option value="Part Time">
                    Part Time
                  </option>

                  <option value="Internship">
                    Internship
                  </option>

                  <option value="Contract">
                    Contract
                  </option>

                </select>


                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  Clear Filters
                </button>

              </div>


              {/* Active Filters */}

              {(selectedLocations.length > 0 ||
                selectedTypes.length > 0 ||
                selectedExperience.length > 0 ||
                selectedSalary.length > 0 ||
                searchTerm ||
                searchLocation ||
                category) && (

                <div className="mt-5 flex flex-wrap gap-2">

                  {searchTerm && (
                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                      Search: {searchTerm}
                    </span>
                  )}

                  {searchLocation && (
                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                      Location: {searchLocation}
                    </span>
                  )}

                  {category && (
                    <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700">
                      Category: {category}
                    </span>
                  )}

                  {selectedLocations.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}

                  {selectedTypes.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}

                  {selectedExperience.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}

                  {selectedSalary.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      Salary {item}
                    </span>
                  ))}

                </div>

              )}


              {/* Jobs */}

              <div className="mt-6 space-y-5">

                {paginatedJobs.length === 0 ? (

                  <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">

                    <div className="text-4xl">
                      🔍
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      No jobs found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Try changing your search or filters.
                    </p>

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Clear Filters
                    </button>

                  </div>

                ) : (

                  paginatedJobs.map((job) => (

                    <JobCard
                      key={job.id}
                      job={job}
                      initiallySaved={
                        savedJobIds.includes(job.id)
                      }
                      onSaveChange={
                        handleSaveChange
                      }
                    />

                  ))

                )}

              </div>


              {/* Pagination */}

              {totalPages > 1 && (

                <div className="mt-8 flex items-center justify-center gap-2">

                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      goToPage(
                        currentPage - 1
                      )
                    }
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ←
                  </button>


                  {Array.from(
                    {
                      length: totalPages
                    },
                    (_, index) =>
                      index + 1
                  ).map((page) => (

                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        goToPage(page)
                      }
                      className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {page}
                    </button>

                  ))}


                  <button
                    type="button"
                    disabled={
                      currentPage === totalPages
                    }
                    onClick={() =>
                      goToPage(
                        currentPage + 1
                      )
                    }
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    →
                  </button>

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


/* =====================================================
   FILTER SECTION
===================================================== */

function FilterSection({
  title,
  children
}) {

  return (

    <div className="border-t border-slate-100 py-5 first:border-t-0">

      <h3 className="mb-3 text-sm font-semibold text-slate-900">
        {title}
      </h3>

      <div className="space-y-3">
        {children}
      </div>

    </div>

  );

}


/* =====================================================
   FILTER OPTION
===================================================== */

function FilterOption({
  label,
  checked,
  onChange
}) {

  return (

    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
      />

      <span>
        {label}
      </span>

    </label>

  );

}

export default Jobs;