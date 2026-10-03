"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type QuizQuestion = {
  id: string;
  question: string;
  skill: string;
  category: string;
};

const QUESTIONS: QuizQuestion[] = [
  { id: "manage", question: "Do you like to run meetings or organize a group toward a goal?", skill: "Team Management", category: "Leadership & Community" },
  { id: "teach", question: "Do you enjoy explaining things and helping other people learn?", skill: "Teaching", category: "Social" },
  { id: "program", question: "Do you enjoy building websites, apps, or other software?", skill: "Programming", category: "STEM" },
  { id: "cad", question: "Do you like designing physical objects or parts with computer-aided design tools?", skill: "CAD Modeling", category: "STEM" },
  { id: "chem", question: "Do you enjoy laboratory experiments involving chemicals, measurements, or reactions?", skill: "Chemistry", category: "STEM" },
  { id: "bio", question: "Would you enjoy studying animals, plants, cells, or other living organisms?", skill: "Biology", category: "STEM" },
  { id: "engineering", question: "Do you enjoy figuring out how to design, build, or improve physical systems?", skill: "Engineering", category: "STEM" },
  { id: "medicine", question: "Are you interested in healthcare, medicine, or how doctors care for patients?", skill: "Medicine", category: "STEM" },
  { id: "environment", question: "Do you enjoy working on sustainability, conservation, or environmental problems?", skill: "Environmental Science", category: "STEM" },
  { id: "agriculture", question: "Do you enjoy growing plants, working with gardens, or learning about food production?", skill: "Agriculture", category: "STEM" },
  { id: "acting", question: "Would you enjoy performing in front of an audience or taking part in a theatrical production?", skill: "Acting", category: "Arts" },
  { id: "music", question: "Do you enjoy playing, performing, or working with music?", skill: "Music", category: "Arts" },
  { id: "art", question: "Do you enjoy drawing, illustration, or creating digital artwork?", skill: "Illustrative Art", category: "Arts" },
  { id: "business", question: "Do you enjoy coming up with business ideas, solving business problems, or thinking about entrepreneurship?", skill: "Business", category: "Social" },
  { id: "finance", question: "Do you enjoy working with budgets, investments, accounting, or financial decisions?", skill: "Finance", category: "Social" },
  { id: "law", question: "Do you enjoy researching rules, building arguments, or thinking about legal issues?", skill: "Law", category: "Social" },
  { id: "political", question: "Do you enjoy discussing government, public policy, or current political issues?", skill: "Political Science", category: "Social" },
  { id: "psychology", question: "Are you interested in why people think, behave, learn, or remember things?", skill: "Psychology", category: "Social" },
  { id: "volunteer", question: "Do you enjoy volunteering or giving your time to help your community?", skill: "Volunteering", category: "Leadership & Community" },
  { id: "hr", question: "Would you enjoy helping with recruiting, interviews, onboarding, or supporting employees?", skill: "Human Resources", category: "Leadership & Community" },
];

export default function SkillsQuiz() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [savedSkills, setSavedSkills] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("mySkills") || "[]");
      if (Array.isArray(stored)) {
        setSavedSkills(stored.filter((skill): skill is string => typeof skill === "string"));
      }
    } catch {
      setSavedSkills([]);
    }
  }, []);

  const current = QUESTIONS[index];
  const selectedSkills = useMemo(
    () => QUESTIONS.filter((q) => answers[q.id]).map((q) => q.skill),
    [answers]
  );

  const answer = (value: boolean) => {
    setAnswers((previous) => ({ ...previous, [current.id]: value }));
  };

  const finish = () => {
    const merged = Array.from(new Set([...savedSkills, ...selectedSkills]));
    localStorage.setItem("mySkills", JSON.stringify(merged));
    setSavedSkills(merged);
    setComplete(true);
  };

  if (complete) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] px-5 py-8">
        <div className="mx-auto max-w-3xl">
          <button onClick={() => router.back()} className="mb-8 text-sm font-black text-[#172554]">← Back</button>
          <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(23,37,84,0.10)]">
            <div className="bg-[#172554] px-8 py-12 text-white sm:px-12">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#f4c430]">Profile updated</p>
              <h1 className="mt-3 text-4xl font-black tracking-[-0.04em]">Your skills are ready.</h1>
              <p className="mt-4 text-sm leading-7 text-white/70">Your yes answers were added to your skills. Your dashboard can now personalize the opportunities you see.</p>
            </div>
            <div className="p-8 sm:p-12">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Skills added</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {selectedSkills.length ? selectedSkills.map((skill) => (
                  <div key={skill} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-black text-[#172554]">✓ {skill}</div>
                )) : (
                  <p className="text-sm text-slate-500">No new skills were added.</p>
                )}
              </div>
              <button onClick={() => router.push("../dashboard")} className="mt-8 w-full rounded-2xl bg-[#172554] px-6 py-4 text-sm font-black text-white">View my opportunities →</button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const progress = ((index + 1) / QUESTIONS.length) * 100;
  const currentAnswer = answers[current.id];

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-5 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between">
          <button onClick={() => router.back()} className="text-sm font-black text-[#172554]">← Back</button>
          <span className="rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#9b7000] shadow-sm">Skills Quiz</span>
        </header>

        <section className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(23,37,84,0.10)]">
          <div className="px-7 py-8 sm:px-12 sm:py-10">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#9b7000]">Discover your skills</p>
                <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#172554]">Let’s build your opportunity feed.</h1>
              </div>
              <p className="text-xl font-black text-[#172554]">{index + 1}<span className="text-slate-300">/{QUESTIONS.length}</span></p>
            </div>
            <div className="mt-7 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-[#f4c430] transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="border-y border-slate-100 bg-slate-50/60 px-7 py-10 sm:px-12 sm:py-14">
            <span className="rounded-full bg-[#fff4c8] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#8a6500]">{current.category}</span>
            <h2 className="mt-6 max-w-3xl text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">{current.question}</h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button onClick={() => answer(true)} className={`rounded-[24px] border-2 p-6 text-left transition ${currentAnswer === true ? "border-[#172554] bg-[#172554] text-white" : "border-slate-200 bg-white hover:border-[#e6b52a]"}`}>
                <span className="text-2xl">✓</span>
                <p className="mt-4 text-lg font-black">Yes</p>
                <p className={`mt-1 text-sm ${currentAnswer === true ? "text-white/65" : "text-slate-500"}`}></p>
              </button>
              <button onClick={() => answer(false)} className={`rounded-[24px] border-2 p-6 text-left transition ${currentAnswer === false ? "border-slate-700 bg-slate-800 text-white" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                <span className="text-2xl">×</span>
                <p className="mt-4 text-lg font-black">No</p>
                <p className={`mt-1 text-sm ${currentAnswer === false ? "text-white/65" : "text-slate-500"}`}></p>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-7 py-6 sm:px-12">
            <button onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0} className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-[#172554] disabled:opacity-30">← Previous</button>
            <button onClick={() => index === QUESTIONS.length - 1 ? finish() : setIndex((i) => i + 1)} disabled={currentAnswer === undefined} className="rounded-2xl bg-[#172554] px-6 py-3 text-sm font-black text-white disabled:opacity-40">
              {index === QUESTIONS.length - 1 ? "Finish & build my feed" : "Next →"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
