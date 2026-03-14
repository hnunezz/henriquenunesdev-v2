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
        "primary-brand-soft": "var(--primary-brand-soft)",
        "ft-primary": "var(--ft-primary)",
        "gray-primary": "var(--gray-primary)",
        "gray-secondary": "var(--gray-secondary)",
        "surface": "var(--bg-surface)",
        "surface-hover": "var(--bg-surface-hover)",
      },
      boxShadow: {
        "card": "var(--shadow-card)",
        "elevated": "var(--shadow-elevated)",
      },
      backdropBlur: {
        "glass": "16px",
      },
    },
  },
  plugins: [],
  important: true,
};
