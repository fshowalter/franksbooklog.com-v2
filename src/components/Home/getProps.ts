import { getCovers } from "src/api/covers";
import { loadExcerptHtml, mostRecentReviews } from "src/api/reviews";

import type { Props } from "./Home";
import { CoverImageConfig } from "./HomeListItem";

export async function getProps(): Promise<Props> {
  const works = await mostRecentReviews(10);

  const values = await Promise.all(
    works.map(async (review) => {
      return await loadExcerptHtml(review);
    }),
  );

  const covers = await getCovers({ works: values, ...CoverImageConfig });

  return {
    values,
    covers,
  };
}
