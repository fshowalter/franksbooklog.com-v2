import type { CoverImageData } from "src/api/covers";
import type { ReviewWithContent } from "src/api/reviews";
import { CoverGallery } from "src/components/CoverGallery";
import { CoverGalleryHeading } from "src/components/CoverGalleryHeading";
import { CoverGalleryNav } from "src/components/CoverGalleryNav";

type MoreReviews = ReviewWithContent["moreReviews"][number];

export interface MoreReviewsValue extends MoreReviews {
  imageData: CoverImageData;
}

export function MoreReviews({
  values,
  linkTarget,
  linkText,
}: {
  values: MoreReviewsValue[];
  linkTarget: string;
  linkText: string;
}): JSX.Element | null {
  if (values.length < 4) {
    return null;
  }

  return (
    <CoverGalleryNav>
      <CoverGalleryHeading
        leadText="More"
        linkText={linkText}
        linkTarget={linkTarget}
      />
      <CoverGallery
        values={values}
        seeAllLinkTarget={linkTarget}
        seeAllLinkText={linkText}
      />
    </CoverGalleryNav>
  );
}
