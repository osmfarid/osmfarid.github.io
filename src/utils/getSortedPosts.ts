import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(postFilter)
    .sort((a, b) => {
      const dateA = new Date(a.data.modDatetime ?? a.data.pubDatetime ?? 0).getTime();
      const dateB = new Date(b.data.modDatetime ?? b.data.pubDatetime ?? 0).getTime();

      return Math.floor(dateB / 1000) - Math.floor(dateA / 1000);
    });
};

export default getSortedPosts;