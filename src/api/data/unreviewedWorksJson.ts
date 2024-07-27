import { promises as fs } from "node:fs";

import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";
import { WorkKindSchema } from "./utils/workKindSchema";

const unreviewedWorksJsonFile = getContentPath("data", "unreviewed-works.json");

const AuthorSchema = z.object({
  name: z.string(),
  sortName: z.string(),
  slug: z.string(),
  notes: z.nullable(z.string()),
});

const UnreviewedWorkJsonSchema = z.object({
  slug: z.string(),
  includedInSlugs: z.array(z.string()),
  title: z.string(),
  subtitle: z.nullable(z.string()),
  sortTitle: z.string(),
  yearPublished: z.string(),
  authors: z.array(AuthorSchema),
  kind: WorkKindSchema,
});

export type UnreviewedWorkJson = z.infer<typeof UnreviewedWorkJsonSchema>;

async function parseAllUnreviewedWorksJson() {
  const json = await fs.readFile(unreviewedWorksJsonFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  return data.map((item) => {
    return UnreviewedWorkJsonSchema.parse(item);
  });
}

export async function allUnreviewedWorksJson(): Promise<UnreviewedWorkJson[]> {
  return await parseAllUnreviewedWorksJson();
}
