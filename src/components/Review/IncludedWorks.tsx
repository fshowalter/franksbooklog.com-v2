import { graphql } from "gatsby";
import { toSentenceArray } from "../../utils";
import type { IBoxProps } from "../Box";
import { Box } from "../Box";
import { Grade } from "../Grade";
import { Link } from "../Link";
import { Spacer } from "../Spacer";

interface IIncludedWorksProps extends IBoxProps {
  reviewData: Queries.ReviewIncludedWorksFragment;
}

export function IncludedWorks({ reviewData, ...rest }: IIncludedWorksProps) {
  if (reviewData.includedWorks.length === 0) {
    return null;
  }

  return (
    <Box {...rest}>
      <Spacer axis="vertical" size={64} />
      <Box
        as="h3"
        color="subtle"
        fontSize="medium"
        fontWeight="normal"
        paddingX="gutter"
        boxShadow="borderBottom"
        maxWidth="popout"
        width="full"
      >
        Included Works
        <Spacer size={8} axis="vertical" />
      </Box>
      <Box as="ul" width="full" maxWidth="popout">
        {reviewData.includedWorks.map((includedWork) => (
          <Box
            as="li"
            key={includedWork.slug}
            display="flex"
            flexDirection="column"
            backgroundColor="zebra"
            paddingX="gutter"
            paddingY={16}
          >
            <Link
              to={`/reviews/${includedWork.slug}/`}
              fontSize="medium"
              fontWeight="semiBold"
            >
              {includedWork.title}
            </Link>{" "}
            <Box>
              <Box as="span" color="subtle">
                by
              </Box>{" "}
              {toSentenceArray(
                includedWork.authors.map((author) => author.name),
              )}
            </Box>
            <Grade grade={includedWork.grade} height={16} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export const query = graphql`
  fragment ReviewIncludedWorks on ReviewedWorksJson {
    includedWorks {
      title
      authors {
        name
        slug
      }
      grade
      slug
    }
  }
`;
