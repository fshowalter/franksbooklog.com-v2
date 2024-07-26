import { getBackdrop } from "src/api/backdrops";
import { getFluidCovers } from "src/api/covers";
import { getPage } from "src/api/pages";
import { mostRecentReviews } from "src/api/reviews";
import { CoverGalleryListItemImageConfig } from "src/components/CoverGalleryListItem";

import type { Props } from "./Article";
import { BackdropImageConfig } from "./Article";

export async function getProps({
  slug,
  alt,
}: {
  slug: string;
  alt: string;
}): Promise<Props> {
  const imageData = await getBackdrop({ slug, ...BackdropImageConfig });
  const { title, content } = await getPage(slug);

  const recentReviews = await mostRecentReviews(4);

  const covers = await getFluidCovers({
    works: recentReviews,
    ...CoverGalleryListItemImageConfig,
  });

  return {
    title,
    content,
    alt,
    imageData,
    recentReviews: recentReviews.map((review) => {
      return { ...review, imageData: covers[review.slug] };
    }),
  };
}
