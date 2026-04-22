import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { flashcards } from "../lib/flashcards";

loadEnvFile(".env.local");
loadEnvFile(".env");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running npm run seed.");
}

const supabase = createClient(url, serviceKey, {
  auth: {
    persistSession: false
  }
});

async function main() {
  const { error } = await supabase.from("flashcards").upsert(flashcards, { onConflict: "id" });
  if (error) throw error;
  console.log(`Seeded ${flashcards.length} flashcards.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

function loadEnvFile(fileName: string) {
  const path = resolve(process.cwd(), fileName);
  if (!existsSync(path)) return;

  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;

    const [key, ...valueParts] = trimmed.split("=");
    if (process.env[key]) continue;

    const rawValue = valueParts.join("=");
    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}
