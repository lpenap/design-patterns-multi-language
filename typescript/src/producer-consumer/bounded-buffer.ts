export class BoundedBuffer<T> {
  private readonly items: T[] = [];
  private operations = 0;

  constructor(private readonly capacity: number) {}

  /** Number of completed puts and takes; the scheduler uses it to detect progress. */
  get operationCount(): number {
    return this.operations;
  }

  /** Waits (yields) while the buffer is full, then appends the item. */
  *put(item: T): Generator<void, void, undefined> {
    while (this.items.length >= this.capacity) {
      yield;
    }
    this.items.push(item);
    this.operations++;
  }

  /** Waits (yields) while the buffer is empty, then removes the oldest item. */
  *take(): Generator<void, T, undefined> {
    while (this.items.length === 0) {
      yield;
    }
    this.operations++;
    return this.items.shift() as T;
  }

  size(): number {
    return this.items.length;
  }
}
