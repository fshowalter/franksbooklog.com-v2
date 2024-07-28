import type { CoverImageData } from "src/api/covers";
import type { Review } from "src/api/reviews";
import { Grade } from "src/components/Grade";
import { ListItemTitle } from "src/components/ListItemTitle";
import { toSentenceArray } from "src/utils";
import { twj } from "src/utils/tailwindJoin";

import { Cover } from "./Cover";

export const CoverGalleryListItemImageConfig = {
  width: 248,
  height: 372,
};

interface Author extends Pick<Review["authors"][0], "name"> {}

export interface CoverGalleryListItemValue {
  slug: Review["slug"];
  imageData: CoverImageData;
  title: Review["title"];
  yearPublished: Review["yearPublished"];
  grade: Review["grade"];
  kind: Review["kind"];
  authors: Author[];
}

export function CoverGalleryListItem({
  value,
}: {
  value: CoverGalleryListItemValue;
}): JSX.Element {
  return (
    <li className="flex flex-row items-center gap-x-4 px-gutter py-4 even:bg-subtle tablet:flex-col tablet:items-start tablet:p-0 even:tablet:bg-unset">
      <Image
        slug={value.slug}
        imageData={value.imageData}
        className="min-w-20 max-w-20 shrink-0 tablet:max-w-poster"
      />
      <div className="tablet:spacer-y-2" />
      <div className="flex grow flex-col tablet:w-full tablet:items-center">
        <div className="tablet:spacer-y-1" />
        <ListItemTitle
          title={value.title}
          slug={value.slug}
          className="tablet:text-center tablet:text-base tablet:leading-5 desktop:text-md"
        />
        <div className="spacer-y-1 tablet:spacer-y-2" />
        <Authors
          values={value.authors}
          className="text-left tablet:text-center"
        />
        <div className="spacer-y-3" />
        <YearAndKind
          kind={value.kind}
          year={value.yearPublished}
          className="text-left tablet:text-center"
        />
        <div className="spacer-y-3" />
        {value.grade && (
          <>
            <Grade value={value.grade} height={16} />
            <div className="spacer-y-2" />
          </>
        )}
      </div>
    </li>
  );
}

function YearAndKind({
  kind,
  year,
  className,
}: {
  kind: string | null;
  year: string | null;
  className?: string;
}): JSX.Element | null {
  const yearBox = year ? <span>{year} | </span> : null;

  if (kind) {
    return (
      <div
        className={twj(
          "text-sm leading-4 tracking-0.5px text-subtle",
          className,
        )}
      >
        {yearBox}
        {kind}
      </div>
    );
  }

  return null;
}

function Image({
  slug,
  imageData,
  className,
}: {
  slug: string | null | undefined;
  imageData: CoverImageData;
  className?: string;
}) {
  if (slug) {
    return (
      <a
        href={`/reviews/${slug}/`}
        className={twj(className, "safari-border-radius-fix overflow-hidden")}
      >
        <Cover
          imageData={imageData}
          height={CoverGalleryListItemImageConfig.height}
          width={CoverGalleryListItemImageConfig.width}
          loading="lazy"
          decoding="async"
          className="aspect-[0.66666667]"
        />
      </a>
    );
  }

  return (
    <img
      {...imageData}
      alt="An unreviewed title."
      width={CoverGalleryListItemImageConfig.width}
      height={CoverGalleryListItemImageConfig.height}
      loading="lazy"
      decoding="async"
      className="aspect-[0.66666667]"
    />
  );
}

function Authors({
  values,
  className,
}: {
  values: Author[];
  className?: string;
}) {
  if (!values) {
    return null;
  }

  return (
    <div className={twj("text-base leading-5 text-muted", className)}>
      {toSentenceArray(values.map((author) => author.name))}
    </div>
  );
}
