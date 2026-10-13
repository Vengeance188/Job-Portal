import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

function CompanyDetails() {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/api/companies/${id}`);

        setCompany(response.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
        setError("Unable to load company details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <>
        <Navbar />

        <section className="min-h-screen bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-5xl animate-pulse">
            <div className="h-48 rounded-3xl bg-gray-200"></div>

            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              <div className="h-80 rounded-2xl bg-gray-200 lg:col-span-2"></div>
              <div className="h-80 rounded-2xl bg-gray-200"></div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }

  // Error
  if (error || !company) {
    return (
      <>
        <Navbar />

        <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
          <div className="rounded-2xl bg-white px-8 py-16 text-center shadow-sm">
            <div className="text-5xl">⚠️</div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Company not found
            </h2>

            <p className="mt-2 text-gray-500">
              {error || "The company you're looking for does not exist."}
            </p>

            <Link
              to="/companies"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Companies
            </Link>
          </div>
        </section>

        <Footer />
      </>
    );
  }

  const companyLogo = company.name
    ? company.name.charAt(0).toUpperCase()
    : "C";

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Back */}
          <Link
            to="/companies"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            ← Back to Companies
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* Company Logo */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-4xl font-bold shadow-lg">
              {companyLogo}
            </div>

            {/* Company Info */}
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
                Company Profile
              </p>

              <h1 className="text-4xl font-bold md:text-5xl">
                {company.name}
              </h1>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-slate-300">
                {company.industry && (
                  <span>🏢 {company.industry}</span>
                )}

                {company.location && (
                  <span>📍 {company.location}</span>
                )}

                {company.size && (
                  <span>👥 {company.size} employees</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Left Content */}
            <div className="space-y-8 lg:col-span-2">

              {/* About */}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900">
                  About {company.name}
                </h2>

                <p className="mt-4 leading-7 text-gray-600">
                  {company.about ||
                    "No company description has been provided yet."}
                </p>
              </div>

              {/* Company Information */}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900">
                  Company Information
                </h2>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">

                  {company.industry && (
                    <InfoItem
                      icon="🏢"
                      label="Industry"
                      value={company.industry}
                    />
                  )}

                  {company.size && (
                    <InfoItem
                      icon="👥"
                      label="Company Size"
                      value={`${company.size} employees`}
                    />
                  )}

                  {company.foundedYear && (
                    <InfoItem
                      icon="📅"
                      label="Founded"
                      value={company.foundedYear}
                    />
                  )}

                  {company.location && (
                    <InfoItem
                      icon="📍"
                      label="Location"
                      value={company.location}
                    />
                  )}

                  {company.email && (
                    <InfoItem
                      icon="✉️"
                      label="Email"
                      value={company.email}
                    />
                  )}

                  {company.phone && (
                    <InfoItem
                      icon="📞"
                      label="Phone"
                      value={company.phone}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">

              {/* Company Links */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900">
                  Company Links
                </h2>

                <div className="mt-5 space-y-3">

                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                    >
                      🌐
                      <span>Company Website</span>
                    </a>
                  )}

                  {company.linkedin && (
                    <a
                      href={company.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                    >
                      💼
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {company.github && (
                    <a
                      href={company.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                    >
                      💻
                      <span>GitHub</span>
                    </a>
                  )}

                  {!company.website &&
                    !company.linkedin &&
                    !company.github && (
                      <p className="text-sm text-gray-500">
                        No company links available.
                      </p>
                    )}
                </div>
              </div>

              {/* Contact */}
              <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-sm">
                <h2 className="text-xl font-bold">
                  Interested in {company.name}?
                </h2>

                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Learn more about this company and explore the
                  opportunities available on our job portal.
                </p>

                {company.email && (
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-5 block rounded-lg bg-white px-4 py-3 text-center font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    Contact Company
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* Information Item */
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default CompanyDetails;