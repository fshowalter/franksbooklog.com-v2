import { promises as fs } from "node:fs";

import matter from "gray-matter";
import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";

const readingsMarkdownDirectory = getContentPath("readings");

const TimelineEntrySchema = z.object({
  date: z.date(),
  progress: z.string(),
});

const DataSchema = z.object({
  sequence: z.number(),
  work_slug: z.string(),
  edition: z.string(),
  edition_notes: z.nullable(z.string()),
  timeline: z.array(TimelineEntrySchema),
});

type TimelineEntry = z.infer<typeof TimelineEntrySchema>;

export interface MarkdownReading {
  sequence: number;
  slug: string;
  edition: string;
  timeline: TimelineEntry[];
  editionNotesRaw: string | null;
  readingNotesRaw: string | null;
}

async function parseAllReadingsMarkdown() {
  const dirents = await fs.readdir(readingsMarkdownDirectory, {
    withFileTypes: true,
  });

  return Promise.all(
    dirents
      .filter((item) => !item.isDirectory() && item.name.endsWith(".md"))
      .map(async (item) => {
        const fileContents = await fs.readFile(
          `${readingsMarkdownDirectory}/${item.name}`,
          "utf8",
        );

        const { data, content } = matter(fileContents);
        const greyMatter = DataSchema.parse(data);

        const markdownReading: MarkdownReading = {
          sequence: greyMatter.sequence,
          slug: greyMatter.work_slug,
          edition: greyMatter.edition,
          timeline: greyMatter.timeline,
          editionNotesRaw: greyMatter.edition_notes,
          readingNotesRaw: content,
        };

        return markdownReading;
      }),
  );
}

export async function allReadingsMarkdown(): Promise<MarkdownReading[]> {
  return await parseAllReadingsMarkdown();
}
