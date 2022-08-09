import { fileURLToPath, URL } from "node:url";
import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";

// https://vitejs.dev/config/
export default defineConfig({
  // base: process.env.NODE_ENV === "production" ? "/dashboard-skoll/" : "",
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, "./src/assets/i18n/locales/**"),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
