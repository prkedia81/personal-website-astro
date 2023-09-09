import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
// import vercelServerless from "@astrojs/vercel/serverless";
// import image from "@astrojs/image";

import vercel from "@astrojs/vercel/static";
import compress from "astro-compress";

import cloudflare from "@astrojs/cloudflare";

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
    compress(),
  ],
  output: "server",
  adapter: cloudflare(),
  site: "https://prannaykedia.com",
});
