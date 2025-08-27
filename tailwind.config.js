/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        menu: "var(--bg-app)",
        dark: "var(--bg-app)",
        "primary-brand": "var(--primary-brand)",
        "ft-primary": "var(--ft-primary)",
        "gray-primary": "var(--gray-primary)",
        "gray-secondary": "var(--gray-secondary)",
      },
    },
  },
  plugins: [],
  important: true,
};
