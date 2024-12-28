import { defineCollection, z } from "astro:content";
import { getAllBlogs } from "./services/notion";
import type { BlogPost } from "@prkedia81/notion-blogs";
import { file, glob } from "astro/loaders";

const blogs = defineCollection({
  loader: async () => {
    const blogs = await getAllBlogs();
    return blogs.map((blog) => ({ id: blog.ID.toString(), ...blog }));
  },
  schema: z.custom<BlogPost>(),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z.string(),
    linkUrl: z.string().optional(),
    bannerImg: z.string(),
    cardImage: z.string(),
    order: z.number().optional(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "about.md", base: "./src/content" }),
  schema: z.object({
    title: z.string(),
    shortBio: z.string(),
    longBio: z.string(),
    shortAbout: z.string(),
  }),
});

const resume = defineCollection({
  loader: file("./src/content/resume.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    time: z.string(),
    description: z.string(),
  }),
});

const films = defineCollection({
  loader: file("./src/content/films.json"),
  schema: z.object({
    id: z.string(),
    youtubeLink: z.string().url(),
    title: z.string(),
    about: z.string(),
  }),
});

export const collections = { blogs, projects, resume, films, about };
