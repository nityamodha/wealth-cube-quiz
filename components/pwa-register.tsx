"use client";

import { useEffect, useState } from "react";
import { getPendingSyncCount, syncOfflineQueue } from "@/lib/arena-store";

export function PwaRegister() {
  const [online, setOnline] = useState(true);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    setOnline(navigator.onLine);
    setPending(getPendingSyncCount());

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }

    async function updateOnline() {
      setOnline(navigator.onLine);
      if (navigator.onLine) {
        setPending(await syncOfflineQueue());
      } else {
        setPending(getPendingSyncCount());
      }
    }

    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    window.addEventListener("wealthcube-sync-queued", updateOnline);
    void updateOnline();

    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
      window.removeEventListener("wealthcube-sync-queued", updateOnline);
    };
  }, []);

  if (online && pending === 0) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md rounded-lg border border-slate-200 bg-white/95 px-4 py-3 text-center text-sm font-bold text-slate-700 shadow-arena backdrop-blur">
      {online ? `${pending} offline update${pending === 1 ? "" : "s"} waiting to sync.` : "Offline mode: flashcards keep working and progress will sync later."}
    </div>
  );
}
