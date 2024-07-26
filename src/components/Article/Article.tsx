import type { BackdropImageData } from "src/api/backdrops";
import { CoverGallery } from "src/components/CoverGallery";
import { CoverGalleryHeading } from "src/components/CoverGalleryHeading";
import type { CoverGalleryListItemValue } from "src/components/CoverGalleryListItem";
import { CoverGalleryNav } from "src/components/CoverGalleryNav";
import { LongFormText } from "src/components/LongFormText";
import { PageTitle } from "src/components/PageTitle";

export const BackdropImageConfig = {
  width: 960,
  height: 540,
  sizes: "(min-width: 960px) 960px, 100vw",
};

export interface Props {
  alt: string;
  content: string | null;
  title: string;
  imageData: BackdropImageData;
  recentReviews: CoverGalleryListItemValue[];
}

export function Article({
  alt,
  title,
  content,
  recentReviews,
  imageData,
}: Props): JSX.Element {
  return (
    <main>
      <article className="flex flex-col items-center">
        <PageTitle className="px-pageMargin py-6 text-center desktop:py-8">
          {title}
        </PageTitle>
        <img
          {...imageData}
          width={BackdropImageConfig.width}
          height={BackdropImageConfig.height}
          sizes={BackdropImageConfig.sizes}
          loading="lazy"
          decoding="async"
          alt={alt}
          className="mb-[5.33px]"
        />
        <div className="spacer-y-16" />
        <div className="px-pageMargin">
          <LongFormText text={content} className="max-w-prose" />
        </div>
        <div className="spacer-y-32" />
      </article>
      <div className="flex w-full max-w-popout items-center justify-center bg-default tablet:max-w-full tablet:bg-subtle tablet:pb-32 tablet:pt-8">
        <CoverGalleryNav>
          <CoverGalleryHeading
            leadText="Latest"
            linkText="Reviews"
            linkTarget={`/reviews/`}
          />
          <CoverGallery
            values={recentReviews}
            seeAllLinkTarget="/reviews/"
            seeAllLinkText="Reviews"
          />
        </CoverGalleryNav>
      </div>
    </main>
  );
}
