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
      fontFamily: {
        righteous: "Righteous, sans-serif",
        poppins: "Poppins, sans-serif",
        casteRock: "castle-rock, sans-serif"
      },
      fontSize: {
        '8xl': '4rem',
        '10xl': '5rem',
        '11xl': '5.5rem',
        '12xl': '6rem',
        '14xl': '7rem',
        '20xl': '10rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-patterns')
  ],
}