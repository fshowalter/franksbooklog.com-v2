import type { ReviewWithContent } from "src/api/reviews";

interface Props extends Pick<ReviewWithContent, "grade" | "title"> {
  seoImageSrc: string;
}

export function StructuredData({ title, grade, seoImageSrc }: Props) {
  const structuredData = buildStructuredData(title, grade, seoImageSrc);

  if (!structuredData) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

function buildStructuredData(
  title: Props["title"],
  grade: Props["grade"],
  seoImageSrc: Props["seoImageSrc"],
) {
  if (grade == "Abandoned") {
    return null;
  }

  const gradeMap: Record<string, number> = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    F: 1,
  };

  return {
    "@context": "http://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Book",
      name: title,
      image: seoImageSrc,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: gradeMap[grade[0]],
    },
    author: {
      "@type": "Person",
      name: "Frank Showalter",
    },
  };
}
