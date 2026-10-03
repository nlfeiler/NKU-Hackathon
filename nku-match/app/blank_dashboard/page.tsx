"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#f4c430]/20 blur-3xl" />
        <div className="absolute right-[-10rem] top-24 h-[34rem] w-[34rem] rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-violet-200/20 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col lg:flex-row">
        {/* Empty saved-events rail */}
        <aside className="z-20 flex w-full shrink-0 flex-col border-b border-slate-200/80 bg-white/80 shadow-[0_8px_40px_rgba(15,23,42,0.05)] backdrop-blur-2xl lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[340px] lg:border-b-0 lg:border-r">
          <div className="border-b border-slate-100 px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a47700]">
                  Your schedule
                </p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                  Saved events
                </h2>
              </div>

              <div className="grid h-11 min-w-11 place-items-center rounded-2xl bg-[#172554] px-2 text-sm font-black text-white">
                0
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Your saved opportunities will appear here.
            </p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-sm">
                ✦
              </div>

              <h3 className="mt-4 font-extrabold text-slate-800">
                Nothing saved yet
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Browse opportunities and save the ones that interest you.
              </p>
            </div>
          </div>

          <div className="hidden border-t border-slate-100 p-5 lg:block">
            <div className="rounded-2xl bg-[#172554] p-4 text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#f8d66d]">
                Campus life
              </p>
              <p className="mt-1 text-sm font-bold">
                Discover something worth showing up for.
              </p>
            </div>
          </div>
        </aside>

        {/* Main dashboard */}
        <section className="w-full lg:ml-[340px]">
          <header className="sticky top-0 z-10 border-b border-white/70 bg-[#f6f8fc]/85 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/nku_banner.jpg"
                  alt="NKU Banner"
                  className="h-10 w-auto object-contain sm:h-12"
                />

                <div className="hidden h-8 w-px bg-slate-200 sm:block" />

                <div className="hidden sm:block">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Student opportunities
                  </p>
                  <p className="text-sm font-extrabold text-slate-700">
                    Your campus dashboard
                  </p>
                </div>
              </div>

              <div className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-600 shadow-sm">
                Fall 2025
              </div>
            </div>
          </header>

          <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl flex-col px-5 pb-28 pt-10 sm:px-8 lg:px-10 lg:pt-14">
            {/* Welcome hero */}
            <section className="relative overflow-hidden rounded-[34px] bg-[#172554] px-7 py-9 text-white shadow-[0_25px_80px_rgba(23,37,84,0.22)] sm:px-10 sm:py-12">
              <div className="absolute right-[-70px] top-[-90px] h-64 w-64 rounded-full bg-[#f4c430]/20 blur-2xl" />
              <div className="absolute bottom-[-100px] right-24 h-60 w-60 rounded-full bg-blue-400/20 blur-3xl" />

              <div className="relative max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#f8d66d]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f4c430]" />
                  Your dashboard
                </span>

                <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  Nothing here
                  <span className="block text-[#f8d66d]">yet.</span>
                </h1>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Add your skills and let the opportunities come to you.
                  Your dashboard will become the place where campus connections
                  start taking shape.
                </p>
              </div>
            </section>

            {/* Blank-state card */}
            <section className="flex flex-1 items-center justify-center py-10">
              <div className="w-full max-w-2xl rounded-[32px] border border-white/80 bg-white/85 p-8 text-center shadow-[0_20px_70px_rgba(31,41,55,0.10)] backdrop-blur-xl sm:p-12">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-[26px] bg-[#fff6d6] text-3xl text-[#a47700] shadow-sm">
                  ✦
                </div>

                <p className="mt-7 text-[10px] font-black uppercase tracking-[0.22em] text-[#a47700]">
                  Get started
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
                  How about adding some skills?
                </h2>

                <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                  Tell us what you know, what you enjoy, and what you want to
                  explore. We’ll use that to help surface opportunities that
                  fit you.
                </p>

                <button
                  onClick={() => router.push("../skills_select")}
                  className="group mt-7 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#f4c430] px-6 py-4 text-sm font-black text-[#172554] shadow-[0_12px_30px_rgba(244,196,48,0.25)] transition hover:-translate-y-0.5 hover:bg-[#ffd95b] hover:shadow-[0_16px_36px_rgba(244,196,48,0.3)] focus:outline-none focus:ring-4 focus:ring-[#f4c430]/30"
                >
                  Choose my skills
                  <span className="text-lg transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </section>
          </main>

          {/* Bottom navigation */}
          <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/80 bg-white/90 shadow-[0_-12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:left-[340px]">
            <div className="mx-auto grid h-[72px] max-w-6xl grid-cols-3 px-3">
              <button className="group relative flex flex-col items-center justify-center gap-1 text-[#172554]">
                <span className="absolute top-0 h-1 w-12 rounded-b-full bg-[#f4c430]" />
                <span className="text-lg transition-transform group-hover:-translate-y-0.5">
                  ⌂
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider">
                  Home
                </span>
              </button>

              <button
                onClick={() => router.push("../browse")}
                className="group flex flex-col items-center justify-center gap-1 text-slate-400 transition hover:text-[#172554]"
              >
                <span className="text-lg transition-transform group-hover:-translate-y-0.5">
                  ✦
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider">
                  Browse
                </span>
              </button>

              <button
                onClick={() => router.push("../skills_select")}
                className="group flex flex-col items-center justify-center gap-1 text-slate-400 transition hover:text-[#172554]"
              >
                <span className="text-lg transition-transform group-hover:-translate-y-0.5">
                  ◎
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider">
                  Skills
                </span>
              </button>
            </div>
          </nav>
        </section>
      </div>
    </div>
  );
}
