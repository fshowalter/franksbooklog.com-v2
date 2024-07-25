import { getCovers } from "src/api/covers";
import { allReviews } from "src/api/reviews";
import { ListItemCoverImageConfig } from "src/components/ListItemCover";

import type { ListItemValue } from "./List";
import type { Props } from "./Reviews";

export async function getProps(): Promise<Props> {
  const {
    reviews,
    distinctPublishedYears,
    distinctKinds,
    distinctReviewYears,
    abandonedCount,
    shortStoryCount,
    bookCount,
  } = await allReviews();
  const covers = await getCovers({
    works: reviews,
    ...ListItemCoverImageConfig,
  });

  reviews.sort((a, b) =>
    a.authors[0].sortName.localeCompare(b.authors[0].sortName),
  );

  const values = reviews.map((review) => {
    const value: ListItemValue = {
      date: review.date,
      title: review.title,
      slug: review.slug,
      grade: review.grade,
      gradeValue: review.gradeValue,
      sortTitle: review.sortTitle,
      imageData: covers[review.slug],
      yearPublished: review.yearPublished,
      kind: review.kind,
      authors: review.authors.map((author) => {
        const authorValue: ListItemValue["authors"][0] = {
          name: author.name,
          sortName: author.sortName,
        };

        return authorValue;
      }),
    };

    return value;
  });

  return {
    values,
    distinctKinds,
    distinctPublishedYears,
    distinctReviewYears,
    initialSort: "author-asc",
    abandonedCount,
    shortStoryCount,
    bookCount,
  };
}
