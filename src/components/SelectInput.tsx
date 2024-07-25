import type { ChangeEvent } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";

export function SelectInput({
  value,
  onChange,
  children,
  className,
}: {
  value?: string | number | undefined;
  children: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}): JSX.Element {
  return (
    <select
      value={value}
      onChange={onChange}
      className={twMerge(
        "select-background-image w-full appearance-none rounded-sm border-none bg-subtle py-2 pl-4 pr-8 text-base leading-6 text-subtle shadow-all",
        className,
      )}
    >
      {children}
    </select>
  );
}
