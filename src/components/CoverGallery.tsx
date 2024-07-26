import type { CoverGalleryListItemValue } from "./CoverGalleryListItem";
import { CoverGalleryListItem } from "./CoverGalleryListItem";

export function CoverGallery({
  values,
  seeAllLinkText,
  seeAllLinkTarget,
}: {
  values: CoverGalleryListItemValue[];
  seeAllLinkText: string;
  seeAllLinkTarget: string;
}): JSX.Element {
  return (
    <ul className="w-full tablet:grid tablet:grid-cols-[repeat(4,minmax(78px,248px))] tablet:gap-8 tablet:px-gutter desktop:grid-cols-[repeat(4,1fr)] desktop:gap-x-16 desktop:px-pageMargin desktop:pt-2">
      {values.map((value) => {
        return <CoverGalleryListItem key={value.slug} value={value} />;
      })}
      <li className="col-span-full block px-gutter py-4 text-right shadow-bottom tablet:absolute tablet:right-0 tablet:top-0 tablet:shadow-none desktop:right-[var(--gutter-width)]">
        <a href={seeAllLinkTarget} className="text-accent">
          All{" "}
          <span className="inline tablet:hidden desktop:inline">
            {seeAllLinkText}
          </span>{" "}
          &#8594;
        </a>
      </li>
    </ul>
  );
}
