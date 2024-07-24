import { graphql } from "gatsby";
import { backgroundColors } from "../../styles/colors.css";
import { toSentenceArray } from "../../utils/";
import { AuthorLink } from "../AuthorLink";
import { Box, IBoxProps } from "../Box";
import { Grade } from "../Grade";
import { GraphqlImage } from "../GraphqlImage";
import { Layout } from "../Layout";
import { LongFormText } from "../LongFormText";
import { MoreReviews } from "../MoreReviews";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";
import { IncludedWorks } from "./IncludedWorks";
import { ReadingHistory } from "./ReadingHistory";
import {
  coverBackgroundBlurStyle,
  coverBackgroundImageStyle,
  coverBackgroundWrapStyle,
  coverStyle,
} from "./Review.css";
import { StructuredData } from "./StructuredData";
export function Review({
  reviewData,
}: {
  reviewData: Queries.ReviewDataFragment;
}): JSX.Element {
  return (
    <Layout>
      <Box
        as="main"
        id="top"
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop={{ default: 24, desktop: 48 }}
      >
        <Box
          as="header"
          display="flex"
          flexDirection="column"
          alignItems="center"
          paddingX="pageMargin"
          width="full"
        >
          <Title reviewData={reviewData} textAlign="center" />
          <Spacer axis="vertical" size={8} />
          <Authors reviewData={reviewData} />
          <Spacer axis="vertical" size={{ default: 8, desktop: 16 }} />
          <YearAndKind reviewData={reviewData} />
          <Spacer axis="vertical" size={32} />
          <Cover reviewData={reviewData} />
          <Spacer axis="vertical" size={48} />
          <ReviewGrade reviewData={reviewData} />
          <ReviewDate reviewData={reviewData} />
          <Spacer axis="vertical" size={32} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          paddingX={{ default: "pageMargin", desktop: "gutter" }}
        >
          <LongFormText
            maxWidth="prose"
            // eslint-disable-next-line react/no-danger
            text={reviewData.review.linkedHtml}
          />
        </Box>
        <IncludedWorks reviewData={reviewData} maxWidth="popout" width="full" />
        <Spacer axis="vertical" size={80} />
        <ReadingHistory
          reviewData={reviewData}
          maxWidth="popout"
          width="full"
        />
        <Spacer axis="vertical" size={128} />
        <Box
          display="flex"
          flexDirection="column"
          rowGap={{ default: 48, desktop: 96 }}
          alignItems="center"
          backgroundColor={{ default: "default", tablet: "subtle" }}
          paddingTop={{ default: 0, tablet: 32 }}
          paddingBottom={{ default: 0, tablet: 128 }}
          width="full"
        >
          <MoreReviews
            reviewedWorks={reviewData.moreReviews}
            linkText="Reviews"
            linkTarget="/reviews/"
          />
        </Box>
      </Box>
      <StructuredData reviewStructuredData={reviewData} />
    </Layout>
  );
}

interface ITitleProps extends IBoxProps {
  reviewData: Queries.ReviewDataFragment;
}

function Title({ reviewData, ...rest }: ITitleProps) {
  return (
    <Box {...rest}>
      <PageTitle>{reviewData.title}</PageTitle>
      {reviewData.subtitle && (
        <>
          <Box
            fontSize="default"
            letterSpacing={1}
            color="muted"
            maxWidth="prose"
          >
            {reviewData.subtitle}
          </Box>
        </>
      )}
    </Box>
  );
}

function YearAndKind({
  reviewData,
}: {
  reviewData: Queries.ReviewDataFragment;
}) {
  return (
    <Box textTransform="uppercase" color="subtle" letterSpacing={1}>
      <Box as="span" letterSpacing={0.25}>
        {reviewData.yearPublished}
      </Box>{" "}
      | {reviewData.kind}
    </Box>
  );
}

function Authors({ reviewData }: { reviewData: Queries.ReviewDataFragment }) {
  return (
    <Box fontSize="medium" textAlign="center" color="muted">
      by{" "}
      {toSentenceArray(
        reviewData.authors.map((author) => (
          <AuthorLink
            key={author.slug}
            author={author}
            display="inline-block"
          />
        )),
      )}
    </Box>
  );
}

function Cover({ reviewData }: { reviewData: Queries.ReviewDataFragment }) {
  const imageSrc =
    reviewData.cover.childImageSharp?.gatsbyImageData.images.fallback?.src;

  if (!imageSrc) {
    return null;
  }

  return (
    <Box
      position="relative"
      width="full"
      maxWidth="popout"
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{
        height: "340px",
      }}
    >
      <Box className={coverBackgroundWrapStyle}>
        <Box
          className={coverBackgroundImageStyle}
          style={{
            backgroundColor: backgroundColors.default,
            backgroundImage: `linear-gradient(90deg, rgba(${backgroundColors.defaultRGB},1) 0%, rgba(${backgroundColors.defaultRGB},${backgroundColors.alpha}) 30%, rgba(${backgroundColors.defaultRGB},0) 50%, rgba(${backgroundColors.defaultRGB},${backgroundColors.alpha}) 70%, rgba(${backgroundColors.defaultRGB},1) 100%), url(${imageSrc})`,
            // backgroundImage: `url(${imageSrc})`,
          }}
        />
        <Box className={coverBackgroundBlurStyle} />
      </Box>
      <GraphqlImage
        image={reviewData.cover}
        alt={`A cover of ${reviewData.title} by ${toSentenceArray(
          reviewData.authors.map((a) => a.name),
        ).join("")} (${reviewData.yearPublished})`}
        loading={"eager"}
        className={coverStyle}
      />
    </Box>
  );
}

function ReviewGrade({
  reviewData,
}: {
  reviewData: Queries.ReviewDataFragment;
}) {
  if (reviewData.grade == "Abandoned") {
    return (
      <Box
        fontSize="medium"
        textTransform="uppercase"
        letterSpacing={1}
        color="emphasis"
      >
        Abandoned
      </Box>
    );
  }
  return <Grade grade={reviewData.grade} height={32} />;
}

function ReviewDate({
  reviewData,
}: {
  reviewData: Queries.ReviewDataFragment;
}) {
  return (
    <Box
      display="flex"
      color="subtle"
      flexDirection="column"
      alignItems="center"
      letterSpacing={0.5}
    >
      <span>on</span> {reviewData.date}
    </Box>
  );
}

export const pageQuery = graphql`
  fragment ReviewData on ReviewedWorksJson {
    title
    subtitle
    yearPublished
    kind
    grade
    date(formatString: "MMM DD, YYYY")
    authors {
      name
      notes
      slug
    }
    ...ReviewIncludedWorks
    moreReviews {
      ...MoreReviews
    }
    review {
      linkedHtml
    }
    ...ReviewReadingHistory
    cover {
      childImageSharp {
        gatsbyImageData(
          layout: FIXED
          formats: [JPG, AVIF]
          quality: 80
          width: 248
          placeholder: BLURRED
        )
      }
    }
    ...ReviewStructuredData
  }
`;
