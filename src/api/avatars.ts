import { getImage } from "astro:assets";

import { normalizeSources } from "./utils/normalizeSources";

export interface AvatarImageData {
  src: string;
  srcSet: string;
}

interface Props {
  width: number;
  height: number;
  authors: { slug: string }[];
}

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/avatars/*.png",
);

export async function getAvatars({
  authors,
  width,
  height,
}: Props): Promise<Record<string, AvatarImageData>> {
  const imageMap: Record<string, AvatarImageData> = {};

  await Promise.all(
    authors.map(async (author) => {
      const imagePath = Object.keys(images).find((path) => {
        return path.endsWith(`${author.slug}.png`);
      });

      if (!imagePath) {
        return null;
      }

      const avatarFile = await images[imagePath]();

      const optimizedImage = await getImage({
        src: avatarFile.default,
        width: width,
        height: height,
        format: "avif",
        densities: [1, 2],
        quality: 80,
      });

      imageMap[author.slug] = {
        srcSet: normalizeSources(optimizedImage.srcSet.attribute),
        src: normalizeSources(optimizedImage.src),
      };
    }),
  );

  return imageMap;
}
