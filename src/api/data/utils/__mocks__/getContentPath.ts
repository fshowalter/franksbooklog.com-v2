import { join } from "path";

export function getContentPath(
  kind: "data" | "reviews" | "viewings",
  path?: string,
) {
  if (path) {
    return join(process.cwd(), "src", "api", "data", "fixtures", kind, path);
  }

  return join(process.cwd(), "src", "api", "data", "fixtures", kind);
}
