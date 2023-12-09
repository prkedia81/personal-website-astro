import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import vercel from "@astrojs/vercel/serverless";
// import image from "@astrojs/image";

// import vercel from "@astrojs/vercel/static";
import compress from "astro-compress";
// import node from "@astrojs/node";
// node({
//   mode: "standalone",
// })

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap(),
    prefetch({
      selector: "a[href^='/']",
    }),
    react({ experimentalReactChildren: true }),
    partytown(),
    compress(),
  ],
  output: "server",
  adapter: vercel({
    functionPerRoute: false,
    speedInsights: {
      enabled: true,
    },
    webAnalytics: {
      enabled: true,
    },
  }),
  experimental: {
    contentCollectionCache: true,
  },
  site: "https://prannaykedia.com",
});
