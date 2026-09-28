import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuration Vite.
// `base: "/"` car le site sera publié sur le dépôt "utilisateur"
// mouadmouji77-source.github.io, donc servi à la racine du domaine.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
