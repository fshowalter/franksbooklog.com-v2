import type { TimelineEntryJson } from "./data/timelineEntriesJson";
import { allTimelineEntriesJson } from "./data/timelineEntriesJson";

export interface TimelineEntry extends TimelineEntryJson {}

interface TimelineEntries {
  timelineEntries: TimelineEntry[];
  distinctWorkYears: string[];
  distinctReadingYears: string[];
  distinctKinds: string[];
  distinctEditions: string[];
  bookCount: number;
  shortStoryCount: number;
  abandonedCount: number;
  workCount: number;
}

const yearFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  timeZone: "UTC",
});

export async function allTimelineEntries(): Promise<TimelineEntries> {
  const timelineEntries = await allTimelineEntriesJson();
  const distinctWorkYears = new Set<string>();
  const distinctReadingYears = new Set<string>();
  const distinctKinds = new Set<string>();
  const distinctEditions = new Set<string>();
  const works = timelineEntries.filter((entry) => {
    return entry.progress === "Finished" || entry.progress === "Abandoned";
  });

  timelineEntries.forEach((entry) => {
    distinctEditions.add(entry.edition);
    distinctKinds.add(entry.kind);
    distinctReadingYears.add(yearFormatter.format(entry.date));
    distinctWorkYears.add(entry.yearPublished);
  });

  return {
    timelineEntries,
    distinctEditions: Array.from(distinctEditions).toSorted(),
    distinctReadingYears: Array.from(distinctReadingYears).toSorted(),
    distinctWorkYears: Array.from(distinctWorkYears).toSorted(),
    distinctKinds: Array.from(distinctKinds).toSorted(),
    bookCount: works.filter((work) => work.kind !== "Short Story").length,
    abandonedCount: works.filter((work) => work.progress === "Abandoned")
      .length,
    shortStoryCount: works.filter((work) => work.kind === "Short Story").length,
    workCount: works.length,
  };
}
