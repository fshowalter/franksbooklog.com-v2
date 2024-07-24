import { getImage } from "astro:assets";

import { normalizeSources } from "./utils/normalizeSources";

export interface CoverImageData {
  src: string;
  srcSet: string;
}

interface Work {
  slug: string;
  includedInSlugs: string[];
}

interface Props {
  works: Work[];
  width: number;
  height: number;
}

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/content/assets/covers/*.png",
);

function parentCoverForWork(work: Work) {
  let parentCover;

  work.includedInSlugs.find((slug) => {
    parentCover = Object.keys(images).find((image) => {
      return image.endsWith(`${slug}.png`);
    });

    return parentCover;
  });

  return parentCover;
}

export async function getCovers({
  works,
  width,
  height,
}: Props): Promise<Record<string, CoverImageData>> {
  const imageMap: Record<string, CoverImageData> = {};

  await Promise.all(
    works.map(async (work) => {
      let workCoverPath = Object.keys(images).find((image) => {
        return image.endsWith(`${work.slug}.png`);
      });

      if (!workCoverPath) {
        workCoverPath = parentCoverForWork(work)!;
      }

      const workCoverFile = await images[workCoverPath]();

      const optimizedImage = await getImage({
        src: workCoverFile.default,
        width: width,
        height: height,
        format: "avif",
        densities: [1, 2],
        quality: 80,
      });

      imageMap[work.slug] = {
        srcSet: normalizeSources(optimizedImage.srcSet.attribute),
        src: normalizeSources(optimizedImage.src),
      };
    }),
  );

  return imageMap;
}
