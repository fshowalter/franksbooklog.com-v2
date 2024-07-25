import type { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

import { LabelText } from "./LabelText";
import { SelectInput } from "./SelectInput";

export function SelectField({
  label,
  value,
  onChange,
  children,
  className,
}: {
  label: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <label className={twMerge("flex flex-col", className)}>
      <LabelText as="span" text={label} />
      <SelectInput value={value?.toString()} onChange={onChange}>
        {children}
      </SelectInput>
    </label>
  );
}
