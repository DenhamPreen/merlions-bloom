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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#03193D",
        secondary: "#5C8089"
        // primary: "#58637D"
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0)' },
          '100%': { transform: 'rotateX(360deg)' },
        },
        heads: {
          '0%': { transform: 'rotateX(0)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        tails: {
          '0%': { transform: 'rotateX(0)' },
          '100%': { transform: 'rotateX(180deg)' },
        },
      },
      animation: {
        flip: 'flip 1s ease-in-out forwards',
        heads: 'heads 0.5s ease-in-out forwards',
        tails: 'tails 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
