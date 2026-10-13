import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import RecruiterNavbar from "../../components/RecruiterNavbar";

function About() {
  return (
    <>
     <RecruiterNavbar/>

      <main className="min-h-screen bg-white text-slate-900">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="bg-slate-950 px-6 py-20 text-white sm:py-24 lg:py-28">

          <div className="mx-auto max-w-7xl">

            <div className="mx-auto max-w-4xl text-center">

              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-100">
                About Our Platform
              </p>

              <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">

                Connecting Talent With

                <span className="block text-blue-100">
                  The Right Opportunities
                </span>

              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">

                Our job portal makes it easier for talented people to
                discover meaningful careers and helps companies find
                the right people for their teams.

              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                <Link
                to="/jobs"
                 className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Explore Jobs →
              </Link> 
               

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            WHO WE ARE
        ====================================================== */}

        <section className="bg-white px-6 py-20 lg:py-24">

          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

            {/* Content */}

            <div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Who We Are
              </p>

              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                A simpler way to find your next opportunity
              </h2>

              <p className="mt-6 leading-8 text-slate-600">

                Finding the right job can be challenging. Searching
                through opportunities, understanding companies, and
                keeping track of applications can quickly become
                overwhelming.

              </p>

              <p className="mt-4 leading-8 text-slate-600">

                Our platform brings these experiences together in one
                place. Candidates can explore jobs, build their
                profiles, save interesting opportunities, and track
                their applications.

              </p>

              <p className="mt-4 leading-8 text-slate-600">

                Recruiters can create company profiles, publish job
                openings, and manage applications from a single
                platform.

              </p>

            </div>


            {/* Visual */}

            <div className="rounded-3xl bg-slate-50 p-6 sm:p-8">

              <div className="grid gap-4 sm:grid-cols-2">

                <InfoCard
                  icon="🔎"
                  title="Discover Jobs"
                  description="Find opportunities that match your skills and interests."
                />

                <InfoCard
                  icon="👤"
                  title="Build Profile"
                  description="Showcase your skills and professional experience."
                />

                <InfoCard
                  icon="💼"
                  title="Apply Easily"
                  description="Apply to suitable positions with a simple process."
                />

                <InfoCard
                  icon="🤝"
                  title="Connect"
                  description="Bring candidates and recruiters together."
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            PLATFORM FEATURES
        ====================================================== */}

        <section className="bg-slate-50 px-6 py-20 lg:py-24">

          <div className="mx-auto max-w-7xl">

            <div className="mx-auto mb-12 max-w-2xl text-center">

              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                What We Offer
              </p>

              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Everything you need for your job search
              </h2>

              <p className="mt-4 leading-7 text-slate-600">

                A platform designed to make the recruitment process
                simpler for both candidates and recruiters.

              </p>

            </div>


            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              <FeatureCard
                icon="🔍"
                iconBg="bg-blue-100"
                title="Job Search"
                description="Search and explore job opportunities based on your career interests."
              />

              <FeatureCard
                icon="📄"
                iconBg="bg-green-100"
                title="Easy Applications"
                description="Apply for suitable jobs and keep track of your application progress."
              />

              <FeatureCard
                icon="🏢"
                iconBg="bg-purple-100"
                title="Company Profiles"
                description="Discover companies, learn about them, and explore their open positions."
              />

              <FeatureCard
                icon="📊"
                iconBg="bg-orange-100"
                title="Recruiter Tools"
                description="Recruiters can post jobs and manage candidates through one platform."
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            CANDIDATE + RECRUITER
        ====================================================== */}

        <section className="bg-white px-6 py-20 lg:py-24">

          <div className="mx-auto max-w-7xl">

            <div className="grid gap-6 lg:grid-cols-2">

              {/* Candidate */}

              <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-8 text-white sm:p-10">

                <div className="relative z-10">

                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
                    For Job Seekers
                  </p>

                  <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">

                    Build your profile.
                    <br />
                    Find your opportunity.

                  </h2>

                  <p className="mt-4 max-w-lg leading-7 text-blue-100">

                    Create your professional profile, upload your
                    resume, save jobs, and apply to opportunities
                    that match your skills.

                  </p>

                  <Link
                to="/jobs"
                 className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Explore Jobs →
              </Link> 

                </div>

                <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-white/10" />

              </div>


              {/* Recruiter */}

              <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white sm:p-10">

                <div className="relative z-10">

                  <p className="text-sm font-semibold uppercase tracking-wider text-violet-400">
                    For Recruiters
                  </p>

                  <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">

                    Find the right talent
                    <br />
                    for your team.

                  </h2>

                  <p className="mt-4 max-w-lg leading-7 text-slate-400">

                    Create your company profile, publish job openings,
                    and manage candidates through one platform.

                  </p>

                   <Link
                   to="/recruiter/post-job"
                  className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Post Jobs →
                </Link>


                </div>

                <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-violet-500/10" />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}

        <section className="bg-white px-6 py-20">

          <div className="mx-auto max-w-6xl">

            <div className="mx-auto mb-14 max-w-2xl text-center">

              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                How It Works
              </p>

              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Start your journey in three steps
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                A simple process designed to help candidates move
                from discovering opportunities to applying with confidence.
              </p>

            </div>


            <div className="grid gap-10 md:grid-cols-3">

              <Step
                number="01"
                title="Create Your Profile"
                description="Register and create your professional profile with your skills, experience, and career information."
              />

              <Step
                number="02"
                title="Explore Opportunities"
                description="Browse jobs and companies to find opportunities that match your career goals."
              />

              <Step
                number="03"
                title="Apply & Grow"
                description="Apply for positions and take the next step toward your professional career."
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            PLATFORM VALUES
        ====================================================== */}

        <section className="bg-slate-50 px-6 py-20 lg:py-24">

          <div className="mx-auto max-w-7xl">

            <div className="mx-auto max-w-2xl text-center">

              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Built For You
              </p>

              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                One platform. Two sides. One goal.
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Helping candidates discover opportunities while giving
                recruiters the tools they need to find talented people.
              </p>

            </div>


            <div className="mt-12 grid gap-6 md:grid-cols-3">

              <ValueCard
                icon="🎯"
                title="Focused"
                description="Find relevant opportunities without unnecessary complexity."
              />

              <ValueCard
                icon="⚡"
                title="Simple"
                description="Search, save, apply, and manage your career journey from one place."
              />

              <ValueCard
                icon="🌱"
                title="Career Growth"
                description="Connect with opportunities that can help you move your career forward."
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA
        ====================================================== */}

        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-16 text-white">

          <div className="mx-auto max-w-4xl text-center">

            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to take the next step?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-blue-100">

              Explore new opportunities, discover companies, and
              move closer to your next career goal.

            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                to="/jobs"
                className="rounded-lg bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Explore Jobs
              </Link>

             

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}


/* =====================================================
   INFO CARD
===================================================== */

function InfoCard({
  icon,
  title,
  description
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="text-3xl">
        {icon}
      </div>

      <h3 className="mt-4 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

    </div>
  );
}


/* =====================================================
   FEATURE CARD
===================================================== */

function FeatureCard({
  icon,
  iconBg,
  title,
  description
}) {
  return (
    <div className="rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${iconBg}`}
      >
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>

    </div>
  );
}


/* =====================================================
   STEP
===================================================== */

function Step({
  number,
  title,
  description
}) {
  return (
    <div className="text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
        {number}
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>

    </div>
  );
}


/* =====================================================
   VALUE CARD
===================================================== */

function ValueCard({
  icon,
  title,
  description
}) {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="text-4xl">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>

    </div>
  );
}

export default About;