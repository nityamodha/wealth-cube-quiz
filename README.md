# Wealthcube Learning Arena

A full-stack mutual fund flashcard arena built with Next.js, Tailwind CSS and Supabase.

## Features

- Name-only lobby, no authentication
- Real-time active user list through Supabase Realtime
- Leaderboard sorted by accuracy and known count
- 100 India-specific mutual fund flashcards
- Flip-card study flow with Known / Unknown marking
- Session progress, score, accuracy and result rank
- Local fallback mode when Supabase env vars are not configured

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add Supabase values in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

4. Run `supabase/schema.sql` in the Supabase SQL editor.

5. Seed flashcards:

```bash
npm run seed
```

6. Start the app:

```bash
npm run dev
```

Open http://localhost:3000.

## Supabase Tables

- `users`: learner profile and active status
- `sessions`: score, accuracy and completion state
- `progress`: per-card Known / Unknown answers
- `flashcards`: 100-card training deck
- `leaderboard`: view of each user's best completed session

The demo policies in `supabase/schema.sql` allow anonymous reads/writes for a no-auth training arena. Tighten RLS before using this in a production environment.
