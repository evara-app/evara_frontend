import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        homeBackground:
          "linear-gradient(91deg,rgba(67,181,226,.5),rgba(136,197,71,.3)),linear-gradient(359deg,rgba(0,0,0,.5),rgba(0,0,0,.7)), url('/assets/img/navbarBg.jpg')",
      },
      colors: {
        "green-blue": "#00bb7e",
        "aqua-green": "#0ede9b",
        "gray-default": "#4A4B4C",
        "white-two": "#a5a5a5",
        "cyan-default": "#06b6d4",
        "--cyan-green": "#03B9A2",
      },
      fontFamily: {
        sans: ["var(--font-estedad)", ...fontFamily.sans],
      },
      boxShadow: {
        SearchPanelButton: "3px -3px 6px 0px rgba(0,0,0,0.28)",
        greenShaow: "0 15px 50px -15px rgba(0,187,125,0.5)",
        "input-focus": "0 12px 24px -8px rgb(var(--green-blue))",
        shadowBox:
          "0px 2px 4px 4px rgba(230,231,233,1),0px 1px 4px 0px rgba(0,0,0,0.11)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
    require("@tailwindcss/aspect-ratio"),
  ],
};
export default config;
