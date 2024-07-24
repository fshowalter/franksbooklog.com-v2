import React from "react";
import { twJoin } from "tailwind-merge";

/**
 * Renders a search icon.
 */
export default function SvgIcon({
  className,
  children,
}: {
  /** CSS class to apply to the rendered element. */
  className?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className={twJoin("fill-subtle", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}
