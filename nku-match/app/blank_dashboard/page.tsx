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
                                        Nothing...yet! 
                                    </h1>

                                    <h2>
                                        How about you add some skills and let the communications roll in?
                                        <br/>
                                        <a href="../skills_select" style={{color: "blue"}}> Skills Select</a>
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
                                Skills Select
                            </button>
                        </div>
                    </nav>
                </section>
            </main>
        </div>
    );
}