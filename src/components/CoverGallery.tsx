import { twJoin } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function CoverGallery({ children, className }: Props): JSX.Element {
  return <ol className={twJoin("px-0", className)}>{children}</ol>;
}
