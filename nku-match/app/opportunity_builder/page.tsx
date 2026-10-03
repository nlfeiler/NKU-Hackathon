"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Opportunity = {

  id: string;

  category: string;

  skill: string;

  initials: string;

  title: string;

  subtitle: string;

  description: string;

  requirements: string;

  date: string;

  time: string;

  location: string;

  color: string;

  url?: string;

};

// Must match the skill names used on the skills page and in opportunities.ts*

const SKILLS_BY_CATEGORY: Record<string, string[]> = {

  STEM: [

    "Agriculture", "CAD Modeling", "Chemistry", "Engineering", "Programming",

    "Medicine", "Biology", "Environmental Science",

  ],

  Arts: ["Acting", "Music", "Illustrative Art"],

  Social: [

    "Teaching", "Business", "Finance", "Law", "Political Science", "Psychology",

  ],

  "Leadership & Community": [

    "Team Management", "Volunteering", "Human Resources",

  ],

};

const COLORS = [

  "from-emerald-300 to-green-500",

  "from-cyan-300 to-blue-500",

  "from-violet-300 to-purple-600",

  "from-amber-300 to-orange-500",

  "from-pink-300 to-rose-500",

  "from-sky-300 to-blue-600",

];

const emptyForm = {

  title: "",

  subtitle: "",

  description: "",

  requirements: "",

  skill: "",

  date: "",

  time: "",

  location: "",

  url: "",

};

const inputClass =

  "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#e6b52a] focus:bg-white focus:ring-4 focus:ring-[#f4c430]/15";

const labelClass =

  "mb-2 block text-xs font-black uppercase tracking-[0.15em] text-slate-500";

function formatDate(value: string) {

  return new Date(value + "T00:00").toLocaleDateString("en-US", {

    month: "short",

    day: "numeric",

  });

}

function formatTime(value: string) {

  const [h, m] = value.split(":").map(Number);

  const suffix = h >= 12 ? "PM" : "AM";

  const hour = h % 12 === 0 ? 12 : h % 12;

  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;

}

export default function OpportunityBuilder() {

  const [mine, setMine] = useState<Opportunity[]>([]);

  const [form, setForm] = useState(emptyForm);

  const [error, setError] = useState("");

  const [posted, setPosted] = useState(false);

  // Load opportunities from Supabase.
  useEffect(() => {
    async function loadOpportunities() {
      const { data, error } = await supabase
        .from("opportunities")
        .select(
          "id, title, organization, description, category, skill, subtitle, requirements, date, time, location, url"
        )
        .order("id", { ascending: false });

      if (error) {
        setError(`Could not load opportunities: ${error.message}`);
        setMine([]);
        return;
      }

      const opportunities: Opportunity[] = (data ?? []).map((row, index) => {
        const title = row.title || "Untitled opportunity";
        const initials = title
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((word) => word[0].toUpperCase())
          .join("");

        return {
          id: String(row.id),
          category: row.category || "STEM",
          skill: row.skill || "",
          initials,
          title,
          subtitle: row.subtitle || row.organization || "",
          description: row.description || "",
          requirements: row.requirements || "None listed",
          date: row.date || "",
          time: row.time || "",
          location: row.location || "",
          color: COLORS[index % COLORS.length],
          url: row.url || undefined,
        };
      });

      setMine(opportunities);
    }

    loadOpportunities();
  }, []);

  function persist(next: Opportunity[]) {
    setMine(next);
  }

  function update(field: keyof typeof emptyForm, value: string) {

    setForm((prev) => ({ ...prev, [field]: value }));

    setError("");

    setPosted(false);

  }

  async function handleSubmit() {

    const title = form.title.trim();

    const description = form.description.trim();

    const location = form.location.trim();

    let link = form.url.trim();

    if (!title || !description || !location || !form.date || !form.time || !link) {

      setError(

        "Please fill in the title, description, location, date, time, and link."

      );

      return;

    }

    if (!form.skill) {

      setError("Please choose the skill this opportunity relates to.");

      return;

    }

    if (!/^https?:\/\//i.test(link)) link = "https://" + link;

    try {

      const parsed = new URL(link);

      if (!parsed.hostname.includes(".")) throw new Error("bad link");

    } catch {

      setError("Please enter a valid link, like https://www.nku.edu.");

      return;

    }

    const category =

      Object.keys(SKILLS_BY_CATEGORY).find((c) =>

        SKILLS_BY_CATEGORY[c].includes(form.skill)

      ) || "STEM";

    const initials = title

      .split(/\s+/)

      .filter(Boolean)

      .slice(0, 2)

      .map((word) => word[0].toUpperCase())

      .join("");

    const opportunity: Opportunity = {

      id: "custom-" + Date.now(),

      category,

      skill: form.skill,

      initials,

      title,

      subtitle: form.subtitle.trim(),

      description,

      requirements: form.requirements.trim() || "None listed",

      date: formatDate(form.date),

      time: formatTime(form.time),

      location,

      color: COLORS[mine.length % COLORS.length],

      url: link,

    };

    const { data: inserted, error: insertError } = await supabase
      .from("opportunities")
      .insert({
        title: opportunity.title,
        organization: "Northern Kentucky University",
        description: opportunity.description,
        category: opportunity.category,
        skill: opportunity.skill,
        subtitle: opportunity.subtitle,
        requirements: opportunity.requirements,
        date: opportunity.date,
        time: opportunity.time,
        location: opportunity.location,
        url: opportunity.url || null,
      })
      .select(
        "id, title, organization, description, category, skill, subtitle, requirements, date, time, location, url"
      )
      .single();

    if (insertError || !inserted) {
      setError(
        insertError?.message || "Could not post the opportunity to Supabase."
      );
      setPosted(false);
      return;
    }

    const savedOpportunity: Opportunity = {
      ...opportunity,
      id: String(inserted.id),
    };

    persist([savedOpportunity, ...mine]);
    setForm(emptyForm);
    setError("");
    setPosted(true);

  }

  async function remove(id: string) {
    const { error: deleteError } = await supabase
      .from("opportunities")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(`Could not remove the opportunity: ${deleteError.message}`);
      return;
    }

    persist(mine.filter((item) => item.id !== id));
  }

  return (

    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[#f4c430]/18 blur-3xl" />

        <div className="absolute right-[-12rem] top-10 h-[38rem] w-[38rem] rounded-full bg-blue-300/20 blur-3xl" />

        <div className="absolute bottom-[-14rem] left-[38%] h-[34rem] w-[34rem] rounded-full bg-purple-300/15 blur-3xl" />

      </div>

      <div className="relative flex min-h-screen flex-col lg:flex-row">

        {/* Side dashboard: My opportunities */}

        <aside className="z-30 flex w-full shrink-0 flex-col border-b border-slate-200/70 bg-white/85 shadow-[0_10px_45px_rgba(15,23,42,0.06)] backdrop-blur-2xl lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[350px] lg:border-b-0 lg:border-r">

          <div className="border-b border-slate-100 px-7 py-7">

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />

                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#9b7000]">

                    Faculty

                  </p>

                </div>

                <h2 className="mt-1 text-[27px] font-black tracking-[-0.035em] text-slate-950">

                  My opportunities

                </h2>

              </div>

              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#172554] text-sm font-black text-white shadow-[0_10px_25px_rgba(23,37,84,0.18)]">

                {mine.length}

              </div>

            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">

              Everything you post is saved here and appears in the student

              opportunity feed.

            </p>

          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-5">

            {mine.length === 0 ? (

              <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/80 p-6 text-center">

                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl shadow-sm">

                  ✦

                </div>

                <p className="mt-4 text-sm font-black text-slate-800">

                  No opportunities yet.

                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">

                  Fill in the form to post your first one.

                </p>

              </div>

            ) : (

              mine.map((item) => (

                <div

                  key={item.id}

                  className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#e6b52a] hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]"

                >

                  <div className="flex items-start gap-3">

                    <div

                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${item.color} text-[11px] font-black text-slate-900`}

                    >

                      {item.initials}

                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="text-sm font-black leading-5 text-slate-900">

                        {item.title}

                      </h3>

                      <p className="mt-1 text-[11px] font-medium leading-4 text-slate-500">

                        {item.category} · {item.skill}

                      </p>

                    </div>

                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-600">

                    {item.description}

                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-500">

                    <span>◷ {item.date} · {item.time}</span>

                    <span className="text-slate-300">•</span>

                    <span>{item.location}</span>

                  </div>

                  {item.url && (

                    <a

                      href={item.url}

                      target="_blank"

                      rel="noopener noreferrer"

                      className="mt-2 block truncate text-[11px] font-bold text-blue-700 underline"

                    >

                      {item.url}

                    </a>

                  )}

                  <button

                    onClick={() => remove(item.id)}

                    className="mt-3 text-[10px] font-black text-slate-400 transition hover:text-rose-600"

                  >

                    Remove opportunity

                  </button>

                </div>

              ))

            )}

          </div>

        </aside>

        <section className="w-full lg:ml-[350px]">

          <header className="sticky top-0 z-20 border-b border-white/70 bg-[#f5f7fb]/85 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">

            <div className="mx-auto flex max-w-4xl items-center gap-3">

              <img

                src="/nku_banner.jpg"

                alt="NKU Banner"

                className="h-10 w-auto object-contain sm:h-12"

              />

              <div className="hidden h-8 w-px bg-slate-200 sm:block" />

              <div className="hidden sm:block">

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">

                  Faculty tools

                </p>

                <p className="text-sm font-extrabold text-slate-700">

                  Opportunity builder

                </p>

              </div>

            </div>

          </header>

          <main className="mx-auto max-w-4xl px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pt-12">

            <section className="relative overflow-hidden rounded-[38px] bg-[#172554] px-7 py-9 text-white shadow-[0_30px_90px_rgba(23,37,84,0.24)] sm:px-10">

              <div className="absolute right-[-90px] top-[-130px] h-[360px] w-[360px] rounded-full bg-[#f4c430]/20 blur-3xl" />

              <div className="relative">

                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#f8d66d]">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#f4c430]" />

                  Opportunity builder

                </div>

                <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.045em] sm:text-5xl">

                  Let the students

                  <span className="block text-[#f8d66d]">come to you.</span>

                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200">

                  Post research, tutoring, club, or other opportunities. Each one

                  goes straight into the student feed.

                </p>

              </div>

            </section>

            <form

              className="mt-8 space-y-5 rounded-[28px] border border-white bg-white/90 p-6 shadow-[0_18px_60px_rgba(31,41,55,0.09)] sm:p-8"

              onSubmit={(event) => {

                event.preventDefault();

                handleSubmit();

              }}

            >

              <div>

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9b7000]">

                  New opportunity

                </p>

                <h2 className="mt-1 text-2xl font-black tracking-[-0.03em] text-slate-950">

                  Create an opportunity

                </h2>

              </div>

              <div>

                <label htmlFor="title" className={labelClass}>Title</label>

                <input

                  id="title"

                  type="text"

                  value={form.title}

                  onChange={(e) => update("title", e.target.value)}

                  placeholder="e.g. Dr. Smith's Robotics Lab"

                  className={inputClass}

                />

              </div>

              <div>

                <label htmlFor="subtitle" className={labelClass}>

                  Tagline (optional)

                </label>

                <input

                  id="subtitle"

                  type="text"

                  value={form.subtitle}

                  onChange={(e) => update("subtitle", e.target.value)}

                  placeholder="e.g. Research Assistantship Opportunity"

                  className={inputClass}

                />

              </div>

              <div>

                <label htmlFor="description" className={labelClass}>

                  Description

                </label>

                <textarea

                  id="description"

                  rows={4}

                  value={form.description}

                  onChange={(e) => update("description", e.target.value)}

                  placeholder="What will students do, and who are you looking for?"

                  className={inputClass}

                />

              </div>

              <div>

                <label htmlFor="requirements" className={labelClass}>

                  Requirements (optional)

                </label>

                <input

                  id="requirements"

                  type="text"

                  value={form.requirements}

                  onChange={(e) => update("requirements", e.target.value)}

                  placeholder="e.g. Some coding knowledge"

                  className={inputClass}

                />

              </div>

              <div>

                <label htmlFor="skill" className={labelClass}>Related skill</label>

                <select

                  id="skill"

                  value={form.skill}

                  onChange={(e) => update("skill", e.target.value)}

                  className={inputClass}

                >

                  <option value="">Select a skill</option>

                  {Object.entries(SKILLS_BY_CATEGORY).map(([category, skills]) => (

                    <optgroup key={category} label={category}>

                      {skills.map((skill) => (

                        <option key={skill} value={skill}>

                          {skill}

                        </option>

                      ))}

                    </optgroup>

                  ))}

                </select>

              </div>

              <div className="grid gap-5 sm:grid-cols-3">

                <div>

                  <label htmlFor="date" className={labelClass}>Date</label>

                  <input

                    id="date"

                    type="date"

                    value={form.date}

                    onChange={(e) => update("date", e.target.value)}

                    className={inputClass}

                  />

                </div>

                <div>

                  <label htmlFor="time" className={labelClass}>Time</label>

                  <input

                    id="time"

                    type="time"

                    value={form.time}

                    onChange={(e) => update("time", e.target.value)}

                    className={inputClass}

                  />

                </div>

                <div>

                  <label htmlFor="location" className={labelClass}>Location</label>

                  <input

                    id="location"

                    type="text"

                    value={form.location}

                    onChange={(e) => update("location", e.target.value)}

                    placeholder="e.g. GH201"

                    className={inputClass}

                  />

                </div>

              </div>

              <div>

                <label htmlFor="url" className={labelClass}>Link</label>

                <input

                  id="url"

                  type="text"

                  value={form.url}

                  onChange={(e) => update("url", e.target.value)}

                  placeholder="https://..."

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

              {posted && (

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3.5 text-sm font-semibold text-emerald-700">

                  Posted! It is now saved under My opportunities and visible to

                  students.

                </div>

              )}

              <button

                type="submit"

                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#172554] px-5 py-4 text-sm font-black text-white shadow-[0_12px_30px_rgba(23,37,84,0.2)] transition hover:-translate-y-0.5 hover:bg-[#1e3a8a] focus:outline-none focus:ring-4 focus:ring-[#f4c430]/30"

              >

                Post opportunity

                <span className="text-lg transition-transform group-hover:translate-x-1">

                  →

                </span>

              </button>

            </form>

          </main>

        </section>

      </div>

    </div>

  );

}