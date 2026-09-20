import type { Adaptee } from "./adaptee.ts";
import type { Target } from "./target.ts";

/** Object adapter: implements Target by delegating to the Adaptee it holds. */
export class Adapter implements Target {
  constructor(private readonly adaptee: Adaptee) {}

  request(): string {
    return `Adapter(${this.adaptee.specificRequest()})`;
  }
}
