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
                <aside className="fixed left-0 top-0 h-screen w-1/3 overflow-y-auto border-r border-zinc-400/50">
                    <div className="flex-1 overflow-y-auto p-4">
                        <p className="text-center text-zinc-500">
                            No present student requests
                        </p>
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
                                <div className="items-center gap-4">
                                    <h1 className="text-2xl font-semibold">
                                        TESTING TESTING FOR INPUT
                                    </h1>

                                    <h2>
                                        Add some research, tutoring, club or other opportunities and let the students come to you!
                                        <br />
                                        <a href="../opportunity_builder" style={{ color: "blue" }}> Opportunity Builder</a>
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
                                onClick={() => router.push("../opportunity_builder")}
                            >
                                Opportunity Builder
                            </button>
                        </div>
                    </nav>
                </section>
            </main>
        </div >
    );
}