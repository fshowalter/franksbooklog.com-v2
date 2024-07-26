import { getCovers } from "src/api/covers";
import { loadExcerptHtml, mostRecentReviews } from "src/api/reviews";

import type { Props } from "./Home";
import { CoverImageConfig } from "./HomeListItem";

export async function getProps(): Promise<Props> {
  const works = await mostRecentReviews(10);

  const reviews = await Promise.all(
    works.map(async (review) => {
      return await loadExcerptHtml(review);
    }),
  );

  const covers = await getCovers({ works: reviews, ...CoverImageConfig });

  return {
    values: reviews.map((review) => {
      return { ...review, coverImageData: covers[review.slug] };
    }),
  };
}
