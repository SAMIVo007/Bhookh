/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./App.jsx', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        backgroungColor: '#F6F6F7',
        foregroundColor: '#ffffff',
        primaryColor: '#FF640D',
        titleColor: '#2F2E41',
      },
      fontFamily: {
        Pregular: ['ProximaNova-Regular', 'sans-serif'],
        Pthin: ['ProximaNova-Thin', 'sans-serif'],
        Plight: ['ProximaNova-Light', 'sans-serif'],
        Psemibold: ['ProximaNova-Semibold', 'sans-serif'],
        Pbold: ['ProximaNova-Bold', 'sans-serif'],
        Pextrabold: ['ProximaNova-Extrabold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
