import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }), tailwindcss([
      {
        color: {
          proPurple: "#7c5cc4",
          proLightPurple: "#8d5ccd",
          proOrange: "#ff8952",
          proGray: "#858c85",
          proGreen: "#00c689",
          proBlue: "#297ff9",
          proBtnPacificBlue: "#17a2b8",
          proBtnYellow: "#ffc107",
        },
      },
    ]),
  ],
});
