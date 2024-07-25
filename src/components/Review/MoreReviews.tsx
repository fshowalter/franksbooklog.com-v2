import type { CoverImageData } from "src/api/covers";
import type { ReviewWithContent } from "src/api/reviews";

import { CoverGallery } from "../CoverGallery";
import { CoverGalleryListItem } from "../CoverGalleryListItem";

export function MoreReviews({
  values,
  covers,
  linkTarget,
  linkText,
}: {
  values: ReviewWithContent["moreReviews"];
  covers: Record<string, CoverImageData>;
  linkTarget: string;
  linkText: string;
}): JSX.Element | null {
  if (values.length < 4) {
    return null;
  }

  return (
    <nav className="relative flex w-full flex-col items-center tablet:px-gutter desktop:w-auto desktop:max-w-[992px] desktop:px-0">
      <div className="w-full px-gutter py-2 shadow-bottom tablet:px-0 tablet:py-4 tablet:shadow-none">
        <span className="font-semibold text-muted">More </span>
        <a href={linkTarget} className="text-accent">
          {linkText}
        </a>
      </div>
      <CoverGallery className="w-full px-0">
        {values.map((value) => {
          return (
            <CoverGalleryListItem
              key={value.slug}
              title={value.title}
              grade={value.grade}
              slug={value.slug}
              imageData={covers[value.slug]}
              authors={value.authors}
              year={value.yearPublished}
              kind={value.kind}
            />
          );
        })}
        <li className="col-span-full block px-gutter py-4 text-right shadow-bottom tablet:absolute tablet:right-[var(--gutter-width)] tablet:top-0 tablet:px-0 tablet:shadow-none desktop:right-0">
          <a href={linkTarget} className="text-accent">
            All{" "}
            <span className="inline tablet:hidden desktop:inline">
              {linkText}
            </span>{" "}
            &#8594;
          </a>
        </li>
      </CoverGallery>
    </nav>
  );
}
