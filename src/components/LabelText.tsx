import type { ElementType } from "react";

export function LabelText({
  text,
  htmlFor,
  as = "span",
}: {
  text: string;
  htmlFor?: string;
  as?: ElementType;
}) {
  const Component = as;

  return (
    <Component
      className="inline-block h-6 text-left text-sm font-semibold leading-none tracking-0.5px"
      htmlFor={htmlFor}
    >
      {text}
    </Component>
  );
}
