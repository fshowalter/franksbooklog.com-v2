import type { Node, Parent } from "mdast";
import { CONTINUE, SKIP, visit } from "unist-util-visit";

export function removeFootnotes() {
  return (tree: Node) => {
    visit(
      tree,
      "footnoteReference",
      function (
        node: Node,
        index: number | undefined,
        parent: Parent | undefined,
      ) {
        if (parent && index && node.type === "footnoteReference") {
          parent.children.splice(index, 1);
          return [SKIP, index];
        }
        return CONTINUE;
      },
    );

    return tree;
  };
}
