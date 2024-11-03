import type { FontStyle, FontWeight } from "satori";

export type FontOptions = {
  name: string;
  data: ArrayBuffer;
  weight: FontWeight | undefined;
  style: FontStyle | undefined;
};

async function loadGoogleFont(
  font: string,
  text: string
): Promise<ArrayBuffer> {
  const API = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text+"+'\u00A0'")}`;

  const css = await (
    await fetch(API, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (!resource) throw new Error("Failed to download dynamic font");

  const res = await fetch(resource[1]);

  if (!res.ok) {
    throw new Error("Failed to download dynamic font. Status: " + res.status);
  }

  const fonts: ArrayBuffer = await res.arrayBuffer();
  return fonts;
}

async function loadGoogleFonts(
  text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const DM_SANS = [
    {
      name: "DM Sans",
      font: "DM+Sans:opsz,wght@9..40,400&display=swap",
      weight: 400,
      style: "normal",
    },
    {
      name: "DM Sans",
      font: "DM+Sans:opsz,wght@9..40,700&display=swap",
      weight: 700,
      style: "bold",
    },
  ];

  const SPACE_GROTESK = [
    {
      name: "Space Grotesk",
      font: "Space+Grotesk&display=swap",
      weight: 400,
      style: "normal",
    },
    {
      name: "Space Grotesk",
      font: "Space+Grotesk:wght@700&display=swap",
      weight: 700,
      style: "bold",
    },
  ];

  const fontsConfig = {
    DM_SANS,
    SPACE_GROTESK,
  }

  const fonts = await Promise.all(
    fontsConfig.DM_SANS.map(async ({ name, font, weight, style }) => {
      const data = await loadGoogleFont(font, text);
      return { name, data, weight, style };
    })
  );

  return fonts;
}

export default loadGoogleFonts;