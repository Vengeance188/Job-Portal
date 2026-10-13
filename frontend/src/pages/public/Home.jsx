import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  // The public homepage gets its listing data from the backend.
  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        const response = await api.get("/api/jobs");
        const data = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.content)
            ? response.data.content
            : [];

        if (isMounted) setJobs(data);
      } catch (error) {
        console.error("Unable to load jobs:", error);
        if (isMounted) {
          setJobs([]);
        }
      } finally {
        if (isMounted) setLoadingJobs(false);
      }
    };

    fetchJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  const getCompanyName = (job) => job.company?.name || job.companyName || "";

  const companyCount = useMemo(() => {
    const companies = new Set(
      jobs
        .map((job) => job.company?.id ?? getCompanyName(job))
        .filter((value) => value !== undefined && value !== null && value !== "")
    );
    return companies.size;
  }, [jobs]);

  const locationCount = useMemo(
    () => new Set(jobs.map((job) => job.location?.trim()).filter(Boolean)).size,
    [jobs]
  );

  const jobTypeCount = useMemo(
    () =>
      new Set(
        jobs
          .map((job) => String(job.jobType || "").trim().toLowerCase())
          .filter(Boolean)
      ).size,
    [jobs]
  );




  return (
    <>
     

      <main className="min-h-screen bg-white text-slate-900">
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
          <div className="absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-24 h-[32rem] w-[32rem] rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:56px_56px]" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-5xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                A place to begin your next chapter
              </span>

              <h1 className="mt-8 text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Find work that
                <span className="block bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">moves you forward.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                Your next chapter starts with a little courage, a new opportunity,
                and the decision to take that first step.
              </p>

              <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 border-t border-white/10 pt-8 md:grid-cols-4">
                <Stat label="Verified Available Jobs" />
                <Stat label="MNC Companies" />
                <Stat  label="Global Locations" />
                <Stat label="Multiple Job Types" />
              </div>

              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/register"
                  className="rounded-xl bg-blue-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-950/30 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-400"
                >
                  Create an Account
                </Link>
                <Link
                  to="/login"
                  className="rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Sign In
                </Link>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Browse jobs first. Sign in or create an account when you are
                ready to apply.
              </p>
            </div>
          </div>
        </section>

        {/* Frontend-only brand section: slogans and visual storytelling */}
        <section className="relative overflow-hidden bg-white px-6 py-24 sm:py-28 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
            <div className="relative z-10">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-600">
                Your journey, your direction
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                A better future doesn't happen by chance.
                <span className="mt-2 block text-blue-600">It starts with one step.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Every career has a beginning. Stay curious, keep learning, and
                give yourself the chance to find work that fits the person you
                want to become.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                  Keep growing
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                  Stay curious
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                  Make your move
                </span>
              </div>
            </div>

            {/* Decorative CSS illustration — no external image or backend dependency */}
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-blue-100 blur-2xl" />
              <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-indigo-100 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-slate-50 to-blue-50/70 p-6 shadow-2xl shadow-slate-200/70 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    The next chapter
                  </span>
                </div>

                <div className="mt-9 rounded-2xl bg-slate-950 p-7 text-white sm:p-9">
                  <span className="text-4xl text-blue-400" aria-hidden="true">“</span>
                  <p className="mt-2 text-2xl font-semibold leading-snug sm:text-3xl">
                    Don't wait for the perfect moment.
                    <span className="block text-blue-400">Create your next one.</span>
                  </p>
                  <div className="mt-8 h-1.5 w-20 rounded-full bg-blue-500" />
                  <p className="mt-4 text-sm text-slate-400">
                    Small steps. New skills. Bigger possibilities.
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 text-center sm:p-4">
                    <span className="text-xl" aria-hidden="true">✦</span>
                    <p className="mt-2 text-xs font-semibold text-slate-700 sm:text-sm">Discover</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 text-center sm:p-4">
                    <span className="text-xl" aria-hidden="true">↗</span>
                    <p className="mt-2 text-xs font-semibold text-slate-700 sm:text-sm">Develop</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 text-center sm:p-4">
                    <span className="text-xl" aria-hidden="true">◎</span>
                    <p className="mt-2 text-xs font-semibold text-slate-700 sm:text-sm">Move forward</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-gradient-to-b from-slate-50 to-white px-6 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            <div className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-950/5">
              <span className="text-2xl" aria-hidden="true">✧</span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Progress over perfection</h3>
              <p className="mt-2 leading-7 text-slate-500">
                You don't need every answer today. Every application, lesson, and conversation can move you forward.
              </p>
            </div>
            <div className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-950/5">
              <span className="text-2xl" aria-hidden="true">◈</span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Make room for possibility</h3>
              <p className="mt-2 leading-7 text-slate-500">
                Be open to new paths. The opportunity that fits you may look different from the one you first imagined.
              </p>
            </div>
            <div className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-950/5">
              <span className="text-2xl" aria-hidden="true">✦</span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">Your story is still unfolding</h3>
              <p className="mt-2 leading-7 text-slate-500">
                Keep building your skills, trust your effort, and take the next step at your own pace.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-8 py-14 text-center shadow-2xl shadow-blue-900/20 sm:px-12 sm:py-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready for your next opportunity?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100">
              Create an account to build your profile and apply for jobs.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="rounded-xl bg-white px-7 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white transition hover:bg-white/20"
              >
                Already registered? Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Stat({ number, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-5 text-center backdrop-blur-sm">
      <p className="text-2xl font-bold text-white sm:text-3xl">{number}</p>
      <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
    </div>
  );
}

export default Home;
