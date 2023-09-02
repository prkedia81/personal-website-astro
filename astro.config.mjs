import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
// import vercelServerless from "@astrojs/vercel/serverless";
// import image from "@astrojs/image";

import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap(),
    prefetch({
      selector: "a[href^='/']",
    }),
    react(),
    partytown(),
  ],
  output: "static",
  adapter: vercel(),
  site: "https://prannaykedia.com",
});
