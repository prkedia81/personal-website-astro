import React, { useState, useMemo } from "react";
import type { CollectionEntry } from "astro:content";

interface AllBlogsProps {
  posts: CollectionEntry<"blogs">[];
  tags: CollectionEntry<"tags">[];
}

const AllBlogs: React.FC<AllBlogsProps> = ({ posts, tags }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter posts based on selected tag
  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;

    // Find the selected tag name from the tags array
    const selectedTagData = tags.find((tag) => tag.id === selectedTag);
    const selectedTagName = selectedTagData?.data.name;

    return posts.filter((post) => {
      const postTags = post.data.tags;
      if (!postTags || !Array.isArray(postTags) || postTags.length === 0)
        return false;

      // Check if any of the post's tags match the selected tag name
      return postTags.some((tag) => tag.name === selectedTagName);
    });
  }, [posts, selectedTag, tags]);

  const handleTagClick = (tagId: string | null) => {
    setSelectedTag(tagId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString || "1/1/2023").toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  const truncateString = (str: string, num: number): string => {
    if (str.length <= num) {
      return str;
    } else {
      return str.substring(0, num) + "...";
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Tag Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 lg:px-24 md:px-16 px-6 mb-8 md:mb-12 mt-4">
        <button
          onClick={() => handleTagClick(null)}
          className={`px-3 py-1 rounded-md text-xs font-normal transition-colors duration-150 ${
            selectedTag === null
              ? "text-indigo-600 bg-indigo-50"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          }`}>
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.id)}
            className={`px-3 py-1 rounded-md text-xs font-normal transition-colors duration-150 ${
              selectedTag === tag.id
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}>
            {tag.data.name}
          </button>
        ))}
      </div>

      {/* Latest Blog Post */}
      {filteredPosts.length > 0 && (
        <section id="latest-blog">
          <a
            href={"/blog/" + filteredPosts[0].data.slug + "/"}
            className="flex flex-col md:flex-row items-center lg:px-24 md:px-16 px-6 gap-3 md:gap-12">
            {filteredPosts[0].data.coverImage && (
              <img
                src={filteredPosts[0].data.coverImage[0]}
                alt={filteredPosts[0].data.title || "Blog Post"}
                className="rounded-xl aspect-video h-auto md:w-1/2 hover:shadow-xl transition-shadow duration-200"
                loading="lazy"
              />
            )}
            <div className="md:w-1/2 flex flex-col text-center md:text-start gap-2 md:gap-6">
              <p className="text-gray-500 text-xs font-normal md:font-medium md:text-sm">
                {formatDate(
                  filteredPosts[0].data.publishedDate ||
                    filteredPosts[0].data.createdDate ||
                    "1/1/2023"
                )}
              </p>
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
                {filteredPosts[0].data.title}
              </h1>
              <p className="font-light text-xs text-clip overflow-hidden max-h-24 md:max-h-fit md:text-base">
                {filteredPosts[0].data.seoDescription || ""}
              </p>
            </div>
          </a>
        </section>
      )}

      {/* Blog Grid */}
      <section
        id="blogs"
        className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 gap-x-10 gap-y-12 md:gap-y-16 lg:px-24 md:px-16 px-6 mt-12 md:mt-16 justify-start">
        {filteredPosts.slice(1).map((post) => (
          <a
            key={post.data.ID}
            href={"/blog/" + post.data.slug + "/"}
            className="flex flex-col gap-4 group">
            {post.data.coverImage && (
              <img
                src={post.data.coverImage[0]}
                alt={post.data.title || "Blog Post"}
                className="h-auto w-76 rounded-xl card hover:shadow-xl transition-shadow duration-200"
                loading="lazy"
              />
            )}
            <div className="pl-1 text-center md:text-start">
              <p className="text-gray-500 font-normal md:font-medium text-xs">
                {formatDate(
                  post.data.publishedDate || post.data.createdDate || "1/1/2023"
                )}
              </p>
              <h1 className="text-xl font-bold pt-2 group-hover:text-gray-600 transition-colors duration-200">
                {truncateString(post.data.title || "", 50)}
              </h1>
              <p className="font-light text-xs pt-1">
                {truncateString(post.data.seoDescription || "", 150)}
              </p>
            </div>
          </a>
        ))}
      </section>

      {/* Empty State for Filtered Results */}
      {filteredPosts.length === 0 && selectedTag && (
        <div className="text-center py-12 lg:px-24 md:px-16 px-6">
          <p className="text-gray-500 text-lg">
            No blog posts found for the selected tag.
          </p>
          <button
            onClick={() => handleTagClick(null)}
            className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
            Show All Posts
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
