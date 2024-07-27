import { promises as fs } from "node:fs";

import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";
import { WorkKindSchema } from "./utils/workKindSchema";

const authorsJsonDirectory = getContentPath("data", "authors");

const WorkAuthorSchema = z.object({
  slug: z.string(),
  notes: z.nullable(z.string()),
  name: z.string(),
  sortName: z.string(),
});

const WorkSchema = z.object({
  title: z.string(),
  yearPublished: z.string(),
  kind: WorkKindSchema,
  slug: z.string(),
  grade: z.nullable(z.string()),
  sortTitle: z.string(),
  gradeValue: z.nullable(z.number()),
  authors: z.array(WorkAuthorSchema),
  reviewed: z.boolean(),
  includedInSlugs: z.array(z.string()),
});

const AuthorJsonSchema = z.object({
  name: z.string(),
  sortName: z.string(),
  slug: z.string(),
  reviewedWorkCount: z.number(),
  workCount: z.number(),
  works: z.array(WorkSchema),
  shelfWorkCount: z.number(),
});

async function parseAllAuthorsJson() {
  const dirents = await fs.readdir(authorsJsonDirectory, {
    withFileTypes: true,
  });

  return Promise.all(
    dirents
      .filter((entry) => !entry.isDirectory() && entry.name.endsWith(".json"))
      .map(async (entry) => {
        const fileContents = await fs.readFile(
          `${authorsJsonDirectory}/${entry.name}`,
          "utf8",
        );

        const json = JSON.parse(fileContents) as unknown;
        return AuthorJsonSchema.parse(json);
      }),
  );
}

export type AuthorJson = z.infer<typeof AuthorJsonSchema>;

export async function allAuthorsJson(): Promise<AuthorJson[]> {
  return await parseAllAuthorsJson();
}
