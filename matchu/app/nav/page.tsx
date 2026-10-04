"use client"
import { useRouter } from "next/navigation";

export default function Footer() {
    const router = useRouter();

    return (
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
    )
}