import type { Root, RootContent } from "mdast";

export const EXCERPT_SEPARATOR = "<!-- end -->";

export function trimToExcerpt() {
  return (tree: Root) => {
    const separatorIndex = tree.children.findIndex((node: RootContent) => {
      return node.type === "html" && node.value.trim() === EXCERPT_SEPARATOR;
    });

    if (separatorIndex !== -1) {
      tree.children.splice(separatorIndex);
    }
  };
}
