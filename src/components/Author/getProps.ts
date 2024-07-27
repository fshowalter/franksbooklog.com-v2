import { type Author, getAuthorDetails } from "src/api/authors";
import { getAvatars } from "src/api/avatars";
import { getCovers } from "src/api/covers";

import { ListItemCoverImageConfig } from "../ListItemCover";
import type { Props } from "./Author";
import { AvatarImageConfig } from "./Header";
import { type ListItemValue } from "./List";

function filterOtherAuthors(author: Author, work: Author["works"][number]) {
  return work.authors
    .filter((workAuthor) => {
      return author.name !== workAuthor.name;
    })
    .map((otherAuthor) => {
      return { name: otherAuthor.name };
    });
}

export async function getProps(slug: string): Promise<Props> {
  const { author, distinctKinds, distinctPublishedYears } =
    await getAuthorDetails(slug);

  const avatars = await getAvatars({ authors: [author], ...AvatarImageConfig });
  const covers = await getCovers({
    works: author.works,
    ...ListItemCoverImageConfig,
  });

  author.works.sort((a, b) => a.yearPublished.localeCompare(b.yearPublished));

  const values = author.works.map((work) => {
    const value: ListItemValue = {
      title: work.title,
      yearPublished: work.yearPublished,
      slug: work.slug,
      kind: work.kind,
      grade: work.grade,
      sortTitle: work.sortTitle,
      gradeValue: work.gradeValue,
      reviewed: work.reviewed,
      imageData: covers[work.slug],
      otherAuthors: filterOtherAuthors(author, work),
    };

    return value;
  });

  return {
    values,
    name: author.name,
    shelfWorkCount: author.shelfWorkCount,
    reviewedWorkCount: author.reviewedWorkCount,
    distinctKinds,
    distinctPublishedYears,
    initialSort: "year-published-asc",
    avatarImageData: avatars[slug],
  };
}
