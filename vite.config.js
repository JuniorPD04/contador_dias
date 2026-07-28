import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Permite abrir el servidor de desarrollo desde el celular en la misma red
    // (útil para probar el "Agregar a inicio" en un iPhone real antes de desplegar)
    host: true,
  },
});
