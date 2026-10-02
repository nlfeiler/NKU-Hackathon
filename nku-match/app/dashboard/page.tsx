"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
        <aside className="fixed left-0 top-0 h-screen w-1/3 border-r border-zinc-400/50">
          <div className="flex h-full flex-col">
            <button className="flex h-1/3 w-full items-center justify-center border-b border-zinc-400/50">
              Org
            </button>

            <button className="flex h-1/3 w-full items-center justify-center border-b border-zinc-400/50">
              Pro
            </button>

            <button className="flex h-1/3 w-full items-center justify-center">
              Org
            </button>
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
            <div className="max-w-2xl space-y-12">

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
                      Requirements: Some coding knowledge
                      <br />
                      Time: Oct 18 @ 5:00PM in GH201
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
                    src="/default_user.png"
                    height={64}
                    width={64}
                    alt="Profile"
                  />

                  <h2 className="text-2xl font-semibold">
                    Learn how to code
                  </h2>
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
                    src="/default_user.png"
                    height={64}
                    width={64}
                    alt="Profile"
                  />

                  <h2 className="text-2xl font-semibold">
                    Learn to code with us!!!!
                  </h2>
                </div>
              </div>

            </div>
          </div>

          <nav className="border-t border-zinc-400/60">
            <div className="grid h-full grid-cols-3 divide-x-2 divide-zinc-400/60">
              <button className="flex items-center justify-center">
                Home
              </button>

              <button className="flex items-center justify-center">
                Browse All
              </button>

              <button
                className="flex items-center justify-center"
                onClick={() => router.push("../skills_select")}
              >
                Quiz
              </button>
            </div>
          </nav>
        </section>
      </main>
    </div>
  );
}