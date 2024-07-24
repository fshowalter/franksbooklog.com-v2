import type { CoverImageData } from "src/api/covers";

import type { ListItemValue } from "./ListItem";
import { ListItem } from "./ListItem";

export interface Props {
  values: ListItemValue[];
  covers: Record<string, CoverImageData>;
}

export function Home({ values, covers }: Props): JSX.Element {
  return (
    <main>
      <ol className="flex flex-col">
        {values.map((value, index) => {
          return (
            <ListItem
              eagerLoadCoverImage={index === 0}
              coverImageData={covers[value.slug]}
              key={value.sequence}
              value={value}
            />
          );
        })}
      </ol>
    </main>
  );
}
