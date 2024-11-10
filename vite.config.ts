import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import EnvironmentPlugin from "vite-plugin-environment";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), EnvironmentPlugin("all")],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: process.env.BASE_URL || "/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:12150/choose-admin", // 后端服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
