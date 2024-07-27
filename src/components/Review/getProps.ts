import { getCovers, getFluidCovers, getOpenGraphCover } from "src/api/covers";
import { allReviews, loadContent } from "src/api/reviews";

import { CoverGalleryListItemImageConfig } from "../CoverGalleryListItem";
import { CoverImageConfig, type Props } from "./Review";

export async function getProps(slug: string): Promise<Props> {
  const { reviews } = await allReviews();

  const baseReview = reviews.find((review) => {
    return review.slug === slug;
  })!;

  const reviewWithContent = await loadContent(baseReview);

  const coverImageData = (
    await getCovers({ works: [reviewWithContent], ...CoverImageConfig })
  )[reviewWithContent.slug];

  const seoImageSrc = (await getOpenGraphCover(reviewWithContent)).src;

  const covers = await getFluidCovers({
    works: reviewWithContent.moreReviews,
    ...CoverGalleryListItemImageConfig,
  });

  return {
    value: {
      ...reviewWithContent,
      seoImageSrc,
      coverImageData,
      moreReviews: reviewWithContent.moreReviews.map((review) => {
        return {
          ...review,
          imageData: covers[review.slug],
        };
      }),
    },
  };
}
