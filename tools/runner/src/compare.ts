export interface Difference {
  /** 1-based line number of the first differing line */
  readonly line: number;
  readonly expected: string | null;
  readonly actual: string | null;
}

/** First differing line between two outputs, or null when byte-identical. */
export function firstDifference(expected: string, actual: string): Difference | null {
  if (expected === actual) {
    return null;
  }
  const e = expected.split("\n");
  const a = actual.split("\n");
  const n = Math.max(e.length, a.length);
  for (let i = 0; i < n; i++) {
    if (e[i] !== a[i]) {
      return { line: i + 1, expected: e[i] ?? null, actual: a[i] ?? null };
    }
  }
  /* c8 ignore next */
  return { line: n, expected: null, actual: null };
}

/** Languages whose output differs from the first one's, in the given order. */
export function disagreeingLanguages(outputs: ReadonlyMap<string, string>): readonly string[] {
  const entries = [...outputs.entries()];
  const first = entries[0];
  if (first === undefined) {
    return [];
  }
  const others = entries.filter(([, out]) => out !== first[1]).map(([lang]) => lang);
  return others.length === 0 ? [] : [first[0], ...others];
}
