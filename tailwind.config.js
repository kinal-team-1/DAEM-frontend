/** @type {import('tailwindcss').Config} */
import { default as defaultColors } from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    colors: {
      vulcan: {
        500: "#647093",
        600: "#505a79",
        700: "#414963",
        800: "#393f53",
        900: "#333847",
        950: "#1b1d26",
      },
      charade: {
        600: "#545c75",
        700: "#484b5a",
        // '700': '#454b5f',
        800: "#3b3f51",
        900: "#353845",
        950: "#262832",
      },
      primary: {
        300: "#fcb275",
        400: "#fa863d",
        500: "#f8671a",
      },
      "guardsman-red": {
        600: "#f60c0c",
        700: "#c60505",
        800: "#ab0909",
      },
      "forest-green": {
        600: "#10ba00",
        700: "#0f9404",
        800: "#107209",
      },
      "tree-poppy": {
        400: "#ffbd1b",
        500: "#ff9900",
        600: "#e27200",
      },
      silver: {
        200: "#e3e2e2",
        300: "#d1d0d0",
        400: "#c1c0c0",
        500: "#aba9a9",
      },
      red: defaultColors.red,
      green: defaultColors.green,
      gray: defaultColors.gray,
      black: defaultColors.black,
      white: defaultColors.white,
    },
    extend: {},
  },
  plugins: [],
};
