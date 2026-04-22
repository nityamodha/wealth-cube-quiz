export type Difficulty = "Easy" | "Medium" | "Hard";

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  concept: string;
  difficulty: Difficulty;
  tags: string[];
};

export type ArenaUser = {
  id: string;
  name: string;
  is_active: boolean;
  last_seen: string;
  created_at?: string;
};

export type ArenaSession = {
  id: string;
  user_id: string;
  total_questions: number;
  known_count: number;
  unknown_count: number;
  accuracy: number;
  completed: boolean;
  started_at?: string;
  completed_at?: string | null;
};

export type ProgressRow = {
  id?: string;
  session_id: string;
  user_id: string;
  flashcard_id: string;
  known: boolean;
  answered_at?: string;
};

export type LeaderboardRow = {
  user_id: string;
  name: string;
  accuracy: number;
  known_count: number;
  total_questions: number;
  completed_at: string | null;
};
