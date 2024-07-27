import { promises as fs } from "node:fs";

import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";

const yearStatsJsonDirectory = getContentPath("data", "year-stats");

const Distribution = z.object({
  name: z.string(),
  count: z.number(),
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

const YearStatsJsonSchema = z.object({
  year: z.string(),
  workCount: z.number(),
  bookCount: z.number(),
  kindDistribution: z.array(Distribution),
  editionDistribution: z.array(Distribution),
  decadeDistribution: z.array(Distribution),
  mostReadAuthors: z.array(MostReadAuthorSchema),
});

export type YearStatsJson = z.infer<typeof YearStatsJsonSchema>;

async function parseAllYearStatsJson() {
  const dirents = await fs.readdir(yearStatsJsonDirectory, {
    withFileTypes: true,
  });

  return Promise.all(
    dirents
      .filter((item) => !item.isDirectory() && item.name.endsWith(".json"))
      .map(async (item) => {
        const fileContents = await fs.readFile(
          `${yearStatsJsonDirectory}/${item.name}`,
          "utf8",
        );

        const json = JSON.parse(fileContents) as unknown;
        return YearStatsJsonSchema.parse(json);
      }),
  );
}

export async function allYearStatsJson(): Promise<YearStatsJson[]> {
  return await parseAllYearStatsJson();
}
