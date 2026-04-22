"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Award, Home, RotateCcw } from "lucide-react";
import { getSessionResult } from "@/lib/arena-store";
import type { ArenaSession, ArenaUser, LeaderboardRow } from "@/lib/types";

export function ResultClient() {
  const params = useSearchParams();
  const sessionId = params.get("session");
  const [session, setSession] = useState<ArenaSession | null>(null);
  const [user, setUser] = useState<ArenaUser | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    getSessionResult(sessionId).then((result) => {
      setSession(result.session);
      setUser(result.user);
      setLeaderboard(result.leaderboard);
      setLoading(false);
    });
  }, [sessionId]);

  const rank = useMemo(() => {
    if (!session) return null;
    const index = leaderboard.findIndex((row) => row.user_id === session.user_id);
    return index >= 0 ? index + 1 : leaderboard.filter((row) => row.accuracy >= session.accuracy).length + 1;
  }, [leaderboard, session]);

  if (loading) {
    return <main className="grid min-h-screen place-items-center px-4 text-lg font-bold text-ink">Calculating rank...</main>;
  }

  if (!session) {
    return (
      <main className="grid min-h-screen place-items-center px-4">
        <section className="arena-card max-w-md rounded-lg p-6 text-center">
          <h1 className="text-3xl font-black text-ink">No result found</h1>
          <p className="mt-2 font-semibold text-slate-600">Start a session to generate your score and rank.</p>
          <Link href="/" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-md bg-cube px-5 font-bold text-white">
            Go Home
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-5xl gap-6 px-4 py-6 md:grid-cols-[1fr_360px] md:py-10">
      <section className="arena-card flex flex-col justify-between rounded-lg p-6 md:p-8">
        <div>
          <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber/15 text-amber">
            <Award size={34} />
          </div>
          <p className="text-sm font-bold uppercase tracking-wide text-mint">Session Complete</p>
          <h1 className="mt-2 text-5xl font-black leading-none text-ink md:text-7xl">
            {user?.name || "Learner"}, you scored {session.accuracy}%.
          </h1>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <ResultMetric label="Score" value={`${session.known_count}/${session.total_questions}`} />
          <ResultMetric label="Accuracy" value={`${session.accuracy}%`} />
          <ResultMetric label="Rank" value={rank ? `#${rank}` : "-"} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-md bg-cube px-5 font-bold text-white">
            <Home size={18} /> Home
          </Link>
          <Link href="/flashcards" className="inline-flex min-h-12 items-center gap-2 rounded-md border border-slate-200 bg-white px-5 font-bold text-slate-700">
            <RotateCcw size={18} /> Review Again
          </Link>
        </div>
      </section>

      <aside className="arena-card rounded-lg p-5">
        <h2 className="mb-4 text-xl font-black text-ink">Leaderboard</h2>
        <div className="grid gap-2">
          {leaderboard.length ? leaderboard.map((row, index) => (
            <div key={`${row.user_id}-${index}`} className={`grid grid-cols-[32px_1fr_auto] items-center gap-3 rounded-md border px-3 py-2 ${row.user_id === session.user_id ? "border-mint bg-emerald-50" : "border-slate-200 bg-white"}`}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-50 text-sm font-black text-cube">{index + 1}</span>
              <div className="min-w-0">
                <p className="truncate font-bold text-ink">{row.name}</p>
                <p className="text-xs font-semibold text-slate-500">{row.known_count}/{row.total_questions} known</p>
              </div>
              <strong className="text-mint">{row.accuracy}%</strong>
            </div>
          )) : (
            <div className="rounded-md border border-dashed border-slate-300 p-5 text-center text-sm font-semibold text-slate-500">
              First completed result appears here.
            </div>
          )}
        </div>
      </aside>
    </main>
  );
}

function ResultMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <strong className="mt-1 block text-3xl font-black text-ink">{value}</strong>
    </div>
  );
}
