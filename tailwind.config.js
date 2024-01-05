/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        border: 'border 4s ease infinite',
      },
      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      spacing: {
        '128': '32rem',
        '9/10': '90%'
      },
      colors: {
        mainBG: '#EEF1FF',
        pastelRed: '#B81B4D',
        pastelOrange: '#FF6721',
        myBlue: '#694CD4'
      },
    },
  },
  plugins: [
    require('tailwindcss-patterns')
  ],
}