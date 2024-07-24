import { getCovers, getSeoCovers } from "src/api/covers";
import { allReviews, loadContent } from "src/api/reviews";

import { CoverGalleryListItemImageConfig } from "../CoverGalleryListItem";
import { CoverImageConfig, type Props } from "./Review";

export async function getProps(slug: string): Promise<Props> {
  const { reviews } = await allReviews();

  const review = reviews.find((review) => {
    return review.slug === slug;
  })!;

  const value = await loadContent(review);

  const coverImageData = (
    await getCovers({ works: [value], ...CoverImageConfig })
  )[value.slug];

  const seoImageSrc = (await getSeoCovers({ works: [value] }))[value.slug].src;

  const moreReviewCovers = await getCovers({
    works: value.moreReviews,
    ...CoverGalleryListItemImageConfig,
  });

  return {
    value,
    seoImageSrc,
    coverImageData,
    moreReviewCovers,
  };
}
