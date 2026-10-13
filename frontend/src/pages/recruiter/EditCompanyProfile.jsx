import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import RecruiterNavbar from "../../components/RecruiterNavbar";

function EditCompanyProfile() {
  const navigate = useNavigate();

  const [company, setCompany] = useState({
    name: "TechNova",
    industry: "Technology",
    size: "51-200 Employees",
    founded: "2018",
    about:
      "TechNova is a technology company focused on building modern software solutions and helping businesses grow through technology.",
    email: "hr@technova.com",
    phone: "+91 98765 43210",
    website: "https://technova.com",
    location: "Noida, Uttar Pradesh",
    linkedin: "https://linkedin.com/company/technova",
    github: "https://github.com/technova",
  });

  const [logo, setLogo] = useState(null);

  const handleChange = (e) => {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Company profile updated successfully!");

    navigate("/recruiter/company-profile");
  };

  return (
    <>
      <RecruiterNavbar />

      <main className="min-h-screen bg-slate-50">
        {/* Header */}
        <section className="bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <p className="text-sm font-medium text-blue-400">
              Recruiter Profile
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Edit Company Profile
            </h1>

            <p className="mt-2 text-slate-400">
              Update your company information and contact details.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Company Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Company Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Basic information about your company.
              </p>

              {/* Logo */}
              <div className="mt-6">
                <label className="text-sm font-semibold text-slate-700">
                  Company Logo
                </label>

                <div className="mt-3 flex items-center gap-5">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-slate-900 text-2xl font-bold text-white">
                    {logo ? (
                      <img
                        src={logo}
                        alt="Company Logo"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      "T"
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="logo"
                      className="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Change Logo
                    </label>

                    <input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      PNG, JPG or WEBP. Maximum 2MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Name + Industry */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Company Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={company.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Industry
                  </label>

                  <input
                    type="text"
                    name="industry"
                    value={company.industry}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    placeholder="Technology"
                  />
                </div>
              </div>

              {/* Size + Founded */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Company Size
                  </label>

                  <select
                    name="size"
                    value={company.size}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option>1-10 Employees</option>
                    <option>11-50 Employees</option>
                    <option>51-200 Employees</option>
                    <option>201-500 Employees</option>
                    <option>500+ Employees</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Founded Year
                  </label>

                  <input
                    type="number"
                    name="founded"
                    value={company.founded}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    placeholder="2018"
                  />
                </div>
              </div>

              {/* About */}
              <div className="mt-6">
                <label className="text-sm font-semibold text-slate-700">
                  About Company
                </label>

                <textarea
                  name="about"
                  value={company.about}
                  onChange={handleChange}
                  rows="5"
                  className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  placeholder="Tell candidates about your company..."
                />
              </div>
            </section>

            {/* Contact Information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Contact Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Contact details candidates can use to learn more about your
                company.
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={company.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    placeholder="hr@company.com"
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
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    placeholder="+91 98765 43210"
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
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    placeholder="https://company.com"
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
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    placeholder="Noida, Uttar Pradesh"
                  />
                </div>
              </div>
            </section>

            {/* Social Links */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Social Links
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    LinkedIn
                  </label>

                  <input
                    type="url"
                    name="linkedin"
                    value={company.linkedin}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    GitHub
                  </label>

                  <input
                    type="url"
                    name="github"
                    value={company.github}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
            </section>

            {/* Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link
                to="/recruiter/company-profile"
                className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default EditCompanyProfile;