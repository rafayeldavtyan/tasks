const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    screens: {
      '2xsm': '375px',
      xsm: '425px',
      '3xl': '2000px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        current: 'currentColor',
        transparent: 'transparent',
        white: '#FFFFFF',
        black: {
          ...colors.black,
          DEFAULT: '#232323',
          2: '#010101',
        },
        body: '#64748B',
        primary: '#8BA3CB',
        secondary: '#80CAEE',
        third: '#343C6A',
        stroke: '#E6EFF5',
        gray: {
          ...colors.gray,
          DEFAULT: '#F5F7FA',
          2: '#F7F9FC',
          3: '#FAFAFA',
        },
        whiten: '#F1F5F9',
        whiter: '#F5F7FD',
        success: '#41D4A8',
        danger: '#FF4B4A',
      },
      fontSize: {
        'title-xl': ['36px', '45px'],
        'title-lg': ['28px', '35px'],
        'title-md': ['24px', '30px'],
        'title-sm': ['20px', '26px'],
        15: "15px",
        22: "22px"
      },
      maxWidth: {
        3: '0.75rem',
        4: '1rem',
        15: '3.75rem',
        30: '7.5rem',
        40: '10rem',
        70: '17.5rem',
        90: '22.5rem',
      },
      maxHeight: {
        35: '8.75rem',
        70: '17.5rem',
        90: '22.5rem',
      },
      minWidth: {
        22.5: '5.625rem',
        42.5: '10.625rem',
        47.5: '11.875rem',
        75: '18.75rem',
      },
      zIndex: {
        999: '999',
        99: '99',
        1: '1',
      },
      borderRadius: {
        4: "4px",
        8: "8px",
      },
      boxShadow: {
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
        1: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
