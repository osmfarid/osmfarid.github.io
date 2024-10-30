import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    data.pubDatetime && Date.now() > new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;

  return (
    (import.meta.env.PROD
      ? data.draft !== true && data.pubDatetime !== null
      : true) &&
    (import.meta.env.DEV || isPublishTimePassed)
  );
};

export default postFilter;