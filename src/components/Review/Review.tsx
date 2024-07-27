import type { CoverImageData } from "src/api/covers";
import type { Review, ReviewWithContent } from "src/api/reviews";
import { AuthorLink } from "src/components/AuthorLink";
import { Cover } from "src/components/Cover";
import { Grade } from "src/components/Grade";
import { LongFormText } from "src/components/LongFormText";
import { PageTitle } from "src/components/PageTitle";
import { toSentenceArray } from "src/utils/";

import { IncludedWorks } from "./IncludedWorks";
import type { MoreReviewsValue } from "./MoreReviews";
import { MoreReviews } from "./MoreReviews";
import { ReadingHistory } from "./ReadingHistory";
import { StructuredData } from "./StructuredData";
export const CoverImageConfig = {
  width: 248,
  height: 372,
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(date: Date) {
  return dateFormat.format(date);
}

interface Value extends ReviewWithContent {
  moreReviews: MoreReviewsValue[];
  coverImageData: CoverImageData;
  seoImageSrc: string;
}

export interface Props {
  value: Value;
}

export function Review({ value }: Props): JSX.Element {
  return (
    <main id="top" className="flex flex-col items-center pt-6 desktop:pt-12">
      <header className="flex w-full flex-col items-center px-pageMargin">
        <Title title={value.title} subtitle={value.subtitle} />
        <div className="spacer-y-2" />
        <Authors values={value.authors} />
        <div className="spacer-y-2 desktop:spacer-y-4" />
        <YearAndKind yearPublished={value.yearPublished} kind={value.kind} />
        <div className="spacer-y-8" />
        <ReviewCover coverImageData={value.coverImageData} />
        <div className="spacer-y-12" />
        <ReviewGrade value={value.grade} />
        <ReviewDate value={value.date} />
        <div className="spacer-y-8" />
      </header>
      <div className="flex flex-col px-pageMargin desktop:px-gutter">
        <LongFormText className="max-w-prose" text={value.content} />
      </div>
      <IncludedWorks
        values={value.includedWorks}
        className="w-full max-w-popout"
      />
      <div className="spacer-y-20" />
      <ReadingHistory values={value.readings} className="w-full max-w-popout" />
      <div className="spacer-y-32" />
      <div className="flex w-full flex-col items-center gap-y-12 bg-default tablet:bg-subtle tablet:pb-32 tablet:pt-8 desktop:gap-y-24">
        <MoreReviews
          values={value.moreReviews}
          linkText="Reviews"
          linkTarget="/reviews/"
        />
      </div>
      <StructuredData
        title={value.title}
        grade={value.grade}
        seoImageSrc={value.seoImageSrc}
      />
    </main>
  );
}

function Title({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string | null;
}) {
  return (
    <div className="text-center">
      <PageTitle>{title}</PageTitle>
      {subtitle && (
        <div className="max-w-prose pt-2 font-normal tracking-1px text-muted">
          {subtitle}
        </div>
      )}
    </div>
  );
}

function YearAndKind({
  yearPublished,
  kind,
}: {
  yearPublished: ReviewWithContent["yearPublished"];
  kind: ReviewWithContent["kind"];
}) {
  return (
    <div className="uppercase tracking-1px text-subtle">
      <span className="tracking-0.25px">{yearPublished}</span> | {kind}
    </div>
  );
}

function Authors({ values }: { values: ReviewWithContent["authors"] }) {
  return (
    <div className="text-center text-md text-muted">
      by{" "}
      {toSentenceArray(
        values.map((author) => (
          <AuthorLink
            key={author.slug}
            name={author.name}
            slug={author.slug}
            notes={author.notes}
            className="inline-block text-accent"
          />
        )),
      )}
    </div>
  );
}

function ReviewCover({ coverImageData }: { coverImageData: CoverImageData }) {
  return (
    <div className="relative flex h-[340px] w-full max-w-popout flex-col items-center">
      <div className="cover-clip-path absolute inset-0 overflow-hidden">
        <div
          style={{
            backgroundColor: "var(--bg-default)",
            backgroundImage: `linear-gradient(90deg, rgba(var(--bg-default-rgb),1) 0%, rgba(var(--bg-default-rgb),var(--bg-default-alpha)) 30%, rgba(var(--bg-default-rgb),0) 50%, rgba(var(--bg-default-rgb),var(--bg-default-alpha)) 70%, rgba(var(--bg-default-rgb),1) 100%), url(${coverImageData.src})`,
          }}
          className={
            "absolute left-[-5%] top-[-5%] size-[110%] bg-default bg-cover bg-center"
          }
        />
        <div className="absolute size-full backdrop-blur" />
      </div>
      <div className="relative -top-4 z-10 h-[372px] shadow-[0_5px_20px_rgba(49,46,42,0.22)]">
        <Cover
          imageData={coverImageData}
          width={CoverImageConfig.width}
          height={CoverImageConfig.height}
          loading={"eager"}
          decoding="async"
          className="safari-border-radius-fix shadow-[0_5px_20px_rgba(49,46,42,0.22)]"
        />
      </div>
    </div>
  );
}

function ReviewGrade({ value }: { value: ReviewWithContent["grade"] }) {
  if (value == "Abandoned") {
    return (
      <div className="text-md uppercase tracking-1px text-emphasis">
        Abandoned
      </div>
    );
  }
  return <Grade value={value} height={32} />;
}

function ReviewDate({ value }: { value: ReviewWithContent["date"] }) {
  return (
    <div className="flex flex-col items-center tracking-0.5px text-subtle">
      <span>on</span> {formatDate(value)}
    </div>
  );
}
