"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSignup() {
    if (username === "" || password === "") {
      setError("Please enter both your username and password.");
      return;
    }

    setError("");

    if (username === "test" && password === "test") {
      router.push("./blank_dashboard");
    } else if (username === "fac" && password === "fac") {
      router.push("./Fac_blank_dashb");
    } else {
      setError("Username or password is not proper!");
    }
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
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-slate-500"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your username"
                    autoComplete="username"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#e6b52a] focus:bg-white focus:ring-4 focus:ring-[#f4c430]/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-slate-500"
                  >
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
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#e6b52a] focus:bg-white focus:ring-4 focus:ring-[#f4c430]/15"
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
