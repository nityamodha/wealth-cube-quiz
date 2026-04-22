create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 40),
  is_active boolean not null default true,
  last_seen timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  total_questions integer not null default 100,
  known_count integer not null default 0,
  unknown_count integer not null default 0,
  accuracy integer not null default 0,
  completed boolean not null default false,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.flashcards (
  id text primary key,
  question text not null,
  answer text not null,
  concept text not null,
  difficulty text not null check (difficulty in ('Easy', 'Medium', 'Hard')),
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  flashcard_id text not null references public.flashcards(id) on delete cascade,
  known boolean not null,
  answered_at timestamptz not null default now(),
  unique (session_id, flashcard_id)
);

create or replace view public.leaderboard as
select distinct on (s.user_id)
  s.user_id,
  u.name,
  s.accuracy,
  s.known_count,
  s.total_questions,
  s.completed_at
from public.sessions s
join public.users u on u.id = s.user_id
where s.completed = true
order by s.user_id, s.accuracy desc, s.known_count desc, s.completed_at asc;

alter table public.users enable row level security;
alter table public.sessions enable row level security;
alter table public.flashcards enable row level security;
alter table public.progress enable row level security;

drop policy if exists "demo users read" on public.users;
drop policy if exists "demo users write" on public.users;
drop policy if exists "demo sessions read" on public.sessions;
drop policy if exists "demo sessions write" on public.sessions;
drop policy if exists "demo flashcards read" on public.flashcards;
drop policy if exists "demo progress read" on public.progress;
drop policy if exists "demo progress write" on public.progress;

create policy "demo users read" on public.users for select using (true);
create policy "demo users write" on public.users for all using (true) with check (true);
create policy "demo sessions read" on public.sessions for select using (true);
create policy "demo sessions write" on public.sessions for all using (true) with check (true);
create policy "demo flashcards read" on public.flashcards for select using (true);
create policy "demo progress read" on public.progress for select using (true);
create policy "demo progress write" on public.progress for all using (true) with check (true);

alter table public.users replica identity full;
alter table public.sessions replica identity full;
alter table public.progress replica identity full;

do $$
begin
  begin
    alter publication supabase_realtime add table public.users;
  exception when duplicate_object then null;
  end;

  begin
    alter publication supabase_realtime add table public.sessions;
  exception when duplicate_object then null;
  end;
end $$;
