import type { ElementType } from "react";
import { twj } from "src/utils/tailwindJoin";

export function RenderedMarkdown({
  className,
  as = "div",
  text,
}: {
  text: string | null;
  className?: string;
  as?: ElementType;
}): JSX.Element | null {
  if (!text) {
    return null;
  }

  const Component = as;

  return (
    <Component
      className={twj("rendered-markdown font-light", className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  );
}
