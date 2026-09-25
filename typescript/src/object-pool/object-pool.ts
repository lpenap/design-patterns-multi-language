import { Reusable } from "./reusable.ts";

/**
 * Lends out up to `capacity` reusable objects, creating each one only on
 * first demand and recycling released ones in FIFO order.
 */
export class ObjectPool {
  private readonly idle: Reusable[] = [];
  private readonly lent = new Set<Reusable>();
  private createdCount = 0;

  constructor(readonly capacity: number) {
    if (capacity < 1) {
      throw new Error(`capacity must be positive: ${String(capacity)}`);
    }
  }

  /**
   * Hands out an idle object, or a new one while the pool is below capacity.
   * @throws Error when every object is in use
   */
  acquire(task: string): Reusable {
    let reusable = this.idle.shift();
    if (reusable === undefined) {
      if (this.createdCount === this.capacity) {
        throw new Error(`pool exhausted, ${String(this.lent.size)} of ${String(this.capacity)} in use`);
      }
      this.createdCount += 1;
      reusable = new Reusable(this.createdCount);
    }
    reusable.assign(task);
    this.lent.add(reusable);
    return reusable;
  }

  /**
   * Takes an object back, resets it and makes it available again.
   * @throws Error when the object was not lent out by this pool
   */
  release(reusable: Reusable): void {
    if (!this.lent.delete(reusable)) {
      throw new Error(`${reusable.toString()} is not in use`);
    }
    reusable.reset();
    this.idle.push(reusable);
  }

  get created(): number {
    return this.createdCount;
  }

  get available(): number {
    return this.idle.length;
  }

  get inUse(): number {
    return this.lent.size;
  }
}
