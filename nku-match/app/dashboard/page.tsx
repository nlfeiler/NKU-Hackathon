export default function Home() {
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

      <main className="mx-auto flex min-h-screen max-w-5xl">

        <aside className="w-24 border-r border-zinc-400/50 p-3">
          <div className="flex flex-col items-center gap-6 pt-8">

            <button className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-zinc-500">
              Org
            </button>

            <button className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-zinc-500">
              Pro
            </button>

            <button className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-zinc-500">
              Org
            </button>

          </div>
        </aside>


        <section className="flex flex-1 flex-col">
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
                    LI hav aids
                  </h2>
                </div>
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