import { graphql } from "gatsby";

export function StructuredData({
  reviewStructuredData,
}: {
  reviewStructuredData: Queries.ReviewStructuredDataFragment;
}) {
  const structuredData = buildStructuredData(reviewStructuredData);

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
  reviewStructuredData: Queries.ReviewStructuredDataFragment,
) {
  if (reviewStructuredData.grade == "Abandoned") {
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
      name: reviewStructuredData.title,
      image: reviewStructuredData.seoImage.childImageSharp?.resize?.src,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: gradeMap[reviewStructuredData.grade[0]],
    },
    author: {
      "@type": "Person",
      name: "Frank Showalter",
    },
  };
}

export const pageQuery = graphql`
  fragment ReviewStructuredData on ReviewedWorksJson {
    title
    grade
    seoImage: cover {
      childImageSharp {
        resize(toFormat: JPG, width: 1200, quality: 80) {
          src
        }
      }
    }
  }
`;
