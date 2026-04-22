import { Suspense } from "react";
import { ResultClient } from "./result-client";

export default function ResultPage() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center font-bold text-ink">Loading result...</main>}>
      <ResultClient />
    </Suspense>
  );
}
