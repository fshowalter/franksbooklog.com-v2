import React from "react";
import { twj } from "src/utils/tailwindJoin";

export function Table({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <table className="relative w-full border-collapse shadow-all tablet:whitespace-nowrap">
      {children}
    </table>
  );
}

export function TableHead({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <thead className="sticky top-10 z-10 bg-default px-6 leading-[calc(2.5rem_-_2px)] desktop:top-[calc(var(--header-offset)_+_2.5rem)]">
      {children}
    </thead>
  );
}

export function TableRow({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <tr className="leading-10 odd:bg-subtle">{children}</tr>;
}

export function TableHeaderCell({
  align,
  children,
}: {
  align: "left" | "right";
  children: React.ReactNode;
}): JSX.Element {
  if (align === "left") {
    return <th className="pl-gutter text-left">{children}</th>;
  }

  return <th className="pr-gutter text-right">{children}</th>;
}

export function TableDataCell({
  align,
  children,
  hideOnSmallScreens = false,
  className,
}: {
  hideOnSmallScreens?: boolean;
  align: "left" | "right" | "fill";
  className?: string;
  children: React.ReactNode;
}): JSX.Element {
  const hideOnSmallScreensClass = hideOnSmallScreens
    ? "max-tablet:w-0 max-tablet:*:hidden"
    : undefined;

  if (align === "fill") {
    return (
      <td className={twj("w-full py-0", className, hideOnSmallScreensClass)}>
        {children}
      </td>
    );
  }

  if (align === "left") {
    return (
      <td
        className={twj(
          "px-gutter py-0 text-left",
          className,
          hideOnSmallScreensClass,
        )}
      >
        {children}
      </td>
    );
  }

  return (
    <td
      className={twj(
        "px-gutter py-0 text-right",
        className,
        hideOnSmallScreensClass,
      )}
    >
      {children}
    </td>
  );
}
