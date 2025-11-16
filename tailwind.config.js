// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Habilitamos el modo oscuro
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Asegúrate de que esto siga apuntando a tus archivos
  ],
  theme: {
    extend: {
      // Fuentes personalizadas de tu proyecto
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
        cursive: ['"Dancing Script"', "cursive"],
        maven: ['"Maven Pro"', "sans-serif"],
      },

      // Keyframes para la animación 'fadeInUp'
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      // Animación
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
