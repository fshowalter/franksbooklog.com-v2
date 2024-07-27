import type { CoverImageData } from "src/api/covers";

import { Cover } from "./Cover";

export const ListItemCoverImageConfig = {
  width: 72,
  height: 108,
};

export function ListItemCover({
  slug,
  imageData,
}: {
  slug?: string | null;
  imageData: CoverImageData;
}) {
  if (slug) {
    return (
      <a
        href={`/reviews/${slug}/`}
        className="safari-border-radius-fix min-w-[72px] max-w-[72px] shrink-0 overflow-hidden rounded-lg shadow-all"
      >
        <Cover
          imageData={imageData}
          width={ListItemCoverImageConfig.width}
          height={ListItemCoverImageConfig.height}
          loading="lazy"
          decoding="async"
        />
      </a>
    );
  }

  return (
    <div className="safari-border-radius-fix min-w-[72px] max-w-[72px] shrink-0 overflow-hidden rounded-lg shadow-all">
      <Cover
        imageData={imageData}
        width={ListItemCoverImageConfig.width}
        height={ListItemCoverImageConfig.height}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
