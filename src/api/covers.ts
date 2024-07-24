import { basename, extname } from "node:path";

import { getImage } from "astro:assets";

import { normalizeSources } from "./utils/normalizeSources";

export interface CoverImageData {
  src: string;
  srcSet: string;
}

interface Props {
  width: number;
  height: number;
}

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/covers/*.png",
);

const cache: Record<string, Record<string, CoverImageData>> = {};

export async function getCovers({
  width,
  height,
}: Props): Promise<Record<string, CoverImageData>> {
  const key = width.toString();

  if (key in cache) {
    return cache[key];
  }

  const imageMap: Record<string, CoverImageData> = {};

  await Promise.all(
    Object.keys(images).map(async (image) => {
      const coverFile = await images[image]();

      const optimizedImage = await getImage({
        src: coverFile.default,
        width: width,
        height: height,
        format: "avif",
        densities: [1, 2],
        quality: 80,
      });

      imageMap[basename(image, extname(image))] = {
        srcSet: normalizeSources(optimizedImage.srcSet.attribute),
        src: normalizeSources(optimizedImage.src),
      };
    }),
  );

  cache[key] = imageMap;

  return imageMap;
}
