import type { Author } from "src/api/authors";
import type { AvatarImageData } from "src/api/avatars";
import { GroupedList } from "src/components/GroupedList";
import { ListItem } from "src/components/ListItem";
import { ListItemAvatar } from "src/components/ListItemAvatar";

import type { ActionType } from "./Authors.reducer";
import { Actions } from "./Authors.reducer";

export interface ListItemValue
  extends Pick<
    Author,
    "name" | "slug" | "sortName" | "reviewedWorkCount" | "workCount"
  > {
  imageData: AvatarImageData;
}

export function List({
  groupedValues,
  totalCount,
  visibleCount,
  dispatch,
}: {
  groupedValues: Map<string, ListItemValue[]>;
  totalCount: number;
  visibleCount: number;
  dispatch: React.Dispatch<ActionType>;
}) {
  return (
    <GroupedList
      data-testid="list"
      groupedValues={groupedValues}
      visibleCount={visibleCount}
      totalCount={totalCount}
      onShowMore={() => dispatch({ type: Actions.SHOW_MORE })}
    >
      {(value) => <AuthorListItem value={value} key={value.slug} />}
    </GroupedList>
  );
}

function AuthorListItem({ value }: { value: ListItemValue }): JSX.Element {
  return (
    <ListItem>
      <ListItemAvatar
        name={value.name}
        slug={value.reviewedWorkCount > 0 ? value.slug : null}
        imageData={value.imageData}
      />
      <AuthorName
        value={value.name}
        slug={value.reviewedWorkCount > 0 ? value.slug : null}
      />
      <div className="ml-auto">
        {value.reviewedWorkCount}&thinsp;/&thinsp;{value.workCount}
      </div>
    </ListItem>
  );
}

function AuthorName({
  value,
  slug,
}: {
  value: ListItemValue["name"];
  slug: string | null;
}) {
  const name = (
    <>
      <div className="spacer-y-1" />
      <div className="leading-normal">{value}</div>
      <div className="spacer-y-1" />
    </>
  );

  if (slug) {
    return (
      <a href={`/authors/${slug}/`} className="text-center text-md text-accent">
        {name}
      </a>
    );
  }

  return <div className="text-muted">{name}</div>;
}
