export function truncate(text: string, max: number): string {
  if (text.length >= max) {
    text = text.slice(0, max) + "…";
  }
  return text;
}
