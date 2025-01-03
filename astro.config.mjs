// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import vercel from "@astrojs/vercel";
import compress from "astro-compress";

import preload from "astro-preload";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      NODE_ENV: envField.string({ context: "server", access: "public" }),
      SMTP_USER: envField.string({ context: "server", access: "public" }),
      SMTP_PASSWORD: envField.string({ context: "server", access: "secret" }),
      NOTION_KEY: envField.string({ context: "server", access: "secret" }),
      NOTION_BLOG_ID: envField.string({ context: "server", access: "public" }),
      GOOGLE_SHEET_ID: envField.string({ context: "server", access: "public" }),
      GOOGLE_PROJECT_ID: envField.string({
        context: "server",
        access: "public",
      }),
      GOOGLE_SERVICE_ACCOUNT_EMAIL: envField.string({
        context: "server",
        access: "public",
      }),
      GOOGLE_PRIVATE_KEY_ID: envField.string({
        context: "server",
        access: "secret",
      }),
      GOOGLE_PRIVATE_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      GHOST_API_KEY: envField.string({ context: "server", access: "secret" }),
    },
  },
  integrations: [
    preload(),
    tailwind(),
    sitemap(),
    prefetch({
      selector: "a[href^='/']",
    }),
    react({ experimentalReactChildren: true }),
    partytown({ config: { forward: ["dataLayer.push"] } }),
    compress(),
  ],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  site: "https://prannaykedia.com",
});
