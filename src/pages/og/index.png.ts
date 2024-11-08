import { readFile } from "node:fs/promises";
import type { APIRoute } from "astro";
import { satoriAstro } from "x-satori/astro"
import { Resvg } from "@resvg/resvg-js";
import loadGoogleFonts, { type FontOptions } from "@utils/loadGoogleFont";
import { SITE } from "@config";

async function getPostImageBuffer() {
    const template = await readFile('src/layouts/DefaultOgTemplate.astro', 'utf-8');
    const config = {
        height: 630,
        width: 1200,
        embedFont: true,
        fonts: (await loadGoogleFonts(SITE.title + SITE.desc)) as FontOptions[],
        props: {
            title: SITE.title,
            desc: SITE.desc
        }
    }

    const svg = await satoriAstro(config, template);
    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    return pngBuffer;
}

export const GET: APIRoute = async () => new Response(
    await getPostImageBuffer(),
    {
        headers: { "Content-Type": "image/png" },
    }
)