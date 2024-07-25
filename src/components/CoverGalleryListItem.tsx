import type { CoverImageData } from "src/api/covers";
import { Grade } from "src/components/Grade";
import { ListItemTitle } from "src/components/ListItemTitle";
import { toSentenceArray } from "src/utils";
import { twJoin } from "tailwind-merge";

import { Cover } from "./Cover";

export const CoverGalleryListItemImageConfig = {
  width: 248,
  height: 372,
};

export function CoverGalleryListItem({
  slug,
  imageData,
  title,
  year,
  grade,
  date,
  kind,
  edition,
  authors,
  details,
}: {
  slug: string;
  imageData: CoverImageData;
  title: string;
  year: string;
  grade: string | null;
  date?: string;
  edition?: string | null;
  kind: string | null;
  details?: React.ReactNode;
  authors: Author[];
}): JSX.Element {
  return (
    <li className="flex flex-row items-center gap-x-4 px-gutter py-4 even:bg-subtle tablet:flex-col tablet:items-start tablet:p-0 even:tablet:bg-unset">
      <Image
        slug={slug}
        imageData={imageData}
        title={title}
        authors={authors}
        className="min-w-20 max-w-20 shrink-0 tablet:max-w-poster"
      />
      <div className="tablet:spacer-y-2" />
      <div className="flex grow flex-col tablet:w-full tablet:items-center">
        <div className="tablet:spacer-y-1" />
        <ListItemTitle
          title={title}
          slug={slug}
          className="tablet:text-center tablet:text-base tablet:leading-5 desktop:text-md"
        />
        <div className="spacer-y-1 tablet:spacer-y-2" />
        <Authors values={authors} className="text-left tablet:text-center" />
        <div className="spacer-y-3" />
        <YearAndKind
          kind={kind}
          year={year}
          className="text-left tablet:text-center"
        />
        <div className="spacer-y-3" />
        {grade && (
          <>
            <Grade value={grade} height={16} />
            <div className="spacer-y-2" />
          </>
        )}
        {date && (
          <>
            <div className="text-subtle">{date}</div>
            <div className="spacer-y-2 tablet:spacer-y-1" />
          </>
        )}
        {edition && (
          <>
            <div className="text-subtle">{edition}</div>
            <div className="spacer-y-2 tablet:spacer-y-1" />
          </>
        )}
        {details && details}
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
        className={twJoin(
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
  title,
  authors,
  className,
}: {
  slug: string | null | undefined;
  imageData: CoverImageData;
  title: string;
  authors: Author[];
  className?: string;
}) {
  if (slug) {
    return (
      <a
        href={`/reviews/${slug}/`}
        className={twJoin(
          className,
          "safari-border-radius-fix overflow-hidden",
        )}
      >
        <Cover
          imageData={imageData}
          title={title}
          authors={authors}
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
    <div className={twJoin("text-base leading-5 text-muted", className)}>
      {toSentenceArray(values.map((author) => author.name))}
    </div>
  );
}

interface Author {
  name: string;
}
