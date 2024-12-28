import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { getAllBlogs } from "./services/notion";
import type { BlogPost } from "@prkedia81/notion-blogs";

interface BlogPostWithId extends BlogPost {
  id: string;
}

// 3. Define your collection(s)
const blogs = defineCollection({
  loader: async () => {
    const blogs = await getAllBlogs();
    return blogs.map((blog) => ({ id: blog.slug, ...blog }));
  },
  schema: z.custom<BlogPost>(),
});

const dogs = defineCollection({
  /* ... */
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { blogs, dogs };
