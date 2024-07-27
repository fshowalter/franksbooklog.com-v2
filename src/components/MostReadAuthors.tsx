import type { CoverImageData } from "src/api/covers";

import { ListItem } from "./ListItem";
import { ListItemCover } from "./ListItemCover";
import { ListItemKindAndYear } from "./ListItemKindAndYear";
import { ListItemTitle } from "./ListItemTitle";
import { StatHeading } from "./StatHeading";

interface ReadingSubListItemValue {
  sequence: number;
  date: Date;
  edition: string;
  kind: string;
  title: string;
  yearPublished: string;
  slug: string | null;
  imageData: CoverImageData;
  reviewed: boolean;
}

interface ListItemValue {
  name: string;
  slug: string | null;
  count: number;
  readings: ReadingSubListItemValue[];
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function MostReadAuthors({
  values,
}: {
  values: readonly ListItemValue[];
}): JSX.Element | null {
  if (values.length == 0) {
    return null;
  }

  return (
    <section className="shadow-all">
      <StatHeading>Most Read Authors</StatHeading>
      <header className="sticky top-10 z-30 flex justify-between bg-default px-gutter font-bold leading-[calc(2.5rem_-_2px)] desktop:top-[calc(var(--header-offset)_+_2.5rem)]">
        <span className="text-left leading-10">Name</span>
        <span className="text-right leading-10">Readings</span>
      </header>
      <ol>
        {values.map((value, index) => {
          return (
            <li key={value.name} className="block">
              <div
                style={{ zIndex: 1 + index }}
                className="sticky top-20 grid w-full grid-cols-[auto_1fr_calc(6ch_+_var(--gutter-width))] bg-stripe px-gutter leading-10 desktop:top-[calc(var(--header-offset)_+_5rem)]"
              >
                <span className="leading-10">
                  <Name value={value} />
                </span>
                <span className="leading-10">&nbsp;</span>
                <span className="bg-stripe text-right leading-10">
                  {value.count}
                </span>
              </div>
              <div className="col-start-1 col-end-4 leading-10">
                <details>
                  <summary className="px-gutter tracking-0.25px text-subtle">
                    Details
                  </summary>
                  <ol className="tablet:px-gutter">
                    {value.readings.map((reading) => {
                      return (
                        <MostWatchedPersonReadingListItem
                          key={reading.sequence}
                          value={reading}
                        />
                      );
                    })}
                  </ol>
                </details>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function Name({ value }: { value: ListItemValue }): JSX.Element {
  if (value.slug) {
    return (
      <a className="text-accent" href={`/authors/${value.slug}/`}>
        {value.name}
      </a>
    );
  }

  return <>{value.name}</>;
}

function MostWatchedPersonReadingListItem({
  value,
}: {
  value: ReadingSubListItemValue;
}) {
  return (
    <ListItem className="items-center">
      <ListItemCover
        slug={value.reviewed ? value.slug : null}
        imageData={value.imageData}
      />
      <div className="grow">
        <div>
          <ListItemTitle
            title={value.title}
            slug={value.reviewed ? value.slug : null}
          />
          <div className="spacer-y-2" />
          <ListItemKindAndYear year={value.yearPublished} kind={value.kind} />
          <div className="spacer-y-2" />
          <div className="text-base leading-4 text-subtle">
            {value.edition} on {dateFormatter.format(value.date)}
          </div>
          <div className="spacer-y-2" />
        </div>
        <div className="spacer-y-2" />
      </div>
    </ListItem>
  );
}
