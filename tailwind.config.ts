import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17202A",
        cube: "#2557A7",
        mint: "#16735B",
        amber: "#B7791F"
      },
      boxShadow: {
        arena: "0 24px 80px rgba(23, 32, 42, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
