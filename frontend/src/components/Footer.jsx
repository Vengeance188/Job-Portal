import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">

            <Link
              to="/"
              className="flex items-center gap-2.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                J
              </div>

              <span className="text-xl font-bold tracking-tight text-white">
                Job<span className="text-blue-500">Portal</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Find your next opportunity, build your career, and connect with
              companies looking for talented people.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">

              <a
                href="https://www.linkedin.com/in/abhinavsingh188?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-sm font-semibold text-slate-300 transition hover:bg-blue-600 hover:text-white"
                aria-label="LinkedIn"
              >
                in
              </a>

              <a
                href="https://github.com/Vengeance188"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-sm font-semibold text-slate-300 transition hover:bg-blue-600 hover:text-white"
                aria-label="GitHub"
              >
                GH
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-sm font-semibold text-slate-300 transition hover:bg-blue-600 hover:text-white"
                aria-label="Twitter"
              >
                X
              </a>

            </div>

          </div>


          {/* For Candidates */}
          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For Candidates
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/jobs"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Find Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Create Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/jobs"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Browse Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Candidate Login
                </Link>
              </li>

            </ul>

          </div>


          {/* For Recruiters */}
          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For Recruiters
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/register"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Post a Job
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Find Talent
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Recruiter Account
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Recruiter Login
                </Link>
              </li>

            </ul>

          </div>


          {/* Company */}
          <div>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">

              <li>
                <Link
                  to="/about"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/companies"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

            </ul>

          </div>

        </div>


        {/* Bottom Section */}
        <div className="mt-14 border-t border-slate-800 pt-8">

          <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">

            <p className="text-slate-500">
              © 2026 JobPortal. All rights reserved.
            </p>

            <div className="flex gap-6">

              <Link
                to="/about"
                className="text-slate-500 transition hover:text-white"
              >
                Privacy
              </Link>

              <Link
                to="/about"
                className="text-slate-500 transition hover:text-white"
              >
                Terms
              </Link>

              <Link
                to="/about"
                className="text-slate-500 transition hover:text-white"
              >
                Contact
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;