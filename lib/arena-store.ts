"use client";

import { flashcards as fallbackCards } from "@/lib/flashcards";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { ArenaSession, ArenaUser, Flashcard, LeaderboardRow, ProgressRow } from "@/lib/types";

const localUsersKey = "wealthcube-users";
const localSessionsKey = "wealthcube-sessions";
const localProgressKey = "wealthcube-progress";

export function hasSupabase() {
  return Boolean(getSupabaseBrowserClient());
}

export async function getFlashcards(): Promise<Flashcard[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return fallbackCards;

  const { data, error } = await supabase
    .from("flashcards")
    .select("id, question, answer, concept, difficulty, tags")
    .order("id", { ascending: true })
    .limit(100);

  if (error || !data?.length) return fallbackCards;
  return data as Flashcard[];
}

export async function createArenaSession(name: string, totalQuestions: number) {
  const cleanName = name.trim().slice(0, 40);
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    const user: ArenaUser = {
      id: crypto.randomUUID(),
      name: cleanName,
      is_active: true,
      last_seen: new Date().toISOString()
    };
    const session: ArenaSession = {
      id: crypto.randomUUID(),
      user_id: user.id,
      total_questions: totalQuestions,
      known_count: 0,
      unknown_count: 0,
      accuracy: 0,
      completed: false
    };
    saveLocal(localUsersKey, [...getLocal<ArenaUser>(localUsersKey), user]);
    saveLocal(localSessionsKey, [...getLocal<ArenaSession>(localSessionsKey), session]);
    return { user, session };
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .insert({ name: cleanName, is_active: true, last_seen: new Date().toISOString() })
    .select("*")
    .single();

  if (userError) throw userError;

  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .insert({ user_id: user.id, total_questions: totalQuestions })
    .select("*")
    .single();

  if (sessionError) throw sessionError;
  return { user: user as ArenaUser, session: session as ArenaSession };
}

export async function recordProgress(input: ProgressRow, knownCount: number, unknownCount: number, totalQuestions: number) {
  const accuracy = Math.round((knownCount / totalQuestions) * 100);
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    const progress = getLocal<ProgressRow>(localProgressKey).filter(
      (row) => !(row.session_id === input.session_id && row.flashcard_id === input.flashcard_id)
    );
    saveLocal(localProgressKey, [...progress, { ...input, answered_at: new Date().toISOString() }]);
    updateLocalSession(input.session_id, { known_count: knownCount, unknown_count: unknownCount, accuracy });
    return;
  }

  await supabase.from("progress").upsert(input, { onConflict: "session_id,flashcard_id" });
  await supabase
    .from("sessions")
    .update({ known_count: knownCount, unknown_count: unknownCount, accuracy })
    .eq("id", input.session_id);
  await supabase.from("users").update({ last_seen: new Date().toISOString(), is_active: true }).eq("id", input.user_id);
}

export async function completeSession(sessionId: string, userId: string, knownCount: number, totalQuestions: number) {
  const supabase = getSupabaseBrowserClient();
  const accuracy = Math.round((knownCount / totalQuestions) * 100);
  const patch = {
    known_count: knownCount,
    unknown_count: totalQuestions - knownCount,
    accuracy,
    completed: true,
    completed_at: new Date().toISOString()
  };

  if (!supabase) {
    updateLocalSession(sessionId, patch);
    updateLocalUser(userId, { is_active: false, last_seen: new Date().toISOString() });
    return;
  }

  await supabase.from("sessions").update(patch).eq("id", sessionId);
  await supabase.from("users").update({ is_active: false, last_seen: new Date().toISOString() }).eq("id", userId);
}

export async function markUserInactive(userId: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    updateLocalUser(userId, { is_active: false, last_seen: new Date().toISOString() });
    return;
  }
  await supabase.from("users").update({ is_active: false, last_seen: new Date().toISOString() }).eq("id", userId);
}

export async function heartbeat(userId: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    updateLocalUser(userId, { is_active: true, last_seen: new Date().toISOString() });
    return;
  }
  await supabase.from("users").update({ is_active: true, last_seen: new Date().toISOString() }).eq("id", userId);
}

export async function getActiveUsers(): Promise<ArenaUser[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return getLocal<ArenaUser>(localUsersKey).filter((user) => user.is_active);

  const since = new Date(Date.now() - 90_000).toISOString();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("is_active", true)
    .gte("last_seen", since)
    .order("last_seen", { ascending: false });
  return (data || []) as ArenaUser[];
}

export async function getLeaderboard(): Promise<LeaderboardRow[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return getLocalLeaderboard();

  const { data } = await supabase
    .from("leaderboard")
    .select("*")
    .order("accuracy", { ascending: false })
    .order("known_count", { ascending: false })
    .limit(10);
  return (data || []) as LeaderboardRow[];
}

export async function getSessionResult(sessionId: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    const session = getLocal<ArenaSession>(localSessionsKey).find((item) => item.id === sessionId) || null;
    const user = session ? getLocal<ArenaUser>(localUsersKey).find((item) => item.id === session.user_id) || null : null;
    const leaderboard = getLocalLeaderboard();
    return { session, user, leaderboard };
  }

  const { data: session } = await supabase.from("sessions").select("*").eq("id", sessionId).single();
  const { data: user } = session
    ? await supabase.from("users").select("*").eq("id", session.user_id).single()
    : { data: null };
  const leaderboard = await getLeaderboard();
  return { session: session as ArenaSession | null, user: user as ArenaUser | null, leaderboard };
}

export function subscribeToArena(onChange: () => void) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    const timer = window.setInterval(onChange, 2_500);
    return () => window.clearInterval(timer);
  }

  const channel = supabase
    .channel("arena-realtime")
    .on("postgres_changes", { event: "*", schema: "public", table: "users" }, onChange)
    .on("postgres_changes", { event: "*", schema: "public", table: "sessions" }, onChange)
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}

function getLocal<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(key) || "[]") as T[];
}

function saveLocal<T>(key: string, rows: T[]) {
  localStorage.setItem(key, JSON.stringify(rows));
}

function updateLocalSession(sessionId: string, patch: Partial<ArenaSession>) {
  saveLocal(
    localSessionsKey,
    getLocal<ArenaSession>(localSessionsKey).map((session) =>
      session.id === sessionId ? { ...session, ...patch } : session
    )
  );
}

function updateLocalUser(userId: string, patch: Partial<ArenaUser>) {
  saveLocal(
    localUsersKey,
    getLocal<ArenaUser>(localUsersKey).map((user) => (user.id === userId ? { ...user, ...patch } : user))
  );
}

function getLocalLeaderboard(): LeaderboardRow[] {
  const users = getLocal<ArenaUser>(localUsersKey);
  return getLocal<ArenaSession>(localSessionsKey)
    .filter((session) => session.completed)
    .map((session) => ({
      user_id: session.user_id,
      name: users.find((user) => user.id === session.user_id)?.name || "Learner",
      accuracy: session.accuracy,
      known_count: session.known_count,
      total_questions: session.total_questions,
      completed_at: session.completed_at || null
    }))
    .sort((a, b) => b.accuracy - a.accuracy || b.known_count - a.known_count)
    .slice(0, 10);
}
