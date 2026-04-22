"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Trophy, UsersRound } from "lucide-react";
import { createArenaSession, getActiveUsers, getFlashcards, getLeaderboard, hasSupabase, subscribeToArena } from "@/lib/arena-store";
import type { ArenaUser, LeaderboardRow } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [activeUsers, setActiveUsers] = useState<ArenaUser[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [cardCount, setCardCount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const connected = useMemo(() => hasSupabase(), []);

  useEffect(() => {
    async function loadArena() {
      const [users, leaders, cards] = await Promise.all([getActiveUsers(), getLeaderboard(), getFlashcards()]);
      setActiveUsers(users);
      setLeaderboard(leaders);
      setCardCount(cards.length);
    }

    void loadArena();
    return subscribeToArena(() => void loadArena());
  }, []);

  async function startSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError("Enter your name to enter the arena.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const { user, session } = await createArenaSession(cleanName, cardCount);
      localStorage.setItem("wealthcube-current", JSON.stringify({ userId: user.id, sessionId: session.id, name: user.name }));
      router.push("/flashcards");
    } catch {
      setError("Could not start the session. Check Supabase keys and table setup.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-6xl gap-6 px-4 py-6 md:grid-cols-[1.05fr_0.95fr] md:py-10">
      <section className="arena-card flex min-h-[620px] flex-col justify-between rounded-lg p-5 md:p-8">
        <div>
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="hero-title mt-3 max-w-2xl text-5xl font-black leading-none tracking-normal md:text-7xl">
                WEALTHCUBE LEARNING ARENA
              </h1>
            </div>
            <span className="status-pill shrink-0 rounded-full px-3 py-2 text-xs font-bold text-slate-700">
              {connected ? "Live Supabase" : "Local demo"}
            </span>
          </div>

          <form onSubmit={startSession} className="liquid-tile grid gap-3 rounded-lg p-3 md:grid-cols-[1fr_auto]">
            <label className="sr-only" htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter learner name"
              className="liquid-input min-h-12 rounded-md px-4 text-base font-semibold text-ink outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-emerald-100"
              maxLength={40}
            />
            <button
              type="submit"
              disabled={loading}
              className="primary-action min-h-12 rounded-md px-6 font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Starting..." : "Start Learning"}
            </button>
          </form>
          {error ? <p className="mt-3 text-sm font-semibold text-red-600">{error}</p> : null}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Metric icon={<UsersRound size={20} />} label="Active users" value={activeUsers.length.toString()} />
          <Metric icon={<Trophy size={20} />} label="Leaderboard" value={`${leaderboard.length} ranked`} />
          <Metric icon={<Activity size={20} />} label="Flashcards" value={cardCount.toString()} />
        </div>
      </section>

      <aside className="grid gap-6">
        <Panel title="Active Users" icon={<UsersRound size={19} />}>
          <div className="grid gap-2">
            {activeUsers.length ? activeUsers.slice(0, 8).map((user) => (
              <div key={user.id} className="liquid-tile flex items-center justify-between rounded-md px-3 py-2">
                <span className="font-semibold text-ink">{user.name}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-mint shadow-[0_0_14px_rgba(22,115,91,0.72)]" aria-label="Active" />
              </div>
            )) : <Empty label="No active learners yet" />}
          </div>
        </Panel>

        <Panel title="Leaderboard" icon={<Trophy size={19} />}>
          <div className="grid gap-2">
            {leaderboard.length ? leaderboard.map((row, index) => (
              <div key={`${row.user_id}-${index}`} className="liquid-tile grid grid-cols-[32px_1fr_auto] items-center gap-3 rounded-md px-3 py-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 text-sm font-black text-cube shadow-inner">{index + 1}</span>
                <div className="min-w-0">
                  <p className="truncate font-bold text-ink">{row.name}</p>
                  <p className="text-xs font-semibold text-slate-500">{row.known_count}/{row.total_questions} known</p>
                </div>
                <strong className="text-mint">{row.accuracy}%</strong>
              </div>
            )) : <Empty label="Complete a session to rank" />}
          </div>
        </Panel>
      </aside>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="liquid-tile rounded-lg p-4">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-emerald-100 to-blue-100 text-cube shadow-inner">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <strong className="mt-1 block text-2xl font-black text-ink">{value}</strong>
    </div>
  );
}

function Panel({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="arena-card rounded-lg p-5">
      <div className="mb-4 flex items-center gap-2 text-ink">
        <span className="text-cube">{icon}</span>
        <h2 className="text-xl font-black">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Empty({ label }: { label: string }) {
  return <div className="liquid-tile rounded-md border-dashed p-5 text-center text-sm font-semibold text-slate-500">{label}</div>;
}
