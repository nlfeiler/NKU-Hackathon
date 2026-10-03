"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

const SKILLS: Record<string, string[]> = {

  STEM: [

    "Agriculture",

    "CAD Modeling",

    "Chemistry",

    "Engineering",

    "Programming",

    "Medicine",

    "Biology",

    "Environmental Science",

  ],

  Arts: ["Acting", "Music", "Illustrative Art"],

  Social: [

    "Teaching",

    "Business",

    "Finance",

    "Law",

    "Political Science",

    "Psycology",

  ],

  "Leadership & Community": [

    "Team Management",

    "Volunteering",

    "Human Resources",

  ],

};

const CATEGORIES = Object.keys(SKILLS);

const categoryMeta: Record<string, { icon: string; description: string }> = {

  All: {

    icon: "✦",

    description: "Explore every skill available",

  },

  STEM: {

    icon: "⌬",

    description: "Science, technology & engineering",

  },

  Arts: {

    icon: "◈",

    description: "Creative & performing arts",

  },

  Social: {

    icon: "◎",

    description: "People, business & society",

  },

  "Leadership & Community": {

    icon: "◇",

    description: "Leadership & community impact",

  },

};

export default function SkillSelect() {

  const router = useRouter();

  const [category, setCategory] = useState("All");

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState<string[]>([]);

  const [saved, setSaved] = useState(false);

  useEffect(() => {

    try {

      const stored = localStorage.getItem("mySkills");

      if (stored) setSelected(JSON.parse(stored));

    } catch {

      // Nothing saved yet, or storage is unavailable.*

    }

  }, []);

  useEffect(() => {

    setSaved(false);

  }, [selected]);

  function saveSkills() {

    try {

      localStorage.setItem("mySkills", JSON.stringify(selected));

        //localStorage.setItem("currentUser");

      setSaved(true);

    } catch {

      alert("Could not save your skills in this browser.");

    }

  }

  function toggle(skill: string) {

    setSelected((prev) =>

      prev.includes(skill)

        ? prev.filter((item) => item !== skill)

        : [...prev, skill]

    );

  }

  const query = search.trim().toLowerCase();

  const visible = useMemo(

    () =>

      CATEGORIES.filter(

        (categoryName) => category === "All" || categoryName === category

      )

        .map((categoryName) => ({

          name: categoryName,

          skills: SKILLS[categoryName].filter((skill) =>

            skill.toLowerCase().includes(query)

          ),

        }))

        .filter((item) => item.skills.length > 0),

    [category, query]

  );

  const totalSkills = Object.values(SKILLS).flat().length;

  return (

    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">

      {/* Ambient background */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#f4c430]/20 blur-3xl" />

        <div className="absolute right-[-10rem] top-20 h-[34rem] w-[34rem] rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute bottom-[-12rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-violet-200/20 blur-3xl" />

      </div>

      <div className="relative flex min-h-screen flex-col lg:flex-row">

        <aside className="z-20 flex w-full shrink-0 border-b border-slate-200/80 bg-white/80 shadow-[0_8px_40px_rgba(15,23,42,0.05)] backdrop-blur-2xl lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[290px] lg:flex-col lg:border-b-0 lg:border-r">

          <div className="border-b border-slate-100 px-6 py-6">

            <div className="flex items-center gap-3">

              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#172554] text-lg text-[#f8d66d] shadow-lg shadow-slate-900/10">

                ◎

              </div>

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a47700]">

                  Personalize

                </p>

                <h2 className="text-xl font-black tracking-tight text-slate-950">

                  My skills

                </h2>

              </div>

            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">

              Choose the skills that represent you. We&apos;ll use them to shape

              your opportunities.

            </p>

            <button

              type="button"

              onClick={() => router.push("/skills_quiz")}

              className="mt-5 flex w-full items-center gap-3 rounded-2xl bg-[#172554] p-3.5 text-left text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-[#24366f]"

            >

              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f4c430] text-lg text-[#172554]">

                ✦

              </span>

              <span className="min-w-0 flex-1">

                <span className="block text-sm font-black">

                  Take the Skills Quiz

                </span>

                <span className="mt-0.5 block text-[10px] font-medium leading-4 text-slate-300">

                  Not sure what skills to choose? We&apos;ll help.

                </span>

              </span>

              <span className="text-sm font-black text-[#f8d66d]">

                →

              </span>

            </button>

          </div>

          {/* Categories */}

          <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto p-5">

            <p className="mb-3 px-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">

              Categories

            </p>

            <div className="flex gap-2 lg:flex-col">

              {["All", ...CATEGORIES].map((item) => {

                const active = category === item;

                const meta = categoryMeta[item];

                return (

                  <button

                    key={item}

                    onClick={() => setCategory(item)}

                    className={`group flex min-w-max items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition lg:w-full ${active

                      ? "bg-[#172554] text-white shadow-lg shadow-slate-900/15"

                      : "text-slate-600 hover:bg-slate-100"

                      }`}

                  >

                    <span

                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm ${active

                        ? "bg-white/10 text-[#f8d66d]"

                        : "bg-slate-100 text-slate-500 group-hover:bg-white"

                        }`}

                    >

                      {meta.icon}

                    </span>

                    <span>

                      <span className="block text-sm font-extrabold">

                        {item}

                      </span>

                      <span

                        className={`hidden text-[10px] font-medium lg:block ${active ? "text-slate-300" : "text-slate-400"

                          }`}

                      >

                        {meta.description}

                      </span>

                    </span>

                  </button>

                );

              })}

            </div>

          </div>

          <div className="hidden border-t border-slate-100 p-5 lg:block">

            <div className="rounded-2xl bg-slate-50 p-4">

              <div className="flex items-center justify-between">

                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">

                  Skill library

                </span>

                <span className="text-xs font-black text-[#a47700]">

                  {totalSkills}

                </span>

              </div>

              <p className="mt-2 text-xs leading-5 text-slate-500">

                Pick as many as you want. Your selections can always be changed.

              </p>

            </div>

          </div>

        </aside>
        <section className="w-full lg:ml-[290px]">

          <header className="sticky top-0 z-30 border-b border-white/70 bg-[#f6f8fc]/85 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">

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

                    Build your profile

                  </p>

                </div>

              </div>

              <div className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-600 shadow-sm">

                {selected.length} selected

              </div>

            </div>

          </header>

          <main className="mx-auto max-w-6xl px-5 pb-28 pt-9 sm:px-8 lg:px-10 lg:pt-12">

            {/* Hero */}

            <section className="relative overflow-hidden rounded-[34px] bg-[#172554] px-7 py-8 text-white shadow-[0_25px_80px_rgba(23,37,84,0.22)] sm:px-10 sm:py-10">

              <div className="absolute right-[-70px] top-[-100px] h-72 w-72 rounded-full bg-[#f4c430]/20 blur-2xl" />

              <div className="absolute bottom-[-120px] right-40 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />

              <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-end">

                <div className="max-w-2xl">

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#f8d66d]">

                    <span className="h-1.5 w-1.5 rounded-full bg-[#f4c430]" />

                    Skill profile

                  </span>

                  <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl">

                    What are you

                    <span className="block text-[#f8d66d]">good at?</span>

                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">

                    Select the skills you already have or want to explore. These

                    choices help connect you with relevant clubs, projects, and

                    opportunities.

                  </p>

                </div>

                <div className="shrink-0 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

                  <p className="text-3xl font-black">{selected.length}</p>

                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-300">

                    Skills selected

                  </p>

                </div>

              </div>

            </section>

            {/* Search */}

            <div className="relative mt-7">

              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg text-slate-400">

                ⌕

              </span>

              <input

                type="text"

                value={search}

                onChange={(event) => setSearch(event.target.value)}

                placeholder="Search skills..."

                aria-label="Search skills"

                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-12 text-sm font-semibold text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#e6b52a] focus:ring-4 focus:ring-[#f4c430]/15"

              />

              {search && (

                <button

                  onClick={() => setSearch("")}

                  className="absolute right-4 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-slate-100 text-xs font-black text-slate-500 transition hover:bg-slate-200"

                  aria-label="Clear search"

                >

                  ×

                </button>

              )}

            </div>

            <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">

              {/* Available skills */}

              <section className="min-h-[500px] rounded-[28px] border border-white/80 bg-white/85 p-5 shadow-[0_18px_60px_rgba(31,41,55,0.08)] backdrop-blur-xl sm:p-6">

                <div className="mb-5 flex items-end justify-between gap-4">

                  <div>

                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#a47700]">

                      Explore

                    </p>

                    <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">

                      Available skills

                    </h2>

                  </div>

                  <p className="text-xs font-bold text-slate-400">

                    {visible.reduce((sum, item) => sum + item.skills.length, 0)}{" "}

                    results

                  </p>

                </div>

                <div className="max-h-[540px] space-y-7 overflow-y-auto pr-1">

                  {visible.length === 0 && (

                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">

                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-xl shadow-sm">

                        ⌕

                      </div>

                      <h3 className="mt-4 font-extrabold text-slate-800">

                        No matches found

                      </h3>

                      <p className="mt-1 text-sm text-slate-500">

                        Try a different search or category.

                      </p>

                    </div>

                  )}

                  {visible.map((item) => (

                    <div key={item.name}>

                      <div className="mb-3 flex items-center gap-3">

                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#fff5cf] text-sm text-[#a47700]">

                          {categoryMeta[item.name].icon}

                        </span>

                        <div>

                          <h3 className="font-black text-slate-900">

                            {item.name}

                          </h3>

                          <p className="text-[10px] font-semibold text-slate-400">

                            {categoryMeta[item.name].description}

                          </p>

                        </div>

                      </div>

                      <div className="grid gap-2 sm:grid-cols-2">

                        {item.skills.map((skill) => {

                          const isSelected = selected.includes(skill);

                          return (

                            <label

                              key={skill}

                              className={`group flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition ${isSelected

                                ? "border-[#e6b52a] bg-[#fff9e7] shadow-sm"

                                : "border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-white"

                                }`}

                            >

                              <input

                                type="checkbox"

                                checked={isSelected}

                                onChange={() => toggle(skill)}

                                className="peer sr-only"

                              />

                              <span

                                className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border text-[11px] font-black transition ${isSelected

                                  ? "border-[#e6b52a] bg-[#f4c430] text-[#172554]"

                                  : "border-slate-300 bg-white text-transparent group-hover:border-slate-400"

                                  }`}

                              >

                                ✓

                              </span>

                              <span

                                className={`text-sm font-bold ${isSelected

                                  ? "text-slate-950"

                                  : "text-slate-600"

                                  }`}

                              >

                                {skill}

                              </span>

                              {isSelected && (

                                <span className="ml-auto text-[9px] font-black uppercase tracking-wider text-[#a47700]">

                                  Added

                                </span>

                              )}

                            </label>

                          );

                        })}

                      </div>

                    </div>

                  ))}

                </div>

              </section>

              {/* Selected skills */}

              <aside className="flex min-h-[500px] flex-col rounded-[28px] border border-white/80 bg-white/85 p-5 shadow-[0_18px_60px_rgba(31,41,55,0.08)] backdrop-blur-xl sm:p-6 xl:sticky xl:top-24 xl:h-fit">

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#a47700]">

                      Your profile

                    </p>

                    <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">

                      My skills

                    </h2>

                  </div>

                  <div className="grid h-10 min-w-10 place-items-center rounded-xl bg-[#172554] px-2 text-sm font-black text-white">

                    {selected.length}

                  </div>

                </div>

                <div className="mt-5 flex-1">

                  {selected.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">

                      <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white text-lg shadow-sm">

                        ✦

                      </div>

                      <p className="mt-3 text-sm font-extrabold text-slate-700">

                        No skills selected

                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">

                        Select skills from the list and they’ll appear here.

                      </p>

                    </div>

                  ) : (

                    <div className="flex max-h-[360px] flex-wrap content-start gap-2 overflow-y-auto pr-1">

                      {selected.map((skill) => (

                        <button

                          key={skill}

                          onClick={() => toggle(skill)}

                          className="group inline-flex items-center gap-2 rounded-full border border-[#efd27a] bg-[#fff9e7] px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"

                          title={`Remove ${skill}`}

                        >

                          {skill}

                          <span className="text-slate-400 group-hover:text-red-500">

                            ×

                          </span>

                        </button>

                      ))}

                    </div>

                  )}

                </div>

                <div className="mt-5 border-t border-slate-100 pt-5">

                  <div className="mb-3 flex items-center justify-between">

                    <p className="text-xs font-bold text-slate-500">

                      {selected.length === 0

                        ? "Ready when you are"

                        : `${selected.length} ${selected.length === 1 ? "skill" : "skills"

                        } ready`}

                    </p>

                    {selected.length > 0 && (

                      <button

                        onClick={() => setSelected([])}

                        className="text-xs font-extrabold text-slate-400 transition hover:text-red-600"

                      >

                        Clear all

                      </button>

                    )}

                  </div>

                  <button

                    onClick={saveSkills}

                    className={`flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-black transition focus:outline-none focus:ring-4 ${saved

                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 focus:ring-emerald-200"

                      : "bg-[#172554] text-white shadow-lg shadow-slate-900/15 hover:bg-[#1e3a8a] focus:ring-[#f4c430]/30"

                      }`}

                  >

                    <span>{saved ? "✓" : "↗"}</span>

                    {saved ? "Skills saved" : "Save my skills"}

                  </button>

                </div>

              </aside>

            </div>

          </main>

          {/* Bottom navigation */}

          <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/90 shadow-[0_-12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:left-[290px]">

            <div className="mx-auto grid h-[72px] max-w-6xl grid-cols-3 px-3">

              <button

                onClick={() => router.push("../dashboard")}

                className="group flex flex-col items-center justify-center gap-1 text-slate-400 transition hover:text-[#172554]"

              >

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

              <button className="group relative flex flex-col items-center justify-center gap-1 text-[#172554]">

                <span className="absolute top-0 h-1 w-12 rounded-b-full bg-[#f4c430]" />

                <span className="text-lg">◎</span>

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
