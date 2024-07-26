import type { CoverImageData } from "src/api/covers";
import type { ReviewWithExcerpt } from "src/api/reviews";
import { AuthorLink } from "src/components/AuthorLink";
import { Cover } from "src/components/Cover";
import { Grade } from "src/components/Grade";
import { RenderedMarkdown } from "src/components/RenderedMarkdown";
import { toSentenceArray } from "src/utils";

export const CoverImageConfig = {
  width: 168,
  height: 252,
};

function formatDate(reviewDate: Date) {
  return reviewDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export interface ListItemValue
  extends Pick<
    ReviewWithExcerpt,
    | "grade"
    | "sequence"
    | "slug"
    | "excerpt"
    | "date"
    | "title"
    | "kind"
    | "yearPublished"
    | "authors"
  > {
  coverImageData: CoverImageData;
}

export function HomeListItem({
  value,
  eagerLoadCoverImage,
}: {
  value: ListItemValue;
  eagerLoadCoverImage: boolean;
}): JSX.Element {
  return (
    <li className="flex even:bg-subtle">
      <article className="mx-auto flex flex-col items-center px-pageMargin py-10 desktop:grid desktop:w-full desktop:grid-cols-8">
        <div className="text-center text-sm font-light uppercase leading-4 tracking-0.75px text-subtle desktop:self-start desktop:text-left desktop:leading-8">
          {formatDate(value.date)}
          <div className="spacer-y-6" />
        </div>
        <a
          rel="canonical"
          href={`/reviews/${value.slug}/`}
          className="cover-clip-path mx-auto block max-w-prose border-8 border-solid border-default bg-default desktop:col-span-2 desktop:self-start desktop:justify-self-end"
        >
          <Cover
            imageData={value.coverImageData}
            authors={value.authors}
            title={value.title}
            decoding="async"
            width={CoverImageConfig.width}
            height={CoverImageConfig.height}
            alt={`A cover of ${value.title} by ${toSentenceArray(
              value.authors.map((a) => a.name),
            ).join("")}`}
            loading={eagerLoadCoverImage ? "eager" : "lazy"}
          />
        </a>
        <div className="flex flex-col items-center desktop:col-span-5 desktop:items-start desktop:pl-4">
          <div className="py-4 text-sm font-light uppercase leading-4 tracking-0.75px text-subtle desktop:pt-0 desktop:leading-8">
            {value.yearPublished} | {value.kind}
          </div>
          <h2 className="text-center text-2.5xl font-bold leading-8">
            <a
              href={`/reviews/${value.slug}/`}
              rel="canonical"
              className="inline-block"
            >
              {value.title}
            </a>
          </h2>
          <p className="text-center">
            by{" "}
            {toSentenceArray(
              value.authors.map((author) => {
                return (
                  <AuthorLink
                    as="span"
                    key={author.slug}
                    name={author.name}
                    notes={author.notes}
                    slug={author.slug}
                    className="text-accent"
                  />
                );
              }),
            )}
          </p>{" "}
          <div className="spacer-y-4" />
          {value.grade && <Grade value={value.grade} height={24} />}
          <div className="spacer-y-4" />
          <RenderedMarkdown
            text={value.excerpt}
            className="max-w-[34rem] text-lg leading-normal tracking-0.3px text-muted"
          />
        </div>
      </article>
    </li>
  );
}
