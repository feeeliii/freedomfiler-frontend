/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          'ranchers': ['Ranchers', 'cursive'],
          'inter': ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
