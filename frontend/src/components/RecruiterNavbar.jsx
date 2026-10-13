import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function RecruiterNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  // =====================================================
  // GET LOGGED-IN RECRUITER
  // =====================================================

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("token");

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsMenuOpen(false);

    navigate("/login");
  };

  // =====================================================
  // RECRUITER NAVIGATION LINKS
  // =====================================================

  const navLinks = [
    {
      name: "Home",
      path: "/recruiter",
    },
    {
      name: "Dashboard",
      path: "/recruiter/dashboard",
    },
    {
      name: "Company",
      path: "/recruiter/company-profile",
    },
    {
      name: "Manage Jobs",
      path: "/recruiter/manage-jobs",
    },
    {
      name: "Applicants",
      path: "/recruiter/applicants",
    },
    {
      name: "About",
      path: "/recruiter/about",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* =================================================
            TOP NAVBAR
        ================================================== */}

        <div className="flex items-center justify-between py-4">

          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            to="/recruiter"
            className="flex items-center gap-2.5"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
              J
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              Job
              <span className="text-blue-600">
                Portal
              </span>
            </span>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <div className="hidden items-center gap-8 md:flex">

            {navLinks.map((link) => (

              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/recruiter"}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium transition-colors ${
                    isActive
                      ? "font-semibold text-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}

                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-blue-600" />
                    )}
                  </>
                )}
              </NavLink>

            ))}

          </div>

          {/* =================================================
              DESKTOP RIGHT SIDE
          ================================================== */}

          <div className="hidden items-center gap-3 md:flex">

            {isLoggedIn ? (

              <div className="flex items-center gap-3">

                {/* Recruiter Name */}

                <div className="hidden text-right lg:block">

                  <p className="text-sm font-semibold text-slate-900">
                    {user?.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    Recruiter
                  </p>

                </div>

                {/* Recruiter Avatar */}

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  {user?.name
                    ?.charAt(0)
                    ?.toUpperCase() || "R"}
                </div>

                {/* Logout */}

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                >
                  Logout
                </button>

              </div>

            ) : (

              <>
                <Link
                  to="/login"
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                >
                  Get Started
                </Link>
              </>

            )}

          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >

            {isMenuOpen ? (

              /* X icon */

              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

            ) : (

              /* Hamburger icon */

              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

            )}

          </button>

        </div>

        {/* =================================================
            MOBILE MENU
        ================================================== */}

        {isMenuOpen && (

          <div className="border-t border-slate-200 py-4 md:hidden">

            <div className="flex flex-col gap-2">

              {navLinks.map((link) => (

                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/recruiter"}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 font-semibold text-blue-600"
                        : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  {link.name}
                </NavLink>

              ))}

              {/* =================================================
                  MOBILE RECRUITER INFORMATION
              ================================================== */}

              {isLoggedIn && (

                <div className="mt-2 border-t border-slate-200 pt-4">

                  <div className="mb-3 flex items-center gap-3 px-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                      {user?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "R"}
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-slate-900">
                        {user?.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        Recruiter
                      </p>

                    </div>

                  </div>

                </div>

              )}

              {/* =================================================
                  MOBILE BUTTONS
              ================================================== */}

              <div className="mt-2 flex gap-2 border-t border-slate-200 pt-4">

                {isLoggedIn ? (

                  <button
                    onClick={handleLogout}
                    className="w-full rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Logout
                  </button>

                ) : (

                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
                    >
                      Get Started
                    </Link>
                  </>

                )}

              </div>

            </div>

          </div>

        )}

      </div>
    </nav>
  );
}

export default RecruiterNavbar;