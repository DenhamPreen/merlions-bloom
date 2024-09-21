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
      rotate: {
        'y-180': '180deg',
      },
      keyframes: {
        spinhorizon: {          
          '100%': { transform: 'rotateX(360deg)' },
        },
      },
      animation: {
        spinhorizon: 'spinhorizon 2s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
