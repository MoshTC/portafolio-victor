/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        card: '#171717',
        accent: '#EF4444',
        accentHover: '#DC2626'
      }
    },
  },
  plugins: [],
}
