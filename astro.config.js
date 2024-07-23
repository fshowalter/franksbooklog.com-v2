import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

function contentHmr() {
  return {
    name: "content-hmr",
    enforce: "post",
    // HMR
    handleHotUpdate({ file, server }) {
      console.log(file);
      if (file.includes("/content/")) {
        console.log("reloading content file...");
        server.ws.send({
          type: "full-reload",
          path: "*",
        });
      }
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: "http://www.franksmovielog.com",
  trailingSlash: "always",
  vite: {
    optimizeDeps: {
      exclude: ["fsevents"],
    },
    plugins: [contentHmr()],
  },
  integrations: [
    react(),
    tailwind({
      // Example: Disable injecting a basic `base.css` import on every page.
      // Useful if you need to define and/or import your own custom `base.css`.
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});
