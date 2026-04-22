"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { completeSession, getFlashcards, heartbeat, markUserInactive, recordProgress } from "@/lib/arena-store";
import type { Flashcard } from "@/lib/types";

type CurrentSession = {
  userId: string;
  sessionId: string;
  name: string;
};

export default function FlashcardsPage() {
  const router = useRouter();
  const [current, setCurrent] = useState<CurrentSession | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("wealthcube-current");
    if (!stored) {
      router.replace("/");
      return;
    }

    const parsed = JSON.parse(stored) as CurrentSession;
    setCurrent(parsed);
    getFlashcards().then((loaded) => {
      setCards(loaded.slice(0, 100));
      setLoading(false);
    });

    const timer = window.setInterval(() => void heartbeat(parsed.userId), 15_000);
    const leave = () => void markUserInactive(parsed.userId);
    window.addEventListener("beforeunload", leave);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("beforeunload", leave);
    };
  }, [router]);

  const card = cards[index];
  const knownCount = useMemo(() => Object.values(answers).filter(Boolean).length, [answers]);
  const answeredCount = Object.keys(answers).length;
  const progress = cards.length ? Math.round((answeredCount / cards.length) * 100) : 0;
  const accuracy = answeredCount ? Math.round((knownCount / answeredCount) * 100) : 0;

  async function mark(known: boolean) {
    if (!card || !current) return;

    const nextAnswers = { ...answers, [card.id]: known };
    const nextKnown = Object.values(nextAnswers).filter(Boolean).length;
    const nextUnknown = Object.keys(nextAnswers).length - nextKnown;
    setAnswers(nextAnswers);

    await recordProgress(
      {
        session_id: current.sessionId,
        user_id: current.userId,
        flashcard_id: card.id,
        known
      },
      nextKnown,
      nextUnknown,
      cards.length
    );

    if (index >= cards.length - 1) {
      await completeSession(current.sessionId, current.userId, nextKnown, cards.length);
      router.push(`/result?session=${current.sessionId}`);
      return;
    }

    setIndex((value) => value + 1);
    setFlipped(false);
  }

  function move(delta: number) {
    if (!cards.length) return;
    setIndex((value) => Math.min(cards.length - 1, Math.max(0, value + delta)));
    setFlipped(false);
  }

  if (loading) {
    return <main className="grid min-h-screen place-items-center px-4 text-lg font-bold text-ink">Preparing your arena...</main>;
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-5 md:py-8">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-mint">Flashcard Arena</p>
          <h1 className="text-3xl font-black text-ink md:text-5xl">Welcome, {current?.name}</h1>
        </div>
        <button
          onClick={() => router.push("/")}
          className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700"
        >
          Exit
        </button>
      </header>

      <section className="arena-card rounded-lg p-4 md:p-6">
        <div className="mb-5 grid gap-3 md:grid-cols-3">
          <Stat label="Progress" value={`${progress}%`} />
          <Stat label="Accuracy" value={`${accuracy}%`} />
          <Stat label="Card" value={`${index + 1}/${cards.length}`} />
        </div>

        <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-mint transition-all" style={{ width: `${progress}%` }} />
        </div>

        {card ? (
          <>
            <button
              type="button"
              onClick={() => setFlipped((value) => !value)}
              className="flip-scene block w-full text-left"
              aria-label="Flip flashcard"
            >
              <div className={`flip-card relative min-h-[410px] w-full ${flipped ? "is-flipped" : ""}`}>
                <div className="flip-face absolute inset-0 flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 md:p-9">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase text-cube">{card.concept}</span>
                    <span className="text-sm font-bold text-slate-500">{card.difficulty}</span>
                  </div>
                  <h2 className="text-2xl font-black leading-tight text-ink md:text-4xl">{card.question}</h2>
                  <p className="text-sm font-bold uppercase tracking-wide text-slate-400">Tap card to reveal</p>
                </div>

                <div className="flip-face flip-back absolute inset-0 flex flex-col justify-between rounded-lg border border-emerald-200 bg-emerald-50 p-6 md:p-9">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-mint">Answer</span>
                    <span className="text-sm font-bold text-emerald-700">{card.tags.slice(0, 3).join(" / ")}</span>
                  </div>
                  <p className="text-2xl font-extrabold leading-snug text-emerald-950 md:text-4xl">{card.answer}</p>
                  <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Mark your recall below</p>
                </div>
              </div>
            </button>

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-[56px_1fr_1fr_56px]">
              <button onClick={() => move(-1)} className="grid min-h-12 place-items-center rounded-md border border-slate-200 bg-white text-slate-700" aria-label="Previous card">
                <ArrowLeft size={21} />
              </button>
              <button onClick={() => void mark(false)} className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-red-600 px-4 font-black text-white">
                <X size={20} /> Unknown
              </button>
              <button onClick={() => void mark(true)} className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-mint px-4 font-black text-white">
                <Check size={20} /> Known
              </button>
              <button onClick={() => move(1)} className="grid min-h-12 place-items-center rounded-md border border-slate-200 bg-white text-slate-700" aria-label="Next card">
                <ArrowRight size={21} />
              </button>
            </div>

            <button
              onClick={() => setFlipped(false)}
              className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700"
            >
              <RotateCcw size={17} /> Reset Flip
            </button>
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 p-10 text-center font-bold text-slate-500">
            No flashcards found. Seed Supabase or use the bundled dataset.
          </div>
        )}
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <strong className="mt-1 block text-2xl font-black text-ink">{value}</strong>
    </div>
  );
}
