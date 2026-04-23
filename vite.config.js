import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const preloadCssPlugin = () => ({
  name: "preload-built-css",
  enforce: "post",
  transformIndexHtml(html) {
    return html.replace(
      /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
      `<link rel="preload" crossorigin href="$1" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" crossorigin href="$1"></noscript>`,
    );
  },
});

export default defineConfig({
  plugins: [react(), preloadCssPlugin()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
