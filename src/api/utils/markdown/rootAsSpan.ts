import type { Root as HastRoot } from "hast";

export function rootAsSpan() {
  return (tree: HastRoot) => {
    const firstChild = tree.children[0];

    if (firstChild && firstChild.type === "element") {
      firstChild.tagName = "span";
    }
  };
}
