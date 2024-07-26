import { promises as fs } from "node:fs";

import matter from "gray-matter";
import { z } from "zod";

import { getContentPath } from "./utils/getContentPath";

const pagesMarkdownDirectory = getContentPath("pages");

interface MarkdownPage {
  slug: string;
  title: string;
  rawContent: string;
}

const DataSchema = z.object({
  title: z.string(),
  slug: z.string(),
});

async function parseAllPagesMarkdown() {
  const dirents = await fs.readdir(pagesMarkdownDirectory, {
    withFileTypes: true,
  });

  return Promise.all(
    dirents
      .filter((item) => !item.isDirectory() && item.name.endsWith(".md"))
      .map(async (item) => {
        const fileContents = await fs.readFile(
          `${pagesMarkdownDirectory}/${item.name}`,
          "utf8",
        );

        const { data, content } = matter(fileContents);
        const greyMatter = DataSchema.parse(data);

        const markdownPage: MarkdownPage = {
          slug: greyMatter.slug,
          title: greyMatter.title,
          rawContent: content,
        };

        return markdownPage;
      }),
  );
}

export async function allPagesMarkdown(): Promise<MarkdownPage[]> {
  return await parseAllPagesMarkdown();
}
