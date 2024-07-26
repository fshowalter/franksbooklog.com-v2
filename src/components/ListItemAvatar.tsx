import type { AvatarImageData } from "src/api/avatars";
import { Avatar } from "src/components/Avatar";

export const ListItemAvatarImageConfig = {
  width: 64,
  height: 64,
};

export function ListItemAvatar({
  name,
  slug,
  imageData,
}: {
  name: string;
  slug: string | null;
  imageData: AvatarImageData | undefined;
}) {
  const avatar = (
    <Avatar
      name={name}
      imageData={imageData}
      width={ListItemAvatarImageConfig.width}
      height={ListItemAvatarImageConfig.height}
      loading="lazy"
      decoding="async"
    />
  );

  if (!slug) {
    return (
      <div className="safari-border-radius-fix w-16 max-w-16 overflow-hidden rounded-[50%] shadow-all">
        {avatar}
      </div>
    );
  }

  return (
    <a
      href={`/authors/${slug}/`}
      className="safari-border-radius-fix w-16 max-w-16 overflow-hidden rounded-[50%] shadow-all"
    >
      {avatar}
    </a>
  );
}
