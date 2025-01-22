const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#01627F',
        brown: '#9F6243',
        bgColor: '#ede8e1',
        second_bg_color: '#e3e1d5',
        primaryGreen: '#2f432b',
                
        tealBlue: '#01627F',
        brownSugar: '#9F6243',
        ivory: '#ede8e1',
        darkOlive: '#2f432b',
        crimsonRed: '#780c17',
      },
      fontFamily: {
        greatVibes: ['Great Vibes', 'cursive'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(),
  ],
}

