import { getCovers } from "src/api/covers";
import { allTimelineEntries } from "src/api/timelineEntries";
import { ListItemCoverImageConfig } from "src/components/ListItemCover";

import type { ListItemValue } from "./List";
import type { Props } from "./Readings";

export async function getProps(): Promise<Props> {
  const {
    timelineEntries,
    distinctWorkYears,
    distinctKinds,
    distinctReadingYears,
    distinctEditions,
    bookCount,
    workCount,
    abandonedCount,
    shortStoryCount,
  } = await allTimelineEntries();

  const covers = await getCovers({
    works: timelineEntries,
    ...ListItemCoverImageConfig,
  });

  timelineEntries.sort((a, b) => b.sequence.localeCompare(a.sequence));

  const values = timelineEntries.map((entry) => {
    const value: ListItemValue = {
      date: entry.date,
      title: entry.title,
      slug: entry.slug,
      yearPublished: entry.yearPublished,
      kind: entry.kind,
      sequence: entry.sequence,
      progress: entry.progress,
      reviewed: entry.reviewed,
      edition: entry.edition,
      authors: entry.authors.map((author) => {
        const authorValue: ListItemValue["authors"][0] = {
          name: author.name,
        };

        return authorValue;
      }),
    };

    return value;
  });

  return {
    values,
    distinctKinds,
    distinctReadingYears,
    distinctWorkYears,
    distinctEditions,
    initialSort: "progress-date-desc",
    covers,
    workCount,
    bookCount,
    abandonedCount,
    shortStoryCount,
  };
}
