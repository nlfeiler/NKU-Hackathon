"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Event = {
  id: string;
  title: string;
  description: string;
  requirements: string;
  time: string;
  location: string;
};

type EventCardProps = Event & {
  index: number;
  onJoin: () => void;
};

const eventData: Event[] = [
  {
    id: "iot-club",
    title: "IoT Club",
    description: "Come develop Robotics with us!",
    requirements: "Programming, Python, Robotics",
    time: "Oct 18 @ 5:00PM",
    location: "GH201",
  },
  {
    id: "software-engineering-club",
    title: "Software Engineering Club",
    description: "Program the future with us!",
    requirements: "Programming, Data Structures & Algorithms",
    time: "November 1 @ 9:00AM",
    location: "GH971",
  },
  {
    id: "research-assistantship",
    title: "Dr. Doctorington",
    description: "Research Assistantship Opportunity",
    requirements: "Biology, Chemistry",
    time: "October 25 @ 3:00PM",
    location: "FH297",
  },
];

function EventCard({ title, description, requirements, time, location, index, onJoin }: EventCardProps) {
  const accents = [
    "from-[#f9c73d] to-[#e8a914]",
    "from-[#8ec5ff] to-[#4f8cff]",
    "from-[#b99cff] to-[#7754e8]",
  ];

  return (
    <article
      className="group relative overflow-hidden rounded-[28px] border border-white/80 bg-white/85 p-6 shadow-[0_18px_60px_rgba(31,41,55,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(31,41,55,0.16)]"
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accents[index % accents.length]}`} />

      <div className="flex items-start justify-between gap-5">
        <div className="flex min-w-0 items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#172554] text-sm font-black text-white shadow-lg shadow-slate-900/10">
            {title
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-xl font-black tracking-tight text-slate-950">{title}</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">{description}</p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">
          Open
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">When</p>
          <p className="mt-1.5 text-sm font-bold text-slate-800">{time}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Where</p>
          <p className="mt-1.5 text-sm font-bold text-slate-800">{location}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#fff5cf] text-[#9a6b00]">✦</span>
        <span>
          <span className="font-bold text-slate-800">Looking for:</span> {requirements}
        </span>
      </div>

      <button
        onClick={onJoin}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#172554] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-slate-900/15 transition hover:bg-[#1e3a8a] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#f4c430]/40 active:scale-[0.99]"
      >
        Join event
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </article>
  );
}

export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("myEvents");
      if (stored) setEvents(JSON.parse(stored));
    } catch (storageError) {
      console.error("Failed to load events:", storageError);
      setEvents([]);
    }
  }, []);

  function saveEvents(eventsToSave: Event[]) {
    try {
      localStorage.setItem("myEvents", JSON.stringify(eventsToSave));
    } catch (storageError) {
      console.error("Failed to save events:", storageError);
    }
  }

  function signupForEvent(eventInfo: Event) {
    if (events.some((event) => event.id === eventInfo.id)) {
      setError("You've already added this event.");
      return;
    }

    setError("");
    const updatedEvents = [...events, eventInfo];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  }

  function leaveEvent(eventId: string) {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setError("");
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  }

  const totalEvents = eventData.length;
  const joinedCount = events.length;
  const upcomingLabel = useMemo(
    () => `${joinedCount} ${joinedCount === 1 ? "event" : "events"} saved`,
    [joinedCount]
  );

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#f4c430]/20 blur-3xl" />
        <div className="absolute right-[-8rem] top-40 h-[28rem] w-[28rem] rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-1/3 h-[30rem] w-[30rem] rounded-full bg-violet-200/20 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col lg:flex-row">
        {/* Saved events rail */}
        <aside className="z-20 flex w-full shrink-0 flex-col border-b border-slate-200/80 bg-white/80 shadow-[0_8px_40px_rgba(15,23,42,0.05)] backdrop-blur-2xl lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[340px] lg:border-b-0 lg:border-r">
          <div className="border-b border-slate-100 px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a47700]">Your schedule</p>
                <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Saved events</h2>
              </div>
              <div className="grid h-11 min-w-11 place-items-center rounded-2xl bg-[#172554] px-2 text-sm font-black text-white">
                {joinedCount}
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500">{upcomingLabel}. Build your semester around what matters.</p>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            {error && (
              <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            {events.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-sm">✦</div>
                <h3 className="mt-4 font-extrabold text-slate-800">Your list is empty</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Join an opportunity from the feed and it will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#e6b52a] hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-extrabold leading-5 text-slate-900">{event.title}</h3>
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                    </div>
                    <p className="mt-2 text-xs font-medium leading-5 text-slate-500">{event.description}</p>
                    <div className="mt-3 space-y-1 text-xs font-bold text-slate-700">
                      <p>◷ {event.time}</p>
                      <p>⌖ {event.location}</p>
                    </div>
                    <button
                      onClick={() => leaveEvent(event.id)}
                      className="mt-3 text-xs font-extrabold text-slate-400 transition hover:text-red-600"
                    >
                      Remove from schedule
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden border-t border-slate-100 p-5 lg:block">
            <div className="rounded-2xl bg-[#172554] p-4 text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#f8d66d]">Campus life</p>
              <p className="mt-1 text-sm font-bold">Discover something worth showing up for.</p>
            </div>
          </div>
        </aside>

        {/* Main experience */}
        <section className="w-full lg:ml-[340px]">
          <header className="sticky top-0 z-10 border-b border-white/70 bg-[#f6f8fc]/85 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src="/nku_banner.jpg" alt="NKU Banner" className="h-10 w-auto object-contain sm:h-12" />
                <div className="hidden h-8 w-px bg-slate-200 sm:block" />
                <div className="hidden sm:block">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Student opportunities</p>
                  <p className="text-sm font-extrabold text-slate-700">Find your next thing</p>
                </div>
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-600 shadow-sm">
                Fall 2025
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-5 pb-28 pt-10 sm:px-8 lg:px-10 lg:pt-14">
            <section className="relative overflow-hidden rounded-[34px] bg-[#172554] px-7 py-9 text-white shadow-[0_25px_80px_rgba(23,37,84,0.22)] sm:px-10 sm:py-12">
              <div className="absolute right-[-70px] top-[-90px] h-64 w-64 rounded-full bg-[#f4c430]/20 blur-2xl" />
              <div className="absolute bottom-[-100px] right-24 h-60 w-60 rounded-full bg-blue-400/20 blur-3xl" />

              <div className="relative max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#f8d66d]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f4c430]" />
                  Explore • Connect • Build
                </span>
                <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  Find something
                  <span className="block text-[#f8d66d]">worth showing up for.</span>
                </h1>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Discover clubs, research opportunities, and hands-on experiences around campus.
                  Save the ones that spark your interest and make your semester count.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                    <p className="text-lg font-black">{totalEvents}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Featured</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                    <p className="text-lg font-black">{joinedCount}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Saved</p>
                  </div>
                  <div className="rounded-2xl bg-[#f4c430] px-4 py-3 text-[#172554]">
                    <p className="text-lg font-black">∞</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider">Possibilities</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-12 flex items-end justify-between gap-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a47700]">Featured opportunities</p>
                <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">What’s happening</h2>
              </div>
              <span className="hidden rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm sm:block">
                {totalEvents} opportunities
              </span>
            </div>

            <div className="mt-7 grid gap-5 xl:grid-cols-3">
              {eventData.map((event, index) => (
                <EventCard
                  key={event.id}
                  {...event}
                  index={index}
                  onJoin={() => signupForEvent(event)}
                />
              ))}
            </div>

            <section className="mt-8 rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-sm sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Not sure where to start?</p>
                  <h3 className="mt-1 text-xl font-black text-slate-900">Match opportunities to your skills.</h3>
                  <p className="mt-1 text-sm text-slate-500">Use Skills Select to narrow down what fits you.</p>
                </div>
                <button
                  onClick={() => router.push("../skills_select")}
                  className="rounded-2xl bg-[#f4c430] px-5 py-3.5 text-sm font-black text-[#172554] shadow-lg shadow-[#f4c430]/20 transition hover:-translate-y-0.5 hover:bg-[#ffd95b]"
                >
                  Explore by skills →
                </button>
              </div>
            </section>
          </main>

          <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/80 bg-white/90 shadow-[0_-12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:left-[340px]">
            <div className="mx-auto grid h-[72px] max-w-6xl grid-cols-3 px-3">
              <button
                onClick={() => router.push("../dashboard")}
                className="group flex flex-col items-center justify-center gap-1 text-slate-400 transition hover:text-[#172554]"
              >
                <span className="text-lg transition-transform group-hover:-translate-y-0.5">⌂</span>
                <span className="text-[10px] font-black uppercase tracking-wider">Home</span>
              </button>

              <button className="group relative flex flex-col items-center justify-center gap-1 text-[#172554]">
                <span className="absolute top-0 h-1 w-12 rounded-b-full bg-[#f4c430]" />
                <span className="text-lg">✦</span>
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
