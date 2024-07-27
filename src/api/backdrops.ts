import { getImage } from "astro:assets";

import { normalizeSources } from "./utils/normalizeSources";

export interface BackdropImageData {
  src: string;
  srcSet: string;
}

interface Props {
  slug: string;
  width: number;
  height: number;
}

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/backdrops/*.png",
);

export async function getBackdrop({
  slug,
  width,
  height,
}: Props): Promise<BackdropImageData> {
  const backdropPath = Object.keys(images).find((path) => {
    return path.endsWith(`${slug}.png`);
  })!;

  const backdropFile = await images[backdropPath]();

  const optimizedImage = await getImage({
    src: backdropFile.default,
    width: width,
    height: height,
    format: "avif",
    widths: [0.25, 0.5, 1, 2].map((w) => w * width),
    quality: 80,
  });

  return {
    srcSet: normalizeSources(optimizedImage.srcSet.attribute),
    src: normalizeSources(optimizedImage.src),
  };
}
