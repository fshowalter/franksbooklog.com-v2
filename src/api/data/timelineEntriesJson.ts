import { promises as fs } from "node:fs";

import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";
import { WorkKindSchema } from "./utils/workKindSchema";

const timelineEntriesJsonFile = getContentPath("data", "timeline-entries.json");

const AuthorSchema = z.object({
  name: z.string(),
});

const TimelineEntryJsonSchema = z.object({
  sequence: z.string(),
  slug: z.string(),
  edition: z.string(),
  date: z.coerce.date(),
  progress: z.string(),
  reviewed: z.boolean(),
  yearPublished: z.string(),
  title: z.string(),
  kind: WorkKindSchema,
  authors: z.array(AuthorSchema),
  includedInSlugs: z.array(z.string()),
});

export type TimelineEntryJson = z.infer<typeof TimelineEntryJsonSchema>;

async function parseAllTimelineEntriesJson() {
  const json = await fs.readFile(timelineEntriesJsonFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  return data.map((item) => {
    return TimelineEntryJsonSchema.parse(item);
  });
}

export async function allTimelineEntriesJson(): Promise<TimelineEntryJson[]> {
  return await parseAllTimelineEntriesJson();
}
