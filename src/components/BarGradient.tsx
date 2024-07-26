import React from "react";

export function BarGradient({
  value,
  maxValue,
  style,
}: {
  value: number;
  maxValue: number;
  style?: React.CSSProperties;
}): JSX.Element {
  const styles = {
    ...style,
    "--bar-percent": `${(value / maxValue) * 100}%`,
  } as React.CSSProperties;

  return (
    <div className="progress-bar-bg leading-[38px]" style={styles}>
      &nbsp;
    </div>
  );
}
