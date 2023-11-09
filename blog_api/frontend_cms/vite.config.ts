import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
    modules: {
      generateScopedName: "[local]_[name]_[hash:base64:4]",
    },
  },
});
