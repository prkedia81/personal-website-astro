import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelServerless from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import compress from "astro-compress";
import react from "@astrojs/react";
// import image from "@astrojs/image";
import partytown from "@astrojs/partytown";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap(),
    prefetch({
      selector: "a[href^='/']",
      throttle: 5,
    }),
    react(),
    compress(),
    partytown(),
  ],
  output: "server",
  adapter: vercelServerless(),
  site: "https://prannaykedia.com",
});
