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
        rotate_image: "rotate_image 20s linear infinite",
      },
      keyframes: {
        progress_ani: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        rotate_image: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
