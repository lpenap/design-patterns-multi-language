/** The only channel through which an example emits text. */
export interface Output {
  line(text: string): void;
}

/** A runnable demonstration of one pattern; `id` equals the catalog id. */
export interface Example {
  readonly id: string;
  run(out: Output): void;
}

/** Collects lines in memory. */
export class BufferOutput implements Output {
  readonly lines: string[] = [];

  line(text: string): void {
    this.lines.push(text);
  }
}

/** Where the CLI writes: standard output and standard error. */
export interface Io {
  write(text: string): void;
  error(text: string): void;
}

/**
 * Indexes examples by id in ascending order.
 * @throws Error if two examples share an id
 */
export function indexExamples(examples: readonly Example[]): ReadonlyMap<string, Example> {
  const byId = new Map<string, Example>();
  for (const example of [...examples].sort((a, b) => a.id.localeCompare(b.id))) {
    if (byId.has(example.id)) {
      throw new Error(`duplicate example id: ${example.id}`);
    }
    byId.set(example.id, example);
  }
  return byId;
}
