import type { Strategy } from "./strategy.ts";

/** Holds a strategy and delegates to it; the strategy can be replaced at run time. */
export class Context {
  constructor(private strategy: Strategy) {}

  operation(): string {
    return `Operation with ${this.strategy.executeAlgorithm()}`;
  }

  setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }
}
