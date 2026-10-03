"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import opportunities, { type Opportunity } from "./opportunities";

const categoryOrder = ["All", "STEM", "Arts", "Social", "Leadership & Community"];

const OPPORTUNITY_DESTINATION =
  "https://www.nku.edu/center-for-student-engagement/student-orgs/";

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showAllOpportunities, setShowAllOpportunities] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const OPPORTUNITIES_PER_PAGE = 9;

  useEffect(() => {
    try {
      const storedEvents = JSON.parse(localStorage.getItem("myEvents") || "[]");
      const ids = Array.isArray(storedEvents)
        ? storedEvents
            .map((item: { id?: string }) => item?.id)
            .filter((id: unknown): id is string => typeof id === "string")
        : [];
      setSavedIds(ids);

      const storedSkills = JSON.parse(localStorage.getItem("mySkills") || "[]");
      const skills = Array.isArray(storedSkills)
        ? storedSkills.filter(
            (skill: unknown): skill is string => typeof skill === "string"
          )
        : [];
      setSelectedSkills(skills);
    } catch {
      setSavedIds([]);
      setSelectedSkills([]);
    }
  }, []);

  const filteredOpportunities = useMemo(() => {
    const query = search.trim().toLowerCase();

    return opportunities.filter((event) => {
      // Default: only show opportunities matching selected skills.
      // "Show all" lets the student browse the full catalog when needed.
      const matchesSkill =
        showAllOpportunities || selectedSkills.includes(event.skill);
      if (!matchesSkill) return false;

      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      const haystack = [
        event.title,
        event.subtitle,
        event.description,
        event.requirements,
        event.skill,
        event.category,
        event.location,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!query || haystack.includes(query));
    });
  }, [search, selectedCategory, selectedSkills, showAllOpportunities]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOpportunities.length / OPPORTUNITIES_PER_PAGE)
  );

  const paginatedOpportunities = useMemo(
    () =>
      filteredOpportunities.slice(
        (currentPage - 1) * OPPORTUNITIES_PER_PAGE,
        currentPage * OPPORTUNITIES_PER_PAGE
      ),
    [filteredOpportunities, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedSkills]);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const savedOpportunities = useMemo(
    () => opportunities.filter((event) => savedIds.includes(event.id)),
    [savedIds]
  );

  const uniqueSkills = new Set(opportunities.map((event) => event.skill)).size;

  const toggleSave = (event: Opportunity) => {
    const currentlySaved = savedIds.includes(event.id);
    const nextIds = currentlySaved
      ? savedIds.filter((id) => id !== event.id)
      : [...savedIds, event.id];

    setSavedIds(nextIds);

    try {
      const nextEvents = opportunities.filter((item) => nextIds.includes(item.id));
      localStorage.setItem("myEvents", JSON.stringify(nextEvents));
    } catch {
      // Keep the UI usable if localStorage is unavailable.
    }
  };

  const openOpportunity = (_event: Opportunity) => {
    window.open(OPPORTUNITY_DESTINATION, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[#f4c430]/18 blur-3xl" />
        <div className="absolute right-[-12rem] top-10 h-[38rem] w-[38rem] rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-[38%] h-[34rem] w-[34rem] rounded-full bg-purple-300/15 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col lg:flex-row">
        <aside className="z-30 flex w-full shrink-0 flex-col border-b border-slate-200/70 bg-white/85 shadow-[0_10px_45px_rgba(15,23,42,0.06)] backdrop-blur-2xl lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[350px] lg:border-b-0 lg:border-r">
          <div className="border-b border-slate-100 px-7 py-7">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#9b7000]">
                    Your schedule
                  </p>
                </div>
                <h2 className="mt-1 text-[27px] font-black tracking-[-0.035em] text-slate-950">
                  Saved events
                </h2>
              </div>

              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#172554] text-sm font-black text-white shadow-[0_10px_25px_rgba(23,37,84,0.18)]">
                {savedOpportunities.length}
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Save the opportunities you want to come back to. Your list stays
              separate from the full campus feed.
            </p>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">
            {savedOpportunities.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/80 p-6 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl shadow-sm">
                  ☆
                </div>
                <p className="mt-4 text-sm font-black text-slate-800">
                  Your list is waiting.
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Tap Save on any opportunity to keep it here.
                </p>
              </div>
            ) : (
              savedOpportunities.map((event) => (
                <div
                  key={event.id}
                  className="group rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#e6b52a] hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${event.color} text-[11px] font-black text-slate-900`}
                    >
                      {event.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-black leading-5 text-slate-900">
                          {event.title}
                        </h3>
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                      </div>
                      <p className="mt-1 text-[11px] font-medium leading-4 text-slate-500">
                        {event.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-500">
                    <span>◷ {event.date} · {event.time}</span>
                    <span className="text-slate-300">•</span>
                    <span>{event.location}</span>
                  </div>

                  <button
                    onClick={() => toggleSave(event)}
                    className="mt-3 text-[10px] font-black text-slate-400 transition hover:text-rose-600"
                  >
                    Remove from saved
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="hidden border-t border-slate-100 p-6 lg:block">
            <div className="rounded-[24px] bg-[#172554] p-5 text-white shadow-[0_18px_45px_rgba(23,37,84,0.18)]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9b7000]">
                  {showAllOpportunities
                    ? "Opportunity network · Full catalog"
                    : `Opportunity network · ${selectedSkills.length} skill${selectedSkills.length === 1 ? "" : "s"} matched`}
                </p>

                <button
                  type="button"
                  onClick={() => setShowAllOpportunities((value) => !value)}
                  aria-pressed={showAllOpportunities}
                  className={`inline-flex items-center gap-3 self-start rounded-full border px-3 py-2 text-xs font-black transition sm:self-auto ${
                    showAllOpportunities
                      ? "border-[#e6b52a] bg-[#fff8df] text-[#8a6500]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-[#e6b52a] hover:text-[#172554]"
                  }`}
                >
                  <span
                    className={`relative h-5 w-9 rounded-full transition ${
                      showAllOpportunities ? "bg-[#172554]" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                        showAllOpportunities ? "left-[18px]" : "left-0.5"
                      }`}
                    />
                  </span>
                  Show all opportunities
                </button>


              </div>
              <p className="mt-2 text-sm font-bold leading-5">
                {opportunities.length} live-looking  are loaded from one editable data file.
              </p>
            </div>
          </div>
        </aside>

        <section className="w-full lg:ml-[350px]">
          <header className="sticky top-0 z-20 border-b border-white/70 bg-[#f5f7fb]/85 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
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
                    Your campus, your next move
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-emerald-700 sm:block">
                  ● Profile active
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-600 shadow-sm">
                  Fall 2025
                </span>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-7xl px-5 pb-32 pt-8 sm:px-8 lg:px-10 lg:pt-12">
            <section className="relative overflow-hidden rounded-[38px] bg-[#172554] px-7 py-9 text-white shadow-[0_30px_90px_rgba(23,37,84,0.24)] sm:px-10 sm:py-12 lg:px-12 lg:py-13">
              <div className="absolute right-[-90px] top-[-130px] h-[360px] w-[360px] rounded-full bg-[#f4c430]/20 blur-3xl" />
              <div className="absolute bottom-[-140px] right-[22%] h-[300px] w-[300px] rounded-full bg-blue-400/20 blur-3xl" />

              <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#f8d66d] backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f4c430] shadow-[0_0_10px_rgba(244,196,48,0.8)]" />
                    Your opportunity feed
                  </div>

                  <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                    Find something worth
                    <span className="block bg-gradient-to-r from-[#f8d66d] via-[#f4c430] to-[#ffe69a] bg-clip-text text-transparent">
                      showing up for.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                    Clubs, research, internships, leadership, service, and creative experiences — all in one student-friendly feed.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      onClick={() => router.push("../skills_select")}
                      className="group inline-flex items-center gap-3 rounded-2xl bg-[#f4c430] px-5 py-3.5 text-sm font-black text-[#172554] shadow-[0_12px_35px_rgba(244,196,48,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ffd95b]"
                    >
                      Update my skills
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
                    >
                      See all opportunities
                    </button>
                  </div>
                </div>

                <div className="grid shrink-0 grid-cols-3 gap-2 lg:w-[330px]">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                    <p className="text-2xl font-black">{savedOpportunities.length}</p>
                    <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-slate-300">Saved</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                    <p className="text-2xl font-black">{uniqueSkills}</p>
                    <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-slate-300">Skills</p>
                  </div>
                  <div className="rounded-2xl bg-[#f4c430] p-4 text-[#172554]">
                    <p className="text-2xl font-black">{opportunities.length}</p>
                    <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em]">Available</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9b7000]">Curated campus feed</p>
                  <h2 className="mt-1 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">
                    Your opportunities
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {filteredOpportunities.length} of {opportunities.length} opportunities showing
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                  <label className="relative block sm:min-w-[260px]">
                    <span className="sr-only">Search opportunities</span>
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search skills, clubs, research..."
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none shadow-sm transition placeholder:text-slate-400 focus:border-[#e6b52a] focus:ring-4 focus:ring-[#f4c430]/10"
                    />
                  </label>
                  <button
                    onClick={() => router.push("../browse")}
                    className="rounded-2xl bg-white px-4 py-3 text-xs font-black text-slate-600 shadow-sm transition hover:text-[#172554]"
                  >
                    Browse page →
                  </button>
                </div>
              </div>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                {categoryOrder.map((category) => {
                  const active = selectedCategory === category;
                  const count = category === "All"
                    ? opportunities.length
                    : opportunities.filter((event) => event.category === category).length;

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`whitespace-nowrap rounded-full px-4 py-2.5 text-[10px] font-black uppercase tracking-wider transition ${
                        active
                          ? "bg-[#172554] text-white shadow-lg shadow-[#172554]/10"
                          : "border border-slate-200 bg-white text-slate-500 hover:border-[#e6b52a] hover:text-[#172554]"
                      }`}
                    >
                      {category} <span className="opacity-60">{count}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {paginatedOpportunities.map((event) => {
                const isSaved = savedIds.includes(event.id);

                return (
                  <article
                    key={event.id}
                    className="group relative overflow-hidden rounded-[28px] border border-white bg-white/90 p-6 shadow-[0_18px_60px_rgba(31,41,55,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_75px_rgba(31,41,55,0.14)]"
                  >
                    <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${event.color}`} />

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${event.color} text-sm font-black text-slate-900 shadow-sm`}>
                          {event.initials}
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                            {event.category} · {event.skill}
                          </p>
                          <h3 className="mt-1 text-lg font-black tracking-tight text-slate-950">
                            {event.title}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSave(event)}
                        aria-label={isSaved ? `Remove ${event.title} from saved` : `Save ${event.title}`}
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border text-base transition ${
                          isSaved
                            ? "border-[#f4c430] bg-[#fff6d6] text-[#9b7000]"
                            : "border-slate-200 bg-white text-slate-300 hover:border-[#e6b52a] hover:text-[#9b7000]"
                        }`}
                      >
                        {isSaved ? "★" : "☆"}
                      </button>
                    </div>

                    <p className="mt-4 text-sm font-extrabold leading-5 text-slate-800">
                      {event.subtitle}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {event.description}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <div className="rounded-2xl bg-slate-50 p-3.5">
                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">When</p>
                        <p className="mt-1 text-xs font-black text-slate-700">{event.date} · {event.time}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-3.5">
                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Where</p>
                        <p className="mt-1 text-xs font-black text-slate-700">{event.location}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-3.5">
                      <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Requirements</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">{event.requirements}</p>
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button
                        onClick={() => toggleSave(event)}
                        className={`flex-1 rounded-2xl px-4 py-3.5 text-xs font-black transition ${
                          isSaved
                            ? "border border-[#e6b52a] bg-[#fff8df] text-[#8a6500] hover:bg-[#fff1bd]"
                            : "bg-[#172554] text-white hover:bg-[#1e3a8a]"
                        }`}
                      >
                        {isSaved ? "Saved ✓" : "Save opportunity"}
                      </button>

                      <button
                        onClick={() => openOpportunity(event)}
                        title="Open NKU Center for Student Engagement"
                        aria-label={`Open NKU Center for Student Engagement for ${event.title}`}
                        className="grid w-12 place-items-center rounded-2xl border border-slate-200 bg-white text-sm text-slate-700 transition hover:border-[#e6b52a] hover:bg-[#fff8df] hover:text-[#172554]"
                      >
                        ↗
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {selectedSkills.length === 0 && !showAllOpportunities ? (
              <div className="mt-6 rounded-[28px] border border-dashed border-[#e6b52a]/60 bg-white/80 p-12 text-center shadow-sm">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fff6d6] text-xl text-[#a47700]">
                  ✦
                </div>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#a47700]">
                  Personal feed
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-[#172554]">
                  Set your skills to unlock opportunities
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
                  Your dashboard only shows opportunities that match skills you
                  have selected. Add your skills and we’ll tailor this feed to you.
                </p>
                <button
                  onClick={() => router.push("../skills_select")}
                  className="mt-6 rounded-2xl bg-[#172554] px-6 py-3.5 text-sm font-black text-white shadow-[0_12px_28px_rgba(23,37,84,0.18)] transition hover:-translate-y-0.5 hover:bg-[#24366f]"
                >
                  Choose my skills →
                </button>
              </div>
            ) : filteredOpportunities.length === 0 ? (
              <div className="mt-6 rounded-[28px] border border-dashed border-slate-200 bg-white/70 p-12 text-center shadow-sm">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-xl">⌕</div>
                <h3 className="mt-4 text-xl font-black text-slate-900">No opportunities found</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Try another search term or switch back to all categories.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                  }}
                  className="mt-5 rounded-2xl bg-[#172554] px-5 py-3 text-sm font-black text-white"
                >
                  Reset feed
                </button>
              </div>
            ) : null}

            {filteredOpportunities.length > OPPORTUNITIES_PER_PAGE && (
              <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[24px] border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row">
                <p className="text-sm font-semibold text-slate-500">
                  Showing{" "}
                  <span className="font-black text-[#172554]">
                    {(currentPage - 1) * OPPORTUNITIES_PER_PAGE + 1}–
                    {Math.min(currentPage * OPPORTUNITIES_PER_PAGE, filteredOpportunities.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-black text-[#172554]">{filteredOpportunities.length}</span>{" "}
                  opportunities
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-[#172554] transition hover:border-[#e6b52a] hover:bg-[#fff8df] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Previous
                  </button>

                  <div className="grid min-w-10 place-items-center rounded-xl bg-[#172554] px-3 py-2.5 text-sm font-black text-white">
                    {currentPage}
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-xl bg-[#172554] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#24366f] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            <section className="mt-7 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fff6d6] text-lg text-[#a47700]">✦</div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Keep going</p>
                    <h3 className="mt-1 text-lg font-black text-slate-900">Build a feed around you.</h3>
                    <p className="mt-1 text-sm text-slate-500">Add skills to make the opportunity experience more personal.</p>
                  </div>
                </div>

                <button
                  onClick={() => router.push("../skills_select")}
                  className="rounded-2xl bg-[#f4c430] px-5 py-3.5 text-sm font-black text-[#172554] shadow-lg shadow-[#f4c430]/15 transition hover:-translate-y-0.5 hover:bg-[#ffd95b]"
                >
                  Manage skills →
                </button>
              </div>
            </section>
          </main>

          <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/90 shadow-[0_-14px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:left-[350px]">
            <div className="mx-auto grid h-[76px] max-w-7xl grid-cols-3 px-3">
              <button className="group relative flex flex-col items-center justify-center gap-1 text-[#172554]">
                <span className="absolute top-0 h-1 w-12 rounded-b-full bg-[#f4c430]" />
                <span className="text-lg transition-transform group-hover:-translate-y-0.5">⌂</span>
                <span className="text-[10px] font-black uppercase tracking-wider">Home</span>
              </button>
              <button
                onClick={() => router.push("../browse")}
                className="group flex flex-col items-center justify-center gap-1 text-slate-400 transition hover:text-[#172554]"
              >
                <span className="text-lg transition-transform group-hover:-translate-y-0.5">✦</span>
                <span className="text-[10px] font-black uppercase tracking-wider">Browse</span>
              </button>
              <button
                onClick={() => router.push("../skills_select")}
                className="group flex flex-col items-center justify-center gap-1 text-slate-400 transition hover:text-[#172554]"
              >
                <span className="text-lg transition-transform group-hover:-translate-y-0.5">◎</span>
                <span className="text-[10px] font-black uppercase tracking-wider">Skills</span>
              </button>
            </div>
          </nav>
        </section>
      </div>
    </div>
  );
}
