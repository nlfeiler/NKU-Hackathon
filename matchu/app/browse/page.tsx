"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import baseOpportunities, { type Opportunity } from "../dashboard/opportunities";

const CATEGORY_ORDER = [
  "All",
  "STEM",
  "Arts",
  "Social",
  "Leadership & Community",
];

const COLORS = [
  "from-emerald-300 to-green-500",
  "from-cyan-300 to-blue-500",
  "from-violet-300 to-purple-600",
  "from-amber-300 to-orange-500",
  "from-pink-300 to-rose-500",
  "from-sky-300 to-blue-600",
];

type SupabaseOpportunity = {
  id: number | string;
  title: string | null;
  organization: string | null;
  description: string | null;
  category: string | null;
  skill: string | null;
  subtitle: string | null;
  requirements: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  url: string | null;
};

function makeInitials(title: string) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
}

function mapSupabaseOpportunity(
  row: SupabaseOpportunity,
  index: number
): Opportunity {
  const title = row.title?.trim() || "Untitled opportunity";

  return {
    id: `supabase-${row.id}`,
    title,
    subtitle: row.subtitle?.trim() || row.organization?.trim() || "",
    description: row.description?.trim() || "",
    requirements: row.requirements?.trim() || "None listed",
    category: row.category?.trim() || "Other",
    skill: row.skill?.trim() || "",
    initials: makeInitials(title),
    date: row.date?.trim() || "Date TBD",
    time: row.time?.trim() || "Time TBD",
    location: row.location?.trim() || "Location TBD",
    color: COLORS[index % COLORS.length],
    url: row.url?.trim() || undefined,
  };
}

export default function BrowsePage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [databaseOpportunities, setDatabaseOpportunities] = useState<
    Opportunity[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [databaseError, setDatabaseError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [skill, setSkill] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);

  const PER_PAGE = 12;

  useEffect(() => {
    let active = true;

    async function loadOpportunities() {
      setLoading(true);
      setDatabaseError("");

      const { data, error } = await supabase
        .from("opportunities")
        .select(
          "id, title, organization, description, category, skill, subtitle, requirements, date, time, location, url"
        )
        .order("id", { ascending: false });

      if (!active) return;

      if (error) {
        setDatabaseError(error.message);
        setDatabaseOpportunities([]);
        setLoading(false);
        return;
      }

      const rows = (data ?? []) as SupabaseOpportunity[];

      setDatabaseOpportunities(
        rows.map((row, index) => mapSupabaseOpportunity(row, index))
      );
      setLoading(false);
    }

    loadOpportunities();

    return () => {
      active = false;
    };
  }, [supabase]);

  const allOpportunities = useMemo(() => {
    const databaseIds = new Set(databaseOpportunities.map((item) => item.id));

    return [
      ...databaseOpportunities,
      ...baseOpportunities.filter((item) => !databaseIds.has(item.id)),
    ];
  }, [databaseOpportunities]);

  const skills = useMemo(() => {
    return Array.from(
      new Set(
        allOpportunities
          .map((item) => item.skill)
          .filter((value) => value && value.trim())
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [allOpportunities]);

  const filteredOpportunities = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = allOpportunities.filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;

      const matchesSkill = skill === "All" || item.skill === skill;

      const haystack = [
        item.title,
        item.subtitle,
        item.description,
        item.requirements,
        item.category,
        item.skill,
        item.location,
        item.date,
        item.time,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || haystack.includes(query);

      return matchesCategory && matchesSkill && matchesSearch;
    });

    if (sort === "Title") {
      return [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "Category") {
      return [...result].sort((a, b) =>
        `${a.category}-${a.title}`.localeCompare(`${b.category}-${b.title}`)
      );
    }

    return result;
  }, [allOpportunities, category, search, skill, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOpportunities.length / PER_PAGE)
  );

  const paginated = useMemo(
    () =>
      filteredOpportunities.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
      ),
    [filteredOpportunities, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, skill, sort]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setSkill("All");
    setSort("Newest");
  }

  function openOpportunity(item: Opportunity) {
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
      return;
    }

    window.open(
      "https://www.nku.edu/center-for-student-engagement/student-orgs/",
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[#f4c430]/18 blur-3xl" />
        <div className="absolute right-[-12rem] top-10 h-[38rem] w-[38rem] rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute bottom-[-14rem] left-[38%] h-[34rem] w-[34rem] rounded-full bg-purple-300/15 blur-3xl" />
      </div>

      <div className="relative min-h-screen">
        <header className="sticky top-0 z-40 border-b border-white/70 bg-[#f5f7fb]/90 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
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
                  Browse everything
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("../dashboard")}
              className="rounded-2xl bg-[#172554] px-4 py-2.5 text-xs font-black text-white shadow-sm transition hover:bg-[#24366f]"
            >
              ← Dashboard
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-5 pb-32 pt-8 sm:px-8 lg:px-10 lg:pt-12">
          <section className="relative overflow-hidden rounded-[38px] bg-[#172554] px-7 py-9 text-white shadow-[0_30px_90px_rgba(23,37,84,0.24)] sm:px-10 sm:py-12 lg:px-12">
            <div className="absolute right-[-90px] top-[-130px] h-[360px] w-[360px] rounded-full bg-[#f4c430]/20 blur-3xl" />
            <div className="absolute bottom-[-140px] right-[22%] h-[300px] w-[300px] rounded-full bg-blue-400/20 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#f8d66d] backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f4c430]" />
                  Opportunity directory
                </div>

                <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl">
                  Explore every
                  <span className="block text-[#f8d66d]">
                    opportunity.
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Browse the full opportunity catalog, including faculty-posted
                  listings from Supabase. Search and filter by category or skill.
                </p>
              </div>

              <div className="grid shrink-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:w-[360px]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                  <p className="text-2xl font-black">
                    {allOpportunities.length}
                  </p>
                  <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-slate-300">
                    Listings
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                  <p className="text-2xl font-black">{skills.length}</p>
                  <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-slate-300">
                    Skills
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f4c430] p-4 text-[#172554]">
                  <p className="text-2xl font-black">
                    {filteredOpportunities.length}
                  </p>
                  <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em]">
                    Showing
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-[0_18px_60px_rgba(31,41,55,0.08)] sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">Search opportunities</span>
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                  ⌕
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search title, skill, organization, location..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#e6b52a] focus:bg-white focus:ring-4 focus:ring-[#f4c430]/10"
                />
              </label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label="Filter by category"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold text-slate-700 outline-none focus:border-[#e6b52a] focus:ring-4 focus:ring-[#f4c430]/10"
              >
                {CATEGORY_ORDER.map((item) => (
                  <option key={item} value={item}>
                    {item === "All" ? "All categories" : item}
                  </option>
                ))}
              </select>

              <select
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                aria-label="Filter by skill"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold text-slate-700 outline-none focus:border-[#e6b52a] focus:ring-4 focus:ring-[#f4c430]/10"
              >
                <option value="All">All skills</option>
                {skills.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort opportunities"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold text-slate-700 outline-none focus:border-[#e6b52a] focus:ring-4 focus:ring-[#f4c430]/10"
              >
                <option value="Newest">Newest</option>
                <option value="Title">Title A–Z</option>
                <option value="Category">Category</option>
              </select>

              <button
                type="button"
                onClick={resetFilters}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-xs font-black text-slate-600 transition hover:border-[#e6b52a] hover:text-[#172554]"
              >
                Reset
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <p className="text-sm font-semibold text-slate-500">
                Showing{" "}
                <span className="font-black text-[#172554]">
                  {filteredOpportunities.length}
                </span>{" "}
                of{" "}
                <span className="font-black text-[#172554]">
                  {allOpportunities.length}
                </span>{" "}
                listings
              </p>

              {databaseError && (
                <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">
                  Database listings could not be loaded: {databaseError}
                </p>
              )}
            </div>
          </section>

          {loading ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[390px] animate-pulse rounded-[28px] border border-slate-100 bg-white"
                />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <section className="mt-6 rounded-[28px] border border-dashed border-slate-200 bg-white/80 p-12 text-center shadow-sm">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-xl">
                ⌕
              </div>
              <h2 className="mt-4 text-xl font-black text-slate-900">
                No listings match those filters
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Try a different search, category, or skill.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-2xl bg-[#172554] px-5 py-3 text-sm font-black text-white"
              >
                Clear filters
              </button>
            </section>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {paginated.map((event) => (
                <article
                  key={event.id}
                  className="group relative overflow-hidden rounded-[28px] border border-white bg-white/90 p-6 shadow-[0_18px_60px_rgba(31,41,55,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_75px_rgba(31,41,55,0.14)]"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${event.color}`}
                  />

                  <div className="flex items-start gap-3">
                    <div
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${event.color} text-sm font-black text-slate-900 shadow-sm`}
                    >
                      {event.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                        {event.category}
                        {event.skill ? ` · ${event.skill}` : ""}
                      </p>
                      <h2 className="mt-1 text-lg font-black tracking-tight text-slate-950">
                        {event.title}
                      </h2>
                    </div>
                  </div>

                  {event.subtitle && (
                    <p className="mt-4 text-sm font-extrabold leading-5 text-slate-800">
                      {event.subtitle}
                    </p>
                  )}

                  <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-500">
                    {event.description}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl bg-slate-50 p-3.5">
                      <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                        When
                      </p>
                      <p className="mt-1 text-xs font-black text-slate-700">
                        {event.date} · {event.time}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3.5">
                      <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                        Where
                      </p>
                      <p className="mt-1 text-xs font-black text-slate-700">
                        {event.location}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-3.5">
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                      Requirements
                    </p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                      {event.requirements}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openOpportunity(event)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#172554] px-4 py-3.5 text-xs font-black text-white transition hover:bg-[#1e3a8a]"
                  >
                    View opportunity
                    <span>↗</span>
                  </button>
                </article>
              ))}
            </div>
          )}

          {filteredOpportunities.length > PER_PAGE && (
            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[24px] border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row">
              <p className="text-sm font-semibold text-slate-500">
                Page{" "}
                <span className="font-black text-[#172554]">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-black text-[#172554]">
                  {totalPages}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
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
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-xl bg-[#172554] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#24366f] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/90 shadow-[0_-14px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="mx-auto grid h-[76px] max-w-7xl grid-cols-3 px-3">
            <button
              type="button"
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
              type="button"
              className="group relative flex flex-col items-center justify-center gap-1 text-[#172554]"
            >
              <span className="absolute top-0 h-1 w-12 rounded-b-full bg-[#f4c430]" />
              <span className="text-lg transition-transform group-hover:-translate-y-0.5">
                ✦
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider">
                Browse
              </span>
            </button>

            <button
              type="button"
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
      </div>
    </div>
  );
}
