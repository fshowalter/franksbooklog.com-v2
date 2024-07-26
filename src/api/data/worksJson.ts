import { promises as fs } from "node:fs";

import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";

const worksJsonFile = getContentPath("data", "works.json");

const AuthorSchema = z.object({
  name: z.string(),
  sortName: z.string(),
  slug: z.string(),
  notes: z.nullable(z.string()),
});

const WorkJsonSchema = z.object({
  slug: z.string(),
  includedInSlugs: z.array(z.string()),
  title: z.string(),
  subtitle: z.nullable(z.string()),
  authors: z.array(AuthorSchema),
  includedWorkSlugs: z.array(z.string()),
});

export type WorkJson = z.infer<typeof WorkJsonSchema>;

async function parseAllWorksJson() {
  const json = await fs.readFile(worksJsonFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  return data.map((item) => {
    return WorkJsonSchema.parse(item);
  });
}

export async function allWorksJson(): Promise<WorkJson[]> {
  return await parseAllWorksJson();
}
