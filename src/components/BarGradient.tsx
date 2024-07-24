import React from "react";

export function BarGradient({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}): JSX.Element {
  const barPercentProperty = {
    "--bar-percent": `${(value / maxValue) * 100}%`,
  } as React.CSSProperties;

  return (
    <div className="progress-bar-bg leading-[38px]" style={barPercentProperty}>
      &nbsp;
    </div>
  );
}
