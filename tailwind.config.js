/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",    // Slate 900
        secondary: "#6366f1",  // Indigo 500
        accent: "#f43f5e",     // Rose 500
        success: "#10b981",    // Emerald 500
        warning: "#f59e0b",    // Amber 500
        danger: "#ef4444",     // Red 500
        light: "#f8fafc",      // Slate 50
        dark: "#020617",       // Slate 950
        border: "#e2e8f0",     // Slate 200
      },
    },
  },
  plugins: [],
};