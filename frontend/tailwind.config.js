/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#181818",
        card: "#212121",
        textPrimary: "#ffffff",
        textSecondary: "#aaaaaa",
        accentRed: "#e11d1d",
        accentBlue: "#1b5dae",
        hover: "#333333",
        border: "#3e3e3e",
      },
    },
  },
  plugins: [],
}

