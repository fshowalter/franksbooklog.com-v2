import { z } from "zod";

export const WorkKindSchema = z.enum([
  "Anthology",
  "Collection",
  "Nonfiction",
  "Novel",
  "Novella",
  "Short Story",
]);
