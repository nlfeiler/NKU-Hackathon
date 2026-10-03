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
            <button className="flex h-1/3 w-full items-center justify-center border-b border-zinc-400/50" style={{backgroundColor: "white"}}>
              Org
            </button>

            <button className="flex h-1/3 w-full items-center justify-center border-b border-zinc-400/50" style={{backgroundColor: "white"}}>
              Pro
            </button>

            <button className="flex h-1/3 w-full items-center justify-center" style={{backgroundColor: "white"}}>
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
                      <br/>
                      <a href="https://www.example.com" style={{color: "blue"}}>Join Here!</a>
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

                  <div>
                    <h1 className="text-2xl font-semibold">
                      Software Engineering Club
                    </h1>

                    <h2 className="text-1xl font-semibold">
                      Come program the future with us!
                    </h2>

                    <h5>
                      Help us make the first quantum sorting algorithm without a runtime of n log (n)!
                      <br />
                      Requirements: Some coding knowledge
                      <br />
                      Time: November 1 @ 9:00AM in GH971
                      <br/>
                      <a href="https://www.example.com" style={{color: "blue"}}>Join Here!</a>
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
                      <br/>
                      <a href="https://www.example.com" style={{color: "blue"}}>Join Here!</a>
                    </h5>
                  </div>
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