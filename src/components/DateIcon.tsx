import { twj } from "src/utils/tailwindJoin";

import SvgIcon from "./SvgIcon";
/**
 * Renders a calendar icon.
 */
export function DateIcon({
  className,
}: {
  /** CSS class to apply to the rendered element. */
  className?: string;
}): JSX.Element {
  return (
    <SvgIcon className={twj("mr-[1ch] min-h-4 min-w-4", className)}>
      <title>Watched on</title>
      <path
        fillRule="evenodd"
        d="M14 2H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM2 1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"
      />
      <path
        fillRule="evenodd"
        d="M14 2H2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zM2 1a2 2 0 0 0-2 2v2h16V3a2 2 0 0 0-2-2H2z"
      />
      <path
        fillRule="evenodd"
        d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"
      />
    </SvgIcon>
  );
}
