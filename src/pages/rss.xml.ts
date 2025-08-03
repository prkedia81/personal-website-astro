import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: any) {
  const blog = await getCollection("blogs");

  return rss({
    title: "Prannay Kedia's Blog",
    description: "A blog about my experiences and learnings",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishedDate ?? ""),
      description: post.data.seoDescription,
      link: `/blog/${post.data.slug}`,
      customData: post.data.coverImage?.[0]
        ? `
        <enclosure url="${post.data.coverImage[0]}" type="image/jpeg" />
        <img src="${post.data.coverImage[0]}" alt="${post.data.title} cover" />
      `
        : "",
    })),
  });
}
