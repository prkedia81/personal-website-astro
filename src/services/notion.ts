import { NotionBlog } from "@prkedia81/notion-blogs";
import { NOTION_BLOG_ID, NOTION_KEY } from "astro:env/server";

const notionClient = new NotionBlog({
  notionKey: NOTION_KEY,
  blogDatabaseId: NOTION_BLOG_ID,
});

export async function getAllBlogs() {
  return await notionClient.getAllPosts();
}

export async function getBlogById(postId: string) {
  return await notionClient.getBlogById(postId);
}
