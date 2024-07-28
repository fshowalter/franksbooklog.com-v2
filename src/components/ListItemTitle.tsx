import { twj } from "src/utils/tailwindJoin";

interface Props {
  title: string;
  slug?: string | null;
  className?: string;
}

export function ListItemTitle({ title, slug, className }: Props) {
  if (slug) {
    return (
      <a
        href={`/reviews/${slug}/`}
        className={twj("block text-md leading-5 text-accent", className)}
      >
        {title}
      </a>
    );
  }

  return (
    <span className={twj("block text-md leading-5", className)}>{title}</span>
  );
}
