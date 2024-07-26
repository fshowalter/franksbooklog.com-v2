import { allPagesMarkdown } from "./data/pagesMarkdown";
import { allReviewedWorksJson } from "./data/reviewedWorksJson";
import { getHtml } from "./utils/markdown/getHtml";

interface MarkdownPage {
  title: string;
  content: string | null;
}

export async function getPage(slug: string): Promise<MarkdownPage> {
  const pages = await allPagesMarkdown();

  const matchingPage = pages.find((page) => {
    return page.slug === slug;
  })!;

  const reviewedWorksJson = await allReviewedWorksJson();

  return {
    title: matchingPage.title,
    content: getHtml(matchingPage.rawContent, reviewedWorksJson),
  };
}
