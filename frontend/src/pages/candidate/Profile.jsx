
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/api/candidate/profile");
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Professional loading spinner
  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
            <p className="text-sm font-medium text-slate-500">
              Loading your profile...
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // Profile loading error
  if (!profile) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
          <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <span className="text-2xl">!</span>
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Unable to load profile
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We couldn't retrieve your profile information. Please try again.
            </p>

            <button
              onClick={() => {
                setLoading(true);
                fetchProfile();
              }}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const name = profile.user?.name || "Your Name";
  const email = profile.user?.email || "No email";
  const phone = profile.phone || "Not added";
  const location = profile.location || "Not added";

  const headline =
    profile.professionalHeadline || "Professional headline not added";

  const aboutMe =
    profile.aboutMe || "About information has not been added yet.";

  const skills = profile.skills
    ? profile.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "")
    : [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Header */}
        <section className="bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <p className="text-sm font-medium text-blue-400">
              Candidate Profile
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              My Profile
            </h1>

            <p className="mt-2 text-slate-400">
              View your professional information and career details.
            </p>
          </div>
        </section>

        {/* Profile Content */}
        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          {/* Profile Header Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                {/* Profile Image */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                  {name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {name}
                  </h2>

                  <p className="mt-1 text-slate-600">{headline}</p>

                  <p className="mt-2 text-sm text-slate-400">
                    📍 {location}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/candidate/applications"
                  className="w-fit rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  My Applications
                </Link>

                <Link
                  to="/candidate/edit-profile"
                  className="w-fit rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Left Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* About */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  About Me
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {aboutMe}
                </p>
              </section>

              {/* Skills */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Skills
                </h2>

                {skills.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-400">
                    No skills added yet.
                  </p>
                )}
              </section>

              {/* Education */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Education
                </h2>

                <div className="mt-5 border-l-2 border-blue-200 pl-5">
                  <h3 className="font-semibold text-slate-900">
                    B.Tech in Computer Science Engineering
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    Kashi Institute of Technology
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    2022 - 2026
                  </p>
                </div>
              </section>

              {/* Experience */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Experience
                </h2>

                <div className="mt-5 border-l-2 border-blue-200 pl-5">
                  <h3 className="font-semibold text-slate-900">
                    Java Full Stack Trainee
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    QSpiders
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    2026
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Learned Java, SQL, JDBC, Servlets, JSP, Spring Boot,
                    REST APIs, and frontend development.
                  </p>
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Contact */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Contact Information
                </h2>

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 break-words text-sm font-medium text-slate-700">
                      {email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {location}
                    </p>
                  </div>
                </div>
              </section>

              {/* Resume */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Resume
                </h2>

                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-sm font-bold text-red-600">
                      PDF
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {profile.resumeUrl
                          ? "Resume"
                          : "No resume uploaded"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {profile.resumeUrl
                          ? "Resume available"
                          : "Upload your resume from Edit Profile"}
                      </p>
                    </div>
                  </div>

                  {profile.resumeUrl && (
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      View Resume
                    </a>
                  )}
                </div>
              </section>

              {/* Profile Completion */}
              <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-slate-900">
                    Profile Completion
                  </h2>

                  <span className="text-sm font-bold text-blue-600">
                    80%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-100">
                  <div className="h-full w-[80%] rounded-full bg-blue-600" />
                </div>

                <p className="mt-3 text-sm text-slate-600">
                  Complete your profile to improve your chances of getting
                  noticed by recruiters.
                </p>

                <Link
                  to="/candidate/edit-profile"
                  className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Complete Profile →
                </Link>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Profile;
