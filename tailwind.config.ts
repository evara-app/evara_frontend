import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        homeBackground:
          "linear-gradient(91deg,rgba(67,181,226,.7),rgba(136,197,71,.5)), url('/assets/img/navbarBg.jpg')",
      },
      colors: {
        "green_blue": "#00bb7e",
        "aqua-green": "#0ede9b",
        "gray-default": "#4A4B4C",
        "white-two": "#f8f8f8",
      },
      fontFamily: {
        sans: ["var(--font-estedad)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
