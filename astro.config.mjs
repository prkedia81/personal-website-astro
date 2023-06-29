import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelServerless from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import compress from "astro-compress";

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap(),
    prefetch({
      selector: "a[href^='/']",
      throttle: 5,
    }),
    compress(),
  ],
  experimental: {
    assets: true,
  },
  output: "hybrid",
  adapter: vercelServerless({
    imageService: true,
  }),
  site: "https://prannaykedia.com",
});
