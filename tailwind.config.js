/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary color - same for both light and dark
        primary: '#F84733',

        // Light mode colors (default)
        background: '#F8F8F8',
        text: '#191A1B',
        'text-muted': '#4c5052',
        container: '#FCF6F0',
        contrast: '#F84733',
        'contrast-v2': '#FCF6F0',

        // Dark mode colors - use dark: prefix in components
        'bg-dark': '#191A1B',
        'text-dark': '#F6F6F6',
        'text-muted-dark': '#FCF5EF',
        'container-dark': '#3B3C3E',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        kangge: ['Kangge', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
