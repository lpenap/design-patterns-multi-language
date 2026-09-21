import type { Strategy } from "./strategy.ts";

export class ConcreteStrategyB implements Strategy {
  executeAlgorithm(): string {
    return "==> algorithm from ConcreteStrategyB";
  }
}
