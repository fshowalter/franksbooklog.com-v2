import type { CoverImageData } from "src/api/covers";

import type { ListItemValue } from "./HomeListItem";
import { HomeListItem } from "./HomeListItem";

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
            <HomeListItem
              eagerLoadCoverImage={index === 0}
              coverImageData={covers[value.slug]}
              key={value.sequence}
              value={value}
            />
          );
        })}
      </ol>
      <a
        href="/reviews/"
        className="flex justify-end px-pageMargin py-10 text-lg text-accent"
      >
        All Reviews →
      </a>
    </main>
  );
}
