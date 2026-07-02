/*
 * Render-time helpers that enforce the hard constraints from
 * pitch-deck-template-brief.md §4. Every section component MUST use these
 * to avoid blank cards, broken layouts, and content drift between regens.
 *
 *   - isMeaningful(value)     reject undefined, null, and empty/whitespace
 *                             strings. Placeholder tokens render as-is so
 *                             the {{PLACEHOLDER}} contract view (toggle
 *                             USE_EXAMPLE_PROSPECT = false in page.tsx)
 *                             is visible.
 *   - filterMeaningful(arr)   array variant — keeps order, drops blanks.
 *   - splitParagraphs(str)    split packed multi-paragraph strings on \n\n.
 */

/** A string is "meaningful" if it has non-whitespace content. */
export function isMeaningful(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value !== "string") return Boolean(value);
  return value.trim().length > 0;
}

/** Drop empty/placeholder string entries (and null/undefined) from an array. */
export function filterMeaningful<T>(arr: T[] | undefined | null): T[] {
  if (!arr) return [];
  return arr.filter((item) => {
    if (typeof item === "string") return isMeaningful(item);
    return item != null;
  });
}

/**
 * Split a string on blank lines into paragraphs. Empty paragraphs are
 * dropped. Returns an empty array for null/undefined/blank/placeholder
 * input — callers should `if (paragraphs.length === 0) return null;`.
 */
export function splitParagraphs(value: string | undefined | null): string[] {
  if (!isMeaningful(value)) return [];
  return (value as string)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}
