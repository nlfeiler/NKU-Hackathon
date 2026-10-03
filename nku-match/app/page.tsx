"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "student" | "faculty";

// Where each kind of user goes after signing in.
// Change these if your folder names are different.
const STUDENT_DASHBOARD = "./blank_dashboard";
const FACULTY_DASHBOARD = "./Fac_blank_dashb";

// Universities in the dropdown and the email domain each one requires
const UNIVERSITIES = [
  { name: "Northern Kentucky University", domain: "nku.edu" },
  { name: "University of Kentucky", domain: "uky.edu" },
  { name: "University of Louisville", domain: "louisville.edu" },
  { name: "University of Cincinnati", domain: "uc.edu" },
  { name: "Xavier University", domain: "xavier.edu" },
];

// Test accounts. Replace with a real database before launch.
const ACCOUNTS: { email: string; password: string; role: Role }[] = [
  { email: "feilern@nku.edu", password: "test1234", role: "student" },
  { email: "faculty@nku.edu", password: "test1234", role: "faculty" },
];

// Majors shown to students. Add or remove entries here.
const MAJORS = [
  "Accounting",
  "Applied Software Engineering",
  "Biological Sciences",
  "Business Administration",
  "Chemistry",
  "Communication Studies",
  "Computer Information Technology",
  "Computer Science",
  "Criminal Justice",
  "Cybersecurity",
  "Data Science",
  "Elementary Education",
  "Engineering Technology",
  "English",
  "Environmental Science",
  "Finance",
  "History",
  "Human Resource Management",
  "Journalism",
  "Marketing",
  "Mathematics",
  "Music",
  "Nursing",
  "Political Science",
  "Psychology",
  "Social Work",
  "Theatre",
  "Visual Arts",
  "Undecided",
  "Other",
];

// Checks email syntax and requires a .edu domain
const EDU_EMAIL = /^[^\s@]+@([a-z0-9-]+\.)+edu$/i;

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#e6b52a] focus:bg-white focus:ring-4 focus:ring-[#f4c430]/15";

const labelClass =
  "mb-2 block text-xs font-black uppercase tracking-[0.15em] text-slate-500";

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("student");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSignup() {
    const email = username.trim().toLowerCase();

    if (email === "" || password === "") {
      setError("Please enter both your university email and password.");
      return;
    }

    setError("");

    // Test shortcuts: skip the university, major, and email checks
    if (email === "test" && password === "test") {
      router.push(STUDENT_DASHBOARD);
      return;
    }
    if (email === "fac" && password === "fac") {
      router.push(FACULTY_DASHBOARD);
      return;
    }

    const school = UNIVERSITIES.find((u) => u.name === university);
    if (!school) {
      setError("Please select your affiliated university.");
      return;
    }

    if (role === "student" && major === "") {
      setError("Please select your major.");
      return;
    }

    if (!EDU_EMAIL.test(email)) {
      setError("Please enter a valid university email ending in .edu.");
      return;
    }

    const domain = email.split("@")[1];
    if (domain !== school.domain && !domain.endsWith("." + school.domain)) {
      setError(`Your email must be a ${school.name} address (@${school.domain}).`);
      return;
    }

    const account = ACCOUNTS.find((a) => a.email === email);
    if (!account || account.password !== password) {
      setError("Email or password is not correct!");
      return;
    }

    if (account.role !== role) {
      setError(
        `This account is registered as ${
          account.role === "faculty" ? "a faculty member" : "a student"
        }. Please choose that option above.`
      );
      return;
    }

    // Remember the student's major so other pages can use it
    if (role === "student") {
      try {
        localStorage.setItem("myMajor", major);
      } catch {
        // storage unavailable; sign in anyway
      }
    }

    router.push(role === "faculty" ? FACULTY_DASHBOARD : STUDENT_DASHBOARD);
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#f4c430]/20 blur-3xl" />
        <div className="absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-violet-200/20 blur-3xl" />
      </div>

      <main className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[36px] border border-white/80 bg-white/75 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur-2xl lg:grid-cols-[1.05fr_0.95fr]">

          {/* Brand panel */}
          <section className="relative hidden overflow-hidden bg-[#172554] p-10 text-white lg:flex lg:min-h-[650px] lg:flex-col lg:justify-between">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#f4c430]/20 blur-2xl" />
            <div className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-4">
                <img
                  src="/nku_banner.jpg"
                  alt="NKU Banner"
                  className="h-14 w-auto rounded-lg object-contain"
                />
              </div>

              <div className="mt-16 max-w-md">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#f8d66d]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f4c430]" />
                  Student opportunities
                </span>

                <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-[-0.045em]">
                  Your next
                  <span className="block text-[#f8d66d]">opportunity</span>
                  starts here.
                </h1>

                <p className="mt-6 max-w-sm text-sm leading-7 text-slate-200">
                  Connect with campus clubs, research opportunities, projects,
                  and experiences that help turn your interests into something real.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xl font-black">01</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    Sign in
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xl font-black">02</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                    Discover
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f4c430] p-4 text-[#172554]">
                  <p className="text-xl font-black">03</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider">
                    Connect
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Login panel */}
          <section className="flex min-h-[650px] flex-col justify-center p-7 sm:p-10 lg:p-14">
            <div className="mx-auto w-full max-w-md">
              {/* Mobile brand */}
              <div className="mb-10 lg:hidden">
                <img
                  src="/nku_banner.jpg"
                  alt="NKU Banner"
                  className="h-12 w-auto object-contain"
                />
                <div className="mt-5 h-1 w-12 rounded-full bg-[#f4c430]" />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#a47700]">
                  Welcome back
                </p>
                <h2 className="mt-2 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                  Sign in.
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
                  Enter your credentials to continue exploring campus opportunities.
                </p>
              </div>

              <form
                className="mt-9 space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSignup();
                }}
              >
                {/* Student or faculty */}
                <div>
                  <span className={labelClass}>I am a</span>
                  <div className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
                    {(["student", "faculty"] as Role[]).map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={role === option}
                        onClick={() => {
                          setRole(option);
                          setError("");
                        }}
                        className={`rounded-xl px-4 py-3 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-[#f4c430]/30 ${
                          role === option
                            ? "bg-[#172554] text-white shadow"
                            : "text-slate-500 hover:bg-white"
                        }`}
                      >
                        {option === "student" ? "Student" : "Faculty"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* University */}
                <div>
                  <label htmlFor="university" className={labelClass}>
                    University
                  </label>
                  <select
                    id="university"
                    value={university}
                    onChange={(event) => {
                      setUniversity(event.target.value);
                      setError("");
                    }}
                    className={inputClass}
                  >
                    <option value="">Select your university</option>
                    {UNIVERSITIES.map((u) => (
                      <option key={u.name} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Major (students only) */}
                {role === "student" && (
                  <div>
                    <label htmlFor="major" className={labelClass}>
                      Major
                    </label>
                    <select
                      id="major"
                      value={major}
                      onChange={(event) => {
                        setMajor(event.target.value);
                        setError("");
                      }}
                      className={inputClass}
                    >
                      <option value="">Select your major</option>
                      {MAJORS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label htmlFor="username" className={labelClass}>
                    University email
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                      setError("");
                    }}
                    placeholder="you@nku.edu"
                    autoComplete="username"
                    className={inputClass}
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className={labelClass}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className={inputClass}
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm font-semibold leading-5 text-red-700"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-100 text-xs">
                      !
                    </span>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#172554] px-5 py-4 text-sm font-black text-white shadow-[0_12px_30px_rgba(23,37,84,0.2)] transition hover:-translate-y-0.5 hover:bg-[#1e3a8a] hover:shadow-[0_16px_36px_rgba(23,37,84,0.25)] focus:outline-none focus:ring-4 focus:ring-[#f4c430]/30 active:translate-y-0"
                >
                  Continue to campus
                  <span className="text-lg transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </form>

              <div className="mt-9 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  NKU Opportunities
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-center text-xs font-medium leading-5 text-slate-500">
                  Discover clubs, research, and hands-on experiences built around
                  what you want to learn.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}