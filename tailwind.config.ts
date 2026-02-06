import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coastal: {
          primary: "#89B6E4",
          navy: "#2A3D66",
          soft: "#DDE8F4",
          bg: "#F6F7FA",
          rose: "#C48497",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(42, 61, 102, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)",
        "soft-hover":
          "0 12px 32px -4px rgba(42, 61, 102, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
