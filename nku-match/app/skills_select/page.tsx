"use client";

import { useState } from "react";

// Add, remove, or rename categories and skills here. The page updates itself.
// Keep each skill name unique across the whole list.
const SKILLS: Record<string, string[]> = {
 
  "STEM": [
    "Agriculture", "CAD Modeling", "Chemistry", "Engineering", "Programming", "Medicine", 
  ],
  "Arts": [
    "Acting", "Music", "Art", "Sports"
  ],
  "Infomatics": [
    "Human Resources", "Event Planning", "Finance", "Writing",
  ],
  "Leadership & Community": [
    "Team Management", "Volunteering", "Teaching",
  ],
};

const CATEGORIES = Object.keys(SKILLS);

const cardStyle = {
  borderRadius: "8px",
  border: "2px solid #E6B52A",
  padding: "16px",
};

export default function SkillSelect() {
  const [category, setCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (skill: string) => {
    setSelected((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const query = search.trim().toLowerCase();

  // Categories to show, each with only the skills that match the search box
  const visible = CATEGORIES.filter((c) => category === "All" || c === category)
    .map((c) => ({
      name: c,
      skills: SKILLS[c].filter((s) => s.toLowerCase().includes(query)),
    }))
    .filter((c) => c.skills.length > 0);

  return (
    <div
      className="
        h-screen
        overflow-hidden
        text-zinc-800
        bg-[#f7f3e8]
        bg-[linear-gradient(to_bottom,transparent_31px,rgba(80,100,120,0.18)_32px)]
        bg-[length:100%_32px]
      "
    >
      <main className="mx-auto flex h-full max-w-5xl">

        {/* Left column: category filter */}
        <aside className="w-44 overflow-y-auto border-r border-zinc-400/50 p-3">
          <div className="flex flex-col gap-2 pt-8">
            <h2 className="pb-2 text-center text-sm font-semibold uppercase tracking-wide">
              Filter
            </h2>

            {["All", ...CATEGORIES].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-md border-2 px-2 py-1 text-left text-sm ${
                  category === c
                    ? "border-[#E6B52A] bg-[#E6B52A]/40 font-semibold"
                    : "border-zinc-500 hover:bg-zinc-400/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex min-h-0 flex-1 flex-col">
          <header className="flex justify-center pt-6">
            <img src="/nku_banner.jpg" alt="NKU Banner" className="max-w-md" />
          </header>

          <div className="flex min-h-0 flex-1 flex-col px-8 py-8">

            {/* Title row */}
            <div className="flex items-center justify-between pb-6">
              <h1 className="text-3xl font-semibold">Skill Select</h1>
              <button className="flex items-center gap-2 rounded-full border-2 border-zinc-500 px-3 py-1">
                <img src="/default_user.png" height={28} width={28} alt="Account" />
                Account
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills..."
              className="mb-6 w-full rounded-md border-2 border-zinc-500 bg-white/70 px-3 py-2 outline-none focus:border-[#E6B52A]"
            />

            <div className="flex min-h-0 flex-1 gap-6">

              {/* Middle column: skills to pick from (scrolls inside itself) */}
              <div
                className="flex min-h-0 flex-1 flex-col bg-[#f7f3e8]"
                style={cardStyle}
              >
                <div className="min-h-0 flex-1 space-y-6 overflow-y-auto pr-2">
                  {visible.length === 0 && (
                    <p className="text-zinc-500">No skills match your search.</p>
                  )}

                  {visible.map((c) => (
                    <div key={c.name}>
                      <h2 className="pb-2 text-lg font-semibold">{c.name}</h2>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {c.skills.map((skill) => (
                          <label
                            key={skill}
                            className="flex cursor-pointer items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={selected.includes(skill)}
                              onChange={() => toggle(skill)}
                              className="h-4 w-4 accent-[#E6B52A]"
                            />
                            {skill}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column: My Skills (also scrolls inside itself) */}
              <div
                className="flex max-h-full w-56 flex-col self-start bg-[#f7f3e8]"
                style={cardStyle}
              >
                <div className="flex items-center justify-between pb-2">
                  <h2 className="text-lg font-semibold">
                    My Skills ({selected.length})
                  </h2>
                  {selected.length > 0 && (
                    <button
                      onClick={() => setSelected([])}
                      className="text-sm underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {selected.length === 0 ? (
                  <p className="text-sm text-zinc-500">
                    Check a box to add a skill.
                  </p>
                ) : (
                  <div className="min-h-0 flex-1 space-y-1 overflow-y-auto">
                    {selected.map((skill) => (
                      <label
                        key={skill}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked
                          onChange={() => toggle(skill)}
                          className="h-4 w-4 accent-[#E6B52A]"
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          <nav className="border-t border-zinc-400/60 p-4">
            <div className="flex justify-around">
              <button>Home</button>
              <button>Browse All</button>
              <button>Quiz</button>
            </div>
          </nav>
        </section>
      </main>
    </div>
  );
}