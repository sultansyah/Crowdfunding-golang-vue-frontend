/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.vue', // Nuxt 3 menggunakan app.vue sebagai root
    './components/**/*.{vue,js,ts}', // Scan folder components
    './layouts/**/*.vue', // Scan folder layouts
    './pages/**/*.vue', // Scan folder pages
    './plugins/**/*.{js,ts}', // Scan folder plugins
    './nuxt.config.{js,ts}' // Scan file konfigurasi Nuxt
  ],
  theme: {
    extend: {
      boxShadow: {
        outline: "0 0 0 1px rgba(66, 153, 225, 0.5)",
      },
      colors: {
        "orange-button": "#FF872E",
        "green-button": "#1ABC9C",
        "purple-hover": "#4C52F8",
        "purple-hover-stroke": "#8286FF",
        "purple-progress": "#3B41E3",
      },
      borderRadius: {
        20: "20px",
      },
    }, // Tambahkan custom theme di sini jika diperlukan
  },
  fontFamily: {
    sans: ["Poppins", "sans-serif"],
  },
  plugins: [], // Tambahkan plugin Tailwind lainnya jika dibutuhkan
}
