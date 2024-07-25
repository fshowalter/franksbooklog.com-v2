import { twJoin } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function CoverGallery({ children, className }: Props): JSX.Element {
  return (
    <ol
      className={twJoin(
        "desktop:grd-cols-[repeat(4,1fr)] px-0 tablet:grid tablet:grid-cols-[repeat(4,minmax(78px,248px))] tablet:gap-8 desktop:gap-x-16 desktop:pt-2",
        className,
      )}
    >
      {children}
    </ol>
  );
}
