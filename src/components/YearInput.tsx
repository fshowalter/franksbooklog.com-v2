import { useState } from "react";

import { LabelText } from "./LabelText";
import { SelectInput } from "./SelectInput";

export function YearInput({
  label,
  years,
  onYearChange,
}: {
  label: string;
  years: readonly string[];
  onYearChange: (values: [string, string]) => void;
}): JSX.Element {
  const [minYear, setMinYear] = useState(years[0]);
  const [maxYear, setMaxYear] = useState(years[years.length - 1]);

  const handleMinChange = (value: string) => {
    const newMin = value;
    setMinYear(newMin);

    if (newMin <= maxYear) {
      onYearChange([newMin, maxYear]);
    } else {
      onYearChange([maxYear, newMin]);
    }
  };

  const handleMaxChange = (value: string) => {
    const newMax = value;
    setMaxYear(newMax);

    if (minYear <= newMax) {
      onYearChange([minYear, newMax]);
    } else {
      onYearChange([newMax, minYear]);
    }
  };

  return (
    <fieldset>
      <LabelText as="legend" text={label} />
      <div className="flex items-baseline">
        <label className="flex flex-1 items-center gap-x-[.5ch]">
          <span className="min-w-10 text-left text-sm tracking-0.5px">
            From
          </span>
          <SelectInput
            value={minYear}
            onChange={(e) => handleMinChange(e.target.value)}
          >
            {years.map((year) => {
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </SelectInput>
        </label>
        <label className="flex flex-1 items-center">
          <span className="min-w-10 text-center text-sm tracking-0.5px">
            to
          </span>
          <SelectInput
            value={maxYear}
            onChange={(e) => handleMaxChange(e.target.value)}
          >
            {years
              .slice()
              .reverse()
              .map((year) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
          </SelectInput>
        </label>
      </div>
    </fieldset>
  );
}
