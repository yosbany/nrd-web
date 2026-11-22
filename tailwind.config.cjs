module.exports = {
  content: ['./index.html', './app.js', './views/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Arial', 'sans-serif'],
        display: ['Montserrat', 'Arial', 'sans-serif']
      },
      colors: {
        brand: {
          DEFAULT: '#c4006b',
          dark: '#a9005c',
          light: '#fce8f1'
        },
        red: {
          50: '#fff8ed', 100: '#fce8f1', 200: '#f5c9dc', 300: '#ee9fc2',
          400: '#e276a8', 500: '#d64c90', 600: '#c4006b', 700: '#a9005c',
          800: '#790042', 900: '#4a2818'
        },
        neutral: {
          50: '#fff8ed', 100: '#fcf3e9', 200: '#e6d9c9', 300: '#d8c6b3',
          400: '#a8927e', 500: '#8c7565', 600: '#725b4e', 700: '#594334',
          800: '#4a2818', 900: '#4a2818'
        },
        gray: {
          50: '#fff8ed', 100: '#fcf3e9', 200: '#e6d9c9', 300: '#d8c6b3',
          400: '#a8927e', 500: '#8c7565', 600: '#725b4e', 700: '#594334',
          800: '#4a2818', 900: '#4a2818'
        }
      }
    }
  },
  plugins: []
};
