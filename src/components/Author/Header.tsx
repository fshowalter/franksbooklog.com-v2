import { graphql } from "gatsby";
import { Box } from "../Box";
import { GraphqlImage } from "../GraphqlImage";
import { Link } from "../Link";
import { PageTitle } from "../PageTitle";
import { Spacer } from "../Spacer";

export function Slug({
  data,
}: {
  data: Queries.AuthorHeaderFragment;
}): JSX.Element {
  const shelfWorkCount = data.workCount - data.reviewedWorkCount;
  let shelfText = <></>;

  if (shelfWorkCount > 0) {
    shelfText = (
      <>
        , and{" "}
        <Box as="span" color="emphasis">
          {shelfWorkCount}
        </Box>{" "}
        titles on the shelf
      </>
    );
  }

  let works = "works";

  if (data.reviewedWorkCount === 1) {
    works = "work";
  }

  return (
    <Box color="subtle" textAlign="center">
      Author of{" "}
      <Box as="span" color="emphasis">
        {data.reviewedWorkCount}
      </Box>{" "}
      reviewed {works}
      {shelfText}.
    </Box>
  );
}

export function Header({
  data,
}: {
  data: Queries.AuthorHeaderFragment;
}): JSX.Element {
  return (
    <>
      <Box textAlign="center" lineHeight={36}>
        <Link to="/reviews/">Reviews</Link> /{" "}
        <Link to={`/reviews/authors/`}>Authors</Link>
      </Box>
      {data.avatar && (
        <>
          <Box display="flex" flexDirection="column" alignItems="center">
            <GraphqlImage
              image={data.avatar}
              alt={data.name}
              borderRadius="half"
              transform="safariBorderRadiusFix"
              // className={avatarStyle}
            />
          </Box>
          <Spacer axis="vertical" size={16} />
        </>
      )}
      <PageTitle textAlign="center">{data.name}</PageTitle>
      <Spacer axis="vertical" size={24} />
      <Slug data={data} />
    </>
  );
}

export const pageQuery = graphql`
  fragment AuthorHeader on AuthorsJson {
    name
    avatar {
      childImageSharp {
        gatsbyImageData(
          layout: FIXED
          formats: [JPG, AVIF]
          quality: 80
          width: 200
          height: 200
          placeholder: BLURRED
        )
      }
    }
    workCount
    reviewedWorkCount
  }
`;
