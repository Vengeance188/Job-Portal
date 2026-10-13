import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import api from "../../services/api";

function Register() {

  const navigate = useNavigate();

  const [role, setRole] = useState("CANDIDATE");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

if (!emailRegex.test(formData.email.trim())) {
  setError("Please enter a valid email address.");
  return;
}

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      const response = await api.post("/api/auth/register", {
         name: formData.name,
         email: formData.email.trim(),
         password: formData.password,
         role: role,
       });

      console.log(response.data);

      setMessage("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {

      console.log(error);

      if (error.response) {
        setError(
          error.response.data.message ||
          "Registration failed"
        );
      } else {
        setError("Unable to connect to server");
      }
    }
  };

  return (
    <>


      <main className="min-h-screen bg-slate-50">

        <section className="px-6 py-12 sm:py-16 lg:px-8">

          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

            {/* Left Side */}
            <div className="hidden bg-slate-950 p-10 lg:flex lg:flex-col lg:justify-between">

              <div>

                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                    J
                  </div>

                  <span className="text-xl font-bold text-white">
                    Job<span className="text-blue-500">Portal</span>
                  </span>
                </div>

                <div className="mt-16">

                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                    Start your journey
                  </p>

                  <h1 className="mt-4 text-4xl font-bold leading-tight text-white">
                    Your next opportunity
                    <span className="block text-blue-500">
                      starts here.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-md leading-7 text-slate-400">
                    Create your account and discover jobs that match your
                    skills, experience, and career goals.
                  </p>

                </div>

              </div>

              <div className="mt-12 space-y-5">

                <Benefit
                  title="Discover opportunities"
                  text="Find jobs from companies hiring now."
                />

                <Benefit
                  title="Build your profile"
                  text="Showcase your skills and experience."
                />

                <Benefit
                  title="Apply with ease"
                  text="Apply to jobs with just a few clicks."
                />

              </div>

            </div>

            {/* Right Side */}
            <div className="p-6 sm:p-10 lg:p-12">

              <div className="mx-auto max-w-md">

                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Create your account
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Join JobPortal and start your career journey.
                  </p>
                </div>

                {/* Account Type */}
                <div className="mt-8">

                  <label className="text-sm font-semibold text-slate-700">
                    I am a
                  </label>

                  <div className="mt-3 grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      onClick={() => setRole("CANDIDATE")}
                      className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold ${
                        role === "CANDIDATE"
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      Job Seeker
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole("RECRUITER")}
                      className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold ${
                        role === "RECRUITER"
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      Recruiter
                    </button>

                  </div>

                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-5"
                >

                  {/* Full Name */}
                  <div>

                    <label className="text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  {/* Email */}
                  <div>

                    <label className="text-sm font-semibold text-slate-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  {/* Password */}
                  <div>

                    <label className="text-sm font-semibold text-slate-700">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Create a password"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Use at least 8 characters.
                    </p>

                  </div>

                  {/* Confirm Password */}
                  <div>

                    <label className="text-sm font-semibold text-slate-700">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Confirm your password"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  {/* Messages */}
                  {error && (
                    <p className="text-sm font-medium text-red-600">
                      {error}
                    </p>
                  )}

                  {message && (
                    <p className="text-sm font-medium text-green-600">
                      {message}
                    </p>
                  )}

                  {/* Terms */}
                  <div className="flex items-start gap-3">

                    <input
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    <p className="text-xs leading-5 text-slate-500">
                      I agree to the{" "}
                      <Link
                        to="/about"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/about"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>

                  </div>

                  {/* Register Button */}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                  >
                    Create Account
                  </button>

                </form>

                <p className="mt-7 text-center text-sm text-slate-500">

                  Already have an account?{" "}

                  <Link
                    to="/login"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Login
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

function Benefit({ title, text }) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-sm text-blue-400">
        ✓
      </div>

      <div>

        <h3 className="text-sm font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}

export default Register;