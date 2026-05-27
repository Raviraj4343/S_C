module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0E7490",
        accent: "#F59E0B",
        ink: "#0F172A"
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        display: ["Manrope", "sans-serif"]
      },
      boxShadow: {
        premium: "0 24px 60px -18px rgba(2, 6, 23, 0.28)"
      }
    }
  },
  plugins: []
};
