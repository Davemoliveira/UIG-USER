const windmill = require('@windmill/react-ui/config')
module.exports = windmill({
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  darkMode: 'selector',
})


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    fontSize: {
      sm: '0.7rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    extend: {
      transitionDuration: {
        '2000': '2000ms',
        '4000': '4000ms',
      }
    },
  },
  plugins: [],
}
}