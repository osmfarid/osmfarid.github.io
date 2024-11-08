import { readFile } from "node:fs/promises";
import type { APIRoute } from "astro";
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { slugifyStr } from "@utils/slugify";
import { satoriAstro } from "x-satori/astro"
import { Resvg } from "@resvg/resvg-js";
import loadGoogleFonts, { type FontOptions } from "@utils/loadGoogleFont";

export async function getStaticPaths() {
    const posts = await getCollection("blog").then(p =>
      p.filter(({ data }) => (import.meta.env.PROD
        ? data.draft !== true && data.pubDatetime !== null
        : true) && !data.ogImage)
    );
  
    return posts.map(post => ({
      params: { slug: slugifyStr(post.data.title) },
      props: post,
    }));
  }

async function getPostImageBuffer(props: CollectionEntry<"blog">) {
    const template = await readFile('src/layouts/OgSlugTemplate.astro', 'utf-8');
    const config = {
        height: 630,
        width: 1200,
        embedFont: true,
        fonts: (await loadGoogleFonts(props.data.title + 'by '+props.data.author)) as FontOptions[],
        props: {
            title: props.data.title,
            author: 'by ' + props.data.author,
        },
    }

    const svg = await satoriAstro(config, template);
    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    return pngBuffer;
}

export const GET: APIRoute = async ({ props }) => new Response(
    await getPostImageBuffer(props as CollectionEntry<"blog">),
    {
        headers: { "Content-Type": "image/png" },
    }
)