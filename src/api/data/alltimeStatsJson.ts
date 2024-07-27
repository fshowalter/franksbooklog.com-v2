import { promises as fs } from "node:fs";

import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";

const alltimeStatsFile = getContentPath("data", "all-time-stats.json");

const Distribution = z.object({
  name: z.string(),
  count: z.number(),
});

const GradeDistribution = Distribution.extend({
  sortValue: z.number(),
});

const MostReadAuthorReading = z.object({
  sequence: z.number(),
  date: z.coerce.date(),
  slug: z.string(),
  title: z.string(),
  edition: z.string(),
  includedInSlugs: z.array(z.string()),
  yearPublished: z.string(),
  reviewed: z.boolean(),
  kind: z.string(),
});

const MostReadAuthorSchema = z.object({
  name: z.string(),
  count: z.number(),
  slug: z.nullable(z.string()),
  readings: z.array(MostReadAuthorReading),
});

const AlltimeStatsJsonSchema = z.object({
  reviewCount: z.number(),
  workCount: z.number(),
  bookCount: z.number(),
  gradeDistribution: z.array(GradeDistribution),
  kindDistribution: z.array(Distribution),
  editionDistribution: z.array(Distribution),
  decadeDistribution: z.array(Distribution),
  mostReadAuthors: z.array(MostReadAuthorSchema),
});

export type AlltimeStatsJson = z.infer<typeof AlltimeStatsJsonSchema>;

export async function alltimeStatsJson(): Promise<AlltimeStatsJson> {
  const json = await fs.readFile(alltimeStatsFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  return AlltimeStatsJsonSchema.parse(data);
}
