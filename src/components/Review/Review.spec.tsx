import { render } from "@testing-library/react";
import { allReviews } from "src/api/reviews";
import { describe, it } from "vitest";

import { getProps } from "./getProps";
import { Review } from "./Review";

const { reviews } = await allReviews();

describe("Review", () => {
  it.for(reviews)(
    "matches snapshot for slug $slug",
    { timeout: 10000 },
    async (review, { expect }) => {
      const props = await getProps(review.slug);

      const { asFragment } = render(<Review {...props} />);

      expect(asFragment()).toMatchSnapshot();
    },
  );
});
