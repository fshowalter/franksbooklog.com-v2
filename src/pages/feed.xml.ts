import rss from "@astrojs/rss";
import { getFeedCover } from "src/api/covers";
import {
  loadExcerptHtml,
  mostRecentReviews,
  type ReviewWithExcerpt,
} from "src/api/reviews";
import { textStarsForGrade } from "src/utils/textStarsForGrade";

function addMetaToExcerpt(excerpt: string, review: ReviewWithExcerpt) {
  const meta = `${textStarsForGrade(review.grade)}`;
  return `<p>${meta}</p>${excerpt}`;
}

function authorsToString(authors: ReviewWithExcerpt["authors"]) {
  const authorsArray = authors.map((author) => {
    if (author.notes) {
      return `${author.name} (${author.notes})`;
    }

    return author.name;
  });

  return new Intl.ListFormat().format(authorsArray);
}

export async function GET() {
  const reviews = await mostRecentReviews(10);

  const rssItems = await Promise.all(
    reviews.map(async (review) => {
      return await loadExcerptHtml(review);
    }),
  );

  return rss({
    // `<title>` field in output xml
    title: "Frank's Book Log",
    // `<description>` field in output xml
    description: "Reviews of current, cult, classic, and forgotten books.",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: "https://www.franksbooklog.com",
    customData:
      "<image><url>https://www.franksbooklog.com/assets/favicon-128.png</url><title>Frank's Book Log</title><link>https://www.franksbooklog.com/</link></image>",
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: await Promise.all(
      rssItems.map(async (item) => {
        const cover = await getFeedCover(item);

        return {
          title: `${item.title} by ${authorsToString(item.authors)}`,
          pubDate: item.date,
          link: `https://www.franksbooklog.com/reviews/${item.slug}/`,
          content: `<img src="${
            cover.src
          }" alt="${cover.alt}">${addMetaToExcerpt(item.excerpt, item)}`,
        };
      }),
    ),
  });
}
