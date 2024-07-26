import { allAuthors } from "src/api/authors";
import { getAvatars } from "src/api/avatars";
import { ListItemAvatarImageConfig } from "src/components/ListItemAvatar";

import type { Props } from "./Authors";
import { type ListItemValue } from "./List";

export async function getProps(): Promise<Props> {
  const authors = await allAuthors();
  const avatars = await getAvatars({ authors, ...ListItemAvatarImageConfig });

  authors.sort((a, b) => a.sortName.localeCompare(b.sortName));

  const values = authors.map((author) => {
    const value: ListItemValue = {
      name: author.name,
      slug: author.slug,
      sortName: author.sortName,
      reviewedWorkCount: author.reviewedWorkCount,
      workCount: author.workCount,
      imageData: avatars[author.slug],
    };

    return value;
  });

  return { values, initialSort: "name-asc" };
}
