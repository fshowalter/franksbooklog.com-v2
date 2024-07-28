import { promises as fs } from "node:fs";

import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";
import { WorkKindSchema } from "./utils/workKindSchema";

const reviewedWorksJsonFile = getContentPath("data", "reviewed-works.json");

const ReadingSchema = z.object({
  isAudiobook: z.boolean(),
  readingTime: z.number(),
  abandoned: z.boolean(),
  sequence: z.number(),
  date: z.coerce.date(),
});

const AuthorSchema = z.object({
  name: z.string(),
  sortName: z.string(),
  slug: z.string(),
  notes: z.nullable(z.string()),
});

const IncludedWorkAuthorSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

const IncludedWorkSchema = z.object({
  title: z.string(),
  authors: z.array(IncludedWorkAuthorSchema),
  slug: z.string(),
  grade: z.string(),
});

const MoreReviewAuthorSchema = z.object({
  name: z.string(),
});

const MoreReviewSchema = z.object({
  title: z.string(),
  yearPublished: z.string(),
  kind: WorkKindSchema,
  authors: z.array(MoreReviewAuthorSchema),
  grade: z.string(),
  slug: z.string(),
  includedInSlugs: z.array(z.string()),
});

const MoreByAuthorSchema = z.object({
  name: z.string(),
  slug: z.string(),
  works: z.array(MoreReviewSchema),
});

const ReviewedWorkJsonSchema = z.object({
  sequence: z.number(),
  slug: z.string(),
  includedInSlugs: z.array(z.string()),
  title: z.string(),
  subtitle: z.nullable(z.string()),
  sortTitle: z.string(),
  yearPublished: z.string(),
  authors: z.array(AuthorSchema),
  gradeValue: z.number(),
  kind: WorkKindSchema,
  moreReviews: z.array(MoreReviewSchema),
  moreByAuthors: z.array(MoreByAuthorSchema),
  includedWorks: z.array(IncludedWorkSchema),
  readings: z.array(ReadingSchema),
});

export type ReviewedWorkJsonReading = z.infer<typeof ReadingSchema>;

export type ReviewedWorkJson = z.infer<typeof ReviewedWorkJsonSchema>;

async function parseAllReviewedWorksJson() {
  const json = await fs.readFile(reviewedWorksJsonFile, "utf8");
  const data = JSON.parse(json) as unknown[];

  return data.map((item) => {
    return ReviewedWorkJsonSchema.parse(item);
  });
}

export async function allReviewedWorksJson(): Promise<ReviewedWorkJson[]> {
  return await parseAllReviewedWorksJson();
}
