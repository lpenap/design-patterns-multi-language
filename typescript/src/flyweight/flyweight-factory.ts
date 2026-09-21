import { ConcreteFlyweight } from "./concrete-flyweight.ts";
import type { Flyweight } from "./flyweight.ts";

/** Creates flyweights on first request and returns the existing one afterwards. */
export class FlyweightFactory {
  private readonly pool = new Map<string, Flyweight>();

  getFlyweight(key: string): Flyweight {
    let flyweight = this.pool.get(key);
    if (flyweight === undefined) {
      flyweight = new ConcreteFlyweight(key);
      this.pool.set(key, flyweight);
    }
    return flyweight;
  }

  count(): number {
    return this.pool.size;
  }
}
