const regex = new RegExp(/(?<=_image\?)(.*?)(?=content)/gm);

export function normalizeSources(sources: string): string {
  if (import.meta.env.MODE === "test") {
    return sources.replace(regex, "/");
  }
  return sources;
}
