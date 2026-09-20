/** Receives extrinsic state and acts on it together with its intrinsic state. */
export interface Flyweight {
  operation(extrinsicState: number): string;
}

/** Stores intrinsic state; immutable, therefore sharable. */
export class ConcreteFlyweight implements Flyweight {
  constructor(private readonly intrinsicState: string) {}

  operation(extrinsicState: number): string {
    return `ConcreteFlyweight(${this.intrinsicState}) with extrinsic state ${String(extrinsicState)}`;
  }
}

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
