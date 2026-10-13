import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import RecruiterNavbar from "../../components/RecruiterNavbar";
import api from "../../services/api";

function CompanyProfile() {
  const [logo, setLogo] = useState(null);

  const [company, setCompany] = useState({
    name: "",
    industry: "",
    size: "",
    foundedYear: "",
    about: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    linkedin: "",
    github: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // Get Company Data
  // =========================
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/companies/my-company");

        setCompany({
          name: response.data.name || "",
          industry: response.data.industry || "",
          size: response.data.size || "",
          foundedYear: response.data.foundedYear || "",
          about: response.data.about || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          website: response.data.website || "",
          location: response.data.location || "",
          linkedin: response.data.linkedin || "",
          github: response.data.github || "",
        });
      } catch (error) {
        console.error("Failed to fetch company:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load company profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  // =========================
  // Handle Input Changes
  // =========================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setCompany((previousCompany) => ({
      ...previousCompany,
      [name]: value,
    }));

    // Remove messages when user starts editing
    setError("");
    setSuccess("");
  };

  // =========================
  // Handle Logo Preview
  // =========================
  const handleLogoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  // =========================
  // Update Company
  // =========================
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const requestData = {
        ...company,
        foundedYear:
          company.foundedYear === ""
            ? null
            : Number(company.foundedYear),
      };

      const response = await api.put(
        "/api/companies/my-company",
        requestData
      );

      setCompany({
        name: response.data.name || "",
        industry: response.data.industry || "",
        size: response.data.size || "",
        foundedYear: response.data.foundedYear || "",
        about: response.data.about || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
        website: response.data.website || "",
        location: response.data.location || "",
        linkedin: response.data.linkedin || "",
        github: response.data.github || "",
      });

      setSuccess("Company profile updated successfully!");

    } catch (error) {
      console.error("Failed to update company:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update company profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Loading Screen
  // =========================
  if (loading) {
    return (
      <>
        <RecruiterNavbar />

        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

            <p className="mt-4 text-sm font-medium text-slate-600">
              Loading company profile...
            </p>
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

        {/* =========================
            Header
        ========================= */}
        <section className="bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

            <p className="text-sm font-medium text-blue-400">
              Recruiter Portal
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Company Profile
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your company information and public profile.
            </p>

          </div>
        </section>

        {/* =========================
            Form
        ========================= */}
        <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8">

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* =========================
                Company Basic Information
            ========================= */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Company Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Basic information about your company.
              </p>

              {/* Logo */}
              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">

                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 text-2xl font-bold text-white">

                  {logo ? (
                    <img
                      src={logo}
                      alt="Company logo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    company.name
                      ? company.name.charAt(0).toUpperCase()
                      : "C"
                  )}

                </div>

                <div>

                  <p className="font-semibold text-slate-900">
                    Company Logo
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Upload your company logo.
                  </p>

                  <label className="mt-3 inline-block cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">

                    Upload Logo

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />

                  </label>

                </div>

              </div>

              {/* Company fields */}
              <div className="mt-8 grid gap-5 md:grid-cols-2">

                {/* Company Name */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Company Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={company.name}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Industry
                  </label>

                  <input
                    type="text"
                    name="industry"
                    value={company.industry}
                    onChange={handleChange}
                    placeholder="Example: Information Technology"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Company Size */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Company Size
                  </label>

                  <select
                    name="size"
                    value={company.size}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>

                {/* Founded Year */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Founded Year
                  </label>

                  <input
                    type="number"
                    name="foundedYear"
                    value={company.foundedYear}
                    onChange={handleChange}
                    placeholder="Example: 2018"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>
            </section>

            {/* =========================
                About Company
            ========================= */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                About Company
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tell candidates about your company.
              </p>

              <div className="mt-6">

                <label className="text-sm font-semibold text-slate-700">
                  Company Description
                </label>

                <textarea
                  name="about"
                  value={company.about}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Write about your company..."
                  className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </section>

            {/* =========================
                Contact Information
            ========================= */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Contact Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Contact details candidates can use to identify your company.
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Company Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={company.email}
                    onChange={handleChange}
                    placeholder="hr@example.com"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={company.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Website
                  </label>

                  <input
                    type="url"
                    name="website"
                    value={company.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={company.location}
                    onChange={handleChange}
                    placeholder="Noida, Uttar Pradesh"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

            </section>

            {/* =========================
                Social Links
            ========================= */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Social Links
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add your company's social media profiles.
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                {/* LinkedIn */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    LinkedIn
                  </label>

                  <input
                    type="url"
                    name="linkedin"
                    value={company.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn company URL"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* GitHub */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    GitHub
                  </label>

                  <input
                    type="url"
                    name="github"
                    value={company.github}
                    onChange={handleChange}
                    placeholder="GitHub company URL"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

            </section>

            {/* =========================
                Messages
            ========================= */}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {success}
              </div>
            )}

            {/* =========================
                Buttons
            ========================= */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <Link
                to="/recruiter/dashboard"
                className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Company Profile"}
              </button>

            </div>

          </form>

        </section>
      </main>

      <Footer />
    </>
  );
}

export default CompanyProfile;