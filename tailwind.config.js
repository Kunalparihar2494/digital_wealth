/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1c5894",
        secondary: "#449d00",
        "light-blue": "#e3f2fd",
        "light-gray": "#f8f9fa",
        "text-muted": "#6c757d",
        "border-color": "#dee2e6",
        "card-bg": "#ffffff",
        "warning-color": "#ffc107",
        "danger-color": "#dc3545",
        "info-color": "#3b82f6",
        "light-bg": "#f4f7fb",
        "text-dark": "#1e293b",
      },
    },
  },
  plugins: [],
};
