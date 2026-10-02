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

      {/* Page */}
      <main className="mx-auto flex min-h-screen max-w-5xl">

        {/* Left sidebar */}
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

        {/* Main content */}
        <section className="flex flex-1 flex-col">

          {/* Top right */}
          <div className="flex justify-end p-5">
            <button className="rounded-full border border-zinc-500 px-4 py-2">
              Account
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-8 py-12">

            <div className="max-w-2xl space-y-12">

              <div>
                <h1 className="text-2xl font-semibold">
                  Use these people who are interested in coding
                </h1>

                <p className="mt-3 text-zinc-600">
                  Find people who want to learn and build together.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Watch and learn
                </h2>

                <p className="mt-2 text-zinc-600">
                  Volunteer to watch lessons and learn from others.
                </p>
              </div>

              <div className="border-t border-zinc-400/60 pt-8">
                <h2 className="text-2xl font-semibold">
                  Learn how to code
                </h2>
              </div>

            </div>

          </div>

          {/* Bottom navigation */}
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