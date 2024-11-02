import satori from "satori";
import type { CollectionEntry } from "astro:content";
import { SITE } from "@config";
import loadGoogleFonts, { type FontOptions } from "../loadGoogleFont";

export default async (post: CollectionEntry<"blog">) => {
  return satori(
    <div style={{
      width: "100%",
      height: "100%",
      background: 'linear-gradient(227.9deg, rgb(135, 5, 124) 5%, rgb(68, 0, 81) 79%)',
      padding: '48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <div
        style={{
          color: '#fff',
          fontSize: '96px',
          textAlign: 'left',
        }}
      >
        {post.data.title}
      </div>
      <span
        style={{
          color: 'rgb(249, 179, 208)',
          fontSize: '56px',
          justifyContent: "flex-end"
        }}
      >
        by&nbsp;<span style={{ overflow: "hidden", fontWeight: "bold" }}>{post.data.author}</span>
      </span>
      <div
        style={{
          position: 'absolute',
          width: '659.46px',
          height: '734px',
          left: '-138px',
          top: '-39px',
          opacity: 0.1,
          display: "flex"
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="659.5" height="734" fill="none" viewBox="0 0 660 734">
          <defs>
            <linearGradient id="a" x1="329.7" x2="329.7" y1="0" y2="734" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E90464" />
              <stop offset="1" stopColor="#F736E3" />
            </linearGradient>
          </defs>
          <path
            fill="url(#a)"
            fillRule="evenodd"
            d="M330 0h-1v1L0 153l26 409 304 172 303-172 26-409L330 0Zm207 354c14 7 16 20 7 37s-21 21-35 14L210 240c-6-4-11-9-14-16l-1-1q-4-10 4-25l81-147q3-5 8-7 8-5 23 3c15 7 19 17 13 28l-68 123 281 156Zm-99-199a40 40 0 0 1 20 25c1 4 2 10 1 15s-2 11-5 16c-6 10-14 16-24 19-11 3-21 2-32-4-10-5-16-13-19-24s-2-21 3-31c3-5 7-9 11-12 4-4 9-6 14-7 5-2 10-3 16-2 5 0 10 2 15 5ZM197 399c4-7 9-14 17-20q11-10 25-17v1c9-5 20-7 31-6s22 5 33 11l123 68c24 13 37 30 39 52 3 21 0 39-8 55l-39 69a82 82 0 0 1-41 37c-20 9-42 7-65-6l-123-68q-17-9-27-22c-7-9-11-19-12-30v1-30c2-10 4-18 8-26l39-69Zm215 129c6-11 7-20 3-27-3-8-9-14-16-18l-121-67c-8-4-15-6-24-4-8 1-15 7-21 17l-30 54c-6 11-7 20-3 28 3 7 8 13 16 17l121 67c7 4 15 5 23 4 9-1 16-7 22-17l30-54Z"
          />
        </svg>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: (await loadGoogleFonts(
        post.data.title + post.data.author + SITE.title + "by"
      )) as FontOptions[],
    }
  );
};
