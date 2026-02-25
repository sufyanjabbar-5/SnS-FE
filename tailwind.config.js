/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'segoe': ['Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'navy': '#000d37',
        'teal-dark': '#005873',
        'teal': '#004d65',
        'blue-green': '#3b7a9e',
        'blue-accent': '#266f99',
        'purple': '#6a46a3',
        'purple-dark': '#3f1287',
        'purple-accent': '#6b46c1',
        'orange': '#ff6d30',
        'orange-light': '#ff9966',
        'foundation': {
          'blueb100': 'rgba(107, 180, 203, 1)',
          'orangeo300': 'rgba(255, 109, 48, 1)',
        },
        'gray': {
          'light': '#afafaf',
          'lighter': '#f3f3f3',
        },
      },
    },
  },
  plugins: [],
}

