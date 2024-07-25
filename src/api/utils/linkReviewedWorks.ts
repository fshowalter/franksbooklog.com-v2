export function linkReviewedWorks(
  text: string,
  reviewedWorks: { slug: string }[],
) {
  let result = text;

  const re = RegExp(/(<span data-work-slug="([^"]*)">)(.*?)(<\/span>)/, "g");

  const matches = [...text.matchAll(re)];

  for (const match of matches) {
    const reviewedWork = reviewedWorks.find((work) => work.slug === match[2]);

    if (!reviewedWork) {
      if (match[3]) {
        result = result.replace(
          `<span data-work-slug="${match[2]}">${match[3]}</span>`,
          match[3],
        );
      }
    } else {
      result = result.replace(
        `<span data-work-slug="${match[2]}">${match[3]}</span>`,
        `<a href="/reviews/${reviewedWork.slug}/">${match[3]}</a>`,
      );
    }
  }

  return result;
}
