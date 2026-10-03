"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  type Event = {
    id: string;
    title: string;
    description: string;
    requirements: string;
    time: string;
    location: string;
  };
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  function loadEvents() {
    try {
      const stored = localStorage.getItem("myEvents");

      if (stored) {
        setEvents(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load events:", error);
      setEvents([]);
    }
  }

  function signupForEvent(eventInfo: Event) {
    const alreadyAdded = events.some(
      (event) => event.id === eventInfo.id
    );

    if (alreadyAdded) {
      setError("You have already added this event.");
      return;
    }

    setError("");

    const updatedEvents = [...events, eventInfo];

    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  }

  function saveEvents(eventsToSave: Event[]) {
    try {
      localStorage.setItem("myEvents", JSON.stringify(eventsToSave));
    } catch (error) {
      console.error("Failed to save events:", error);
    }
  }

  return (
    <div
      className="
        min-h-screen
        text-zinc-800
        bg-[#f7f3e8]
        bg-[linear-gradient(to_bottom,transparent_31px,rgba(80,100,120,0.18)_32px)]
        bg-[length:100%_32px]
      "
    >

      <main className="min-h-screen">
        <aside className="fixed left-0 top-0 h-screen w-1/3 overflow-y-auto border-r border-zinc-400/50">
          <div className="flex-1 overflow-y-auto p-4">
            {events.length === 0 ? (
              <p className="text-center text-zinc-500">
                No events added yet.
              </p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-lg border-2 border-[#E6B52A] p-4"
                  >
                    <h2 className="text-xl font-bold">
                      {event.title}
                    </h2>

                    <p className="mt-1 text-sm">
                      {event.description}
                    </p>

                    <p className="mt-2 text-sm font-semibold">
                      {event.time}
                    </p>

                    <p className="text-sm">
                      {event.location}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        <section className="ml-[33.333333%] flex min-h-screen flex-col">
          <header className="flex justify-center pt-6">
            <img
              src="/nku_banner.jpg"
              alt="NKU Banner"
              className="max-w-md"
            />
          </header>

          <div className="flex-1 px-8 py-12">
            <div className="space-y-12">

              <div
                className="border-t border-zinc-400/60 pt-8"
                style={{
                  borderRadius: "8px",
                  border: "2px solid #E6B52A",
                  padding: "16px",
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/default_user.png"
                    height={64}
                    width={64}
                    alt="Profile"
                  />

                  <div>
                    <h1 className="text-2xl font-semibold">
                      IoT Club
                    </h1>

                    <h2 className="text-1xl font-semibold">
                      Come develop Robotics with us!
                    </h2>

                    <h5>
                      We are looking for people who want to learn more about embedded systems and are willing to build a robot with us!
                      <br />
                      Requirements: Some coding knowledge
                      <br />
                      Time: Oct 18 @ 5:00PM in GH201
                      <br />
                      <button style={{ color: "blue" }} onClick={() => signupForEvent({
                        id: "iot-club",
                        title: "IoT Club",
                        description: "Come develop Robotics with us!",
                        requirements: "Some coding knowledge",
                        time: "Oct 18 @ 5:00PM",
                        location: "GH201"
                      })}>
                        Join Here!
                      </button>
                    </h5>
                  </div>
                </div>
              </div>

              <div
                className="border-t border-zinc-400/60 pt-8"
                style={{
                  borderRadius: "8px",
                  border: "2px solid #E6B52A",
                  padding: "16px",
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/default_user2.png"
                    height={64}
                    width={64}
                    alt="Profile"
                  />

                  <div>
                    <h1 className="text-2xl font-semibold">
                      Software Engineering Club
                    </h1>

                    <h2 className="text-1xl font-semibold">
                      Program the future with us!
                    </h2>

                    <h5>
                      Help us make the first quantum sorting algorithm without a runtime of n log (n)!
                      <br />
                      Requirements: Data Structures and Algorithms knowledge
                      <br />
                      Time: November 1 @ 9:00AM in GH971
                      <br />
                      <button style={{ color: "blue" }} onClick={() => signupForEvent({
                        id: "software-engineering-club",
                        title: "Software Engineering Club",
                        description: "Program the future with us!",
                        requirements: "Data Structures and Algorithms knowledge",
                        time: "November 1 @ 9:00AM",
                        location: "GH971"
                      })}>
                        Join Here!
                      </button>
                    </h5>
                  </div>
                </div>
              </div>

              <div
                className="border-t border-zinc-400/60 pt-8"
                style={{
                  borderRadius: "8px",
                  border: "2px solid #E6B52A",
                  padding: "16px",
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src="/default_user3.png"
                    height={64}
                    width={64}
                    alt="Profile"
                  />

                  <div>
                    <h1 className="text-2xl font-semibold">
                      Dr. Doctorington
                    </h1>

                    <h2 className="text-1xl font-semibold">
                      Research Assistantship Opportunity
                    </h2>

                    <h5>
                      I am looking for someone who wishes to learn more about the field of medicine and is willing to help me with my research!
                      <br />
                      Requirements: Knowledge of biology and chemistry
                      <br />
                      Time: October 25 @ 3:00PM in FH297
                      <br />
                      <button style={{ color: "blue" }} onClick={() => signupForEvent({
                        id: "research-assistantship",
                        title: "Research Assistantship Opportunity",
                        description: "I am looking for someone who wishes to learn more about the field of medicine and is willing to help me with my research!",
                        requirements: "Knowledge of biology and chemistry",
                        time: "October 25 @ 3:00PM",
                        location: "FH297"
                      })}>
                        Join Here!
                      </button>
                    </h5>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <nav className="border-t border-zinc-400/60">
            <div className="grid h-full grid-cols-3 divide-x-2 divide-zinc-400/60">
              <button className="flex items-center justify-center" onClick={() => router.push("../dashboard")}>
                Home
              </button>

              <button className="flex items-center justify-center">
                Browse All
              </button>

              <button
                className="flex items-center justify-center"
                onClick={() => router.push("../skills_select")}
              >
                Skills Select
              </button>
            </div>
          </nav>
        </section>
      </main>
    </div>
  );
}