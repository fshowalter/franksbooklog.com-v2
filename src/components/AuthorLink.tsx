import type { ElementType } from "react";

interface Props {
  name: string;
  notes?: string | null;
  slug: string | null;
  className?: string;
  as?: ElementType;
}

export function AuthorLink({
  as = "div",
  name,
  notes,
  slug,
  className,
}: Props): JSX.Element {
  const Component = as;

  let authorNotes = null;

  if (notes) {
    authorNotes = <> ({notes})</>;
  }

  if (slug) {
    return (
      <Component className={className}>
        <a href={`/reviews/authors/${slug}/`}>{name}</a>
        {authorNotes}
      </Component>
    );
  }

  return (
    <Component className={className}>
      {name}
      {authorNotes}
    </Component>
  );
}
