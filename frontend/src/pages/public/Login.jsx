
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true"
  );

  // Handle saved email and clear previous authentication
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/api/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      const user = response.data;

      // Remember email only when selected
      if (rememberMe) {
        localStorage.setItem(
          "rememberedEmail",
          formData.email.trim()
        );
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.setItem("rememberMe", "false");
      }

      // Store JWT
      localStorage.setItem("token", user.token);

      // Store user information
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );

      // Redirect according to role
      if (user.role === "CANDIDATE") {
        navigate("/candidate/dashboard");
      } else if (user.role === "RECRUITER") {
        navigate("/recruiter/dashboard");
      } else {
        setError("Unknown user role.");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Invalid email or password"
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

                <div className="mt-20">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
                    Welcome back
                  </p>

                  <h1 className="mt-4 text-4xl font-bold leading-tight text-white">
                    Continue your
                    <span className="block text-blue-500">
                      career journey.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-md leading-7 text-slate-400">
                    Sign in to discover new opportunities, manage
                    your applications, and connect with great companies.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-medium text-white">
                  Looking for your next opportunity?
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Explore thousands of jobs from companies hiring now.
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="mx-auto max-w-md">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">
                    Welcome back
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Sign in to your JobPortal account.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-sm font-semibold text-slate-700"
                      >
                        Password
                      </label>

                      <Link
                        to="/forgot-password"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <p
                      role="alert"
                      className="text-sm font-medium text-red-600"
                    >
                      {error}
                    </p>
                  )}

                  {/* Remember Me */}
                  <div className="flex items-center gap-3">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="rememberMe"
                      className="text-sm text-slate-500"
                    >
                      Remember me
                    </label>
                  </div>

                  {/* Login */}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                  >
                    Login
                  </button>
                </form>

                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200" />

                  <span className="text-xs text-slate-400">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <p className="text-center text-sm text-slate-500">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
