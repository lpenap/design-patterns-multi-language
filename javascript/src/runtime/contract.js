// The contract every pattern example honours (constitution Principle II).
//
// An Example is any object with a string `id` (the catalog id) and a
// `run(out)` method that emits text only through `out.line(text)`.
// An Output is any object with a `line(text)` method. Duck typing is the
// point: no base classes, no interfaces.

/** Collects lines in memory. */
export class BufferOutput {
  lines = [];

  line(text) {
    this.lines.push(text);
  }
}

/**
 * Indexes examples by id in ascending order.
 * @param {Iterable<{id: string, run: (out: {line: (text: string) => void}) => void}>} examples
 * @returns {Map<string, object>}
 * @throws {Error} if two examples share an id
 */
export function indexExamples(examples) {
  const byId = new Map();
  for (const example of [...examples].sort((a, b) => a.id.localeCompare(b.id))) {
    if (byId.has(example.id)) {
      throw new Error(`duplicate example id: ${example.id}`);
    }
    byId.set(example.id, example);
  }
  return byId;
}
