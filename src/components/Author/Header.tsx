import type { Author } from "src/api/authors";
import type { AvatarImageData } from "src/api/avatars";
import { Avatar } from "src/components/Avatar";
import { PageTitle } from "src/components/PageTitle";

export const AvatarImageConfig = {
  width: 200,
  height: 200,
};

export function Header({
  name,
  reviewedWorkCount,
  shelfWorkCount,
  avatarImageData,
}: {
  name: Author["name"];
  reviewedWorkCount: Author["reviewedWorkCount"];
  shelfWorkCount: Author["shelfWorkCount"];
  avatarImageData: AvatarImageData;
}): JSX.Element {
  return (
    <>
      <div className="text-center leading-9">
        <a className="text-accent" href={`/authors/`}>
          Authors
        </a>
      </div>
      {avatarImageData && (
        <div className="flex flex-col items-center">
          <div className="safari-border-radius-fix w-[200px] max-w-poster overflow-hidden rounded-[50%] shadow-all">
            <Avatar
              imageData={avatarImageData}
              name={name}
              width={AvatarImageConfig.width}
              height={AvatarImageConfig.height}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}
      <PageTitle className="text-center">{name}</PageTitle>
      <div className="spacer-y-6" />
      <Slug
        reviewedWorkCount={reviewedWorkCount}
        shelfWorkCount={shelfWorkCount}
      />
    </>
  );
}

function Slug({
  reviewedWorkCount,
  shelfWorkCount,
}: {
  reviewedWorkCount: Author["reviewedWorkCount"];
  shelfWorkCount: Author["shelfWorkCount"];
}): JSX.Element {
  let shelfText = <></>;

  if (shelfWorkCount > 0) {
    shelfText = (
      <>
        , and <span className="text-emphasis">{shelfWorkCount}</span> titles on
        the shelf
      </>
    );
  }

  let works = "works";

  if (reviewedWorkCount === 1) {
    works = "work";
  }

  return (
    <div className="px-gutter text-center text-subtle">
      Author of <span className="text-emphasis">{reviewedWorkCount}</span>{" "}
      reviewed {works}
      {shelfText}.
    </div>
  );
}
