module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#E9F0FF',
        'regal-black':'#393939' ,
        'regal-wew':'#5E5F61' ,
        'regal-dark':"#146AFF"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}