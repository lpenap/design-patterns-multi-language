/** The domain-specific interface the client uses. */
export interface Target {
  request(): string;
}

/** An existing class with a useful but incompatible operation. */
export class Adaptee {
  specificRequest(): string {
    return "Adaptee";
  }
}

/** Object adapter: implements Target by delegating to the Adaptee it holds. */
export class Adapter implements Target {
  constructor(private readonly adaptee: Adaptee) {}

  request(): string {
    return `Adapter(${this.adaptee.specificRequest()})`;
  }
}
