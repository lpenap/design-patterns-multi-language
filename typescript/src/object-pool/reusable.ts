/**
 * The pooled object: expensive to create, cheap to reset. It records the task
 * it is assigned to and how many times it has been handed out; `assign` and
 * `reset` are for the pool only.
 */
export class Reusable {
  private currentTask: string | null = null;
  private timesUsed = 0;

  constructor(readonly id: number) {}

  /** The task this object currently serves, or null while it sits in the pool. */
  get task(): string | null {
    return this.currentTask;
  }

  /** How many times the pool has handed this object out. */
  get uses(): number {
    return this.timesUsed;
  }

  /** @internal */
  assign(task: string): void {
    this.currentTask = task;
    this.timesUsed += 1;
  }

  /** Clears the per-use state so the next client starts from a clean object. @internal */
  reset(): void {
    this.currentTask = null;
  }

  toString(): string {
    return `Reusable#${String(this.id)}`;
  }
}
