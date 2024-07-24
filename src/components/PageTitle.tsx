import { twMerge } from "tailwind-merge";

export function PageTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <h1
      className={twMerge(
        "text-[2rem] font-normal leading-none desktop:text-[2.25rem]",
        className,
      )}
    >
      {children}
    </h1>
  );
}
