import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "var(--white)",
        black: "var(--black)",
        textcolor: "var(--textcolor)",
        lightorange: "var(--lightorange)",
        bordercolor: "var(--bordercolor)",
        gray: "var(--gray)",
        custompink: "var(--custompink)",
        customyellow: "var(--customyellow)",
        customskyblue: "var(--customskyblue)",
      },
      animation: {
        progress: "progress_ani 3s linear",
      },
      keyframes: {
        progress_ani: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
