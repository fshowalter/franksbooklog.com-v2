import toDiffableHtml from "diffable-html";
import type { SnapshotSerializer } from "vitest";

export default {
  serialize(val: string) {
    return toDiffableHtml(val).trim();
  },
  test(val) {
    if (typeof val !== "string") {
      return false;
    }

    const trimmed = val.trim();
    return (
      trimmed.length > 2 &&
      trimmed[0] === "<" &&
      trimmed[trimmed.length - 1] === ">"
    );
  },
} satisfies SnapshotSerializer;
