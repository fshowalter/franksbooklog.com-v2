export function CoverGalleryNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="relative flex w-full flex-col items-center tablet:w-auto">
      {children}
    </nav>
  );
}
