import { twj } from "src/utils/tailwindJoin";

import { RenderedMarkdown } from "./RenderedMarkdown";

export function LongFormText({
  text,
  className,
}: {
  text: string | null;
  className?: string;
}) {
  if (!text) {
    return null;
  }

  return (
    <RenderedMarkdown
      text={text}
      className={twj("text-md/7 tracking-0.3px tablet:text-xl/8", className)}
    />
  );
}
