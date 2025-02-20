/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        scheherazade: ['"Scheherazade New"', "serif"], // Add the custom font
      },
      fontWeight: {
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
  },
  plugins: [],
};
