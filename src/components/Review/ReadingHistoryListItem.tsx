import type { ReviewWithContent } from "src/api/reviews";
import { BarGradient } from "src/components/BarGradient";
import { DateIcon } from "src/components/DateIcon";
import { RenderedMarkdown } from "src/components/RenderedMarkdown";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const progressDateFormat = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

interface Props {
  value: ReviewWithContent["readings"][0];
}

export function ReadingHistoryListItem({ value }: Props) {
  return (
    <li className="grid auto-rows-auto grid-cols-[16px_1ch_1fr] px-gutter pt-4 even:bg-subtle">
      <div className="mt-1">
        <DateIcon />{" "}
      </div>
      <div className="col-start-3">
        <Date value={value.date} />
        <Edition value={value.edition} />{" "}
        <EditionNotes value={value.editionNotes} />
      </div>
      <div className="col-start-3 row-start-2">
        <Details value={value} />
      </div>
      <div className="col-span-3 col-start-1 row-start-3 pt-4">
        <ReadingNotes value={value.readingNotes} />
      </div>
    </li>
  );
}

function Date({ value }: { value: ReviewWithContent["readings"][0]["date"] }) {
  return (
    <>
      <span className="inline-block text-default">
        {dateFormat.format(value)}
      </span>{" "}
    </>
  );
}

function Edition({
  value,
}: {
  value: ReviewWithContent["readings"][0]["edition"];
}) {
  return (
    <span className="font-light text-muted">
      <span>via</span> <span>{value}</span>
    </span>
  );
}

function EditionNotes({
  value,
}: {
  value: ReviewWithContent["readings"][0]["editionNotes"];
}) {
  if (!value) {
    return null;
  }
  return (
    <span className="text-sm font-light leading-none text-subtle">
      (
      <RenderedMarkdown
        className="text-sm leading-none"
        text={value}
        as="span"
      />
      )
    </span>
  );
}

function Details({ value }: { value: ReviewWithContent["readings"][0] }) {
  if (value.readingTime === 1) {
    return null;
  }

  const summaryText = value.abandoned
    ? "Abandoned after"
    : value.isAudiobook
      ? "Listened to over"
      : "Read over";

  return (
    <details className="font-light text-subtle">
      <summary>
        {summaryText} {value.readingTime} Days
      </summary>
      <ol className="-ml-gutter grid w-full grid-cols-[auto_1fr_auto] items-center pt-2">
        {value.timeline.map((entry) => {
          let progressValue = null;
          const progressNumber = entry.progress.split("%", 1)[0];

          if (progressNumber === "Finished") {
            progressValue = 100;
          }

          if (!isNaN(Number(progressNumber))) {
            progressValue = parseInt(progressNumber);
          }

          const entryDate = progressDateFormat.format(entry.date);

          return (
            <li key={entryDate} className="contents *:odd:bg-subtle">
              <div className="whitespace-nowrap px-gutter leading-10">
                {entryDate}
              </div>
              <div className="h-10 w-full">
                {progressValue && (
                  <BarGradient value={progressValue} maxValue={100} />
                )}
              </div>
              <div className="px-gutter text-right leading-10">
                {entry.progress}
              </div>
            </li>
          );
        })}
      </ol>
    </details>
  );
}

function ReadingNotes({
  value,
}: {
  value: ReviewWithContent["readings"][0]["readingNotes"];
}) {
  if (!value) {
    return null;
  }
  return (
    <div className="pb-6">
      <RenderedMarkdown className="text-base" text={value} />
    </div>
  );
}
