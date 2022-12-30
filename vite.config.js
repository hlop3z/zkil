// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      name: "MyLib",
      entry: resolve(__dirname, "src/app.js"),
      fileName: "lib",
    },
  },
});
