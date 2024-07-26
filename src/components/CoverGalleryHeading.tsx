export function CoverGalleryHeading({
  leadText,
  linkText,
  linkTarget,
}: {
  leadText: string;
  linkText: string;
  linkTarget: string;
}) {
  return (
    <div className="w-full px-gutter py-2 shadow-bottom tablet:py-4 tablet:shadow-none desktop:px-pageMargin desktop:py-4">
      <span className="font-semibold text-muted">{leadText} </span>
      <a className="text-accent" href={linkTarget}>
        {linkText}
      </a>
    </div>
  );
}
