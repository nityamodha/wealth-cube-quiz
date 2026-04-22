import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wealthcube Learning Arena",
  description: "Mutual fund flashcard training arena with real-time leaderboard"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
