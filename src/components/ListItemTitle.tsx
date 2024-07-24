import { twJoin } from "tailwind-merge";

interface Props {
  title: string;
  slug: string | null;
  className?: string;
}

export function ListItemTitle({ title, slug, className }: Props) {
  if (slug) {
    return (
      <a
        href={`/reviews/${slug}/`}
        className={twJoin("block text-md leading-5", className)}
      >
        {title}
      </a>
    );
  }

  return <span className="block text-md leading-5">{title}</span>;
}
