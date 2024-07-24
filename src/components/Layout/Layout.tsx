import { Footer } from "./Footer";
import { Mast } from "./Mast";

export function Layout({
  currentPath,
  children,
}: {
  currentPath: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div>
      <a
        href="#content"
        className="absolute left-1/2 top-0.5 z-50 mx-auto bg-subtle px-6 py-2 text-center text-accent [transform:translate(-50%,calc(-100%_-_2px))] focus:[transform:translate(-50%,0%)]"
      >
        Skip to content
      </a>
      <div
        className={
          "image-filter mx-auto min-h-4 w-full max-w-canvas bg-[url('/assets/ripnotcomingsoon.avif')] desktop:sticky desktop:top-0 desktop:z-40"
        }
      />

      <div className="mx-auto flex min-h-full max-w-canvas flex-col bg-default">
        <Mast currentPath={currentPath} />
        <div className="grow" id="content">
          {children}
        </div>
        <Footer currentPath={currentPath} />
      </div>
    </div>
  );
}
