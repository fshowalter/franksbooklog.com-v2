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
  > {}

export function ListItem({
  value,
  eagerLoadCoverImage,
  coverImageData,
}: {
  value: ListItemValue;
  eagerLoadCoverImage: boolean;
  coverImageData: CoverImageData;
}): JSX.Element {
  return (
    <li className="flex even:bg-subtle">
      <article className="px-pageMargin">
        <div className="text-sm font-light uppercase leading-4 tracking-0.75px text-subtle">
          {formatDate(value.date)}
        </div>
        <div className="max-w-prose">
          <a rel="canonical" href={`/reviews/${value.slug}/`} className="block">
            <Cover
              imageData={coverImageData}
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
        </div>
        <div>
          <div className="flex flex-col items-center desktop:items-start">
            <div className="text-sm font-light uppercase leading-4 tracking-0.75px text-subtle">
              {value.yearPublished} | {value.kind}
            </div>
            <div className="spacer-y-4" />
            <h2 className="text-center text-lg font-bold leading-8">
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
                    />
                  );
                }),
              )}
            </p>{" "}
            <div className="spacer-y-4" />
            {value.grade && <Grade value={value.grade} height={24} />}
            <div className="spacer-y-4" />
          </div>
          <RenderedMarkdown text={value.excerpt} />
        </div>
      </article>
    </li>
  );
}
