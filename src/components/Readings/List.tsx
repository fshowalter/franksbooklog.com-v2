import type { CoverImageData } from "src/api/covers";
import type { TimelineEntry } from "src/api/timelineEntries";
import { BarGradient } from "src/components/BarGradient";
import { GroupedList } from "src/components/GroupedList";
import { ListItem } from "src/components/ListItem";
import { ListItemCover } from "src/components/ListItemCover";
import { ListItemKindAndYear } from "src/components/ListItemKindAndYear";
import { toSentenceArray } from "src/utils";

import type { ActionType } from "./Readings.reducer";
import { Actions } from "./Readings.reducer";

export interface ListItemValue
  extends Pick<
    TimelineEntry,
    | "slug"
    | "reviewed"
    | "sequence"
    | "date"
    | "yearPublished"
    | "progress"
    | "title"
    | "edition"
    | "kind"
    | "authors"
  > {}

export function List({
  groupedValues,
  visibleCount,
  totalCount,
  dispatch,
  covers,
}: {
  groupedValues: Map<string, Map<string, ListItemValue[]>>;
  visibleCount: number;
  totalCount: number;
  dispatch: React.Dispatch<ActionType>;
  covers: Record<string, CoverImageData>;
}) {
  return (
    <GroupedList
      data-testid="list"
      groupedValues={groupedValues}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: Actions.SHOW_MORE })}
    >
      {(dateGroup) => {
        const [dayAndDate, items] = dateGroup;
        return (
          <DateListItem
            values={items}
            key={dayAndDate}
            dayAndDate={dayAndDate}
            covers={covers}
          />
        );
      }}
    </GroupedList>
  );
}

function DateListItem({
  dayAndDate,
  values,
  covers,
}: {
  dayAndDate: string;
  values: ListItemValue[];
  covers: Record<string, CoverImageData>;
}): JSX.Element {
  const [date, day] = dayAndDate.split(" ");

  return (
    <ListItem className="pb-0">
      <div>
        <div className="rounded shadow-all">
          <div className="w-12 bg-canvas py-2 text-center text-sm uppercase">
            {day}
          </div>
          <div className="text-center text-2.5xl leading-8">{date}</div>
        </div>
        <div className="spacer-y-4" />
      </div>
      <ul className="flex grow flex-col gap-y-4">
        {values.map((value) => {
          return (
            <SubListItem
              value={value}
              imageData={covers[value.slug]}
              key={value.sequence}
            />
          );
        })}
      </ul>
    </ListItem>
  );
}

function SubListItem({
  value,
  imageData,
}: {
  value: ListItemValue;
  imageData: CoverImageData;
}): JSX.Element {
  const progressValue = parseProgress(value.progress);

  return (
    <ListItem className="pt-0 shadow-bottom last:shadow-none even:bg-unset">
      <ListItemCover slug={value.slug} imageData={imageData} />
      <div className="grow">
        <TitleAndProgress
          title={value.title}
          progress={value.progress}
          reviewed={value.reviewed}
          slug={value.slug}
        />
        <div className="spacer-y-1" />
        <Authors values={value.authors} />
        <div className="spacer-y-2" />
        <ListItemKindAndYear year={value.yearPublished} kind={value.kind} />
        <div className="spacer-y-2" />
        {value.progress !== "Abandoned" && (
          <BarGradient
            value={progressValue}
            maxValue={100}
            style={{ lineHeight: "1rem" }}
          />
        )}
        <div className="spacer-y-2" />
        <Edition value={value.edition} />
      </div>
    </ListItem>
  );
}

function parseProgress(progress: string) {
  const progressNumber = progress.split("%", 1)[0];

  if (progressNumber === "Finished") {
    return 100;
  }

  if (!isNaN(Number(progressNumber))) {
    return parseInt(progressNumber);
  }

  return 100;
}

function TitleAndProgress({
  title,
  progress,
  reviewed,
  slug,
}: {
  title: ListItemValue["title"];
  progress: ListItemValue["progress"];
  reviewed: ListItemValue["reviewed"];
  slug: ListItemValue["slug"];
}) {
  const progressBox = (
    <span className="text-xs font-light text-subtle">{progress}</span>
  );

  if (reviewed) {
    return (
      <a
        href={`/reviews/${slug}/`}
        className="block text-md leading-5 text-accent"
      >
        {title}&#8239;&#8239;{progressBox}
      </a>
    );
  }

  return (
    <span className="block text-md leading-5">
      {title}&#8239;&#8239;{progressBox}
    </span>
  );
}

function Authors({ values }: { values: ListItemValue["authors"] }) {
  return (
    <div className="font-normal leading-5 text-muted">
      {toSentenceArray(values.map((author) => author.name))}
    </div>
  );
}

function Edition({ value }: { value: string }): JSX.Element {
  return (
    <div className="text-sm leading-4 tracking-0.5px text-subtle">{value}</div>
  );
}
