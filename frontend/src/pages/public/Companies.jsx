import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

function Companies() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch companies from backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/companies");

        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setError("Unable to load companies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Get unique industries from backend data
  const industries = [
    "All",
    ...new Set(
      companies
        .map((company) => company.industry)
        .filter((industry) => industry)
    ),
  ];

  // Search + industry filter
  const filteredCompanies = companies.filter((company) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      company.name?.toLowerCase().includes(searchText) ||
      company.industry?.toLowerCase().includes(searchText) ||
      company.location?.toLowerCase().includes(searchText);

    const matchesIndustry =
      industry === "All" || company.industry === industry;

    return matchesSearch && matchesIndustry;
  });

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6 py-20 text-white sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Explore Opportunities
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Discover Top Companies
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Explore companies, discover their culture, and find your next
            career opportunity.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="flex items-center rounded-xl bg-white p-2 shadow-lg">
              <span className="px-3 text-xl text-gray-400">⌕</span>

              <input
                type="text"
                placeholder="Search companies, industries or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-2 py-3 text-gray-800 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Companies
              </h2>

              {!loading && !error && (
                <p className="mt-1 text-gray-500">
                  {filteredCompanies.length} companies found
                </p>
              )}
            </div>

            {/* Industry Filter */}
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              disabled={loading || error}
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              {industries.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gray-200"></div>

                    <div className="flex-1">
                      <div className="h-5 w-32 rounded bg-gray-200"></div>
                      <div className="mt-2 h-4 w-40 rounded bg-gray-200"></div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="h-4 w-48 rounded bg-gray-200"></div>
                    <div className="h-4 w-40 rounded bg-gray-200"></div>
                    <div className="h-4 w-44 rounded bg-gray-200"></div>
                  </div>

                  <div className="mt-6 h-11 rounded-lg bg-gray-200"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
              <div className="text-5xl">⚠️</div>

              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Something went wrong
              </h3>

              <p className="mt-2 text-gray-500">
                {error}
              </p>
            </div>
          )}

          {/* Companies */}
          {!loading && !error && filteredCompanies.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCompanies.map((company) => {
                const companyLogo = company.name
                  ? company.name.charAt(0).toUpperCase()
                  : "C";

                return (
                  <div
                    key={company.id}
                    className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    {/* Logo + Name */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl font-bold text-blue-600">
                          {companyLogo}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {company.name}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            {company.industry || "Industry not specified"}
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Hiring
                      </span>
                    </div>

                    {/* Company Details */}
                    <div className="mt-6 space-y-3 text-sm text-gray-600">

                      {company.location && (
                        <div className="flex items-center gap-3">
                          <span>📍</span>
                          <span>{company.location}</span>
                        </div>
                      )}

                      {company.size && (
                        <div className="flex items-center gap-3">
                          <span>👥</span>
                          <span>{company.size} employees</span>
                        </div>
                      )}

                      {company.foundedYear && (
                        <div className="flex items-center gap-3">
                          <span>🏢</span>
                          <span>Founded in {company.foundedYear}</span>
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <Link
                      to={`/companies/${company.id}`}
                      className="mt-6 block w-full rounded-lg border border-blue-600 py-3 text-center font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                    >
                      View Company
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* No Companies */}
          {!loading && !error && filteredCompanies.length === 0 && (
            <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
              <div className="text-5xl">🔍</div>

              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                No companies found
              </h3>

              <p className="mt-2 text-gray-500">
                Try searching for a different company or industry.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Companies;